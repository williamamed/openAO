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
use Raptor\Util\ItemList;
/**
 * @Route("/reporte")
 */
class ReportesController__AopProxied extends Controller{
    
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
        return $this->render('@LogicaBundle/Reporte/index.html.twig');
    }
    
    /**
     * 
     *
     * @Route("/listyear")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listYearAction($request,$response,$route) {
        $list=new \Raptor\Util\ItemList(array(
            array('name'=>date('Y',strtotime("now"))),
            array('name'=>date('Y',strtotime("-1 year"))),
            array('name'=>date('Y',strtotime("-2 year"))),
            array('name'=>date('Y',strtotime("-3 year"))),
            array('name'=>date('Y',strtotime("-4 year")))
        ));
        
        return $this->JSON($list);
    }
    
    /**
     * 
     *
     * @Route("/listestructure",description="Lista las estructuras del usuario")
     * 
     * @Inyect("syntarsus")
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
            $item['incidencias']=  $this->getStoreManager()->getRepository('LogicaBundle:Incidencias')->getIncidenciasSize($depthId,1);
        });
        return $this->JSON($struc);
    }
    
    /**    
     * @Route("/listpie")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listPieAction($request,$response,$route) {
        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        $depthId = array($request->post('idEstructure'));
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        $desde=new \DateTime();
        $desde->setDate(intval($request->post('year')), intval($request->post('desde')),1);
        $check=\DateTime::createFromFormat('m/Y',$request->post('hasta').'/'.$request->post('year'));
        $hasta=new \DateTime();
        $hasta->setDate(intval($request->post('year')), intval($request->post('hasta')),  intval($check->format('t')));
        
        if($request->post('tabla')==2){
            
            $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getViasChart($depthId,$desde,$hasta));
            return $this->JSON($list);
        }
        if($request->post('tabla')==1){
            
            $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getTipoChart($depthId,$desde,$hasta));
            return $this->JSON($list);
        }
        if($request->post('tabla')==4){
            
            $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getValoracionChart($depthId,$desde,$hasta));
            $list->toArray(function(&$value){
                if($value['razon']==0){
                    $value['name'].=" con razón";
                }
                if($value['razon']==1){
                    $value['name'].=" con razón en parte";
                }
                if($value['razon']==2){
                    $value['name'].=" sin razón";
                }
                if($value['razon']==3){
                    $value['name'].=" no se demuestra";
                }
            });
            return $this->JSON($list);
        }
        
         if($request->post('tabla')==5){
            
            $list=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getValoracionConformidadChart($depthId,$desde,$hasta));
            $list->toArray(function(&$value){
                if($value['conforme']==true){
                    $value['name']="Conformidad Sí";
                }
                if($value['conforme']==false){
                    $value['name']="Conformidad No";
                }
            });
            return $this->JSON($list);
        }
        
        return $this->JSON(array());
    }
    
    /**    
     * @Route("/listline")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listLineAction($request,$response,$route) {
        
        
        $depthId = array($request->post('idEstructure'));

        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        $meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
        $desde=new \DateTime();
        $desde->setDate(intval($request->post('year')), intval($request->post('desde')),1);
        $check=\DateTime::createFromFormat('m/Y',$request->post('hasta').'/'.$request->post('year'));
        $hasta=new \DateTime();
        $hasta->setDate(intval($request->post('year')), intval($request->post('hasta')),  intval($check->format('t')));
        
        if($request->post('tabla')==1){
            
            if($request->post('ejex')==1){
                $chart = array();
                $names=array();
                $tipos=  $this->getStoreManager()->getRepository('LogicaBundle:Tipo')->findAll();
                foreach ($tipos as $tipo) {
                        $names[] = $tipo->getNombre();
                }
                for ($index = intval($request->post('desde')); $index < intval($request->post('hasta'))+1; $index++) {
                    $desde=new \DateTime();
                    $desde->setDate(intval($request->post('year')), $index, 1);
                    $hasta=new \DateTime();
                    $hasta->setDate(intval($request->post('year')), $index, intval($desde->format('t')));

                   $data=array('name'=>$meses[$index-1]);
                    foreach ($tipos as $tipo) {
                        
                        $cant=$this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureByTipoChart($depthId, $desde, $hasta,$tipo->getId());
                        $data[$tipo->getNombre()] = intval($cant);
                        
                    }

                    $chart[] = $data;
                }
                return $this->JSON(array('names' => $names, 'data' => $chart));
            }
            
            /**
             * Remover esto ya que siempre es por meses
             */
            if($request->post('ejex')==2){
                $hijos=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->findBy(array('belongs'=>$request->post('idEstructure'))));
                $names=array();
                $chart=array();
                foreach ($hijos as $value) {
                    
                    $data=array('name'=>$value->getName());
                    $tipos=new \Raptor\Util\ItemList($this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureChart($depthId,$desde,$hasta));
                    foreach ($tipos as $tipo) {
                        $names[]=$tipo['name'];
                        $data[$tipo['name']]=  intval($tipo['cant']);
                    }
                    $chart[]=$data;
                    
                }
                return $this->JSON(array('names'=>$names,'data'=>$chart));
            }
            
           
        }
        
        
        if($request->post('tabla')==0){
            $general = $this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent' => NULL));
            $chart = array();
            $names = array();
            $converted=array();
            foreach ($general as $especifico) {
                $names[] = $especifico->getName();
                $item=array('name'=>$especifico->getName(),'ids'=>array());
                
                foreach ($especifico->getChildren() as $value) {
                    $item['ids'][]=$value->getId();
                }
                $converted[]=$item;
            }
            
           for ($index = intval($request->post('desde')); $index < intval($request->post('hasta'))+1; $index++) {
                $desde = new \DateTime();
                $desde->setDate(intval($request->post('year')), $index, 1);
                $hasta = new \DateTime();
                $hasta->setDate(intval($request->post('year')), $index, intval($desde->format('t')));

                $data = array('name' => $meses[$index-1]);
                foreach ($converted as $especifico) {
                    
                    $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasByClasificadorChart($depthId, $desde, $hasta, $especifico['ids']);
                    $data[$especifico['name']] = intval($cant);
                }

                $chart[] = $data;
            }
            return $this->JSON(array('names' => $names, 'data' => $chart));
            
        }
        
        return $this->JSON(array());
    }
    
    /**    
     * @Route("/listbar")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listBarAction($request,$response,$route,\Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
        $depthId = array($request->post('idEstructure'));

        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        
      
       $desde=new \DateTime();
        $desde->setDate(intval($request->post('year')), intval($request->post('desde')),1);
        $check=\DateTime::createFromFormat('m/Y',$request->post('hasta').'/'.$request->post('year'));
        $hasta=new \DateTime();
        $hasta->setDate(intval($request->post('year')), intval($request->post('hasta')),  intval($check->format('t')));
        
        if($request->post('tabla')==0){
            
            $general = $this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent' => NULL));
            $chart = array();
            $names = array();
            $converted=array();
            foreach ($general as $especifico) {
                $names[] = $especifico->getName();
                $item=array('name'=>$especifico->getName(),'ids'=>array());
                
                foreach ($especifico->getChildren() as $value) {
                    $item['ids'][]=$value->getId();
                }
                $converted[]=$item;
            }
            
            
                
                foreach ($converted as $especifico) {
                    $data = array('name' =>$especifico['name']);
                    $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasByClasificadorChart($depthId, $desde, $hasta, $especifico['ids']);
                    $data['cant'] = intval($cant);
                    $chart[] = $data;
                }

                
           
            return $this->JSON(array('names' => $names, 'data' => $chart));
            
        }
        
        
        
        if($request->post('tabla')==3){
            
            $hijos=$syntarsus->listUserStructureByDemand($request->post('idEstructure'));
            $chart = array();
            $names = array();
            foreach ($hijos as $hijo) {
                $depthId = array($hijo['id']);

                $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($hijo['id']);

                foreach ($depth as $value) {
                    $depthId[] = $value->getId();
                }
                $data = array('name' =>$hijo['name']);
                $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desde, $hasta);
                $data['cant'] = intval($cant);
                $chart[] = $data;
                
            }
            $depthId = array(intval($request->post('idEstructure')));
            $estrc=$this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('idEstructure'));
            $data = array('name' => $estrc->getName());
            $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desde, $hasta);
            $data['cant'] = intval($cant);
            $chart[] = $data;
           
            return $this->JSON(array('names' => $names, 'data' => $chart));
            
        }
    }
    
    
    
    /**    
     * @Route("/listbarcompare")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listBarCompareAction($request,$response,$route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
        $depthId = array($request->post('idEstructure'));

        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        
      
        $desde=new \DateTime();
        $desde->setDate(intval($request->post('year')), intval($request->post('desde')),1);
        $check=\DateTime::createFromFormat('m/Y',$request->post('hasta').'/'.$request->post('year'));
        $hasta=new \DateTime();
        $hasta->setDate(intval($request->post('year')), intval($request->post('hasta')),  intval($check->format('t')));
        
        $desdeCompare=new \DateTime();
        $desdeCompare->setDate(intval($request->post('year2')), intval($request->post('desde')),1);
        $checkCompare=\DateTime::createFromFormat('m/Y',$request->post('hasta').'/'.$request->post('year2'));
        $hastaCompare=new \DateTime();
        $hastaCompare->setDate(intval($request->post('year2')), intval($request->post('hasta')),  intval($checkCompare->format('t')));
        
        if($request->post('tabla')==0){
            
            $general = $this->getStoreManager()->getRepository('LogicaBundle:Clasificador')->findBy(array('parent' => NULL));
            $chart = array();
            $names = array();
            $converted=array();
            foreach ($general as $especifico) {
                $names[] = $especifico->getName();
                $item=array('name'=>$especifico->getName(),'ids'=>array());
                
                foreach ($especifico->getChildren() as $value) {
                    $item['ids'][]=$value->getId();
                }
                $converted[]=$item;
            }
            
            
                
                foreach ($converted as $especifico) {
                    $data = array('name' =>$especifico['name']);
                    $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasByClasificadorChart($depthId, $desde, $hasta, $especifico['ids']);
                    $compare = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasByClasificadorChart($depthId, $desdeCompare, $hastaCompare, $especifico['ids']);
                    $data[$request->post('year')] = intval($cant);
                    $data[$request->post('year2')] = intval($compare);
                    $chart[] = $data;
                }

                
           
            return $this->JSON(array('names' => $names,'compare'=>array($request->post('year'),$request->post('year2')), 'data' => $chart));
            
        }
        
        if($request->post('tabla')==1){
            
            $tipos = $this->getStoreManager()->getRepository('LogicaBundle:Tipo')->findAll();
            foreach ($tipos as $tipo) {
                $names[] = $tipo->getNombre();
            }
            $chart = array();
            $names = array();
            $converted=array();
            foreach ($tipos as $especifico) {
                $names[] = $especifico->getNombre();
                $item=array('name'=>$especifico->getNombre(),'id'=>$especifico->getId());
                
                $converted[]=$item;
            }
            
            
                
                foreach ($converted as $especifico) {
                    $data = array('name' =>$especifico['name']);
                    $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureByTipoChart($depthId, $desde, $hasta, $especifico['id']);
                    $compare = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureByTipoChart($depthId, $desdeCompare, $hastaCompare, $especifico['id']);
                    $data[$request->post('year')] = intval($cant);
                    $data[$request->post('year2')] = intval($compare);
                    $chart[] = $data;
                }

                
           
            return $this->JSON(array('names' => $names,'compare'=>array($request->post('year'),$request->post('year2')), 'data' => $chart));
            
        }
        
        if($request->post('tabla')==2){
            
            $tipos = $this->getStoreManager()->getRepository('LogicaBundle:ViasComunicacion')->findAll();
            foreach ($tipos as $tipo) {
                $names[] = $tipo->getNombre();
            }
            $chart = array();
            $names = array();
            $converted=array();
            foreach ($tipos as $especifico) {
                $names[] = $especifico->getNombre();
                $item=array('name'=>$especifico->getNombre(),'id'=>$especifico->getId());
                
                $converted[]=$item;
            }
            
            
                
                foreach ($converted as $especifico) {
                    $data = array('name' =>$especifico['name']);
                    $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureByViasChart($depthId, $desde, $hasta, $especifico['id']);
                    $compare = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getEstructureByViasChart($depthId, $desdeCompare, $hastaCompare, $especifico['id']);
                    $data[$request->post('year')] = intval($cant);
                    $data[$request->post('year2')] = intval($compare);
                    $chart[] = $data;
                }

                
           
            return $this->JSON(array('names' => $names,'compare'=>array($request->post('year'),$request->post('year2')), 'data' => $chart));
            
        }
        
        
        if($request->post('tabla')==3){
            
            $hijos=$syntarsus->listUserStructureByDemand($request->post('idEstructure'));
      
            $aux=new ItemList(array($this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($request->post('idEstructure'))));
            $aux->toArray();
            $hijos[]=$aux[0];
        
            $chart = array();
            $names = array();
            foreach ($hijos as $hijo) {
                $depthId = array($hijo['id']);

                $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($hijo['id']);
                if(intval($request->post('idEstructure'))!=$hijo['id'])
                foreach ($depth as $value) {
                    $depthId[] = $value->getId();
                }
                $data = array('name' =>$hijo['name']);
                $cant = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desde, $hasta);
                $compare = $this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desdeCompare, $hastaCompare);
                $data['cant'] = intval($cant);
                $data[$request->post('year')] = intval($cant);
                $data[$request->post('year2')] = intval($compare);
                $chart[] = $data;
                
            }
            
           
            return $this->JSON(array('names' => $names,'compare'=>array($request->post('year'),$request->post('year2')), 'data' => $chart));
            
        }
    }
    
    
     /**    
     * @Route("/listlinecompare")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listLineCompareAction($request,$response,$route) {
        
        
        $depthId = array($request->post('idEstructure'));

        $depth = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($request->post('idEstructure'));
        
        foreach ($depth as $value) {
            $depthId[] = $value->getId();
        }
        
        $meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
        
        if($request->post('tabla')==3){
            
           
                $chart = array();
                
                
                for ($index = intval($request->post('desde')); $index < intval($request->post('hasta'))+1; $index++) {
                    $desde=new \DateTime();
                    $desde->setDate(intval($request->post('year')), $index, 1);
                    $hasta=new \DateTime();
                    $hasta->setDate(intval($request->post('year')), $index, intval($desde->format('t')));
                    
                    $desdeCompare = new \DateTime();
                    $desdeCompare->setDate(intval($request->post('year2')), $index, 1);
                    $checkCompare = \DateTime::createFromFormat('m/Y', $index . '/' . $request->post('year2'));
                    $hastaCompare = new \DateTime();
                    $hastaCompare->setDate(intval($request->post('year2')), $index, intval($checkCompare->format('t')));

                    $data=array('name'=>$meses[$index-1]);
                    
                    $cant=$this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desde, $hasta);
                    $data[$request->post('year')] = intval($cant);
                    $compare=$this->getStoreManager()->getRepository('LogicaBundle:ArchivoIncidencias')->getIncidenciasChart($depthId, $desdeCompare, $hastaCompare);
                    $data[$request->post('year2')] = intval($compare);
                    
                    $chart[] = $data;
                }
                return $this->JSON(array('names' =>array($request->post('year'),$request->post('year2')), 'data' => $chart));
           
            
           
        }
        
        
        return $this->JSON(array());
    }
    
    /**    
     * @Route("/export")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function exportAction($request,$response,$route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
        ini_set('max_execution_time', 300);
        $obj= $this->get('phpExcel');
        $exel=new \AtencionOnline\LogicaBundle\Exel\ExelGenerator($this->getStoreManager(),$obj,0);
        $list=new \Raptor\Util\ItemList($this->getStoreManager()
                ->getRepository('LogicaBundle:Clasificador')
                ->findBy(array('parent'=>NULL)));
        
        $desdeD=new \DateTime();
        $desdeD->setDate(intval($request->get('year')), intval($request->get('desde')),1);
        $checkD=\DateTime::createFromFormat('m/Y',$request->get('hasta').'/'.$request->get('year'));
        $hastaD=new \DateTime();
        $hastaD->setDate(intval($request->get('year')), intval($request->get('hasta')),  intval($checkD->format('t'))); 
       
        $node=$request->get('node')=='root'?0:$request->get('node');
        $estructura =$syntarsus->listUserStructureByDemand($node);
        $aux=new ItemList(array($this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->find($node)));
        $aux->toArray();
        $estructura[]=$aux[0];
        $name=  str_replace("/", "-",$desdeD->format('Y'));
        
        $exel->setName("Período ".$name);
        $exel->generarHeaderAction($estructura);
        $exel->drawTable($list, $estructura,$desdeD,$hastaD,$node);
        $exel->generateFooter($estructura,$list);
        $exel->generateSide();
        $hasta=$exel->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($exel->column,$exel->row)->getCoordinate();
        $exel->setGrid("A2:".$hasta);
       $exel->center("A2:".$hasta);
        $exel->borderInside(count($estructura));
        if ($request->get('year2')) {
            
            $desdeD2 = new \DateTime();
            $desdeD2->setDate(intval($request->get('year2')), intval($request->get('desde')), 1);
            $checkD2 = \DateTime::createFromFormat('m/Y', $request->get('hasta') . '/' . $request->get('year2'));
            $hastaD2 = new \DateTime();
            $hastaD2->setDate(intval($request->get('year2')), intval($request->get('hasta')), intval($checkD2->format('t')));
            
            $name2=  str_replace("/", "-",$desdeD2->format('Y'));
            $exel3=new \AtencionOnline\LogicaBundle\Exel\ExelGenerator($this->getStoreManager(),$exel->objPHPExcel,1);
            $exel3->setName("Período " . $name2);
            $exel3->generarHeaderAction($estructura);
            
            

            $exel3->drawTable($list, $estructura,$desdeD2,$hastaD2,$node);
            $exel3->generateFooter($estructura, $list->getArray());
            $exel3->generateSide();
            $hasta = $exel3->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($exel3->column, $exel3->row)->getCoordinate();
            $exel3->setGrid("A2:" . $hasta);
            $exel3->center("A2:" . $hasta);
            $exel3->borderInside(count($estructura));
            
            $exel2 = new \AtencionOnline\LogicaBundle\Exel\ExelGeneratorCompare($this->getStoreManager(), $exel->objPHPExcel, 2);
            $exel->setName("Comparacion");
            $exel2->generarHeaderAction($name,$name2);
            $exel2->drawTable($list, $estructura,$desdeD,$hastaD, $desdeD2,$hastaD2,$node);
            $exel2->generateFooter($list);
            $exel2->generateSide(6);
            $exel2->generateSide(10);
            $exel2->setGrid();
            $exel2->center("A2:k".$exel2->row);
        }
        $exel->close();
        $this->app->response()->headers()->set('Content-Disposition', 'attachment; filename="Clasificador"');
        
        $this->app->response()->headers()->set('Cache-Control', 'max-age=0');
        $this->app->contentType(\Raptor\Raptor::EXCEL);
        return ;
    }
}

include_once AOP_CACHE_DIR . '/_proxies/AtencionOnline\\LogicaBundle\\Controller\\ReportesController.php';



?>
