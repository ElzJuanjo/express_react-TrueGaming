## VERSIONES

#### ALPHA 1.5

* Publicacion de Reseñas con y sin imagen (url o upload)
* Nuevos estilos con responsividad
* Filtros
* Navegación con y sin sesión
* Likes
* Comentarios
* API conectada
* Se agregan juegos a la DB con la API
* Busqueda de reseñas por juego y su puntuación
* Seguir Usuarios
* Notificaciones por correo a usuarios que te siguen

## COMANDOS

###### Instalar dependencias: ``npm install --no-audit``

###### Iniciar proyecto: ``npm start``

## PENDIENTES

* Panel de MI CUENTA (Proximo finde)

## CAMBIOS NECESARIOS EN LA DB

ALTER TABLE likes
DROP CONSTRAINT fk_id_resena,
ADD CONSTRAINT fk_id_resena
FOREIGN KEY (id_resena) REFERENCES resena(id_resena)
ON DELETE CASCADE;
