 Ext.define('ViasComunicacion.view.ViaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.viawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Adicionar período',
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
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha del período',
                                allowBlank: false,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                format: 'm/d/Y',
                                name: 'nombre',
                                value: new Date()
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textarea',
                                fieldLabel: 'Descripcion',
                                allowBlank: true,
                               
                                width: '100%',
                                labelAlign: 'top',
                                name: 'descripcion'
                               
                            }]
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


