+++
url = "/blog/como-escala-dynamodb-modos-on-demand-y-provisioned/"
title = "¿Cómo Escala DynamoDB? Modos On Demand y Provisioned"
description = "Descubre cómo escalar DynamoDB con los modos On Demand y Provisioned, considerando tráfico, costos y rendimiento. DynamoDB es una base de datos NoSQL de AWS."
date = "2024-03-09T02:56:43.716000+00:00"
lastmod = "2024-04-28"
image = "/assets/blog/ce62e0cc8508d5055bba53b4a49f5440547f988cba28c60a29266ff760a6f177.jpg"
archive_order = 148

[[related]]
title = "Mejores prácticas para nombres en AWS Organizations"
url = "/blog/mejores-practicas-para-nombres-en-aws-organizations/"
image = "/assets/blog/bfdfed56910493c9a698fb14c2de783cf9822d1dc618d2071ab00ea9c8832961.jpg"

[[related]]
title = "Guía de Acreditación para Partners de AWS 2024"
url = "/blog/guia-de-acreditacion-para-partners-de-aws-2024/"
image = "/assets/blog/0d6df5a1297701914debd614dc4d88d6a722458ff4cebc3a881d3c8790c62a8d.jpg"

[[related]]
title = "Utilizando Lambda Layers en Múltiples Funciones Lambda"
url = "/blog/utilizando-lambda-layers-en-multiples-funciones-lambda/"
image = "/assets/blog/ab65afd218440c66bc564a0acdcbd738d7192df295fafe4416cab518f8845e91.jpg"
+++

Si estás considerando usar DynamoDB para tu aplicación, es crucial entender cómo escalarla adecuadamente. DynamoDB ofrece dos modos principales de escalado: **On Demand** y **Provisioned**. Aquí te doy un resumen rápido para ayudarte a elegir el mejor camino:

- **On Demand**: Ideal si no puedes predecir el tráfico de tu aplicación. Paga solo por lo que usas.
- **Provisioned**: Perfecto si conoces el tráfico esperado. Configura y paga por una capacidad específica.

**Puntos clave para tomar en cuenta**:

- **Predicibilidad del Tráfico**: On Demand para tráfico impredecible; Provisioned para tráfico predecible.
- **Costos**: On Demand puede ser más caro pero flexible; Provisioned es más económico con planificación.
- **Rendimiento y Administración**: Provisioned ofrece rendimiento desde el inicio, mientras que On Demand se ajusta según la demanda.

## Comparación Rápida {id="comparaci%C3%B3n-r%C3%A1pida"}

| Característica | On Demand | Provisioned |
| --- | --- | --- |
| Costo | Pagas por uso | Más barato con planificación |
| Escalabilidad | Automática | Manual/Automática con límites |
| Rendimiento | Mejora con el uso | Alto desde el inicio |
| Capacidad | Ilimitada | Según planificación |
| Administración | Sencilla | Requiere monitoreo y ajustes |

Elegir entre On Demand y Provisioned depende de tus necesidades específicas de rendimiento, costos y escalabilidad. Ambos modos tienen sus ventajas, y la decisión final debe basarse en una evaluación cuidadosa de tus requisitos.

### ¿Qué es DynamoDB? {id="%C2%BFqu%C3%A9-es-dynamodb%3F"}

DynamoDB es una base de datos de AWS. Es rápida, siempre está disponible y puede crecer mucho según lo necesites. Lo hace especial porque:

- Puedes guardar datos como documentos o pares de clave-valor.
- Copia tus datos en varios lugares automáticamente para que no los pierdas.
- Puede manejar mucha información y tráfico sin problemas.
- Funciona bien con otros servicios de AWS, como AWS Lambda o CloudWatch.
- Te deja elegir cómo quieres pagar y usar los recursos, con los modos On Demand o Provisioned.

En pocas palabras, DynamoDB te ayuda a hacer aplicaciones grandes sin complicarte mucho.

### Claves de Partición y Ordenación {id="claves-de-partici%C3%B3n-y-ordenaci%C3%B3n"}

En DynamoDB, guardas información en ítems. Cada ítem necesita una clave única que puede ser:

