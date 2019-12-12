<?php

// First, include Requests
include('library/Requests.php');

// Next, make sure Requests can load internal classes
Requests::register_autoloader();

$options = array('auth' => new Requests_Auth_Basic((array('admin', 'voltvolt'))));
$baseURL = "http://192.168.0.52/";
$operacao = 0;
$erro = 0;
$msg = "";

$jsonRet = array('msg' => "", 'erro' => 0, 'dados' => 0);


if (isset($_POST['operacao'])) {
    $operacao = $_POST['operacao'];
}


switch ($operacao) {

    case 1:
        if (isset($_POST['host'])) {
            $op1dados = (object) $_POST;

            $postdata = array('mac' => $op1dados->mac, 'dhcp' => $op1dados->dhcp, 'host' => $op1dados->host, 'ip' => $op1dados->ip, 'sub' => $op1dados->mask, 'gw' => $op1dados->gtw, 'dns1' => $op1dados->dns1, 'dns2' => $op1dados->dns2);
            //$postdata = array('dhcp' => 'false', 'host' => $op1dados['devhost']);

            $response = Requests::post($baseURL . "config.htm", array(),  $postdata, $options);

            /*if($response->status_code == 200)
            {
                $respget = Requests::get($baseURL . "reboot.cgi", array(), $options);
            }*/

            $jsonRet['erro'] = $response->status_code;
            $jsonRet['dados'] = json_decode($response->body);
            $jsonRet['msg'] = "";
        } else {
            $jsonRet['erro'] = 3;
            $jsonRet['dados'] = "";
            $jsonRet['msg'] = "Falha Obtendo os dados do formulário";
        }
        break;
}

$json_str = json_encode($jsonRet);
echo ($json_str);    //imprime a string JSON
