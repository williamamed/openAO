/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'GestEstructure',

    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['EstructureModel'],    
    stores: ['Estructure','Categoria'],
    controllers: ['Estructures']
});

