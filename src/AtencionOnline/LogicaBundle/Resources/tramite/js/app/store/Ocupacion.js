Ext.define('Registro.store.Ocupacion', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"No tiene"},
        {"value":5, "name":"Se deconoce"},
        {"value":1, "name":"Estudiante"},
        {"value":2, "name":"Servicio"},
        {"value":3, "name":"Técnico"},
        {"value":4, "name":"Dirigente"}
       
     
    ]
});

