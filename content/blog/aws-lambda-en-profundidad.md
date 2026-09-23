+++
url = "/blog/aws-lambda-en-profundidad/"
title = "AWS Lambda en Profundidad"
description = "Descubre todo sobre AWS Lambda, desde cómo funciona y cómo usarlo hasta las mejores prácticas de seguridad y las últimas innovaciones. Aprende a optimizar y monitorear tus funciones Lambda."
date = "2024-03-09T02:11:48.464000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/fc7f86cd5d9d53b7ba70da04a8736f898fe38382ef6cbc6e3eeda9f21c6aa9e2.jpg"
archive_order = 154

[[related]]
title = "Configurar CORS en HTTP API Gateway"
url = "/blog/configurar-cors-en-http-api-gateway/"
image = "/assets/blog/b7ca17278c2b7e43c95dfeecd8c4de8e83d1e24b5d8252f50118d4479ba3ab52.jpg"

[[related]]
title = "Ahorro de Costos en AWS con Instancias Reservadas y Savings Plans"
url = "/blog/ahorro-de-costos-en-aws-con-instancias-reservadas-y-savings-plans/"
image = "/assets/blog/201da9e2ec2ae649f47566a7401f98e2fb0b2923c95d1321a5c17ffb05000e7c.jpg"

[[related]]
title = "AWS Seguridad: Mejores Prácticas"
url = "/blog/aws-seguridad-mejores-practicas/"
image = "/assets/blog/58bea5d60c133d57e4a0bdbf31f2667ab339ea25ffae689b54e830ef790cc553.jpg"
+++

AWS Lambda te permite desplegar aplicaciones y servicios sin preocuparte por los servidores. Aquí te comparto una guía completa para entender y aprovechar AWS Lambda al máximo:

- **AWS Lambda**: Ejecuta código en respuesta a eventos sin gestionar servidores.
- **Lenguajes soportados**: Incluye Node.js, Python, Java, C#, y Go.
- **Integración con AWS**: Se conecta fácilmente con otros servicios como S3, DynamoDB, y API Gateway.
- **Pago por uso**: Solo pagas por el tiempo de ejecución de tu código.
- **Sin servidores**: Centra tu atención en el código, no en la infraestructura.

### Primeros Pasos {id="primeros-pasos"}

- Crea una cuenta en AWS.
- Accede a la consola de Lambda.
- Elige un lenguaje y escribe tu función.
- Define un evento disparador.
- Prueba y despliega tu función.

### Optimización y Monitoreo {id="optimizaci%C3%B3n-y-monitoreo"}

- **Rendimiento**: Optimiza el tamaño del código y elige el lenguaje adecuado.
- **Monitoreo**: Usa CloudWatch y AWS X-Ray para supervisar el funcionamiento.

### Seguridad {id="seguridad"}

- Implementa prácticas de seguridad como el uso de roles de IAM y la encriptación de datos.

### ¿Qué es AWS Lambda? {id="%C2%BFqu%C3%A9-es-aws-lambda%3F"}

AWS Lambda es un servicio que te permite correr código sin necesitar tus propios servidores. Imagina que puedes hacer que tu código trabaje por ti solo cuando lo necesitas, y lo mejor, solo pagas por el tiempo que realmente se usa.

Lo que debes saber:

- Puede empezar a trabajar automáticamente cuando algo sucede, como cuando alguien visita tu página o cuando cambian datos.
- Funciona con varios lenguajes de programación como Node.js, Python, Java, C# y Go.
- Se lleva bien con otros servicios de AWS, facilitando guardar datos o enviar alertas.
- Ajusta automáticamente cuánto poder de computación necesita, sin que tengas que hacer nada.
- Solo pagas por el tiempo en que tu código está corriendo.

En pocas palabras, con Lambda, te enfocas en tu código y te olvidas de los servidores.

### ¿Cómo funciona AWS Lambda? {id="%C2%BFc%C3%B3mo-funciona-aws-lambda%3F"}

De forma sencilla, Lambda funciona así:

- Subes tu código a Lambda como una "función".
- La función espera quietita hasta que algo la activa.
- Cuando eso pasa, Lambda se pone en marcha y corre tu función automáticamente.
- La función hace su trabajo con los datos que recibe y luego termina.
- Lambda se encarga de cerrar todo cuando la función ha terminado.

