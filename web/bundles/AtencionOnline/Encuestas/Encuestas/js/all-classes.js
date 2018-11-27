
Ext.define('Encuestas.model.CamposModel', {
    extend: 'Ext.data.Model',
    fields: ['id','respuesta'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listcampos',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Encuestas.model.GenericModel', {
    extend: 'Ext.data.Model',
    fields: ['id','nombre','estado','anonimo','enlace'],
    
    proxy: {
        type: 'ajax',
        url:'admin/list',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Encuestas.model.PieModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listpie',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Encuestas.model.PreguntaModel', {
    extend: 'Ext.data.Model',
    fields: ['id','pregunta','tipo','opcional'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listpregunta',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Encuestas.model.TextosModel', {
    extend: 'Ext.data.Model',
    fields: ['name','text','ci','direccion','apellidos'],
    
    proxy: {
        type: 'ajax',
        url:'admin/listtextos',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Encuestas.store.Campos', {
    extend: 'Ext.data.Store',
    model: 'Encuestas.model.CamposModel'
});
Ext.define('Encuestas.store.Estado', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Abierta',    value: 0},
         {name: 'En espera', value: 1},
         {name: 'Cerrada', value: 2}
     ]
});
Ext.define('Encuestas.store.Generic', {
    extend: 'Ext.data.Store',
    model: 'Encuestas.model.GenericModel',
    autoLoad:true
});
Ext.define('Encuestas.store.Pie', {
    extend: 'Ext.data.Store',
    model: 'Encuestas.model.PieModel'
});
Ext.define('Encuestas.store.Pregunta', {
    extend: 'Ext.data.Store',
    model: 'Encuestas.model.PreguntaModel'
});
Ext.define('Encuestas.store.Textos', {
    extend: 'Ext.data.Store',
    model: 'Encuestas.model.TextosModel'
});
Ext.define('Encuestas.store.Tipo', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Selección única',    value: 0},
         {name: 'Multi-selección', value: 1},
         {name: 'Texto', value: 2}
     ]
});
Ext.define('Encuestas.store.TipoEncuesta', {
    extend: 'Ext.data.Store',
    fields:['name','value'],
    data : [
         {name: 'Anónimo',    value: true},
         {name: 'Datos personales requeridos', value: false}
     ]
});
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



Ext.define('Encuestas.controller.Grafico', {
    extend: 'Ext.app.Controller',
    stores: ['Pregunta','Campos','Pie','Textos'],
    models: ['GenericModel'],
    refs: [{
            ref: 'graficolist',
            selector: 'graficolist'
        },{
            ref: 'Encuestalist',
            selector: 'genericlist'
        },
        {
            ref: 'renderPanel',
            selector: 'graficoview'
        }
    ],
    init: function() {
        this.control({
            
            
            'graficolist': {
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
           
       },this);
       
    },
    
    onListSelect: function(t,record) {
        if(record.get('tipo')==2){
            this.getRenderPanel().setLoading('Cargando gráfico ...');
            this.getRenderPanel().removeAll();
            this.getTextosStore().load({
               params: { 
                   id:record.getId()
               },
               callback:function(){
                   this.getRenderPanel().setLoading(false);
                   var htm='';
                   var int=0;
                    this.getTextosStore().each(function(rec) {
                       int++;    
                       htm+='<div style="padding: 5px;background:rgb(44, 153, 201);border-radius:5px;margin:3px;"><h3><span style="border-radius:100%;background:rgb(213, 70, 121);color:white;padding:5px;">'+int+'</span></h3><h3 style="color:white">'+rec.get('name')+' '+rec.get('apellidos')+' - '+rec.get('ci')+'</h3><p style="color:white">'+rec.get('text')+'<br><br><b>'+rec.get('direccion')+'</b></p></div>';
                           
                        },this);
                     this.getRenderPanel().add({
                               style:{
                                   'overflow':'scroll'
                               },
                               xtype:'container',
                               html:htm
                           });
               },
               scope:this
           });
        }else{
            this.getPieStore().load({
               params: { 
                   id:record.getId()
               },
               callback:function(){
                   this.getRenderPanel().setLoading(false);
                  
               },
               scope:this
           });
            this.getRenderPanel().removeAll();
            this.getRenderPanel().setLoading('Cargando gráfico ...');
            var me=this.getPieStore();
            

         var chart=Ext.create('Ext.chart.Chart', {
            animate: true,
            style: 'background:#fff',
            shadow: false,
            store: 'Pie',
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['cant'],
                label: {
                   renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Cantidad',
                minorTickSteps:0,
                majorTickSteps :0,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Respuestas'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                label: {
                    display: 'insideEnd',
                    field: 'cant',
                    renderer: function(val){
                         var total = 0;
                        me.each(function(rec) {
                            total += rec.get('cant');
                        });
                        if(val===0)
                            return val;
                        return val+'('+Math.round(val / total * 100) + '%)';
                    },
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle',
                    contrast: true
                },
                xField: 'name',
                yField: ['cant'],
                //color renderer
                renderer: function(sprite, record, attr, index, store) {
                    var fieldValue = Math.random() * 20 + 10;
                    
                    var value = (record.get('cant') >> 0) % 5;
                    var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'][value];
                    return Ext.apply(attr, {
                        fill: color
                    });
                }
            }]
        });
//            this.getRenderPanel().addDocked({
//                xtype:'button',
//                dock:'top',
//                text: 'Exportar gráfica',
//                handler: function() {
//                    Ext.MessageBox.confirm('Confirmar', '¿Está seguro que desa exportar el grafico como una imagen?', function(choice){
//                        if(choice == 'yes'){
//                            chart.save({
//                                type: 'image/png'
//                            });
//                        }
//                    });
//                }
//            })
            this.getRenderPanel().add(chart);
        }
        
        
        
    },
    onListDeSelect: function() {
      
        
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



Ext.define('Encuestas.view.CamposList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.camposlist',
    width:'40%',
    store: 'Campos',
    title: "Campos de respuesta",
    iconCls:'',
   
    initComponent: function() {
        this.columns = [{
            header:"Respuesta",
            dataIndex: 'respuesta',
            flex: 1
        }];
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            
            
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insertCampo',
                disabled:true,
                action:'addCamposAction',
                iconCls:'icon-add'  
            },{
                xtype: 'button',
                text: 'Editar',
                disabled:true,
                privilegeName:'editCampo',
                action:'editCamposAction',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                disabled:true,
                privilegeName:'deleteCampo',
                action:'deleteCamposAction',
                iconCls:'icon-del'  
            }]
        }];
        
        this.callParent();
    }
});


 Ext.define('Encuestas.view.CamposWindow',{
        extend:'Ext.Window',
        width:500,
        autoHeight:true,
        modal:true,
        alias: 'widget.camposwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar campo",
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
                            xtype: 'textarea',
                            fieldLabel: 'Texto de la respuesta',
                            allowBlank: false,
                            maxLength: 255,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'respuesta'
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



 Ext.define('Encuestas.view.EncuestaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.encuestawindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar encuesta",
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
                            fieldLabel: 'Nombre de la encuesta',
                            allowBlank: false,
                            maxLength: 40,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'nombre'
                            
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



Ext.define('Encuestas.view.GenericList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.genericlist',
    
    store: 'Generic',
    title: "Encuestas",
    iconCls:'',
   
    initComponent: function() {
        var editor={
        one:{
            header:"Estado",
            dataIndex: 'estado',
            renderer:function(val){
                switch (val){
                    case 0:{
                            return "Abierta";
                            break;
                    }
                    case 1:{
                            return "En espera";
                            break;
                    }
                    case 2:{
                            return "Cerrada";
                            break;
                    }
                }
            },
            flex: 1,
        },
        two:{
            header:"Tipo de encuesta",
            dataIndex: 'anonimo',
            renderer:function(val){
                if(val===true)
                    return "Anónima";
                else
                    return "Datos personales requeridos";
            },
            flex: 1
        }
        };
        if(Raptor.getActions){
           var actions = Raptor.getActions();
            if (actions !== false) {
                var actionsSize = actions.length;
                
                for (var i = 0; i < actionsSize; i++) {
                    if(actions[i]==='cambiarestado'){
                        editor.one.editor={
                                    xtype: 'combo',
                                    allowBlank: false,
                                    store: 'Estado',
                                    editable: false,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                           }
                        editor.two.editor={
                                xtype: 'combo',
                                allowBlank: false,
                                store: 'TipoEncuesta',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'value'
                       }
                       break;
                    }
                        
                    
                }
            } 
        }
        
        
        this.columns = [{
            header:"Nombre",
            dataIndex: 'nombre',
            flex: 2
        },editor.one,editor.two,{
            header:"Enlace",
            dataIndex: 'enlace',
            renderer:function(val){
                return "<a target='_blank' href='"+Raptor.getFront()+"/atenciononline/encuestas?eid="+val+"'>Ver encuesta</a>";
            },
            flex: 1
        }];
        
        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            
            
            items: [{
                xtype: 'button',
                text: 'Crear',
                privilegeName:'insert',
                action:'addAction',
                iconCls:'icon-add'  
            },{
                xtype: 'button',
                text: 'Editar',
                disabled:true,
                privilegeName:'edit',
                action:'editAction',
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'delete',
                action:'delAction',
                disabled:true,
                
                iconCls:'icon-del'  
            },{xtype:'tbseparator'},{
                xtype: 'button',
                text: 'Diseñar',
                disabled:true,
               
                action:'disenoAction',
                iconCls:'icon-diseno'
            },{
                xtype: 'button',
                text: 'Ver resultado',
                disabled:true,
                
                action:'resultadosAction',
                iconCls:'icon-encuesta'
            }]
        }];
        
        this.callParent();
    }
});


 Ext.define('Encuestas.view.GenericWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        maximized:true,
        alias: 'widget.genericwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Crear encuesta",
        layout:'fit',
        initComponent:function(){
            this.items = {
                    xtype:'container',
                    layout:'border',
                    items:[{
                            xtype: 'preguntaslist',
                            region:'west'
                        },{
                            xtype: 'camposlist',
                            region:'center'
                        }]
                };
            
        this.buttons = [{
                            iconCls: 'icon-cancel',
                            text: 'Cerrar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           Raptor.controlActions();
        } 
 
      
    })



Ext.define('Encuestas.view.GraficoList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.graficolist',
    width:'60%',
    store: 'Pregunta',
    title: "Preguntas",
    iconCls:'',
   
    initComponent: function() {
        this.columns = [{
            header:"Pregunta",
            dataIndex: 'pregunta',
            flex: 2
        },{
            header:"Tipo",
            dataIndex: 'tipo',
            renderer:function(val){
                switch (val){
                    case 0:{
                            return "Selección única";
                            break;
                    }
                    case 1:{
                            return "Multi-selección";
                            break;
                    }
                    case 2:{
                            return "Texto";
                            break;
                    }
                }
            },
            flex: 1
        },{
            header:"Opcional",
            dataIndex: 'opcional',
            renderer:function(val){
                if(val===true)
                    return "Si";
                else
                    return "No";
            },
            flex: 1
        }];
        this.callParent();
    }
});


