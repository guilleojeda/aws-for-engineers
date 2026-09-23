+++
url = "/blog/que-son-los-endpoints-de-vpc-en-aws/"
title = "¿Qué son los endpoints de VPC en AWS?"
description = "Los endpoints de VPC en AWS ofrecen conexiones seguras y privadas a servicios, optimizando costos y mejorando el rendimiento sin usar Internet público."
date = "2025-02-17T00:17:36.990000+00:00"
lastmod = "2025-02-17"
image = "/assets/blog/784749ef7570c8a485edf97b3621d67188aaaced0dc704eafe4a5e0b6971236c.jpg"
archive_order = 22

[[related]]
title = "Visualiza Costos con AWS Cost and Usage Reports y QuickSight"
url = "/blog/visualiza-costos-con-aws-cost-and-usage-reports-y-quicksight/"
image = "/assets/blog/bcf6fecd181e12cedeeed88a06ce3a2772dabdc03625a03f3037d670c0942f94.jpg"

[[related]]
title = "Arquitecturas de Alta Disponibilidad en AWS"
url = "/blog/arquitecturas-de-alta-disponibilidad-en-aws/"
image = "/assets/blog/1b184fe1242c3e7fb970e9845427d92c132904352ae80c4f0254117432753c1d.jpg"

[[related]]
title = "Tipos y Tamaños de Instancias RDS: Guía Completa"
url = "/blog/tipos-y-tamanos-de-instancias-rds-guia-completa/"
image = "/assets/blog/ad2ff3daa90f3b8701cd3eb88e0d37048e5ba3627b71572bee19d5fefd84f59f.jpg"
+++