Lambda puede manejar muchas solicitudes a la vez, ajustándose automáticamente. Solo se paga por el tiempo que tu código está activo.

### Ventajas de usar AWS Lambda {id="ventajas-de-usar-aws-lambda"}

Algunas ventajas de usar Lambda son:

- **Sin preocupaciones de servidores**: Olvídate de comprar, mantener o actualizar servidores. Lambda lo hace por ti.
- **Siempre disponible**: Lambda está diseñado para no fallar, está siempre listo para trabajar.
- **Se ajusta solo**: No importa si tienes muchas o pocas solicitudes, Lambda se adapta.
- **Fácil de combinar**: Funciona bien con otros servicios de AWS, haciendo más fácil armar proyectos.
- **Costos bajos**: Con un modelo de pago por uso y una capa gratuita, puedes ahorrar mucho.

En resumen, Lambda te ayuda a enfocarte en crear y mejorar tu código, sin las complicaciones de los servidores.

## Configuración y Despliegue de AWS Lambda {id="configuraci%C3%B3n-y-despliegue-de-aws-lambda"}

### Primeros Pasos con AWS Lambda {id="primeros-pasos-con-aws-lambda"}

Para empezar con AWS Lambda, solo sigue estos pasos simples:

- Si no tienes una, crea una cuenta en AWS.
- Ve a la parte de Lambda en la consola de AWS.
- Puedes empezar una función Lambda desde cero o elegir una plantilla.
- Elige el lenguaje en el que vas a programar (como Node.js, Python, Java, etc).
- Escribe el código de tu función directamente en la página web.
- Define qué va a hacer que tu función se active (por ejemplo, que se active cuando alguien sube un archivo a S3).
- Antes de seguir, prueba tu función para asegurarte de que funciona bien.
- Si todo va bien, ¡ya estás listo para usar tu función Lambda!

Al principio puede parecer un poco complicado, pero AWS tiene guías muy claras y aprenderás rápido. Pronto estarás haciendo funciones Lambda útiles.

### Despliegue de Funciones {id="despliegue-de-funciones"}

Hay varias maneras de poner en marcha tus funciones Lambda:

- **Consola de AWS:** Es fácil de usar para crear, probar y cambiar tus funciones. Ideal para empezar.
- **AWS CLI:** Para los que prefieren usar la línea de comandos. Bueno para cuando ya tienes todo listo para subir.
- **AWS SAM:** Aquí usas un archivo YAML para decirle a AWS cómo quieres que sea tu función. Es bastante usado.
- **AWS CloudFormation:** Te permite describir y subir tu función y todo lo que necesita usando código.
- **Terraform:** Otra herramienta para manejar tu infraestructura como código, incluyendo funciones Lambda.

**Mejores prácticas**

Cuando subas tus funciones Lambda, es bueno:

- Usar control de versiones (como Git) para manejar los cambios en tu código.
- Hacer pruebas automáticas para asegurarte de que todo funciona bien.
- Poder subir y quitar cambios rápidamente usando código.
- Mantener separados los ambientes de desarrollo, pruebas y producción.
- Seguir las métricas de tus funciones, como cuánto tardan, errores y cuántas veces se usan.
- Controlar el acceso a recursos usando roles de IAM.

Siguiendo estos consejos, podrás subir tus funciones Lambda de manera segura y eficiente.

## AWS Lambda en Acción {id="aws-lambda-en-acci%C3%B3n"}

### Casos de Uso {id="casos-de-uso"}

AWS Lambda se puede usar para muchas cosas diferentes. Aquí tienes algunos ejemplos:

- **Procesamiento de datos**: Es perfecto para organizar, cambiar y analizar datos. Puedes hacer que trabaje con servicios como S3, DynamoDB o Kinesis para que empiece a procesar apenas lleguen datos nuevos.
- **APIs y backends**: Puedes usar Lambda para crear APIs y backends que se ajustan automáticamente según la demanda. Usando API Gateway, puedes crear APIs sin preocuparte por servidores.
- **Procesamiento de streams**: Úsalo para trabajar con flujos de datos de Kinesis o DynamoDB Streams y analizar esos datos al momento.
- **Chatbots**: Con Lambda, puedes hacer chatbots que responden a eventos. Se puede conectar con servicios como Amazon Lex o Amazon Connect.
- **IoT**: Permite que tus dispositivos IoT llamen a funciones sin servidores para procesar datos o tomar acciones basadas en eventos específicos.
- **Operaciones DevOps**: Usa Lambda para automatizar tareas de DevOps como pruebas, integración y despliegue.

