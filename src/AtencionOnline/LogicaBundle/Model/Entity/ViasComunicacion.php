<?php

namespace AtencionOnline\LogicaBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion
 *
 * @Table(name="vias_comunicacion")
 * @Entity(repositoryClass="AtencionOnline\LogicaBundle\Model\Repository\ViasComunicacionRepository")
 */
class ViasComunicacion
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
     * @var string $nombre
     *
     * @Column(name="nombre", type="string", length=255, nullable=false)
     */
    private $nombre;

    /**
     * @var boolean $anonimo
     *
     * @Column(name="anonimo", type="boolean", nullable=false)
     */
    private $anonimo;


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
     * Set nombre
     *
     * @param string $nombre
     * @return ViasComunicacion
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
        return $this;
    }

    /**
     * Get nombre
     *
     * @return string 
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set anonimo
     *
     * @param boolean $anonimo
     * @return ViasComunicacion
     */
    public function setAnonimo($anonimo)
    {
        $this->anonimo = $anonimo;
        return $this;
    }

    /**
     * Get anonimo
     *
     * @return boolean 
     */
    public function getAnonimo()
    {
        return $this->anonimo;
    }
}