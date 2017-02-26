var express = require("express");
var EMT = require("../public/javascripts/excel-merge-tool.js");
var router = express.Router();

if(typeof require !== "undefined") XLSX = require("xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });

	var wb1 = XLSX.readFile("files/t1.xlsx");
	var wb2 = XLSX.readFile("files/t2.xlsx");
	var wb3 = EMT.mergeSheets(wb1, wb2);
	XLSX.writeFile(wb3, "files/t3.xlsx");

});

module.exports = router;
