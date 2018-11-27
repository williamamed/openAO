
Ext.define('Reporte.model.BarCompareModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listbarcompare',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
Ext.define('Reporte.model.BarModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listbar',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
Ext.define('Reporte.model.EstructureModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name',{name:'text',mapping:'name'},'indexe','description','incidencias','action'],
    
    proxy: {
        type: 'ajax',
        url: 'reporte/listestructure',
       
        actionMethods: { //Esta Linea es necesaria para el metodo de llamada POST o GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Reporte.model.GenericModel', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    
    proxy: {
        type: 'ajax',
        api:{
            create  : 'action/insert',
            read    : 'action/list',
            update  : 'action/edit',
            destroy : 'action/delete'
        },
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Reporte.model.LineModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listline',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
Ext.define('Reporte.model.PieModel', {
    extend: 'Ext.data.Model',
    fields: ['name','cant'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listpie',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Reporte.model.YearModel', {
    extend: 'Ext.data.Model',
    fields: ['name'],
    
    proxy: {
        type: 'ajax',
        url:'reporte/listyear',
        actionMethods: { //POST or GET
            read: 'POST'
        },
        reader: {
            type: 'json'
           
        }
    }
});
Ext.define('Reporte.store.Bar', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.BarModel'
});
Ext.define('Reporte.store.BarCompare', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.BarCompareModel'
});
Ext.define('Reporte.store.EjeX', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":1, "name":"Meses"},
        {"value":2, "name":"Estructuras(estructuras hijas de la seleccionada)"},
        {"value":3, "name":"Clasificador"}
     
    ]
});


Ext.define('Reporte.store.Estructure', {
    extend: 'Ext.data.TreeStore',
    model: 'Reporte.model.EstructureModel',
    autoLoad: true,
    root: {
        text: "Global",
        expandable:false
    }
});
Ext.define('Reporte.store.Generic', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.GenericModel'
});
Ext.define('Reporte.store.Line', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.LineModel'
});
Ext.define('Reporte.store.Pie', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.PieModel'
});
Ext.define('Reporte.store.Tablas', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    data : [
        {"value":0, "name":"Clasificador general"},
        {"value":1, "name":"Tipo de incidencia"},
        {"value":2, "name":"Vía de comunicación"},
        {"value":3, "name":"Incidencias por estructura"},
        {"value":4, "name":"Valoración quejas (Tipo)"},
        {"value":5, "name":"Valoración quejas (Conformidad)"}
    ]
});


