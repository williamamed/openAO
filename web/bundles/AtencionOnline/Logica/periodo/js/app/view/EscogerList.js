Ext.define('ViasComunicacion.view.EscogerList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.escogerlist',
    
    store: 'Via',
    title: '',
    iconCls:'icon-grafica' ,
    selType:'checkboxmodel',
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        }];
        
        
        
        
        this.callParent();
    }
});

