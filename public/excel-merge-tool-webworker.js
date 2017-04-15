/**
 * Created by seunggabi on 2017. 4. 15..
 */

function callback(event) {
	var ENT = JSON.parse(event.data.EMT);
	var binaryFiles = JSON.parse(event.data.binaryFiles);
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
			if (binaryFile.fileName !== 'log.txt') {
				binaryFile.binary = s2ab(binaryFile.binary)
			}
			FileSaver.saveAs(new Blob([binaryFile.binary], { type: 'application/octet-stream' }), binaryFile.fileName)
		})
	}
	postMessage(1);
}

(function() {
	this.onmessage = callback;
})()