+++
url = "/blog/como-habilitar-cloudwatch-logs-en-api-gateway-guia-paso-a-paso/"
title = "Cómo Habilitar CloudWatch Logs en API Gateway: Guía Paso a Paso"
description = "Aprende cómo configurar CloudWatch Logs en API Gateway para monitorear y optimizar tus APIs. Sigue esta guía paso a paso desde la creación de roles IAM hasta el análisis de registros."
date = "2024-04-29T07:48:00.212000+00:00"
lastmod = "2024-05-01"
image = "/assets/blog/f256f4a211663872e566e67fadd6ad492bfdbb35cd6c1eb79842367c94970b9c.jpg"
archive_order = 108

[[related]]
title = "Seguridad y Control de Costos en AWS: Guía 2024"
url = "/blog/seguridad-y-control-de-costos-en-aws-guia-2024/"
image = "/assets/blog/fa1b6e3bfee7c71b39327fcd7bcc6e2872e8456b64ffcf6260191d1b33b22105.jpg"

[[related]]
title = "Mejores Prácticas Para Amazon ECS"
url = "/blog/mejores-practicas-para-amazon-ecs/"
image = "/assets/blog/826c9a11a84720138c6c6ed39379158f2b584481c7c25bf832867ef749430510.jpg"

[[related]]
title = "AWS Seguridad: Fundamentos Esenciales"
url = "/blog/aws-seguridad-fundamentos-esenciales/"
image = "/assets/blog/15bc5fcf943d474b0b00277c19be81ea512d6d43ff10202c77ea749b84038659.jpg"
+++

