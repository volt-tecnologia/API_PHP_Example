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
        $response = Requests::get($baseURL . "reset.cgi", array(), $options);
        $jsonRet['erro'] = $response->status_code;
        $jsonRet['dados'] = json_decode($response->body);
        $jsonRet['msg'] = "";
        break;

    case 2:
        $info = (object) $_GET;

        $getstring = "outpoe.cgi?poe=" . $info->poe . "&sts=" . $info->sts . "&pr=" . $info->pr;
        $response = Requests::get($baseURL . $getstring, array(), $options);
        $jsonRet['erro'] = $response->status_code;
        $jsonRet['dados'] = json_decode($response->body);
        $jsonRet['msg'] = $getstring;
        break;

    case 3:
        $info = (object) $_GET;

        $getstring = "outpoe.cgi?poe=" . $info->poe . "&sts=" . $info->sts . "&pr=" . $info->pr;
        $response = Requests::get($baseURL . $getstring, array(), $options);
        $jsonRet['erro'] = $response->status_code;
        $jsonRet['dados'] = json_decode($response->body);
        $jsonRet['msg'] = $getstring;
        break;

    case 4:
        $info = (object) $_GET;

        $getstring = "output.htm?porta=" . $info->porta . "&rmac=" . $info->rmac . "&nt=" . $info->nt;
        $response = Requests::get($baseURL . $getstring, array(), $options);
        $jsonRet['erro'] = $response->status_code;
        $jsonRet['dados'] = json_decode($response->body);
        $jsonRet['msg'] = $getstring;
        break;
}

$json_str = json_encode($jsonRet);
echo ($json_str);    //imprime a string JSON
