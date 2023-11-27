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
        let kkey = oEvent.getParameters().listItem.getBindingContext().sPath;
        this.getView()
          .getModel()
          .read(kkey + "/ZBA_PPT100Set", {
            success: function (oReturn) {
              debugger;
              var oModel22 = new JSONModel(oReturn);
              this.getView()
                .byId("idFlattenedDataset")
                .setModel(oModel22, "data");
            }.bind(this),
          });

        let aFilter = [];

        if (key) {
          aFilter.push(
            new Filter({
              path: "Horder",
              operator: "Contains",
              value1: key,
            })
          );
        }

        this.byId("idFlattenedDataset").getBinding("data").filter(aFilter);
      },
    });
  }
);

// // let odataModel = this.getOwnerComponent().getModel();
// // let sPath = oEvent.getParameters().listItem.getBindingContextPath();
// let oModel = this.getView().getModel();
// let sPath = oModel.createKey("/ZBA_PPT090Set", {
//   Horder: oParam.paramCust,
// });

// oModel.read(sPath, {
//   urlParameters: {
//     $expand: "ZBA_PPT100Set",
//   },
//   success: function (oReturn) {
//     let oModel = new JSONModel(oReturn.ZBA_PPT100set);
//     this.byId("productsTable2").setModel(oModel, "PPT100"); // 구버전
//     // sap.ui.getCore().setModel(oModel, "PPT100"); //   신문법
//   }.bind(this),
//   error: function (oError) {
//     alert("테이블 정보 갖고오기 실패");
//   },
// });

// var queryMap = this.getView().byId("idAddr").getText()

//     naver.maps.Service.geocode({
//         query: queryMap
//     }, function(status, response) {
//         if (status !== naver.maps.Service.Status.OK) {
//             return alert('Something wrong!');
//         }
//         var result = response.v2, // 검색 결과의 컨테이너
//         items = result.addresses; // 검색 결과의 배열
//         return this.onMap(items);
// }.bind(this))
