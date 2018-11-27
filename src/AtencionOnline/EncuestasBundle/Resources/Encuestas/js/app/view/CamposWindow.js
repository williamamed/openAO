 Ext.define('Encuestas.view.CamposWindow',{
        extend:'Ext.Window',
        width:500,
        autoHeight:true,
        modal:true,
        alias: 'widget.camposwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar campo",
        layout:'fit',
        initComponent:function(){
            this.items = {
            labelAlign: 'top',
            frame: true,
            xtype: 'form',
            layout: 'anchor',
            bodyStyle: 'padding:5px 5px 5px 5px',
            defaults: {frame: true, anchor: '100%'},
            items: [{
                            xtype: 'textarea',
                            fieldLabel: 'Texto de la respuesta',
                            allowBlank: false,
                            maxLength: 255,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'respuesta'
                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })


