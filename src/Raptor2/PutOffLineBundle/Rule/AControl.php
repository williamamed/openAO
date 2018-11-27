<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Raptor2\PutOffLineBundle\Rule;
/**
 * Description of AControl
 * @Pattern [\/\w]*
 * @Priority 10
 * @author Dinobyte SL Group
 */
class AControl implements \Raptor\Bundle\Route\Rule{
    
    public function call(\Raptor\Raptor $app) {
        if(preg_match("#^/raptor[\/\w]*$#", $app->request()->getPathInfo())){
            return false;
        }
        if(!file_exists(__DIR__.'/../Data/active'))
                return false;
        $conf=json_decode(file_get_contents(__DIR__.'/../Data/conf.json'),true);
        $excluded_raw=$conf['exclude'];
        $excluded=  explode(';',$excluded_raw);
        unset($excluded[count($excluded)-1]);
        foreach ($excluded as $value) {
            if($value==$app->request()->getIp())
                return false;
        }
        
        if(!file_exists(\Raptor\Core\Location::get(\Raptor\Core\Location::WEBBUNDLES).'/Raptor2/PutOffLine'))
            \Raptor\Bundle\Publisher\Publisher::run ('\Raptor2\PutOffLineBundle\PutOffLineBundle');
        
        $app->response()->write($app->render('@PutOffLineBundle/index.html.twig', $conf ));
        return true;
    }    
}

?>
