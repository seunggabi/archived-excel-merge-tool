# Excel Merge Tool
Excel Collaboration Tool

```javascript
	EMT = require("../public/javascripts/excel-merge-tool.js");
	fs = require("fs");
	EMT.init();
	
	var fileNames = fs.readdirSync("./files/");
	fileNames = EMT.selectXLSX(fileNames);
	var wbList = EMT.readFiles(fileNames);
	EMT.writeFile(wbList);
```

### input file list: /files/~

### ouput file: /files/output/ {merge.xlsx || merge_conflict.xlsx}