**Los endpoints de VPC en [AWS](https://aws.amazon.com/) permiten conexiones privadas y seguras entre tus VPCs y servicios de [AWS](https://aws.amazon.com/) sin usar Internet pública.** Existen dos tipos principales:

- **Interface Endpoints**: Basados en [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html), funcionan con ENIs (Elastic Network Interfaces) y son compatibles con [más de 69 servicios AWS](/blog/aws-seguridad-servicios-esenciales/). Tienen costo ($0.01/hora y $0.01/GB procesado) y permiten control granular mediante grupos de seguridad y acceso desde redes on-premises.
- **Gateway Endpoints**: Gratuitos, operan mediante tablas de enrutamiento y solo soportan [Amazon S3](https://docs.aws.amazon.com/s3/) y [DynamoDB](https://docs.aws.amazon.com/dynamodb/). No requieren configuración adicional ni interfaces de red.

### Comparación rápida: {id="comparacion-rapida"}

| Característica | Interface Endpoints | Gateway Endpoints |
| --- | --- | --- |
| Servicios soportados | Más de 69 | Solo S3 y DynamoDB |
| Costo | De pago | Gratuito |
| Acceso on-premises | Sí | No |
| Tecnología base | AWS PrivateLink con ENIs | Enrutamiento VPC |
| Grupos de seguridad | Requeridos | No aplica |
| Configuración DNS | Opcional | Automática |

**¿Cuándo usarlos?**

- Elige Interface Endpoints para varios servicios o acceso híbrido.
- Usa Gateway Endpoints para S3/DynamoDB con bajo costo y alta eficiencia.

Estos endpoints mejoran la seguridad, reducen costos y optimizan el rendimiento en la red de AWS.

## 2 Tipos de VPC Endpoints {id="2-tipos-de-vpc-endpoints"}

AWS ofrece dos tipos principales de VPC Endpoints, cada uno diseñado para diferentes necesidades y escenarios. A continuación, te explicamos en detalle cómo funcionan y cuándo utilizarlos.

### Interface Endpoints {id="interface-endpoints"}

Los Interface Endpoints, basados en AWS PrivateLink, permiten conectar [servicios AWS](/blog/aws-aprender-guia-inicial/) a través de interfaces de red elásticas (ENIs) con direcciones IP privadas. Este enfoque asegura que el tráfico nunca se exponga a Internet. Algunas de sus características son:

- **Compatibilidad con más de 69 servicios AWS.**
- **Acceso desde redes on-premises** mediante Direct Connect o VPN [[1]](https://keepcoding.io/blog/que-es-vpc-endpoint-aws/).
- **Control de acceso granular** mediante grupos de seguridad.
- **Modelo de costos:** $0.01 por hora y $0.01 por GB de datos procesados [[5]](https://opentextbc.ca/writingforsuccess/chapter/chapter-7-sources-choosing-the-right-ones/).

### Gateway Endpoints {id="gateway-endpoints"}

Los Gateway Endpoints funcionan como entradas en las tablas de enrutamiento de la VPC, dirigiendo el tráfico de manera directa a servicios específicos de AWS. Sus características incluyen:

- Soporte exclusivo para **Amazon S3 y DynamoDB** [[1]](https://keepcoding.io/blog/que-es-vpc-endpoint-aws/)[[2]](https://tutorialsdojo.com/vpc-interface-endpoint-vs-gateway-endpoint-in-aws/).
- **Sin costo adicional** [[2]](https://tutorialsdojo.com/vpc-interface-endpoint-vs-gateway-endpoint-in-aws/).
- **Sin necesidad de interfaces de red adicionales.**
- **Mejor rendimiento y menor latencia** para S3 y DynamoDB dentro de la VPC [[2]](https://tutorialsdojo.com/vpc-interface-endpoint-vs-gateway-endpoint-in-aws/).
- **Acceso limitado** únicamente desde dentro de la VPC [[1]](https://keepcoding.io/blog/que-es-vpc-endpoint-aws/).

### Interface vs Gateway Endpoints {id="interface-vs-gateway-endpoints"}

A la hora de elegir entre estos dos tipos de endpoints, es importante considerar sus diferencias clave:

| Característica | Interface Endpoints | Gateway Endpoints |
| --- | --- | --- |
| Tecnología base | AWS PrivateLink con ENIs | Enrutamiento VPC |
| Servicios soportados | Más de 69 servicios AWS | Solo S3 y DynamoDB |
| Costo | De pago | Gratuito |
| Acceso on-premises | Sí | No |
| Alta disponibilidad | Por zona de disponibilidad | Inherente a la VPC |
| Grupos de seguridad | Requeridos | No aplica |
| Configuración DNS | Requiere configuración | Automática |
| Rendimiento | Latencia adicional por ENI | Latencia mínima |

**¿Cuándo usar Interface Endpoints?**

- Si necesitas acceso a varios [servicios de AWS](/blog/introduccion-a-los-servicios-de-amazon-web-services/).
- Si deseas conectarte desde redes on-premises.
- Si buscas implementar controles de seguridad detallados.

**¿Cuándo usar Gateway Endpoints?**

- Si solo necesitas acceso a S3 o DynamoDB.
- Si prefieres una solución sin costos adicionales.
- Si el rendimiento dentro de la VPC es tu prioridad.

Estas diferencias te ayudarán a seleccionar el endpoint adecuado para tus necesidades. En las próximas secciones, profundizaremos en cómo implementar estas opciones de manera segura y eficiente.

## Operaciones de VPC Endpoint {id="operaciones-de-vpc-endpoint"}

Después de elegir el tipo de endpoint adecuado, es importante comprender cómo funcionan en la práctica.

### Tráfico en Red Privada {id="trafico-en-red-privada"}

Los VPC Endpoints aseguran operaciones seguras mediante dos enfoques principales:

La resolución DNS depende del tipo de endpoint:

| Tipo de Endpoint | DNS | Detalles de Funcionamiento |
| --- | --- | --- |
| Interface | DNS Privado | Resuelve a direcciones IP privadas de ENIs en subredes específicas |
| Gateway | Actualización Automática | Configura rutas directas en tablas de enrutamiento |

Este flujo privado refuerza la seguridad descrita anteriormente en las [ventajas de los VPC Endpoints](/blog/conceptos-basicos-y-avanzados-de-amazon-vpc/).

### Características de Alta Disponibilidad {id="caracteristicas-de-alta-disponibilidad"}

AWS asegura alta disponibilidad mediante redundancia en múltiples zonas de disponibilidad (multi-AZ), failover automático, balanceo de carga integrado y escalado horizontal sin restricciones predefinidas de ancho de banda [[3]](https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/what-are-vpc-endpoints.html).

**Escalabilidad Horizontal**

- Escalado automático basado en la carga.
- Sin límites predefinidos de ancho de banda.
- Rendimiento constante incluso bajo alta demanda [[3]](https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/what-are-vpc-endpoints.html).

Estas capacidades son clave para garantizar operaciones continuas, lo cual es fundamental en los escenarios que se analizarán más adelante.

### Pasos para Configuración {id="pasos-para-configuracion"}

- **Configuración Inicial**
  - Para Interface Endpoints:
    - Elegir subredes para las ENIs.
    - Configurar grupos de seguridad.
    - Configuración opcional de DNS.
  - Para Gateway Endpoints:
    - Actualización automática de las tablas de enrutamiento.
- **Monitoreo**
  - Usar registros de flujo VPC.
  - Supervisar métricas en [CloudWatch](https://docs.aws.amazon.com/cloudwatch/).
  - Realizar revisiones regulares de las políticas configuradas.

## Casos de Uso Comunes de VPC Endpoints {id="casos-de-uso-comunes-de-vpc-endpoints"}

Los VPC Endpoints ofrecen soluciones prácticas para diversas necesidades empresariales en AWS. Aquí exploramos los escenarios donde su implementación resulta más útil.

### Requisitos de Seguridad {id="requisitos-de-seguridad"}

Los VPC Endpoints permiten un control detallado sobre el acceso, utilizando herramientas como:

- **Políticas de Endpoint**: Restringen el acceso según usuarios de IAM y direcciones IP específicas.
- **Grupos de Seguridad**: Gestionan el tráfico a nivel de red para mayor control.
- **Registros [CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)**: Proveen auditoría completa de las llamadas API realizadas.

### Ahorro en Costos de Red {id="ahorro-en-costos-de-red"}

Sustituir los NAT Gateways por Gateway Endpoints puede reducir gastos al evitar cargos de procesamiento de datos. Entre los beneficios se incluyen:

- **Eliminación de costos por hora** asociados al uso de NAT Gateways.
- **Evitar cargos adicionales** por procesamiento de datos.
- **Sin costo adicional** por el [uso de Gateway Endpoints](https://cloudiostrategy.com/endpoint-proxy-con-api-gateway/).

### Configuración de Redes Híbridas {id="configuracion-de-redes-hibridas"}

Los VPC Endpoints también son clave para arquitecturas híbridas, especialmente cuando se integran con [AWS Direct Connect](https://docs.aws.amazon.com/directconnect/). Esto permite:

- **Acceso privado** a servicios de AWS desde la red local.
- **Mejor rendimiento** gracias a una latencia más baja.
- **Consistencia en el throughput**, ideal para servicios como S3 y DynamoDB.

Para implementar redes híbridas de forma efectiva, es necesario:

- Configurar una *Interfaz Virtual Privada (VIF)* para Direct Connect.
- Implementar Interface Endpoints para los servicios que se requieran [[1]](https://keepcoding.io/blog/que-es-vpc-endpoint-aws/)[[4]](https://docs.aws.amazon.com/govcloud-us/latest/UserGuide/using-govcloud-vpc-endpoints.html).

La integración con Direct Connect mejora el rendimiento de servicios críticos, como S3, mientras asegura una conexión privada y segura [[1]](https://keepcoding.io/blog/que-es-vpc-endpoint-aws/)[[3]](https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/what-are-vpc-endpoints.html). Esta configuración es especialmente útil para empresas que necesitan acceso privado a AWS desde su infraestructura local, combinando seguridad y eficiencia.

## Pautas de Implementación {id="pautas-de-implementacion"}

### Configuración Multi-VPC {id="configuracion-multi-vpc"}

Puedes configurar endpoints en varias VPCs utilizando **[AWS Resource Access Manager](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html) (RAM)** para compartirlos entre cuentas. En arquitecturas más complejas:

- El VPC central (hub) aloja los endpoints que serán compartidos.
- Los VPCs secundarios (spokes) se conectan al hub a través de **[AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)**.
- Las tablas de enrutamiento se configuran para dirigir el tráfico hacia los endpoints compartidos.

### Control de Acceso {id="control-de-acceso"}

La seguridad de los VPC Endpoints se gestiona mediante diferentes niveles de control, como se detalla en la siguiente tabla:

| Tipo de Política | Uso Principal | Ventaja |
| --- | --- | --- |
| Políticas de Endpoint | Control de acciones específicas | Permite restricciones detalladas por principal y recurso |
| Políticas basadas en recursos | Control a nivel de servicio | Gestiona el acceso específico para cada endpoint |
| Políticas basadas en identidad | Control administrativo | Facilita la gestión de creación y modificación |

Asegúrate de aplicar el **principio de mínimo privilegio** en las políticas IAM. Esto incluye definir:

- Usuarios o roles que tendrán autorización.
- Acciones específicas que se les permitirá realizar.
- Recursos a los que podrán acceder.
- Condiciones particulares que se deben cumplir.

Estos controles son clave para reforzar la seguridad mencionada en la sección de Requisitos de Seguridad.

### Límites Actuales {id="limites-actuales"}

Al implementar endpoints, ten en cuenta los siguientes factores:

- **Compatibilidad regional:** No funcionan entre regiones diferentes.
- **Límites de ancho de banda:** Los Interface Endpoints tienen restricciones de capacidad.
- **Cuotas:** Existen límites en la cantidad de endpoints por región y por VPC.

## Conclusión {id="conclusion"}

### Puntos Clave {id="puntos-clave"}

Los VPC Endpoints permiten una [conexión privada a los servicios de AWS](/blog/configurar-aws-para-comunicacion-en-equipo-7-pasos/), ofreciendo tres beneficios principales: **mayor seguridad** al evitar el uso de internet público, **mejor rendimiento** y **ahorro en costos operativos**. Al seguir las recomendaciones mencionadas anteriormente, es posible diseñar arquitecturas más seguras y eficientes.

### Recursos Adicionales {id="recursos-adicionales"}

Si deseas profundizar en el tema de VPC Endpoints y otros servicios de AWS en español, visita **[Dónde Aprendo AWS](/)** (https://dondeaprendoaws.com).

## FAQs {id="faqs"}

### ¿Qué es Amazon VPC Endpoint? {id="que-es-amazon-vpc-endpoint"}

Es un recurso virtual que permite la comunicación privada entre tu VPC y servicios de AWS sin necesidad de usar internet pública. Esto se explicó en detalle en la sección 'Conceptos básicos'.

### ¿Cuál es la diferencia entre un endpoint de gateway S3 y un endpoint de interfaz? {id="cual-es-la-diferencia-entre-un-endpoint-de-gateway-s3-y-un-endpoint-de-interfaz"}

- **Gateway Endpoints**: Son gratuitos y se limitan a S3 y DynamoDB. Utilizan tablas de rutas para la comunicación.
- **Interface Endpoints**: Son de pago y compatibles con más de 69 servicios. Funcionan a través de ENIs usando PrivateLink.

### ¿Cuáles son las ventajas de los VPC endpoints? {id="cuales-son-las-ventajas-de-los-vpc-endpoints"}

Ofrecen mejoras en seguridad, reducción de costos y un mejor rendimiento, como se describió en la sección 'Ventajas de los VPC Endpoints'.

### ¿Cuáles son los beneficios específicos de los VPC endpoints? {id="cuales-son-los-beneficios-especificos-de-los-vpc-endpoints"}

Son los mismos que los mencionados anteriormente: mayor seguridad, eficiencia en costos y mejor rendimiento.

### ¿Cuál es la diferencia entre gateway e interfaz? {id="cual-es-la-diferencia-entre-gateway-e-interfaz"}

Las diferencias principales incluyen los servicios compatibles, los costos y la forma en que se implementan técnicamente. Para más detalles, revisa la tabla comparativa en la sección 'Interface vs Gateway Endpoints'. Esta distinción es clave para decidir cuál usar en escenarios específicos, como se analizó en la sección 'Implementation Guidelines'.

## Publicaciones de blog relacionadas

- [Conceptos Básicos y Avanzados de Amazon VPC](/blog/conceptos-basicos-y-avanzados-de-amazon-vpc/)
- [Amazon CloudFront: Comprendiendo el CDN de AWS](/blog/amazon-cloudfront-comprendiendo-el-cdn-de-aws/)
- [10 Estrategias para Optimizar Costos de Red en AWS](/blog/10-estrategias-para-optimizar-costos-de-red-en-aws/)
