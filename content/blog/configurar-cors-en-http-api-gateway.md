+++
url = "/blog/configurar-cors-en-http-api-gateway/"
title = "Configurar CORS en HTTP API Gateway"
description = "Aprende a configurar CORS en API Gateway de AWS para asegurar el acceso a tu API desde diferentes dominios de manera eficiente."
date = "2025-03-10T05:50:46.650000+00:00"
lastmod = "2025-03-13"
image = "/assets/blog/b7ca17278c2b7e43c95dfeecd8c4de8e83d1e24b5d8252f50118d4479ba3ab52.jpg"
archive_order = 16

[[related]]
title = "AWS Lambda y API Gateway: Guía Básica"
url = "/blog/aws-lambda-y-api-gateway-guia-basica/"
image = "/assets/blog/2aa39fe7ff55b6a37888515e706f83256fedddddcfcce79150375d78b5a19ce1.jpg"

[[related]]
title = "AWS OpsWorks: Automatiza Despliegues con Chef"
url = "/blog/aws-opsworks-automatiza-despliegues-con-chef/"
image = "/assets/blog/6b2f0b16a8f28318691c2a8d1bb81c632f4b360003f1ac1275ba3cffe00849d2.jpg"

[[related]]
title = "AWS Seguridad: Mejores Prácticas"
url = "/blog/aws-seguridad-mejores-practicas/"
image = "/assets/blog/58bea5d60c133d57e4a0bdbf31f2667ab339ea25ffae689b54e830ef790cc553.jpg"
+++

**¿Quieres que tu API sea accesible desde diferentes dominios de forma segura? Configurar CORS (Cross-Origin Resource Sharing) es clave para lograrlo.**

