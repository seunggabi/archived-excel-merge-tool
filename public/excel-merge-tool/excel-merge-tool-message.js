//noinspection JSAnnotator
/**
 * Created by seunggabi on 2017. 4. 10..
 */

if(global && !global.EMT) global.EMT = {};

global.EMT.MSG = module.exports = {
	$progress: null,

	start: function() {
		this.$progress = global.$("#progressMessage");
	},

	setProgress: function(msg) {
		//alert(msg);
		//his.$progress.text(msg);
	}
};