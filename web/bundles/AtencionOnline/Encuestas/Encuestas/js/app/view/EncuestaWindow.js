 Ext.define('Encuestas.view.EncuestaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.encuestawindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar encuesta",
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
                            xtype: 'textfield',
                            fieldLabel: 'Nombre de la encuesta',
                            allowBlank: false,
                            maxLength: 40,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'nombre'
                            
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


