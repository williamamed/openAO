/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Password', {
    extend: 'Ext.window.Window',

    layout: 'anchor',
    title: 'Cambiar contraseña',
    modal: true,
    width: 340,
    iconCls:'icon-update',
    autoHeight: true,
    border: false,

    initComponent: function () {
        var me = this;

      

        me.buttons = [
            { text: 'Aceptar',iconCls:'icon-acept', handler: me.onOK, scope: me },
            { text: 'Cancelar',iconCls:'icon-cancel', handler: me.close, scope: me }
        ];

        me.items = {
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
                                inputType:'password',
                                fieldLabel: 'Contraseña Actual',
                                allowBlank: false,
                                enableKeyEvents:true,
                                listeners:{
                                    keypress:function(t,e){
                                        if(e.getKey()===e.ENTER)
                                            me.onOK();
                                    }
                                },
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'currentpassword'
                                
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                inputType:'password',
                                fieldLabel: 'Nueva contraseña',
                                allowBlank: false,
                                enableKeyEvents:true,
                                listeners:{
                                    keypress:function(t,e){
                                        if(e.getKey()===e.ENTER)
                                            me.onOK();
                                    }
                                },
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'password'
                                
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Repetir contraseña',
                                inputType:'password',
                                enableKeyEvents:true,
                                listeners:{
                                    keypress:function(t,e){
                                        if(e.getKey()===e.ENTER)
                                            me.onOK();
                                    }
                                },
                                allowBlank: false,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'passwordrepit'
                               
                            }]
                    }]
            };
            
        

        me.callParent();
    },

   

    onOK: function () {
        var me = this;
        var form=me.down('form');
        var t1=form.down('textfield[name=password]').getValue();
        var t2=form.down('textfield[name=passwordrepit]').getValue();
        if(t1!=t2){
            Dino.msg.info(1, "La contraseña y la confirmación no coinciden");
            return;
        }
        form.submit({
            url: 'portal/password',
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true},
            success: function(formBasic, action) {
                if(action.result.cod==1)
                    form.up('window').close();
                Raptor.msg.show(action.result.cod, action.result.msg);
                
            },
            failure: function(formBasic, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        var invalid = form.query("field{isValid()==false}");
                            var text = '¡Parece que se ha equivocado!<br>';
                            Ext.each(invalid, function(item) {
                                text += "El campo " + item.fieldLabel + " es incorrecto<br>";
                            });
                            Raptor.msg.error(text);
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
                        break;
                }

                if (action.result && action.result.cod) {
                    Raptor.msg.show(action.result.cod, action.result.msg);
                }
               
            },
            scope: this
        });
       
    }

    
});
