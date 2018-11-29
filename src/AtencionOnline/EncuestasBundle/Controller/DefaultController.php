<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\EncuestasBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/encuestas")
 */
class DefaultController extends Controller{
    
    /**
     * 
     *
     * @Route("")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        $text=\AtencionOnline\EncuestasBundle\Crypt\Crypto::decrypt($request->get('eid'));
//        $todas=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->findAll());
//       return $this->JSON($todas->toArray(function(&$value){
//$value['idEstructura']=0;
//$value['preguntas']=0;
//}));
        if($text===false){
            return "La encuesta que ustded intenta acceder pertenece a una estructura invalida";
        }else{
            $encuesta=  $this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->find($text);

            if($encuesta){
                return $this->render('@EncuestasBundle/publico/formulario.twig',array(
                    'encuesta'=>$encuesta,
                    'nombre'=>$text
                ));
            }else{
                return "No se encontro la encuesta $text";
            }
        }
    }
    
    /**
     * 
     *
     * @Route("/enviar",name="atenciononline_formulario_enviado")
     *  
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function enviarAction($request,$response,$route) {
        $encuesta=  $this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->find($request->post('eid'));
        
        $usuario=new \AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios();
        if($encuesta->getAnonimo()){
            $us=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineUsuarios')->findOneBy(array('nombre'=>'Publico','ci'=>$request->post('Publico')));
            if($us)
                $usuario=$us;
            $usuario->setNombre('Publico');
            $usuario->setApellidos('');
            $usuario->setCi('Publico');
            $usuario->setDireccion('');
        }else{
            $us=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineUsuarios')->findOneBy(array('nombre'=>$request->post('nombre'),'ci'=>$request->post('ci')));
            if($us)
                $usuario=$us;
            $usuario->setNombre($request->post('nombre'));
            $usuario->setApellidos($request->post('apellidos'));
            $usuario->setCi($request->post('ci'));
            $usuario->setDireccion($request->post('direccion'));
        }
        $this->getStoreManager()->persist($usuario);
        $campos=  $request->post();
        foreach ($campos as $key=>$val) {
            if(strpos($key,'|enRap|opt')===FALSE){}
            else{
                $campo=new \AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineRespuestas();
                
                $campo->setIdCampo($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->find($val));
                $campo->setIdUsuario($usuario);
                $this->getStoreManager()->persist($campo);
            }
            if(strpos($key,'|enRap|text|')===FALSE){}
            else{
                $campo=new \AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineRespuestas();
                
                $campo->setIdCampo($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->find(intval(substr($key, strpos($key,'|enRap|text|')+12))));
                $campo->setIdUsuario($usuario);
                $campo->setTexto($val);
                $this->getStoreManager()->persist($campo);
            }
        }
        $this->getStoreManager()->flush();
        return $this->render("@EncuestasBundle/publico/msg.html.twig", array(
            'title'=>'Gracias por llenar nuestra encuesta',
            'msg'=>'¡ Los datos de la encuesta fueron enviados !'
        ));
    }
    
    
}

?>
