+++
url = "/blog/10-consejos-de-redes-para-aws-outposts/"
title = "10 Consejos de Redes para AWS Outposts"
description = "Descubre los 10 consejos esenciales para optimizar redes en AWS Outposts y asegura una implementación eficiente con alta disponibilidad y rendimiento."
date = "2024-05-14T05:11:03.706000+00:00"
lastmod = "2024-05-20"
image = "/assets/blog/d57b2c7f6d8d4785748ce1c5e820041b8b2ceca3b49c352cb994510b294e1014.jpg"
archive_order = 70

[[related]]
title = "CORS en WebSocket vs REST API Gateway"
url = "/blog/cors-en-websocket-vs-rest-api-gateway/"
image = "/assets/blog/c306342b2e9d89f2a43086243eea5ca7647bb051e5543b69a0c948b5fcbaa0db.jpg"

[[related]]
title = "Detección de Sesgos en Modelos ML con SageMaker Clarify"
url = "/blog/deteccion-de-sesgos-en-modelos-ml-con-sagemaker-clarify/"
image = "/assets/blog/055e62c5fbddebf94a936e62679cf92f9534356d8f9fa29c65056432687d3150.jpg"

[[related]]
title = "Integrar Amazon Polly en 5 pasos: Texto a voz realista"
url = "/blog/integrar-amazon-polly-en-5-pasos-texto-a-voz-realista/"
image = "/assets/blog/35cbdc26cad1c09b7dd2fc813a00437b8cf1656c6f9a97953a60da6caff34c9c.jpg"
+++

