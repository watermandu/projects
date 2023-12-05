/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zbc_sd110/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
