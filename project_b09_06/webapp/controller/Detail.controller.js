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

        _patternMached:function (oEvent)  { //url이 일치할때마다 실행. 
          let oParam= oEvent.getParameters().arguments; // 파라미터로 받은 값들 갖고 오기.
          let oModel = this.getView().getModel(); // oData Model 
        
          console.log(oParam.param2);
          let sPath = oModel.createKey('/Orders',{
            OrderID : oParam.param2
          });
          debugger;
          oModel.read(sPath,{ //모델을 읽을 건데 그 안의 Orders를 읽겠다 . 처음에는 엔터티셋이름이 들어감
            urlParameters:{
              $expand:'Order_Details'
            },
            success: function (oReturn) { //데이터 갖고 오기 성공하면 success실행
            
              
            },  
            error:function (oError) {
              console.log('error');
            }
          } );
          
          // this.getView().bindElement(`/Orders(${oParam.param2})`);
        
        },

        onNavMain: function (oEvent) {
          let oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo('Routemain',{},true);
        }


      });
  });
