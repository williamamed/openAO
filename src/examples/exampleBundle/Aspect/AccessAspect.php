<?php

namespace examples\exampleBundle\Aspect;

use Go\Aop\Aspect;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Around;
use Go\Lang\Annotation\Pointcut;

class AccessAspect implements \Go\Aop\Aspect {

    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public examples\exampleBundle\Controller\DefaultController->indexAction5(*))")
     */
    protected function beforeMethodExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $result = $invocation->proceed();
        
        echo 'Calling Before Interceptor for ';
        return "ksks";
    }

    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public examples\exampleBundle\Controller\DefaultController3->*(*))")
     */
    protected function beforeCreayeExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg = $invocation->getArguments();
       
        foreach ($invocation->getMethod()->getParameters() as $param) {
            // param name
            if($param->getClass() && $param->isDefaultValueAvailable() && $param->getDefaultValue()==NULL){
               
                $arg[$param->getPosition()]=\Raptor\Raptor::getInstance()->getInyector()->getByName($param->getClass()->name);
                $invocation->setArguments($arg);
                
            }
            //echo $param->name,'---',(($param->getClass())?$param->getClass()->name:''),'<br>';
            // param type hint (or null, if not specified).
            

        }
        
        //$arg[3]=  \Raptor\Raptor::getInstance()->getInyector()->get('PHPExcel');
        echo 'Calling Before Interceptor for ', $invocation, "<br>";
        //$invocation->setArguments($arg);
    }

}

?>
