+++
url = "/blog/utilizando-lambda-layers-en-multiples-funciones-lambda/"
title = "Utilizando Lambda Layers en Múltiples Funciones Lambda"
description = "Aprende a utilizar Lambda Layers en AWS Lambda para reutilizar código, reducir tamaños de paquetes y gestionar actualizaciones de manera eficiente. Descubre cómo crear, configurar y usar Lambda Layers con ejemplos prácticos."
date = "2024-03-09T02:24:39.563000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/ab65afd218440c66bc564a0acdcbd738d7192df295fafe4416cab518f8845e91.jpg"
archive_order = 152

[[related]]
title = "Mejores Prácticas de Machine Learning en AWS"
url = "/blog/mejores-practicas-de-machine-learning-en-aws/"
image = "/assets/blog/93b405bec4b3d8ac5255f4ed8176534e72d9aac826598c1038034e9ea1fe3903.jpg"

[[related]]
title = "Ingeniería de Caos en AWS con Fault Injection Simulator"
url = "/blog/ingenieria-de-caos-en-aws-con-fault-injection-simulator/"
image = "/assets/blog/0a0b1cf017845abee5cf215dfcc9e55eb775d1fa176a56153854e2b4d7b16016.jpg"

[[related]]
title = "Desarrollando Aplicaciones con AWS Lambda"
url = "/blog/desarrollando-aplicaciones-con-aws-lambda/"
image = "/assets/blog/699efcfd9fc0a59df5186b93c7fe46b36d74205b587c17c6a703259da8e1565e.jpg"
+++

Si estás buscando optimizar tus proyectos en AWS Lambda, utilizar Lambda Layers es una estrategia clave que te permite compartir código, bibliotecas y otros recursos entre múltiples funciones Lambda. Te ayudarán a:

- **Reutilizar código** fácilmente entre funciones, evitando duplicaciones.
- **Reducir los tamaños de los paquetes** de tus funciones, lo que acelera las cargas y la ejecución.
- Gestionar de manera **centralizada las actualizaciones**, aplicando cambios a múltiples funciones con una sola actualización de la Layer.
- Mejorar la **eficiencia en el desarrollo** al permitirte enfocarte en la lógica de negocio en lugar de en la gestión de dependencias.

Este artículo te guiará paso a paso sobre cómo crear, configurar y utilizar Lambda Layers para hacer tus proyectos más manejables, rápidos y organizados, con ejemplos prácticos tanto para la interfaz de AWS como para la línea de comandos.

## Beneficios de Utilizar Lambda Layers {id="beneficios-de-utilizar-lambda-layers"}

Las Lambda Layers te ayudan de varias maneras importantes cuando trabajas con aplicaciones que no necesitan un servidor fijo:

### Reutilización de Código {id="reutilizaci%C3%B3n-de-c%C3%B3digo"}

Piensa en Lambda Layers como un lugar donde puedes guardar código que varias funciones Lambda podrían necesitar. Así, en vez de copiar y pegar el mismo código en todas partes, simplemente lo pones en una capa y lo usas desde ahí. Esto hace que programar sea más rápido y reduce los errores.

### Reducción de Tamaños de Paquetes {id="reducci%C3%B3n-de-tama%C3%B1os-de-paquetes"}

Al poner cosas como librerías que no cambian mucho en una Lambda Layer, haces que los paquetes de tus funciones Lambda sean más pequeños. Esto significa que se suben y empiezan a trabajar más rápido, lo cual es genial.

### Gestión Centralizada {id="gesti%C3%B3n-centralizada"}

Si actualizas algo en una Lambda Layer, todas las funciones Lambda que la usan se actualizan automáticamente. Esto te ahorra mucho tiempo porque no tienes que ir una por una haciendo cambios.

### Eficiencia en el Desarrollo {id="eficiencia-en-el-desarrollo"}

Usar Lambda Layers hace que sea más fácil y rápido desarrollar aplicaciones sin servidor. Puedes aprovechar el código que ya existe para crear cosas nuevas más rápidamente.

## Creando una Lambda Layer {id="creando-una-lambda-layer"}

Para hacer una Lambda Layer, solo sigue estos pasos sencillos:

- **Elige el entorno de ejecución**

Primero, decide qué lenguaje de programación vas a usar y su versión. Por ejemplo, si tu código es en Python, podrías elegir `python3.8`.

- **Empaqueta tu código y lo que necesite**

