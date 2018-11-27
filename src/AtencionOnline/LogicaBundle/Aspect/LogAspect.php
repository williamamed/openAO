<?php

namespace AtencionOnline\LogicaBundle\Aspect;
use Go\Aop\Aspect;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Pointcut;

class LogAspect implements \Go\Aop\Aspect {

    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\RegistroController->*(*))")
     */
    protected function beforeMethodRegistroExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\ArchivoController->*(*))")
     */
    protected function beforeMethodArchivoExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\ClasificadorController->*(*))")
     */
    protected function beforeMethodClasificadorExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\ReportesController->*(*))")
     */
    protected function beforeMethodReportesExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\TipoController->*(*))")
     */
    protected function beforeMethodTipoExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\TramiteController->*(*))")
     */
    protected function beforeMethodTramiteExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Before("execution(public AtencionOnline\LogicaBundle\Controller\ViasComunicacionController->*(*))")
     */
    protected function beforeMethodViasComunicacionExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        $arg=$invocation->getArguments();
        $route=$arg[2]->getPattern();
        \Raptor\Raptor::getInstance()->getLog()->info("Accediendo a la ruta $route, ejecutando la funcion ".$invocation);
    }
}

?>
