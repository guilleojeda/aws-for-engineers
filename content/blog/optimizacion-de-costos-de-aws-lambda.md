+++
url = "/blog/optimizacion-de-costos-de-aws-lambda/"
title = "Optimización de Costos de AWS Lambda"
description = "Consejos y estrategias para optimizar los costos de AWS Lambda sin sacrificar el rendimiento. Aprende a ajustar la memoria, el tiempo de ejecución y la concurrencia para reducir gastos."
date = "2024-03-19T01:39:56.043000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/149aa7de30b1ec6844a9daf3a09c8d0bb5933762d80184e0f1351842a7f120a3.jpg"
archive_order = 115

[[related]]
title = "Configuración de Service Discovery en Amazon ECS"
url = "/blog/configuracion-de-service-discovery-en-amazon-ecs/"
image = "/assets/blog/06c78ff6dbda05d66c1f63e83baee152010a52cf9216a8fd6ef2c0413f0340c9.jpg"

[[related]]
title = "Tipos y Tamaños de Instancias EC2: Guía Completa"
url = "/blog/tipos-y-tamanos-de-instancias-ec2-guia-completa/"
image = "/assets/blog/c17586bd518131452b0a717ad898cc31f83e54939230cbc392c1522321244037.jpg"

[[related]]
title = "Certificación AWS gratis: Materiales de estudio"
url = "/blog/certificacion-aws-gratis-materiales-de-estudio/"
image = "/assets/blog/0d33d48b094b306e8f1fb75fa750b68763fa8460753ac8524de9c2a10d8a7606.jpg"
+++

Si quieres reducir tus gastos en AWS Lambda sin sacrificar el rendimiento, estás en el lugar correcto. Aquí te presento un resumen de estrategias efectivas para optimizar costos:

- **Elije inteligentemente la memoria y el tiempo de ejecución**: Ajusta la memoria y el tiempo de ejecución de tus funciones Lambda basándote en sus necesidades reales, comenzando con valores bajos y ajustando según sea necesario.
- **Aprovecha las capas Lambda y reusa entornos**: Usa capas para compartir código y dependencias entre funciones, y configura tu entorno para reutilizar conexiones, reduciendo la latencia y el costo.
- **Monitorea y ajusta regularmente**: Usa CloudWatch y herramientas como `optimize-lambda-cost` para analizar el rendimiento y los costos, ajustando la configuración para optimizar ambos.
- **Experimenta con la configuración**: Aumentar la memoria puede hacer que tus funciones se ejecuten más rápido y por menos tiempo, lo que a menudo resulta en un menor costo general. Ajusta también la concurrencia y el tiempo de ejecución según tus necesidades.

Con estos consejos, puedes encontrar el balance perfecto entre costo y rendimiento para tus funciones Lambda, aprovechando al máximo el cómputo sin servidores de AWS.

### Memoria Asignada {id="memoria-asignada"}

Cuando usas AWS Lambda, le das a tu función una cantidad específica de memoria RAM. Esto es como decirle cuánto espacio tiene para trabajar. Si le das más memoria, tu función puede trabajar más rápido. Pero, esto también significa que pagarás más, porque AWS Lambda cobra según la memoria que uses y el tiempo que tu función esté en marcha.

Lo mejor es encontrar el equilibrio perfecto: darle a tu función la memoria que realmente necesita. No demasiado para no gastar de más, pero tampoco tan poco que tu función se vuelva lenta.

AWS sugiere empezar con poca memoria, como 128MB o 256MB, y ver cómo funciona. Si notas que necesita más, puedes aumentarla poco a poco.

### Tiempo de Ejecución {id="tiempo-de-ejecuci%C3%B3n"}

El tiempo de ejecución es el límite de tiempo que tu función puede estar activa en una sola vez. Si se pasa de este tiempo, AWS la detiene automáticamente.

El mínimo es de 1 segundo, y después de eso, AWS cobra por cada 100 milisegundos que tu función esté corriendo.

Igual que con la memoria, es importante ajustar este tiempo. No lo pongas tan corto que tu función no pueda terminar lo que tiene que hacer, pero tampoco tan largo que termines pagando de más sin necesidad.

