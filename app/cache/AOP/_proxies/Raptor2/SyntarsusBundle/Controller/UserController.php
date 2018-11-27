<?php
namespace Raptor2\SyntarsusBundle\Controller;

use Raptor\Bundle\Controller\Controller as Controller;
use Raptor\Util\ItemList as ItemList;
use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
/**
 * @Route("/syntarsus")
 */
class UserController extends UserController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * @Route("/user/insert")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request)
    {
        return self::$__joinPoints['method:insertAction']->__invoke($this, array($request));
    }
    
    /**
     * @Route("/user/listestructure")
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
\Go\Proxy\ClassProxy::injectJoinPoints('Raptor2\SyntarsusBundle\Controller\UserController',array (
  'method' => 
  array (
    'insertAction' => 
    array (
      0 => 'advisor.AtencionOnline\\NotificacionBundle\\Aspect\\CorreoAspect->aroundRegisterUserExecution',
    ),
    'listEstructureAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));