Después, necesitas poner tu código y todo lo que necesite (como librerías) en un archivo ZIP. Si estás compartiendo un módulo de Python que hiciste, pon ese módulo y las librerías que usa en el ZIP.

Asegúrate de que en el ZIP solo estén los archivos necesarios y nada más, para que Lambda pueda usarlos sin problemas.

- **Sube el ZIP**

Ahora, sube ese archivo ZIP a un lugar donde Lambda pueda encontrarlo, como un bucket de S3.

- **Crea la Lambda Layer**

Con la ayuda de la consola de AWS, la línea de comandos o CloudFormation, crea la Lambda Layer. Aquí le dices dónde está tu código en S3.

- **Configura quién puede usarla**

No te olvides de definir quién puede usar tu Layer. Esto lo haces con permisos, para que solo las funciones Lambda que tú quieras puedan acceder a ella.

- **Úsala en tus funciones Lambda**

Por último, ve a tus funciones Lambda y añade la Layer que acabas de crear. Así, podrán usar todo lo que pusiste en ella.

### Cosas a tener en cuenta {id="cosas-a-tener-en-cuenta"}

Cuando hagas una Layer, recuerda que:

- No puede ser más grande de 250 MB cuando se descomprime
- Puedes poner hasta 5 Layers en una función Lambda
- Lambda guarda estas Layers en una carpeta llamada `/opt`

Siguiendo estos pasos, podrás compartir código entre tus funciones Lambda de manera fácil.

## Utilizando una Lambda Layer en Funciones Lambda {id="utilizando-una-lambda-layer-en-funciones-lambda"}

![Funciones](/assets/blog/1d9673b0b83dd7505c5ebee4d9c14425f5895a293a59350fdb5c2014d930f67e.jpg)

### Vinculando una Layer mediante la Consola de AWS {id="vinculando-una-layer-mediante-la-consola-de-aws"}

Para agregar una Lambda Layer a una de tus funciones Lambda usando la página web de AWS, sigue estos pasos sencillos:

- Entra a la página de AWS y busca la sección de Lambda.
- Elige la función Lambda a la que quieres añadir la Layer.
- Busca la pestaña que dice "Configuración" y baja hasta encontrar "Layers".
- Haz clic en "Agregar una capa".
- Ahora, elige "Especificar un ARN" y pega el ARN de la Layer que quieres usar. Dale clic a "Verificar".
- Después de verificar el ARN, solo tienes que hacer clic en "Agregar" y ya estará vinculada a tu función.

También puedes buscar la Layer por su nombre en vez de pegar el ARN. Solo recuerda elegir la versión correcta que quieres usar.

### Vinculando una Layer mediante AWS CLI {id="vinculando-una-layer-mediante-aws-cli"}

Si prefieres usar la línea de comandos de AWS para agregar una Lambda Layer a una función, aquí te dejo cómo hacerlo:

### Obtener ARN de una Lambda Layer {id="obtener-arn-de-una-lambda-layer"}

```
aws lambda list-layers --query 'Layers[?Name==mylayer].LatestMatchingVersion.LayerVersionArn'
```

### Actualizar configuración de la función para usar la Layer {id="actualizar-configuraci%C3%B3n-de-la-funci%C3%B3n-para-usar-la-layer"}

```
aws lambda update-function-configuration --function-name my-function--layers arn:aws:lambda:us-east-1:123456789012:layer:my-layer:1
```

Cambia los nombres de la función y la capa por los que estés usando. Así, estarás agregando la última versión de la Layer a tu función.

### Accediendo Contenido de la Layer desde el Código {id="accediendo-contenido-de-la-layer-desde-el-c%C3%B3digo"}

Una vez que agregas una Layer a tu función Lambda, todo lo que contiene se pone automáticamente en una carpeta llamada `/opt` en donde corre tu función.

Por ejemplo, si en tu Layer hay una carpeta llamada `/python`, puedes usar los módulos Python que estén ahí así:

```
import sys
sys.path.insert(0, "/opt/python")
import my_module
```

Igualmente, si tienes archivos de configuración o cualquier otro recurso en tu Layer, puedes acceder a ellos de la misma manera. Esto te permite compartir y reutilizar código, librerías y más entre varias funciones Lambda.

## Utilizando una Lambda Layer en Múltiples Funciones {id="utilizando-una-lambda-layer-en-m%C3%BAltiples-funciones"}

