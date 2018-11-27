Ext.define('Reporte.model.LineModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listline',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});