import React from 'react';
//  https://www.npmjs.com/package/react-tilt
import Tilt from 'react-tilt';
//  Import styling for this component
import './Logo.css';
//  Import logo picture URL:'https://icons8.com/icon/48534/mind-map'
import AIimage from './AI-icon.png';  

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> 
        {/* Import logo and set padding top 5px */}
          <img style={{ paddingTop: '5px' }}alt='logo' src={ AIimage }/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;