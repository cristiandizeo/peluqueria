<h1 class="nombre-pagina">Login</h1>

<p class="descripcion-pagina">Iniciá sesión con tus datos</p>

<?php
include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="text"
            type="email"
            id="email"
            placeholder="Tu email"
            name="email"
            value="<?php echo s($auth->email);?>"
        />
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input
        type="password"
        id="password"
        placeholder="Tu password"
        name="password"
        />
    </div>

    <input type="submit" class="boton" value="Iniciar sesion">

</form>

<div class="acciones">
    <a href="/crear-cuenta">Registrarse</a>
    <a href="/olvide">Olvidé mi contraseña</a>
</div>