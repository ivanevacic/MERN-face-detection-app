import React from 'react';

const Navigation = () => {
  return (
    //  In React we use camel case when we need to use dash this line below. 'justify-content' = 'justifyContent'
    //  'flex-end' => to the right 
    <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>  
      <p> Sign Out </p>
    </nav>
  );
}

//  Make Navigation component usable in App.js
export default Navigation;