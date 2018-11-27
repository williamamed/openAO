 Ext.define('Encuestas.view.PreguntaWindow',{
        extend:'Ext.Window',
        width:500,
        autoHeight:true,
        modal:true,
        alias: 'widget.preguntawindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar pregunta",
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
                            fieldLabel: 'Texto de la pregunta',
                            allowBlank: false,
                            maxLength: 255,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'pregunta'
                            
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Tipo de pregunta',
                            allowBlank: false,
                            store:'Tipo',
                            width: '100%',
                            labelAlign: 'top',
                            name: 'tipo',
                            queryMode:'local',
                            displayField:'name',
                            editable:false,
                            valueField:'value'
                        },{
                            xtype: 'checkbox',
                            fieldLabel: 'Opcional',
                            name: 'opcional',
                            labelAlign: 'top'
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


