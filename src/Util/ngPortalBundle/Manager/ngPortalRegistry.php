<?php

namespace Util\ngPortalBundle\Manager;

/**
 * Description of ngPortal
 *
 * @author Amed
 */
class ngPortalRegistry extends \Raptor\Util\ItemList
{
    /**
     * Devuelve el Portal registrado con este nombre
     * 
     * @param string $name
     * @return ngPortal
     */
    public function get($name,$default = NULL) {
        return parent::get($name,$default);
    }
    
    /**
     * 
     * @param ngPortal $portal
     */
    public function set($portal,$value=NULL) {
        parent::set($portal->getName(),$portal);
    }
}