# Excel Merge Tool
Excel collaboration tool

```javascript
	var fileNames = fs.readdirSync("./files/");
	fileNames = EMT.selectXLSX(fileNames);
	var wbList = EMT.readFiles(fileNames);
	EMT.writeFile(wbList);
```

### input file list: /files/~

### ouput file: /files/output/ {merge.xlsx || merge_conflict.xlsx}
