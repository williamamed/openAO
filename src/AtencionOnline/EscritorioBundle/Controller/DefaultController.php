<?php
/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace AtencionOnline\EscritorioBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/portal")
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
        return $this->render('@EscritorioBundle/portal/index.html.twig');
    }
    
    /**
     * 
     *
     * @Route("/cargarperfil")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function perfilAction($request,$response,$route) {
        $user=  $this->getSecurityUser();
        $userObj=  $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')->findOneBy(array('username'=>$user->get('username')));
        $perfil=new \Raptor\Util\ItemList();
        $perfil->set('username', $user->get('username'));
        $perfil->set('name', $userObj->getFullname());
        $icon=$userObj->getIcon();
        $web=  \Raptor\Core\Location::get(\Raptor\Core\Location::WEBBUNDLES);
        if($icon and file_exists($web.'/security_photos/'.$icon))
            $perfil->set('nick',$icon);
        else
            $perfil->set('nick','../AtencionOnline/Escritorio/login/account.png');
        /**
        $perfil->set('portalmsg',array(
            'text'=> $this->render('@EscritorioBundle/portal/info.html.twig'),
            'author'=>array(
                'img'=>'AtencionOnline/Escritorio/portal/desktop/images/title.png'
            ),
            'style'=> array(
                'background'=>'#0661B8'
            ),
            'position'=> array(
                'top'=>'20px',
                'right'=>'20px'
            ),
            'seconds'=>20
        ));**/
        return $this->JSON($perfil);
    }
    
    /**
     * 
     *
     * @Route("/listfunctions")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listFunctionsAction($request,$response,$route) {
        
        return $this->JSON($this->service()->getPrivate('SyntarsusBundle')->getUserMenu());
    }
    
    /**
     * 
     *
     * @Route("/cerrar")
     * @Description Cierra la session del usuario actual
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function cerrarAction($request,$response,$route) {
        $this->app->getSecurity()->logout();
        $this->redirect('_portal');
        
    }
    
    /**
     * 
     *
     * @Route("/password")
     * @Description Cambia la contraseña del usuario
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function passwordAction($request,$response,$route) {
        $result=$this->service()->getPrivate('SyntarsusBundle')->changeUserPassword($this->getSecurityUser()->get('username'),  $request->post('currentpassword'),$request->post('password'), $msg);
        //Checking if any error in the operation
        if(!$result)
            return $this->show ($msg, true, Controller::ERROR);
        return $this->show ("La contraseña fue cambiada con éxito.");
        
    }
}

?>
