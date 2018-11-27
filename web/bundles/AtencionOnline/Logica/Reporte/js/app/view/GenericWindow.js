 Ext.define('Reporte.view.GenericWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.genericwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Generic window",
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
                            fieldLabel: 'Test field',
                            allowBlank: false,
                            maxLength: 40,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'name'
                            
                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Acept',
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancel',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })

