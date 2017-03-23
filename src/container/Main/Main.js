import React, { Component } from 'react'
import FileSaver from 'file-saver'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import cx from 'classnames'
import xlsxImg from './xlsxImg.png'
import Dropzone from '../../components/DropZone'
import EMT from '../../excel-merge/excel-merge-tool'
import css from './style.css'

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

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf;
    }

    binaryFileList.forEach((binaryFile) => {
      FileSaver.saveAs(new Blob([s2ab(binaryFile.binary)], { type: 'application/octet-stream' }), binaryFile.fileName)
    })
  }

  render () {
    const { files } = this.state

    return (
      <div>
        {/* <!-- title -->*/}
        <h1 className={css.title}>
          Excel Merge Tool
        </h1>

        {/* <!-- dropZone -->*/}
        <Dropzone className={css.dropzone} onDrop={this.onDrop}>
          { files.map((file, index) => <img key={index} src={file.preview} width={200} />)}
          {/* <!-- dropItem -->*/}
          <div className={css.dropItem}>
            <div><img className={css.xlsxImg} src={xlsxImg} /></div>
            <label className={css.fileName}>
              test.xlsx
            </label>
          </div>
        </Dropzone>

        {/* <!-- optionTab -->*/}
        <div className={css.tabWrapper}>
          <div className={css.tabHeader}>
            <div className={cx(css.optionTabTitle, css.isOn)}>
              MERGE
            </div>
            <div className={css.optionTabTitle}>
              LIST
            </div>
          </div>
        

          <div className={css.tabBody}>
            <div className={cx(css.optionTab, css.isOn)}>
              <div>
                <label>출력모드</label>
                <input type='radio' name='mode' /> ALL
                <input type='radio' name='mode' /> NONE
                <input type='radio' name='mode' /> CONFLICT
              </div>
              <div>
                <label>충돌길이제한</label>
                <input type='text' />
              </div>
              <div>
                <label>로그</label>
                <input type='checkbox' />
              </div>
            </div>

            <div className={css.optionTab}>
              <div>
                <label>중복허용</label>
                <input type='checkbox' />
              </div>
              <div>
                <label>필드셀범위</label>
                <input type='text' />
              </div>
              <div>
                <label>로그</label>
                <input type='checkbox' />
              </div>
            </div>

            <div className={css.tabFooter}>
              <button onClick={this.openFile}>저장</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(css)(Main)
