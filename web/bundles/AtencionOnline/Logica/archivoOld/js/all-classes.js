
Ext.define('Registro.model.EstructureModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'index','description','incidencias','action'],
    
    proxy: {
        type: 'ajax',
        url: 'archivo/listestructure',
       
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
        'idTipo',
        'idViasComunicacion'
        
    ],
    
    proxy: {
        type: 'ajax',
        
        api: {
            read: 'archivo/listquejas',
            update: 'archivo/edit',
            create:'archivo/insert',
            destroy: 'archivo/delete'
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
Ext.define('Registro.model.PeriodoModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        
        url: 'archivo/listperiodo',
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
Ext.define('Registro.model.TipoModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        
        url: 'archivo/listtipoincidencia',
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
    fields: ['id', 'nombre'],
    
    proxy: {
        type: 'ajax',
        
        url: 'archivo/listviascomunicacion',
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
        {"value":1, "name":"Estudiante"},
        {"value":2, "name":"Servicio"},
        {"value":3, "name":"Técnico"},
        {"value":4, "name":"Dirigente"}
       
     
    ]
});


Ext.define('Registro.store.Periodo', {
    extend: 'Ext.data.Store',
    autoLoad:true,
    model: 'Registro.model.PeriodoModel'
});
Ext.define('Registro.store.Razon', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
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
                            fieldLabel: 'Fecha',
                            name: 'fecha',
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
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            
                            items: [{
                                        xtype: 'combo',
                                        fieldLabel: 'Período',
                                        allowBlank: true,
                                        blankText: '',
                                        width: '100%',
                                        labelAlign: 'top',
                                        name: 'periodo',
                                        store: 'Periodo',
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



 Ext.define('Registro.view.DetallesWindow',{
        extend:'Ext.Window',
        width:800,
        height:500,
        //autoHeight:true,
        
        bodyStyle:'overflow:scroll',
        docTpl: [
        '<tpl for=".">',
            '<div  style="background:white;padding:25px;margin:5px;border: 1px;border: 1px outset black;width:95%;">',
                '<table align="center" class="table-modelo">',
                '<tr><td style="text-align:center"><h3>Modelo de recepción de la Incidencia<br>Dirección de atención a la población</h3></td></tr>',
                '<tr><tr><td><b>No. Consecutivo:</b> {noConsecutivo}</td></tr></tr>',
                '<tr><td><b>Exp. organismo Central:</b> {expOc}</td></tr>',
                '<tr><td><b>Fecha:</b> {fecha}</td></tr>',
                '<tr><td><b>Nombre y Apellidos: </b>{nombreApellidos}</td></tr>',
                '<tr><td><b>Sexo:</b> {sexo}</td></tr>',
                '<tr><td><b>Edad:</b> {edad}</td></tr>',
                '<tr><td><b>Nivel Escolar:</b> {nivelEscolar}</td></tr>',
                '<tr><td><b>Ocupación:</b> {ocupacion}</td></tr>',
                '<tr><td><b>Dirección Particular:</b> {direccion}</td></tr>',
                '<tr><td><b>Teléfono donde se puede localizar:</b> {telefono}</td></tr>',
                '<tr><td><b>Organismo o persona contra quien va drigida la incidencia:</b> {dirigido}</td></tr>',
                '<tr><td><b>Entidad superior y Organismo a la pertenece:</b> {entidadPertenece}</td></tr>',
                '<tr><td><b>Síntesis del planteamiento formulado: </b><br>{planteamiento}</td></tr>',
                '<tr><td><b>Vía o medio de comunicacion:</b> {idViasComunicacion}</td></tr>',
                '<tr><td><b>Tipo de incidencia:</b> {idTipo}</td></tr>',
                '<tr><td><b>Recibe:</b> {recibe}</td></tr>',
                '<tr><td><b>Se traslada a:</b> {traslada}</td></tr>',
                '<tr><td><b>Con término: </b>{termino}</td></tr>',
                '<tr><td><b>Síntesis de la respuesta ofrecida o de la decision adoptada:</b><br> {respuesta}</td></tr>',
                '<tr><td><b>Razón del cliente:</b> {razon}</td></tr>',
                '<tr><td><b>Conforme:</b> {conforme}</td></tr>',
                '</table>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
        ],
        
        
        modal:true,
        alias: 'widget.detalleswindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Datos de la incidencia',
        layout:'fit',
        initComponent:function(){
            var me=this;
            this.items = [{
                xtype: 'dataview',
                //overItemCls: 'x-view-over',
                //trackOver: true,
                
                store: me.docStore,
                style: {
                    
                    
                },
                
                tpl: new Ext.XTemplate(me.docTpl)
            }];
        
            
        this.buttons = [{   iconCls: 'icon-print',
                            text: 'Imprimir',
                            action: 'print'
                           
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



Ext.define('GestUser.view.EstructureTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.estructuretree',
    rootVisible: false,
    store: 'Estructure',
    width:'30%',
    title: 'Estructuras',
    iconCls:'icon-estructure',
    height:400,
    collapsible:true,
    initComponent: function() {
        
        this.callParent();
    }
});


Ext.define('Registro.view.IncidenciaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.incidencialist',
    
    store: 'Incidencia',
    title: 'Tramitación de quejas',
    iconCls:'icon-archivos',
    
    initComponent: function() {
        this.columns = [{
            header:'Nombre del Promovente',
            dataIndex: 'nombreApellidos',
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
            header:'Dirigido contra',
            dataIndex: 'dirigido',
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
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Ver incidencia',
                privilegeName:'see',
                disabled:true,
                hidden:true,
                action:'ver',
                iconCls:'icon-detalles'  
            },{
                xtype: 'button',
                text: 'Editar',
                privilegeName:'edit',
                disabled:true,
                hidden:true,
                action:'update',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                disabled:true,
                hidden:true,
                action:'delete',
                iconCls:'icon-del'  
            },{
                xtype: 'button',
                text: 'Archivar incidencias',
                privilegeName:'state',
                disabled:true,
                hidden:true,
                action:'tramite',
                iconCls:'icon-user'  
            },
            { xtype: 'tbseparator' },
            {
                xtype: 'button',
                text: 'Buscar',
                privilegeName:'buscar',
                disabled:true,
                hidden:true,
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
                        defaults: {margin: 5},
                        items:[{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre y Apellidos',
                                allowBlank: false,
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
                            xtype: 'datefield',
                            width: '33.3%',
                            fieldLabel: 'Fecha',
                            name: 'fecha',
                            format:'m/d/Y',
                            editable: false,
                            value: new Date(),
                            labelAlign: 'top',
                            allowBlank: false
                        }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Sexo',
                                        allowBlank: false,
                                        blankText: 'Escoje el sexo..',
                                        width: '33.3%',
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
                                        allowBlank: false,
                                        blankText: 'Debe especificar una edad',
                                        step: 1,
                                        width:'33.3%',
                                        maxLength: 2,
                                        value:10,
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
                                        allowBlank: false,
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
                                        allowBlank: false,
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
                                allowBlank: false,
                                regex:/^[A-Za-z ]+$/,
                                regexText:'Proporcione una entidad válida'
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
                                    allowBlank: false
                                }]
                        }]
                },{
                        defaultType: 'container', 
                        layout: 'anchor',
                        title: 'Especificidades de la incidencia',
                        defaults: {margin: 5},
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Contra quien va dirigida',
                                            labelAlign: 'top',
                                            width: '100%',
                                            name: 'dirigido',
                                            allowBlank: false,
                                            regex: /^[A-Za-z ]+$/,
                                            regexText: 'Texto inválido'
                                        }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {margin: 5},
                            items: [{
                                    xtype: 'textarea',
                                    fieldLabel: 'Sintesis del plateamiento',
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
                                    },{
                                            xtype: 'textfield',
                                            fieldLabel: 'Se traslada a',
                                            labelAlign: 'top',
                                            width: '33.3%',
                                            name: 'traslada',
                                            allowBlank: false,
                                            regex: /^[A-Za-z ]+$/,
                                            regexText: 'Texto inválido'
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
                                        value:30,
                                        editable: false
                                       
                                  },{
                                            xtype: 'textfield',
                                            fieldLabel: 'No. consecutivo',
                                            labelAlign: 'top',
                                            width: '33.3%',
                                            name: 'noConsecutivo',
                                            allowBlank: false,
                                            regex:/^[0-9]{1,5}\/[0-9]{2}$/,
                                            regexText:'Proporcione No. consecutivo válido Ej. 5/15',
                                           
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
                                    fieldLabel: 'Sintesis del plateamiento',
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
                                    }]
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
            if(val<30)
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



Ext.define('Registro.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'estructuretree',
                        region:'west'
                    },{
                        xtype: 'incidencialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});