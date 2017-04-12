//noinspection JSAnnotator
/**
 * Created by seunggabi on 2017. 4. 10..
 */
module.exports = {
	CONFIG: require("./excel-merge-tool-config.js"),
	UTIL: require("./excel-merge-tool-util.js"),
	$: require("jquery"),
	$progress: null,

	init: function() {
		this.$progress = this.$("#progressMessage");
	},

	setProgress: function(msg) {
		alert(msg);
		//his.$progress.text(msg);
	}
};