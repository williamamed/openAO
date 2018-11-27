Ext.define('Registro.store.Razon', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"Con razón"},
        {"value":1, "name":"Con razón en parte"},
        {"value":2, "name":"Sin razón"},
        {"value":3, "name":"No se demuestra"}
       
     
    ]
});

