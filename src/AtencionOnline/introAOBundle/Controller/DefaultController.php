<?php
/**
 * Generado por RAPTOR PHP 3
 * Puedes adicionar un prefijo de ruta
 * estableciendo la anotacion \@Route en la clase.
 */

namespace AtencionOnline\introAOBundle\Controller;

use Raptor\Bundle\Controller\Controller;
use Raptor\Bundle\Annotations\Route;

/**
 * @Route("")
 */
class DefaultController extends Controller{
    
    /**
     * Adiciona tu definicion de ruta, opcionalmente puedes establecer
     * el metodo de conexion, nombre de ruta 
     * y el control CSRF, ejemplo: \@Route("/miruta",name="nombre_ruta",method="POST",csrf=true)
     * 
     * @Route("/intro")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        return $this->render("@introAOBundle/intro.html.twig");
    }
    
    
}

?>
