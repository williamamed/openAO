Ext.define('ViasComunicacion.model.ViaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','anonimo'],
    
    proxy: {
        type: 'ajax',
        //url:'viascomunicacion/list',
        api: {
            read: 'viascomunicacion/list',
            update: 'viascomunicacion/edit',
            create:'viascomunicacion/insert',
            destroy: 'viascomunicacion/delete'
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