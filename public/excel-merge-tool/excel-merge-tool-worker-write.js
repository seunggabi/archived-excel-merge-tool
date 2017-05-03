/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/excel-merge-tool/excel-merge-tool-worker-load.js");

function callback(event) {
	var options = event.data.options;
	var binaryFiles = event.data.binaryFiles;
	var binaryFileList = [];

	EMT.TOOL.init(options);
	writeFile = (binaryFiles) => {
		var wbList = EMT.TOOL.readBinaryFiles(binaryFiles);
		postMessage({
			type: "read",
			time: EMT.STATISTICS.getTime(),
		});
		binaryFileList = EMT.TOOL.writeBinaryFile(wbList);
	};
	writeFile(binaryFiles);
	postMessage({
		type: "write",
		binaryFileList: binaryFileList
	});
}

(function() {
	this.onmessage = callback;
})()