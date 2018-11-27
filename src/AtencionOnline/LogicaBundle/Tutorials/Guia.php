<?php

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
namespace AtencionOnline\LogicaBundle\Tutorials;
/**
 * Description of Guia
 *
 * 
 */
class Guia implements \Raptor\Bundle\Route\Rule{
    /**
     *
     * @var \Raptor2\InteractiveBundle\Manager\InteractiveManager 
     */
    private $interactive;


    public function call(\Raptor\Raptor $app) {
        $this->interactive=$app->getInyector()->get('InteractiveManager');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto1',
            'seconds'=>35,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'next'=>'registro.tuto2',
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto2',
            'seconds'=>20,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            
            'pointer'=>'arrow:up .x-tree-panel .x-panel-header',
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto3',
            'seconds'=>20,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-add)',
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto4',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto5',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'next'=>'registro.tuto6',
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-tramite)',
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto6',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'waitSeconds'=>6,
            'next'=>'registro.tuto7',
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-trasladar)',
            'author'=>'amed',
            'position'=>'left top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'registro.tuto7',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'waitSeconds'=>6,
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-search)',
            'author'=>'amed',
            'position'=>'left top'
        ),'LogicaBundle');
        
        
        /**
         * Tramite
         */
        $this->interactive->add(array(
            'name'=>'tramite.tuto2',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-tramite)',
            'author'=>'amed',
            'next'=>'tramite.tuto1',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'tramite.tuto1',
            'seconds'=>30,
            'waitSeconds'=>9,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-archivos)',
            'author'=>'amed',
            'next'=>'tramite.tuto3',
            'position'=>'right top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'tramite.tuto3',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up .x-toolbar span:has(span.icon-detalles )',
            'author'=>'amed',
            'position'=>'right top'
        ),'LogicaBundle');
        
        /**
         * Reportes
         */
        $this->interactive->add(array(
            'name'=>'reporte.tuto1',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up fieldset:first .x-form-trigger-wrap',
            'next'=>'reporte.tuto3',
            'author'=>'yanet',
            'position'=>'left top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'reporte.tuto2',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'next'=>'reporte.tuto3',
            'author'=>'yanet',
            'position'=>'left top'
        ),'LogicaBundle');
        
        $this->interactive->add(array(
            'name'=>'reporte.tuto3',
            'seconds'=>40,
            'style'=>array(
                'background'=>'#0661B8'
            ),
            'pointer'=>'arrow:up fieldset:eq(1) .x-form-trigger-wrap',
            'author'=>'yanet',
            'position'=>'left top'
        ),'LogicaBundle');
        return false;
    }    
}

?>
