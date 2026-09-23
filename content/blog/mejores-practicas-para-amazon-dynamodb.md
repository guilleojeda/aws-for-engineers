+++
url = "/blog/mejores-practicas-para-amazon-dynamodb/"
title = "Mejores Prácticas Para Amazon DynamoDB"
description = "Consejos y mejores prácticas para utilizar Amazon DynamoDB de manera eficiente y segura. Aprende sobre diseño de tablas, ajuste de capacidad, seguridad, índices secundarios y operaciones de lectura/escritura."
date = "2024-03-09T04:08:02.203000+00:00"
lastmod = "2024-04-05"
image = "/assets/blog/4cce0f893747a12210fe7416d4a4d62ac92b55c57b0a0522d0dc7c53baed78e3.jpg"
archive_order = 132

[[related]]
title = "Visualiza Costos con AWS Cost and Usage Reports y QuickSight"
url = "/blog/visualiza-costos-con-aws-cost-and-usage-reports-y-quicksight/"
image = "/assets/blog/bcf6fecd181e12cedeeed88a06ce3a2772dabdc03625a03f3037d670c0942f94.jpg"

[[related]]
title = "Mejores Prácticas Para Amazon S3"
url = "/blog/mejores-practicas-para-amazon-s3/"
image = "/assets/blog/7dc90730b1402ed9efe1a10b070f432347b9df55e47c44fe218d3684e3da6dc8.jpg"

[[related]]
title = "Desarrollo en la nube: fundamentos esenciales"
url = "/blog/desarrollo-en-la-nube-fundamentos-esenciales/"
image = "/assets/blog/9257652addf07f39008f550d27fea73d75f35a0614ec70f55570e1d4b09f2a79.jpg"
+++

Para sacar el máximo provecho a Amazon DynamoDB y hacer que tus aplicaciones sean más rápidas y seguras, sigue estas recomendaciones clave:

- **Diseño de tablas**: Opta por una clave principal adecuada, considera claves de ordenamiento y usa claves compuestas para relaciones de uno a muchos.
- **Ajuste de capacidad de lectura/escritura**: Comienza con el modo automático y ajusta según sea necesario.
- **Seguridad**: Cifra tus datos, utiliza IAM para control de acceso y protege los datos a nivel de ítem si es necesario.
- **Índices secundarios**: Elige entre índices globales o locales y usa proyecciones para ahorrar costos.
- **Consultas y escaneos eficientes**: Optimiza cómo y cuánta información recuperas.

DynamoDB es una base de datos NoSQL ideal para aplicaciones que requieren altas velocidades de lectura/escritura y escalabilidad. La clave principal identifica de manera única cada elemento en una tabla. Para crear una tabla, sigue pasos específicos que incluyen configurar claves de Amazon EC2 y usar Amazon EMR para gestionar los datos.

Estas prácticas te ayudarán a diseñar, operar y mantener tus bases de datos DynamoDB de manera más eficiente y segura, asegurando un rendimiento óptimo de tus aplicaciones.

### Tablas y elementos {id="tablas-y-elementos"}

Las tablas en DynamoDB son como grandes contenedores para tus datos. Cada dato o elemento tiene una clave única que lo identifica, y puede tener muchos detalles o atributos.

Imagina que tienes una tabla para usuarios. Cada usuario (elemento) podría tener detalles como su ID, nombre, correo electrónico, y cuándo se registró. El ID sería la clave única.

Puedes agregar, cambiar, borrar y buscar elementos en DynamoDB fácilmente. El sistema se ajusta solo para manejar muchísimas solicitudes al mismo tiempo.

### Claves primarias y secundarias {id="claves-primarias-y-secundarias"}

La **clave primaria** es como el DNI de cada elemento; es única. Puede ser simple (una sola parte) o compuesta (dos partes).

Las **claves secundarias** te ayudan a buscar datos de otra manera. Hay dos tipos: globales (copian toda la tabla) y locales (solo una parte de los datos).

Por ejemplo, si tienes una tabla de pedidos, la clave primaria sería el ID del pedido. Si creas un índice secundario global basado en el estado del pedido, podrías encontrar todos los pedidos pendientes rápidamente.

Entender las claves primarias y secundarias es clave (valga la redundancia) para hacer aplicaciones que funcionen bien y rápido con DynamoDB. Te permiten organizar y acceder a tus datos de la mejor manera.

## Diseño de tablas {id="dise%C3%B1o-de-tablas"}

Cuando se trata de hacer que DynamoDB funcione bien, cómo armas tus tablas es súper importante. Piensa en cómo vas a usar tus datos: qué información necesitas sacar y cómo vas a actualizarla. Esto te ayudará a decidir cómo armar tu esquema.

