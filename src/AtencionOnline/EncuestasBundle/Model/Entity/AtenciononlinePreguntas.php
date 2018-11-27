<?php

namespace AtencionOnline\EncuestasBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlinePreguntas
 *
 * @Table(name="atenciononline_preguntas")
 * @Entity(repositoryClass="AtencionOnline\EncuestasBundle\Model\Repository\AtenciononlinePreguntasRepository")
 */
class AtenciononlinePreguntas
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
     * @var string $pregunta
     *
     * @Column(name="pregunta", type="string", length=255, nullable=false)
     */
    private $pregunta;

    /**
     * @var integer $descripcion
     *
     * @Column(name="descripcion", type="integer", nullable=false)
     */
    private $descripcion;

    /**
     * @var integer $tipo
     *
     * @Column(name="tipo", type="integer", nullable=false)
     */
    private $tipo;

    /**
     * @var boolean $opcional
     *
     * @Column(name="opcional", type="boolean", nullable=false)
     */
    private $opcional;

    /**
     * @var AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineEncuestas
     *
     * @ManyToOne(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineEncuestas")
     * @JoinColumns({
     *   @JoinColumn(name="id_encuesta", referencedColumnName="id")
     * })
     */
    private $idEncuesta;

    /**
     * Bidireccional - Uno-A-Muchos (Lado inverso)
     *
     * @OneToMany(targetEntity="AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineCampos", mappedBy="idPregunta", cascade={"remove"})
     */
    private $campos;
    
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
     * Set pregunta
     *
     * @param string $pregunta
     * @return AtenciononlinePreguntas
     */
    public function setPregunta($pregunta)
    {
        $this->pregunta = $pregunta;
        return $this;
    }

    /**
     * Get pregunta
     *
     * @return string 
     */
    public function getPregunta()
    {
        return $this->pregunta;
    }

    /**
     * Set descripcion
     *
     * @param integer $descripcion
     * @return AtenciononlinePreguntas
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    /**
     * Get descripcion
     *
     * @return integer 
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set tipo
     *
     * @param integer $tipo
     * @return AtenciononlinePreguntas
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
        return $this;
    }

    /**
     * Get tipo
     *
     * @return integer 
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set opcional
     *
     * @param boolean $opcional
     * @return AtenciononlinePreguntas
     */
    public function setOpcional($opcional)
    {
        $this->opcional = $opcional;
        return $this;
    }

    /**
     * Get opcional
     *
     * @return boolean 
     */
    public function getOpcional()
    {
        return $this->opcional;
    }

    /**
     * Set idEncuesta
     *
     * @param AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineEncuestas $idEncuesta
     * @return AtenciononlinePreguntas
     */
    public function setIdEncuesta(\AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineEncuestas $idEncuesta = null)
    {
        $this->idEncuesta = $idEncuesta;
        return $this;
    }

    /**
     * Get idEncuesta
     *
     * @return AtencionOnline\EncuestasBundle\Model\Entity\AtenciononlineEncuestas 
     */
    public function getIdEncuesta()
    {
        return $this->idEncuesta;
    }
    
    /**
     * Get Campos
     *
     * @return @return Doctrine\Common\Collections\Collection 
     */
    public function getCampos()
    {
        return $this->campos;
    }
}