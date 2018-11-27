/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'Encuestas',

    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['GenericModel','CamposModel','PreguntaModel','PieModel','TextosModel'],    
    stores: ['Generic','Campos','Pregunta','Tipo','Estado','TipoEncuesta','Pie','Textos'],
    controllers: ['Generic','Pregunta','Campos','Grafico']
});
