<?php

namespace AtencionOnline\EncuestasBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios
 *
 * @Table(name="atenciononline_usuarios")
 * @Entity(repositoryClass="AtencionOnline\EncuestasBundle\Model\Repository\AtenciononlineUsuariosRepository")
 */
class AtenciononlineUsuarios
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
     * @var string $apellidos
     *
     * @Column(name="apellidos", type="string", length=255, nullable=false)
     */
    private $apellidos;

    /**
     * @var date $cumple
     *
     * @Column(name="cumple", type="date", nullable=true)
     */
    private $cumple;

    /**
     * @var string $direccion
     *
     * @Column(name="direccion", type="string", length=255, nullable=false)
     */
    private $direccion;

    /**
     * @var string $ci
     *
     * @Column(name="ci", type="string", length=50, nullable=false)
     */
    private $ci;


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
     * @return AtenciononlineUsuarios
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
     * Set apellidos
     *
     * @param string $apellidos
     * @return AtenciononlineUsuarios
     */
    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
        return $this;
    }

    /**
     * Get apellidos
     *
     * @return string 
     */
    public function getApellidos()
    {
        return $this->apellidos;
    }

    /**
     * Set cumple
     *
     * @param date $cumple
     * @return AtenciononlineUsuarios
     */
    public function setCumple($cumple)
    {
        $this->cumple = $cumple;
        return $this;
    }

    /**
     * Get cumple
     *
     * @return date 
     */
    public function getCumple()
    {
        return $this->cumple;
    }

    /**
     * Set direccion
     *
     * @param string $direccion
     * @return AtenciononlineUsuarios
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;
        return $this;
    }

    /**
     * Get direccion
     *
     * @return string 
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * Set ci
     *
     * @param string $ci
     * @return AtenciononlineUsuarios
     */
    public function setCi($ci)
    {
        $this->ci = $ci;
        return $this;
    }

    /**
     * Get ci
     *
     * @return string 
     */
    public function getCi()
    {
        return $this->ci;
    }
}