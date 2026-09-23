+++
url = "/blog/base-de-datos-global-con-amazon-dynamodb/"
title = "Base de Datos Global con Amazon DynamoDB"
description = "Descubre cómo aprovechar las tablas globales de Amazon DynamoDB para tener una base de datos rápida, escalable y segura en todo el mundo. Configuración, replicación, seguridad y procesamiento en tiempo real."
date = "2024-03-09T02:19:41.967000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/b74e56b41e26732c7dfc378e7e76682787c05aaa4bebafd6cb9c68692d7c448d.jpg"
archive_order = 153

[[related]]
title = "¿Qué son los endpoints de VPC en AWS?"
url = "/blog/que-son-los-endpoints-de-vpc-en-aws/"
image = "/assets/blog/784749ef7570c8a485edf97b3621d67188aaaced0dc704eafe4a5e0b6971236c.jpg"

[[related]]
title = "10 Estrategias de Optimización de Costos en AWS"
url = "/blog/10-estrategias-de-optimizacion-de-costos-en-aws/"
image = "/assets/blog/74f152c85b46e1ac5ea004f9413e075e78ed825f3a458438c31af35f95d68e1f.jpg"

[[related]]
title = "¿Cómo Escala DynamoDB? Modos On Demand y Provisioned"
url = "/blog/como-escala-dynamodb-modos-on-demand-y-provisioned/"
image = "/assets/blog/ce62e0cc8508d5055bba53b4a49f5440547f988cba28c60a29266ff760a6f177.jpg"
+++

Si buscas hacer que tu aplicación funcione rápidamente alrededor del mundo, las tablas globales de Amazon DynamoDB son tu solución. Aquí te explicamos de forma sencilla cómo aprovecharlas:

- **Rápido para usuarios en cualquier lugar:** Replicando datos cerca de donde viven tus usuarios.
- **Disponibilidad constante:** Tus datos están seguros incluso si una región falla.
- **Escala global sin preocupaciones:** Atiende a usuarios en todo el mundo fácilmente.
- **Seguridad mejorada:** Datos protegidos en múltiples ubicaciones.
- **Fácil gestión:** DynamoDB maneja la replicación por ti.

Antes de comenzar, asegúrate de tener una cuenta de AWS y permisos adecuados. Luego, selecciona las regiones para replicar tus datos, configura la capacidad de lectura/escritura y aprovecha las herramientas de AWS para la seguridad y el procesamiento de datos en tiempo real. La replicación es rápida y te ofrece consistencia eventual, asegurando que todos vean los mismos datos casi al instante.

Las tablas globales son ideales para aplicaciones móviles, juegos en línea y proyectos de IoT que operan a nivel mundial. Y aunque usar tablas globales no tiene un costo extra específico, se te cobrará por el uso de capacidad y almacenamiento en cada región. Para aquellos que necesitan una base de datos rápida, escalable y confiable a nivel global, DynamoDB es la opción.

### Ventajas de las tablas globales {id="ventajas-de-las-tablas-globales"}

Usar las tablas globales tiene varios beneficios:

- **Más rápido para tus usuarios:** Como los datos están cerca de ellos, la aplicación responde más rápido.
- **Siempre disponible:** Si una región tiene problemas, tus datos están seguros en otras regiones.
- **Crecimiento sin límites:** Puedes tener usuarios en cualquier parte del mundo sin preocuparte.
- **Más seguro:** Tus datos están más protegidos al estar en varios lugares.
- **Fácil de manejar:** No tienes que romperte la cabeza pensando en cómo copiar tus datos; DynamoDB lo hace por ti.

Para aplicaciones que se usan en todo el mundo y necesitan ser rápidas y confiables, las tablas globales son una excelente opción.

## Configuración de tablas globales {id="configuraci%C3%B3n-de-tablas-globales"}

### Requisitos previos {id="requisitos-previos"}

Antes de empezar con una tabla global en DynamoDB, necesitas tener listo lo siguiente:

