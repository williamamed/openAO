 Ext.define('Registro.view.CategoriaWindow',{
        extend:'Ext.Window',
        width:400,
        autoHeight:true,
        modal:true,
        alias: 'widget.categoriawindow',
        autoShow: true,
         iconCls: 'icon-search',
        closeAction:'destroy',
        title:'Clasificador',
        layout:'fit',
        initComponent:function(){
            this.items = {
                xtype:'categoriatree'
            };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'acept',
                            disabled:true,
                            handler: this.onSelect,
                            scope:this
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        },
      onSelect:function(){
        var tree=this.down('treepanel');
        var record=tree.getSelectionModel().getLastSelected();
        this.fireEvent('selectednode',record);
      }
        
      
    })


