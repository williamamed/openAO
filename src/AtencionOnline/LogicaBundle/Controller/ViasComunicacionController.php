<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/viascomunicacion")
 */
class ViasComunicacionController extends Controller{
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        return $this->render('@LogicaBundle/viascomunicacion/index.html.twig');
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/list")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listAction($request,$response,$route) {
        return $this->JSON($this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->findAll());
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/insert")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request,$response,$route) {
        $this->hasCsrfProtection();
        $via=$this->collector('LogicaBundle:ViasComunicacion');
        if($request->post('anonimo')=='on')
            $via->setAnonimo(true);
        else
            $via->setAnonimo(false);
        $this->getStoreManager()->persist($via);
        $this->getStoreManager()->flush();
        return $this->show('El elemento fue insertado satisfactoriamente');
    }
    
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/edit")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        $this->hasCsrfProtection();
        $via=  $this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('id'));
        $via=$this->collector($via);
        if($request->post('anonimo')=='on')
            $via->setAnonimo(true);
        else
            $via->setAnonimo(false);
        $this->getStoreManager()->persist($via);
        $this->getStoreManager()->flush();
        return $this->show('El elemento fue editado satisfactoriamente');
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/delete")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
        $this->hasCsrfProtection();
        $tipo=  $this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('id'));
        
        try {
            $this->getStoreManager()->remove($tipo);
        $this->getStoreManager()->flush();
        } catch (\Exception $exc) {
            return $this->show("El elemento no pudo ser eliminado, existen incidencias que actualmente están clasificadas con esta vía de comunicación.", true,  Controller::ERROR);
        }
        return $this->show('El elemento fue eliminado satisfactoriamente');
    }
    
    
}

?>
