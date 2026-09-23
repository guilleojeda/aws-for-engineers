+++
url = "/blog/guia-completa-para-depurar-errores-cors-en-api-gateway/"
title = "Guía completa para depurar errores CORS en API Gateway"
description = "Aprende a configurar y depurar errores CORS en API Gateway para garantizar el acceso seguro y eficiente a tus APIs."
date = "2025-05-26T19:44:19.872000+00:00"
lastmod = "2025-05-29"
image = "/assets/blog/8cdc1f9432243e263d1de43143e73254b8508c0e3eb2dea97639598ff17e821a.jpg"
archive_order = 7

[[related]]
title = "Políticas de Confianza AWS: Acceso Entre Cuentas"
url = "/blog/politicas-de-confianza-aws-acceso-entre-cuentas/"
image = "/assets/blog/6d11bddb1995c82265977259be84de27ace865ca10f6dfb4e904c009c2483419.jpg"

[[related]]
title = "CQRS y Event Sourcing en AWS: Guía para Microservicios"
url = "/blog/cqrs-y-event-sourcing-en-aws-guia-para-microservicios/"
image = "/assets/blog/53f0f04efd58a298eab8c1e12b7b8657c314d7ff1d6012e3742d683ed9092f9c.jpg"

[[related]]
title = "AWS OpsWorks para Chef y Puppet: Preguntas Frecuentes"
url = "/blog/aws-opsworks-para-chef-y-puppet-preguntas-frecuentes/"
image = "/assets/blog/865feccab5c0ad8e72605945a122cfb3c14331eb4eafbd473e612333e6ea16c8.jpg"
+++

Enfrentar errores CORS (Cross-Origin Resource Sharing) en [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) puede ser frustrante, pero con una configuración adecuada y herramientas de diagnóstico, es posible resolverlos rápidamente. Aquí tienes un resumen de los puntos clave para abordar este problema:

- **¿Qué es CORS?**: Es una medida de seguridad que restringe solicitudes entre diferentes dominios. Si no se configuran correctamente las cabeceras HTTP necesarias, el navegador bloqueará el acceso.
- **Errores comunes**: Falta de cabeceras como `Access-Control-Allow-Origin`, problemas con solicitudes preflight (método `OPTIONS`), cabeceras personalizadas no autorizadas o configuraciones incorrectas al usar credenciales.
- **Soluciones básicas**:
  - Configura CORS desde la consola de [AWS](https://aws.amazon.com/) o mediante código.
  - Asegúrate de incluir cabeceras esenciales como `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` y `Access-Control-Allow-Headers`.
  - Si usas [Lambda](https://docs.aws.amazon.com/lambda/), devuelve las cabeceras CORS necesarias en cada respuesta.
- **Errores avanzados**:
  - Problemas con autenticación (ej. [AWS Cognito](https://docs.aws.amazon.com/cognito/)) requieren personalizar las respuestas de error en API Gateway.
  - Manejo de múltiples dominios mediante listas blancas dinámicas.
  - Mejorar rendimiento almacenando en caché las solicitudes preflight con `Access-Control-Max-Age`.

**Tabla rápida de cabeceras CORS esenciales**:

| Cabecera | Descripción | Ejemplos |
| --- | --- | --- |
| `Access-Control-Allow-Origin` | Orígenes permitidos | `https://miapp.com`, `*` |
| `Access-Control-Allow-Methods` | Métodos HTTP permitidos | `GET`, `POST`, `DELETE`, `OPTIONS` |
| `Access-Control-Allow-Headers` | Cabeceras permitidas en la solicitud | `Content-Type`, `Authorization` |
| `Access-Control-Allow-Credentials` | Permite incluir cookies o credenciales | `true` |
| `Access-Control-Max-Age` | Tiempo de caché para solicitudes preflight | `300` (en segundos) |

**Consejo práctico**: Usa herramientas como **[cURL](https://curl.se/)** o **[Postman](https://www.postman.com/)** para probar las cabeceras y verifica los registros en [CloudWatch](https://docs.aws.amazon.com/cloudwatch/) para identificar problemas. Configura correctamente el método `OPTIONS` y redespliega la API después de cualquier cambio.

Con estos pasos, puedes garantizar que tus APIs sean accesibles y seguras, evitando errores CORS que afecten la experiencia del usuario.

## Configuración básica de CORS en [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) {id="configuracion-basica-de-cors-en-api-gateway"}

![API Gateway](/assets/blog/976fe388db43394992df0fcbb911d89d894e49a915fd9151cac8595d879d1fab.jpg)

Configurar correctamente CORS en API Gateway es clave para evitar problemas y asegurar que tus aplicaciones funcionen sin errores relacionados con el intercambio de recursos entre orígenes.

### Habilitar CORS desde la consola de [AWS](https://aws.amazon.com/) {id="habilitar-cors-desde-la-consola-de-aws"}

![AWS](/assets/blog/19e0e8e3df9378d0687726b91706f07b647aa28f6de455fc7b641e9ecff0d83a.jpg)

La [consola de administración de AWS](/blog/aws-fundamentos-guia-de-inicio-rapido/) facilita la configuración de CORS en APIs REST, siendo una opción ideal si prefieres trabajar con una interfaz gráfica.

Para comenzar, accede a la consola de API Gateway, selecciona tu API y ve a la sección **Resources**. Allí, elige el recurso donde deseas habilitar CORS y haz clic en **Enable CORS**.

Al hacerlo, se abrirá un cuadro de configuración que te permitirá personalizar aspectos clave. Selecciona los métodos para los que deseas habilitar CORS, asegurándote de incluir el método `OPTIONS`, ya que es obligatorio. Una vez configurado, guarda los cambios y despliega la API.

En el campo **Access-Control-Allow-Headers**, ingresa las cabeceras necesarias que el cliente debe enviar. Un ejemplo común que ofrece la consola es:  
`'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'`.

Para **Access-Control-Allow-Origin**, puedes optar por `'*'` si deseas permitir solicitudes desde cualquier origen, o especificar un origen concreto, como `https://www.example.com`.

Es importante tener en cuenta que habilitar CORS para un recurso no lo activa automáticamente para sus recursos secundarios. Si otros recursos necesitan CORS, deberás configurarlos individualmente.

Cuando habilitas CORS desde la consola, API Gateway crea automáticamente un método `OPTIONS` y añade la cabecera `Access-Control-Allow-Origin` a las respuestas de integración de los métodos existentes.

### Configurar CORS con código {id="configurar-cors-con-codigo"}

Si necesitas automatizar la configuración de CORS, puedes hacerlo mediante código. Este enfoque es útil para mantener consistencia entre diferentes entornos de desarrollo y despliegue.

Para **APIs HTTP**, puedes usar [AWS CLI](https://docs.aws.amazon.com/cli/) con el siguiente comando:

```
aws apigatewayv2 update-api --api-id api-id --cors-configuration AllowOrigins="https://www.example.com"
```

Este comando permite solicitudes CORS desde `https://www.example.com`. Una ventaja de las APIs HTTP es que API Gateway responde automáticamente a las solicitudes preflight `OPTIONS`, incluso si no has configurado una ruta específica para este método.

Para que las cabeceras CORS funcionen correctamente, las solicitudes deben incluir una cabecera `origin` y, en el caso de solicitudes preflight `OPTIONS`, una cabecera `Access-Control-Request-Method`.

### Cabeceras esenciales de CORS {id="cabeceras-esenciales-de-cors"}

Entender las cabeceras CORS es crucial para configurar correctamente tu API y resolver posibles problemas. Estas son algunas de las más importantes:

- **`Access-Control-Allow-Origin`**: Indica los orígenes permitidos para acceder al recurso. Ejemplos comunes incluyen `https://www.example.com`, `*` (todos los orígenes) o `https://*` (cualquier dominio que comience con `https://`).
- **`Access-Control-Allow-Methods`**: Define los métodos HTTP permitidos, como `GET`, `POST`, `DELETE` o `*` para permitir todos los métodos.
- **`Access-Control-Allow-Headers`**: Especifica las cabeceras permitidas en la solicitud real.

| Cabecera CORS | Descripción | Valores de ejemplo |
| --- | --- | --- |
| `Access-Control-Allow-Origin` | Orígenes autorizados | `https://www.example.com`, `*`, `https://*` |
| `Access-Control-Allow-Methods` | Métodos HTTP permitidos | `GET`, `POST`, `DELETE`, `*` |
| `Access-Control-Allow-Headers` | Cabeceras permitidas | `Authorization`, `*`, `Content-Type,X-Amz-Date...` |
| `Access-Control-Allow-Credentials` | Permite incluir credenciales (cookies, etc.) | `true` |
| `Access-Control-Max-Age` | Tiempo de caché para solicitudes preflight | `300` |

Si utilizas integraciones proxy con Lambda, tu función backend debe devolver las cabeceras CORS necesarias. Aquí tienes un ejemplo básico:

```
export const handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "https://www.example.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

La cabecera **`Access-Control-Allow-Credentials`** indica si el navegador debe incluir cookies o cabeceras de autorización (`true`). Por otro lado, **`Access-Control-Max-Age`** define el tiempo en segundos que una solicitud preflight puede almacenarse en caché, siendo `300` un valor común.

## Solucionar errores comunes de CORS {id="solucionar-errores-comunes-de-cors"}

Con la configuración básica lista, aquí tienes soluciones para abordar algunos de los errores más frecuentes relacionados con CORS en API Gateway. Estos pasos te ayudarán a identificar y resolver problemas específicos.

### Problemas con solicitudes preflight {id="problemas-con-solicitudes-preflight"}

Las solicitudes preflight son una parte clave de CORS. Estas verifican los permisos antes de la solicitud principal, enviando automáticamente una petición OPTIONS cuando se usan cabeceras personalizadas o métodos como PUT o DELETE.

Uno de los errores más comunes ocurre cuando el método OPTIONS no está configurado correctamente o no existe. Si estás trabajando con integraciones proxy en Lambda, recuerda que tu función debe incluir las cabeceras CORS explícitamente, ya que habilitarlas desde la consola no las añade automáticamente.

Errores como 401 o 403 en solicitudes preflight suelen indicar que necesitas ajustar las "Gateway Responses". Por ejemplo, desactiva el requisito de clave API para el método OPTIONS en CloudFormation para evitar errores 403, ya que estas solicitudes no deberían incluir la cabecera `x-api-key`.

Para configurar correctamente el método OPTIONS, puedes crear una integración mock en API Gateway. Asegúrate de incluir las siguientes cabeceras en la respuesta 200:

```
{
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
    "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PUT,POST,PATCH",
    "Access-Control-Allow-Origin": "*"
}
```

A continuación, revisemos cómo las cabeceras personalizadas pueden generar problemas similares.

### Problemas con cabeceras personalizadas {id="problemas-con-cabeceras-personalizadas"}

Las cabeceras personalizadas, como los tokens de autenticación (por ejemplo, JWT), pueden causar errores CORS si el servidor no las incluye en la lista de cabeceras permitidas. Los navegadores clasifican estas cabeceras como "no simples" y exigen una autorización explícita.

Para evitar estos errores, asegúrate de que tanto la respuesta principal como la respuesta OPTIONS incluyan las cabeceras CORS necesarias. Si estás usando integraciones proxy, tu función Lambda debe devolver estas cabeceras en cada respuesta:

```
def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Auth-Token',
            'Access-Control-Allow-Origin': 'https://tudominio.com',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Credentials': 'true'
        },
        'body': json.dumps('Respuesta del Lambda')
    }
```

En integraciones proxy, es imprescindible que las cabeceras CORS se configuren directamente en el backend. Cada error puede requerir ajustes específicos según su naturaleza.

### Problemas de protocolo y dominio {id="problemas-de-protocolo-y-dominio"}

Los errores relacionados con protocolo y dominio suelen deberse a una falta de coincidencia exacta en la cabecera `Access-Control-Allow-Origin`. Esto incluye detalles como el protocolo (`http://` frente a `https://`) y el puerto.

Para evitar problemas, verifica siempre el entorno en el que estás trabajando. Por ejemplo, usa `"http://localhost:3000"` para desarrollo y `"https://tudominio.com"` para producción. Ten en cuenta que utilizar `"*"` no es válido si tu aplicación envía credenciales, ya que los navegadores lo bloquean por razones de seguridad.

En el caso de APIs privadas REST, los errores CORS pueden deberse a URLs de invocación incorrectas o problemas de enrutamiento hacia el endpoint VPC. Si estás utilizando credenciales como cookies o cabeceras de autorización, asegúrate de configurar la cabecera `Access-Control-Allow-Credentials`.

Finalmente, para APIs HTTP, recuerda que si configuras CORS directamente en API Gateway, este ignorará las cabeceras CORS del backend. Asegúrate de redesplegar tu API después de realizar cambios para que estos se reflejen correctamente en producción.

## Escenarios avanzados de CORS {id="escenarios-avanzados-de-cors"}

Una vez que tienes los conceptos básicos bajo control, es hora de adentrarse en los escenarios avanzados de CORS. Estas configuraciones te permiten ajustar el comportamiento de CORS para manejar autenticación, múltiples dominios y mejorar el rendimiento, adaptándolo a las necesidades específicas de tus aplicaciones.

### CORS con autenticación de Cognito {id="cors-con-autenticacion-de-cognito"}

Cuando trabajas con AWS Cognito, integrar CORS puede complicarse, especialmente si las solicitudes incluyen credenciales. Un problema frecuente ocurre cuando **API Gateway** responde con errores de autenticación o autorización antes de que la solicitud llegue a Lambda, omitiendo las cabeceras CORS necesarias.

> "Cuando API Gateway responde a un error de autenticación o autorización antes de pasar la solicitud a Lambda, no incluye las cabeceras CORS. Esto hace que el navegador piense que es un error CORS, aunque en realidad sea un error de autenticación/autorización." - Sedat Salman, Expert

Para resolver este problema, personaliza las respuestas de error en API Gateway, añadiendo las cabeceras `Access-Control-Allow-Origin` y `Access-Control-Allow-Credentials`. Esto asegura que el navegador reciba la información adecuada, incluso si la autenticación falla.

Si usas credenciales como tokens de autorización, es fundamental especificar un dominio concreto en la cabecera `Access-Control-Allow-Origin`. Por ejemplo, utiliza `"https://tuapp.com"` en lugar de `"*"` al enviar solicitudes con credenciales.

En el caso de APIs HTTP con autorización habilitada en la ruta `$default`, añade una ruta `OPTIONS /{proxy+}` que no requiera autorización. Así, las solicitudes preflight se procesarán sin problemas.

En escenarios más complejos, podrías necesitar configuraciones dinámicas para manejar múltiples dominios.

### Configuración para múltiples orígenes {id="configuracion-para-multiples-origenes"}

Cuando gestionas varios dominios con CORS, no puedes simplemente usar `"*"` si trabajas con credenciales. En su lugar, configura dinámicamente la cabecera `Access-Control-Allow-Origin` según el origen de la solicitud.

En integraciones proxy con Lambda, una solución común es implementar una lista blanca de dominios permitidos. Aquí tienes un ejemplo práctico:

```
def lambda_handler(event, context):
    allowed_origins = [
        'https://app.tudominio.com',
        'https://admin.tudominio.com',
        'https://staging.tudominio.com'
    ]

    origin = event.get('headers', {}).get('origin', '')

    cors_origin = origin if origin in allowed_origins else allowed_origins[0]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': cors_origin,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
        },
        'body': json.dumps('Respuesta exitosa')
    }
```

Este enfoque permite gestionar de forma segura los entornos de desarrollo, staging y producción. Siempre valida el origen contra tu lista blanca para evitar posibles vulnerabilidades.

Con los orígenes y la autenticación configurados, el siguiente paso es optimizar el rendimiento de las solicitudes CORS.

### Mejorar el rendimiento de CORS {id="mejorar-el-rendimiento-de-cors"}

El rendimiento de CORS puede mejorarse significativamente almacenando en caché las respuestas preflight. Esto se logra mediante la cabecera `Access-Control-Max-Age`, que define cuánto tiempo (en segundos) el navegador puede almacenar en caché la respuesta CORS, reduciendo así las solicitudes OPTIONS.

> "El [almacenamiento en caché](/blog/guia-de-amazon-elasticache-almacenamiento-en-cache-en-memoria/) de respuestas preflight CORS es una forma simple pero efectiva de mejorar el rendimiento de aplicaciones que dependen de solicitudes de origen cruzado." - Parth Patel

Los navegadores tienen límites para este valor: **Chromium** lo restringe a 7.200 segundos (2 horas), mientras que **Firefox** permite hasta 86.400 segundos (24 horas). Configura este parámetro según las necesidades de tu aplicación:

```
{
    "Access-Control-Allow-Origin": "https://tudominio.com",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Max-Age": "7200"
}
```

Para aplicaciones con alto tráfico, configura tu CDN para cachear las respuestas OPTIONS utilizando cabeceras como `Cache-Control: public, max-age=86400` y `Vary: origin`. Esto reduce la carga sobre API Gateway y mejora los tiempos de respuesta para los usuarios.

Combinando estas optimizaciones con las capacidades de caché nativas de API Gateway, puedes maximizar el rendimiento de aplicaciones que dependen de solicitudes AJAX o arquitecturas SPA (Single Page Applications). Esto no solo mejora la experiencia del usuario, sino que también reduce la carga en tus servicios backend.

## Depurar CORS con herramientas y registros {id="depurar-cors-con-herramientas-y-registros"}

Cuando los errores CORS persisten a pesar de haber configurado todo correctamente, es hora de recurrir a herramientas específicas para identificar el problema. Una vez solucionadas las incidencias más comunes, es clave usar herramientas y revisar los registros para confirmar que todo funciona como debería.

### Probar con [cURL](https://curl.se/) y [Postman](https://www.postman.com/) {id="probar-con-curl-y-postman"}

![cURL](/assets/blog/b87f30c420ffdb9a48909f7713e95291eff1d4d276876c2c5c6264bb6cec9775.jpg)

**cURL** es una herramienta ideal para verificar el comportamiento de CORS porque no aplica las restricciones que imponen los navegadores, lo que permite inspeccionar directamente las cabeceras de respuesta.

Por ejemplo, para probar una solicitud preflight OPTIONS, puedes usar este comando:

```
curl -X OPTIONS \
  -H "Origin: https://tudominio.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v https://tu-api-gateway.execute-api.eu-west-1.amazonaws.com/prod/endpoint
```

El modificador `-v` muestra las cabeceras de respuesta, permitiéndote comprobar que `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` y `Access-Control-Allow-Headers` están configuradas correctamente.

Si prefieres una interfaz gráfica, **Postman** es una excelente alternativa. Después de ejecutar una solicitud, revisa la sección "Headers" en la respuesta para confirmar que las cabeceras CORS tienen los valores esperados.

Si las cabeceras son correctas en cURL pero el navegador sigue mostrando errores, es probable que el problema esté en la configuración del cliente web y no en API Gateway. Una vez validadas las cabeceras con estas herramientas, el siguiente paso es examinar los registros de CloudWatch.

### Verificar registros de [CloudWatch](https://docs.aws.amazon.com/cloudwatch/) {id="verificar-registros-de-cloudwatch"}

![CloudWatch](/assets/blog/0d479063011838954144ce4ced48cd073bcc4363782295c504951f76a891b6f7.jpg)

**CloudWatch Logs** es una herramienta poderosa para entender qué está ocurriendo dentro de API Gateway. Para obtener información completa, habilita el nivel de registro INFO, que captura todos los eventos durante el procesamiento de solicitudes.

> "Te animo a habilitar el registro INFO para API Gateway y verificar qué sucede exactamente. Examina los registros para identificar la causa exacta." - Lukas Liesis

En los registros, presta atención a estos puntos clave para identificar problemas relacionados con CORS:

- **Cabeceras de respuesta incorrectas**: Confirma que `Access-Control-Allow-Origin` esté presente y contenga los valores esperados. Si está ausente o tiene valores no válidos, como `null` o dominios no autorizados, ese podría ser el origen del problema.
- **Errores en solicitudes OPTIONS**: Los errores en las solicitudes preflight suelen aparecer como códigos 4xx o 5xx. Busca mensajes como "Method not allowed" o "Invalid CORS configuration".
- **Problemas en respuestas de Lambda**: Si usas una integración proxy con Lambda, verifica que las respuestas incluyan las cabeceras necesarias para CORS. Los registros te mostrarán si falta alguna cabecera crítica.

Un caso interesante es el de un usuario que tuvo problemas al usar cabeceras personalizadas en sus solicitudes de API Gateway. Vitor Castellani, experto en AWS, recomendó [habilitar CORS en API Gateway](/blog/como-habilitar-cloudwatch-logs-en-api-gateway-guia-paso-a-paso/), asegurarse de que Lambda devolviera las cabeceras necesarias y configurar correctamente las respuestas preflight OPTIONS. Tras aplicar estos cambios y redesplegar la API, el problema se resolvió, como quedó reflejado en los registros de CloudWatch.

Si los registros no aportan suficiente información, puedes profundizar utilizando AWS X-Ray.

### Usar [AWS X-Ray](https://docs.aws.amazon.com/xray/) para trazado {id="usar-aws-x-ray-para-trazado"}

![AWS X-Ray](/assets/blog/64ddc9c79bd0be9775409ce9b68e64b6b5ff4b2bf707fa4ebf910d46e5791db6.jpg)

Con **AWS X-Ray**, puedes trazar el recorrido completo de una solicitud, lo que resulta útil para identificar dónde se generan los errores en entornos distribuidos. Para evitar problemas con CORS, incluye `X-Amzn-Trace-Id` en la cabecera `Access-Control-Allow-Headers`:

```
"Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amzn-Trace-Id"
```

Una vez configurado, X-Ray te permitirá visualizar trazos y segmentos de las solicitudes en las consolas de X-Ray y CloudWatch, ofreciéndote una visión detallada del flujo de datos.

Es importante señalar que las APIs HTTP de API Gateway no son compatibles con X-Ray. Además, asegúrate de probar cualquier cambio relacionado con las cabeceras de trazado en un entorno de pruebas antes de implementarlo en producción.

## Conclusión {id="conclusion"}

Configurar y solucionar problemas relacionados con CORS en API Gateway requiere una combinación de configuraciones precisas y herramientas de diagnóstico adecuadas. El éxito depende de aplicar estas configuraciones de manera consistente: si usas integración proxy con Lambda, asegúrate de que la función devuelva las cabeceras CORS necesarias. En caso de integraciones no proxy, configura manualmente las respuestas en API Gateway. Además, no olvides redesplegar la API después de realizar cambios para que las modificaciones se apliquen correctamente.

Es fundamental ser meticuloso en la implementación. Un error común es no alinear las cabeceras devueltas por Lambda con las configuradas en el recurso; ambas deben coincidir **exactamente**. Para evitar problemas, especifica el origen permitido o gestiona múltiples orígenes inspeccionando la cabecera `origin` y verificando si está en tu lista de orígenes aprobados.

Si estás utilizando autorizadores personalizados, recuerda configurar las respuestas predeterminadas (Gateway Responses) para errores "Default 4XX" e incluir las cabeceras CORS. Esto es crucial, ya que API Gateway podría devolver errores 401 o 403 antes de llegar a tu servidor. Para las APIs HTTP que usen una ruta `$default` con un autorizador, añade una ruta `OPTIONS /{proxy+}` que no requiera autorización.

Una configuración adecuada de CORS no solo abarca aspectos técnicos, sino también consideraciones de rendimiento y seguridad. Para mejorar el rendimiento, configura respuestas predeterminadas en los autorizadores y habilita el almacenamiento en caché de las solicitudes preflight. Usa cabeceras como `Access-Control-Max-Age` junto con `Cache-Control: public, max-age=86400` y `Vary: origin` para aprovechar el caché en la CDN. Además, implementa monitoreo en tiempo real para capturar información clave sobre las solicitudes y respuestas.

Finalmente, revisa periódicamente los registros para asegurarte de que todo funciona como se espera, y utiliza herramientas como cURL y Postman para verificar que las cabeceras CORS se devuelvan correctamente. Siguiendo estos pasos, podrás mantener una API robusta, libre de errores CORS, y garantizar el correcto funcionamiento de tus aplicaciones en cualquier entorno.

## FAQs {id="faqs"}

### ¿Cómo puedo configurar correctamente las cabeceras CORS en API Gateway? {id="como-puedo-configurar-correctamente-las-cabeceras-cors-en-api-gateway"}

## Cómo configurar las cabeceras **CORS** en API Gateway {id="como-configurar-las-cabeceras-cors-en-api-gateway"}

Configurar las cabeceras **CORS** en API Gateway puede parecer complicado, pero siguiendo unos pasos básicos puedes hacerlo de manera eficaz:

- **Acceso a la consola**: Ingresa a la consola de API Gateway y selecciona la API que quieres configurar.
- **Selecciona el recurso**: Dirígete a la sección de recursos y elige el recurso específico que necesita soporte para **CORS**.
- **Habilita CORS**: Define los orígenes permitidos, los métodos HTTP y las cabeceras que tu API aceptará.
- **Configura el backend**: Asegúrate de que tu backend incluya cabeceras como `Access-Control-Allow-Origin` y `Access-Control-Allow-Headers`.
- **Pruebas finales**: Realiza pruebas para confirmar que todo funciona correctamente y que no hay errores relacionados con **CORS**.

Si ajustas tanto las configuraciones en API Gateway como las respuestas del backend, podrás evitar los problemas más comunes relacionados con **CORS** en tus aplicaciones.

### ¿Qué herramientas puedo usar para identificar y resolver errores CORS en mi API? {id="que-herramientas-puedo-usar-para-identificar-y-resolver-errores-cors-en-mi-api"}

## Cómo identificar y solucionar errores CORS en tu API {id="como-identificar-y-solucionar-errores-cors-en-tu-api"}

Resolver problemas de CORS en tu API puede ser más sencillo si utilizas las herramientas adecuadas. Aquí tienes algunas opciones que te serán de gran ayuda:

- **Herramientas de desarrollo del navegador**: Estas herramientas, integradas en navegadores como Chrome o Firefox, te permiten inspeccionar solicitudes y respuestas HTTP. Puedes verificar los encabezados y detectar errores relacionados con CORS directamente desde el navegador.
- **Postman**: Esta plataforma te permite probar tu API enviando solicitudes personalizadas. Es perfecta para revisar configuraciones específicas de CORS y simular diferentes escenarios.
- **AWS CloudWatch**: Si usas API Gateway en AWS, CloudWatch es indispensable para monitorear registros. Te ayuda a localizar problemas de configuración que puedan estar afectando las políticas de CORS.

Con estas herramientas, podrás identificar los errores con mayor precisión y aplicar las soluciones necesarias de forma más eficiente.

### ¿Cómo configuro CORS en API Gateway para admitir múltiples dominios con credenciales? {id="como-configuro-cors-en-api-gateway-para-admitir-multiples-dominios-con-credenciales"}

## Configurar CORS en API Gateway para múltiples dominios con credenciales {id="configurar-cors-en-api-gateway-para-multiples-dominios-con-credenciales"}

Cuando configures CORS en API Gateway y necesites permitir múltiples dominios con credenciales, es importante ser específico con los orígenes autorizados y habilitar el uso de credenciales de manera adecuada.

En el encabezado `Access-Control-Allow-Origin`, debes incluir **solo los dominios específicos** que planeas autorizar. Esto es crucial porque **no puedes usar un comodín (`*`)** si estás trabajando con credenciales.

También es necesario activar el encabezado `Access-Control-Allow-Credentials` y establecerlo en `true`. Este paso permite que el navegador envíe cookies o credenciales junto con las solicitudes CORS. Asegúrate de declarar cada dominio de forma explícita en la configuración, ya que esto evitará errores y garantizará que las solicitudes se procesen correctamente.

## Related posts

- [Guía para Crear APIs Serverless con AWS Lambda y API Gateway](/blog/guia-para-crear-apis-serverless-con-aws-lambda-y-api-gateway/)
- [AWS Lambda y API Gateway: Guía Básica](/blog/aws-lambda-y-api-gateway-guia-basica/)
- [5 Prácticas de Seguridad para Lambda Authorizers](/blog/5-practicas-de-seguridad-para-lambda-authorizers/)
- [Configurar CORS en HTTP API Gateway](/blog/configurar-cors-en-http-api-gateway/)
