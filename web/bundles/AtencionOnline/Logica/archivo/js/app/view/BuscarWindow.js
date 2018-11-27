 Ext.define('Registro.view.BuscarWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.buscarwindow',
        autoShow: true,
         iconCls: 'icon-search',
        closeAction:'destroy',
        title:'Buscar por ...',
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
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y apellidos',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'nombre'
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Recibida por',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'recibida'
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                            xtype: 'datefield',
                            width: '100%',
                            fieldLabel: 'Desde fecha',
                            name: 'desde',
                            editable: false,
                            //value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                            xtype: 'datefield',
                            width: '100%',
                            fieldLabel: 'Hasta fecha',
                            name: 'hasta',
                            editable: false,
                            //value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Dirigido contra',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'dirigido'
                            }]
                    },{
                            xtype: 'container',
                            layout: 'hbox',
                           defaults: {margin: 5},
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Vía de comunicación',
                                        allowBlank: true,
                                        blankText: 'Escoja la vía..',
                                        width: '100%',
                                        labelAlign: 'top',
                                        name: 'idViasComunicacion',
                                        store: 'ViaComunicacion',
                                        queryMode: 'local',
                                        displayField: 'nombre',
                                        editable:false,
                                        valueField: 'id'
                                    }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de incidencia',
                                        allowBlank: true,
                                        blankText: 'Escoja el tipo de incidencia..',
                                        width: '100%',
                                        labelAlign: 'top',
                                        name: 'idTipo',
                                        store: 'Tipo',
                                        queryMode: 'local',
                                        displayField: 'nombre',
                                        editable:false,
                                        valueField: 'id'
                                    }]
                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-search',
                            text: 'buscar',
                            action: 'search'
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


