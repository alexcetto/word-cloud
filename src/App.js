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
      cloud: null,
      sessionName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createCloud = this.createCloud.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
  }

  componentDidMount() {
    let firstSession = this.getFirstSession();
    if (!firstSession) {
      firstSession = this.makeid();
    }
    const data = localStorage.getItem(firstSession);

    if (data) {
      this.state.items.importWords(data);
    }
    this.setState({
      sessionName: firstSession
    });
  }
  
  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  getFirstSession() {
    const keys = Object.keys(localStorage)
    return keys[0]
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
    localStorage.setItem(this.state.sessionName, this.state.items.dumpList());
  }

  handleOrderChange(e) {
    if (this.state.order) {
      this.state.items.orderAlphabetically();
    } else {
      this.state.items.orderTemporally();
    }
    this.setState({
      order: !this.state.order
    });
  }

  checkSession(name) {
    const keys = Object.keys(localStorage)
    for (let i=0; i<keys.length; i++) {
      if (keys[i] === name) {
        console.log(keys[i])
        return localStorage.getItem(keys[i]);
      }
    }
    return null;
  }

  handleChangeSession(e) {
    if (e.key === 'Enter') {
      const lastSession = this.checkSession(e.target.value);
      // TODO: If not equal we change the session name and we load the corresponding data
      // AND TODO: make the export
      console.log(lastSession)
      if (lastSession != null && e.target.value !== this.state.sessionName) {
        this.state.items = new TagList();
        this.state.items.importWords(lastSession);
      }
      
      this.setState({
        sessionName: e.target.value,
        items: this.state.items
      });
    }
  }

  createCloud(event) {
    const fontSizeMapper = word => word.value * 15;
    this.setState({cloud: <WordCloud
      data={this.state.items.tagList}
      fontSizeMapper={fontSizeMapper}
      font={"sans-serif"}
    />})
    localStorage.setItem(this.state.sessionName, this.state.items.dumpList());
  }

  reset(event) {
    if (!window.confirm('Voulez vous supprimer la session?')) {
      return;
    }
    this.setState({
      items: new TagList()
    });
    localStorage.removeItem(this.state.sessionName)
  }
  
  render() {
    return (
      <div>
        <header>
          <div id="subHeader">
            <label htmlFor="sessionName">Session</label>
            <input id="sessionName" onKeyDown={this.handleChangeSession} defaultValue={this.state.sessionName} />
            <button onClick={this.reset} value="Reset App" className="red btn"><span>Effacer session actuelle</span></button>
          </div>
          
        </header>
        <h1>Word Cloud</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">Ajouter un nouveau mot</label> <br />
            <input id="new-todo" onChange={this.handleChange} value={this.state.text} />
            <button> Ajouter #{ this.state.items?this.state.items.listLength() + 1:0 }</button>
          </form>
          <input type="checkbox" id="id-name--1" name="set-name" className="switch-input" onClick={this.handleOrderChange} />
	        <label htmlFor="id-name--1" className="switch-label">
            <span className={this.state.order?"toggle--on":"toggle--off"}>{this.state.order?"Alpha":"Date"}</span>
          </label>
          <WordList items={this.state.items} />
          <button onClick={this.createCloud} className="btn"><span>Créer leNuage</span></button>
          {this.state.cloud? this.state.cloud: <div></div>}
        </div>
      </div>
      );
    }
  }
  
  export default App;
  