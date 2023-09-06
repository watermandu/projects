/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync/project_b09_05/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
