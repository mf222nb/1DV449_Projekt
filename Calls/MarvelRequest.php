<?php

require_once("../rmccue/library/Requests.php");
require_once("../Key/KeyAPI.php");
Requests::register_autoloader();

$time = time();
$publicKey = "8336ebf74ee6d9e874c4a55361f06cbd";

$cachefile = "marvel.json";
$cachetime = 86400;


if (file_exists($cachefile) && filemtime($cachefile) > (time() - $cachetime )) {
    echo(file_get_contents($cachefile));
}
else{
    //Måste göra en md5-kryptering av en timestamp, den publika API-nyckeln och den privata API-nyckeln för att kunna göra ett kall till api:t från servern
    $hash = md5($time.key.$publicKey);

    $request = Requests::get('http://gateway.marvel.com/v1/public/characters?limit=100&ts='.$time.'&apikey='.$publicKey.'&hash='.$hash);
    if($request == "" || $request == null){
        echo(file_get_contents($cachefile));
        die();
    }
    file_put_contents($cachefile, $request->body);
    echo(file_get_contents($cachefile));
}