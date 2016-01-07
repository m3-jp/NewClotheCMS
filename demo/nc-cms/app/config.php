<?php

/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright 2016 http://nc-cms.m3-jp.asia/
 */

session_start();

define('LOGIN_ID', 'admin');
define('LOGIN_PW', 'admin');

define('DOCROOT', realpath(__DIR__.DIRECTORY_SEPARATOR.'..').DIRECTORY_SEPARATOR);
define('LOGSPATH', DOCROOT.'app'.DIRECTORY_SEPARATOR.'logs'.DIRECTORY_SEPARATOR.'data.log');
define('SESS_TIME', 3600);

$GLOBALS['__nc'] = array();
$GLOBALS['__nc']['data'] = array();

if(file_exists(LOGSPATH)){
    $GLOBALS['__nc']['data'] = unserialize(file_get_contents(LOGSPATH));
}

function __nc_getData($key){
    $str = '';
    if(isset($GLOBALS['__nc']['data'][$key])){
        $str = $GLOBALS['__nc']['data'][$key];
    }
    return preg_replace('/\n|\r|(\r\n)/', "<br>", htmlspecialchars($str)).'<span class="__nc-key-'.$key.' hide"></span>';
}

?>
