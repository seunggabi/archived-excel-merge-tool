var express = require("express");
var EMT = require("../public/javascripts/excel-merge-tool.js");
var router = express.Router();

if(typeof require !== "undefined") XLSX = require("xlsx");

var wb1 = XLSX.readFile("files/test.xlsx");
var wb2 = XLSX.readFile("files/test2.xlsx");
var wb3 = EMT.mergeSheets(wb1, wb2);
XLSX.writeFile(wb3, "files/test3.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
