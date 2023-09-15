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
        return Controller.extend("exam.exprogramb09.controller.Main", {

          
          onInit: function () {
            
            },
            onSearch:function (params) {
              debugger;
              let oTable = this.getView().byId("idTable")
              let oSel = this.getView().byId("idCombo").getSelectedKey();
              let oInput = this.getView().byId("idInput").getValue();
              let oFilter = [];
              let aFliter1 = new Filter({
                path: 'Currcode',
                operator: 'EQ',
                value1: oSel
              });
              let aFliter2 = new Filter({
                path: 'Carrname',
                operator: FilterOperator.Contains,
                value1: oInput
              });
              
              if(oSel && oInput)
              {
                oFilter.push(aFliter1);
                oFilter.push(aFliter2);
              }else if(oSel){
                oFilter.push(aFliter1);
              }else if(oInput){
                oFilter.push(aFliter2);
              }
              else{
                oTable.getBinding("items").filter();
              }
              oTable.getBinding("items").filter(oFilter);
              
            },
            onDialog:function (oEvent) {
              let oDataModel = this.getOwnerComponent().getModel();
              this.getView().setModel(new JSONModel(),'view')
              let oModel = this.getView().getModel('view');
                let oParam= oEvent.getSource().getParent().getBindingContext().getObject().Carrid
                debugger;
                let sPath = oDataModel.createKey('/carrierSet',{
                  Carrid : oParam});
                  
                  oDataModel.read(sPath,{
                    urlParameters: { $expand: "to_Item" },
                  success: function (oReturn) { 
                    alert("데이터 찾기 성공");
                    let data = oReturn.to_Item;
                    // let data = oReturn.to_Item.results;
                    oModel.setProperty('/',data);
                    
                  },  
                  error:function (oError) {
                    alert("실패");
                  }
                  
                });
                debugger;
                // this.getView().bindElement(sPath);
////////////////////////////////////////////////////
              let oDialog = this.byId('idDialog');
                if(oDialog) {
                    oDialog.open();
                }else{
                  this.loadFragment({
                    name: "exam.exprogramb09.view.Fragment.detail",
                    type: "XML"
                }).then(function(oDialog) {
                  oDialog.open();
                }.bind(this));
                }
                let aFliter1 = new Filter({
                  path: 'Carrid',
                  operator: 'EQ',
                  value1: oParam
                });

                

            },
            onClose: function (oEvent) {
              let oButton = oEvent.getSource();
              let oDialog = oButton.getParent();
              oDialog.close();
          },

          onClick:function(params) {
            debugger;
            let oSel = this.getView().byId("idTable");
            let key = oSel.getSelectedContexts()[0].sPath.slice(13,15);
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('Routedetail',{
              param:key,
            });
            
          }
        });
    });
