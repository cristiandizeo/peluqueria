<div class="barra">
    <p>¡Hola, <strong><?php echo $nombre;?></strong>!</p>

    <a class="boton" href="/logout">Cerrar sesión</a>
</div>

<?php if(isset($_SESSION['admin'])){ ?>
    <div class="barra-servicios">
        <a class="boton" href="/admin">Citas</a>
        <a class="boton" href="/servicios">Servicios</a>
        <a class="boton" href="/servicios/crear">Nuevo servicio</a>
    </div>
<?php }?>