sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    //json 모델이라는 틀인데 객체를 만드는 것이다
    "use strict";

    return Controller.extend("Test.projectb0903.controller.Main", {
      onInit: function () {
        // 아묻따 실행되는 onInit 함수
        // debugger;
        // let oDatas = {
        // //   name: "noh hyeong seok",
        // //   title: "제목",
        // //   list: [
        // //     { num1: 12, operator: "test", num2: 13, result: 0 },

        // //     // {"phone":"01077022039", "home": "kkkkkkkkk"},
        // //     // {"phone":"01077022039", "home": "죽전"},
        // //     // {"phone":"01077022039", "home": "죽전"}
        // //   ],
        // //   age: 20,
        // // }; // Json data 생성.

        // let oModel = new JSONModel(oDatas); // 빈 껍데기의 /client Json model 생성 ->//\
        let oModel = new JSONModel();
        oModel.loadData("../model/viewData.json", {}, false); //
        // this.getView().setModel(oModel, "Main"); // Json Model을 view에서 사용할 수 있도록 생성.
      },

      onClick() {
        var oInput1 = this.byId("idInput1"); // id 넣을때 문자열이니 '' 잘 넣기.
        var sInput1 = Number(oInput1.getValue());

        var oInput2 = this.byId("idInput2");
        var sInput2 = Number(oInput2.getValue());

        var oSelect = this.byId("idSelect");
        var sSelect = oSelect.getSelectedKey();

        var oText = this.byId("idText");

        var Result = 0;
        switch (sSelect) {
          case "PLUS":
            sSelect = "+";
            Result = sInput1 + sInput2;
            break;

          case "MINUS":
            Result = sInput1 - sInput2;
            break;

          case "MULTIPLE":
            Result = sInput1 * sInput2;
            break;

          case "DIVISION":
            Result = sInput1 / sInput2;
            break;

          default:
            alert("연산자 오류");
            break;
        }
        oText.setText(Result);
        // var result = (Number(sInput1), sSelect, Number(sInput2));
        this.onAdd(sInput1, sInput2, Result);
        // Result 값을 onAdd 에 보내겠다.
      },
      //onChange 라는 이름을 가진 함수
      onChange: function (oEvent) {
        var skey = this.byId("idSelect").getSelectedKey();
        var nNum = Number(oEvent.getParameters().value);
        var Butt = this.byId("idBut");

        if (!nNum && skey === "DIVISION") {
          //
          //입력값이 없거나 0이면 에러 상태로 변경
          //   console.log(nNum);
          oEvent.getSource().setValueState("Error");
          this.byId("idBut").setEnabled(false); //타입이 불리언이기 때문에 문자열'false'로 넣는게 아님
        }
      },

      onAdd: function (sInput1, sInput2, nResult) {
        //Main Model의 list 배열 데이터를 가져오는 방법
        // 매개 변수로 보낸 거 받아서 써도 되고 여기서 새로 id와 값 받아와서 선언 해도 된다.
        // let sInput1 = Number(this.byId("idInput1").oInput1.getValue()),
        //      sInput2 = NUmber(this.byId("idInput2").oInput2.getValue()),
        let sSelect = this.getView()
          .byId("idSelect")
          .getSelectedItem()
          .getText();

        let oModel = this.getView().getModel("Main"), // Main 모델 갖고오기
          // aList = oModel.getData().list, // 전체 데이터 갖고와서 똑 뗴서list 배열 사용.  (oModel에 있는 전체 데이터를 갖고옴),/ 하나만 작성하면 전체 데이터 갖고옴
          aList2 = oModel.getProperty("/list"); //list 배열 갖고오기 2 ( 경로에 맞는 데이터만 갖고옴) ,

        aList2.push({
          num1: sInput1,
          operator: sSelect,
          num2: sInput2,
          result: nResult,
        });
        oModel.setProperty("/list", aList2);
        //oModel 데이터중 list 경로에 있는 데이터를 aList2로 변경하겠다.
      },
      onOpenDialog: function () {  //팝업 띄우는 거
        let oDialog =this.byId("idDialog");
        if(oDialog) {
          oDialog.open();
        }else{
          this.loadFragment({
            name: "Test.projectb0903.fragment.HelloDialog",
            type: "XML"
        }).then(function(oDialog) {
          oDialog.open();
        }.bind(this));
        }

//////////////////////////////////////////////////////
        // 신문법
        // let oDialog = sap.ui.getCore().byId("idDialog");
        // if (oDialog) { // 이미 한번 열었던 거면 있는 걸로 열고. 
        //   oDialog.open();
        // }else{//없으면 로드 해서 연다. 
        //   Fragment.load({
        //     name: "Test.projectb0903.fragment.HelloDialog",
        //     type: "XML",
        //     controller: this, // 해당 컨트롤러에 넘기겠다.
        //   }).then(function (oDialog) {
        //     // load 가 끝나면 타는 함수 then()
        //     oDialog.open();
        //   }); //load 된 객체가 oDialog 위치에 들어오게 된다.
        // }
        
      },

      onOpenDialog2:function() {
        if(this.byId('idDialogView')){
          this.byId('idDialogView').open();  
        } 
      },

      onClose: function (oEvent) {
        // getSource() : 이벤트를 일으킨 객체
        // getparameters() : 이벤트 관련 정보.

        // let oDialog = this.byId("idDialog");
        let oButton = oEvent.getSource();
        let oDialog = oButton.getParent();
        oDialog.close();
      },
    });
  }
);
