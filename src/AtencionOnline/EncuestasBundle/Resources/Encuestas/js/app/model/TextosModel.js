Ext.define('Encuestas.model.TextosModel', {
    extend: 'Ext.data.Model',
    fields: ['name','text','ci','direccion','apellidos'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listtextos',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});