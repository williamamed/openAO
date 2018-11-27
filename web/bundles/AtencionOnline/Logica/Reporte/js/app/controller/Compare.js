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


