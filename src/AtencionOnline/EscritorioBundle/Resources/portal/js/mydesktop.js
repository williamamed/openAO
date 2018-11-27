/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var itemsVentanaCrear;

 
var menuTMP = {};

//Funciones
var windowIndex = 0;



Ext.define('MyDesktop.BogusModule', {
    extend: 'Ext.ux.desktop.Module',
    init: function() {
        this.launcher = {
            text: 'Window ' + (++windowIndex),
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this,
            windowId: windowIndex
        };
    },
    createWindow: function(src) {
        var desktop = this.app.getDesktop();
        
        var win = desktop.getWindow('win' + src.aWinConfig.id);
        if (!win) {
            win = desktop.createWindow({
                id: 'win' + src.aWinConfig.id,
                title: src.aWinConfig.name,
                layout: 'fit',
                funt: src.aWinConfig.id,
                items: new Ext.Panel({
                    id: 'iframe' + src.aWinConfig.id,
                    border: false,
                    html: '<iframe id="ifMarco' + src.aWinConfig.id + '" style="width:100%; height: 100%; border:none;"></iframe>',
                    layout: 'fit'
                }),
                width: 800,
                maximized: true,
                height: 490,
                minWidth: 800,
                minHeight: 480,
                iconCls: src.aWinConfig.className,
                animCollapse: false,
                constrainHeader: true
            });
        }
        win.show();
        //ventanas.register( win );
        win.setLoading("Cargando la funcionalidad");
        idFuncionalidad = src.aWinConfig.id;
        var route=src.aWinConfig.route;
        if(route[0]=='/')
           route= route.substr(1);
       route=""+route;
      
       var domEl=document.getElementById('ifMarco' + src.aWinConfig.id);
        domEl.src = route;
        var el = Ext.get(domEl);
        el.on('load',function(){
            win.setLoading(false);
        });
        return win;
    }
});


Ext.define('MyDesktop.ShortcutModule', {
    extend: 'Ext.ux.desktop.Module',
    
    createWindow: function() {
        var desktop = this.app.getDesktop();
        
        var win = desktop.getWindow('win' + this.src.aWinConfig.id);
        if (!win) {
            win = desktop.createWindow({
                id: 'win' + this.src.aWinConfig.id,
                title: this.src.aWinConfig.name,
                layout: 'fit',
                funt: this.src.aWinConfig.id,
                items: new Ext.Panel({
                    id: 'iframe' + this.src.aWinConfig.id,
                    border: false,
                    html: '<iframe id="ifMarco' + this.src.aWinConfig.id + '" style="width:100%; height: 100%; border:none;"></iframe>',
                    layout: 'fit'
                }),
                width: 800,
                maximized: true,
                height: 490,
                minWidth: 800,
                minHeight: 480,
                iconCls: this.src.aWinConfig.className,
                animCollapse: false,
                constrainHeader: true
            });
        }
        win.show();
        //ventanas.register( win );
        win.setLoading("Cargando la funcionalidad");
        idFuncionalidad = this.src.aWinConfig.id;
        var route=this.src.aWinConfig.route;
        if(route[0]=='/')
           route= route.substr(1);
       route=""+route;
      
       var domEl=document.getElementById('ifMarco' + this.src.aWinConfig.id);
        domEl.src = route;
        var el = Ext.get(domEl);
        el.on('load',function(){
            win.setLoading(false);
        });
        return win;
    }
});
