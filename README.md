# ai-messaging-viewer

Este proyecto permite visualizar y agrupar mensajes en conversaciones, asegurando que se procesen de manera cronológica y correctamente agrupados.

### Nota sobre la prueba de fechas específicas:
Para probar fechas específicas, debes cambiar el valor por defecto de `const now = new Date('2024-03-13T09:51:13Z')` que se encuentra en la línea 21 del archivo `MessageViewer.tsx`. Modifica esta fecha según el caso que desees probar.

## Supuestos realizados

### Orden de los mensajes:
- Se supone que los mensajes deben procesarse en orden cronológico según el campo `id`. 
- Si el orden no está garantizado en los datos de entrada, los mensajes se ordenan antes de ser agrupados.

### Estructura de los mensajes:
Cada mensaje tiene las siguientes propiedades:
- `id`: Identificador único del mensaje (tipo `string`).
- `content`: Contenido del mensaje (tipo `string`).
- `reply_to_id`: Identificador del mensaje al que responde (tipo `string | null`).

### Conversaciones aisladas:
- Un mensaje con `reply_to_id` que no coincide con ningún `id` previo marca el inicio de una nueva conversación.

## Lista de características implementadas

### Agrupación por conversaciones:
- Los mensajes se agrupan en arrays separados según las respuestas (o falta de ellas).

### Gestión de múltiples conversaciones:
- Soporte para múltiples hilos de conversación dentro de la misma lista de mensajes.

### Orden cronológico:
- Asegura que las conversaciones estén en orden cronológico basado en los identificadores de mensaje.

### Soporte para mensajes huérfanos:
- Si un mensaje tiene un `reply_to_id` que no coincide con ningún mensaje previo, se trata como el inicio de una nueva conversación.

### Funcionalidad de copiar al portapapeles:
- Los usuarios pueden copiar el contenido de cualquier mensaje al portapapeles utilizando un botón de "copiar" que aparece al hacer hover sobre el mensaje.
  
  La funcionalidad de copiar se gestiona mediante un ícono (CopyIcon) que se muestra solo cuando el cursor se encuentra sobre el mensaje. Al hacer clic en el ícono, el mensaje se copia al portapapeles.


## Decisiones técnicas y sus justificaciones

### Ordenación de mensajes:
- Se ordenan los mensajes para garantizar un procesamiento predecible, lo que simplifica el algoritmo de agrupación.

### Estructura de salida:
- Se devuelve un array de arrays (`Message[][]`), que es fácil de interpretar y utilizar en cualquier lógica de presentación.

### Uso de arrays para almacenamiento temporal:
- Al usar arrays para manejar conversaciones y mensajes, se garantiza un rendimiento adecuado y una implementación sencilla.

## Limitaciones conocidas o áreas de mejora

### Eficiencia en grandes volúmenes de datos:
- Actualmente, el algoritmo utiliza una búsqueda lineal para encontrar el mensaje al que se está respondiendo. Esto puede volverse ineficiente con un gran número de mensajes. Se podría optimizar utilizando un mapa (`Map`) para accesos más rápidos.

### Gestión de mensajes fuera de orden:
- Si los mensajes no están correctamente ordenados por su `id`, el resultado puede ser inconsistente. Mejoras futuras podrían incluir la validación o el manejo de datos desordenados.

### Soporte para hilos más complejos:
- La lógica actual asume que cada mensaje solo pertenece a un hilo lineal. Conversaciones más complejas con respuestas anidadas podrían requerir un modelo jerárquico en lugar de uno lineal.

### Validación de entrada:
- Actualmente, no se realizan validaciones extensas en los datos de entrada. Se podrían agregar validaciones para garantizar que los mensajes tienen los campos requeridos y que sus valores son válidos.

### Soporte para otros criterios de ordenación:
- Actualmente, los mensajes se ordenan solo por `id`. Se podría ampliar para soportar ordenación por marca de tiempo u otros campos.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/PabloUGomez/ai-messaging-viewer.git
    ```
2. Accede al directorio del proyecto:
    ```bash
    cd ai-messaging-viewer
    ```
3. Instala las dependencias necesarias:
    ```bash
    npm install
    ```
4. Inicia la aplicación:
    ```bash
    npm run dev
    ```