Configurar [CloudWatch](https://aws.amazon.com/cloudwatch/) Logs para [API Gateway](https://aws.amazon.com/api-gateway/) es crucial para monitorear y depurar APIs REST y WebSocket. Esta guía te enseña cómo habilitar CloudWatch Logs, desde crear un rol de IAM hasta configurar formatos de registro de acceso.

**Beneficios Clave:**

- Monitoreo en tiempo real de solicitudes y respuestas
- Herramientas de análisis avanzadas para examinar registros
- Identificar oportunidades para mejorar el rendimiento

**Pasos Principales:**

1. **Crear un Rol de IAM**

   - Crear un rol de IAM con permisos para escribir registros en CloudWatch
   - Asociar el rol con tu API Gateway
2. **Habilitar Registro de Ejecución**

   - Configurar el nivel de registro de ejecución para tus etapas de API
3. **Configurar Formatos de Registro de Acceso**

   - Seleccionar el formato de registro de acceso deseado para tus etapas
4. **Probar la Integración**

   - Enviar solicitudes de prueba a tu API
   - Ver registros en la consola de CloudWatch
5. **Utilizar CloudWatch Insights**

   - Crear consultas para analizar registros
   - Identificar patrones y optimizar el rendimiento de tu API

Al habilitar CloudWatch Logs, puedes monitorear, depurar y optimizar tus APIs de manera efectiva. Sigue esta guía paso a paso para una configuración sencilla.

## Preparación para la registro de [CloudWatch](https://aws.amazon.com/cloudwatch/) {id="preparaci%C3%B3n-para-la-registro-de-cloudwatch"}

![CloudWatch](/assets/blog/af6613064a74b982792aeda9ceba840048121c2598cd44ec9ea1d09b78061bae.jpg)

Antes de configurar CloudWatch Logs para su API Gateway, es importante verificar que su API esté correctamente configurada y que tenga los permisos de IAM necesarios.

### Verificar la implementación de su API {id="verificar-la-implementaci%C3%B3n-de-su-api"}

Asegúrese de que su API esté correctamente desplegada y haya sido invocada al menos una vez. Esto es esencial para que los registros se generen correctamente. Verifique que su API esté configurada correctamente y que no haya errores de despliegue.

### Configuración de permisos de IAM para la registro {id="configuraci%C3%B3n-de-permisos-de-iam-para-la-registro"}

Para que API Gateway pueda escribir registros en CloudWatch, es necesario asignar los permisos de IAM adecuados. Cree un rol de IAM que tenga los permisos necesarios para escribir registros en CloudWatch. Luego, asocie este rol con su API Gateway.

**Crear un rol de IAM para la registro de CloudWatch**

1\. Inicie sesión en la consola de AWS y vaya a la página de IAM.

2\. Haga clic en "Roles" en el panel de navegación y luego haga clic en "Crear rol".

3\. Seleccione "API Gateway" como el servicio que utilizará el rol.

4\. Asigne los permisos necesarios para escribir registros en CloudWatch.

5\. Guarde el rol y anote el ARN del rol.

**Asociar el rol de IAM con su API Gateway**

1\. Vaya a la página de API Gateway, seleccione su API y luego vaya a la pestaña "Settings".

2\. En la sección "CloudWatch log role ARN", ingrese el ARN del rol de IAM que creó.

Con estos pasos, estará listo para configurar CloudWatch Logs para su API Gateway. En la próxima sección, exploraremos cómo habilitar la registro de ejecución y acceso para su API.

## Habilitar CloudWatch Logs en [API Gateway](https://aws.amazon.com/api-gateway/) {id="habilitar-cloudwatch-logs-en-api-gateway"}

![API Gateway](/assets/blog/ad213751f1e388f278f0d764b82c9dfc254c9ad31762f6bd6a0fa529b33a3dcb.jpg)

### Crear un Rol de IAM para Registro {id="crear-un-rol-de-iam-para-registro"}

Para habilitar CloudWatch Logs en API Gateway, debes crear un rol de IAM que tenga los permisos necesarios para escribir registros en CloudWatch. Sigue estos pasos para crear un rol de IAM para registro:

1\. Inicia sesión en la consola de AWS y ve a la página de IAM. 2. Haz clic en "Roles" en el panel de navegación y luego haz clic en "Crear rol". 3. Selecciona "API Gateway" como el servicio que utilizará el rol. 4. Asigna los permisos necesarios para escribir registros en CloudWatch. Puedes hacer esto agregando la política de IAM "AmazonAPIGatewayPushToCloudWatchLogs" al rol. 5. Guarda el rol y anota el ARN del rol.

### Asociar el Rol de IAM con API Gateway {id="asociar-el-rol-de-iam-con-api-gateway"}

Una vez que hayas creado el rol de IAM, debes asociarlo con tu API Gateway. Sigue estos pasos para asociar el rol de IAM con API Gateway:

1\. Ve a la página de API Gateway, selecciona tu API y luego ve a la pestaña "Settings". 2. En la sección "CloudWatch log role ARN", ingresa el ARN del rol de IAM que creaste. 3. Guarda los cambios.

### Habilitar Registro de Ejecución para Etapas de API {id="habilitar-registro-de-ejecuci%C3%B3n-para-etapas-de-api"}

Una vez que hayas asociado el rol de IAM con API Gateway, puedes habilitar el registro de ejecución para tus etapas de API. Sigue estos pasos para habilitar el registro de ejecución:

| Paso | Acción |
| --- | --- |
| 1 | Ve a la página de API Gateway, selecciona tu API y luego ve a la pestaña "Stages". |
| 2 | Selecciona la etapa de API para la que deseas habilitar el registro de ejecución. |
| 3 | En la sección "Logs and tracing", selecciona el nivel de registro de ejecución deseado. |
| 4 | Guarda los cambios. |

### Configurar Formatos de Registro de Acceso {id="configurar-formatos-de-registro-de-acceso"}

Finalmente, puedes configurar los formatos de registro de acceso para tus API. Sigue estos pasos para configurar los formatos de registro de acceso:

| Paso | Acción |
| --- | --- |
| 1 | Ve a la página de API Gateway, selecciona tu API y luego ve a la pestaña "Stages". |
| 2 | Selecciona la etapa de API para la que deseas configurar los formatos de registro de acceso. |
| 3 | En la sección "Logs and tracing", selecciona el formato de registro de acceso deseado. |
| 4 | Guarda los cambios. |

Con estos pasos, habrás habilitado CloudWatch Logs para tu API Gateway y podrás ver los registros de ejecución y acceso en la consola de CloudWatch.

## Probar la Integración de Registros de CloudWatch {id="probar-la-integraci%C3%B3n-de-registros-de-cloudwatch"}

Después de configurar la integración de registros de CloudWatch, es importante probar que funcione correctamente.

### Enviar Solicitudes de Prueba a Su API {id="enviar-solicitudes-de-prueba-a-su-api"}

Para probar la integración de registros de CloudWatch, debe enviar solicitudes de prueba a su API. Puede utilizar herramientas como [Postman](https://www.postman.com/) o [cURL](https://curl.se/) para enviar solicitudes a su API. Asegúrese de incluir headers y parámetros relevantes en su solicitud.

Una vez que haya enviado la solicitud, espere unos minutos para que los registros se generen en CloudWatch. Luego, vaya a la consola de CloudWatch y busque los registros de su API. Debe ver los registros de ejecución y acceso en la consola de CloudWatch.

### Ver Registros en la Consola de CloudWatch {id="ver-registros-en-la-consola-de-cloudwatch"}

Para ver los registros en la consola de CloudWatch, siga estos pasos:

| Paso | Acción |
| --- | --- |
| 1 | Inicie sesión en la consola de AWS y vaya a la página de CloudWatch. |
| 2 | Selecciona "Logs" en el panel de navegación. |
| 3 | Selecciona el grupo de registros que desea ver. |
| 4 | Selecciona el flujo de registros que desea ver. |
| 5 | Analice los registros para asegurarse de que se estén generando correctamente. |

Recuerde que los registros de CloudWatch pueden tardar unos minutos en aparecer en la consola. Asegúrese de esperar lo suficiente antes de buscar los registros.

Con estos pasos, podrá probar la integración de registros de CloudWatch y asegurarse de que se estén generando correctamente.

## Solucionar Problemas de Registro {id="solucionar-problemas-de-registro"}

Presenta problemas de registro comunes y sus soluciones, asegurando un proceso de configuración suave.

### Corregir Errores de Permiso {id="corregir-errores-de-permiso"}

Discute cómo resolver errores de roles y políticas de IAM que pueden obstaculizar el registro.

Cuando configura registros de CloudWatch para API Gateway, errores de permiso pueden ocurrir si el rol de IAM no está configurado correctamente. Para solucionar esto, asegúrese de que el rol de IAM tenga los permisos necesarios para escribir registros en CloudWatch. Puede hacer esto adjuntando la política administrada `AmazonAPIGatewayPushToCloudWatchLogs` al rol de IAM. Esta política otorga los permisos necesarios para que API Gateway escriba registros en CloudWatch.

Además, asegúrese de que el rol de IAM esté activado para todas las regiones de AWS donde desee habilitar registros de CloudWatch. Puede hacer esto verificando la configuración del rol de IAM en la consola de AWS Management.

### Corregir Errores de Formato de Registro {id="corregir-errores-de-formato-de-registro"}

Ofrece consejos sobre el uso correcto de variables de formato de registro y soluciona problemas relacionados con el formato.

Cuando configura formatos de registro en API Gateway, es esencial utilizar las variables correctas para capturar los datos de registro requeridos. Por ejemplo, si desea registrar el ID de solicitud, puede utilizar la variable `$context.requestId`. Asegúrese de verificar la documentación de API Gateway para la sintaxis y el uso correctos de variables de formato de registro.

Si encuentra problemas con formatos de registro, verifique los registros de API Gateway para errores y solucione según sea necesario. También puede probar sus formatos de registro utilizando la consola de API Gateway o una herramienta como Postman.

### Abordar la Falta de Datos de Registro {id="abordar-la-falta-de-datos-de-registro"}

Explora las causas potenciales de la falta de registros y estrategias para asegurarse de que los registros se capturen completamente.

Si no ve registros en CloudWatch, puede haber varias razones para esto. Una causa común es que el rol de IAM no esté configurado correctamente o que el formato de registro sea incorrecto. Para abordar esto, revise la configuración del rol de IAM y los formatos de registro para asegurarse de que sean correctos.

Otra causa potencial es que la etapa de API Gateway no esté configurada correctamente para el registro. Asegúrese de que la etapa esté configurada para registrar solicitudes y respuestas, y que el formato de registro sea correcto.

Al solucionar estos problemas comunes, puede asegurarse de que sus registros de CloudWatch estén configurados correctamente y capturen los datos requeridos.

## Utilizar CloudWatch Insights para Análisis de Registros {id="utilizar-cloudwatch-insights-para-an%C3%A1lisis-de-registros"}

Utilizar CloudWatch Insights es una forma efectiva de analizar los registros de su API y mejorar su rendimiento.

### Crear Consultas en CloudWatch Insights {id="crear-consultas-en-cloudwatch-insights"}

Para crear consultas en CloudWatch Insights, siga estos pasos:

1. Abra la consola de CloudWatch y seleccione **Insights** en el panel de navegación.
2. Seleccione el grupo de registros que desea analizar.
3. Especifique el período de tiempo que desea analizar.
4. Cree una consulta utilizando el lenguaje de consulta de CloudWatch Insights.
5. Ejecute la consulta y revise los resultados.

Por ejemplo, puede crear una consulta para ver los 10 últimos errores 4xx en su API:

```
fields @timestamp, status, ip, path, httpMethod| filter status>=400 and status<=499| sort @timestamp desc| limit 10
```

### Analizar Registros para Optimizar la API {id="analizar-registros-para-optimizar-la-api"}

Al analizar los registros en CloudWatch Insights, puede identificar patrones y tendencias que pueden ayudar a mejorar el rendimiento de su API. Por ejemplo, puede:

- Identificar los endpoints más lentos y optimizarlos para mejorar el rendimiento.
- Detectar errores comunes y solucionarlos para reducir el número de errores.
- Analizar los patrones de tráfico y ajustar la capacidad de su API para manejar picos de tráfico.

Al utilizar CloudWatch Insights para analizar los registros, puede tomar decisiones informadas para mejorar el rendimiento y la escalabilidad de su API.

| **Ventajas de utilizar CloudWatch Insights** | **Descripción** |
| --- | --- |
| Identificar patrones y tendencias | Analizar los registros para identificar patrones y tendencias que pueden ayudar a mejorar el rendimiento de su API. |
| Optimizar endpoints | Identificar los endpoints más lentos y optimizarlos para mejorar el rendimiento. |
| Reducir errores | Detectar errores comunes y solucionarlos para reducir el número de errores. |
| Ajustar la capacidad | Analizar los patrones de tráfico y ajustar la capacidad de su API para manejar picos de tráfico. |

## Conclusión: Registros de CloudWatch para la Gestión de API {id="conclusi%C3%B3n%3A-registros-de-cloudwatch-para-la-gesti%C3%B3n-de-api"}

En resumen, habilitar registros de CloudWatch en API Gateway es un paso crucial para mantener APIs de alta performance y seguridad. En esta guía, hemos cubierto los pasos detallados para configurar registros de CloudWatch, desde la creación de un rol de IAM hasta la configuración de formatos de registro de acceso. También hemos explorado las ventajas de utilizar CloudWatch Insights para analizar los registros y mejorar el rendimiento de la API.

### Ventajas de utilizar CloudWatch Logs {id="ventajas-de-utilizar-cloudwatch-logs"}

| **Ventaja** | **Descripción** |
| --- | --- |
| Identificar patrones y tendencias | Analizar los registros para identificar patrones y tendencias que pueden ayudar a mejorar el rendimiento de su API. |
| Optimizar endpoints | Identificar los endpoints más lentos y optimizarlos para mejorar el rendimiento. |
| Reducir errores | Detectar errores comunes y solucionarlos para reducir el número de errores. |
| Ajustar la capacidad | Analizar los patrones de tráfico y ajustar la capacidad de su API para manejar picos de tráfico. |

Al habilitar registros de CloudWatch, puede identificar patrones y tendencias en los registros, optimizar los endpoints lentos, reducir errores y ajustar la capacidad de su API para manejar picos de tráfico. Siguiendo los pasos detallados en esta guía, puede asegurarse de que su API esté funcionando de manera óptima y segura.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Cómo obtengo registros de [AWS](https://aws.amazon.com/) API Gateway? {id="%C2%BFc%C3%B3mo-obtengo-registros-de-aws-api-gateway%3F"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

Abre la consola de CloudWatch en <https://console.aws.amazon.com/cloudwatch/>. Si es necesario, cambia la región de AWS. En el panel de navegación, elige **Logs**, luego **Log groups**. Bajo la tabla **Log Groups**, elige un grupo de registros con el nombre `API-Gateway-Execution-Logs_{rest-api-id}/{stage-name}`.

### ¿Cómo aseguro que la registro de API en CloudWatch esté habilitada? {id="%C2%BFc%C3%B3mo-aseguro-que-la-registro-de-api-en-cloudwatch-est%C3%A9-habilitada%3F"}

Crea una API y despliégala en una etapa. Elige **Logs/Tracing** en el editor de etapas. Elige **Habilitar registros de CloudWatch** en **Configuración de CloudWatch**. Seleccione **Guardar cambios**.

### ¿Tiene registros API Gateway? {id="%C2%BFtiene-registros-api-gateway%3F"}

En el panel de navegación, elige **Logs**, luego **Log groups**. Bajo la tabla **Log Groups**, elige un grupo de registros con el nombre `API-Gateway-Execution-Logs_{rest-api-id}/{stage-name}`. Bajo la tabla **Log Streams**, elige un flujo de registros. Puedes utilizar la marca de tiempo para ayudar a ubicar el flujo de registros de tu interés.

### ¿Cómo activo registros de CloudWatch para solucionar problemas de mi API Gateway REST API o WebSocket API? {id="%C2%BFc%C3%B3mo-activo-registros-de-cloudwatch-para-solucionar-problemas-de-mi-api-gateway-rest-api-o-websocket-api%3F"}

Inicia sesión en la consola de API Gateway en <https://console.aws.amazon.com/apigateway/>. En el panel de navegación principal, elige **Configuración**, luego **Editar** bajo **Registro**. Para **ARN de rol de CloudWatch**, ingresa un ARN de un rol de IAM con permisos apropiados.

| **Preguntas** | **Respuestas** |
| --- | --- |
| ¿Cómo obtengo registros de AWS API Gateway? | Abre la consola de CloudWatch y elige un grupo de registros con el nombre `API-Gateway-Execution-Logs_{rest-api-id}/{stage-name}`. |
| ¿Cómo aseguro que la registro de API en CloudWatch esté habilitada? | Crea una API, despliégala en una etapa y habilita registros de CloudWatch en la configuración de CloudWatch. |
| ¿Tiene registros API Gateway? | Elige un grupo de registros con el nombre `API-Gateway-Execution-Logs_{rest-api-id}/{stage-name}` y selecciona un flujo de registros. |
| ¿Cómo activo registros de CloudWatch para solucionar problemas de mi API Gateway REST API o WebSocket API? | Inicia sesión en la consola de API Gateway, elige **Configuración**, luego **Editar** bajo **Registro** y ingresa un ARN de un rol de IAM con permisos apropiados. |

## Related posts

- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Observabilidad en AWS con Amazon X-Ray](/blog/observabilidad-en-aws-con-amazon-x-ray/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
