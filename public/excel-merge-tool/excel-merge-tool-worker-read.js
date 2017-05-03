/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/excel-merge-tool/excel-merge-tool-worker-load.js");

function callback(event) {
	var name = event.data.name;
	var result = event.data.result;

	var binaryFile = new EMT.TOOL.binaryFile(name, result);
	postMessage({
		binaryFile: binaryFile
	});
}

(function() {
	this.onmessage = callback;
})()