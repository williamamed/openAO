Ext.define('Registro.view.IncidenciaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.incidencialist',
    
    store: 'Incidencia',
    title: 'Listado de incidencias por estructuras',
    iconCls:'icon-registro',
   
    initComponent: function() {
        this.columns = [{
            header:'Nombre del Promovente',
            dataIndex: 'nombreApellidos',
            renderer:function(value){
                if(value)
                     return value;
               else
                     return '<b style="color:red">Anónimo</b>';
            },
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
            header:'Tipo',
            dataIndex: 'tipo',
            flex: 1
        },{
            header:'Vía de comunicación',
            dataIndex: 'vcomunicacion',
            flex: 1
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
            {
                xtype: 'button',
                text: 'Ver incidencia',
                privilegeName:'print',
                disabled:true,
                
                action:'ver',
                iconCls:'icon-detalles'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Buscar',
                privilegeName:'listbuscar',
                disabled:true,
                
                action:'buscar',
                 iconCls: 'icon-search',
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                disabled:true,
                
                action:'deletearchivo',
                 iconCls: 'icon-del',
            }]
        }];
         this.bbar=Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true
            
            
        });
        this.callParent();
    }
});