Para optimizar la implementación y el rendimiento de [AWS Outposts](https://aws.amazon.com/outposts/), siga estos consejos esenciales:

1. **Evalúe sus requisitos de conectividad** en función del ancho de banda, la velocidad de enlace ascendente y los requisitos regionales.
2. **Seleccione las velocidades de enlace ascendente y puertos adecuados:** AWS Outposts admite velocidades de 1 Gbps, 10 Gbps, 40 Gbps y 100 Gbps, con hasta 8 puertos de uplink por dispositivo de red.
3. **Implemente conexiones de red redundantes** para garantizar alta disponibilidad y confiabilidad, utilizando rutas dinámicas y conexiones en diferentes ubicaciones.
4. **Asegure la conectividad confiable de los anclajes** configurando conexiones de red redundantes y rutas dinámicas para reducir interrupciones.
5. **Optimice el enrutamiento de aplicaciones y cargas de trabajo** mediante tablas de rutas personalizadas y especificando direcciones IP, gateways, conexiones de peering, etc.
6. **Aproveche las** [**mejores prácticas**](/blog/mejores-practicas-aws-para-devops/) **de enlaces de servicio** utilizando enlaces redundantes, configurando direcciones IP y gateways, asegurando suficiente ancho de banda y utilizando enrutamiento dinámico.
7. **Planifique conexiones de Internet redundantes** con múltiples proveedores, direcciones IP y gateways para cada conexión, y suficiente ancho de banda.
8. **Monitoree el rendimiento y la resiliencia de la red** utilizando herramientas como [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/), [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) y [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html).
9. **Entienda las consideraciones de la red local**, como la topología, el ancho de banda disponible y el posible congestionamiento.
10. **Manténgase informado sobre actualizaciones del enlace de servicio** revisando la documentación de AWS Outposts y configurando notificaciones.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/mrnkvuH0--E" >}}

## Introducción {id="introducci%C3%B3n"}

AWS Outposts trae la nube de AWS a entornos locales, lo que requiere una configuración de red confiable. En este artículo, te proporcionamos diez consejos esenciales para optimizar AWS Outposts para aplicaciones contenerizadas. Al seguir estos consejos, podrás garantizar una experiencia de usuario sin problemas y una mayor eficiencia en la gestión de tus aplicaciones.

## 1. Evalúa tus requisitos de conectividad {id="1.-eval%C3%BAa-tus-requisitos-de-conectividad"}

Antes de implementar AWS Outposts, debes evaluar tus requisitos de conectividad para asegurarte de que tengas la infraestructura adecuada para admitir el tráfico de red. Debes considerar varios factores clave.

### Factores clave {id="factores-clave"}

| Factor | Descripción |
| --- | --- |
| Ancho de banda | La cantidad de ancho de banda necesario depende del tamaño de tus aplicaciones y la cantidad de tráfico de red que esperas manejar. |
| Velocidad de uplink | La velocidad de uplink es crucial para garantizar que tus aplicaciones se carguen rápidamente y se ejecuten sin problemas. |
| Requisitos de conectividad de la región | Debes asegurarte de que tengas los requisitos de conectividad adecuados para la región en la que se encuentra tu Outpost. |

Al evaluar tus requisitos de conectividad, debes considerar la complejidad de tus aplicaciones, el tamaño de tus datos y la cantidad de tráfico de red que esperas manejar. Esto te ayudará a determinar la infraestructura adecuada para admitir el tráfico de red y garantizar el rendimiento óptimo de tus aplicaciones.

## 2. Seleccione velocidades de uplink y puertos adecuados {id="2.-seleccione-velocidades-de-uplink-y-puertos-adecuados"}

Para garantizar una conexión confiable y rápida con AWS Outposts, es fundamental seleccionar velocidades de uplink y puertos adecuados. La velocidad de uplink se refiere a la velocidad a la que se transmite el tráfico de red entre su Outpost y la [región de AWS](/blog/arquitecturas-multi-region-en-aws/).

### Velocidades de uplink admitidas {id="velocidades-de-uplink-admitidas"}

AWS Outposts admite velocidades de uplink de 1 Gbps, 10 Gbps, 40 Gbps y 100 Gbps. La elección de la velocidad de uplink adecuada depende de varios factores, como el tamaño de sus aplicaciones, la cantidad de tráfico de red que espera manejar y los requisitos de conectividad de la región.

### Puertos disponibles {id="puertos-disponibles"}

Además de la velocidad de uplink, también es importante considerar la cantidad de puertos disponibles en su Outpost. AWS Outposts admite hasta 8 puertos de uplink por dispositivo de red, lo que le permite configurar múltiples conexiones de red para garantizar la redundancia y la alta disponibilidad.

| Velocidad de uplink | Número de puertos |
| --- | --- |
| 1 Gbps | 1, 2, 4, 6, 8 |
| 10 Gbps | 1, 2, 4, 8, 12, 16 |
| 40 Gbps | 1, 2, 3, 4 |
| 100 Gbps | 1, 2, 3, 4 |

Al seleccionar la velocidad de uplink y los puertos adecuados, asegúrese de considerar los requisitos de conectividad de su región y las necesidades específicas de sus aplicaciones. Esto le ayudará a garantizar una conexión confiable y rápida con AWS Outposts.

## 3. Implemente Conexiones de Red Redundantes {id="3.-implemente-conexiones-de-red-redundantes"}

La implementación de conexiones de red redundantes es crucial para garantizar la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts. Esto se logra mediante la configuración de múltiples conexiones de red entre su Outpost y la región de AWS.

### Ventajas de las conexiones de red redundantes {id="ventajas-de-las-conexiones-de-red-redundantes"}

- Garantiza la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts
- Reduce la posibilidad de interrupciones del servicio
- Permite que el tráfico de red se redirija automáticamente en caso de fallo de una conexión

### Tipos de conexiones de red redundantes {id="tipos-de-conexiones-de-red-redundantes"}

| Tipo de conexión | Descripción |
| --- | --- |
| Ruta dinámica | Configuración de rutas que se redirigen automáticamente en caso de fallo |
| Conexiones en diferentes ubicaciones | Configuración de conexiones en diferentes ubicaciones para reducir la posibilidad de interrupciones del servicio |

Es importante mencionar que la implementación de conexiones de red redundantes requiere una planificación cuidadosa y una configuración precisa para garantizar que las conexiones se establezcan correctamente y que el tráfico de red se redirija de manera efectiva en caso de fallo.

En resumen, la implementación de conexiones de red redundantes es fundamental para garantizar la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts. Al configurar rutas dinámicas y conexiones en diferentes ubicaciones, puede reducir la posibilidad de interrupciones del servicio y garantizar la continuidad del servicio.

## 4. Asegure la Conectividad Confiable de los Anclajes {id="4.-asegure-la-conectividad-confiable-de-los-anclajes"}

Para garantizar la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts, es fundamental asegurar la conectividad confiable de los anclajes. Un anclaje es un punto de conexión en una zona de disponibilidad (AZ) específica en la región de AWS que se utiliza para conectar su Outpost a la región.

### Importancia de la Conectividad de Anclajes Confiable {id="importancia-de-la-conectividad-de-anclajes-confiable"}

La conectividad de anclajes confiable es crucial para garantizar que su Outpost pueda comunicarse con la región de AWS de manera confiable y eficiente.

### Configuración de Anclajes {id="configuraci%C3%B3n-de-anclajes"}

Para configurar anclajes, debe asegurarse de que su Outpost tenga conectividad a la región de AWS a través de una conexión de red confiable.

### Ventajas de la Conectividad de Anclajes Confiable {id="ventajas-de-la-conectividad-de-anclajes-confiable"}

- Garantiza la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts
- Reduce la posibilidad de interrupciones del servicio
- Permite que el tráfico de red se redirija automáticamente en caso de fallo

En resumen, la conectividad de anclajes confiable es fundamental para garantizar la alta disponibilidad y la confiabilidad de su entorno de AWS Outposts. Al configurar conexiones de red redundantes y rutas dinámicas, puede reducir la posibilidad de interrupciones del servicio y garantizar la continuidad del servicio.

## 5. Optimice la Ruta de Aplicación y Carga de Trabajo {id="5.-optimice-la-ruta-de-aplicaci%C3%B3n-y-carga-de-trabajo"}

Para asegurar la alta disponibilidad y el rendimiento óptimo de sus aplicaciones y cargas de trabajo en AWS Outposts, es fundamental optimizar la ruta de aplicación y carga de trabajo. Esto se logra mediante la configuración de tablas de rutas personalizadas y la especificación de direcciones IP, gateways de internet, gateways locales, gateways privados virtuales y conexiones de peering.

### Configuración de Tablas de Rutas Personalizadas {id="configuraci%C3%B3n-de-tablas-de-rutas-personalizadas"}

Las tablas de rutas para subredes de Outpost funcionan de la misma manera que las tablas de rutas para subredes de Availability Zone. Puede especificar direcciones IP, gateways de internet, gateways locales, gateways privados virtuales y conexiones de peering como destinos.

| Destino | Descripción |
| --- | --- |
| Rango de CIDR de VPC | AWS define esto durante la instalación. Esta es la ruta local y se aplica a todas las rutas de VPC, incluido el tráfico entre instancias de Outpost en la misma VPC. |
| Destinos de región de AWS | Esto incluye listas de prefijos para Amazon Simple Storage Service (Amazon S3), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) gateway endpoint, AWS Transit Gateways, gateways privados virtuales, gateways de internet y peering de VPC. |

### Mejora de la Ruta de Aplicación y Carga de Trabajo {id="mejora-de-la-ruta-de-aplicaci%C3%B3n-y-carga-de-trabajo"}

Para mejorar la ruta de aplicación y carga de trabajo, se recomienda:

- Ruta el tráfico de internet sobre la ruta del gateway local (LGW).
- Configurar las tablas de rutas de subred de Outpost con un conjunto estándar de rutas - se utilizarán tanto para operaciones normales como durante eventos de desconexión.
- Proporcionar rutas de red redundantes entre el LGW de Outpost y los recursos de aplicación críticos en la nube. Utilice enrutamiento dinámico para redirigir automáticamente el tráfico en caso de fallo de la red en la nube.

Al seguir estos consejos, puede asegurarse de que sus aplicaciones y cargas de trabajo se ejecuten de manera óptima y confiable en AWS Outposts.

## 6. Aproveche las Mejores Prácticas de Enlaces de Servicio {id="6.-aproveche-las-mejores-pr%C3%A1cticas-de-enlaces-de-servicio"}

Para asegurar la alta disponibilidad y el rendimiento óptimo de sus aplicaciones y cargas de trabajo en AWS Outposts, es fundamental abrazar las mejores prácticas de enlaces de servicio. Un enlace de servicio conecta su Outpost a la región de AWS o a los puntos de anclaje de Outposts en la región.

