 Ext.define('GestEstructure.view.EstructureWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.estructurewindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Adicionar indicador',
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
                            fieldLabel: 'Nombre del clasificador',
                            allowBlank: false,
                            maxLength: 100,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'name'
                        },{
                            xtype: 'textarea',
                            fieldLabel: 'Descripción',
                            allowBlank: true,
                            maxLength: 200,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'description'
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


