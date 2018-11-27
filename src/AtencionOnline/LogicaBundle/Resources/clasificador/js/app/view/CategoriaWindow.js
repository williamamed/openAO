 Ext.define('GestEstructure.view.CategoriaWindow',{
        extend:'Ext.Window',
        width:500,
        autoHeight:true,
        modal:true,
        alias: 'widget.categoriawindow',
        autoShow: true,
         iconCls: 'icon-search',
        closeAction:'destroy',
        title:'Escoja un clasificador',
        layout:'fit',
        initComponent:function(){
            this.items = {
                xtype:'categoriatree'
            };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'acept',
                            disabled:true,
                           
                            scope:this
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           var tree=this.down('treepanel');
           tree.on('select',this.onSelect,this);
           
        },
      onSelect:function(a,record){
            var btn=this.down('button[action=acept]');
           
            if(record.get('id')==this.model.get('id') || !record.get('leaf'))
                btn.disable();
            else
                btn.enable();
      },
      getSelectedNodeWindow:function(){
        var tree=this.down('treepanel');
        return tree.getSelectionModel().getLastSelected();
      }
        
      
    })


