Ext.define('Reporte.view.Options', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.options',
    
    store: 'Generic',
    title: "Opciones de gráficas",
    iconCls:'',
    flex:.4,
    collapsible:true,
    overflowY:'auto',
    
    bodyPadding:5,
    initComponent: function() {
        this.items = [{
                xtype:'fieldset',
                columnWidth: 1,
                title: 'Gráfica estandar',
                collapsible: true,
                
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items :[{
                    xtype: 'combo',
                    fieldLabel: 'Mostrar gráfica de',
                    
                    blankText: '',
                    labelAlign: 'top',
                    name: 'tabla',
                    store: 'Tablas',
                    queryMode: 'local',
                    displayField: 'name',
                    editable: false,
                    valueField: 'value'
                },{
                    xtype:'container',
                    
                    items:[{
                        xtype: 'button',
                        scale: 'large',
                        action: 'pie-chart',
                        width:120,
                        height:90,
                        cls:'options-reporte',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-pie.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        action: 'line-chart',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-line.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'column-chart',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-column.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        action: 'btn-excel',
                        width:120,
                        height:90,
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/excel.png')+'">'
                    }]
                }]
        },{
                xtype:'fieldset',
                columnWidth: 1,
                title: 'Gráfica comparativa',
                collapsible: true,
                
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items :[{
                    xtype: 'combo',
                    fieldLabel: 'Mostrar gráfica de',
                    
                    blankText: '',
                    labelAlign: 'top',
                    name: 'compareTabla',
                    store: 'Tablas',
                    queryMode: 'local',
                    displayField: 'name',
                    editable: false,
                    valueField: 'value'
                },{
                    xtype:'container',
                    
                    items:[{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'line-chart-compare',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-line.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'column-chart-compare',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-column.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'btn-excel-compare',
                        html: '<img width="120" height="90" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/excel.png')+'">'
                    }]
                }]
        }];
        
        this.callParent();
    }
});

