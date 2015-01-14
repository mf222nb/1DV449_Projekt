<?php

require_once("../rmccue/library/Requests.php");
require_once("../Key/KeyAPI.php");
Requests::register_autoloader();

$time = time();
$publicKey = "8336ebf74ee6d9e874c4a55361f06cbd";

$character = $_POST['character'];

//Måste göra en md5-kryptering av en timestamp, den publika API-nyckeln och den privata API-nyckeln för att kunna göra ett kall till api:t från servern
$hash = md5($time.key.$publicKey);

$request = Requests::get('http://gateway.marvel.com/v1/public/characters?nameStartsWith='.$character.'&ts='.$time.'&apikey='.$publicKey.'&hash='.$hash);

echo($request->body);