<?php

/**
 * Generated with RAPTOR NEMESIS
 * You can add a route prefix to this Controller
 * puting a @Route annotation to this class.
 */

namespace Raptor2\EditorBundle\Controller;

use Raptor\Bundle\Annotations\Route;

use Raptor\Bundle\Controller\Controller;

/**
 * @Route("/onlineeditor")
 */
class DefaultController extends Controller {

    /**
     * 
     *
     * @Route ("/home(/:rutas+)")
     * @RouteName baseonline
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function indexAction($request, $response, $route) {

        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        $metaRoot = pathinfo(realpath($main));

        $trace = array();
        $path = '';

        $base = str_replace('(/:rutas+)', '', $route->getPattern());
        try {
            $path = join('/', $route->getParam('rutas')) . '/';
            $main.=$path;
            $trace = $route->getParam('rutas');
            //$main=  realpath($main);
        } catch (\Exception $exc) {
            
        }
        $directory = realpath($main);

        $list = array_diff(scandir($directory, SCANDIR_SORT_ASCENDING), array('..', '.'));

        if (!realpath($main))
            return $this->render('@EditorBundle/list/index.html.twig', array(
                        'lista' => array(),
                        'trace' => $trace
            ));
        $files = new \Raptor\Util\ItemList();

        foreach ($list as $value) {
            $meta = pathinfo($directory . '/' . $value);

            if (is_dir($directory . '/' . $value)) {

                $files->add(array('file' => $meta['basename'], 'back' => false, 'dir' => true,'path'=>$path, 'dirname' => $request->getRootUri() . $base . '/' . $path));
            } else {
                $files->add(array('file' => $meta['basename'], 'back' => false, 'dir' => false,'path'=>$path, 'dirname' => $request->getRootUri() . $base . '/../getfile?file=' . $path));
            }
        }


        return $this->render('@EditorBundle/list/index.html.twig', array(
                    'lista' => $files,
                    'trace' => $trace,
                    'base' => $request->getRootUri() . $base
        ));
    }

    /**
     * 
     *
     * @Route("/listfiles")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function listAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        $metaRoot = pathinfo(realpath($main));
        $list = glob(realpath($main) . '/*');
        $files = new \Raptor\Util\ItemList();
        if ($request->post('dir')) {
            if ($request->post('back') == 'true') {
                $list = glob($request->post('dir') . '/*');
                if (realpath($main) != realpath($request->post('dir')))
                    $files->add(array('file' => '../', 'back' => true, 'dir' => true, 'dirname' => realpath($request->post('dir') . '/../')));
            }else {
                $list = glob($request->post('dir') . '/' . $request->post('file') . '/*');
                if (realpath($main) != realpath($request->post('dir') . '/' . $request->post('file')))
                    $files->add(array('file' => '../', 'back' => true, 'dir' => true, 'dirname' => realpath($request->post('dir') . '/')));
            }
        }


        foreach ($list as $value) {
            $meta = pathinfo($value);

            if (is_dir($value)) {
                $files->add(array('file' => $meta['basename'], 'back' => false, 'dir' => true, 'dirname' => realpath($meta['dirname'])));
            } else {
                $files->add(array('file' => $meta['basename'], 'back' => false, 'dir' => false, 'dirname' => realpath($meta['dirname'])));
            }
        }
        return $files->toJson();
    }

    /**
     * 
     *
     * @Route("/getfile")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function fileAction($request, $response, $route) {

        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';

        $path = '';



        $path = '/' . $request->get('file');
        $main.=$path;
        if (file_exists($main)) {
            if (is_file($main))
                $name=  explode ('/', $request->get('file'));
                return $this->render('@EditorBundle/list/edit.html.twig', array(
                            'file' => file_get_contents($main),
                            'filename' => $request->get('file'),
                            'name'=> $name[count($name)-1]
                ));
        }
        return $this->app->notFound();
    }

    /**
     * 
     *
     * @Route("/savefile")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function saveAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';

        $path = '';

        $path = '/' . $request->post('file');
        $main.=$path;
        
        if (file_exists($main)) {
            if (is_file($main)){
                file_put_contents($main, $request->post('content'));
                return $this->show("The file was saved");
            }
        }
        return $this->app->notFound();
        
    }

    /**
     * 
     *
     * @Route("/createfile")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function createAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        $path = '';

        $path = '/' . $request->post('directory');
        $main.=$path;
        
        if (file_exists($main)) {
            if (is_dir($main)){
                file_put_contents($main . '/' . $request->post('file'), '');
                return $this->show("The file was created");
            }
        }
        
        return $this->show("Cannot create the file",TRUE, Controller::ERROR);
    }
    
    /**
     * 
     *
     * @Route("/createdir")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function createDirAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        $path = '';

        $path = '/' . $request->post('directory');
        $main.=$path;
        
        if (file_exists($main)) {
            if (is_dir($main)){
                mkdir($main . '/' . $request->post('file'));
                return $this->show("The directory was created");
            }
        }
        
        return $this->show("Cannot create the directory",TRUE, Controller::ERROR);
    }

    /**
     * 
     *
     * @Route("/uploadfile")
     * @RouteName onlineeditor_upload
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function uploadAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        $dir = $request->get('directory');
        
        $path = '';

        $path = '/' . $dir;
        $main.=$path;
        
        if ($request->isPost()) {

            if ($this->moveUploadFileTo('mybundle', $request->post('dir') . '/' . $request->file('mybundle')->get('name'))) {
                echo "<a class='btn' href='#' onclick='window.close()'>Close</a>";
                return "<h3 style='color:green'>The file was uploaded</h3>";
            }
        }
        
        if (file_exists($main)) {
            if (is_dir($main)){
                return $this->render('@EditorBundle/list/upload.html.twig', array('directory' => $main));
            }
        }
        
       
        return "<b style='color:green'>No directory selected</b>";
        
    }

    /**
     * 
     *
     * @Route("/deletefile")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function deleteAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';
        
        $files=$request->post('file');
        foreach ($files as $value) {
           
            if (file_exists($main.$value)){
                \Raptor\Util\Files::delete($main.$value);
            }
        }
        
        return $this->show("The files was deleted");
    }
    
    /**
     * 
     *
     * @Route("/export")
     * 
     * 
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param \Slim\Route $route
     */
    public function exportAction($request, $response, $route) {
        $main = \Raptor\Core\Location::get(\Raptor\Core\Location::APP) . '/../';

        $path = '';



        $path = '/' . $request->get('file');
        $main.=$path;
        if (file_exists($main)) {
            $zip = new \Raptor\Util\Zip();
            $zip->create($main);
            $this->app->response()->headers()->set('Content-Description', 'File Transfer');
            $this->app->response()->headers()->set('Content-Disposition', 'attachment; filename="export.zip"');
            $this->app->contentType(\Raptor\Raptor::ZIP);
            $this->app->response()->headers()->set('Content-Transfer-Encoding', 'binary');
            
            return $zip->output();
        }
        return $this->app->notFound();
    }
}

?>
