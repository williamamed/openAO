
Ext.define('Registro.model.CategoriaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'index','description','leaf','action'],
    
    proxy: {
        type: 'ajax',
        url: 'tramite/listclasificador',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Registro.model.EstructureModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'indexe','description','incidencias','action'],
    
    proxy: {
        type: 'ajax',
        url: 'tramite/listestructure',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Registro.model.IncidenciaModel', {
    extend: 'Ext.data.Model',
    fields: ['id',
        'nombreApellidos',
        'estado',
        'noConsecutivo',
        'expOc',
        'fecha',
        'sexo',
        'edad',
        'nivelEscolar',
        'ocupacion',
        'direccion',
        'telefono',
        'dirigido',
        'traslada',
        'entidadPertenece',
        'planteamiento',
        'recibe',
        'respuesta',
        'razon',
        'conforme',
        'termino',
        'idEstructure',
        'idClasificador',
        'idTipo',
        'idViasComunicacion',
        'nameClasificador'
    ],
    
    proxy: {
        type: 'ajax',
        
        api: {
            read: 'tramite/list',
            update: 'registro/edit',
            create:'registro/insert',
            destroy: 'registro/delete'
        },
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success', 
            totalProperty: 'result'
        }
    }
});
Ext.define('Registro.model.TipoModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        
        url: 'tramite/listtipoincidencia',
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
Ext.define('Registro.model.ViaComunicacionModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','anonimo'],
    
    proxy: {
        type: 'ajax',
        
        url: 'tramite/listviascomunicacion',
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
Ext.define('Registro.store.Categoria', {
    extend: 'Ext.data.TreeStore',
    model: 'Registro.model.CategoriaModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});
Ext.define('Registro.store.Conforme', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":true, "name":"Si"},
        {"value":false, "name":"No"}
        
       
     
    ]
});


Ext.define('Registro.store.Estructure', {
    extend: 'Ext.data.TreeStore',
    model: 'Registro.model.EstructureModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});
Ext.define('Registro.store.Incidencia', {
    extend: 'Ext.data.Store',
    model: 'Registro.model.IncidenciaModel',
    pageSize: 25
});
Ext.define('Registro.store.NivelEscolar', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        
        {"value":0, "name":"Primaria"},
        {"value":1, "name":"Secundaria"},
        {"value":2, "name":"Pre-Universitario"},
        {"value":3, "name":"Técnico medio"},
        {"value":4, "name":"Obrero calificado"},
        {"value":5, "name":"Universitario"},
        {"value":6, "name":"No tiene"}
       
     
    ]
});


Ext.define('Registro.store.Ocupacion', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"No tiene"},
        {"value":5, "name":"Se deconoce"},
        {"value":1, "name":"Estudiante"},
        {"value":2, "name":"Servicio"},
        {"value":3, "name":"Técnico"},
        {"value":4, "name":"Dirigente"}
       
     
    ]
});


Ext.define('Registro.store.Razon', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":4, "name":"-"},
        {"value":0, "name":"Con razón"},
        {"value":1, "name":"Con razón en parte"},
        {"value":2, "name":"Sin razón"},
        {"value":3, "name":"No se demuestra"}
       
     
    ]
});


Ext.define('Registro.store.Sexo', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"Masculino"},
        {"value":1, "name":"Femenino"}
       
     
    ]
});


Ext.define('Registro.store.Tipo', {
    extend: 'Ext.data.Store',
    autoLoad:true,
    model: 'Registro.model.TipoModel'
});
Ext.define('Registro.store.ViaComunicacion', {
    extend: 'Ext.data.Store',
    autoLoad:true,
    model: 'Registro.model.ViaComunicacionModel'
});
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
            ref: 'pedir',
            selector: 'viewport button[action=pedir]'
        },
        {
            ref: 'archivar',
            selector: 'viewport button[action=archivar]'
        },
        {
            ref: 'ver',
            selector: 'viewport button[action=ver]'
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
            'viewport button[action=archivar]': {
                click: this.onArchivar
            },
            'viewport button[action=pedir]': {
                click: this.onPedir
            },
            'viewport button[action=ver]': {
                click: this.onPrint
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
    onPedir:function(){
        
    },
    onArchivar: function(){
         Raptor.msg.confirm("¿Está a punto de archivar esta incidencia, está seguro que desea realizar la acción?", this.archivar, this);
        
    },
    archivar:function(btn){
        
        var wait=Raptor.msg.wait('Espere mientras se archiva la incidencia..');
        var model=this.getUserlist().getSelectionModel().getLastSelected();
       
        Ext.Ajax.request({
            url: 'tramite/archivar',
            params:{id: model.get('id')},
            callback: function() {
                wait.close();
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Raptor.msg.show(obj.cod, obj.msg);
                if(obj.cod==1){
                    
                    this.getIncidenciaStore().load();
                    
                    
                }
            },
            failure: function(response, opts) {
                 Raptor.msg.error('Ha ocurrido un error en la comunicación con el servidor');
            },
            scope: this
        });
       
        
    },
    onPrint:function(){
        var record=this.getUserlist().getSelectionModel().getLastSelected();
        Ext.widget('detalleswindow',{inc:record.get('id')});
        return;
        var ventana = window.open('tramite/print?id='+record.get('id'),'');
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
            url:'tramite/listbuscar',
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
        Interactive.show('tramite.tuto2');
        
    },
    onLoadList:function(){
        var model=this.getEstructuretree().getSelectionModel().getLastSelected();
            if(model){
             if(this.getButtonAdd())
                this.getButtonAdd().enable();
             
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
       
       this.onListDeSelect();
       
    },
    onAdd: function() {
        var view = Ext.widget('incidenciawindow', {action: 'add'});
        view.down('form').getForm().getFields().getAt(0).focus();
    },
    onUpdate: function() {
        var view = Ext.widget('incidenciawindow', {action: 'edit',title:'Tramitar incidencia'});
        view.down('form').getForm().getFields().getAt(0).focus();
        view.down('form').loadRecord(this.getUserlist().getSelectionModel().getLastSelected());
        var combo= view.down('form combo[name=idViasComunicacion]');
        if(this.getUserlist().getSelectionModel().getLastSelected().get('nameClasificador')){
            view.down('form categoriafield').pureValue=this.getUserlist().getSelectionModel().getLastSelected().get('idClasificador');
            view.down('form categoriafield').setRawValue(this.getUserlist().getSelectionModel().getLastSelected().get('nameClasificador'));
        }
        var anonimoCmp=combo.findRecord('id',combo.getValue());
        var anonimo=false;
        if(anonimoCmp)
            anonimo=anonimoCmp.get('anonimo');
        if(anonimo==true){
            combo.up('window').down('#first').disable();
            view.down('tabpanel').setActiveTab(1);
        }
        view.down('tabpanel').setActiveTab(2);
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
                    
            
           this.editUser(form, 'tramite/procesar', record.get('id'));
           

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
        var me=this;
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
    
    
    onListSelect: function(me,model) {
         if(this.getButtonEdit())
        this.getButtonEdit().enable();
         if(this.getButtonDelete())
        this.getButtonDelete().enable();
       
        
        if(model.get('estado')===3){
            this.getArchivar().enable();
            
        }
        if(model.get('estado')===2){
            if(this.getPedir())
            this.getPedir().enable();
        }
        this.getVer().enable();
    },
    onListDeSelect: function(me,model) {
        if(this.getButtonEdit())
        this.getButtonEdit().disable();
        if(this.getButtonDelete())
        this.getButtonDelete().disable();
        
        if(this.getPedir())
        this.getPedir().disable();
        if(this.getArchivar())
        this.getArchivar().disable();
        if(this.getVer())
        this.getVer().disable();
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
            params: {ajax_request: true, id: id , idEstructure2:this.getEstructuretree().getSelectionModel().getLastSelected().get('id') },
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



 Ext.define('Registro.view.BuscarWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.buscarwindow',
        autoShow: true,
         iconCls: 'icon-search',
        closeAction:'destroy',
        title:'Buscar por ...',
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
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y apellidos',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'nombre'
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Recibida por',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'recibida'
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                            xtype: 'datefield',
                            width: '100%',
                            fieldLabel: 'Desde fecha',
                            name: 'desde',
                            editable: false,
                            //value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                            xtype: 'datefield',
                            width: '100%',
                            fieldLabel: 'Hasta fecha',
                            name: 'hasta',
                            editable: false,
                            //value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Dirigido contra',
                                allowBlank: true,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                name: 'dirigido'
                            }]
                    },{
                            xtype: 'container',
                            layout: 'hbox',
                           defaults: {margin: 5},
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Vía de comunicación',
                                        allowBlank: true,
                                        blankText: 'Escoja la vía..',
                                        width: '100%',
                                        labelAlign: 'top',
                                        name: 'idViasComunicacion',
                                        store: 'ViaComunicacion',
                                        queryMode: 'local',
                                        displayField: 'nombre',
                                        editable:false,
                                        valueField: 'id'
                                    }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de incidencia',
                                        allowBlank: true,
                                        blankText: 'Escoja el tipo de incidencia..',
                                        width: '100%',
                                        labelAlign: 'top',
                                        name: 'idTipo',
                                        store: 'Tipo',
                                        queryMode: 'local',
                                        displayField: 'nombre',
                                        editable:false,
                                        valueField: 'id'
                                    }]
                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-search',
                            text: 'buscar',
                            action: 'search'
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



Ext.define('Registro.view.CategoriaField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.categoriafield',

    // override onTriggerClick
    setValue:function(value, doSelect){
        this.store= Ext.data.StoreManager.lookup(this.store);
        
        var record=this.store.getNodeById(value);
        // console.debug('setvalue',record)
        if(record){
            this.record=record;
            this.setRawValue(record.get('text'));
        }else{
            this.setRawValue("");
        }
    },
    onTriggerClick: function() {
        this.viewW = Ext.widget('categoriawindow');
        this.viewW.on('selectednode',this.onSelect,this);
        if(this.record){
            this.viewW.down('treepanel').getSelectionModel().select([this.record]);
        }
        
    },
    onSelect:function(record){
        
        this.record=record;
        this.setRawValue(record.get('text'));
    //   console.debug('onselect',record)
        this.viewW.close();
        
    },
    getSubmitValue:function(){
        
        // if(this.pureValue)
        //     return this.pureValue;
        if(this.record)
           return this.record.get('id');
       else
           return "";
    }
});



Ext.define('Registro.view.CategoriaTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.categoriatree',
    rootVisible: false,
    itemId:'clasifi',
    store: 'Categoria',
    title: '',
    iconCls:'',
    height:400,
    initComponent: function() {
        this.on('select',this.onSelect,this);
        this.callParent();
    },
    onSelect:function(a,record){
        if(record.get('leaf')==true){
            this.up('window').down('button[action=acept]').enable();
        }else{
            this.up('window').down('button[action=acept]').disable();
        }
    }
});


 Ext.define('Registro.view.CategoriaWindow',{
        extend:'Ext.Window',
        width:400,
        autoHeight:true,
        modal:true,
        alias: 'widget.categoriawindow',
        autoShow: true,
         iconCls: 'icon-search',
        closeAction:'destroy',
        title:'Clasificador',
        layout:'fit',
        initComponent:function(){
            this.items = {
                xtype:'categoriatree'
            };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'acept',
                            disabled:true,
                            handler: this.onSelect,
                            scope:this
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        },
      onSelect:function(){
        var tree=this.down('treepanel');
        var record=tree.getSelectionModel().getLastSelected();
        this.fireEvent('selectednode',record);
      }
        
      
    })



 Ext.define('Registro.view.DetallesWindow',{
        extend:'Ext.Window',
        width:650,
        height:400,
        //autoHeight:true,
        
        bodyStyle:'overflow:none',
        
        
        
        modal:true,
        alias: 'widget.detalleswindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Datos de la incidencia',
        layout:'fit',
        
        initComponent:function(){
            var me=this;
            this.html='<iframe id="details-incidencia" style="border:none;width:100%;height:100%" src="tramite/print?id='+this.inc+'"></iframe>';
           
            
        this.buttons = [{   iconCls: 'icon-print',
                            text: 'Imprimir',
                            handler:function(){
                               window.frames[0].print();
                            }
                            
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
            this.on('show',function(){
                this.setLoading('Generando el modelo de incidencias ...');
                this.getEl().down('#details-incidencia').on('load',function(){
                    this.setLoading(false);
                },this)
            },this)
            
        } 
 
      
    })



Ext.define('GestUser.view.EstructureTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.estructuretree',
    rootVisible: false,
    store: 'Estructure',
    
    title: 'Estructuras',
    iconCls:'icon-estructure',
    height:400,
    collapsible:false,
    initComponent: function() {
        
        this.callParent();
    }
});


Ext.define('Registro.view.IncidenciaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.incidencialist',
    
    store: 'Incidencia',
    title: 'Listado de incidencias por estructuras',
    iconCls:'icon-registro',
   
    initComponent: function() {
        this.columns = [{
            header:'Nombre del Promovente',
            dataIndex: 'nombreApellidos',
            renderer:function(value){
                if(value)
                     return value;
               else
                     return '<b style="color:red">Anónimo</b>';
            },
            flex: 2
        },{
            header:'Fecha',
            dataIndex: 'fecha',
            flex: 1
        },{
            header:'Estructura',
            dataIndex: 'idEstructure',
            flex: 1
        },{
            header:'Recibida por',
            dataIndex: 'recibe',
            flex: 1
        },{
            header:'Estado',
            dataIndex: 'estado',
            renderer:function(value){
                if(value==2)
                    return "<b style='color:red'>En trámite</b>";
                if(value==3)
                    return "<b style='color:green'>Tramitada</b>";
            },
            flex: 1
        },{
            header:'Dirigido contra',
            dataIndex: 'dirigido',
            flex: 1
        },{
            header:'Caduca',
            dataIndex: 'termino',
            renderer:function(value,a,record,rowIndex){
                var dt = Ext.Date.add(Ext.Date.parse(record.get('fecha'),'d/m/Y'), Ext.Date.DAY, value);
                
                var today=new Date();
                if(today < dt){
                     if(today > Ext.Date.add(dt, Ext.Date.DAY, -5) && today < dt){
                        Raptor.msg.info('La incidencia registrada en la fecha '+record.get('fecha')+' esta próxima a cumplir el plazo de término.');
                        return "<b style='color:orange'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                     }else
                        return "<b style='color:green'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                }else{
                    Raptor.msg.info('La incidencia registrada en la fecha '+record.get('fecha')+' se encuentra fuera del plazo de término.');
                    return "<b style='color:red'>"+Ext.Date.format(dt,'d/m/Y')+"</b>";
                }
            },
            flex: 1
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Tramitar',
                privilegeName:'procesar',
                disabled:true,
                
                action:'update',
                iconCls:'icon-tramite'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Pedir respuesta a ..',
                privilegeName:'pedir',
                disabled:true,
                
                action:'pedir',
                iconCls:'icon-pedir'  
            },{
                xtype: 'button',
                text: 'Archivar',
                privilegeName:'archivar',
                disabled:true,
                
                action:'archivar',
                iconCls:'icon-archivos'  
            },
            
            {
                xtype: 'button',
                text: 'Ver incidencia',
                privilegeName:'print',
                disabled:true,
                
                action:'ver',
                iconCls:'icon-detalles'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Buscar',
                privilegeName:'listbuscar',
                disabled:true,
                
                action:'buscar',
                 iconCls: 'icon-search',
            }]
        }];
         this.bbar=Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true
            
            
        });
        this.callParent();
    }
});


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
                        itemId:'first',
                        defaults: {margin: 5},
                        items:[{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y Apellidos',
                                allowBlank: true,
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
                                        xtype: 'combo',
                                        fieldLabel: 'Sexo',
                                        allowBlank: true,
                                        blankText: 'Escoje el sexo..',
                                        width: '50%',
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
                                        allowBlank: true,
                                        blankText: 'Debe especificar una edad',
                                        step: 1,
                                        width:'50%',
                                        maxLength: 2,
                                        
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
                                        allowBlank: true,
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
                                        allowBlank: true,
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
                                allowBlank: true
                                
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
                                    allowBlank: true
                                }]
                        }]
                },{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Datos de la incidencia',
                        defaults: {margin: 5},
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Contra quien va dirigida',
                                            labelAlign: 'top',
                                            width: '70%',
                                            name: 'dirigido',
                                            allowBlank: false
                                            
                                        },{
                            xtype: 'datefield',
                            width: '30%',
                            fieldLabel: 'Fecha',
                            name: 'fecha',
                            editable: false,
                            value: new Date(),
                            format: 'd/m/Y',
                            labelAlign: 'top',
                            allowBlank: false
                        }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Síntesis del planteamiento',
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
                                        value:20,
                                        editable: false
                                       
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
                                    fieldLabel: 'Síntesis de la respuesta',
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
//                                        allowBlank: false,
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
                                    },
//                                    {
//                                        xtype: 'combo',
//                                        fieldLabel: '<b style="color:red">Clasificación<b/>',
//                                        allowBlank: false,
//                                        blankText: 'Escoja el indicador',
//                                        width: '33.3%',
//                                        labelAlign: 'top',
//                                        name: 'idClasificador',
//                                        store: 'Indicador',
//                                        queryMode: 'local',
//                                        displayField: 'name',
//                                        editable:false,
//                                        valueField: 'id'
//                                    }
                                        {
                                        xtype: 'categoriafield',
                                        fieldLabel: '<b style="color:red">Clasificación<b/>',
                                        labelAlign: 'top',
                                        name: 'idClasificador',
                                        store:'Categoria',
                                        allowBlank: false,
                                        width: '33.3%',
                                        emptyText: 'Seleccione categoría'
                                        }
                                        ]
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



Ext.define('Registro.view.Spinner', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.registrospinner',

    // override onSpinUp (using step isn't neccessary)
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            if(val<90)
                me.setValue((val + me.step));
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
           var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
           if (val <= me.step) {
               me.setValue(0);
           } else {
               if(val>10)
               me.setValue((val - me.step));
           }
        }
    }
});



Ext.define('Registro.view.SpinnerTermino', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.terminospinner',

    // override onSpinUp (using step isn't neccessary)
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            if(val<20)
                me.setValue((val + me.step));
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
           var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
           
               if(val>1)
               me.setValue((val - me.step));
           
        }
    }
});



 Ext.define('Registro.view.TrasladarWindow',{
        extend:'Ext.Window',
        width:400,
        autoHeight:true,
        modal:true,
        alias: 'widget.trasladarwindow',
        autoShow: true,
        iconCls: 'icon-trasladar',
        closeAction:'destroy',
        title:'Trasladar a ...',
        layout:'fit',
        initComponent:function(){
            this.items = {
                xtype:'treetrasladar',
                currentNode: this.modelSelected.get('id')
            };
            
            this.buttons = [{   iconCls: 'icon-trasladar',
                            text: 'Trasladar',
                            action: 'windowTrasladar',
                            disabled:true
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



Ext.define('GestUser.view.Treetrasladar', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treetrasladar',
    rootVisible: false,
    store: 'Estructure',
    
    title: 'Estructuras',
    iconCls:'icon-estructure',
    height:400,
    collapsible:false,
    
    initComponent: function() {
        this.on('select',this.onSelect,this);
        this.callParent();
    },
    onSelect:function(a,record){
        if(record.get('id')!==this.currentNode){
            this.up('window').down('button[action=windowTrasladar]').enable();
        }else{
            this.up('window').down('button[action=windowTrasladar]').disable();
        }
    }
});


Ext.define('Registro.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype:'panel',
                        title:'Tu organización',
                        collapsible:true,
                        region:'west',
                        layout:'border',
                        flex:.4,
                        items:[{
                            xtype: 'estructuretree',
                            region:'center'
                        },{
                            xtype: 'container',
                            region:'south',
                            height:60,
                            padding:10,
                            style:{background:'#831A27',color:'white'},
                            html:'<h3 ><img src="'+Raptor.getBundleResource('AtencionOnline/Logica/img/registro.png')+'" width="40" style="float:left;margin-right:10px;margin-top:-10px;">Trámite de incidencias</h3>'
                        }]
                    },{
                        xtype: 'incidencialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});