Ext.define('ViasComunicacion.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'vialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});