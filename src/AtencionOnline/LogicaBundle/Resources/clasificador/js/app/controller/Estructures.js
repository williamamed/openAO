Ext.define('GestEstructure.controller.Estructures', {
    extend: 'Ext.app.Controller',
    stores: ['Estructure'],
    models: ['EstructureModel'],
    refs: [
        {
            ref: 'estructuretree',
            selector: 'estructuretree'
        },
        {
            ref: 'buttonAdd',
            selector: 'viewport button[action=add]'
        },
       
        {
            ref: 'buttonEdit',
            selector: 'viewport button[action=edit]'
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
            
            'viewport button[action=edit]': {
                click: this.onEdit
            },
            'viewport button[action=delete]': {
                click: this.onDelete
            },
            'estructurewindow button[action=save]': {
                click: this.add
            },
            'categoriawindow button[action=acept]': {
                click: this.delete
            },
            
            'estructuretree': {
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                beforeitemexpand:this.onBeforeItemExpand,
                itemexpand:this.onItemExpand,
                beforeselect: this.onTreeSelect,
                beforedeselect: this.onTreeDeSelect
            },
            'viewport':{
                render:this.onRender
            }
        });
       
    },
     onRender:function(){
//        Raptor.controlActions();
    },
   
    activateButtons:function(model){
        if(model.get('id')!='root'){
             if(this.getButtonAdd())
            this.getButtonAdd().enable();
            if(this.getButtonEdit())
            this.getButtonEdit().enable();
            if(this.getButtonDelete())
            this.getButtonDelete().enable();
        }else{
             if(this.getButtonAdd())
            this.getButtonAdd().enable();
            if(this.getButtonEdit())
            this.getButtonEdit().disable();
             if(this.getButtonDelete())
            this.getButtonDelete().disable();
        }
        
        
    },        
    onTreeSelect: function(me,model) {
        
        
        if(model.get('indexrender')==true){
            this.onTreeDeSelect();
            this.activateButtons(model)
        }else{
            this.activateButtons(model)
            
        }
        if(model.getDepth()===2){
           this.getButtonAdd().disable();
        }else{
           this.getButtonAdd().enable();
        }
            
    },
    onTreeDeSelect: function() {
       if(this.getButtonEdit())
        this.getButtonEdit().disable();
      if(this.getButtonDelete())
        this.getButtonDelete().disable();
      if(this.getButtonAdd())
        this.getButtonAdd().disable();
      
    },
     
    onAdd: function() {
        var view = Ext.widget('estructurewindow');
    },
    
    onEdit: function() {
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
       
        
       
            var view = Ext.widget('estructurewindow', {action: 'edit',title:'Editar clasificador'});
            var form=view.down('form');
            form.loadRecord(model);
           
       
        
    },
    
    onDelete: function() {
       Raptor.msg.confirm("¿Está a punto de eliminar este clasificador, está seguro?", this.onChoseDelete, this);
    },
    
    add:function(button){
        var win=button.up('window');
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        if(win.action=='edit'){
            this.update(win.down('form'),'clasificador/edit',model);
        }else{
            this.insert(win.down('form'),'clasificador/insert',model);
        }
    },
    
    
    
    insert:function(form,url,model){
        form.submit({
            url: url,
            waitMsg: 'Espere mientras se realiza la acción..',
            params:{index: model.get('id')},
            success: function(formBasic, action) {
                form.up('window').close();
                this.onTreeDeSelect();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getEstructureStore().load({
                    node:model,
                    callback:function(){
                                model.expand();
                                this.getEstructuretree().getSelectionModel().deselectAll();
                                
                     },
                    scope:this
                });
                
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
    },
    update:function(form,url,model){
        form.submit({
            url: url,
            waitMsg: 'Espere mientras se realiza la acción..',
            params:{id: model.get('id')},
            success: function(formBasic, action) {
                form.up('window').close();
                this.onTreeDeSelect();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getEstructureStore().load({
                    node:model.parentNode,
                    callback:function(){
                                if(model.parentNode)
                                model.parentNode.expand();
                                this.getEstructuretree().getSelectionModel().deselectAll();
                               
                     },
                    scope:this
                });
                
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
    },
    
    onChoseDelete:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        if(model.isLeaf()){
            
            Ext.Ajax.request({
                url: 'clasificador/verificar',
                params:{id: model.get('id')},
                callback: function() {
                    this.getEstructuretree().setLoading(false);
                },
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                   
                    if(obj.cod && obj.cod==6 ){
                        if(obj.have==1){
                            var view = Ext.widget('categoriawindow',{model:model});
                            Raptor.msg.error("<b>No se pudo eliminar este clasificador por la siguiente razón:</b><br>Debe escoger un clasificador sustituto para las incidencias que se encuentran clasificadas con <b>"+model.get('text')+"</b>.");
                        }else{
                           this.delete();
                        }
                    }
                    
                },
                failure: function(response, opts) {
                     Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
                },
                scope: this
            });
            this.getEstructuretree().setLoading("Verificando dependencias ....");
        }else
            this.delete();
        
    },
    
    delete: function(btn) {
        var to=0;
        if(btn){
            var win=btn.up('window');
            to=win.getSelectedNodeWindow().get('id');
            win.close();
        }
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        var wait=Raptor.msg.wait('Espera mientras se realiza la acción ...');
        Ext.Ajax.request({
            url: 'clasificador/delete',
            params:{id: model.get('id'),to:to},
            callback: function() {
                wait.close();
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                
                if(obj.cod&&obj.cod==1){
                    this.getEstructureStore().load({
                        node:model.parentNode,
                        callback:function(){
                                    if(model.parentNode)
                                        model.parentNode.expand();
                                    this.getEstructuretree().getSelectionModel().deselectAll();
                                    
                         },
                        scope:this
                    });
                }else{
                    this.getEstructuretree().getSelectionModel().deselectAll();
                }
                
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
       
       this.onTreeDeSelect();
    },
    onBeforeItemExpand:function(node){
//       node.set('iconCls','')
    },
    onItemExpand:function(node){
//       node.set('iconCls','icon-house')
    },
    onBeforeLoad:function(){
        
        
//        this.getPrivilegeStore().getProxy().extraParams={id:this.getPrivilegetree().getSelectionModel().getLastSelected().get('id')};
    },
    onLoad:function(tree,node,records){
//       node.expand();
//       this.getButtonPrivilegeAsign().enable();
//       if (this.getPrivilegeTree().getChecked().length > 1)
//            node.set('checked', true);
//       else
//            node.set('checked', false);
        Ext.each(records,function(value,index){
            if(value.getDepth()==2){
                value.set('iconCls','icon-house');
                value.set('leaf',true);
            }
        })
    }


});


