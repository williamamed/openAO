<?php

namespace AtencionOnline\MensajeriaBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\MensajeriaBundle\Model\Entity\Buzon
 *
 * @Table(name="buzon")
 * @Entity(repositoryClass="AtencionOnline\MensajeriaBundle\Model\Repository\BuzonRepository")
 */
class Buzon
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
     * @var string $asunto
     *
     * @Column(name="asunto", type="string", length=100, nullable=false)
     */
    private $asunto;

    /**
     * @var text $texto
     *
     * @Column(name="texto", type="text", nullable=true)
     */
    private $texto;

    /**
     * @var string $de
     *
     * @Column(name="de", type="string", length=100, nullable=false)
     */
    private $de;

    /**
     * @var integer $para
     *
     * @Column(name="para", type="integer", nullable=false)
     */
    private $para;


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
     * Set asunto
     *
     * @param string $asunto
     * @return Buzon
     */
    public function setAsunto($asunto)
    {
        $this->asunto = $asunto;
        return $this;
    }

    /**
     * Get asunto
     *
     * @return string 
     */
    public function getAsunto()
    {
        return $this->asunto;
    }

    /**
     * Set texto
     *
     * @param text $texto
     * @return Buzon
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;
        return $this;
    }

    /**
     * Get texto
     *
     * @return text 
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set de
     *
     * @param string $de
     * @return Buzon
     */
    public function setDe($de)
    {
        $this->de = $de;
        return $this;
    }

    /**
     * Get de
     *
     * @return string 
     */
    public function getDe()
    {
        return $this->de;
    }

    /**
     * Set para
     *
     * @param integer $para
     * @return Buzon
     */
    public function setPara($para)
    {
        $this->para = $para;
        return $this;
    }

    /**
     * Get para
     *
     * @return integer 
     */
    public function getPara()
    {
        return $this->para;
    }
}