Ext.define('Encuestas.model.PieModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant','fullname'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listpie',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
