+++
url = "/blog/estrategias-de-cache-rentables-para-apps-serverless/"
title = "Estrategias de Caché Rentables para Apps Serverless"
description = "Descubre cómo implementar estrategias de caché en aplicaciones serverless para mejorar la velocidad y reducir costos en AWS."
date = "2024-10-27T02:26:14.893000+00:00"
lastmod = "2024-10-27"
image = "/assets/blog/ddae590c4e3ebe901251f97caf81a0cff7ca2ca4ee8c6d49f0eca7f60c8eb705.webp"
archive_order = 49

[[related]]
title = "Recursos Personalizados en CloudFormation con Lambda"
url = "/blog/recursos-personalizados-en-cloudformation-con-lambda/"
image = "/assets/blog/e66856987698eaa908dfab803a5bd604593d440bd701b71d3f347b7d5aa9217f.jpg"

[[related]]
title = "¿Cómo Escala DynamoDB? Modos On Demand y Provisioned"
url = "/blog/como-escala-dynamodb-modos-on-demand-y-provisioned/"
image = "/assets/blog/ce62e0cc8508d5055bba53b4a49f5440547f988cba28c60a29266ff760a6f177.jpg"

[[related]]
title = "Conceptos Básicos y Avanzados de Amazon VPC"
url = "/blog/conceptos-basicos-y-avanzados-de-amazon-vpc/"
image = "/assets/blog/12c27432a1ba20e5bffcb7b0275ce9ef58c3de784ac9c8bf58db435c37258643.jpg"
+++

**¿Necesitas hacer tus apps serverless más rápidas y baratas? El caché es la solución.**

Aquí tienes todo lo que necesitas saber sobre caché en serverless:

| Tipo de Caché | Ahorro | Velocidad |
| --- | --- | --- |
| Cliente (Navegador) | Sin costo | Instantáneo |
| [CloudFront](https://docs.aws.amazon.com/cloudfront/) | 35-40% menos peticiones | < 1 segundo |
| API Gateway | 45% menos llamadas [Lambda](https://docs.aws.amazon.com/lambda/) | 30ms |
| Lambda | 50-60% menos memoria | Variable |

**Los números no mienten:**

- Sin caché: $7,081.13 por 1M llamadas
- Con caché: $0.75 por 1M llamadas
- Mejora en tiempo: De 38 segundos a menos de 1 segundo

**Tres formas de implementar caché:**

| Método | Mejor Para | Principal Ventaja |
| --- | --- | --- |
| Lazy Loading | Datos poco usados | Solo guarda lo necesario |
| Write-Through | Datos que cambian mucho | Siempre actualizado |
| TTL | Datos semi-estáticos | Se limpia solo |

**Lo que debes saber:**

- El caché más cerca del usuario = mejor rendimiento
- TTL de 2-5 minutos = balance óptimo
- Lazy loading = control de memoria
- Monitoreo constante = control de costos

Este artículo te muestra paso a paso cómo implementar caché en tu app serverless, desde la configuración básica hasta técnicas avanzadas de optimización.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/z8wGSykEauI" >}}

## Problemas Clave del Caché en Serverless {id="problemas-clave-del-cach%C3%A9-en-serverless"}

El caché en sistemas serverless presenta 4 retos que afectan su funcionamiento:

### Cold Start y su Impacto {id="cold-start-y-su-impacto"}

El cold start golpea directo al rendimiento:

| Escenario | Tiempo de Respuesta |
| --- | --- |
| Función + VPC | 8.83s extra |
| Con Concurrencia | 7-66ms |
| Sin Concurrencia | 650ms |

> AWS introdujo [SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) para atacar este problema: toma una foto del estado de la función cuando se publica, la encripta y guarda en caché para acceso rápido.

### Datos Fuera de Sincronía {id="datos-fuera-de-sincron%C3%ADa"}

Cada Lambda tiene su propio caché, lo que genera:

- Datos diferentes entre servidores
- Respuestas inconsistentes
- Conexiones que no cierran bien

### Límites que Frenan el Rendimiento {id="l%C3%ADmites-que-frenan-el-rendimiento"}

| Elemento | Límite | Efecto |
| --- | --- | --- |
| Memoria | 128MB - 10GB | +6-7ms con 128MB |
| Conexiones | Timeout 60s | Conexiones muertas |
| Caché | Por contenedor | Sin garantía de datos |

### El Precio del Caché Mal Implementado {id="el-precio-del-cach%C3%A9-mal-implementado"}

Las pruebas muestran números claros:

| Caso | Resultado |
| --- | --- |
| Sin caché | 11x más lento |
| Con caché | Procesa 25 vuelos |

> Un test comparó Lambda con [ScaleOut Digital Twins](https://www.scaleoutdigitaltwins.com/): el sistema serverless necesitó bloqueos para sincronizar [DynamoDB](https://docs.aws.amazon.com/dynamodb/), mientras la plataforma en memoria lo actualizaba automáticamente. El resultado: Digital Twin procesó 25 cancelaciones (100 pasajeros/vuelo) 11 veces más rápido.

## Cómo Ahorrar con Caché {id="c%C3%B3mo-ahorrar-con-cach%C3%A9"}

El caché es una de las mejores formas de reducir costos en AWS. Veamos cómo.

### Caché en Navegador y API Gateway {id="cach%C3%A9-en-navegador-y-api-gateway"}

API Gateway incluye caché que elimina llamadas Lambda que no necesitas:

| Tipo | Velocidad | Ahorro |
| --- | --- | --- |
| Sin caché | 55ms | Precio base |
| Con caché | 30ms | 45% menos |
| Mínimo | 0.5 GB | $14.60/mes |

¿Cuánto caché necesitas? Depende del tamaño de tu API:

- APIs pequeñas: 0.5 - 1.6 GB
- APIs medianas: 6.1 - 13.5 GB
- APIs grandes: 28.4 - 237 GB

### Caché en [Lambda](https://docs.aws.amazon.com/lambda/) {id="cach%C3%A9-en-lambda"}

![Lambda](/assets/blog/90d376eb716637cb83251502868f13876f73221f98719e9b03eba99b75cde480.jpg)

Lambda puede guardar datos entre ejecuciones. Mira este ejemplo:

```
cache = {}
def get_user(user_id):
    if user_id not in cache:
        cache[user_id] = consultar_base_datos(user_id)
    return cache[user_id]
```

### Caché Lazy: Carga Solo lo que Necesitas {id="cach%C3%A9-lazy%3A-carga-solo-lo-que-necesitas"}

El caché lazy es MUY eficiente:

| Beneficio | ¿Por qué? |
| --- | --- |
| Menos memoria | Solo guarda lo usado |
| Auto-actualización | Se refresca al expirar |
| Menos consultas | Reduce carga en BD |

### Caché para Bases de Datos {id="cach%C3%A9-para-bases-de-datos"}

Elige según lo que necesites:

| Opción | Úsala para |
| --- | --- |
| DynamoDB DAX | Muchas lecturas |
| [ElastiCache](https://docs.aws.amazon.com/elasticache/) | Datos en memoria |
| CloudFront + API | Caché distribuido |

Para gastar menos:

- TTL de 2-5 minutos = balance entre velocidad y datos frescos
- Usa caché del navegador para contenido que no cambia
- Implementa caché lazy para controlar memoria
- Revisa el tamaño del caché para no pagar de más

## Guías de Configuración {id="gu%C3%ADas-de-configuraci%C3%B3n"}

### Métodos de Actualización de Caché {id="m%C3%A9todos-de-actualizaci%C3%B3n-de-cach%C3%A9"}

Hay 3 formas de mantener tu caché fresco:

| Método | Uso | Ventajas |
| --- | --- | --- |
| Lazy Loading | Datos leídos con frecuencia | Solo guarda lo necesario |
| Write-Through | Datos que cambian mucho | Siempre actualizado |
| TTL | Datos semi-estáticos | Auto-limpieza |

### Reducción de Costos {id="reducci%C3%B3n-de-costos"}

Aquí tienes código que FUNCIONA para ahorrar dinero:

```
# Caché lazy en Lambda que ahorra costos
cache = {}
def get_data(key):
    if key not in cache:
        cache[key] = obtener_datos_externos(key)
        cache['ttl'] = tiempo_actual() + 300  # 5 minutos
    return cache[key]
```

Mira estos números:

| Acción | Ahorro Estimado |
| --- | --- |
| TTL de 2-5 minutos | 30-40% menos consultas |
| Lazy Loading | 50-60% menos memoria |
| CloudFront + API Gateway | 45% menos llamadas Lambda |

### Factores de Velocidad {id="factores-de-velocidad"}

¿Qué hace lento tu caché? Aquí están los datos:

| Factor | Impacto | Solución |
| --- | --- | --- |
| Tamaño del caché | +5ms por GB | Usar lazy loading |
| Ubicación | +20-50ms entre regiones | CloudFront |
| Conexiones | +10ms por conexión | Connection pooling |

Configura ElastiCache en DOS pasos:

```
aws elasticache create-serverless-cache \
  --serverless-cache-name cache-01 \
  --description "ElastiCache para Lambda" \
  --engine valkey
```

Revisa el estado:

```
aws elasticache describe-serverless-caches \
  --serverless-cache-name cache-01
```

Configura Lambda según estos números:

| Uso de Memoria | Tiempo de Ejecución | Configuración Recomendada |
| --- | --- | --- |
| < 128MB | < 100ms | 128MB |
| 128MB - 256MB | 100-500ms | 256MB |
| > 256MB | > 500ms | 512MB o más |

## Patrones Básicos de Caché {id="patrones-b%C3%A1sicos-de-cach%C3%A9"}

### Write-Through {id="write-through"}

El write-through mantiene sincronizados el caché y la base de datos. Cada vez que escribes datos, se actualizan AMBOS lugares.

Así se implementa en Python:

```
def guardar_usuario(id_usuario, valores):
    # Guardar en DB
    registro = db.query("update usuarios ... where id = ?", id_usuario, valores)
    # Actualizar caché
    cache.set(id_usuario, registro)
    return registro
```

| Ventajas | Desventajas |
| --- | --- |
| Datos siempre al día | Escrituras más lentas |
| Sin inconsistencias | Más RAM necesaria |
| Lecturas rápidas | Costos más altos |

### Cache-Aside {id="cache-aside"}

El cache-aside (o lazy loading) solo guarda datos en caché cuando alguien los pide. Es como un almacén que solo ordena productos cuando hay demanda.

Mira cómo funciona:

```
def obtener_usuario(id_usuario):
    # Revisar caché
    registro = cache.get(id_usuario)
    if registro is None:
        # Consultar DB
        registro = db.query("select * from usuarios where id = ?", id_usuario)
        # Guardar en caché
        cache.set(id_usuario, registro)
    return registro
```

| Caso de Uso | Por Qué |
| --- | --- |
| Perfiles | Se leen más que se modifican |
| Catálogos | Cambios poco frecuentes |
| Config | Datos que casi no cambian |

¿Cuál elegir? Depende de tus necesidades:

| Aspecto | Write-Through | Cache-Aside |
| --- | --- | --- |
| Velocidad escritura | Lenta | Rápida |
| Consistencia | Alta | Media |
| Memoria | Más | Menos |
| [Costo AWS](/blog/aws-gratis-para-educadores-y-estudiantes/) | Alto | Bajo |
| Ideal para | Datos que cambian mucho | Datos estables |

## Configuración y Mejora del Caché {id="configuraci%C3%B3n-y-mejora-del-cach%C3%A9"}

El caché puede hacer o romper tu aplicación serverless. Veamos cómo hacerlo bien.

### Problemas Frecuentes {id="problemas-frecuentes"}

Estos son los dolores de cabeza más comunes con el caché:

| Problema | Por Qué Ocurre | Cómo Arreglarlo |
| --- | --- | --- |
| Variables globales que cambian | El estado persiste entre llamadas | No uses variables globales que cambien |
| Clientes DB muertos | Las conexiones se vencen | Crea un cliente nuevo en cada llamada |
| Gastos fuera de control | Mala configuración | Pon alertas y revisa métricas |
| Caché que no sirve | Datos que nadie usa | Mira qué datos necesita tu app |

### Medición del Rendimiento {id="medici%C3%B3n-del-rendimiento"}

¿Tu caché está funcionando? Aquí está cómo saberlo:

| Qué Medir | Con Qué | Qué Buscar |
| --- | --- | --- |
| Éxitos vs Fallos | API Gateway | % de aciertos |
| Velocidad | [CloudWatch](https://docs.aws.amazon.com/cloudwatch/) | Tiempo de respuesta |
| Memoria | CloudWatch | Uso de RAM |
| Usuarios simultáneos | CloudWatch | Picos de uso |

### Control de Costos {id="control-de-costos"}

Mantén tu billetera feliz:

| Qué Hacer | Para Qué | Cómo |
| --- | --- | --- |
| Monitoreo 24/7 | Ver problemas rápido | [Alarmas en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/) |
| Operaciones en grupo | Menos llamadas = menos $$ | Junta operaciones similares |
| Limpia índices | Menos espacio = menos $$ | Revisa cada mes |
| Solo guarda lo necesario | Menos datos = menos $$ | Ajusta tus consultas |

Amazon Prime Day 2022 manejó 105M de peticiones por segundo. ¿Su secreto? Un caché bien configurado.

**Dato de costos**: [Momento](https://www.gomomento.com/) cobra $0.50/GB de datos. Puede salir [más barato que DynamoDB](/blog/amazon-dynamodb-la-base-de-datos-nosql-de-aws/) si escribes mucho.

## Resumen {id="resumen"}

El caché puede reducir costos y mejorar el rendimiento de tus aplicaciones AWS. Aquí te explico cómo.

### Tipos de Caché y Sus Beneficios {id="tipos-de-cach%C3%A9-y-sus-beneficios"}

| Tipo de Caché | Para Qué Sirve | Beneficio Principal |
| --- | --- | --- |
| CloudFront | Archivos estáticos | 35-40% menos peticiones |
| API Gateway | Datos API repetitivos | 20-25% menos uso Lambda |
| Lambda | Consultas frecuentes | 30-35% menos uso DB |
| DAX | Lecturas DB intensas | 50% menos tiempo respuesta |

### Configuración Práctica {id="configuraci%C3%B3n-pr%C3%A1ctica"}

¿Cómo configurar tu caché? Así:

| Elemento | Acción | Resultado |
| --- | --- | --- |
| Memoria | Inicia pequeño | Optimiza costos |
| Eventos | Usa event-driven | Menos Lambda |
| Variables | Guarda global | Menos llamadas |
| Conexiones | No Lambdas en serie | Mejor velocidad |

### Impacto en Costos {id="impacto-en-costos"}

Mira los números:

| Servicio | Costo Base | Lo Que Ahorras |
| --- | --- | --- |
| Momento | $0.50/GB | Más barato que DynamoDB |
| DAX | Por nodo | 10x más rápido |
| CloudFront | Por datos | 50% más veloz |
| API Gateway | Por request | 25-30% menos gasto |

**Tip técnico**: Con DAX, DynamoDB pasa de milisegundos a microsegundos. Es como pasar de caminar a volar.

¿Quieres aprender más sobre caché en AWS? Visita [Dónde Aprendo AWS](/) para guías detalladas en español.

## Más Información {id="m%C3%A1s-informaci%C3%B3n"}

¿Necesitas profundizar en caché serverless? Aquí tienes los mejores recursos:

### Documentación Principal {id="documentaci%C3%B3n-principal"}

| Recurso | ¿Qué Ofrece? | ¿Por Qué Te Sirve? |
| --- | --- | --- |
| [Dónde Aprendo AWS](/) | Guías de caché serverless en español | Tutoriales paso a paso con ejemplos reales |
| AWS Docs | Docs técnicas de DAX y Lambda | Información directa de la fuente |
| AWS en Español | Contenido de la comunidad | Casos prácticos y soluciones probadas |

### Docs [AWS](https://aws.amazon.com/) que DEBES Leer {id="docs-aws-que-debes-leer"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

| Tema | Lo Que Aprenderás | Dónde Encontrarlo |
| --- | --- | --- |
| DAX | Todo sobre DynamoDB Accelerator | Sección DAX Docs |
| Lambda | Caché en funciones Lambda | Lambda Functions Docs |
| API Gateway | Optimización de API con caché | API Gateway Docs |

### Material en Español {id="material-en-espa%C3%B1ol"}

| Contenido | Formato | ¿Qué Te Aporta? |
| --- | --- | --- |
| Tutoriales | Video paso a paso | Ves la configuración en acción |
| Guías | PDF descargable | Estudias sin internet |
| Código | Repositorios Git | Copias y pegas soluciones |

> **DATO CLAVE**: AWS tiene un [e-book gratis sobre serverless](/blog/introduccion-a-serverless-en-aws/). El capítulo 4 se enfoca en caché.

### Tus Herramientas {id="tus-herramientas"}

| Tool | Para Qué Sirve | Por Qué Usarla |
| --- | --- | --- |
| AWS CDK | Código = Infraestructura | Configuras todo más rápido |
| CloudWatch | Ver métricas de caché | Detectas problemas al instante |
| Cost Explorer | Control de gastos | Ahorras dinero |

> **OJO**: AWS actualiza sus docs cada mes. Mira siempre la fecha de la última versión.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Se puede almacenar datos en caché dentro de Lambda? {id="%C2%BFse-puede-almacenar-datos-en-cach%C3%A9-dentro-de-lambda%3F"}

Sí, Lambda permite almacenar datos en caché. Hay dos formas principales:

1. En variables globales fuera del handler
2. En el directorio /tmp (hasta 512 MB)

El caché funciona SOLO mientras el entorno de ejecución está activo. Es perfecto para guardar configuraciones y datos que uses con frecuencia.

| Aspecto | Detalles |
| --- | --- |
| Ubicación | Variables globales fuera del handler |
| Límite | 512 MB en /tmp |
| Duración | Vida del entorno de ejecución |
| Mejor uso | Configs y datos estáticos |

> "Al definir una variable global fuera del handler e inicializarla en la primera invocación, tendrás acceso a ella mientras Lambda esté activo" - Saif, Dev Genius

### ¿Cómo funciona el caché en Lambda? {id="%C2%BFc%C3%B3mo-funciona-el-cach%C3%A9-en-lambda%3F"}

El caché en Lambda es simple: los datos se mantienen entre invocaciones, pero SOLO si usas el mismo entorno de ejecución.

| Característica | Comportamiento |
| --- | --- |
| Duración | Entre invocaciones del mismo entorno |
| Reset | Al desplegar nuevas versiones |
| Alcance | Solo en el entorno actual |
| Datos ideales | Configs y contenido estático |

**Lo que debes saber:**

- Revisa si hay datos en caché antes de guardar
- Define cuándo expiran tus datos
- Usa /tmp para archivos temporales
- El caché se borra con cada actualización

**Ten en cuenta:**

- El caché dura lo que dure el entorno
- Tienes 512 MB en /tmp
- No esperes que el entorno se mantenga entre llamadas

## Related posts

- [Optimización de Costos de AWS Lambda](/blog/optimizacion-de-costos-de-aws-lambda/)
- [7 Estrategias de Serverless para Startups: Optimiza Costos](/blog/7-estrategias-de-serverless-para-startups-optimiza-costos/)
- [Guía de Amazon ElastiCache: Almacenamiento en Caché en Memoria](/blog/guia-de-amazon-elasticache-almacenamiento-en-cache-en-memoria/)
- [AWS Lambda: Costo vs. Rendimiento](/blog/aws-lambda-costo-vs-rendimiento/)
