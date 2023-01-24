/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/excel-merge-tool/excel-merge-tool-worker-load.js");

callback = (event) => {
	let options = event.data.options;
	let binaryFiles = event.data.binaryFiles;

	EMT.TOOL.init(options);

	this.postMessage({
		type: EMT.CONFIG.WORKER_TYPE.WRITE,
		binaryFileList: writeFile(binaryFiles)
	});
};

writeFile = (binaryFiles) => {
	let wbList = EMT.TOOL.readBinaryFiles(binaryFiles);

	this.postMessage({
		type: EMT.CONFIG.WORKER_TYPE.READ,
		time: EMT.STATISTICS.getTime()
	});

	return EMT.TOOL.writeBinaryFile(wbList);
};

(function() {
	this.onmessage = callback;
})();