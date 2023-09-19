sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/json/JSONModel"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,Filter,FilterOperator,JSONModel) {
      "use strict";      
      return Controller.extend("exam.exprogramb09.controller.Detail2", {
        formatter: {
          fnDateString: function (oDate) {
            if(oDate){
              let oDateTimeInstance =
              sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
              });
            return oDateTimeInstance.format(oDate);
            }
          
          },
        },
        
        onInit: function () {
          let oRouter = this.getOwnerComponent().getRouter(); 
                
          oRouter.getRoute('Routedetail').attachPatternMatched(this._patternMached,this);
          },
          _patternMached:function(oEvent) {
            debugger;
            let oDataModel = this.getOwnerComponent().getModel();
            this.getView().setModel(new JSONModel(),'view2')
            let oModel = this.getView().getModel('view2');
            let oParam= oEvent.getParameters().arguments;
            // let oModel = this.getView().getModel();
            debugger;
            let sPath = oDataModel.createKey('/carrierSet',{
              Carrid: oParam.param              
            });
            
            oDataModel.read(sPath,{ 
              urlParameters:{
                '$expand':'to_Flight'
              },
              success: function (oReturn) { 
                debugger;
                let data = oReturn.to_Flight;
                oModel.setProperty('/',data);
              },  
              error:function (oError) {
                console.log('error');
              }
            } );
            this.getView().bindElement(sPath);

          }
          
      });
  });
