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
            header:'Estado',
            dataIndex: 'estado',
            renderer:function(value){
                if(value==1)
                    return "<b style='color:green'>Lista</b>";
                else
                    return "<b style='color:red'>Por el usuario</b>";
            },
            flex: 1
        },{
            header:'Dirigido contra',
            dataIndex: 'dirigido',
            flex: 1
        },{
            header:'Caduca',
            dataIndex: 'termino',
            renderer:function(value,a,record){
                var dt = Ext.Date.add(Ext.Date.parse(record.get('fecha'),'d/m/Y'), Ext.Date.DAY, value);
               
                var today=new Date();
                if(today < dt){
                     if(today > Ext.Date.add(dt, Ext.Date.DAY, -5) && today < dt)
                        return "<b style='color:orange'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                     else
                        return "<b style='color:green'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                }else
                    return "<b style='color:red'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
            },
            flex: 1
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Registro',
                privilegeName:'insert',
                action:'add',
                
                disabled:true,
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
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Enviar a trámite',
                privilegeName:'tramitar',
                disabled:true,
                
                action:'tramite',
                iconCls:'icon-tramite'  
            },{
                xtype: 'button',
                text: 'Trasladar a ..',
                privilegeName:'trasladar',
                disabled:true,
                
                action:'trasladar',
                iconCls:'icon-trasladar'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Buscar',
                privilegeName:'listbuscar',
                disabled:true,
                
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

