+++
url = "/blog/arquitecturas-dirigidas-por-eventos-en-aws/"
title = "Arquitecturas Dirigidas por Eventos en AWS"
description = "Descubre cómo implementar arquitecturas dirigidas por eventos en AWS para crear sistemas flexibles y escalables. Aprende sobre los beneficios, componentes y mejores prácticas en este completo artículo."
date = "2024-03-19T00:59:24.459000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/1a0df738c1ab9c313bf601447fd31bc7c8f348faf7982d3323d9ebd82f0cfe8e.jpg"
archive_order = 119

[[related]]
title = "Automatización de cumplimiento con AWS Config"
url = "/blog/automatizacion-de-cumplimiento-con-aws-config/"
image = "/assets/blog/887b167cb63dec6854e043dc5d45275a76df14d62e72868fa0871d51c2667146.jpg"

[[related]]
title = "Guía de Eventos AWS Educate 2024"
url = "/blog/guia-de-eventos-aws-educate-2024/"
image = "/assets/blog/835302183289e4165c02383bdd6096d001abc18157be12e3419326dea81b69f5.jpg"

[[related]]
title = "AWS IoT Edge Simulator: Casos de Uso Reales"
url = "/blog/aws-iot-edge-simulator-casos-de-uso-reales/"
image = "/assets/blog/7854091f527530189ba482f03c3ecab7cab7ca1a312e26d7730e079b459901eb.jpg"
+++

Imagina construir aplicaciones flexibles y capaces de crecer rápidamente utilizando AWS. Las arquitecturas dirigidas por eventos (EDA) hacen esto posible, permitiendo que los componentes de tu sistema se comuniquen mediante eventos. Esto facilita la escalabilidad, el procesamiento asíncrono y una rápida adaptación a cambios. Aquí tienes lo esencial que necesitas saber sobre EDA en AWS:

- **Desacoplamiento de componentes:** Permite que los servicios funcionen independientemente.
- **Escalabilidad:** Fácilmente añade más componentes según sea necesario.
- **Resiliencia:** Los fallos en un componente no afectan al sistema completo.
- **Eficiencia de costos:** Paga solo por los recursos que utilizas.

**Servicios clave de AWS para EDA:**

- **Amazon EventBridge:** Gestiona el flujo de eventos entre aplicaciones.
- **Amazon SNS:** Permite la comunicación mediante la publicación y suscripción de mensajes.
- **Amazon SQS:** Ofrece colas de mensajes para almacenar y transferir mensajes.

Con estas herramientas, puedes diseñar sistemas que no solo son robustos y escalables, sino también eficientes en costos y fáciles de mantener.

## ¿Qué es una arquitectura dirigida por eventos (EDA)? {id="%C2%BFqu%C3%A9-es-una-arquitectura-dirigida-por-eventos-(eda)%3F"}

Imagina un sistema donde las partes se comunican solo cuando algo importante sucede, como cuando recibes un mensaje en tu teléfono. Eso es, en esencia, una arquitectura dirigida por eventos. Aquí, las partes de una aplicación se pasan notas (eventos) cuando algo cambia o necesita atención.

Los puntos clave de este sistema son:

- **Desacoplamiento de componentes:** Las partes trabajan por su cuenta, sin necesidad de saber exactamente qué hacen las demás.
- **Comunicación mediante eventos:** Las partes no hablan directamente, solo se envían eventos para comunicarse.
- **Escalabilidad:** Puedes añadir más partes (productores o consumidores de eventos) según sea necesario, sin complicaciones.

### Componentes de una EDA {id="componentes-de-una-eda"}

Los ingredientes principales de este sistema son:

- **Productores de eventos:** Son los que avisan cuando algo pasa, como un sensor que detecta movimiento.
- **Consumidores de eventos:** Son los que reciben el aviso y actúan en consecuencia, como una app que te manda una notificación.
- **Brokers de eventos:** Son como los carteros que llevan los eventos del productor al consumidor. Ejemplos incluyen Amazon SQS y Amazon Kinesis.

### Beneficios de EDA {id="beneficios-de-eda"}

