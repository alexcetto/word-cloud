import { Component } from 'react';

class TagList extends Component {
    constructor(props) {
        super(props);
        this.tagList = [];
        this.word = {
            text: "travail",
            value: 1,
            timeCreated: Date.now()
        }
    }

    trimWords(word) {
        return String(word).replace(/^\s+|\s+$/g, '');
    }

    findWord(word) {
        word = this.trimWords(word)
        for (let i=0; i < this.tagList.length; i++) {
            if (this.tagList[i].text === word) {
                return i;
            }
        }
        return -1;
    }

    orderAlphabetically() {
        this.tagList.sort((a,b) => {
            return (a.text < b.text) ? -1: (a.text > b.text) ? 1: 0;
        });
    }

    orderTemporally() {
        this.tagList.sort((a,b) => {
            return (a.timeCreated < b.timeCreated) ? -1: (a.timeCreated > b.timeCreated) ? 1: 0;
        });
    }

    addWord(word) {
        word = word.toLowerCase()
        const index = this.findWord(word);
        if (index === -1) {
            this.word = {
                text: word,
                value: 1,
                timeCreated: Date.now()
            };
            this.tagList.push(this.word);
        } else {
            this.tagList[index].value += 1;
        }
    }

    addWords(wordsArray) {
        for (let i=0; i < wordsArray.length; i++) {
            this.addWord(wordsArray[i]);
        }
        return this.tagList;
    }

    decrementWord(word) {
        const index = this.findWord(word);
        if (index === -1) {
            return;
        }
        this.tagList[index].value -= 1;
        if (this.tagList[index].value === 0) {
            this.removeWord(word);
        }
    }

    dumpList() {
        return this.tagList.map(word => word.text+"--"+word.value);
    }

    importWords(arr) {
        arr.split(",").map(w => {
            let wObj = w.split("--")
            for (let i=0;i<wObj[1];i++) {
                this.addWord(wObj[0]);
            }
        });
        // this.addWords();
    }

    removeWord(word) {
        const index = this.findWord(word);
        if (index !== -1) {
            this.tagList.splice(index, 1);
        }
    }

    clearList() {
        this.tagList = [];
    }

    listLength() {
        return this.tagList.length;
    }
}

export default TagList;
