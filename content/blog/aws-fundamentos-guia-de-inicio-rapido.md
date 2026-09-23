+++
url = "/blog/aws-fundamentos-guia-de-inicio-rapido/"
title = "AWS Fundamentos: Guía de Inicio Rápido"
description = "Guía de inicio rápido para familiarizarse con los fundamentos de AWS, incluyendo servicios clave como Amazon EC2, Amazon S3, AWS Lambda, seguridad en la nube y más."
date = "2024-01-30T19:19:55.184000+00:00"
lastmod = "2024-03-31"
image = "/assets/blog/945b48235c5e1f4c1d3cc3aefd554da5664ef56d0c3b0d0288690dbcf3fb6db9.jpg"
archive_order = 176

[[related]]
title = "AWS Organizations: Estructuras de cuentas y nombres"
url = "/blog/aws-organizations-estructuras-de-cuentas-y-nombres/"
image = "/assets/blog/0bc804415b6cb6339123371f7d156fd8cc60f8d7e9353cba549af2281b6c72e6.jpg"

[[related]]
title = "Cómo monitorear SLOs con Amazon CloudWatch"
url = "/blog/como-monitorear-slos-con-amazon-cloudwatch/"
image = "/assets/blog/0919cf4ddfe7647a0c71877c7f59533414be113f79cb3d9b0af08ce1cece1630.jpg"

[[related]]
title = "10 Prácticas Recomendadas para Integrar EUC en AWS"
url = "/blog/10-practicas-recomendadas-para-integrar-euc-en-aws/"
image = "/assets/blog/278a42e279f664f5331f81e784b3f4bb37b899b5714c042499e575cdd7c88109.jpg"
+++

Sin duda, todos estaríamos de acuerdo en que puede resultar intimidante adentrarse en el mundo de la computación en la nube de AWS por primera vez.

En esta guía encontrará información esencial para familiarizarse con los conceptos básicos de AWS, incluyendo cómo configurar una cuenta, comprender la facturación, explorar los servicios clave y mucho más.

Comenzando con una introducción a los fundamentos de AWS, luego explorando la configuración de una cuenta, conceptos de seguridad, y finalmente una revisión de servicios esenciales como **Amazon EC2** para computación en la nube, **Amazon S3** para almacenamiento, y **AWS Lambda** para computación sin servidor, esta guía le proporcionará los conocimientos necesarios para dar sus primeros pasos con AWS.

## Introducción a AWS Cloud Fundamentals {id="introducci%C3%B3n-a-aws-cloud-fundamentals"}

### ¿Qué es AWS Cloud Computing? {id="%C2%BFqu%C3%A9-es-aws-cloud-computing%3F"}

AWS (Amazon Web Services) es la plataforma líder de servicios en la nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otras funcionalidades para ayudar a las empresas a escalar y crecer. AWS permite a las empresas acceder a recursos informáticos, de almacenamiento y de bases de datos de forma flexible y escalable sin tener que invertir en infraestructuras costosas.

