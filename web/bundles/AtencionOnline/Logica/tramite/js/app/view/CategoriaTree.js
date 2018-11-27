Ext.define('Registro.view.CategoriaTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.categoriatree',
    rootVisible: false,
    itemId:'clasifi',
    store: 'Categoria',
    title: '',
    iconCls:'',
    height:400,
    initComponent: function() {
        this.on('select',this.onSelect,this);
        this.callParent();
    },
    onSelect:function(a,record){
        if(record.get('leaf')==true){
            this.up('window').down('button[action=acept]').enable();
        }else{
            this.up('window').down('button[action=acept]').disable();
        }
    }
});

