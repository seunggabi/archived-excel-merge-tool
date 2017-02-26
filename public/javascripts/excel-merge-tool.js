/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	mergeSheets: function(wb1, wb2) {
		var wb = wb1;

		var index = -1;
		for(var s in wb2.Sheets) {
			index++;
			if(wb1.Sheets.hasOwnProperty(s)) {
				continue;
			} else {
				wb1.Sheets[s] = wb2.Sheets[s];
				wb1.SheetNames.push(wb2.SheetNames[index]);
			}
		}

		return wb;
	},
};