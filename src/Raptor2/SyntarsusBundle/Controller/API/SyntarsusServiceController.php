<?php

/**
 * Raptor - Integration PHP 5 framework
 *
 * @author      William Amed <watamayo90@gmail.com>, Otto Haus <ottohaus@gmail.com>
 * @copyright   2014 
 * @link        http://dinobyte.net
 * @version     2.0.1
 * @package     Raptor
 *
 * MIT LICENSE
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
namespace Raptor2\SyntarsusBundle\Controller\API;
use Raptor\Bundle\Annotations\Api;
use Raptor\Util\ItemList;
use Raptor\Security\SecureHash;
/**
 * This class is only to describe the Services functioning<br>
 * To use this methods please call $this->service()->getPrivate('SyntarsusBundle')->[the method name]
 * 
 */
class SyntarsusServiceController extends \Raptor\Bundle\Controller\Controller{
    
    /**
     * <h4>changeUserPassword($username, $old, $new, $msg)</h4><br>
     * 
     * Servicio interno para actualizar la contraseña del usuario especificado.<br>
     * La nueva contraseña deberá tener una longitud mayor que 7, caracteres especiales y letras en mayúsculas, 
     * en caso contrario será marcada como inválida.
     *
     * <b>Esta función espera 4 parámetros:</b><br>
     * 
     * <b>username</b> (el usuario que le será modificada la contraseña)<br>
     * <b>old</b> (La contraseña actual del usuario)<br>
     * <b>new</b> (La nueva contraseña a establecer)<br>
     * <b>&msg</b> (Variable que será llenada con un mensaje de error si la operación falla)<br>
     * 
     * <b>Retorno</b> Boolean True Si la contraseña fue modificada con éxito, false en caso contrario
     * 
     * <b>Esta función podrá ser invocada a través del contenedor de dependencias de la siguiente manera:</b>
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->changeUserPassword('miranda','Miranda123','M123TypingNewPass45TY', $msg);
     * //Verificar si ocurrio algun error en la operacion
     * if(!$result)
     *  return $msg;
     * 
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     */
    public function changeUserPassword($username, $old, $new, &$msg = '') {

        $user = $this->app->getStore()
                ->getManager()
                ->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username' => $username));
        if ($user) {
            $theUser = $user;
            $valid = SecureHash::verify($old, $theUser->getPassword());
            if ($valid) {
                if ($this->validatePassword($new)) {
                    $theUser->setPassword(SecureHash::hash($new));
                    $this->app->getStore()->getManager()->persist($theUser);
                    $this->app->getStore()->getManager()->flush();
                    return TRUE;
                } else {
                    $msg = $this->lang('passstrong', '\Raptor2\SyntarsusBundle\SyntarsusBundle');
                    return FALSE;
                }
            } else {
                $msg = $this->lang('beforepass', '\Raptor2\SyntarsusBundle\SyntarsusBundle');
                return FALSE;
            }
        } else {
            $msg = $this->lang('userexist', '\Raptor2\SyntarsusBundle\SyntarsusBundle');
            return FALSE;
        }
    }
    
    /**
     * <h4>getUserMenu()</h4><br>
     * 
     * Este método retorna el menú correspodiente al usuario autenticado según su definición actual de rol.
     * Debes notar que el menú de usuario es contruido de acuerdo a la misma estructura definida en el manejador de privilegios.
     * Devuelve solo los privilegios a los que el usuario autenticado tiene permisos para acceder.
     * 
     * <b>Retorna</b> Array Un array que representa el menú del usuario, es retornado con los atributos de los privilegios.
     * 
     * <b>Estructura de los item del array:</b>
     * <b>-className</b> <i>Almacena la clase css que le fue seteada al privilegio</i>
     * <b>-name</b> <i>Almacena el nombre del privilegio</i>
     * <b>-type</b> <i>El tipo determina si el privilegio es un agrupador, acción o privilegio en concreto</i>
     * <b>-route</b> <i>Si el privilegio no es un agrupador entonces contiene la ruta de acceso a la funcionalidad</i>
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->getUserMenu();
     * 
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     */
    public function getUserMenu() {
        if (!$this->app->getSecurity()->isAuthenticated())
            return array();
        if (!$this->getSecurityUser()->get('rol'))
            return array();
        $roles = explode(',', $this->getSecurityUser()->get('rol'));
        if (!$roles)
            return array();
        $privileges = $this->getStore()
                ->getManager()
                ->getRepository('SyntarsusBundle:SecurityUser')
                ->findPrivilegesByRol($this->getSecurityUser()->get('username'), $roles);

        $ownPrivilege = new ItemList($privileges);
        $ownPrivilege->toArray(function(&$item) {
            if ($item['idRol'])
                $item['idRol'] = '';
        });

        $listPrivilege = new \Raptor\Util\ItemList();

        foreach ($ownPrivilege as $value) {
            if ($value['belongs'] == 0) {
                $childs = $this->findChildsMenu($value, $ownPrivilege->getArray());
                if (count($childs) > 0) {
                    $value['children'] = $childs;
                }
                if ($value['type'] == \Raptor2\SyntarsusBundle\Controller\PrivilegeController::DIR || $value['type'] == \Raptor2\SyntarsusBundle\Controller\PrivilegeController::INDEX)
                    $listPrivilege->add($value);
            }
        }
        return $listPrivilege->toArray();
    }
    
