<?php

/**
 * Raptor - Integration PHP 5 framework
 *
 * @author      William Amed <watamayo90@gmail.com>, Otto Haus <ottohaus@gmail.com>
 * @copyright   2014 
 * @link        http://dinobyte.net
 * @version     2.0.1
 * @package     Raptor
 *
 * MIT LICENSE
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
namespace AtencionOnline\PublicoBundle\Crypt;
/**
 * Description of Crypto
 *
 * 
 */
class Crypto {
    
    public static function encrypt($data) {
        $app=  \Raptor\Raptor::getInstance();
        $key = hash_hmac('sha1',$app->config('cookies.secret_key'),$app->config('cookies.secret_key'));
        $expires=$app->config('cookies.secret_key');
        
        $iv= self::getIv($expires, $app->config('cookies.secret_key'));
        
        $en= base64_encode(\Slim\Http\Util::encrypt(
                "raptor-1|".$data,
                $key,
                $iv,
                array(
                    'algorithm' => $app->config('cookies.cipher'),
                    'mode' => $app->config('cookies.cipher_mode')
                )
            ));
        
        return $en;
    }
    
    public static function decrypt($data) {
        $app=  \Raptor\Raptor::getInstance();
        $key = hash_hmac('sha1',$app->config('cookies.secret_key'),$app->config('cookies.secret_key'));
        $expires=$app->config('cookies.secret_key');
        
        $iv= self::getIv($expires, $app->config('cookies.secret_key'));
        
        $deco=base64_decode($data);
        
        $de=\Slim\Http\Util::decrypt(
                $deco, 
                $key, 
                $iv,
                array(
                    'algorithm' => $app->config('cookies.cipher'),
                    'mode' => $app->config('cookies.cipher_mode')
                ));
        $check=  explode('|', $de);
        
        if(count($check)>1){
            if($check[0]!=='raptor-1')
                return false;
        }else
            return false;
        unset($check[0]);
        return implode('', $check);
    }
    
    private static function getIv($expires, $secret)
    {
        $data1 = hash_hmac('sha1', 'a'.$expires.'b', $secret);
        $data2 = hash_hmac('sha1', 'z'.$expires.'y', $secret);

        return pack("h*", $data1.$data2);
    }
}

?>
