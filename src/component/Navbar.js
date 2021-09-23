import React, { useState } from 'react';
import HomeIcon from  '@material-ui/icons/Home';
// import  FeaturedPlayListOutlinedIcon  from '@material-ui/icons/FeaturedPlayListOutlined';
// import  AssignmentTurnedInOutlinedIcon  from '@material-ui/icons/AssignmentTurnedInOutlined';
import  PeopleAltOutlinedIcon  from '@material-ui/icons/PeopleAltOutlined';
// import  NotificationsOutlinedIcon  from '@material-ui/icons/NotificationsOutlined';
import  SearchIcon from '@material-ui/icons/Search';
import  Avatar from '@material-ui/core/Avatar';
// import  LanguageIcon  from '@material-ui/icons/Language';
import  Button  from '@material-ui/core/Button';
import '../css/Navbar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import Modal from 'react-modal'
import firebase from 'firebase'
import logo from './auth/CST-logo.png'

import { ExpandMore, Link } from '@material-ui/icons';
import { Input } from '@material-ui/core';

function Navbar() {
  const user=useSelector(selectUser)
  const [openModal, setOpenModal]=useState(false)
  const [input, setInput] =useState("")
  const [inputUrl, setInputUrl]=useState("")
  const [contactModal, setContactModal]=useState(false)
  const [inputC, setInputC] = useState("")


   

  const handleQuestion = (e) => {
    e.preventDefault()

    setOpenModal(false)
    db.collection('questions').add({
      question: input,
      imageUrl: inputUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user 
    });
    setInput("")
    setInputUrl("")
  };



  const handleContact = (e) => {
    e.preventDefault()

    setContactModal(false)

    if(inputC===""){
      window.alert("Please enter some feedback...");
            setContactModal(true);
    }
    else{

    db.collection('contact').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
      feedback: inputC,
    });
    setInputC("")
    window.alert("Query sent! Thank you!");
  }
    
  };



  




  
    return (
        <div className='qHeader'>
            
            <div className="qHeader_logo">
                <img
                src={logo}
                alt=""
                />

            </div>

            <div className="qHeader_icons">
                <div className="qHeader_icon">
                  <HomeIcon />
                </div>
                
            </div>
            <div className="qHeader_input">
              
                <SearchIcon />
                <input type="text" placeholder="Search Quora"  />
             </div>
             <div className="qHeader_Rem">
                 
                <Button onClick ={() => setOpenModal(true)}>Add Question</Button>
                <Button onClick ={() => setContactModal(true)}>Contact Us</Button>
                <Button onClick={() => auth.signOut()}>Logout</Button> 
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
                   <div className="modal_title">
                     <h5>Add Question</h5>
                     <h5>Share Link</h5>
                   </div> 
                     <div className="modal_info">
                         <Avatar 
                         className="avatar"
                         src={user.photo}
                         />
                         <p>{user.displayName ? user.displayName : user.email} &nbsp;asked&nbsp; </p>
                         <div className="modal_scope">
                           <PeopleAltOutlinedIcon />
                           <p>Public</p>
                           <ExpandMore />
                         </div>
                     </div>
                     <div className="modal_field">
                       <Input 
                       required
                       value ={input}
                       onChange= {(e) => setInput(e.target.value)}
                       type = "text"
                       placeholder="Enter your question here..."
                       />
                     
                     <div className="modal_fieldLink">
                       <Link />
                       <input 
                        value ={inputUrl}
                        onChange= {(e) => setInputUrl(e.target.value)}
                       type = "text"
                       placeholder="Optional: include a link that gives context"
                       />
                     </div>
                     </div> 
                     <div className="modal_buttons">
                     <button onClick={() => setOpenModal(false)} className="cancle">close</button>
                     <button onClick = {handleQuestion} type="submit" className="add">Add Question</button>
                     </div>
                     

                 </Modal>




                 <Modal
                 isOpen = {contactModal}
                 onRequestClose = {() => setContactModal(false)}
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
                   <div className="modal_title">
                     <h5>Contact Us</h5> 
                   </div>

                    <div className="contact_info">  
                     <p>For all enquiries, please contact us using the form below.</p>
                    </div>

                     <div className="modal_info">
                         <Avatar 
                         className="avatar"
                         src={user.photo}
                         />
                         <p>{user.displayName ? user.displayName : user.email}  </p>
                         
                     </div>
                     <div className="modal_field">
                       <Input 
                       required
                       value ={inputC}
                       onChange= {(e) => setInputC(e.target.value)}
                       type = "text"
                       placeholder="How can we help you?"
                       />
                     
                    
                     </div> 
                     
                     <div className="modal_buttons">
                     <button onClick={() => setContactModal(false)} className="cancle">close</button>
                     <button onClick = {handleContact} type="submit" className="add">Submit</button>
                     </div>
                     

                  

                 </Modal>
                     
             </div>
            
            
        </div>
    );
}

export default Navbar;