- Una cuenta de AWS y acceso a la CLI de AWS.
- Permisos en IAM para poder crear y manejar tablas en DynamoDB.
- Activar la opción de tablas globales en la consola de DynamoDB.
- Ya debes tener una tabla en DynamoDB o crear una para hacerla global.

### Selección de regiones de réplica {id="selecci%C3%B3n-de-regiones-de-r%C3%A9plica"}

Cuando elijas dónde replicar tus datos, ten en cuenta:

- Escoger mínimo dos regiones en diferentes partes del mundo para más seguridad.
- Comenzar con pocas regiones y añadir más si es necesario.
- Elegir regiones cerca de tus usuarios para que la aplicación sea más rápida para ellos.

### Asignación de capacidad de lectura/escritura {id="asignaci%C3%B3n-de-capacidad-de-lectura%2Fescritura"}

Para que tu tabla global funcione bien, asegúrate de tener suficiente capacidad de lectura y escritura en cada región:

- Revisa cómo se están usando las tablas en cada región y ajusta la capacidad como veas necesario.
- Piensa en tener capacidad extra reservada en lugares clave.
- Usa alarmas para saber si necesitas más capacidad.

La capacidad que pongas en la región principal se va a compartir con las réplicas, pero después puedes ajustarla individualmente.

## Replicación y consistencia de datos {id="replicaci%C3%B3n-y-consistencia-de-datos"}

### Mecanismo de replicación {id="mecanismo-de-replicaci%C3%B3n"}

Amazon DynamoDB usa un método especial para asegurarse de que cuando cambias algo en una tabla global, ese cambio se ve en todas partes del mundo. Imagina que tienes amigos en diferentes ciudades y cada vez que compras algo nuevo, les envías una foto. DynamoDB hace algo parecido con tus datos, pero mucho más rápido.

Aquí te explicamos cómo lo hace:

- **Sincronización incremental:** Piensa en esto como actualizar solo lo que ha cambiado. Si solo cambias una parte de tus datos, DynamoDB solo envía esos pequeños cambios a otras regiones, no toda la base de datos. Esto ahorra mucho tiempo y uso de internet.
- **Resolución de conflictos:** A veces, dos lugares pueden hacer cambios al mismo tiempo. DynamoDB decide automáticamente cuál cambio es el más reciente y lo mantiene.
- **Reintentos automáticos:** Si por alguna razón, la actualización no llega a una región, DynamoDB lo intenta de nuevo hasta que todo esté sincronizado.

### Consistencia eventual {id="consistencia-eventual"}

Con las tablas globales de DynamoDB, los cambios que haces no se ven inmediatamente en todas partes, pero casi. Esto se llama consistencia eventual. Significa que:

- Los cambios se mueven rápido entre regiones, usualmente en menos de un segundo.
- Con el tiempo, todos los lugares tendrán la misma información.
- Puede que por un momentito, algunos lugares vean una versión antigua de los datos, pero esto se arregla rápido.

Este tipo de consistencia funciona bien para muchas aplicaciones porque asegura que tus datos están en todas partes sin sacrificar velocidad.

## Seguridad y encriptación de datos {id="seguridad-y-encriptaci%C3%B3n-de-datos"}

### AWS KMS {id="aws-kms"}

AWS Key Management Service (KMS) es una herramienta que ayuda a mantener tus datos seguros cuando se copian entre diferentes lugares usando las tablas globales de DynamoDB. Con KMS, puedes crear una llave de seguridad única para cada copia de tus datos. Esto significa que solo las personas o aplicaciones con permiso pueden ver o usar esos datos.

Al usar KMS con tus tablas globales, la copia de datos entre regiones es segura porque todo se cifra, es decir, se convierte en un código que solo se puede entender con la llave correcta. No tienes que preocuparte por manejar estas llaves tú mismo; AWS lo hace por ti.

### Permisos y políticas {id="permisos-y-pol%C3%ADticas"}

Es crucial controlar quién puede hacer qué con tus llaves de cifrado y datos. Aquí hay algunas cosas que puedes hacer para mantener todo seguro:

- Asegúrate de que solo DynamoDB pueda usar tus llaves de cifrado.
- No dejes que nadie fuera de los servicios permitidos comparta tus llaves.
- Cambia tus llaves de seguridad de vez en cuando para mayor seguridad.
- Estate atento a cualquier intento de acceso a tus llaves y cómo se usan.

Si configuras todo bien, puedes estar tranquilo sabiendo que tus datos en las tablas globales de DynamoDB están protegidos con la seguridad que ofrece KMS.

## Procesamiento de datos en tiempo real {id="procesamiento-de-datos-en-tiempo-real"}

### [DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) {id="dynamodb-streams"}

![DynamoDB Streams](/assets/blog/d7e196337fcc9364e3d78c97f90a238aff3aef9324f6d76d758040a3464b22e1.jpg)

DynamoDB Streams te ayuda a ver los cambios en tu base de datos, como cuando se añaden, actualizan o eliminan datos. Esto es muy útil porque, si tu base de datos está en varios lugares del mundo, puedes asegurarte de que todos los cambios se reflejen en todas partes.

Esto es bueno para:

- Asegurar que todos los lugares tengan la misma información
- Usar los cambios en los datos para análisis o reportes
- Crear versiones actualizadas de tus datos basadas en esos cambios

### [AWS Lambda](https://aws.amazon.com/lambda/) {id="aws-lambda"}

![AWS Lambda](/assets/blog/c0eb5d69184d1120b29c2a25d100688f362e5bae6d880f981b39cc2148e3b6a3.jpg)

Con AWS Lambda, puedes hacer que ciertas acciones sucedan automáticamente cuando hay cambios en tu base de datos. Esto significa que puedes:

- Manejar datos actualizados al momento, sin necesidad de otros servidores
- Hacer cosas específicas con esos datos, como transformarlos, enviar alertas o actualizar información
- Conectar fácilmente con otros servicios de AWS cuando hay cambios

Ejemplos de lo que puedes hacer:

- Sumar datos en el momento que cambian
- Mandar eventos a Amazon EventBridge para más acciones
- Enviar notificaciones por mensajes de texto o correo sobre cambios importantes
- Asegurar que una versión actualizada de tus datos o una vista especial siempre esté al día

Usando Lambda, puedes crear aplicaciones que no necesitan servidores y que reaccionan a los cambios en tus datos globales de DynamoDB.

## Casos de uso y ejemplos {id="casos-de-uso-y-ejemplos"}

Veamos cómo las tablas globales de DynamoDB pueden ayudar en diferentes tipos de aplicaciones que se usan en todo el mundo:

### Apps móviles {id="apps-m%C3%B3viles"}

Si tienes una app que usan personas de diferentes partes del mundo, las tablas globales pueden hacer que la app funcione más rápido para todos. Por ejemplo:

- Una app de mensajes puede guardar los chats y contactos de los usuarios en lugares cerca de ellos. Así, cuando abren la app, todo carga rápido porque los datos vienen del lugar más cercano.
- En una app de juegos donde los jugadores compiten por tener las mejores puntuaciones, puedes guardar esas puntuaciones en diferentes lugares. De esta manera, todos pueden ver las clasificaciones en tiempo real, sin importar dónde estén.

### Juegos online {id="juegos-online"}

Los juegos en línea que mucha gente juega juntos pueden usar DynamoDB para:

- Asegurarse de que todos los jugadores vean el juego igual, sincronizando la información del juego entre diferentes lugares.
- Guardar el progreso y los logros de los jugadores en todos lados, para que no pierdan su información si cambian de región.

### IoT global {id="iot-global"}

Para proyectos de IoT (cosas conectadas a internet) que recogen datos de sensores en muchos lugares, las tablas globales son útiles para:

- Enviar datos de sensores a lugares cercanos para analizarlos rápido y sin retrasos.
- Tener copias de seguridad de esos datos en varios lugares, por si hay problemas en una región.
- Procesar mucha información de sensores usando servidores en diferentes partes del mundo.

## Preguntas frecuentes {id="preguntas-frecuentes"}

