Ext.define('Encuestas.model.CamposModel', {
    extend: 'Ext.data.Model',
    fields: ['id','respuesta'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listcampos',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});