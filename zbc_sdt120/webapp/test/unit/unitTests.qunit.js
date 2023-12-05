/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zbc_sdt120/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
