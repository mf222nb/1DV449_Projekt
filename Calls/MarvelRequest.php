<?php

require_once("../rmccue/library/Requests.php");
Requests::register_autoloader();

$request = Requests::get('http://gateway.marvel.com:80/v1/public/comics?apikey=8336ebf74ee6d9e874c4a55361f06cbd');

echo($request->body);