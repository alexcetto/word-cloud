import React, {Component} from 'react';

function string_transcoder (target) {

  this.encodeList = encodings[target];
  if (this.encodeList === undefined) {
      return undefined;
  }

  //Initialize the easy encodings
  if (target === "windows-1252") {
      var i;
      for (i = 0x0; i <= 0x7F; i++) {
          this.encodeList[i] = i;          
      }
      for (i = 0xA0; i <= 0xFF; i++) {
          this.encodeList[i] = i;
      }
  }

}

string_transcoder.prototype.transcode = function (inString) {
  var res = new Uint8Array(inString.length), i;
  for (i = 0; i < inString.length; i++) {
      var temp = inString.charCodeAt(i);
      var tempEncode = (this.encodeList)[temp];
      if (tempEncode === undefined) {
          return undefined; //This encoding is messed up
      } else {
          res[i] = tempEncode;
      }
  }
  return res;
};

const encodings = {

  "windows-1252": {0x20AC:0x80, 0x201A:0x82, 0x0192:0x83, 0x201E:0x84, 0x2026:0x85, 0x2020:0x86, 0x2021:0x87, 0x02C6:0x88, 0x2030:0x89, 0x0160:0x8A, 0x2039:0x8B, 0x0152:0x8C, 0x017D:0x8E, 0x2018:0x91, 0x2019:0x92, 0x201C:0x93, 0x201D:0x94, 0x2022:0x95, 0x2013:0x96, 0x2014:0x97, 0x02DC:0x98, 0x2122:0x99, 0x0161:0x9A, 0x203A:0x9B, 0x0153:0x9C, 0x017E:0x9E, 0x0178:0x9F}     

};

class Downloader extends Component {
    _downloadTxtFile = () => {
        //var string = new TextDecoder("windows-1252").decode("word;number\n"+this.props.data);
        var enc = new string_transcoder("windows-1252");
        var tenc = enc.transcode("word;number\n"+this.props.data); //This is now a Uint8Array
        var element = document.createElement("a");
        var file = new Blob([tenc], {type: 'text/csv', responseType: 'arraybuffer' });
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