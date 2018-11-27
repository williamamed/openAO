/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'ViasComunicacion',

    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['ViaModel','GraficaModel'],    
    stores: ['Via','Grafica'],
    controllers: ['Vias']
});




