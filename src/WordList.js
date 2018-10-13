import React, { Component } from 'react';

class WordList extends Component {
  
  constructor(props) {
    super(props);
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
  }
  
  displayWords(item, number) {
    return <li 
    key={item} 
    id={item}>
    {item}, {number} 
    <input className={item} type="button" onClick={this.decrease} value="-"></input>
    <input className={item} type="button" onClick={this.increase} value="+"></input>
    </li>
  }
  
  displayList() {
    const list = [];
    for (var [key, value] of this.props.items) {
      list.push(this.displayWords(key, value))
    }
    return list;
  }
  
  decrease(key) {
    const keyToAddress = key.target.className
    this.setState({
      lol:"lol"
    })
    this.props.items.set(keyToAddress, this.props.items.get(keyToAddress)-1)
  }
  
  increase(key) {
    this.setState({
      lol:"lol"
    })
    const keyToAddress = key.target.className
    this.props.items.set(keyToAddress, this.props.items.get(keyToAddress)+1)
  }
  
  render() {
    return (
      <ul>
      {this.displayList()}
      </ul>
      );
    }
  }
  
  export default WordList;