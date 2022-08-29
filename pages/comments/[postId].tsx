import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type CommentListByPostIdType = {
    comments: Array<any>
}

function CommentListByPostId(props: CommentListByPostIdType) {
    const router = useRouter()

    console.log('router query:', router.query);

    useEffect(() => {
        (async () => {
            
        })()
    }, [])
    
    return ( 
12
    );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=1`)
    const data = await response.json()
    

    return {
        props : {
            comments: []
        }
    }
}

export default CommentListByPostId;