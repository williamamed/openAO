<?php
namespace AtencionOnline\PublicoBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Controller\Controller as Controller;
/**
 * @Route("")
 */
class DefaultController extends DefaultController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/formulario/registro")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function sendAction($request, $response, $route)
    {
        return self::$__joinPoints['method:sendAction']->__invoke($this, array($request, $response, $route));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('AtencionOnline\PublicoBundle\Controller\DefaultController',array (
  'method' => 
  array (
    'sendAction' => 
    array (
      0 => 'advisor.AtencionOnline\\NotificacionBundle\\Aspect\\CorreoAspect->aroundFromPublicIncidenciaExecution',
    ),
  ),
));