### Patrones de acceso {id="patrones-de-acceso"}

Primero, piensa en cómo vas a buscar tus datos. Esto te ayuda a decidir:

- La clave principal
- Si necesitas claves secundarias
- Qué índices secundarios podrían ser útiles

Si vas a buscar datos usando varios atributos, considera usar una clave compuesta o añadir índices secundarios.

### Claves de partición {id="claves-de-partici%C3%B3n"}

La clave de partición es como el repartidor de tus datos en DynamoDB. Quieres que esta clave:

- Tenga un montón de valores diferentes (alta cardinalidad)
- No cambie mucho con el tiempo

Esto asegura que tus datos se repartan bien y evita cuellos de botella.

Ideas para una buena clave de partición:

- Un ID único generado al azar
- Combinar atributos (por ejemplo, ID del usuario + fecha)
- Escoger un atributo que naturalmente tenga muchos valores distintos

### Claves de ordenamiento {id="claves-de-ordenamiento"}

Las claves de ordenamiento ayudan a organizar tus datos dentro de una misma partición. Son útiles cuando necesitas:

- Sacar un grupo específico de datos de una partición
- Hacer búsquedas que van por páginas

Consejos:

- Usa un atributo que tenga muchos valores distintos
- Trata de no crear zonas donde todos los datos se acumulen y causen lentitud

## Índices secundarios {id="%C3%ADndices-secundarios"}

Los índices secundarios en DynamoDB son una forma de mirar tus datos desde diferentes ángulos sin tener que copiarlos. Existen dos tipos principales:

### Índices globales (GSI) {id="%C3%ADndices-globales-(gsi)"}

Los GSI te permiten ver toda tu tabla de una manera nueva. Están compuestos por:

- **Clave de partición**: Es lo que divide tus datos en diferentes secciones.
- **Clave de ordenamiento** *(opcional)*: Ayuda a ordenar los datos dentro de esas secciones.
- **Proyección**: Decide qué información del elemento original se va a copiar.

Los GSI son útiles cuando:

- Quieres buscar datos con una clave principal diferente. Por ejemplo, encontrar pedidos por la fecha en vez de por el ID.
- Necesitas ordenar los elementos de otra manera. Como organizar productos por su precio.

Recuerda que los GSI usan más recursos porque se tienen que actualizar con cada cambio en los elementos.

### Índices locales (LSI) {id="%C3%ADndices-locales-(lsi)"}

Los LSI solo trabajan con una parte de los datos en cada sección. Lo que debes saber:

- Solo se usan dentro de una sección.
- No consumen recursos extra para escribir.
- Tienen las mismas opciones de proyección que los GSI.

Los LSI son buenos cuando:

- Solo necesitas una forma diferente de ordenar los datos y no vale la pena un GSI completo.
- Deseas ahorrar costos indexando menos información.

Limitaciones:

- No puedes hacer búsquedas con la clave de un LSI, solo ordenar datos en una búsqueda.
- No es posible paginar resultados basándose en un LSI.

En resumen, los GSI te dan más flexibilidad para consultar datos a cambio de usar más recursos. Los LSI te ayudan a ordenar datos dentro de una sección sin gastar extra. Escoge el mejor para lo que necesitas.

## Operaciones de lectura y escritura {id="operaciones-de-lectura-y-escritura"}

### Unidades de capacidad de throughput {id="unidades-de-capacidad-de-throughput"}

Para que DynamoDB funcione bien, es clave darle la cantidad correcta de recursos para manejar la información que entra y sale. Aquí van algunos consejos:

- Al principio, usa el modo que ajusta los recursos automáticamente según lo que necesites. Así no gastas de más.
- Después de ver cómo se comporta tu tráfico, puedes elegir una cantidad fija de recursos para ahorrar dinero.
- Activa el ajuste automático de recursos para que se adapte a los cambios en la demanda.
- Usa CloudWatch para ver cómo vas de recursos y ajusta según necesites.

### Particiones y paginación {id="particiones-y-paginaci%C3%B3n"}

Para hacer búsquedas rápidas, piensa bien en tu clave de partición y usa la paginación:

- Escoge una clave de partición que reparta bien la carga.
- Usa paginación en tus búsquedas para no sobrecargar el sistema. Puedes pedir los resultados por partes.
- Mantén los tamaños de página razonables para que todo sea más rápido (entre 100 y 1000 elementos es un buen rango).

### Lecturas y escrituras fuertemente consistentes {id="lecturas-y-escrituras-fuertemente-consistentes"}

Normalmente, DynamoDB espera un poco para actualizar todos los lugares donde guarda tus datos, lo que lo hace más rápido. Pero si necesitas que los cambios se vean al instante:

- Puedes pedir que las lecturas sean inmediatamente consistentes con un ajuste especial.
- Para escribir datos, hay una opción que asegura que varias operaciones se hagan todas juntas.
- Si usas estas opciones, mira bien tus recursos para asegurarte de que tienes suficientes.

## Seguridad, control de acceso y encriptación {id="seguridad%2C-control-de-acceso-y-encriptaci%C3%B3n"}

### Autenticación y autorización con IAM {id="autenticaci%C3%B3n-y-autorizaci%C3%B3n-con-iam"}

Para controlar quién puede hacer qué en DynamoDB, es buena idea usar políticas de IAM. Esto te permite:

- Dar permisos específicos a usuarios, grupos o roles para que accedan solo a lo que necesitan.
- Poner condiciones en las políticas para más seguridad, como limitar el acceso a ciertas tablas.
- Quitar permisos fácilmente sin afectar todo el sistema.

Algunos consejos útiles son:

- Prefiere usar roles para aplicaciones en vez de claves fijas. Esto hace más fácil cambiar las credenciales.
- Aplica la regla de dar el menor acceso posible. Solo da los permisos que realmente se necesiten.
- Usa CloudTrail para revisar el uso de IAM y detectar cosas raras.

### Encriptación en reposo con KMS {id="encriptaci%C3%B3n-en-reposo-con-kms"}

Es recomendable activar la encriptación en reposo para proteger tus datos en DynamoDB usando AWS Key Management Service (KMS). Esto ayuda a mantener tus datos seguros si alguien intenta acceder sin permiso.

Cómo manejar las claves de encriptación:

- Claves gestionadas por AWS: Son fáciles de usar y AWS se encarga de ellas.
- Claves gestionadas por el cliente: Tú controlas cómo y cuándo se usan. Te da más control.
- CloudHSM: Para necesidades específicas de seguridad, con hardware dedicado.

DynamoDB automáticamente se encarga de encriptar y desencriptar tus datos con estas configuraciones.

### Encriptación en tránsito con SSL/TLS {id="encriptaci%C3%B3n-en-tr%C3%A1nsito-con-ssl%2Ftls"}

DynamoDB usa SSL/TLS para proteger tus datos cuando se mueven por la red. Esto evita que alguien los intercepte o cambie.

Esta protección se aplica automáticamente a todas las conexiones con DynamoDB, así que no tienes que hacer nada extra para tenerla.

## Optimización del rendimiento de DynamoDB {id="optimizaci%C3%B3n-del-rendimiento-de-dynamodb"}

### Particionamiento efectivo {id="particionamiento-efectivo"}

Para que DynamoDB funcione rápido, es importante organizar bien tus datos. Aquí van algunos consejos:

- Escoge una clave de partición que tenga muchos valores diferentes. Esto ayuda a que los datos se repartan bien y el sistema funcione sin atascos. Por ejemplo, un número aleatorio es mejor que una fecha.
- Si un atributo no tiene suficientes valores únicos, combina varios para crear la clave de partición.
- Evita que una sola partición tenga demasiada actividad, ya que puede ralentizar el sistema.
- Las claves de rango te permiten ordenar los datos dentro de una partición y hacer búsquedas más rápidas.

### Índices secundarios {id="%C3%ADndices-secundarios-1"}

Los índices secundarios te ayudan a buscar datos de otras formas sin afectar la búsqueda principal:

- Los índices globales (GSI) son útiles cuando quieres buscar con una clave diferente. Por ejemplo, buscar pedidos por fecha en vez de por ID.
- Los índices locales (LSI) son buenos para ordenar los datos de otra manera dentro de una misma partición.
- Ajusta los índices para que solo copien los datos que necesitas. Esto ayuda a ahorrar recursos.

### Paginación, Búsquedas en Paralelo y Streams {id="paginaci%C3%B3n%2C-b%C3%BAsquedas-en-paralelo-y-streams"}

Hay otras maneras de hacer que DynamoDB sea más rápido:

- La paginación te permite manejar grandes cantidades de datos por partes.
- Las búsquedas en paralelo permiten leer datos de muchas particiones al mismo tiempo, lo que acelera el proceso.
- DynamoDB Streams captura cambios en tus datos para que puedas trabajar con ellos más tarde sin afectar el rendimiento general.

## Monitoreo y métricas {id="monitoreo-y-m%C3%A9tricas"}

El monitoreo y las métricas son fundamentales para mantener tus aplicaciones corriendo bien en DynamoDB. Aquí te mostramos cómo puedes usar algunas herramientas para mantener un ojo en cómo se usan los recursos y encontrar problemas antes de que se agranden.

