import React, { Component } from 'react';
import './App.css';
import WordList from "./WordList";

class App extends Component {
  constructor(props) {
    super(props);
    const m = new Map();
    m.set("start", 1)
    this.state = { items: m, text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Word Cloud</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Ajouter un nouveau mot
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Ajouter #{this.state.items.size + 1}
          </button>
        </form>
        <WordList items={this.state.items} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    let previousValue = this.state.items.get(this.state.text);
    if (previousValue === undefined) {
      previousValue = 0;
    }
    this.setState(state => ({
      items: state.items.set(state.text, previousValue+1),
      text: ''
    }));
  }
}

export default App;