    /**
     * <h4>listAllUserStructure()</h4><br>
     * 
     * Retorna toda la estructura organizacional a la que el usuario autenticado tiene permitido acceder.
     * 
     * <b>Retorna</b> Array Un array que representa el arból de estructura
     * 
     * <b>La estructura del los Item del array:</b>
     * <b>-description</b> <i>La descripción de la estructura</i>
     * <b>-name</b> <i>Nombre de la estructura</i>
     * <b>-category</b> <i>Categoría con la que fue clasificada la estructura</i>
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->listAllUserStructure();
     * 
     * }
     * 
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     */
    public function listAllUserStructure() {
        if (!$this->app->getSecurity()->isAuthenticated())
            return array();

        $result = $this->getStore()
                ->getManager()
                ->getRepository('SyntarsusBundle:SecurityUser')
                ->findOneBy(array('username' => $this->getSecurityUser()->get('username')));

        if ($result) {
            $userEntity = $result;
            $estructure = $userEntity->getIdEstructure();
            $resulting = new ItemList();
            if ($estructure) {
                $allEstructure = new ItemList($this->app->getStore()
                                ->getManager()
                                ->getRepository('SyntarsusBundle:SecurityEstructure')
                                ->findAll());
                $allEstructure->toArray();
                $parentEstruct = new ItemList();
                $parentEstruct->add($estructure);
                $parentEstruct->toArray(function(&$item) {
                    if ($item['idCategory']) {
                        $item['category'] = $item['idCategory']->getName();
                        $item['idCategory'] = $item['idCategory']->getId();
                    }
                });
                $finalarray = $parentEstruct->getArray();
                $this->estructureChild($finalarray[0], $allEstructure->getArray(), $resulting);

                if ($resulting->size() > 0)
                    $finalarray[0]['children'] = $resulting->getArray();
                return $finalarray;
            }
        }
        return array();
    }
    
    /**
     * <h4>getStructureAllChilds($id)</h4><br>
     * 
     * Retorna recursivamente la estructura a la que el usuario tiene permisos a acceder.
     * 
     * <b>Retorna</b> Array Un array con toda la estructura
     * 
     * <b>La estructura del los Item del array:</b>
     * <b>-description</b> <i>La descripción de la estructura</i>
     * <b>-name</b> <i>Nombre de la estructura</i>
     * <b>-category</b> <i>Categoría con la que fue clasificada la estructura</i>
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->getStructureAllChilds(5);
     * 
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     */
    public function getStructureAllChilds($id) {
        return $this->getStoreManager()->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($id);
    }
    
    /**
     * <h4>listUserStructureByDemand($id=0)</h4><br>
     * 
     * Retorna la estructura cargada por demanada del usuario autenticado, solo será retornado los hijos del nodo especificado.
     * Si el nodo especificado es 0 entonces este método retorna la estructura base para el usuario. 
     * 
     * <b>Retorna</b> Array Un array con toda la estructura de un nivel
     * 
     * <b>La estructura del los Item del array:</b>
     * <b>-description</b> <i>La descripción de la estructura</i>
     * <b>-name</b> <i>Nombre de la estructura</i>
     * <b>-category</b> <i>Categoría con la que fue clasificada la estructura</i>
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * //Retorna la estructura base o de primer nivel del usuario autenticado
     * $result=$syntarsus->listUserStructureByDemand();
     * 
     * //o retorna las estructuras hijas de un nodo en especifico
     * $result=$syntarsus->listUserStructureByDemand(5);
     * 
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     */
    public function listUserStructureByDemand($id = 0) {
        if (!$this->app->getSecurity()->isAuthenticated())
            return array();
        if ($id == 0) {

            $user = $this->getStore()
                    ->getManager()
                    ->getRepository('SyntarsusBundle:SecurityUser')
                    ->findOneBy(array('username' => $this->getSecurityUser()->get('username')));
            if (!$user)
                return array();
            $node = $user->getIdEstructure();
            $list = new ItemList();

            $list->add($node);
            return $list->toArray(function(&$item) {
                        if ($item['idCategory']) {
                            $item['category'] = $item['idCategory']->getName();
                            $item['idCategory'] = $item['idCategory']->getId();
                        }
                    });
        } else {
            $node = $id;
            $list = new ItemList($this->app->getStore()
                            ->getManager()
                            ->getRepository('SyntarsusBundle:SecurityEstructure')
                            ->findBy(array('belongs' => $node)));
            return $list->toArray(function(&$item) {
                        if ($item['idCategory']) {
                            $item['category'] = $item['idCategory']->getName();
                            $item['idCategory'] = $item['idCategory']->getId();
                        }
                    });
        }
    }
    
    /**
     * <h4>registerUser($userFullName, $username, $email, $password, $rolname, $structurename, &$msg)</h4><br>
     * 
     * Registra un nuevo usuario al sistema de seguridad.
     * [Tenga en cuenta que al registrar el usuario deberá activarlo vía servicio o en el manejador de usuarios]<br>
     *
     * <b>Esta función espera 7 parámetros:</b><br>
     * 
     * <b>$userFullName</b> (El nombre completo del usuario a adicionar)<br>
     * <b>$username</b> (El nombre usuario a utilizar)<br>
     * <b>$email</b> (Correo electrónico)<br>
     * <b>$password</b> (la contraseña del usuario)<br>
     * <b>array $rolnames</b> (Un listado de roles para el usuario, los roles deberán existir previamente en el manejador de roles)<br>
     * <b>$structurename</b> (El nombre de la estructura a la que pertenecerá este usuario, la estructura deberá existir en el manejador de estructuras)<br>
     * <b>&msg</b> (Variable que será llenada con un mensaje de error si la operación falla)<br>
     * 
     * <b>Retorna</b> Boolean True Si el usuario fue adicionado correctamente, false en caso contrario
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->registerUser('Miranda Aguilera','miranda','miranda@gmail.com','M123TypingNewPass45TY','admin','Raptor2', &$msg);
     * //Verificar algun error en la operacion
     * if(!$result)
     *  return $msg;
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     * 
     */
    public function registerUser($userFullName, $username, $email, $password, array $rolnames, $estructurename, &$msg) {
        if ($rolnames != null && sizeof($rolnames) > 0) {
            $roles = $this->app->getStore()
                    ->getManager()
                    ->getRepository('SyntarsusBundle:SecurityRol')
                    ->findBy(array('name' => $rolnames));
            if (!$roles || sizeof($roles) < sizeof($rolnames)) {
                $msg = "There are " . (sizeof($rolnames) - sizeof($roles)) . " rolnames that dosn't exist";
                return false;
            }
        }
        $users = new ItemList($this->app->getStore()
                        ->getManager()
                        ->getRepository('SyntarsusBundle:SecurityUser')
                        ->findBy(array('username' => $username)));

        $estructure = $this->app->getStore()
                ->getManager()
                ->getRepository('SyntarsusBundle:SecurityEstructure')
                ->findOneBy(array('name' => $estructurename));


        if ($users->size() > 0) {
            $msg = "<div style='max-width:300px'>El usuario <b>$username</b> no se encuentra disponible, por favor utilice otro nombre de usuario</div>";
            return false;
        }
        if (!$estructure) {
            $msg = "La estructura $estructurename no existe.";
            return false;
        }


        $user = new \Raptor2\SyntarsusBundle\Model\Entity\SecurityUser();
        $user->setFullname($userFullName);
        $user->setUsername($username);
        $user->setEmail($email);
        if ($roles != null && sizeof($roles) > 0) {
            foreach ($roles as $rolename) {
                $user->addSecurityRol($rolename);
            }
        }
        $user->setIdEstructure($estructure);
        if (!$this->validatePassword($password)) {
            $msg = $this->lang('passstrong', '\Raptor2\SyntarsusBundle\SyntarsusBundle');
            return false;
        }
        $user->setPassword(SecureHash::hash($password));

        $this->app->getStore()->getManager()->persist($user);
        $this->app->getStore()->getManager()->flush();
        return true;
    }
    
