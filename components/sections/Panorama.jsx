'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import s from './Panorama.module.css'

/* The full-screen 360 room behind "View in panorama" on a product page.

   A swatch tells you the colour. It does not tell you what a floor of them
   does to a room, which is the thing people come into Mitchell to find out
   and the reason the line under the chips still asks them to. This answers
   the half of that question a web page can: the range's own face photo, laid
   at the real size, in a room you can turn all the way around in.

   It is one WebGL shader rather than a model. The room is six flat planes,
   so there is no geometry worth uploading — instead the fragment shader
   fires a ray per pixel from where you are standing, meets the box, works
   out where on that surface it landed, and lays the tile out there. The grid,
   the bond and the grout are arithmetic on the hit point, which is why the
   floor stays sharp into the distance and why changing the tile size is a
   uniform rather than a rebuild.

   An earlier pass built this out of CSS 3D planes. CSS cannot do it: it will
   not clip geometry at the eye plane, so the moment you stand inside the room
   the surfaces that run from in front of you to behind you fold through the
   origin and the browser draws the left wall on the right. That ceiling is
   what limits a CSS version to a glance around rather than a look. */

/* Metres, so every number stays checkable against a tape measure. A room
   this size is a large bathroom or a small living room — big enough for a
   600x1200 to read as a plank rather than a paving slab, small enough that
   the walls stay in the same picture as the floor. */
const ROOM = { w: 4.8, h: 2.7, d: 4.8 }
const EYE_Y = 1.55  /* standing eye height */
const GROUT = 0.003 /* rectified porcelain is laid tight */

/* Degrees from here on, the way the reference viewer keeps them — the whole
   camera model below is ported from it, and carrying half of it in radians
   is how the port would get quietly wrong. Only the shader wants radians.

   Opening on a corner, looking down. Square on to a wall is what the shader
   gives for nothing and it is the one view with no floor in it, on a page
   selling floors; a quarter turn puts a corner in frame and the tilt puts
   the floor under it. */
const START = { yaw: 20, pitch: -14 }
const PITCH_LIMIT = 85

/* The face photo is one 600mm tile, but laying it at 600 means the stone
   repeats exactly on the grout grid whenever the chosen size divides 600 —
   and 600x600 then renders every tile as the same photograph, which is
   wallpaper, not a floor. 0.7 shares no factor with 75, 300, 600 or 1200, so
   the stone walks across the grid and no two neighbours repeat. */
const TEXTURE_SPAN = 0.7

/* The reference viewer's feel, matched: a wide interior lens on a desktop, a
   much narrower one on a phone where the frame is a slot, a slow drift to
   say the thing is draggable, and enough friction that a flick coasts. */
/* min is the reference's own floor, and it is a floor for a reason: a baked
   panorama has a fixed number of texels per degree, so zooming past the
   point where one texel covers one pixel magnifies rather than reveals. At
   32 the stone went to mush. Theirs stops at 50 and so does this. */
const HFOV = { wide: 100, narrow: 50, min: 50, max: 110 }
const DRIFT = -2   /* degrees per second */

/* The coast after a drag, ported from the reference rather than guessed at,
   because guessing at it is what made the first version feel like a slot
   machine. Three things make it gentle, and the third is the one that
   matters:

     - the applied speed is scaled by 1 - FRICTION each frame;
     - speed is not read off the pointer but re-estimated every frame as an
       average of where the view actually got to, which smooths out a single
       fast mouse event into something the room can follow;
     - and it is capped at the drift speed. Two degrees a second. That is the
       whole secret of why theirs looks calm: let go and the room keeps
       moving at exactly the pace it idles at, so there is no moment where
       the release is visible.

   The first pass here capped at 6 radians a second — 344 degrees — read off
   raw pointer velocity. A flick spun the room. */
const FRICTION = 0.15
const SPEED_EMA = 0.2          /* how much of each frame's real movement counts */
const SPEED_CAP = Math.abs(DRIFT)

/* Degrees of lens per notch of wheel. The reference moves 6 — it runs
   hfov -= 0.05 * wheelDeltaY, and a notch is 120 — so this is a little
   gentler again, and unlike the first pass it is a step in degrees rather
   than a multiplier. A multiplier ignores how hard the wheel was turned,
   which is survivable on a mouse and not on a trackpad, where one flick
   arrives as thirty events and zoomed the room from across the room to an
   inch off the grout. */
const ZOOM_STEP = 4.5
/* And the lens is eased to where the wheel put it rather than snapped, which
   is the rest of why the reference feels slower than it measures. */
const ZOOM_TAU = 0.1
/* Stillness before the room starts turning again. Long enough that it never
   pulls against someone still looking, short enough to feel like it came
   back on its own. */
const RESUME_MS = 3200
const DRIFT_EASE = 1.4 /* seconds to come back up to full speed */

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/* "600x1200mm" -> [0.6, 1.2]. The feed also writes "600 x 1200". */
function parseSize(label) {
  const m = String(label || '').match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i)
  return m ? [parseFloat(m[1]) / 1000, parseFloat(m[2]) / 1000] : [0.6, 0.6]
}

