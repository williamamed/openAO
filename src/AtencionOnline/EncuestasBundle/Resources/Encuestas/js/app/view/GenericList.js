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

