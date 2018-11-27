Ext.define('Registro.store.Estructure', {
    extend: 'Ext.data.TreeStore',
    model: 'Registro.model.EstructureModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});