<?php
/**
 * Generado por RAPTOR PHP 3
 * Puedes adicionar un prefijo de ruta para este componente
 * estableciendo la anotacion \@Route en la clase.
 * En esta clase necesitas registrar todos los Aspectos y Reglas para las ejecuciones de rutas
 */
namespace AtencionOnline\introAOBundle;
use Raptor\Bundle\Bundle;
use Go\Core\AspectContainer;
use Raptor\Raptor;
use Raptor\Bundle\Route\RuleContainer;
use Raptor\Bundle\Annotations\Route;

/**
 * @Route("")
 */
class introAOBundle extends Bundle{

    public function registerBundleAspect(AspectContainer $appAspectContainer) {

    }

    public function entrance(Raptor $app) {

    }

    public function registerRouteRule(RuleContainer $ruleContainer) {
        $ruleContainer->add("/",new Rule\Redirect(),9);
    }

}

?>