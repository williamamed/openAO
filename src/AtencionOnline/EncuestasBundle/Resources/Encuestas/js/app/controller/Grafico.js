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
                position: 'left',
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
                position: 'bottom',
                fields: ['name'],
                label: {
                    rotate: {
                        degrees: 300
                    }
                },
                
                title: 'Respuestas'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('fullname'));
                        
                    }
                },
                label: {
                    display: 'outside',
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


