<?php
namespace examples\exampleBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
use Raptor\Bundle\Annotations\Api as Api;
use Raptor2\SyntarsusBundle\Manager\SecurityManager as SecurityManager;
/**
 * Description of DefaultController
 * 
 * 
 * @author Proyecto Raptor
 */
class DefaultController extends DefaultController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * Api annotation
     * 
     * if you set the \@api annotation this text will be proccess like
     * api description that can be access with app->getApi(), you must set the version
     * of the api description.
     * 
     * if you set the \@Route("annotation") the path will be proccesed like a path
     * definition for this controller and configured in the routing rutine. The 
     * \@RouteName annotation is optional and can be omited, if is omited the route
     * name will be configured in base of the route path.
     * 
     * 
     * @Api(name="Hola mundo",category="Examples",version="1.0.1")
     * 
     * @Route("/new/example",name="_new_example")
     * 
     * @Inyect("security")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request, $response, $route, \Raptor2\SyntarsusBundle\Manager\SecurityManager $security = NULL)
    {
        return self::$__joinPoints['method:indexAction']->__invoke($this, array($request, $response, $route, $security));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('examples\exampleBundle\Controller\DefaultController',array (
  'method' => 
  array (
    'indexAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));