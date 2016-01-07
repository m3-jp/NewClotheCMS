<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright 2016 http://nc-cms.m3-jp.asia/
 */

require './config.php';

header("Content-Type: application/json; charset=utf-8");
header('X-Content-Type-Options: nosniff');

$json = array('result' => false);
if(isset($_SESSION['__nc-cms'])){
    if($_SESSION['__nc-cms']['login'] <= time()){
        unset($_SESSION['__nc-cms']);
    }else{
        $_SESSION['__nc-cms']['login'] = time() + SESS_TIME;
        $json['result'] = true;
    }
}

echo json_encode($json);

?>
