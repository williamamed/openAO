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


