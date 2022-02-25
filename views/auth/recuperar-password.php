<h1 class="nombre-pagina">Recuperar password</h1>

<?php
include_once __DIR__ . "/../templates/alertas.php";
?>
<?php if($error) return;?>
<p class="descripcion-pagina">Coloca tu nuevo password a continuación</p>

<form method="POST" class="formulario">
    <div class="campo">
        <label for="password"></label>
        <input 
        type="password"
        id="password"
        name="password"
        placeholder="Tu nuevo password"
        >
    </div>
    <input type="submit" class="boton" value="Guardar">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Iniciá sesión</a>
    <a href="/crear-cuenta">Registrarse</a>
</div>