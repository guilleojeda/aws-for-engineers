+++
url = "/blog/cache-para-autorizadores-lambda-en-api-gateway/"
title = "Caché para Autorizadores Lambda en API Gateway"
description = "Aprende cómo implementar caché en autorizadores Lambda de API Gateway para mejorar rendimiento, reducir costos y minimizar invocaciones innecesarias."
date = "2024-11-28T00:05:44.586000+00:00"
lastmod = "2024-11-28"
image = "/assets/blog/88ec1a2d5d2521db3a61ab5ab48108bd4ced7bffb5d3696c0749f97887585452.jpg"
archive_order = 37

[[related]]
title = "Mejores prácticas para nombres en AWS Organizations"
url = "/blog/mejores-practicas-para-nombres-en-aws-organizations/"
image = "/assets/blog/bfdfed56910493c9a698fb14c2de783cf9822d1dc618d2071ab00ea9c8832961.jpg"

[[related]]
title = "AWS Organizations: Estructuras de cuentas y nombres"
url = "/blog/aws-organizations-estructuras-de-cuentas-y-nombres/"
image = "/assets/blog/0bc804415b6cb6339123371f7d156fd8cc60f8d7e9353cba549af2281b6c72e6.jpg"

[[related]]
title = "Cómo Desarrollar Aplicaciones de Inteligencia Artificial en AWS"
url = "/blog/como-desarrollar-aplicaciones-de-inteligencia-artificial-en-aws/"
image = "/assets/blog/ac5297dc259dcbbe8d397c9df0c3d4712372c8d201c2821183fa331806f12f60.jpg"
+++

El uso de caché en autorizadores Lambda de API Gateway permite reducir latencia, ahorrar costos y minimizar invocaciones innecesarias a Lambda. Aquí tienes los puntos clave para implementarlo correctamente:

- **Tipos de Autorizadores Lambda**:
  - **TOKEN**: Usa el encabezado `Authorization` para validar tokens como JWT.
  - **REQUEST**: Combina múltiples fuentes de identidad (headers, query strings, etc.) para autorizaciones más detalladas.
- **Claves de Caché**:
  - TOKEN: Basadas en el encabezado `Authorization`.
  - REQUEST: Personalizables con headers, query strings, variables de etapa o contexto.
- **Tiempo de Vida (TTL)**:
  - Predeterminado: 300 segundos.
  - Configurable hasta 3600 segundos. Un TTL más corto mejora seguridad; uno más largo optimiza rendimiento.
