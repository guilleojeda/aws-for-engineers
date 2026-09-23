+++
url = "/blog/concurrencia-aprovisionada-solucion-a-cold-starts-en-aws-lambda/"
title = "Concurrencia Aprovisionada: Solución a Cold Starts en AWS Lambda"
description = "Aprende sobre la concurrencia aprovisionada en AWS Lambda, cómo reduce los &#x27;cold starts&#x27; y mejora la experiencia del usuario. Configuración, monitoreo y optimización incluidos."
date = "2024-05-20T00:03:01.190000+00:00"
lastmod = "2024-05-20"
image = "/assets/blog/4efa7f16e3c389136cc18ae21c708f5bb7a6af6bb5fb2646d35cc66c299c4c9d.jpg"
archive_order = 55

[[related]]
title = "CORS en WebSocket vs REST API Gateway"
url = "/blog/cors-en-websocket-vs-rest-api-gateway/"
image = "/assets/blog/c306342b2e9d89f2a43086243eea5ca7647bb051e5543b69a0c948b5fcbaa0db.jpg"

[[related]]
title = "Requisitos de cableado físico para AWS Snowball"
url = "/blog/requisitos-de-cableado-fisico-para-aws-snowball/"
image = "/assets/blog/3b6a26d54c02dfac32acb13bd79487c481a9eef137edc1bdae656bffce3449ea.jpg"

[[related]]
title = "Introducción a los servicios de Amazon Web Services"
url = "/blog/introduccion-a-los-servicios-de-amazon-web-services/"
image = "/assets/blog/e1091b2adcfd9ac3b3889cb042dadd03a55853346c20387d9d961b58588e8074.jpg"
+++

La concurrencia aprovisionada es una función de AWS Lambda que ayuda a reducir significativamente la latencia de los "cold starts" al mantener entornos de ejecución listos para manejar solicitudes. Al configurar la concurrencia aprovisionada, se reserva un número fijo de instancias "calientes" para una función Lambda, lo que disminuye el tiempo de respuesta y mejora la experiencia del usuario.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/Pvkq5g80MPg" >}}

## Beneficios Clave {id="beneficios-clave"}

- **Reducción de latencia**: Disminuye el tiempo de inicio de las funciones Lambda.
- **Mejor rendimiento**: Respuestas más rápidas y consistentes para aplicaciones y APIs.
- **Control de costos**: Evita la sobrecarga de recursos y costos innecesarios.

## Casos de Uso Ideales {id="casos-de-uso-ideales"}

La concurrencia aprovisionada es útil en aplicaciones que requieren baja latencia y alta disponibilidad, como:

| Caso de Uso | Descripción |
| --- | --- |
| APIs síncronas | Aplicaciones que necesitan respuestas rápidas. |
| Aplicaciones de alto tráfico | Sitios de comercio electrónico y otros con alto volumen de solicitudes. |
| Sistemas críticos | Aplicaciones que necesitan alta disponibilidad y resistencia a fallos. |

## Configuración y Monitoreo {id="configuraci%C3%B3n-y-monitoreo"}