Ext.define('Reporte.store.Year', {
    extend: 'Ext.data.Store',
    model: 'Reporte.model.YearModel',
    autoLoad: true
});
Ext.define('Reporte.controller.Compare', {
    extend: 'Ext.app.Controller',
    stores: ['Generic','Pie','Line','BarCompare'],
    models: ['GenericModel','LineModel','BarCompareModel'],
    refs: [{
            ref:'Tabla',
            selector:'options combo[name=compareTabla]'
    },{
            ref:'ColumnButton',
            selector:'options button[action=column-chart-compare]'
    },{
            ref:'LineButton',
            selector:'options button[action=line-chart-compare]'
    },{
            ref:'renderPanel',
            selector: 'viewport #renderPanel'
    },{
            ref:'exportExcel',
            selector: 'options button[action=btn-excel-compare]'
    }],
    init: function() {
        this.control({
            
            'options combo[name=compareTabla]':{
                select:this.onTableSelect
            },
            'options button[action=line-chart-compare]':{
                click:this.onRequestLine
            },
            'options button[action=column-chart-compare]':{
                click:this.onRequestBar
            },
            'options button[action=btn-excel-compare]':{
                click:this.onRequestExport
            },
            'comparewindow button[action=save]':{
                click:this.onShowLine
            },
            'comparewindow button[action=saveBar]':{
                click:this.onShowBar
            },
            'comparewindow button[action=export]':{
                click:this.export
            },
            'viewport':{
                render:this.onRender
            }
        });
       
    },
    onRender:function(){
       
        this.getLineButton().disable();
        this.getColumnButton().disable();
        this.getExportExcel().disable();
    },
    onTableSelect:function(){
      
       if(arguments[1][0].get('value')==0){
           
           this.getLineButton().disable();
           this.getColumnButton().enable();
           this.getExportExcel().enable();
       }
       if(arguments[1][0].get('value')==1){
           
           this.getLineButton().disable();
           this.getColumnButton().enable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==2){
          
           this.getLineButton().disable();
           this.getColumnButton().enable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==3){
           
           this.getLineButton().enable();
           this.getColumnButton().enable();
           this.getExportExcel().disable();
       }
        
    },
    onListSelect: function() {
        
    },
    onListDeSelect: function() {
      
        
    },
   
    onAddAction: function() {
        
    },
    
    addAction:function(button){
       
        
    },
    
    onRequestLine:function(){
        var view=Ext.widget('comparewindow');
        view.down('combo[name=ejex]').select(1);
        view.down('combo[name=ejex]').disable();
        
    },
    onShowLine:function(btn){
       
       
       var est=btn.up('window').getEstructure();
       var x=btn.up('window').getX();
       var year=btn.up('window').getYear();
       var year2=btn.up('window').getYear2();
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       this.getRenderPanel().setLoading('Cargando gráfico ...');
       this.getLineStore().load({
           url:'reporte/listlinecompare',
           params: { 
               tabla:this.getTabla().getValue(),
               idEstructure: est,
               ejex: 1,
               year:year,
               year2:year2,
               desde:desde,
               hasta:hasta
           },
           callback:function(){
               this.getRenderPanel().setLoading(false);
               this.renderLineChart();
           },
           scope:this
       });
       btn.up('window').close();
       
       
       
    },
    renderLineChart:function(){
        var me=this.getLineStore();
       
       var names=this.getLineStore().getProxy().getReader().rawData.names;
       
       var series=new Array();
       var fields=new Array('name');
       
       for(var i=0;i<names.length;i++){
           fields.push(names[i]);
           series.push({
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'name',
                yField: names[i],
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            });
       }
       this.getLineModelModel().setFields(fields);   
       this.getLineStore().loadRawData(this.getLineStore().getProxy().getReader().rawData);
       this.getRenderPanel().removeAll();
        this.getRenderPanel().add(  
          Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            store: 'Line',
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: names,
                title: 'Cantidad de incidencias',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                rotate:true,
                fields: ['name'],
                label: {
                    rotate: {
                        degrees: 270
                    }
                },
                title: 'Meses del Año'
            }],
            series: series
        }));
    },
    
    
    
    onRequestBar:function(){
        var view=Ext.widget('comparewindow');
       
        view.down('combo[name=ejex]').select(this.getTabla().getValue());
        
        
        view.down('combo[name=ejex]').disable();
        view.down('button[action=save]').action='saveBar';
    },
    onShowBar:function(btn){
       var est=btn.up('window').getEstructure();
       var x=btn.up('window').getX();
       var year=btn.up('window').getYear();
       var year2=btn.up('window').getYear2();
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       this.getRenderPanel().setLoading('Cargando gráfico ...');
       this.getBarCompareStore().load({
           url:'reporte/listbarcompare',
           params: { 
               tabla:this.getTabla().getValue(),
               idEstructure: est,
               ejex: x,
               year:year,
               year2:year2,
               desde:desde,
               hasta:hasta
           },
           callback:function(){
               this.getRenderPanel().setLoading(false);
               this.renderBarChart();
           },
           scope:this
       });
       btn.up('window').close();
       
       
       
    },
    renderBarChart:function(){
        
        var total=0;
        var totalCompare=0;
        
        var names=this.getBarCompareStore().getProxy().getReader().rawData.compare;
       
       
       var fields=new Array('name');
       
       for(var i=0;i<names.length;i++){
           fields.push(names[i]);
       }
       this.getBarCompareModelModel().setFields(fields);   
       this.getBarCompareStore().loadRawData(this.getBarCompareStore().getProxy().getReader().rawData);
       this.getBarCompareStore().each(function(row){
            total+=row.get(names[0]);
            totalCompare+=row.get(names[1]);
        });
        this.getRenderPanel().removeAll();
        this.getRenderPanel().add(  
                Ext.create('Ext.chart.Chart', {
                    animate: true,
                    shadow: true,
                    store: 'BarCompare',
                    legend: {
                        position: 'right'  
                      },
                    axes: [{
                        type: 'Numeric',
                        position: 'left',
                        fields: names,
                        title: 'Cantidad de incidencias',
                        
                        minorTickSteps:0,
                       
                        grid: true
                        
                    }, {
                        type: 'Category',
                        position: 'bottom',
                        fields: ['name'],
                        title: 'Total '+names[0]+" ("+total+") - "+'Total '+names[1]+" ("+totalCompare+")",
                        label: {
                            rotate: {
                                degrees: 270
                            }
                        }
                    }],
                    series: [{
                        type: 'column',
                        axis: 'left',
                        gutter: 80,
                        xField: 'name',
                        yField: names,
                        
                        tips: {
                            trackMouse: true,
                            width: 150,
                            height: 38,
                            renderer: function(storeItem, item) {
                                
                                this.setTitle(item.yField+"  ->  "+storeItem.get(item.yField));
                                
                            }
                        }
                    }]
                })
          );
    },
    
    onRequestExport:function(){
        var view=Ext.widget('comparewindow');
        view.down('textfield[name=ejey]').hide();
        view.down('combo[name=ejex]').hide();
        view.down('button[action=save]').action='export';
        view.setTitle('Opciones de exportado ...')
    },
    export:function(btn){
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       var est=btn.up('window').getEstructure();
       var year=btn.up('window').getYear();
       var year2=btn.up('window').getYear2();
       
       btn.up('window').hide();
        this.getRenderPanel().setLoading('Generando Excel ...');
        var panel=Ext.create('Ext.Panel',{
            html:'<iframe id="export-incidencia" style="border:none;width:0%;height:0%" src="reporte/export?node='+est+'&desde='+desde+'&hasta='+hasta+'&year='+year+'&year2='+year2+'"></iframe>'
        });
        panel.hide();
        panel.on('render',function(){
               
                panel.getEl().down('#export-incidencia').on('load',function(){
                    
                    this.getRenderPanel().setLoading(false);
                   
                },this)
        },this);
        this.getRenderPanel().add(panel);
        
    },
});



