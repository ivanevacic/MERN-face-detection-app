import React, { Component } from 'react';
//  Imported Navigation component
import Navigation from './Components/Navigation/Navigation';
//  Imported Logo component
import Logo from './Components/Logo/Logo';
//  Imported ImageLinkForm component
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
//  Imported Rank component
import Rank from './Components/Rank/Rank';
//  Imported FaceRecognition component
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
//  Import react-particles-js URL:'https://www.npmjs.com/package/react-particles-js'
import Particles from 'react-particles-js';
//  Import 'clarifai' URL:'https://www.clarifai.com/developer/'
import Clarifai from 'clarifai';
//  Imported App.js styling
import './App.css';

//  Clarifai API key 
const app = new Clarifai.App({
  'apiKey': 'e505bb6a9fbe4e65886915c57181243d'
});

//  particlesOptions object is defind here so our render method is not so messy
const particlesOptions = {
  //  Config example URL:'https://vincentgarreau.com/particles.js/'
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  //  Need to create state of input so it changes when user updates it..etc.. 
  constructor() {
    super(); // So we are able to use 'this'
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});  //  Get currently typed value from input
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})  //  imageURL is what ever the input is,that way we can pass it to 'Facerecognition' as props
    //  https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, //  https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
        this.state.input) //  URL we put in input field
      .then(
    function(response) {
      console.log(response[]);  //  Currently here for testing purposes
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
      {/* We can add Particles 'component' here,because it's on background  */}
        <Particles className='particles' params={ particlesOptions }/>
        <Navigation />
        <Logo />       
        <ImageLinkForm 
          onInputChange={ this.onInputChange }   /* Passed as a 'prop'  */
          onButtonSubmit={ this.onButtonSubmit } />  
        <Rank />       
        <FaceRecognition imageUrl={ this.state.imageUrl }/> 
      </div>
    );
  }
}

export default App;
