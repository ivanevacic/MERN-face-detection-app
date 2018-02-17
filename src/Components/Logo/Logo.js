import React from 'react';
//  https://www.npmjs.com/package/react-tilt
import Tilt from 'react-tilt';
//  Import styling for this component
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"> 👽 </div>
      </Tilt>
    </div>
  );
}

export default Logo;