Algunas ventajas de usar este sistema son:

- Puedes hacer crecer el sistema fácilmente, solo añadiendo más partes donde sea necesario.
- Es más resistente a problemas, ya que si una parte falla, no afecta directamente a las demás.
- Facilita el trabajo de desarrollo, ya que puedes enfocarte en una parte a la vez.
- Ayuda a ahorrar, especialmente si usas servicios que cobran por uso, como AWS Lambda.

Este enfoque te ayuda a crear sistemas que son fáciles de expandir, resistentes y no muy caros de mantener usando AWS.

## Implementando EDA en AWS {id="implementando-eda-en-aws"}

### Configuración inicial {id="configuraci%C3%B3n-inicial"}

Para empezar con una arquitectura dirigida por eventos en AWS, es bueno seguir estos pasos básicos:

- Asegúrate de que los servicios de AWS puedan hablar entre sí configurando roles y políticas de IAM. Esto es como darles permiso para compartir información.
- Crea una red privada virtual (VPC) para poner ahí todos tus componentes. Esta red tendrá áreas públicas y privadas.
- Establece reglas de seguridad para que los servicios puedan intercambiar datos sin problemas. Por ejemplo, que Amazon EventBridge pueda enviar información a Lambda.
- Prepara un espacio en S3 para guardar registros y otros datos importantes. No olvides ajustar los permisos para controlar quién puede ver o usar esos datos.

### Patrones comunes de EDA {id="patrones-comunes-de-eda"}

Algunos diseños que mucha gente usa en EDA son:

- **Publicación/Suscripción**: Aquí, quien crea el evento lo manda a un lugar común y los interesados en ese tipo de eventos se conectan para recibirlos. Amazon SNS es un ejemplo.
- **Event Sourcing**: Se guarda un registro de todos los eventos en un orden específico. Esto ayuda a entender cómo ha cambiado la información con el tiempo.
- **Cadena de Responsabilidad**: Es como pasar el evento de mano en mano, donde cada servicio hace algo con él si es necesario, o lo pasa al siguiente.

### Casos de uso {id="casos-de-uso"}

EDA es útil para muchas cosas, como:

- **Procesamiento de pedidos**: Cuando alguien hace un pedido, se pueden crear eventos para diferentes áreas como inventario o envíos, y cada una maneja su parte.
- **CI/CD**: Los cambios en el código pueden iniciar automáticamente procesos para revisar y desplegar ese código.
- **Analytics**: Analizar cómo la gente usa una aplicación a partir de los eventos que genera.
- **IoT**: Los dispositivos conectados envían datos constantemente que se pueden usar para monitoreo o alertas.

En pocas palabras, EDA ayuda a que los sistemas trabajen juntos de manera más eficiente, permitiendo que crezcan y se adapten fácilmente.

## Mejores prácticas para EDA en AWS {id="mejores-pr%C3%A1cticas-para-eda-en-aws"}

### Estrategias de diseño {id="estrategias-de-dise%C3%B1o"}

Al crear una arquitectura dirigida por eventos en AWS, es bueno tener en cuenta estas recomendaciones:

- **Mantén los componentes separados**. Cada parte debe funcionar por su cuenta, usando eventos para comunicarse. Esto hace más fácil aumentar o mejorar el sistema.
- **Define bien los eventos**. Los eventos deben llevar solo la información necesaria para que quienes los reciban puedan actuar. Ni más, ni menos.
- **Prepárate para los fallos**. Piensa en cómo manejar eventos que no se procesen bien, como intentar de nuevo o guardarlos para después. SQS y EventBridge son útiles aquí.
- **Idempotencia**. Esto significa que si un evento se procesa más de una vez, no debería causar problemas. Es una manera de evitar resultados inesperados.
- **Piensa en la seguridad desde el principio**. Usa control de acceso, cifra tus datos, y considera usar redes privadas virtuales.

### Optimización de costos {id="optimizaci%C3%B3n-de-costos"}

Aquí van algunas ideas para no gastar de más:

