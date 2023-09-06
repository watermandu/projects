sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
  "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sync.projectb0904.controller.Name", {
      onInit: function () {
            let oDatas = {
              list:[
                {name: '노형석', address: '죽전', phone: '2039', department:'cl2'}
              ]
            }; // client josn Modle  data 생성

      let oModel = new JSONModel(oDatas); // client Model 생성
      this.getView().setModel(oModel);

      },

      onClick() {
        this.onAdd();
      },
      onClick2() {
        this.delete();
      },

        onAdd: function(){
          let oModel = this.getView().getModel(),
              aList = oModel.getProperty("/list");
              
              aList.push({
                name: '',
                address: '',
                phone: '',
                department: '',
              });
              oModel.setProperty('/list',aList);
        },
        delete: function(){
          let oTable = this.byId("IdTab"),
              oModel = this.getView().getModel(),
              oModelData = oModel.getProperty("/list"),
              aIndex = oTable.getSelectedIndices();
            for(let i = aIndex.length-1; i>=0; i-- ){
              
              oModelData.splice(aIndex[i],1);
            }
             oModel.setProperty('/list',oModelData);
          
          
          
          // let oModel = this.getView().getModel(), 마지막 줄 삭제
          //     aList = oModel.getProperty("/list");
          // aList.splice( aList.length -1 ,1); // pop, splice , 배열의 길이에서 1 빼기. 
          // oModel.setProperty('/list',aList);
        },

        onRowActiondel: function(oEvent){
          // let  sSelectedIndex= oEvent.getParameters().row.getIndex();
          let sSelectedIndex=oEvent.getParameter('row').getIndex();
          
         
          //let oModelData = this.getView().getModel().getData().list;
           // let oModel = this.getView().getModel(),
          let oModelData = this.getView().getModel().getProperty("/list");

          oModelData.splice(sSelectedIndex,1);
          this.getView().getModel().setProperty('/list',oModelData);
          // oModel.setProperty('/list',oModelData);


        }
    });
  }
);
