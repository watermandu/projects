sap.ui.define([
  "sap/ui/core/mvc/Controller"


],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
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
        onInit:function () {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMached,this);   
          // RouteDetail 라우터 객체를 갖고온다. // attachPatternMatched: 패턴이 매치가(일치하면) 되면 this._patternMache 함수 실행 하겠다.(일치할때마다 함수 실행)
        },

        _patternMached:function (oEvent) { //url이 일치할때마다 실행. 
          let oParam= oEvent.getParameters().arguments; // 파라미터로 받은 값들 갖고 오기.
          console.log(oParam.param2);
          this.getView().bindElement(`/Orders(${oParam.param2})`);
        
        },

        onNavMain: function (oEvent) {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo('Routemain',{},true);
        }


      });
  });
