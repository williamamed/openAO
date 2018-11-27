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

