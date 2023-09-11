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
            onValueHelp2: function(){
              let oDialog2 = this.byId('idDialog2');
              if(oDialog2) {
                oDialog2.open();
            }else{
              this.loadFragment({
              name: "projectb0906.Fragment.Customer",
              type: "XML"
            }).then(function(oDialog2){
              oDialog2.open();
            }.bind(this));}
            

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

            onBeforeOpen2:function (oEvent) {
          


              let oValue = this.getView().byId('idInput2').getValue();          
              let oTable = this.getView().byId('idCustomerTable');
              let aFilters = [];
              let oFilter =   new Filter({
                path: "CustomerID",
                operator: 'EQ',
                value1: oValue||oEvent
              });
            
              if(oValue==""){
                oTable.getBinding('rows').filter();
              }else{
                aFilters.push(oFilter);
                oTable.getBinding('rows').filter(aFilters);
              }
            },

            onSearch: function(params) {
              let oValue = this.getView().byId('idInput').getValue();
              let oTable = this.getView().byId('idProductsTable');
              let oValue2 = this.getView().byId('idInput2').getValue();
              let DateFrom = this.getView().byId('DateRange').getDateValue();
              let DateTo = this.getView().byId('DateRange').getSecondDateValue();
              let aFilters = [];
              debugger;
              
              if (oValue){
                let oFilter = new Filter({
                  path: "OrderID",
                  operator: 'EQ',
                  value1: oValue
                });
                aFilters.push(oFilter);
              }

              if(oValue2){
                aFilters.push(new Filter({
                  path: "CustomerID",
                  operator: 'EQ',
                  value1: oValue2
                }));
            }

            if(DateFrom && DateTo){
              let oFilter3 = new Filter({
                path: "OrderDate",
                operator: 'BT',
                value1: DateFrom,
                value2: DateTo
              });
              aFilters.push(oFilter3);
            }
            if(oValue=='' || oValue2=='' ||DateFrom == null || DateTo == null){
              alert('조건 3가지를 전부 정확하게 입력해주세요');
            }
                oTable.getBinding('items').filter(aFilters);
            },

            onNavDetial: function (oEvent) {
              let oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo('RouteDetail',{
                paramOrder: 'options',
                param2: oEvent
              });
            },
            onSelectionChange: function (oEvent) {
              let sPath= oEvent.getParameters().listItem.getBindingContextPath(); // 선택한 row에 대한 정보 갖고 오기.  
              let oModel = this.getView().getModel();
              let oSelID = oModel.getProperty(sPath).OrderID;

              // let oRouter = this.getOwnerComponent().getRouter();
              // oRouter.navTo('RouteDetail',{
              //   paramOrder: 'options',
              //   param2: oSelID
              // });
              
              this.onNavDetial(oSelID); // 라우터 함수를 불러와서 실행하면 라우터 버튼만 누를때 
            },
            OrderSel:function(oEvent) {
              let oSelID = oEvent.getParameters().rowContext.getObject().OrderID;
              this.getView().byId('idInput').setValue(oSelID);
              this.onClose(oEvent);
              //두번쨰 input 필터 걸어주기. 
              this.onBeforeOpen2(oEvent);
            },
            CustomSel:function(oEvent) {
              let oSelID = oEvent.getParameters().rowContext.getObject().CustomerID;
              this.getView().byId('idInput2').setValue(oSelID);
              this.onClose(oEvent);
              
            }
            
        });
    });
  