const hex = (h) => {
  const n = parseInt(String(h).slice(1), 16)
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

/* The room, drawn once per change into the six faces of a cube map.

   It used to run per screen pixel per frame, and that is what cost the pan
   its smoothness: a ray-box intersection, a tile grid, a mip-mapped fetch
   and a derivative for every pixel of a full-screen canvas, sixty times a
   second. Measured, the cost was exactly linear in pixel count — 1.3Mpx at
   20fps, 0.32Mpx at 52 — which is the signature of being fragment-bound,
   and at a laptop's real resolution it is a stutter you can feel in the
   drag.

   Nothing in here depends on where you are looking, only on which tile is
   laid, so none of it belonged in the per-frame path. Baked, looking around
   costs one cube-map lookup per pixel, which is what the viewer this is
   modelled on has always done — it samples a photograph. */
const FRAG_BAKE = `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;

varying vec2 vUv;

/* The face being drawn, as the three axes that turn this face's texel into
   a direction. */
uniform vec3  uF;
uniform vec3  uR;
uniform vec3  uU;

uniform vec3  uRoom;      /* half-width, height, half-depth */
uniform float uEyeY;
uniform vec2  uTile;      /* metres */
uniform float uGrout;
uniform float uSpan;
uniform float uBrick;     /* 1.0 when the bond is a running one */
uniform vec3  uGroutCol;
uniform float uFloorOn;
uniform float uWallOn;
uniform vec3  uPlainFloor;
uniform vec3  uPlainWall;
uniform vec3  uPlainCeil;
uniform vec3  uTone;      /* the tile's own average, for dressing the room */
uniform sampler2D uTex;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s;
}

/* Lay the tile out at a point on a surface, in that surface's own metres.
   The grout is drawn with a width taken from the screen-space derivative so
   a line a thousandth of the frame wide still reads as a line instead of
   flickering in and out as the floor recedes. */
vec3 lay(vec2 uv) {
  float row = floor(uv.y / uTile.y);
  float off = uBrick * mod(row, 2.0) * uTile.x * 0.5;
  vec2 c = vec2(uv.x + off, uv.y);

  vec3 stone = texture2D(uTex, c / uSpan).rgb;

  vec2 m = mod(c, uTile);
  vec2 d = max(fwidth(c), vec2(1e-5));
  /* Distance into the tile from its near edges, softened by one pixel. */
  float gx = 1.0 - smoothstep(uGrout - d.x, uGrout + d.x, m.x);
  float gy = 1.0 - smoothstep(uGrout - d.y, uGrout + d.y, m.y);
  float g = clamp(max(gx, gy), 0.0, 1.0);

  /* Once a tile is thinner than the pixel sampling it, the grid turns to
     noise. Fade it towards a flat average instead, the way a real floor
     reads once it is far enough away to stop showing its joints. */
  float fade = clamp(1.0 - max(d.x / uTile.x, d.y / uTile.y) * 1.6, 0.0, 1.0);
  return mix(stone, mix(stone, uGroutCol, g), fade);
}

/* ---- the room's contents -------------------------------------------------
   Everything below is analytic: a handful of boxes, two cylinders and a
   sphere, each tested against the ray and the nearest kept. No marching and
   no mesh — at this count an exact intersection is cheaper than either, and
   it only runs while the room is being baked.

   The furniture is gathered on one wall on purpose. In the room this is
   modelled on, three quarters of what you see is tile and the fittings sit
   in one corner of it; spreading them evenly would furnish the room and bury
   the product. */

/* Where the light comes from, which is the window in the +x wall. */
const vec3 SUN = normalize(vec3(0.92, 0.34, -0.18));

/* The nearest hit so far, carried through the tests. */
float gT;
vec3 gN;
vec3 gC;
float gGloss;
/* Which material the hit is made of, and the one the next test will use.
   Set once before a group of pieces rather than passed into each — thirty
   call sites carrying an argument that changes four times is thirty places
   to get it wrong. */
float gMat;
float gNextMat;
/* The bounds of the box that was hit, kept so its edges can be found at
   shading time. Nothing manufactured has a mathematically sharp arris —
   there is always a roundover or a shadow gap, and its absence is most of
   what still read as a drawing. */
vec3 gLo;
vec3 gHi;
float gIsBox;

/* 0 flat · 1 timber · 2 stone · 3 metal · 4 linen · 5 ceramic · 6 foliage
   · 7 rug · 8 glass */

/* Two coordinates along the face that was hit, so a material can be laid on
   it without every piece carrying its own mapping. */
vec2 surfUV(vec3 p, vec3 n) {
  vec3 a = abs(n);
  if (a.x > a.y && a.x > a.z) return p.zy;
  if (a.y > a.z) return p.xz;
  return p.xy;
}

/* What finally separates a room from a diagram. Flat colour is the thing
   that reads as a drawing: real timber has grain running one way, real
   stone has veins across it, linen has a weave you can only just see, and
   none of that is expensive when it is only drawn once. */
vec3 material(float mat, vec3 base, vec3 p, vec3 n) {
  vec2 q = surfUV(p, n);

  if (mat < 0.5) return base;

  if (mat < 1.5) {                                   /* timber */
    /* Grain runs along the length and the rings cut across it. */
    float grain = fbm(vec2(q.x * 1.1, q.y * 38.0));
    float rings = fbm(vec2(q.x * 2.6, q.y * 1.6));
    float fine = vnoise(vec2(q.x * 7.0, q.y * 260.0));
    float t = 0.74 + 0.34 * grain + 0.20 * rings + 0.07 * fine;
    /* Grain darkens more than it lightens, the way open-pored timber does. */
    return base * t * mix(vec3(0.94, 0.97, 1.0), vec3(1.04, 1.0, 0.95), grain);
  }
  if (mat < 2.5) {                                   /* stone benchtop */
    /* Thin veins through a quiet ground. Taking a wide band of the noise
       gave broad pale patches instead — the top came out camouflaged. */
    float v = fbm(q * 3.0);
    float m = fbm(q * 7.5 + v * 1.3);
    float vein = smoothstep(0.47, 0.495, m) * (1.0 - smoothstep(0.505, 0.53, m));
    return base * (0.93 + 0.12 * v) + vein * 0.085;
  }
  if (mat < 3.5) {                                   /* painted metal */
    return base * (0.94 + 0.10 * vnoise(q * 90.0));
  }
  if (mat < 4.5) {                                   /* linen */
    float weave = vnoise(vec2(q.x * 320.0, q.y * 300.0));
    float fold = fbm(q * 7.0);
    return base * (0.86 + 0.16 * fold + 0.10 * weave);
  }
  if (mat < 5.5) {                                   /* glazed ceramic */
    return base * (0.97 + 0.05 * vnoise(q * 40.0));
  }
  if (mat < 6.5) {                                   /* foliage */
    float leaf = fbm(q * 16.0);
    float edge = vnoise(q * 42.0);
    return base * (0.62 + 0.72 * leaf + 0.22 * edge);
  }
  if (mat < 7.5) {                                   /* rug pile */
    float pile = vnoise(q * 160.0) * 0.5 + fbm(q * 14.0) * 0.5;
    return base * (0.80 + 0.36 * pile);
  }
  /* mirror glass is handled where the ray is still known, in main — it is
     the one material that needs the room traced again. */
  return base;
}

void tryBox(vec3 ro, vec3 rd, vec3 lo, vec3 hi, vec3 col, float gloss) {
  vec3 inv = 1.0 / rd;
  vec3 a = (lo - ro) * inv;
  vec3 b = (hi - ro) * inv;
  vec3 mn = min(a, b), mx = max(a, b);
  float tn = max(max(mn.x, mn.y), mn.z);
  float tf = min(min(mx.x, mx.y), mx.z);
  if (tf < max(tn, 0.0) || tn <= 0.0 || tn >= gT) return;
  gT = tn;
  /* The face entered is the slab whose entry was last. */
  vec3 s = step(mn.yzx, mn.xyz) * step(mn.zxy, mn.xyz);
  gN = -sign(rd) * s;
  gC = col;
  gGloss = gloss;
  gMat = gNextMat;
  gLo = lo; gHi = hi; gIsBox = 1.0;
}

void tryCyl(vec3 ro, vec3 rd, vec2 c, float r, float y0, float y1, vec3 col, float gloss) {
  vec2 o = ro.xz - c;
  float a = dot(rd.xz, rd.xz);
  if (a < 1e-7) return;
  float b = dot(o, rd.xz);
  float k = dot(o, o) - r * r;
  float h = b * b - a * k;
  if (h < 0.0) return;
  h = sqrt(h);
  float t = (-b - h) / a;
  if (t <= 0.0) t = (-b + h) / a;
  float y = ro.y + rd.y * t;
  if (t > 0.0 && t < gT && y >= y0 && y <= y1) {
    gT = t;
    gN = normalize(vec3(ro.x + rd.x * t - c.x, 0.0, ro.z + rd.z * t - c.y));
    gC = col;
    gGloss = gloss;
    gMat = gNextMat;
    gIsBox = 0.0;
    return;
  }
  /* Otherwise the rim, seen from above. */
  if (abs(rd.y) < 1e-6) return;
  float tc = (y1 - ro.y) / rd.y;
  if (tc <= 0.0 || tc >= gT) return;
  vec2 p = ro.xz + rd.xz * tc - c;
  if (dot(p, p) > r * r) return;
  gT = tc;
  gN = vec3(0.0, 1.0, 0.0);
  gC = col;
  gGloss = gloss;
  gMat = gNextMat;
  gIsBox = 0.0;
}

/* Does the ray come anywhere near this box at all? The contents are in six
   clusters — the vanity wall, the towel wall, the planter, the rug, the
   print, the pendant — and most rays miss five of them. One slab test in
   front of each cluster skips the thirty-odd exact tests behind it, which on
   a bake of twenty-five megapixels is the difference between a wait and a
   blink. */
bool near(vec3 ro, vec3 rd, vec3 lo, vec3 hi) {
  vec3 inv = 1.0 / rd;
  vec3 a = (lo - ro) * inv;
  vec3 b = (hi - ro) * inv;
  vec3 mn = min(a, b), mx = max(a, b);
  float tn = max(max(mn.x, mn.y), mn.z);
  float tf = min(min(mx.x, mx.y), mx.z);
  return tf >= max(tn, 0.0) && tn < gT;
}

void trySphere(vec3 ro, vec3 rd, vec3 c, float r, vec3 col, float gloss) {
  vec3 o = ro - c;
  float b = dot(o, rd);
  float k = dot(o, o) - r * r;
  float h = b * b - k;
  if (h < 0.0) return;
  h = sqrt(h);
  float t = -b - h;
  if (t <= 0.0) t = -b + h;
  if (t <= 0.0 || t >= gT) return;
  gT = t;
  gN = normalize(o + rd * t);
  gC = col;
  gGloss = gloss;
  gMat = gNextMat;
  gIsBox = 0.0;
}

/* Everything in the room, in metres off the floor.

   The palette is picked off the tile rather than fixed. A showroom dresses a
   dark floor with pale timber and cream linen and a pale one with walnut and
   charcoal, for the same reason either way: the fittings have to read
   against the tile, and a scheme that works on Bianco White disappears on
   Nero Black. uTone carries the tile's own average, and everything here
   leans the other way from it. */
void furnish(vec3 ro, vec3 rd) {
  float lum = dot(uTone, vec3(0.2126, 0.7152, 0.0722));
  /* 1.0 against a dark tile, 0.0 against a pale one. */
  float dark = smoothstep(0.52, 0.28, lum);

  vec3 timber = mix(vec3(0.40, 0.25, 0.16), vec3(0.72, 0.54, 0.34), dark);
  vec3 stoneTop = mix(vec3(0.13, 0.16, 0.14), vec3(0.88, 0.86, 0.82), dark);
  vec3 matt = mix(vec3(0.09, 0.09, 0.09), vec3(0.74, 0.62, 0.40), dark);
  vec3 linen = mix(vec3(0.86, 0.84, 0.80), vec3(0.90, 0.88, 0.83), dark);
  vec3 rugCol = mix(vec3(0.74, 0.71, 0.66), vec3(0.58, 0.52, 0.45), dark);

  /* Each cluster behind its own slab test. The contents sit in six places
     and most rays miss five of them. */

  /* The vanity wall: joinery, basin, tapware, mirror, trolley, bottles. */
  if (near(ro, rd, vec3(-1.35, 0.00, -2.40), vec3(1.15, 2.15, -1.85))) {
    /* Hung rather than floor-standing, so the floor runs on underneath it
       — which is the whole reason showrooms hang them. */
    gNextMat = 1.0;
    tryBox(ro, rd, vec3(-1.25, 0.52, -2.40), vec3(0.25, 0.86, -1.92), timber, 0.10);
    gNextMat = 2.0;
    tryBox(ro, rd, vec3(-1.31, 0.86, -2.40), vec3(0.31, 0.90, -1.88), stoneTop, 0.35);
    /* A drawer line, which is most of what reads as joinery. */
    tryBox(ro, rd, vec3(-1.25, 0.70, -1.93), vec3(0.25, 0.715, -1.915), vec3(0.22, 0.14, 0.09), 0.0);

    /* Vessel basin, and the bowl set lower so the rim reads as a rim. */
    gNextMat = 5.0;
    tryCyl(ro, rd, vec2(-0.50, -2.14), 0.20, 0.90, 1.05, vec3(0.95, 0.94, 0.92), 0.30);
    tryCyl(ro, rd, vec2(-0.50, -2.14), 0.168, 0.90, 1.015, vec3(0.70, 0.69, 0.67), 0.20);
    /* Wall-mounted tap. */
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(-0.56, 1.06, -2.40), vec3(-0.44, 1.14, -2.35), matt, 0.45);
    tryBox(ro, rd, vec3(-0.52, 1.085, -2.36), vec3(-0.48, 1.115, -2.18), matt, 0.45);

    /* Mirror and frame. The glass is a pale, glossy grey rather than a dark
       one: a mirror with no reflection in it still has to read as a mirror,
       and what says mirror at a distance is being lighter than the wall.
       Darker, and the room grows a chalkboard. */
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(-0.92, 1.24, -2.396), vec3(-0.08, 2.08, -2.382), vec3(0.52, 0.41, 0.28), 0.5);
    gNextMat = 8.0;
    tryBox(ro, rd, vec3(-0.895, 1.265, -2.381), vec3(-0.105, 2.055, -2.376),
      vec3(0.74, 0.76, 0.78), 0.95);

    /* A tiered trolley beside it, with towels on the lower shelf. */
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(0.52, 0.00, -2.34), vec3(0.56, 1.02, -2.30), matt, 0.2);
    tryBox(ro, rd, vec3(1.06, 0.00, -2.34), vec3(1.10, 1.02, -2.30), matt, 0.2);
    gNextMat = 1.0;
    tryBox(ro, rd, vec3(0.50, 0.44, -2.38), vec3(1.12, 0.48, -2.08), timber, 0.1);
    tryBox(ro, rd, vec3(0.50, 0.86, -2.38), vec3(1.12, 0.90, -2.08), timber, 0.1);
    gNextMat = 4.0;
    tryBox(ro, rd, vec3(0.58, 0.48, -2.33), vec3(1.04, 0.60, -2.13), linen, 0.0);

    /* Bottles. Small things at eye level are what stop a room reading as an
       architectural model. */
    gNextMat = 5.0;
    tryCyl(ro, rd, vec2(-1.08, -2.16), 0.035, 0.90, 1.12, mix(vec3(0.24,0.26,0.24), linen, dark), 0.5);
    tryCyl(ro, rd, vec2(-0.97, -2.19), 0.028, 0.90, 1.05, vec3(0.80, 0.78, 0.72), 0.45);
    tryCyl(ro, rd, vec2(0.12, -2.14), 0.045, 0.90, 1.00, timber, 0.15);
  }

  /* The towel wall, and a bench under it. */
  if (near(ro, rd, vec3(-2.40, 0.00, -0.70), vec3(-1.96, 1.26, 1.95))) {
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(-2.38, 1.18, -0.66), vec3(-2.345, 1.215, 0.20), matt, 0.4);
    /* Two panels at slightly different depths rather than one: a towel on a
       rail is folded over it, and a single slab is a sheet of paper. */
    gNextMat = 4.0;
    tryBox(ro, rd, vec3(-2.372, 0.80, -0.58), vec3(-2.344, 1.20, -0.22), linen, 0.0);
    tryBox(ro, rd, vec3(-2.366, 0.76, -0.20), vec3(-2.338, 1.20, 0.14), linen * 0.94, 0.0);
    gNextMat = 1.0;
    tryBox(ro, rd, vec3(-2.38, 0.40, 1.00), vec3(-1.98, 0.44, 1.90), timber, 0.1);
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(-2.36, 0.00, 1.04), vec3(-2.32, 0.40, 1.12), matt, 0.2);
    tryBox(ro, rd, vec3(-2.36, 0.00, 1.78), vec3(-2.32, 0.40, 1.86), matt, 0.2);
  }

  /* The pendant, hung clear of the mirror. Centred over the basin it was
     centred over the mirror too, and the cord ran down the glass. */
  if (near(ro, rd, vec3(-1.84, 1.32, -2.10), vec3(-1.60, 2.70, -1.86))) {
    gNextMat = 3.0;
    tryCyl(ro, rd, vec2(-1.72, -1.98), 0.007, 1.58, 2.70, matt, 0.2);
    tryCyl(ro, rd, vec2(-1.72, -1.98), 0.105, 1.36, 1.58, matt, 0.35);
    tryCyl(ro, rd, vec2(-1.72, -1.98), 0.090, 1.33, 1.37, vec3(1.0, 0.96, 0.88), 0.0);
  }

  /* A planter in the far corner, so the room has a far side worth turning
     towards. */
  if (near(ro, rd, vec3(1.40, 0.00, -1.78), vec3(2.05, 0.92, -1.12))) {
    gNextMat = 5.0;
    tryCyl(ro, rd, vec2(1.72, -1.45), 0.17, 0.0, 0.34, mix(vec3(0.86,0.84,0.80), timber, dark), 0.12);
    gNextMat = 6.0;
    trySphere(ro, rd, vec3(1.72, 0.62, -1.45), 0.27, vec3(0.30, 0.39, 0.28), 0.05);
    trySphere(ro, rd, vec3(1.58, 0.48, -1.30), 0.17, vec3(0.26, 0.35, 0.25), 0.05);
    trySphere(ro, rd, vec3(1.86, 0.52, -1.58), 0.15, vec3(0.33, 0.43, 0.30), 0.05);
  }

  /* A rug. */
  if (near(ro, rd, vec3(-0.62, 0.00, 0.08), vec3(1.22, 0.03, 1.82))) {
    gNextMat = 7.0;
    tryBox(ro, rd, vec3(-0.60, 0.00, 0.10), vec3(1.20, 0.016, 1.80), rugCol, 0.0);
  }

  /* And a framed print behind you, so turning round is not a turn towards
     nothing. */
  if (near(ro, rd, vec3(-0.46, 1.34, 2.36), vec3(0.46, 2.06, 2.40))) {
    gNextMat = 3.0;
    tryBox(ro, rd, vec3(-0.45, 1.35, 2.375), vec3(0.45, 2.05, 2.395), matt, 0.3);
    gNextMat = 2.0;
    tryBox(ro, rd, vec3(-0.41, 1.39, 2.368), vec3(0.41, 2.01, 2.374),
      mix(vec3(0.90, 0.88, 0.84), vec3(0.34, 0.33, 0.31), dark), 0.1);
  }
}

/* What the room looks like in one given direction, roughly and with no
   second bounce. This is what the floor and the mirror need: glazed
   porcelain is not matt enough to throw nothing back, and a mirror that
   reflects nothing is the one object in here nobody believes.

   It is a full second trace, so it is only asked for where it shows — the
   floor and the glass. */
vec3 probe(vec3 ro, vec3 rd) {
  vec3 inv = 1.0 / rd;
  vec3 tA = (vec3(-uRoom.x, 0.0, -uRoom.z) - ro) * inv;
  vec3 tB = (vec3( uRoom.x, uRoom.y, uRoom.z) - ro) * inv;
  vec3 tm = max(tA, tB);
  float t = min(min(tm.x, tm.y), tm.z);
  vec3 p = ro + rd * t;

  vec3 c;
  vec3 n;
  if (tm.y <= tm.x && tm.y <= tm.z) {
    /* The tile is taken as its own average rather than laid out again. A
       reflection carries a fifth of the picture at most, and the grout grid
       in it is below the resolution anyone can see — while lay() is the
       expensive half of a trace. */
    if (rd.y < 0.0) { c = uFloorOn > 0.5 ? uTone : uPlainFloor; n = vec3(0.0, 1.0, 0.0); }
    else { c = uPlainCeil; n = vec3(0.0, -1.0, 0.0); }
  } else if (tm.x <= tm.z) {
    c = uWallOn > 0.5 ? uTone : uPlainWall;
    n = vec3(rd.x > 0.0 ? -1.0 : 1.0, 0.0, 0.0);
  } else {
    c = uWallOn > 0.5 ? uTone : uPlainWall;
    n = vec3(0.0, 0.0, rd.z < 0.0 ? 1.0 : -1.0);
  }
  if (n.y == 0.0 && p.y < 0.085) c = vec3(0.10, 0.10, 0.11);

  float kT = gT; vec3 kN = gN; vec3 kC = gC;
  float kG = gGloss; float kM = gMat; float kB = gIsBox;
  vec3 kLo = gLo; vec3 kHi = gHi;
  gT = t;
  furnish(ro, rd);
  if (gT < t) { c = material(gMat, gC, ro + rd * gT, gN); n = gN; }
  gT = kT; gN = kN; gC = kC; gGloss = kG; gMat = kM; gIsBox = kB; gLo = kLo; gHi = kHi;

  float lam = max(dot(n, SUN), 0.0);
  return c * (0.46 + 0.62 * lam);
}

/* How close is the nearest thing, straight out from this surface? Under a
   hung vanity, behind the trolley legs, where a bottle meets the bench —
   the darkening in those gaps is contact, not shadow, and it survives even
   with the light switched off. Without it everything sits a millimetre
   above the floor rather than on it.

   One ray, and it stops caring past 600mm. */
float contact(vec3 p, vec3 n) {
  float kT = gT; vec3 kN = gN; vec3 kC = gC;
  float kG = gGloss; float kM = gMat; float kB = gIsBox;
  vec3 kLo = gLo; vec3 kHi = gHi;
  gT = 0.6;
  furnish(p + n * 0.004, n);
  float d = min(gT, 0.6);
  gT = kT; gN = kN; gC = kC; gGloss = kG; gMat = kM; gIsBox = kB; gLo = kLo; gHi = kHi;
  return 0.52 + 0.48 * smoothstep(0.0, 0.6, d);
}

/* Is this point in the sun, or behind something? One ray back towards the
   window, against the same clusters the camera is tested against.

   This is what was missing most. Objects with no shadow do not sit in a
   room, they float over a picture of one, and no amount of material detail
   covers it. */
float sunlight(vec3 p, vec3 n) {
  float keepT = gT; vec3 keepN = gN; vec3 keepC = gC;
  float keepG = gGloss; float keepM = gMat;
  vec3 o = p + n * 0.006;

  /* Three rays through a narrow cone rather than one straight at the sun.
     A window is a metre and a half of sky, not a point, so its shadows have
     an edge you can put your hand in — and a single ray gives the hard
     black cut-out that made the first pass look like stuck-on paper. */
  vec3 up = abs(SUN.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 ta = normalize(cross(up, SUN));
  vec3 tb = cross(SUN, ta);
  float j = hash21(p.xz * 37.0 + p.y * 11.0) * 6.2831;
  float lit = 0.0;
  for (int k = 0; k < 2; k++) {
    float a = j + float(k) * 3.1416;
    vec3 d = normalize(SUN + (ta * cos(a) + tb * sin(a)) * 0.085);
    gT = 1.0e9;
    furnish(o, d);
    lit += gT < 1.0e8 ? 0.0 : 1.0;
  }
  gT = keepT; gN = keepN; gC = keepC; gGloss = keepG; gMat = keepM;
  /* Never all the way to black: a shadow in a tiled room is filled by the
     tile around it. */
  return mix(0.58, 1.0, lit * 0.5);
}

void main() {
  /* This texel's direction out of the room. */
  vec3 dir = normalize(uF + uR * vUv.x + uU * vUv.y);

  /* Where it leaves the room. Standing inside a box, the exit is the nearest
     of the three far slab crossings. */
  vec3 ro = vec3(0.0, uEyeY, 0.0);
  vec3 inv = 1.0 / dir;
  vec3 tA = (vec3(-uRoom.x, 0.0, -uRoom.z) - ro) * inv;
  vec3 tB = (vec3( uRoom.x, uRoom.y, uRoom.z) - ro) * inv;
  vec3 tmax = max(tA, tB);
  float t = min(min(tmax.x, tmax.y), tmax.z);
  vec3 p = ro + dir * t;

  vec2 uv;
  vec3 col;
  float light;
  vec3 n;
  float ao = 1.0;

  if (tmax.y <= tmax.x && tmax.y <= tmax.z) {
    if (dir.y < 0.0) {                       /* floor */
      uv = vec2(p.x, p.z);
      col = uFloorOn > 0.5 ? lay(uv) : uPlainFloor;
      light = 1.0;
      n = vec3(0.0, 1.0, 0.0);
      /* Darker into the corners of the room, and darker again under what is
         standing on it. Contact is most of what makes an object look like it
         is in the room rather than pasted over it. */
      vec2 edge = uRoom.xz - abs(p.xz);
      ao = 0.62 + 0.38 * smoothstep(0.0, 0.8, min(edge.x, edge.y));
      /* A wide, soft ground shadow. The tight contact band under the same
         pieces is measured rather than drawn, just below. */
      ao *= 1.0 - 0.26 * exp(-5.0 * max(0.0,
        length(max(abs(p.xz - vec2(-0.5, -2.16)) - vec2(0.78, 0.26), vec2(0.0)))));
      ao *= 1.0 - 0.14 * exp(-4.0 * length(p.xz - vec2(1.72, -1.45)));
    } else {                                 /* the ceiling */
      uv = vec2(p.x, p.z);
      col = uPlainCeil;
      /* Held just under 1. Lit past it, a plain white ceiling clips to a
         flat sheet with no corner in it and takes the top of the room with
         it. */
      light = 0.98;
      n = vec3(0.0, -1.0, 0.0);
      vec2 edge = uRoom.xz - abs(p.xz);
      float e = min(edge.x, edge.y);
      ao = 0.74 + 0.26 * smoothstep(0.0, 0.7, e);

      /* Set plaster, not paper. A couple of percent of noise at the scale a
         trowel leaves is the difference between a ceiling and a lid. */
      col *= 0.982 + 0.034 * fbm(uv * 19.0);

      /* A shadowline where the ceiling meets the wall — the sheet stops
         short and the gap reads as a dark line. It is the detail the
         skirting below is already doing at the other end of the room, and
         having it at both ends is what squares the box off. */
      float cove = smoothstep(0.040, 0.052, e) * (1.0 - smoothstep(0.082, 0.094, e));
      float lip = 1.0 - smoothstep(0.094, 0.130, e);
      col = mix(col, col * 1.04, lip * (1.0 - cove));
      col = mix(col, vec3(0.13, 0.13, 0.14), cove * 0.92);
      ao = mix(ao, ao * 0.82, cove);

      /* Four downlights on a square, and the canopy the pendant hangs off.
         The halo around each is the light washing back across the plaster,
         which is most of what you actually see of a downlight. */
      for (int i = 0; i < 4; i++) {
        vec2 c = vec2(i == 0 || i == 3 ? -1.15 : 1.15, i < 2 ? -1.15 : 1.15);
        float d = length(p.xz - c);
        col += uPlainCeil * 0.30 * exp(-d * 5.2) * (1.0 - cove);
        float disc = 1.0 - smoothstep(0.052, 0.060, d);
        float trim = smoothstep(0.060, 0.066, d) * (1.0 - smoothstep(0.072, 0.080, d));
        col = mix(col, vec3(1.0, 0.97, 0.90) * 1.55, disc);
        col = mix(col, vec3(0.20, 0.20, 0.21), trim * 0.8);
      }
      float cd = length(p.xz - vec2(-1.72, -1.98));
      col = mix(col, vec3(0.11, 0.11, 0.12), 1.0 - smoothstep(0.046, 0.054, cd));
    }
  } else if (tmax.x <= tmax.z) {             /* the two side walls */
    uv = vec2(p.z, p.y);
    col = uWallOn > 0.5 ? lay(uv) : uPlainWall;
    /* The light comes from +x. Without a bright side the two walls fold into
       one sheet of grey and the room stops having corners. */
    light = dir.x > 0.0 ? 1.04 : 0.84;
    n = vec3(dir.x > 0.0 ? -1.0 : 1.0, 0.0, 0.0);
    ao = 0.70 + 0.30 * smoothstep(0.0, 0.55, min(p.y, uRoom.z - abs(p.z)));

    /* The window, cut into the +x wall: the light the whole room is lit by,
       and the one thing in here that is not a surface. */
    if (dir.x > 0.0) {
      vec2 wn = vec2(abs(p.z) - 1.30, p.y - 1.60);
      if (abs(p.z) < 1.30 && p.y > 0.95 && p.y < 2.25) {
        float toFrame = min(1.30 - abs(p.z), min(p.y - 0.95, 2.25 - p.y));
        if (toFrame < 0.055) {
          col = vec3(0.10, 0.10, 0.10);       /* the frame */
          light = 1.0; ao = 1.0;
        } else {
          /* Outside: sky over a line of green, and the slats of a blind
             drawn across the top third. */
          float sky = smoothstep(1.30, 1.85, p.y);
          col = mix(vec3(0.62, 0.68, 0.55), vec3(0.88, 0.93, 0.98), sky);
          float slat = smoothstep(2.25, 1.80, p.y) *
            (0.5 + 0.5 * sin(p.y * 128.0));
          col = mix(col, vec3(0.93, 0.93, 0.92), slat * 0.75);
          /* It is the light source, so nothing else applies to it. */
          gl_FragColor = vec4(col * 1.25, 1.0);
          return;
        }
      }
    }
  } else {                                   /* front and back walls */
    uv = vec2(p.x, p.y);
    col = uWallOn > 0.5 ? lay(uv) : uPlainWall;
    light = dir.z < 0.0 ? 0.95 : 0.9;
    n = vec3(0.0, 0.0, dir.z < 0.0 ? 1.0 : -1.0);
    ao = 0.70 + 0.30 * smoothstep(0.0, 0.55, min(p.y, uRoom.x - abs(p.x)));
  }

  /* A skirting, which the room this is modelled on makes a feature of: one
     dark line where the floor meets the wall, and the two stop being the
     same sheet of tile folded over. */
  if (n.y == 0.0 && p.y < 0.085) {
    col = vec3(0.10, 0.10, 0.11);
    light = 1.0;
    ao = mix(0.75, 1.0, smoothstep(0.0, 0.085, p.y));
  }

  /* Occlusion where something stands against this surface. */
  ao *= contact(p, n);

  /* Now the contents, which sit in front of all of that. */
  gT = t; gN = n; gC = col; gGloss = 0.0;
  float wasT = t;
  furnish(ro, dir);
  if (gT < wasT) {
    vec3 hp = ro + dir * gT;
    col = material(gMat, gC, hp, gN);
    n = gN;

    /* Glass: trace the room back out of it. */
    if (gMat > 7.5) {
      col = probe(hp + gN * 0.004, reflect(dir, gN)) * 0.92 + vec3(0.01, 0.015, 0.02);
    }

    /* A shadow gap at every arris. Joinery has one, and a box without one
       is the shape nothing manufactured ever has. */
    if (gIsBox > 0.5) {
      vec3 e = min(hp - gLo, gHi - hp);
      float edge = min(min(e.x, e.y), e.z);
      col *= 0.70 + 0.30 * smoothstep(0.0, 0.0045, edge);
    }

    /* Leaves are not billiard balls. */
    if (gMat > 5.5 && gMat < 6.5) {
      vec2 lq = surfUV(hp, gN);
      n = normalize(gN + vec3(fbm(lq * 22.0) - 0.5, fbm(lq * 19.0 + 7.3) - 0.5,
        fbm(lq * 25.0 + 3.1) - 0.5) * 0.85);
    }
    light = 1.0;
    /* Objects get their own soft occlusion from the floor up. */
    ao = 0.78 + 0.22 * smoothstep(0.0, 0.5, (ro + dir * gT).y);
    t = gT;
  }

  /* Sun, sky and bounce, rather than one lamp.

     The key light is the window. The fill is the sky through it, which is
     cool and comes from above. The bounce is the room itself — a tiled box
     throws a lot of its own colour back, and it is the reason a real
     interior has no black shadows. Without the bounce term every underside
     here went to a flat grey and the whole thing read as a model. */
  float lam = max(dot(n, SUN), 0.0);
  float sky = 0.5 + 0.5 * n.y;
  float bounce = max(dot(n, -SUN), 0.0) * 0.5 + 0.25;
  /* A face turned away from the window is already unlit, so whether
     anything stands between it and the window changes nothing — and
     finding that out was the single most expensive thing in the bake.
     Roughly half of every surface in a room faces away from any one
     window. */
  float shade = 1.0;
  if (lam > 0.012) {
    shade = sunlight((gT < wasT) ? ro + dir * gT : p, n);
  }

  /* Weighted so the tile keeps its own colour. Leaning on the directional
     term is what turned a warm beige wall grey — the sun has to model the
     room, not repaint it. */
  /* The window is a metre and a half away, not a sun ninety million miles
     off, so what it lights falls away from it. Flat across the whole room
     is the other reason this read as a model. */
  vec3 hp2 = (gT < wasT) ? ro + dir * gT : p;
  float fall = 0.72 + 0.46 * smoothstep(-2.6, 2.4, hp2.x);

  vec3 lit = vec3(1.02, 0.99, 0.95) * lam * 0.52 * shade * fall
           + vec3(0.62, 0.70, 0.82) * sky * 0.17
           + uTone * bounce * 0.30
           + vec3(0.44);
  col *= light * lit * ao;

  /* Glazed porcelain is matt, not dead. It throws back a little of the room
     and much more of it at a grazing angle, which is the whole reason a
     tiled floor photographs the way it does. */
  if (n.y > 0.9 && gT >= wasT && uFloorOn > 0.5) {
    float fres = pow(1.0 - clamp(-dir.y, 0.0, 1.0), 4.0);
    float k = 0.05 + 0.26 * fres;
    /* Looking straight down at a matt floor there is nothing to see, and
       tracing the room again to find that out is most of the bake. The
       reflection only earns its cost towards grazing. */
    if (k > 0.095) {
      col = mix(col, probe(p + vec3(0.0, 0.004, 0.0), reflect(dir, n)) * 0.9, k);
    }
  }

  if (gGloss > 0.0 && gT < wasT) {
    vec3 h = normalize(SUN - dir);
    col += gGloss * 0.42 * shade * pow(max(dot(n, h), 0.0), 34.0);
    /* A rim where a curved face turns away, which is most of what tells you
       ceramic and metal from paint. */
    col += gGloss * 0.10 * pow(1.0 - max(dot(n, -dir), 0.0), 3.5);
  }

  /* Scaled to the room, not to a fixed distance: the far corner is about
     seven metres off, and a falloff tuned for twice that leaves every
     surface at the same flat value and the depth with it. */
  col *= 1.0 - clamp(t / 8.0, 0.0, 1.0) * 0.3;

  /* A photographic finish rather than a raw one: roll the highlights off
     instead of clipping them, and take a little saturation out. Straight
     linear colour out of a shader is the other half of why this looked
     drawn — nothing photographed has flat, fully saturated faces. */
  col = col / (col + vec3(1.05)) * 2.05;
  col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.95);
  col = pow(max(col, vec3(0.0)), vec3(0.95));

  /* A trace of grain. Every photograph has some and no renderer produces
     any, which is a difference the eye notices long before it can name it.
     Baked in, so it sits still in the room rather than crawling. */
  col += (hash21(vUv * 2048.0) - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}`

/* And the per-frame half: a ray, and the colour the room already has in that
   direction. This is the whole cost of looking around now. */
const FRAG_VIEW = `
precision highp float;
varying vec2 vUv;
uniform float uAspect;
uniform float uYaw;
uniform float uPitch;
uniform float uHfov;      /* radians, horizontal */
uniform samplerCube uCube;

void main() {
  float f = tan(uHfov * 0.5);
  vec3 dir = normalize(vec3(vUv.x * f, vUv.y * f / uAspect, -1.0));

  float cp = cos(uPitch), sp = sin(uPitch);
  dir = vec3(dir.x, dir.y * cp - dir.z * sp, dir.y * sp + dir.z * cp);
  /* Positive yaw turns the view to the right.

     It used to turn it left, which is the opposite of how every other
     viewer means the word — and the drag was ported from one of them. The
     formula was right and the convention underneath it was backwards, so
     the room slid the wrong way under the cursor: drag left and the tiles
     went right. Fixing it here rather than in the drag fixes the arrow keys
     with it, which were reversed for exactly the same reason. */
  float cy = cos(uYaw), sy = sin(uYaw);
  dir = vec3(dir.x * cy - dir.z * sy, dir.y, dir.x * sy + dir.z * cy);

  gl_FragColor = vec4(textureCube(uCube, dir).rgb, 1.0);
}`

/* The six faces, as the axes that map a face texel to a direction. These are
   the cube map's own convention written out: get one of them backwards and
   the room is drawn with a wall inside out, which is hard to see and
   impossible to guess at. */
const FACES = [
  { t: 'TEXTURE_CUBE_MAP_POSITIVE_X', f: [1, 0, 0], r: [0, 0, -1], u: [0, -1, 0] },
  { t: 'TEXTURE_CUBE_MAP_NEGATIVE_X', f: [-1, 0, 0], r: [0, 0, 1], u: [0, -1, 0] },
  { t: 'TEXTURE_CUBE_MAP_POSITIVE_Y', f: [0, 1, 0], r: [1, 0, 0], u: [0, 0, 1] },
  { t: 'TEXTURE_CUBE_MAP_NEGATIVE_Y', f: [0, -1, 0], r: [1, 0, 0], u: [0, 0, -1] },
  { t: 'TEXTURE_CUBE_MAP_POSITIVE_Z', f: [0, 0, 1], r: [1, 0, 0], u: [0, -1, 0] },
  { t: 'TEXTURE_CUBE_MAP_NEGATIVE_Z', f: [0, 0, -1], r: [-1, 0, 0], u: [0, -1, 0] },
]

/* Per face, and the number that decides whether the room looks sharp.

   A face covers 90 degrees, so it carries 90/N degrees per texel, and the
   screen asks for hfov/width. At 2048 a desktop's texels are finer than its
   pixels at the widest view and still close at the tightest, which is the
   bar. A phone asks for far fewer pixels across a narrower lens, so 1024
   clears it there and saves it 100MB of texture it does not need.

   Both are powers of two, and that is not a preference: WebGL1 will not
   build mipmaps for a texture that is not, and a cube map asked to filter
   through mipmaps it does not have samples black. 1536 looked like a
   sensible middle number and rendered a black room. */
const faceSize = () =>
  (typeof window !== 'undefined' && window.innerWidth < 760) ? 1024 : 2048

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error(log || 'shader failed to compile')
  }
  return sh
}

