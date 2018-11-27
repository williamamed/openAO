Ext.define('Reporte.store.Estructure', {
    extend: 'Ext.data.TreeStore',
    model: 'Reporte.model.EstructureModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});