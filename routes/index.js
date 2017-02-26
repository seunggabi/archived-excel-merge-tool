var express = require("express");
var router = express.Router();

if(typeof require !== "undefined") XLSX = require("xlsx");
var workbook = XLSX.readFile("files/test.xlsx");
XLSX.writeFile("files/test2.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
