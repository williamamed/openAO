Ext.define('Encuestas.controller.Generic', {
    extend: 'Ext.app.Controller',
    stores: ['Generic','Pregunta','Campos'],
    models: ['GenericModel'],
    refs: [{
            ref: 'genericlist',
            selector: 'genericlist'
        },
        {
            ref: 'buttonAdd',
            selector: 'viewport button[action=addAction]'
        },
        {
            ref: 'buttonEdit',
            selector: 'viewport button[action=editAction]'
        },
        {
            ref: 'buttonDel',
            selector: 'viewport button[action=delAction]'
        },
        {
            ref: 'buttonDiseno',
            selector: 'viewport button[action=disenoAction]'
        },
        {
            ref: 'buttonResultados',
            selector: 'viewport button[action=resultadosAction]'
        },
        {
            ref: 'buttonDelete',
            selector: 'viewport button[action=deleteAction]'
        }
    ],
    init: function() {
        this.control({
            
            'encuestawindow button[action=save]': {
                click: this.addAction
            },
            'viewport button[action=addAction]': {
                click: this.onAddAction
            },
            'viewport button[action=editAction]': {
                click: this.onEditAction
            },
            'viewport button[action=delAction]': {
                click: this.onDeleteAction
            },
            'viewport button[action=disenoAction]': {
                click: this.onDisenoAction
            },
            'viewport button[action=resultadosAction]': {
                click: this.onResultadosAction
            },
            'genericlist': {
                beforeselect: this.onListSelect,
                beforedeselect: this.onListDeSelect,
                edit: this.onListEdit
            },
            
            'viewport':{
                render:this.onRender
            }
        });
       
    },
    onRender:function(){
        //Make Raptor control the UI to activate the privilege
       Raptor.controlActions();
    },
    
    onListSelect: function() {
       this.getButtonDel().enable();
       this.getButtonEdit().enable(); 
       this.getButtonDiseno().enable(); 
       this.getButtonResultados().enable(); 
    },
    onListDeSelect: function() {
       this.getButtonDel().disable();
       this.getButtonEdit().disable(); 
       this.getButtonDiseno().disable(); 
       this.getButtonResultados().disable();  
    },
    onResultadosAction:function(){
        var model=this.getGenericlist().getSelectionModel().getLastSelected();
        var view = Ext.widget('graficowindow');
        this.getPreguntaStore().load();
    },
    onListEdit: function(editor,e){
        
        var model=this.getGenericlist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'admin/cambiarestado',
            params:{id: model.get('id'),estado:e.record.get('estado'),anonimo:e.record.get('anonimo')},
            callback: function() {
                this.getGenericlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    e.record.commit();
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.show(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
       
        this.getGenericlist().setLoading('Cargando...');
    },
    onAddAction: function() {
        var view = Ext.widget('encuestawindow');
    },
    onDisenoAction:function(){
        var model=this.getGenericlist().getSelectionModel().getLastSelected();
        var view = Ext.widget('genericwindow');
        this.getPreguntaStore().load();
    },
    onEditAction: function() {
        var view = Ext.widget('encuestawindow', {action: 'edit',title:'Editar encuesta'});
        view.down('form').loadRecord(this.getGenericlist().getSelectionModel().getLastSelected());
          
    },
    
    onDeleteAction: function() {
       Raptor.msg.show(2,'Está a punto de eliminar esta encuesta.<br>¿Está seguro?', this.deleteAction, this);
    },
    
    addAction:function(button){
        var win=button.up('window');
       
        if(win.action=='edit'){
            this.update(win.down('form'),'admin/edit');
        }else{
            this.insert(win.down('form'),'admin/insert');
        }
    },
    
    insert:function(form,url){
        form.submit({
            url: url,
            waitMsg: 'Espere por favor..',
            params:{},
            success: function(formBasic, action) {
                form.up('window').close();
                
                this.getGenericlist().getSelectionModel().deselectAll();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getGenericlist().getStore().load();
                
            },
            failure: function(formBasic, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Raptor.msg.error('¡Parece que se ha equivocado!<br>Campo nombre es incorrecto');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Raptor.msg.show(3, 'Ajax communication failed');
                        break;
                }

                if (action.result && action.result.cod) {
                    Raptor.msg.show(action.result.cod, action.result.msg);
                }
               
            },
            scope: this
        });
    },
    update:function(form,url){
        var idaction=this.getGenericlist().getSelectionModel().getLastSelected().get('id');
        form.submit({
            url: url,
            waitMsg: 'Espere por favor..',
            params:{id: idaction},
            success: function(formBasic, action) {
                form.up('window').close();
                this.getGenericlist().getSelectionModel().deselectAll();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getGenericlist().getStore().load();
                
            },
            failure: function(formBasic, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Raptor.msg.error('¡Parece que se ha equivocado!<br>Campo nombre es incorrecto');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Raptor.msg.show(3, 'Ajax communication failed');
                        break;
                }

                if (action.result && action.result.cod) {
                    Raptor.msg.show(action.result.cod, action.result.msg);
                }
               
            },
            scope: this
        });
    },
    
    
    deleteAction: function() {
        var model=this.getGenericlist().getSelectionModel().getLastSelected();
       
        var wait=Raptor.msg.show(4,'Espere por favor..');
        Ext.Ajax.request({
            url: 'admin/delete',
            params:{id: model.get('id')},
            callback: function() {
                wait.close();
                
                this.getGenericlist().getSelectionModel().deselectAll();
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getGenericlist().getStore().load();
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.show(3, 'Ajax communication failed');
            },
            scope: this
        });
       
      
    }

});


