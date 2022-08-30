import fs from 'fs'
import matter from 'gray-matter';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import path from 'path'
import {marked} from 'marked'
import Image from 'next/image';

type postTypeDetail = {
    slug: string,
    frontMatter: {
        title: string,
        date: string,
        excerpt: string,
        coverImage: string
    },
    content: string
}


const PostPage = ({
    frontMatter: { title, date, coverImage },
    slug,
    content,
  }: postTypeDetail) => {

    return (
        <>
            <Link href='/'>
              <a className='btn btn-back'>Go Back</a>
            </Link>
            <div className='card card-page'>
              <h1 className='post-title'>{title}</h1>
              <div className='post-date'>Posted on {date}</div>
              <Image src={coverImage} alt='' width={undefined} height={undefined} />
              <div className='post-body'>
                  <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
              </div>
            </div>
        </>
    )

}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))
  
    const paths = files.map((filename) => ({
      params: {
        slug: filename.replace('.md', ''),
      },
    }))
  
    return {
      paths,
      fallback: false,
    }
  }
  
export const getStaticProps: GetStaticProps= async(context : GetStaticPropsContext) =>  {
  const slug = context.params?.slug
  const markdownWithMeta = fs.readFileSync(
      path.join('posts', slug + '.md'),
      'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)

  return {
      props: {
          frontMatter,
          slug,
          content,
      },
  }
}

export default PostPage;