<?php
namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
use Raptor\Bundle\Controller\Controller as Controller;
/**
 * @Route("/tramite")
 */
class TramiteController extends TramiteController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * 
     *
     * @Route("/procesar")
     * @Description Permite establecer los datos de la incidencia en estado de tramite
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request, $response, $route)
    {
        return self::$__joinPoints['method:editAction']->__invoke($this, array($request, $response, $route));
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * @Inyect("syntarsus")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listEstructureAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:listEstructureAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('AtencionOnline\LogicaBundle\Controller\TramiteController',array (
  'method' => 
  array (
    'editAction' => 
    array (
      0 => 'advisor.AtencionOnline\\NotificacionBundle\\Aspect\\CorreoAspect->aroundTramitarIncidenciaExecution',
    ),
    'listEstructureAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));