- **Clave de partición:** Como el nombre de una persona, para identificarla directamente.
- **Clave de partición + clave de ordenación:** Usas dos cosas, como nombre y apellido, para identificar a alguien de manera única.

La clave de partición ayuda a organizar y encontrar tus datos rápido. Elegir bien estas claves es importante para que todo funcione bien.

### Replicación y Consistencia de Datos {id="replicaci%C3%B3n-y-consistencia-de-datos"}

DynamoDB guarda tus datos en varios lugares al mismo tiempo para que no los pierdas si hay un problema. Esto se hace automáticamente.

Como todos los lugares pueden tener datos nuevos al mismo tiempo, a veces hay que esperar un poquito para que todos tengan la misma información. Esto se llama consistencia eventual.

Cuando lees datos, puedes elegir si quieres:

- **Eventualmente consistente:** Rápido, pero puede que no veas la última actualización inmediatamente.
- **Fuertemente consistente:** Un poco más lento, pero siempre ves la última versión de tus datos.

## Modo On Demand {id="modo-on-demand"}

El modo On Demand de DynamoDB es como tener un taxi que se agranda automáticamente cuando más amigos se suben. No tienes que decirle cuánto espacio necesitas; él lo figura por sí solo.

### Unidades de solicitud de lectura y escritura {id="unidades-de-solicitud-de-lectura-y-escritura"}

Imagina que cada vez que lees o escribes algo en DynamoDB, usas una moneda. Si lees algo pequeño, como un mensaje de texto, gastas una moneda. Si escribes algo del mismo tamaño, también es una moneda. DynamoDB cuenta cuántas monedas gastas y te cobra por eso.

### Picos de tráfico y propiedades de escalado {id="picos-de-tr%C3%A1fico-y-propiedades-de-escalado"}

En el modo On Demand, si de repente mucha gente quiere usar tu aplicación, DynamoDB automáticamente se hace más grande para que todos puedan entrar sin problemas. Puede crecer rápido y sin límites, lo que es genial si no sabes cuánta gente va a usar tu app.

### Rendimiento inicial y precalentamiento de tablas {id="rendimiento-inicial-y-precalentamiento-de-tablas"}

Al principio, las tablas en el modo On Demand empiezan un poco lentas, pero se ponen más rápidas a medida que más gente las usa. Si sabes que va a haber mucha actividad, puedes hacer una especie de ensayo general con tráfico falso para que la tabla esté lista y rápida cuando realmente la necesites.

## Modo Provisioned {id="modo-provisioned"}

El modo Provisioned de DynamoDB es como decirle de antemano a DynamoDB cuánto vas a necesitar para leer y escribir datos en tu aplicación. Tú decides cuántas 'unidades' de lectura y escritura quieres tener listas para usar.

### Unidades de capacidad de lectura y escritura {id="unidades-de-capacidad-de-lectura-y-escritura"}

- Una unidad de capacidad de lectura (RCU) permite leer datos (como un mensaje) que no pesen más de 4 KB, cada segundo.
- Una unidad de capacidad de escritura (WCU) te deja escribir datos que no superen 1 KB, cada segundo.

Si tus datos son más grandes, necesitarás más unidades. DynamoDB calcula cuántas unidades necesitas basándose en el tamaño de tus datos.

### Escalado automático de DynamoDB {id="escalado-autom%C3%A1tico-de-dynamodb"}

Puedes activar una opción para que DynamoDB ajuste automáticamente cuántas unidades de lectura y escritura necesitas, según cuánto estés usando la aplicación. Esto es útil porque mantiene tu aplicación funcionando bien, incluso si de repente mucha gente la usa más de lo normal.

El escalado automático mira cuánto estás usando y ajusta las unidades necesarias para mantener todo funcionando sin problemas.

### Capacidad reservada {id="capacidad-reservada"}

Si ya sabes que vas a necesitar una cierta cantidad de unidades todo el tiempo, puedes 'reservar' estas unidades. Esto te sale más barato que pagar por ellas mes a mes. Es como comprar al por mayor: te comprometes a usar DynamoDB por 1 o 3 años, y a cambio, te hacen un descuento.

