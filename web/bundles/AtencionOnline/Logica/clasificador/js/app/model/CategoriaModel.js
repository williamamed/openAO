Ext.define('GestEstructure.model.CategoriaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'index','description','leaf','action'],
    
    proxy: {
        type: 'ajax',
        url: 'clasificador/list',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});