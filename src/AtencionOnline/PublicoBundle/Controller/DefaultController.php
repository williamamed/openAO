<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\PublicoBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("")
 */
class DefaultController extends Controller{
    
     /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/unsubscribe")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function unsubcribeAction($request,$response,$route) {
          if($request->get('uid')){
          $user=\AtencionOnline\PublicoBundle\Crypt\Crypto::decrypt($request->get('uid'));
          $user=  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->find($user);
          if($user->getExtraData()){
              $data=  json_decode($user->getExtraData(), true);
              if($data){
                  $data['ao:notification']=false;
              }else{
                  $data=array('ao:notification'=>false);
              }
              $user->setExtraData(json_encode($data));
          }else{
              $data=array('ao:notification'=>false);
              $user->setExtraData(json_encode($data));
          }
          $this->getStoreManager()->persist($user);
          $this->getStoreManager()->flush();
          return "<h3 style='text-align:center'>Las notificaciones han sido desactivadas para su usuario</h3>";
         }else{
           return "Error en los datos para desactivar las notificaciones";
        }
    }

    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/enlacepublico")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        $es=$this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>  $this->getSecurityUser()->get('username')))->getIdEstructure();
        return $this->render('@PublicoBundle/enlace/index.html.twig',array(
            'url'=>$request->getUrl().$request->getRootUri().'/formulario',
            'baseurl'=>$request->getUrl(),
            'estructura'=>$es->getName(),
            'param'=>'?eid='.  urlencode(\AtencionOnline\PublicoBundle\Crypt\Crypto::encrypt($es->getId()))
        ));
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/formulario")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function formularioAction($request,$response,$route) {
       
        if($request->get('eid') and ($estructure=\AtencionOnline\PublicoBundle\Crypt\Crypto::decrypt($request->get('eid')))!==false){
            $obj=$this->getStoreManager()->find('SyntarsusBundle:SecurityEstructure',  intval($estructure));
            if($obj){
                return $this->render('@PublicoBundle/form/index.html.twig',array('estructura'=>$obj->getName(),'idestructura'=>$obj->getId(),'token'=>  $this->app->getSecurity()->getToken()));
                
            }
        }
        return $this->render('@PublicoBundle/wrong/index.html.twig');
    }
    
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
    public function sendAction($request,$response,$route) {
       
        $inc=  $this->collector('LogicaBundle:Incidencias');
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
       
        $es=  $this->getStoreManager()->find('SyntarsusBundle:SecurityEstructure',$request->post('eid'));
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
        $this->getStoreManager()->persist($inc);
        $this->getStoreManager()->flush();
        
        ob_start();
        \QRcode::png("https://atenciononline.jovenclub.cu/estado?code=".$code,false, "L", 4, 4, false);
        $image_data = ob_get_contents();
        $base64 = 'data:image/PNG;base64,' . base64_encode($image_data);
        ob_end_clean();
        
        $this->app->contentType('charset=UTF8');
        return $this->render('@PublicoBundle/form/send.html.twig',array('msg'=>$msg,'code'=>$code,'qr'=>$base64));
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/estado")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function estadoAction($request,$response,$route) {
        
        //$zip=new \Raptor\Util\Zip(__DIR__.'/../lib/phpqrcode-master.zip');
        //$zip->extract(__DIR__.'/../lib');
        
        // create a QR Code with this text and display it
        
        
        
        $code=$request->get('code');
        $op=$this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->findOneBy(array('codigoestado'=>$code));
        
        $arch=$this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->findOneBy(array('codigoestado'=>$code));
        
        $incidencia=null;
        
        if($op){
            $incidencia=$op;
        }else{
            if($arch){
                $incidencia=$arch;
            }else
                return $this->render('@PublicoBundle/form/estado.html.twig',array('msg'=>"El código dado no está asociado a ninguna incidencia."));
        }
        if($incidencia){
            ob_start();
            \QRcode::png("Nombre: ".utf8_encode($incidencia->getNombreApellidos())."\nRespuesta: ".utf8_encode($incidencia->getRespuesta())." ",false, "L", 4, 4, false);
            $image_data = ob_get_contents();
            $base64 = 'data:image/PNG;base64,' . base64_encode($image_data);
            ob_end_clean();
            return $this->render('@PublicoBundle/form/estado.html.twig',array('msg'=>"",'incidencia'=>$incidencia,'qr'=>$base64));
        }else
            return $code;
    }
    
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/fidel")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function fidelAction($request,$response,$route) {
         return "Este formulario no se encuentra disponible";
         return $this->render('@PublicoBundle/form/fidel.html.twig');
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/fidel/mensaje")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function mensajeAction($request,$response,$route) {
        return "Este formulario no se encuentra disponible";
        $email=new \AtencionOnline\NotificacionBundle\Manager\Correo();
        
        $file=false;
        if($request->file('image') && $request->file('image')->get('size')>0){
            ini_set('max_execution_time', "240");
            $rand=rand(0,500000);
            $web=  \Raptor\Core\Location::get(\Raptor\Core\Location::WEBBUNDLES);
            if(!file_exists($web.'/photos_temp'))
                mkdir ($web.'/photos_temp');
            $img=$request->file('image');
            if ($img->get('type') == "image/gif" || $img->get('type') == "image/jpeg" || $img->get('type') == "image/x-png" || $img->get('type') == "image/png" ){
                $name = $rand.'_'.$request->file('image')->get('name');
                $file = $web.'/photos_temp/' . $name;
                $this->moveUploadFileTo('image', $file);
            }
        }
        
        $email->enviarMensaje('homenaje@ltu.jovenclub.cu', $request->post('nombreApellidos'),$request->post('mensaje'),$file);
        if($file)
            unlink($file);
        $this->app->flash('config_succ','Su mensaje fue correctamente enviado.');
        $this->app->environment()['slim.flash']->save();
        $this->redirect($request->getReferer(),false);
    }
    
}

?>
