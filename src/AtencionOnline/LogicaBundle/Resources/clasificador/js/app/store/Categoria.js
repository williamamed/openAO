Ext.define('GestEstructure.store.Categoria', {
    extend: 'Ext.data.TreeStore',
    model: 'GestEstructure.model.CategoriaModel',
   
    root: {
        text: "Global",
        expandable:false,
        loaded:true
        
    }
});