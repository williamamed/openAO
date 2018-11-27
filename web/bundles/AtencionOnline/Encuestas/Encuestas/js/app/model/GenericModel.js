Ext.define('Encuestas.model.GenericModel', {
    extend: 'Ext.data.Model',
    fields: ['id','nombre','estado','anonimo','enlace'],
    
    proxy: {
        type: 'ajax',
        url:'admin/list',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});