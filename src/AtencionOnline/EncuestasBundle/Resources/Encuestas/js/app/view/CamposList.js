Ext.define('Encuestas.view.CamposList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.camposlist',
    width:'40%',
    store: 'Campos',
    title: "Campos de respuesta",
    iconCls:'',
   
    initComponent: function() {
        this.columns = [{
            header:"Respuesta",
            dataIndex: 'respuesta',
            flex: 1
        }];
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            
            
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insertCampo',
                disabled:true,
                action:'addCamposAction',
                iconCls:'icon-add'  
            },{
                xtype: 'button',
                text: 'Editar',
                disabled:true,
                privilegeName:'editCampo',
                action:'editCamposAction',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                disabled:true,
                privilegeName:'deleteCampo',
                action:'deleteCamposAction',
                iconCls:'icon-del'  
            }]
        }];
        
        this.callParent();
    }
});