Ext.define('Reporte.controller.Generic', {
    extend: 'Ext.app.Controller',
    stores: ['Generic','Pie','Line','Bar'],
    models: ['GenericModel','LineModel'],
    refs: [{
            ref:'Tabla',
            selector:'options combo[name=tabla]'
    },{
            ref:'PieButton',
            selector:'options button[action=pie-chart]'
    },{
            ref:'ColumnButton',
            selector:'options button[action=column-chart]'
    },{
            ref:'LineButton',
            selector:'options button[action=line-chart]'
    },{
            ref:'renderPanel',
            selector: 'viewport #renderPanel'
    },{
            ref:'exportExcel',
            selector: 'options button[action=btn-excel]'
    }],
    init: function() {
        this.control({
            
            'genericwindow button[action=save]': {
                click: this.addAction
            },
            'options combo[name=tabla]':{
                select:this.onTableSelect
            },
            'options button[action=pie-chart]':{
                click:this.onRequestPie
            },
            'options button[action=line-chart]':{
                click:this.onRequestLine
            },
            'options button[action=column-chart]':{
                click:this.onRequestBar
            },
            'options button[action=btn-excel]':{
                click:this.onRequestExport
            },
            'piefechawindow button[action=save]':{
                click:this.onShowPie
            },
            'axeswindow button[action=save]':{
                click:this.onShowLine
            },
            'axeswindow button[action=saveBar]':{
                click:this.onShowBar
            },
            'axeswindow button[action=export]':{
                click:this.export
            },
            'viewport':{
                render:this.onRender
            }
        });
       
    },
    onRender:function(){
        //Make Raptor control the UI to activate the privilege
        Raptor.controlActions();
        this.getPieButton().disable();
        this.getLineButton().disable();
        this.getColumnButton().disable();
        this.getExportExcel().disable();
        Interactive.show('reporte.tuto1');
    },
    onTableSelect:function(){
      
       if(arguments[1][0].get('value')==0){
           this.getPieButton().disable();
           this.getLineButton().enable();
           this.getColumnButton().enable();
           this.getExportExcel().enable();
       }
       if(arguments[1][0].get('value')==1){
           this.getPieButton().enable();
           this.getLineButton().enable();
           this.getColumnButton().disable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==2){
           this.getPieButton().enable();
           this.getLineButton().disable();
           this.getColumnButton().disable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==3){
           this.getPieButton().disable();
           this.getLineButton().disable();
           this.getColumnButton().enable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==4){
           this.getPieButton().enable();
           this.getLineButton().disable();
           this.getColumnButton().disable();
           this.getExportExcel().disable();
       }
       if(arguments[1][0].get('value')==5){
           this.getPieButton().enable();
           this.getLineButton().disable();
           this.getColumnButton().disable();
           this.getExportExcel().disable();
       }
        
    },
    onListSelect: function() {
        
    },
    onListDeSelect: function() {
      
        
    },
   
    onAddAction: function() {
        var view = Ext.widget('genericwindow');
    },
    
    addAction:function(button){
        var win=button.up('window');
        
    },
            
    onRequestPie:function(){
        var view=Ext.widget('piefechawindow');
        Interactive.show('reporte.tuto2');
    },
    onShowPie:function(btn){
       var slider=btn.up('window').down('multislider').getValues();
       var year=btn.up('window').down('combo[name=year2]').getValue();
	   var est=btn.up('window').getEstructure();
       var desde=slider[0];
       var hasta=slider[1];
       if(!desde || !hasta)
           return ;
       this.getRenderPanel().setLoading('Cargando gráfico ...');
       this.getPieStore().load({
           params: { 
               tabla:this.getTabla().getValue(),
               desde: desde,
               hasta: hasta,
               year: year,
			   idEstructure: est
           },
           callback:function(){
               this.getRenderPanel().setLoading(false);
           },
           scope:this
       });
       btn.up('window').close();
       var me=this.getPieStore();
       this.getRenderPanel().removeAll();
       this.getRenderPanel().add( Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            animate: true,
            store: 'Pie',
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'cant',
                showInLegend: true,
                donut: false,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    me.each(function(rec) {
                        total += parseInt(rec.get('cant'));
                    });
                   
                    this.setTitle(storeItem.get('name') + ': '+storeItem.get('cant')+' (' + Math.round(storeItem.get('cant') / total * 100) + '%)');
                  }
                },
                highlight: {
                  segment: {
                    margin: 20
                  }
                },
                label: {
                    field: 'name',
                    display: 'outside',
                    contrast: false,
                    font: '18px Arial'
                }
            }]
        }));
    },
    
    
    onRequestLine:function(){
        var view=Ext.widget('axeswindow');
        view.down('combo[name=ejex]').select(1);
        view.down('combo[name=ejex]').disable();
        Interactive.show('reporte.tuto2');
    },
    onShowLine:function(btn){
       
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       var est=btn.up('window').getEstructure();
       var x=btn.up('window').getX();
       var year=btn.up('window').getYear();
       
       this.getRenderPanel().setLoading('Cargando gráfico ...');
       this.getLineStore().load({
           params: { 
               tabla:this.getTabla().getValue(),
               idEstructure: est,
               ejex: 1,
               year:year,
               desde: desde,
               hasta: hasta
           },
           callback:function(){
               this.getRenderPanel().setLoading(false);
               this.renderLineChart();
           },
           scope:this
       });
       btn.up('window').close();
       
       
       
    },
    renderLineChart:function(){
        var me=this.getLineStore();
       
       var names=this.getLineStore().getProxy().getReader().rawData.names;
       
       var series=new Array();
       var fields=new Array('name');
       
       for(var i=0;i<names.length;i++){
           fields.push(names[i]);
           series.push({
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'name',
                yField: names[i],
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            });
       }
       this.getLineModelModel().setFields(fields);   
       this.getLineStore().loadRawData(this.getLineStore().getProxy().getReader().rawData);
       this.getRenderPanel().removeAll();
        this.getRenderPanel().add(  
          Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            store: 'Line',
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: names,
                title: 'Cantidad de incidencias',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                rotate:true,
                fields: ['name'],
                label: {
                    rotate: {
                        degrees: 270
                    }
                },
                title: 'Meses del Año'
            }],
            series: series
        }));
    },
    
    
    
    onRequestBar:function(){
        var view=Ext.widget('axeswindow');
        if(this.getTabla().getValue()==0)
            view.down('combo[name=ejex]').select(3);
        if(this.getTabla().getValue()==3)
            view.down('combo[name=ejex]').select(2);
        Interactive.show('reporte.tuto2');
        view.down('combo[name=ejex]').disable();
        view.down('button[action=save]').action='saveBar';
    },
    onShowBar:function(btn){
       var est=btn.up('window').getEstructure();
       var x=btn.up('window').getX();
       var year=btn.up('window').getYear();
       
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       this.getRenderPanel().setLoading('Cargando gráfico ...');
       this.getBarStore().load({
           
           params: { 
               tabla:this.getTabla().getValue(),
               idEstructure: est,
               ejex: x,
               year:year,
               desde: desde,
               hasta: hasta
           },
           callback:function(){
               this.getRenderPanel().setLoading(false);
               this.renderBarChart();
           },
           scope:this
       });
       btn.up('window').close();
       
       
       
    },
    renderBarChart:function(){
        var me=this.getBarStore();
        var total=0;
        me.each(function(row){
            total+=row.get('cant');
        });
        this.getRenderPanel().removeAll();
        this.getRenderPanel().add(  
                Ext.create('Ext.chart.Chart', {
                    animate: true,
                    shadow: true,
                    store: 'Bar',
                    axes: [{
                        type: 'Numeric',
                        position: 'left',
                        fields: ['cant'],
                        title: 'Cantidad de incidencias',
                        
                        minorTickSteps:0,
                        majorTickSteps :0,
                        grid: true
                        
                    }, {
                        type: 'Category',
                        position: 'bottom',
                        fields: ['name'],
                        title: 'Total '+total,
                        label: {
                            rotate: {
                                degrees: 270
                            }
                        }
                    }],
                    series: [{
                        type: 'column',
                        axis: 'left',
                        gutter: 80,
                        xField: 'name',
                        yField: ['cant'],
                        
                        tips: {
                            trackMouse: true,
                            width: 150,
                            height: 38,
                            renderer: function(storeItem, item) {
                               
                                this.setTitle(storeItem.get('name')+"  ->  "+storeItem.get('cant'));
                            }
                        },
                        style: {
                            fill: '#38B8BF',
                            
                        }
                    }]
                })
          );
    },
    
    onRequestExport:function(){
        var view=Ext.widget('axeswindow');
        view.down('textfield[name=ejey]').hide();
        view.down('combo[name=ejex]').hide();
        view.down('button[action=save]').action='export';
        view.setTitle('Opciones de exportado ...');
        Interactive.show('reporte.tuto2');
    },
    export:function(btn){
       var slider=btn.up('window').down('multislider').getValues();
       var desde=slider[0];
       var hasta=slider[1];
       
       var est=btn.up('window').getEstructure();
       var year=btn.up('window').getYear();
       
       btn.up('window').hide();
        this.getRenderPanel().setLoading('Generando Excel ...');
        var panel=Ext.create('Ext.Panel',{
            html:'<iframe id="export-incidencia" style="border:none;width:0%;height:0%" src="reporte/export?node='+est+'&desde='+desde+'&hasta='+hasta+'&year='+year+'"></iframe>'
        });
        panel.hide();
        panel.on('render',function(){
               
                panel.getEl().down('#export-incidencia').on('load',function(){
                    
                    this.getRenderPanel().setLoading(false);
                   
                },this)
        },this);
        this.getRenderPanel().add(panel);
        
    },
});



 Ext.define('Reporte.view.AxesWindow',{
        extend:'Ext.Window',
        width:350,
        autoHeight:true,
        modal:true,
        alias: 'widget.axeswindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Especifique la estructura del gráfico",
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
                            width: '100%',
                            fieldLabel: 'Eje Y',
                            name: 'ejey',
                            disabled:true,
                            editable: false,
                            value: 'Cantidad de incidencias',
                            labelAlign: 'top',
                            allowBlank: false
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Eje X',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'ejex',
                            store: 'EjeX',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'value'
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Año',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'year',
                            store: 'Year',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'name'
                        },{
                            fieldLabel: 'Período de meses',
                            labelAlign: 'top',
                            xtype: 'multislider',
                            width: 200,
                            tipText:function(thumb){
                                var values=thumb.slider.getValues();
                                var meses=new Array(
                                        '',
                                        'Enero',
                                        'Febrero',
                                        'Marzo',
                                        'Abril',
                                        'Mayo',
                                        'Junio',
                                        'Julio',
                                        'Agosto',
                                        'Septiembre',
                                        'Octubre',
                                        'Noviembre',
                                        'Diciembre'
                                );
                                 return meses[values[0]]+" - "+meses[values[1]];
                            },
                            values: [1,12],
                            increment: 1,
                            minValue: 1,
                            maxValue: 12,

                            // this defaults to true, setting to false allows the thumbs to pass each other
                            constrainThumbs: true,
                        },{
                                        xtype: 'treepanel',
                                        rootVisible: false,
                                        store: 'Estructure',
                                        action:'estructura',
                                        title: 'Estructuras',
                                        iconCls:'icon-estructure',
                                        height:250,
                                        collapsible:false
                                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            disabled:true,
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
            var me=this;
            var combo=this.down('combo[name=ejex]');
            var year=this.down('combo[name=year]');
            var tree=this.down('treepanel[action=estructura]');
            var btn=this.down('button[action=save]');
            
            year.on('select',function(){
                if(tree.getSelectionModel().hasSelection())
                    btn.enable();
                
            });
            tree.on('select',function(){
                if(year.isDirty())
                    btn.enable();
                
            });
        },
        
        getEstructure:function(){
           return this.down('treepanel[action=estructura]').getSelectionModel().getLastSelected().get('id')
        },
        getX:function(){
           return this.down('combo[name=ejex]').getValue();
        }, 
        getYear:function(){
           return this.down('combo[name=year]').getValue();
        } 
      
    })



 Ext.define('Reporte.view.CompareWindow',{
        extend:'Ext.Window',
        width:350,
        autoHeight:true,
        modal:true,
        alias: 'widget.comparewindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Especifique la estructura del gráfico",
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
                            width: '100%',
                            fieldLabel: 'Eje Y',
                            name: 'ejey',
                            disabled:true,
                            editable: false,
                            value: 'Cantidad de incidencias',
                            labelAlign: 'top',
                            allowBlank: false
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Eje X',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'ejex',
                            store: 'Tablas',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'value'
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Comparar Año',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'year',
                            store: 'Year',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'name'
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Con Año',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'year2',
                            store: 'Year',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'name'
                        },{
                            fieldLabel: 'Período de meses',
                            labelAlign: 'top',
                            xtype: 'multislider',
                            width: 200,
                            tipText:function(thumb){
                                var values=thumb.slider.getValues();
                                var meses=new Array(
                                        '',
                                        'Enero',
                                        'Febrero',
                                        'Marzo',
                                        'Abril',
                                        'Mayo',
                                        'Junio',
                                        'Julio',
                                        'Agosto',
                                        'Septiembre',
                                        'Octubre',
                                        'Noviembre',
                                        'Diciembre'
                                );
                                 return meses[values[0]]+" - "+meses[values[1]];
                            },
                            values: [1,12],
                            increment: 1,
                            minValue: 1,
                            maxValue: 12,

                            // this defaults to true, setting to false allows the thumbs to pass each other
                            constrainThumbs: true,
                        },{
                                        xtype: 'treepanel',
                                        rootVisible: false,
                                        store: 'Estructure',
                                        action:'estructura',
                                        title: 'Estructuras',
                                        iconCls:'icon-estructure',
                                        height:250,
                                        collapsible:false
                                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Aceptar',
                            disabled:true,
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancelar',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
            var me=this;
            var combo=this.down('combo[name=ejex]');
            var year=this.down('combo[name=year]');
            var year2=this.down('combo[name=year2]');
            var tree=this.down('treepanel[action=estructura]');
            var btn=this.down('button[action=save]');
            
            year.on('select',function(){
                if(tree.getSelectionModel().hasSelection()&&year2.isDirty())
                    btn.enable();
                
            });
            year2.on('select',function(){
                if(tree.getSelectionModel().hasSelection()&&year.isDirty())
                    btn.enable();
                
            });
            tree.on('select',function(){
                if(year.isDirty()&&year2.isDirty())
                    btn.enable();
                
            });
            
           
        },
        
        getEstructure:function(){
           return this.down('treepanel[action=estructura]').getSelectionModel().getLastSelected().get('id')
        },
        getX:function(){
           return this.down('combo[name=ejex]').getValue();
        }, 
        getYear:function(){
           return this.down('combo[name=year]').getValue();
        },
        getYear2:function(){
           return this.down('combo[name=year2]').getValue();
        }
      
    })



