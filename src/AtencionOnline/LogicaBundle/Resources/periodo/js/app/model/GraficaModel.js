Ext.define('ViasComunicacion.model.GraficaModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'no'},
                {name: 'name'}],
    
    proxy: {
        type: 'ajax',
        url:'periodo/grafcantidad',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
           
            totalProperty: 'count'
        }
    }
});