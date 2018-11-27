Ext.define('Registro.model.IncidenciaModel', {
    extend: 'Ext.data.Model',
    fields: ['id',
        'nombreApellidos',
        'estado',
        'noConsecutivo',
        'expOc',
        'fecha',
        'sexo',
        'edad',
        'nivelEscolar',
        'ocupacion',
        'direccion',
        'telefono',
        'dirigido',
        'traslada',
        'entidadPertenece',
        'planteamiento',
        'recibe',
        'respuesta',
        'razon',
        'conforme',
        'termino',
        'idEstructure',
        'idClasificador',
        'idTipo',
        'tipo',
        'idViasComunicacion',
        'vcomunicacion',
        'nameClasificador'
    ],
    
    proxy: {
        type: 'ajax',
        
        api: {
            read: 'archivo/list',
            update: 'registro/edit',
            create:'registro/insert',
            destroy: 'registro/delete'
        },
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success', 
            totalProperty: 'result'
        }
    }
});