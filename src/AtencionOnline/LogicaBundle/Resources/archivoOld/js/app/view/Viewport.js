Ext.define('Registro.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'estructuretree',
                        region:'west'
                    },{
                        xtype: 'incidencialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});