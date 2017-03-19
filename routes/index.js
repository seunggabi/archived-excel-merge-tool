if(typeof require !== "undefined") {
	express = require("express");
	EMT = require("../public/javascripts/excel-merge-tool.js");
	fs = require("fs");
	XLSX = require("xlsx");
	EMT.init();
}

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	var fileNames = fs.readdirSync("./files/");
	fileNames = EMT.selectXLSX(fileNames);
	var wbList = EMT.readFiles(fileNames);
	EMT.writeFile(wbList);

	res.render("index", { title: "Excel Merge Tool" });
});

module.exports = router;
