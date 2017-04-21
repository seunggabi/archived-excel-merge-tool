/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/dist/cpexcel.js");
importScripts("/dist/jszip.js");
importScripts("/dist/xlsx.js");
importScripts("/excel-merge-tool/excel-merge-tool-config.js");
importScripts("/excel-merge-tool/excel-merge-tool-data.js");
importScripts("/excel-merge-tool/excel-merge-tool-log.js");
importScripts("/excel-merge-tool/excel-merge-tool-message.js");
importScripts("/excel-merge-tool/excel-merge-tool-statistics.js");
importScripts("/excel-merge-tool/excel-merge-tool-util.js");
importScripts("/excel-merge-tool/excel-merge-tool.js");

function callback(event) {
	var options = event.data.options;
	var binaryFiles = event.data.binaryFiles;
	var binaryFileList;

	EMT.TOOL.init(options);
	writeFile = (binaryFiles) => {
		var wbList = EMT.TOOL.readBinaryFiles(binaryFiles);
		binaryFileList = EMT.TOOL.writeBinaryFile(wbList);
	};
	writeFile(binaryFiles);
	postMessage({
		binaryFileList: binaryFileList
	});
}

(function() {
	this.onmessage = callback;
})()