Compartir código entre varias funciones de AWS Lambda usando layers puede hacer tu vida mucho más fácil. Ayuda a evitar repetir el mismo código, hace que tus funciones funcionen más rápido y hace más sencillo arreglar o cambiar cosas. Aquí te dejo algunos consejos para usar layers de la mejor manera:

### 1. Identifica el código común {id="1.-identifica-el-c%C3%B3digo-com%C3%BAn"}

Mira bien tus funciones para ver qué código o herramientas usas más de una vez. Esto puede ser desde pedazos de código que haces tú hasta herramientas que otros han hecho. Eso es lo que deberías poner en una layer.

### 2. Crea una layer para varias cosas {id="2.-crea-una-layer-para-varias-cosas"}

Es mejor tener una layer que sirva para varias cosas en lugar de muchas layers para cosas muy específicas. Así, puedes añadir más código a la misma layer cuando lo necesites.

### 3. Sigue reglas de buen código {id="3.-sigue-reglas-de-buen-c%C3%B3digo"}

El código en tu layer debe ser fácil de entender y usar. Esto significa que debe ser claro, manejar errores de manera inteligente, tener pruebas y explicaciones de cómo se usa.

### 4. Piensa en cómo manejar cambios {id="4.-piensa-en-c%C3%B3mo-manejar-cambios"}

Decide cómo vas a actualizar tu layer cuando necesites hacer cambios. Puedes usar números de versión o tener una para usar y otra para probar cambios. Esto te ayudará a evitar problemas.

### 5. Actualiza tus funciones {id="5.-actualiza-tus-funciones"}

No te olvides de actualizar tus funciones para usar lo nuevo que pongas en la layer.

Siguiendo estos consejos, podrás sacarle más provecho a las layers y hacer que trabajar con Lambda sea más fácil.

## Consideraciones y Prácticas Recomendadas {id="consideraciones-y-pr%C3%A1cticas-recomendadas"}

### Control de Versiones {id="control-de-versiones"}

Es clave manejar bien las versiones de tus Lambda Layers. Cada vez que actualizas una Layer, se crea una nueva versión. Al usar Layers en tus funciones Lambda, es mejor vincular a una versión específica en lugar de siempre usar la última. Esto te da control sobre los cambios y evita problemas en tus funciones que ya están corriendo.

Antes de cambiar la versión de una Layer en una función Lambda, prueba bien los cambios en ambientes de prueba. Cuando estés seguro de que todo funciona bien, puedes aplicar los cambios en tus funciones que el público usa.

### Actualización de Funciones Lambda {id="actualizaci%C3%B3n-de-funciones-lambda"}

Cuando publicas una nueva versión de una Layer, las funciones Lambda que la usan no se actualizan solas. Necesitas actualizar estas funciones manualmente para que usen la nueva versión de la Layer.

Planifica cómo vas a actualizar tus funciones cuando saques nuevas versiones de tus Layers. Esto es especialmente importante para las funciones que mucha gente usa. Puedes hacer la actualización poco a poco para reducir los riesgos.

### Seguridad y Permisos {id="seguridad-y-permisos"}

Asegúrate de dar solo los permisos necesarios a tus Lambda Layers. Esto ayuda a mantener tus funciones seguras.

Si otras cuentas de AWS necesitan usar una Layer que hiciste, es mejor dar permisos específicos a esas cuentas en lugar de hacer la Layer pública. Así controlas quién puede usar tu Layer.

## Ventajas y Desventajas de Lambda Layers {id="ventajas-y-desventajas-de-lambda-layers"}

### Ventajas {id="ventajas"}

Las Lambda Layers ofrecen varias ventajas importantes:

- **Reutilización de código**: Te permiten guardar código común, bibliotecas y otros recursos en un lugar separado para compartir entre varias funciones Lambda. Esto evita que tengas que copiar el mismo código una y otra vez.
- **Reducción de tamaños de despliegue**: Al mover las dependencias a una capa, el tamaño del paquete que necesitas desplegar para cada función se hace más pequeño. Esto hace que todo funcione más rápido, especialmente cuando inicias una función por primera vez.
- **Eficiencia en el desarrollo**: Hace más fácil manejar las dependencias y las actualizaciones, ya que puedes hacer cambios en una sola Layer en vez de en cada función Lambda por separado.
- **Gestión centralizada de dependencias**: Todas las funciones que usan una Layer tendrán las mismas versiones de las dependencias, lo que ayuda a evitar problemas de inconsistencia.

