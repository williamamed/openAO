Ext.define('Encuestas.view.GraficoList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.graficolist',
    width:'40%',
    store: 'Pregunta',
    title: "Preguntas",
    collapsible:true,
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
        this.callParent();
    }
});