    /**
     * <h4>changeStateUser($username, $state, &$msg)</h4><br>
     * 
     * Modifica el estado de un usuario registrado, TRUE para establecer estado activo del usuario, FALSE para inactivo.
     * 
     * <b>Esta función espera 3 parámetros:</b><br>
     * 
     * <b>username</b> (El usuario al cual le será modificado el estado)<br>
     * <b>state</b> (El estado a establecer TRUE o FALSE)<br>
     * <b>&msg</b> (Variable que será llenada con un mensaje de error si la operación falla)<br>
     * 
     * <b>Retorna</b> Boolean True Si el estado fue modificado correctamente, false en caso contrario
     * 
     * <b>Ejemplo</b>
     * use Raptor\Bundle\Annotations\Inyect;
     * 
     * /**
     *  * \@Inyect("$syntarsus")
     *  *
     *  *\/
     * public function ejemploAction($request, $response, $route, \Raptor2\SyntarsusBundle\Controller\API\SyntarsusServiceController $syntarsus=NULL){
     * 
     * $result=$syntarsus->changeStateUser('miranda', true, $msg);
     * //Verificar algun error en la operacion
     * if(!$result)
     *  return $msg;
     * }
     * 
     * @Api(name="Security Module",category="Syntarsus",version="2.0.1")
     * 
     */
    public function changeStateUser($username, $state, &$msg) {
        $users = $this->app->getStore()
                        ->getManager()
                        ->getRepository('SyntarsusBundle:SecurityUser')
                        ->findOneBy(array('username' => $username));

        if (!$users) {
            $msg = "El usuario $username no existe.";
            return false;
        }

        $user = $users;
        $user->setState($state);
        $this->app->getStore()->getManager()->persist($user);
        $this->app->getStore()->getManager()->flush();
        return true;
    }
    
    
    private function validatePassword($pass) {
        $alfa = '!@#$%^&*()_+~:{}[];><?,.';
        $num = '1234567890';
        if (strlen($pass) < 7)
            return FALSE;
        $numbers = false;
        for ($index = 0; $index < strlen($num); $index++) {
            for ($index1 = 0; $index1 < strlen($pass); $index1++) {
                if ($num[$index] === $pass[$index1])
                    $numbers = TRUE;
            }
        }
        if ($numbers == TRUE)
            for ($index = 0; $index < strlen($alfa); $index++) {
                for ($index1 = 0; $index1 < strlen($pass); $index1++) {
                    if ($alfa[$index] === $pass[$index1])
                        return TRUE;
                }
            }
        return FALSE;
    }

    private function findChildsMenu($parent, $all) {
        $childs = array();
        foreach ($all as $value) {
            if ($parent['id'] === $value['belongs']) {
                if ($value['type'] == \Raptor2\SyntarsusBundle\Controller\PrivilegeController::DIR || $value['type'] == \Raptor2\SyntarsusBundle\Controller\PrivilegeController::INDEX) {

                    $childs[] = $value;
                    $my = $this->findChildsMenu($value, $all);
                    $countChilds = count($childs) - 1;

                    if (count($my) > 0) {
                        $childs[$countChilds]['children'] = $my;
                    }
                }
            }
        }
        return $childs;
    }

    private function estructureChild($estructure, $all, &$list) {
        foreach ($all as $value) {
            if ($value['belongs'] == $estructure['id']) {
                $my = new ItemList();
                $this->estructureChild($value, $all, $my);
                if ($my->size() > 0)
                    $value['children'] = $my->getArray();
                if ($value['idCategory']) {
                    $value['category'] = $value['idCategory']->getName();
                    $value['idCategory'] = $value['idCategory']->getId();
                }


                $list->add($value);
            }
        }
    }
}

?>
