<?php
namespace Util\RUXBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
use Raptor\Bundle\Controller\Controller as Controller;
/**
 * @Route("/:system/home")
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
     * @Route("",name="rux_home")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:indexAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('Util\RUXBundle\Controller\DefaultController',array (
  'method' => 
  array (
    'indexAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));