Ext.define('Reporte.view.GenericList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.genericlist',
    
    store: 'Generic',
    title: "Generic grid - use Raptor.getTag('title') to integrate with language package ",
    iconCls:'',
   
    initComponent: function() {
        this.columns = [{
            header:"Header",
            dataIndex: 'name',
            flex: 1
        }];
        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            /*
            use this to auto-adjust privilege in the view
            items: [{
                xtype: 'button',
                text: Raptor.getTag('add'),
                disabled:true,
                hidden:true,
                privilegeName:'insert',
                action:'addAction',
                iconCls:'icon-add'  
            }]*/
        }];
        
        this.callParent();
    }
});


 Ext.define('Reporte.view.GenericWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.genericwindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Generic window",
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
                            fieldLabel: 'Test field',
                            allowBlank: false,
                            maxLength: 40,
                            width: '100%',
                            labelAlign: 'top',
                            name: 'name'
                            
                        }]
        };
            
        this.buttons = [{   iconCls: 'icon-acept',
                            text: 'Acept',
                            action: 'save'
                        }, 
                        {
                            iconCls: 'icon-cancel',
                            text: 'Cancel',
                            scope: this,
                            handler: this.close
                        }]    
            
            
            
            this.callParent();
           
        } 
 
      
    })



Ext.define('Reporte.view.Options', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.options',
    
    store: 'Generic',
    title: "Opciones de gráficas",
    iconCls:'',
    flex:.4,
    collapsible:true,
    overflowY:'auto',
    
    bodyPadding:5,
    initComponent: function() {
        this.items = [{
                xtype:'fieldset',
                columnWidth: 1,
                title: 'Gráfica estandar',
                collapsible: true,
                
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items :[{
                    xtype: 'combo',
                    fieldLabel: 'Mostrar gráfica de',
                    
                    blankText: '',
                    labelAlign: 'top',
                    name: 'tabla',
                    store: 'Tablas',
                    queryMode: 'local',
                    displayField: 'name',
                    editable: false,
                    valueField: 'value'
                },{
                    xtype:'container',
                    
                    items:[{
                        xtype: 'button',
                        scale: 'large',
                        action: 'pie-chart',
                        width:120,
                        height:90,
                        cls:'options-reporte',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-pie.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        action: 'line-chart',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-line.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'column-chart',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-column.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        action: 'btn-excel',
                        width:120,
                        height:90,
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/excel.png')+'">'
                    }]
                }]
        },{
                xtype:'fieldset',
                columnWidth: 1,
                title: 'Gráfica comparativa',
                collapsible: true,
                
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items :[{
                    xtype: 'combo',
                    fieldLabel: 'Mostrar gráfica de',
                    
                    blankText: '',
                    labelAlign: 'top',
                    name: 'compareTabla',
                    store: 'Tablas',
                    queryMode: 'local',
                    displayField: 'name',
                    editable: false,
                    valueField: 'value'
                },{
                    xtype:'container',
                    
                    items:[{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'line-chart-compare',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-line.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'column-chart-compare',
                        html: '<img width="120" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/chart-column.gif')+'">'
                    },{
                        xtype: 'button',
                        scale: 'large',
                        cls:'options-reporte',
                        width:120,
                        height:90,
                        action: 'btn-excel-compare',
                        html: '<img width="120" height="90" height="90" src="'+Raptor.getBundleResource('AtencionOnline/Logica/css/img/excel.png')+'">'
                    }]
                }]
        }];
        
        this.callParent();
    }
});


 Ext.define('Reporte.view.PieFechaWindow',{
        extend:'Ext.Window',
        width:300,
        autoHeight:true,
        modal:true,
        alias: 'widget.piefechawindow',
        autoShow: true,
        closeAction:'destroy',
        title:"Especifique un rango de fecha",
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
                            xtype: 'combo',
                            fieldLabel: 'Con Año',

                            blankText: '',
                            labelAlign: 'top',
                            name: 'year2',
                            store: 'Year',
                            queryMode: 'local',
                            displayField: 'name',
                            editable: false,
                            valueField: 'name'
                        },{
                            fieldLabel: 'Período de meses',
                            labelAlign: 'top',
                            xtype: 'multislider',
                            width: 200,
                            tipText:function(thumb){
                                var values=thumb.slider.getValues();
                                var meses=new Array(
                                        '',
                                        'Enero',
                                        'Febrero',
                                        'Marzo',
                                        'Abril',
                                        'Mayo',
                                        'Junio',
                                        'Julio',
                                        'Agosto',
                                        'Septiembre',
                                        'Octubre',
                                        'Noviembre',
                                        'Diciembre'
                                );
                                 return meses[values[0]]+" - "+meses[values[1]];
                            },
                            values: [1,12],
                            increment: 1,
                            minValue: 1,
                            maxValue: 12,

                            // this defaults to true, setting to false allows the thumbs to pass each other
                            constrainThumbs: true,
                        },{
                                        xtype: 'treepanel',
                                        rootVisible: false,
                                        store: 'Estructure',
                                        action:'estructura',
                                        title: 'Estructuras',
                                        iconCls:'icon-estructure',
                                        height:250,
                                        collapsible:false
                                        }]
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
			var tree=this.down('treepanel[action=estructura]');
			var year=this.down('combo[name=year2]');
            year.on('select',function(){
				if(tree.getSelectionModel().hasSelection())
                    this.down('button[action=save]').enable();
                
            },this);
            tree.on('select',function(){
                if(year.isDirty())
                    this.down('button[action=save]').enable();
                
            },this);
        },
        
        getEstructure:function(){
           return this.down('treepanel[action=estructura]').getSelectionModel().getLastSelected().get('id')
        }
 
      
    })



Ext.define('Reporte.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    
    initComponent: function() {
        this.items = [{
                xtype:'container',
                layout:'border',
                items:[{
                        xtype: 'panel',
                        title: 'Área de gráfica',
                        itemId: 'renderPanel',
                        html:"<img width='100%' height='100%' src='"+Raptor.getBundleResource('AtencionOnline/Logica/img/reportes-empresas.jpg')+"'>",
                        layout:'fit',
                        region:'center'
                    },{
                            xtype: 'options',
                            region:'east'
                   }]
        }];
        
        this.callParent();
    }
});