Esta guía rápida te explica cómo configurar CORS en un HTTP [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) de [AWS](https://aws.amazon.com/) en pocos pasos:

- **¿Qué es CORS?**: Es un mecanismo de seguridad que permite que un frontend (por ejemplo, `https://miapp.com`) acceda a una API en otro dominio (`https://api.miapp.com`).
- **HTTP API vs REST API**: La configuración de CORS en HTTP API es más sencilla y económica que en REST API.
- **Pasos básicos**:
  1. Accede a la consola de API Gateway.
  2. Selecciona tu HTTP API.
  3. Configura los parámetros de CORS: orígenes, métodos, cabeceras y más.
- **[Mejores prácticas](/blog/mejores-practicas-aws-para-devops/)**:
  - Restringe los orígenes permitidos.
  - Especifica solo los métodos y cabeceras necesarios.
  - Activa credenciales solo si es imprescindible.

### Comparativa rápida: HTTP API vs REST API {id="comparativa-rapida-http-api-vs-rest-api"}

| Característica | HTTP API | REST API |
| --- | --- | --- |
| Configuración de CORS | Automática y sencilla | Manual y compleja |
| Rendimiento | Menor latencia | Más funcionalidades |
| Coste | Más económico | Más alto |

**¿Problemas con CORS?** Revisa los errores más comunes y cómo solucionarlos en las herramientas del navegador.

Con esta guía, podrás configurar CORS de forma segura y eficiente. ¡Sigue leyendo para aprender más!

## Configuración de CORS en HTTP [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) {id="configuracion-de-cors-en-http-api-gateway"}

![API Gateway](/assets/blog/3bd76b02d8cc943a4861866defa3dd17775bb751e3fc24bb0100931f5fa695c4.jpg)

### Cómo acceder a la configuración de CORS {id="como-acceder-a-la-configuracion-de-cors"}

Para ajustar CORS en una HTTP API de API Gateway, primero debes ingresar a la [consola de AWS](/blog/aws-fundamentos-guia-de-inicio-rapido/) y localizar tu API. Una vez dentro, sigue estos pasos para encontrar la sección de configuración:

1. Ve a la consola de API Gateway.
2. Selecciona tu HTTP API en la lista.
3. En el menú de navegación izquierdo, haz clic en **CORS**.
4. En la sección principal, selecciona **Configurar**.

A continuación, revisa las opciones disponibles para personalizar la configuración.

### Parámetros de configuración de CORS {id="parametros-de-configuracion-de-cors"}

En HTTP API Gateway, puedes personalizar varios parámetros de CORS según tus necesidades. Aquí tienes una tabla con ejemplos comunes:

| Parámetro | Descripción | Ejemplo |
| --- | --- | --- |
| Access-Control-Allow-Origins | Especifica los orígenes permitidos | https://miapp.es |
| Access-Control-Allow-Methods | Métodos HTTP autorizados | GET, POST, PUT, DELETE, OPTIONS |
| Access-Control-Allow-Headers | Cabeceras permitidas en las solicitudes | Authorization, Content-Type, X-Amz-Date, X-Api-Key, X-Amz-Security-Token |
| Access-Control-Expose-Headers | Cabeceras visibles para el cliente | x-amz-date, x-api-id |
| Access-Control-Max-Age | Tiempo en segundos para cachear preflight | 300 segundos |

Ahora veamos cómo aplicar esta configuración en un caso práctico.

### Ejemplo básico de configuración de CORS {id="ejemplo-basico-de-configuracion-de-cors"}

Con los pasos anteriores, puedes implementar una configuración básica ajustando los siguientes parámetros:

- **Orígenes permitidos**  
  Agrega el dominio de tu aplicación: `https://miapp.es`
- **Métodos HTTP autorizados**  
  Incluye métodos como: `GET, POST, PUT, DELETE, OPTIONS`
- **Cabeceras permitidas**  
  Especifica cabeceras como: `Authorization, Content-Type, X-Amz-Date, X-Api-Key, X-Amz-Security-Token`

Antes de llevar esta configuración a producción, realiza una prueba en tu navegador. Asegúrate de que la respuesta incluya las cabeceras CORS esperadas. Esto garantizará que las solicitudes desde tu dominio funcionen correctamente.

## Configuración personalizada de CORS {id="configuracion-personalizada-de-cors"}

Tras haber configurado CORS de manera básica, es momento de ajustar las opciones para que se adapten mejor a las necesidades específicas de tu entorno.

### Restricción de orígenes permitidos {id="restriccion-de-origenes-permitidos"}

Definir con precisión los orígenes autorizados es clave. En lugar de usar el comodín `*`, que permite acceso desde cualquier origen, es mejor especificar los dominios permitidos.

Por ejemplo, puedes configurar los orígenes así:

| Entorno | Origen permitido |
| --- | --- |
| Desarrollo | https://dev.miapp.es |
| Pruebas | https://staging.miapp.es |
| Producción | https://miapp.es |

Incluye siempre el protocolo y, si es necesario, el subdominio. Una vez definidos los orígenes, ajusta los métodos y las cabeceras permitidas para aumentar la seguridad.

### Definición de métodos y cabeceras {id="definicion-de-metodos-y-cabeceras"}

Además de limitar los orígenes, es importante especificar los métodos y cabeceras que estará permitido usar. Solo habilita lo necesario para tu aplicación.

Si tu API realiza operaciones CRUD básicas, una configuración típica sería:

```
{
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Amz-Date"
}
```

### Manejo de credenciales {id="manejo-de-credenciales"}

El manejo de credenciales en solicitudes cross-origin es esencial si necesitas trabajar con cookies o encabezados de autorización. Para habilitarlo, sigue estos pasos:

1. Configura en el API Gateway lo siguiente:

   ```
   {
       "Access-Control-Allow-Credentials": "true"
   }
   ```
2. En el cliente, agrega `credentials: 'include'` en tus solicitudes fetch:

   ```
   fetch('https://api.miapp.es/recurso', {
       credentials: 'include'
   });
   ```

**Importante**: Cuando habilites credenciales, asegúrate de especificar cada origen permitido de forma explícita.

Permitir el uso de credenciales hace que la seguridad de tu API sea más exigente. Por eso, es recomendable implementar medidas adicionales, como el uso de tokens CSRF y una validación estricta de sesiones, especialmente si estás trabajando con cookies o credenciales de autenticación.

## Testing CORS Settings {id="testing-cors-settings"}

### Métodos de prueba CORS {id="metodos-de-prueba-cors"}

Puedes comprobar tu configuración CORS utilizando las herramientas de desarrollo del navegador o realizando solicitudes de prueba.

Aquí tienes un ejemplo para probar desde el frontend:

```
async function probarCORS() {
    try {
        const respuesta = await fetch('https://tu-api.execute-api.eu-west-1.amazonaws.com/test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Código de respuesta:', respuesta.status);
    } catch (error) {
        console.error('Error CORS:', error);
    }
}
```

Si la solicitud no funciona, consulta la siguiente sección para identificar y corregir errores.

### Solución de errores CORS {id="solucion-de-errores-cors"}

Aquí tienes una tabla con los problemas más comunes y cómo resolverlos:

| Error | Causa | Solución |
| --- | --- | --- |
| Origin not allowed | El origen no está en la lista permitida | Añade el origen en `Access-Control-Allow-Origin` |
| Method not allowed | Método HTTP no configurado | Incluye el método en `Access-Control-Allow-Methods` |
| Headers not allowed | Cabeceras no autorizadas | Agrega las cabeceras en `Access-Control-Allow-Headers` |

Para diagnosticar, revisa la respuesta OPTIONS de tu API:

1. Abre las herramientas de desarrollo del navegador.
2. Ve a la pestaña **Network** o **Red**.
3. Busca la solicitud preliminar OPTIONS.
4. Comprueba las cabeceras CORS en la respuesta.

Las herramientas del navegador pueden ser de gran ayuda para entender mejor los problemas.

### Herramientas del navegador para CORS {id="herramientas-del-navegador-para-cors"}

[Chrome DevTools](https://developer.chrome.com/docs/devtools) incluye funciones útiles para depurar problemas relacionados con CORS:

- **Panel de Console y Network**  
  Muestra mensajes detallados sobre errores CORS. También permite revisar las solicitudes OPTIONS y las cabeceras como:
  - `Access-Control-Allow-Origin`
  - `Access-Control-Allow-Methods`
  - `Access-Control-Allow-Headers`
- **Panel de Application**  
  Ideal para analizar cookies y credenciales cuando trabajas con `Access-Control-Allow-Credentials`.

Si usas [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/), también encontrarás herramientas para simular diferentes orígenes y analizar el comportamiento de tu API.

## Consejos de seguridad y rendimiento {id="consejos-de-seguridad-y-rendimiento"}

Con la configuración básica y personalizada de CORS ya en marcha, aquí tienes algunos consejos para reforzar la seguridad y mejorar el rendimiento de tu API.

### Directrices para una configuración CORS segura {id="directrices-para-una-configuracion-cors-segura"}

Una configuración adecuada de CORS ayuda a proteger tu API HTTP. Ten en cuenta estos puntos clave:

- **Define orígenes específicos**: Evita el uso de comodines innecesarios para limitar la exposición.
- **Usa HTTPS siempre**: Garantiza que el tráfico esté cifrado para prevenir ataques como el man-in-the-middle.
- **Aplica el principio de permisos mínimos**: Permite solo los métodos y cabeceras estrictamente necesarios.

| Aspecto | Configuración segura | Configuración no recomendada |
| --- | --- | --- |
| Orígenes | https://miapp.es | \* |
| Métodos | GET, POST específicos | Todos los métodos |
| Credenciales | false por defecto | true sin restricciones |

Estos pasos complementan los ejemplos básicos de configuración que ya hemos visto.

### Cómo CORS afecta el rendimiento {id="como-cors-afecta-el-rendimiento"}

La implementación de CORS puede influir en el rendimiento de tu API. Algunos factores a considerar:

- **Solicitudes OPTIONS**: Configura `Access-Control-Max-Age` para almacenar en caché las respuestas OPTIONS y reducir la latencia.
- **Validación de orígenes**: Validar múltiples orígenes puede aumentar el tiempo de respuesta.
- **Cabeceras adicionales**: Cada cabecera extra incrementa el tamaño de la respuesta, afectando el rendimiento.

Para mejorar el rendimiento, puedes usar una configuración como esta:

```
{
    "cors": {
        "allowOrigins": ["https://miapp.es"],
        "allowMethods": ["GET", "POST"],
        "maxAge": 300,
        "allowCredentials": false
    }
}
```

### ¿Cuándo usar comodines? {id="cuando-usar-comodines"}

El uso de comodines (\*), aunque tentador, debe limitarse a APIs públicas o entornos de desarrollo. En producción, es mejor mantener una lista específica de orígenes permitidos:

```
{
    "allowOrigins": [
        "https://app.miempresa.es",
        "https://admin.miempresa.es",
        "https://dev.miempresa.es"
    ]
}
```

Busca un equilibrio entre flexibilidad en el desarrollo y seguridad en producción. Prueba siempre estos ajustes en el navegador para asegurarte de que funcionan como esperas, tal y como se explicó en la sección de testing.

## Próximos pasos {id="proximos-pasos"}

Después de configurar y probar CORS, es importante planificar las siguientes acciones para mantener un buen rendimiento y garantizar la seguridad a largo plazo.

### Revisión de puntos clave {id="revision-de-puntos-clave"}

Para implementar CORS de manera efectiva, ten en cuenta lo siguiente:

- **Configuración inicial y avanzada**: Comienza con una configuración básica para pruebas y utiliza configuraciones más específicas en producción, limitando los orígenes permitidos.
- **Seguridad y optimización**: Asegúrate de usar HTTPS, valida todas las entradas y aplica métodos sólidos de autenticación y autorización. Además, mejora el rendimiento con técnicas como caché y compresión.

| Aspecto | Herramienta recomendada | Función principal |
| --- | --- | --- |
| Monitorización | [CloudWatch](https://docs.aws.amazon.com/cloudwatch/) | Seguimiento de métricas y registros |
| Trazabilidad | [X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) | Análisis de latencia y detección de errores |
| Auditoría | [CloudTrail](https://docs.aws.amazon.com/cloudtrail/) | Registro de actividades en la API |

Con estos puntos claros, puedes consultar más recursos para ampliar tus conocimientos sobre la configuración de CORS.

### Recursos adicionales {id="recursos-adicionales"}

Si quieres aprender más sobre la configuración de CORS y cómo mejorar la seguridad en AWS, aquí tienes algunos recursos en español:

- **[Dónde Aprendo AWS](/)** (https://dondeaprendoaws.com): Un portal especializado con artículos y tutoriales en español sobre AWS, incluyendo guías detalladas sobre cómo proteger tu infraestructura en la nube.
- **Estrategia de seguridad**: El artículo *"Estrategia de seguridad en la nube de AWS, ¿Por dónde empezar?"* ofrece una excelente introducción para implementar medidas de seguridad eficaces.

No olvides revisar periódicamente tu configuración y actualizar las medidas de seguridad utilizando herramientas como CloudWatch, X-Ray y CloudTrail.

## Publicaciones de blog relacionadas

- [Cómo Habilitar CloudWatch Logs en API Gateway: Guía Paso a Paso](/blog/como-habilitar-cloudwatch-logs-en-api-gateway-guia-paso-a-paso/)
- [Guía para Crear APIs Serverless con AWS Lambda y API Gateway](/blog/guia-para-crear-apis-serverless-con-aws-lambda-y-api-gateway/)
- [AWS Lambda y API Gateway: Guía Básica](/blog/aws-lambda-y-api-gateway-guia-basica/)
- [5 Prácticas de Seguridad para Lambda Authorizers](/blog/5-practicas-de-seguridad-para-lambda-authorizers/)
