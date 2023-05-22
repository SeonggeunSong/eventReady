/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
//import mainImage form './LINES_Main.jpg';
import mainUI from './LINES_Main.jpg';
import mainDEJ from './LINES_DEJ.jpg';
import mainLG from './BG_LG_Color.jpg';
import React from 'react';

function App(){

/*  const MainimageStyle = {
    width: 'auto',
    height: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // position: 'absolute',
    objectPosition: 'center',
    display: 'block',
    margin: 0,
    padding: 0,
    border: 'none',
  };
*/
  const containerStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
  };

   return(
    <div style={containerStyle}>
      <button onClick={initiativeOpenURL} className="whatsNew_button"> What's new?  </button>

    </div>
  ); 

}


export default App;