### Configuración de Enlaces de Servicio {id="configuraci%C3%B3n-de-enlaces-de-servicio"}

Para implementar enlaces de servicio de alta calidad, siga estos consejos clave:

| Consejo | Descripción |
| --- | --- |
| Utilice enlaces de servicio redundantes | Garantiza la alta disponibilidad de sus aplicaciones y cargas de trabajo. |
| Configure direcciones IP y gateways de Internet | Asegúrese de que el tráfico de Internet se enrute correctamente a través del enlace de servicio. |
| Asegúrese de suficiente ancho de banda | Maneje el tráfico de red esperado. |
| Utilice enrutamiento dinámico | Redirigir automáticamente el tráfico en caso de fallo de la red en la nube. |

Además, es importante recordar que los enlaces de servicio deben configurarse de manera que permitan la comunicación entre la Outpost y la región de AWS. Esto incluye la configuración de las direcciones IP, los gateways de Internet y los puntos de anclaje de Outposts.

### Monitoreo y Mantenimiento {id="monitoreo-y-mantenimiento"}

Por último, es fundamental monitorear y mantener los enlaces de servicio para asegurarse de que estén funcionando correctamente y sin interrupciones. Esto puede lograrse mediante la supervisión del rendimiento de la red y la implementación de alertas para detectar cualquier problema potencial.

## 7. Planifique Conexiones de Internet Redundantes {id="7.-planifique-conexiones-de-internet-redundantes"}

Para asegurar la alta disponibilidad y resiliencia de sus aplicaciones y cargas de trabajo en AWS Outposts, es fundamental planificar conexiones de Internet redundantes. Esto garantiza que su Outpost tenga acceso a la región de AWS y a los puntos de anclaje de Outposts en la región, incluso en caso de fallo de una conexión.

### Ventajas de las Conexiones de Internet Redundantes {id="ventajas-de-las-conexiones-de-internet-redundantes"}

Las conexiones de Internet redundantes ofrecen varias ventajas, incluyendo:

| Ventaja | Descripción |
| --- | --- |
| Alta disponibilidad | Asegura que su Outpost tenga acceso a la región de AWS y a los puntos de anclaje de Outposts en la región, incluso en caso de fallo de una conexión. |
| Redundancia | Garantiza que su Outpost tenga acceso a la región de AWS y a los puntos de anclaje de Outposts en la región, incluso en caso de fallo de una conexión. |
| Mejora la confiabilidad | Reduce la posibilidad de interrupciones del servicio y mejora la confiabilidad de sus aplicaciones y cargas de trabajo. |

### Configuración de Conexiones de Internet Redundantes {id="configuraci%C3%B3n-de-conexiones-de-internet-redundantes"}

Para implementar conexiones de Internet redundantes, siga estos consejos clave:

- Utilice múltiples proveedores de Internet para asegurar la diversidad de rutas.
- Configure direcciones IP y gateways de Internet para cada conexión de Internet.
- Asegúrese de que cada conexión de Internet tenga suficiente ancho de banda para manejar el tráfico de red esperado.
- Utilice enrutamiento dinámico para redirigir automáticamente el tráfico en caso de fallo de la red en la nube.

Al planificar conexiones de Internet redundantes, asegúrese de considerar los requisitos de conectividad específicos de su aplicación y carga de trabajo, así como los requisitos de seguridad y cumplimiento relevantes.

