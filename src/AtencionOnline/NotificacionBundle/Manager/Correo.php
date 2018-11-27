<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

namespace AtencionOnline\NotificacionBundle\Manager;

/**
 * Description of Correo
 *
 * @author amed
 */
class Correo {

    const CORREO_SYSTEM = 'atenciononline@ltu.jovenclub.cu';

    /**
     *
     * @var \Raptor2\EmailBundle\Manager\Email
     */
    private $email;

    /**
     *
     * @var \Raptor\Raptor 
     */
    private $app;
    private $remitente;

    function __construct() {
        $this->app = \Raptor\Raptor::getInstance();
        $this->email = $this->app->getInyector()->get('Email');
        $config = \Raptor\Raptor::getInstance()->getConfigurationLoader()->getConfOption();
        if (isset($config['email']) and isset($config['email']['smtp_fullemail'])) {
            $this->remitente = $config['email']['smtp_fullemail'];
        } else {
            $this->remitente = 'sinremitente';
        }
    }

    public function upStructure($id, &$list) {
        if ($id != 0) {
            $node = $this->app->getStore()->getManager()->find('SyntarsusBundle:SecurityEstructure', $id);
            if (true) {
                $list[] = $node->getBelongs();
                $this->upStructure($node->getBelongs(), $list);
            }
        }
    }

    /**
     * Notifica por correo a los usuarios de las estructuras sobre
     * el registro de una nueva incidencia
     * 
     * @param \AtencionOnline\LogicaBundle\Model\Entity\Incidencias $incidencia
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $estrc
     * 
     */
    public function notificacionRegistroIncidencia($incidencia, $estrc) {


        if ($this->email and $this->email->getMailer()) {

            $emails = $this->getUsers($estrc);

            if (count($emails) > 0) {

                foreach ($emails as $email => $u) {

                    $message = $this->email->createMessage('Notificación de registro de incidencia')
                            ->setFrom(array($this->remitente => 'openAO'))
                            ->setTo(array($email))
                            ->setBody($this->app->render('@NotificacionBundle/tramite.twig', array(
                                'notification_title' => "Nueva incidencia",
                                'notification_subtitle' => "Incidencia registrada en " . $estrc->getName(),
                                'notification' => (($incidencia->getIdViasComunicacion()->getAnonimo()) ? "Anónimo : " : "Cliente " . $incidencia->getNombreApellidos() . ": " ) . $incidencia->getPlanteamiento(),
                                'notification_url' => $this->app->request()->getUrl().$this->app->request()->getRootUri(),
                                'notification_unsubscribe' => $this->app->request()->getUrl().$this->app->request()->getRootUri() . '/unsubscribe?uid=' . urlencode(\AtencionOnline\PublicoBundle\Crypt\Crypto::encrypt($u->getId()))
                            )), 'text/html');

                    $this->email->getMailer()->send($message);
                }
            }
        }
    }

    /**
     * Notifica por correo a los usuarios de las estructuras sobre
     * el registro de una nueva incidencia
     * 
     * @param \AtencionOnline\LogicaBundle\Model\Entity\Incidencias $incidencia
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $estrc
     * 
     */
    public function notificacionRegistroPublicoIncidencia($incidencia, $estrc) {

        
        if ($this->email and $this->email->getMailer()) {
            
            $emails = $this->getUsers($estrc);
            
            if (count($emails) > 0) {

                foreach ($emails as $email => $u) {

                    $message = $this->email->createMessage('Notificación de registro de incidencia')
                            ->setFrom(array($this->remitente => 'openAO'))
                            ->setTo(array($email))
                            ->setBody($this->app->render('@NotificacionBundle/tramite.twig', array(
                                'notification_title' => "Nueva incidencia",
                                'notification_subtitle' => "Incidencia registrada en " . $estrc->getName() . "(Formulario público)",
                                'notification' => "Cliente " . $incidencia->getNombreApellidos() . ": " . $incidencia->getPlanteamiento(),
                                'notification_url' => $this->app->request()->getUrl().$this->app->request()->getRootUri(),
                                'notification_unsubscribe' => $this->app->request()->getUrl().$this->app->request()->getRootUri() . '/unsubscribe?uid=' . urlencode(\AtencionOnline\PublicoBundle\Crypt\Crypto::encrypt($u->getId()))
                            )), 'text/html');

                    $this->email->getMailer()->send($message);
                }
            }
        }
    }

    /**
     * Notifica por correo a los usuarios de las estructuras sobre
     * el registro de una nueva incidencia
     * 
     * @param \AtencionOnline\LogicaBundle\Model\Entity\Incidencias $incidencia
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $estrc
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $orig
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityUser $user
     */
    public function notificacionTrasladoIncidencia($incidencia, $estrc, $orig) {


        if ($this->email and $this->email->getMailer()) {
            $emails = $this->getUsers($estrc);

            if (count($emails) > 0) {

                foreach ($emails as $email => $u) {

                    $message = $this->email->createMessage('Notificación de traslado de incidencia')
                            ->setFrom(array($this->remitente => 'openAO'))
                            ->setTo(array($email))
                            ->setBody($this->app->render('@NotificacionBundle/tramite.twig', array(
                                'notification_title' => "Translado de incidencia",
                                'notification_subtitle' => "Trasladada desde " . $orig->getName() . " hacia " . $estrc->getName(),
                                'notification' => $incidencia->getPlanteamiento(),
                                'notification_url' => $this->app->request()->getUrl().$this->app->request()->getRootUri(),
                                'notification_unsubscribe' => $this->app->request()->getUrl().$this->app->request()->getRootUri() . '/unsubscribe?uid=' . urlencode(\AtencionOnline\PublicoBundle\Crypt\Crypto::encrypt($u->getId()))
                            )), 'text/html');
                    $this->email->getMailer()->send($message);
                }
            }
        }
    }

