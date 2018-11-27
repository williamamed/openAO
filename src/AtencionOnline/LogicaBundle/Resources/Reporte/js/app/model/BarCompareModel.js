Ext.define('Reporte.model.BarCompareModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listbarcompare',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});