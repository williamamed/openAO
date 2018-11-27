Ext.define('GestUser.view.EstructureTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.estructuretree',
    rootVisible: false,
    store: 'Estructure',
    
    title: 'Estructuras',
    iconCls:'icon-estructure',
    height:400,
    collapsible:false,
    initComponent: function() {
        
        this.callParent();
    }
});

