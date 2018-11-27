<?php

namespace AtencionOnline\EscritorioBundle\Aspect;
use Go\Aop\Aspect;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Pointcut;

class LogAspect implements \Go\Aop\Aspect {

    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\EscritorioBundle\Controller\DefaultController->*(*))")
     */
    protected function beforeMethodRegistroExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
        
    }
    
    
}

?>
