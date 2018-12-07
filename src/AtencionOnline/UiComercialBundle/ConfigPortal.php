<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace AtencionOnline\UiComercialBundle;
use Raptor\Bundle\Annotations\Inyect;
/**
 * Description of ConfigPortal
 *
 * @author william.tamayo
 */
class ConfigPortal {
    /**
     * @Inyect("registry")
     * @param \Util\ngPortalBundle\Manager\ngPortalRegistry $registry
     */
    static public function create(\Util\ngPortalBundle\Manager\ngPortalRegistry $registry=NULL) {
        $portal=new \Util\ngPortalBundle\Manager\ngPortal("ao");
        $portal->protect()
                ->addViewPlugin("name", "Bienvenido")
                ->addViewPlugin("icon", "AtencionOnline/UiComercial/identity/title.png")
                ->addViewPlugin("sidebar_iconbase", "AtencionOnline/UiComercial/menu/")
                ->addViewPlugin('header', function($app){
                    return $app->render('@UiComercialBundle/comercial.header.twig');
                })
                ->addViewPlugin('script',function($app){
                    return $app->render('@UiComercialBundle/inicio/script.html.twig');
                })
                ->addViewPlugin('start', function($app) {
                    return $app->render('@UiComercialBundle/inicio/description.html.twig', array(
                                'lastweek' => ''
                    ));
                });
        $registry->set($portal);
    }
}
