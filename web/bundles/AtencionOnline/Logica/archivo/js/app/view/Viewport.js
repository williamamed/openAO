Ext.define('Registro.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype:'panel',
                        title:'Tu organización',
                        collapsible:true,
                        region:'west',
                        layout:'border',
                        flex:.4,
                        items:[{
                            xtype: 'estructuretree',
                            region:'center'
                        },{
                            xtype: 'container',
                            region:'south',
                            height:60,
                            padding:10,
                            style:{background:'#5C5A5A',color:'white'},
                            html:'<h3 ><img src="'+Raptor.getBundleResource('AtencionOnline/Logica/img/registro.png')+'" width="40" style="float:left;margin-right:10px;margin-top:-10px;">Archivo de incidencias</h3>'
                        }]
                    },{
                        xtype: 'incidencialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});