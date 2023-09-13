sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";
        
        return Controller.extend("odatacrudb09.controller.main", {
            onInit: function () {
              let oDataModel = this.getOwnerComponent().getModel();
              this.getView().setModel(new JSONModel(),'view')
            }, 
            onRead:function (oEvent) {//read Get 요청
              let oDataModel = this.getOwnerComponent().getModel();//oDataModel
              let oModel = this.getView().getModel('view');//json model
              let sSel = this.getView().byId("idProductsTable").getSelectedContexts();
              let value = sSel[0].getProperty('MB_ID');
              
              let sPath = oDataModel.createKey('/MemberSet',{
                MB_ID : value
                // , MB_NM: '라라라'
              });

              oDataModel.read(sPath,{
                success:function(oReturn){              
                  oModel.setProperty('/',oReturn);
                  // let oModel = new JSONModel(oReturn);
                  // this.getView().setModel(oModel,'list');
              },
              // .bind(this)
              error:function(oError){
                console.log('Error 발생');
              }
            });
            },
            onCreate:function (oEvent) {//create Post 요청
              let oDataModel = this.getOwnerComponent().getModel();//oDataModel
              let Data = {
                MB_ID: this.getView().byId("idInput1").getValue(),
                MB_NM: this.getView().byId("idInput2").getValue(),
                TELNO: this.getView().byId("idInput3").getValue(),
                EMAIL: this.getView().byId("idInput4").getValue(),
                MB_ST: this.getView().byId("idInput5").getValue()
              };
              debugger;
              oDataModel.create('/MemberSet',Data,{
                success:function(oReturn){
                  debugger;
                  console.log('데이터 생성 성공');
                },
                error:function(oError){
                  console.log('Error 발생');``
                }
              });

            },
            onUpdate:function(oEvent){//update PUT 요청
              // let oDataModel = this.getOwnerComponent().getModel();//oDataModel
              // let sSel = this.getView().byId("idProductsTable").getSelectedContexts();
              // let value = sSel[0].getProperty('MB_ID');
              // let sPath = oDataModel.createKey('/MemberSet',{
              //   MB_ID : value
              //   // , MB_NM: '라라라'
              // });
              // let Data = {
              //   MB_ID: this.getView().byId("idInput1").getValue(),
              //   MB_NM: this.getView().byId("idInput2").getValue(),
              //   TELNO: this.getView().byId("idInput3").getValue(),
              //   EMAIL: this.getView().byId("idInput4").getValue(),
              //   MB_ST: this.getView().byId("idInput5").getValue()
              // };
              // debugger;
              // oDataModel.update(sPath,Data,{
              //   success:function(){
              //     alert('수정성공');
              //   },
              //   error:function(){
              //     alert('수정실패');
              //   }

              // });

              let oDataModel = this.getOwnerComponent().getModel();//oDataModel
              let oModel = this.getView().getModel('view');
              let body = oModel.getProperty('/');

              oDataModel.update(`/MemberSet('${body.MB_ID}')`,body,{
                success:function(){                
                  sap.m.MessageToast.show('데이터 변경 완료');
                  oDataModel.refresh(true);
                },
                error:function(){}
              })

            },
            onDelete:function(oEvent){//delete Delte 요청 
              let oDataModel = this.getOwnerComponent().getModel();//oDataModel
              let sSel = this.getView().byId("idProductsTable").getSelectedContexts();
              let value = sSel[0].getProperty('MB_ID');
              let sPath = oDataModel.createKey('/MemberSet',{
                MB_ID : value
                // , MB_NM: '라라라'
              });
              oDataModel.remove(sPath,{
                success:function(){
                  alert('삭제성공');
                },
                error:function(){}
              });
            },
        });
    });
