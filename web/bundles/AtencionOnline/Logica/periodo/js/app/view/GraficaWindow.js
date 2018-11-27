 Ext.define('ViasComunicacion.view.GraficaWindow',{
        extend:'Ext.Window',
        width:800,
        height:500,
        modal:true,
        alias: 'widget.graficawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Gráfica',
        layout:'fit',
        iconCls:'icon-grafica',
        initComponent:function(){
            this.items = {
                        xtype: 'graficachart',
                        region:'center',
                        selectedSeries:this.selectedSeries
                    };
            
        this.buttons = [
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })


