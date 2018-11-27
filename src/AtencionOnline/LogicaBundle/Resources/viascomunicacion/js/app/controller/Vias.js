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


