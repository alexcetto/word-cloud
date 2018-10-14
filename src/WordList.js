import React, { Component } from 'react';

class WordList extends Component {
  
  constructor(props) {
    super(props);
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
  }
  
  displayWords(item) {
    return <li 
      key={item.text} 
      id={item.text}>
        {item.text}, {item.value} 
        <input className={item.text} type="button" onClick={this.decrease} value="-"></input>
        <input className={item.text} type="button" onClick={this.increase} value="+"></input>
    </li>
  }
  
  displayList() {
    const list = [];
    for (let i=0; i < this.props.items.listLength(); i++) {
      const item = this.props.items.tagList[i]
      list.push(this.displayWords(item))
    }
    return list;
  }
  
  decrease(key) {
    const keyToAddress = key.target.className
    this.setState({
      lol:"lol"
    })
    this.props.items.decrementWord(keyToAddress)
  }
  
  increase(key) {
    this.setState({
      lol:"lol"
    })
    const keyToAddress = key.target.className
    this.props.items.addWord(keyToAddress)
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