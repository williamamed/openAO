<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace Raptor2\PutOffLineBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/putoffline")
 * @author Dinobyte SL Group
 */
class DefaultController extends Controller{
    
    /**
     * Add your definition Route and the RouteName[optional]
     *
     * @Route("")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request,$response,$route) {
        $saved="";
        
        if($request->isPost()){
            $saved="La configuración fue salvada correctamente";
            $conf=date_parse_from_format('m/d/Y g:i A', $request->post('day'));
            $conf['exclude']=$request->post('listed');
            $conf['dayr']=$request->post('day');
            if($request->post('active')=='on'){
                file_put_contents (__DIR__.'/../Data/active',"");
            }else
                @unlink (__DIR__.'/../Data/active');
            file_put_contents(__DIR__.'/../Data/conf.json', json_encode($conf,JSON_PRETTY_PRINT));
            $this->app->contentType('text/html; charset=UTF-8');
            if($request->post('listed')){
                $listed=explode(';',$request->post('listed'));
                unset($listed[count($listed)-1]);
            }else 
                $listed=array();
            $day=$request->post('day');
        }else{
            if(file_exists(__DIR__.'/../Data/conf.json')){
                $info=  json_decode(file_get_contents(__DIR__.'/../Data/conf.json'),true);
                $day=$info['dayr'];
                $listed=explode(';',$info['exclude']);
                unset($listed[count($listed)-1]);
                
            }
        }
        
        return $this->render('@PutOffLineBundle/conf/index.html.twig',array(
            'ip'=>$request->getIp(),
            'saved'=>$saved,
            'day'=>$day,
            'listed'=>  $listed,
            'active'=>  file_exists(__DIR__.'/../Data/active')?'checked':''
        ));
    }
    
    
}

?>
