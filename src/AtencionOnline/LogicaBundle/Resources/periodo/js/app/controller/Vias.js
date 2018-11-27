Ext.define('ViasComunicacion.controller.Vias', {
    extend: 'Ext.app.Controller',
    stores: ['Via','Grafica'],
    models: ['ViaModel','GraficaModel'],
    refs: [{
            ref: 'vialist',
            selector: 'vialist'
        },
        {
            ref: 'periodolist',
            selector: 'periodolist'
        },
        {
            ref: 'buttonEdit',
            selector: 'viewport button[action=update]'
        },
         {
            ref: 'buttonExportar',
            selector: 'viewport button[action=generate]'
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
            ref: 'buttonActive',
            selector: 'viewport button[action=active]'
        },
        {
            ref: 'buttonCompare',
            selector: 'viewport button[action=generatecompare]'
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
            'viewport button[action=generate]': {
                click: this.onPrint
            },
            'viewport button[action=active]': {
                click: this.onActive
            },
            'viewport button[action=porcantidad]': {
                click: this.onPorCantidad
            },
            'escogerwindow button[action=save]': {
                click: this.grafCant
            },
            'viewport button[action=generatecompare]': {
                click: this.onCompareClasif
            },
            'compararwindow button[action=save]': {
                click: this.compareClasif
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
   onPorCantidad:function(){
       var view = Ext.widget('escogerwindow');
   },
   onPrint:function(){
        var record=this.getVialist().getSelectionModel().getLastSelected();
        ventana = window.open('periodo/generarclasificador?periodo='+record.get('id'),'');
       // ventana.close();
    },        
  grafCant:function(button){
      var win=button.up('window');
      var sel=win.down('grid').getSelectionModel().getSelection();
      win.close();
      var view = Ext.widget('graficawindow',{selectedSeries:sel});
      view.setLoading("Cargando gráfica");
      var fields=new Array();
      var modelFields=this.getGraficaModelModel().getFields();
      for(var i=0;i<sel.length;i++){
          fields.push(sel[i].get('id'));
          modelFields.push(sel[i].get('nombre'));
      }
      this.getGraficaModelModel().setFields(modelFields);
      this.getGraficaStore().load({
          params:{campos:Ext.encode(fields)},
          callback:function(){
              view.setLoading(false);
          }
      });
  },
  onCompareClasif:function(){
      var record=this.getVialist().getSelectionModel().getLastSelected();
      var view = Ext.widget('compararwindow',{recordSelect:record});
  },
  compareClasif:function(button){
     var record=this.getVialist().getSelectionModel().getLastSelected();
     var grid=button.up('window').down('grid');
     var id1=grid.getSelectionModel().getLastSelected().get('id');
     ventana = window.open('periodo/generarclasificador?periodo='+record.get('id')+'&periodo2='+id1,'');
     button.up('window').close();
  },
    onRender:function(){
        
       // this.getVialist().getStore().on('load',this.onLoadList,this)
        Rpt.controlActions();
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
        var view = Ext.widget('viawindow', {action: 'edit',title:'Editar período'});
       
        view.down('form').loadRecord(this.getVialist().getSelectionModel().getLastSelected());
       
    },
    
    updateUser: function(button) {
        var win = button.up('window');
        if (win.action == 'edit') {

            var form = win.down('form'),
                    record = form.getRecord();
                    
            this.editUser(form, 'periodo/edit', record.get('id'));
          

        }

        if (win.action == 'add') {

            var form = win.down('form');
           this.insertUser(form, 'periodo/insert');
           

        }

    },
    onDelete: function() {
        Dino.msg.info(2, "¿Está a punto de eliminar este elemento, está seguro?", this.deleteUser, this);
    },
            
    deleteUser: function() {
        var model=this.getVialist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'periodo/delete',
            params:{id: model.get('id')},
            callback: function() {
                this.getVialist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Dino.msg.info(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getViaStore().load();
                }
            },
            failure: function(response, opts) {
                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
        this.getVialist().getSelectionModel().deselectAll();
        this.getVialist().setLoading(true);
    },
    
    onActive: function() {
        Dino.msg.info(2, "¿Está a punto de establecer este período como el actual, está seguro?", this.activePeriodo, this);
    },
            
    activePeriodo: function() {
        var model=this.getVialist().getSelectionModel().getLastSelected();
        
        Ext.Ajax.request({
            url: 'periodo/activate',
            params:{id: model.get('id')},
            callback: function() {
                this.getVialist().setLoading(false);
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Dino.msg.info(obj.cod, obj.msg);
                if(obj.cod&&obj.cod==1){
                    this.getViaStore().load();
                }
            },
            failure: function(response, opts) {
                 Dino.msg.info(3,'server-side failure with status code ' + response.status);
            },
            scope: this
        });
        this.getVialist().getSelectionModel().deselectAll();
        this.getVialist().setLoading(true);
    },
    onListSelect: function() {
         if(this.getButtonEdit())
        this.getButtonEdit().enable();
         if(this.getButtonDelete())
        this.getButtonDelete().enable();
        if(this.getButtonActive())
        this.getButtonActive().enable();
        if(this.getButtonExportar())
        this.getButtonExportar().enable();
        if(this.getButtonCompare())
        this.getButtonCompare().enable();
       
        
    },
    onListDeSelect: function() {
        if(this.getButtonEdit())
        this.getButtonEdit().disable();
        if(this.getButtonDelete())
        this.getButtonDelete().disable();
        if(this.getButtonActive())
        this.getButtonActive().disable();
         if(this.getButtonExportar())
        this.getButtonExportar().disable();
        if(this.getButtonCompare())
        this.getButtonCompare().disable();
       
    },
    insertUser: function(form, url) {
        
        form.submit({
            url: url,
            waitMsg: 'Espere mientras la acción es realizada',
            params: {ajax_request: true},
            success: function(formBasic, action) {
                form.up('window').close();
                Dino.msg.info(action.result.cod, action.result.msg);
                this.getViaStore().load();
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
                this.getVialist().getSelectionModel().deselectAll();
                this.getViaStore().load();
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


