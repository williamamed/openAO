/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'Registro',

    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['IncidenciaModel','EstructureModel','PeriodoModel'],    
    stores: ['Incidencia','Estructure','Sexo','Ocupacion','NivelEscolar','ViaComunicacion','Tipo','Conforme','Razon','Periodo'],
    controllers: ['Incidencias']
});




