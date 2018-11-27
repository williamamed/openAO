<?php
namespace Raptor3\DocVersion3Bundle\Tutorials;

use Raptor\Bundle\Annotations\Inyect as Inyect;
/**
 * Description of Guia
 *
 * 
 */
class Guia extends Guia__AopProxied implements \Go\Aop\Proxy
{

    /**
     * Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    /**
     * @Inyect("interactive")
     */
    public function call(\Raptor\Raptor $app, \Raptor2\InteractiveBundle\Manager\InteractiveManager $interactive = NULL)
    {
        return self::$__joinPoints['method:call']->__invoke($this, array($app, $interactive));
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('Raptor3\DocVersion3Bundle\Tutorials\Guia',array (
  'method' => 
  array (
    'call' => 
    array (
      0 => 'advisor.Raptor\\Component\\systemBundle\\Aspect\\InyectAspect->aroundCacheable',
    ),
  ),
));