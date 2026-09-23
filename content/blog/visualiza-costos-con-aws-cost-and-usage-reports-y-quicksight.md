+++
url = "/blog/visualiza-costos-con-aws-cost-and-usage-reports-y-quicksight/"
title = "Visualiza Costos con AWS Cost and Usage Reports y QuickSight"
description = "Transforma tus datos de costos de AWS en visualizaciones efectivas con Cost and Usage Reports y QuickSight, optimizando así tus gastos en la nube."
date = "2025-09-04T02:52:29.834000+00:00"
lastmod = "2025-09-08"
image = "/assets/blog/bcf6fecd181e12cedeeed88a06ce3a2772dabdc03625a03f3037d670c0942f94.jpg"
archive_order = 3

[[related]]
title = "Guía Completa sobre Amazon EFS y FSX"
url = "/blog/guia-completa-sobre-amazon-efs-y-fsx/"
image = "/assets/blog/9018003cbe19f3288dffc90db7c7a7d94fee595cd2bdf77174d63cc61ff40fca.jpg"

[[related]]
title = "AWS Seguridad: Servicios Esenciales"
url = "/blog/aws-seguridad-servicios-esenciales/"
image = "/assets/blog/2ac2bf3abc517088f07fb8373042f9db35518d931753f3731ab00a02eb661cfd.jpg"

[[related]]
title = "Certificaciones AWS: Por Dónde Empezar"
url = "/blog/aws-curso-certificado-guia-de-inicio/"
image = "/assets/blog/50f3a9e16de9a8db356f87d52e5a3f82d200f0661a5df7de439d420c33088307.jpg"
+++

**Gestionar los costos en AWS puede ser complejo, pero con [AWS Cost and Usage Reports](/blog/analisis-de-costos-de-aws-con-cost-explorer/) (CUR) y [Amazon QuickSight](/blog/amazon-redshift-el-poder-del-data-warehousing-en-aws/), puedes transformar datos detallados de facturación en gráficos claros y útiles.** Esta guía te muestra cómo integrar estas herramientas para analizar y optimizar tus gastos en la nube, con configuraciones específicas para España.

### Resumen rápido: {id="resumen-rapido"}

