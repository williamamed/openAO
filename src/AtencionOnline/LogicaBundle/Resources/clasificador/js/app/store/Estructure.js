Ext.define('GestEstructure.store.Estructure', {
    extend: 'Ext.data.TreeStore',
    model: 'GestEstructure.model.EstructureModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});