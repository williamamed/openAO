Ext.define('Encuestas.store.Estado', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Abierta',    value: 0},
         {name: 'En espera', value: 1},
         {name: 'Cerrada', value: 2}
     ]
});