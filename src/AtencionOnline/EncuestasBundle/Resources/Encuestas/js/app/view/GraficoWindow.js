 Ext.define('Encuestas.view.GraficoWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        maximized:true,
        alias: 'widget.graficowindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Ver encuesta",
        layout:'fit',
        initComponent:function(){
            this.items = {
                    xtype:'container',
                    layout:'border',
                    items:[{
                            xtype: 'graficolist',
                            region:'west'
                        },{
                            xtype: 'graficoview',
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
           
        } 
 
      
    })


