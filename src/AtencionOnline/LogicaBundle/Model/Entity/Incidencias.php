<?php

namespace AtencionOnline\LogicaBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\LogicaBundle\Model\Entity\Incidencias
 *
 * @Table(name="incidencias")
 * @Entity(repositoryClass="AtencionOnline\LogicaBundle\Model\Repository\IncidenciasRepository")
 */
class Incidencias
{
    /**
     * @var bigint $id
     *
     * @Column(name="id", type="bigint", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer $estado
     *
     * @Column(name="estado", type="integer", nullable=true)
     */
    private $estado;

    /**
     * @var string $noConsecutivo
     *
     * @Column(name="no_consecutivo", type="string", length=12, nullable=true)
     */
    private $noConsecutivo;

    /**
     * @var string $expOc
     *
     * @Column(name="exp_oc", type="string", length=12, nullable=true)
     */
    private $expOc;

    /**
     * @var integer $anterior
     *
     * @Column(name="anterior", type="integer", nullable=true)
     */
    private $anterior;

    /**
     * @var date $fecha
     *
     * @Column(name="fecha", type="date", nullable=true)
     */
    private $fecha;

    /**
     * @var string $nombreApellidos
     *
     * @Column(name="nombre_apellidos", type="string", length=255, nullable=true)
     */
    private $nombreApellidos;

    /**
     * @var integer $sexo
     *
     * @Column(name="sexo", type="integer", nullable=true)
     */
    private $sexo;

    /**
     * @var integer $edad
     *
     * @Column(name="edad", type="integer", nullable=true)
     */
    private $edad;

    /**
     * @var integer $nivelEscolar
     *
     * @Column(name="nivel_escolar", type="integer", nullable=true)
     */
    private $nivelEscolar;

    /**
     * @var integer $ocupacion
     *
     * @Column(name="ocupacion", type="integer", nullable=true)
     */
    private $ocupacion;

    /**
     * @var string $direccion
     *
     * @Column(name="direccion", type="string", length=255, nullable=true)
     */
    private $direccion;

    /**
     * @var string $telefono
     *
     * @Column(name="telefono", type="string", length=255, nullable=true)
     */
    private $telefono;

    /**
     * @var string $dirigido
     *
     * @Column(name="dirigido", type="string", length=255, nullable=false)
     */
    private $dirigido;

    /**
     * @var string $entidadPertenece
     *
     * @Column(name="entidad_pertenece", type="string", length=255, nullable=true)
     */
    private $entidadPertenece;

    /**
     * @var text $planteamiento
     *
     * @Column(name="planteamiento", type="text", nullable=false)
     */
    private $planteamiento;

    /**
     * @var string $traslada
     *
     * @Column(name="traslada", type="string", length=255, nullable=true)
     */
    private $traslada;

    /**
     * @var string $recibe
     *
     * @Column(name="recibe", type="string", length=255, nullable=true)
     */
    private $recibe;

    /**
     * @var integer $termino
     *
     * @Column(name="termino", type="integer", nullable=true)
     */
    private $termino;

    /**
     * @var text $respuesta
     *
     * @Column(name="respuesta", type="text", nullable=true)
     */
    private $respuesta;

    /**
     * @var integer $razon
     *
     * @Column(name="razon", type="integer", nullable=true)
     */
    private $razon;

    /**
     * @var boolean $conforme
     *
     * @Column(name="conforme", type="boolean", nullable=true)
     */
    private $conforme;

    /**
     * @var string $codigoestado
     *
     * @Column(name="codigoestado", type="string", length=50, nullable=true)
     */
    private $codigoestado;

    /**
     * @var Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure
     *
     * @ManyToOne(targetEntity="Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure")
     * @JoinColumns({
     *   @JoinColumn(name="id_estructure", referencedColumnName="id")
     * })
     */
    private $idEstructure;

    /**
     * @var AtencionOnline\LogicaBundle\Model\Entity\Tipo
     *
     * @ManyToOne(targetEntity="AtencionOnline\LogicaBundle\Model\Entity\Tipo")
     * @JoinColumns({
     *   @JoinColumn(name="id_tipo", referencedColumnName="id")
     * })
     */
    private $idTipo;

    /**
     * @var AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion
     *
     * @ManyToOne(targetEntity="AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion")
     * @JoinColumns({
     *   @JoinColumn(name="id_vias_comunicacion", referencedColumnName="id")
     * })
     */
    private $idViasComunicacion;

