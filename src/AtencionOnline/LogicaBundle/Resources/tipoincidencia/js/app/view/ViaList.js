Ext.define('ViasComunicacion.view.ViaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vialist',
    
    store: 'Via',
    title: 'Nomenclador de tipo de incidencia',
    iconCls:'icon-user',
    
    initComponent: function() {
        this.columns = [{
            header:'Nombre',
            dataIndex: 'nombre',
            flex: 2
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insert',
                action:'add',
                
                disabled:false,
                iconCls:'icon-add'
            },{
                xtype: 'button',
                text: 'Editar',
                privilegeName:'edit',
                disabled:true,
                
                action:'update',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                disabled:true,
                
                action:'delete',
                iconCls:'icon-del'  
            }]
        }];
        
        this.callParent();
    }
});