## 8. Monitoree el Rendimiento y la Resistencia de la Red {id="8.-monitoree-el-rendimiento-y-la-resistencia-de-la-red"}

Para garantizar la alta disponibilidad y resiliencia de sus aplicaciones y cargas de trabajo en AWS Outposts, es fundamental monitorear el rendimiento y la resistencia de la red. Esto le permite identificar problemas potenciales antes de que afecten a la producción y tomar medidas correctivas oportunas.

### Ventajas del Monitoreo de la Red {id="ventajas-del-monitoreo-de-la-red"}

El monitoreo de la red ofrece varias ventajas:

| Ventaja | Descripción |
| --- | --- |
| Identificación temprana de problemas | Identifica problemas potenciales antes de que afecten a la producción. |
| Mejora la confiabilidad | Reduce la posibilidad de interrupciones del servicio y mejora la confiabilidad de sus aplicaciones y cargas de trabajo. |
| Optimización del rendimiento | Permite identificar oportunidades para optimizar el rendimiento de la red y mejorar la experiencia del usuario. |

### Herramientas de Monitoreo de la Red {id="herramientas-de-monitoreo-de-la-red"}

AWS ofrece varias herramientas para monitorear el rendimiento y la resistencia de la red:

- Amazon CloudWatch: proporciona métricas y registros detallados sobre el rendimiento y la salud de sus recursos de AWS.
- AWS CloudTrail: proporciona un registro detallado de todas las llamadas API realizadas en su cuenta de AWS.
- VPC Flow Logs: proporciona un registro detallado del tráfico de red en sus VPC.

Al monitorear el rendimiento y la resistencia de la red, asegúrese de considerar los requisitos de conectividad específicos de su aplicación y carga de trabajo, así como los requisitos de seguridad y cumplimiento relevantes.

## 9. Entienda las Consideraciones de la Red Local {id="9.-entienda-las-consideraciones-de-la-red-local"}

Al configurar AWS Outposts, es fundamental considerar el entorno de la red local y asegurarse de que pueda admitir los requisitos de conectividad del Outpost. Esto incluye entender la topología de la red local, el ancho de banda disponible y el posible congestionamiento de la red.

### Topología de la Red Local {id="topolog%C3%ADa-de-la-red-local"}

La topología de la red local juega un papel crítico en la determinación de la conectividad del Outpost. Debe asegurarse de que la red local esté diseñada para admitir los requisitos de conectividad del Outpost, incluyendo el número de uplinks, velocidades de puerto y tipos de fibra. Una topología de red local bien diseñada puede ayudar a garantizar una conectividad confiable y de alta performance entre el Outpost y la red local.

### Ancho de Banda Disponible {id="ancho-de-banda-disponible"}

El ancho de banda disponible es otro factor crítico que debe considerarse al configurar AWS Outposts. Debe asegurarse de que la red local tenga suficiente ancho de banda para admitir los requisitos de conectividad del Outpost. Esto incluye considerar el ancho de banda requerido para la transferencia de datos, así como cualquier posible congestionamiento de la red.

### Congestionamiento de la Red {id="congestionamiento-de-la-red"}

El congestionamiento de la red puede afectar significativamente el rendimiento de AWS Outposts. Debe asegurarse de que la red local esté diseñada para minimizar el congestionamiento de la red, incluyendo la implementación de políticas de calidad de servicio (QoS) y modelado de tráfico.

Al entender las consideraciones de la red local, puede asegurarse de que su implementación de AWS Outposts sea exitosa y proporcione una conectividad confiable y de alta performance.

## 10. Manténgase Informado sobre Actualizaciones del Enlace de Servicio {id="10.-mant%C3%A9ngase-informado-sobre-actualizaciones-del-enlace-de-servicio"}

Para asegurarte de que tu entorno de red de AWS Outposts esté siempre actualizado y funcionando correctamente, es fundamental mantenerse informado sobre las actualizaciones del enlace de servicio. El enlace de servicio es un grupo de túneles cifrados que se utilizan para llevar tráfico de gestión y tráfico de red entre tu región de AWS y tu Outpost.

