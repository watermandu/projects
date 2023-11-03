sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("zbappt010.controller.Main", {
            onInit: function () {
              let rtlist = [{Rttid : "RH0001"}, {Rttid : "RH0002"}, {Rttid : "RH0003"}, {Rttid : "RH0004"}];
              let omodel = new JSONModel(rtlist);
              this.getView().setModel(omodel,"rtlist");
            },

            onSearch: function(){
              let input1 = this.byId("idcomboBox").getValue(); //BOM 번호
              let input2 = this.byId("idcomboBox2").getValue(); //자재번호
              let input3 = this.byId("idcomboBox3").getValue(); //
              let aFilter = []; 

              if(input1){
                aFilter.push(
                  new Filter({
                    path: "Stlty",
                    operator: "EQ",
                    value1: input1
                  })
                )
              }
              // if(input1)

              if(input2){
                aFilter.push(
                  new Filter({
                    path: "Matnr",
                    operator: "EQ",
                    value1: input2         
                  })
                )
              } // if(input2)

              if(input3){
                aFilter.push(
                  new Filter({
                    path: "Rttid",
                    operator: "EQ",
                    value1: input3
                    
                  })
                )
              } // if(input3)

              

              this.byId("idPPT010Table").getBinding('items').filter(aFilter);
            },

            onSelectionChange:function(oEvent){
              let key = oEvent.getParameters().listItem.getBindingContextPath();
              key = key.slice(15,28);

              
            this.getView().getModel().read(key,{
              urlParameters: {'$expand': "ZBA_PPT020Set"},
              success: function(oReturn) {
                return this.onFragment(oReturn.ZBA_PPT020Set,key).bind(this)
              }
            })
            
            },

            onFragment: function(oReturn, key) {
              let oDialog = this.byId("idStatusDialog");

              if (oDialog){
                oDialog.byId("idStatusTable").setModel
              }

            },

        });
    });
