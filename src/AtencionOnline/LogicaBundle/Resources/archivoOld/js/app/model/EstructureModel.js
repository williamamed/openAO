Ext.define('Registro.model.EstructureModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'index','description','incidencias','action'],
    
    proxy: {
        type: 'ajax',
        url: 'archivo/listestructure',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});