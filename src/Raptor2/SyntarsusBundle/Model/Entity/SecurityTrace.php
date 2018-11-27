<?php

namespace Raptor2\SyntarsusBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Raptor2\SyntarsusBundle\Model\Entity\SecurityTrace
 *
 * @Table(name="security_trace")
 * @Entity(repositoryClass="Raptor2\SyntarsusBundle\Model\Repository\SecurityTraceRepository")
 */
class SecurityTrace
{
    /**
     * @var integer $id
     *
     * @Column(name="id", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string $username
     *
     * @Column(name="username", type="string", length=255, nullable=false)
     */
    private $username;

    /**
     * @var string $ip
     *
     * @Column(name="ip", type="string", length=255, nullable=false)
     */
    private $ip;

    /**
     * @var datetime $aDate
     *
     * @Column(name="a_date", type="datetime", nullable=false)
     */
    private $aDate;

    /**
     * @var integer $state
     *
     * @Column(name="state", type="integer", nullable=false)
     */
    private $state;

    /**
     * @var text $log
     *
     * @Column(name="log", type="text", nullable=false)
     */
    private $log;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return SecurityTrace
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set ip
     *
     * @param string $ip
     * @return SecurityTrace
     */
    public function setIp($ip)
    {
        $this->ip = $ip;
        return $this;
    }

    /**
     * Get ip
     *
     * @return string 
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set aDate
     *
     * @param datetime $aDate
     * @return SecurityTrace
     */
    public function setADate($aDate)
    {
        $this->aDate = $aDate;
        return $this;
    }

    /**
     * Get aDate
     *
     * @return datetime 
     */
    public function getADate()
    {
        return $this->aDate;
    }

    /**
     * Set state
     *
     * @param integer $state
     * @return SecurityTrace
     */
    public function setState($state)
    {
        $this->state = $state;
        return $this;
    }

    /**
     * Get state
     *
     * @return integer 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set log
     *
     * @param text $log
     * @return SecurityTrace
     */
    public function setLog($log)
    {
        $this->log = $log;
        return $this;
    }

    /**
     * Get log
     *
     * @return text 
     */
    public function getLog()
    {
        return $this->log;
    }
}