import React, { useEffect, useState } from 'react'
import '../css/Feeds.css'
import db from '../firebase'
import Post from './Post'
import QuoraBox from './QuoraBox'

function Feeds() {
    const [posts, setPosts]=useState([])

    useEffect(() => {
        db.collection('questions').orderBy('timestamp', "desc").onSnapshot(snapshot => setPosts(snapshot.docs.map((docs)=>(({
            id:docs.id,
            question:docs.data()
        })) )))
    }, [])
    return (
        <div className="feed">
            <QuoraBox />
            {
                posts.map(({id, question}) => (
                    <Post
                    key = {id}
                    Id = {id}
                    image = {question.imageUrl}
                    question = {question.question}
                    timestamp = {question.timestamp}
                    quoraUser = {question.user}
                    />
                ))
            }
            
            
            
        </div>
    )
}

export default Feeds
