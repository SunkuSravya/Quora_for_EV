import React from 'react';
import '../css/Quora.css';
import Feeds from './Feeds';

import Navbar from './Navbar';


function Quora() {
    return (
        <div className="quora">
            
         <Navbar /> 
            <div className="quora_content">
              <Feeds />
             </div>  
        </div>
    );
}

export default Quora;
