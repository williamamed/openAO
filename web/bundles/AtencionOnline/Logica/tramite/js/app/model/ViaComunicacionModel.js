Ext.define('Registro.model.ViaComunicacionModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','anonimo'],
    
    proxy: {
        type: 'ajax',
        
        url: 'tramite/listviascomunicacion',
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