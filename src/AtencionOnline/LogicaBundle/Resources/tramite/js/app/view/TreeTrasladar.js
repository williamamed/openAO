Ext.define('GestUser.view.Treetrasladar', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treetrasladar',
    rootVisible: false,
    store: 'Estructure',
    
    title: 'Estructuras',
    iconCls:'icon-estructure',
    height:400,
    collapsible:false,
    
    initComponent: function() {
        this.on('select',this.onSelect,this);
        this.callParent();
    },
    onSelect:function(a,record){
        if(record.get('id')!==this.currentNode){
            this.up('window').down('button[action=windowTrasladar]').enable();
        }else{
            this.up('window').down('button[action=windowTrasladar]').disable();
        }
    }
});

