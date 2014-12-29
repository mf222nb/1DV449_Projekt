<?php

require_once("../rmccue/library/Requests.php");
Requests::register_autoloader();

$title = $_GET['title'];

$request = Requests::get('http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles='.$title.'&rvprop=content&rvsection=0&format=json');

echo($request->body);
