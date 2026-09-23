+++
url = "/blog/aws-x-ray-herramientas-de-depuracion-y-rastreo-distribuido/"
title = "AWS X-Ray: Herramientas de Depuración y Rastreo Distribuido"
description = "Descubre cómo AWS X-Ray mejora el rendimiento de aplicaciones distribuidas a través del análisis de solicitudes y la depuración en la nube."
date = "2024-05-07T05:49:02.026000+00:00"
lastmod = "2024-05-08"
image = "/assets/blog/2f81887ad0ca1683bc24fbf19c99b40ab089072d22d258f4b63f25be86f889ad.jpg"
archive_order = 91

[[related]]
title = "Características y Beneficios de AWS IoT Device Defender"
url = "/blog/caracteristicas-y-beneficios-de-aws-iot-device-defender/"
image = "/assets/blog/64ba25d52c7b46f1df3dfd5e0db4edcdf5ef3e27f44661f49b3fce0af868c15d.jpg"

[[related]]
title = "Patrón Strangler Fig en AWS: Migrar a Microservicios"
url = "/blog/patron-strangler-fig-en-aws-migrar-a-microservicios/"
image = "/assets/blog/a4bd2fc033fb9605dec915d6410441d9296cd9726c7a608b69761f321f5c46e8.jpg"

[[related]]
title = "Servicios de AWS para Inteligencia Artificial"
url = "/blog/servicios-de-aws-para-inteligencia-artificial/"
image = "/assets/blog/54201ee89ce3b648eb0ec01110eb7efa6535943aadeddaccabbe8ae4006effc0.jpg"
+++

