<?php
namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route as Route;
use Raptor\Bundle\Annotations\Inyect as Inyect;
use Raptor\Bundle\Controller\Controller as Controller;
use Raptor\Util\ItemList as ItemList;
/**
 * @Route("/reporte")
 */
class ReportesController extends ReportesController__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * 
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * 
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listEstructureAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:listEstructureAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
    /**
     * @Route("/listbar")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listBarAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:listBarAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
    /**
     * @Route("/listbarcompare")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listBarCompareAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:listBarCompareAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
    /**
     * @Route("/export")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function exportAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus = NULL)
    {
        return self::$__joinPoints['method:exportAction']->__invoke($this, array($request, $response, $route, $syntarsus));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('AtencionOnline\LogicaBundle\Controller\ReportesController',array (
  'method' => 
  array (
    'listEstructureAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
    'listBarAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
    'listBarCompareAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
    'exportAction' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));