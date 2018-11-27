 Ext.define('ViasComunicacion.view.EscogerWindow',{
        extend:'Ext.Window',
        width:500,
        height:300,
        modal:true,
        alias: 'widget.escogerwindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Escoja los períodos a graficar',
        layout:'fit',
        initComponent:function(){
            this.items = {
                        xtype: 'escogerlist',
                        region:'center'
                    };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })


