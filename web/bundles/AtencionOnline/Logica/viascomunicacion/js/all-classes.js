
Ext.define('ViasComunicacion.model.ViaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','anonimo'],
    
    proxy: {
        type: 'ajax',
        //url:'viascomunicacion/list',
        api: {
            read: 'viascomunicacion/list',
            update: 'viascomunicacion/edit',
            create:'viascomunicacion/insert',
            destroy: 'viascomunicacion/delete'
        },
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success'
        }
    }
});
Ext.define('ViasComunicacion.store.Via', {
    extend: 'Ext.data.Store',
    model: 'ViasComunicacion.model.ViaModel'
});
Ext.define('ViasComunicacion.controller.Vias', {
    extend: 'Ext.app.Controller',
    stores: ['Via'],
    models: ['ViaModel'],
    refs: [{
            ref: 'vialist',
            selector: 'vialist'
        },
        
        {
            ref: 'buttonEdit',
            selector: 'viewport button[action=update]'
        },
        {
            ref: 'buttonAdd',
            selector: 'viewport button[action=add]'
        },
        {
            ref: 'buttonDelete',
            selector: 'viewport button[action=delete]'
        }
       
    ],
    init: function() {
        this.control({
            'viewport button[action=add]': {
                click: this.onAdd
            },
            'viewport button[action=update]': {
                click: this.onUpdate
            },
            'viewport button[action=delete]': {
                click: this.onDelete
            },
           
            'viawindow button[action=save]': {
                click: this.updateUser
            },
            'vialist': {
                beforeselect: this.onListSelect,
                beforedeselect: this.onListDeSelect
               
            },
           
            'viewport':{
                render:this.onRender
            }
           
        });

        
    },
   
  
    onRender:function(){
        
       // this.getVialist().getStore().on('load',this.onLoadList,this)
//        Raptor.controlActions();
        this.getVialist().getStore().load();
        
    },
    onLoadList:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
            if(model){
             if(this.getButtonAdd())
                this.getButtonAdd().enable();
             this.getSearch().enable();
            }
        
       
    },
    onBeforeLoadList:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        this.getUserlist().getStore().getProxy().extraParams={idEstructure: model.get('id')};
         if(this.getButtonAdd())
       this.getButtonAdd().disable();
       this.onListDeSelect();
       
    },
    onAdd: function() {
        var view = Ext.widget('viawindow', {action: 'add'});
        
    },
    onUpdate: function() {
        var view = Ext.widget('viawindow', {action: 'edit',title:'Editar vía de comunicación'});
       
        view.down('form').loadRecord(this.getVialist().getSelectionModel().getLastSelected());
       
    },
    
    updateUser: function(button) {
        var win = button.up('window');
        if (win.action == 'edit') {

            var form = win.down('form'),
                    record = form.getRecord();
                    
            this.editUser(form, 'viascomunicacion/edit', record.get('id'));
          

        }

        if (win.action == 'add') {

            var form = win.down('form');
           this.insertUser(form, 'viascomunicacion/insert');
           

        }

    },
    onDelete: function() {

        Raptor.msg.confirm("¿Está a punto de eliminar una vía de comunicación, está seguro?", this.deleteUser, this);
    },
    deleteUser: function() {
        var model=this.getVialist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'viascomunicacion/delete',
            params:{id: model.get('id')},
            callback: function() {
                this.getVialist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getViaStore().load();
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
        this.getVialist().getSelectionModel().deselectAll();
        this.getVialist().setLoading('Cargando..');
    },
    onListSelect: function() {
         if(this.getButtonEdit())
        this.getButtonEdit().enable();
         if(this.getButtonDelete())
        this.getButtonDelete().enable();
       
        
    },
    onListDeSelect: function() {
        if(this.getButtonEdit())
        this.getButtonEdit().disable();
        if(this.getButtonDelete())
        this.getButtonDelete().disable();
       
    },
    insertUser: function(form, url) {
        
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true},
            success: function(formBasic, action) {
                form.up('window').close();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getVialist().getSelectionModel().deselectAll();
                this.getViaStore().load();
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
        form.up('window').hide();
    },
    editUser: function(form, url, id) {
        
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true, id: id},
            success: function(formBasic, action) {
                form.up('window').close();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getVialist().getSelectionModel().deselectAll();
                this.getViaStore().load();
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
        form.up('window').hide();
    }


});



Ext.define('ViasComunicacion.view.ViaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vialist',
    
    store: 'Via',
    title: 'Nomenclador de vías de comunicación',
    iconCls:'icon-user',
    
    initComponent: function() {
        this.columns = [{
            header:'Nombre',
            dataIndex: 'nombre',
            flex: 2
        },{
            header:'Anónimo',
            dataIndex: 'anonimo',
            renderer:function(value){
                if(value)
                    return '<b style="color:green">Sí</b>';
                else
                    return '<b >No</b>';
            },
            flex: 2
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insert',
                action:'add',
                
                disabled:false,
                iconCls:'icon-add'
            },{
                xtype: 'button',
                text: 'Editar',
                privilegeName:'edit',
                disabled:true,
                
                action:'update',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                disabled:true,
                
                action:'delete',
                iconCls:'icon-del'  
            }]
        }];
        
        this.callParent();
    }
});


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



Ext.define('ViasComunicacion.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'vialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});