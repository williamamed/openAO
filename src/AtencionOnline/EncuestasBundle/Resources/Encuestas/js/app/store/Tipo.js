Ext.define('Encuestas.store.Tipo', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Selección única',    value: 0},
         {name: 'Multi-selección', value: 1},
         {name: 'Texto', value: 2}
     ]
});