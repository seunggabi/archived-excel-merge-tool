/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/excel-merge-tool/excel-merge-tool-worker-load.js");

callback = (event) => {
	this.postMessage({
		binaryFile: new EMT.TOOL.binaryFile(event.data.name, event.data.result)
	});
};

(function() {
	this.onmessage = callback;
})();