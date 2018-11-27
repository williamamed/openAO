 Ext.define('Registro.view.DetallesWindow',{
        extend:'Ext.Window',
        width:650,
        height:400,
        //autoHeight:true,
        
        bodyStyle:'overflow:none',
        
        
        
        modal:true,
        alias: 'widget.detalleswindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Datos de la incidencia',
        layout:'fit',
        
        initComponent:function(){
            var me=this;
            this.html='<iframe id="details-incidencia" style="border:none;width:100%;height:100%" src="archivo/print?id='+this.inc+'"></iframe>';
           
            
        this.buttons = [{   iconCls: 'icon-print',
                            text: 'Imprimir',
                            handler:function(){
                               window.frames[0].print();
                            }
                            
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
            this.on('show',function(){
                this.setLoading('Generando el modelo de incidencias ...');
                this.getEl().down('#details-incidencia').on('load',function(){
                    this.setLoading(false);
                },this)
            },this)
            
        } 
 
      
    })

