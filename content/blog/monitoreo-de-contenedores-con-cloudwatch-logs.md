+++
url = "/blog/monitoreo-de-contenedores-con-cloudwatch-logs/"
title = "Monitoreo de contenedores con CloudWatch Logs"
description = "Aprende a monitorizar contenedores con CloudWatch Logs, centralizando registros y mejorando la seguridad en entornos contenerizados."
date = "2025-06-02T08:56:16.722000+00:00"
lastmod = "2025-09-01"
image = "/assets/blog/2b59cebb297e58db709a33a56296f6a53f0abf8859da795afb86aeb5db23876a.jpg"
archive_order = 5

[[related]]
title = "7 Estrategias para Reducir Costos en AWS Fargate"
url = "/blog/7-estrategias-para-reducir-costos-en-aws-fargate/"
image = "/assets/blog/9d9e21deaf95138036c3d24dc3c8647837d172d5ba0183e8fedfebcba34c05c9.jpg"

[[related]]
title = "Recursos Compartidos en Arquitecturas Serverless Multi-Tenant"
url = "/blog/recursos-compartidos-en-arquitecturas-serverless-multi-tenant/"
image = "/assets/blog/b4ce26c384455c6314d61ac367481aafc8b30b2fcb9ad8cd4a1fc43d369578d4.jpg"

[[related]]
title = "AWS Seguridad: Fundamentos Esenciales"
url = "/blog/aws-seguridad-fundamentos-esenciales/"
image = "/assets/blog/15bc5fcf943d474b0b00277c19be81ea512d6d43ff10202c77ea749b84038659.jpg"
+++

**[Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) Logs** es una herramienta clave para monitorizar contenedores. Permite centralizar registros, analizar métricas en tiempo real y responder rápidamente a problemas. Aquí tienes un resumen rápido de lo que ofrece:

- **Retos del monitoreo de contenedores**:
  - Ciclos de vida cortos y entornos dinámicos.
  - [Uso compartido de recursos](/blog/recursos-compartidos-en-arquitecturas-serverless-multi-tenant/) que puede generar conflictos.
  - Necesidad de herramientas específicas para [arquitecturas de microservicios](/blog/arquitectura-en-la-nube-tendencias-emergentes/).
- **Funciones principales de CloudWatch Logs**:
  - Centralización de registros en grupos y flujos.
  - Métricas en tiempo real (actualización cada segundo).
  - **Container Insights**: Métricas clave como CPU, memoria y red.
  - Consultas avanzadas con **Logs Insights**.
  - Conservación de datos hasta 15 meses.
- **Configuración básica**:
  - Crear grupos de logs y definir permisos IAM.
  - Habilitar el registro en tareas ECS/EKS con el driver `awslogs`.
  - Opciones de [cifrado con claves KMS](/blog/cifrado-de-datos-con-aws-kms-guia-practica/) para mayor seguridad.
