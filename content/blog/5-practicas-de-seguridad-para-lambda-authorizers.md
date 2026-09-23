+++
url = "/blog/5-practicas-de-seguridad-para-lambda-authorizers/"
title = "5 Prácticas de Seguridad para Lambda Authorizers"
description = "Implementa prácticas de seguridad efectivas en Lambda Authorizers para proteger tus APIs en AWS y optimizar su rendimiento."
date = "2025-01-23T00:34:06.712000+00:00"
lastmod = "2025-02-09"
image = "/assets/blog/e838de22cc856de64a0d3bdc515b28b5f5f8331aedc9f29f7f07ca03cddc569d.jpg"
archive_order = 26

[[related]]
title = "Cómo monitorear SLOs con Amazon CloudWatch"
url = "/blog/como-monitorear-slos-con-amazon-cloudwatch/"
image = "/assets/blog/0919cf4ddfe7647a0c71877c7f59533414be113f79cb3d9b0af08ce1cece1630.jpg"

[[related]]
title = "Arquitecturas de Alta Disponibilidad en AWS"
url = "/blog/arquitecturas-de-alta-disponibilidad-en-aws/"
image = "/assets/blog/1b184fe1242c3e7fb970e9845427d92c132904352ae80c4f0254117432753c1d.jpg"

[[related]]
title = "AWS gratis para educadores y estudiantes"
url = "/blog/aws-gratis-para-educadores-y-estudiantes/"
image = "/assets/blog/2e829a000de916544620390768efc5bc03b5071c56197fbeea6fea04fc2fb76e.jpg"
+++

**¿Cómo proteger tus APIs en AWS con Lambda Authorizers?** Aquí tienes las 5 claves:

