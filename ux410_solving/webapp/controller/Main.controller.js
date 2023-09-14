sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

  
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
              let oData = {typeList:[{type:"bar"},{type:"column"},{type:"line"},{type:"donut"}]}
              let oModel = new JSONModel(oData);
              this.getView().setModel(oModel,'typeList');

            },
            onSearch:function (params) {
              let DataSet = this.getView().byId("idFlattenedDataset");
              let oSel = this.getView().byId("idCombo").getSelectedKey();
              let aFliters = [];
              let oFilter = new Filter({
                path: 'OrderID',
                operator: 'EQ',
                value1: oSel
              });
              if (!oSel){
                DataSet.getBinding("data").filter();
              }else{
                aFliters.push(oFilter);
                DataSet.getBinding("data").filter(aFliters);
              };
            

              /////////////
              let idViz = this.getView().byId("idVizFrame");
              idViz.setVizType(this.getView().byId("idCombo2").getSelectedKey());

            },
            onNavDetial:function (params) {
              
              let ID = params.getParameters().data[0].data.OrderID
              let oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo('RouteDetail',{
                param: ID
              });
            }
          
        });
    });
