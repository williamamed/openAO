Ext.define('Reporte.model.PieModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listpie',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});