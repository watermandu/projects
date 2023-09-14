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

      return Controller.extend("sap.btp.ux410solving.controller.Detail", {
          onInit: function () {
            debugger;
            let oRouter = this.getOwnerComponent().getRouter();          
          oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMached,this);   
          },
          _patternMached:function (oEvent) {
            debugger;
            let oParam= oEvent.getParameters().arguments; // 파라미터로 받은 값들 갖고 오기.
            let oModel = this.getView().getModel(); // ]\345 Model 
            console.log(oParam.param);
            debugger;
            let sPath = oModel.createKey('/Order_Details',{
              OrderID: oParam.param,
              ProductID: oParam.param2
            });

            this.getView().bindElement(sPath);


          }
          
        
      });
  });
