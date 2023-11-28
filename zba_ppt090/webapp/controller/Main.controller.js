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

    return Controller.extend("zbappt090.controller.Main", {
      onInit: function () {
        let oModel = new JSONModel();
        sap.ui.getCore().setModel(oModel, "view");
      },

      onListItemPress: function (oEvent) {
        // 2개 Column으로 초기화
        this.getOwnerComponent()
          .byId("Main")
          .byId("flexibleColumnLayout")
          .setLayout("TwoColumnsMidExpanded");

        var oRouter = this.getOwnerComponent().getRouter();
        var getParam = oEvent
          .getParameters()
          .listItem.getBindingContext()
          .getObject().Horder;

        oRouter.navTo("RouteDetail", {
          paramCust: getParam,
        });
      },

      onSearch: function () {
        let value = this.byId("serch").getValue();

        let aFilter = [];

        if (value) {
          aFilter.push(
            new Filter({
              path: "Horder",
              operator: "Contains",
              value1: value,
            })
          );
        }

        this.byId("productsTable").getBinding("items").filter(aFilter);
      },
    });
  }
);
