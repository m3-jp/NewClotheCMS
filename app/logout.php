<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright 2016 http://nc-cms.m3-jp.asia/
 */

require './config.php';

header("Content-Type: application/json; charset=utf-8");
header('X-Content-Type-Options: nosniff');

if(isset($_SESSION['__nc-cms'])){
    unset($_SESSION['__nc-cms']);
}

echo json_encode(array('result' => true));

?>
