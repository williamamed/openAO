/*
 * 
 *
 * Redefinicion para la aplicacionde estilos en los botones.
 * Bugs detectado en la version 4.2.1
 * Debe annadirse donde se utilize la aplicacion de los estilos a los botones.
 * 
 * @author William Amed Tamayo Guevara
 * @package Portal
 * @subpackage Portal
 * @copyright UCID-ERP Cuba
 * @version 1.0-0
 */


Ext.override(Ext.Button, {
     initComponent: function() {
var me = this;
me.autoEl = {
tag: 'a',
role: 'button',
hidefocus: 'on',
unselectable: 'on'
};
me.addCls('x-unselectable');
me.callParent(arguments);
me.addEvents(
'click',
'toggle',
'mouseover',
'mouseout',
'menushow',
'menuhide',
'menutriggerover',
'menutriggerout',
'textchange',
'iconchange',
'glyphchange'
);
if (me.menu) {
me.split = true;
me.menu = Ext.menu.Manager.get(me.menu);
me.menu.ownerButton = me;
}
if (me.url) {
me.href = me.url;
}
if (me.href && !me.hasOwnProperty('preventDefault')) {
me.preventDefault = false;
}
if (Ext.isString(me.toggleGroup) && me.toggleGroup !== '') {
me.enableToggle = true;
}
if (me.html && !me.text) {
me.text = me.html;
delete me.html;
}
me.glyphCls = me.baseCls + '-glyph';
me.addListener('mouseover',function(btn,e){
	if(!this.disabled){
            var internal = e.within(this.el,  true);
            if(!internal && this.overCls){
                this.el.addCls(this.overCls);
            }
        }
	});
me.addListener('mouseout',function(btn,e){
	if(this.overCls){
            this.el.removeCls(this.overCls);
        }
	});
	
	me.addListener('menushow',function(btn,e){
	if(!this.disabled){
           
            if(this.menuActiveCls){
                this.el.addCls(this.menuActiveCls);
               
            }
        }
	});
	
me.addListener('menuhide',function(btn,e){
	if(this.menuActiveCls){
            this.el.removeCls(this.menuActiveCls);
        }
	});
	
	me.addListener('toggle',function(btn,e){
	if(!this.disabled){
           
            if(this.pressedCls&&e){
                this.el.addCls(this.pressedCls);
                
            }
            if(this.pressedCls&&!e){
                this.el.removeCls(this.pressedCls);
                
            }
        }
	});
		
}  
   	
}


);
