import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type CommentListPageType = {
    comments: any
}

function CommentsListPage(props: CommentListPageType) {
    const router = useRouter()
    const [commentsList, setCommentsList] = useState([])
    console.log('router query:' , router.query)
    const postId = router.query?.postId

    useEffect(() => {
        if(!postId) return

        (async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            const data = await response.json() 

            setCommentsList(data)
        })()
    }, [postId])

    const handleNextComments = () => {
        router.push({
            pathname: 'comments',
            query: {
                postId: (Number(postId) || 1) + 1
            }
        }, undefined, {shallow: true})
    }
    
    return ( 
        <>
            <ul>
                {commentsList.map((comment: any) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>

            <button onClick={handleNextComments} >Next comments</button>
        </>
     );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    console.log('getStaticprops');
    return {
        props: {
        }
    }
}

export default CommentsListPage;