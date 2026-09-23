+++
url = "/blog/cors-en-websocket-vs-rest-api-gateway/"
title = "CORS en WebSocket vs REST API Gateway"
description = "Explora las diferencias en la configuración de CORS entre APIs REST y WebSocket en AWS API Gateway y su impacto en la seguridad y rendimiento."
date = "2025-09-01T05:25:00.432000+00:00"
lastmod = "2025-09-04"
image = "/assets/blog/c306342b2e9d89f2a43086243eea5ca7647bb051e5543b69a0c948b5fcbaa0db.jpg"
archive_order = 4

[[related]]
title = "Crear un Cluster en Amazon Redshift"
url = "/blog/crear-un-cluster-en-amazon-redshift/"
image = "/assets/blog/2ce2762453f46a717ff15e8109830be0fb7e4e0302901907324eb45ec024ff41.jpg"

[[related]]
title = "Seguridad y Control de Costos en AWS: Guía 2024"
url = "/blog/seguridad-y-control-de-costos-en-aws-guia-2024/"
image = "/assets/blog/fa1b6e3bfee7c71b39327fcd7bcc6e2872e8456b64ffcf6260191d1b33b22105.jpg"

[[related]]
title = "Arquitecturas de Alta Disponibilidad en AWS"
url = "/blog/arquitecturas-de-alta-disponibilidad-en-aws/"
image = "/assets/blog/1b184fe1242c3e7fb970e9845427d92c132904352ae80c4f0254117432753c1d.jpg"
+++

Cuando trabajas con APIs en [AWS API Gateway](/blog/guia-para-crear-apis-serverless-con-aws-lambda-y-api-gateway/), es crucial entender cómo funciona CORS (Cross-Origin Resource Sharing) en REST y WebSocket. Ambos tipos de APIs manejan CORS de manera diferente debido a sus arquitecturas y modelos de comunicación.

**Puntos clave:**

