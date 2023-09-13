sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";
        // let tttt = 'MZM';
        return Controller.extend("exercise01.controller.main", {
            // aaa :'MM',
            onInit: function () {
              // tttt
              // this.aaa  'MM'
              let oData = {rows:[]};
              let oModel= new JSONModel(oData);
              this.getView().setModel(oModel,'list')


            },
            onRandomPress:function(oEvent) {
              let Random = Math.floor(Math.random() * 100) + 1
              let idInput = this.getView().byId("idInput");
              
              //model 
              let oModel = this.getView().getModel('list');
              let list = oModel.getProperty('/rows'); 
              idInput.setValue(Random);


              
            
            
            }
        });
    });
