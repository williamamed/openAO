Ext.define('ViasComunicacion.view.GraficaChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.graficachart',
    style: 'background:#fff',
            animate: true,
            store: 'Grafica',
            shadow: true,
      //      theme: 'Green',
     legend: {
                position: 'right'
            },
    
            
    initComponent: function() {
        var textSeries=this.selectedSeries;
        var series=new Array();
        var fields=new Array();
        
        for(var i=0;i<textSeries.length;i++){
            var text=textSeries[i].get('nombre');
           
            fields.push(text);
//            series.push({
//                type: 'line',
//                highlight: {
//                    size: 7,
//                    radius: 7
//                },
//                axis: 'left',
//                smooth: true,
//                tips: {
//                  trackMouse: true,
//                  width: 140,
//                  height: 28,
//                  renderer: function(storeItem, item) {
//                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(text) + ' $');
//                  }
//                },
//                label: {
//                  display: 'over',
//                  'text-anchor': 'middle',
//                    field: text,
//                    renderer: Ext.util.Format.numberRenderer('0'),
//                    orientation: 'vertical',
//                    color: '#333'
//                },
//                xField: 'name',
//                yField: text,
//                markerConfig: {
//                    type: 'circle',
//                    size: 4,
//                    radius: 4,
//                    'stroke-width': 0
//                }
//            });
            
            
        }
        this.axes= [{
                type: 'Numeric',
                
                fields: fields,
                position: 'left',
                minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0')
                },
                grid: true,
                title: 'Cantidad'
            }, {
                type: 'Category',
                position: 'bottom',
				label: {
                    rotate: {
                        degrees: 45
                    }
                },
                fields: ['name'],
                title: 'Clasificadores generales'
            }],
            this.series= [{
                type: 'column',
                axis: 'left',
                tips: {
                    trackMouse: true,
					  width: 140,
					  height: 28,
					  renderer: function(storeItem, item) {
						this.setTitle(item.value[1]);
						
					  }
					},
                xField: 'name',
                yField: fields
            }]
//        this.series=series;
//        this.axes= [{
//                type: 'Numeric',
//                minimum: 0,
//                position: 'left',
//                fields: fields,
//                title: 'Cantidad',
//                minorTickSteps: 1,
//                label: {
//                    renderer: Ext.util.Format.numberRenderer('0,0')
//                },
//                grid: {
//                    odd: {
//                        opacity: 1,
//                        fill: '#ddd',
//                        stroke: '#bbb',
//                        'stroke-width': 0.5
//                    }
//                }
//            }, {
//                type: 'Category',
//                position: 'bottom',
//                fields: ['name'],
//                title: 'Indicadores específicos'
//            }],
        this.callParent();
    }
});

