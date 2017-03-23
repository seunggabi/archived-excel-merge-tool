import React, { Component } from 'react'
import XlsxStyle from 'xlsx-style'
import FileSaver from 'file-saver'
import Dropzone from '../../components/DropZone'
import EMT from '../../excel-merge/excel-merge-tool'

class Main extends Component {
  constructor () {
    super()

    this.state = {
      files: []
    }

  }

  componentDidMount () {
    EMT.init()
  }

  onDrop = (files) => {
    console.log(files[files.length - 1])
    this.setState({
      files: Array.concat(this.state.files, files)
    });
  }

  openFile = () => {
    const { files } = this.state

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        const data = XlsxStyle.read(reader.result, { type: 'binary' })
        const wopts = { bookType: 'xlsx', cellDates: false, bookSST: false, compression: false, type: 'binary' }
        const wbout = XlsxStyle.write(data, wopts);

        function s2ab(s) {
          const buf = new ArrayBuffer(s.length)
          const view = new Uint8Array(buf)
          for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
          return buf;
        }

        FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx')
      }
      reader.readAsBinaryString(file)
    })
  }

  render () {
    const { files } = this.state

    return (
      <div>
        <Dropzone onDrop={this.onDrop} />
        <button onClick={this.openFile}>File Open</button>
        <div>
          <h2>Uploaded {files.length} files</h2>
          <div>
            { files.map((file, index) => <img key={index} src={file.preview} width={200} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