Esta opción te ayuda a ahorrar dinero si tu aplicación necesita siempre un cierto nivel de actividad en DynamoDB.

## Comparación entre Modos {id="comparaci%C3%B3n-entre-modos"}

| Característica | On Demand | Provisioned |
| --- | --- | --- |
| Costo | Pagas solo por lo que usas. Sale más caro por cada cosa que haces. | Si planeas con anticipación, te sale más barato por cada cosa que haces. |
| Escalabilidad | Se ajusta solo y no tiene límite. | Tienes que ajustarlo tú, pero puedes ponerle que se ajuste solo. Aún así, tiene un tope. |
| Rendimiento | Al principio puede ser lento, pero mejora con el uso. | Es rápido desde que lo empiezas a usar. |
| Capacidad | No tiene límite. | Depende de lo que hayas planeado usar. |
| Complejidad | Es fácil de usar desde el principio. | Necesitas pensar cuánto vas a usar antes de empezar. |

El modo On Demand de DynamoDB se ajusta solo según cuánto lo uses, lo que lo hace fácil para empezar sin tener que preocuparte por cuánto vas a necesitar. Pero, cuesta más por cada cosa que haces.

El modo Provisioned te hace pensar y decidir cuánto vas a necesitar antes de empezar, lo que puede ser un poco más complicado al principio. Pero, si lo haces bien, te sale más barato por cada cosa que haces. También puedes reservar lo que necesitas para ahorrar más.

En resumen:

- On Demand es mejor si tu aplicación es nueva o si no sabes cuánto la van a usar.
- Provisioned es mejor si ya sabes más o menos cuánto va a usar tu aplicación.

La decisión depende de lo que necesites y de si prefieres ahorrar dinero o tener más simplicidad. DynamoDB te permite cambiar entre estos modos cuando lo necesites.

## Consideraciones para Elegir el Modo {id="consideraciones-para-elegir-el-modo"}

Al decidir si usar On Demand o Provisioned en DynamoDB, piensa en estos puntos importantes:

### Predicibilidad del Tráfico {id="predicibilidad-del-tr%C3%A1fico"}

- Si el uso de tu aplicación cambia mucho y no sabes cuánto va a variar, On Demand es una buena opción. Así no te preocupas por planear de más o de menos.
- Si sabes cómo va a ser el uso de tu aplicación, es decir, si es más o menos constante, Provisioned puede ayudarte a controlar mejor tus gastos y cómo funciona tu app.

### Flexibilidad de Costos vs. Previsibilidad de Costos {id="flexibilidad-de-costos-vs.-previsibilidad-de-costos"}

- On Demand te da más libertad pero puede que los costos te sorprendan, ya que pagas por lo que usas, sin compromisos.
- Con Provisioned, puedes planear tus gastos según lo que necesitas. Y si reservas capacidad, puedes ahorrar más.

### Requisitos de Rendimiento {id="requisitos-de-rendimiento"}

- Si es importante que tu aplicación funcione rápido y sin cambios desde el principio, Provisioned es mejor.
- Si no te preocupa mucho cómo funcione al inicio y puede mejorar con el tiempo, On Demand podría ser suficiente.

### Facilidad de Administración {id="facilidad-de-administraci%C3%B3n"}

- On Demand es más sencillo de manejar porque DynamoDB ajusta todo automáticamente.
- Con Provisioned, necesitas estar atento y ajustar las cosas cuando sea necesario.

En resumen, si prefieres algo fácil y flexible, On Demand puede ser lo tuyo. Pero si buscas controlar mejor tus costos y cómo funciona tu aplicación, con un uso bien definido, Provisioned te ofrece más control.

## Conclusiones {id="conclusiones"}

DynamoDB te da dos maneras de hacer crecer tu base de datos según lo que necesites:

