<?php

namespace examples\exampleBundle\Controller;
use Raptor\Bundle\Annotations\Inyect;

class Sample extends \Raptor\Bundle\Controller\Controller{
   
    /**
     * @Inyect("interact")
     */
    public function hola(\Raptor2\InteractiveBundle\Manager\InteractiveManager $interact=NULL) {
        if($interact)
            echo "interactive Inyectado<br>";
        
    }
}
