sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrudb09.controller.main", {
            onInit: function () {
              let oDataModel = this.getOwnerComponent().getModel();

            }, 
            onRead:function (oEvent) {//read Get 요청
              let oDataModel = this.getOwnerComponent().getModel();
              let sSel = this.getView().byId("idProductsTable").getSelectedContexts();
              let value = sSel[0].getProperty('MB_ID');
              
              let sPath = oDataModel.createKey('/MemberSet',{
                MB_ID : value
                // , MB_NM: '라라라'
              });

              oDataModel.read(sPath,{
                success:function(oReturn){
                  let oModel = new sap.ui.model.json.JSONModel(oReturn);
                  this.getView().setModel(oModel,'list');
              }.bind(this),
              error:function(oError){
                console.log('Error 발생');
              }
            });
            },
            onCreate:function (oEvent) {//create Post 요청
            
            },
            onUpdate:function(oEvent){//update PUT 요청

            },
            onDelete:function(oEvent){//delete Delte 요청 

            },
        });
    });
