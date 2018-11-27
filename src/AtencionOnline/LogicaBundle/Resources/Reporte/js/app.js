/*
 * Created With Raptor
 * Copyrigth 2013
 */
 
Ext.application({
    name: 'Reporte',

    // automatically create an instance of AM.view.Viewport
    autoCreateViewport: true,
    
    models: ['GenericModel'],    
    stores: ['Generic','Tablas','Pie','EjeX','Estructure','Line','Year','Bar','BarCompare'],
    controllers: ['Generic','Compare']
});
