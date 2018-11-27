Ext.define('Reporte.store.Tablas', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"Clasificador general"},
        {"value":1, "name":"Tipo de incidencia"},
        {"value":2, "name":"Vía de comunicación"},
        {"value":3, "name":"Incidencias por estructura"},
        {"value":4, "name":"Valoración quejas (Tipo)"},
        {"value":5, "name":"Valoración quejas (Conformidad)"}
    ]
});