- **[Mejores Prácticas](/blog/mejores-practicas-aws-para-devops/)**:
  - Usa políticas generales para reducir invocaciones.
  - Personaliza claves de caché con variables como `$context.resourcePath` o `$context.httpMethod`.
  - Monitorea el uso del caché con [CloudWatch](https://docs.aws.amazon.com/cloudwatch/) y ajusta según métricas.

> **Ejemplo rápido**: Configura el caché con un TTL de 3600s para endpoints con cambios poco frecuentes y utiliza `$context.httpMethod` para políticas específicas por método HTTP.

**Ventaja clave**: Una configuración adecuada del caché puede reducir la latencia hasta en un 70% en escenarios de alta concurrencia.

## Video relacionado de YouTube {id="video-relacionado-de-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/al5I9v5Y-kA" >}}

## Cómo Funciona el Caché para Autorizadores Lambda {id="c%C3%B3mo-funciona-el-cach%C3%A9-para-autorizadores-lambda"}

El caché en autorizadores Lambda ayuda a mejorar el rendimiento al minimizar invocaciones repetidas. Aquí veremos cómo configurar las claves de caché y otros aspectos clave para optimizar su uso.

### Claves de Caché: Lo Básico {id="claves-de-cach%C3%A9%3A-lo-b%C3%A1sico"}

Las claves de caché dependen del tipo de autorizador que estés usando. En los autorizadores tipo `TOKEN`, la clave se genera a partir del valor del encabezado de autorización. Por otro lado, los autorizadores `REQUEST` permiten combinar diferentes fuentes de identidad para una identificación más precisa:

- **Encabezados**: Ideal para tokens JWT y métodos de autenticación estándar.
- **Query Strings**: Útiles para claves de API y parámetros de autorización.
- **Variables de Etapa**: Permiten configuraciones específicas para cada entorno.
- **Variables de Contexto**: Ofrecen un control más detallado sobre el acceso.

Elegir las fuentes de identidad adecuadas es clave para lograr un balance entre rendimiento y seguridad en el caché.

### Expiración del Caché y TTL {id="expiraci%C3%B3n-del-cach%C3%A9-y-ttl"}

El tiempo de vida (TTL) del caché define cuánto tiempo una política permanece válida. Aquí hay algunos puntos importantes:

- TTL más corto mejora la seguridad, pero aumenta la carga en Lambda.
- TTL más largo mejora el rendimiento, aunque puede usar políticas obsoletas.
- Configurar el TTL en 0 desactiva el caché por completo.

El TTL predeterminado es de 300 segundos, pero puedes configurarlo hasta un máximo de 3600 segundos.

### Cómo Elegir la Clave de Caché Ideal {id="c%C3%B3mo-elegir-la-clave-de-cach%C3%A9-ideal"}

Seleccionar la clave de caché correcta es fundamental para equilibrar eficiencia y granularidad. Para autorizadores `REQUEST`, considera incluir variables de contexto específicas como:

| Variable de Contexto | Beneficio |
| --- | --- |
| httpMethod | Define políticas específicas por método HTTP. |
| resourcePath | Permite un control detallado por recurso. |
| accountId | Facilita la [separación por cuenta de AWS](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/). |

> "La implementación efectiva del caché puede reducir la latencia hasta en un 70% en escenarios de alta concurrencia, siempre que las claves de caché estén correctamente configuradas."

## Mejores Prácticas para Usar el Caché {id="mejores-pr%C3%A1cticas-para-usar-el-cach%C3%A9"}

Implementar el caché en autorizadores Lambda de manera eficaz requiere un enfoque bien pensado. Aquí tienes algunas recomendaciones clave para mejorar el rendimiento y mantener la seguridad.

### Creación de Políticas de Autorización Generales {id="creaci%C3%B3n-de-pol%C3%ADticas-de-autorizaci%C3%B3n-generales"}

Diseñar políticas que cubran varios recursos relacionados puede reducir las llamadas innecesarias a Lambda. Por ejemplo, agrupar recursos similares, definir permisos basados en roles y establecer niveles claros de acceso ayuda a aprovechar mejor el caché. Sin embargo, evita que las políticas sean demasiado específicas, ya que esto podría generar denegaciones no deseadas y aumentar las solicitudes a Lambda.

### Uso de Comodines en Políticas {id="uso-de-comodines-en-pol%C3%ADticas"}

Los comodines son útiles para gestionar varios endpoints de API de forma sencilla. Por ejemplo, usar una política como `arn:aws:execute-api:${region}:${accountId}:${apiId}/${stage}/*/productos/*` otorga acceso a todos los métodos HTTP relacionados con la ruta 'productos'. Esto simplifica la configuración, especialmente en APIs con muchos endpoints, sin sacrificar la seguridad.

### Variables de Contexto en Claves de Caché {id="variables-de-contexto-en-claves-de-cach%C3%A9"}

Personalizar las claves de caché con variables de contexto permite un control más detallado. Variables como `$context.httpMethod`, `$context.resourcePath` y `$context.identity.sourceIp` ayudan a crear claves específicas que regulan el acceso según el método HTTP, la ruta del recurso o la IP de origen. También puedes incluir variables de etapa o parámetros específicos, aunque esto podría disminuir la eficiencia del caché.

El desafío está en equilibrar la precisión de las políticas con la eficiencia del caché. Si las políticas son demasiado detalladas, aumentarás las llamadas a Lambda; si son demasiado generales, podrías poner en riesgo la seguridad.

Aplicando estas prácticas, es posible mantener un rendimiento alto y un control sólido sobre la seguridad y el acceso.</

## Solución de Problemas y Mejora del Caché {id="soluci%C3%B3n-de-problemas-y-mejora-del-cach%C3%A9"}

Optimizar el caché y solucionar problemas comunes es clave para mantener un alto rendimiento y garantizar la seguridad de tus APIs.

### Verificando el Funcionamiento del Caché {id="verificando-el-funcionamiento-del-cach%C3%A9"}

Para asegurarte de que el caché está funcionando correctamente, utiliza registros en tu autorizador Lambda y monitorea con CloudWatch. Agrega mensajes de registro a tu función Lambda, como este ejemplo:

```
def lambda_handler(event, context):
    print(f"Autorización solicitada para: {event['methodArn']}")
    # Resto del código del autorizador
```

Con CloudWatch, puedes observar cuántas veces se invoca el autorizador Lambda. Si el caché está funcionando bien, notarás menos invocaciones, ya que API Gateway usará las políticas almacenadas. Si encuentras problemas, como políticas obsoletas, existen herramientas específicas para invalidar el caché.

### Invalidando Políticas en Caché {id="invalidando-pol%C3%ADticas-en-cach%C3%A9"}

La API `FlushStageAuthorizersCache` es una herramienta útil para eliminar políticas almacenadas en caché. Esto afecta a todas las políticas guardadas para los usuarios en una etapa específica de la API. Es útil en situaciones como:

- Cuando actualizas la lógica de autorización en tu función Lambda.
- Si identificas comportamientos inesperados en la autorización.

Usa el siguiente comando en AWS CLI para ejecutar esta operación:

```
aws apigateway flush-stage-authorizers-cache --rest-api-id abc123 --stage-name prod
```

### Balance entre Rendimiento y Seguridad {id="balance-entre-rendimiento-y-seguridad"}

Una vez resueltos los problemas, configura el caché para equilibrar rendimiento y seguridad. Aquí tienes una tabla de referencia para el Tiempo de Vida (TTL) del caché:

| TTL | Ventajas | Desventajas |
| --- | --- | --- |
| 300s (5 min) | Más seguro | Costos más altos |
| 3600s (1 hora) | Buen equilibrio | Actualizaciones más lentas |
| 86400s (24 horas) | Mejor rendimiento | Riesgo de desactualización |

Para lograr un buen balance:

- Ajusta el TTL según la frecuencia de cambios en tus políticas.
- Emplea variables de contexto para estrategias más específicas.
- Monitorea las métricas de CloudWatch para realizar ajustes según sea necesario.

> "El uso de variables de contexto en autorizadores REQUEST permite crear estrategias de caché más precisas, mejorando significativamente el balance entre rendimiento y seguridad" - Documentación de AWS API Gateway

Utiliza variables como `$context.resourcePath` y `$context.httpMethod` en las claves de caché para lograr mayor precisión en tus configuraciones.

## Conclusión {id="conclusi%C3%B3n"}

### Resumen de Puntos Clave {id="resumen-de-puntos-clave"}

Configurar correctamente el caché en autorizadores Lambda para API Gateway puede mejorar notablemente el rendimiento de tus APIs. Al reducir la latencia y disminuir las llamadas innecesarias al autorizador Lambda, también puedes optimizar costos operativos.

Para lograrlo, es clave seleccionar las claves de caché adecuadas, especialmente en autorizadores de tipo `REQUEST`. Usar variables de contexto como `$context.resourcePath` y `$context.httpMethod` permite crear políticas de autorización más detalladas y específicas.

El tiempo de vida del caché (TTL) es otro aspecto importante. Con un valor predeterminado de 300 segundos y un máximo de 3600 segundos, ajustar el TTL según las necesidades de tu aplicación es esencial para equilibrar rendimiento y seguridad.

> "La implementación efectiva del caché en API Gateway puede reducir significativamente la latencia y mejorar la experiencia del usuario, mientras se mantiene un alto nivel de seguridad" - Documentación de AWS API Gateway

### Recursos Adicionales de Aprendizaje {id="recursos-adicionales-de-aprendizaje"}

Si quieres seguir aprendiendo sobre API Gateway y cómo aprovechar al máximo sus capacidades de caché, aquí tienes algunos recursos útiles:

- **Documentación oficial de AWS**: Proporciona información técnica detallada y las últimas actualizaciones.
- **Foros de AWS**: Ideales para resolver dudas específicas y explorar casos de uso reales.
- **[Dónde Aprendo AWS](/)**: Un blog en español con tutoriales prácticos y guías detalladas sobre API Gateway, Lambda y otros servicios de AWS.

| Recurso | Ventaja principal |
| --- | --- |
| Documentación oficial de AWS | Información técnica y actualizaciones recientes |
| Foros de AWS | Resolución de problemas y casos prácticos |
| [Dónde Aprendo AWS](/) | Guías en español y ejemplos orientados a práctica |

Aprovechar estos recursos te ayudará a perfeccionar tus habilidades en la gestión de caché para API Gateway y a optimizar tus autorizadores Lambda.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

Aquí respondemos algunas preguntas comunes sobre el uso de autorizadores Lambda y estrategias de caché en API Gateway.

### ¿Qué es el caché de autorización en [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)? {id="%C2%BFqu%C3%A9-es-el-cach%C3%A9-de-autorizaci%C3%B3n-en-aws-api-gateway%3F"}

![AWS API Gateway](/assets/blog/65d2da97607b8af794ec576d64d5eaa39503dfe566b6aff58ad9cd8e675faf8a.jpg)

El caché de autorización en API Gateway verifica que las fuentes de identidad necesarias estén presentes en cada solicitud. Este sistema guarda políticas de autorización para solicitudes con fuentes de identidad completas, lo que disminuye la necesidad de llamar al autorizador Lambda en cada ocasión. Si el tiempo de vida del caché (TTL) expira, se genera una nueva política al invocar nuevamente al autorizador.

| Comportamiento | Resultado |
| --- | --- |
| Fuentes de identidad completas | Usa el caché para procesar la solicitud |
| TTL expirado | Llama nuevamente al autorizador |

El TTL indica cuánto tiempo se almacenan las políticas antes de que sea necesario regenerarlas.

### ¿Por qué usar un autorizador Lambda? {id="%C2%BFpor-qu%C3%A9-usar-un-autorizador-lambda%3F"}

Un autorizador Lambda es una función personalizada que valida las solicitudes antes de que accedan a una API. Es ideal cuando necesitas implementar reglas de autorización más avanzadas que las ofrecidas por las opciones estándar de API Gateway. Cuando un cliente envía una solicitud, el autorizador Lambda verifica la identidad del usuario y genera una política [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) que define si se permite o deniega el acceso.

### ¿Cómo habilito el caché en API Gateway? {id="%C2%BFc%C3%B3mo-habilito-el-cach%C3%A9-en-api-gateway%3F"}

Para activar el caché, ingresa a la consola de API Gateway, selecciona 'Stages', elige una etapa, edita los detalles y habilita la opción 'Habilitar caché de API' en la sección de 'Cache settings'.

Si necesitas invalidar el caché manualmente, puedes hacerlo incluyendo el encabezado `Cache-Control: max-age=0` en tus solicitudes.

## Related posts

- [Optimización de Costos de AWS Lambda](/blog/optimizacion-de-costos-de-aws-lambda/)
- [AWS Lambda: Costo vs. Rendimiento](/blog/aws-lambda-costo-vs-rendimiento/)
- [Estrategias de Caché Rentables para Apps Serverless](/blog/estrategias-de-cache-rentables-para-apps-serverless/)
- [AWS Lambda y API Gateway: Guía Básica](/blog/aws-lambda-y-api-gateway-guia-basica/)
