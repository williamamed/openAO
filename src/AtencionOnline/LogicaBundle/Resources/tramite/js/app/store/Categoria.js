Ext.define('Registro.store.Categoria', {
    extend: 'Ext.data.TreeStore',
    model: 'Registro.model.CategoriaModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});