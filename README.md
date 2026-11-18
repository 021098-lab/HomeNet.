# HomeNet - Integración de módulos
Proyecto académico demostrativo desarrollado con HTML, CSS y JavaScript (módulos ES6).

## Requisitos
- Visual Studio Code
- Extensión Live Server
- Navegador actualizado
- Git instalado (opcional para control de versiones)\n- Node.js instalado para ejecutar pruebas automatizadas

## Ejecución
1. Descomprime la carpeta.
2. Abre la carpeta HomeNet desde Visual Studio Code.
3. Abre `index.html` y selecciona **Open with Live Server**.
4. Ingresa con usuario `admin` y contraseña `homenet123`.

## Módulos
- `js/modules/auth.js`: autenticación demostrativa.
- `js/modules/devices.js`: alta, activación/desactivación y eliminación.
- `js/modules/network.js`: asignación de prioridad.
- `js/modules/monitoring.js`: cálculo de indicadores.
- `js/services/state.js` y `storage.js`: estado compartido y persistencia local.
- `js/app.js`: integra eventos, módulos y presentación.

## Alcance y limitaciones
Los datos se guardan en `localStorage` del navegador. La autenticación es únicamente demostrativa y no debe utilizarse como seguridad real. No existe conexión a un router físico, backend ni base de datos remota. Las cifras de consumo son datos de ejemplo.

## Pruebas manuales
1. Iniciar sesión con credenciales válidas y verificar acceso al panel.
2. Intentar iniciar sesión con contraseña incorrecta y verificar el mensaje.
3. Agregar un celular y verificar que aparezca en dispositivos.
4. Cambiar su prioridad a Alta y verificar el valor.
5. Desactivar y volver a activar el dispositivo.
6. Eliminar el dispositivo y verificar que desaparezca.
7. Revisar que el historial registre las acciones.
8. Recargar el navegador y verificar persistencia de datos.

## Pruebas automatizadas
Desde una terminal ubicada en la carpeta del proyecto, ejecuta:
```bash
npm test
```
El proyecto usa el ejecutor de pruebas integrado de Node.js (`node:test`), sin instalar frameworks externos. Se prueban validación de acceso, alta de dispositivos, validación de nombre, prioridad, activación/desactivación, eliminación y métricas.
