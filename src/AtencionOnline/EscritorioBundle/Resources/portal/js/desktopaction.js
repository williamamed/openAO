/*
 * Componente portal de aplicaciones
 *
 * Interfaz del portal desktop con ventana por acciones.
 *
 * @author Dionisdel Ponce Santana
 * @package Portal
 * @subpackage Portal
 * @copyright UCID-ERP Cuba
 * @version 1.0-0
 */

var itemsVentanaCrear;
//Begining portal-desktop.js

//Eliminar los estilos y el script del comercial cargado
 removejscssfile("comercial.css", "css");
 removejscssfile("style.css", "css");
 removejscssfile("jqueryArtister.js", "js");
 removejscssfile("script.js", "js");
 
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
                title: src.aWinConfig.text,
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
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true
            });
        }
        win.show();
        //ventanas.register( win );
        idFuncionalidad = src.aWinConfig.id;
        document.getElementById('ifMarco' + src.aWinConfig.id).src = src.aWinConfig.referencia + '?opcion=' + src.aWinConfig.index;
        return win;
    }
});

Ext.define('MyDesktop.BogusMenuModule', {
    extend: 'MyDesktop.BogusModule',
    lista: null,
    init: function() {
        var t = this;
        this.launcher = {
            text: perfilPortal.etiquetas.lbTituloMenu,
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: dameItemsMenu(this, menuTMP)
            }
        };
    }
});

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    requires: [
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule'

//        'MyDesktop.Blockalanche',

    ],
    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();
        
        //wf use only
        this.initNotifications();

        // now ready...
    },
    getNotifications: function() {
        if (this.notifications === null) {
            this.initNotifications();
        }
    },
    initNotifications: function() {
        if (this.notifications === null) {
            this.notifications = Ext.create('WF.WorkflowNotifications');
        }
    },
    getModules: function() {
        return dameMenuModules(menuTMP);
    },
    getDesktopConfig: function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            contextMenuItems: [
                {text: 'Change Settings', handler: me.onSettings, scope: me}
            ]
        });
    },
    // config for the start menu
    getStartConfig: function() {
        var me = this, ret = me.callParent();
        var txtUser = (perfil.alias) ? perfil.alias : perfil.usuario;
        return Ext.apply(ret, {
            title: '<center>' + perfilPortal.etiquetas.lbStartTitle + ' ' + txtUser + '&nbsp; | &nbsp;' + 'Tema: ' + perfil.tema + '</center>',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: tbDesktop
            }
        });
    },
    getTaskbarConfig: function() {
        var ret = this.callParent();

        return Ext.apply(ret, {
            trayItems: [
                {xtype: 'trayclock', flex: 1}
            ]
        });
    },
    onLogout: function() {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },
    onSettings: function() {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

function dameItemsMenu(objDesk, objson) {
    var arrayItems = Array();
    if (objson && objson.length) {
        for (var i = 0; i < objson.length; i++) {
            if (objson[i].menu) {
                arrayItems[i] = {
                    text: objson[i].text,
                    iconCls: 'btn',
                    icon: (objson[i].icono) ? UCID.portal.perfil.dirImg + objson[i].icono + '.png' : '',
                    handler: function() {
                        return false;
                    },
                    menu: {
                        items: dameItemsMenu(objDesk, objson[i].menu)
                    }
                }
            }
            else {
                arrayItems[i] = {
                    text: objson[i].text,
                    iconCls: 'btn',
                    icon: (objson[i].icono) ? UCID.portal.perfil.dirImg + objson[i].icono + '.png' : '',
                    handler: objDesk.createWindow,
                    scope: objDesk,
                    aWinConfig: objson[i],
                    a: 'hola',
                    windowId: objson[i].id
                }
            }
        }
    }
    return arrayItems;
}


function creaMenuModules(aMenu, aPos) {
    var icono = (aMenu.icono) ? UCID.portal.perfil.dirImg + aMenu.icono + '.png' : '';
    //if (icono == '')
     //   icono = '/lib/ExtJS/temas/Base_Imagenes/icons/iconos/plantilla.png';

    var nuevoSistema = "Ext.define('MyDesktop.Subsistema" + aPos + "',{extend: 'MyDesktop.BogusModule',init : function(){this.launcher = {text:'" + aMenu.text + "',icon: '" + icono + "',handler: function() {return false;},menu: {items:dameItemsMenu(this, aMenu.menu) }}}})";
    eval(nuevoSistema);
}

function dameMenuModules(menuTMP) {
    //alert(menuTMP.length);
    var arrayModules = [];
    arrayModules = '[';
    for (var i = 0; i < menuTMP.length; i++) {
        arrayModules += (i + 1 == menuTMP.length) ? 'new MyDesktop.Subsistema' + i + '()]' : 'new MyDesktop.Subsistema' + i + '(),';
        if (menuTMP[i].menu)
            creaMenuModules(menuTMP[i], i);
    }

    return eval(arrayModules);
}

Ext.Ajax.request({
    url: 'cargardesktop',
    method: 'POST',
    callback: function(options, success, response) {
        if (success) {
            menuTMP = Ext.decode(response.responseText);
            document.getElementById('cargandoconfiguracion').style.display = 'none';
            //MyDesktop.initApp();
            Ext.get('present').remove();
            myDesktopApp = new MyDesktop.App();

        } else {
            Ext.Msg.alert('Sorry', response.responseText);
        }
    }
});
