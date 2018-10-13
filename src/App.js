import React, { Component } from 'react';
import './App.css';
import WordList from "./WordList";
import WordCloud from 'react-d3-cloud';
import * as utils from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    const m = new Map();
    m.set("travail", 1)
    this.state = { items: m, text: '', tagsDisplayed: [], cloud: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createCloud = this.createCloud.bind(this);
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
    this.setState({
      items: utils.addToMap(this.state.items, arr),
      text: ''
    });
  }
  
  addTags() {
    const listOfThings = [];
    for (var [key, value] of this.state.items) {
      const obj = {text:key, value:value};
      listOfThings.push(obj);
    }
    this.setState({
      tagsDisplayed: listOfThings
    });
  }

  createCloud(event) {
    const fontSizeMapper = word => word.value * 15;
    this.addTags()
    this.setState({cloud: <WordCloud
      data={this.state.tagsDisplayed}
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
            <button> Ajouter #{this.state.items.size + 1}</button>
          </form>
          <WordList items={this.state.items} />
          <button onClick={this.createCloud} value="Create cloud">Create Cloud</button>
          {this.state.cloud? this.state.cloud: <div></div>}
        </div>
      </div>
      );
    }
  }
  
  export default App;
  