<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace Util\RUXBundle\Controller;

use Raptor\Bundle\Annotations\Route;
use Raptor\Bundle\Annotations\Inyect;
use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/:system/home")
 */
class DefaultController__AopProxied extends Controller{
    
    const INDEX=0;
    const ACTION=1;
    const DIR=2;
    
    const VERSION="v1.0.0";
    const APPNAME="RUX";
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("",name="rux_home")
     * @Inyect("syntarsus")
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
        $loguedUserEntity =  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username'=>$this->getSecurityUser()->get('username')));
        
        return $this->render('@RUXBundle/home/ngIndex.html.twig',array(
            'modules'=>  $this->convertList($syntarsus->getUserMenu()),
            'username'=> $this->getSecurityUser()->get('username'),
            'idStructure'=> $loguedUserEntity->getIdEstructure()->getId(),
            'version'=>  self::VERSION,
            'appname'=>  self::APPNAME,
            'routename'=> \Util\RUXBundle\RUXBundle::getName()
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
        return $this->render('@RUXBundle/home/description.html.twig');
    }
    
    /**
     * Accion para el cierre de la sesion
     *
     * @Route("/logout",name="rux_logout")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function logoutAction($request,$response,$route) {
        $this->app->getSecurity()->getManager()->logout();
        $this->app->getSession()->forgetSession();
        $this->redirect($this->app->request()->getScriptName().'/'.\Util\RUXBundle\RUXBundle::getName().'/home',false);
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

include_once AOP_CACHE_DIR . '/_proxies/Util\\RUXBundle\\Controller\\DefaultController.php';



?>
