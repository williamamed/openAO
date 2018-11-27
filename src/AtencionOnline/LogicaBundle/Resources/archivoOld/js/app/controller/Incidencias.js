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
            selector: 'viewport button[action=ver]'
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
        }
    ],
    init: function() {
        this.control({
            'viewport button[action=add]': {
                click: this.onAdd
            },
            'viewport button[action=ver]': {
                click: this.onDetails
            },
            'viewport button[action=delete]': {
                click: this.onDelete
            },
            'viewport button[action=tramite]': {
                click: this.onTramite
            },
            'viewport button[action=buscar]': {
                click: this.onSearch
            },
            'buscarwindow button[action=search]': {
                click: this.search
            },
            'detalleswindow button[action=print]': {
                click: this.onPrint
            },
            'incidenciawindow button[action=save]': {
                click: this.updateUser
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
            }
            
        });

        
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
        var view = Ext.widget('buscarwindow');
    },
    search:function(button){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected()
        var win = button.up('window');
        
        var nombre = win.down('textfield[name=nombre]').getValue();
        var recibida = win.down('textfield[name=recibida]').getValue();
        var dirigido = win.down('textfield[name=dirigido]').getValue();
        var fecha = win.down('textfield[name=fecha]').getRawValue();
        var via = win.down('combo[name=idViasComunicacion]').getValue();
        var tipo = win.down('combo[name=idTipo]').getValue();
        var periodo = win.down('combo[name=periodo]').getValue();
        
        this.searchLoading=true;
        this.getUserlist().getStore().load({
            params:{nombre:nombre,
                recibida:recibida,
                fecha:fecha,
                dirigido:dirigido,
                via:via,
                tipo:tipo,
                periodo:periodo
            },
            scope:this,
            url:'archivo/listbuscar',
            callback:function(){
                
                Dino.msg.info(1, "Se encontraron "+this.getUserlist().getStore().getTotalCount()+" coincidencias");
            }
        });
        win.close(); 
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

        this.getEstructuretree().setLoading('Loading the Estructure',true);
    },
    onTreeLoad:function(){
        this.getEstructuretree().setLoading(false);
         this.getEstructuretree().getRootNode().cascadeBy(function(node){
            if(node.get("incidencias")>0){
                node.set('text',node.get("name")+" <b style='color:green'>("+node.get("incidencias")+")</b>") ;
           
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
        Rpt.controlActions();
        
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
       
    },
    onDetails:function(){
        
       var store= Ext.create('Ext.data.Store', {
                fields:this.getIncidenciaModelModel().getFields() 
        });
        var record=this.getUserlist().getSelectionModel().getLastSelected().copy();
        var form = Ext.widget('incidenciawindow', {action: 'edit',title:'Editar incidencia'});
        form.hide();
        form.down('form').loadRecord(record);
       
        record.set('nivelEscolar',form.down('combo[name=nivelEscolar]').getRawValue());
        record.set('sexo',form.down('combo[name=sexo]').getRawValue());
        record.set('ocupacion',form.down('combo[name=ocupacion]').getRawValue());
        record.set('idViasComunicacion',form.down('combo[name=idViasComunicacion]').getRawValue());
        record.set('idTipo',form.down('combo[name=idTipo]').getRawValue());
        record.set('razon',form.down('combo[name=razon]').getRawValue());
        record.set('conforme',form.down('combo[name=conforme]').getRawValue());
        store.loadRecords([record]);
        var view = Ext.widget('detalleswindow',{docStore:store});
    },
    onPrint:function(){
        var record=this.getUserlist().getSelectionModel().getLastSelected();
        ventana = window.open('archivo/exportar?id='+record.get('id'),'');
    },
    onUpdate: function() {
        var view = Ext.widget('incidenciawindow', {action: 'edit',title:'Editar incidencia'});
       
        view.down('form').loadRecord(this.getUserlist().getSelectionModel().getLastSelected());
       
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
        this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=node.get("incidencias")+num;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:green'>("+sum+")</b>") ;
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
                    
            
           this.editUser(form, 'archivo/edit', record.get('id'));
           

        }

        if (win.action == 'add') {

            var form = win.down('form');
           
           
            this.insertUser(form, 'archivo/insert');
            

        }

    },
    onDelete: function() {
        Dino.msg.info(2, "¿Está a punto de eliminar este elemento, está seguro?", this.deleteUser, this);
        
    },
    deleteUser: function() {
        var model=this.getUserlist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'archivo/delete',
            params:{id: model.get('id')},
            callback: function() {
                this.getUserlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Dino.msg.info(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getIncidenciaStore().load();
                    this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=node.get("incidencias")-1;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:green'>("+sum+")</b>") ;
                            }
                                node.commit();
                        }else{
                            var sum=0;
                            node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            node.commit();
                        }
                 });
                }
            },
            failure: function(response, opts) {
                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
        this.getUserlist().getSelectionModel().deselectAll();
        this.getUserlist().setLoading(true);
    },
    
    onTramite: function() {
        Dino.msg.info(2, "¿Está a punto de enviar todas las solicitudes de esta estructura en estado (Tramitada) a los archivos, está seguro?", this.tramitar, this);
    },
    tramitar: function() {
        var id=this.getEstructuretree().getSelectionModel().getLastSelected();
        Ext.Ajax.request({
            url: 'archivo/state',
            params:{idEstructure: id.get('id')},
            callback: function() {
                this.getUserlist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Dino.msg.info(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getIncidenciaStore().load();
                    this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=node.get("incidencias")-obj.cant;
                            if(sum==0){
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:gray'>("+sum+")</b>") ;
                            }else{
                                node.set('incidencias',sum) ;
                                node.set('text',node.get("name")+" <b style='color:green'>("+sum+")</b>") ;
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
                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
        this.getUserlist().getSelectionModel().deselectAll();
        this.getUserlist().setLoading(true);
    },
    
    
    onListSelect: function() {
         if(this.getButtonEdit())
        this.getButtonEdit().enable();
         if(this.getButtonDelete())
        this.getButtonDelete().enable();
       
        this.getSearch().enable();
        
    },
    onListDeSelect: function() {
        if(this.getButtonEdit())
        this.getButtonEdit().disable();
        if(this.getButtonDelete())
        this.getButtonDelete().disable();
        
        this.getSearch().disable();
    },
    insertUser: function(form, url) {
        var id=this.getEstructuretree().getSelectionModel().getLastSelected();
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true,idEstructure: id.get('id')},
            success: function(formBasic, action) {
                form.up('window').close();
                Dino.msg.info(action.result.cod, action.result.msg);
                this.getIncidenciaStore().load();
                
                this.getEstructuretree().getSelectionModel().getLastSelected().bubble(function(node){
                       if(node.get("incidencias")){
                           var sum=node.get("incidencias")+1;
                           node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:green'>("+sum+")</b>") ;
                            node.commit();
                        }else{
                            var sum=1;
                            node.set('incidencias',sum) ;
                            node.set('text',node.get("name")+" <b style='color:green'>("+sum+")</b>") ;
                            node.commit();
                        }
                         
                    
                 });
            },
            failure: function(formBasic, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Dino.msg.info(1, 'Los campos de este formulario no pueden se enviados con valores incorrectos');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Dino.msg.info(3, 'Ajax communication failed');
                        break;
                }

                if (action.result && action.result.cod) {
                    Dino.msg.info(action.result.cod, action.result.msg);
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
                Dino.msg.info(action.result.cod, action.result.msg);
                this.getUserlist().getSelectionModel().deselectAll();
                this.getIncidenciaStore().load();
            },
            failure: function(formBasic, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Dino.msg.info(1, 'Los campos de este formulario no pueden se enviados con valores incorrectos');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Dino.msg.info(3, 'Ajax communication failed');
                        break;
                }

                if (action.result && action.result.cod) {
                    Dino.msg.info(action.result.cod, action.result.msg);
                }
                
            },
            scope: this
        });

    }


});


