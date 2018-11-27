<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/clasificador")
 */
class ClasificadorController extends Controller{
    
    /**
     * 
     *
     * @Route("")
     * @Description Muestra la funcionalidad para gestionar los clasificadores
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        return $this->render('@LogicaBundle/clasificador/index.html.twig');
    }
    
    
    /**
     * 
     *
     * @Route("/list")
     * @Description Lista los clasificadores del árbol
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listAction($request,$response,$route) {
       $node=$request->post('node')=='root'?NULL:$request->post('node');
       $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent'=>$node)));
       $list->toArray(function(&$value){
                   unset($value['children']);
       });
       return $this->JSON($list);
    }
    
    /**
     * 
     *
     * @Route("/insert")
     * @Description Adiciona un clasificador a la lista
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request,$response,$route) {
       $this->hasCsrfProtection();
       
       
       $cl=$this->collector('LogicaBundle:Clasificador');
       $request->post('node')=='root'?NULL:$cl->setParent($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->find($request->post('index')));
       
       $this->getStoreManager()->persist($cl);
       $this->getStoreManager()->flush();
       return $this->show('El clasificador fue adicionado correctamente');
    }
    
    /**
     * 
     *
     * @Route("/edit")
     * @Description Modifica un clasificador de la lista
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
       $this->hasCsrfProtection();
       
       
       $cl=$this->collector($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->find($request->post('id')));
       
       $this->getStoreManager()->persist($cl);
       $this->getStoreManager()->flush();
       return $this->show('El clasificador fue modificado correctamente');
    }
    
    /**
     * 
     *
     * @Route("/delete")
     * @Description Elimina un clasificador de la lista
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
       $this->hasCsrfProtection();
       
       
       $cl=$this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->find($request->post('id'));
       
       $dependency=new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Clasificador')
                ->findBy(array('parent'=>$request->post('id'))));
      
       
       if($dependency->size()>0)
           return $this->show("El contenedor no puede ser eliminado, debes eliminar los clasificadores hijos primero",true,  Controller::ERROR);
       
       if($request->post('to')!=0){
           $to=$this->getStoreManager()
                ->getRepository('LogicaBundle:Clasificador')
                ->findOneBy($request->post('to'));
           
            $incidencias=new ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->findBy(array('idClasificador'=>$request->post('id'))));
            
            $incStore=new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->findBy(array('idClasificador'=>$request->post('id'))));
            
            if($to){
                foreach ($incidencias as $inc) {
                     $inc->setIdClasificador($to);  
                     $this->getStoreManager()->persist($inc);
                }
                foreach ($incStore as $inc) {
                     $inc->setIdClasificador($to);  
                     $this->getStoreManager()->persist($inc);
                }
            }
        }
       
       $this->getStoreManager()->remove($cl);
       $this->getStoreManager()->flush();
       return $this->show('El clasificador fue eliminado correctamente');
    }
    
    /**
     * 
     *
     * @Route("/verificar")
     * @Description Verifica si un clasificador puede ser eliminado(Si no tiene incidencias asociadas)
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function verificarAction($request,$response,$route) {
       $this->hasCsrfProtection();
       
       $inc=new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->findBy(array('idClasificador'=>$request->post('id'))));
       
       $incStore=new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->findBy(array('idClasificador'=>$request->post('id'))));
       
        if($inc->size()>0 or $incStore->size()>0 )
            return $this->data(array('have'=>1));
        return $this->data(array('have'=>0));
       
    }
    
    
}

?>
