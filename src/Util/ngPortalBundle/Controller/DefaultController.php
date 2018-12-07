<?php
/**
 * Generado por RAPTOR PHP 3
 * Puedes adicionar un prefijo de ruta
 * estableciendo la anotacion \@Route en la clase.
 */

namespace Util\ngPortalBundle\Controller;

use Raptor\Bundle\Controller\Controller;
use Raptor\Bundle\Annotations\Route;
use Raptor\Bundle\Annotations\Inyect;

/**
 * @Route("/:system/home")
 */
class DefaultController extends Controller{
    
    const INDEX=0;
    const ACTION=1;
    const DIR=2;
  
    const APPNAME="ngPortal";
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("",name="rux_home")
     * @Inyect("syntarsus,portal")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL, \Util\ngPortalBundle\Manager\ngPortalRegistry $portal=NULL) {
        $loguedUserEntity =  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
        $version="";
        return $this->render('@ngPortalBundle/home/ngIndex.html.twig',array(
            'modules'=>  $portal->get($route->getParam('system'))->hasSecurity()?$this->convertList($syntarsus->getUserMenu()):[],
            'username'=> $this->getSecurityUser()->get('username'),
            'idStructure'=> $loguedUserEntity->getIdEstructure()->getId(),
            'version'=>  $version,
            'appname'=>  self::APPNAME,
            'routename'=> $portal->get($route->getParam('system'))->getName(),
            'security'=>$portal->get($route->getParam('system'))->hasSecurity()
        ));
        
    }
    
    
    /**
     * Descripcion del componente
     *
     * @Route("/description")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function descriptionAction($request,$response,$route) {
        return $this->render('@ngPortalBundle/home/description.html.twig');
    }
    
    /**
     * Accion para el cierre de la sesion
     *
     * @Route("/logout",name="rux_logout")
     * @Inyect("portal")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function logoutAction($request,$response,$route,  \Util\ngPortalBundle\Manager\ngPortalRegistry $portal=NULL) {
        $this->app->getSecurity()->getManager()->logout();
        $this->app->getSession()->forgetSession();
        $this->redirect($this->app->request()->getScriptName().'/'.$portal->get($route->getParam('system'))->getName().'/home',false);
    }
    
    
    private function convertList($list) {
        $coverted=array();
        foreach ($list as $value) {
            $string=strstr($value['className'],"menu-",false);
            if(strstr($value['className'],"rux-home",false))
                continue;
            if($string)
                    $value['icon']=  str_replace('menu-', '', $string);
            if($value['type']==self::INDEX)
                $coverted[]=$value;
            if(!isset($value['children']))
                $value['children']=array();
            if($value['type']==self::DIR){
                $coverted[]=array(
                    'type'=>2,
                    'name'=>$value['name'],
                    'className'=>$value['className'],
                    'id'=>$value['id'],
                    'children'=>$this->secondLevel($value['children'])
               );
               
            }
        }
        return $coverted;
    }
    
    private function secondLevel($list) {
        $coverted=array();
        foreach ($list as $value) {
            $string=strstr($value['className'],"menu-",false);
            if(strstr($value['className'],"rux-home",false))
                continue;
            if($string)
                    $value['icon']=  str_replace('menu-', '', $string);
            if($value['type']==0)
                $coverted[]=$value;
            if($value['type']==2){
                $coverted=  array_merge($coverted,  $this->secondLevel($value['children']));
            }
        }
        return $coverted;
    }
}

?>
