Ext.define('Reporte.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = [{
                xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'panel',
                        title: 'Área de gráfica',
                        itemId: 'renderPanel',
                        html:"<img width='100%' height='100%' src='"+Raptor.getBundleResource('AtencionOnline/Logica/img/reportes-empresas.jpg')+"'>",
                        layout:'fit',
                        region:'center'
                    },{
                            xtype: 'options',
                            region:'east'
                   }]
        }];
        
        this.callParent();
    }
});