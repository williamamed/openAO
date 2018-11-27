Ext.define('Encuestas.model.PreguntaModel', {
    extend: 'Ext.data.Model',
    fields: ['id','pregunta','tipo','opcional'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listpregunta',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});