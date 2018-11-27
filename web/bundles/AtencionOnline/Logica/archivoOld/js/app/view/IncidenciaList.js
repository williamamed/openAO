Ext.define('Registro.view.IncidenciaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.incidencialist',
    
    store: 'Incidencia',
    title: 'Tramitación de quejas',
    iconCls:'icon-archivos',
    
    initComponent: function() {
        this.columns = [{
            header:'Nombre del Promovente',
            dataIndex: 'nombreApellidos',
            flex: 2
        },{
            header:'Fecha',
            dataIndex: 'fecha',
            flex: 1
        },{
            header:'Estructura',
            dataIndex: 'idEstructure',
            flex: 1
        },{
            header:'Recibida por',
            dataIndex: 'recibe',
            flex: 1
        },{
            header:'Dirigido contra',
            dataIndex: 'dirigido',
            flex: 1
        },{
            header:'Estado',
            dataIndex: 'estado',
            renderer:function(value){
                if(value==2)
                    return "<b style='color:red'>En trámite</b>";
                if(value==3)
                    return "<b style='color:green'>Tramitada</b>";
            },
            flex: 1
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Ver incidencia',
                privilegeName:'see',
                disabled:true,
                hidden:true,
                action:'ver',
                iconCls:'icon-detalles'  
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
                text: 'Archivar incidencias',
                privilegeName:'state',
                disabled:true,
                hidden:true,
                action:'tramite',
                iconCls:'icon-user'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Buscar',
                privilegeName:'buscar',
                disabled:true,
                hidden:true,
                action:'buscar',
                 iconCls: 'icon-search',
            }]
        }];
         this.bbar=Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true
            
            
        });
        this.callParent();
    }
});