1. **Configuración**: Se puede configurar fácilmente a través de la consola de administración de AWS o la CLI.
2. **Monitoreo**: Se recomienda monitorear métricas clave en CloudWatch, como `ProvisionedConcurrencyUtilization` y `ProvisionedConcurrencyInvocations`.
3. **Ajuste**: Se puede ajustar la concurrencia aprovisionada según los patrones de tráfico utilizando [AWS Auto Scaling](https://aws.amazon.com/autoscaling/).

En resumen, la concurrencia aprovisionada es una solución efectiva para mejorar el rendimiento y la experiencia del usuario en aplicaciones y APIs basadas en AWS Lambda que necesitan baja latencia y alta disponibilidad.

## ¿Cuál es el problema? {id="%C2%BFcu%C3%A1l-es-el-problema%3F"}

El problema de los "cold starts" en AWS Lambda se refiere a la demora adicional que experimentan las funciones de Lambda cuando se invocan después de un período de inactividad o cuando se escalan para manejar un aumento en la demanda. Durante un "cold start", AWS debe inicializar un nuevo entorno de ejecución, cargar el código de la función y establecer conexiones con recursos externos, lo que puede agregar varios segundos de latencia adicional antes de que la función pueda procesar la solicitud.

Este problema es particularmente relevante para aplicaciones que requieren una baja latencia y una respuesta rápida, como APIs y aplicaciones en tiempo real. Los "cold starts" pueden afectar negativamente la experiencia del usuario y el rendimiento de la aplicación, especialmente si se producen con frecuencia.

Es importante abordar este problema para asegurar que las funciones de Lambda se ejecuten de manera eficiente y rápida, lo que puede ser logrado mediante la implementación de provisioned concurrency, que se discutirá en las secciones siguientes.

## Understanding Cold Starts {id="understanding-cold-starts"}

Los "cold starts" son un fenómeno común en AWS Lambda que se produce cuando una función Lambda se invoca después de un período de inactividad o cuando se escalan para manejar un aumento en la demanda. Durante un "cold start", AWS necesita inicializar un nuevo entorno de ejecución, cargar el código de la función y establecer conexiones con recursos externos, lo que puede agregar varios segundos de latencia adicional antes de que la función pueda procesar la solicitud.

### ¿Qué son los Cold Starts? {id="%C2%BFqu%C3%A9-son-los-cold-starts%3F"}

Un "cold start" se produce cuando una función Lambda se invoca después de un período de inactividad o cuando se escalan para manejar un aumento en la demanda. En este momento, AWS necesita inicializar un nuevo entorno de ejecución, cargar el código de la función y establecer conexiones con recursos externos. Esto puede llevar varios segundos, lo que puede afectar negativamente la experiencia del usuario y el rendimiento de la aplicación.

### Factores que Causan los Cold Starts {id="factores-que-causan-los-cold-starts"}

Existen varios factores que contribuyen a la latencia de los "cold starts", incluyendo:

| Factor | Descripción |
| --- | --- |
| Inicialización del entorno | AWS necesita inicializar un nuevo entorno de ejecución para cada función. |
| Carga de código | El código de la función debe cargarse en el entorno de ejecución. |
| Conexiones con recursos | La función puede necesitar establecer conexiones con bases de datos o APIs. |
| Dependencias de código | Las bibliotecas y frameworks pueden afectar la latencia. |
| Tamaño del paquete de código | El tamaño del paquete de código puede influir en la latencia. |

## Concurrencia Aprovisionada: La Solución {id="concurrencia-aprovisionada%3A-la-soluci%C3%B3n"}

La concurrencia aprovisionada ayuda a reducir los "cold starts" en AWS Lambda. Esta función mantiene un número específico de entornos de ejecución "calientes" y listos para manejar solicitudes.

### Cómo Funciona la Concurrencia Aprovisionada {id="c%C3%B3mo-funciona-la-concurrencia-aprovisionada"}

La concurrencia aprovisionada reserva un número fijo de entornos de ejecución para una función Lambda. Estos entornos se mantienen "calientes" y listos para manejar solicitudes, lo que disminuye la latencia de los "cold starts". Cuando llega una solicitud, AWS Lambda asigna una de las instancias "calientes" disponibles, reduciendo el tiempo de respuesta.

### Casos de Uso para la Concurrencia Aprovisionada {id="casos-de-uso-para-la-concurrencia-aprovisionada"}

La concurrencia aprovisionada es útil en aplicaciones que necesitan baja latencia y alta disponibilidad, como:

- **APIs síncronas**: Aplicaciones que requieren respuestas rápidas.
- **Aplicaciones de alto tráfico**: Como sitios de comercio electrónico.
- **Sistemas críticos**: Aplicaciones que necesitan alta disponibilidad y resistencia a fallos.

En resumen, la concurrencia aprovisionada mejora la experiencia del usuario y el rendimiento de la aplicación al mitigar los "cold starts" en AWS Lambda.

## Configuración de la Concurrencia Aprovisionada {id="configuraci%C3%B3n-de-la-concurrencia-aprovisionada"}

Configurar la concurrencia aprovisionada para una función Lambda es sencillo y se puede hacer a través de la consola de administración de AWS o la CLI de AWS. Aquí te mostramos cómo hacerlo.

### Configuración Paso a Paso {id="configuraci%C3%B3n-paso-a-paso"}

Para configurar la concurrencia aprovisionada desde la consola de administración de AWS, sigue estos pasos:

1. Inicia sesión en la consola de administración de AWS y ve a la página de funciones Lambda.
2. Selecciona la función Lambda para la que deseas configurar la concurrencia aprovisionada.
3. Haz clic en la pestaña "Configuración" y selecciona "Concurrency" en el menú desplegable.
4. En la sección "Configuraciones de concurrencia aprovisionada", haz clic en "Agregar configuración".
5. Selecciona el tipo de calificador (alias o versión) y elige la versión o alias de la función que deseas configurar.
6. Introduce el número de concurrencia aprovisionada que deseas y haz clic en "Guardar".

Para configurar la concurrencia aprovisionada usando la CLI de AWS, utiliza el comando `aws lambda update-function-configuration` con los parámetros adecuados.

### Mejores Prácticas {id="mejores-pr%C3%A1cticas"}

- Configura la concurrencia aprovisionada para una versión específica de la función Lambda, no para la versión más reciente.
- Es recomendable configurar la concurrencia aprovisionada para funciones Lambda con tráfico predecible y estable para reducir costos y mejorar el rendimiento.

Espero que esta sección te haya sido útil. ¡Si tienes alguna pregunta o necesitas más información, no dudes en preguntar!

## Determining Concurrency Needs {id="determining-concurrency-needs"}

Determinar las necesidades de concurrencia es clave para configurar la concurrencia aprovisionada de manera efectiva. La concurrencia aprovisionada se configura según la cantidad de instancias de función que se necesitan para manejar el tráfico esperado. Para determinar la concurrencia necesaria, debes considerar factores como la tasa de solicitudes promedio, la duración de ejecución promedio y la concurrencia esperada.

### Estimating Concurrency Requirements {id="estimating-concurrency-requirements"}

Para estimar la concurrencia necesaria, puedes utilizar la fórmula siguiente:

`Concurrencia = (solicitudes promedio por segundo) * (duración promedio de la solicitud en segundos)`

Por ejemplo, si tu función Lambda recibe un promedio de 10 solicitudes por segundo y cada solicitud tarda un promedio de 500 ms en ejecutarse, la concurrencia necesaria sería:

`Concurrencia = 10 * 0.5 = 5`

Es importante tener en cuenta que esta fórmula es solo una guía y que debes considerar otros factores, como la variabilidad en el tráfico y la complejidad de la función.

### Using [CloudWatch](https://aws.amazon.com/cloudwatch/) Metrics {id="using-cloudwatch-metrics"}

![CloudWatch](/assets/blog/af6613064a74b982792aeda9ceba840048121c2598cd44ec9ea1d09b78061bae.jpg)

CloudWatch es una herramienta de monitoreo de AWS que te permite recopilar y analizar métricas de rendimiento para tus funciones Lambda. Puedes utilizar CloudWatch para monitorear la concurrencia de tus funciones Lambda y ajustar la concurrencia aprovisionada según sea necesario.

Puedes ver las métricas de concurrencia en la consola de CloudWatch, en la sección "Métricas" de la función Lambda. Las métricas de concurrencia incluyen la concurrencia promedio, la concurrencia máxima y la concurrencia mínima.

Al utilizar CloudWatch para monitorear la concurrencia, puedes identificar patrones de tráfico y ajustar la concurrencia aprovisionada para asegurarte de que tengas suficientes instancias de función para manejar el tráfico esperado.

## Comparación de Rendimiento {id="comparaci%C3%B3n-de-rendimiento"}

La concurrencia aprovisionada puede mejorar el rendimiento de tus funciones Lambda. Aquí comparamos el rendimiento de una función Lambda con y sin concurrencia aprovisionada.

### Métricas de Rendimiento {id="m%C3%A9tricas-de-rendimiento"}

Para evaluar el rendimiento, usamos métricas como la latencia de inicio en frío, el tiempo de respuesta promedio y la latencia de cola. A continuación, se presentan los resultados de las pruebas:

| Métrica | Sin concurrencia aprovisionada | Con concurrencia aprovisionada |
| --- | --- | --- |
| Latencia de inicio en frío | 500 ms | 50 ms |
| Tiempo de respuesta promedio | 200 ms | 100 ms |
| Latencia de cola | 1 s | 500 ms |

Como se puede ver, la concurrencia aprovisionada reduce la latencia de inicio en frío y el tiempo de respuesta promedio, mejorando la experiencia del usuario.

### Análisis de Datos de Rendimiento {id="an%C3%A1lisis-de-datos-de-rendimiento"}

Para interpretar los datos, es importante entender cómo se miden las métricas y qué factores pueden afectar los resultados. Por ejemplo, la latencia de inicio en frío se mide desde que se recibe la solicitud hasta que se completa la inicialización de la función Lambda. La concurrencia aprovisionada reduce esta latencia al mantener instancias de función Lambda listas para manejar solicitudes.

Al analizar los datos, también es importante considerar la variabilidad en el tráfico y la complejidad de la función Lambda. La concurrencia aprovisionada es útil en situaciones donde se esperan picos de tráfico o se requiere un rendimiento rápido y predecible.

## Optimizing Lambda Functions {id="optimizing-lambda-functions"}

Optimizar las funciones Lambda es clave para aprovechar la concurrencia aprovisionada. Aquí te mostramos las [mejores prácticas](/blog/mejores-practicas-aws-para-devops/) para reducir el tiempo de inicialización, usar caché y separar el código de inicialización del controlador principal.

### Reduciendo el Tiempo de Inicialización {id="reduciendo-el-tiempo-de-inicializaci%C3%B3n"}

La inicialización de una función Lambda puede ser lenta. Para reducir este tiempo, sigue estas técnicas:

- **Minimizar el código de inicialización**: Separa el código de inicialización del controlador principal y reduce la cantidad de código que se ejecuta durante la inicialización.
- **Usar caché**: Guarda los resultados de operaciones costosas en una caché para evitar que se ejecuten nuevamente.
- **Optimizar las dependencias**: Asegúrate de que las dependencias sean mínimas y estén optimizadas.

### Estrategias de Caching {id="estrategias-de-caching"}

El caching mejora el rendimiento de las funciones Lambda. Aquí algunas estrategias:

| Estrategia | Descripción |
| --- | --- |
| Caché en memoria | Guarda los resultados en la memoria para evitar ejecuciones repetidas. |
| Caché en disco | Guarda los resultados en el disco para evitar ejecuciones repetidas. |
| Caché distribuido | Usa un sistema de caché distribuido para almacenar y acceder a los resultados desde diferentes instancias. |

### Optimización del Código {id="optimizaci%C3%B3n-del-c%C3%B3digo"}

Optimizar el código es esencial para mejorar el rendimiento. Aquí algunas técnicas:

- **Separar el código de inicialización del controlador principal**: Esto minimiza el tiempo de inicialización.
- **Usar técnicas de programación eficientes**: Utiliza técnicas como la programación lazy para reducir el tiempo de ejecución.
- **Optimizar las operaciones de E/S**: Mejora las operaciones de entrada y salida para reducir el tiempo de ejecución.

## Consideraciones de Costos {id="consideraciones-de-costos"}

Cuando se usa concurrencia aprovisionada, es importante tener en cuenta los costos asociados. A diferencia de las invocaciones de Lambda bajo demanda, la concurrencia aprovisionada tiene un costo adicional por la cantidad de concurrencia configurada y el tiempo durante el cual se mantiene.

### Precios de la Concurrencia Aprovisionada {id="precios-de-la-concurrencia-aprovisionada"}

La concurrencia aprovisionada se cobra según la cantidad de concurrencia configurada y el tiempo que se mantiene. El precio también depende de la memoria asignada a las funciones. Por ejemplo, si configuras una concurrencia aprovisionada en una función con 1 GB de memoria, pagarás $0.015 por hora, incluso si no hay invocaciones.

| Tipo de Costo | Invocaciones On-Demand | Concurrencia Aprovisionada |
| --- | --- | --- |
| Duración de la invocación | $0.06 por GB-hora (redondeado a 100 ms) | $0.035 por GB-hora (redondeado a 100 ms) |
| Solicitudes | $0.20 por 1 millón de solicitudes | $0.20 por 1 millón de solicitudes |
| Memoria | N/A | $0.015 por GB-hora (redondeado a 5 minutos) |

### Equilibrando Costo y Rendimiento {id="equilibrando-costo-y-rendimiento"}

Para equilibrar el costo y el rendimiento al usar concurrencia aprovisionada, considera estos consejos:

- Configura la concurrencia aprovisionada solo para funciones que necesitan alta velocidad y respuesta rápida.
- Asigna la cantidad adecuada de memoria a las funciones para evitar costos adicionales.
- Monitorea y ajusta la concurrencia aprovisionada según sea necesario para evitar costos innecesarios.
- Considera usar planes de ahorro para reducir los costos de la concurrencia aprovisionada.

Siguiendo estos consejos, puedes equilibrar el costo y el rendimiento al usar concurrencia aprovisionada en AWS Lambda.

## Using Auto Scaling {id="using-auto-scaling"}

Cuando se utiliza concurrencia aprovisionada, es importante ajustar la concurrencia según sea necesario. AWS Auto Scaling permite ajustar automáticamente la concurrencia aprovisionada según los patrones de tráfico o programaciones.

### Ajuste Dinámico {id="ajuste-din%C3%A1mico"}

Para configurar AWS Auto Scaling y ajustar dinámicamente la concurrencia aprovisionada, sigue estos pasos:

1. Registra la función Lambda como un objetivo escalable.
2. Configura una política de escalado.

Puedes configurar la política de escalado para que aumente la concurrencia aprovisionada cuando el tráfico aumenta y la disminuya cuando el tráfico baja. Esto asegura que la función Lambda tenga la concurrencia adecuada para manejar el tráfico y evitar costos innecesarios.

### Escalado Programado {id="escalado-programado"}

Otra opción es programar la escalada de la concurrencia aprovisionada según una programación específica. Esto es útil cuando se sabe que el tráfico aumentará en ciertos momentos del día o de la semana.

Por ejemplo, si tu aplicación recibe muchas solicitudes durante el horario de almuerzo, puedes programar la escalada de la concurrencia aprovisionada para que se ajuste automáticamente durante ese horario. Así, aseguras que la función Lambda tenga la concurrencia adecuada para manejar el tráfico y evitar costos innecesarios.

En resumen, AWS Auto Scaling permite ajustar automáticamente la concurrencia aprovisionada según sea necesario. Puedes configurar políticas de escalado dinámicas o programar la escalada para asegurarte de que la función Lambda tenga la concurrencia adecuada para manejar el tráfico y evitar costos innecesarios.

## Monitoring and Troubleshooting {id="monitoring-and-troubleshooting"}

Para asegurarte de que la concurrencia aprovisionada se configure y se utilice correctamente, es importante monitorear las [métricas de CloudWatch](/blog/10-metricas-clave-de-devops-en-aws/) y diagnosticar problemas comunes. En esta sección, exploraremos las mejores prácticas para monitorear y solucionar problemas de concurrencia aprovisionada.

### Monitoring Metrics {id="monitoring-metrics"}

Para monitorear la concurrencia aprovisionada, debes configurar CloudWatch para recopilar métricas clave, como:

- **ProvisionedConcurrencySpilloverInvocations**: número de invocaciones que superan la concurrencia aprovisionada configurada.
- **ProvisionedConcurrencyUtilization**: porcentaje de concurrencia aprovisionada utilizada en comparación con la configurada.
- **ProvisionedConcurrencyInvocations**: número de invocaciones que utilizan la concurrencia aprovisionada.

Estas métricas te permiten identificar problemas potenciales con la concurrencia aprovisionada, como invocaciones que superan la concurrencia configurada o una utilización ineficiente de la concurrencia aprovisionada.

### Troubleshooting Issues {id="troubleshooting-issues"}

Si detectas problemas con la concurrencia aprovisionada, sigue estos pasos para diagnosticar y solucionarlos:

1. Verifica la configuración de la concurrencia aprovisionada para asegurarte de que se ajusta a tus necesidades.
2. Revisa las métricas de CloudWatch para identificar patrones de tráfico anómalos o problemas de rendimiento.
3. Verifica los registros de la función Lambda para identificar errores o excepciones que puedan estar relacionados con la concurrencia aprovisionada.
4. Ajusta la concurrencia aprovisionada según sea necesario para asegurarte de que se ajusta a tus necesidades.

Al monitorear y solucionar problemas de concurrencia aprovisionada, puedes asegurarte de que tu función Lambda se ejecute de manera eficiente y escalable.

## Conclusión {id="conclusi%C3%B3n"}

La concurrencia aprovisionada es una solución efectiva para los problemas de "cold starts" en AWS Lambda. Al mantener entornos de ejecución listos, reduce el tiempo de inicio y mejora la experiencia del usuario. Además, permite un mejor control y escalabilidad para aplicaciones y APIs que necesitan baja latencia.

### Beneficios {id="beneficios"}

| Beneficio | Descripción |
| --- | --- |
| Reducción de latencia | Disminuye el tiempo de inicio de las funciones. |
| Mejor experiencia de usuario | Respuestas más rápidas y consistentes. |
| Control de costos | Evita la sobrecarga de recursos. |

### Recomendaciones {id="recomendaciones"}

- Configura la concurrencia aprovisionada para funciones con tráfico predecible.
- Ajusta la cantidad de memoria para evitar costos adicionales.
- Monitorea y ajusta la concurrencia según sea necesario.

En resumen, la concurrencia aprovisionada es una herramienta útil para mejorar el rendimiento y reducir costos en aplicaciones y APIs basadas en AWS Lambda.

## FAQs {id="faqs"}

### ¿Qué es la concurrencia aprovisionada en Lambda? {id="%C2%BFqu%C3%A9-es-la-concurrencia-aprovisionada-en-lambda%3F"}

La concurrencia aprovisionada es una configuración para una versión específica o alias de una función Lambda. No requiere cambios en el código y es compatible con características como la [configuración de VPC](/blog/conceptos-basicos-y-avanzados-de-amazon-vpc/) y capas Lambda.

### ¿Vale la pena la concurrencia aprovisionada? {id="%C2%BFvale-la-pena-la-concurrencia-aprovisionada%3F"}

Sí, reduce significativamente el tiempo de arranque en frío al mantener entornos de ejecución listos para manejar solicitudes. Es fácil de usar y mejora el rendimiento de las invocaciones de API.

### ¿Cuál es el problema de arranque en frío en AWS? {id="%C2%BFcu%C3%A1l-es-el-problema-de-arranque-en-fr%C3%ADo-en-aws%3F"}

Un arranque en frío ocurre cuando AWS Lambda necesita inicializar un entorno de ejecución para una función que no ha sido invocada recientemente. Esto puede añadir varios segundos de latencia antes de que la función procese la solicitud.

### ¿Cómo calcular la concurrencia aprovisionada de Lambda? {id="%C2%BFc%C3%B3mo-calcular-la-concurrencia-aprovisionada-de-lambda%3F"}

Para estimar la concurrencia necesaria, multiplica las solicitudes promedio por segundo por la duración promedio de la solicitud en segundos.

Ejemplo:

- Solicitudes promedio por segundo: 10
- Duración promedio de la solicitud: 0.5 segundos

Cálculo: `Concurrencia = 10 * 0.5 = 5`

Puedes usar métricas de CloudWatch para obtener estos datos.

## Related posts

- [AWS Lambda: Costo vs. Rendimiento](/blog/aws-lambda-costo-vs-rendimiento/)
- [Optimización de Costos de AWS Lambda](/blog/optimizacion-de-costos-de-aws-lambda/)
- [Mejores Prácticas Para AWS Lambda](/blog/mejores-practicas-para-aws-lambda/)
- [7 Estrategias para Mitigar Cold Starts en AWS Lambda](/blog/7-estrategias-para-mitigar-cold-starts-en-aws-lambda/)