/* WebGL1 will not mipmap or repeat a texture whose sides are not powers of
   two, and the face photos are 1181 square. Repainting them at 1024 buys
   both — and mipmaps are not a nicety here: without them a floor running to
   the back of the room samples one texel in twenty and turns to static. */
function toTexture(gl, img) {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 1024
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0, 1024, 1024)

  /* The tile's own average, taken by letting the browser downsample the
     whole face to a single pixel. The room is dressed off this, so it has
     to come from the photograph rather than from a table someone has to
     remember to update when a range is added. */
  let tone = [0.8, 0.78, 0.75]
  try {
    const one = document.createElement('canvas')
    one.width = 1
    one.height = 1
    const octx = one.getContext('2d')
    octx.drawImage(c, 0, 0, 1, 1)
    const d = octx.getImageData(0, 0, 1, 1).data
    tone = [d[0] / 255, d[1] / 255, d[2] / 255]
  } catch { /* a tainted canvas would only cost us the dressing */ }

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.generateMipmap(gl.TEXTURE_2D)

  /* A floor seen at a grazing angle is the case trilinear filtering is worst
     at; anisotropy is the difference between tiles and a smear. */
  const aniso = gl.getExtension('EXT_texture_filter_anisotropic') ||
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  if (aniso) {
    gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT,
      Math.min(8, gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)))
  }
  return { tex, tone }
}

