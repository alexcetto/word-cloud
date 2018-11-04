import React, {Component} from 'react';

class Downloader extends Component {
    _downloadTxtFile = () => {
        var element = document.createElement("a");
        var file = new Blob(["word;number\n"+this.props.data], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = this.props.filename+".csv";
        element.click();
      }
      
      render() {
        return (
          <div>
            <button onClick={this._downloadTxtFile} className="btn"><span>Download</span></button>
          </div>
        );
      }
}

export default Downloader;