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


