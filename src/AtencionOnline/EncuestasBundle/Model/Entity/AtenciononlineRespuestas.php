<?php

namespace AtencionOnline\EncuestasBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineRespuestas
 *
 * @Table(name="atenciononline_respuestas")
 * @Entity(repositoryClass="AtencionOnline\EncuestasBundle\Model\Repository\AtenciononlineRespuestasRepository")
 */
class AtenciononlineRespuestas
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
     * @var string $texto
     *
     * @Column(name="texto", type="string", length=255, nullable=true)
     */
    private $texto;

    /**
     * @var AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios
     *
     * @ManyToOne(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios")
     * @JoinColumns({
     *   @JoinColumn(name="id_usuario", referencedColumnName="id")
     * })
     */
    private $idUsuario;

    /**
     * @var AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos
     *
     * @ManyToOne(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos")
     * @JoinColumns({
     *   @JoinColumn(name="id_campo", referencedColumnName="id")
     * })
     */
    private $idCampo;


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
     * Set texto
     *
     * @param string $texto
     * @return AtenciononlineRespuestas
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;
        return $this;
    }

    /**
     * Get texto
     *
     * @return string 
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set idUsuario
     *
     * @param AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios $idUsuario
     * @return AtenciononlineRespuestas
     */
    public function setIdUsuario(\AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios $idUsuario = null)
    {
        $this->idUsuario = $idUsuario;
        return $this;
    }

    /**
     * Get idUsuario
     *
     * @return AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineUsuarios 
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * Set idCampo
     *
     * @param AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos $idCampo
     * @return AtenciononlineRespuestas
     */
    public function setIdCampo(\AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos $idCampo = null)
    {
        $this->idCampo = $idCampo;
        return $this;
    }

    /**
     * Get idCampo
     *
     * @return AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos 
     */
    public function getIdCampo()
    {
        return $this->idCampo;
    }
}