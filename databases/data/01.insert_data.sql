-- INSERT MISSION DATA
INSERT INTO missions (mission_name)
VALUES ("오토"), ("수동"), ("세미오토"), ("DCT"), ("CVT")
;

-- INSERT MISSION DATA
INSERT INTO fuels (fuel_name)
VALUES ("가솔린"), ("디젤"), ("LPG")
;

INSERT INTO options(option_name)
VALUES ("네비게이션"), ("선루프"), ("통풍시트"), ("디지털키"), ("후방카메라"), ("블랙박스")
;

INSERT INTO cars (car_id_number, brand, car_number, model_name, model_year, driving_distance, price_original, price_used, fuel_id, mission_id)
VALUES
("WBAJC3104JD032226", "BMW",	"48하8111",	"BMW X3 (G01) xDrive 20d xLine",	2018,	51000,	81000000, 43200000,	2,	1),
("SEGJC3104JD032227", "Audi", "140하1856",	"아우디 A6(C8) 40 TDI Premium",	2020,	56000,	82000000, 43000000,	2,	1),
("VDCJC3104JD032228", "볼보",	"201누9290",	"볼보 뉴 XC90",	2017,	81147,	97000000, 67000000,	1,	1),
("VDCJC3104JD032229", "볼보",	"202나9291",	"볼보 뉴 XC90",	2017,	100000,	97000000, 62000000,	1,	1),
("VDCJC3104JD032230", "볼보",	"203너9292",	"볼보 뉴 XC90",	2017,	110000,	97000000, 59000000,	1,	1),
("VDCJC3104JD032231", "볼보",	"204노9293",	"볼보 뉴 XC90",	2017,	130000,	97000000, 52000000,	1,	1),
("WBA8T310XJGB15885", "BMW", "60가2905",	"BMW 320d GranTurismo WLTP", 2018, 36347, 77000000, 34500000, 2, 1),
("WBATX7106JLB50873", "BMW", "285너7696",	"BMW X3 xDrive 30d", 2018, 76236, 85000000, 55500000, 2, 1)
;