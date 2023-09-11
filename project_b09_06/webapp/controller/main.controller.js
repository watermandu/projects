sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Filter'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,FilterOperator,Filter) {
        "use strict";

        return Controller.extend("projectb0906.controller.main", {
            formatter: { // formatter 객체 안에다 format function 들을 넣고 관리
                //fnDateString: 날짜 객체를 yyyy/mm/dd 로 변경해줌. 
                fnDateString: function(oDate){
                    if (oDate){
                      let oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: "yyyy-MM-dd"
                      });
                      return oDateTimeInstance.format(oDate); // format이라 메소드를 사용해서 oDate 객체를 갖고오고 
                    }   
                    
                }
            },

            
            onInit: function () {

            }, 
            
            onValueHelp: function () {
                
                let oDialog = this.byId('idDialog');
                if(oDialog) {
                    oDialog.open();
                }else{
                    this.loadFragment({
                        name: "projectb0906.Fragment.Order",
                        type: "XML"
                    }).then(function(oDialog) {
                      oDialog.open();
                    }.bind(this));
                }
            },
            onClose: function (oEvent) {
                let oButton = oEvent.getSource();
                let oDialog = oButton.getParent();
                oDialog.close();
            },
            onBeforeOpen: function (oEvent) {
              let oTable = this.getView().byId('idOrderTable');
              let aFilters = [];
              let oFilter =   new Filter({
                path: "EmployeeID",
                operator: 'GE',
                value1: 4
              });

              let oFilter2 = new Filter({ 
                path: 'CustomerID',
                operator:'Contains',
                value1: 'R',
                value2: '' 
              });

              // aFilters = [ new Filter({
              //   path: "EmployeeID",
              //   operator: 'GE',
              //   value1: 4
              // }),
              // new Filter({ 
              //   path: 'CustomerID',
              //   operator:'Contains',
              //   value1: 'R',
              //   value2: '' 
              // }) ];
              aFilters.push(oFilter);
              
              //let oFilter = new Filter("EmployeeID", FilterOperator.EQ, 4);
              oTable.getBinding('rows').filter(aFilters);
            },

            onSearch: function(params) {
              let oValue = this.getView().byId('idInput').getValue();
              let oTable = this.getView().byId('idProductsTable');
              let aFilters = [];
              let oFilter = new Filter({
                path: "OrderID",
                operator: 'EQ',
                value1: oValue
              });
              if(oValue){
                aFilters.push(oFilter);
              }
                // aFilters.push(oFilter);
                oTable.getBinding('items').filter(aFilters);
            },
            onNavDetial: function (oEvent, test) {
              let oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo('RouteDetail',{
                paramOrder: 'options',
                param2: test || oEvent
              });
            },
            onSelectionChange: function (oEvent) {
              let sPath= oEvent.getParameters().listItem.getBindingContextPath(); // 선택한 row에 대한 정보 갖고 오기.  
              let oModel = this.getView().getModel();
              let oSelID = oModel.getProperty(sPath).OrderID;

              // let oRouter = this.getOwnerComponent().getRouter();
              // oRouter.navTo('RouteDetail',{
              //   paramOrder: 'options',
              //   param2: test || oEvent
              // });
              
              this.onNavDetial(null, oSelID); // 라우터 함수를 불러와서 실행하면 라우터 버튼만 누를때 
            }
            
        });
    });
