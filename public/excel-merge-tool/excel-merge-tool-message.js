//noinspection JSAnnotator
/**
 * Created by seunggabi on 2017. 4. 10..
 */

EMT.MSG = {
	$progress: null,

	init: function() {
		this.$progress = $("#progressMessage");
	},

	setProgress: function(msg) {
		this.$progress.text(msg);
	}
};