import React, { Component } from 'react';
import './App.css';
import WordList from "./WordList";
import WordCloud from 'react-d3-cloud';
import TagList from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    const m = new TagList();
    this.state = { 
      items: m, 
      text: '', 
      order: true, 
      cloud: null 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createCloud = this.createCloud.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const arr = this.state.text.split(" ");
    this.state.items.addWords(arr);
    this.setState({
      text: ''
    });
  }

  handleOrderChange(e) {
    if (this.state.order) {
      this.state.items.orderAlphabetically();
    } else {
      this.state.items.orderTemporally();
    }
    this.setState({
      order: !this.state.order
    })
  }

  createCloud(event) {
    const fontSizeMapper = word => word.value * 15;
    this.setState({cloud: <WordCloud
      data={this.state.items.tagList}
      fontSizeMapper={fontSizeMapper}
      font={"sans-serif"}
    />})
  }
  
  render() {
    return (
      <div>
        <h1>Word Cloud</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">Ajouter un nouveau mot</label> <br />
            <input id="new-todo" onChange={this.handleChange} value={this.state.text} />
            <button> Ajouter #{ this.state.items?this.state.items.listLength() + 1:0 }</button>
          </form>
          <input type="button" 
            onClick={this.handleOrderChange} 
            defaultValue={this.state.order?"Ordre alphabetique":"Ordre temporel"} />
          <WordList items={this.state.items} />
          <button onClick={this.createCloud} value="Create cloud">Create Cloud</button>
          {this.state.cloud? this.state.cloud: <div></div>}
        </div>
      </div>
      );
    }
  }
  
  export default App;
  