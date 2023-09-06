sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("practiceb0901.controller.main", {
      onInit: function () {
        let oData = {
          list: [{ num1: "", operator: "", num2: "", result: "" }],
          operators: [
            { key: "PLUS", text: "+" },
            { key: "MINUS", text: "-" },
            { key: "MULTIPLE", text: "*" },
            { key: "DIVISION", text: "/" },
          ],
        };
        let oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
      }, //onInit
      PressBut: function (oEvent) {
        let oInput1 = this.getView().byId("idInput1");
        let sInput1 = Number(oInput1.getValue());
        let oInput2 = this.getView().byId("idInput2");
        let sInput2 = Number(oInput1.getValue());
        let oText = this.getView().byId("itText"); 


        let result = 0;

        let oSel = this.getView().byId("idSelete");
        let sSel = oSel.getSelectedKey();

        switch (sSel) {
          case "PLUS":
            result = sInput1 + sInput2;
            sSel = '+';
            break;
          case "MINUS":
            result = sInput1 - sInput2;
            sSel = '-';
            break;
          case "MULTIPLE":
            result = sInput1 * sInput2;
            sSel = '*';
            break;
          case "DIVISION":
            result = sInput1 / sInput2;
            sSel = '/';
            break;

          default:
            console.log('연산자 오류 ');
            break;
        }
        oText.setText(result);
        this.onAdd(sInput1, sSel, sInput2, result);
      }, // PressBut
      onAdd: function(sInput1, sSel, sInput2, result){
         let Model = this.getView().getModel();
         let List = Model.getProperty("/list");
         List.push({
            
         })


      }


    });
  }
);
