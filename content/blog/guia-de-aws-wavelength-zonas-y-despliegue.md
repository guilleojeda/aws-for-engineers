+++
url = "/blog/guia-de-aws-wavelength-zonas-y-despliegue/"
title = "Guía de AWS Wavelength: Zonas y Despliegue"
description = "Descubre todo sobre AWS Wavelength, desde su arquitectura hasta su despliegue y seguridad. Aprende cómo reducir la latencia y mejorar el rendimiento de tus aplicaciones en este servicio de infraestructura de AWS."
date = "2024-05-19T00:55:00.331000+00:00"
lastmod = "2024-05-20"
image = "/assets/blog/e73412d95c38ad88b6dc619af40ce85a496d7a80473dd455839f31806bd2e884.jpg"
archive_order = 56

[[related]]
title = "AWS DeepLens: Introducción al Aprendizaje Profundo"
url = "/blog/aws-deeplens-introduccion-al-aprendizaje-profundo/"
image = "/assets/blog/711eae34c71ed3b53e765f69766cfc873d632ebc2ad7721de640457942e70c5a.jpg"

[[related]]
title = "Desarrollando Aplicaciones con AWS Lambda"
url = "/blog/desarrollando-aplicaciones-con-aws-lambda/"
image = "/assets/blog/699efcfd9fc0a59df5186b93c7fe46b36d74205b587c17c6a703259da8e1565e.jpg"

[[related]]
title = "AWS bases de datos: introducción básica"
url = "/blog/aws-bases-de-datos-introduccion-basica/"
image = "/assets/blog/7dd6e4771015e24de4a4bc0d812cfbd05caa0c3c5e49ffe8ea8133055203c6bc.jpg"
+++

