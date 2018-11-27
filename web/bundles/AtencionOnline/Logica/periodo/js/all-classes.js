
Ext.define('ViasComunicacion.model.GraficaModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'no'},
                {name: 'name'}],
    
    proxy: {
        type: 'ajax',
        url:'periodo/grafcantidad',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
           
            totalProperty: 'count'
        }
    }
});
Ext.define('ViasComunicacion.model.ViaModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre','activo','descripcion'],
    
    proxy: {
        type: 'ajax',
        //url:'viascomunicacion/list',
        api: {
            read: 'periodo/list',
            update: 'periodo/edit',
            create:'periodo/insert',
            destroy: 'periodo/delete'
        },
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
Ext.define('ViasComunicacion.store.Grafica', {
    extend: 'Ext.data.Store',
    model: 'ViasComunicacion.model.GraficaModel'
});
Ext.define('ViasComunicacion.store.Via', {
    extend: 'Ext.data.Store',
    model: 'ViasComunicacion.model.ViaModel'
});
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



Ext.define('ViasComunicacion.view.CompararList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.compararlist',
    
    store: 'Via',
    title: '',
    iconCls:'' ,
   
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        }];
        
      this.on('select',this.onSelectIt,this);  
        
        
        this.callParent();
    },
   onSelectIt:function(a,record){
       if(this.recordSelect.get('id')!=record.get('id'))
           this.up('window').down('button[action=save]').enable();
       else
           this.up('window').down('button[action=save]').disable();
   }
});


 Ext.define('ViasComunicacion.view.CompararWindow',{
        extend:'Ext.Window',
        width:500,
        height:300,
        modal:true,
        alias: 'widget.compararwindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Comparar con ...',
        layout:'fit',
        initComponent:function(){
            this.items = {
                        xtype: 'compararlist',
                        region:'center',
                        recordSelect:this.recordSelect
                    };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            action: 'save',
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



Ext.define('ViasComunicacion.view.EscogerList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.escogerlist',
    
    store: 'Via',
    title: '',
    iconCls:'icon-grafica' ,
    selType:'checkboxmodel',
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        }];
        
        
        
        
        this.callParent();
    }
});


 Ext.define('ViasComunicacion.view.EscogerWindow',{
        extend:'Ext.Window',
        width:500,
        height:300,
        modal:true,
        alias: 'widget.escogerwindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Escoja los períodos a graficar',
        layout:'fit',
        initComponent:function(){
            this.items = {
                        xtype: 'escogerlist',
                        region:'center'
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



Ext.define('ViasComunicacion.view.GraficaChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.graficachart',
    style: 'background:#fff',
            animate: true,
            store: 'Grafica',
            shadow: true,
      //      theme: 'Green',
     legend: {
                position: 'right'
            },
    
            
    initComponent: function() {
        var textSeries=this.selectedSeries;
        var series=new Array();
        var fields=new Array();
        
        for(var i=0;i<textSeries.length;i++){
            var text=textSeries[i].get('nombre');
           
            fields.push(text);
//            series.push({
//                type: 'line',
//                highlight: {
//                    size: 7,
//                    radius: 7
//                },
//                axis: 'left',
//                smooth: true,
//                tips: {
//                  trackMouse: true,
//                  width: 140,
//                  height: 28,
//                  renderer: function(storeItem, item) {
//                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(text) + ' $');
//                  }
//                },
//                label: {
//                  display: 'over',
//                  'text-anchor': 'middle',
//                    field: text,
//                    renderer: Ext.util.Format.numberRenderer('0'),
//                    orientation: 'vertical',
//                    color: '#333'
//                },
//                xField: 'name',
//                yField: text,
//                markerConfig: {
//                    type: 'circle',
//                    size: 4,
//                    radius: 4,
//                    'stroke-width': 0
//                }
//            });
            
            
        }
        this.axes= [{
                type: 'Numeric',
                
                fields: fields,
                position: 'left',
                minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0')
                },
                grid: true,
                title: 'Cantidad'
            }, {
                type: 'Category',
                position: 'bottom',
				label: {
                    rotate: {
                        degrees: 45
                    }
                },
                fields: ['name'],
                title: 'Clasificadores generales'
            }],
            this.series= [{
                type: 'column',
                axis: 'left',
                tips: {
                    trackMouse: true,
					  width: 140,
					  height: 28,
					  renderer: function(storeItem, item) {
						this.setTitle(item.value[1]);
						
					  }
					},
                xField: 'name',
                yField: fields
            }]
//        this.series=series;
//        this.axes= [{
//                type: 'Numeric',
//                minimum: 0,
//                position: 'left',
//                fields: fields,
//                title: 'Cantidad',
//                minorTickSteps: 1,
//                label: {
//                    renderer: Ext.util.Format.numberRenderer('0,0')
//                },
//                grid: {
//                    odd: {
//                        opacity: 1,
//                        fill: '#ddd',
//                        stroke: '#bbb',
//                        'stroke-width': 0.5
//                    }
//                }
//            }, {
//                type: 'Category',
//                position: 'bottom',
//                fields: ['name'],
//                title: 'Indicadores específicos'
//            }],
        this.callParent();
    }
});


 Ext.define('ViasComunicacion.view.GraficaWindow',{
        extend:'Ext.Window',
        width:800,
        height:500,
        modal:true,
        alias: 'widget.graficawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Gráfica',
        layout:'fit',
        iconCls:'icon-grafica',
        initComponent:function(){
            this.items = {
                        xtype: 'graficachart',
                        region:'center',
                        selectedSeries:this.selectedSeries
                    };
            
        this.buttons = [
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })



Ext.define('ViasComunicacion.view.ViaList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vialist',
    
    store: 'Via',
    title: 'Nomenclador de períodos',
    iconCls:'icon-user',
    
    initComponent: function() {
        this.columns = [{
            header:'Fecha de creación del período',
            dataIndex: 'nombre',
            flex: 2
        },{
            header:'Descripción',
            dataIndex: 'descripcion',
            flex: 2
        },{
            header:'Estado',
            dataIndex: 'activo',
            flex: 1,
            renderer:function(value){
                if(value==true)
                    return '<b style="color:green">Activo</b>';
                else
                    return '<b style="color:red">Desabilitado</b>';
            }
        }];
        
        
        
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Adicionar',
                privilegeName:'insert',
                action:'add',
                hidden:true,
                disabled:false,
                iconCls:'icon-add'
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
                text: 'Activar periodo',
                privilegeName:'activate',
                disabled:true,
                hidden:true,
                action:'active',
                iconCls:'icon-acept'  
            },{
                xtype: 'button',
                text: 'Gráfica por cantidad',
                privilegeName:'porcantidad',
                
                hidden:true,
                action:'porcantidad',
                iconCls:'icon-grafica'  
            },{
                xtype: 'button',
                text: 'Generar Clasificador',
                privilegeName:'generarclasificador',
                disabled:true,
                hidden:true,
                action:'generate',
                iconCls:'icon-index'  
            },{
                xtype: 'button',
                text: 'Comparar clasificador',
                privilegeName:'compararclasificador',
                disabled:true,
                hidden:true,
                action:'generatecompare',
                iconCls:'icon-index'  
            }]
        }];
        
        this.callParent();
    }
});


 Ext.define('ViasComunicacion.view.ViaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.viawindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Adicionar período',
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
                                xtype: 'datefield',
                                fieldLabel: 'Fecha del período',
                                allowBlank: false,
                                maxLength: 40,
                                width: '100%',
                                labelAlign: 'top',
                                format: 'm/d/Y',
                                name: 'nombre',
                                value: new Date()
                            }]
                    },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {margin: 5},
                        items: [{
                                xtype: 'textarea',
                                fieldLabel: 'Descripcion',
                                allowBlank: true,
                               
                                width: '100%',
                                labelAlign: 'top',
                                name: 'descripcion'
                               
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



Ext.define('ViasComunicacion.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = {
                    xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'vialist',
                        region:'center'
                    }]
                };
                
        
        this.callParent();
    }
});