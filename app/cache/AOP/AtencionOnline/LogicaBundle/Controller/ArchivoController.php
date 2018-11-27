<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\LogicaBundle\Controller;

use Raptor\Bundle\Annotations\Route;
use Raptor\Bundle\Annotations\Inyect;
use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/archivo")
 */
class ArchivoController__AopProxied extends Controller{
    
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
        return $this->render('@LogicaBundle/archivo/index.html.twig');
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * @Inyect("syntarsus")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listEstructureAction($request,$response,$route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
        $node=$request->post('node')=='root'?0:$request->post('node');
        /**
         * Listar las estructuras calculando las incidencias
         * registradas
         * OJO EL LLAMADO AL SERVICIO TIENE PROBLEMAS DE RENDIMIENTO
         * UTILIZAR EL IMPLEMENTADO EN SYNTARSUS
         */
        $struc=new \Raptor\Util\ItemList($syntarsus->listUserStructureByDemand($node));
        $struc->toArray(function(&$item){
            $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($item['id']);
            $depthId = array($item['id']);
            foreach ($depth as $value) {
                $depthId[] = $value->getId();
            }
            $item['incidencias']=  $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasSize($depthId);
        });
        return $this->JSON($struc);
    }
    
    /**
     * 
     *
     * @Route("/delete")
     * @Description Elimina incidencias registradas
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request,$response,$route) {
        $this->hasCsrfProtection();
        if($this->app->getSecurity()->isAuthenticated()){
            $incidencia= $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->find($request->post('id'));

            $this->getStoreManager()->remove($incidencia);
            $this->getStoreManager()->flush();
            return $this->show("La incidencia fue correctamente eliminada.");
        }else{
            return $this->show("No se eliminó la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
    }
    
    /**
     * 
     *
     * @Route("/list")
     * @Description Lista las incidencias de una estructura
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listAction($request, $response, $route) {
        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        $depthId = array($request->post('idEstructure'));
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        $size = $this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->getIncidenciasSize($depthId);
        
        $result= new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->getIncidenciasPaging($depthId,$request->post('start'),$request->post('limit')));
        
        
        
        return $this->data(array(
            'result'=>$size,
            'rows'=>$result->toArray(function(&$item){
                $tipo=$item['idTipo'];
                $via=$item['idViasComunicacion'];
                $item['fecha']=$item['fecha']->format('d/m/Y');
                $item['idEstructure']=$item['idEstructure']->getName();
                if($tipo){
                    $item['idTipo']=$tipo->getId();
                    $item['tipo']=$tipo->getNombre();
                }
                if($via)
                    $item['idViasComunicacion']=$via->getId();
                if($via)
                    $item['vcomunicacion']=$via->getNombre();
                if($item['idClasificador']){
                    $item['nameClasificador']=$item['idClasificador']->getName();
                    $item['idClasificador']=$item['idClasificador']->getId();
                }
            })
        ));
        
    }
    
    /**
     * 
     *
     * @Route("/listbuscar")
     * @Description Lista las incidencias de una estructura por criterios de busqueda
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listBuscarAction($request, $response, $route) {
        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        $depthId = array($request->post('idEstructure'));
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        $desde=$request->post('desde')?\DateTime::createFromFormat('d/m/Y', $request->post('desde')):$request->post('desde');
        $hasta=$request->post('hasta')?\DateTime::createFromFormat('d/m/Y', $request->post('hasta')):$request->post('hasta');
        
        if($desde and !$hasta)
            $hasta=$desde;
        if($hasta and !$desde)
            $desde=$hasta;
        
        $criteria=array(
            'nombre'=>$request->post('nombre'),
            'recibida'=>$request->post('recibida'),
            'dirigido'=>$request->post('dirigido'),
            'via'=>$request->post('via'),
            'tipo'=>$request->post('tipo'),
            'desde'=>$desde,
            'hasta'=>$hasta
        );
        
        $result= new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->getIncidenciasSearch($depthId,$criteria));
        
        
        return $this->data(array(
            'result'=>$result->size(),
            'rows'=>$result->toArray(function(&$item){
                $tipo=$item['idTipo'];
                $via=$item['idViasComunicacion'];
                $item['fecha']=$item['fecha']->format('d/m/Y');
                $item['idEstructure']=$item['idEstructure']->getName();
                if($tipo){
                    $item['idTipo']=$tipo->getId();
                    $item['tipo']=$tipo->getNombre();
                }
                if($via)
                    $item['idViasComunicacion']=$via->getId();
            })
        ));
        
    }
    
    
    /**
     * Mostrar la incidencia para impresion
     *
     * @Route("/print")
     * @Description Muestra la incidencia como vista previa y lista para impresion
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function printAction($request,$response,$route) {
        
        $solicitud=$this->getStoreManager()
                ->getRepository('LogicaBundle:ArchivoIncidencias')
                ->find($request->get('id'));
        
        return $this->render('@LogicaBundle/impresion/index.html.twig',
                array('solicitud'=>$solicitud));  
    }
    
    /**
     * 
     *
     * @Route("/listtipoincidencia")
     * @Description Lista los tipos de incidencias
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listTipoAction($request,$response,$route) {
        return $this->JSON($this->getStoreManager()->getRepository('LogicaBundle:Tipo')->findAll());
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/listviascomunicacion")
     * @Description Lista las vias de comunicacion de las incidencias
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listViasAction($request,$response,$route) {
        return $this->JSON($this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->findAll());
    }
    
}

include_once AOP_CACHE_DIR . '/_proxies/AtencionOnline\\LogicaBundle\\Controller\\ArchivoController.php';



?>
