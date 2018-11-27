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
class PreguntasController extends Controller{
    
    
    /**
     * @Route("/insertPregunta")
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
        $entity=$this->collector('EncuestasBundle:AtenciononlinePreguntas');
        $entity->setIdEncuesta($this->getStoreManager()->find('EncuestasBundle:AtenciononlineEncuestas',$request->post('idEncuesta')));
        $entity->setDescripcion('');
        $entity->setOpcional($request->post('opcional')=='on'?true:false);
        if($request->post('tipo')==2){
            $campo=new \AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos();
            $campo->setIdPregunta($entity);
            $campo->setRespuesta('Texto');
            $this->getStoreManager()->persist($campo);
        }
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('La pregunta fue creada correctamente');
    }
    
    /**
     * @Route("/editPregunta")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlinePreguntas')->find($request->post('id'));
        $this->collector($entity);
        $entity->setOpcional($request->post('opcional')=='on'?true:false);
        if($entity->getTipo()!=2&&$request->post('tipo')==2){
            $campos=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->findBy(array('idPregunta'=>$request->post('id')));
            foreach ($campos as $campo) {
                $this->getStoreManager()->remove($campo);
            }
            $campo=new \AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos();
            $campo->setIdPregunta($entity);
            $campo->setRespuesta('Texto');
            $this->getStoreManager()->persist($campo);
        }
        
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('La pregunta fue modificada correctamente');
    }
    
    /**
     * @Route("/deletePregunta")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlinePreguntas')->find($request->post('id'));
        
        $this->getStoreManager()->remove($entity);
        $this->getStoreManager()->flush();
        return $this->show('La pregunta fue eliminada correctamente');
    }
    
    
}

?>