### Importancia de las Actualizaciones del Enlace de Servicio {id="importancia-de-las-actualizaciones-del-enlace-de-servicio"}

Las actualizaciones del enlace de servicio son cruciales para asegurarte de que tu Outpost siga funcionando correctamente y sin interrupciones. Estas actualizaciones pueden incluir mejoras de seguridad, correcciones de errores y nuevas características.

### Cómo Mantenerse Informado {id="c%C3%B3mo-mantenerse-informado"}

Puedes mantenerse informado sobre las actualizaciones del enlace de servicio de varias maneras:

| Método | Descripción |
| --- | --- |
| Revisar la documentación de AWS Outposts | La documentación de AWS Outposts es la fuente más confiable para obtener información sobre las actualizaciones del enlace de servicio. |
| Configurar notificaciones | Puedes configurar notificaciones para recibir alertas cuando se produzcan actualizaciones del enlace de servicio. |
| Seguir a AWS en redes sociales | AWS publica información sobre las actualizaciones del enlace de servicio en sus redes sociales. |

En resumen, mantenerse informado sobre las actualizaciones del enlace de servicio es crucial para asegurarte de que tu entorno de red de AWS Outposts esté siempre actualizado y funcionando correctamente.

## Conclusión {id="conclusi%C3%B3n"}

Al seguir estos diez consejos de redes para AWS Outposts, puedes crear un entorno de red resistente y eficiente para tu implementación de AWS Outposts. Esto te ayudará a asegurarte de que tus aplicaciones en contenedores se ejecuten de manera óptima.

**Recuerda**

- Evalúa tus requisitos de conectividad
- Selecciona velocidades y puertos de enlace adecuados
- Implementa conexiones de red redundantes
- Asegúrate de que tengas un enlace de servicio confiable
- Monitorea el rendimiento y la resiliencia de la red
- Mantén informado sobre las actualizaciones del enlace de servicio

Al seguir estos consejos, podrás crear un entorno de red seguro y escalable que se adapte a tus necesidades empresariales.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Cuál es el uso de BGP en [AWS Outposts](https://aws.amazon.com/outposts/)? {id="%C2%BFcu%C3%A1l-es-el-uso-de-bgp-en-aws-outposts%3F"}

![AWS Outposts](/assets/blog/6fa00f5cb68d455239d13e02999ac08c6095405085564003f95b3de9ba1af16e.jpg)

El Protocolo de Puerta de Enlace de Frontera (BGP) se utiliza en AWS Outposts para dos propósitos clave:

#### Anuncio de rutas entre Outposts y tu red local {id="anuncio-de-rutas-entre-outposts-y-tu-red-local"}

BGP establece una sesión de peering eBGP entre cada dispositivo de red de Outposts y tu dispositivo de red local para la conectividad del enlace de servicio. Esto permite el anuncio de rutas entre Outposts y tu red local.

#### Anuncio de rutas entre Outposts y tu dispositivo de red local para la conectividad de la puerta de enlace local {id="anuncio-de-rutas-entre-outposts-y-tu-dispositivo-de-red-local-para-la-conectividad-de-la-puerta-de-enlace-local"}

BGP también establece una sesión de peering eBGP desde cada dispositivo de red de Outposts a tu dispositivo de red local para la conectividad desde tu red local a la puerta de enlace local. Esto permite anunciar rutas entre Outposts y tu dispositivo de red local para acceder a la puerta de enlace local.

En resumen, BGP es fundamental para establecer la conectividad de red entre Outposts y tu infraestructura local, permitiendo el anuncio de rutas y el enrutamiento dinámico para una alta disponibilidad y redundancia.

## Related posts

- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Mejores Prácticas Para Amazon EC2](/blog/mejores-practicas-para-amazon-ec2/)
- [Arquitecturas Multi-Región en AWS](/blog/arquitecturas-multi-region-en-aws/)
- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
