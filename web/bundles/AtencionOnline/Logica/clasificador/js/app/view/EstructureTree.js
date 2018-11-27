Ext.define('GestEstructure.view.EstructureTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.estructuretree',
    rootVisible: true,
    store: 'Estructure',
    title: 'Clasificador por indicadores',
    iconCls:'',
    height:400,
    initComponent: function() {
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                disabled:true,
//                hidden:true,
                privilegeName:'add',
                action:'add',
                iconCls:'icon-add'  
            },{
                xtype: 'button',
                text: 'Editar',
                disabled:true,
//                hidden:true,
                privilegeName:'edit',
                action:'edit',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
//                hidden:true,
                privilegeName:'delete',
                disabled:true,
                action:'delete',
                iconCls:'icon-del'  
            }]
        }];
        this.callParent();
    }
});

