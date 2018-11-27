Ext.define('Registro.store.NivelEscolar', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        
        {"value":0, "name":"Primaria"},
        {"value":1, "name":"Secundaria"},
        {"value":2, "name":"Pre-Universitario"},
        {"value":3, "name":"Técnico medio"},
        {"value":4, "name":"Obrero calificado"},
        {"value":5, "name":"Universitario"},
        {"value":6, "name":"No tiene"}
       
     
    ]
});