Con AWS, las empresas pueden comenzar con lo que necesitan y escalar a medida que crecen. AWS también permite innovar más rápido al reducir el tiempo dedicado a la gestión de la infraestructura. Algunos de los servicios esenciales de AWS incluyen [**Amazon EC2**](https://aws.amazon.com/es/ec2/) para computación en la nube, [**Amazon S3**](https://aws.amazon.com/es/s3/) para almacenamiento de objetos, [**AWS Lambda**](https://aws.amazon.com/es/lambda/) para computación serverless y [**Amazon DynamoDB**](https://aws.amazon.com/es/dynamodb/) para bases de datos NoSQL.

### Beneficios de la nube de AWS para nuevos usuarios {id="beneficios-de-la-nube-de-aws-para-nuevos-usuarios"}

La nube de AWS ofrece muchos beneficios, incluyendo:

- **Ahorro de costos:** Solo se paga por los recursos que se consumen, lo que permite optimizar los gastos.
- **Escalabilidad:** Se pueden aprovisionar más recursos cuando sea necesario para satisfacer demandas cambiantes.
- **Alta disponibilidad:** La infraestructura global de AWS garantiza que las aplicaciones siempre estén disponibles.
- **Innovación más rápida:** AWS permite a los desarrolladores experimentar e implementar nuevas ideas rápidamente.
- **Análisis de datos:** Servicios como Amazon Athena facilitan obtener insights de grandes conjuntos de datos.

En resumen, AWS permite a las empresas innovar más rápido, reducir costos, obtener insights de sus datos y expandirse a nivel global en minutos.

### Regiones y Zonas de Disponibilidad de AWS {id="regiones-y-zonas-de-disponibilidad-de-aws"}

Las [**Regiones de AWS**](https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/) son ubicaciones geográficas separadas que alojan los centros de datos de AWS. Cada región consta de múltiples zonas de disponibilidad aisladas que ayudan a lograr una alta disponibilidad y redundancia.

Al momento de crear recursos en AWS, es importante elegir la región más cercana para minimizar la latencia. También se recomienda distribuir recursos críticos entre múltiples zonas de disponibilidad para mayor resiliencia.

### Modelos de implementación en la nube de AWS {id="modelos-de-implementaci%C3%B3n-en-la-nube-de-aws"}

AWS ofrece tres modelos de implementación en la nube:

- **Nube pública:** Los recursos se alojan en la nube pública de AWS. Es el modelo más común.
- **Nube privada virtual:** Los recursos se alojan en una nube privada virtual aislada sobre la infraestructura de AWS.
- **Nube híbrida:** Combina recursos locales y en la nube pública de AWS. Permite mover cargas de trabajo entre entornos.

Estos modelos cubren diversos casos de uso, desde startups que utilizan solo la nube pública hasta grandes empresas con requisitos de aislamiento de datos.

### Tipos de servicios de AWS Cloud {id="tipos-de-servicios-de-aws-cloud"}

AWS ofrece una amplia gama de servicios agrupados en las siguientes categorías:

- **Infraestructura como servicio (IaaS):** Servicios de nivel inferior como EC2, VPC, almacenamiento, redes y bases de datos.
- **Plataforma como servicio (PaaS):** Entornos administrados para ejecutar aplicaciones sin gestionar infraestructura, como Lambda y Beanstalk.
- **Software como servicio (SaaS):** Software alojado y administrado por AWS, como DynamoDB y RDS.
- **Herramientas para desarrolladores:** SDKs, CLI, IDE Toolkits.
- **Analytics:** Servicios como EMR, Athena y QuickSight para analizar datos.
- **Seguridad y gobernanza:** Herramientas como IAM, Inspector y Macie.
- **IoT:** Servicios para aplicaciones de Internet de las cosas.

Con esta amplia gama de servicios, AWS permite crear soluciones para prácticamente cualquier caso de uso empresarial.

## ¿Qué es AWS y cómo funciona? {id="%C2%BFqu%C3%A9-es-aws-y-c%C3%B3mo-funciona%3F"}

AWS (Amazon Web Services) es la plataforma en la nube más completa y ampliamente adoptada del mundo. Ofrece más de 200 servicios escalables de computación, almacenamiento, bases de datos, análisis, machine learning, IoT y más.

### Características principales de AWS {id="caracter%C3%ADsticas-principales-de-aws"}

- **Infraestructura global**: AWS cuenta con zonas de disponibilidad y regiones en todo el mundo para brindar alta disponibilidad.
- **Amplio catálogo de servicios**: desde computación, almacenamiento y bases de datos hasta analytics, machine learning e IoT.
- **Flexibilidad**: paga solo por los recursos que usas sin compromisos a largo plazo.
- **Seguridad**: AWS cumple con los más altos estándares de seguridad y cumplimiento.
- **Escalabilidad**: los servicios de AWS se escalan automáticamente para adaptarse a la demanda.
- **Soporte técnico**: AWS brinda varios niveles de soporte para ayudarte con cualquier problema técnico.

En resumen, AWS es la nube más completa que te permite ejecutar prácticamente cualquier carga de trabajo de forma segura, escalable y con la flexibilidad de pagar solo por lo que usas. Esto la convierte en la opción preferida para empresas de todos los tamaños.

## ¿Qué lenguaje de programación usa AWS? {id="%C2%BFqu%C3%A9-lenguaje-de-programaci%C3%B3n-usa-aws%3F"}

AWS ofrece una amplia variedad de opciones de lenguajes de programación y herramientas para desarrollar aplicaciones en la nube. Algunos de los lenguajes de programación más populares que se pueden usar con los servicios de AWS incluyen:

- **Python**: Lenguaje muy popular y versátil para una amplia gama de casos de uso en AWS, incluyendo machine learning, análisis de datos, DevOps y web services. AWS ofrece el [SDK de Python (Boto3)](https://aws.amazon.com/es/sdk-for-python/) para interactuar con sus servicios.
- **JavaScript**: Lenguaje indispensable del desarrollo web moderno. Se integra perfectamente con servicios serverless de AWS como Lambda y API Gateway.
- **Java**: Lenguaje orientado a objetos muy utilizado en entornos empresariales. AWS ofrece el [SDK de Java](https://aws.amazon.com/es/sdk-for-java/) para construir aplicaciones escalables y de alto rendimiento.
- **C#**: Lenguaje popular para desarrollar aplicaciones .NET que se ejecutan en Windows. Se puede usar con servicios de AWS como EC2, S3 y DynamoDB.
- **Go**: Lenguaje concurrente y compilado creado por Google. Útil para servicios backend, DevOps y aplicaciones nativas de la nube.
- **Ruby**: Lenguaje dinámico utilizado a menudo para aplicaciones web y DevOps en AWS.

AWS también ofrece herramientas de desarrollo específicas para facilitar la creación de aplicaciones en la nube, como [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/es/cdk/) y [AWS Amplify](https://aws.amazon.com/es/amplify/).

En resumen, los desarrolladores tienen múltiples opciones de lenguajes de programación para elegir en AWS, con sólido soporte a través de SDK, herramientas y documentación para comenzar a construir aplicaciones en la nube rápidamente.

## ¿Cuáles son los modulos de AWS? {id="%C2%BFcu%C3%A1les-son-los-modulos-de-aws%3F"}

AWS ofrece una amplia gama de módulos y servicios en la nube para satisfacer las necesidades de computación de las empresas. Algunos de los módulos de AWS más utilizados son:

- **AWS Amplify**: permite crear y desplegar aplicaciones web y móviles escalables. Incluye herramientas como Amplify Console y Amplify UI Builder.
- **Amazon API Gateway**: facilita la creación, publicación, mantenimiento, monitoreo y protección de API a cualquier escala.
- **Amazon AppFlow**: servicio de transferencia de datos diseñado para mover datos de forma segura entre servicios de AWS y aplicaciones SaaS.
- **Application Auto Scaling**: permite configurar reglas para escalar automáticamente recursos de otros servicios de AWS.

Otros módulos populares son Amazon VPC para redes virtuales, AWS Lambda para computación serverless, Amazon S3 para almacenamiento de objetos, Amazon DynamoDB para bases de datos NoSQL, entre muchos otros.

AWS también agrupa sus servicios en categorías para facilitar la búsqueda: computación, almacenamiento, bases de datos, redes, desarrollo de aplicaciones, robots, blockchain e Internet de las Cosas (IoT).

Con esta amplia gama de módulos y categorías de servicios, AWS permite crear soluciones en la nube para prácticamente cualquier caso de uso. Los usuarios pueden combinar distintos servicios de AWS para crear aplicaciones escalables, flexibles y de alto rendimiento.

## ¿Cuáles son los servicios de AWS? {id="%C2%BFcu%C3%A1les-son-los-servicios-de-aws%3F"}

AWS ofrece una amplia gama de servicios en la nube que se pueden agrupar en las siguientes categorías:

### Computación {id="computaci%C3%B3n"}

Servicios para ejecutar aplicaciones y cargas de trabajo en la nube. Algunos ejemplos son:

- **Amazon EC2**: máquinas virtuales en la nube para ejecutar aplicaciones.
- **AWS Lambda**: ejecución de código sin servidor.
- **Amazon ECS**: orquestación de contenedores.

### Almacenamiento {id="almacenamiento"}

Servicios para almacenar cualquier tipo y volumen de datos en la nube. Por ejemplo:

- **Amazon S3**: almacenamiento de objetos altamente escalable.
- **Amazon EBS**: volúmenes de almacenamiento en bloque.
- **Amazon S3 Glacier**: almacenamiento de archivos a largo plazo.

### Base de datos {id="base-de-datos"}

Servicios de base de datos relacionales, clave-valor, en memoria y más:

- **Amazon RDS**: bases de datos relacionales como MySQL, PostgreSQL, SQL Server, etc.
- **Amazon DynamoDB**: base de datos NoSQL de alto rendimiento.
- **Amazon ElastiCache**: caché en memoria compatible con Redis y Memcached.

### Redes y entrega de contenido {id="redes-y-entrega-de-contenido"}

Servicios para entregar datos, videos y aplicaciones con alta disponibilidad. Por ejemplo:

- **Amazon VPC**: red en la nube aislada y configurable.
- **Amazon CloudFront**: red de entrega de contenido (CDN).
- **Amazon Route 53**: sistema de nombres de dominio (DNS).

### Análisis {id="an%C3%A1lisis"}

Servicios para obtener insights de grandes volúmenes de datos:

- **Amazon Athena**: consultas interactivas para datos en S3.
- **Amazon EMR**: procesamiento de datos a gran escala.
- **Amazon QuickSight**: generación de dashboards y visualizaciones.

### Machine Learning {id="machine-learning"}

Servicios para desarrollar sistemas de aprendizaje automático:

- **Amazon SageMaker**: plataforma para modelos de ML.
- **Amazon Comprehend**: procesamiento de lenguaje natural (NLP).
- **Amazon Rekognition**: reconocimiento de imágenes y video.

### Seguridad, identidad y cumplimiento {id="seguridad%2C-identidad-y-cumplimiento"}

Servicios para proteger aplicaciones, datos y usuarios:

- **AWS Identity and Access Management (IAM)**: control de accesos y permisos.
- **Amazon Inspector**: evaluaciones de seguridad y vulnerabilidades.
- **AWS Shield**: protección contra DDoS.
- **Amazon Macie**: descubrimiento y protección de datos sensibles.

## Configuración de una Cuenta AWS para Principiantes {id="configuraci%C3%B3n-de-una-cuenta-aws-para-principiantes"}

### Primeros pasos en la configuración de una cuenta AWS {id="primeros-pasos-en-la-configuraci%C3%B3n-de-una-cuenta-aws"}

Para comenzar a utilizar los servicios de AWS, lo primero que debes hacer es registrarte para obtener una cuenta de AWS. El proceso es sencillo y solo te tomará unos minutos.

Lo primero es ingresar a [aws.amazon.com](https://aws.amazon.com/) y hacer clic en "Create an AWS Account". Tendrás que proporcionar información personal básica como tu nombre, dirección de correo electrónico y número de teléfono. También deberás establecer una contraseña segura para tu cuenta.

Una vez enviada tu información, recibirás un correo electrónico de confirmación. Debes verificar tu dirección de correo haciendo clic en el enlace que se te envió. Esto confirma que eres dueño de esa dirección.

Después te pedirán que ingreses información de pago. Necesitarás agregar los detalles de una tarjeta de crédito válida. Ten en cuenta que esta información se utiliza solo para fines de verificación, no se realizará ningún cargo a menos que utilices los servicios de AWS.

Y listo, tu cuenta de AWS ya está activa y lista para usarse. Ahora puedes iniciar sesión en la consola de administración de AWS para comenzar a utilizar los servicios en la nube.

### Comprender la facturación y AWS Cost Management {id="comprender-la-facturaci%C3%B3n-y-aws-cost-management"}

Una vez que comiences a utilizar los servicios de AWS, es importante que entiendas cómo se gestiona la facturación y los costos.

AWS ofrece varias herramientas para realizar un seguimiento detallado del uso y los gastos. La herramienta principal es AWS Cost Explorer, que proporciona gráficos e informes para analizar tus costos y tendencias de uso.

También puedes establecer presupuestos para recibir alertas si tus gastos sobrepasan ciertos límites. Esto te ayuda a mantener el control sobre cuánto gastas en AWS cada mes.

Si eres nuevo en AWS, una buena práctica es revisar frecuentemente tu factura y uso de servicios durante los primeros meses. Esto te permite familiarizarte con cómo se acumulan los costos y te ayuda a optimizar tus gastos.

### Explorando el AWS Support Center {id="explorando-el-aws-support-center"}

AWS ofrece varios planes de soporte técnico para ayudarte con cualquier problema que puedas tener.

El plan básico se incluye sin costo adicional y proporciona acceso a documentación, guías de inicio rápido y foros de la comunidad.

Para soporte más avanzado, puedes suscribirte a los planes de soporte Developer, Business o Enterprise. Estos planes te asignan ingenieros de soporte técnico para ayudarte por teléfono, chat o correo electrónico.

El nivel de soporte se escala según tus necesidades. Si ejecutas aplicaciones críticas de negocio en AWS, te recomendamos considerar los planes avanzados de soporte técnico.

### Navegando por la Consola de Administración de AWS {id="navegando-por-la-consola-de-administraci%C3%B3n-de-aws"}

La consola de administración de AWS proporciona una interfaz centralizada para administrar tus servicios y recursos de AWS.

Desde la consola puedes lanzar instancias EC2, almacenar objetos en S3, administrar tus bases de datos y mucho más. Todo dentro de una interfaz web fácil de navegar.

La consola también proporciona vistas rápidas del estado de tus recursos, informes de facturación y herramientas para solucionar problemas.

Te recomendamos familiarizarte con la navegación básica de la consola y personalizarla para tus necesidades. Esto hará que administrar tus servicios en la nube sea más eficiente.

## Fundamentos de Seguridad en AWS {id="fundamentos-de-seguridad-en-aws"}

Esta sección introduce conceptos de seguridad clave como el modelo de responsabilidad compartida, IAM, Security Groups, cifrado y más.

### Comprendiendo el Modelo de Responsabilidad Compartida de AWS {id="comprendiendo-el-modelo-de-responsabilidad-compartida-de-aws"}

El modelo de responsabilidad compartida de AWS establece claramente quién es responsable de manejar la seguridad en la nube AWS. Según este modelo, AWS es responsable de proteger la infraestructura global que ejecuta toda la nube AWS. Esto incluye hardware, software, redes y facilidades que ejecutan los servicios de AWS.

Los clientes de AWS son responsables de manejar la seguridad en la nube, lo que incluye los servicios y cargas de trabajo que corren en AWS. Esto abarca tanto configuraciones de seguridad como actualizaciones de software, firewalls, cifrado de datos y más.

Trabajando juntos, AWS y el cliente logran defensa en profundidad aplicando capas de protección alrededor de aplicaciones y datos en la nube. Comprender las responsabilidades de cada parte es clave para diseñar arquitecturas seguras en AWS.

### Introducción a AWS Identity and Access Management (IAM) {id="introducci%C3%B3n-a-aws-identity-and-access-management-(iam)"}

AWS IAM permite controlar quién está **autenticado** (inició sesión) y **autorizado** (tiene permisos) para usar recursos en una cuenta de AWS. Con IAM se pueden crear y administrar usuarios, grupos de usuarios, roles, políticas de seguridad y más.

Algunos conceptos clave de IAM incluyen:

- **Usuarios**: cuentas individuales asignadas a una persona o aplicación que necesita acceso a AWS.
- **Grupos**: colecciones de usuarios bajo un conjunto de permisos. Facilita la administración de permisos.
- **Roles**: cuentas con permisos temporales que pueden ser asumidas por usuarios, servicios o recursos de AWS. Útil para casos de uso específicos sin credenciales permanentes.
- **Políticas**: documentos JSON que definen permisos de acceso a recursos y API de AWS. Pueden asociarse a usuarios, grupos y roles.

Con estas características, IAM permite aplicar el principio de privilegios mínimos y mejorar la seguridad general de una cuenta de AWS.

### Fundamentos de Security Groups en Amazon EC2 {id="fundamentos-de-security-groups-en-amazon-ec2"}

Los Security Groups de Amazon EC2 funcionan como un firewall virtual para definir reglas de tráfico entrante y saliente de instancias EC2.

Cada Security Group puede contener múltiples reglas de tráfico que especifican protocolos, puertos y direcciones IP de origen/destino. Esto permite exponer aplicaciones de forma segura al tráfico necesario e impedir todo lo demás.

Algunos puntos clave de Security Groups:

- Son **statefull**: el tráfico de respuesta está permitido automáticamente.
- Soportan **allow rules** solamente, no deny rules.
- Se aplican a nivel de **instancia EC2**.
- Una instancia puede tener múltiples Security Groups.
- Los Security Groups de diferentes cuentas pueden referenciarse entre sí.

En general, los Security Groups son esenciales para aumentar la seguridad de aplicaciones y servicios en EC2.

### Estrategias de Cifrado de Datos en AWS {id="estrategias-de-cifrado-de-datos-en-aws"}

Para proteger la confidencialidad de datos y cumplir requerimientos regulatorios, AWS ofrece múltiples opciones de cifrado:

- **Cifrado en tránsito**: HTTPS, SSL/TLS y VPNs protegen datos cuando se mueven entre servicios. AWS maneja el cifrado de forma transparente.
- **Cifrado en reposo**: servicios como S3, EBS y RDS permiten cifrar datos almacenados. AWS maneja las claves o permite claves administradas por el cliente.
- **Cifrado del lado del cliente**: datos se cifran por el cliente antes de llegar a AWS. Útil cuando se requiere control exclusivo de claves.
- **Cifrado de objetos**: disponible en S3 y Glacier para cifrar objetos enteros con claves administradas o proveídas.

Entendiendo estas opciones, los clientes pueden elegir la estrategia adecuada según requerimientos de seguridad y cumplimiento. La flexibilidad de AWS facilita el cifrado robusto de datos sensibles.

### Auditoría con AWS CloudTrail {id="auditor%C3%ADa-con-aws-cloudtrail"}

AWS CloudTrail permite auditar llamadas a la API de servicios de AWS para una cuenta. CloudTrail registra información como la identidad del usuario, fecha/hora de la llamada, parámetros de la solicitud y respuesta del servicio.

Estos registros de CloudTrail se almacenan en buckets de S3 para su análisis posterior. Esto permite auditoría, investigación forense, detección de amenazas, monitoreo de cumplimiento y gobernanza.

Algunas características de CloudTrail:

- Auditoría de **llamadas a la API de servicios de AWS**.
- Opciones para crear **trails a nivel de cuenta o multi-cuenta**.
- Integración con **CloudWatch Logs** para monitoreo y alertas en tiempo real.
- Compatible con **validación de integridad de registros** para detectar manipulación.

En resumen, CloudTrail es esencial para habilitar visibilidad sobre la actividad de una cuenta AWS y auditar uso de servicios.

## Explorando los Servicios Esenciales de AWS para nuevos usuarios {id="explorando-los-servicios-esenciales-de-aws-para-nuevos-usuarios"}

Esta sección presenta algunos de los servicios más populares y utilizados de AWS que todo usuario nuevo debe conocer.

### Computación en la nube con Amazon EC2 {id="computaci%C3%B3n-en-la-nube-con-amazon-ec2"}

EC2 provee capacidad de cómputo escalable para ejecutar aplicaciones en la nube de AWS. Con EC2 puedes lanzar instancias de servidor virtuales configurables en minutos. EC2 ofrece tipos de instancias optimizadas para casos de uso específicos como procesamiento optimizado, memoria optimizada, almacenamiento optimizado, entre otros.

Algunos puntos clave sobre EC2:

- Permite escalar la capacidad hacia arriba y hacia abajo según se necesite.
- Ofrece opciones de instancias tanto Windows como Linux.
- Permite crear Auto Scaling Groups para escalar automáticamente.
- Soporta configuraciones de alta disponibilidad.
- Permite personalizar instancias a nivel de hardware virtual.

EC2 es un servicio muy versátil para cargas de trabajo en la nube como sitios web, aplicaciones móviles, análisis de big data, entre muchos otros.

### Almacenamiento en la nube con Amazon S3 {id="almacenamiento-en-la-nube-con-amazon-s3"}

S3 permite almacenar y recuperar cualquier cantidad de datos, en cualquier momento y desde cualquier lugar. Es un servicio de almacenamiento de objetos altamente escalable y con alta durabilidad y disponibilidad.

Características principales de S3:

- Permite almacenar desde KB hasta PB de datos.
- Ofrece acceso mediante API RESTful.
- Permite establecer políticas detalladas de control de acceso.
- Es económico y no tiene cargos mínimos ni costos por solicitud.
- Replica datos entre múltiples centros de datos por defecto.

S3 se utiliza para una gran variedad de casos de uso como backups, big data analytics, hosting de sitios web estáticos, archivado de datos, IoT devices, entre otros.

### Redes y aislamiento con Amazon VPC {id="redes-y-aislamiento-con-amazon-vpc"}

Amazon VPC permite aislar recursos de AWS en una red virtual definida por el usuario. Con Amazon VPC puedes controlar aspectos como direccionamiento IP, subnets, tablas de ruteo, gateways, entre otros.

Algunos puntos clave sobre VPC:

- Permite crear una red virtual en la nube similar a una red tradicional.
- Brinda control total sobre el entorno de red virtual.
- Permite conectar la VPC a redes on-premise.
- Ofrece opciones de seguridad como security groups y network ACLs.
- Permite crear subnets públicas y privadas.

VPC es ideal para crear entornos de red aislados y personalizados para aplicaciones en AWS.

### Computación sin servidor con AWS Lambda {id="computaci%C3%B3n-sin-servidor-con-aws-lambda"}

Lambda permite ejecutar código sin aprovisionar ni administrar servidores, pagando solo por el tiempo de cómputo consumido. Lambda ejecuta el código en respuesta a eventos como cambios en S3, DynamoDB, invocaciones HTTP, entre otros.

Aspectos importantes de Lambda:

- Permite enfocarse solo en el código sin administrar infraestructura.
- Ejecuta el código en contenedores efímeros altamente escalables.
- Integración nativa con otros servicios de AWS.
- Precios basados en consumo por solicitudes y duración de ejecución.

Lambda habilita arquitecturas serverless para una gran variedad de aplicaciones modernas.

### Gestión de bases de datos con Amazon DynamoDB {id="gesti%C3%B3n-de-bases-de-datos-con-amazon-dynamodb"}

DynamoDB es una base de datos NoSQL rápida y flexible para aplicaciones modernas. DynamoDB ofrece rendimiento en milisegundos de un solo dígito a cualquier escala, es altamente duradera y no requiere administración.

Algunas características notables de DynamoDB:

- Totalmente administrado, no requiere configuración ni administración.
- Altamente escalable y durable.
- Modelo de datos flexible de pares clave-valor.
- Precios basados en consumo de capacidad aprovisionada o a demanda.
- Replicación entre regiones incluida por defecto.

DynamoDB es ideal para aplicaciones móviles, web, juegos, IoT, entre otros que requieren latencias ultra bajas y escalabilidad.

## Recursos y Soporte Adicionales para Usuarios de AWS {id="recursos-y-soporte-adicionales-para-usuarios-de-aws"}

Esta última sección proporciona recursos para continuar aprendiendo sobre AWS después de dominar los conceptos básicos.

### Accediendo a la Documentación Técnica de AWS {id="accediendo-a-la-documentaci%C3%B3n-t%C3%A9cnica-de-aws"}

La documentación técnica de AWS cubre cada **servicio** en profundidad. Es el recurso definitivo para usuarios de AWS que buscan entender a fondo las capacidades y funcionalidades de la plataforma.

La documentación incluye:

- Descripciones detalladas de cada servicio
- Guías paso a paso para comenzar a usar los servicios
- Ejemplos de código y plantillas de **AWS CloudFormation**
- Prácticas recomendadas y consideraciones de diseño
- Preguntas frecuentes y soluciones de problemas técnicos

Se recomienda revisar la documentación de los servicios de **AWS fundamentos** que más te interesen, como Amazon EC2, Amazon S3, Amazon VPC, entre otros.

### Capacitación y Certificación en AWS {id="capacitaci%C3%B3n-y-certificaci%C3%B3n-en-aws"}

AWS ofrece cursos oficiales en línea, bootcamps y **certificaciones** para validar habilidades técnicas en la nube.

Algunas opciones recomendadas para nuevos usuarios son:

- **AWS Cloud Practitioner Essentials**: Curso gratuito en línea de fundamentos técnicos y comerciales de AWS
- **Certificación AWS Certified Cloud Practitioner**: Certificación de nivel inicial que valida conocimientos en AWS
- **AWS re/Start**: Programa de capacitación gratuito en habilidades técnicas de AWS orientado a carreras en la nube

### Obtener Ayuda a través del Soporte Técnico de AWS {id="obtener-ayuda-a-trav%C3%A9s-del-soporte-t%C3%A9cnico-de-aws"}

Si tienes preguntas o necesitas ayuda técnica con AWS, hay varios planes de **soporte** disponibles para ti, incluyendo:

- **Soporte Básico**: Incluido sin costo extra para todos los usuarios de AWS
- **Soporte Desarrollador**: Orientado a necesidades de desarrolladores
- **Soporte Empresarial**: Para empresas que requieren soporte técnico avanzado

Puedes abrir casos de soporte directamente desde la **Consola de Administración de AWS** o el centro de **AWS Support**.

### Conectarse con la Comunidad de AWS {id="conectarse-con-la-comunidad-de-aws"}

Únete a los foros de la comunidad y otros grupos en línea para conectarte con otros usuarios de AWS, hacer preguntas y compartir conocimientos.

Algunas opciones populares son:

- **AWS Foros de Discusión**
- **AWS Subreddit**
- **Grupos de AWS en LinkedIn**
- **AWS Meetups**

### Recursos Adicionales de Aprendizaje en AWS {id="recursos-adicionales-de-aprendizaje-en-aws"}

Revisa más blogs, podcasts, videos y más para continuar tu viaje de aprendizaje sobre AWS y la nube:

- **AWS Blog**: Noticias e historias de clientes
- **AWS Podcast**: Entrevistas y discusiones técnicas
- **AWS Online Tech Talks**: Webinars y sesiones en vivo
- **AWS Training**: Cursos en video y laboratorios prácticos

¡Sigue explorando y creciendo tus habilidades en la nube con AWS!

## Related posts

- [Guía Básica para Certificaciones de AWS](/blog/aws-curso-certificado-guia-basica/)
- [AWS Seguridad: Fundamentos Esenciales](/blog/aws-seguridad-fundamentos-esenciales/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Introducción a los servicios de Amazon Web Services](/blog/introduccion-a-los-servicios-de-amazon-web-services/)
