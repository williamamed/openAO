<?php

namespace AtencionOnline\LogicaBundle\Model\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * IncidenciasRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class IncidenciasRepository extends EntityRepository
{
    public function getIncidenciasSize($estructures,$state=0) {
        if($state==0)
            $stateConsult=" and (i.estado=1 or i.estado=0)";
        else
            $stateConsult=" and (i.estado=2 or i.estado=3)";
        $query= $this->getEntityManager()->createQuery('SELECT COUNT(i.id) FROM AtencionOnline\LogicaBundle\Model\Entity\Incidencias i WHERE i.idEstructure IN (?1)'.$stateConsult);
        $query->setParameter(1,$estructures);
        $count=$query->getSingleScalarResult();
        
        return $count;
    }
    
    public function getIncidenciasLastNo($estructures,$state=0) {
        if($state==0)
            $stateConsult=" and (i.estado=1 or i.estado=0)";
        else
            $stateConsult=" and (i.estado=2 or i.estado=3)";
        $query= $this->getEntityManager()->createQuery('SELECT COUNT(i.id) FROM AtencionOnline\LogicaBundle\Model\Entity\Incidencias i WHERE i.idEstructure IN (?1)'.$stateConsult);
        $query->setParameter(1,$estructures);
        $count=$query->getSingleScalarResult();
        
        return $count;
    }
    
    public function getIncidenciasPaging($estructures,$start, $cant,$state=0) {
        if($state==0)
            $stateConsult=" and (i.estado=1 or i.estado=0)";
        else
            $stateConsult=" and (i.estado=2 or i.estado=3)";
        $query= $this->getEntityManager()->createQuery('SELECT i FROM AtencionOnline\LogicaBundle\Model\Entity\Incidencias i WHERE i.idEstructure IN (?1)'.$stateConsult);
        
        $query->setParameter(1,$estructures);
        $query->setMaxResults($cant);
        $query->setFirstResult($start);
        
        return $query->getResult();
    }
    
    public function getIncidenciasLista($estructures) {
        $query= $this->getEntityManager()->createQuery('SELECT i FROM AtencionOnline\LogicaBundle\Model\Entity\Incidencias i WHERE i.estado=1 and i.idEstructure IN (?1)');
        
        $query->setParameter(1,$estructures);
        
        
        return $query->getResult();
    }
    
    public function getIncidenciasTramiteSize($estructures) {
        $query= $this->getEntityManager()->createQuery('SELECT COUNT(i.id) FROM AtencionOnline\LogicaBundle\Model\Entity\ArchivoIncidencias i WHERE i.estado=3 and i.idEstructure IN (?1) and i.noConsecutivo LIKE ?2');
        
        $query->setParameter(1,$estructures);
        $query->setParameter(2,"%".date('y')."%");
        $count=$query->getSingleScalarResult();
        
        return $count;
    }
    
    public function getIncidenciasSearch($estructures,$criteria,$state=0) {
        $rest1='';
        if($criteria['nombre']){
            $criteria['nombre']="%".$criteria['nombre']."%";
            $rest1.=' and  i.nombreApellidos LIKE :nombre';
        }else
            unset($criteria['nombre']);
        if($criteria['recibida']){
            $criteria['recibida']="%".$criteria['recibida']."%";
            $rest1.=' and i.recibe LIKE :recibida';
        }else
            unset($criteria['recibida']);
        if($criteria['dirigido']){
            $criteria['dirigido']="%".$criteria['dirigido']."%";
            $rest1.=' and i.dirigido LIKE :dirigido ';
        }else
            unset($criteria['dirigido']);
        $rest='';
        if($criteria['via']){
            $rest.=' and i.idViasComunicacion=:via';
        }
        if($criteria['tipo']){
            $rest.=' and i.idTipo=:tipo';
        }
        if($criteria['desde'] and $criteria['hasta']){
            $rest.=' and i.fecha BETWEEN :desde AND :hasta';
        }
        $stateConsult='';
        if($state==0)
            $stateConsult=" and (i.estado=1 or i.estado=0)";
        else
            $stateConsult=" and (i.estado=2 or i.estado=3)";
            
        $query= $this->getEntityManager()->createQuery('SELECT i FROM AtencionOnline\LogicaBundle\Model\Entity\Incidencias i WHERE  i.idEstructure IN (:estructures) '.$rest1.'  '.$rest.' '.$stateConsult.' order by i.fecha desc');
        $query->setParameter('estructures',$estructures);
        foreach ($criteria as $key => $value) {
            if($value)
                $query->setParameter($key,$value);
        }
        
        return $query->getResult();
        
    }
}