    /**
     * @var AtencionOnline\LogicaBundle\Model\Entity\Clasificador
     *
     * @ManyToOne(targetEntity="AtencionOnline\LogicaBundle\Model\Entity\Clasificador")
     * @JoinColumns({
     *   @JoinColumn(name="id_clasificador", referencedColumnName="id")
     * })
     */
    private $idClasificador;


    /**
     * Get id
     *
     * @return bigint 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set estado
     *
     * @param integer $estado
     * @return Incidencias
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;
        return $this;
    }

    /**
     * Get estado
     *
     * @return integer 
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set noConsecutivo
     *
     * @param string $noConsecutivo
     * @return Incidencias
     */
    public function setNoConsecutivo($noConsecutivo)
    {
        $this->noConsecutivo = $noConsecutivo;
        return $this;
    }

    /**
     * Get noConsecutivo
     *
     * @return string 
     */
    public function getNoConsecutivo()
    {
        return $this->noConsecutivo;
    }

    /**
     * Set expOc
     *
     * @param string $expOc
     * @return Incidencias
     */
    public function setExpOc($expOc)
    {
        $this->expOc = $expOc;
        return $this;
    }

    /**
     * Get expOc
     *
     * @return string 
     */
    public function getExpOc()
    {
        return $this->expOc;
    }

    /**
     * Set anterior
     *
     * @param integer $anterior
     * @return Incidencias
     */
    public function setAnterior($anterior)
    {
        $this->anterior = $anterior;
        return $this;
    }

    /**
     * Get anterior
     *
     * @return integer 
     */
    public function getAnterior()
    {
        return $this->anterior;
    }

    /**
     * Set fecha
     *
     * @param date $fecha
     * @return Incidencias
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
        return $this;
    }

    /**
     * Get fecha
     *
     * @return date 
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set nombreApellidos
     *
     * @param string $nombreApellidos
     * @return Incidencias
     */
    public function setNombreApellidos($nombreApellidos)
    {
        $this->nombreApellidos = $nombreApellidos;
        return $this;
    }

    /**
     * Get nombreApellidos
     *
     * @return string 
     */
    public function getNombreApellidos()
    {
        return $this->nombreApellidos;
    }

    /**
     * Set sexo
     *
     * @param integer $sexo
     * @return Incidencias
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
        return $this;
    }

    /**
     * Get sexo
     *
     * @return integer 
     */
    public function getSexo()
    {
        return $this->sexo;
    }

    /**
     * Set edad
     *
     * @param integer $edad
     * @return Incidencias
     */
    public function setEdad($edad)
    {
        $this->edad = $edad;
        return $this;
    }

    /**
     * Get edad
     *
     * @return integer 
     */
    public function getEdad()
    {
        return $this->edad;
    }

    /**
     * Set nivelEscolar
     *
     * @param integer $nivelEscolar
     * @return Incidencias
     */
    public function setNivelEscolar($nivelEscolar)
    {
        $this->nivelEscolar = $nivelEscolar;
        return $this;
    }

    /**
     * Get nivelEscolar
     *
     * @return integer 
     */
    public function getNivelEscolar()
    {
        return $this->nivelEscolar;
    }

    /**
     * Set ocupacion
     *
     * @param integer $ocupacion
     * @return Incidencias
     */
    public function setOcupacion($ocupacion)
    {
        $this->ocupacion = $ocupacion;
        return $this;
    }

    /**
     * Get ocupacion
     *
     * @return integer 
     */
    public function getOcupacion()
    {
        return $this->ocupacion;
    }

