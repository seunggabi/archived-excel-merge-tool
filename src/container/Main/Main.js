import React, { Component } from "react"
import FileSaver from "file-saver"
import cx from "classnames"
import Worker from "workerjs"

import EMT_CONFIG from "../../../public/excel-merge-tool/excel-merge-tool-config"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Dropzone from "../../components/DropZone"
import DropItem from "../../components/DropItem"

import progressImg from "./progress.gif"
import xlsxImg from "./xlsxImg.png"
import listBefore from "./LIST_before.png"
import listAfter from "./LIST_after.png"
import mergeBefore from "./MERGE_before.png"
import mergeAfter from "./MERGE_after.png"

import css from "./style.css"

class Main extends Component {
	constructor () {
		super();

		this.state = {
			files: [],
			isMerge: true,

			writeMode: EMT_CONFIG.WRITE_MODE.ALL,
			ignoreLength: 0,
			fieldRange: "",
			isDuplication: false,
			logMode: true,
		}
	}

	componentDidMount () {
		this.refs.body.style.display = "block";
	}

	onDrop = (files) => {
		this.setState({
			files: Array.concat(this.state.files, files)
		});
	};

	deleteFile = () => {
		this.setState({
			files: []
		})
	};

	readFile = () => {
		const { files, writeMode, logMode, ignoreLength, fieldRange, isDuplication } = this.state
		const binaryFiles = [];
		const options = {
			write_mode: writeMode,
			log_mode: logMode,
			ignore_length: ignoreLength,
			field_range: fieldRange,
			isDuplication: isDuplication
		};

		if (writeMode === EMT_CONFIG.WRITE_MODE.LIST && !this.checkReg(EMT_CONFIG.REG.RANGE, fieldRange)) {
			if(!confirm(EMT_CONFIG.MSG.FIELD_RANGE)) {
				return;
			}
		}

		files.forEach((file, index) => {
			this.initProgress();
			this.refs.progressWrapper.style.display = "block";
			this.showMessage(EMT_CONFIG.MSG.READ_START);
			const reader = new FileReader();

			reader.onloadend = () => {
				var readWorker = new Worker(EMT_CONFIG.WORKER_FILE.READ);

				readWorker.postMessage({
					name: file.name,
					result: reader.result
				});

				readWorker.onmessage = (event) => {
					this.showMessage(EMT_CONFIG.MSG.READ_START);
					var binaryFile = event.data.binaryFile;
					binaryFiles.push(binaryFile);

					if (index === files.length - 1) {
						var writeWorker = new Worker(EMT_CONFIG.WORKER_FILE.WRITE);
						writeWorker.postMessage({
							options: options,
							binaryFiles: binaryFiles,
						});
						writeWorker.onmessage = (event) => {
							if (event.data.type === EMT_CONFIG.WORKER_TYPE.READ) {
								this.showMessage(EMT_CONFIG.MSG.READ_END.replace("{{TIME}}", event.data.time));
							} else if(event.data.type === EMT_CONFIG.WORKER_TYPE.WRITE) {
								function s2ab(s) {
									const buf = new ArrayBuffer(s.length);
									const view = new Uint8Array(buf);
									for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
									return buf;
								}

								event.data.binaryFileList.forEach((binaryFile) => {
									if (binaryFile.fileName !== EMT_CONFIG.WRITE_NAME.LOG) {
										binaryFile.binary = s2ab(binaryFile.binary)
									}
									FileSaver.saveAs(new Blob([binaryFile.binary], {type: "application/octet-stream"}), binaryFile.fileName)
								});
								this.refs.progressWrapper.style.display = "none";
							}
						}
					}
				};
			};
			reader.readAsBinaryString(file)
		})
	};

	initProgress = () => {
		let body = window.document.body;
		let progressWrapper = this.refs.progressWrapper;
		progressWrapper.style.width = body.scrollWidth + "px";
		progressWrapper.style.height = body.scrollHeight + "px";
	};

	showMessage = (msg) => {
		this.refs.progressMessage.innerHTML = msg;
	};

	handleWriteMode = (event) => {
		this.setState({ writeMode: event.target.value });
	};

	handleIgnoreLength = (event) => {
		const value = event.target.value;

		if (!this.checkReg(EMT_CONFIG.REG.ROW, value)) {
			alert(EMT_CONFIG.MSG.INPUT_FAULT);
			return
		}
		this.setState({ ignoreLength: value });
	};

	handleLogMode = (event) => {
		this.setState({ logMode: event.target.checked });
	};

	handleIsDuplication = (event) => {
		this.setState({ isDuplication: event.target.checked });
	};

	handleFieldRange = (event) => {
		this.setState({ fieldRange: event.target.value });
	};

	onMergeTab = () => {
		this.setState({
			writeMode: EMT_CONFIG.WRITE_MODE.ALL,
			isMerge: true
		})
	};