[AWS X-Ray](https://aws.amazon.com/xray/) es una herramienta de análisis y depuración de [aplicaciones distribuidas en la nube](/blog/cloud-computing-en-espanol-fundamentos-basicos/). Permite rastrear solicitudes, identificar cuellos de botella y resolver problemas de rendimiento en [aplicaciones basadas en microservicios](/blog/microservicios-en-aws-utilizando-contenedores/). Algunas de sus características clave son:

- **Análisis de solicitudes:** Proporciona una visión detallada de cómo se ejecutan las solicitudes en tu aplicación.
- **Identificación de problemas:** Ayuda a identificar la causa raíz de los problemas de rendimiento y errores.
- **Depuración de aplicaciones:** Permite depurar aplicaciones distribuidas en producción.
- **Soporte para microservicios:** Compatible con aplicaciones construidas utilizando una arquitectura de microservicios.

Mediante el uso de segmentos, subsegmentos, rastreo y muestreo, X-Ray recopila información detallada sobre las solicitudes y transacciones en tu aplicación. Esto te permite:

| Beneficio | Descripción |
| --- | --- |
| Identificar cuellos de botella | Identificar rápidamente los cuellos de botella en la aplicación y optimizar para mejorar el rendimiento. |
| Analizar dependencias | Analizar la relación entre los servicios y cómo se comunican entre sí para identificar los problemas de rendimiento. |
| Mejorar el rendimiento | Mejorar el rendimiento de la aplicación mediante la identificación y resolución de problemas de rendimiento. |

[AWS](https://aws.amazon.com/) X-Ray es una herramienta poderosa para depurar y rastrear aplicaciones distribuidas en la nube, lo que te permite garantizar la fiabilidad, escalabilidad y rendimiento de tus aplicaciones.

## Términos clave en [AWS X-Ray](https://aws.amazon.com/xray/) {id="t%C3%A9rminos-clave-en-aws-x-ray"}

![AWS X-Ray](/assets/blog/0602324681861f885dc45224243072175ebab1f2e3cd7754c9e877cd71bf615e.jpg)

En AWS X-Ray, existen varios términos clave que debes entender para aprovechar al máximo sus características de depuración y rastreo distribuido. A continuación, se presentan algunos de los términos más importantes:

### Segmentos (Segments) {id="segmentos-(segments)"}

Un segmento es una unidad básica de datos que se recopila en AWS X-Ray. Representa una solicitud o una transacción que se realiza en tu aplicación.

### Subsegmentos (Subsegments) {id="subsegmentos-(subsegments)"}

Un subsegmento es una parte de un segmento que se utiliza para recopilar información detallada sobre una solicitud específica.

### Rastreo (Tracing) {id="rastreo-(tracing)"}

El rastreo es el proceso de recopilar información sobre las solicitudes y las transacciones que se realizan en tu aplicación.

### Muestreo (Sampling) {id="muestreo-(sampling)"}

El muestreo es un proceso que se utiliza en AWS X-Ray para recopilar información sobre las solicitudes y las transacciones.

| Término | Descripción |
| --- | --- |
| Segmento | Unidad básica de datos que representa una solicitud o transacción |
| Subsegmento | Parte de un segmento que recopila información detallada sobre una solicitud específica |
| Rastreo | Proceso de recopilar información sobre solicitudes y transacciones |
| Muestreo | Proceso de recopilar información sobre solicitudes y transacciones para reducir la cantidad de datos |

En resumen, los segmentos, subsegmentos, rastreo y muestreo son términos clave en AWS X-Ray que te permiten recopilar información detallada sobre las solicitudes y las transacciones en tu aplicación y identificar problemas y errores de rendimiento.

## Configuración de X-Ray {id="configuraci%C3%B3n-de-x-ray"}

Configurar X-Ray en tus servicios de AWS es un proceso sencillo que implica varios pasos. A continuación, se presentan los pasos generales para configurar X-Ray en diferentes servicios de AWS.

### Configuración de X-Ray en [Lambda](https://aws.amazon.com/lambda/) {id="configuraci%C3%B3n-de-x-ray-en-lambda"}

![Lambda](/assets/blog/c0eb5d69184d1120b29c2a25d100688f362e5bae6d880f981b39cc2148e3b6a3.jpg)

Para configurar X-Ray en [AWS Lambda](/blog/desarrollando-aplicaciones-con-aws-lambda/), debes habilitar el seguimiento de X-Ray en la función de Lambda. Puedes hacer esto agregando la siguiente línea de código a tu función de Lambda:

```
import aws_xray_sdk_core
```

Luego, debes inicializar el cliente de X-Ray en tu función de Lambda:

```
xray_client = aws_xray_sdk_core.xray_recorder
```

Finalmente, debes configurar el cliente de X-Ray para capturar las solicitudes y las transacciones en tu función de Lambda.

### Configuración de X-Ray en [ECS](https://aws.amazon.com/ecs/) y [EKS](https://aws.amazon.com/eks/) {id="configuraci%C3%B3n-de-x-ray-en-ecs-y-eks"}

![ECS](/assets/blog/9a1eaadb0b70caa95e1f48e99cd172b3a3a75a0a1c56348fcc99ee1ca939c75a.jpg)

Para configurar X-Ray en ECS y EKS, debes instalar el demonio de X-Ray en tus contenedores. El demonio de X-Ray se encarga de recopilar información sobre las solicitudes y las transacciones en tus contenedores.

Puedes instalar el demonio de X-Ray en tus contenedores agregando la siguiente línea de código a tu archivo de Docker:

```
RUN pip install aws-xray-sdk
```

Luego, debes configurar el demonio de X-Ray para capturar las solicitudes y las transacciones en tus contenedores.

### Configuración de X-Ray en [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) {id="configuraci%C3%B3n-de-x-ray-en-elastic-beanstalk"}

![Elastic Beanstalk](/assets/blog/dae9ccc81b3f7d22e6442d5ab0720e1bcb86f962b8adef160db956a56d4c2fa1.jpg)

Para configurar X-Ray en Elastic Beanstalk, debes habilitar el seguimiento de X-Ray en la configuración de tu aplicación. Puedes hacer esto agregando la siguiente línea de código a tu archivo de configuración de Elastic Beanstalk:

```
xray:
  enabled: true
```

Luego, debes configurar el cliente de X-Ray para capturar las solicitudes y las transacciones en tu aplicación.

**Resumen de la configuración de X-Ray**

| Servicio de AWS | Paso 1 | Paso 2 | Paso 3 |
| --- | --- | --- | --- |
| Lambda | Agregar `import aws_xray_sdk_core` | Inicializar el cliente de X-Ray | Configurar el cliente de X-Ray |
| ECS y EKS | Instalar el demonio de X-Ray | Configurar el demonio de X-Ray | Capturar solicitudes y transacciones |
| Elastic Beanstalk | Habilitar el seguimiento de X-Ray | Configurar el cliente de X-Ray | Capturar solicitudes y transacciones |

En resumen, configurar X-Ray en tus servicios de AWS implica habilitar el seguimiento de X-Ray en la función de Lambda, instalar el demonio de X-Ray en tus contenedores ECS y EKS, y habilitar el seguimiento de X-Ray en la configuración de tu aplicación en Elastic Beanstalk.

## Instrumentar tu aplicación {id="instrumentar-tu-aplicaci%C3%B3n"}

Instrumentar tu aplicación con AWS X-Ray es un proceso sencillo que implica agregar código a tu aplicación para recopilar información de seguimiento. A continuación, se presentan los pasos generales para instrumentar tu aplicación con AWS X-Ray.

### Instrumentar con [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) {id="instrumentar-con-java"}

![Java](/assets/blog/b4d381414286a952054ce1d6c8f0ed541afc01f7f39cac897b461dce0103223a.jpg)

Para instrumentar tu aplicación Java con AWS X-Ray, debes agregar la dependencia del SDK de X-Ray a tu archivo `pom.xml`:

| Dependencia | Versión |
| --- | --- |
| aws-xray-recorder-sdk-core | *version* |

Luego, debes agregar un filtro de servlet a tu archivo `web.xml` para capturar solicitudes HTTP entrantes:

| Filtro | Clase |
| --- | --- |
| AWSXRayServletFilter | com.amazonaws.xray.javax.servlet.AWSXRayServletFilter |

### Instrumentar con [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) {id="instrumentar-con-python"}

![Python](/assets/blog/8ecbcd1d468ab3124527d863ad765457e5370f266e9a24e7f344cdd79029f132.jpg)

Para instrumentar tu aplicación Python con AWS X-Ray, debes instalar el SDK de X-Ray con pip:

```
pip install aws-xray-sdk
```

Luego, debes agregar middleware a tu código para capturar solicitudes HTTP entrantes:

```
from aws_xray_sdk.core import xray_recorder

xray_recorder.configure(service='MyApp')
```

### Instrumentar con [Node.js](https://en.wikipedia.org/wiki/Node.js) {id="instrumentar-con-node.js"}

![Node.js](/assets/blog/7f43979f8368035b9decba2cfe09646a7e3cc83d8f76fec063e82019af036dbe.jpg)

Para instrumentar tu aplicación Node.js con AWS X-Ray, debes agregar el SDK de X-Ray a tu archivo `package.json`:

```
"dependencies": {
  "aws-xray-sdk": "^2.3.0"
}
```

Luego, debes inicializar el cliente de X-Ray en tu código:

```
const AWSXRay = require('aws-xray-sdk');

AWSXRay.setDaemonAddress('host:port');
app.use(AWSXRay.express.openSegment('MyApp'));
```

En resumen, instrumentar tu aplicación con AWS X-Ray implica agregar código a tu aplicación para recopilar información de seguimiento. Los pasos específicos variarán según el lenguaje de programación que estés utilizando.

**Recursos adicionales**

- [Documentación de AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)
- [SDK de AWS X-Ray para Java](https://github.com/aws/aws-xray-sdk-java)
- [SDK de AWS X-Ray para Python](https://github.com/aws/aws-xray-sdk-python)
- SDK de AWS X-Ray para Node.js

## Análisis de mapas de servicios y trazas {id="an%C3%A1lisis-de-mapas-de-servicios-y-trazas"}

El análisis de mapas de servicios y trazas es una parte fundamental de AWS X-Ray. La consola de X-Ray proporciona una interfaz fácil de usar para entender y navegar por mapas de servicios y trazas, lo que te permite analizar el rendimiento de tus aplicaciones distribuidas.

### Análisis de mapas de servicios {id="an%C3%A1lisis-de-mapas-de-servicios"}

Un mapa de servicios es una representación visual de las conexiones entre servicios en tu aplicación. La consola de X-Ray te permite crear un mapa de servicios que muestra la relación entre los servicios y cómo se comunican entre sí.

**Ventajas del análisis de mapas de servicios**

- Identificar cuellos de botella y problemas de rendimiento en tu aplicación
- Entender cómo se comunican los servicios entre sí
- Optimizar el rendimiento de tu aplicación

### Análisis de trazas {id="an%C3%A1lisis-de-trazas"}

Una traza es una representación de una solicitud individual que se envía a través de tu aplicación. La consola de X-Ray te permite analizar trazas individuales para entender cómo se procesan las solicitudes y dónde se producen errores o problemas de rendimiento.

**Ventajas del análisis de trazas**

- Identificar problemas específicos en tu aplicación
- Entender cómo se procesan las solicitudes
- Optimizar el rendimiento de tu aplicación

### Filtrado y vistas de detalles {id="filtrado-y-vistas-de-detalles"}

La consola de X-Ray proporciona filtrado y vistas de detalles para ayudarte a analizar mapas de servicios y trazas.

**Filtrado**

- Filtrar trazas por errores, respuesta lenta o otros criterios
- Enfocarte en problemas específicos en tu aplicación

**Vistas de detalles**

- Ver información adicional sobre una traza individual
- Entender la ruta de la solicitud, los servicios involucrados y los tiempos de respuesta

En resumen, el análisis de mapas de servicios y trazas es una herramienta poderosa para entender y optimizar el rendimiento de tus aplicaciones distribuidas con AWS X-Ray.

## Mejores prácticas para X-Ray {id="mejores-pr%C3%A1cticas-para-x-ray"}

Para obtener el máximo provecho de AWS X-Ray, es importante seguir las mejores prácticas para configurar y utilizar esta herramienta de depuración y rastreo distribuido. A continuación, se presentan algunas recomendaciones clave para configurar reglas de muestreo, instrumentaciones personalizadas y tratar con código de terceros.

### Configuración de reglas de muestreo {id="configuraci%C3%B3n-de-reglas-de-muestreo"}

La configuración de reglas de muestreo es crucial para recopilar datos de traza relevantes y evitar la sobrecarga de datos. Debe configurar reglas de muestreo que se ajusten a las necesidades específicas de su aplicación.

| **Recomendación** | **Descripción** |
| --- | --- |
| Configurar reglas de muestreo personalizadas | Configurar reglas de muestreo que se ajusten a las necesidades específicas de su aplicación |
| Establecer umbrales de tiempo de respuesta | Configurar reglas de muestreo para recopilar datos de traza solo para solicitudes que superan un umbral de tiempo de respuesta determinado |
| Filtrar solicitudes con errores | Configurar reglas de muestreo para recopilar datos de traza solo para solicitudes que tienen un código de estado de error |

### Instrumentaciones personalizadas {id="instrumentaciones-personalizadas"}

Las instrumentaciones personalizadas permiten recopilar datos de traza adicionales que no se encuentran disponibles a través de la instrumentación automática de AWS X-Ray.

| **Recomendación** | **Descripción** |
| --- | --- |
| Instrumentar manualmente su código | Instrumentar manualmente su código para recopilar datos de traza adicionales relevantes para su aplicación |
| Utilizar bibliotecas y frameworks instrumentados | Utilizar bibliotecas y frameworks instrumentados para recopilar datos de traza adicionales |

### Tratamiento con código de terceros {id="tratamiento-con-c%C3%B3digo-de-terceros"}

Cuando se utiliza código de terceros en su aplicación, es importante asegurarse de que se instrumente correctamente para recopilar datos de traza relevantes.

| **Recomendación** | **Descripción** |
| --- | --- |
| Trabajar con proveedores de código de terceros | Trabajar con proveedores de código de terceros para asegurarse de que se instrumenten sus bibliotecas y frameworks para recopilar datos de traza compatibles con AWS X-Ray |
| Verificar la instrumentación de código de terceros | Verificar la instrumentación de código de terceros para asegurarse de que se recopilen datos de traza relevantes |

### Optimización de X-Ray {id="optimizaci%C3%B3n-de-x-ray"}

Para optimizar el rendimiento de AWS X-Ray, debe asegurarse de que se configuren correctamente las reglas de muestreo y la instrumentación personalizada.

| **Recomendación** | **Descripción** |
| --- | --- |
| Configurar reglas de muestreo eficientes | Configurar reglas de muestreo que se ajusten a las necesidades específicas de su aplicación y minimicen la sobrecarga de datos |
| [Utilizar recursos de AWS X-Ray de manera eficiente](/blog/observabilidad-en-aws-con-amazon-x-ray/) | Utilizar recursos de AWS X-Ray de manera eficiente para minimizar el impacto en el rendimiento de su aplicación |
| Monitorear y ajustar la configuración de X-Ray | Monitorear y ajustar la configuración de X-Ray para asegurarse de que se esté recopilando la cantidad adecuada de datos de traza |

En resumen, siguiendo estas mejores prácticas puede asegurarse de que AWS X-Ray se configure y utilice de manera efectiva para depurar y rastrear su aplicación distribuida.

## Costos y Consideraciones de X-Ray {id="costos-y-consideraciones-de-x-ray"}

Al utilizar AWS X-Ray, es importante considerar los costos asociados con la recopilación y el análisis de trazas. Afortunadamente, AWS X-Ray ofrece un modelo de precios flexible que se adapta a las necesidades específicas de su aplicación.

### Modelo de precios {id="modelo-de-precios"}

El modelo de precios de AWS X-Ray se basa en el número de trazas grabadas, recuperadas y analizadas. El primer 100,000 trazas grabadas cada mes son gratuitas, y luego se cobran $0.000005 por traza grabada adicional. Del mismo modo, el primer 1,000,000 trazas recuperadas o analizadas cada mes son gratuitas, y luego se cobran $0.000005 por traza recuperada o analizada adicional.

### Retención de datos {id="retenci%C3%B3n-de-datos"}

AWS X-Ray almacena los datos de traza durante 30 días sin costo adicional. Después de 30 días, los datos de traza se eliminan automáticamente. Sin embargo, puede exportar los datos de traza a Amazon S3 o a otros servicios de almacenamiento para su análisis posterior.

### Consideraciones para presupuestar {id="consideraciones-para-presupuestar"}

Al presupuestar para AWS X-Ray, es importante considerar el número de trazas que se esperan grabar, recuperar y analizar cada mes. También es importante considerar la frecuencia de muestreo y la cantidad de datos de traza que se necesitan para depurar y rastrear su aplicación.

| **Recomendación** | **Descripción** |
| --- | --- |
| Establecer un presupuesto para AWS X-Ray | Establecer un presupuesto para AWS X-Ray basado en el número de trazas que se esperan grabar, recuperar y analizar cada mes |
| Monitorear y ajustar el gasto | Monitorear y ajustar el gasto en AWS X-Ray según sea necesario para asegurarse de que se esté dentro del presupuesto |
| Utilizar la capa gratuita | Utilizar la capa gratuita de AWS X-Ray para reducir costos y mejorar la eficiencia |

En resumen, AWS X-Ray ofrece un modelo de precios flexible que se adapta a las necesidades específicas de su aplicación. Al considerar los costos asociados con la recopilación y el análisis de trazas, puede presupuestar y planificar de manera efectiva para utilizar AWS X-Ray de manera eficiente y rentable.

## X-Ray en Acción {id="x-ray-en-acci%C3%B3n"}

En este apartado, exploraremos ejemplos prácticos y estudios de casos donde AWS X-Ray ha sido fundamental para resolver problemas de rendimiento y proporcionar insights para la optimización.

### Identificar Problemas de Rendimiento {id="identificar-problemas-de-rendimiento"}

Un ejemplo común es cuando se necesita depurar una aplicación distribuida que tiene problemas de rendimiento. Con AWS X-Ray, podemos rastrear las solicitudes de usuario y analizar la latencia, los errores y la respuesta de cada servicio involucrado. Esto nos permite identificar rápidamente los cuellos de botella y optimizar la aplicación para mejorar el rendimiento.

### Analizar la Dependencia entre Servicios {id="analizar-la-dependencia-entre-servicios"}

Otro ejemplo es cuando se necesita analizar la dependencia entre servicios en una aplicación distribuida. AWS X-Ray nos permite crear un mapa de servicio que muestra la relación entre los servicios y cómo se comunican entre sí. Esto nos permite identificar los servicios que están causando problemas y optimizar la comunicación entre ellos.

### Beneficios de X-Ray {id="beneficios-de-x-ray"}

| **Beneficio** | **Descripción** |
| --- | --- |
| Identificar cuellos de botella | Identificar rápidamente los cuellos de botella en la aplicación y optimizar para mejorar el rendimiento |
| Analizar la dependencia entre servicios | Analizar la relación entre los servicios y cómo se comunican entre sí para identificar los problemas de rendimiento |
| Mejora del rendimiento | Mejora del rendimiento de la aplicación mediante la identificación y resolución de problemas de rendimiento |

En resumen, AWS X-Ray es una herramienta poderosa para depurar y rastrear aplicaciones distribuidas. Con su capacidad para rastrear solicitudes de usuario y analizar la latencia, los errores y la respuesta de cada servicio involucrado, podemos identificar rápidamente los problemas de rendimiento y optimizar la aplicación para mejorar el rendimiento.

## Conclusión {id="conclusi%C3%B3n"}

En resumen, AWS X-Ray es una herramienta poderosa para depurar y rastrear aplicaciones distribuidas en la nube. Con su capacidad para rastrear solicitudes de usuario y analizar la latencia, los errores y la respuesta de cada servicio involucrado, podemos identificar rápidamente los problemas de rendimiento y optimizar la aplicación para mejorar el rendimiento.

### Ventajas de [AWS](https://aws.amazon.com/) X-Ray {id="ventajas-de-aws-x-ray"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

| **Ventaja** | **Descripción** |
| --- | --- |
| Identificar cuellos de botella | Identificar rápidamente los cuellos de botella en la aplicación y optimizar para mejorar el rendimiento |
| Analizar la dependencia entre servicios | Analizar la relación entre los servicios y cómo se comunican entre sí para identificar los problemas de rendimiento |
| Mejora del rendimiento | Mejora del rendimiento de la aplicación mediante la identificación y resolución de problemas de rendimiento |

En este artículo, hemos explorado las características y beneficios clave de AWS X-Ray. También hemos visto ejemplos prácticos de cómo AWS X-Ray puede ser utilizado para resolver problemas de rendimiento y proporcionar insights para la optimización.

En última instancia, la incorporación de AWS X-Ray en los flujos de trabajo de la nube moderna es crucial para garantizar la fiabilidad, escalabilidad y rendimiento de las aplicaciones distribuidas. Al entender cómo funciona AWS X-Ray y cómo puede ser utilizado para mejorar la aplicación, los desarrolladores y los equipos de operaciones pueden trabajar juntos para crear aplicaciones más eficientes y escalables que satisfacen las necesidades de los usuarios.

Esperamos que este artículo haya proporcionado una visión clara y concisa de las capacidades y beneficios de AWS X-Ray, y que haya inspirado a los lectores a explorar más a fondo cómo esta herramienta puede ayudar a mejorar sus aplicaciones distribuidas en la nube.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Qué es X-Ray en [Amazon](https://www.amazon.com/)? {id="%C2%BFqu%C3%A9-es-x-ray-en-amazon%3F"}

![Amazon](/assets/blog/abbe4a67c0929c632517e1eaaad8c6561745658759eec2da25fb0f8a9eca6d82.jpg)

AWS X-Ray es una herramienta que proporciona una visión detallada de cómo se ejecutan las solicitudes en su aplicación, permitiendo identificar y solucionar problemas de rendimiento y errores.

### ¿Qué servicios ofrece AWS X-Ray? {id="%C2%BFqu%C3%A9-servicios-ofrece-aws-x-ray%3F"}

AWS X-Ray ayuda a los desarrolladores a analizar y depurar aplicaciones distribuidas en producción, como aquellas construidas utilizando una arquitectura de microservicios. Con X-Ray, puede entender cómo se están ejecutando su aplicación y los servicios subyacentes para identificar y solucionar la causa raíz de los problemas de rendimiento y errores.

#### Características clave de AWS X-Ray {id="caracter%C3%ADsticas-clave-de-aws-x-ray"}

| Característica | Descripción |
| --- | --- |
| Análisis de solicitudes | X-Ray proporciona una visión detallada de cómo se ejecutan las solicitudes en su aplicación |
| Identificación de problemas | X-Ray ayuda a identificar la causa raíz de los problemas de rendimiento y errores |
| Depuración de aplicaciones | X-Ray permite depurar aplicaciones distribuidas en producción |
| Soporte para microservicios | X-Ray es compatible con aplicaciones construidas utilizando una arquitectura de microservicios |

## Related posts

- [Observabilidad en AWS con Amazon X-Ray](/blog/observabilidad-en-aws-con-amazon-x-ray/)
- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
- [Arquitecturas Multi-Región en AWS](/blog/arquitecturas-multi-region-en-aws/)
- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