- **CORS en REST API Gateway:**
  - Configuración nativa en [AWS API Gateway](https://aws.amazon.com/api-gateway/).
  - Requiere cabeceras específicas (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, etc.).
  - Necesita gestionar solicitudes preflight (`OPTIONS`) para garantizar el acceso desde otros dominios.
- **CORS en WebSocket API Gateway:**
  - No tiene soporte nativo para CORS en AWS.
  - CORS solo aplica durante el handshake inicial.
  - Soluciones comunes: usar un dominio personalizado compartido o configurar bibliotecas cliente como `socket.io`.

**Comparación rápida:**

| Aspecto | REST API Gateway | WebSocket API Gateway |
| --- | --- | --- |
| **Soporte de CORS** | Configuración directa en API Gateway | No soportado nativamente |
| **Aplicación de CORS** | En cada solicitud HTTP | Solo en el handshake inicial |
| **Complejidad de Configuración** | Baja a media | Media a alta |

Elegir entre REST y WebSocket depende de tus necesidades: REST es ideal para operaciones individuales (CRUD), mientras que WebSocket es mejor para comunicación bidireccional en tiempo real. Configurar correctamente CORS es esencial para evitar errores de acceso entre dominios.

## Visión general de AWS REST API Gateway y las API WebSocket {id="vision-general-de-aws-rest-api-gateway-y-las-api-websocket"}

### Características y casos de uso de REST API Gateway {id="caracteristicas-y-casos-de-uso-de-rest-api-gateway"}

AWS REST API Gateway funciona bajo un modelo de solicitud-respuesta, gestionando cada interacción de manera independiente a través del protocolo HTTP estándar. Este servicio está diseñado para manejar, supervisar y proteger API REST a gran escala, ofreciendo herramientas avanzadas para su administración.

Entre sus características más destacadas se encuentran la transformación automática de solicitudes y respuestas, la limitación de tráfico (*throttling*) para evitar sobrecargas, la autenticación integrada con [AWS IAM](/blog/aws-seguridad-servicios-esenciales/) y capacidades de monitorización a través de [CloudWatch](https://vicolmeheredia.medium.com/aws-cloudwatch-rum-real-user-monitoring-2fa5a0f2e2b7). Además, incluye opciones de [almacenamiento en caché](/blog/guia-de-amazon-elasticache-almacenamiento-en-cache-en-memoria/) que ayudan a mejorar el rendimiento y reducir la latencia.

En cuanto a los casos de uso, REST API Gateway es ideal para aplicaciones web tradicionales, plataformas de comercio electrónico, APIs públicas dirigidas a desarrolladores externos y sistemas de gestión de contenido. Este servicio se adapta especialmente bien a [arquitecturas de microservicios](/blog/arquitectura-en-la-nube-tendencias-emergentes/), donde diferentes componentes necesitan comunicarse de manera estructurada y eficiente.

En entornos *serverless*, REST API Gateway se combina perfectamente con [AWS Lambda](/blog/desarrollando-aplicaciones-con-aws-lambda/), permitiendo crear APIs que no dependen de servidores y que escalan automáticamente según la demanda. Esto resulta particularmente útil para aplicaciones con patrones de tráfico impredecibles. Estas características lo diferencian claramente de las API WebSocket, que analizamos a continuación.

### Características y casos de uso de las API WebSocket {id="caracteristicas-y-casos-de-uso-de-las-api-websocket"}

Mientras que REST API Gateway se enfoca en un modelo de solicitud-respuesta, las API WebSocket adoptan un enfoque distinto al habilitar una comunicación bidireccional mediante una conexión persistente. Este tipo de API permite el intercambio continuo de datos en ambas direcciones, lo que las hace únicas en su funcionamiento.

Entre sus principales funcionalidades destacan la gestión automática de conexiones, el enrutamiento de mensajes basado en rutas personalizadas y la integración nativa con otros servicios de AWS como Lambda y [DynamoDB](/blog/amazon-dynamodb-la-base-de-datos-nosql-de-aws/). Además, el servicio escala automáticamente para manejar grandes volúmenes de conexiones simultáneas sin requerir configuraciones adicionales.

Los casos de uso más comunes para las API WebSocket incluyen aplicaciones de chat, juegos multijugador en línea, sistemas de trading financiero, paneles con actualizaciones en tiempo real y herramientas colaborativas como editores de documentos compartidos. También son una excelente opción para sistemas de notificaciones push y [aplicaciones de IoT](/blog/aws-iot-edge-simulator-casos-de-uso-reales/), donde la latencia baja y la comunicación constante son esenciales.

Este enfoque las convierte en la solución ideal para aplicaciones que exigen una experiencia interactiva inmediata y un flujo constante de datos.

### Diferencias fundamentales entre REST y WebSocket {id="diferencias-fundamentales-entre-rest-y-websocket"}

Desde el punto de vista de los recursos y los casos de uso, REST API Gateway es más adecuado para operaciones CRUD y servicios web tradicionales que no requieren actualizaciones constantes. Por otro lado, las API WebSocket son la mejor opción para aplicaciones que necesitan comunicación continua y bidireccional, como en los casos de uso mencionados.

En cuanto a costos, REST API Gateway cobra según la cantidad de solicitudes, lo que resulta más económico para aplicaciones con tráfico intermitente. En cambio, las API WebSocket mantienen conexiones activas, lo que implica un consumo constante de recursos incluso durante periodos de inactividad, aunque son más eficientes para aplicaciones con un alto volumen de intercambio de datos.

Por último, en términos de complejidad, REST API Gateway ofrece herramientas más maduras y una documentación más extensa, lo que facilita su implementación. En contraste, las API WebSocket requieren una gestión más cuidadosa del estado de las conexiones y una preparación para manejar desconexiones inesperadas. Estas diferencias también influyen en cómo se configura CORS para cada tipo de API, marcando un punto clave en su implementación.

## Configuración de CORS en API REST {id="configuracion-de-cors-en-api-rest"}

### Cómo funciona CORS en las API REST {id="como-funciona-cors-en-las-api-rest"}

En las API REST, CORS (Cross-Origin Resource Sharing) funciona a través de cabeceras HTTP y solicitudes preflight. Estas solicitudes, realizadas con el método HTTP `OPTIONS`, permiten al navegador verificar los permisos antes de enviar la solicitud principal.

Cuando un navegador intenta acceder a una API REST desde un dominio diferente, primero envía una solicitud `OPTIONS` al endpoint correspondiente. Esta solicitud incluye información como el origen, los métodos HTTP que se planean usar y las cabeceras personalizadas. El servidor, para autorizar el acceso, debe responder con las cabeceras adecuadas:

- **`Access-Control-Allow-Origin`**: Especifica los dominios autorizados.
- **`Access-Control-Allow-Methods`**: Enumera los métodos HTTP permitidos.
- **`Access-Control-Allow-Headers`**: Indica las cabeceras personalizadas aceptadas.

Si el servidor no incluye estas cabeceras o están mal configuradas, el navegador bloqueará la solicitud por motivos de seguridad.

Ahora, veamos cómo implementar esta lógica en AWS API Gateway.

### Configuración de CORS en AWS REST APIs {id="configuracion-de-cors-en-aws-rest-apis"}

La configuración de CORS en AWS API Gateway depende del tipo de integración que utilices. Hay dos escenarios principales:

- **Integraciones no proxy**: Aquí, API Gateway gestiona CORS sin necesidad de modificar el backend.
- **Integraciones proxy**: En este caso, el backend debe manejar las cabeceras CORS.

**En integraciones no proxy**, es necesario configurar manualmente un método `OPTIONS` para cada recurso que requiera soporte CORS. Este método se configura con una integración mock (sin llamada al backend) y debe incluir las cabeceras `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods` y `Access-Control-Allow-Origin` en la respuesta 200. Para garantizar que API Gateway gestione la respuesta, ajusta el passthrough a `NEVER`.

**En integraciones proxy** (como Lambda proxy o HTTP proxy), el backend es responsable de devolver las cabeceras CORS necesarias en cada respuesta. Esto significa que tu función Lambda o tu endpoint HTTP debe incluir cabeceras como `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` y `Access-Control-Allow-Headers`.

La consola de AWS puede simplificar este proceso al crear automáticamente el método `OPTIONS`, aunque puede ser necesario ajustar detalles manualmente para asegurar un funcionamiento óptimo.

Un punto técnico clave: si has configurado tipos de medios binarios como `*/*`, deberás cambiar el parámetro `contentHandling` a `CONVERT_TO_TEXT` para las solicitudes y respuestas del método `OPTIONS`.

### Mejores prácticas de CORS para API REST {id="mejores-practicas-de-cors-para-api-rest"}

La configuración de CORS debe priorizar la seguridad. Aquí tienes algunas recomendaciones importantes:

- **Evita el comodín `*` en `Access-Control-Allow-Origin`** en entornos de producción. Especifica dominios concretos, como `https://www.ejemplo.com`, para limitar el acceso a orígenes autorizados.
- **Define únicamente lo necesario** en `Access-Control-Allow-Headers` y `Access-Control-Allow-Methods`. Esto no solo mejora la seguridad, sino que también reduce la superficie de ataque.
- **Configura `Access-Control-Allow-Credentials` en `true`** si tu aplicación utiliza credenciales o cookies. Ten en cuenta que esto requiere especificar un dominio exacto en lugar de usar el comodín `*`.
- **Asegúrate de incluir `Access-Control-Allow-Origin` en todas las respuestas**, incluidas las respuestas 200. Las inconsistencias en las cabeceras pueden provocar errores difíciles de diagnosticar.

Con una configuración adecuada, puedes garantizar que tu API REST sea accesible de manera segura y eficiente desde los dominios autorizados.

## Configuración de CORS en API WebSocket {id="configuracion-de-cors-en-api-websocket"}

### Visión general de CORS en API WebSocket {id="vision-general-de-cors-en-api-websocket"}

Las API WebSocket funcionan de manera diferente a las API REST cuando se trata de manejar CORS. Aunque el proceso comienza con un handshake inicial que utiliza una solicitud HTTP, una vez que la conexión persistente se establece, ya no se aplican las restricciones habituales de CORS. En otras palabras, después del handshake, la conexión queda libre de las limitaciones que suelen afectar a las solicitudes HTTP tradicionales.

Sin embargo, algunas bibliotecas del lado del cliente, como *[socket.io](https://socket.io/)* en su versión 3, requieren que se configure explícitamente CORS. Este detalle técnico implica que se necesitan estrategias específicas para gestionar el acceso entre dominios en el contexto de WebSocket.

### Configuración del acceso entre dominios para API WebSocket en AWS {id="configuracion-del-acceso-entre-dominios-para-api-websocket-en-aws"}

En el caso de AWS API Gateway, no es posible habilitar CORS en las APIs WebSocket, lo que puede ocasionar errores si se intenta configurarlo.

Para resolver los problemas relacionados con el acceso entre dominios en este entorno, se pueden aplicar las siguientes estrategias:

- **Uso de un dominio personalizado**: Configurar un dominio compartido entre la aplicación cliente y la API WebSocket garantiza que ambos pertenezcan al mismo origen.
- **Aprovechar el objeto nativo WebSocket**: Utilizar `new WebSocket(...)` directamente, ya que los navegadores no aplican restricciones CORS a estas conexiones.
- **Configuración específica en bibliotecas como socket.io**: Algunas herramientas, como *socket.io*, pueden requerir ajustes explícitos para manejar CORS adecuadamente.

Estas medidas permiten que la conexión funcione sin interrupciones, incluso en escenarios donde se necesite acceso cruzado entre dominios.

### Consideraciones de seguridad para API WebSocket {id="consideraciones-de-seguridad-para-api-websocket"}

A diferencia de las API REST, donde CORS se utiliza para definir accesos específicos, en las API WebSocket la seguridad se centra en el proceso de handshake. Aquí, la autenticación durante este paso inicial es clave. Esto puede lograrse mediante el uso de tokens en las cabeceras o parámetros de consulta.

Además, durante el handshake, se puede implementar un control de acceso basado en el origen, asegurando que solo los clientes autorizados puedan establecer la conexión. Por último, es importante realizar validaciones periódicas a lo largo de la sesión para garantizar que la comunicación se mantenga exclusivamente entre entidades con los permisos adecuados. Estas prácticas refuerzan la seguridad en un entorno donde las cabeceras CORS no son un factor determinante.

## Comparación de CORS: API WebSocket vs API REST {id="comparacion-de-cors-api-websocket-vs-api-rest"}

A continuación, se presenta una comparación detallada sobre cómo se maneja la configuración de CORS en las API REST y WebSocket en AWS API Gateway.

### Tabla comparativa de CORS entre REST y WebSocket {id="tabla-comparativa-de-cors-entre-rest-y-websocket"}

Las diferencias en la gestión de CORS en estas dos tecnologías pueden influir significativamente en la arquitectura de una aplicación. Aquí tienes una tabla que resume los puntos clave:

| Aspecto | API REST (API Gateway) | API WebSocket (API Gateway) |
| --- | --- | --- |
| **Soporte nativo de CORS** | Configuración directa y soportada | No incluye configuración nativa de CORS |
| **Configuración** | Gestionable desde el API Gateway o backend | Requiere soluciones alternativas, como dominios personalizados |
| **Aplicación de políticas** | Se aplica a cada solicitud | Solo afecta el handshake inicial |
| **Bibliotecas cliente** | Compatible con bibliotecas estándar | Algunas, como socket.io v3+, necesitan configuraciones específicas |
| **Flexibilidad de origen** | Control detallado por método y recurso | Limitado al origen compartido o al protocolo WebSocket nativo |
| **Complejidad de implementación** | Baja a media | Media a alta debido a restricciones técnicas |

### Principales diferencias en la implementación de CORS {id="principales-diferencias-en-la-implementacion-de-cors"}

Una de las diferencias más destacadas es que AWS API Gateway ofrece soporte directo para CORS en las API REST, mientras que las API WebSocket carecen de esta funcionalidad integrada. Esto tiene un impacto directo en cómo se implementan las políticas de acceso entre dominios.

En el caso de las API REST, puedes definir con precisión qué orígenes, métodos y cabeceras están permitidos para cada recurso. Por otro lado, las API WebSocket funcionan bajo un enfoque diferente, ya que el protocolo WebSocket nativo no aplica políticas CORS de manera similar a HTTP. Sin embargo, algunas bibliotecas cliente, como `socket.io` (a partir de la versión 3), pueden requerir cabeceras CORS explícitas durante las solicitudes HTTP iniciales de polling.

Para resolver los problemas de origen cruzado con las API WebSocket en AWS, una solución común es asegurarse de que tanto la aplicación cliente como la API WebSocket compartan el mismo origen. Esto se logra frecuentemente mediante el uso de un dominio personalizado. Aunque esta estrategia simplifica la arquitectura, puede reducir la flexibilidad en ciertos casos.

### Elegir la API adecuada para tu proyecto {id="elegir-la-api-adecuada-para-tu-proyecto"}

La decisión entre usar API REST o WebSocket dependerá de las necesidades específicas de tu aplicación. Si necesitas un control detallado sobre el acceso entre dominios, las **API REST son una opción más adecuada**. Por otro lado, para casos donde la prioridad sea la comunicación en tiempo real, las **API WebSocket son más efectivas**. Sin embargo, si tu aplicación requiere acceso desde múltiples dominios y no puedes implementar un dominio personalizado compartido, las limitaciones de CORS en WebSocket pueden complicar la implementación.

En aplicaciones híbridas que combinan REST y WebSocket, considera implementar ambos tipos de API bajo un único dominio personalizado. Esto elimina problemas de CORS para WebSocket y conserva la flexibilidad de configuración para los endpoints REST.

Si estás utilizando bibliotecas como `socket.io`, revisa cuidadosamente los requisitos de la versión que empleas. Algunas versiones pueden necesitar configuraciones adicionales que AWS API Gateway no ofrece directamente para WebSocket. Esto te ayudará a evitar problemas inesperados durante la implementación.

## Mejores prácticas y recomendaciones {id="mejores-practicas-y-recomendaciones"}

### Mejores prácticas para CORS en API REST y WebSocket {id="mejores-practicas-para-cors-en-api-rest-y-websocket"}

Configurar CORS correctamente implica encontrar un equilibrio entre seguridad y funcionalidad. Por ejemplo, si trabajas con API REST en AWS API Gateway, evita usar el comodín `*` en el encabezado `Access-Control-Allow-Origin` cuando manejes credenciales. En su lugar, especifica los dominios exactos que necesitan acceso.

Para mejorar el rendimiento, ajusta el valor de `Access-Control-Max-Age` entre 600 y 3600 segundos. Esto reduce la cantidad de solicitudes OPTIONS, algo crucial en aplicaciones de alto tráfico, donde cada solicitud adicional puede afectar la velocidad.

En el caso de las API WebSocket, lo ideal es utilizar un dominio personalizado compartido. Esta solución elimina por completo los problemas relacionados con CORS y simplifica la arquitectura. Si no es posible implementar un dominio compartido, asegúrate de que la aplicación cliente gestione correctamente los errores de conexión.

Es recomendable usar perfiles de configuración separados para los entornos de desarrollo y producción. Durante el desarrollo, puede ser útil permitir orígenes amplios, pero en producción, limita los accesos a los dominios estrictamente necesarios. Además, recuerda que CORS no es una solución de seguridad completa. Aunque ayuda a gestionar el acceso desde navegadores, no protege contra accesos directos mediante herramientas como curl o Postman. Por eso, siempre implementa mecanismos sólidos de autenticación y autorización junto con validaciones en el lado del servidor.

Si utilizas bibliotecas como socket.io, revisa cuidadosamente su documentación para aprovechar configuraciones específicas. También puedes considerar el uso de un proxy inverso, como [CloudFront](/blog/amazon-cloudfront-comprendiendo-el-cdn-de-aws/) o un Application Load Balancer, para añadir los encabezados necesarios de manera más eficiente.

### Utilizando recursos de la comunidad {id="utilizando-recursos-de-la-comunidad"}

Además de seguir estas prácticas, la comunidad AWS en español ofrece recursos valiosos para aprender y mejorar. Por ejemplo, el blog **[Dónde Aprendo AWS](/blog/)** (https://dondeaprendoaws.com) publica artículos detallados sobre temas como la configuración de API Gateway, con ejemplos prácticos que incluyen CORS y recomendaciones de seguridad. Estos contenidos son especialmente útiles para desarrolladores que buscan información en español y que trabajan en proyectos dentro del contexto empresarial de España y Latinoamérica.

Si te enfrentas a desafíos específicos, busca ejemplos de código y casos de estudio en español. Aunque la documentación oficial de AWS suele estar en inglés, los recursos creados por la comunidad hispanohablante suelen incluir ejemplos más cercanos a las necesidades locales.

Participar en foros y grupos de la comunidad AWS en español también es una excelente manera de aprender. Compartir tus experiencias con configuraciones de CORS no solo te permite resolver problemas más rápido, sino que también contribuye al conocimiento colectivo. Muchas soluciones prácticas a problemas complejos no están documentadas oficialmente, pero la comunidad las ha desarrollado gracias a la experiencia diaria. Aprovechar estos recursos y colaborar activamente fortalecerá tus implementaciones de CORS en AWS API Gateway.

## Conclusión {id="conclusion"}

Entender cómo funciona CORS en AWS API Gateway es clave para desarrollar aplicaciones web modernas que operen correctamente entre diferentes dominios.

En el caso de las **API REST**, puedes configurar CORS de manera específica directamente en API Gateway, utilizando métodos `OPTIONS` y encabezados personalizados. Por otro lado, las **API WebSocket** requieren gestionar CORS durante el proceso de handshake o en el backend de la aplicación. Si no configuras estos aspectos correctamente, los navegadores bloquearán solicitudes legítimas, generando errores de "Cross-Origin Request Blocked" que pueden hacer que tu API sea inaccesible.

Esto subraya lo importante que es seleccionar el tipo de API adecuado para garantizar una implementación segura y eficiente. Elegir entre REST y WebSocket no solo depende de las necesidades funcionales, sino también de cómo planeas manejar la seguridad en solicitudes de origen cruzado. Dominar ambos enfoques te permitirá crear aplicaciones en AWS más seguras y fiables.

## FAQs {id="faqs"}

### ¿Cómo puedo habilitar CORS en una API WebSocket en AWS API Gateway si no es compatible de forma nativa? {id="como-puedo-habilitar-cors-en-una-api-websocket-en-aws-api-gateway-si-no-es-compatible-de-forma-nativa"}

Para activar **CORS** en una API WebSocket en AWS API Gateway, que no lo admite de forma nativa, puedes añadir un método `OPTIONS` a tu API y configurar manualmente los encabezados CORS en las respuestas de este método. Esto te permitirá gestionar las solicitudes *preflight* y devolver los encabezados necesarios para permitir las solicitudes *cross-origin*.

Otra alternativa es crear un endpoint HTTP independiente para manejar CORS. Este enfoque ofrece más flexibilidad y control sobre las solicitudes, siendo una solución habitual para superar la ausencia de soporte directo de CORS en las APIs WebSocket de AWS.

### ¿Cómo configurar CORS en una API REST en AWS para garantizar seguridad y eficiencia? {id="como-configurar-cors-en-una-api-rest-en-aws-para-garantizar-seguridad-y-eficiencia"}

## Configurar **CORS** en una API REST en AWS {id="configurar-cors-en-una-api-rest-en-aws"}

Cuando trabajas con **CORS** en una API REST en AWS, es clave hacerlo de forma segura y controlada. Aquí te dejo algunos puntos esenciales para lograrlo:

- **Especifica los orígenes permitidos**: Define claramente qué dominios pueden acceder a tu API. Esto evita accesos no autorizados desde fuentes no deseadas.
- **Restringe métodos y cabeceras**: Permite únicamente los métodos HTTP y cabeceras que sean necesarios. Reducir lo permitido disminuye posibles vulnerabilidades.
- **Configura las solicitudes preflight**: Asegúrate de que las respuestas a las solicitudes preflight estén correctamente configuradas. Esto no solo mejora la seguridad, sino también el rendimiento de tu API.
- **Aplica el principio de menor privilegio**: Utiliza políticas de IAM para que solo los usuarios y aplicaciones que realmente lo necesiten puedan interactuar con tu API.

Con estas prácticas, no solo proteges tu API, sino que también aseguras un funcionamiento más eficiente y controlado. Solo los usuarios autorizados tendrán acceso, garantizando un entorno más seguro.

### ¿Qué debo considerar al elegir entre una API REST y una API WebSocket en relación con la gestión de CORS en AWS API Gateway? {id="que-debo-considerar-al-elegir-entre-una-api-rest-y-una-api-websocket-en-relacion-con-la-gestion-de-cors-en-aws-api-gateway"}

## APIs REST vs. WebSocket en AWS API Gateway: Consideraciones sobre CORS {id="apis-rest-vs-websocket-en-aws-api-gateway-consideraciones-sobre-cors"}

Cuando decides entre usar una **API REST** o una **API WebSocket** en AWS API Gateway, el manejo de **CORS** (solicitudes de origen cruzado) es un punto clave a tener en cuenta.

Las **APIs REST** cuentan con soporte nativo para CORS. Esto significa que puedes configurar los encabezados necesarios directamente, lo que facilita mucho la interacción entre diferentes dominios. Por el contrario, las **APIs WebSocket** no incluyen soporte para CORS. Esto se debe a que el protocolo WebSocket no lo necesita, ya que funciona de manera diferente a las solicitudes HTTP tradicionales. En estos casos, es recomendable que el cliente y el servidor operen dentro del mismo dominio o implementar controles de acceso alternativos.

Si en tu proyecto es crucial gestionar CORS de manera sencilla, optar por una API REST puede ahorrarte tiempo y complicaciones. Aunque las APIs WebSocket son ideales para comunicación en tiempo real, podrían requerir configuraciones adicionales para abordar posibles restricciones de origen.

## Publicaciones de blog relacionadas

- [AWS Lambda y API Gateway: Guía Básica](/blog/aws-lambda-y-api-gateway-guia-basica/)
- [5 Prácticas de Seguridad para Lambda Authorizers](/blog/5-practicas-de-seguridad-para-lambda-authorizers/)
- [Configurar CORS en HTTP API Gateway](/blog/configurar-cors-en-http-api-gateway/)
- [Guía completa para depurar errores CORS en API Gateway](/blog/guia-completa-para-depurar-errores-cors-en-api-gateway/)