	onListTab = () => {
		this.setState({
			writeMode: EMT_CONFIG.WRITE_MODE.LIST,
			isMerge: false
		})
	};

	checkReg = (reg, text) => {
		const data = reg.exec(text);
		if (data) {
			return text === data[0];
		}
		return false;
	};

	render () {
		const { files } = this.state;

		return (
			<div ref="body" style={{display: "none"}}>
				<div>
					{/* <!-- title -->*/}
					<h1 className={css.title}>
						Excel Merge Tool
					</h1>

					{/* <!-- dropZone -->*/}
					<div className={css.dropzoneWrapper}>
						<Dropzone className={css.dropzone} onDrop={this.onDrop}>
							<div className={cx(css.dropMessage, (!files.length ? css.isOn : null))}>
								<img className={css.xlsxImg} src={xlsxImg} /><br/>
								{EMT_CONFIG.MSG.DROP_MESSAGE}
							</div>
							{
								files.map(
									(file, index) =>
										<DropItem key={index} name={file.name} css={css} imgSrc={xlsxImg} />
								)

							}
						</Dropzone>
						<div className={css.right}>
							<button onClick={this.deleteFile}>{EMT_CONFIG.MSG.REMOVE}</button>
						</div>
					</div>

					<div className={cx(css.example, (this.state.isMerge ? css.isOn : null))}>
						<img className={css.before} src={mergeBefore} />
						<img className={css.after} src={mergeAfter} />
					</div>
					<div className={cx(css.example, (this.state.isMerge ? null : css.isOn))}>
						<img className={css.before} src={listBefore} />
						<img className={css.after} src={listAfter} />
					</div>

					{/* <!-- optionTab -->*/}
					<div className={css.tabWrapper}>
						<div className={css.tabHeader}>
							<div onClick={this.onMergeTab} className={cx(css.optionTabTitle, this.state.isMerge ? css.isOn : null)}>
								MERGE
							</div>
							<div onClick={this.onListTab} className={cx(css.optionTabTitle, this.state.isMerge ? null : css.isOn)}>
								LIST
							</div>
						</div>
						<div className={css.tabBody}>
							<div className={cx(css.optionTab, this.state.isMerge ? css.isOn : null)}>
								<div>
									<div className={cx(css.inlineBlock, css.verticalTop)}>
										<label>{EMT_CONFIG.MSG.OUTPUT_MODE}</label>
									</div>
									<div className={css.inlineBlock}>
										<input type="radio" name="mode" value={EMT_CONFIG.WRITE_MODE.ALL}
									        checked={this.state.writeMode === EMT_CONFIG.WRITE_MODE.ALL} onChange={this.handleWriteMode} />
											{EMT_CONFIG.WRITE_MODE.ALL}({EMT_CONFIG.WRITE_MODE.NONE} + {EMT_CONFIG.WRITE_MODE.CONFLICT})<br />
										<input type="radio" name="mode" value={EMT_CONFIG.WRITE_MODE.NONE} onChange={this.handleWriteMode} />
											{EMT_CONFIG.WRITE_MODE.NONE}<br />
										<input type="radio" name="mode" value={EMT_CONFIG.WRITE_MODE.CONFLICT} onChange={this.handleWriteMode} />
											{EMT_CONFIG.WRITE_MODE.CONFLICT}
									</div>
								</div>
								<div>
									<label>{EMT_CONFIG.MSG.IGNORE_LENGTH}</label>
									<input type="text" value={this.state.ignoreLength} onChange={this.handleIgnoreLength} />
								</div>
								<div>
									<label>{EMT_CONFIG.MSG.LOG}</label>
									<input type="checkbox" checked={this.state.logMode} onChange={this.handleLogMode} />
								</div>
							</div>

							<div className={cx(css.optionTab, this.state.isMerge ? null : css.isOn)}>
								<div>
									<label>{EMT_CONFIG.MSG.DUPLICATE}</label>
									<input type="checkbox" checked={this.state.isDuplication} onChange={this.handleIsDuplication} />
								</div>
								<div>
									<label>{EMT_CONFIG.MSG.RANGE}</label>
									<input type="text" value={this.state.fieldRange} onChange={this.handleFieldRange} />
								</div>
								<div>
									<label>{EMT_CONFIG.MSG.LOG}</label>
									<input type="checkbox" checked={this.state.logMode} onChange={this.handleLogMode} />
								</div>
							</div>

							<div className={css.tabFooter}>
								<button onClick={this.readFile}>{EMT_CONFIG.MSG.SAVE}</button>
							</div>
						</div>
					</div>
				</div>
				<div ref="progressWrapper" className={css.progressWrapper}>
					<div className={css.progress}>
						<img src={progressImg} />
						<div ref="progressMessage"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(css)(Main)
