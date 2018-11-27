/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'Registro',
    color:'#E33407',
    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['IncidenciaModel','EstructureModel'],    
    stores: ['Incidencia','Estructure','Sexo','Categoria','Ocupacion','NivelEscolar','ViaComunicacion','Tipo','Conforme','Razon'],
    controllers: ['Incidencias']
});