Ext.define('Encuestas.view.GraficoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.graficoview',
    width:'40%',
    
    title: "Campos de respuesta",
    iconCls:'',
    layout:'fit',
  
    initComponent: function() {
        
        this.callParent();
    }
});


 Ext.define('Encuestas.view.GraficoWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        maximized:true,
        alias: 'widget.graficowindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Ver encuesta",
        layout:'fit',
        initComponent:function(){
            this.items = {
                    xtype:'container',
                    layout:'border',
                    items:[{
                            xtype: 'graficolist',
                            region:'west'
                        },{
                            xtype: 'graficoview',
                            region:'center'
                        }]
                };
            
        this.buttons = [{
                            iconCls: 'icon-cancel',
                            text: 'Cerrar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })



 Ext.define('Encuestas.view.PreguntaWindow',{
        extend:'Ext.Window',
        width:500,
        autoHeight:true,
        modal:true,
        alias: 'widget.preguntawindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Adicionar pregunta",
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
                            xtype: 'textarea',
                            fieldLabel: 'Texto de la pregunta',
                            allowBlank: false,
                            maxLength: 255,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'pregunta'
                            
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Tipo de pregunta',
                            allowBlank: false,
                            store:'Tipo',
                            width: '100%',
                            labelAlign: 'top',
                            name: 'tipo',
                            queryMode:'local',
                            displayField:'name',
                            editable:false,
                            valueField:'value'
                        },{
                            xtype: 'checkbox',
                            fieldLabel: 'Opcional',
                            name: 'opcional',
                            labelAlign: 'top'
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



Ext.define('Encuestas.view.PreguntasList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.preguntaslist',
    width:'60%',
    store: 'Pregunta',
    title: "Preguntas",
    iconCls:'',
   
    initComponent: function() {
        this.columns = [{
            header:"Pregunta",
            dataIndex: 'pregunta',
            flex: 2
        },{
            header:"Tipo",
            dataIndex: 'tipo',
            renderer:function(val){
                switch (val){
                    case 0:{
                            return "Selección única";
                            break;
                    }
                    case 1:{
                            return "Multi-selección";
                            break;
                    }
                    case 2:{
                            return "Texto";
                            break;
                    }
                }
            },
            flex: 1
        },{
            header:"Opcional",
            dataIndex: 'opcional',
            renderer:function(val){
                if(val===true)
                    return "Si";
                else
                    return "No";
            },
            flex: 1
        }];
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insertPregunta',
                action:'addPreguntaAction',
                iconCls:'icon-add'  
            },{
                xtype: 'button',
                text: 'Editar',
                privilegeName:'editPregunta',
                action:'editPreguntaAction',
                disabled:true,
                iconCls:'icon-edit'  
            },{
                xtype: 'button',
                text: 'Eliminar',
                privilegeName:'deletePregunta',
                disabled:true,
                action:'deletePreguntaAction',
                iconCls:'icon-del'  
            }]
        }];
        
        this.callParent();
    }
});


Ext.define('Encuestas.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = [{
                xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'genericlist',
                        region:'center'
                    }]
        }];
        
        this.callParent();
    }
});