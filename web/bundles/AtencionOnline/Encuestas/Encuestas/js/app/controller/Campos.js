Ext.define('Encuestas.controller.Campos', {
    extend: 'Ext.app.Controller',
    stores: ['Pregunta','Campos'],
    models: ['GenericModel'],
    refs: [{
            ref: 'genericlist',
            selector: 'camposlist'
        },{
            ref: 'preguntaslist',
            selector: 'preguntaslist'
        },
        {
            ref: 'buttonAdd',
            selector: 'camposlist button[action=addCamposAction]'
        },
        {
            ref: 'buttonEdit',
            selector: 'camposlist button[action=editCamposAction]'
        },
        {
            ref: 'buttonDelete',
            selector: 'camposlist button[action=deleteCamposAction]'
        }
    ],
    init: function() {
        this.control({
            
            'camposwindow button[action=save]': {
                click: this.addAction
            },
            'camposlist button[action=addCamposAction]': {
                click: this.onAddAction
            },
            'camposlist button[action=editCamposAction]': {
                click: this.onEditAction
            },
            'camposlist button[action=deleteCamposAction]': {
                click: this.onDeleteAction
            },
           
            'camposlist': {
                beforeselect: this.onListSelect,
                beforedeselect: this.onListDeSelect
                
            },
            
            'viewport':{
                render:this.onRender
            }
        });
       
    },
    onRender:function(){
        //Make Raptor control the UI to activate the privilege
       // Raptor.controlActions();
       this.getCamposStore().on('beforeload',function(){
           this.getCamposStore().getProxy().setExtraParam('idPregunta',this.getPreguntaslist().getSelectionModel().getLastSelected().get('id'));
       },this);
    },
    
    onListSelect: function() {
       this.getButtonDelete().enable();
       this.getButtonEdit().enable(); 
       
    },
    onListDeSelect: function() {
       this.getButtonDelete().disable();
       this.getButtonEdit().disable(); 
       
        
    },
   
    onAddAction: function() {
        var view = Ext.widget('camposwindow');
    },
    
    onEditAction: function() {
        var view = Ext.widget('camposwindow', {action: 'edit',title:'Editar campo'});
        view.down('form').loadRecord(this.getGenericlist().getSelectionModel().getLastSelected());
          
    },
    
    onDeleteAction: function() {
       Raptor.msg.show(2,'Está a punto de eliminar este campo.<br>¿Está seguro?', this.deleteAction, this);
    },
    
    addAction:function(button){
        var win=button.up('window');
       
        if(win.action=='edit'){
            this.update(win.down('form'),'admin/editCampo');
        }else{
            this.insert(win.down('form'),'admin/insertCampo');
        }
    },
    
    insert:function(form,url){
        form.submit({
            url: url,
            waitMsg: 'Espere por favor..',
            params:{
                idPregunta:this.getPreguntaslist().getSelectionModel().getLastSelected().get('id'),
            },
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
            url: 'admin/deleteCampo',
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


