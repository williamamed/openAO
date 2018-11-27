Ext.define('Reporte.model.BarModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listbar',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});