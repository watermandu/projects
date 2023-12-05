sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("zbcsdt120.controller.Main", {
            onInit: function () {

            },
            onSearch: function () {
              let input1 = this.byId("idcomboBox").getValue(); 
              let aFilter = [];
      
              if (input1) {
                aFilter.push(
                  new Filter({
                    path: "ShippingCd",
                    operator: "Contains",
                    value1: input1,
                  })
                );
              }
              // if(input1)
      
      
              this.byId("idSDT120Table").getBinding("items").filter(aFilter);

            },

            onSelectionChange: function (oEvent) {
              let odataModel = this.getOwnerComponent().getModel();
              // let sPath = oEvent.getSource().getBindingContext().sPath;
              let sPath = oEvent.getParameters().listItem.getBindingContextPath();
      
              odataModel.read(sPath, {
                urlParameters: {
                  $expand: "ZBC_SDT070Set",
                },
                success: function (oReturn) {
                  debugger;
                  let oModel = new JSONModel(oReturn);
                  // this.byId("idStatusTable").setModel(oModel,"Dialog"); // 구버전
                  sap.ui.getCore().setModel(oModel, "Dialog"); //   신문법
                }.bind(this),
                error: function (oError) {
                  alert("테이블 정보 갖고오기 실패");
                },
              });
              // let oDialog = this.byId("idDialog"); // 구문법
              let oDialog = sap.ui.getCore().byId("idDialog"); // 신문법
              if (!oDialog) {
                // 신문법
                Fragment.load({
                  name: "zbcsdt120.view.Fragment.Item",
                  type: "XML",
                  controller: this,
                })
      
                  // 구문법
                  // this.loadFragment({
                  //   name: "zbappt010.view.fragment.Item", //load 할 파일 경로
                  //   type: "XML",
                  // })
      
                  .then(
                    function (oDialog) {
                      oDialog.open();
                    }.bind(this)
                  );
              } else {
                oDialog.open();
              }
            },
      
            onClose: function () {
              // this.byId("idDialog").close();
              sap.ui.getCore().byId("idDialog").close();
            },

        });
    });
