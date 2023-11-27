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

        // read key를 위한 변수
        // let odataModel = this.getOwnerComponent().getModel();
        // let sPath = oEvent.getParameters().listItem.getBindingContextPath();

        // odataModel.read(sPath, {
        //   urlParameters: {
        //     $expand: "ZBA_PPT100Set",
        //   },
        //   success: function (oReturn) {
        //     let oModel = new JSONModel(oReturn);
        //     // this.byId("productsTable2").setModel(oModel, "PPT100"); // 구버전
        //     sap.ui.getCore().setModel(oModel, "PPT100"); //   신문법
        //   }.bind(this),
        //   error: function (oError) {
        //     alert("테이블 정보 갖고오기 실패");
        //   },
        // });

        var oRouter = this.getOwnerComponent().getRouter();
        var getParam = oEvent
          .getParameters()
          .listItem.getBindingContext()
          .getObject().Horder;

        oRouter.navTo("RouteDetail", {
          paramCust: getParam,
        });
      },
    });
  }
);
