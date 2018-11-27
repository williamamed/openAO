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
 * @Route("/tramite")
 */
class TramiteController extends Controller{
    
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
        return $this->render('@LogicaBundle/tramite/index.html.twig');
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
            $item['incidencias']=  $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->getIncidenciasSize($depthId,1);
        });
        return $this->JSON($struc);
    }
    
    
    /**
     * 
     *
     * @Route("/procesar")
     * @Description Permite establecer los datos de la incidencia en estado de tramite
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function editAction($request,$response,$route) {
        $this->hasCsrfProtection();
        if($this->app->getSecurity()->isAuthenticated()){
            $incidencia=  $this->collector($this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id')));
            $user= $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
            
            $incidencia->setTraslada($user->getIdEstructure()->getName());
           
            
            $tipo=$this->getStoreManager()->getRepository('LogicaBundle:Tipo')->find($request->post('idTipo'));
            $vias=$this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->find($request->post('idViasComunicacion'));
            
            $incidencia->setIdTipo($tipo);
            $incidencia->setIdViasComunicacion($vias);
            $incidencia->setEstado(3);
            
            
            $incidencia->setIdClasificador($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->find($request->post('idClasificador')));
            $incidencia->setFecha(\DateTime::createFromFormat('d/m/Y', $request->post('fecha')));
            if (!$incidencia->getRecibe()) {
                $user = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username' => $this->getSecurityUser()->get('username')));
                $incidencia->setRecibe($user->getFullname());
            }
            $this->getStoreManager()->persist($incidencia);
            $this->getStoreManager()->flush();
            
            return $this->show("La incidencia fue correctamente tramitada.");
        }else{
            return $this->show("No se tramitó la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
    }
    
    /**
     * 
     *
     * @Route("/archivar")
     * @Description Permite archivar los datos de la incidencia en estado de tramite
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function archivarAction($request,$response,$route) {
        $this->hasCsrfProtection();
        if($this->app->getSecurity()->isAuthenticated()){
            $incidencia=  $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->find($request->post('id'));
            $fields=$this->getStoreManager()->getClassMetadata('LogicaBundle:Incidencias')->getReflectionClass()->getProperties(\ReflectionProperty::IS_PUBLIC | \ReflectionProperty::IS_PROTECTED | \ReflectionProperty::IS_PRIVATE);
            $archivo=new \AtencionOnline\LogicaBundle\Model\Entity\ArchivoIncidencias();
           
            foreach ($fields as $field) {
                if ($field !== 'id') {
                    $meta = $this->getStoreManager()->getClassMetadata('LogicaBundle:ArchivoIncidencias')->getReflectionClass();
                    $field->setAccessible(true);
                    $property = $meta->getProperty($field->getName());
                    $property->setAccessible(true);
                    $property->setValue($archivo, $field->getValue($incidencia));
                }
            }
            
             if (!$archivo->getNoConsecutivo()) {
                $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($archivo->getIdEstructure());
                $depthId = array($archivo->getIdEstructure());
                foreach ($depth as $value) {
                    $depthId[] = $value->getId();
                }
                $size = $this->getStoreManager()
                        ->getRepository('LogicaBundle:Incidencias')
                        ->getIncidenciasTramiteSize($depthId, 1);
                $size++;
                $archivo->setNoConsecutivo("$size/" . date('y'));
            }
            
            if($archivo->getAnterior()){
                $est=  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($archivo->getAnterior());
                $depthAnt = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($archivo->getAnterior());
                $depthIdAnt = array($archivo->getAnterior());
                foreach ($depthAnt as $value) {
                    $depthIdAnt[] = $value->getId();
                }
                $sizeAnt = $this->getStoreManager()
                        ->getRepository('LogicaBundle:Incidencias')
                        ->getIncidenciasTramiteSize($depthIdAnt, 1);
                $sizeAnt++;
                $archivo->setAnterior(NULL);
                $archivo->setExpOc($archivo->getExpOc().", $sizeAnt/".date('y').' '.$est->getName());
            }


            $this->getStoreManager()->persist($archivo);
            $this->getStoreManager()->remove($incidencia);
            $this->getStoreManager()->flush();
            return $this->show("La incidencia fue correctamente archivada.");
        }else{
            return $this->show("No se archivó la incidencia:<br>Usted no se encuentra autenticado",true,  Controller::ERROR);
        }
    }
    
    /**
     * 
     *
     * @Route("/listclasificador")
     * @Description Lista los clasificadores de las incidencias
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listClasifcadorAction($request,$response,$route) {
       $node=$request->post('node')=='root'?NULL:$request->post('node');
       $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent'=>$node)));
       $me=$this;

       $list->toArray(function(&$value) use ($request,$me){
                   
                 
                      if(count($value['children']->toArray())){
                          $childs=new \Raptor\Util\ItemList($value['children']->toArray());
                          $childs->toArray(function(&$value2){
                              unset($value2['children']);
                             $value2['leaf']=true;
                             $value2['iconCls']='icon-house';
                          });
                          $value['children']=$childs->toArray();
                           $value['expanded']=true;
                      }else{
                          unset($value['children']);
                          $value['leaf']=true;
                          $value['iconCls']='icon-house';
                      }
                   
                   /**if($request->post('node')!='root'){
                       $value['leaf']=true;
                       $value['iconCls']='icon-house';
                   }**/
       });

       return $this->JSON($list);
    }

    private function findChilds($parent) {
        $childs=array();
        $kids=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent'=>$parent)));
        $kids=$kids->toArray();
        if(count($childs)){
             foreach ($childs as $key => &$value) {
                    $childs2=$this->findChilds($value['id']);
                    if(count($childs2)){
                          $value['children']=$childs2;
                    }else{
                          $value['leaf']=true;
                          $value['iconCls']='icon-house';
                   }
             }
        }
        return $childs;
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
                ->getIncidenciasSize($depthId,1);
        
        $result= new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasPaging($depthId,$request->post('start'),$request->post('limit'),1));
        
        
        
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
                ->getRepository('LogicaBundle:Incidencias')
                ->getIncidenciasSearch($depthId,$criteria,1));
        
        
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
                ->getRepository('LogicaBundle:Incidencias')
                ->find($request->get('id'));
        
        return $this->render('@LogicaBundle/impresion/index.html.twig',
                array('solicitud'=>$solicitud));  
    }
}

?>
