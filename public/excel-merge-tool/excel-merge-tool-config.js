/**
 * Created by seunggabi on 2017. 2. 26..
 */

let EMT = {};
EMT.CONFIG = {
	WRITE_NAME: {
		NONE: "merge.xlsx",
		CONFLICT: "merge_conflict.xlsx",
		LIST: "merge_list.xlsx",
		LOG: "log.txt"
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
		isDuplication: false
	},
	STATISTICS: {
		TIME: {
			NONE: 1,
			CONFLICT: 1,
			ALL: 2,
			LIST: 1
		}
	},

	MSG: {
		START: "EMT Start",
		END: "EMT End",
		MODE: "Mode is {{MODE}}",
		LOAD: "Load File: {{FILE}}",
		MERGE: "TO {{TO}} FROM {{FROM}}",
		SHEET_READ: "Read Sheet: {{SHEET}}",
		SHEET_CONFLICT: "{{SHEET}} Sheet ==> Conflict",
		SHEET_NEW: "{{SHEET}} Sheet ==> New",
		CELL_CONFLICT: "{{CELL}} Cell ==> Conflict ({{VALUE}})",
		WRITE: "Write File: {{FILE}}",
		READ: "Read File: {{FILE}}",
		NEW: "New Item({{INDEX}}): {{ITEM}}",
		COUNT: "{{SHEET}} New Data Count: {{SIZE}}",

		UNDEFINED: "사용되지 않는 모드입니다.",
		READ_START: "업로드된 파일을 분석을 시작합니다.",
		READ_END: "분석이 완료되었습니다.<br/>(작업예상 시간: {{TIME}}초)",
		INPUT_FAULT: "올바르지 않은 입력입니다.",
		FIELD_RANGE: "필드 범위가 입력되지 않았습니다. 자동으로 감지하시겠습니까?(자동감지 높이 1)",
		DROP_MESSAGE: "여기에 엑셀파일을 드롭하세요!",

		OUTPUT_MODE: "추출방식",
		IGNORE_LENGTH: "무시길이",
		SAVE: "저장",
		REMOVE: "비우기",
		LOG: "로그생성",
		DUPLICATE: "중복허용",
		RANGE: "필드영역범위"
	},
	LOG_TYPE: {
		SYSTEM: "SYSTEM  ",
		MERGE: "MERGE   ",
		NEW: "NEW     ",
		CONFLICT: "CONFLICT"
	},

	WORKER_FILE: {
		READ: "excel-merge-tool/excel-merge-tool-worker-read.js",
		WRITE: "excel-merge-tool/excel-merge-tool-worker-write.js"
	},
	WORKER_TYPE: {
		READ: "READ",
		WRITE: "WRITE"
	},

	USING_CHECK: "$",
	SPLITTER: "{{$s$}}",
	REG: {
		RANGE: /[A-Z]+\d+:[A-Z]+\d+/g,
		COL: /[A-Z]+/g,
		ROW: /\d+/g,
		CELL: /[A-Z]\d+/g,
		ENTER: /[\r\n]+/g,
		ENTER_START: /^[\r|\n]/g,
		ENTER_END: /[\r|\n]$/g
	},
	KEY: {
		RANGE: "!ref",
	},

	XLSX: {
		READ_OPTION: {
			type: "binary",
			cellStyles: true
		},
		WRITE_OPTION: {
			type: "binary"
		},
		TYPE: {
			STRING: "s",
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
			},
			fill: {
				bgColor: {
					rgb: "FFFFFF"
				},
				fgColor: {
					rgb: "FFFFFF"
				}
			}
		}
	}
};

if(typeof module !== "undefined") {
	module.exports = EMT.CONFIG;
}