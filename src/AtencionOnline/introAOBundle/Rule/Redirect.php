<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace AtencionOnline\introAOBundle\Rule;

/**
 * Description of Redirect
 *
 * @author william.tamayo
 */
class Redirect implements \Raptor\Bundle\Route\Rule{
    
    public function call(\Raptor\Raptor $app) {
        $app->redirect($app->request()->getScriptName().'/intro');
        return true;
    }

}
