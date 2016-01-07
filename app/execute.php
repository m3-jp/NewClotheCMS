<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright http://m3-jp.com/
 */

require './config.php';

header("Content-Type: application/json; charset=utf-8");
header('X-Content-Type-Options: nosniff');

$json = array('result' => false);
if(isset($_SESSION['__nc-cms'])){
    $data = array();
    if(strcmp($_POST['type'], 'save') === 0){
        $data = serialize($_POST['input']);
        file_put_contents(LOGSPATH, $data);
        $json['result'] = true;
    }
}

echo json_encode($json);

?>
