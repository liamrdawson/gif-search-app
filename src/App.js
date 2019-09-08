import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import NoGifs from './Components/NoGifs';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=nX9Sgh1nFxcjD94hGwaXDjEyC6m9BxoF&q=${query}&limit=24&offset=0&rating=G&lang=en`)
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false
      });
    })
    .catch(error => {
      console.log('Oh no! Something went wrong.', error);
    });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs}/>
          }
        </div>
      </div>
    );
  }
}
