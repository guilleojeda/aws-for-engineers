+++
url = "/blog/como-monitorear-slos-con-amazon-cloudwatch/"
title = "Cómo monitorear SLOs con Amazon CloudWatch"
description = "Aprende a monitorear objetivos de nivel de servicio (SLOs) con Amazon CloudWatch, optimizando la disponibilidad y rendimiento de tus aplicaciones."
date = "2025-02-24T06:43:53.013000+00:00"
lastmod = "2025-02-27"
image = "/assets/blog/0919cf4ddfe7647a0c71877c7f59533414be113f79cb3d9b0af08ce1cece1630.jpg"
archive_order = 20

[[related]]
title = "Webinars y Eventos en AWS Marketplace"
url = "/blog/webinars-y-eventos-en-aws-marketplace/"
image = "/assets/blog/8f2a908f4bdb73449da17e826daf8e5ac4145d94e8be8bdaeb814a8a6e8b0ffc.jpg"

[[related]]
title = "Ahorro de Costos en AWS con Instancias Reservadas y Savings Plans"
url = "/blog/ahorro-de-costos-en-aws-con-instancias-reservadas-y-savings-plans/"
image = "/assets/blog/201da9e2ec2ae649f47566a7401f98e2fb0b2923c95d1321a5c17ffb05000e7c.jpg"

[[related]]
title = "Cómo Prepararte Para un Examen de Certificación de AWS"
url = "/blog/aws-curso-certificado-preparacion-para-el-examen/"
image = "/assets/blog/4cb1b939d8aa6ff5e1dc2ac1af30d53377e0a6e4e532192e4dd5e8649db1f21c.jpg"
+++

**¿Por qué usar CloudWatch para SLOs?**  
[Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) es una herramienta que te ayuda a supervisar objetivos de nivel de servicio (SLOs) para garantizar el rendimiento de tus aplicaciones. Con CloudWatch, puedes:

- **Configurar Dashboards Personalizados:** Visualiza [métricas clave](/blog/10-metricas-clave-de-devops-en-aws/) como disponibilidad, latencia y consumo de error budget.
- **Recibir Alertas Automáticas:** Configura alarmas para detectar rápidamente desviaciones en tus objetivos.
- **Analizar Rendimiento:** Usa herramientas avanzadas como Logs Insights y [AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) para identificar problemas de latencia o errores.
- **Centralizar Datos Multi-Cuenta:** Monitorea métricas desde varias cuentas AWS sin costo adicional.

**Pasos clave para empezar:**

1. **Crea un Dashboard:** Diseña un panel con widgets como gráficos de líneas para tendencias o medidores para error budgets.
2. **Configura Métricas:** Define indicadores como latencia y disponibilidad usando estadísticas específicas.
3. **Configura Alarmas:** Combina ventanas de monitoreo corto y largo plazo para detectar problemas.
4. **Usa Herramientas Avanzadas:** Aprovecha Logs Insights para búsquedas detalladas y AWS X-Ray para trazabilidad.

| Función | Beneficio |
| --- | --- |
| Dashboards Personalizados | Visualización clara de métricas clave |
| Alarmas Compuestas | Alertas más precisas y menos falsos positivos |
| Monitoreo Multi-Cuenta | Centralización de datos sin costo adicional |
| Análisis con Logs Insights | Consultas interactivas en registros |

**Conclusión:** CloudWatch simplifica el monitoreo de SLOs al automatizar métricas, alertas y análisis, ayudándote a mantener la confiabilidad de tus servicios.

## Configuración de CloudWatch para el Monitoreo de SLOs {id="configuracion-de-cloudwatch-para-el-monitoreo-de-slos"}

Aquí te mostramos cómo configurar CloudWatch para supervisar tus SLOs de manera eficiente.

### Creación de tu Primer Dashboard {id="creacion-de-tu-primer-dashboard"}

Diseña un dashboard personalizado para seguir de cerca las métricas clave de tus SLOs.

- **Acceso y configuración inicial**: Entra a CloudWatch, selecciona "Dashboards" y haz clic en "Create dashboard". Dale un nombre que represente claramente el monitoreo de tus SLOs.
- **Elección de widgets**: Los widgets son los bloques que usarás para visualizar tus métricas. Aquí tienes algunas opciones según lo que necesites:

  | Tipo de Widget | Uso Recomendado | Visualización |
  | --- | --- | --- |
  | Línea | Tendencias de latencia | Evolución temporal |
  | Número | Disponibilidad actual | Valor único |
  | Medidor | Consumo de error budget | Porcentaje visual |
  | Texto | Documentación de SLOs | Formato Markdown |
- **Organización del dashboard**: Agrupa los widgets de manera lógica. Por ejemplo, coloca los indicadores de disponibilidad junto a las alertas de burn rate para facilitar el monitoreo.

### Configuración de Métricas {id="configuracion-de-metricas"}

Una vez creado el dashboard, necesitas configurar las métricas que alimentarán tus SLOs. Application Signals recopila automáticamente datos sobre latencia y disponibilidad .