[AWS Wavelength](https://aws.amazon.com/wavelength/) es un servicio de infraestructura que permite a los desarrolladores crear aplicaciones con latencia ultra baja para dispositivos móviles y usuarios finales. Despliega recursos de computación y [almacenamiento de AWS](/blog/clases-de-almacenamiento-de-amazon-s3/) en la periferia de las redes 5G de los proveedores de telecomunicaciones, reduciendo la latencia y mejorando la experiencia del usuario.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/KZX5FcsDfUQ" >}}

## ¿Qué es [AWS Wavelength](https://aws.amazon.com/wavelength/)? {id="%C2%BFqu%C3%A9-es-aws-wavelength%3F"}

![AWS Wavelength](/assets/blog/b5ed01b40bb6923a76c3d3c59061c824448027c6d2bc10f9a8de5e2cb6369a89.jpg)

AWS Wavelength permite a los desarrolladores ejecutar aplicaciones en la periferia de la red 5G, lo que reduce la latencia y mejora el rendimiento de aplicaciones que requieren baja latencia o resiliencia en el borde, como:

- Transmisión de video en vivo
- Juegos en línea
- Realidad aumentada
- IoT
- Producción de medios en vivo
- Automatización industrial

## Principales Características {id="principales-caracter%C3%ADsticas"}

- **Zonas de Wavelength**: Despliegues de [infraestructura de AWS](/blog/aws-seguridad-servicios-esenciales/) en centros de datos de proveedores de telecomunicaciones en la red 5G.
- **Baja Latencia**: El tráfico de la aplicación llega a los servidores sin salir de la red del proveedor, reduciendo la latencia.
- [**Integración con Servicios de AWS**](/blog/introduccion-a-los-servicios-de-amazon-web-services/): Se puede integrar con servicios como [Amazon EC2](https://aws.amazon.com/ec2/), [Amazon S3](https://aws.amazon.com/s3/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), [AWS Lambda](https://aws.amazon.com/lambda/), [Amazon EKS](https://aws.amazon.com/eks/), [Amazon ECS](https://aws.amazon.com/ecs/) y [Amazon SageMaker](https://aws.amazon.com/sagemaker/).
- **Alta Disponibilidad y Tolerancia a Fallos**: Se pueden desplegar recursos en múltiples zonas de Wavelength, implementar failover y enrutamiento DNS, y monitorear los recursos.
- **Seguridad**: Se puede configurar la seguridad de la red, la gestión de acceso, la encriptación de datos y cumplir con estándares de seguridad como [HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act), [ISO](https://en.wikipedia.org/wiki/ISO/IEC_27001) y [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard).

## Pasos Clave para Usar AWS Wavelength {id="pasos-clave-para-usar-aws-wavelength"}

1. Configurar la cuenta de AWS y habilitar las zonas de Wavelength en la región deseada.
2. Crear subredes en las zonas de Wavelength y asociarlas con una VPC.
3. Lanzar instancias de EC2 en las zonas de Wavelength y asociar direcciones IP de carrier.
4. Configurar balanceadores de carga (ALB y NLB) para distribuir el tráfico.
5. Integrar con otros servicios de AWS según sea necesario (EKS, ECS, Lambda, SageMaker, CloudFront).
6. Implementar estrategias de alta disponibilidad, tolerancia a fallos, seguridad y optimización de costos.

AWS Wavelength permite a los desarrolladores aprovechar la computación en el borde y crear aplicaciones con latencia ultra baja para dispositivos móviles y usuarios finales.

## ¿Qué es AWS Wavelength? {id="%C2%BFqu%C3%A9-es-aws-wavelength%3F-1"}

AWS Wavelength es un servicio de infraestructura de AWS que permite a los desarrolladores crear aplicaciones con latencia muy baja para dispositivos móviles y usuarios finales. Despliega servicios de computación y almacenamiento de AWS en la periferia de las redes 5G de los proveedores de servicios de comunicaciones (CSP). Esto permite que el tráfico de la aplicación llegue a los servidores en zonas de Wavelength sin salir de la red del proveedor, reduciendo la latencia y mejorando la experiencia del usuario.

La computación en la periferia es clave para aplicaciones que necesitan una respuesta rápida y baja latencia, como la transmisión de video en vivo, el juego en línea y la realidad aumentada. AWS Wavelength permite a los desarrolladores usar la computación en la periferia sin tener que gestionar la infraestructura subyacente.

Con AWS Wavelength, los desarrolladores pueden crear aplicaciones que se ejecutan en la periferia de la red 5G, lo que reduce la latencia y mejora la experiencia del usuario. Esto es especialmente importante para aplicaciones que requieren una respuesta rápida y baja latencia, como la transmisión de video en vivo, el juego en línea y la realidad aumentada.

## Getting Started with Wavelength Zones {id="getting-started-with-wavelength-zones"}

Para empezar a usar AWS Wavelength, es importante configurar tu cuenta de AWS y habilitar las zonas de Wavelength en la región deseada.

### Configuración de la Cuenta de AWS {id="configuraci%C3%B3n-de-la-cuenta-de-aws"}

Antes de usar AWS Wavelength, asegúrate de tener una cuenta de AWS activa y configurada correctamente. Esto incluye:

- Crear una cuenta de AWS si no la tienes
- Configurar la información de facturación y pago
- Habilitar los servicios de AWS necesarios, como Amazon EC2 y Amazon VPC

### Habilitar Zonas de Wavelength {id="habilitar-zonas-de-wavelength"}

Para habilitar las zonas de Wavelength, sigue estos pasos:

1. Inicia sesión en la consola de AWS Management
2. Selecciona la región donde deseas habilitar las zonas de Wavelength
3. Ve a la sección de "Zonas" y selecciona "Wavelength Zones"
4. Selecciona la zona de Wavelength que deseas habilitar y sigue las instrucciones para completar el proceso

### Disponibilidad y Límites de las Zonas {id="disponibilidad-y-l%C3%ADmites-de-las-zonas"}

Es importante conocer la disponibilidad y los límites de las zonas de Wavelength en diferentes regiones. AWS Wavelength está disponible en varias regiones, pero no en todas. Además, hay límites en cuanto al número de zonas que se pueden habilitar y los recursos asignados a cada zona.

Consulta la documentación de AWS Wavelength para más información sobre la disponibilidad y los límites en diferentes regiones.

## Wavelength Zone Architecture {id="wavelength-zone-architecture"}

La arquitectura de la zona de Wavelength se basa en la infraestructura y los componentes que permiten la entrega de aplicaciones con latencia ultra baja a dispositivos móviles y usuarios finales. A continuación, se describen los componentes clave de una zona de Wavelength, la conectividad con las regiones de AWS y las consideraciones de red.

### Componentes de Infraestructura {id="componentes-de-infraestructura"}

Una zona de Wavelength incluye varios componentes clave que trabajan juntos para proporcionar una infraestructura de aplicación segura y escalable. Estos componentes son:

- **Amazon VPC**: una red virtual privada que se extiende a una zona de Wavelength, permitiendo la comunicación segura entre los recursos de la zona y las regiones de AWS.
- **Subredes**: se crean en la zona de Wavelength y se asocian con la VPC, permitiendo la segmentación de la red y la aplicación de políticas de seguridad.
- **Puertas de enlace de carrier**: proporcionan conectividad entre la zona de Wavelength y la red del proveedor de servicios de telecomunicaciones.
- **Direcciones IP de carrier**: se asignan a las instancias de EC2 y otros recursos en la zona de Wavelength, permitiendo la comunicación con la red del proveedor de servicios de telecomunicaciones.

### Conectividad con Regiones de AWS {id="conectividad-con-regiones-de-aws"}

Las zonas de Wavelength se conectan a las regiones de AWS a través de una conexión de red segura y escalable. Esta conexión permite la transferencia de datos entre la zona de Wavelength y las regiones de AWS, facilitando la [integración con otros servicios de AWS](/blog/servicios-de-aws-para-inteligencia-artificial/) y el uso de recursos compartidos.

La conectividad se logra mediante una combinación de tecnologías de red, incluyendo VPN, Direct Connect y peering. Esto garantiza una conexión segura y escalable que cumple con los requisitos de latencia y ancho de banda de las aplicaciones.

### Configuración de Red {id="configuraci%C3%B3n-de-red"}

La configuración de red en una zona de Wavelength implica la creación de una VPC, subredes, puertas de enlace de carrier y direcciones IP de carrier. A continuación, se presentan los pasos generales para configurar la red en una zona de Wavelength:

1\. **Crear una VPC** en la región de AWS correspondiente.

2\. **Crear subredes** en la zona de Wavelength y asociarlas con la VPC.

3\. **Configurar las puertas de enlace de carrier** y asignar direcciones IP de carrier a las instancias de EC2 y otros recursos.

4\. **Configurar las tablas de rutas y las políticas de seguridad** para garantizar la comunicación segura entre la zona de Wavelength y las regiones de AWS.

Es importante seguir las [mejores prácticas de seguridad y red](/blog/aws-seguridad-mejores-practicas/) para garantizar la integridad y confidencialidad de los datos en la zona de Wavelength.

## Deploying Resources in Wavelength Zones {id="deploying-resources-in-wavelength-zones"}

La implementación de recursos en zonas de Wavelength implica varios pasos clave para garantizar una configuración segura y escalable. A continuación, se presentan los pasos para crear y configurar subredes, lanzar instancias de EC2 y asociar direcciones IP de carrier.

### Creating Subnets {id="creating-subnets"}

La creación de subredes en zonas de Wavelength es un paso crucial para la implementación de recursos. Para crear una subnet, siga los siguientes pasos:

1. Inicie sesión en la consola de AWS Management y seleccione la región correspondiente.
2. Vaya a la sección de VPC y seleccione "Subredes" en el menú lateral.
3. Haga clic en "Crear subnet" y seleccione la zona de Wavelength correspondiente.
4. Asigne una dirección IP de carrier a la subnet y configure las opciones de seguridad según sea necesario.
5. Haga clic en "Crear subnet" para completar el proceso.

### Launching EC2 Instances {id="launching-ec2-instances"}

Para lanzar instancias de EC2 en zonas de Wavelength, siga los siguientes pasos:

1. Inicie sesión en la consola de AWS Management y seleccione la región correspondiente.
2. Vaya a la sección de EC2 y seleccione "Instancias" en el menú lateral.
3. Haga clic en "Lanzar instancia" y seleccione la imagen de máquina virtual correspondiente.
4. Seleccione la zona de Wavelength correspondiente y configure las opciones de seguridad según sea necesario.
5. Haga clic en "Lanzar instancia" para completar el proceso.

### Associating Carrier IP Addresses {id="associating-carrier-ip-addresses"}

Para asociar direcciones IP de carrier a instancias de EC2, siga los siguientes pasos:

1. Inicie sesión en la consola de AWS Management y seleccione la región correspondiente.
2. Vaya a la sección de EC2 y seleccione "Instancias" en el menú lateral.
3. Seleccione la instancia de EC2 correspondiente y haga clic en "Acciones" y luego en "Asociar dirección IP de carrier".
4. Seleccione la dirección IP de carrier correspondiente y configure las opciones de seguridad según sea necesario.
5. Haga clic en "Asociar" para completar el proceso.

### Load Balancing Options {id="load-balancing-options"}

Las opciones de balanceo de carga en zonas de Wavelength incluyen Application Load Balancers (ALB) y Network Load Balancers (NLB). Los ALB se utilizan para balancear la carga de aplicaciones web y móviles, mientras que los NLB se utilizan para balancear la carga de aplicaciones que requieren una latencia ultra baja.

Para configurar un ALB, siga los siguientes pasos:

1. Inicie sesión en la consola de AWS Management y seleccione la región correspondiente.
2. Vaya a la sección de EC2 y seleccione "Load Balancers" en el menú lateral.
3. Haga clic en "Crear load balancer" y seleccione "Application Load Balancer".
4. Configure las opciones de seguridad y seleccione la zona de Wavelength correspondiente.
5. Haga clic en "Crear load balancer" para completar el proceso.

Es importante seguir las mejores prácticas de seguridad y red para garantizar la integridad y confidencialidad de los datos en la zona de Wavelength.

## Integrating with Other AWS Services {id="integrating-with-other-aws-services"}

AWS Wavelength se conecta con otros servicios de AWS, permitiendo a los desarrolladores desplegar y gestionar aplicaciones en zonas de Wavelength. Esto facilita el acceso a servicios como Amazon EC2, Amazon S3 y Amazon DynamoDB a través de la red local, ideal para aplicaciones de baja latencia.

### Aplicaciones Contenerizadas {id="aplicaciones-contenerizadas"}

Despliega aplicaciones contenerizadas usando Amazon EKS y Amazon ECS en zonas de Wavelength. Esto es útil para aplicaciones que necesitan una respuesta rápida.

### Computación Sin Servidor {id="computaci%C3%B3n-sin-servidor"}

Usa AWS Lambda para computación sin servidor en zonas de Wavelength. Esto permite que las aplicaciones se escalen automáticamente y solo pagues por el tiempo de ejecución de la función.

### Inferencia de Aprendizaje Automático {id="inferencia-de-aprendizaje-autom%C3%A1tico"}

Despliega modelos de aprendizaje automático con Amazon SageMaker en zonas de Wavelength. Esto es útil para aplicaciones que requieren inferencia en tiempo real.

### Entrega de Contenido {id="entrega-de-contenido"}

Usa [Amazon CloudFront](https://aws.amazon.com/cloudfront/) para la entrega de contenido en zonas de Wavelength. Esto permite entregar contenido de manera rápida y segura a los usuarios finales, sin importar su ubicación.

Al integrar AWS Wavelength con otros servicios de AWS, los desarrolladores pueden crear aplicaciones que se benefician de la baja latencia, la escalabilidad y la seguridad de la computación en el borde.

## Alta Disponibilidad y Tolerancia a Fallos {id="alta-disponibilidad-y-tolerancia-a-fallos"}

La alta disponibilidad y la tolerancia a fallos son esenciales para las aplicaciones en zonas de Wavelength. Aquí te mostramos cómo implementarlas.

### Despliegues en Múltiples Zonas {id="despliegues-en-m%C3%BAltiples-zonas"}

Para asegurar alta disponibilidad, despliega recursos en varias zonas de Wavelength. Esto garantiza que si una zona falla, los recursos en otras zonas seguirán funcionando.

### Failover y Enrutamiento DNS {id="failover-y-enrutamiento-dns"}

Para la tolerancia a fallos, usa estrategias de failover y enrutamiento DNS. El enrutamiento DNS redirige el tráfico a una zona alternativa si la principal falla. Las técnicas de failover aseguran que los recursos se muevan automáticamente a una zona alternativa en caso de fallo.

### Monitoreo y Registro {id="monitoreo-y-registro"}

El monitoreo y registro son cruciales para mantener la alta disponibilidad y la tolerancia a fallos. Utiliza herramientas como [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/), [AWS X-Ray](https://aws.amazon.com/xray/) y [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) para supervisar el estado de los recursos y detectar problemas.

| Estrategia | Descripción |
| --- | --- |
| **Despliegues en Múltiples Zonas** | Despliega recursos en varias zonas para asegurar que sigan funcionando si una zona falla. |
| **Failover y Enrutamiento DNS** | Redirige el tráfico a una zona alternativa y mueve recursos automáticamente en caso de fallo. |
| **Monitoreo y Registro** | Usa herramientas para supervisar y detectar problemas en los recursos. |

En resumen, para asegurar la alta disponibilidad y la tolerancia a fallos en zonas de Wavelength, despliega recursos en múltiples zonas, implementa estrategias de failover y enrutamiento DNS, y utiliza herramientas de monitoreo y registro.

## Consideraciones de Seguridad {id="consideraciones-de-seguridad"}

### Seguridad de la Red {id="seguridad-de-la-red"}

La seguridad de la red es importante en AWS Wavelength. Debes configurar grupos de seguridad y listas de control de acceso a la red (NACLs) para controlar el tráfico. Los grupos de seguridad actúan como un firewall virtual y controlan el tráfico a nivel de instancia, mientras que las NACLs lo hacen a nivel de subred.

Para configurar la seguridad de la red:

- Crea grupos de seguridad y NACLs según tus necesidades.
- Por ejemplo, un grupo de seguridad puede permitir tráfico de entrada en el puerto 80 para una aplicación web y otro grupo puede permitir tráfico de salida en el puerto 443 para una base de datos.

### Gestión de Acceso {id="gesti%C3%B3n-de-acceso"}

La gestión de acceso es clave para la seguridad en AWS Wavelength. Debes configurar roles y políticas de IAM para controlar quién tiene acceso a tus recursos y qué acciones pueden realizar.

Para configurar la gestión de acceso:

- Crea roles de IAM según tus necesidades.
- Por ejemplo, un rol para un desarrollador puede permitir lanzar instancias EC2 y otro rol para un administrador puede permitir acceder a la consola de administración de AWS.

### Encriptación de Datos y Cumplimiento {id="encriptaci%C3%B3n-de-datos-y-cumplimiento"}

La encriptación de datos y el cumplimiento con los estándares de seguridad son importantes en AWS Wavelength. Asegúrate de que tus datos estén encriptados en tránsito y en reposo, y que cumplas con los estándares de seguridad relevantes, como HIPAA, ISO y PCI DSS.

Para cumplir con los estándares de seguridad:

- Configura la encriptación de datos en tus recursos, como instancias EC2 y bases de datos.
- Implementa políticas de seguridad y procedimientos para garantizar el cumplimiento con los estándares de seguridad.

| Estándar de seguridad | Descripción |
| --- | --- |
| **HIPAA** | Estándar de seguridad para la industria de la salud |
| **ISO** | Estándar de seguridad para la gestión de la seguridad de la información |
| **PCI DSS** | Estándar de seguridad para la industria de pagos con tarjeta de crédito |

Para asegurar la seguridad en AWS Wavelength, configura la seguridad de la red, la gestión de acceso y la encriptación de datos, y cumple con los estándares de seguridad relevantes.

## Cost Optimization {id="cost-optimization"}

La optimización de costos es importante al desplegar recursos en zonas de Wavelength. A continuación, se presentan los factores de costo involucrados y estrategias para optimizarlos.

### Factores de Costo {id="factores-de-costo"}

Al desplegar recursos en zonas de Wavelength, considera los siguientes factores de costo:

- **Tipo de instancia**: las instancias de EC2 en Wavelength Zones tienen un costo diferente al de las instancias en regiones de AWS.
- **Almacenamiento**: el costo del almacenamiento en Wavelength Zones es diferente al de las regiones de AWS.
- **Transferencia de datos**: la transferencia de datos entre Wavelength Zones y regiones de AWS incurre en costos adicionales.

### Estrategias de Optimización de Costos {id="estrategias-de-optimizaci%C3%B3n-de-costos"}

Para optimizar los costos en Wavelength Zones, se recomiendan las siguientes estrategias:

- **Seleccione instancias adecuadas**: elija instancias que se ajusten a sus necesidades de recursos y presupuesto.
- **Implemente escalado**: configure su aplicación para escalar según sea necesario, lo que ayudará a reducir los costos.
- **Utilice Instance Savings Plan**: los planes de ahorro de instancias permiten ahorrar hasta un 72% en comparación con los precios de On-Demand.
- **Monitoree y optimice su uso de recursos**: utilice herramientas como [AWS Cost Explorer](/blog/analisis-de-costos-de-aws-con-cost-explorer/) y AWS CloudWatch para monitorear y optimizar su uso de recursos.

Al implementar estas estrategias, puede reducir significativamente los costos de desplegar recursos en zonas de Wavelength.

## Best Practices and Recommendations {id="best-practices-and-recommendations"}

Para aprovechar al máximo las zonas de Wavelength, sigue estas prácticas y recomendaciones para la arquitectura de aplicaciones, la optimización del rendimiento y la observabilidad.

### Application Architecture {id="application-architecture"}

Al diseñar aplicaciones para zonas de Wavelength, considera la latencia y el ancho de banda. Algunas recomendaciones son:

- Usa patrones de diseño que minimicen la latencia, como microservicios o arquitectura de eventos.
- Ejecuta aplicaciones en la región más cercana a los usuarios finales.
- Utiliza tecnologías de edge computing para reducir la latencia.

### Performance Optimization {id="performance-optimization"}

Para optimizar el rendimiento en zonas de Wavelength, ten en cuenta la configuración de la instancia, el almacenamiento y la transferencia de datos. Algunas recomendaciones son:

- Elige instancias que se ajusten a tus necesidades de recursos y presupuesto.
- Implementa escalado para ajustar la capacidad según sea necesario.
- Usa Instance Savings Plan para ahorrar hasta un 72% en comparación con los precios de On-Demand.
- Monitorea y optimiza el uso de recursos con herramientas como AWS Cost Explorer y AWS CloudWatch.

### Monitoring and Observability {id="monitoring-and-observability"}

Para mantener la visibilidad en el rendimiento y la salud de las aplicaciones en zonas de Wavelength, implementa prácticas de monitoreo y observabilidad efectivas. Algunas recomendaciones son:

- Usa herramientas de monitoreo como AWS CloudWatch y AWS X-Ray para recopilar y analizar datos de rendimiento.
- Implementa alertas y notificaciones para detectar problemas de rendimiento y errores.
- Utiliza métricas y dashboards personalizados para visualizar el rendimiento y la salud de las aplicaciones.
- Realiza pruebas y simulaciones para evaluar el rendimiento y la escalabilidad de las aplicaciones.

## Conclusion and Next Steps {id="conclusion-and-next-steps"}

En este artículo, hemos cubierto los conceptos clave de AWS Wavelength, desde su arquitectura hasta su despliegue y seguridad. Hemos visto cómo las Wavelength Zones pueden reducir la latencia y mejorar el rendimiento de aplicaciones que requieren baja latencia o resiliencia en el borde.

### Puntos Clave {id="puntos-clave"}

- AWS Wavelength permite a los desarrolladores crear aplicaciones con baja latencia para dispositivos móviles y usuarios finales.
- Las Wavelength Zones son despliegues de infraestructura de AWS dentro de los centros de datos de los proveedores de servicios de telecomunicaciones en la red 5G.
- Los desarrolladores pueden usar Wavelength Zones para reducir la latencia y mejorar el rendimiento de aplicaciones que requieren baja latencia o resiliencia en el borde.

### Recursos Adicionales {id="recursos-adicionales"}

- Para más información sobre AWS Wavelength, visita la [documentación oficial de AWS](https://docs.aws.amazon.com/wavelength/).
- Consulta los recursos del [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) para aprender sobre la arquitectura de aplicaciones seguras y escalables.
- Explora los recursos de [AWS Training and Certification](https://aws.amazon.com/training/) para obtener más información sobre capacitación y certificación en AWS.

Esperamos que esta guía te haya sido útil. ¡Sigue aprendiendo sobre AWS Wavelength y cómo puede mejorar el rendimiento de tus aplicaciones!

## FAQs {id="faqs"}

### ¿Qué es la zona de longitud de onda en AWS? {id="%C2%BFqu%C3%A9-es-la-zona-de-longitud-de-onda-en-aws%3F"}

Las zonas de longitud de onda son despliegues de infraestructura de AWS dentro de los centros de datos de los proveedores de servicios de telecomunicaciones en la red 5G. Esto permite que el tráfico de la aplicación llegue a los servidores sin salir de la red del proveedor de servicios móviles.

### ¿Cómo utilizar AWS Wavelength? {id="%C2%BFc%C3%B3mo-utilizar-aws-wavelength%3F"}

Para utilizar AWS Wavelength, sigue estos pasos:

1. Configura y accede a tu cuenta de AWS.
2. Selecciona la región que admite tu zona de longitud de onda.
3. En la consola de Amazon EC2, selecciona "Zonas" en la configuración de la cuenta.

### ¿Cuál es el caso de uso principal para AWS Wavelength? {id="%C2%BFcu%C3%A1l-es-el-caso-de-uso-principal-para-aws-wavelength%3F"}

AWS Wavelength se utiliza para soluciones de baja latencia en casos como IoT, producción de medios en vivo y automatización industrial.

### ¿Qué es la zona de AWS Wavelength? {id="%C2%BFqu%C3%A9-es-la-zona-de-aws-wavelength%3F"}

Las zonas de Wavelength son despliegues de infraestructura de AWS dentro de las redes 5G de los proveedores de servicios de telecomunicaciones. Esto permite que el tráfico de la aplicación desde dispositivos 5G llegue a los servidores sin salir de la red del proveedor de servicios móviles.

## Related posts

- [Arquitecturas de Alta Disponibilidad en AWS](/blog/arquitecturas-de-alta-disponibilidad-en-aws/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Arquitecturas Multi-Región en AWS](/blog/arquitecturas-multi-region-en-aws/)
- [AWS Wavelength: Guía de Escalabilidad y Optimización](/blog/aws-wavelength-guia-de-escalabilidad-y-optimizacion/)
