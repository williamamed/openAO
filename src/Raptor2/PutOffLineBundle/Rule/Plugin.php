<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Raptor2\PutOffLineBundle\Rule;
/**
 * Description of AControl
 * @Pattern /raptor/
 * @Priority 9
 * @author Dinobyte SL Group
 */
class Plugin implements \Raptor\Bundle\Route\Rule{
    
     public function call(\Raptor\Raptor $app) {
        $app->setViewPlugin('raptor_tools',$app->render('@PutOffLineBundle/plugin/menu.html.twig'));
        return false;
    }    
}

?>
