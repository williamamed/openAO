<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Raptor2\EmailBundle\Manager;
/**
 * This class execute the logic to send emails
 * Need to configure in the options.yml the smtp transport
 * email:<br>
 * &nbsp;&nbsp;stmp_server: google.com<br>
 * &nbsp;&nbsp;smtp_port: 25<br>
 * &nbsp;&nbsp;smtp_user: some user<br>
 * &nbsp;&nbsp;smtp_password: some password<br>
 * 
 * @author Dinobyte
 */
class Email {
    
    private $transport;
    private $mailer;
    /**
     * Need to configure in the options.yml the smtp transport
     * email:<br>
     * &nbsp;&nbsp;stmp_server: google.com<br>
     * &nbsp;&nbsp;smtp_port: 25<br>
     * &nbsp;&nbsp;smtp_user: some user<br>
     * &nbsp;&nbsp;smtp_password: some password<br>
     */
    function __construct() {
        $config=  \Raptor\Raptor::getInstance()->getConfigurationLoader()->getConfOption();
        if (isset($config['email']) and isset($config['email']['smtp_server']) and isset($config['email']['smtp_port']) and isset($config['email']['smtp_user']) and isset($config['email']['smtp_password'])) {
            
            if(isset($config['email']['ssl']) and $config['email']['ssl']==true)
                $this->transport = \Swift_SmtpTransport::newInstance($config['email']['smtp_server'], $config['email']['smtp_port'], 'ssl');
            else
                $this->transport = \Swift_SmtpTransport::newInstance($config['email']['smtp_server'], $config['email']['smtp_port']);
            
            $this->transport->setUsername($config['email']['smtp_user']) 
                    ->setPassword($config['email']['smtp_password']);
            $this->mailer = \Swift_Mailer::newInstance($this->transport);
        }
        
    }
    /**
     * Send a email with the following parameters
     * [BE AWERE you need to configure in the options.yml the smtp transport]
     * 
     * email:<br>
     * &nbsp;&nbsp;stmp_server: google.com<br>
     * &nbsp;&nbsp;smtp_port: 25<br>
     * &nbsp;&nbsp;smtp_user: some user<br>
     * &nbsp;&nbsp;smtp_password: some password<br>
     * 
     * @param string $subject
     * @param array $from
     * @param array $to
     * @param string $body
     * @return integer
     * @throws \Exception
     */
    public function send($subject,$from,$to,$body) {
       if(!$this->mailer)
           throw new \Exception('The mailer configuration is not defined, problably you need to configure the framework in the options file YML with the values smtp_server, smtp_port, smtp_user, smtp_password');
        $message = \Swift_Message::newInstance($subject)
          ->setFrom($from)
          ->setTo($to)
          ->setBody($body);

        // Send the message
        return $this->mailer->send($message);
    }
    /**
     * Return the mailer of this handler
     * @return \Swift_Mailer
     */
    public function getMailer() {
        return $this->mailer;
    }
    /**
     * Create a Swift_Message
     * 
     * @param string $subject
     * @return \Swift_Message
     */
    public function createMessage($subject) {
        return \Swift_Message::newInstance($subject);
    }

}

?>
