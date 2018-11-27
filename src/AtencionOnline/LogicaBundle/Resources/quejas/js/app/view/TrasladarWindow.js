 Ext.define('Registro.view.TrasladarWindow',{
        extend:'Ext.Window',
        width:400,
        autoHeight:true,
        modal:true,
        alias: 'widget.trasladarwindow',
        autoShow: true,
        iconCls: 'icon-trasladar',
        closeAction:'destroy',
        title:'Trasladar a ...',
        layout:'fit',
        initComponent:function(){
            this.items = {
                xtype:'treetrasladar',
                currentNode: this.modelSelected.get('id')
            };
            
            this.buttons = [{   iconCls: 'icon-trasladar',
                            text: 'Trasladar',
                            action: 'windowTrasladar',
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


