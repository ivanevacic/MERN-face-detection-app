import React, { Component } from 'react';
//  Imported Navigation component
import Navigation from './Components/Navigation/Navigation';
//  Imported Logo component
import Logo from './Components/Logo/Logo';
//  Imported ImageLinkForm component
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
//  Imported Rank component
import Rank from './Components/Rank/Rank';
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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);  //  Get currently typed value from input
  }

  onButtonSubmit = () => {
    //  https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
      {/* We can add Particles 'component' here,becouse it's on background  */}
        <Particles className='particles'
              params={ particlesOptions }
            />
        <Navigation />
        <Logo />       
        <ImageLinkForm 
          onInputChange={ this.onInputChange }   /* Passed as a 'prop'  */
          onButtonSubmit={ this.onButtonSubmit } />  
        <Rank />
        {/*
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
