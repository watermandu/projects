sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projectb0907.controller.Main", {
            onInit: function () {
              this._setChartInView();
              this._setChartInController();
            },
            _setChartInView: function (oChart) {
              let oData = {
                list :[{name: 'a' ,rate: '1', cost:'11'},
              {name: 'b' ,rate: '2', cost:'22'},
              {name: 'c' ,rate: '3', cost:'33'},
              {name: 'd' ,rate: '4', cost:'44'},
              {name: 'e' ,rate: '5', cost:'55'},
              {name: 'f' ,rate: '6', cost:'66'}
              ]
              };
              let oModel = new JSONModel(oData);
              this.getView().setModel(oModel,'view');
            },
            _setChartInController: function (oChart) {
              let oData = {
                sales:[
                  {product: 'Jackets', amount:'65'},
                  {product: 'Shirts', amount:'70'},
                  {product: 'Pants', amount:'83'},
                  {product: 'Coats', amount:'92'},
                  {product: 'Purse', amount:'77'},
                ]
              };

              this.getView().setModel(new JSONModel(oData),'cont');
              
              //Chart
              let oColChart = this.getView().byId('idChart');

              // dataset
              let oColDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions:[{name:'Product',value:'{cont>product}'}],
                measures:[{name:'Amount',value:'{cont>amount}'}],
                data:{path:'cont>/sales'} // 기준이 되는 배열 데이터를 mapping 한다
              });
              oColChart.setDataset(oColDataset); // dataset 세팅 설정. 

              //feeds
              let oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid:'valueAxis',
                type:'Measure',
                values:["Amount"]
              });
              let oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid:'categoryAxis',
                type:'Dimension',
                values:["Product"]
              });
              oColChart.addFeed(oFeedItemValue);
              oColChart.addFeed(oFeedItemCategory);
              
              // optional
              oColChart.setVizProperties({ 
                'title':{'visivle':true , 'text': 'Line Chart'},
                'legendGroup':{layout:{position: 'left'} },
                'plotArea':{
                  drawingEffect: 'glossy',
                  colorPalette:['#B5B2FF', '#0100FF', '#47C83E']
              }
            });
            
            }
        });
    });
