<?php

require_once("../rmccue/library/Requests.php");
require_once("../Key/KeyAPI.php");
Requests::register_autoloader();

$time = time();
$publicKey = "8336ebf74ee6d9e874c4a55361f06cbd";

$hash = md5($time.key.$publicKey);

$request = Requests::get('http://gateway.marvel.com/v1/public/comics?format=comic&limit=100&ts='.$time.'&apikey='.$publicKey.'&hash='.$hash);

echo($request->body);