import React from 'react';
//  Import styling for this component
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {  //  Destructure 'onInputChange' from 'props' so we can use it here
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures.'}
      </p>
      <div className='center'> 
      {/* className=form => ImageLinkForm.css -> .form  */}
        <div className='form pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' onChange={ onInputChange }/> {/* onChange event that listens for onInputChange */}
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-mid-gray' onClick={ onButtonSubmit }>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;