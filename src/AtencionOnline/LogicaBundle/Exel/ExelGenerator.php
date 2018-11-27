<?php

/*
 * Generated with RAPTOR NEMESIS
 * 
 */




namespace AtencionOnline\LogicaBundle\Exel;

use Raptor\Util\ItemList;

class ExelGenerator {
    public $row;
    public $column;
    private $doctrine;
	
    public $objPHPExcel;
    private $gruped;
    function __construct($doctrine,&$objPHPExcel,$index) {
        $this->doctrine=$doctrine;
        $this->objPHPExcel=$objPHPExcel;
        $this->objPHPExcel->createSheet($index);
        $this->objPHPExcel->setActiveSheetIndex($index);
        $this->gruped=array();
    }

    public function close() {
        
        //$objPHPExcel->getActiveSheet()->setCellValueExplicit('A30',"=SUM(D35:K43)",\PHPExcel_Cell_DataType::TYPE_FORMULA);
        
        //$objPHPExcel->getActiveSheet()->mergeCells('B8:B12');
       

        $objWriter = \PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
        $objWriter->save('php://output');
        $this->objPHPExcel->disconnectWorksheets();
    }


    public function generarHeaderAction($estructura) {
        $this->objPHPExcel->getActiveSheet()
                ->setCellValue('A2', "No")
                ->setCellValue('B2', "Clasificador General JCCE")
                ->setCellValue('C2', "Clasificador Interno de incidencias");
        $after=count($estructura)+3;
        $column=3;
        foreach ($estructura as $valueE) {
            $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column, 2, $valueE['name']);
            
           
            $column++;
        }
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($after, 2, "No. Incidencias");
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($after + 1, 2, "Total Servicios");
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($after + 2, 2, "% Servicios");
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($after + 3, 2, "Porciento que representa la incidencia con el total de ese punto");
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($after + 3)->setWidth(20);
        
        
        $h_start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow(0,2)->getCoordinate();
        $h_finish=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($after + 3,2)->getCoordinate();
        $this->setGrid("$h_start:$h_finish");
        $this->center("$h_start:$h_finish");
        $this->fill("36a4ff","$h_start:$h_finish");
    }
    
    public function drawTable($list,$estructura,$desde,$hasta,$node) {
        $row=3;
        foreach ($list as $key => $value) {
            $hijos=$value->getChildren();
            
            $column=3;
            $cell=$row;
            
            foreach ($hijos as $key2 => $valueHijos) {
                $this->objPHPExcel->getActiveSheet()->setCellValue('C' . $row, $valueHijos->getName());
               $this->gruped[]= $cell;
                //Buscar cantidades por estructura de este indicador  
                foreach ($estructura as $valueE) {
                    $depthId = array($valueE['id']);

                    $depth = $this->doctrine->getRepository('SyntarsusBundle:SecurityEstructure')->getAllChilds($valueE['id']);
                    if(intval($node)!=$valueE['id'])
                    foreach ($depth as $valueDep) {
                        $depthId[] = $valueDep->getId();
                    }
                   //Consulta para buscar incidencias de un clasificador por la estructura
                   
                   $counter= $this->doctrine->getRepository('LogicaBundle:ArchivoIncidencias')
                            ->getIncidenciasByClasificadorChart($depthId,$desde,$hasta,$valueHijos->getId());
                   
                   $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column,$row,$counter);
                    
                   
                   $column++;
                }
                $end=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column-1,$row)->getCoordinate();
                $start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow(3,$row)->getCoordinate();
                if($column==3){
                
                   $depthId[] = $node;
                  
                   //Consulta para buscar incidencias de un clasificador por la estructura
                   $counter= $this->doctrine->getRepository('LogicaBundle:ArchivoIncidencias')
                            ->getIncidenciasByClasificadorChart($depthId,$desde,$hasta,$valueHijos->getId());
                   
                   $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column,$row,$counter);
                }else
                $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($column,$row,"=SUM($start:$end)");
               // $objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($column,$row,"=SUM($start:$end)",\PHPExcel_Cell_DataType::TYPE_FORMULA);
                $column=3;
                $row++; 
            }
            $this->objPHPExcel->getActiveSheet()->setCellValue('B'.$cell,$value->getName());
            $this->objPHPExcel->getActiveSheet()->setCellValue('A'.$cell,$key+1);
           
           // $objPHPExcel->getActiveSheet()->mergeCells('B'.$cell.':B'.$row); 
            if($cell+$hijos->count()-1>=$cell){
                //$this->gruped[]= $cell;
                $this->objPHPExcel->getActiveSheet()->mergeCells('A'.$cell.':A'.($cell+$hijos->count()-1)); 
                $this->objPHPExcel->getActiveSheet()->mergeCells('B'.$cell.':B'.($cell+$hijos->count()-1)); 
                $fixed=count($estructura)+4;
                $start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed,$cell)->getCoordinate();
                $end=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed,$cell+$hijos->count()-1)->getCoordinate();
                $this->objPHPExcel->getActiveSheet()->mergeCells("$start:$end");
                
                $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed-1,$cell)->getCoordinate();
                $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed-1,$cell+$hijos->count()-1)->getCoordinate();
                $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($fixed,$cell,"=SUM($inicio:$final)");
            }
            if($hijos->count()==0)
                $row++;
           
        }
        $this->row=$row;
    }
    
    public function generateFooter($estructura,$list) {
        $this->objPHPExcel->getActiveSheet()->setCellValue('A'.$this->row,"Total General");
        $this->objPHPExcel->getActiveSheet()->mergeCells('A'.$this->row.':B'.$this->row); 
        $column=3;
        foreach ($estructura as $valueE) {
            $end=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column,$this->row-1)->getCoordinate();
            $start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column,3)->getCoordinate();
            $this->objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($column,$this->row,"=SUM($start:$end)",\PHPExcel_Cell_DataType::TYPE_FORMULA);
            $column++;
        }
        
        $end=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column,$this->row-1)->getCoordinate();
        $start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column,3)->getCoordinate();
        $this->objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($column,$this->row,"=SUM($start:$end)",\PHPExcel_Cell_DataType::TYPE_FORMULA);
         //suma total
        $end2=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column+1,$this->row-1)->getCoordinate();
        $start2=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($column+1,3)->getCoordinate();
        $this->objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($column+1,$this->row,"=SUM($start2:$end2)",\PHPExcel_Cell_DataType::TYPE_FORMULA);
        //DIVISION
        $row2=3;
        foreach ($list as $value) {
            $cell=$row2;
            //Buscar clasificadores hijos
            $hijos=$value->getChildren();
            
           $fixed=count($estructura)+5;
           // $objPHPExcel->getActiveSheet()->mergeCells('B'.$cell.':B'.$row); 
            if($cell+$hijos->count()-1>=$cell){
                
                
                $start=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed,$cell)->getCoordinate();
                $end=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed,$cell+$hijos->count()-1)->getCoordinate();
                $this->objPHPExcel->getActiveSheet()->mergeCells("$start:$end");
                
                $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed-1,$cell)->getCoordinate();
                $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($fixed-1,$this->row)->getCoordinate();
                error_reporting(0);
                $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($fixed,$cell,"=($inicio/$final)")
                ->getStyleByColumnAndRow($fixed,$cell)
                ->getNumberFormat()
                ->setFormatCode( \PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE );
            }
            $row2=$row2+$hijos->count();
        }
        $this->column=count($estructura)+5;
        $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-2,$this->row)->getCoordinate();
        $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-1,$this->row)->getCoordinate();
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($this->column,$this->row,"=($inicio/$final)")
                ->getStyleByColumnAndRow($this->column,$this->row)
                ->getNumberFormat()
                ->setFormatCode( \PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE );
        
        
        $desde=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow(0,  $this->row)->getCoordinate();
        $hasta=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column,  $this->row)->getCoordinate();
        $this->fill("36a4ff","$desde:$hasta");
        
    }


    public function generateSide(){
        $this->column++;
        for ($i=3;$i<$this->row;$i++){
            $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-3,$i)->getCoordinate();
            $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-2,$this->gruped[$i-3])->getCoordinate();
            $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($this->column,$i,"=($inicio/$final)")
                ->getStyleByColumnAndRow($this->column,$i)
                ->getNumberFormat()
                ->setFormatCode( \PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE );
        }
        
        $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-3,$this->row)->getCoordinate();
        $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($this->column-2,$this->row)->getCoordinate();
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($this->column,$this->row,"=($inicio/$final)")
                ->getStyleByColumnAndRow($this->column,$this->row)
                ->getNumberFormat()
                ->setFormatCode( \PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE );
        $this->objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
        $this->objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
    }
    
    public function borderInside($cant){
        $inicio=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow(3,3)->getCoordinate();
        $final=$this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($cant+2,$this->row-1)->getCoordinate();
        $this->border("FF9999", "$inicio:$final");
    }
    
    public function setName($name){
            $this->objPHPExcel->getActiveSheet()->setTitle($name);
    }


    public function fill($color,$cell) {
        $this->objPHPExcel->getActiveSheet()->getStyle($cell)->getFill()->applyFromArray(
	 		array(
	 			'type'	   => \PHPExcel_Style_Fill::FILL_SOLID,
	 			
	 			'color' => array(
	 				'rgb' => $color
	 			)
	 			
	 		)
                   );
    }
    
    public function border($color,$cell) {
        $this->objPHPExcel->getActiveSheet()->getStyle($cell)->getBorders()->applyFromArray(
                            array(
                                'allborders' => array(
                                    'style' => \PHPExcel_Style_Border::BORDER_MEDIUM,
                                    'color' => array(
                                        'rgb' => $color
                                    )
                                )
                            )
                    );
    }

    public function setGrid($cell){
        $this->objPHPExcel->getActiveSheet()->getStyle($cell)->getBorders()->applyFromArray(
                            array(
                                'allborders' => array(
                                    'style' => \PHPExcel_Style_Border::BORDER_MEDIUM,
                                    'color' => array(
                                        'rgb' => '808080'
                                    )
                                )
                            )
                    );
    }
    
    public function center($cell){
        $this->objPHPExcel->getActiveSheet()->getStyle($cell)->getAlignment()->applyFromArray(
                        array(
                            'horizontal' => \PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                            'vertical' => \PHPExcel_Style_Alignment::VERTICAL_CENTER,
                            'rotation' => 0,
                            'wrap' => true
                        )
            );
    }
    

}

?>
