import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
      //  In React we use camel case when we need to use dash this line below. 'justify-content' = 'justifyContent'
      //  'flex-end' => to the right 
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>  
          <p onClick={() => onRouteChange('signout') } className='f3 link dim black underline pa3 pointer'> Sign Out </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>  
          <p onClick={() => onRouteChange('signin') } className='f3 link dim black underline pa3 pointer'> Sign In </p>
          <p onClick={() => onRouteChange('register') } className='f3 link dim black underline pa3 pointer'> Register </p>
        </nav>          
      );
    }   
}
//  Make Navigation component usable in App.js
export default Navigation;