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
                if(value==2)
                    return "<b style='color:red'>En trámite</b>";
                if(value==3)
                    return "<b style='color:green'>Tramitada</b>";
            },
            flex: 1
        },{
            header:'Dirigido contra',
            dataIndex: 'dirigido',
            flex: 1
        },{
            header:'Caduca',
            dataIndex: 'termino',
            renderer:function(value,a,record,rowIndex){
                var dt = Ext.Date.add(Ext.Date.parse(record.get('fecha'),'d/m/Y'), Ext.Date.DAY, value);
                
                var today=new Date();
                if(today < dt){
                     if(today > Ext.Date.add(dt, Ext.Date.DAY, -5) && today < dt){
                        Raptor.msg.info('La incidencia registrada en la fecha '+record.get('fecha')+' esta próxima a cumplir el plazo de término.');
                        return "<b style='color:orange'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                     }else
                        return "<b style='color:green'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                }else{
                    Raptor.msg.info('La incidencia registrada en la fecha '+record.get('fecha')+' se encuentra fuera del plazo de término.');
                    return "<b style='color:red'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                }
            },
            flex: 1
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Tramitar',
                privilegeName:'procesar',
                disabled:true,
                
                action:'update',
                iconCls:'icon-tramite'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Pedir respuesta a ..',
                privilegeName:'pedir',
                disabled:true,
                
                action:'pedir',
                iconCls:'icon-pedir'  
            },{
                xtype: 'button',
                text: 'Archivar',
                privilegeName:'archivar',
                disabled:true,
                
                action:'archivar',
                iconCls:'icon-archivos'  
            },
            
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
            }]
        }];
         this.bbar=Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true
            
            
        });
        this.callParent();
    }
});

