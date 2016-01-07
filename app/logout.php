<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright http://m3-jp.com/
 */

require './config.php';

header("Content-Type: application/json; charset=utf-8");
header('X-Content-Type-Options: nosniff');

if(isset($_SESSION['__nc-cms'])){
    unset($_SESSION['__nc-cms']);
}

echo json_encode(array('result' => true));

?>
