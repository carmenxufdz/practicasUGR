<?php
include('db_config.php');

// Devuelve la información de un usuario a partir de su nick 
function getUser($nick) {
  global $mysqli;
  $resultado = $mysqli->query("SELECT nick, email, pass, tipo FROM usuarios WHERE nick='$nick'") ;
        
  if($resultado->num_rows > 0) 
    return $resultado->fetch_assoc();
  else return 0;
}

// Devuelve true si existe un usuario con esa contraseña
function checkLogin($nick, $pass) {
  global $mysqli;
  $resultado = $mysqli->query("SELECT nick, pass From usuarios Where nick= '$nick'") ;
  if($resultado->num_rows > 0){
    $fila = $resultado -> fetch_assoc();
    // Comparamos pass (en texto plano) con $fila['pass'] en hash
    return password_verify($pass,$fila['pass']);
  }
  else return false;
}

  
// Registramos un nuevo usuario de tipo "Registrado"
function registrar($nick,$email,$pass){
  global $mysqli;
  if (empty($nick) || empty($email) || empty($pass)) 
    return false;
  $hash = password_hash($pass, PASSWORD_DEFAULT);
  return $mysqli->query("INSERT INTO usuarios VALUES ('$nick', '$email', '$hash','Registrado')");
}

// Cambiamos los datos de un usuario
function modifyUser($oldNick,$nick,$mail,$pass){
  global $mysqli;
  $hash = password_hash($pass,PASSWORD_DEFAULT);
  $mysqli->query("UPDATE usuarios SET nick = '$nick', email = '$mail', pass='$hash'
    WHERE nick = '$oldNick' ");
}

// Obtenemos la lista completa de todos los usuarios
function getListaUsuarios($nick){
  global $mysqli;
  $res = $mysqli->query("SELECT nick, email, tipo FROM usuarios WHERE nick != '$nick'") ;
  $usuarios = array() ;
  while($row = $res->fetch_assoc()){
    $usuario = array(
        'nick' => $row['nick'], 
        'email' => $row['email'], 
        'tipo' => $row['tipo']);
    array_push($usuarios,$usuario);
  }

  return $usuarios;
}

function modifyTipo($nick,$nuevotipo){
  global $mysqli;
  $recuento = $mysqli->query("SELECT COUNT(*) Cuenta From usuarios Where tipo = 'Superusuario'") ;
  $resultado = $mysqli->query("SELECT tipo From usuarios Where nick = '$nick'") ;
  $cuenta = $recuento->fetch_assoc()['Cuenta']; // tengo que sacar el dato de la variable
  $oldtipo = $resultado->fetch_assoc()['tipo'];
  if ($cuenta == "1" and $oldtipo == "Superusuario" and $nuevotipo != "Superusuario")
    return false;
  else {
    $mysqli->query("UPDATE usuarios SET tipo = '$nuevotipo' WHERE Nick = '$nick' ");
    return true;
  }
}
?>