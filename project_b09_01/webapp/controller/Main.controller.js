sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("sync.projectb0901.controller.Main", {
      onInit: function () {},
      onClick: function () {
        // alert("버튼 클릭하였습니다.");
        var oInput = this.byId("idInput"); // this.byid 메소드를 실행해서 그 안에 id 담음, Text 객체 갖고옴(Text 속성들 전부다 갖고옴).
        var sInput = oInput.getValue();
        //oText에 담은 객체에서 Text 속성 값을 갖고오겠다
        alert(sInput);
      },
    });
  }
);
