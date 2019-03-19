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
 * This Controller is autogenerated, go and edit some stuff !!
 *
 * @Route("/encuestas/admin")
 */
class CamposController extends Controller{
    
    
    /**
     * @Route("/insertCampo")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        /**
         * The collector full the entity values with the values of the request
         * the request values must be named like the entity values
         */
        $entity=$this->collector('EncuestasBundle:AtenciononlineCampos');
        $entity->setIdPregunta($this->getStoreManager()->find('EncuestasBundle:AtenciononlinePreguntas',$request->post('idPregunta')));
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('El campo fue creado correctamente');
    }
    
    /**
     * @Route("/editCampo")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->find($request->post('id'));
        $this->collector($entity);
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('El campo fue modificado correctamente');
    }
    
    /**
     * @Route("/deleteCampo")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->find($request->post('id'));
        
        $this->getStoreManager()->remove($entity);
        $this->getStoreManager()->flush();
        return $this->show('El campo fue eliminado correctamente');
    }
    
    /**
     * @Route("/listpie")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function pieAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $campos=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->findBy(array('idPregunta'=>$request->post('id')));
        
        $result=array();
        foreach ($campos as $camp) {
            $name=$camp->getRespuesta();
            if(strlen($name)>15)
                $name=mb_substr($name, 0, 15,'UTF-8').'...';
               // $name=  substr ($name, 0, 15).'...';
            $result[]=array('fullname'=>$camp->getRespuesta(),'name'=>$name,'cant'=>count($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineRespuestas')->findBy(array('idCampo'=>$camp->getId()))));
        }
        $json=$this->JSON($result);
        $this->app->contentType('application/json; charset=utf-8');
        return $json;
    }
    
    /**
     * @Route("/listtextos")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function textosAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $campos=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->findBy(array('idPregunta'=>$request->post('id')));
        $result=array();
        foreach ($campos as $camp) {
            $resp=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineRespuestas')->findBy(array('idCampo'=>$camp->getId()));
            foreach ($resp as $r) {
                $result[]=array('name'=>$r->getIdUsuario()->getNombre(),'apellidos'=>$r->getIdUsuario()->getApellidos(),'direccion'=>$r->getIdUsuario()->getDireccion(),'ci'=>$r->getIdUsuario()->getCi(),'text'=>$r->getTexto());
            }
            
        }
        
        return $this->JSON($result);
    }
    
    
}

?>