- Aprovecha SQS, SNS y Kinesis que ajustan su capacidad automáticamente. Así no pagas por más de lo que necesitas.
- Guarda eventos que no necesitas de inmediato en S3 Infrequent Access, que es más barato. Luego, muévelos a Standard cuando los vayas a usar.
- Prefiere usar Lambda en lugar de servidores que estén encendidos todo el tiempo. Con Lambda, pagas solo por lo que usas.
- Revisa y ajusta lo que pagas por capacidad que realmente usas. No gastes en lo que no necesitas.
- Considera si DynamoDB On-Demand te sale más a cuenta que tener una capacidad fija.

### Monitoreo y logs {id="monitoreo-y-logs"}

Es importante mantener un ojo en cómo va todo para solucionar rápido cualquier problema.

- Guarda los registros (logs) de todos los componentes en un lugar común como un bucket S3. CloudWatch puede ayudar con esto.
- Activa alertas en CloudWatch para cosas importantes como errores o retrasos.
- Usa AWS X-Ray para seguir la pista de los eventos a través del sistema.
- CloudWatch Dashboards es bueno para tener una vista general del estado de tu sistema.
- Para un monitoreo más detallado, puedes usar servicios como Managed Prometheus y Managed Grafana.

## Servicios de AWS para implementar EDA {id="servicios-de-aws-para-implementar-eda"}

Vamos a hablar de algunos servicios de AWS que te ayudan a poner en marcha arquitecturas dirigidas por eventos de manera sencilla:

### [Amazon EventBridge](https://aws.amazon.com/eventbridge/) {id="amazon-eventbridge"}

![Amazon EventBridge](/assets/blog/dcba27902d45cd07a719ed1348f6b148f7df97ec59f673cc4f46921ef323c31a.jpg)

Amazon EventBridge es como un sistema de correo para eventos, que te permite enviar y recibir información de eventos en tiempo real entre diferentes aplicaciones y servicios de AWS. Puedes crear tus propios canales de eventos, especificar reglas para dirigir estos eventos a donde necesites, y conectar fácilmente distintas partes de tus aplicaciones.

Aspectos importantes de EventBridge:

- Se conecta con más de 90 servicios de AWS, permitiéndote usarlos como puntos de inicio o de llegada para los eventos.
- Puede enviar eventos en tiempo real a servicios como Lambda, SQS, SNS.
- Permite filtrar eventos para que solo lleguen los que realmente interesan.
- Puedes cambiar la información de los eventos antes de pasarlos a otro servicio.
- Ofrece un registro de eventos para que puedas revisar y arreglar problemas fácilmente.

EventBridge es genial para separar partes de tu aplicación y hacer sistemas que se pueden ajustar y crecer fácilmente.

### [Amazon SNS](https://aws.amazon.com/sns/) {id="amazon-sns"}

![Amazon SNS](/assets/blog/8201b20ff4631e566e1d41df0ab46b2025ad0b5ba6356e5548ea41223803fc6b.jpg)

Amazon Simple Notification Service (SNS) es como un tablón de anuncios para tus aplicaciones y servicios, donde puedes publicar mensajes que otros componentes pueden recibir.

Lo que hace especial a SNS:

- Puede mandar mensajes directamente a dispositivos móviles.
- Se integra con Lambda para que puedas correr código automáticamente cuando lleguen mensajes.
- Te permite filtrar los mensajes para que solo recibas los que te interesan.
- Puede guardar mensajes en SQS para que los manejes cuando puedas.
- Si un mensaje no llega a su destino, lo intentará enviar de nuevo automáticamente.

SNS te ayuda a mantener comunicadas las diferentes partes de tus sistemas sin que estén directamente conectadas.

### [Amazon SQS](https://aws.amazon.com/sqs/) {id="amazon-sqs"}

![Amazon SQS](/assets/blog/b0789df1f55a01d05145a3f4c8f67bda0ced1ae870093c8be06d2f6d6491ef2e.jpg)

Amazon Simple Queue Service (SQS) es como una fila en el banco para tus mensajes. Permite que las partes de tu aplicación se comuniquen dejando y recogiendo mensajes en una cola.

Cosas clave sobre SQS:

- Borra los mensajes automáticamente una vez que se han procesado.
- Ajusta su tamaño automáticamente para manejar más o menos mensajes.
- Los mensajes pueden quedarse en la cola hasta por 14 días.
- Tiene reglas para manejar mensajes que no se procesan a la primera.
- Mantiene tus mensajes seguros mientras esperan ser procesados.

SQS es una herramienta útil para asegurarte de que los mensajes lleguen a donde deben, incluso cuando las cosas están ocupadas, manteniendo tus aplicaciones trabajando suavemente.

## Conclusión {id="conclusi%C3%B3n"}

Usar arquitecturas dirigidas por eventos en AWS es una buena idea para crear sistemas que pueden crecer y cambiar fácilmente sin romperse. Aquí van algunos consejos para hacerlo bien:

**Define bien los eventos**

Los eventos son super importantes. Asegúrate de que cada evento tenga toda la información necesaria para que quien lo reciba sepa qué hacer. Piensa en los eventos como mensajes claros y directos.

**Que cada parte haga lo suyo**

Cada pieza de tu sistema debe trabajar sola, hablando con las demás solo a través de eventos. Esto hace que sea más fácil hacer cambios o arreglos sin problemas.

**Prepara todo desde el inicio**

Asegúrate de que todo esté listo para que las partes de tu sistema puedan comunicarse sin problemas. Esto incluye configurar la red, los permisos y la seguridad. Y no te olvides de activar los registros para poder seguir lo que pasa.

**Usa los servicios de AWS que mejor te convengan**

EventBridge, SNS y SQS son geniales para manejar eventos. AWS Lambda es perfecto para correr código sin preocuparte por servidores. Escoge lo que mejor se adapte a lo que necesitas.

**Mantén un ojo en cómo va todo**

Es clave que sepas cómo está funcionando tu sistema. Usa herramientas como CloudWatch y X-Ray para ver lo que pasa y para estar al tanto de cualquier problema.

**Ahorra dinero pagando solo por lo que usas**

Benefíciate de servicios que se ajustan automáticamente como Lambda y DynamoDB on-demand. Guarda eventos que no uses mucho en S3 Infrequent Access. Y siempre revisa tus gastos para no pagar de más.

Siguiendo estos consejos, podrás crear sistemas que pueden crecer y cambiar fácilmente usando AWS.

## Preguntas relacionadas {id="preguntas-relacionadas"}

### ¿Qué es la arquitectura basada en eventos? {id="%C2%BFqu%C3%A9-es-la-arquitectura-basada-en-eventos%3F"}

La arquitectura basada en eventos se trata de usar señales, o 'eventos', para que diferentes partes de un sistema se comuniquen. Es como si cada parte del sistema tuviera un buzón de correo para enviar y recibir mensajes. Esto es muy útil cuando tienes muchas partes trabajando juntas pero de manera independiente, como en sistemas que usan microservicios. Los eventos ayudan a que el sistema se adapte y crezca fácilmente.

### ¿Qué es arquitectura en AWS? {id="%C2%BFqu%C3%A9-es-arquitectura-en-aws%3F"}

La arquitectura en AWS se refiere a cómo organizas y construyes tus proyectos en la nube de AWS. Piensa en ello como el plan de construcción para una casa, pero para tus aplicaciones y datos en internet. Involucra elegir los servicios de AWS que necesitas, cómo van a interactuar, y cómo mantener todo funcionando de manera eficiente y segura.

### ¿Qué es EDA en sistemas? {id="%C2%BFqu%C3%A9-es-eda-en-sistemas%3F"}

EDA en sistemas significa usar eventos para que diferentes partes de un software se comuniquen entre sí. En lugar de que un pedazo de código llame directamente a otro, envía un mensaje o 'evento' que otro pedazo de código puede recoger y responder. Esto ayuda a que cada parte del sistema trabaje de forma independiente, facilitando cambios y mejoras sin afectar todo el sistema.

## Related posts

- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [Arquitecturas de Alta Disponibilidad en AWS](/blog/arquitecturas-de-alta-disponibilidad-en-aws/)
- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
