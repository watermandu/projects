sap.ui.define([
  "sap/ui/core/mvc/Controller",

],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
      "use strict";

      return Controller.extend("projectb0906.controller.main", {
        onNavMain: function (oEvent) {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo('Routemain',{},true);
        }


      });
  });
