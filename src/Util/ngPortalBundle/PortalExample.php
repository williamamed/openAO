<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Util\ngPortalBundle;
use Raptor\Bundle\Annotations\Inyect;
/**
 * Description of PortalExample
 *
 * @author william.tamayo
 */
class PortalExample {
    /**
     * @Inyect("registry")
     * @param \Util\ngPortalBundle\Manager\ngPortalRegistry $registry
     */
    static public function create(Manager\ngPortalRegistry $registry=NULL) {
        $portal=new Manager\ngPortal();
        $registry->set($portal);
    }
}
