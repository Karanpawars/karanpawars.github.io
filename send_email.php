<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];

    mail($email, $subject, $name);
    echo "mail sent";
?>