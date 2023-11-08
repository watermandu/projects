sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator',
    "sap/ui/core/Fragment",
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator,Fragment) {
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
                    operator: "Contains" ,
                    value1: input1
                  })
                )
              }
              // if(input1)

              if(input2){
                aFilter.push(
                  new Filter({
                    path: "Matnr",
                    operator: "Contains",
                    value1: input2         
                  })
                )
              } // if(input2)

              if(input3){
                aFilter.push(
                  new Filter({
                    path: "Rttid",
                    operator: "Contains",
                    value1: input3
                    
                  })
                )
              } // if(input3)

              

              this.byId("idPPT010Table").getBinding('items').filter(aFilter);
            },

            onSelectionChange: function (oEvent) {
              let odataModel = this.getOwnerComponent().getModel();
              // let sPath = oEvent.getSource().getBindingContext().sPath;
              let sPath = oEvent.getParameters().listItem.getBindingContextPath();

              odataModel.read(sPath,
                {
                    urlParameters: {
                      $expand: "ZBA_PPT020Set",
                    },
                success:function(oReturn){
                  debugger;
                  let oModel = new JSONModel(oReturn);
                  // this.byId("idStatusTable").setModel(oModel,"Dialog"); // 구버전
                  sap.ui.getCore().setModel(oModel,"Dialog"); //   신문법
                }.bind(this),
                error:function(oError){
                  alert("테이블 정보 갖고오기 실패");
                }
              });
              // let oDialog = this.byId("idDialog"); // 구문법
              let oDialog = sap.ui.getCore().byId("idDialog"); // 구문법
                if (!oDialog) {
                  
                  // 신문법
                  Fragment.load({
                    name: "zbappt010.view.fragment.Item",
                    type: 'XML',
                    controller: this
                  })

                  // 구문법
                  // this.loadFragment({
                  //   name: "zbappt010.view.fragment.Item", //load 할 파일 경로
                  //   type: "XML",
                  // })

                  .then(
                    function (oDialog) {
                      oDialog.open();
                    }
                    .bind(this) 
                  );
                } else {
                  oDialog.open();
                }
              },

              onClose:function(){
                // this.byId("idDialog").close();
                sap.ui.getCore().byId("idDialog").close();
              }






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //   // var oDataModel = this.getOwnerComponent().getModel(); //ODataModel
            //   // var oButton = oEvent.getSource();
            //   // var oTable = oButton.getParent();
            //   // var nIndex = oTable.sId.substring(73);
      
            //   // var sCarrid = oEvent
            //   //   .getSource()
            //   //   .getBindingContext()
            //   //   .sPath.substr(13, 2);
      
            //   // var sPath = oDataModel.createKey("/carrierSet", {
            //   //   Carrid: sCarrid,
            //   // });
      
            //   // var sPath = oEvent.getSource().getBindingContext().sPath;
              
            //   let sPath = oEvent.getParameters().listItem.getBindingContextPath();
            //   // sPath = "(" + sPath.slice(15,29) + ")";
            //   let key = sPath.substr(15,5);
            //   let value = sPath.substr(21,8);
            //   sPath = "/" + key  + "(" + value + ")";

            //   var oModel = this.getOwnerComponent().getModel();
            //   oModel.read(sPath, {
            //     urlParameters: {
            //       $expand: "ZBA_PPT020Set",
            //     },
            //     success: function (oReturn) {
            //       var oModel = new JSONModel(oReturn);
            //       this.getView().setModel(oModel, "dialog");
            //     }.bind(this),
            //     error: function (oError) {},
            //   });

      
            //   var oDialog = this.byId("idDialog");
            //   if (!oDialog) {
            //     this.loadFragment({
            //       name: "zbappt010.view.fragment.Item", //load 할 파일 경로
            //       type: "XML",
            //     }).then(
            //       function (oDialog) {
            //         oDialog.open();
            //       }.bind(this)
            //     );
            //   } else {
            //     oDialog.open();
            //   }
            // },












            // onFragment: function(oReturn, key) {
            //   let oDialog = this.byId("idStatusDialog");
            //   if (oDialog){
            //     oDialog.bindElement(key);
            //     oDialog.setModel(new JSONModel(oReturn),"Item");
            //     oDialog.open();
            //   }
            //   else{
            //     this.loadFragment({
            //       name: "zbappt010.view.fragment.Item",
            //       type: "XML"
            //     }).then(
            //       function(oDialog){
            //         oDialog.bindElement(key);
            //         oDialog.setModel(new JSONModel(oReturn),"Item");
            //         oDialog.open();
            //         let controller = this.byId("idStatusDialog");
            //       }.bind(this)
            //     );
            //   }

            // },


            // onSelectionChange:function(oEvent){
            //   let key = oEvent.getParameters().listItem.getBindingContextPath();
            //   key = "(" + key.slice(15,29) + ")";
            //   // let oDialog = this.byId("idStatusDialog");

            //   this.getView().getModel().read(key,{
            //   urlParameters: {'$expand': "ZBA_PPT020Set"},
            //   success: function(oReturn) {
            //     return this.onFragment(oReturn.ZBA_PPT020Set,key).bind(this)
            //   }
            // })

            //   // if (oDialog){
            //   //   // oDialog.byId("idStatusTable").setModel();
            //   //   oDialog.open();
            //   // }
            //   // else{
            //   //   this.loadFragment({
            //   //     name: "zbappt010.view.fragment.Item",
            //   //     type: "XML"
            //   //   }).then(
            //   //     function(oDialog){
            //   //       let controller = this.byId("idStatusDialog");
            //   //     }.bind(this)
            //   //   );
            //   // }
            
            
            // },

            

        });
    });