Hay muchas más posibilidades, y la lista sigue creciendo a medida que AWS añade más servicios compatibles con Lambda.

### Integraciones {id="integraciones"}

Lo bueno de AWS Lambda es que se lleva bien con muchos otros servicios de AWS, lo que te permite hacer mucho más.

Algunas integraciones usuales son:

- **Amazon API Gateway**: Te ayuda a crear y manejar APIs fácilmente, sin tener que lidiar con servidores. API Gateway dirige las solicitudes a tus funciones Lambda.
- **Amazon S3**: Puedes hacer que Lambda se active cuando se suben archivos a S3, lo que es útil para procesar datos o cambiar formato de archivos.
- **Amazon DynamoDB**: Conecta con los eventos de DynamoDB Streams para que Lambda procese cambios en tus tablas en tiempo real.
- **AWS Step Functions**: Te permite organizar funciones Lambda en flujos de trabajo visuales. Es genial para procesos ETL, comercio electrónico, IoT y más.
- **Amazon Kinesis**: Con Lambda, puedes manejar y analizar grandes cantidades de datos en tiempo real, provenientes de muchas fuentes.
- **Amazon SNS**: Llama a funciones Lambda en respuesta a mensajes de SNS para enviar notificaciones, SMS, emails y más.

La lista de servicios compatibles es larga e incluye desde bases de datos como Amazon Aurora sin servidor hasta servicios de aprendizaje automático como SageMaker. ¡Tienes un montón de opciones para explorar!

## Arquitectura de AWS Lambda {id="arquitectura-de-aws-lambda"}

### ¿Cómo funciona a bajo nivel Lambda? {id="%C2%BFc%C3%B3mo-funciona-a-bajo-nivel-lambda%3F"}

AWS Lambda guarda tu código en sus servidores, esperando a que algo lo active, como por ejemplo, un cambio en un archivo o una solicitud de una página web. Cuando esto pasa, AWS Lambda prepara una especie de cajita, llamada contenedor, donde tu código puede correr. Este contenedor tiene todo lo necesario para que tu código funcione bien.

Después de que tu código hace su trabajo, Lambda se encarga de cerrar el contenedor y no usar más recursos. Solo pagas por el tiempo que tu código estuvo activo. Si hay otra tarea, Lambda abre un nuevo contenedor y así sucesivamente, pudiendo manejar muchas tareas al mismo tiempo.

En pocas palabras, con Lambda, tú solo te preocupas por tu código. AWS se encarga de darle un lugar para correr, manejar cuántos recursos usar y hacer que todo funcione rápido y sin problemas.

### Manejo de Cold Starts {id="manejo-de-cold-starts"}

A veces, cuando tu función Lambda no se ha usado por un rato, puede tardar un poco en empezar. Esto se llama un "cold start". Pero hay maneras de hacer que esto no sea un problema:

- Trata de mantener tu función simple, sin cosas que no necesitas. Esto ayuda a que arranque más rápido.
- Guarda información que no cambia mucho, como conexiones a bases de datos, para no tener que cargarla cada vez.
- Escoge un lenguaje de programación que sea rápido de arrancar, como .NET Core o Node.js.
- Usa "capas" para separar tu código de lo básico que necesita para correr. Esto también ayuda a que arranque más rápido.
- Puedes configurar algo llamado "provisioned concurrency" para tener contenedores listos y esperando.
- Otra idea es enviar señales pequeñas a tu función de vez en cuando para mantenerla activa.

Con estas estrategias, puedes hacer que el tiempo de espera por un cold start sea muy corto, manteniendo tu aplicación rápida incluso cuando recién empieza a correr después de estar inactiva.

## Seguridad en AWS Lambda {id="seguridad-en-aws-lambda"}

### Mejores Prácticas de Seguridad {id="mejores-pr%C3%A1cticas-de-seguridad"}

Para mantener tus funciones Lambda seguras, es buena idea seguir estos consejos:

