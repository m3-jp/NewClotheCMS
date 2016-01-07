<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright 2016 http://nc-cms.m3-jp.asia/
 */

require './config.php';

header("Content-Type: application/json; charset=utf-8");
header('X-Content-Type-Options: nosniff');

$json = array();
if((isset($_POST['__nc-login-id']) && strcmp($_POST['__nc-login-id'], LOGIN_ID) === 0) && (isset($_POST['__nc-login-password']) && strcmp($_POST['__nc-login-password'], LOGIN_PW) === 0)){
    $json['result'] = true;
    $_SESSION['__nc-cms'] = array();
    $_SESSION['__nc-cms']['login'] = time() + SESS_TIME;
}else{
    $json['result'] = false;
}

echo json_encode($json);

?>
