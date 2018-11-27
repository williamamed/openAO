 Ext.define('Encuestas.view.GenericWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        maximized:true,
        alias: 'widget.genericwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Crear encuesta",
        layout:'fit',
        initComponent:function(){
            this.items = {
                    xtype:'container',
                    layout:'border',
                    items:[{
                            xtype: 'preguntaslist',
                            region:'west'
                        },{
                            xtype: 'camposlist',
                            region:'center'
                        }]
                };
            
        this.buttons = [{
                            iconCls: 'icon-cancel',
                            text: 'Cerrar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           Raptor.controlActions();
        } 
 
      
    })


