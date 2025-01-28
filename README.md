# IfIGone - Mensaje de Contingencia

IfIGone es una aplicación diseñada para enviar un mensaje importante por correo electrónico si no se recibe una petición HTTP en un período de tiempo determinado. Esto resulta útil para gestionar información crítica en situaciones de emergencia o contingencia.

## Requisitos

- **Docker**: Instala Docker desde [aquí](https://www.docker.com/).
- **Docker Compose**: Verifica su instalación con `docker-compose --version`. Normalmente está incluido con Docker.

## Importar la Imagen de Docker

La imagen de Docker está disponible como un archivo `.tar` en la sección de *releases* de este repositorio.

1. **Descarga la imagen**:
   - Accede a la sección de [Releases](https://github.com/tu-repo/repo/releases).
   - Descarga el archivo `if-i-gone.tar`.

2. **Importa la imagen en Docker**:
   - Abre una terminal y navega al directorio donde descargaste el archivo `.tar`.
   - Carga la imagen ejecutando:
     ```bash
     docker load -i if-i-gone.tar
     ```
   - Verifica la importación con:
     ```bash
     docker images
     ```
     Salida esperada:
     ```
     REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
     if-i-gone     01        <IMAGE_ID>     X hours ago    XXXMB
     ```

## Configuración y Ejecución con Docker Compose

El archivo `docker-compose.yml` está preconfigurado para ejecutar la aplicación. Su contenido es el siguiente:

```yaml
version: '3.8'

services:
  if-i-gone:
    image: if-i-gone:01
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - EMAIL_SERVICE=gmail
      - EMAIL_USER=example@example.com
      - EMAIL_PASSWORD=example
      - EMAIL_RECIPIENT=example@example.es
      - EMAIL_SUBJECT=Mensaje importante
      - EMAIL_MESSAGE=Este es un mensaje importante que se envía porque no se recibió una petición en el tiempo establecido.
      - INTERVALO_MS=15768000000 # medio año en milisegundos
```

### Pasos para Ejecutar

1. **Editar las variables de entorno**:
   - Modifica el archivo `docker-compose.yml` para incluir tus valores personalizados:
     - `EMAIL_SERVICE`: Servicio de correo electrónico (por ejemplo, `gmail`).
     - `EMAIL_USER`: Tu dirección de correo electrónico.
     - `EMAIL_PASSWORD`: Contraseña de tu correo electrónico o contraseña de aplicación.
     - `EMAIL_RECIPIENT`: Dirección de correo electrónico del destinatario.
     - `EMAIL_SUBJECT`: Asunto del mensaje de correo.
     - `EMAIL_MESSAGE`: Contenido del mensaje que será enviado.
     - `INTERVALO_MS`: Tiempo en milisegundos antes de enviar el mensaje. Valor predeterminado: `15768000000` (medio año).

2. **Iniciar el contenedor**:
   - Navega al directorio donde se encuentra el archivo `docker-compose.yml`.
   - Ejecuta el siguiente comando para iniciar el contenedor:
     ```bash
     docker-compose up -d
     ```
   - Esto iniciará el contenedor en segundo plano.

3. **Verificar el estado del contenedor**:
   - Asegúrate de que el contenedor esté ejecutándose con el comando:
     ```bash
     docker ps
     ```
   - La salida esperada incluirá una línea similar a:
     ```
     CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES
     <CONTAINER_ID> if-i-gone:01   "docker-entrypoint.s…"   X seconds ago   Up X seconds   0.0.0.0:3000->3000/tcp   if-i-gone
     ```

4. **Realizar una petición al servidor**:
   - Abre tu navegador o usa `curl` para hacer una petición HTTP GET al endpoint:
     ```bash
     http://localhost:3000/ok
     ```
   - La respuesta esperada será: `Petición recibida. El contador ha sido reiniciado.`

## Detener el Contenedor

Para detener el contenedor, ejecuta el siguiente comando:

```bash
docker-compose down