Aquí respondemos a algunas dudas comunes sobre cómo funciona la replicación de datos, la consistencia, el rendimiento y cómo configurar y usar tablas globales en DynamoDB.

### ¿Cuánto tardan en replicarse los datos? {id="%C2%BFcu%C3%A1nto-tardan-en-replicarse-los-datos%3F"}

Normalmente, los datos se replican entre regiones en menos de un segundo bajo condiciones normales. Si hay problemas de red o errores, puede haber retrasos, pero DynamoDB intentará nuevamente la replicación de forma automática.

### ¿Se pueden usar tablas globales con transacciones ACID? {id="%C2%BFse-pueden-usar-tablas-globales-con-transacciones-acid%3F"}

No, las transacciones ACID, que aseguran que las operaciones de base de datos se realicen de forma segura, solo están disponibles para tablas en una sola región. Aún no se pueden usar con tablas globales.

### ¿Cómo afecta esto al rendimiento de lectura y escritura? {id="%C2%BFc%C3%B3mo-afecta-esto-al-rendimiento-de-lectura-y-escritura%3F"}

Agregar réplicas en otras regiones no cambia el rendimiento de lectura/escritura en la región principal. Puedes ajustar la capacidad de lectura/escritura de manera independiente en cada región según lo necesites.

### ¿Necesito hacer cambios en las aplicaciones que usan DynamoDB? {id="%C2%BFnecesito-hacer-cambios-en-las-aplicaciones-que-usan-dynamodb%3F"}

No, las aplicaciones pueden seguir usando DynamoDB de la misma manera, sin cambios. La replicación es transparente para las aplicaciones.

### ¿Hay costos extra por usar tablas globales? {id="%C2%BFhay-costos-extra-por-usar-tablas-globales%3F"}

No hay costos adicionales solo por usar la funcionalidad de tablas globales. Se te cobrará según la capacidad y el uso de almacenamiento/rendimiento en cada región donde tengas una réplica.

## Preguntas relacionadas {id="preguntas-relacionadas"}

### ¿Qué tipo de base de datos es Amazon DynamoDB? {id="%C2%BFqu%C3%A9-tipo-de-base-de-datos-es-amazon-dynamodb%3F"}

Amazon DynamoDB es una base de datos NoSQL que se maneja sola y está hecha para que las aplicaciones funcionen muy rápido, sin importar cuánto crezcan.

### ¿Qué empresas utilizan DynamoDB? {id="%C2%BFqu%C3%A9-empresas-utilizan-dynamodb%3F"}

Empresas grandes y en crecimiento como Lyft, Airbnb, y Redfin, así como otras conocidas como Samsung, Toyota y Capital One, usan DynamoDB porque les permite manejar mucha información rápidamente.

### ¿Cuándo usar DynamoDB? {id="%C2%BFcu%C3%A1ndo-usar-dynamodb%3F"}

Usa Amazon DynamoDB cuando necesites que tu aplicación responda muy rápido a quien la use y pueda crecer mucho, incluso a nivel mundial.

### ¿Qué es una clave principal en Amazon DynamoDB? {id="%C2%BFqu%C3%A9-es-una-clave-principal-en-amazon-dynamodb%3F"}

En DynamoDB hay dos tipos de claves principales:

- Clave de partición: Es una clave simple que identifica de manera única cada elemento.
- Clave de partición y clave de ordenación: Estas dos juntas permiten organizar mejor los datos y acceder a ellos de forma más eficiente.

## Related posts

- [Amazon DynamoDB: La Base de Datos NoSQL de AWS](/blog/amazon-dynamodb-la-base-de-datos-nosql-de-aws/)
- [Amazon DynamoDB: Guía Básica](/blog/amazon-dynamodb-guia-basica/)
- [Bases de Datos en AWS: introducción básica](/blog/aws-bases-de-datos-introduccion-basica/)
- [Bases de datos Relacionales en AWS con Amazon RDS y Amazon Aurora](/blog/bases-de-datos-relacionales-en-aws-con-amazon-rds-y-amazon-aurora/)
