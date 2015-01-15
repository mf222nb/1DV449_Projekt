<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 2014-12-15
 * Time: 15:58
 */

require_once("h2o/h2o.php");

//Bibliotek för att köra vanlig html istället för php.
$h2o = new h2o('templates/index.html');
echo $h2o->render();