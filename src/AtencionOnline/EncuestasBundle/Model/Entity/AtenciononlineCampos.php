<?php

namespace AtencionOnline\EncuestasBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos
 *
 * @Table(name="atenciononline_campos")
 * @Entity(repositoryClass="AtencionOnline\EncuestasBundle\Model\Repository\AtenciononlineCamposRepository")
 */
class AtenciononlineCampos
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
     * @var string $respuesta
     *
     * @Column(name="respuesta", type="string", length=255, nullable=false)
     */
    private $respuesta;

    /**
     * @var AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas
     *
     * @ManyToOne(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas")
     * @JoinColumns({
     *   @JoinColumn(name="id_pregunta", referencedColumnName="id")
     * })
     */
    private $idPregunta;
    
    /**
     * Bidireccional - Uno-A-Muchos (Lado inverso)
     *
     * @OneToMany(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineRespuestas", mappedBy="idCampo", cascade={"remove"})
     */
    private $respuestas;

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
     * Set respuesta
     *
     * @param string $respuesta
     * @return AtenciononlineCampos
     */
    public function setRespuesta($respuesta)
    {
        $this->respuesta = $respuesta;
        return $this;
    }

    /**
     * Get respuesta
     *
     * @return string 
     */
    public function getRespuesta()
    {
        return $this->respuesta;
    }

    /**
     * Set idPregunta
     *
     * @param AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas $idPregunta
     * @return AtenciononlineCampos
     */
    public function setIdPregunta(\AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas $idPregunta = null)
    {
        $this->idPregunta = $idPregunta;
        return $this;
    }

    /**
     * Get idPregunta
     *
     * @return AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas 
     */
    public function getIdPregunta()
    {
        return $this->idPregunta;
    }
}