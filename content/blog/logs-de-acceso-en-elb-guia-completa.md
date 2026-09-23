+++
url = "/blog/logs-de-acceso-en-elb-guia-completa/"
title = "Logs de acceso en ELB: Guía completa"
description = "Aprende cómo configurar y analizar los logs de acceso en ELB para mejorar la seguridad y rendimiento de tu infraestructura en AWS."
date = "2025-03-13T03:14:10.062000+00:00"
lastmod = "2025-03-17"
image = "/assets/blog/fe79fa50612b43f06d41c37af6ffbdf525d8e2321044fab1c6ed8d8e2bc045f7.jpg"
archive_order = 15

[[related]]
title = "Crear un Cluster en Amazon Redshift"
url = "/blog/crear-un-cluster-en-amazon-redshift/"
image = "/assets/blog/2ce2762453f46a717ff15e8109830be0fb7e4e0302901907324eb45ec024ff41.jpg"

[[related]]
title = "Diferencias Entre SLA y SLO en AWS"
url = "/blog/diferencias-entre-sla-y-slo-en-aws/"
image = "/assets/blog/8281401d50eb83da06a511af54feab265795e8b1dbf995ce98841bed0e415489.jpg"

[[related]]
title = "AWS gratis para educadores y estudiantes"
url = "/blog/aws-gratis-para-educadores-y-estudiantes/"
image = "/assets/blog/2e829a000de916544620390768efc5bc03b5071c56197fbeea6fea04fc2fb76e.jpg"
+++

**¿Quieres mejorar la seguridad y el rendimiento de tu infraestructura en AWS?** Los logs de acceso de Elastic Load Balancer (ELB) son clave para analizar tráfico, detectar problemas y cumplir normativas. Aquí tienes lo más importante:

- **¿Qué son los logs de acceso?** Registros que documentan cada solicitud en tu ELB, incluyendo IPs, tiempos de respuesta, códigos HTTP y más.
- **Tipos de ELB compatibles:**
  - **ALB:** Detalles HTTP/HTTPS completos.
  - **NLB:** Métricas básicas TCP/UDP.
  - **Classic:** Información tradicional sobre HTTP/TCP.
- **Cómo configurarlos:**
  1. Actívalos desde la consola de AWS o CLI.
  2. Usa un bucket S3 para almacenar los logs.
  3. Configura permisos IAM y ciclo de vida de datos.
