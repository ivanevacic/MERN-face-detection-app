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
//  Imported SignIn component
import SignIn from './Components/SignIn/SignIn';
//  Imported Register component
import Register from './Components/Register/Register';
//  Import react-particles-js URL:'https://www.npmjs.com/package/react-particles-js'
import Particles from 'react-particles-js';
//  Imported App.js styling
import './App.css';

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

//  initial state variable
const initialState = {
      input: '',
      imageUrl: '',
      //  box state contains values we receive from API => see function(response) below
      box: {},
      //  Keeps track of where we are on the page
      route: 'signin',
      isSignedIn: false,
      //  User profile
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  //  Need to create state of input so it changes when user updates it..etc.. 
  constructor() {
    super(); // So we are able to use 'this'
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  //  Calculations for box placement on picture based on values we get from API
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.width);
    console.log(width, height);
    return {
      //  This object is going to fill up 'box' state
        //  Calculations for position of face on the picture based on API data
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});  //  Get currently typed value from input
  }

  //  Moved Clarifai to backend
 onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});  //  imageURL is what ever the input is,that way we can pass it to 'Facerecognition' as props
    fetch('https://calm-castle-45403.herokuapp.com/', { //  https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://calm-castle-45403.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

  //  Dynamically change route 
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
  }

  render() {
    //  Destructuring,because our code is simpler
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ particlesOptions }/>   
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />     
        { route === 'home' 
            ? <div>
                {/* Needs to be wrapped in '<div>' otherwise we get err */}
                  <Logo />
                  <Rank name={ this.state.user.name } entries={ this.state.user.entries }/>       
                  <ImageLinkForm 
                    onInputChange={ this.onInputChange }   /* Passed as a 'prop'  */
                    onButtonSubmit={ this.onButtonSubmit } 
                  />               
                  {/*  Added box and imageUrl props  */}
                  <FaceRecognition box={box} imageUrl={ imageUrl } />
                </div> 
            : (
              route === 'signin'
              ? <SignIn loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>
              : <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>
            )
        }
      </div>
    );
  }
}


export default App;
