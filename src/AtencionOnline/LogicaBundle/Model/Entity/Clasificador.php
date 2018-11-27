<?php

namespace AtencionOnline\LogicaBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AtencionOnline\LogicaBundle\Model\Entity\Clasificador
 *
 * @Table(name="clasificador")
 * @Entity(repositoryClass="AtencionOnline\LogicaBundle\Model\Repository\ClasificadorRepository")
 */
class Clasificador
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
     * @var string $name
     *
     * @Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var text $description
     *
     * @Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var AtencionOnline\LogicaBundle\Model\Entity\Clasificador
     *
     * @ManyToOne(targetEntity="AtencionOnline\LogicaBundle\Model\Entity\Clasificador")
     * @JoinColumns({
     *   @JoinColumn(name="parent", referencedColumnName="id")
     * })
     */
    private $parent;
    
    /**
     * @OneToMany(targetEntity="Clasificador", mappedBy="parent")
     */
    private $children;

    
    public function __construct() {
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Get Child
     * 
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getChildren() {
        return $this->children;
    }

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
     * Set name
     *
     * @param string $name
     * @return Clasificador
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param text $description
     * @return Clasificador
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get description
     *
     * @return text 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set parent
     *
     * @param AtencionOnline\LogicaBundle\Model\Entity\Clasificador $parent
     * @return Clasificador
     */
    public function setParent(\AtencionOnline\LogicaBundle\Model\Entity\Clasificador $parent = null)
    {
        $this->parent = $parent;
        return $this;
    }

    /**
     * Get parent
     *
     * @return AtencionOnline\LogicaBundle\Model\Entity\Clasificador 
     */
    public function getParent()
    {
        return $this->parent;
    }
}