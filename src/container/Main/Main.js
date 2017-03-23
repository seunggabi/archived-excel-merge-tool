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

  onDrop = (files) => {
    this.setState({
      files: Array.concat(this.state.files, files)
    });
  }

  openFile = () => {
    const { files, writeMode = 'ALL', logMode, ignoreLength, fieldRange, isDuplication } = this.state
    const binaryFiles = []
    const options = {
      write_mode: writeMode,
      log_mode: logMode,
      ignore_length: ignoreLength,
      field_range: fieldRange,
      isDuplication,
    }

    EMT.init(options)

    files.forEach((file, index) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        const binaryFile = new EMT.binaryFile(file.name, reader.result)
        binaryFiles.push(binaryFile)

        if (index === files.length - 1) {
          this.writeFile(binaryFiles)
        }
      }
      reader.readAsBinaryString(file)
    })
  }

  writeFile = (binaryFiles) => {
    const wbList = EMT.readBinaryFiles(binaryFiles)
    const binaryFileList = EMT.writeBinaryFile(wbList)
    // const binaryLog = EMT.getLogBinaryFile()

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf;
    }

    binaryFileList.forEach((binaryFile) => {
      FileSaver.saveAs(new Blob([s2ab(binaryFile.binary)], { type: 'application/octet-stream' }), binaryFile.fileName)
    })
    // if (binaryLog) FileSaver.saveAs(new Blob([s2ab(binaryLog)], { type: 'application/octet-stream' }), 'log.txt')
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