### Desventajas {id="desventajas"}

Sin embargo, Lambda Layers también tiene algunas desventajas:

- Puede ser un poco complicado al principio tener que manejar capas adicionales.
- Necesitas estar atento a las versiones tanto de las Layers como de las funciones Lambda que las usan. Es necesario actualizar las funciones manualmente para usar las nuevas versiones de las Layers.
- Hay límites en cuanto al tamaño de las Layers (250 MB después de descomprimir) y cuántas Layers puedes usar por función (5).
- No puedes usar una Layer para compartir estado entre funciones.

En resumen, las Lambda Layers te ayudan a reutilizar código, ser más eficiente y manejar mejor las dependencias, pero también traen un poco de trabajo extra en cuanto a la gestión de versiones y actualizaciones.

## Conclusión {id="conclusi%C3%B3n"}

Las Lambda Layers de AWS son súper útiles cuando desarrollas aplicaciones que no necesitan un servidor propio:

### Compartir código y recursos {id="compartir-c%C3%B3digo-y-recursos"}

- Te permiten juntar código, librerías y otras cosas para compartir entre varias funciones Lambda.
- Esto ayuda a que no tengas que copiar y pegar las mismas cosas una y otra vez.

### Mejorar eficiencia {id="mejorar-eficiencia"}

- Al poner las dependencias aparte, las funciones individuales ocupan menos espacio.
- Esto hace que todo se inicie, se suba y se ejecute más rápido.

### Simplificar mantenimiento {id="simplificar-mantenimiento"}

- Si actualizas algo en una Layer, todas las funciones que la usan se actualizan solas.
- Así no tienes que ir una por una haciendo cambios.

### Control de dependencias {id="control-de-dependencias"}

- Todas las funciones usan la misma versión de lo que está en la Layer.
- Esto evita problemas porque todo está igual.

### Desarrollo ágil {id="desarrollo-%C3%A1gil"}

- Permite hacer cambios y probar cosas nuevas más rápido porque es más fácil manejar las dependencias.
- También te ayuda a usar entornos de ejecución a tu medida.

En pocas palabras, si usas bien las Layers, puedes hacer que el desarrollo de tus aplicaciones en AWS Lambda sea más rápido y sencillo. Solo asegúrate de entender bien cómo manejar las versiones y actualizaciones.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué es una Lambda Layer? {id="%C2%BFqu%C3%A9-es-una-lambda-layer%3F"}

Una Lambda Layer es básicamente un paquete de código o datos, como un archivo .zip, que contiene cosas como librerías o configuraciones. Se usa para compartir este contenido entre varias funciones Lambda sin tener que duplicarlo.

### ¿Cómo se utiliza Lambda? {id="%C2%BFc%C3%B3mo-se-utiliza-lambda%3F"}

Las funciones Lambda se usan para tareas como:

- Responder a eventos, como clics o cambios en datos.
- Procesar información al instante.
- Conectar diferentes servicios de AWS entre sí.

Lo bueno es que Lambda corre tu código solo cuando lo necesitas y no tienes que preocuparte por los servidores. Pagas solo por el tiempo que tu código está corriendo.

### ¿Qué conjunto de parámetros podemos usar en AWS Lambda? {id="%C2%BFqu%C3%A9-conjunto-de-par%C3%A1metros-podemos-usar-en-aws-lambda%3F"}

AWS Lambda soporta varios lenguajes de programación como Java, Go, Node.js, Python, entre otros. También puedes ajustar cosas como:

- La cantidad de memoria que usa tu función.
- Cuánto tiempo puede correr.
- Variables de entorno y más.

Puedes agregar Capas para incluir código o librerías extras que tu función necesita.

### ¿Cómo funciona una función Lambda? {id="%C2%BFc%C3%B3mo-funciona-una-funci%C3%B3n-lambda%3F"}

Una función Lambda se activa cuando pasa algo que la dispara, como una solicitud de web o un cambio en una base de datos.

AWS Lambda entonces corre tu función, procesa lo que tenga que hacer y termina. La próxima vez que algo active tu función, se corre de nuevo desde cero. Esto significa que no tienes que manejar servidores ni pagar por tiempo que no estás usando.

## Related posts

- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [Mejores Prácticas Para AWS Lambda](/blog/mejores-practicas-para-aws-lambda/)
- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
- [Comprendiendo AWS Step Functions](/blog/comprendiendo-aws-step-functions/)
