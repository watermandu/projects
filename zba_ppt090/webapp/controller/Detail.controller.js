sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, MessageToast, JSONModel, Filter) {
    "use strict";

    return Controller.extend("zbappt090.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
        this.getOwnerComponent().getModel().refresh(true);
      },

      _patternMatched: function (oEvent) {
        // 파라미터로 받은 값 가져오기
        var oParam = oEvent.getParameters().arguments;
        this.getView().bindElement(`/ZBA_PPT090Set('${oParam.paramCust}')`);

        this.getOwnerComponent()
          .getModel()
          .read(`/ZBA_PPT090Set('${oParam.paramCust}')` + "/ZBA_PPT100Set", {
            success: function (oReturn) {
              debugger;
              var oModel2 = new JSONModel(oReturn);
              this.getView().byId("productsTable2").setModel(oModel2, "item");
              this.getView().byId("idChart").setModel(oModel2, "item");
            }.bind(this),
          });
      },

      onListItemPress2: function (oEvent) {
        let table = this.getView().byId("productsTable2");
        var key = oEvent
          .getParameters()
          .listItem.getBindingContext()
          .getObject().Horder;
        //SELECT 선택한 자재번호
        let select = oEvent
          .getSource()
          .getSelectedContexts()[0]
          .getModel()
          .getData().results[
          oEvent.getSource().getSelectedContextPaths()[0].slice(9)
        ].Matnr;

        let aFilter = [];

        if (select) {
          aFilter.push(
            new Filter({
              path: "Matnr",
              operator: "Contains",
              value1: select,
            })
          );
        }

        this.byId("idFlattenedDataset").getBinding("data").filter(aFilter);
      },

      handleClose: function () {
        this.getOwnerComponent()
          .byId("Main")
          .byId("flexibleColumnLayout")
          .setLayout("OneColumn");
      },
    });
  }
);
