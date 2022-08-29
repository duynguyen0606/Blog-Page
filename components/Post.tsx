import Link from 'next/link'
import Image from 'next/image'

export type PostType = {
    slug: string,
    frontMatter: {
        title: string,
        date: string,
        excerpt: string,
        coverImage: string
  }
}

export default function Post({ post }: {post: PostType}) {
  return (
    <div className='card'>
      <Image src={post.frontMatter.coverImage} alt='' width={500} height={300}/>

      <div className='post-date'>Posted on {post.frontMatter.date}</div>

      <h3>{post.frontMatter.title}</h3>

      <p>{post.frontMatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className='btn'>Read More</a>
      </Link>
    </div>
  )
}