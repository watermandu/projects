/*global QUnit*/

sap.ui.define([
	"sync/project_b09_04/controller/Name.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Name Controller");

	QUnit.test("I should test the Name controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
