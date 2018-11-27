Ext.define('Encuestas.store.TipoEncuesta', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Anónimo',    value: true},
         {name: 'Datos personales requeridos', value: false}
     ]
});