1. **Autenticación sólida**: Valida tokens JWT con firma, expiración y claims seguros. Usa herramientas como [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) para proteger claves.
2. **Mínimo privilegio**: Configura políticas IAM específicas, evita permisos globales (`*`) y revisa accesos regularmente.
3. **Errores seguros**: Ofrece mensajes genéricos al cliente, registra detalles en el servidor y monitorea con [CloudWatch](https://docs.aws.amazon.com/cloudwatch/).
4. **Optimización del caché**: Configura un TTL equilibrado (300 segundos recomendado) y evita almacenar datos sensibles.
5. **Monitoreo constante**: Usa CloudWatch, [CloudTrail](https://docs.aws.amazon.com/cloudtrail/) y [X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) para detectar amenazas y auditar actividades.

Estas prácticas combinan seguridad y eficiencia para proteger tus APIs desde el primer momento.

## 1. Usa autenticación sólida {id="1-usa-autenticacion-solida"}

Para garantizar la seguridad en tus aplicaciones, implementa **JSON Web Tokens (JWT)** como estándar para validar tokens. Asegúrate de incluir varias capas de validación, como:

- La estructura del token.
- La firma criptográfica.
- La fecha de expiración.
- Claims específicos (por ejemplo, *issuer* y *audience*).

Aquí tienes un ejemplo práctico de cómo hacerlo de manera segura en Node.js:

```
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const token = event.authorizationToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validación adicional de claims
    if (!decoded.iss || decoded.iss !== 'https://mi-servicio.com') {
      throw new Error('Issuer inválido');
    }

    return generatePolicy(decoded.sub, 'Allow', event.methodArn);
  } catch (error) {
    console.error('Fallo en validación:', error);
    return generatePolicy('user', 'Deny', event.methodArn);
  }
};
```

**Puntos clave a evitar:**

- No almacenes secretos en el código fuente.
- No omitas la verificación de la expiración del token.
- Evita mensajes de error demasiado específicos que puedan revelar información sensible.

Este enfoque también complementa la práctica de aplicar permisos mínimos, ya que limita el acceso a recursos de autenticación. Considera agregar autenticación multifactor (MFA) para una capa extra de seguridad.

Para gestionar secretos de forma segura, utiliza herramientas como **AWS Secrets Manager**, que te permiten:

- Rotar claves automáticamente.
- Mantener un registro de auditoría.
- Administrar permisos de acceso detallados.

## 2. Aplica el principio de mínimo privilegio {id="2-aplica-el-principio-de-minimo-privilegio"}

El principio de mínimo privilegio implica otorgar solo los permisos estrictamente necesarios para cada función específica. Esto complementa una autenticación sólida al reducir el impacto si las credenciales llegan a ser comprometidas.

Al crear políticas IAM, es clave establecer restricciones precisas. Por ejemplo:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem"
            ],
            "Resource": "arn:aws:dynamodb:region:account-id:table/users-table"
        }
    ]
}
```

Este fragmento de política IAM permite únicamente la lectura de una tabla específica en [DynamoDB](https://docs.aws.amazon.com/dynamodb/), eliminando permisos innecesarios que podrían exponer datos o servicios.

| Acción | Riesgo | Solución |
| --- | --- | --- |
| Usar `AWSLambdaBasicExecutionRole` | Incluye permisos excesivos | Crear roles personalizados específicos |
| Otorgar permisos con `*` | Expone a posibles vulnerabilidades | Definir recursos y acciones específicas |
| Mantener permisos de desarrollo en producción | Aumenta riesgos de seguridad | Separar roles para cada ambiente |

Para gestionar los permisos de manera eficiente:

- **[IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)**: Ayuda a identificar permisos que no se están utilizando.
- **[Alertas en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/)**: Notifica sobre cambios en políticas que podrían ser riesgosos.

Es importante revisar los permisos después de cada actualización en el authorizer o cualquier cambio en las APIs protegidas. Esto asegura que los accesos estén siempre bajo control.

## 3. Manejo Seguro de Errores {id="3-manejo-seguro-de-errores"}

El manejo de errores de forma segura ayuda a prevenir la exposición de información sensible al implementar:

- **Mensajes genéricos para el cliente**, evitando detalles técnicos.
- **Registros detallados en el servidor**, útiles para diagnóstico interno.
- **Monitoreo constante y alertas** para identificar patrones sospechosos.

Una herramienta clave para esto es **CloudWatch**, que permite registrar información detallada mientras se asegura que las respuestas hacia el cliente sean simples y uniformes. Aquí tienes un ejemplo práctico:

```
exports.handler = async (event) => {
    try {
        // Lógica de autorización
        if (!isValid) {
            console.log(`Error detallado: Token expirado ${tokenDetails}`); // Log interno
            return generatePolicy('deny', 'Autenticación fallida');
        }
    } catch (error) {
        console.error(`ID de correlación: ${correlationId}, Error: ${error}`);
        return generatePolicy('deny', 'Error de autorización');
    }
};
```

Es importante que este enfoque se extienda al manejo de errores para evitar ataques como los de tiempo (timing attacks). Usar IDs de correlación en los registros es una práctica recomendada, ya que permite rastrear errores internos mientras se presentan respuestas genéricas al cliente. Esto facilita la depuración sin comprometer la seguridad.

Para reforzar aún más la seguridad, considera estos pasos:

- **Validar todas las entradas** antes de procesarlas.
- **[Configurar alertas en CloudWatch](/blog/automatizar-alertas-de-costos-aws-en-5-pasos/)** para detectar actividades inusuales.

Estas estrategias no solo protegen el sistema, sino que también aseguran la capacidad de diagnosticar y solucionar problemas de manera eficiente. Además, un manejo adecuado de errores complementa otras prácticas, como el uso eficiente de caché, que se analizará en la siguiente sección.

## 4. Optimizar el Uso de Caché {id="4-optimizar-el-uso-de-cache"}

Configurar correctamente el caché en Lambda Authorizers ayuda a proteger tu API mientras mejora su rendimiento. El parámetro `authorizerResultTtlInSeconds` es clave para este equilibrio:

```
{
  "name": "mi-autorizador",
  "type": "TOKEN",
  "authorizerUri": "arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:123456789012:function:mi-funcion-autorizador/invocations",
  "authorizerResultTtlInSeconds": 300
}
```

Este ajuste de caché complementa el manejo seguro de errores y reduce la exposición a ataques sin perder trazabilidad.

### Puntos Clave para Configurar el Caché {id="puntos-clave-para-configurar-el-cache"}

| Aspecto | Configuración Recomendable | Razón |
| --- | --- | --- |
| Tiempo de vida del caché | 300 segundos (5 minutos) | Balance entre rendimiento y seguridad |
| Claves de Caché | Basadas en parámetros únicos como accountId, API ID, token | Evita accesos no autorizados |
| Información crítica (como permisos) | No almacenar en caché | Protege datos sensibles |

Asegúrate de alinear la configuración del caché con las políticas de seguridad, especialmente el principio de mínimo privilegio.

### Recomendaciones Adicionales {id="recomendaciones-adicionales"}

- **Mecanismo de invalidación de caché**: Útil para revocar accesos de manera inmediata.
- **Bypass temporal del caché**: Usa headers personalizados para desactivar el caché en casos excepcionales donde se requiera validación completa.
- **[Monitoreo en CloudWatch](/blog/como-habilitar-cloudwatch-logs-en-api-gateway-guia-paso-a-paso/)**: Analiza métricas de uso para ajustar el TTL según los patrones reales y mantener un equilibrio entre seguridad y experiencia del usuario.

Estas prácticas aseguran que el caché funcione como una herramienta eficiente sin comprometer la seguridad de tu API.

## 5. Monitorear y Auditar Regularmente {id="5-monitorear-y-auditar-regularmente"}

Además de optimizar el uso de caché, el monitoreo constante es clave para identificar amenazas en tiempo real y garantizar un buen desempeño.

AWS ofrece varias herramientas útiles para este propósito:

| Servicio | Función Principal | Métricas Clave |
| --- | --- | --- |
| **CloudWatch** | Recolección de métricas y logs | Errores por segundo, tiempo de respuesta, consumo de recursos |
| **CloudTrail** | Registro de actividades en la API | Cambios en configuraciones, accesos |
| **X-Ray** | Análisis y depuración | Trazas de solicitudes, tiempos de respuesta |

Configura alertas para identificar actividades fuera de lo común. Por ejemplo:

```
{
  "alarmName": "AutorizadorErrorRate",
  "metric": "Errors",
  "threshold": 5,
  "evaluationPeriods": 5,
  "period": 300
}
```

En el registro, enfócate en estos puntos:

- **Decisiones de autorización**: Registra solicitudes permitidas y denegadas.
- **Parámetros de entrada**: Guarda los datos utilizados para tomar decisiones.
- **Mensajes de error**: Incluye información detallada para facilitar la solución de problemas.
- **Direcciones IP**: Identifica el origen geográfico de las solicitudes.

### Consejos para una Auditoría Efectiva {id="consejos-para-una-auditoria-efectiva"}

- **Revisiones periódicas de código**: Evalúa posibles vulnerabilidades y asegúrate de seguir buenas prácticas.

Estas acciones refuerzan la seguridad y eficiencia de los authorizers, complementando medidas como la autenticación sólida y el principio de privilegio mínimo.

## Conclusión {id="conclusion"}

Aplicar estas cinco prácticas de manera conjunta - desde una autenticación sólida hasta un monitoreo constante - ayuda a construir una protección completa para tus APIs. Configurar Lambda Authorizers de manera segura requiere un enfoque que contemple varios aspectos clave. Las prácticas mencionadas funcionan como un sistema de defensa interconectado para las APIs en AWS, logrando mejores resultados con implementaciones consistentes y actualizaciones regulares.

Puntos clave para mantener la [seguridad en Lambda Authorizers](/blog/aws-lambda-en-profundidad/):

- **Autenticación sólida** con validación exhaustiva de tokens.
- **Aplicación del principio de mínimo privilegio** para limitar accesos innecesarios.
- **Manejo seguro de errores** para evitar fugas de información sensible.
- **Gestión eficiente del caché** para equilibrar rendimiento y seguridad.
- **Monitoreo y auditoría constantes** para detectar y responder a posibles amenazas.

La clave está en la consistencia y en ajustar estas prácticas conforme evolucionen tus APIs. Si quieres aprender más sobre este tema, puedes consultar recursos prácticos en *Dónde Aprendo AWS*, donde la comunidad hispanohablante comparte experiencias sobre cómo implementar autorizadores seguros.

## Publicaciones de blog relacionadas

- [Mejores Prácticas Para AWS Lambda](/blog/mejores-practicas-para-aws-lambda/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [9 Mejores Prácticas de Seguridad para IaC en AWS](/blog/9-mejores-practicas-de-seguridad-para-iac-en-aws/)
- [Caché para Autorizadores Lambda en API Gateway](/blog/cache-para-autorizadores-lambda-en-api-gateway/)
