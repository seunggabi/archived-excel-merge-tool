if(typeof require !== "undefined") {
	express = require("express");
	EMT = require("../public/javascripts/excel-merge-tool.js");
	fs = require("fs");
	XLSX = require("xlsx");
}

var router = express.Router();
var fileNames = fs.readdirSync("./files/");
fileNames = EMT.selectXLSX(fileNames);

var wbList = EMT.readFiles(fileNames);
var wb = EMT.mergeSheets(wbList);
XLSX.writeFile(wb, "./files/output/merge.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