- **[AWS Cost and Usage Reports](https://aws.amazon.com/aws-cost-management/aws-cost-and-usage-reporting/) (CUR):** Ofrecen datos detallados de uso y costos, organizados por hora, día o mes, y se almacenan en [Amazon S3](/blog/clases-de-almacenamiento-de-amazon-s3/).
- **[Amazon QuickSight](https://aws.amazon.com/quicksight/):** Permite crear visualizaciones interactivas para identificar patrones de gasto y oportunidades de ahorro.
- **Configuraciones locales para España:**
  - Moneda: Euros (€).
  - Formato de fecha: dd/mm/aaaa.
  - Retención de datos conforme al [RGPD](https://es.wikipedia.org/wiki/Reglamento_General_de_Protecci%C3%B3n_de_Datos).
- **Pasos clave:**
  1. Configura los informes CUR en AWS Billing.
  2. Almacena los datos en S3 en formato Parquet.
  3. Importa y transforma los datos en QuickSight.
  4. Crea paneles personalizados para analizar costos.

Al final, tendrás un sistema automatizado para visualizar y controlar tus gastos en AWS, alineado con normativas locales y optimizado para equipos en España.

## Requisitos previos y configuración {id="requisitos-previos-y-configuracion"}

Antes de comenzar con la integración de **AWS Cost and Usage Reports** y **QuickSight**, es fundamental preparar adecuadamente tu entorno de AWS. Esta configuración inicial será clave para garantizar que las visualizaciones de costes sean precisas y útiles. A continuación, te detallamos los pasos esenciales para avanzar en este proceso.

### Requisitos de la cuenta de AWS {id="requisitos-de-la-cuenta-de-aws"}

Para llevar a cabo esta integración, necesitas una cuenta de AWS con permisos completos sobre **[AWS Billing and Cost Management](/blog/gestion-de-facturacion-de-aws-guia-completa/)**, ya que desde ahí se generan los informes de costes y uso.

- **Permisos en Amazon S3**: Asegúrate de contar con permisos de lectura y escritura en **Amazon S3**, ya que este servicio almacenará los informes. También deberás gestionar buckets y configurar políticas de acceso adecuadas.
- **Permisos en QuickSight**: Necesitarás permisos de administrador para crear y gestionar conjuntos de datos, análisis y dashboards en QuickSight.
- **Acceso a la Billing Console**: Verifica que tu cuenta tenga habilitado el acceso a la consola de facturación. En cuentas organizacionales, este acceso debe ser concedido por el administrador de la cuenta maestra. Sin este permiso, no podrás configurar los informes ni acceder a los datos detallados de facturación.

### Habilitación de [AWS Cost and Usage Reports](https://aws.amazon.com/aws-cost-management/aws-cost-and-usage-reporting/) {id="habilitacion-de-aws-cost-and-usage-reports"}

![AWS Cost and Usage Reports](/assets/blog/a2d18332c80dad43d9a314c844e0221849bdbf224ec2b3f8f01c5a9ca409e8e7.jpg)

1. **Accede a la consola de facturación**: Dirígete a la sección "Cost and Usage Reports" en la consola de **[AWS Billing and Cost Management](https://aws.amazon.com/aws-cost-management/billing-and-cost-management-console-home/)**.
2. **Crea un informe**: Asigna un nombre claro y descriptivo, como *"CUR-QuickSight-España-2025"*. Activa las opciones:
   - *"Include resource IDs"* para obtener más detalle.
   - *"Automatically refresh your Cost & Usage Report"* para mantener los datos siempre actualizados.
3. **Configura el almacenamiento en S3**:
   - Usa un bucket en la misma región donde planeas trabajar con QuickSight para mejorar el rendimiento y reducir costes.
   - Organiza los informes creando un prefijo específico en el bucket, como *"cur-reports/"*.
4. **Formato de archivo**: Selecciona **Parquet** con compresión **GZIP** para optimizar tanto el almacenamiento como las consultas.

### Configuraciones específicas para España {id="configuraciones-especificas-para-espana"}

Una vez habilitados los informes, ajusta los parámetros para adaptarlos al contexto español.

- **Moneda y formato regional**:
  - Configura la moneda en **euros (€)**.
  - Establece el formato de fecha en **dd/mm/aaaa**.
  - Usa la zona horaria **Europa/Madrid (CET/CEST)**.
  - En QuickSight, ajusta la localización para que los valores numéricos utilicen coma como separador decimal y punto para los miles (por ejemplo, *1.234,56 €*).
- **Cumplimiento del RGPD**: Asegúrate de que los informes no incluyan información personal identificable. Revisa etiquetas y nombres de recursos para evitar datos sensibles.
- **Política de retención de datos**: Configura en S3 un periodo de retención acorde con la legislación fiscal española. Consulta con un asesor fiscal para determinar el tiempo adecuado.
- **Gestión de accesos en QuickSight**:
  - Crea grupos específicos para diferentes roles, como el departamento financiero, administradores de TI y directivos.
  - Define niveles de acceso según las necesidades de cada grupo, restringiendo o ampliando el detalle de los informes de costes según corresponda.

## Preparación e importación de datos CUR para QuickSight {id="preparacion-e-importacion-de-datos-cur-para-quicksight"}

Después de configurar los informes de costes y uso (CUR), el siguiente paso es acceder a los datos almacenados en Amazon S3 y prepararlos para su uso en QuickSight. Este proceso es clave para garantizar que las visualizaciones reflejen con precisión la información de facturación.

### Acceso a los datos CUR en [Amazon S3](https://aws.amazon.com/s3/) {id="acceso-a-los-datos-cur-en-amazon-s3"}

![Amazon S3](/assets/blog/adfa51fc26660bbc630e6960d34ebf4d689cd3e77ed1b0b759a65e50f721df28.jpg)

Los informes CUR se guardan automáticamente en el bucket de S3 configurado durante la instalación inicial. Para acceder a ellos, entra en la consola de Amazon S3 y localiza el bucket correspondiente. La estructura típica de las carpetas es: `/nombre-del-informe/año/mes/día/`. Por ejemplo: `/CUR-QuickSight-España-2025/2025/09/04/`. Dentro de cada carpeta diaria, encontrarás varios archivos, siendo el más relevante el que tiene la extensión `.parquet` (si elegiste este formato al configurar el informe).

El formato Parquet es ideal para análisis de costes, ya que su estructura columnar permite consultas más rápidas y un uso más eficiente del espacio de almacenamiento. Algunas columnas clave que deberías identificar son:

- **UsageStartDate**: Fecha de inicio del uso.
- **ProductCode**: Código del producto.
- **UsageAmount**: Cantidad de uso.
- **BlendedCost**: Coste combinado (en la moneda configurada).

Una vez localizados estos archivos, estarás listo para preparar los datos para su importación en QuickSight.

### Preparación de datos para la importación {id="preparacion-de-datos-para-la-importacion"}

Para optimizar las visualizaciones en QuickSight, realiza las siguientes transformaciones:

- **Filtrar por periodos específicos**: Los CUR suelen incluir datos históricos extensos. Si tu análisis se centra en un mes o trimestre concreto, filtra únicamente los registros relevantes para ese periodo.
- **Agrupar servicios relacionados**: Dado que AWS ofrece una amplia gama de servicios, agruparlos puede simplificar la interpretación inicial. Por ejemplo, combina "Amazon Elastic Compute Cloud", "Amazon Elastic Block Store" y "Amazon Virtual Private Cloud" bajo una categoría como "Infraestructura de cómputo".
- **Excluir registros con coste cero**: Los CUR incluyen entradas con coste cero, como servicios gratuitos o créditos aplicados. Si tu análisis se enfoca en los gastos, puedes eliminarlos, aunque conservarlos puede ser útil para analizar el uso global de los recursos.

Tras realizar estos ajustes, los datos estarán listos para ser importados en QuickSight.

### Importación de datos CUR a QuickSight {id="importacion-de-datos-cur-a-quicksight"}

1. Accede a la consola de QuickSight y selecciona "Conjuntos de datos" en el menú principal. Haz clic en "Nuevo conjunto de datos" y elige "S3" como fuente de datos.
2. Introduce la URL completa del archivo manifest generado por AWS junto con los informes CUR. Este archivo, con un formato como `s3://tu-bucket/tu-informe/tu-informe-Manifest.json`, contiene toda la información necesaria para que QuickSight importe los datos correctamente.
3. QuickSight detectará el esquema de los datos y sugerirá tipos de columna adecuados automáticamente.

**Configuración de actualizaciones automáticas**: Programa QuickSight para sincronizar la importación de datos con las actualizaciones de los CUR. Si los informes se generan a una hora específica, ajusta la sincronización para que ocurra después de que los datos hayan sido procesados.

**Mejora del rendimiento**: Para grandes volúmenes de datos, activa [SPICE](https://docs.aws.amazon.com/quicksight/latest/user/spice.html) (Super-fast, Parallel, In-memory Calculation Engine) en QuickSight. Esto permite almacenar los datos en memoria, acelerando considerablemente el tiempo de carga de los paneles frente a las consultas directas a S3.

### Localización para usuarios españoles {id="localizacion-para-usuarios-espanoles"}

Para garantizar que los datos sean accesibles y comprensibles para los usuarios en España, ajusta las configuraciones durante la importación en QuickSight. Cambia el formato de fecha a **"dd/MM/yyyy"** y utiliza la coma como separador decimal. Además, personaliza los nombres de las columnas principales para que sean más descriptivos en español. Por ejemplo:

- Cambia `lineItem/BlendedCost` por **"Coste total"**.
- Cambia `product/ProductName` por **"Servicio AWS"**.

Estos ajustes no solo facilitan la comprensión de los datos, sino que también ayudan a que los usuarios adopten más fácilmente las herramientas de análisis.

## Creación de visualizaciones de costes en QuickSight {id="creacion-de-visualizaciones-de-costes-en-quicksight"}

Después de preparar e importar los datos CUR, el siguiente paso es convertir esos números en visualizaciones claras que ayuden a interpretar y gestionar los costes en AWS de forma más eficiente. Al cargar los datos en QuickSight, puedes diseñar paneles interactivos que transformen la información de facturación en gráficos fáciles de entender. Con los datos listos, es hora de crear herramientas visuales que permitan un análisis más profundo y un control detallado de los costes.

### Creación de paneles para análisis de costes {id="creacion-de-paneles-para-analisis-de-costes"}

Para empezar, ve a la sección "Análisis" de QuickSight y selecciona el conjunto de datos CUR que has importado. Haz clic en **"Crear análisis"** para abrir una interfaz en blanco, donde podrás configurar los gráficos necesarios para tu panel.

Para un análisis detallado, utiliza los siguientes campos clave como dimensiones: **"Servicio AWS"** (ProductCode), **"Fecha de uso"** (UsageStartDate) y **"Tipo de uso"** (UsageType). Como métricas principales, selecciona **"Coste total"** (BlendedCost) y **"Cantidad de uso"** (UsageAmount). Con estos datos, puedes identificar qué servicios generan más gastos y observar patrones de uso a lo largo del tiempo.

Elige diferentes tipos de gráficos según el propósito del análisis. Por ejemplo:

- **Gráficos de líneas**: ideales para mostrar tendencias a lo largo del tiempo.
- **Gráficos de barras**: útiles para comparar costes entre distintos servicios.
- **Gráficos circulares**: perfectos para visualizar cómo se distribuye el presupuesto.

Además, incluye filtros interactivos que permitan a los usuarios ajustar las vistas según sus necesidades. Configura filtros por **rango de fechas**, **servicios específicos** y **regiones de AWS**. Esto resulta especialmente útil para equipos que gestionan varios proyectos o departamentos dentro de una misma cuenta de AWS.

### Personalización de visualizaciones para usuarios españoles {id="personalizacion-de-visualizaciones-para-usuarios-espanoles"}

Una vez que tengas los elementos básicos del panel, es fundamental adaptarlo a las convenciones locales de los usuarios en España. Asegúrate de que los números y fechas sigan el formato español, como el uso de comas para decimales y puntos para separar miles.

También es importante traducir los términos técnicos al español. Por ejemplo, cambia "Cost" por **"Coste"**, "Service" por **"Servicio"** y "Usage" por **"Uso"**. Estos ajustes no solo mejoran la comprensión, sino que también hacen que la herramienta sea más accesible para los usuarios.

Para reforzar la claridad visual, utiliza una paleta de colores que facilite distinguir entre diferentes servicios. Esto es especialmente relevante si estás mostrando múltiples elementos en un solo gráfico.

### Consejos de diseño de paneles {id="consejos-de-diseno-de-paneles"}

Diseña los paneles con una jerarquía visual clara para que los usuarios puedan encontrar rápidamente la información más importante. Coloca los **indicadores clave de rendimiento (KPI)** en la parte superior, destacando métricas como el coste total mensual, la variación respecto al mes anterior y el servicio más caro.

Utiliza un sistema de colores que facilite la interpretación rápida de los datos: verde para costes dentro del presupuesto, amarillo para advertencias y rojo para gastos críticos. Este tipo de codificación visual ayuda a identificar problemas de un vistazo.

Combina diferentes tipos de gráficos en un mismo panel para ofrecer perspectivas variadas. Por ejemplo, incluye un gráfico de líneas para visualizar tendencias junto con una tabla que detalle los costes por servicio.

Añade **filtros en cascada** que permitan profundizar en los datos. Por ejemplo, un filtro principal por servicio puede actualizar automáticamente otros gráficos para mostrar solo la información relevante a ese servicio.

Por último, incluye **anotaciones y comentarios** en los gráficos para explicar picos de coste o eventos específicos. Asegúrate de que el diseño sea compatible con dispositivos móviles, ya que muchos usuarios accederán a los paneles desde sus teléfonos o tablets. Esto garantiza que la información sea accesible y útil en cualquier momento y lugar.

Con los paneles ya en funcionamiento, es crucial garantizar que solo los usuarios autorizados tengan acceso, preservando así la integridad de la información financiera y cumpliendo con las normativas europeas de protección de datos. Aquí te explicamos cómo configurar roles y controles para reforzar la seguridad de los datos.

## Roles de usuario en QuickSight {id="roles-de-usuario-en-quicksight"}

QuickSight dispone de tres roles principales que puedes asignar según las responsabilidades de cada usuario:

- **Lector:** Este rol permite únicamente visualizar paneles y análisis compartidos, sin posibilidad de editar o crear contenido.
- **Autor:** Además de las funciones del Lector, permite crear y modificar análisis, paneles y conjuntos de datos.
- **Administrador:** Proporciona control total sobre la cuenta, incluyendo la gestión de usuarios, configuración de seguridad y administración de recursos.

Para mantener la seguridad, aplica el principio de menor privilegio: otorga a cada usuario solo los permisos estrictamente necesarios para desempeñar su función. Además, revisa periódicamente los roles asignados y ajústalos si cambian las responsabilidades.

## Configuración de controles de acceso {id="configuracion-de-controles-de-acceso"}

Una vez definidos los roles, es fundamental implementar controles adicionales para reforzar la seguridad. QuickSight Enterprise Edition incluye herramientas avanzadas que permiten restringir el acceso basado en permisos específicos. Estas opciones son ideales para limitar la información accesible según el nivel de cada usuario.

Activa la autenticación multifactor (MFA) en todas las cuentas con acceso a QuickSight. También, utiliza [AWS CloudTrail](/blog/como-habilitar-cloudwatch-logs-en-api-gateway-guia-paso-a-paso/) para auditar las llamadas de API relacionadas con QuickSight. Esto te ayudará a identificar patrones de acceso inusuales o cambios no autorizados en la configuración. Estas medidas son esenciales para cumplir con las normativas del RGPD.

## Cumplimiento del [RGPD](https://es.wikipedia.org/wiki/Reglamento_General_de_Protecci%C3%B3n_de_Datos) {id="cumplimiento-del-rgpd"}

El Reglamento General de Protección de Datos (RGPD) impone requisitos específicos para el manejo de datos personales en España y el resto de la Unión Europea. Bajo el modelo de [responsabilidad compartida de AWS](/blog/aws-seguridad-fundamentos-esenciales/), Amazon garantiza la [seguridad de la infraestructura](/blog/aws-seguridad-servicios-esenciales/), mientras que tú eres responsable de la configuración y seguridad de los servicios que utilizas.

Para cumplir con el RGPD, asegúrate de implementar medidas de seguridad adecuadas en tu configuración de QuickSight. Estas acciones no solo protegen la información financiera sensible, sino que también aseguran que tu organización opere dentro del marco legal europeo.

## Conclusión {id="conclusion"}

### Puntos principales {id="puntos-principales"}

La combinación de **AWS Cost and Usage Reports con Amazon QuickSight** convierte datos complejos de facturación en gráficos claros y fáciles de interpretar. Esto no solo ayuda a identificar patrones de gasto, sino que también facilita la [optimización de costes](/blog/10-estrategias-de-optimizacion-de-costos-en-aws/) de manera más eficiente. Además, ajustar configuraciones regionales (como el formato de fecha, moneda y números) asegura que los dashboards sean más útiles y relevantes para equipos en España.

El **cumplimiento del RGPD** es crucial. Configurar roles y controles de acceso adecuados protege la información financiera sensible y asegura que las operaciones se mantengan dentro del marco legal europeo. Con estos puntos clave en mente, es hora de pasar a las siguientes acciones para optimizar y compartir tus dashboards.

### Próximos pasos {id="proximos-pasos"}

Después de configurar y crear las visualizaciones, asegúrate de **programar actualizaciones SPICE** con la frecuencia necesaria para mantener los datos actualizados. Comparte los dashboards con los responsables de cada departamento para promover una mayor conciencia sobre los costes.

Revisa regularmente el **"QuickSight Usage Analytics Dashboard"** para localizar cuentas inactivas que puedan eliminarse, optimizando así los costes asociados a las licencias. Además, configura alertas de presupuesto que te avisen cuando el gasto esté cerca de alcanzar los límites establecidos.

Crea **informes mensuales de costes** específicos para cada departamento utilizando las herramientas de reporting de QuickSight. Esto facilita la rendición de cuentas interna y fomenta una gestión más eficiente. Analizar continuamente los patrones de uso te ayudará a identificar nuevas oportunidades de optimización a medida que tu implementación crezca.

## FAQs {id="faqs"}

### ¿Cómo puedo garantizar que los datos de mis informes CUR cumplan con el RGPD al usar Amazon QuickSight? {id="como-puedo-garantizar-que-los-datos-de-mis-informes-cur-cumplan-con-el-rgpd-al-usar-amazon-quicksight"}

Para garantizar que tus informes de **Cost and Usage Reports (CUR)** cumplen con el RGPD al integrarlos con Amazon QuickSight, es clave seguir las prácticas recomendadas de seguridad y protección de datos proporcionadas por AWS. Un punto fundamental es **evitar incluir información confidencial** en etiquetas o campos de texto libre. Además, utiliza controles de acceso para restringir la visibilidad de datos sensibles exclusivamente al personal autorizado.

Refuerza la seguridad aplicando medidas como el **cifrado de datos** y la realización de auditorías periódicas. AWS, por su parte, cumple con diversos programas de cumplimiento que facilitan la gestión segura de datos personales en línea con la normativa. Consulta las guías específicas de AWS para asegurarte de que tu implementación cumple con los requisitos del RGPD de manera adecuada.

### ¿Por qué es recomendable usar el formato Parquet con compresión GZIP para almacenar los informes de costos en Amazon S3? {id="por-que-es-recomendable-usar-el-formato-parquet-con-compresion-gzip-para-almacenar-los-informes-de-costos-en-amazon-s3"}

El formato Parquet, combinado con la compresión GZIP, es una excelente opción para almacenar informes de costos en Amazon S3. ¿Por qué? Porque permite **ahorrar espacio de almacenamiento** al comprimir los datos de forma eficiente, lo que se traduce en una reducción de los gastos asociados al almacenamiento.

Pero no solo se trata de ahorrar dinero. Este formato también está diseñado para **mejorar el rendimiento en consultas y procesamiento de datos**, especialmente cuando se trabaja con grandes volúmenes de información. Esto significa que puedes gestionar y analizar tus informes de costos de manera más rápida y eficiente, obteniendo los datos clave que necesitas sin complicaciones innecesarias.

### ¿Cómo puedo personalizar las visualizaciones de Amazon QuickSight para equipos en España? {id="como-puedo-personalizar-las-visualizaciones-de-amazon-quicksight-para-equipos-en-espana"}

Para ajustar las visualizaciones de Amazon QuickSight para equipos en España, es clave configurar la interfaz en español y adaptar los informes a las normas locales. Esto implica emplear el símbolo **€** para la moneda, el formato de fecha **día/mes/año**, y los separadores decimales y de miles que se usan en España.

También es importante elegir fuentes y estilos que sean claros y fáciles de leer, ya que esto mejora la comprensión de los datos. Estas adaptaciones no solo hacen que los informes sean más comprensibles, sino que también mejoran la experiencia del usuario y ayudan a interpretar la información de manera precisa dentro del contexto local.

## Publicaciones de blog relacionadas

- [Análisis de Costos de AWS con Cost Explorer](/blog/analisis-de-costos-de-aws-con-cost-explorer/)
- [10 Estrategias de Optimización de Costos en AWS](/blog/10-estrategias-de-optimizacion-de-costos-en-aws/)
- [Guía Completa: Análisis de Costos de Tráfico en AWS](/blog/guia-completa-analisis-de-costos-de-trafico-en-aws/)
- [Cómo Usar AWS Cost Explorer para Tráfico de Red](/blog/como-usar-aws-cost-explorer-para-trafico-de-red/)
