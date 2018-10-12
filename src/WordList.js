import React, { Component } from 'react';

class WordList extends Component {

    displayWords(item) {
        console.log(item);
        return <li 
            key={item[0]} 
            className={"weight"+item[1]}>
            {item[0]}
        </li>
    }

    render() {
      return (
        <ul>
          {[...this.props.items].map((item) => (
              this.displayWords(item)
          ))}
        </ul>
      );
    }
  }

  export default WordList;