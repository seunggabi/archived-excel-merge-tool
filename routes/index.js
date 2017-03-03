if(typeof require !== "undefined") {
	express = require("express");
	EMT = require("../public/javascripts/excel-merge-tool.js");
	fs = require("fs");
	XLSX = require("xlsx");
}

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	var fileNames = fs.readdirSync("./files/");
	fileNames = EMT.selectXLSX(fileNames);

	var wbList = EMT.readFiles(fileNames);
	var wb = EMT.mergeSheets(wbList);
	XLSX.writeFile(wb, "./files/output/merge.xlsx");

	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
