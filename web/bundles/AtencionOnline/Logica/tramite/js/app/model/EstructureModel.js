Ext.define('Registro.model.EstructureModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'indexe','description','incidencias','action'],
    
    proxy: {
        type: 'ajax',
        url: 'tramite/listestructure',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});