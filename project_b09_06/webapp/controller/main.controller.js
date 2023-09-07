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

            
            onInit: function () {
// t
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
            }

        });
    });
