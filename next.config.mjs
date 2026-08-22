/** @type {import('next').NextConfig} */
const nextConfig = {
  // No server-side image optimizer in this deployment: serve local images as-is.
  images: { unoptimized: true },
}
export default nextConfig
