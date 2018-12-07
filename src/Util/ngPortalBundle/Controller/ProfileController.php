<?php

/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace Util\ngPortalBundle\Controller;

use Raptor\Bundle\Annotations\Route;
use Raptor\Bundle\Annotations\Inyect;
use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/:system/profile")
 */
class ProfileController extends Controller {

    /**
     * Panel de control del duenno o usuario
     *
     * @Route("")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function profileAction($request, $response, $route) {
        $id = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username' => $this->getSecurityUser()->get('username')));

        return $this->render('@ngPortalBundle/profile/userprofile.html.twig', array(
                        'username' => $this->getSecurityUser()->get('username'),
                        'nombre' => $id->getFullname(),
                        'email' => $id->getEmail(),
                        'user' => $id,
                        'imagen' => $id->getIcon()
                    ));
    }

    /**
     * 
     *
     * @Route("/profiledata")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function profiledataAction($request, $response, $route) {
        $user = $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username' => $this->getSecurityUser()->get('username')));

        $user->setEmail($request->post('email'));
        $user->setFullname($request->post('fullname'));
        $this->getStoreManager()->persist($user);
        $this->getStoreManager()->flush();

        return $this->show("Los datos personales fueron actualizados.");
    }

    /**
     * Panel de control del duenno o usuario de un negocio
     *
     * @Route("/changepass")
     * @Inyect("syntarsus")
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function changepassAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL) {
        $result = $syntarsus->changeUserPassword($this->getSecurityUser()->get('username'), $request->post('current_password'), $request->post('password'), $msg);
        //Checking if any error in the operation
        if (!$result)
            return $this->show("<div style='width:300px'>$msg</div>", true, Controller::ERROR);
        return $this->show("La contraseña fue cambiada con éxito.");
    }

    /**
     * @Route("/uploadprocess")
     * @RouteName profile_upload
     * 
     * @param \Raptor\http\Request $request
     * @param type $response
     * @param type $route
     * @return type
     */
    public function uploadAction($request, $response, $route) {

        $img = $request->file('file_data');
        $rand = rand(0, 500000);
        $web = \Raptor\Core\Location::get(\Raptor\Core\Location::WEBBUNDLES);
        if (!file_exists($web . '/security_photos'))
            mkdir($web . '/security_photos', 0777, true);


        if ($img->get('name') != "") {

            $this->moveUploadFileTo('file_data', $web . '/security_photos/' . $rand . "_" . $img->get('name'));
        }

        $user = $this->getStoreManager()
                ->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username' => $this->getSecurityUser()->get('username')));

        if ($user->getIcon() AND file_exists($web . '/security_photos/' . $user->getIcon()))
            unlink($web . '/security_photos/' . $user->getIcon());

        $user->setIcon($rand . '_' . $img->get('name'));
        $this->getStoreManager()->persist($user);
        $this->getStoreManager()->flush();
        $mensajeFinal = "Su imagen de perfil fue salvada";
        return $this->show($mensajeFinal, true, Controller::INFO, array(
                    'image' => $rand . "_" . $img->get('name')
        ));
    }

}

?>
