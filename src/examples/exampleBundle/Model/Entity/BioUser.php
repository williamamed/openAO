<?php

namespace examples\exampleBundle\Model\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * examples\exampleBundle\Model\Entity\BioUser
 *
 * @Table(name="bio_user")
 * @Entity(repositoryClass="examples\exampleBundle\Model\Repository\BioUserRepository")
 */
class BioUser
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
     * @var text $data
     *
     * @Column(name="data", type="text", nullable=false)
     */
    private $data;


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
     * @return BioUser
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
     * Set data
     *
     * @param text $data
     * @return BioUser
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Get data
     *
     * @return text 
     */
    public function getData()
    {
        return $this->data;
    }
}