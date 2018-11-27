Ext.define('ViasComunicacion.view.ViaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vialist',
    
    store: 'Via',
    title: 'Nomenclador de períodos',
    iconCls:'icon-user',
    
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        },{
            header:'Descripción',
            dataIndex: 'descripcion',
            flex: 2
        },{
            header:'Estado',
            dataIndex: 'activo',
            flex: 1,
            renderer:function(value){
                if(value==true)
                    return '<b style="color:green">Activo</b>';
                else
                    return '<b style="color:red">Desabilitado</b>';
            }
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insert',
                action:'add',
                hidden:true,
                disabled:false,
                iconCls:'icon-add'
            },{
                xtype: 'button',
                text: 'Editar',
                privilegeName:'edit',
                disabled:true,
                hidden:true,
                action:'update',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                disabled:true,
                hidden:true,
                action:'delete',
                iconCls:'icon-del'  
            },{
                xtype: 'button',
                text: 'Activar periodo',
                privilegeName:'activate',
                disabled:true,
                hidden:true,
                action:'active',
                iconCls:'icon-acept'  
            },{
                xtype: 'button',
                text: 'Gráfica por cantidad',
                privilegeName:'porcantidad',
                
                hidden:true,
                action:'porcantidad',
                iconCls:'icon-grafica'  
            },{
                xtype: 'button',
                text: 'Generar Clasificador',
                privilegeName:'generarclasificador',
                disabled:true,
                hidden:true,
                action:'generate',
                iconCls:'icon-index'  
            },{
                xtype: 'button',
                text: 'Comparar clasificador',
                privilegeName:'compararclasificador',
                disabled:true,
                hidden:true,
                action:'generatecompare',
                iconCls:'icon-index'  
            }]
        }];
        
        this.callParent();
    }
});

