Ext.define('Reporte.model.YearModel', {
    extend: 'Ext.data.Model',
    fields: ['name'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listyear',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});