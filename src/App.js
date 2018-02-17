import React, { Component } from 'react';
//  Imported Navigation component
import Navigation from './Components/Navigation/Navigation';
//  Imported Logo component
import Logo from './Components/Logo/Logo';
//  Imported ImageLinkForm component
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
//  Imported Rank component
import Rank from './Components/Rank/Rank';
//  Imported App.js styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />       
        <ImageLinkForm />
        <Rank />
        {/*
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
