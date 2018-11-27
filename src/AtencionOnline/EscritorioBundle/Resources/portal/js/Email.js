/**
 * Raptor - Integration PHP 5 framework
 *
 * @author      William Amed <watamayo90@gmail.com>, Otto Haus <ottohaus@gmail.com>
 * @copyright   2014 
 * @link        http://dinobyte.net
 * @version     2.0.1
 * @package     Raptor
 *
 * MIT LICENSE
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

Email={
    render:function(){
        var f = Ext.DomHelper.append(Ext.getBody(), {
                tag: 'div'
            }, true);
        var ancho = Ext.getBody();
        Ext.DomHelper.applyStyles(f, {
                'width': '42px', height: '42px', 'z-index': '1000000','border-radius':'20px',
                'background':'gray','text-align':'center','padding':'5'
            });
        var im = Ext.DomHelper.append(f, {
                            tag: 'img',
                            src: Raptor.getBundleResource('AtencionOnline/Escritorio/portal/images/mail/mail.png'),
                            'width': '40', height: '40'
            }, true);
        var te= Ext.DomHelper.append(f, {
                            tag: 'span',
                            html:'5'
                            
            }, true);
         Ext.DomHelper.applyStyles(te, {
                position:'absolute','background':'red','text-align':'center','padding':'2px','color':'white','border-radius':'5px',
            });
         f.position('absolute', 1000000, ancho.getWidth(true)/2,3);
    }
}