- Utiliza roles de IAM para determinar a qué recursos puede acceder tu función. Dale solo los permisos que realmente necesita.
- Revisa bien todo lo que entra a tu función para evitar que te metan código malicioso.
- Si manejas información delicada, asegúrate de encriptarla usando AWS KMS o similares. No dejes contraseñas o claves de API a la vista.
- Para más seguridad, pon tus funciones en sus propias VPCs, así controlas mejor el acceso.
- Activa CloudWatch Logs para tener un registro de lo que hacen tus funciones y poder revisarlo.
- Considera usar WAF para bloquear solicitudes peligrosas antes de que lleguen a tus funciones Lambda a través de API Gateway.
- No te olvides de hacer chequeos de seguridad regularmente para encontrar y solucionar posibles problemas.

Siguiendo estos consejos, tus aplicaciones sin servidores estarán más protegidas.

### Herramientas de Seguridad Lambda {id="herramientas-de-seguridad-lambda"}

AWS tiene herramientas que te ayudan a cuidar la seguridad de tus funciones Lambda:

- **AWS Config**: Te avisa si hay cambios en tus configuraciones que pueden ser un riesgo.
- **AWS Security Hub**: Es como un centro de control de seguridad que junta información de diferentes fuentes.
- **Amazon GuardDuty**: Está siempre revisando tu cuenta en busca de cosas raras que puedan ser señales de alerta.
- **AWS Lambda Insights**: Una extensión de CloudWatch que te da más detalles para entender y solucionar problemas en tus funciones.
- **AWS X-Ray**: Te ayuda a seguir las solicitudes a través de tus servicios y encontrar dónde están los problemas o demoras.
- **AWS Shield**: Protege tus aplicaciones de ataques DDoS automáticamente, incluyendo las que usan Lambda y API Gateway.

Con estas herramientas, puedes tener un mejor control y reacción ante problemas de seguridad en tus aplicaciones sin servidores.

## Optimización y Monitoreo {id="optimizaci%C3%B3n-y-monitoreo-1"}

### Optimización del Rendimiento {id="optimizaci%C3%B3n-del-rendimiento"}

Para que tus funciones de AWS Lambda funcionen mejor y más rápido, intenta lo siguiente:

- **Reduce el tamaño de tu código**: Si tienes menos código y dependencias, tu función se iniciará más rápido. Quita lo que no necesites.
- **Escoge el mejor lenguaje para tu caso**: Algunos lenguajes de programación, como Node.js o Python, pueden ser más rápidos para ciertas tareas. Elige el que mejor se ajuste.
- **Organiza tu código con capas**: Esto ayuda a que solo se descargue lo nuevo o lo que cambia, haciendo que todo sea más rápido.
- **Activa contenedores que siempre estén listos**: Esto se llama concurrencia aprovisionada y significa que tienes contenedores esperando, así no tienes que esperar a que se preparen.
- **Guarda información que no cambia**: Si tu función se conecta a bases de datos o servicios, intenta mantener esa conexión abierta para usarla de nuevo.
- **Mira cómo va todo**: Con herramientas como CloudWatch, puedes ver cuánto tardan tus funciones, si hay errores y cómo se están usando los recursos. Usa esa información para hacer mejoras.

### Monitoreo y Registro {id="monitoreo-y-registro"}

Para mantener un ojo en cómo funcionan tus servicios sin servidores, puedes usar:

- **CloudWatch Logs**: Aquí puedes ver qué hace tu función, si hay errores y otros detalles importantes para solucionar problemas.
- **CloudWatch Metrics**: Te da información en tiempo real sobre cuántas veces se usa tu función, cuánto tarda, errores y más.
- **AWS X-Ray**: Te ayuda a entender mejor cómo funciona tu aplicación, mostrando qué pasa con las solicitudes a través de diferentes servicios.
- **Amazon CloudWatch Lambda Insights**: Te da más detalles sobre el rendimiento de tus funciones y los errores que puedan tener.
- **Tableros personalizados**: Puedes crear tus propios paneles en CloudWatch para tener toda la información importante en un solo lugar.

No olvides configurar alarmas para que te avisen si algo necesita tu atención. Así podrás arreglar problemas de rendimiento o errores rápidamente.

## Extensiones y Herramientas de Desarrollo {id="extensiones-y-herramientas-de-desarrollo"}

### Extensiones de AWS Lambda {id="extensiones-de-aws-lambda"}

AWS Lambda ofrece algunas herramientas extra que te ayudan a hacer más cosas:

