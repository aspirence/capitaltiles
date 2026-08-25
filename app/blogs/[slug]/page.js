import { notFound } from 'next/navigation'
import BlogArticle from '@/components/sections/BlogArticle'
import { POSTS } from '@/components/blogData'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Capital Tiles & Flooring`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  /* the next three in publication order, wrapping past the end */
  const i = POSTS.indexOf(post)
  const more = [...POSTS.slice(i + 1), ...POSTS.slice(0, i)].slice(0, 3)

  return <BlogArticle post={post} more={more} />
}
