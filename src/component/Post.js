
import React, { useEffect, useState } from 'react'
import '../css/Post.css'
import  Avatar  from '@material-ui/core/Avatar'
import  ArrowDownwardOutlinedIcon from  '@material-ui/icons/ArrowDownwardOutlined'
import  ArrowUpwardOutlinedIcon from  '@material-ui/icons/ArrowUpwardOutlined'
import  RepeatOutlinedIcon  from '@material-ui/icons/RepeatOutlined'
import  ChatBubbleOutlineOutlinedIcon  from '@material-ui/icons/ChatBubbleOutlineOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import  MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import Modal from 'react-modal'
import '../css/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../features/questionSlice'
import db from '../firebase'
import { selectUser } from '../features/userSlice'
import firebase from 'firebase'

Modal.setAppElement("#root");

function Post( {Id, question, image, timestamp, quoraUser} ) {

    const user = useSelector(selectUser)
    const [openModal, setOpenModal] = useState(false)
   const dispatch= useDispatch()
    const questionId = useSelector(selectQuestionId)
    const questionName = useSelector(selectQuestionName)
    const [answer, setAnswer] =useState("")
  
    const [getAnswer, setGetAnswer]=useState([])

    useEffect(() => {
        if(questionId){
            db.collection('questions').doc(questionId).collection('answer').orderBy("timestamp", 'desc').onSnapshot(snapshot => setGetAnswer(snapshot.docs.map((doc)=> ({
                id: doc.id,
                answers:doc.data()
            }))))
        }
    })


    const handleAnswer = (e) => {
        e.preventDefault()

        if(questionId){
            db.collection('questions').doc(questionId).collection('answer').add({
                questionId: questionId,
                timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user
            })
            console.log(questionId, questionName)
            setAnswer("")
            setOpenModal(false)
        }
    }

    return (
        <div className="post"
        onClick = {() => dispatch(setQuestionInfo({
            questionId: Id,
            questionName: question
        }))}
        >
             <div className="post_info">
                 <Avatar
                 src = {quoraUser.photo}
                 />
                 <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
                 <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
             </div>
             <div className="post_body">
                 <div className="post_question">
                     <p>{question}</p>
                     <button onClick = {() => setOpenModal(true)} 
                      className="post_btnAnswer">Answer</button>
                     <Modal
                 isOpen = {openModal}
                 onRequestClose = {() => setOpenModal(false)}
                 shouldCloseOnOverlayClick={false}
                 style={{
                  overlay:{
                      width:700,
                      height:600,
                      backgroundColor:"rgba(0,0,0,0.8)",
                      zIndex:"1000",
                      top:"50%",
                      left:"50%",
                      marginTop:"-300px",
                      marginLeft:"-350px",
                  },
              }}
                 >
                   <div className="modal_question">
                    <h1>{question}</h1>
                    <p>
                        asked by&nbsp; <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email} </span> {""}
                        &nbsp;on&nbsp; <span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                    </p>
                  </div> 
                     <div className="modal_answer">
                         <textarea
                         required
                         value ={answer}
                         onChange = {(e) => setAnswer(e.target.value)}
                         placeholder="Enter Your Answer"
                         type="text" />
                     </div> 
                     <div className="modal_button">
                     <button onClick={() => setOpenModal(false)} className="cancle">cancel</button>
                     <button onClick= {handleAnswer} type="submit" className="add">Add Answer</button>
                     </div>
                 </Modal>
                 </div>
                 <div className='post_answer'>
                  {getAnswer.map(({ id, answers }) => (
                    <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
                      {Id === answers.questionId ? (
                        <span><br />
                          {answers.answer}
                          <br />
                          <span style={{position: "absolute", color: "gray", fontSize: "small", display: "flex", right: "0px", marginBottom: "10px",}}>
                            <span style={{ color: "#b92b27" }}>answered by &nbsp;
                              {answers.user.displayName ? answers.user.displayName : answers.user.email}{" "}
                              on{" "}
                              {new Date(answers.timestamp?.toDate()).toLocaleString()}
                            </span><br/>
                          </span>
                        </span>
                      ) : ( "" )}
                    </p>
                  ))}
                </div><br/>
                 <img src={image}
                 alt="" />
             </div>  
             <div className="post_footer">
                 <div className="post_footerAction">
                     <ArrowUpwardOutlinedIcon />
                     <ArrowDownwardOutlinedIcon />
                 </div>

                 <RepeatOutlinedIcon />
                  <ChatBubbleOutlineOutlinedIcon /> 
                 <div className="post_footerLeft">
                     <ShareOutlinedIcon />
                     <MoreHorizOutlinedIcon />

                 </div>

             </div>
        </div>
    )
}

export default Post
