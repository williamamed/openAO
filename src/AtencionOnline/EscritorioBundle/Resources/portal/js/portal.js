/*
 * Componente portal de aplicaciones
 *
 * Interfaz del portal desktop con ventana por acciones.
 *
 * @author William AMed
 * @package Portal
 * @subpackage Portal

 */


function dameItemsMenu(objDesk, objson) {
    var arrayItems = Array();
    if (objson && objson.length) {
        for (var i = 0; i < objson.length; i++) {
            if (objson[i].children) {
                arrayItems[i] = {
                    text: objson[i].name,
                    //iconCls: 'btn',
                    iconCls: (objson[i].className) ,
                    handler: function() {
                        return false;
                    },
                    menu: {
                        items: dameItemsMenu(objDesk, objson[i].children)
                    }
                }
            }
            else {
                arrayItems[i] = {
                    text: objson[i].name,
                    //iconCls: 'btn',
                    iconCls: (objson[i].className),
                    handler: objDesk.createWindow,
                    scope: objDesk,
                    aWinConfig: objson[i],
                   
                    windowId: objson[i].id
                }
            }
            
            AtencionOnline.addShortcut(objson[i].className,objson[i])
        }
    }
    return arrayItems;
}


function creaMenuModules(aMenu, aPos) {
   var icono =aMenu.className;
    //if (icono == '')
     //   icono = '/lib/ExtJS/temas/Base_Imagenes/icons/iconos/plantilla.png';
    
    var nuevoSistema = "Ext.define('MyDesktop.Subsistema" + aPos + "',{extend: 'MyDesktop.BogusModule',init : function(){this.launcher = {text:'" + aMenu.name + "',iconCls: '" + icono + "',handler: function() {return false;},menu: {items:dameItemsMenu(this, aMenu.children) }}}})";
    eval(nuevoSistema);
}

function creaMenuModule(aMenu, aPos) {
    var icono =aMenu.className;
    //if (icono == '')
     //   icono = '/lib/ExtJS/temas/Base_Imagenes/icons/iconos/plantilla.png';
   
    var nuevoSistema = "Ext.define('MyDesktop.Subsistema" + aPos + "',{extend: 'MyDesktop.BogusModule',init : function(){this.launcher = {text:'" + aMenu.name + "',iconCls: '" + icono + "', handler: this.createWindow,scope:this,aWinConfig: aMenu}}})";
    eval(nuevoSistema);
}

function dameMenuModules(menuTMP) {
    //alert(menuTMP.length);
    var arrayModules = [];
    arrayModules = '[';
    var flag=false;
    for (var i = 0; i < menuTMP.length; i++) {
        if (menuTMP[i].name != "Portal") {
            arrayModules += (i + 1 == menuTMP.length) ? 'new MyDesktop.Subsistema' + i + '()]' : 'new MyDesktop.Subsistema' + i + '(),';
            if (menuTMP[i].children)
                creaMenuModules(menuTMP[i], i);
            else
                creaMenuModule(menuTMP[i], i);
            flag = true;
        }else
            arrayModules += (i + 1 == menuTMP.length) ? ']':'';
    }
    
        if(flag==false)
            arrayModules = '[]';
    
    return eval(arrayModules);
}


Ext.onReady(function(){
   Ext.Ajax.request({
    url: 'portal/cargarperfil',
    method: 'POST',
    params:{id:0},
    callback: function(options, success, response) {
       if (success) {
           
           perfil=Ext.decode(response.responseText);
           
           
            Ext.Ajax.request({
            url: 'portal/listfunctions',
                    method: 'POST',
                    params:{id:0},
                    callback: function(options, success, response) {
                if (success) {
                    menuTMP = Ext.decode(response.responseText);



                    myDesktopApp = new MyDesktop.App();
                            setTimeout(function (){
                                Ext.get('loading').remove();
                                Interactive.show('desktop.welcome');
                                if(perfil.portalmsg)
                                    Interactive.staticShow(perfil.portalmsg);
                            },3000);
                } else {
                    Ext.Msg.alert('Sorry', response.responseText);
                }
            }
            });

        } else {
            Ext.Msg.alert('Sorry', response.responseText);
        }
    }
});

AtencionOnline={
    shortcut:new Array(),
    words:{},
    addShortcut:function(className,data){
        
        var exp=/^([\w\-]*\ )*shortcut(\ [\w\-]*)*$/;
        if(exp.test(className)){
            var name=data.name.replace(/\s/g, "") 
            if(this.words[name]){
                    for (var i=0;i<200;i++){
                        if(!this.words[name+i]){
                            name=name+i;
                            this.words[name+i]=data;
                            break;
                        }
                    }
            }else{
                this.words[name]=data;
            }
                
            
            Ext.define('MyDesktop.'+name,{
                    extend: 'MyDesktop.ShortcutModule',
                    id:name,
                    src:{
                        aWinConfig:data
                    }
            });
        }
            
    },
    getShortcuts:function(){
         var me=this;
         Ext.Object.each(me.words, function(key, value, myself) {
            me.shortcut.push({ name: value.name, iconCls: value.className, module: key })
         });     
                  
        return me.shortcut;
    },
    getShortcutsModules:function(){
        var me=this;
        var instances=new Array();
         Ext.Object.each(me.words, function(key, value, myself) {
            eval('instances.push(new MyDesktop.'+key+'());');
         });     
                  
        return instances;
    }
    
}


    
})