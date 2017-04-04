/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	PATH: {
		READ: "files/",
		WRITE: "files/output/"
	},
	WRITE_NAME: {
		NONE: "merge.xlsx",
		CONFLICT: "merge_conflict.xlsx",
		LIST: "merge_list.xlsx"
	},
	EXTENSION: ".xlsx",
	WRITE_MODE: {
		NONE: "NONE",
		CONFLICT: "CONFLICT",
		ALL: "ALL",
		LIST: "LIST"
	},
	DEFAULT: {
		WRITE_MODE: "LIST",
		LOG_MODE: true,
		IGNORE_LENGTH: 0,
		FIELD_RANGE: "",
		isDuplication: true
	},
	MSG: {
		UNDEFINED: "사용되지 않는 모드입니다."
	},
	LOG_TYPE: {
		SYSTEM: "SYSTEM  ",
		MERGE: "MERGE   ",
		NEW: "NEW     ",
		CONFLICT: "CONFLICT"
	},
	USING_CHECK: "$",
	SPLITTER: "{{$s$}}",
	REG: {
		COL: /[A-Z]+/g,
		ROW: /\d+/g,
		CELL: /[A-Z]\d+/g
	},
	KEY: {
		RANGE: "!ref",
		FORMULA: "f"
	},
	CONFLICT_STYLE: {
		fill: {
			bgColor: {
				rgb: "FFFFFF"
			},
			fgColor: {
				rgb: "FFFF00"
			}
		},
		font: {
			color: {
				rgb: "FF0000"
			}
		},
		alignment: {
			vertical: "top",
			wrapText: true
		},
		border: {
			top: {
				style: "thin",
				color: {
					rgb: "000000"
				}
			},
			bottom: {
				style: "thin",
				color: {
					rgb: "000000"
				}
			},
			left: {
				style: "thin",
				color: {
					rgb: "000000"
				}
			},
			right: {
				style: "thin",
				color: {
					rgb: "000000"
				}
			}
		}
	},
	DEFAULT_STYLE: {
		alignment: {
			vertical: "top",
			wrapText: true
		}
	}
};