const SURFACES = [
  { value: 'both', label: 'Floor & walls' },
  { value: 'floor', label: 'Floor only' },
  { value: 'wall', label: 'Walls only' },
]

export default function Panorama({
  open, onClose, name, brand,
  colours = [], sizes = [], panorama,
  colour, size, onChoose,
}) {
  const [mounted, setMounted] = useState(false)
  const [surface, setSurface] = useState('both')
  const [rotated, setRotated] = useState(false)
  /* Open on a desktop, where it costs a strip down the side; shut on a phone,
     where the sheet is well over half the screen and the room is what they
     came for. The handle is right there either way. */
  const [listOpen, setListOpen] = useState(true)
  const [hint, setHint] = useState(true)
  const [failed, setFailed] = useState(false)
  const [isFull, setIsFull] = useState(false)

  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const returnTo = useRef(null)

  /* The camera lives in a ref, not in state: it changes every frame while a
     flick is coasting, and a re-render per frame would be a re-render per
     frame of the whole dialog. */
  const view = useRef({
    ...START, hfov: HFOV.wide, hfovTarget: HFOV.wide,
    vYaw: 0, vPitch: 0, drift: true, ease: 1, touched: 0,
  })
  const drag = useRef(null)
  const pinch = useRef(null)

  const skin = panorama?.[colour] || Object.values(panorama || {})[0]
  const [tw, th] = parseSize(size)
  const tile = rotated ? [th, tw] : [tw, th]
  const square = Math.abs(tw - th) < 1e-6

  useEffect(() => setMounted(true), [])

  /* ---- the GL scene ----------------------------------------------------- */
  useEffect(() => {
    if (!open || !canvasRef.current) return undefined
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) { setFailed(true); return undefined }
    gl.getExtension('OES_standard_derivatives')

    const link = (fragSrc) => {
      const p = gl.createProgram()
      gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fragSrc))
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || 'link failed')
      }
      return p
    }

    let bakeProg, viewProg
    try {
      bakeProg = link(FRAG_BAKE)
      viewProg = link(FRAG_VIEW)
    } catch (e) {
      setFailed(true)
      return undefined
    }

    /* One triangle, big enough to cover the clip square, shared by both
       programs — the attribute sits at location 0 in each. */
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    for (const p of [bakeProg, viewProg]) {
      gl.useProgram(p)
      const a = gl.getAttribLocation(p, 'aPos')
      gl.enableVertexAttribArray(a)
      gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0)
    }

    const uBake = {}
    for (const k of ['uF', 'uR', 'uU', 'uRoom', 'uEyeY', 'uTile', 'uGrout', 'uSpan',
      'uBrick', 'uGroutCol', 'uFloorOn', 'uWallOn', 'uTone',
      'uPlainFloor', 'uPlainWall', 'uPlainCeil', 'uTex']) {
      uBake[k] = gl.getUniformLocation(bakeProg, k)
    }
    const uView = {}
    for (const k of ['uAspect', 'uYaw', 'uPitch', 'uHfov', 'uCube']) {
      uView[k] = gl.getUniformLocation(viewProg, k)
    }

    /* The room, as six square faces the view program reads from — twice
       over, at two sizes.

       The big one is what you end up looking at, and on a slow machine it
       is a second or two of drawing. The small one is a sixty-fourth of the
       work, so it finishes inside a single frame, and the view samples that
       while the big one is still going. Picking a colour therefore changes
       the room now and sharpens a moment later, rather than leaving the old
       colour up for the length of the bake. */
    const FACE_PX = faceSize()
    const DRAFT_PX = 256
    const makeCube = (px) => {
      const c = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, c)
      for (const f of FACES) {
        gl.texImage2D(gl[f.t], 0, gl.RGBA, px, px, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      }
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      return c
    }
    let sharpPx = FACE_PX
    let cube = makeCube(sharpPx)
    const draft = makeCube(DRAFT_PX)
    const fbo = gl.createFramebuffer()
    /* Measured once, off the draft, which is a sixty-fourth of the full
       pass. If this machine would take more than a couple of seconds over
       the sharp one, it gets the smaller cube instead. Half the devices
       this will run on have integrated graphics and I cannot test on any of
       them; a number the machine tells us beats a number I guessed. */
    let sized = false

    /* Draw the room into the cube, one face per frame.

       All six at once is twenty-five megapixels of the expensive shader in
       a single call, which on a slow machine is a visible freeze every time
       somebody picks a colour. Spread over six frames it is six ordinary
       frames instead, and the old room stays on screen until the new one is
       finished — so changing colour reads as the room changing rather than
       as the viewer stalling. */
    const bakeFace = (i, last, target, px) => {
      const held = glRef.current
      const sc = held?.scene
      if (!held?.tex || !sc) return false
      const f = FACES[i]
      gl.useProgram(bakeProg)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.viewport(0, 0, px, px)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, held.tex)
      gl.uniform1i(uBake.uTex, 0)
      gl.uniform3f(uBake.uRoom, ROOM.w / 2, ROOM.h, ROOM.d / 2)
      gl.uniform1f(uBake.uEyeY, EYE_Y)
      gl.uniform2f(uBake.uTile, sc.tile[0], sc.tile[1])
      gl.uniform1f(uBake.uGrout, GROUT)
      gl.uniform1f(uBake.uSpan, TEXTURE_SPAN)
      gl.uniform1f(uBake.uBrick, sc.brick)
      gl.uniform3fv(uBake.uGroutCol, sc.grout)
      gl.uniform1f(uBake.uFloorOn, sc.floorOn)
      gl.uniform1f(uBake.uWallOn, sc.wallOn)
      gl.uniform3fv(uBake.uPlainFloor, hex('#ddd8d1'))
      gl.uniform3fv(uBake.uPlainWall, hex('#efebe5'))
      gl.uniform3fv(uBake.uPlainCeil, hex('#f6f4f1'))
      gl.uniform3fv(uBake.uTone, held.tone || [0.8, 0.78, 0.75])
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl[f.t], target, 0)
      gl.uniform3f(uBake.uF, f.f[0], f.f[1], f.f[2])
      gl.uniform3f(uBake.uR, f.r[0], f.r[1], f.r[2])
      gl.uniform3f(uBake.uU, f.u[0], f.u[1], f.u[2])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      /* The mip chain is rebuilt once the last face of this pass is down —
         keyed off the pass, not the face id, now that the order follows the
         camera rather than the cube. */
      if (last) {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, target)
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
        held.baked = true
      }
      return true
    }

    glRef.current = {
      gl, tex: null, scene: null, baked: false, bakeFace,
      face: 0, order: [0, 1, 2, 3, 4, 5], dirty: true, sharp: false, pending: false,
    }

    const resize = () => {
      let dpr = Math.min(window.devicePixelRatio || 1, 2)
      /* A pixel budget on top of the device ratio. A 1920 laptop at a ratio
         of 2 is eight megapixels of full-screen fragment work every frame,
         and the cost here is exactly linear in that number — which is the
         difference between sixty frames and thirty on the integrated
         graphics most of these laptops have. The room is a photograph of
         stone; it does not miss the last half-pixel. */
      const budget = 2.5e6
      const area = canvas.clientWidth * canvas.clientHeight * dpr * dpr
      if (area > budget) dpr *= Math.sqrt(budget / area)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)

    let raf = 0
    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const v = view.current

      /* Take the room back once it has been left alone — but not while a
         finger is still down, and not while a flick is still running out,
         or the drift would fight the coast it is waiting on. */
      if (!v.drift && !drag.current && !pinch.current &&
        now - v.touched > RESUME_MS &&
        /* Degrees a second, and the coast is capped at two of them, so this
           is "very nearly stopped" rather than "stopped". Waiting for an
           exact zero waits for an exponential to reach it. */
        Math.abs(v.vYaw) < 0.3 && Math.abs(v.vPitch) < 0.3) {
        v.drift = true
        v.ease = 0
        v.vYaw = 0
        v.vPitch = 0
      }

      /* Where the view stood before this frame touched it. The drag writes
         straight into yaw and pitch between frames, so measuring the whole
         frame's movement here catches the drag and the coast in one number
         — which is how the reference turns a drag into a coast without ever
         reading a pointer velocity. */
      const wasYaw = v.yaw
      const wasPitch = v.pitch

      if (v.drift) {
        /* Eased in rather than switched on: a room that snaps into motion
           reads as a glitch, and this has to look like it resumed. */
        v.ease = Math.min(1, v.ease + dt / DRIFT_EASE)
        v.yaw += DRIFT * dt * v.ease
      } else {
        const a = 1 - FRICTION
        v.yaw += v.vYaw * dt * a
        v.pitch = clamp(v.pitch + v.vPitch * dt * a, -PITCH_LIMIT, PITCH_LIMIT)
      }

      /* However the lens was changed — wheel, pinch, keys — it arrives here
         as a target and is walked towards. */
      if (Math.abs(v.hfovTarget - v.hfov) > 1e-3) {
        v.hfov += (v.hfovTarget - v.hfov) * (1 - Math.exp(-dt / ZOOM_TAU))
      } else {
        v.hfov = v.hfovTarget
      }

      if (dt > 0 && !v.drift) {
        v.vYaw = clamp((1 - SPEED_EMA) * v.vYaw + ((v.yaw - wasYaw) / dt) * SPEED_EMA,
          -SPEED_CAP, SPEED_CAP)
        v.vPitch = clamp((1 - SPEED_EMA) * v.vPitch + ((v.pitch - wasPitch) / dt) * SPEED_EMA,
          -SPEED_CAP, SPEED_CAP)
      }

      const held = glRef.current
      if (held) {
        /* Re-draw the room only when the tile under it changed: the whole
           draft cube in the first frame, then the full-size faces one per
           frame, nearest to where the camera points first. */
        if (held.dirty && !held.pending && held.tex && held.scene) {
          if (held.face === 0) {
            const y = v.yaw * Math.PI / 180
            const p2 = v.pitch * Math.PI / 180
            const d = [
              Math.sin(y) * Math.cos(p2),
              Math.sin(p2),
              -Math.cos(y) * Math.cos(p2),
            ]
            held.order = FACES
              .map((f, i) => [i, f.f[0] * d[0] + f.f[1] * d[1] + f.f[2] * d[2]])
              .sort((a, b) => b[1] - a[1])
              .map(([i]) => i)
            /* The draft, all six faces, in this one frame. */
            for (let k = 0; k < FACES.length; k++) {
              bakeFace(k, k === FACES.length - 1, draft, DRAFT_PX)
            }
            held.sharp = false
          }
          const first = held.face === 0 && !sized
          const t0 = first ? performance.now() : 0
          if (bakeFace(held.order[held.face], held.face === FACES.length - 1, cube, sharpPx)) {
            /* Time the first full-size face against the clock rather than
               against an estimate, then decide. Half the devices this runs
               on have integrated graphics and none of them are here to be
               tested; a number the machine reports beats a number I guessed.
               Too slow and it gets the smaller cube and starts again — the
               draft is on screen throughout, so the restart is not seen. */
            let restart = false
            if (first) {
              gl.finish()
              sized = true
              if (performance.now() - t0 > 320 && sharpPx > 1024) {
                gl.deleteTexture(cube)
                sharpPx = 1024
                cube = makeCube(sharpPx)
                /* Start the pass again at the new size. Not a `return`: the
                   next frame is scheduled at the bottom of this one, and
                   leaving early here stops the loop dead. */
                held.face = 0
                held.sharp = false
                restart = true
              }
            }
            if (!restart) held.face += 1
            if (held.face >= FACES.length) {
              held.face = 0
              held.dirty = false
              held.sharp = true
            }
          }
        }

        if (held.baked) {
          resize()
          gl.useProgram(viewProg)
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, held.sharp ? cube : draft)
          gl.uniform1i(uView.uCube, 0)
          const rad = Math.PI / 180
          gl.uniform1f(uView.uAspect, canvas.width / canvas.height)
          gl.uniform1f(uView.uYaw, v.yaw * rad)
          gl.uniform1f(uView.uPitch, v.pitch * rad)
          gl.uniform1f(uView.uHfov, v.hfov * rad)
          gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      const held = glRef.current
      if (held?.tex) gl.deleteTexture(held.tex)
      gl.deleteTexture(cube)
      gl.deleteTexture(draft)
      gl.deleteFramebuffer(fbo)
      gl.deleteBuffer(buf)
      gl.deleteProgram(bakeProg)
      gl.deleteProgram(viewProg)
      glRef.current = null
      const lose = gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
    }
  }, [open])

  /* Swap the face photo whenever the colour changes. */
  useEffect(() => {
    const held = glRef.current
    if (!open || !held || !skin?.texture) return undefined
    let dead = false
    /* Hold the bake until the new photo is here. Changing colour also
       changes the grout, which marks the room dirty straight away — so
       without this the room is baked once in full against the colour you
       just left, and only baked again when the image lands. That first pass
       is both wasted and the reason the change took seconds to show. */
    glRef.current.pending = true
    const img = new Image()
    img.onload = () => {
      if (dead || !glRef.current) return
      const { gl } = glRef.current
      if (glRef.current.tex) gl.deleteTexture(glRef.current.tex)
      gl.activeTexture(gl.TEXTURE0)
      const made = toTexture(gl, img)
      glRef.current.tex = made.tex
      glRef.current.tone = made.tone
      glRef.current.pending = false
      glRef.current.dirty = true
      glRef.current.face = 0
    }
    img.onerror = () => { if (glRef.current) glRef.current.pending = false }
    img.src = skin.texture
    return () => { dead = true }
  }, [open, skin?.texture])

  /* Everything the room is made of that is not the camera. Pushed into the
     ref the frame loop reads, so changing a chip never restarts the loop —
     it only marks the room for re-drawing. */
  useEffect(() => {
    if (!glRef.current) return
    const long = Math.max(tile[0], tile[1]) / Math.min(tile[0], tile[1])
    glRef.current.dirty = true
    glRef.current.face = 0
    glRef.current.scene = {
      tile,
      /* Planks and subway tiles are laid in a running bond; squares are
         stacked. A 600x1200 shown stacked is a floor no tiler would lay. */
      brick: long >= 1.6 ? 1 : 0,
      grout: hex(skin?.grout || '#c6c0ba'),
      floorOn: surface !== 'wall' ? 1 : 0,
      wallOn: surface !== 'floor' ? 1 : 0,
    }
  }, [tile[0], tile[1], skin?.grout, surface, open])

  /* ---- opening and closing ---------------------------------------------- */
  useEffect(() => {
    if (!open) return
    const phone = typeof window !== 'undefined' && window.innerWidth < 760
    const lens = phone ? HFOV.narrow : HFOV.wide
    view.current = {
      ...START, hfov: lens, hfovTarget: lens,
      vYaw: 0, vPitch: 0, drift: true, ease: 1, touched: 0,
    }
    setListOpen(!phone)
    setHint(true)
    setFailed(false)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return undefined
    returnTo.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      const el = returnTo.current
      if (el && el.focus) el.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open || !rootRef.current) return
    const first = rootRef.current.querySelector('[data-autofocus]')
    if (first) first.focus()
  }, [open])

  /* A phone turned on its side is a different lens. The reference viewer
     does this too, and for the same reason: 100 degrees across a portrait
     slot is a fisheye, 50 across a landscape one is a keyhole. Only while
     the view is untouched, so it never undoes somebody's own zoom. */
  useEffect(() => {
    if (!open) return undefined
    const fit = () => {
      const v = view.current
      if (!v.drift) return
      v.hfovTarget = window.innerWidth < 760 ? HFOV.narrow : HFOV.wide
    }
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [open])

  /* The browser's own full screen, on top of the overlay's. The overlay
     already fills the window; this takes the window's furniture too. */
  useEffect(() => {
    if (!open) return undefined
    const sync = () => setIsFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    }
  }, [open])

  const toggleFull = useCallback(() => {
    const el = rootRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    else el.requestFullscreen?.().catch(() => {})
  }, [])

  /* ---- looking around ---------------------------------------------------- */
  /* Every interaction lands here, and the timestamp it leaves is what the
     frame loop counts stillness from. */
  const stop = useCallback(() => {
    const v = view.current
    v.drift = false
    v.ease = 0
    v.touched = performance.now()
    setHint(false)
  }, [])

  const look = useCallback((dYaw, dPitch) => {
    stop()
    const v = view.current
    v.yaw += dYaw
    v.pitch = clamp(v.pitch + dPitch, -PITCH_LIMIT, PITCH_LIMIT)
    v.vYaw = 0
    v.vPitch = 0
  }, [stop])

  /* Degrees, not a multiplier, so a notch moves the lens by the same amount
     wherever it already is. */
  const zoom = useCallback((degrees) => {
    stop()
    const v = view.current
    v.hfovTarget = clamp(v.hfovTarget + degrees, HFOV.min, HFOV.max)
  }, [stop])

  const reset = useCallback(() => {
    const phone = window.innerWidth < 760
    const lens = phone ? HFOV.narrow : HFOV.wide
    /* The lens eases back rather than cutting, so reset reads as the room
       returning rather than as a different room. */
    view.current = {
      ...START, hfov: view.current.hfov, hfovTarget: lens,
      vYaw: 0, vPitch: 0, drift: false, ease: 0, touched: performance.now(),
    }
    setHint(false)
  }, [])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    stop()
    const v = view.current
    v.vYaw = 0
    v.vPitch = 0
    const r = e.currentTarget.getBoundingClientRect()
    drag.current = {
      id: e.pointerId,
      x: e.clientX - r.left, y: e.clientY - r.top,
      yaw: v.yaw, pitch: v.pitch, t: performance.now(),
    }
  }

  /* The reference's mapping, not a linear one. An arctangent of the pointer's
     position across the frame is what keeps the spot under the cursor under
     the cursor: the room is being dragged, rather than being spun at a rate
     set by how far the mouse has gone. Linear is only right at the middle of
     the frame, and the error at the edges is exactly where a drag starts to
     feel like it is running away from you. */
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const v = view.current
    const r = e.currentTarget.getBoundingClientRect()
    const w = Math.max(r.width, 1)
    const h = Math.max(r.height, 1)
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    const deg = 180 / Math.PI
    v.yaw = deg * (Math.atan(d.x / w * 2 - 1) - Math.atan(x / w * 2 - 1)) * (v.hfov / 90) + d.yaw

    /* The vertical field the lens actually gives on this frame's shape. */
    const vfov = 360 * Math.atan(Math.tan(v.hfov / 360 * Math.PI) * h / w) / Math.PI
    v.pitch = clamp(
      deg * (Math.atan(y / h * 2 - 1) - Math.atan(d.y / h * 2 - 1)) * (vfov / 90) + d.pitch,
      -PITCH_LIMIT, PITCH_LIMIT,
    )

    d.t = performance.now()
    v.touched = d.t
  }

  const endDrag = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    const v = view.current
    /* Let go after holding still and nothing should coast. Without this the
       speed the loop last measured is still sitting there, and a considered
       release throws the room. The reference allows 15ms. */
    if (performance.now() - d.t > 15) {
      v.vYaw = 0
      v.vPitch = 0
    }
    v.touched = performance.now()
    drag.current = null
  }

  /* Registered by hand: React's onWheel is passive, and a passive listener
     cannot stop the page behind the overlay scrolling with the zoom. */
  useEffect(() => {
    const el = canvasRef.current
    if (!open || !el) return undefined
    const onWheel = (e) => {
      e.preventDefault()
      /* deltaY is in pixels, lines or pages depending on the device and the
         browser, and a trackpad sends a stream of small ones where a mouse
         sends one big one. Normalise to notches and cap the single event, so
         a hard flick is fast without being a jump cut. */
      const per = e.deltaMode === 1 ? 3 : e.deltaMode === 2 ? 1 : 100
      const notches = clamp(e.deltaY / per, -2, 2)
      zoom(notches * ZOOM_STEP)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open, zoom])

  /* Pinch, which pointer events give us only as two live pointers. */
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches
      pinch.current = {
        d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        hfov: view.current.hfovTarget,
      }
      drag.current = null
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinch.current) {
      e.preventDefault()
      const [a, b] = e.touches
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      stop()
      /* Pinch is the one gesture that is honestly a ratio: the lens follows
         the fingers directly rather than through the easing, or it lags
         under your hand. */
      const next = clamp(pinch.current.hfov * (pinch.current.d / Math.max(d, 1)), HFOV.min, HFOV.max)
      view.current.hfovTarget = next
      view.current.hfov = next
    }
  }
  const onTouchEnd = () => {
    pinch.current = null
    view.current.touched = performance.now()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
      else onClose()
      return
    }
    const step = e.shiftKey ? 12 : 5 /* degrees */
    const map = {
      ArrowLeft: () => look(-step, 0),
      ArrowRight: () => look(step, 0),
      ArrowUp: () => look(0, step * 0.7),
      ArrowDown: () => look(0, -step * 0.7),
      '+': () => zoom(-ZOOM_STEP),
      '=': () => zoom(-ZOOM_STEP),
      '-': () => zoom(ZOOM_STEP),
      '0': reset,
    }
    const fn = map[e.key]
    if (fn) { e.preventDefault(); fn() }
    if (e.key !== 'Tab') return
    const items = rootRef.current?.querySelectorAll(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    )
    if (!items || !items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  if (!open || !mounted) return null

  const chip = (on) => (on ? s.chip + ' ' + s.chipOn : s.chip)

  return createPortal(
    <div ref={rootRef} className={s.root} role="dialog" aria-modal="true"
      aria-label={name + ' in panorama — a 360 degree room laid with this tile'}
      onKeyDown={onKeyDown}>

      <canvas
        ref={canvasRef}
        className={s.canvas}
        tabIndex={0}
        role="img"
        aria-label={
          'A six metre room laid with ' + name + ' in ' + colour + ', ' + size +
          '. Drag, or use the arrow keys, to look around.'
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {failed && (
        <p className={s.failed}>
          This view needs WebGL, which this browser has turned off. The full range is
          laid out at 3 Pelle Street, Mitchell.
        </p>
      )}

      <button type="button" data-autofocus className={s.back} onClick={onClose}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
          strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        <span>Return</span>
      </button>

      {/* The brand drops out on a phone rather than being ellipsed: a chip
          reading "CAPITAL TILES · CRET…" names neither of them. */}
      <p className={s.name}><span className={s.brand}>{brand} · </span>{name}</p>

      <div className={s.tools}>
        <button type="button" className={s.tool} onClick={reset} aria-label="Reset the view">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" />
          </svg>
        </button>
        <button type="button" className={s.tool} onClick={toggleFull}
          aria-label={isFull ? 'Leave full screen' : 'Full screen'} aria-pressed={isFull}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {isFull
              ? <path d="M9 3v6H3M15 21v-6h6" />
              : <path d="M3 9V3h6M21 15v6h-6" />}
          </svg>
        </button>
      </div>

      <div className={listOpen ? s.panel + ' ' + s.panelOpen : s.panel}>
        <button type="button" className={s.handle} onClick={() => setListOpen((v) => !v)}
          aria-expanded={listOpen} aria-controls="pano-ranges"
          aria-label={listOpen ? 'Hide the range options' : 'Show the range options'}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={listOpen ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} />
          </svg>
        </button>

        <div className={s.panelBody} id="pano-ranges">
          {/* Everything that changes the picture lives in one panel. The
              surface toggle used to float in the opposite corner, which cost
              a phone a second thing overlapping its floor. */}
          <p className={s.legend}>Surface</p>
          <div className={s.chips}>
            {SURFACES.map((o) => (
              <button key={o.value} type="button" className={chip(surface === o.value)}
                aria-pressed={surface === o.value} onClick={() => setSurface(o.value)}>
                {o.label}
              </button>
            ))}
          </div>

          {colours.length > 0 && (
            <>
              <p className={s.legend}>Colour</p>
              <ul className={s.swatches}>
                {colours.map((c) => {
                  const on = c === colour
                  const face = panorama?.[c]?.texture
                  return (
                    <li key={c}>
                      <button type="button" className={on ? s.swatch + ' ' + s.swatchOn : s.swatch}
                        aria-pressed={on} onClick={() => onChoose('colour', c)}>
                        {/* The swatch is the face photo itself, so the choice
                            is made on the stone rather than on a word. */}
                        <span className={s.swatchFace}>
                          {face && <img src={face} alt="" loading="lazy" />}
                        </span>
                        <span className={s.swatchName}>{c}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          {sizes.length > 0 && (
            <>
              <p className={s.legend}>Size</p>
              <div className={s.chips}>
                {sizes.map((z) => (
                  <button key={z} type="button" className={chip(z === size)}
                    aria-pressed={z === size} onClick={() => onChoose('size', z)}>{z}</button>
                ))}
              </div>
            </>
          )}

          {/* A square tile laid the other way up is the same tile, so the
              control that claims to turn it only appears where it changes
              anything. */}
          {!square && (
            <>
              <p className={s.legend}>Lay</p>
              <div className={s.chips}>
                <button type="button" className={chip(rotated)} aria-pressed={rotated}
                  onClick={() => setRotated((r) => !r)}>
                  {rotated ? 'Lengthways' : 'Across'}
                </button>
              </div>
            </>
          )}

          <p className={s.note}>
            An indicative render from the range&rsquo;s own face photo — grout, lighting
            and batch shade will move it. The full range is laid out at 3 Pelle Street,
            Mitchell.
          </p>
        </div>
      </div>

      {hint && !failed && (
        <p className={s.hint} aria-hidden="true">Drag to look around · scroll to zoom</p>
      )}
    </div>,
    document.body,
  )
}
