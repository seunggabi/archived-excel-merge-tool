var express = require("express");
var EMT = require("../public/javascripts/excel-merge-tool.js");
var router = express.Router();

if(typeof require !== "undefined") XLSX = require("xlsx");


var wb1 = XLSX.readFile("files/t1.xlsx");
var wb2 = XLSX.readFile("files/t2.xlsx");
var wb3 = XLSX.readFile("files/t3.xlsx");

var wbList = [wb1, wb2, wb3];
var wb = EMT.mergeSheets(wbList);
XLSX.writeFile(wb, "files/t.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