- **Seguridad y cumplimiento**:
  - Análisis de logs para detectar amenazas.
  - Configuración de alertas y retención de datos según normativas.
  - Integración con servicios como [AWS Security Hub](https://aws.amazon.com/security-hub/) y GuardDuty.

CloudWatch Logs no solo facilita el monitoreo, sino que también mejora la seguridad y optimiza el uso de recursos en entornos contenerizados. Es una solución imprescindible para arquitecturas modernas en la nube.

## Configuración de CloudWatch Logs para contenedores {id="configuracion-de-cloudwatch-logs-para-contenedores"}

Configurar CloudWatch Logs para contenedores implica varios pasos clave: crear grupos de logs, establecer permisos IAM y habilitar el registro en las definiciones de tareas. Este enfoque asegura que los registros de las aplicaciones basadas en contenedores se recopilen de forma centralizada y eficiente.

### Creación de grupos y flujos de logs {id="creacion-de-grupos-y-flujos-de-logs"}

Los **grupos de logs** son estructuras organizativas que agrupan flujos de logs con configuraciones comunes, como políticas de retención o controles de acceso. Por otro lado, cada **flujo de logs** representa una secuencia de eventos provenientes de una misma fuente, como un contenedor o una aplicación específica.

Para crear un grupo de logs manualmente, sigue estos pasos en la consola de CloudWatch:

- Ve a la sección **Grupos de logs**.
- Haz clic en **Acciones** y selecciona **Crear grupo de logs**.
- Asigna un nombre descriptivo que cumpla con las reglas de CloudWatch Logs. Recuerda que los nombres no pueden comenzar con `aws/`, ya que este prefijo está reservado para servicios de AWS.

CloudWatch Logs no limita el número de flujos por grupo, lo que permite gestionar arquitecturas complejas con flexibilidad. Además, algunos servicios crean grupos de logs automáticamente. Por ejemplo:

- **Container Insights** genera un grupo de logs para eventos de rendimiento sin necesidad de intervención manual.
- **[AWS Lambda](https://aws.amazon.com/lambda/)** crea un grupo de logs con el formato `/aws/lambda/<nombre-función>` al ejecutarse por primera vez.

### Configuración de roles y políticas IAM {id="configuracion-de-roles-y-politicas-iam"}

Para que los contenedores puedan enviar logs a CloudWatch Logs de forma segura, es fundamental configurar roles y políticas IAM adecuadas. Esto incluye permisos específicos que habiliten la creación de grupos y flujos de logs, así como el envío de eventos. A continuación, se detallan los permisos esenciales:

| Acción | ARN del recurso | Descripción |
| --- | --- | --- |
| `logs:CreateLogGroup` | `arn:aws:logs:region:account-id:log-group:*` | Permite crear grupos de logs en CloudWatch Logs. |
| `logs:CreateLogStream` | `arn:aws:logs:region:account-id:log-group:log-group-name:*` | Permite crear flujos de logs dentro de un grupo específico. |
| `logs:PutLogEvents` | `arn:aws:logs:region:account-id:log-group:log-group-name:log-stream:*` | Permite enviar eventos de log a un flujo. |
| `logs:DescribeLogStreams` | `arn:aws:logs:region:account-id:log-group:log-group-name:*` | Permite describir flujos dentro de un grupo de logs. |

Es importante aplicar el principio de **menor privilegio**, especificando ARNs concretos en lugar de comodines para limitar el alcance. En ECS, se recomienda usar roles IAM de tarea en lugar de depender del rol de la instancia del contenedor, ya que esto proporciona mayor granularidad en los permisos.

> "Cuando crees tu rol IAM de tarea, se recomienda que uses las claves de condición `aws:SourceAccount` o `aws:SourceArn` en la política de relación de confianza asociada con el rol para delimitar los permisos y prevenir el problema de seguridad del confused deputy." – Amazon ECS Documentation

En EKS, el uso de IRSA (Asignación de Roles IAM para Cuentas de Servicio) permite asignar permisos específicos a pods individuales, evitando la necesidad de compartir credenciales entre contenedores, lo que mejora la seguridad.

### Activación del logging en definiciones de tareas ECS/EKS {id="activacion-del-logging-en-definiciones-de-tareas-ecseks"}

El driver `awslogs` facilita la integración de logs de contenedores con CloudWatch Logs. En ECS, esto se configura a través del parámetro `logConfiguration` en las definiciones de tareas. Los parámetros esenciales para el driver `awslogs` incluyen:

- **awslogs-group**: El grupo de logs de CloudWatch.
- **awslogs-region**: La región de AWS.
- **awslogs-stream-prefix**: Un prefijo para identificar los flujos de logs.

En EKS, el logging del plano de control debe habilitarse explícitamente para enviar logs a CloudWatch Logs. Esto se puede configurar mediante la consola de AWS o la CLI, seleccionando los tipos de logs que deseas capturar. Para EKS en Fargate, [Fluent Bit](https://fluentbit.io/) puede configurarse para redirigir los logs directamente a CloudWatch, ofreciendo una solución integrada para el manejo de registros.

Además, los roles IAM asociados con las instancias de contenedor deben incluir permisos como `logs:CreateLogStream` y `logs:PutLogEvents`. Sin estos permisos, los contenedores no podrán enviar logs, interrumpiendo el monitoreo.

Por último, es esencial configurar el cifrado para proteger los datos. CloudWatch Logs admite la integración con claves [AWS KMS](https://aws.amazon.com/kms/) para cifrar los logs y métricas recopilados. Este cifrado debe activarse manualmente en los grupos de logs que reciben datos de Container Insights.

## Monitoreo de contenedores con Container Insights {id="monitoreo-de-contenedores-con-container-insights"}

Container Insights proporciona un análisis detallado de métricas y rendimiento para aplicaciones contenerizadas y microservicios. Esta herramienta recopila y organiza datos sobre el uso de CPU, memoria, disco y red, ofreciendo una vista clara del estado de clústeres, servicios y pods.

Además de las métricas básicas, Container Insights incluye información diagnóstica como fallos de reinicio de contenedores. Desde el 2 de diciembre de 2024, AWS introdujo nuevas funciones que permiten recopilar métricas por pod, contenedor y Kube-State.

Las métricas de Kube-State son clave para evaluar la salud general de un clúster [Kubernetes](https://kubernetes.io/), mientras que las métricas a nivel de contenedor ayudan a identificar problemas específicos, como fugas de memoria. Con esta precisión, es posible configurar alarmas en componentes críticos o asignar recursos adicionales para prevenir problemas. A continuación, te explicamos cómo desplegar el agente CloudWatch para aprovechar estas métricas.

### Despliegue del agente CloudWatch {id="despliegue-del-agente-cloudwatch"}

Para activar Container Insights y recopilar métricas, debes desplegar el agente como un DaemonSet. El proceso varía según el entorno:

- **[Amazon EKS](https://aws.amazon.com/eks/)**: Utiliza el complemento Amazon CloudWatch Observability EKS.
- **[AWS Fargate](https://aws.amazon.com/fargate/)**: Implementa AWS Distro for [OpenTelemetry](https://opentelemetry.io/) (ADOT).

Container Insights es compatible con Amazon EKS desde la versión 1.23 y admite un inicio rápido en versiones 1.24 o superiores. Sin embargo, solo funciona con instancias Linux.

En EKS, el despliegue incluye varios pasos: crear el namespace, configurar la cuenta de servicio y personalizar el ConfigMap del agente reemplazando `{{cluster_name}}` con el nombre del clúster. Luego, despliega el agente como DaemonSet utilizando el manifiesto oficial o una versión ajustada si necesitas StatsD. También puedes modificar parámetros como `metrics_collection_interval` (60 segundos por defecto, mínimo 15 segundos), `endpoint_override`, `force_flush_interval` y `region`.

Para AWS Fargate, el AWS OpenTelemetry Collector se despliega como DaemonSet mediante un comando curl que aplica la configuración desde el repositorio aws-observability. Verifica que los pods del collector estén activos en el espacio de nombres aws-otel-eks.

Una vez configurado el agente y recopiladas las métricas, puedes usar los paneles predefinidos para supervisar el rendimiento en tiempo real.

### Uso de paneles predefinidos {id="uso-de-paneles-predefinidos"}

Container Insights incluye paneles predefinidos en CloudWatch para facilitar el monitoreo en tiempo real. Estos paneles ayudan a tomar decisiones informadas y mantener el rendimiento de las aplicaciones.

Para acceder a ellos, entra en la consola de CloudWatch, selecciona **Insights** y luego **Container Insights**. Desde ahí, elige el tipo de recurso que deseas supervisar. Los menús desplegables permiten ajustar las vistas según las necesidades de monitoreo.

Entre los paneles más útiles para identificar los mayores consumidores de recursos están:

- ECS Services
- ECS Tasks
- EKS Namespaces
- EKS Services
- EKS Pods

Por ejemplo, al analizar un nodo, se detectó que la utilización de CPU y memoria alcanzaba casi el 60%. Al profundizar en los datos, se encontró que el contenedor fluent-bit tenía picos de uso del 77%. Este nivel de detalle permite identificar y resolver problemas rápidamente.

Container Insights también soporta [Prometheus](https://prometheus.io/), ofreciendo paneles predefinidos para cargas de trabajo comunes. La compatibilidad varía según el entorno, como muestra la siguiente tabla:

| Entorno | AWS App Mesh | Java JMX | NGINX | NGINX Plus | HAProxy | Memcached |
| --- | --- | --- | --- | --- | --- | --- |
| EKS | Sí | Sí | Sí | No | Sí | Sí |
| ECS | Sí | Sí | Sí | Sí | No | No |

Para análisis más detallados, CloudWatch Logs Insights permite consultar datos de métricas y analizar eventos específicos, brindando una visión más granular.

El agente CloudWatch genera automáticamente un grupo de logs llamado `/aws/containerinsights/Cluster_Name/performance`, donde almacena datos de rendimiento en formato de métrica integrada. Con la observabilidad mejorada para Amazon EKS, los costos se calculan por observación en lugar de por métrica almacenada o log ingerido.

Para más información y tutoriales sobre cómo monitorizar contenedores en AWS, visita [Dónde Aprendo AWS](/).

## Análisis de logs para seguridad y cumplimiento normativo {id="analisis-de-logs-para-seguridad-y-cumplimiento-normativo"}

El análisis de logs de contenedores cumple un papel crucial en la [detección de amenazas](/blog/10-mejores-practicas-de-aws-para-deteccion-de-amenazas-en-tiempo-real/) de seguridad, la investigación de incidentes y el cumplimiento de normativas. Tras configurar un monitoreo centralizado, este paso resulta indispensable. **CloudWatch Logs Insights** proporciona herramientas interactivas que facilitan la identificación de patrones sospechosos y permiten registrar actividades críticas con precisión.

### Consultas de logs con CloudWatch Logs Insights {id="consultas-de-logs-con-cloudwatch-logs-insights"}

CloudWatch Logs Insights permite buscar y analizar datos almacenados en CloudWatch Logs de manera interactiva. Esta herramienta soporta lenguajes de consulta como QL, PPL y SQL, y detecta automáticamente campos en logs provenientes de servicios de AWS o aplicaciones que emiten eventos en formato JSON. Aquí te mostramos cómo usarla para identificar patrones anómalos.

Para detectar posibles amenazas de seguridad, puedes emplear consultas específicas. Por ejemplo, filtrar eventos relacionados con intentos de acceso fallidos, como los errores "Client.UnauthorizedOperation" y "AccessDenied". Algunas consultas clave para reforzar la seguridad incluyen:

- **Seguimiento de actividad de usuarios**: Analiza horarios de acceso, direcciones IP y tipos de acciones realizadas.
- **Cambios en grupos de seguridad**: Identifica modificaciones no autorizadas en los grupos que gestionan el tráfico.
- **Detección de llamadas API sospechosas**: Usa CloudTrail para rastrear actividades no autorizadas en la cuenta.

### Configuración de alertas para eventos críticos {id="configuracion-de-alertas-para-eventos-criticos"}

Una vez que hayas identificado eventos sospechosos mediante consultas, es fundamental configurar alertas que permitan una respuesta inmediata. Las **CloudWatch Alarms** son esenciales para el monitoreo, ya que te ayudan a rastrear métricas específicas y activar respuestas automatizadas.

> "CloudWatch Alarms are a key component of AWS monitoring and observability, providing the capability to track specific metrics, trigger automated responses, and reduce system downtime." - Alice the Architect, AWS in Plain English

En entornos contenerizados, configurar filtros de métricas basados en grupos de logs puede ayudarte a detectar términos o patrones específicos. Usar convenciones de nombres consistentes facilita la trazabilidad, mientras que definir permisos IAM adecuados asegura la entrega segura de logs. Además, las alarmas basadas en consultas de Logs Insights pueden activar flujos de trabajo automatizados ante eventos críticos, como un aumento repentino en intentos de acceso fallidos.

### Integración con [AWS Security Hub](https://aws.amazon.com/security-hub/) {id="integracion-con-aws-security-hub"}

![AWS Security Hub](/assets/blog/cf0e08a9b6348487ffaed09390d4b313667e9c4368c343459cfdb93ad7817712.jpg)

**AWS Security Hub** ofrece una visión completa del estado de seguridad en AWS y valida el cumplimiento con estándares y buenas prácticas. Al integrarse con CloudWatch Logs, centraliza la gestión de amenazas y el cumplimiento normativo. Este servicio funciona en conjunto con otros como [AWS Config](https://aws.amazon.com/config/), que evalúa configuraciones de recursos; [Amazon GuardDuty](https://aws.amazon.com/guardduty/), que detecta amenazas en contenedores; y AWS Audit Manager, que audita continuamente el uso de AWS.

Esta integración fortalece el monitoreo centralizado al definir políticas de retención de logs basadas en requisitos regulatorios y objetivos de optimización de costes. Para estructurar los logs de ECS de forma eficiente, se recomienda usar formatos estandarizados como JSON e incluir metadatos relevantes, lo que facilita enormemente el análisis con CloudWatch Logs Insights.

## Buenas prácticas de seguridad para el registro de contenedores {id="buenas-practicas-de-seguridad-para-el-registro-de-contenedores"}

Proteger un registro de contenedores requiere implementar medidas de seguridad sólidas que resguarden datos sensibles y cumplan con las normativas. Estas prácticas, junto con el análisis detallado de logs, fortalecen la seguridad general del sistema.

### Cifrado de logs con KMS {id="cifrado-de-logs-con-kms"}

El cifrado de logs mediante claves gestionadas por el cliente (CMK) en AWS KMS es una estrategia eficaz para mantener un control estricto sobre los datos. Este enfoque permite cumplir con las normativas de seguridad y se alinea con los principios de confianza cero, ya que las políticas pueden personalizarse para que solo principales IAM específicos puedan cifrar y descifrar los registros.

En enero de 2025, Varun Kumar Manik presentó una solución para un hallazgo de severidad media en Prowler relacionado con logs no cifrados. La estrategia consistió en configurar grupos de logs de CloudWatch mediante CloudFormation y asociarlos a una clave KMS a través de la propiedad `KmsKeyId`. Esto mejoró significativamente la seguridad y facilitó el cumplimiento normativo.

> "Enforcing explicit KMS encryption gives you tighter control over your data, meets compliance requirements, and aligns with zero-trust security principles." - Varun Kumar Manik

Para implementar esta medida, es necesario crear una clave KMS en la región correspondiente y asegurarse de que su política permita al servicio CloudWatch Logs (`logs.<region>.amazonaws.com`) utilizarla. Es importante tener en cuenta que solo se admiten claves KMS simétricas, y si una clave se desactiva, CloudWatch Logs no podrá acceder a los registros cifrados con ella.

### Implementación de controles de acceso {id="implementacion-de-controles-de-acceso"}

Aplicar el principio de menor privilegio es esencial para limitar accesos no autorizados. Esto implica otorgar únicamente los permisos necesarios y realizar revisiones periódicas para eliminar usuarios, roles, políticas y credenciales que ya no se utilicen.

Las políticas gestionadas por el cliente permiten definir reglas de acceso detalladas, mientras que las políticas en línea evitan la propagación de permisos compartidos. En entornos con varias cuentas, las [políticas de control de servicios](/blog/politicas-de-control-de-servicios-scps-en-aws/) (SCPs) de AWS Organizations son útiles para establecer límites adicionales.

IAM Access Analyzer es una herramienta clave para generar políticas basadas en patrones de acceso, asegurando una configuración más precisa. Además, es recomendable utilizar roles IAM con credenciales temporales en lugar de claves de acceso permanentes, reforzando así la seguridad.

### Configuración de políticas de retención de logs {id="configuracion-de-politicas-de-retencion-de-logs"}

Definir políticas de retención en CloudWatch Logs no solo ayuda a reducir costes, sino que también evita la acumulación innecesaria de datos. Por defecto, los registros se conservan indefinidamente, lo que puede resultar en gastos elevados.

Por ejemplo, un entorno que genere 5 GB de logs diarios acumulará aproximadamente 1,8 TB al año, con un coste de unos 802 €. Al aplicar políticas de retención adecuadas, estos costes pueden reducirse significativamente, pasando de 1.200 € a 300 € en entornos de desarrollo.

| Consideración | Recomendación |
| --- | --- |
| Compliance | Alinear la retención con normativas legales |
| Coste | Revisar los períodos de retención regularmente |
| Frecuencia de acceso | Utilizar la clase Infrequent Access |
| Debugging | Equilibrar retención con necesidades de resolución de problemas |

CloudWatch Logs ofrece opciones de almacenamiento rentables, como las clases Standard e Infrequent Access. Los períodos de retención pueden configurarse desde 1 día hasta 3.653 días.

Para optimizar esta estrategia, es aconsejable alinear los períodos de retención con los requisitos legales, considerar opciones de almacenamiento a largo plazo como AWS S3 Glacier, realizar auditorías trimestrales y automatizar las políticas mediante Infrastructure-as-Code. Una vez que los eventos alcanzan el período de retención establecido, suelen eliminarse en un plazo de 72 horas.

## Conclusión {id="conclusion"}

El monitoreo de contenedores con **Amazon CloudWatch Logs** se presenta como una solución completa para gestionar contenedores en AWS. Su capacidad para centralizar la recopilación y el almacenamiento de logs, junto con visibilidad en tiempo real, responde a una de las principales preocupaciones en la adopción de contenedores. De hecho, según una encuesta de CNCF realizada en 2018, el 34 % de los participantes señaló el monitoreo como uno de los mayores retos en este ámbito. Gracias a su integración con Container Insights, CloudWatch Logs simplifica la recopilación de métricas y logs dentro del ecosistema de contenedores.

> "CloudWatch is a service that monitors applications, responds to performance changes, optimizes resource use, and provides insights into operational health." – Amazon Web Services

Esta descripción resalta su capacidad para detectar y responder a incidentes, una funcionalidad que se potencia con **CloudWatch Logs Insights**, una herramienta que permite realizar consultas avanzadas sobre los registros mediante un lenguaje de consulta especializado. Además, su integración con servicios como **AWS Security Hub** y **GuardDuty** centraliza la gestión de amenazas, mejorando la seguridad y el control.

La configuración y despliegue de CloudWatch Logs también destacan por su enfoque práctico. La observabilidad entre cuentas permite monitorear aplicaciones distribuidas en varias cuentas de AWS, mientras que las funciones de detección de anomalías facilitan la creación de alarmas automáticas en clústeres como **EKS**, **ECS** y **Kubernetes**. Esto no solo optimiza el uso de recursos, sino que también ayuda a reducir los costes operativos.

Por otro lado, el enfoque en seguridad y cumplimiento normativo refuerza su atractivo. Funciones como el cifrado con **KMS**, los controles de acceso mediante **IAM** y las políticas de retención configurables garantizan que el monitoreo cumpla con los estándares empresariales más exigentes. Todo esto se logra sin necesidad de realizar cambios en el código existente, lo que facilita su adopción.

## FAQs {id="faqs"}

### ¿Cómo configuro los permisos IAM para que mis contenedores envíen logs a CloudWatch Logs de forma segura? {id="como-configuro-los-permisos-iam-para-que-mis-contenedores-envien-logs-a-cloudwatch-logs-de-forma-segura"}

Para que tus contenedores envíen logs de forma segura a **CloudWatch Logs**, necesitas configurar permisos específicos en IAM. Lo primero es crear una política que incluya las acciones necesarias, como:

- `logs:CreateLogGroup`
- `logs:CreateLogStream`
- `logs:PutLogEvents`
- `logs:DescribeLogStreams`

Estas acciones permiten crear grupos y flujos de logs, enviar eventos y consultar los flujos existentes.

Una vez creada la política, asígnala a los roles o usuarios de IAM asociados a tus contenedores. Si deseas restringir el acceso, puedes limitarlo a un grupo de logs específico usando un ARN concreto. Si necesitas mayor flexibilidad, también puedes optar por configuraciones más amplias con `*`. Sin embargo, es crucial respetar las **mejores prácticas de seguridad**, evitando permisos innecesarios o demasiado amplios.

Es importante revisar y actualizar tus políticas de forma periódica para garantizar un entorno seguro y bien gestionado.

### ¿Cuáles son los beneficios de usar Container Insights para monitorizar métricas en contenedores y cómo se configura el agente de CloudWatch? {id="cuales-son-los-beneficios-de-usar-container-insights-para-monitorizar-metricas-en-contenedores-y-como-se-configura-el-agente-de-cloudwatch"}

## [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) Container Insights: Monitorización en Tiempo Real {id="amazon-cloudwatch-container-insights-monitorizacion-en-tiempo-real"}

![Amazon CloudWatch](/assets/blog/7439c8362b69f8252d51d49b0d3b65aae2bf5d0e1a78e56261d4441549b5a989.jpg)

Amazon CloudWatch Container Insights proporciona una **visión en tiempo real** del rendimiento y estado de los contenedores, lo que permite detectar problemas con rapidez y gestionar los recursos de manera más eficiente. Al recopilar métricas detalladas como el uso de CPU, memoria y almacenamiento, facilita decisiones más acertadas sobre escalabilidad y costes. Además, su integración con otros servicios de AWS potencia el análisis y la monitorización de aplicaciones basadas en contenedores.

### Configuración del Agente de CloudWatch {id="configuracion-del-agente-de-cloudwatch"}

Configurar el [agente de CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/) es sencillo y práctico. Puedes implementarlo como un **DaemonSet en Kubernetes**, lo que asegura que se ejecute en todos los nodos del clúster. También tienes la opción de habilitar Container Insights directamente desde la consola de Amazon ECS o utilizando la AWS CLI. Esto permite una configuración rápida, ya sea para clústeres específicos o para toda tu cuenta de AWS, logrando un monitoreo centralizado y eficaz de tus aplicaciones en contenedores.

### ¿Cómo puedo usar CloudWatch Logs Insights para mejorar la seguridad de mis aplicaciones en contenedores y detectar amenazas? {id="como-puedo-usar-cloudwatch-logs-insights-para-mejorar-la-seguridad-de-mis-aplicaciones-en-contenedores-y-detectar-amenazas"}

Para fortalecer la seguridad de tus aplicaciones en contenedores con **CloudWatch Logs Insights**, lo primero es asegurarte de que los registros de tus contenedores se envíen correctamente a **Amazon CloudWatch**. Esto se logra configurando **CloudWatch Container Insights**, una herramienta que recopila métricas y registros a nivel de clúster, nodo y pod, ofreciendo un panorama detallado sobre la actividad de tus aplicaciones.

Con los registros ya disponibles en CloudWatch, puedes aprovechar **CloudWatch Logs Insights** para ejecutar consultas específicas que identifiquen patrones anómalos o comportamientos sospechosos. Por ejemplo, es posible buscar errores recurrentes, advertencias o intentos de acceso no permitidos. Este tipo de análisis en tiempo real resulta clave para detectar posibles vulnerabilidades y actuar con rapidez, reforzando así la seguridad de tus aplicaciones en contenedores.

## Publicaciones de blog relacionadas

- [Cómo Desplegar Contenedores en AWS](/blog/como-desplegar-contenedores-en-aws/)
- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
- [Monitoreo y Logs de AWS Step Functions: Guía 2024](/blog/monitoreo-y-logs-de-aws-step-functions-guia-2024/)
- [Logs de acceso en ELB: Guía completa](/blog/logs-de-acceso-en-elb-guia-completa/)
