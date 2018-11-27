<?php
namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
use Raptor\Bundle\Controller\Controller as Controller;
/**
 * @Route("/registro")
 */
class RegistroController extends RegistroController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * 
     *
     * @Route("/insert",description="Adiciona incidencias a la estructura")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request, $response, $route)
    {
        return self::$__joinPoints['method:insertAction']->__invoke($this, array($request, $response, $route));
    }
    
    /**
     * 
     *
     * @Route("/trasladar")
     * @Description Traslada una incidencia de una estructura hacia otra
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function trasladarAction($request, $response, $route)
    {
        return self::$__joinPoints['method:trasladarAction']->__invoke($this, array($request, $response, $route));
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listEstructureAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:listEstructureAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('AtencionOnline\LogicaBundle\Controller\RegistroController',array (
  'method' => 
  array (
    'insertAction' => 
    array (
      0 => 'advisor.AtencionOnline\\NotificacionBundle\\Aspect\\CorreoAspect->aroundRegisterIncidenciaExecution',
    ),
    'trasladarAction' => 
    array (
      0 => 'advisor.AtencionOnline\\NotificacionBundle\\Aspect\\CorreoAspect->aroundTransladoIncidenciaExecution',
    ),
    'listEstructureAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));