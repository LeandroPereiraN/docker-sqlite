# Ejercicio 17

## Levantar el contenedor de producción utilizando docker compose

```bash
docker compose up -d
```

El contenedor `crud_sqlite` se levanta y ejecuta el script `scripts/init-sqlite.sh` que automáticamente ejecuta todos los archivos `.sql` que encuentre en `bd/` en orden alfabético.

## Conectarse a la base

```bash
docker compose exec -u root crud_sqlite sqlite3 root/db/database.db
```

Comandos útiles dentro de la consola de `sqlite3`:

- `.tables` lista de tablas creadas.
- `.schema nombre_tabla` muestra el DDL generado.
- `SELECT * FROM ...;` inspecciona datos de ejemplo cargados por `09_DML-Usuarios.sql`.

## Reinicializar la base

Por defecto, si el archivo `/root/db/database.db` ya existe, el script de inicio no vuelve a ejecutar los SQL (evita sobrescribir datos).

**Puedes eliminar el volumen removiendo el archivo `database.db` que se encuentra en la carpeta `sqlite`.**

## Estructura de scripts

Los archivos en `bd/` se ejecutan en el orden especificado según la estructura de carpetas:

1. `00_DROP-Tables.sql` limpia cualquier tabla previa respetando dependencias.
2. `01_DDL-*.sql` a `09_DDL-*.sql` definen la estructura.
3. `10_DML-Usuarios.sql` inserta datos de ejemplo.

## Documentación de la API

La documentación se encuentra en `http://localhost:3000/docs`.

## En caso de problemas de formato

Ejecutar `dos2unix scripts/init-sqlite.sh`