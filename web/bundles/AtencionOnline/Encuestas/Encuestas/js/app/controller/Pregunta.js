Ext.define('Encuestas.controller.Pregunta', {
    extend: 'Ext.app.Controller',
    stores: ['Pregunta','Campos'],
    models: ['GenericModel'],
    refs: [{
            ref: 'genericlist',
            selector: 'preguntaslist'
        },
        
        {
            ref: 'Encuestalist',
            selector: 'genericlist'
        },
        {
            ref: 'buttonAdd',
            selector: 'preguntaslist button[action=addPreguntaAction]'
        },
        {
            ref: 'buttonEdit',
            selector: 'preguntaslist button[action=editPreguntaAction]'
        },
        {
            ref: 'buttonDelete',
            selector: 'preguntaslist button[action=deletePreguntaAction]'
        },
        {
            ref: 'buttonAddCampos',
            selector: 'camposlist button[action=addCamposAction]'
        },
        {
            ref: 'buttonEditCampos',
            selector: 'camposlist button[action=editCamposAction]'
        },
        {
            ref: 'buttonDeleteCampos',
            selector: 'camposlist button[action=deleteCamposAction]'
        }
    ],
    init: function() {
        this.control({
            
            'preguntawindow button[action=save]': {
                click: this.addAction
            },
            'preguntaslist button[action=addPreguntaAction]': {
                click: this.onAddAction
            },
            'preguntaslist button[action=editPreguntaAction]': {
                click: this.onEditAction
            },
            'preguntaslist button[action=deletePreguntaAction]': {
                click: this.onDeleteAction
            },
            
            'preguntaslist': {
                select: this.onListSelect,
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
       this.getPreguntaStore().on('beforeload',function(){
           this.getPreguntaStore().getProxy().setExtraParam('idEncuesta',this.getEncuestalist().getSelectionModel().getLastSelected().get('id'));
           this.getCamposStore().removeAll();
       },this);
       
    },
    
    onListSelect: function(t,record) {
       this.getButtonDelete().enable();
       this.getButtonEdit().enable(); 
       if(record.get('tipo')==2){
           this.getCamposStore().removeAll();
           this.getButtonAddCampos().disable();
       }else{
           
           this.getButtonAddCampos().enable();
            this.getCamposStore().load({
                param:{
                    idPregunta: record.get('id')
                }
            })
       }
    },
    onListDeSelect: function() {
       this.getButtonDelete().disable();
       this.getButtonEdit().disable(); 
       
       this.getButtonDeleteCampos().disable();
       this.getButtonEditCampos().disable();
       this.getButtonAddCampos().disable();
        
    },
   
    onAddAction: function() {
        var view = Ext.widget('preguntawindow');
    },
    
    onEditAction: function() {
        var view = Ext.widget('preguntawindow', {action: 'edit',title:'Editar pregunta'});
        view.down('form').loadRecord(this.getGenericlist().getSelectionModel().getLastSelected());
          
    },
    
    onDeleteAction: function() {
       Raptor.msg.show(2,'Está a punto de eliminar esta pregunta.<br>¿Está seguro?', this.deleteAction, this);
    },
    
    addAction:function(button){
        var win=button.up('window');
       
        if(win.action=='edit'){
            this.update(win.down('form'),'admin/editPregunta');
        }else{
            this.insert(win.down('form'),'admin/insertPregunta');
        }
    },
    
    insert:function(form,url){
        
        form.submit({
            url: url,
            waitMsg: 'Espere por favor..',
            params:{
                idEncuesta:this.getEncuestalist().getSelectionModel().getLastSelected().get('id')
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
            url: 'admin/deletePregunta',
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