    /**
     * Set direccion
     *
     * @param string $direccion
     * @return Incidencias
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
     * Set telefono
     *
     * @param string $telefono
     * @return Incidencias
     */
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
        return $this;
    }

    /**
     * Get telefono
     *
     * @return string 
     */
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * Set dirigido
     *
     * @param string $dirigido
     * @return Incidencias
     */
    public function setDirigido($dirigido)
    {
        $this->dirigido = $dirigido;
        return $this;
    }

    /**
     * Get dirigido
     *
     * @return string 
     */
    public function getDirigido()
    {
        return $this->dirigido;
    }

    /**
     * Set entidadPertenece
     *
     * @param string $entidadPertenece
     * @return Incidencias
     */
    public function setEntidadPertenece($entidadPertenece)
    {
        $this->entidadPertenece = $entidadPertenece;
        return $this;
    }

    /**
     * Get entidadPertenece
     *
     * @return string 
     */
    public function getEntidadPertenece()
    {
        return $this->entidadPertenece;
    }

    /**
     * Set planteamiento
     *
     * @param text $planteamiento
     * @return Incidencias
     */
    public function setPlanteamiento($planteamiento)
    {
        $this->planteamiento = $planteamiento;
        return $this;
    }

    /**
     * Get planteamiento
     *
     * @return text 
     */
    public function getPlanteamiento()
    {
        return $this->planteamiento;
    }

    /**
     * Set traslada
     *
     * @param string $traslada
     * @return Incidencias
     */
    public function setTraslada($traslada)
    {
        $this->traslada = $traslada;
        return $this;
    }

    /**
     * Get traslada
     *
     * @return string 
     */
    public function getTraslada()
    {
        return $this->traslada;
    }

    /**
     * Set recibe
     *
     * @param string $recibe
     * @return Incidencias
     */
    public function setRecibe($recibe)
    {
        $this->recibe = $recibe;
        return $this;
    }

    /**
     * Get recibe
     *
     * @return string 
     */
    public function getRecibe()
    {
        return $this->recibe;
    }

    /**
     * Set termino
     *
     * @param integer $termino
     * @return Incidencias
     */
    public function setTermino($termino)
    {
        $this->termino = $termino;
        return $this;
    }

    /**
     * Get termino
     *
     * @return integer 
     */
    public function getTermino()
    {
        return $this->termino;
    }

    /**
     * Set respuesta
     *
     * @param text $respuesta
     * @return Incidencias
     */
    public function setRespuesta($respuesta)
    {
        $this->respuesta = $respuesta;
        return $this;
    }

    /**
     * Get respuesta
     *
     * @return text 
     */
    public function getRespuesta()
    {
        return $this->respuesta;
    }

    /**
     * Set razon
     *
     * @param integer $razon
     * @return Incidencias
     */
    public function setRazon($razon)
    {
        $this->razon = $razon;
        return $this;
    }

    /**
     * Get razon
     *
     * @return integer 
     */
    public function getRazon()
    {
        return $this->razon;
    }

    /**
     * Set conforme
     *
     * @param boolean $conforme
     * @return Incidencias
     */
    public function setConforme($conforme)
    {
        $this->conforme = $conforme;
        return $this;
    }

    /**
     * Get conforme
     *
     * @return boolean 
     */
    public function getConforme()
    {
        return $this->conforme;
    }

    /**
     * Set codigoestado
     *
     * @param string $codigoestado
     * @return Incidencias
     */
    public function setCodigoestado($codigoestado)
    {
        $this->codigoestado = $codigoestado;
        return $this;
    }

    /**
     * Get codigoestado
     *
     * @return string 
     */
    public function getCodigoestado()
    {
        return $this->codigoestado;
    }

    /**
     * Set idEstructure
     *
     * @param Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $idEstructure
     * @return Incidencias
     */
    public function setIdEstructure(\Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure $idEstructure = null)
    {
        $this->idEstructure = $idEstructure;
        return $this;
    }

    /**
     * Get idEstructure
     *
     * @return Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure 
     */
    public function getIdEstructure()
    {
        return $this->idEstructure;
    }

    /**
     * Set idTipo
     *
     * @param AtencionOnline\LogicaBundle\Model\Entity\Tipo $idTipo
     * @return Incidencias
     */
    public function setIdTipo(\AtencionOnline\LogicaBundle\Model\Entity\Tipo $idTipo = null)
    {
        $this->idTipo = $idTipo;
        return $this;
    }

    /**
     * Get idTipo
     *
     * @return AtencionOnline\LogicaBundle\Model\Entity\Tipo 
     */
    public function getIdTipo()
    {
        return $this->idTipo;
    }

    /**
     * Set idViasComunicacion
     *
     * @param AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion $idViasComunicacion
     * @return Incidencias
     */
    public function setIdViasComunicacion(\AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion $idViasComunicacion = null)
    {
        $this->idViasComunicacion = $idViasComunicacion;
        return $this;
    }

    /**
     * Get idViasComunicacion
     *
     * @return AtencionOnline\LogicaBundle\Model\Entity\ViasComunicacion 
     */
    public function getIdViasComunicacion()
    {
        return $this->idViasComunicacion;
    }

    /**
     * Set idClasificador
     *
     * @param AtencionOnline\LogicaBundle\Model\Entity\Clasificador $idClasificador
     * @return Incidencias
     */
    public function setIdClasificador(\AtencionOnline\LogicaBundle\Model\Entity\Clasificador $idClasificador = null)
    {
        $this->idClasificador = $idClasificador;
        return $this;
    }

    /**
     * Get idClasificador
     *
     * @return AtencionOnline\LogicaBundle\Model\Entity\Clasificador 
     */
    public function getIdClasificador()
    {
        return $this->idClasificador;
    }
}