<?php
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $txt);
$txt = date("h:i:sa");
fwrite($myfile, $txt);
fclose($myfile);
?>