AWS aconseja comenzar con un tiempo corto y aumentarlo si ves que tus funciones no alcanzan a terminar.

Ajustar bien la memoria y el tiempo de ejecución te ayuda a controlar tus gastos en Lambda, asegurando que no pagas de más sin perder rendimiento.

## Evaluación del Rendimiento Actual {id="evaluaci%C3%B3n-del-rendimiento-actual"}

Para entender cómo están funcionando tus funciones Lambda y cuánto te están costando, es buena idea mirar los registros de CloudWatch. Estos registros te muestran cómo se comporta tu función cuando la usas en el mundo real.

Aquí tienes unos pasos sencillos para revisar esos registros:

- Abre CloudWatch en la consola de AWS y busca el grupo de registros de tu función Lambda. Cada vez que tu función se ejecuta, se crea un registro que muestra detalles como cuánto tiempo tardó y cuánta memoria usó.
- CloudWatch te permite hacer consultas en los registros. Así puedes ver, por ejemplo, cuánto tiempo tardan tus funciones en promedio.
- También puedes ver cómo la cantidad de memoria que asignaste afecta el rendimiento. Esto te ayuda a encontrar el balance perfecto entre lo rápido que quieres que corra tu función y cuánto estás dispuesto a pagar.
- Puedes configurar alarmas en CloudWatch para que te avise si tus funciones tienen muchos errores o si están tardando demasiado. Esto te ayuda a solucionar problemas rápidamente.

