var express = require("express");
var router = express.Router();

var EMT = require("../public/javascripts/excel-merge-tool.js");

var fs = require("fs");
var fileNames = fs.readdirSync("./files/");

fileNames = EMT.selectXLSX(fileNames);

if(typeof require !== "undefined") XLSX = require("xlsx");

var wbList = EMT.readFiles(fileNames);

var wb = EMT.mergeSheets(wbList);
XLSX.writeFile(wb, "./files/output/merge.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
