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
                        defaults: {margin: 5},
                        items:[{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y Apellidos',
                                allowBlank: false,
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
                            xtype: 'datefield',
                            width: '33.3%',
                            fieldLabel: 'Fecha',
                            name: 'fecha',
                            format:'m/d/Y',
                            editable: false,
                            value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Sexo',
                                        allowBlank: false,
                                        blankText: 'Escoje el sexo..',
                                        width: '33.3%',
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
                                        allowBlank: false,
                                        blankText: 'Debe especificar una edad',
                                        step: 1,
                                        width:'33.3%',
                                        maxLength: 2,
                                        value:10,
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
                                        allowBlank: false,
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
                                        allowBlank: false,
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
                                allowBlank: false,
                                regex:/^[A-Za-z ]+$/,
                                regexText:'Proporcione una entidad válida'
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
                                    allowBlank: false
                                }]
                        }]
                },{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Especificidades de la incidencia',
                        defaults: {margin: 5},
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Contra quien va dirigida',
                                            labelAlign: 'top',
                                            width: '100%',
                                            name: 'dirigido',
                                            allowBlank: false,
                                            regex: /^[A-Za-z ]+$/,
                                            regexText: 'Texto inválido'
                                        }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Sintesis del plateamiento',
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
                                    },{
                                            xtype: 'textfield',
                                            fieldLabel: 'Se traslada a',
                                            labelAlign: 'top',
                                            width: '33.3%',
                                            name: 'traslada',
                                            allowBlank: false,
                                            regex: /^[A-Za-z ]+$/,
                                            regexText: 'Texto inválido'
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
                                        value:30,
                                        editable: false
                                       
                                  },{
                                            xtype: 'textfield',
                                            fieldLabel: 'No. consecutivo',
                                            labelAlign: 'top',
                                            width: '33.3%',
                                            name: 'noConsecutivo',
                                            allowBlank: false,
                                            regex:/^[0-9]{1,5}\/[0-9]{2}$/,
                                            regexText:'Proporcione No. consecutivo válido Ej. 5/15',
                                           
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
                },{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Respuesta de la incidencia',
                        defaults: {margin: 5},
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Sintesis del plateamiento',
                                    width: '100%',
                                    name: 'respuesta',
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
                                        fieldLabel: 'Razón',
                                        allowBlank: false,
                                        blankText: 'Este elemento es obligatorio..',
                                        width: '33.3%',
                                        labelAlign: 'top',
                                        name: 'razon',
                                        store: 'Razon',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        editable:false,
                                        valueField: 'value'
                                    },{
                                        xtype: 'combo',
                                        fieldLabel: 'Conforme',
                                        allowBlank: false,
                                        blankText: 'Escoja el tipo de incidencia..',
                                        width: '33.3%',
                                        labelAlign: 'top',
                                        name: 'conforme',
                                        store: 'Conforme',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        editable:false,
                                        valueField: 'value'
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


