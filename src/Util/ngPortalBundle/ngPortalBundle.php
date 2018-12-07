<?php
/**
 * Generado por RAPTOR PHP 3
 * Puedes adicionar un prefijo de ruta para este componente
 * estableciendo la anotacion \@Route en la clase.
 * En esta clase necesitas registrar todos los Aspectos y Reglas para las ejecuciones de rutas
 */
namespace Util\ngPortalBundle;
use Raptor\Bundle\Bundle;
use Go\Core\AspectContainer;
use Raptor\Raptor;
use Raptor\Bundle\Route\RuleContainer;
use Raptor\Bundle\Annotations\Route;

/**
 * @Route("")
 */
class ngPortalBundle extends Bundle{

            
    public function registerBundleAspect(AspectContainer $appAspectContainer) {
        
    }

    public function entrance(Raptor $app) {
        $portales=$this->app->getInyector()->getByName('Util\ngPortalBundle\Manager\ngPortalRegistry');
        $flag=FALSE;
        foreach ($portales as $portal) {
            if($this->app->router()->getCurrentRoute()->getParam('system')==$portal->getName()){
                $flag=true;
                break;
            }
        }
        if(!$flag)
            $this->app->notFound ();
        
        if (!$app->getSecurity()->isAuthenticated()) {
            if ($this->app->getSecurity()->getManager()) {
                $refl = new \ReflectionClass($this->app->getSecurity()->getManager());
                if ($refl->getName() == 'Raptor2\SyntarsusBundle\Manager\SecurityManager')
                    $app->halt(401, 'Acceso no autorizado, esta funcionalidad debe utilizarse esclusivamente con el modulo de seguridad Syntarsus que aparentemente no se encuentra instalado');
            }
        }
    }

    public function registerRouteRule(RuleContainer $ruleContainer) {
        
        
        if ($this->app->getSecurity()->getManager()) {
            $refl = new \ReflectionClass($this->app->getSecurity()->getManager());
            if ($refl->getName() == 'Raptor2\SyntarsusBundle\Manager\SecurityManager')
                $ruleContainer->add ('/ngPortal[\/\w]*', $this->app->getSecurity()->getManager());
        }
    }
    
    public function configure() {
        $this->app->getInyector()->add(new Manager\ngPortalRegistry());
        PortalExample::create();
    }


}

?>