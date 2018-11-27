 Ext.define('Registro.view.IncidenciaWindow',{
        extend:'Ext.Window',
        width:700,
        autoHeight:true,
        modal:true,
        alias: 'widget.incidenciawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Adicionar incidencia',
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
                xtype:'tabpanel',
                items:[{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Datos del Promovente',
                        itemId:'first',
                        defaults: {margin: 5},
                        items:[{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y Apellidos',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'nombreApellidos'
                            }]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {margin: 5},
                        items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Sexo',
                                        allowBlank: true,
                                        blankText: 'Escoje el sexo..',
                                        width: '50%',
                                        labelAlign: 'top',
                                        name: 'sexo',
                                        store: 'Sexo',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        editable:false,
                                        valueField: 'value'
                                    },{
                                        xtype: 'registrospinner',
                                        fieldLabel: 'Edad',
                                        labelAlign: 'top',
                                        name:'edad',
                                        allowBlank: true,
                                        blankText: 'Debe especificar una edad',
                                        step: 1,
                                        width:'50%',
                                        maxLength: 2,
                                        
                                        editable: false,
                                        regex:/^([1-9]{1}\d*)$/,
                                        regexText:'Este valor es incorrecto, solo se permiten números y debe ser mayor que cero'
                                  }]
                    } ,{
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {margin: 5},
                        items: [ {
                                        xtype: 'combo',
                                        fieldLabel: 'Nivel escolar',
                                        allowBlank: true,
                                        blankText: 'Escoja el nivel escolar..',
                                        width: '50%',
                                        labelAlign: 'top',
                                        name: 'nivelEscolar',
                                        store: 'NivelEscolar',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        editable:false,
                                        valueField: 'value'
                                    },{
                                        xtype: 'combo',
                                        fieldLabel: 'Ocupación',
                                        allowBlank: true,
                                        blankText: 'Escoja la ocupación..',
                                        width: '50%',
                                        labelAlign: 'top',
                                        name: 'ocupacion',
                                        store: 'Ocupacion',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        editable:false,
                                        valueField: 'value'
                                    }]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {margin: 5},
                        items: [{
                                xtype:'textfield',
                                fieldLabel: 'Teléfono',
                                 labelAlign: 'top',
                                width:'50%',
                                name: 'telefono',
                                allowBlank: true,
                                regex:/^[0-9]{6,8}$/,
                                regexText:'Proporcione un teléfono válido'
                                },{
                                xtype:'textfield',
                                fieldLabel: 'Organismo o entidad a la que pertenece',
                                 labelAlign: 'top',
                                width:'50%',
                                name: 'entidadPertenece',
                                allowBlank: true
                               
                                }]
                    },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Dirección particular',
                                    width: '100%',
                                    name: 'direccion',
                                    labelAlign: 'top',
                                    blankText: 'Este campo es obligatorio',
                                    allowBlank: true
                                }]
                        }]
                },{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Datos de la incidencia',
                        defaults: {margin: 5},
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Contra quien va dirigida',
                                            labelAlign: 'top',
                                            width: '70%',
                                            name: 'dirigido',
                                            allowBlank: false
                                           
                                        },{
                            xtype: 'datefield',
                            width: '30%',
                            fieldLabel: 'Fecha',
                            name: 'fecha',
                            format: 'd/m/Y',
                            editable: false,
                            value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Síntesis del planteamiento',
                                    width: '100%',
                                    name: 'planteamiento',
                                    labelAlign: 'top',
                                    blankText: 'Este campo es obligatorio',
                                    allowBlank: false
                                }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Vía de comunicación',
                                        allowBlank: false,
                                        blankText: 'Escoja la vía..',
                                        width: '33.3%',
                                        labelAlign: 'top',
                                        name: 'idViasComunicacion',
                                        store: 'ViaComunicacion',
                                        queryMode: 'local',
                                        displayField: 'nombre',
                                        editable:false,
                                        valueField: 'id'
                                    },{
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de incidencia',
                                        allowBlank: false,
                                        blankText: 'Escoja el tipo de incidencia..',
                                        width: '33.3%',
                                        labelAlign: 'top',
                                        name: 'idTipo',
                                        store: 'Tipo',
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
                                        xtype: 'terminospinner',
                                        fieldLabel: 'Término de días',
                                        labelAlign: 'top',
                                        name:'termino',
                                        allowBlank: false,
                                        blankText: 'Debe especificar un número',
                                        step: 1,
                                        width:'33.3%',
                                        maxLength: 2,
                                        value:20,
                                        editable: false
                                       
                                  },{
                                            xtype: 'textfield',
                                            fieldLabel: 'Exp. Organismo central',
                                            labelAlign: 'top',
                                            width: '33.3%',
                                            name: 'expOc',
                                            allowBlank: true,
                                            regex:/^[0-9]{1,5}\/[0-9]{2}$/,
                                            regexText:'Proporcione Exp. Organismo central válido Ej. 5/15',
                                        }]
                        }]
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


