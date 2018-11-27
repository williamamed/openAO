Ext.define('Registro.model.PeriodoModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        
        url: 'archivo/listperiodo',
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success'
        }
    }
});