/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    requires: [
       
        'MyDesktop.BogusModule'
        
//        'MyDesktop.Blockalanche',

    ],
    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();
        
      
    },
    getNotifications: function() {
//        if (this.notifications === null) {
//            this.initNotifications();
//        }
    },
    initNotifications: function() {
//        if (this.notifications === null) {
//            this.notifications = Ext.create('WF.WorkflowNotifications');
//        }
    },
    getModules: function() {
        var t=dameMenuModules(menuTMP);
        var sh=AtencionOnline.getShortcutsModules();
        for (var i=0;i<sh.length;i++){
            t.push(sh[i]);
        }
        return t;
    },
    getDesktopConfig: function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: AtencionOnline.getShortcuts()
            }),
            
            widget: Ext.create('Ext.data.Store', {
                fields: [
                            { name: 'text' },
                            { name: 'iconCls' }
                           
                         ],
                data: [
                    { text: Raptor.getTag('mensaje')+"Hoal", iconCls: 'grid-shortcut' },
                    
                    
                ]
            }),
            
            
        });
    },
    // config for the start menu
    getStartConfig: function() {
        var me = this, ret = me.callParent();
        //var txtUser = (perfil.alias) ? perfil.alias : perfil.usuario;
        return Ext.apply(ret, {
            title: '<center>' + "" + ' ' + perfil.name+ '&nbsp; </center>',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                        xtype:'container',
                        style:'text-align:center',
                        html:'<img src="'+Raptor.getBundleResource('security_photos/'+perfil.nick)+'" width="70" height="70">'
                },
                    {
                        text:'Contraseña',
                        iconCls:'icon-update',
                        handler: me.onPasswordChange,
                        scope: me
                    },
                    '-',
                    {
                        text:'Salir',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
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
        Ext.Msg.confirm('Salir', 'Está seguro que desea salir del sistema?',function(n){
            if(n==='yes')
               window.location="portal/cerrar"; 
            
        });
    },
    onSettings: function() {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },
    onPasswordChange: function() {
        var dlg = new MyDesktop.Password();
        dlg.show();
    }
});
