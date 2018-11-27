Ext.define('ViasComunicacion.view.CompararList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.compararlist',
    
    store: 'Via',
    title: '',
    iconCls:'' ,
   
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        }];
        
      this.on('select',this.onSelectIt,this);  
        
        
        this.callParent();
    },
   onSelectIt:function(a,record){
       if(this.recordSelect.get('id')!=record.get('id'))
           this.up('window').down('button[action=save]').enable();
       else
           this.up('window').down('button[action=save]').disable();
   }
});

