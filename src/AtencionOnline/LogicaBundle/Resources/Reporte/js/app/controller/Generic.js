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


