<?php

namespace AtencionOnline\NotificacionBundle\Aspect;

use Go\Aop\Aspect;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Around;
use Go\Lang\Annotation\Pointcut;

class CorreoAspect implements \Go\Aop\Aspect {

    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public Raptor2\SyntarsusBundle\Controller\UserController->insertAction(*))")
     */
    protected function aroundRegisterUserExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        //$result = $invocation->proceed();
        $that = $invocation->getThis();
        $that->hasCsrfProtection();
        $request = $invocation->getArguments()[0];
        $user = $that->collector('SyntarsusBundle:SecurityUser');

        $find = $that->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username' => $request->post('username')));
        if ($find)
            return $that->show($this->lang('usernotadded'), true, Controller::ERROR);

        if ($request->file('icon')->get('size') > 0) {
            $rand = rand(0, 500000);
            $web = \Raptor\Core\Location::get(\Raptor\Core\Location::WEBBUNDLES);
            if (!file_exists($web . '/security_photos'))
                mkdir($web . '/security_photos');
            $img = $request->file('icon');
            if ($img->get('type') == "image/gif" || $img->get('type') == "image/jpeg" || $img->get('type') == "image/x-png" || $img->get('type') == "image/png") {
                $user->setIcon($rand . '_' . $request->file('icon')->get('name'));
                $that->moveUploadFileTo('icon', $web . '/security_photos/' . $rand . '_' . $request->file('icon')->get('name'));
            }
        }
        $pass = $request->post('password');
        $estructure = $that->getStore()
                ->getManager()
                ->getRepository('SyntarsusBundle:SecurityEstructure')
                ->find($request->post('idEstructure'));
        $user->setIdEstructure($estructure);
        $user->setPassword(\Raptor\Security\SecureHash::hash($pass));
        $that->getStore()->getManager()->persist($user);
        $that->getStore()->getManager()->flush();

        $email = new \AtencionOnline\NotificacionBundle\Manager\Correo();
        try {
            $email->notificacionRegistroUsuario($user, $pass);
        } catch (\Exception $exc) {
            
        }



        return $that->show($that->lang('insertmsg') . ' kdkdkd');
    }
    
    
    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public AtencionOnline\LogicaBundle\Controller\RegistroController->insertAction(*))")
     */
    protected function aroundRegisterIncidenciaExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        //$result = $invocation->proceed();
        $that = $invocation->getThis();
        $request = $invocation->getArguments()[0];
        
        $that->hasCsrfProtection();
        if($that->app->getSecurity()->isAuthenticated()){
            $incidencia=  $that->collector('LogicaBundle:Incidencias');

            $tipo=$that->getStoreManager()->getRepository('LogicaBundle:Tipo')->find($request->post('idTipo'));
            $vias=$that->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('idViasComunicacion'));
            $estrc=$that->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('idEstructure'));
            $user=  $that->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$that->getSecurityUser()->get('username')));
            
            $incidencia->setIdTipo($tipo);
            $incidencia->setIdViasComunicacion($vias);
            $incidencia->setIdEstructure($estrc);
            $incidencia->setEstado(1);
            $incidencia->setFecha(\DateTime::createFromFormat('d/m/Y', $request->post('fecha')));
            $incidencia->setRecibe($user->getFullname());
            $that->getStoreManager()->persist($incidencia);
            $that->getStoreManager()->flush();

            $email=new \AtencionOnline\NotificacionBundle\Manager\Correo();
            try {
                $email->notificacionRegistroIncidencia($incidencia, $estrc);
            } catch (\Exception $exc) {
                return $that->show("La incidencia fue correctamente registrada, pero no se pudo enviar ninguna notificación por correo a los especialistas.");
            }

            return $that->show("La incidencia fue correctamente registrada.");
        }else{
            return $that->show("No se registró la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public AtencionOnline\LogicaBundle\Controller\RegistroController->trasladarAction(*))")
     */
    protected function aroundTransladoIncidenciaExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        
        $that = $invocation->getThis();
        $request = $invocation->getArguments()[0];
        
        $incidencia = $that->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id'));

        $new = $that->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('to'));
        $old=$incidencia->getIdEstructure();

        if(!$incidencia->getAnterior()){
            $incidencia->setAnterior($incidencia->getIdEstructure()->getId());
        }
        $incidencia->setIdEstructure($new);
        $that->getStoreManager()->persist($incidencia);
        $that->getStoreManager()->flush();

        $email=new \AtencionOnline\NotificacionBundle\Manager\Correo();
        try {
            $email->notificacionTrasladoIncidencia($incidencia, $new, $old);
        } catch (\Exception $exc) {
            return $that->show("La incidencia fue trasladada hacia la estructura ".$new->getName()." correctamente, pero no se pudo enviar ninguna notificación por correo a los especialistas.");
        }

        

        return $that->show("La incidencia fue trasladada hacia la estructura ".$new->getName()." correctamente.");
        
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public AtencionOnline\LogicaBundle\Controller\TramiteController->editAction(*))")
     */
    protected function aroundTramitarIncidenciaExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        
        $that = $invocation->getThis();
        $request = $invocation->getArguments()[0];
        
        $that->hasCsrfProtection();
        if ($that->app->getSecurity()->isAuthenticated()) {
            $incidencia = $that->collector($that->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id')));
            $user = $that->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username' => $that->getSecurityUser()->get('username')));

            $incidencia->setTraslada($user->getIdEstructure()->getName());


            $tipo = $that->getStoreManager()->getRepository('LogicaBundle:Tipo')->find($request->post('idTipo'));
            $vias = $that->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('idViasComunicacion'));

            $incidencia->setIdTipo($tipo);
            $incidencia->setIdViasComunicacion($vias);
            $incidencia->setEstado(3);


            $incidencia->setIdClasificador($that->getStoreManager()->getRepository('LogicaBundle:Clasificador')->find($request->post('idClasificador')));
            $incidencia->setFecha(\DateTime::createFromFormat('d/m/Y', $request->post('fecha')));
            if (!$incidencia->getRecibe()) {
                $user = $that->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username' => $that->getSecurityUser()->get('username')));
                $incidencia->setRecibe($user->getFullname());
            }
            $that->getStoreManager()->persist($incidencia);
            $that->getStoreManager()->flush();
            $email = new \AtencionOnline\NotificacionBundle\Manager\Correo();
            try {
                $email->notificacionTramiteIncidencia($incidencia, $incidencia->getIdEstructure());
            } catch (\Exception $exc) {
                return $that->show("La incidencia fue correctamente tramitada, pero no se pudo enviar ninguna notificación por correo a los especialistas.");
            }


            return $that->show("La incidencia fue correctamente tramitada.");
        } else {
            return $that->show("No se tramitó la incidencia:<br>Usted no se encuentra autenticado", true, Controller::ERROR);
        }
    }
    
    /**
     * @param MethodInvocation $invocation
     * @Around("execution(public AtencionOnline\PublicoBundle\Controller\DefaultController->sendAction(*))")
     */
    protected function aroundFromPublicIncidenciaExecution(\Go\Aop\Intercept\MethodInvocation $invocation) {
        
        $that = $invocation->getThis();
        
        $request = $invocation->getArguments()[0];
        
        $inc=  $that->collector('LogicaBundle:Incidencias');
        $inc->setEstado(0);
        $inc->setFecha(new \DateTime());
        $inc->setTermino(30);
        if($request->post("sexo"))
            $inc->setSexo(intval(str_replace("number:","",$request->post("sexo"))));
        else
            $inc->setSexo(NULL);
        if($request->post("ocupacion"))    
            $inc->setOcupacion(intval(str_replace("number:","",$request->post("ocupacion"))));
        else
            $inc->setOcupacion(NULL);
        if($request->post("nivelEscolar"))
            $inc->setNivelEscolar(intval(str_replace("number:","",$request->post("nivelEscolar"))));
        else
            $inc->setNivelEscolar(NULL);
       
        $es=  $that->getStoreManager()->find('SyntarsusBundle:SecurityEstructure',$request->post('eid'));
        $msg=array('error'=>0,'msg'=>'La incidencia fue registrada correctamente, gracias por comunicarte con nosotros.<br>¡ Trabajamos por usted !');
        $a='';
        for ($i = 0; $i<8; $i++) 
        {
            $a .= rand(0,9);
        }
        $code=$a;
        if(!$es){
            $msg['error']=1;
            $msg['msg']="La estructura desde la que intenta acceder es inválida";
        }
        $inc->setIdEstructure($es);
        $inc->setCodigoestado($code);
        $that->getStoreManager()->persist($inc);
        $that->getStoreManager()->flush();
        
        ob_start();
        \QRcode::png($request->getUrl().$request->getRootUri()."/estado?code=".$code,false, "L", 4, 4, false);
        $image_data = ob_get_contents();
        $base64 = 'data:image/PNG;base64,' . base64_encode($image_data);
        ob_end_clean();
        
        $email=new \AtencionOnline\NotificacionBundle\Manager\Correo();
        try {
            $email->notificacionRegistroPublicoIncidencia($inc, $es); 
        } catch (\Exception $exc) {
            
        }

        $that->getApp()->contentType('charset=UTF8');
        return $that->render('@PublicoBundle/form/send.html.twig',array('msg'=>$msg,'code'=>$code,'qr'=>$base64));
    }

}

?>
