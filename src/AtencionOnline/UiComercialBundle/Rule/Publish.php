<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
namespace AtencionOnline\UiComercialBundle\Rule;
/**
 * Description of Publish
 *
 * @author Amed
 */
class Publish implements \Raptor\Bundle\Route\Rule{
    
    public function call(\Raptor\Raptor $app) {
        \Raptor\Bundle\Publisher\Publisher::run('\AtencionOnline\UiComercialBundle\UiComercialBundle');
        return false;
    }   
}

?>
