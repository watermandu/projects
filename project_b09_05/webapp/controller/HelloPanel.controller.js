sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.projectb0905.controller.HelloPanel", {
            onInit: function () {

            },
            onShowHello: function(){
            //    sap.m.MessageToast.show('Hello Panel Click');

              sap.m.MessageBox.success('버튼이 클릭 되었습니다.',{
                title: 'success',
                onClose: function(action){
                    switch (action){
                        case 'YES':
                            sap.m.MessageToast.show('yes click');
                            break;
                        case 'NO':
                            sap.m.MessageToast.show('no click');
                            break;
                    }
                },
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			emphasizedAction: sap.m.MessageBox.Action.YES,
              });

            },
            afterSucess: function(){
                sap.m.MessageToast.show('생성 후 로직');

            }


        });
    });
