# Nightlife: recepción privada de propuestas

Este Apps Script recibe propuestas de contactos de confianza. El token se valida en el servidor; los flyers, sets y metadatos se guardan en Drive privado. El sitio público no almacena tokens y una propuesta nunca se publica automáticamente.

## Preparar el proyecto de Apps Script

1. Creá una carpeta privada en Google Drive para las propuestas. No la compartas con “Cualquier persona con el enlace”.
2. Creá un proyecto independiente en [script.google.com](https://script.google.com/) y agregá los archivos `Code.gs`, `Intake.html` y `appsscript.json` de esta carpeta. También podés subirlos con `clasp`.
3. En **Configuración del proyecto → Propiedades de la secuencia de comandos**, agregá:
   - `DRIVE_FOLDER_ID`: ID de la carpeta privada de Drive.
   - `NOTIFICATION_EMAIL`: correo que recibirá el aviso, sin archivos adjuntos.
   - `ACCESS_TOKEN_HASHES`: JSON con SHA-256 de cada token autorizado, por ejemplo `["hash-hex-de-64-caracteres"]`.
4. Generá tokens aleatorios de al menos 24 caracteres con un gestor de contraseñas. No los incluyas en el repositorio, `.env`, correo de notificación ni código del navegador.
5. Calculá el SHA-256 de cada token localmente con `node tools/hash-nightlife-token.mjs`. La terminal lo pide sin mostrarlo ni guardarlo en el historial; guardá solo el hash resultante en la lista JSON `ACCESS_TOKEN_HASHES` y compartí cada token por un canal privado con su contacto.
6. Implementá como **Aplicación web**, ejecutándose como tu cuenta. El formulario debe ser accesible de forma anónima para que los contactos no tengan que iniciar sesión en Google; todos los envíos siguen protegidos por token validado en el servidor. Google Workspace puede restringir esta opción.
7. Copiá la URL terminada en `/exec`. En la raíz del proyecto, creá `.env.local` (ignorado por Git) con:

   ```dotenv
   VITE_NIGHTLIFE_INTAKE_URL=https://script.google.com/macros/s/ID_DE_IMPLEMENTACION/exec
   ```

   Para GitHub Pages, agregá `VITE_NIGHTLIFE_INTAKE_URL` como **Actions variable** del repositorio. La URL no es un secreto; los hashes de los tokens y los IDs de carpetas permanecen en Apps Script.
8. Confirmá que llega un aviso sin adjuntos, que aparece una carpeta de propuesta dentro del Drive privado con `proposal.json` marcado `pending`, y que la propuesta no aparece en el sitio.

## Datos admitidos y límites

- Obligatorios: token, título, fecha, género, venue, ciudad, flyer, nombre, correo y consentimiento.
- Opcionales: hora, descripción, DJ set, URL de entradas/evento, productora y YouTube.
- Flyer: JPG, PNG o WebP real, máximo 8 MB. DJ set: MP3, WAV, M4A u OGG, máximo 18 MB. Máximo combinado: 22 MB.
- URLs externas: solo HTTPS; el enlace de video debe ser de YouTube.
- Límite por diseño: 5 propuestas por token y 30 en total por día.

## Publicación

El correo es solo una notificación. Cada carpeta de Drive contiene `proposal.json`, los medios y el estado `pending`. Revisá y aprobá manualmente la propuesta; después incorporá los recursos aprobados y sus datos a `public/events.json` y publicá una nueva versión del sitio. La app de escritorio/importador automático es una etapa posterior y no forma parte de este receptor.

Los eventos de ejemplo están en `src/data/events.example.json` y se cargan solo en modo desarrollo. El `public/events.json` de producción comienza vacío.