- **Modo On Demand:** Es ideal si no sabes cuánto va a cambiar el uso de tu aplicación. DynamoDB se encarga de ajustarse por sí mismo y tú solo pagas por lo que usas. Es fácil de usar desde el principio, pero puede que te cueste más a largo plazo.
- **Modo Provisioned:** Es la mejor opción si tienes una idea clara de cuánto vas a usar tu base de datos. Necesitas planificar cuánta capacidad necesitas, pero esto puede ayudarte a ahorrar dinero y asegurar un buen rendimiento desde el inicio. Esto requiere más esfuerzo al principio.

Cuando elijas entre estos modos, considera:

- Qué tan fácil es prever cuánto usarás DynamoDB
- Si prefieres que DynamoDB ajuste las cosas por ti o si quieres tener más control
- Qué tan importantes son para ti el rendimiento y la disponibilidad
- Cómo está tu presupuesto y qué tanto puedes ajustarte en gastos

Para muchos, empezar con On Demand es lo más fácil mientras aprendes más sobre tu aplicación, y luego cambiar a Provisioned para mejorar los costos y el rendimiento.

DynamoDB te permite cambiar entre estos modos según cambien tus necesidades. Así, puedes aprovechar lo mejor de cada uno.

Si configuras bien desde el inicio y sigues de cerca tu uso con las métricas de CloudWatch, podrás hacer que DynamoDB trabaje a tu favor y ayudarte a crecer tu aplicación sin problemas.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué tipo de base de datos es DynamoDB? {id="%C2%BFqu%C3%A9-tipo-de-base-de-datos-es-dynamodb%3F"}

Amazon DynamoDB es una base de datos NoSQL que se encarga de todo por ti y te permite trabajar con grandes cantidades de datos. Es perfecta para aplicaciones que necesitan trabajar muy rápido y con mucha información.

### ¿Cómo se hace una consulta en DynamoDB? {id="%08%C2%BFc%C3%B3mo-se-hace-una-consulta-en-dynamodb%3F"}

Para buscar algo en DynamoDB, sigue estos pasos:

- Decide qué información específica necesitas buscar.
- Usa esa información para crear una petición de búsqueda.
- Manda esta petición a DynamoDB.
- Revisa los resultados que te devuelve DynamoDB.

Por ejemplo:

```
// Imagina que buscas algo con una clave '123'

QueryRequest queryReq = new QueryRequest()
    .withTableName("MiTabla")
    .withKeyConditionExpression("ClaveParticion = :v_id")
    .withExpressionAttributeValues(hashKeyValues);

ResultSet resultados = dynamoDB.query(queryReq);

for (Map<String, AttributeValue> item : resultados) {
    // Aquí procesas cada resultado
}
```

### ¿Para qué se usa la Clave de Ordenación en DynamoDB? {id="%C2%BFpara-qu%C3%A9-se-usa-la-clave-de-ordenaci%C3%B3n-en-dynamodb%3F"}

La Clave de Ordenación te ayuda a organizar y buscar datos de manera más eficiente en DynamoDB, especialmente cuando tienes muchos datos con la misma Clave de Partición.

### ¿Qué es una clave principal en Amazon DynamoDB? {id="%C2%BFqu%C3%A9-es-una-clave-principal-en-amazon-dynamodb%3F"}

La clave principal en DynamoDB es como un identificador único para tus datos. Está compuesta por dos partes:

- **Clave de partición:** Esta es la parte principal que identifica de manera única cada elemento.
- **Clave de ordenación:** Esta parte es opcional y te ayuda a organizar tus datos dentro de la misma clave de partición.

Por ejemplo, si tienes una tienda, podrías usar el ID del cliente como Clave de Partición y la fecha del pedido como Clave de Ordenación para organizar todos los pedidos de cada cliente.

## Related posts

- [Amazon DynamoDB: La Base de Datos NoSQL de AWS](/blog/amazon-dynamodb-la-base-de-datos-nosql-de-aws/)
- [Amazon DynamoDB: Guía Básica](/blog/amazon-dynamodb-guia-basica/)
- [Base de Datos Global con Amazon DynamoDB](/blog/base-de-datos-global-con-amazon-dynamodb/)
- [Bases de datos Relacionales en AWS con Amazon RDS y Amazon Aurora](/blog/bases-de-datos-relacionales-en-aws-con-amazon-rds-y-amazon-aurora/)
