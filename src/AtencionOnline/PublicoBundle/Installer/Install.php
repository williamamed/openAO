<?php
file_put_contents(__DIR__.'/file','hola mundo');
Raptor\Bundle\Publisher\Publisher::run('\AtencionOnline\PublicoBundle\PublicoBundle');
$message="El modulo de formularios publicos fue instalado correctamente";

return $message;

?>