**AWS Lambda Powertools** - Es un conjunto de herramientas para que escribir y manejar tus funciones Lambda sea más fácil. Incluye ayuda para registrar lo que pasa en tus funciones, medir cómo van, y asegurarte de que los datos que reciben son correctos.

**AWS Lambda Layers** - Te permite compartir código o librerías entre varias funciones sin tener que copiarlas en cada una. Es como tener una caja de herramientas compartida.

**AWS Lambda Extensions API** - Es una manera de conectar herramientas externas directamente con tus funciones Lambda para ayudarte a solucionar problemas, seguir lo que hacen y ajustar cómo trabajan.

**AWS Lambda Insights** - Es un extra de CloudWatch que te muestra en detalle cómo están funcionando tus funciones Lambda, ofreciéndote información sobre el uso, errores y más.

**AWS Lambda Container Image Support** - Te permite usar imágenes de Docker para crear tus funciones Lambda. Esto es útil si ya tienes aplicaciones en Docker y quieres llevarlas a Lambda.

### Herramientas de Desarrollo {id="herramientas-de-desarrollo"}

Hay varias herramientas que hacen más fácil trabajar con funciones Lambda:

- AWS SAM CLI - Una herramienta de línea de comandos para construir, probar e implementar aplicaciones sin servidores usando AWS SAM.
- AWS Toolkit - Un conjunto de complementos para programas como VSCode, IntelliJ y Eclipse que te ayudan a desarrollar aplicaciones sin servidores.
- AWS CDK - Te permite definir tu infraestructura de AWS con código, usando lenguajes como TypeScript, Python y Java.
- Serverless Framework - Un marco de trabajo de código abierto para construir aplicaciones sin servidores en AWS Lambda.
- SAM Local - Te permite probar y solucionar problemas de tus aplicaciones sin servidores localmente antes de subirlas a Lambda.

Además, AWS Lambda ofrece SDKs para varios lenguajes de programación como JavaScript, Python, Java, Go, C# y Ruby, lo que te permite conectar fácilmente tus funciones con otros servicios de AWS.

Con todas estas herramientas, desarrollar aplicaciones sin servidores en AWS Lambda puede ser mucho más rápido y sencillo.

## Futuro de AWS Lambda {id="futuro-de-aws-lambda"}

### Innovaciones Recientes {id="innovaciones-recientes"}

AWS Lambda ha mejorado mucho últimamente. Aquí tienes algunas novedades:

- **Soporte para contenedores**: Ahora puedes usar contenedores Docker con tus funciones Lambda. Esto es genial si ya tienes apps en Docker y quieres pasarlas a Lambda.
- **Funciones de inicio rápido**: AWS Lambda puede mantener tus funciones listas para que respondan más rápido, reduciendo el tiempo que tardan en empezar.
- **Capacidad extendida**: Ahora puedes usar hasta 10 GB de RAM y 6 vCPUs con Lambda, lo que te permite hacer cosas más complejas.
- **Integración con Grafana**: Puedes ver cómo van tus funciones Lambda usando Grafana, junto con datos de otros servicios.
- **Compatibilidad con Ruby**: Ahora también puedes escribir tus funciones Lambda en Ruby.
- **Soporte para Amazon Linux 2**: Las funciones Lambda usan Amazon Linux 2, que es más seguro y está más actualizado.
- **AWS Lambda Powertools**: Son herramientas que te ayudan a desarrollar, solucionar problemas y manejar tus funciones Lambda más fácilmente.

Estas mejoras hacen que Lambda sea aún más útil para diferentes proyectos.

### Hacia dónde se dirige AWS Lambda {id="hacia-d%C3%B3nde-se-dirige-aws-lambda"}

Se espera que AWS Lambda mejore en varios aspectos:

- **Tiempos de inicio más rápidos**: Trabajan para que las funciones empiecen casi al instante.
- **Más integración con otros servicios**: Quieren que sea más fácil usar Lambda con otros servicios de AWS para bases de datos, almacenamiento y redes.
- **Soporte para más lenguajes**: Planean agregar soporte para otros lenguajes de programación como Rust, Haskell y Swift.
- **Optimización automática**: Podrían usar aprendizaje automático para ajustar los recursos y configuraciones de tus funciones automáticamente.
- **Facturación por solicitud**: Están considerando un nuevo modelo de facturación que se base en el número de solicitudes, no en el consumo de recursos.
- **Entornos consistentes**: Quieren que puedas tener entornos de Lambda iguales en diferentes regiones para que todo funcione sin problemas.
- **Ejecución de funciones más prolongada**: Buscan permitir que las funciones se ejecuten por más tiempo, no solo unos minutos.

