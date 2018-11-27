<?php

namespace Raptor2\SyntarsusBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Raptor2\SyntarsusBundle\Model\Entity\SecurityEstructure
 *
 * @Table(name="security_estructure")
 * @Entity(repositoryClass="Raptor2\SyntarsusBundle\Model\Repository\SecurityEstructureRepository")
 */
class SecurityEstructure
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
     * @var string $description
     *
     * @Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer $belongs
     *
     * @Column(name="belongs", type="integer", nullable=false)
     */
    private $belongs;

    /**
     * @var Raptor2\SyntarsusBundle\Model\Entity\SecurityCategory
     *
     * @ManyToOne(targetEntity="Raptor2\SyntarsusBundle\Model\Entity\SecurityCategory")
     * @JoinColumns({
     *   @JoinColumn(name="id_category", referencedColumnName="id")
     * })
     */
    private $idCategory;


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
     * @return SecurityEstructure
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
     * @param string $description
     * @return SecurityEstructure
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set belongs
     *
     * @param integer $belongs
     * @return SecurityEstructure
     */
    public function setBelongs($belongs)
    {
        $this->belongs = $belongs;
        return $this;
    }

    /**
     * Get belongs
     *
     * @return integer 
     */
    public function getBelongs()
    {
        return $this->belongs;
    }

    /**
     * Set idCategory
     *
     * @param Raptor2\SyntarsusBundle\Model\Entity\SecurityCategory $idCategory
     * @return SecurityEstructure
     */
    public function setIdCategory(\Raptor2\SyntarsusBundle\Model\Entity\SecurityCategory $idCategory = null)
    {
        $this->idCategory = $idCategory;
        return $this;
    }

    /**
     * Get idCategory
     *
     * @return Raptor2\SyntarsusBundle\Model\Entity\SecurityCategory 
     */
    public function getIdCategory()
    {
        return $this->idCategory;
    }
}