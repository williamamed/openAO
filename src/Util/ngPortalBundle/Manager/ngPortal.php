<?php

namespace Util\ngPortalBundle\Manager;

/**
 * Description of ngPortal
 *
 * @author Amed
 */
class ngPortal {

    /**
     *
     * @var \Raptor\Raptor 
     */
    private $app;
    private $name;
    private $security;

    function __construct($name="ngPortal") {
        $this->app = \Raptor\Raptor::getInstance();
        $this->name = $name;
        $this->security=false;
    }

    /**
     * Inyecta contenido en el punto establecido
     * @param string $hotpot
     * @param string $content
     */
    public function addViewPlugin($hotpot, $content) {

        $route = '/' . $this->name . '/home';
        if ($hotpot == 'start')
            $route = '/' . $this->name . '/home/description';
        $this->app->any($route, array($this, 'addHotPot'))->setParams(array($this->app, 'ngPortal_' . $hotpot, $content));
        return $this;
    }
    
    /**
     * Inyecta contenido en el punto establecido
     * @param string $hotpot
     * @param string $content
     */
    public function addProfileViewPlugin($hotpot, $content) {

        $route = '/' . $this->name . '/home/profile';
        
        $this->app->any($route, array($this, 'addHotPot'))->setParams(array($this->app, 'ngPortal_' . $hotpot, $content));
        return $this;
    }

    /**
     * Protege la ruta pasada por parametro y opcionalmente se puede establecer una ventana de
     * login personalizada
     * @param string $hotpot
     */
    public function protect() {
        $this->security=true;
        $this->app->getRuleContainer()->add('/' . $this->name . '/[\/\w]*', $this->app->getSecurity()->getManager());
        return $this;
    }

    public function addHotPot(\Raptor\Raptor $app, $hotpot, $content) {
        $data = $content;
        if (is_callable($content))
            $data = call_user_func_array($content, array($app));
        $app->setViewPlugin($hotpot, $data);
        return false;
    }

    public function setName($route) {
        $this->name = $route;
        return $this;
    }

    public function getName() {
        return $this->name;
    }
    
    public function hasSecurity(){
        return $this->security;
    }

}