### Métricas en CloudWatch {id="m%C3%A9tricas-en-cloudwatch"}

CloudWatch es una herramienta de AWS que te ayuda a ver cómo va todo. Con ella puedes:

- Observar en tiempo real cuánto estás leyendo y escribiendo en tus tablas, y cuánto te está costando.
- Poner alarmas para que te avisen si algo pasa de un límite que tú decides.
- Crear tableros con la información que más te interesa para tenerla siempre a la vista.

Algunas cosas importantes que deberías mirar en DynamoDB son:

- `ConsumedReadCapacityUnits` y `ConsumedWriteCapacityUnits`: te muestran si necesitas más o menos capacidad.
- `ReadThrottleEvents` y `WriteThrottleEvents`: si estas cifras son altas, significa que estás pidiendo más de lo que DynamoDB puede darte y algunas solicitudes se están deteniendo.

### Reportes en consola de DynamoDB {id="reportes-en-consola-de-dynamodb"}

La consola de DynamoDB tiene una parte de reportes que te da información como:

- Cuánto estás usando de lectura y escritura con el tiempo.
- Cómo se reparten tus datos.
- Cuánto trabajas con DynamoDB cada hora.
- Cómo van tus solicitudes.

Es bueno que revises estos reportes a menudo para ver:

- Si hay partes de tus datos que están causando problemas.
- Si estás pagando por más capacidad de la que usas, para poder ajustar y ahorrar.
- Cómo cambia el uso de tus recursos para poder planear mejor.

Esta información te ayudará a hacer cambios y mantener tus aplicaciones funcionando de manera óptima.

## Conclusión {id="conclusi%C3%B3n"}

DynamoDB es una base de datos que se adapta a lo que necesitas, es rápida y puede manejar mucha información. Para aprovecharla al máximo, es importante seguir algunos consejos básicos.

Aquí tienes un resumen de lo más importante:

- Escoge bien la **clave de partición** para que tus datos se repartan de manera uniforme. Si es necesario, combina varios atributos.
- Las **claves de ordenamiento** te ayudan a buscar datos más rápido dentro de una misma área. Úsalas cuando te convenga.
- Los **índices secundarios (globales y locales)** te permiten buscar tus datos de diferentes maneras. Ajusta lo que copian para usar menos recursos.
- Comienza con ajustes de **capacidad que se pueden cambiar** según lo que necesites y revisa cómo va todo para ajustar la capacidad.
- **Cifra** tus datos importantes tanto cuando están guardados como cuando se mueven. Usa IAM para un control más detallado de quién puede hacer qué.
- **Vigila** cómo van las cosas con las herramientas de CloudWatch y los informes en la consola de DynamoDB para identificar y solucionar problemas a tiempo.

Siguiendo estos consejos, podrás crear aplicaciones eficientes, seguras y que puedan crecer con DynamoDB.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué tipo de base de datos es Amazon DynamoDB? {id="%C2%BFqu%C3%A9-tipo-de-base-de-datos-es-amazon-dynamodb%3F"}

Amazon DynamoDB es una base de datos NoSQL. Esto significa que guarda datos de una manera que no sigue el formato tradicional de filas y columnas. Es muy buena para aplicaciones que necesitan trabajar muy rápido y con mucha información.

### ¿Cuándo usar DynamoDB? {id="%C2%BFcu%C3%A1ndo-usar-dynamodb%3F"}

DynamoDB es ideal para aplicaciones que necesitan leer y escribir datos muy rápido y que pueden crecer mucho sin problemas. Funciona muy bien para proyectos que tienen usuarios en diferentes partes del mundo.

### ¿Qué es una clave principal en Amazon DynamoDB? {id="%C2%BFqu%C3%A9-es-una-clave-principal-en-amazon-dynamodb%3F"}

La clave principal en DynamoDB es lo que identifica de manera única cada elemento en una tabla. Puede ser una clave simple, que usa un solo atributo, o una clave compuesta, que usa dos atributos. Esto es como decir que cada elemento tiene su propia etiqueta única.

## Related posts

- [Mejores Prácticas Para Amazon S3](/blog/mejores-practicas-para-amazon-s3/)
- [Amazon DynamoDB: Guía Básica](/blog/amazon-dynamodb-guia-basica/)
- [Amazon DynamoDB: La Base de Datos NoSQL de AWS](/blog/amazon-dynamodb-la-base-de-datos-nosql-de-aws/)
- [Mejores Prácticas Para Amazon EC2](/blog/mejores-practicas-para-amazon-ec2/)
