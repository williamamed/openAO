<?php
/**
 * Generated by Raptor
 * Define the Resources to minified
 */
namespace Raptor2\SyntarsusBundle\Compiler;
use Raptor\Asset\Resources;

class Compiler extends Resources{
    
    public function create() {
        $this->setAsset('Category/js/all.js')
                ->add('Raptor2/Syntarsus/Category/js/all-classes.js',false)
                ->add('Category/js/app.js')
                ->compile(Resources::JS);
        
        $this->setAsset('Auditories/js/all.js')
                ->add('Raptor2/Syntarsus/Auditories/js/all-classes.js',false)
                ->add('Auditories/js/app.js')
                ->compile(Resources::JS);
		
	$this->setAsset('estructure/js/all.js')
                ->add('Raptor2/Syntarsus/estructure/js/all-classes.js',false)
                ->add('estructure/js/app.js')
                ->compile(Resources::JS);
        
        $this->setAsset('privilege/js/all.js')
                ->add('Raptor2/Syntarsus/privilege/js/all-classes.js',false)
                ->add('privilege/js/app.js')
                ->compile(Resources::JS);
        
        $this->setAsset('rol/js/all.js')
                ->add('Raptor2/Syntarsus/rol/js/all-classes.js',false)
                ->add('rol/js/app.js')
                ->compile(Resources::JS);
        
        $this->setAsset('user/js/all.js')
                ->add('Raptor2/Syntarsus/user/js/all-classes.js',false)
                ->add('user/js/app.js')
                ->compile(Resources::JS);
        
        
    }
}

?>