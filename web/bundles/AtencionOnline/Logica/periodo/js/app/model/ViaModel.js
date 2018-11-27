Ext.define('ViasComunicacion.model.ViaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','activo','descripcion'],
    
    proxy: {
        type: 'ajax',
        //url:'viascomunicacion/list',
        api: {
            read: 'periodo/list',
            update: 'periodo/edit',
            create:'periodo/insert',
            destroy: 'periodo/delete'
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