<?php

// First, include Requests
include('library/Requests.php');

// Next, make sure Requests can load internal classes
Requests::register_autoloader();

$options = array('auth' => new Requests_Auth_Basic((array('admin', 'voltvolt'))));
$baseURL = "http://192.168.0.51/";
$operacao = 0;
$erro = 0;
$msg = "";

$jsonRet = array('msg' => "", 'erro' => 0, 'dados' => 0);


if (isset($_GET['operacao'])) {
    $operacao = $_GET['operacao'];
}


switch ($operacao) {
    case 0:
        $response = Requests::get($baseURL . "status.json", array('Accept' => 'application/json'), $options);
        $jsonRet['erro'] = $response->status_code;
        $jsonRet['dados'] = json_decode($response->body);
        $jsonRet['msg'] = "";

        break;

        case 1:
        if (isset($_GET['dados'])) {
            $op1dados = json_decode($_GET['dados']);

            $postdata = array('dhcp'=>'false','host'=> $op1dados->devhost,'ip'=> $op1dados->devip, 'sub'=>$op1dados->devmask ,'gw'=> $op1dados->devgtw,'dns1'=>$op1dados->devdns1, 'dns2' => $op1dados->devdns2);

            $response = Requests::post($baseURL . "config.htm", array(), $postdata);

            $jsonRet['erro'] = 200;
            $jsonRet['dados'] = $postdata;
            $jsonRet['msg'] = json_decode($response->body);


        }else{
            $jsonRet['erro'] = 3;
            $jsonRet['dados'] = "";
            $jsonRet['msg'] = "Falha Obtendo os dados do formulário";
        }
        break;
}

$json_str = json_encode($jsonRet);
echo ($json_str);    //imprime a string JSON
