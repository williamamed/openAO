 Ext.define('Registro.view.DetallesWindow',{
        extend:'Ext.Window',
        width:800,
        height:500,
        //autoHeight:true,
        
        bodyStyle:'overflow:scroll',
        docTpl: [
        '<tpl for=".">',
            '<div  style="background:white;padding:25px;margin:5px;border: 1px;border: 1px outset black;width:95%;">',
                '<table align="center" class="table-modelo">',
                '<tr><td style="text-align:center"><h3>Modelo de recepción de la Incidencia<br>Dirección de atención a la población</h3></td></tr>',
                '<tr><tr><td><b>No. Consecutivo:</b> {noConsecutivo}</td></tr></tr>',
                '<tr><td><b>Exp. organismo Central:</b> {expOc}</td></tr>',
                '<tr><td><b>Fecha:</b> {fecha}</td></tr>',
                '<tr><td><b>Nombre y Apellidos: </b>{nombreApellidos}</td></tr>',
                '<tr><td><b>Sexo:</b> {sexo}</td></tr>',
                '<tr><td><b>Edad:</b> {edad}</td></tr>',
                '<tr><td><b>Nivel Escolar:</b> {nivelEscolar}</td></tr>',
                '<tr><td><b>Ocupación:</b> {ocupacion}</td></tr>',
                '<tr><td><b>Dirección Particular:</b> {direccion}</td></tr>',
                '<tr><td><b>Teléfono donde se puede localizar:</b> {telefono}</td></tr>',
                '<tr><td><b>Organismo o persona contra quien va drigida la incidencia:</b> {dirigido}</td></tr>',
                '<tr><td><b>Entidad superior y Organismo a la pertenece:</b> {entidadPertenece}</td></tr>',
                '<tr><td><b>Síntesis del planteamiento formulado: </b><br>{planteamiento}</td></tr>',
                '<tr><td><b>Vía o medio de comunicacion:</b> {idViasComunicacion}</td></tr>',
                '<tr><td><b>Tipo de incidencia:</b> {idTipo}</td></tr>',
                '<tr><td><b>Recibe:</b> {recibe}</td></tr>',
                '<tr><td><b>Se traslada a:</b> {traslada}</td></tr>',
                '<tr><td><b>Con término: </b>{termino}</td></tr>',
                '<tr><td><b>Síntesis de la respuesta ofrecida o de la decision adoptada:</b><br> {respuesta}</td></tr>',
                '<tr><td><b>Razón del cliente:</b> {razon}</td></tr>',
                '<tr><td><b>Conforme:</b> {conforme}</td></tr>',
                '</table>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
        ],
        
        
        modal:true,
        alias: 'widget.detalleswindow',
        autoShow: true,
        closeAction:'destroy',
        title:'Datos de la incidencia',
        layout:'fit',
        initComponent:function(){
            var me=this;
            this.items = [{
                xtype: 'dataview',
                //overItemCls: 'x-view-over',
                //trackOver: true,
                
                store: me.docStore,
                style: {
                    
                    
                },
                
                tpl: new Ext.XTemplate(me.docTpl)
            }];
        
            
        this.buttons = [{   iconCls: 'icon-print',
                            text: 'Imprimir',
                            action: 'print'
                           
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


