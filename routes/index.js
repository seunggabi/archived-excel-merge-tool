var express = require("express");
var router = express.Router();

if(typeof require !== "undefined") XLSX = require("xlsx");
var workbook = XLSX.readFile("files/test.xlsx");

/* GET home page. */
router.get("/", function(req, res, next) {
	console.dir(XLSX);
	console.log(workbook);
	res.render("index", { title: "Express" });
});

module.exports = router;