- **Formato y análisis:** Logs comprimidos (.gz) con datos clave como tiempos de procesamiento y bytes transferidos. Analízalos con herramientas como [Amazon Athena](https://aws.amazon.com/athena/) o [CloudWatch](https://aws.amazon.com/cloudwatch/).

### Tabla rápida: Comparativa de ELB y soporte de logs {id="tabla-rapida-comparativa-de-elb-y-soporte-de-logs"}

| Tipo de ELB | Soporte de logs | Intervalo de entrega | Datos registrados |
| --- | --- | --- | --- |
| ALB | Completo | Cada 5 minutos | HTTP/HTTPS |
| NLB | Básico | Cada 5 minutos | TCP/UDP |
| Classic | Completo | Cada 5 minutos | HTTP/TCP |

**Conclusión:** Configurar y analizar los logs de ELB no solo mejora la seguridad, sino que también optimiza el rendimiento y ayuda a cumplir normativas. Sigue leyendo para aprender cómo configurarlos y sacarles el máximo partido.

## Configuración de logs de acceso {id="configuracion-de-logs-de-acceso"}

Configurar los logs de acceso en ELB es clave para mejorar tanto la seguridad como el rendimiento. Esto implica ajustar varios componentes de AWS.

### Requisitos de configuración {id="requisitos-de-configuracion"}

Para activar los logs de acceso en ELB, asegúrate de contar con lo siguiente:

- **Un bucket S3 dedicado** para almacenar los logs, lo que facilita la gestión de permisos y el ciclo de vida de los datos.
- **Permisos IAM configurados correctamente** para permitir el acceso necesario.
- **Un balanceador de carga en una VPC.**
- Configuración que permita a ELB escribir logs en el bucket.

### Habilitar el registro de acceso {id="habilitar-el-registro-de-acceso"}

El procedimiento para activar los logs depende del tipo de balanceador que utilices:

| Tipo de ELB | Método de activación | Intervalo de entrega |
| --- | --- | --- |
| ALB/NLB | AWS Console o CLI | Cada 5 minutos |
| Classic | AWS Console o CLI | Cada 5 minutos |
| Gateway | AWS Console o CLI | Cada 5 minutos |

Pasos para habilitar los logs:

1. Ve a **EC2 > Load Balancers** y selecciona el balanceador que deseas configurar.
2. En la pestaña **Attributes**, activa la opción **Access logs**.
3. Ingresa el nombre del bucket S3 donde se almacenarán los logs y, si lo deseas, añade un prefijo opcional.

Una vez hecho esto, asegúrate de configurar correctamente tu bucket S3 para completar el proceso.

### Configuración del bucket S3 {id="configuracion-del-bucket-s3"}

1. **Crea un bucket con la siguiente política de permisos:**

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::elb-account-id:root"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

2. **Configura el ciclo de vida del bucket:**

- Mueve los datos a **S3 Infrequent Access** después de 30 días.
- Archiva los logs en **S3 Glacier** tras 90 días.
- Configura la eliminación automática de los logs después de 365 días.

3. **Habilita el cifrado:**

Activa el cifrado del lado del servidor (SSE-S3) para proteger los logs almacenados.

Finalmente, realiza una prueba de escritura para confirmar que los logs se están generando correctamente en el bucket configurado.

## Formato de logs de acceso {id="formato-de-logs-de-acceso"}

Los logs de acceso de ELB siguen una estructura estándar que facilita analizar el tráfico y el rendimiento.

### Estructura del archivo de logs {id="estructura-del-archivo-de-logs"}

Los archivos de logs se almacenan en un bucket S3 con un formato específico:

```
bucket-name/prefix/AWSLogs/aws-account-id/elasticloadbalancing/region/yyyy/mm/dd/aws-account-id_elasticloadbalancing_region_load-balancer-name_end-time_ip-address_random-string.log.gz
```

Cada archivo contiene registros de 5 minutos de actividad y está comprimido en formato .gz para ahorrar espacio.

### Campos clave en los logs {id="campos-clave-en-los-logs"}

Estos son los campos principales que aparecen en cada registro:

| Campo | Descripción | Ejemplo |
| --- | --- | --- |
| timestamp | Fecha y hora en formato ISO 8601 | 2025-03-13T10:55:36.123Z |
| elb | Nombre del balanceador | app/my-loadbalancer/50dc6c495c0c9188 |
| client:port | IP y puerto del cliente | 192.168.1.1:12345 |
| target:port | IP y puerto del destino | 10.0.1.10:80 |
| request\_processing\_time | Tiempo de procesamiento inicial | 0,086 |
| target\_processing\_time | Tiempo de respuesta del servidor | 0,048 |
| response\_processing\_time | Tiempo final de respuesta | 0,037 |
| status\_code | Código HTTP de respuesta | 200 |
| target\_status\_code | Código del servidor destino | 200 |
| received\_bytes | Bytes recibidos | 1.234 |
| sent\_bytes | Bytes enviados | 5.678 |

### Ejemplo de registro {id="ejemplo-de-registro"}

```
2025-03-13T10:55:36.123Z app/my-loadbalancer/50dc6c495c0c9188 192.168.1.1:12345 10.0.1.10:80 0,086 0,048 0,037 200 200 1234 5678 "GET https://example.com:443/api/users HTTP/1.1"
```

**Desglose del ejemplo:**

- La petición se realizó el 13 de marzo de 2025 a las 10:55:36.
- El tiempo total fue de 171 ms (suma de los tres tiempos).
- La respuesta fue exitosa con un código HTTP 200.
- Se transfirieron 1,2 KB de datos de entrada y 5,5 KB de salida.

El análisis de los tiempos permite detectar posibles problemas:

- **request\_processing\_time:** 86 ms para establecer la conexión.
- **target\_processing\_time:** 48 ms en el servidor.
- **response\_processing\_time:** 37 ms para procesar y enviar la respuesta.

Estos detalles ayudan a identificar problemas de rendimiento y posibles incidencias en la red, el balanceador o los servidores.

## Métodos de análisis de logs {id="metodos-de-analisis-de-logs"}

El análisis detallado de los logs de ELB es clave para garantizar el buen funcionamiento y la estabilidad de la infraestructura. Estas prácticas complementan la configuración inicial de los registros.

### Herramientas de análisis de AWS {id="herramientas-de-analisis-de-aws"}

**Amazon CloudWatch Logs Insights**

- Permite realizar consultas SQL en tiempo real.
- Ofrece visualizaciones automáticas y genera alertas basadas en métricas.

**Amazon Athena**

- Facilita el análisis histórico mediante consultas SQL.
- Maneja grandes volúmenes de datos para crear informes detallados.

Ejemplo de consulta en Athena para identificar IPs con errores 5xx:

```
SELECT client_ip, COUNT(*) as error_count
FROM elb_logs
WHERE status_code >= 500
GROUP BY client_ip
ORDER BY error_count DESC
LIMIT 10;
```

### Herramientas de análisis externas {id="herramientas-de-analisis-externas"}

| Herramienta | Función principal |
| --- | --- |
| [Grafana](https://grafana.com/) | Crea paneles personalizados con alertas en tiempo real. |
| [ELK Stack](https://www.elastic.co/elastic-stack) | Realiza análisis profundos con búsqueda de texto completo. |
| [Splunk](https://www.splunk.com/en_us/products/splunk-enterprise.html) | Detecta amenazas y correlaciona eventos de forma eficiente. |

La combinación de estas herramientas con una estrategia de monitorización activa permite identificar problemas antes de que afecten al sistema.

### Configuración de monitorización {id="configuracion-de-monitorizacion"}

1\. **[Métricas clave](/blog/10-metricas-clave-de-devops-en-aws/)**

- Respuestas con tiempo superior a 1 segundo.
- Tasa de errores superior al 1%.
- Conexiones rechazadas.
- Comportamientos o patrones anómalos.

2\. **Sistema de alertas**

- Aumento en errores 4xx/5xx.
- Latencias inusualmente altas.
- Picos de tráfico inesperados.
- Actividad de IPs sospechosas.

3\. **Dashboards**

- Visualización de distribución geográfica del tráfico.
- Análisis de tendencias en el rendimiento.
- Métricas relacionadas con la seguridad.
- Resumen del estado general del sistema.

La correlación de los logs de ELB con registros de [CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) y VPC Flow Logs ofrece una perspectiva completa, ayudando a identificar problemas de seguridad y rendimiento de manera eficiente. Esto permite tomar medidas correctivas rápidamente y mantener la estabilidad del sistema.

## Directrices de seguridad {id="directrices-de-seguridad"}

Esta sección amplía la configuración anterior, centrándose en reforzar la seguridad de los logs.

### Gestión de logs {id="gestion-de-logs"}

Es importante gestionar los logs para garantizar su disponibilidad y protección. Aquí tienes algunas recomendaciones clave:

| Aspecto | Recomendación | Ventaja |
| --- | --- | --- |
| Retención | Define un período de retención acorde con las normativas (por ejemplo, 90 días) | Cumplimiento con regulaciones y análisis histórico |
| Rotación | Implementa rotación diaria | Mejor uso del espacio de almacenamiento |
| Organización y compresión | Utiliza GZIP y organiza los logs por año/mes/día | Ahorro de costes y gestión más eficiente |

### Controles de seguridad {id="controles-de-seguridad"}

Para proteger los registros frente a accesos no autorizados, se sugiere implementar las siguientes medidas:

- Configura el bucket con [cifrado SSE-KMS](/blog/cifrado-de-datos-con-aws-kms-guia-practica/).
- Aplica el principio de mínimo privilegio mediante roles específicos de IAM.
- Activa CloudTrail para monitorear todos los accesos.

A continuación, se muestra una política que asegura que solo se acepten objetos cifrados con SSE-KMS:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::nombre-bucket/*",
            "Condition": {
                "StringNotEquals": {
                    "s3:x-amz-server-side-encryption": "aws:kms"
                }
            }
        }
    ]
}
```

### Estándares de cumplimiento {id="estandares-de-cumplimiento"}

Asegura que la gestión de logs cumpla con normativas internacionales para fortalecer la seguridad y simplificar auditorías.

| Normativa | Requisito principal | Configuración en ELB |
| --- | --- | --- |
| GDPR | Protección de datos personales | Configurar los logs para reducir la exposición de información sensible (por ejemplo, enmascarar IPs) |
| ISO 27001 | Control de acceso | Activar logs de auditoría |
| PCI DSS | Retención de logs | Ajustar el período de retención según las directrices del estándar (por ejemplo, períodos más largos) |

**Sugerencias adicionales:**

- Etiqueta los recursos para una clasificación clara de los datos.
- Establece procesos regulares para revisar las políticas de acceso.
- Documenta todos los cambios realizados en la configuración de seguridad.
- Realiza auditorías frecuentes para verificar el cumplimiento.

Adapta estas prácticas según tus necesidades, buscando un equilibrio entre protección y accesibilidad.

Si quieres explorar más sobre seguridad y gestión de logs en AWS, visita el blog [Dónde Aprendo AWS](/).

## Problemas comunes {id="problemas-comunes"}

Al configurar y analizar los logs, pueden surgir algunos inconvenientes que es necesario abordar. Con una configuración adecuada, identificar y resolver estos problemas rápidamente es clave para garantizar la seguridad y el rendimiento del sistema.

### Problemas de configuración {id="problemas-de-configuracion"}

Los errores más habituales durante la configuración inicial suelen requerir pasos específicos para solucionarlos:

| Error | Solución |
| --- | --- |
| Access Denied | Revisa y actualiza la [política del bucket S3](/blog/mejores-practicas-para-amazon-s3/) para incluir permisos de elasticloadbalancing.amazonaws.com. |
| Logs no aparecen | Asegúrate de que el prefijo termine con una barra (/) y siga el formato: AWSLogs/AWS-account-ID/elasticloadbalancing/region/. |
| Bucket no encontrado | Verifica que el bucket exista en la misma región que el ELB. |

### Problemas de entrega de logs {id="problemas-de-entrega-de-logs"}

La entrega de logs en S3 puede tardar entre 5 y 15 minutos. Si notas problemas, considera lo siguiente:

- **Retrasos en la entrega**  
  Comprueba el estado de la cuota de servicio de S3, revisa las reglas de ciclo de vida configuradas y asegúrate de que los permisos del rol IAM sean los correctos.
- **Logs incompletos**  
  Esto puede deberse a varias causas, como:
  - El bucket S3 está lleno o se encuentra saturado.
  - Problemas de conectividad.
  - Restricciones en el ancho de banda.

Si encuentras problemas más específicos o necesitas ayuda extra, consulta los recursos disponibles.

### Recursos de ayuda {id="recursos-de-ayuda"}

| Recurso | Descripción | Acceso |
| --- | --- | --- |
| AWS Troubleshooting Guide | Guía para resolver problemas comunes. | Console > ELB > Documentación |
| CloudWatch Metrics | Métricas relacionadas con la entrega de logs. | CloudWatch > Metrics > ELB |
| AWS Support Center | Soporte técnico personalizado. | AWS Support > Create Case |
| Dónde Aprendo AWS | [Recursos en español sobre AWS](/blog/recursos-en-espanol-para-certificacion-aws-cloud-practitioner/). | [Dónde Aprendo AWS](/) |

**Consejo práctico:** Configura [alertas en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/) para monitorizar posibles errores en la entrega de logs. Establece umbrales en métricas como latencia de entrega, tasa de errores y volumen de logs procesados. Estas alertas te ayudarán a detectar y solucionar problemas antes de que afecten a los análisis de seguridad o al cumplimiento de normativas.

## Conclusión {id="conclusion"}

Gestionar los logs de acceso en ELB de forma adecuada es clave para mantener una infraestructura segura y cumplir con las [normativas en AWS](/blog/mejores-practicas-aws-para-devops/). En esta guía hemos destacado los puntos más importantes y compartido recursos útiles para seguir explorando el tema.

### Puntos clave {id="puntos-clave"}

Configurar y analizar los logs de acceso correctamente puede marcar una gran diferencia tanto en la seguridad como en el rendimiento del sistema. Aquí tienes un resumen:

| Aspecto | Ventaja | Cómo aplicarlo |
| --- | --- | --- |
| Monitorización | Identificar actividades sospechosas | Analizar patrones de acceso regularmente |
| Cumplimiento | Facilitar auditorías de seguridad | Retener logs según las normativas |
| Optimización | Mejorar el rendimiento del sistema | Evaluar métricas de latencia y errores |
| Seguridad | Evitar accesos no permitidos | Usar controles basados en los análisis |

Revisar los logs de manera sistemática permite detectar y responder rápidamente a posibles incidentes de seguridad.

### Recursos adicionales {id="recursos-adicionales"}

Si quieres ampliar tus conocimientos, aquí tienes algunos recursos recomendados:

- **Recursos en español**: El blog [Dónde Aprendo AWS](/) incluye guías detalladas sobre servicios de AWS, con tutoriales específicos sobre seguridad y monitorización.
- **Herramientas de análisis**: CloudWatch es una herramienta avanzada que puede complementar el análisis de logs de acceso.
- **[Comunidad AWS](/blog/aprender-aws-gratis-recursos-y-comunidad/)**: Los grupos de usuarios de AWS en España y Latinoamérica son excelentes para compartir experiencias y aprender [mejores prácticas](/blog/mejores-practicas-de-seguridad-en-aws/).

Establece una rutina para revisar tus logs combinando herramientas automatizadas como CloudWatch con revisiones manuales. Además, considera participar en comunidades de AWS para mantenerte al día y mejorar la seguridad operativa de tu infraestructura.

## Publicaciones de blog relacionadas

- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
- [Cómo Utilizar ElasticSearch en AWS](/blog/como-utilizar-elasticsearch-en-aws/)
- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
- [Estrategias de Correlación de Eventos AWS](/blog/estrategias-de-correlacion-de-eventos-aws/)