Otra herramienta que puedes usar es [optimize-lambda-cost](https://github.com/alexcasalboni/aws-lambda-power-tuning), que es gratuita y analiza tus registros para darte consejos sobre cuánta memoria y concurrencia deberías usar.

Siguiendo estos pasos, podrás tener una idea clara de cómo se están comportando tus funciones Lambda. Con esta información, puedes experimentar con diferentes configuraciones para mejorar el rendimiento y reducir los costos.

## Ajustes Prácticos de Configuración {id="ajustes-pr%C3%A1cticos-de-configuraci%C3%B3n"}

Para que tus funciones de AWS Lambda te cuesten menos y trabajen mejor, hay algunos cambios sencillos que puedes hacer. Estos trucos te ayudan a mejorar cómo funcionan tus tareas y a gastar menos al mismo tiempo.

### Aumento de Memoria {id="aumento-de-memoria"}

Una manera muy eficaz de hacer que Lambda funcione mejor es darle más memoria a tus tareas. Si aumentas la memoria, tus tareas se pueden hacer más rápido y, por lo tanto, AWS te cobra menos tiempo.

Por ejemplo, si pasamos de 512MB a 1024MB de memoria, el tiempo que tardan las tareas en hacerse puede bajar bastante:

| Memoria | Tiempo de Ejecución (percentil 99) |
| --- | --- |
| 512MB | 18500 ms |
| 1024MB | 7300 ms |

Y si aumentamos la memoria a 2048MB, el costo por cada millón de tareas solo sube un poco, pero la velocidad mejora mucho.

### Ajuste de Tiempo de Ejecución {id="ajuste-de-tiempo-de-ejecuci%C3%B3n"}

Reducir el tiempo máximo que puede durar una tarea también puede ayudarte a ahorrar. Si notas que tus tareas casi nunca usan todo el tiempo que les das, puedes bajar ese límite sin problemas.

Por ejemplo, si tenías un límite de 5 segundos pero tus tareas suelen durar 3 segundos, puedes bajar el límite a 4 segundos. Esto te permite gastar menos sin que afecte cómo funcionan tus tareas.

### Concurrencia {id="concurrencia"}

Manejar bien cuántas tareas se hacen al mismo tiempo (concurrencia) también es clave para ahorrar. Lo ideal es tener la concurrencia justa para tu trabajo, pero no tanta que termines pagando por cosas que no usas.

Si ves que tu concurrencia está en 100 pero en realidad usas 50, puedes bajarla a 60 o 70. Así reduces costos sin perder rendimiento.

Con estos ajustes y revisando cómo van tus tareas en CloudWatch Logs, puedes encontrar la mejor manera de configurar tus funciones Lambda para que sean eficientes y no gasten de más.

## Casos de Uso y Ejemplos Reales {id="casos-de-uso-y-ejemplos-reales"}

La optimización de costos de AWS Lambda puede ser muy efectiva en ciertos casos de uso comunes:

### Procesamiento por lotes asíncrono {id="procesamiento-por-lotes-as%C3%ADncrono"}

AWS Lambda es ideal para tareas asíncronas como procesamiento por lotes, donde las tareas se activan por eventos de diferentes fuentes. Algunos ejemplos son:

- Procesar archivos subidos a un bucket S3
- Enviar notificaciones por email basadas en eventos de una base de datos
- Generar reportes diarios con datos agregados

En estos casos, Lambda te permite correr tu código solo cuando es necesario, sin la necesidad de mantener servidores funcionando todo el tiempo. Y si optimizas la configuración como mencionamos antes, puedes reducir bastante los costos.

### APIs y backends serverless {id="apis-y-backends-serverless"}

Las funciones Lambda también son útiles para crear APIs y backends que se ajustan automáticamente según la demanda. Por ejemplo:

- Una API para una aplicación móvil que consulta una base de datos
- Un servicio backend para procesar peticiones de un sitio web

Si configuras bien los tiempos de espera, la memoria y la concurrencia según el tráfico esperado, Lambda puede manejar estas tareas de manera eficiente y económica.

### Casos donde la optimización es más difícil {id="casos-donde-la-optimizaci%C3%B3n-es-m%C3%A1s-dif%C3%ADcil"}

Existen situaciones donde reducir costos en Lambda puede ser más complicado:

- Tareas que necesitan mucho procesamiento de CPU durante tiempos prolongados. Aquí es mejor usar instancias EC2.
- Trabajos que deben estar siempre activos o que necesitan mantener un estado. Lambda se reinicia desde cero cada vez que se ejecuta.
- Cuando los requisitos de rendimiento son muy estrictos o se necesita una latencia muy baja. A veces, optimizar para reducir costos puede afectar el rendimiento.

En resumen, Lambda es una opción excelente para ahorrar en tareas asíncronas, procesamiento por lotes, APIs y backends. Pero no es la mejor para trabajos que requieren un esfuerzo constante, tareas con estado o cuando la latencia debe ser mínima. Conociendo estos límites, puedes aprovecharlo al máximo.

## Conclusiones {id="conclusiones"}

Para ahorrar en AWS Lambda y seguir teniendo un buen rendimiento, hay algunas cosas clave que puedes hacer:

- Mira cómo estás usando los recursos ahora y ajusta la memoria y el tiempo de ejecución según lo que necesites.
- Usa herramientas como CloudWatch Logs y optimize-lambda-cost para que te den consejos específicos.
- Si le das más memoria a tus tareas, pueden correr más rápido.
- Si tu código casi nunca usa todo el tiempo de ejecución que le das, intenta reducirlo.
- Asegúrate de que la cantidad de tareas que haces al mismo tiempo (concurrencia) sea la adecuada para lo que realmente necesitas.

Siguiendo estos consejos y encontrando el balance correcto entre rendimiento y costo, puedes gastar menos en AWS Lambda. Esto significa que puedes disfrutar de las ventajas de usar cómputo sin servidores sin pagar de más.

Es buena idea mirar cada situación por separado y probar diferentes ajustes, siempre viendo cómo afectan al rendimiento y al costo. Tomar decisiones basadas en datos te ayudará a optimizar Lambda de la mejor manera.

## Related posts

- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [Mejores Prácticas Para AWS Lambda](/blog/mejores-practicas-para-aws-lambda/)
- [Mejores Prácticas Para Amazon EC2](/blog/mejores-practicas-para-amazon-ec2/)
- [Utilizando Lambda Layers en Múltiples Funciones Lambda](/blog/utilizando-lambda-layers-en-multiples-funciones-lambda/)