Con estos cambios, AWS Lambda quiere seguir siendo una de las mejores opciones para crear aplicaciones sin servidores en la nube.

## Conclusión {id="conclusi%C3%B3n"}

AWS Lambda es una herramienta que nos ayuda a crear aplicaciones sin tener que preocuparnos por los servidores. A lo largo de esta guía, hemos visto desde lo más básico hasta cómo sacarle el máximo provecho, pasando por su funcionamiento, ejemplos de uso, cómo se lleva con otros servicios de AWS, su estructura, cómo mantenerla segura, cómo mejorarla y cómo mantener todo bajo control.

Los puntos principales que hemos cubierto son:

- Con Lambda, puedes hacer que tu código se ejecute en la nube sin tener que manejar tú mismo los servidores. Solo pagas por el tiempo que tu código está activo.
- Funciona bien con muchos otros servicios de AWS, como DynamoDB, S3 y API Gateway.
- Puede manejar desde pocas solicitudes al día hasta millones en segundos.
- Tiene una oferta gratuita para que puedas probarlo sin gastar.
- Hay varias maneras de trabajar con Lambda, como usar la consola de AWS, AWS SAM y Terraform.
- Sirve para muchas cosas, como procesar datos, crear APIs, hacer chatbots, conectar con dispositivos IoT y más.
- Ofrece buenas opciones de seguridad y herramientas para que puedas ver qué está pasando con tus funciones y arreglar problemas.
- AWS Lambda sigue mejorando, añadiendo nuevas funciones y haciéndolo más fácil y rápido de usar.

En pocas palabras, AWS Lambda te quita la carga de pensar en servidores. Te da una manera flexible, que puede crecer según lo necesites y que no cuesta mucho, para hacer aplicaciones modernas basadas en eventos y sin servidores. Es una herramienta esencial para cualquier persona que desarrolle aplicaciones en la nube.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué es AWS Lambda y para qué se usa? {id="%C2%BFqu%C3%A9-es-aws-lambda-y-para-qu%C3%A9-se-usa%3F"}

AWS Lambda es un servicio que te permite ejecutar código para diferentes tipos de aplicaciones o servicios sin que tengas que preocuparte por los servidores. Esto quiere decir que no necesitas configurar o mantener servidores físicos para que tu código funcione.

Con Lambda, solo pagas por el tiempo que tu código está corriendo. Si tu código no se está ejecutando, no pagas nada. Esto es ideal para tareas que no necesitan correr todo el tiempo, como responder a acciones específicas (por ejemplo, cuando alguien hace clic en tu página web o cuando se actualizan datos).

Lambda soporta varios lenguajes de programación, como Node.js, Python, Java y C#, y se integra bien con otros servicios de AWS. Esto lo hace perfecto para crear aplicaciones sin servidores, APIs, procesar información de dispositivos IoT, análisis de datos, y más.

### ¿Cómo probar un Lambda? {id="%C2%BFc%C3%B3mo-probar-un-lambda%3F"}

Para probar una función Lambda desde la consola de AWS:

- Ve a la sección de Funciones en la consola de Lambda.
- Selecciona el nombre de la función que quieres probar.
- Haz clic en la pestaña "Test".
- En "Evento de prueba", elige "Crear evento nuevo" o "Editar evento guardado", y luego selecciona el evento que quieres usar.
- Pulsa "Test" para ejecutar la función.

También puedes probar una función Lambda de otras maneras:

- Usando la línea de comandos con AWS CLI
- Con herramientas como SAM CLI o Serverless Framework para correrla localmente
- Configurando un desencadenante (trigger) para que se ejecute con un evento real
- Revisando los registros y métricas en CloudWatch

Probar tus funciones Lambda mientras las desarrollas te ayuda a encontrar y solucionar problemas antes de que estén en vivo.

## Related posts

- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Utilizando Lambda Layers en Múltiples Funciones Lambda](/blog/utilizando-lambda-layers-en-multiples-funciones-lambda/)
- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
