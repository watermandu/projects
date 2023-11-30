sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/f/library",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    JSONModel,
    FilterOperator,
    Filter,
    Fragment,
    fioriLibrary,
    MessageBox,
    MessageToast
  ) {
    "use strict";

    return Controller.extend("zbcsd110.controller.Main", {
      onInit: function () {},
      onSearch: function (oEvent) {
        let value = this.byId("idcomboBox1").getValue();
        let value2 = this.byId("idcomboBox2").getValue();

        let aFilter = [];

        if (value) {
          aFilter.push(
            new Filter({
              path: "CustomCd",
              operator: "Contains",
              value1: value,
            })
          );
        }

        if (value2) {
          aFilter.push(
            new Filter({
              path: "BussNm",
              operator: "Contains",
              value1: value2,
            })
          );
        }

        this.byId("idsdt110Table").getBinding("items").filter(aFilter);
      },
    });
  }
);
