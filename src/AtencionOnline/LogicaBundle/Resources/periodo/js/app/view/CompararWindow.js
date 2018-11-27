 Ext.define('ViasComunicacion.view.CompararWindow',{
        extend:'Ext.Window',
        width:500,
        height:300,
        modal:true,
        alias: 'widget.compararwindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Comparar con ...',
        layout:'fit',
        initComponent:function(){
            this.items = {
                        xtype: 'compararlist',
                        region:'center',
                        recordSelect:this.recordSelect
                    };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'save',
                            disabled:true
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


