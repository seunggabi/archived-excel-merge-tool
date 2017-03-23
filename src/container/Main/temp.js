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
            <div><img className={css.xlsxImg} src='./xlsxImg.png'/></div>
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
            <div className={cx(css.optionTa, css.isOn)}>
              <div>
                <label>출력모드</label>
                <input type='radio' name='mode'>ALL</input>
                <input type='radio' name='mode'>NONE</input>
                <input type='radio' name='mode'>CONFLICT</input>
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

            <div className='css.optionTab'>
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

        {/* <!-- tip gif -->*/}
        <div className={css.tipGif}>
        </div>
      </div>