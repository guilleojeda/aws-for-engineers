+++
url = "/blog/como-utilizar-elasticsearch-en-aws/"
title = "Cómo Utilizar ElasticSearch en AWS"
description = "Descubre cómo utilizar ElasticSearch en AWS, desde la creación de un dominio hasta la integración con AWS Glue y OpenSearch. Aprende sobre la configuración, seguridad, monitoreo y solución de problemas."
date = "2024-03-08T13:19:46.730000+00:00"
lastmod = "2024-03-17"
image = "/assets/blog/17fe006845acd8b3930b23c8a0d2510527ae51a3b57684d034aaa5ffed09292c.jpg"
archive_order = 162

[[related]]
title = "AWS Organizations: Estructuras de cuentas y nombres"
url = "/blog/aws-organizations-estructuras-de-cuentas-y-nombres/"
image = "/assets/blog/0bc804415b6cb6339123371f7d156fd8cc60f8d7e9353cba549af2281b6c72e6.jpg"

[[related]]
title = "Recursos Personalizados en CloudFormation con Lambda"
url = "/blog/recursos-personalizados-en-cloudformation-con-lambda/"
image = "/assets/blog/e66856987698eaa908dfab803a5bd604593d440bd701b71d3f347b7d5aa9217f.jpg"

[[related]]
title = "Bases de datos Relacionales en AWS con Amazon RDS y Amazon Aurora"
url = "/blog/bases-de-datos-relacionales-en-aws-con-amazon-rds-y-amazon-aurora/"
image = "/assets/blog/a57ee6c77803a35c0e96c33231ff3b308720014e154126a8fb15f28eb9372e56.jpg"
+++

Si estás interesado en **cómo utilizar Elasticsearch en AWS**, has llegado al lugar correcto. A continuación, te presentamos los puntos clave para sacarle el máximo partido a esta poderosa herramienta de búsqueda y análisis en la nube:

- **Ventajas de usar AWS para Elasticsearch:** Flexibilidad para ajustar recursos, alta disponibilidad, y fácil integración con otros servicios AWS.
- **Requisitos previos:** Conocimientos en AWS, Elasticsearch, y herramientas como AWS CLI y cliente REST.
- **Creación de un Dominio Elasticsearch en AWS:** Pasos para configurar tu dominio utilizando el servicio Amazon Elasticsearch Service (Amazon ES) o una instalación autogestionada.
- **Configuración de Seguridad:** Importancia de la red, control de acceso y cifrado para proteger tu dominio.
- **Despliegue y Configuración con soluciones preconfiguradas:** Observabilidad, Enterprise Search y seguridad.
- **Integración con AWS Glue y** [**OpenSearch**](https://opensearch.org/)**:** Cómo suscribirse y configurar el conector AWS Glue para OpenSearch.
- **Monitorización y Gestión con Kibana:** Acceso, ingesta de datos, y personalización de paneles.
- **Solución de problemas:** Consejos para resolver problemas de conectividad y rendimiento del clúster.

En resumen, combinar Elasticsearch con AWS ofrece una solución robusta y flexible para manejar grandes volúmenes de datos, simplificando el análisis y la búsqueda de información. ¡Exploraremos cada uno de estos puntos a continuación!

### Conocimientos técnicos {id="conocimientos-t%C3%A9cnicos"}

- Saber cómo funciona AWS. Es clave conocer cosas como EC2 (un tipo de servidor), VPC (una red privada en AWS), IAM (manejo de identidades y accesos), entre otros.
- Entender lo básico de Elasticsearch. Conocer qué es un clúster (un conjunto de nodos trabajando juntos), un nodo (un servidor individual en el clúster), un índice (donde se guardan los datos) y los tipos de datos.
- Tener experiencia manejando datos, redes y seguridad.

### Herramientas y software {id="herramientas-y-software"}

- Una cuenta en AWS. Necesitas registrarte para poder usar los servicios de AWS.
- La consola de administración de AWS. Aquí puedes lanzar y manejar servicios.
- AWS CLI (opcional). Una herramienta para controlar AWS desde la línea de comandos.
- Cliente REST (opcional). Útil para hacer llamadas a los servicios de AWS usando APIs.

### Conceptos básicos de Elasticsearch {id="conceptos-b%C3%A1sicos-de-elasticsearch"}

Antes de meterte de lleno con Elasticsearch en AWS, es buena idea entender:

- Qué es un clúster de Elasticsearch y cómo se unen los nodos para trabajar.
- Cómo crear índices para organizar y guardar tus datos.
- Los diferentes tipos de datos en Elasticsearch, como texto, números, datos geoespaciales, etc.
- Las configuraciones básicas para nodos y clústeres.

Entender estos puntos te ayudará a sacarle el máximo provecho a Elasticsearch en AWS.

## Creación de un Dominio ElasticSearch en AWS {id="creaci%C3%B3n-de-un-dominio-elasticsearch-en-aws"}

Para poner en marcha un dominio de Elasticsearch en AWS, vamos a seguir unos pasos sencillos:

### Elegir tipo de despliegue {id="elegir-tipo-de-despliegue"}

Tenemos dos caminos principales para usar Elasticsearch en AWS:

- **Amazon Elasticsearch Service (Amazon ES):** Es un servicio que AWS maneja por ti. Se encarga de todo el trabajo pesado como configurar, mantener y escalar tus clústeres de Elasticsearch. Es la opción más sencilla si no quieres complicarte.
- **Self-managed Elasticsearch:** Aquí, tú instalas y gestionas Elasticsearch en servidores EC2. Esta opción te da más control, pero implica más trabajo de tu parte.

Vamos a usar Amazon ES en este ejemplo, porque simplifica mucho las cosas y AWS se ocupa de la gestión.

### Especificar detalles del dominio {id="especificar-detalles-del-dominio"}

En la consola de Amazon ES, llenamos algunos datos para crear nuestro dominio:

- **Nombre del dominio:** es cómo llamarás a tu clúster.
- **Versión de Elasticsearch:** escogemos la versión que queremos usar. Lo mejor es ir por la última versión estable.
- **Tipo y número de instancias:** decidimos qué tipo de servidor usar y cuántos necesitamos.
- **Almacenamiento:** definimos cuánto espacio en disco y qué tipo de almacenamiento queremos.
- **Red VPC:** seleccionamos la red privada virtual de Amazon (VPC) y las subnets para el clúster.
- **Grupos de seguridad:** estos grupos nos ayudan a controlar quién puede acceder a nuestro clúster.
- **Políticas de acceso:** aquí decidimos quién o qué IPs tienen permiso para conectarse al clúster.

Un ejemplo de cómo quedaría sería:

- Nombre de dominio: `elasticsearch-demo`
- Versión ES: `7.10`
- 3 instancias `m5.large.elasticsearch`
- 20GB de almacenamiento EBS por instancia
- VPC predeterminada
- Grupo de seguridad que limita acceso solo por HTTPS
- Política de acceso basada en IP

### Revisar y lanzar {id="revisar-y-lanzar"}

Antes de darle al botón de lanzar, nos aseguramos de que todo esté correcto. Después, lanzamos el dominio. Esto puede tardar unos 10 minutos en estar listo.

Cuando esté listo, ya podemos empezar a meter datos y a usar herramientas como Kibana para buscar, analizar y visualizar nuestra información.

## Configuración de Seguridad {id="configuraci%C3%B3n-de-seguridad"}

La seguridad es super importante para mantener tus datos a salvo y controlar quién puede entrar a tu dominio de Elasticsearch. Vamos a ver los puntos clave para configurarla bien:

### Configuraciones de Red {id="configuraciones-de-red"}

Tienes que decidir si tu dominio será accesible desde el internet o solo desde una Amazon Virtual Private Cloud (VPC).

- Internet: Cualquiera puede intentar acceder. Es importante protegerlo con reglas de quién puede entrar.
- VPC: Es más seguro porque solo la gente dentro de tu red privada puede entrar. Esta es la opción más recomendada.

Si usas VPC, asegúrate de configurar bien quién tiene permiso para acceder.

### Control de acceso {id="control-de-acceso"}

Aquí decides quién puede hacer qué dentro de tu dominio. Es buena idea activar el control por roles.

Puedes elegir un usuario principal de dos maneras:

- Usuario principal en IAM: Tus solicitudes necesitan una firma especial de AWS. Si borras tu dominio, no pierdes a este usuario.
- Usuario principal en la base de datos interna: Usa un nombre de usuario y contraseña. Si borras el dominio, se borra este usuario también.

Para entrar a Kibana, puedes usar Amazon Cognito, que es un sistema de inicio de sesión seguro.

### Cifrado {id="cifrado"}

Es buena idea activar el cifrado:

- Cifrado en tránsito con HTTPS para que los datos que se mueven estén protegidos.
- Cifrado en reposo usando AWS Key Management Service (KMS) para proteger los datos guardados.

### Políticas de acceso {id="pol%C3%ADticas-de-acceso"}

Pon reglas estrictas sobre quién puede acceder a tu dominio. Puedes limitarlo a ciertas direcciones de internet.

Puedes crear una política que especifique exactamente quién tiene permiso para entrar.

## Despliegue y Configuración {id="despliegue-y-configuraci%C3%B3n"}

### Opciones preconfiguradas {id="opciones-preconfiguradas"}

Elastic Cloud te ofrece soluciones listas para usar que te ayudan a organizar y entender mejor tus datos en AWS.

#### Elastic Observability {id="elastic-observability"}

- Esta herramienta te ayuda a juntar y entender todos los datos de tu sistema, como registros de actividad y estadísticas, para que puedas detectar y solucionar problemas rápidamente.
- Es como tener una visión completa de cómo funciona tu sistema para asegurarte de que todo marche bien.

#### Elastic Enterprise Search {id="elastic-enterprise-search"}

- Elastic App Search: Te ofrece herramientas para crear búsquedas en tus sitios web y aplicaciones móviles.
- Elastic Workplace Search: Te permite buscar fácilmente información en tus herramientas de trabajo y colaboración.

#### Elastic Security {id="elastic-security"}

- Es una herramienta gratuita que te ayuda a proteger tu sistema contra amenazas, permitiéndote ver y analizar posibles problemas de seguridad.
- Tiene una interfaz fácil de usar y se integra con otras herramientas para que los analistas puedan trabajar mejor.

### Personalización {id="personalizaci%C3%B3n"}

Puedes ajustar estas soluciones a tus necesidades:

- Aumentar la memoria y capacidad cuando lo necesites.
- Mejorar la forma en que tu sistema maneja fallos.
- Añadir herramientas de aprendizaje automático.
- Elegir el tipo de hardware que mejor se adapte a tus necesidades, como sistemas más rápidos para datos recientes.

Es importante que adaptes la configuración a lo que tu proyecto requiera.

## Integración con AWS Glue y OpenSearch {id="integraci%C3%B3n-con-aws-glue-y-opensearch"}

### Suscribirse al conector {id="suscribirse-al-conector"}

Para usar AWS Glue con OpenSearch, lo primero es suscribirte al **AWS Glue Connector for Elasticsearch** en [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-v5ygernwn2gb6). Este conector hace que AWS Glue pueda hablar con OpenSearch para mover datos de un lado a otro.

Los pasos son simples:

- Ve a la página del producto en [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-v5ygernwn2gb6)
- Dale clic en "Continue to Subscribe"
- Acepta los términos y condiciones
- Dale clic en "Subscribe"

Una vez que te suscribes, puedes activar el conector en AWS Glue Studio.

### Habilitar conector y crear conexión {id="habilitar-conector-y-crear-conexi%C3%B3n"}

Para activar el AWS Glue Connector for Elasticsearch en AWS Glue Studio:

- Ve a AWS Glue Studio
- En el menú de la izquierda, busca "Connections"
- Dale clic en "Add connection"
- Elige "AWS Glue Connector for Elasticsearch"
- Llena los detalles de la conexión:
- Nombre de la conexión
- Dirección del clúster OpenSearch
- Puerto (normalmente es `443`)
- Credenciales para acceder
- Prueba la conexión y guárdala

Ahora puedes usar esta conexión para mover datos entre AWS Glue y OpenSearch.

### Configurar trabajo ETL {id="configurar-trabajo-etl"}

Para que AWS Glue pueda usar OpenSearch, necesitas un rol de IAM con permisos específicos.

Sigue estos pasos:

- Crea un rol de IAM
- Añade la política "AWSGlueServiceRole"
- Si necesitas permisos extra para OpenSearch, añádelos
- Usa este rol en tu trabajo de AWS Glue Studio

Con este rol listo, puedes crear trabajos de ETL (extraer, transformar, cargar) que usen la conexión a OpenSearch.

Algunos ejemplos de lo que puedes hacer son:

- Sacar datos de OpenSearch
- Cambiar o mejorar esos datos
- Volver a ponerlos en OpenSearch o guardarlos en Amazon S3

Así logras que AWS Glue y OpenSearch trabajen juntos perfectamente para tus tareas de ETL.

## Monitorización y Gestión con Kibana {id="monitorizaci%C3%B3n-y-gesti%C3%B3n-con-kibana"}

### Acceso a Kibana {id="acceso-a-kibana"}

Para entrar a Kibana, usa el nombre de usuario y contraseña del usuario 'elastic' que te dieron cuando armaste tu sistema de ElasticSearch. Estas son las llaves para entrar al sitio web de Kibana.

También, puedes ir directamente por la dirección web (URL) de Kibana que ves en la consola de Elastic Cloud. Al hacerlo, entrarás de manera automática con los permisos del usuario que creó todo.

Si quieres que otros entren, puedes crearles sus propias credenciales. Después, ellos pueden usar el enlace de Kibana, elegir "Iniciar sesión con ElasticSearch" y poner sus datos. Si eres el administrador, también puedes usar este método para entrar con todos los permisos.

### Ingesta de datos {id="ingesta-de-datos"}

Kibana te ayuda a recoger y analizar varios tipos de datos para ver cómo va tu sistema ElasticSearch. Puedes usar herramientas como:

- **Metricbeat:** Recolecta información del sistema, como el uso de CPU, memoria, y red.
- **Filebeat:** Sigue los archivos de registro que crean tus sistemas o aplicaciones, como los de Nginx o MySQL.
- **Functionbeat:** Te permite enviar datos personalizados usando una función Lambda de AWS, muy útil para datos específicos.

Estas herramientas mandan los datos a ElasticSearch para que los puedas revisar y analizar en Kibana.

### Panel y visualizaciones {id="panel-y-visualizaciones"}

En Kibana, puedes armar tableros a tu gusto con gráficos y visualizaciones para ver cómo está funcionando tu sistema ElasticSearch.

Puedes ver cosas como:

- Cuánto CPU usan tus nodos
- Qué tan rápido responden a las búsquedas
- Errores al guardar documentos
- Cuántos datos entran y salen
- Cuánto espacio tienes libre

Esto te ayuda a encontrar problemas, ver si hay mucha carga de trabajo en algún punto, o simplemente a estar al tanto de cómo va todo. También puedes poner alertas si algo pasa de ciertos límites.

Kibana también tiene opciones de aprendizaje automático para encontrar cosas raras en los datos que estás viendo.

## Solución de problemas {id="soluci%C3%B3n-de-problemas"}

### Problemas de conectividad {id="problemas-de-conectividad"}

Si tienes dificultades para conectarte a tu clúster de Elasticsearch, no te preocupes, es algo común. Aquí te dejamos algunas sugerencias para solucionarlo:

- **Checa tus reglas de seguridad:** Asegúrate de que permitan la entrada desde tu IP a los puertos necesarios, normalmente son el 9200 para HTTP y el 9300 para TCP.
- **Usuario y contraseña:** Verifica que estés usando las credenciales correctas. Si usas IAM, el usuario debe tener los permisos adecuados.
- **Estado del clúster:** En la consola de Amazon ES, mira si tu clúster y nodos están "verdes" y listos. Si ves colores amarillo o rojo, puede haber un problema.

Si después de esto sigues sin poder conectarte, el soporte de AWS puede ayudarte.

### Rendimiento del clúster {id="rendimiento-del-cl%C3%BAster"}

Si notas que tu clúster de Elasticsearch va lento, aquí tienes algunas ideas para mejorar:

- **Añade más nodos:** Esto reparte el trabajo y puede mejorar la velocidad.
- **Usa instancias más grandes:** Cambiar a una instancia con más potencia puede darle a tus nodos más capacidad de trabajo.
- **Mejora tus consultas:** Hazlas lo más sencillas posible para que sean más rápidas.
- **Más shards:** Tener más shards puede hacer que las operaciones se hagan más rápido.
- **Usa warmers:** Esto ayuda a que las consultas que haces a menudo sean más rápidas porque los datos ya están listos.

Amazon ES tiene una herramienta que ajusta automáticamente cosas como los shards para que tu clúster funcione mejor según tus necesidades. No olvides seguir las métricas de rendimiento para ver cómo van tus cambios.

## Conclusión {id="conclusi%C3%B3n"}

Usar Elasticsearch con AWS trae muchos beneficios. Nos permite armar sistemas para buscar y analizar datos que son poderosos y que podemos cambiar fácilmente según necesitemos, sin tener que meternos en problemas técnicos.

Aquí te dejamos un resumen de lo más importante que vimos:

- **Servicios como Amazon ES** nos hacen la vida más fácil al encargarse de lo más complicado, como configurar y mantener nuestro sistema.
- Es clave **entender lo básico** sobre Elasticsearch antes de empezar, para aprovecharlo al máximo.
- La **seguridad** es fundamental. Tenemos que cuidar cómo controlamos el acceso, cómo ciframos los datos y cómo usamos cosas como VPC para proteger nuestra información.
- Hay **opciones ya listas** como Elastic Observability y Elastic Security que nos ayudan a comenzar con buen pie.
- Podemos **ajustar** todo según lo que necesitemos, y AWS nos da las herramientas para hacerlo.
- Al usar Elasticsearch con otros servicios de AWS como **AWS Glue y** [**OpenSearch**](https://opensearch.org/), podemos hacer mucho más.
- **Kibana** es clave para ver cómo va nuestro sistema, entenderlo mejor e identificar problemas rápidamente.

En pocas palabras, combinar Elasticsearch con AWS es una excelente forma de crear soluciones de análisis de datos fuertes y que podemos cambiar cuando queramos, sin complicarnos la vida. ¡Anímate a probarlo!

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué se puede hacer con Elasticsearch? {id="%C2%BFqu%C3%A9-se-puede-hacer-con-elasticsearch%3F"}

Elasticsearch te permite buscar de muchas maneras, como por texto, por lugar o por números. Puedes hacer preguntas complicadas a tus datos y obtener respuestas rápidas. Aquí van algunos ejemplos:

- Buscar en páginas web y apps
- Analizar registros de actividad y números importantes
- Encontrar documentos en una empresa
- Ver datos al momento
- Buscar por lugar

Hay muchas posibilidades. Lo mejor es empezar con algo simple y explorar desde ahí.

### ¿Qué es el stack ELK? {id="%C2%BFqu%C3%A9-es-el-stack-elk%3F"}

La pila ELK son tres herramientas que trabajan juntas para manejar datos:

- **Elasticsearch:** Para buscar y analizar datos
- **Logstash:** Para recoger y procesar datos
- **Kibana:** Para ver los datos y entenderlos mejor

Son muy usadas para entender registros de actividad y números importantes.

### ¿Qué es Elastic Cloud? {id="%C2%BFqu%C3%A9-es-elastic-cloud%3F"}

Elastic Cloud es un servicio que te permite usar Elasticsearch y otras herramientas de Elastic fácilmente en la nube. Esto significa que es más sencillo de configurar, puede crecer según lo necesites, siempre está disponible, y está optimizado para trabajar en la nube. También se conecta bien con servicios de AWS.

Es una buena opción si quieres hacer las cosas de manera más sencilla.

### ¿Qué es Kibana y para qué sirve? {id="%C2%BFqu%C3%A9-es-kibana-y-para-qu%C3%A9-sirve%3F"}

Kibana es una herramienta que te ayuda a buscar, ver y entender tus datos en Elasticsearch. Con ella puedes:

- Crear tableros de control e informes
- Hacer búsquedas complicadas
- Hacer gráficos y visualizaciones a tu gusto
- Ver tendencias al momento
- Mantener un ojo en cómo funcionan tus sistemas y apps

Kibana te ayuda a sacarle provecho a tus datos en Elasticsearch, permitiéndote entenderlos y actuar rápido.

## Related posts

- [Nube AWS: Guía de Inicio Rápido](/blog/nube-aws-guia-de-inicio-rapido/)
- [Introducción a los servicios de Amazon Web Services](/blog/introduccion-a-los-servicios-de-amazon-web-services/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
