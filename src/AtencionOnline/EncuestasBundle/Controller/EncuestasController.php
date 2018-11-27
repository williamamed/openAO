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
class EncuestasController extends Controller{
    
    /**
     * This is the ui render function
     *
     * @Route("")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        return $this->render('@EncuestasBundle/Encuestas/index.html.twig');
    }
    
    /**
     * @Route("/insert")
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
        $entity=$this->collector('EncuestasBundle:AtenciononlineEncuestas');
        $entity->setEstado(0);
        $entity->setAnonimo(false);
        $entity->setEnlace(urlencode(\AtencionOnline\EncuestasBundle\Crypt\Crypto::encrypt($entity->getNombre())));
        $entity->setTipo(true);
        $user= $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
        $entity->setIdEstructura($user->getIdEstructure());
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('La encuesta fue creada correctamente');
    }
    
    /**
     * @Route("/edit")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->find($request->post('id'));
        $this->collector($entity);
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('La encuesta fue modificada correctamente');
    }
    
    /**
     * @Route("/cambiarestado")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function cambiarEstadoAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->find($request->post('id'));
        $entity->setEstado($request->post('estado'));
        $entity->setAnonimo($request->post('anonimo')==='true'?true:false);
        $this->getStoreManager()->persist($entity);
        $this->getStoreManager()->flush();
        return $this->show('La encuesta fue modificada correctamente');
    }
    
    /**
     * @Route("/delete")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $entity=$this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->find($request->post('id'));
        
        $this->getStoreManager()->remove($entity);
        $this->getStoreManager()->flush();
        return $this->show('La encuesta fue eliminada correctamente');
    }
    
    /**
     * @Route("/list")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        $user= $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
        
        $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineEncuestas')->findBy(array(
            'idEstructura'=>$user->getIdEstructure()->getId()
        )));
        
        $list->toArray(function(&$value){
            $value['enlace']=urlencode(\AtencionOnline\EncuestasBundle\Crypt\Crypto::encrypt($value['id']));
        });
        
        return $this->JSON($list);
    }
    
    /**
     * @Route("/listcampos")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listcamposAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        return $this->JSON($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlineCampos')->findBy(array(
            'idPregunta'=>$request->post('idPregunta')
        )));
    }
    
    /**
     * @Route("/listpregunta")
     *
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listpreguntaAction($request,$response,$route) {
        //$this->hasCsrfProtection();
        return $this->JSON($this->getStoreManager()->getRepository('EncuestasBundle:AtenciononlinePreguntas')->findBy(array(
            'idEncuesta'=>$request->post('idEncuesta')
        )));
    }
    
    
}

?>

