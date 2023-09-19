sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Fragment) {
        "use strict";

        return Controller.extend("projectb0910.controller.Main", {
            onInit: function () {

            },
            onButton: function () { 
              let oModel = this.getView().getModel('scarr');
              let oDialog = sap.ui.getCore().byId("myDialog");
              if(oDialog){
                oDialog.open();
              }else{
                Fragment.load({
                  name: "projectb0910.view.fragment.fragment",
                  type: "XML",
                  controller: this
                }).then(function(oDialog){
                  oDialog.setModel(oModel);
                  oDialog.open();
                });
              }

            },
            onClose: function (oEvent) {
              let oButton = oEvent.getSource();
              let oDialog = oButton.getParent();
              oDialog.close();
          },
        });
    });
