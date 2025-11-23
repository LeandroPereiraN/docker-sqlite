#!/bin/sh
set -e

DB_PATH=${SQLITE_DB_PATH:-/root/db/database.db}
INIT_DIR=${SQLITE_INIT_DIR:-/docker-entrypoint-initdb.d}
KEEP_ALIVE_CMD="tail -f /dev/null"

if [ ! -d "${INIT_DIR}" ]; then
  echo "Directorio de inicialización no encontrado: ${INIT_DIR}" >&2
  exit 1
fi

DB_FOLDER=$(dirname "${DB_PATH}")
mkdir -p "${DB_FOLDER}"

if [ -f "${DB_PATH}" ]; then
  echo "Ejecutando contenedor con ${DB_PATH} ya existente"
  exec ${KEEP_ALIVE_CMD}
fi

sql_files=$(cd "${INIT_DIR}" && ls -1 *.sql 2>/dev/null || true)

if [ -z "${sql_files}" ]; then
  echo "No se encontró ningún archivo SQL dentro de ${INIT_DIR}"
else
  for relative_path in ${sql_files}; do
    SQL_FILE="${INIT_DIR}/${relative_path}"

    echo "------------------------------"
    echo "Aplicando ${relative_path}"
    sqlite3 "${DB_PATH}" ".read ${SQL_FILE}"
    echo "Finalizado ${relative_path}"
    echo -e "------------------------------\n"
  done
fi

exec ${KEEP_ALIVE_CMD}
