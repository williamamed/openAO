Ext.define('Registro.controller.Incidencias', {
    extend: 'Ext.app.Controller',
    stores: ['Incidencia'],
    models: ['IncidenciaModel'],
    refs: [{
            ref: 'userlist',
            selector: 'incidencialist'
        },
        {
            ref: 'estructuretree',
            selector: 'estructuretree'
        },
        {
            ref: 'passwordContainer',
            selector: '#passContainer'
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
        },
        {
            ref: 'buttonTramite',
            selector: 'viewport button[action=tramite]'
        },
        {
            ref: 'search',
            selector: 'viewport button[action=buscar]'
        },
        {
            ref: 'trasladar',
            selector: 'viewport button[action=trasladar]'
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
            'viewport button[action=tramite]': {
                click: this.onTramite
            },
            'userwindow checkbox': {
                change: this.onCheckChange
            },
            'incidenciawindow button[action=save]': {
                click: this.updateUser
            },
            'incidenciawindow combo[name=idViasComunicacion]': {
                select: this.onComboSelect
            },
            'viewport button[action=buscar]': {
                click: this.onSearch
            },
            'buscarwindow button[action=search]': {
                click: this.search
            },
            'trasladarwindow button[action=windowTrasladar]': {
                click: this.trasladar
            },
            'viewport button[action=trasladar]': {
                click: this.onTrasladar
            },
            'incidencialist': {
                beforeselect: this.onListSelect,
                beforedeselect: this.onListDeSelect,
                
            },
            'estructuretree':{
                select: this.onTreeSelect,
                beforedeselect: this.onTreeBeforeDeSelect,
                load: this.onTreeLoad,
                render: this.onTreeRender
            },
            'viewport':{
                render:this.onRender
            },
            'viewport textfield[action=search]':{
                keyup:this.onSearch
            }
            
        });

        
    },
          
    onTrasladar:function(){
        var view = Ext.widget('trasladarwindow',{modelSelected:this.getEstructuretree().getSelectionModel().getLastSelected()});
        
    },
    trasladar:function(btn){
        var tree=btn.up('window').down('treepanel');
        var model=this.getUserlist().getSelectionModel().getLastSelected();
        var wait=Raptor.msg.wait('Espere mientras se traslada la incidencia..');
        var node=this.getEstructuretree().getSelectionModel().getLastSelected();
        var nodeTo=tree.getSelectionModel().getLastSelected();
        Ext.Ajax.request({
            url: 'registro/trasladar',
            params:{id: model.get('id'),to:tree.getSelectionModel().getLastSelected().get('id')},
            callback: function() {
                wait.close();
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod==1){
                    btn.up('window').close();
                    this.updateNode(node,-1);
                    this.updateNode(nodeTo,1);
                    this.getIncidenciaStore().load();
                    
                    
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
       
        
    },        
    onComboSelect:function(combo,record){
        if(record[0].get('anonimo')==true)
            combo.up('window').down('#first').disable();
        else
            combo.up('window').down('#first').enable();
    },
    onListEdit: function(editor,e){
        
        var model=this.getUserlist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'user/changestate',
            params:{id: model.get('id'),state:e.value},
            callback: function() {
                this.getUserlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Dino.msg.info(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    e.record.commit();
                }
            },
            failure: function(response, opts) {
                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
       
        this.getUserlist().setLoading(true);
    },
    onSearch:function(){
       
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        if(!model)
            return;
        var view = Ext.widget('buscarwindow');
        view.setX(40);
        view.down('form').getForm().getFields().getAt(0).focus();
        view.down('textfield[name=desde]').on('select',function(){
            view.down('textfield[name=hasta]').setMinValue(this.getValue());
        });
        view.down('textfield[name=hasta]').on('select',function(){
            view.down('textfield[name=desde]').setMaxValue(this.getValue());
        });
    },
    search:function(button){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected()
        var win = button.up('window');
        
        var nombre = win.down('textfield[name=nombre]').getValue();
        var recibida = win.down('textfield[name=recibida]').getValue();
        var dirigido = win.down('textfield[name=dirigido]').getValue();
        var desde = win.down('textfield[name=desde]').getRawValue();
        var hasta = win.down('textfield[name=hasta]').getRawValue();
        var via = win.down('combo[name=idViasComunicacion]').getValue();
        var tipo = win.down('combo[name=idTipo]').getValue();
        
        this.searchLoading=true;
        this.getUserlist().getStore().load({
            params:{
                nombre:nombre,
                recibida:recibida,
                desde:desde,
                hasta:hasta,
                dirigido:dirigido,
                via:via,
                tipo:tipo
            },
            scope:this,
            url:'registro/listbuscar',
            callback:function(){
                
                Raptor.msg.info("Se encontraron "+this.getUserlist().getStore().getTotalCount()+" coincidencias");
            }
        });
       
    },
    onTreeBeforeDeSelect:function(me,model){
        if(this.getUserlist().getStore().isLoading())
            return false;
    },
    onTreeSelect:function(me,model){
        
            this.getUserlist().getStore().load();
            this.onListDeSelect();
        
    },
    onTreeRender:function(){

        this.getEstructuretree().setLoading('Cargando estructuras ...',true);
    },
    onTreeLoad:function(){
        this.getEstructuretree().setLoading(false);
        var me=this;
         this.getEstructuretree().getRootNode().cascadeBy(function(node){
            if(node.get("incidencias")>0){
                node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+node.get("incidencias")+")</b>") ;
           
            }else{
               node.set('text',node.get("name")+" <b style='color:gray'>("+node.get("incidencias")+")</b>") ; 
            }
             node.commit();
        });
       // this.loadCantIncidencias();
    },
//    loadCantIncidencias:function(){
//        
//        Ext.Ajax.request({
//            url: 'index/countincidencias',
//            params:{idEstructure: this.getEstructuretree().getRootNode().get('id')},
//            callback: function() {
//               
//            },
//            success: function(response, opts) {
//                var obj = Ext.decode(response.responseText);
//                
//                if(obj.cod&&obj.cod==1){
//                    this.getEstructuretree().setTitle('Estructuras - Total de incidencias en tu estructura ('+obj.cant+')');
//                }
//            },
//            failure: function(response, opts) {
//                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
//            },
//            scope: this
//        });
//       
//    },
    onRender:function(){
        this.getUserlist().getStore().on('beforeload',this.onBeforeLoadList,this)
        this.getUserlist().getStore().on('load',this.onLoadList,this)
        Raptor.controlActions();
        Interactive.show('registro.tuto1');
        
    },
    onLoadList:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
            if(model){
             if(this.getButtonAdd())
                this.getButtonAdd().enable();
             this.getButtonTramite().enable();
             this.getSearch().enable();
            }
        
        if(!this.searchLoading){
            this.onLoadListIncidencias();
            
        }
       this.searchLoading=false;
       this.getUserlist().getSelectionModel().deselectAll();
    },
    onBeforeLoadList:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        this.getUserlist().getStore().getProxy().extraParams={idEstructure: model.get('id')};
         if(this.getButtonAdd())
       this.getButtonAdd().disable();
       if(this.getButtonTramite())
       this.getButtonTramite().disable();
       this.onListDeSelect();
       
    },
    onAdd: function() {
        var view = Ext.widget('incidenciawindow', {action: 'add'});
        view.down('form').getForm().getFields().getAt(0).focus();
        Interactive.show('registro.tuto4');
    },
    onUpdate: function() {
        var view = Ext.widget('incidenciawindow', {action: 'edit',title:'Editar incidencia'});
        view.down('form').getForm().getFields().getAt(0).focus();
        view.down('form').loadRecord(this.getUserlist().getSelectionModel().getLastSelected());
        var combo= view.down('form combo[name=idViasComunicacion]');
        var anonimoCmp=combo.findRecord('id',combo.getValue());
        var anonimo=false;
        if(anonimoCmp)
            anonimo=anonimoCmp.get('anonimo');
        if(anonimo==true){
            combo.up('window').down('#first').disable();
            view.down('tabpanel').setActiveTab(1);
        }
    },
    onRolAsign:function(){
      //  var view = Ext.widget('rolwindow', {action: 'edit'});
    },        
            
    onLoadListIncidencias:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
        var count=0;
        if(model.get('incidencias'))
            count=model.get('incidencias');
        if(this.getUserlist().getStore().getTotalCount()<count){
            var diff=count-this.getUserlist().getStore().getTotalCount();
            
            this.updateNodes(diff*-1);
            this.reloadNode(model);
            //TODO quitar diff a los nodos
        }
        if(this.getUserlist().getStore().getTotalCount()>count){
            var diff=this.getUserlist().getStore().getTotalCount()-count;
            this.updateNodes(diff);
            this.reloadNode(model);
            //TODO annadir diff a los nodos
        }
        Interactive.show('registro.tuto3');
        this.getUserlist().getSelectionModel().deselectAll();
    },
    reloadNode:function(model){
        if(model.isLoaded())
        this.getEstructuretree().getStore().load({
                    node:model,
                    callback:function(){
                                model.expand();
                                this.getEstructuretree().getSelectionModel().deselectAll();
                                
                     },
                    scope:this
                });
    },
    updateNodes:function(num){
        var me=this;
        this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=parseInt(node.get("incidencias"))+num;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            }
                            node.commit();
                        }else{
                            var sum=num;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            node.commit();
                        }
                 });
    },
    updateNode:function(nodeU,num){
        var me=this;
        nodeU.bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=parseInt(node.get("incidencias"))+num;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            }
                            node.commit();
                        }else{
                            var sum=num;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            node.commit();
                        }
                 });
    },        
    updateUser: function(button) {
        var win = button.up('window');
        if (win.action == 'edit') {

            var form = win.down('form'),
                    record = form.getRecord();
                    
            
           this.editUser(form, 'registro/edit', record.get('id'));
           

        }

        if (win.action == 'add') {

            var form = win.down('form');
           
           
            this.insertUser(form, 'registro/insert');
            

        }

    },
    onDelete: function() {
        Raptor.msg.confirm("¿Está a punto de eliminar esta incidencia, está seguro que desea realizar la acción?", this.deleteUser, this);
        
    },
    deleteUser: function() {
        var model=this.getUserlist().getSelectionModel().getLastSelected();
        var me=this;
        Ext.Ajax.request({
            url: 'registro/delete',
            params:{id: model.get('id')},
            callback: function() {
                this.getUserlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getIncidenciaStore().load();
                    var me=this;
                    this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=parseInt(node.get("incidencias"))-1;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            }
                                node.commit();
                        }else{
                            var sum=0;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            node.commit();
                        }
                 });
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
        this.getUserlist().getSelectionModel().deselectAll();
        this.getUserlist().setLoading('Eliminando la incidencia ....');
    },
    
    onTramite: function() {
        Raptor.msg.confirm("¿Está a punto de enviar todas las incidencias de esta estructura en estado (Lista) para tramitación, está seguro?", this.tramitar, this);
    },
    tramitar: function() {
        var id=this.getEstructuretree().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'registro/tramitar',
            params:{idEstructure: id.get('id')},
            callback: function() {
                this.getUserlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getIncidenciaStore().load();
                    var me=this;
                    this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=parseInt(node.get("incidencias"))-obj.cant;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            }
                                node.commit();
                        }else{
                            var sum=0;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            node.commit();
                        }
                 });
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
        this.getUserlist().getSelectionModel().deselectAll();
        this.getUserlist().setLoading('Espere mientras se envian a tramite las incidencias ...');
    },
    
    
    onListSelect: function() {
         if(this.getButtonEdit())
        this.getButtonEdit().enable();
         if(this.getButtonDelete())
        this.getButtonDelete().enable();
       
        if(this.getTrasladar())
        this.getTrasladar().enable();
        
    },
    onListDeSelect: function() {
        if(this.getButtonEdit())
        this.getButtonEdit().disable();
        if(this.getButtonDelete())
        this.getButtonDelete().disable();
        
        if(this.getTrasladar())
        this.getTrasladar().disable();
       
    },
    insertUser: function(form, url) {
        var id=this.getEstructuretree().getSelectionModel().getLastSelected();
        var me=this;
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true,idEstructure: id.get('id')},
            success: function(formBasic, action) {
                form.up('window').close();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getIncidenciaStore().load();
                Interactive.show('registro.tuto5');
                this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=parseInt(node.get("incidencias"))+1;
                           node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            node.commit();
                        }else{
                            var sum=1;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:"+me.application.color+"'>("+sum+")</b>") ;
                            node.commit();
                        }
                         
                    
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
    editUser: function(form, url, id) {
        
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true, id: id},
            success: function(formBasic, action) {
                form.up('window').close();
                Raptor.msg.show(action.result.cod, action.result.msg);
                this.getUserlist().getSelectionModel().deselectAll();
                this.getIncidenciaStore().load();
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


