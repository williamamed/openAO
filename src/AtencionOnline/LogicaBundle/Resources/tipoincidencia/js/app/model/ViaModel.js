Ext.define('ViasComunicacion.model.ViaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        //url:'viascomunicacion/list',
        api: {
            read: 'tipoincidencia/list',
            update: 'tipoincidencia/edit',
            create:'tipoincidencia/insert',
            destroy: 'tipoincidencia/delete'
        },
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