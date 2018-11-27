<?php

/**
 * Raptor - Full Stack Framework
 *
 * @authors     William Amed <watamayo90@gmail.com>, 
 *              Jorge Miralles <jemiralles@nauta.cu>,
 *              Jorge Carmenate <jorge.carmenate@ltu.jovenclub.cu>,
 *              Pedro Abreu <pedro.abreu@ltu.jovenclub.cu>
 * @copyright   2017 
 * @link        http://raptorweb.cubava.cu
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
namespace Util\RUXBundle\Rule;
/**
 * Description of PluginCustomLogin
 *
 * 
 */
class PluginCustomLogin implements \Raptor\Bundle\Route\Rule{
    private $template;
    
    function __construct($template='') {
        $this->template = $template;
    }

    
    public function call(\Raptor\Raptor $app) {
        
        $opt = $app->getConfigurationLoader()->getOptions();
        if (isset($opt['options']['syntarsus']) and isset($opt['options']['syntarsus']['auth']) and $opt['options']['syntarsus']['auth'] === 'saml')
            return false;

        if (!$app->getSecurity()->isAuthenticated()) {
            $app->getSecurity()->getManager()->setRedirect(true);
            $app->getLanguage()->setCurrentBundle('\Raptor2\SyntarsusBundle\SyntarsusBundle');
            $app->getSecurity()->getManager()->handleAuthenticationRequest();
            
            $refl=new \ReflectionClass($app->getSecurity()->getManager());
            $props=$refl->getProperties(\ReflectionProperty::IS_PUBLIC | \ReflectionProperty::IS_PROTECTED | \ReflectionProperty::IS_PRIVATE);
            $prop=null;
            foreach ($props as $value) {
                if($value->getName()=='errorMessage')
                    $prop=$value;
            }
            $prop->setAccessible(true);
            $refl->getProperty('errorMessage')->setAccessible(true);
            $app->response()->write($app->render(($this->template)?$this->template:'@SyntarsusBundle/Login/index.html.twig', array(
                        'error' => $prop->getValue($app->getSecurity()->getManager()),
                        'username' => $app->request()->post('username')
            )));
            $app->contentType('text/html; charset=UTF-8');
            $app->response()->setStatus(401);
            return true;
        }
        return false;
    }    
}

?>
