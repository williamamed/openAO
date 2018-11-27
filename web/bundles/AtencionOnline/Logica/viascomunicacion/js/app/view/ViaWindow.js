 Ext.define('ViasComunicacion.view.ViaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.viawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Adicionar via de comunicacion',
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
                                fieldLabel: 'Nombre',
                                allowBlank: false,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'nombre'
                            },{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tipo',
                    defaultType: 'checkboxfield',
                    labelAlign: 'top',
                    items: [
                        {
                            boxLabel: 'Anónimo',
                            name: 'anonimo'
                        }
                    ]
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