    /**
     * Notifica por correo a los usuarios de las estructuras sobre
     * el registro de una nueva incidencia
     * 
     * @param \AtencionOnline\LogicaBundle\Model\Entity\Incidencias $incidencia
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $estrc
     * 
     */
    public function notificacionTramiteIncidencia($incidencia, $estrc) {


        if ($this->email and $this->email->getMailer()) {

            $emails = $this->getUsers($estrc);


            if (count($emails) > 0) {

                foreach ($emails as $email => $u) {


                    $message = $this->email->createMessage('Notificación de trámite de incidencia')
                            ->setFrom(array($this->remitente => 'openAO'))
                            ->setTo(array($email))
                            ->setBody($this->app->render('@NotificacionBundle/tramite.twig', array(
                                'notification_title' => "Trámite de incidencia",
                                'notification_subtitle' => (($incidencia->getIdViasComunicacion()->getAnonimo()) ? "Anónimo : " : "Cliente " . $incidencia->getNombreApellidos() . ": " ),
                                'notification' => 'Respuesta: ' . $incidencia->getRespuesta(),
                                'notification_conforme' => 'Conforme: ' . (($incidencia->getConforme()) ? 'Sí' : 'No'),
                                'notification_planteamiento' => 'Planteamiento original: ' . $incidencia->getPlanteamiento(),
                                'notification_url' => $this->app->request()->getUrl().$this->app->request()->getRootUri(),
                                'notification_unsubscribe' => $this->app->request()->getUrl().$this->app->request()->getRootUri() . '/unsubscribe?uid=' . urlencode(\AtencionOnline\PublicoBundle\Crypt\Crypto::encrypt($u->getId()))
                            )), 'text/html');
                    $this->email->getMailer()->send($message);
                }
            }
        }
    }

    /**
     * Notifica por correo a el usuario registrado
     * 
     * 
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityUser $user
     * @param string $pass
     */
    public function notificacionRegistroUsuario($user, $pass) {


        if ($this->email and $this->email->getMailer() and $user->getEmail()) {

            $message = $this->email->createMessage('Su cuenta en openAO ha sido creada')
                    ->setFrom(array($this->remitente => 'openAO'))
                    ->setTo(array($user->getEmail()))
                    ->setBody($this->app->render('@NotificacionBundle/nuevousuario.twig', array(
                        'notification_title' => "Usted ha sido registrado en el sistema de openAO",
                        'notification_subtitle' => "En este correo encontrará la información de su cuenta ",
                        'notification' => "Nombre completo: " . $user->getFullname(),
                        'notification_email' => "Correo: " . $user->getEmail(),
                        'notification_access' => "Sus datos de acceso son los siguientes",
                        'notification_username' => "Nombre de usuario: " . $user->getUsername(),
                        'notification_password' => "Contraseña " . $pass,
                        'notification_url' => $this->app->request()->getUrl().$this->app->request()->getRootUri()
                    )), 'text/html');
            $this->email->getMailer()->send($message);
        }
    }

    /**
     * Notifica por correo a el usuario registrado
     * 
     * 
     * @param \Raptor2\SyntarsusBundle\Model\Entity\SecurityUser $user
     * @param string $pass
     */
    public function enviarMensaje($correo, $nombre, $texto, $img) {


        if ($this->email and $this->email->getMailer() and $correo) {

            $message = $this->email->createMessage('Mensaje a Fidel(AtencionOnline)')
                    ->setFrom(array($this->remitente => 'AtencionOnline'))
                    ->setTo(array($correo))
                    ->setBody("Nombre: $nombre<br>Mensaje: $texto", 'text/html');
            if ($img)
                $message->attach(\Swift_Attachment::fromPath($img));
            $this->email->getMailer()->send($message);
        }
    }

    private function getUsers($estrc) {
        $list = array($estrc->getId());
        $this->upStructure($estrc->getId(), $list);
        $query = $this->app->getStore()->getManager()->createQuery('select u from \Raptor2\SyntarsusBundle\Model\Entity\SecurityUser u where u.idEstructure IN (:list)');
        $query->setParameter('list', $list);
        $users = $query->getResult();
        $emails = array();
        foreach ($users as $value) {
            if ($value->getEmail()) {
                if ($value->getExtraData()) {
                    $data = json_decode($value->getExtraData(), true);
                    if ($data && isset($data['ao:notification']) && $data['ao:notification'] == false) {
                        
                    }else{
                        $emails[$value->getEmail()] = $value;
                    }
                } else
                    $emails[$value->getEmail()] = $value;
            }
        }
        return $emails;
    }

}

?>