Para métricas de latencia en SLOs basados en solicitudes, usa estadísticas de *Trimmed count* (TC). Si tu umbral es de 9 ms con un operador "menor que" (<), el umbral TC se calcula como (:threshold - 1) .

### Configuración de Alertas {id="configuracion-de-alertas"}

Después de definir las métricas, configura alertas para supervisar el consumo del error budget.

Por ejemplo, si deseas recibir una alerta cuando se consuma el 2% del error budget en 60 minutos, el cálculo del umbral de burn rate sería: 2% \* 40,320 (28 días) / 60 = 13.44 .

Usa alarmas compuestas para combinar ventanas cortas (para detectar picos) y ventanas largas (para degradaciones). Además, configura [Amazon SNS](https://aws.amazon.com/sns/) para recibir notificaciones rápidas .

## Funciones Avanzadas para Monitorear SLOs {id="funciones-avanzadas-para-monitorear-slos"}

CloudWatch ofrece herramientas potentes para gestionar y monitorear SLOs en entornos complejos de AWS.

### Monitoreo Multi-Cuenta {id="monitoreo-multi-cuenta"}

CloudWatch facilita la centralización de datos de observabilidad a través de múltiples cuentas AWS. Este sistema se organiza en dos tipos de cuentas:

| Tipo de Cuenta | Función | Capacidad |
| --- | --- | --- |
| Cuenta de Monitoreo | Centro de observabilidad | Hasta 100,000 cuentas fuente |
| Cuenta Fuente | Genera datos de observación | Comparte con hasta 5 cuentas de monitoreo |

**Pasos para configurarlo:**

- Configura una Cuenta de Monitoreo para centralizar los datos.
- Vincula las Cuentas Fuente desde la consola o utilizando AWS CLI.

Un punto clave: el monitoreo multi-cuenta en CloudWatch no tiene costo adicional para logs y métricas, y la primera copia de trazas es gratuita . Esto se complementa con herramientas avanzadas que proporcionan una visión completa del rendimiento.

### Herramientas de Análisis Detallado {id="herramientas-de-analisis-detallado"}

CloudWatch incluye funciones específicas para analizar el rendimiento de los SLOs.

**CloudWatch Logs Insights**

Permite realizar búsquedas interactivas en los logs usando lenguajes como Logs Insights QL, OpenSearch Service PPL y SQL.

**Consejos para aprovechar al máximo esta herramienta:**

- Estandariza los formatos de logs para facilitar el descubrimiento automático.
- Crea índices en campos clave.
- Guarda las consultas que uses con frecuencia.

**AWS X-Ray para Trazabilidad**

AWS X-Ray recopila y visualiza datos de solicitudes, ayudando a identificar problemas como cuellos de botella y latencia elevada .

**Ventajas principales:**

- Identificación de problemas de rendimiento.
- Visualización de interacciones entre servicios.
- Análisis detallado de latencia.

**Para reducir costos:**

- Configura la expiración de logs.
- Limita los rangos de tiempo en las consultas.
- Filtra niveles de log que no sean críticos.

Estas herramientas ofrecen un enfoque práctico y detallado para garantizar que tus SLOs se cumplan de manera eficiente.

## Mejores Prácticas para Monitorear SLOs {id="mejores-practicas-para-monitorear-slos"}

Monitorear SLOs de manera efectiva requiere un enfoque estratégico y un mantenimiento constante. Aquí te mostramos cómo sacar el máximo provecho de tu [configuración en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/).

### Mantenimiento de Métricas y Alarmas {id="mantenimiento-de-metricas-y-alarmas"}

CloudWatch almacena el historial de alarmas durante 30 días, lo que facilita el análisis del rendimiento. Para mejorar la precisión de tus métricas:

| Aspecto | Configuración Recomendada | Ventaja |
| --- | --- | --- |
| Datos Faltantes | `notBreaching` para métricas continuas | Reduce falsos positivos |
| Detección de Anomalías | Activada con umbral dinámico | Ajusta automáticamente según patrones |
| Revisión de Umbrales | Mensual | Garantiza alertas más precisas |

Es crucial manejar los datos faltantes según el tipo de métrica. Por ejemplo, para métricas de disponibilidad, usar la opción `missing` cambiará el estado de la alarma a `INSUFFICIENT_DATA` si no hay datos disponibles.

### Integración con Servicios AWS {id="integracion-con-servicios-aws"}

Después de ajustar métricas y alarmas, puedes ampliar tu monitoreo integrándolo con otros servicios de AWS. Por ejemplo, Lambda envía automáticamente logs al grupo `/aws/lambda/<function name>` en CloudWatch, facilitando el seguimiento.

Un caso práctico: en diciembre de 2024, [Mamezou Tech](https://www.mamezou.com/) implementó CloudWatch Application Signals para monitorear una función Lambda, definiendo un SLO del 95%, lo que mejoró la precisión del monitoreo .

Además, Amazon SNS recopila métricas automáticamente cada minuto, lo que permite monitorear mensajes publicados, notificaciones entregadas y errores .

### Gestión de Alertas {id="gestion-de-alertas"}

Una vez configuradas las métricas y alarmas, gestionar las notificaciones es clave para responder rápidamente. CloudWatch ofrece herramientas útiles para este propósito:

- **Alarmas Compuestas**: Combinan métricas de consumo a corto y largo plazo, mejorando la precisión de las alertas .
- **Detección de Anomalías**: Utiliza inteligencia artificial para ajustar umbrales dinámicamente y minimizar falsos positivos .

Configura ventanas de supresión durante mantenimientos y aplica filtros para priorizar notificaciones críticas. Esto permite que tu equipo se enfoque en los problemas más urgentes y relevantes.

## Recursos de Aprendizaje {id="recursos-de-aprendizaje"}

Amplía tus conocimientos sobre SLOs con CloudWatch utilizando estas fuentes especializadas. Estos recursos te ayudarán a configurar y trabajar con SLOs de manera efectiva.

### Dónde Aprendo AWS {id="donde-aprendo-aws"}

El blog **Dónde Aprendo AWS** ofrece contenido en español para desarrolladores y arquitectos interesados en AWS. Entre sus artículos sobre CloudWatch, destacan:

| Nivel | Contenido | Detalles |
| --- | --- | --- |
| Principiante | [Conceptos básicos de CloudWatch](/blog/aws-fundamentos-guia-de-inicio-rapido/) | Explicaciones claras y en español |
| Intermedio | Configuración de métricas y alarmas | Ejemplos prácticos con fragmentos de código |
| Avanzado | Implementación de SLOs | Casos reales y aplicaciones prácticas |

Esta plataforma organiza los conceptos técnicos de manera progresiva, lo que facilita el aprendizaje en español.

Además, AWS ofrece recursos oficiales que complementan esta información para quienes deseen profundizar aún más.

### Recursos Oficiales de AWS {id="recursos-oficiales-de-aws"}

**[AWS Skill Builder](https://skillbuilder.aws/)** es otra excelente opción, con planes gratuitos y de pago (por ejemplo, $29 mensuales o $449 anuales) .

> "AWS Skill Builder incluye laboratorios prácticos, preparación para exámenes y AWS Digital Classroom, disponible con suscripciones anuales" .

Entre los [recursos oficiales de AWS](/blog/aprender-aws-gratis-recursos-y-comunidad/), puedes encontrar:

- Guías detalladas para configurar SLOs
- Referencias de API
- Tutoriales paso a paso
- Ejemplos de código y SDK

AWS sugiere comenzar con el nivel gratuito de Skill Builder para familiarizarse con los conceptos básicos antes de explorar funciones más avanzadas.

## Conclusión {id="conclusion"}

Después de analizar las capacidades de CloudWatch, aquí tienes un resumen de los puntos clave para implementar SLOs y mantener la confiabilidad de tus aplicaciones.

### Revisión de Puntos Principales {id="revision-de-puntos-principales"}

CloudWatch Application Signals ha cambiado las reglas del juego en el monitoreo de SLOs al ofrecer herramientas completas. Algunos aspectos destacados incluyen:

| Aspecto | Beneficio |
| --- | --- |
| Resumen de Instrumentación | Recolección automática de métricas clave |
| Alertas | Sistema flexible de alarmas para umbrales críticos |
| Análisis | Consultas avanzadas mediante CloudWatch Metrics Insights |

Con esto en mente, puedes usar estos elementos como base para construir un sistema de monitoreo eficaz.

### Guía de Implementación {id="guia-de-implementacion"}

Aquí tienes algunos pasos esenciales para implementar SLOs de manera efectiva:

1. **Definición de Objetivos**

Por ejemplo, una empresa de fitness logró mantener un 99% de disponibilidad monitoreando métricas ALB cada minuto. Esto les permitió alcanzar un 95% de solicitudes exitosas en intervalos móviles de 28 días .

2. **Configuración de Alarmas**

Crea alarmas que combinen ventanas largas (para identificar tendencias) y cortas (para detección rápida). Esto te ayudará a gestionar el consumo del error budget .

> "everything fails, all the time" - Werner Vogels, CTO de Amazon

Esta cita resalta la importancia de un monitoreo constante y proactivo. Combina automatización con supervisión manual para optimizar tus SLOs, aprovechando las capacidades de CloudWatch Application Signals para obtener datos útiles .

Si quieres profundizar más, revisa los recursos mencionados anteriormente para mejorar tu implementación y conocimiento.

## Publicaciones de blog relacionadas

- [Mejores Prácticas de Observabilidad en AWS](/blog/mejores-practicas-de-observabilidad-en-aws/)
- [Acuerdos de Nivel de Servicio AWS: Guía Básica](/blog/acuerdos-de-nivel-de-servicio-aws-guia-basica/)
- [SLAs en AWS: Conceptos Legales Clave](/blog/slas-en-aws-conceptos-legales-clave/)
- [Diferencias Entre SLA y SLO en AWS](/blog/diferencias-entre-sla-y-slo-en-aws/)
