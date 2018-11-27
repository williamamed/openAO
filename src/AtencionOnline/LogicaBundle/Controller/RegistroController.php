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
 * @Route("/registro")
 */
class RegistroController extends Controller{
    

    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("")
     * @Description Muestra la funcionalidad para el registro de incidencias
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        
        return $this->render('@LogicaBundle/registro/index.html.twig');
    }
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listEstructureAction($request,$response,$route,  \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
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
            $item['incidencias']=  $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->getIncidenciasSize($depthId);
        });
        return $this->JSON($struc);
    }
    
    /**
     * 
     *
     * @Route("/insert",description="Adiciona incidencias a la estructura")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function insertAction($request,$response,$route) {
        $this->hasCsrfProtection();
        if($this->app->getSecurity()->isAuthenticated()){
            $incidencia=  $this->collector('LogicaBundle:Incidencias');

            $tipo=$this->getStoreManager()->getRepository('LogicaBundle:Tipo')->find($request->post('idTipo'));
            $vias=$this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('idViasComunicacion'));
            $estrc=$this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('idEstructure'));
            $user=  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
            
            $incidencia->setIdTipo($tipo);
            $incidencia->setIdViasComunicacion($vias);
            $incidencia->setIdEstructure($estrc);
            $incidencia->setEstado(1);
            $incidencia->setFecha(\DateTime::createFromFormat('d/m/Y', $request->post('fecha')));
            $incidencia->setRecibe($user->getFullname());
            $this->getStoreManager()->persist($incidencia);
            $this->getStoreManager()->flush();


            return $this->show("La incidencia fue correctamente registrada.");
        }else{
            return $this->show("No se registró la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
    }
    
    /**
     * 
     *
     * @Route("/edit")
     * @Description Modifica incidencias registradas
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        $this->hasCsrfProtection();
        if($this->app->getSecurity()->isAuthenticated()){
            $incidencia=  $this->collector($this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id')));

            $tipo=$this->getStoreManager()->getRepository('LogicaBundle:Tipo')->find($request->post('idTipo'));
            $vias=$this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('idViasComunicacion'));
            
            $incidencia->setIdTipo($tipo);
            $incidencia->setIdViasComunicacion($vias);
            $incidencia->setEstado(1);
            $incidencia->setFecha(\DateTime::createFromFormat('d/m/Y', $request->post('fecha')));
            if (!$incidencia->getRecibe()) {
                $user = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username' => $this->getSecurityUser()->get('username')));
                $incidencia->setRecibe($user->getFullname());
            }
            $this->getStoreManager()->persist($incidencia);
            $this->getStoreManager()->flush();
            return $this->show("La incidencia fue correctamente modificada.");
        }else{
            return $this->show("No se edito la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
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
            $incidencia= $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id'));

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
    
    /**
     * 
     *
     * @Route("/tramitar")
     * @Description Envia las incidencias de una estructura a estado de tramite
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function tramitarAction($request, $response, $route) {
        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        $depthId = array($request->post('idEstructure'));
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        $result= new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasLista($depthId));
        
//        $first=$this->getStoreManager()
//                ->getRepository('LogicaBundle:Incidencias')
//                ->getIncidenciasLastNo($depthId);
        
        foreach ($result as $incidencias) {
            $incidencias->setEstado(2);
            
            /**
             * TODO
             * Una vez enviadas a tramite se registra el numero consecutivo
             * y el expediente del organismo central
             */
//            $first++;
//            $incidencias->setNoConsecutivo($first.'/'.date("y"));
            
            $this->getStoreManager()->persist($incidencias);
        }
        $this->getStoreManager()->flush();
        $count=$result->size();
        if($count>0)
            $text="Fueron enviadas $count incidencias a trámite satisfactoriamente ";
        else
            $text="No se encontraron incidencias en esta estructura para enviar a trámite";
        return $this->show($text,true,Controller::INFO,array('cant'=>$count));
        
    }
    
    /**
     * 
     *
     * @Route("/trasladar")
     * @Description Traslada una incidencia de una estructura hacia otra
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function trasladarAction($request, $response, $route) {
        $incidencia = $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id'));

        $new = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('to'));
        $old=$incidencia->getIdEstructure();

        if(!$incidencia->getAnterior()){
            $incidencia->setAnterior($incidencia->getIdEstructure()->getId());
        }
        $incidencia->setIdEstructure($new);
        $this->getStoreManager()->persist($incidencia);
        $this->getStoreManager()->flush();


        return $this->show("La incidencia fue trasladada hacia la estructura ".$new->getName()." correctamente.");
        
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
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasSize($depthId);
        
        $result= new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasPaging($depthId,$request->post('start'),$request->post('limit')));
        
        
        return $this->data(array(
            'result'=>$size,
            'rows'=>$result->toArray(function(&$item){
                $tipo=$item['idTipo'];
                $via=$item['idViasComunicacion'];
                $item['fecha']=$item['fecha']->format('d/m/Y');
                $item['idEstructure']=$item['idEstructure']->getName();
                if($tipo)
                    $item['idTipo']=$tipo->getId();
                if($via)
                    $item['idViasComunicacion']=$via->getId();
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
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasSearch($depthId,$criteria));
        
        
        return $this->data(array(
            'result'=>$result->size(),
            'rows'=>$result->toArray(function(&$item){
                $tipo=$item['idTipo'];
                $via=$item['idViasComunicacion'];
                $item['fecha']=$item['fecha']->format('d/m/Y');
                $item['idEstructure']=$item['idEstructure']->getName();
                if($tipo)
                    $item['idTipo']=$tipo->getId();
                if($via)
                    $item['idViasComunicacion']=$via->getId();
            })
        ));
        
    }
    
}

?>
