sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.ux400solving.controller.Main", {
      formatter:{
        transformDiscontinued:function(Data){ // Data에 Discontinued 필드의 값들이 담겨서 넘어온다.
          // if(Data) { //넘어온 데이터가 담긴 Data가 있다면  조건문을 사용. 
            return Data ? 'Yes' : 'No'; // 넘어온 것이 true면 yes 아니면 no
          // }
        }
      },
      
      onInit: function () {
        let oData = {
          rows: [],
        };
        let list = new JSONModel(oData);
        this.getView().setModel(list,'list');
      },
      onRandomPress: function (event) {
        let Random = Math.floor(Math.random() * 100) + 1;
        let idBut = this.getView().byId("idBut");

        let oModel = this.getView().getModel('list');
        let list = oModel.getProperty("/rows");
        //idBut.setValue(Random);
        this.getView().byId("idBut").setValue(Random);

        list.push({'aa':Random}); 
        oModel.setProperty("/rows", list);
      },
      onDialog: function () {
        let oDialog = this.byId("idDialog");
        if(oDialog) {
          oDialog.open();
        }else{
          this.loadFragment({
            name: "sap.btp.ux400solving.view.fragment.Products",
            type: "XML"
        }).then(function(oDialog) {
          oDialog.open();
        }.bind(this));
      }
    },
      onClose: function (oEvent) {
        let oDialog = oEvent.getSource().getParent();
        oDialog.close();
      },
      onVlaueChange: function(oEvent){
        let Random = oEvent.getSource().getValue();
        let oInput = this.getView().byId("idInput");
        let oModel = this.getView().getModel('list');
        let list = oModel.getProperty("/rows");
          if ( 1<= Random && Random <= 100 ) {
            list.push({'aa':Random});
            oModel.setProperty("/rows", list);
            oEvent.getSource().setValueState('None');
      }else{
        oEvent.getSource().setValueState('Warning');
        oEvent.getSource().setValueStateText("다시입력")

      }

    }
    });
  }
);
