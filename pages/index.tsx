import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post, { PostType } from '../components/Post'

type PostListType = Array<PostType>

const Home = ({posts} : {posts : PostListType}) => {
  
  return (
    <div className='posts'>
      {posts.map((post: PostType, index: number) => (
        <Post post={post} key={index} />
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(fileName => {
    const slug = fileName.replace('.md', '')
    const markDownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8')
    const {data: frontMatter} = matter(markDownWithMeta) 
    
    return {
      slug,
      frontMatter
    }
  })
  
  return {
    props: {
      posts: posts
    }
  }
}

export default Home
