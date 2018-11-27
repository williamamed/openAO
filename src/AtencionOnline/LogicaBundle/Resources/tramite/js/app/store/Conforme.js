Ext.define('Registro.store.Conforme', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":true, "name":"Si"},
        {"value":false, "name":"No"}
        
       
     
    ]
});

