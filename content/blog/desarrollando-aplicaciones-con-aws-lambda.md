+++
url = "/blog/desarrollando-aplicaciones-con-aws-lambda/"
title = "Desarrollando Aplicaciones con AWS Lambda"
description = "AWS Lambda es una herramienta poderosa para desarrollar aplicaciones escalables sin preocuparse por la infraestructura. Aprende sobre AWS Lambda, ventajas, casos de uso, desarrollo, despliegue, integración con otros servicios de AWS y optimización."
date = "2024-03-07T14:09:19.830000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/699efcfd9fc0a59df5186b93c7fe46b36d74205b587c17c6a703259da8e1565e.jpg"
archive_order = 170

[[related]]
title = "AWS IoT Edge Simulator: Casos de Uso Reales"
url = "/blog/aws-iot-edge-simulator-casos-de-uso-reales/"
image = "/assets/blog/7854091f527530189ba482f03c3ecab7cab7ca1a312e26d7730e079b459901eb.jpg"

[[related]]
title = "AWS Fundamentos: Guía de Inicio Rápido"
url = "/blog/aws-fundamentos-guia-de-inicio-rapido/"
image = "/assets/blog/945b48235c5e1f4c1d3cc3aefd554da5664ef56d0c3b0d0288690dbcf3fb6db9.jpg"

[[related]]
title = "AWS curso certificado: preguntas frecuentes"
url = "/blog/aws-curso-certificado-preguntas-frecuentes/"
image = "/assets/blog/39294214939c4754eb0b11e2890fbaa60074537162e5d1763964e13471ac9bb3.jpg"
+++

AWS Lambda es una potente herramienta que te permite crear aplicaciones escalables sin preocuparte por la infraestructura. Aquí te damos un resumen de lo que aprenderás en este artículo:

- **AWS Lambda**: Un servicio que ejecuta tu código sin que tengas que gestionar servidores, pagando solo por el tiempo de ejecución.
- **Ventajas**: No necesitas manejar servidores, se ajusta automáticamente a tus necesidades, está siempre disponible, pagas por uso y se integra fácilmente con otros servicios de AWS.
- **Casos de uso**: Ideal para manejar datos en tiempo real, backend para aplicaciones móviles o web, análisis de registros, notificaciones y más.
- **Desarrollo**: Te guiaremos en la creación de tu entorno de desarrollo, desde la instalación de Node.js y AWS CLI hasta el uso de herramientas como SAM para pruebas locales.
- **Creación de una función Lambda**: Paso a paso para crear tu primera función, manejo de eventos y recursos, e integración con otros servicios de AWS como S3, DynamoDB y API Gateway.
- **Despliegue y administración**: Cómo utilizar AWS SAM y CloudFormation para desplegar y gestionar tus aplicaciones, incluyendo consejos para optimizar el rendimiento y reducir costos.
- **Ejemplo práctico**: Desarrollaremos una aplicación completa para manejar tareas, utilizando un frontend en React, backend en Lambda, almacenamiento en DynamoDB y autenticación con Cognito.

Sigue leyendo para descubrir cómo aprovechar al máximo AWS Lambda y crear aplicaciones eficientes y escalables sin preocuparte por la infraestructura.

### Funcionamiento {id="funcionamiento"}

- Subes tu código a Lambda y decides qué eventos lo harán correr.
- Si ocurre uno de esos eventos, Lambda pone en marcha tu código usando contenedores temporales que provee AWS.
- Lo mejor es que solo pagas por el tiempo que tu código está activo y en uso.

### Ventajas {id="ventajas"}

- **No hay que manejar servidores:** Olvídate de configurar o mantener servidores.
- **Se ajusta solo:** Lambda aumenta o reduce su capacidad según lo que necesite tu aplicación, sin que tengas que hacer nada.
- **Siempre disponible:** Tu código está listo para correr en diferentes lugares al mismo tiempo, lo que significa menos problemas.
- **Pagas por uso:** Solo te cobran por el tiempo que tu código está corriendo.
- **Funciona bien con otros servicios:** Se puede conectar fácilmente con otros servicios de AWS como DynamoDB, S3, API Gateway, y más.

### Casos de uso {id="casos-de-uso"}

AWS Lambda es perfecto para:

- Manejar datos que se actualizan constantemente
- Hacer funcionar las partes traseras de aplicaciones móviles o de internet
- Organizar y analizar registros o métricas
- Enviar mensajes o avisos
- Preparar y mover datos (ETL)
- Hacer tareas administrativas de forma automática

En pocas palabras, Lambda te ayuda a crear aplicaciones que pueden crecer y cambiar fácilmente, sin que te preocupes por los detalles técnicos de los servidores.

## Preparación del Entorno de Desarrollo {id="preparaci%C3%B3n-del-entorno-de-desarrollo"}

Antes de meternos de lleno en el desarrollo de aplicaciones usando AWS Lambda, necesitamos asegurarnos de tener todo listo. Aquí te explicamos paso a paso lo que tienes que hacer:

### Creación de una cuenta AWS {id="creaci%C3%B3n-de-una-cuenta-aws"}

- Primero que nada, si no tienes una cuenta de AWS, necesitas crear una. Es gratis y te da acceso a muchos servicios, incluido Lambda, por 12 meses sin costo.
- Después de tener tu cuenta, puedes entrar a la consola de AWS para ver y manejar tus servicios.

### Instalación de Node.js {id="instalaci%C3%B3n-de-node.js"}

- Necesitas tener Node.js en tu computadora. Lo puedes descargar de [nodejs.org](https://nodejs.org/es/). Con Node.js, podrás correr código JavaScript localmente.
- Al instalar Node.js, también obtendrás npm, que es una herramienta para instalar otras herramientas y librerías que necesites.

### Instalación de AWS CLI {id="instalaci%C3%B3n-de-aws-cli"}

La AWS Command Line Interface (CLI) te permite manejar tus servicios de AWS directamente desde la terminal:

- Para instalarla, sigue las instrucciones en la [documentación oficial](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).
- Cuando esté instalada, necesitas [configurarla](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) con tus credenciales. Esto te permitirá interactuar con tu cuenta de AWS desde la terminal.

### Otras herramientas útiles {id="otras-herramientas-%C3%BAtiles"}

Hay otras herramientas que pueden hacerte la vida más fácil cuando trabajas con Lambda:

- Un editor de código como [Visual Studio Code](https://code.visualstudio.com/) es muy útil para escribir y editar tus funciones Lambda.
- El [plugin SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) de AWS te ayuda a probar tus funciones localmente antes de subirlas.
- AWS Cloud9 es un entorno de desarrollo integrado (IDE) en la nube que ya viene con soporte para Lambda.

Con estas herramientas listas, ya estás preparado para empezar a crear y probar tus propias funciones Lambda.

## Creación de tu Primera Función Lambda {id="creaci%C3%B3n-de-tu-primera-funci%C3%B3n-lambda"}

Para empezar con una función Lambda en AWS, solo sigue estos pasos sencillos:

- Entra a la consola de AWS y busca la sección de Lambda.
- Dale clic a "Crear función".
- Ponle un nombre a tu función y elige "Autor desde cero".
- Elige el lenguaje de programación que prefieras (como Node.js o Python).
- Sube el código de tu función directamente o mediante un archivo .zip.
- Decide cuánto tiempo puede correr tu función (de 1 segundo a 15 minutos).
- Escoge cuánta memoria necesita tu función (128MB hasta 3008MB).
- Decide cómo se va a activar tu función Lambda (por eventos, peticiones HTTP, etc.).
- Al dar clic en "Crear función", tu primera función Lambda estará lista.

### Cómo maneja Lambda los eventos y recursos {id="c%C3%B3mo-maneja-lambda-los-eventos-y-recursos"}

Tu función Lambda se queda esperando hasta que algo la active, como si estuviera dormida. Esto puede ser:

- Una petición HTTP a través de Amazon API Gateway
- Un archivo nuevo en un bucket de Amazon S3
- Una fila nueva en una tabla de Amazon DynamoDB
- Un mensaje en una cola de Amazon SQS
- Y muchos más

Lambda se ocupa de preparar todo para que tu función corra solo cuando sea necesario. Le da a tu función lo que necesita (memoria, CPU) y la ejecuta con la información del evento.

Después de que tu función hace su trabajo, Lambda se deshace de los recursos y espera al siguiente evento. Solo pagas por el tiempo que tu función estuvo activa, lo que ayuda a ahorrar.

Además, Lambda ajusta automáticamente los recursos si de repente tu función necesita más por más peticiones o trabajo. Esto significa que puedes tener muchas funciones listas sin pagar de más, solo pagas cuando realmente se usan.

En pocas palabras, Lambda hace que no tengas que preocuparte por la parte técnica de los servidores. Te permite concentrarte en el código y en cómo mejorar tus aplicaciones.

## Integración con Otros Servicios de AWS {id="integraci%C3%B3n-con-otros-servicios-de-aws"}

AWS Lambda funciona muy bien con otros servicios de AWS como Amazon S3, Amazon DynamoDB y Amazon API Gateway. Esto te permite armar aplicaciones más completas sin necesidad de preocuparte por los servidores.

### Integración con Amazon S3 {id="integraci%C3%B3n-con-amazon-s3"}

Imagina que cada vez que subes una foto a un espacio de almacenamiento en la nube (un bucket de S3), automáticamente se redimensiona o se le pone una marca de agua. Con AWS Lambda, puedes hacer que esto pase automáticamente. Solo subes la foto y Lambda se encarga del resto, procesando la imagen y guardando los cambios donde tú quieras.

### Integración con Amazon DynamoDB {id="integraci%C3%B3n-con-amazon-dynamodb"}

Amazon DynamoDB es una base de datos que no requiere servidores. Puedes hacer que cada vez que alguien añada información a la base de datos (como un nuevo pedido), Lambda se active y realice acciones como enviar un correo de confirmación o actualizar otra base de datos. Esto te ayuda a automatizar tareas sin complicaciones.

### Integración con Amazon API Gateway {id="integraci%C3%B3n-con-amazon-api-gateway"}

Con Amazon API Gateway, puedes hacer que tus funciones Lambda respondan a solicitudes web, como cuando alguien visita una página de tu aplicación. Por ejemplo, podrías tener diferentes funciones para manejar usuarios, productos o pedidos, cada una activada por diferentes partes de tu aplicación web. Esto significa que puedes construir la parte de atrás de tu aplicación (el backend) usando solo Lambda y API Gateway, lo que la hace fácil de escalar y mantener.

En resumen, AWS Lambda te permite conectar y automatizar tareas entre diferentes servicios de AWS, haciendo que el desarrollo de aplicaciones sea más sencillo y sin preocupaciones por la infraestructura.

## Administración y Despliegue con AWS SAM y CloudFormation {id="administraci%C3%B3n-y-despliegue-con-aws-sam-y-cloudformation"}

AWS Serverless Application Model (SAM) y AWS CloudFormation son dos herramientas que te ayudan a manejar y poner en marcha aplicaciones que no necesitan servidores, como las que usan AWS Lambda.

### Introducción a AWS SAM {id="introducci%C3%B3n-a-aws-sam"}

Piensa en AWS SAM como una ayuda extra para AWS CloudFormation, que te permite describir de manera sencilla cómo quieres que sea tu aplicación sin servidores. Con SAM, puedes decirle a AWS cómo quieres que funcionen tus Lambda, cómo se activan y qué otros servicios necesitan, todo esto usando un lenguaje fácil de entender en archivos YAML o JSON.

Lo bueno de SAM es que:

- Te facilita mucho el trabajo al crear aplicaciones sin servidores.
- Puedes probar tus Lambda en tu propia computadora.
- Ayuda a que tus aplicaciones se actualicen solas con AWS CodeDeploy.
- Funciona bien con herramientas de CI/CD como AWS CodePipeline.

En pocas palabras, SAM te quita complicaciones y te deja concentrarte en tu código.

### Introducción a AWS CloudFormation {id="introducci%C3%B3n-a-aws-cloudformation"}

AWS CloudFormation te permite decirle a AWS todo lo que necesita tu aplicación, como funciones Lambda, bases de datos y espacios de almacenamiento, usando archivos en formato JSON o YAML. Esto se llama "plantillas".

Cuando usas una plantilla de CloudFormation, AWS crea automáticamente todo lo que le pediste. Esto es genial porque:

- Puedes manejar tu infraestructura como si fuera código, lo que significa que puedes hacer cambios fácilmente.
- Hacer cambios es tan simple como actualizar tus plantillas.
- Tus despliegues son automáticos y seguros.
- Puedes usarlo para diferentes ambientes, como desarrollo, pruebas y producción.
- Se integra fácil con procesos de CI/CD.

En resumen, CloudFormation es una manera excelente de manejar la infraestructura de tus aplicaciones sin servidores.

### Desplegando una aplicación Lambda con AWS SAM {id="desplegando-una-aplicaci%C3%B3n-lambda-con-aws-sam"}

Para poner en marcha una aplicación Lambda usando SAM, solo sigue estos pasos:

- Escribe cómo quieres que sea tu aplicación en un archivo YAML usando SAM.
- Usa el comando `sam package` para preparar tu aplicación.
- Finalmente, usa `sam deploy` para lanzar tu aplicación en AWS.

Un ejemplo de cómo podría verse una plantilla SAM es:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31    
Description: Plantilla SAM sencilla
Resources:
  MiFuncion: 
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: mi_funcion/
      Handler: app.lambda_handler
      Runtime: python3.7
      Events:
        MiEvento:
          Type: Api 
          Properties:
            Path: /funcion
            Method: get
```

Con solo usar `sam deploy`, esta plantilla creará una función Lambda y la conectará a una dirección web para que la puedas usar.

### Optimizaciones y Consejos {id="optimizaciones-y-consejos"}

Aquí van algunos consejos para que tus aplicaciones sin servidores sean mejores:

- Usa SAM para lo básico y CloudFormation cuando necesites más control.
- Guarda tus plantillas en un lugar seguro como Git.
- Prueba tus funciones en tu computadora antes de subirlas.
- Automatiza tus despliegues usando herramientas como CodePipeline.
- Mantén un ojo en CloudWatch Logs para ver cómo va todo.
- Comparte código entre funciones usando AWS::Serverless::LayerVersion.

Usar estas herramientas juntas te ayudará a crear aplicaciones Lambda que son fuertes, pueden crecer fácilmente y son simples de manejar.

## Optimización y Mejores Prácticas {id="optimizaci%C3%B3n-y-mejores-pr%C3%A1cticas"}

Para que tus aplicaciones serverless en AWS Lambda funcionen mejor y gasten menos, te recomendamos seguir estos consejos:

### Optimización del rendimiento {id="optimizaci%C3%B3n-del-rendimiento"}

- **Haz tus funciones pequeñas**: Trata de que cada función haga una sola cosa y que sea lo más sencilla posible. Así, correrán más rápido.
- **Elige bien los recursos**: Empieza con poca memoria y tiempo de ejecución, y luego ajusta según lo que necesites. Esto ayuda a no gastar de más.
- **Comparte código con capas**: Si varias funciones usan el mismo código, mejor compártelo usando capas. Esto ahorra espacio y tiempo.
- **Guarda datos fuera de Lambda**: Usa otros servicios como DynamoDB o S3 para guardar información, en lugar de hacerlo dentro de las funciones. Esto hace que todo sea más rápido.

### Reducción de costos {id="reducci%C3%B3n-de-costos"}

- **Evita que se ejecuten de más**: Asegúrate de que tus funciones solo se activen cuando sea realmente necesario.
- **Vigila cómo van las cosas**: Activa CloudWatch para ver cómo se comportan tus funciones. Si algo no va bien, te avisará.
- **Usa aprovisionamiento en frío si puedes**: Si no te importa que las cosas tarden un poco en empezar, esta opción puede ayudarte a gastar menos.

### Mantenimiento y actualizaciones {id="mantenimiento-y-actualizaciones"}

- **Prueba antes de subir cambios**: Usa herramientas como SAM para probar tus funciones en tu computadora. Así, evitarás problemas cuando las subas a AWS.
- **Automatiza las subidas**: Con herramientas de CI/CD como CodePipeline, puedes hacer que los cambios se suban solos después de probarlos.
- **Usa diferentes entornos**: Ten un lugar para probar, otro para desarrollar y otro para la versión final. Así, puedes arreglar errores antes de que afecten a tus usuarios.
- **Escribe lo que pasa**: Con CloudWatch Logs puedes ver todo lo que hacen tus funciones. Esto es muy útil para entender y arreglar problemas.

Siguiendo estos pasos, podrás hacer que tus aplicaciones en AWS Lambda sean más eficientes, gasten menos y sean más fáciles de mantener.

## Ejemplo Práctico: Desarrollando una Aplicación Completa con AWS Lambda {id="ejemplo-pr%C3%A1ctico%3A-desarrollando-una-aplicaci%C3%B3n-completa-con-aws-lambda"}

En esta parte, te mostraremos cómo crear una aplicación completa sin servidores usando AWS Lambda y otros servicios de AWS.

### Descripción de la Aplicación {id="descripci%C3%B3n-de-la-aplicaci%C3%B3n"}

Vamos a hacer una aplicación sencilla para manejar tareas. Esta aplicación permitirá a los usuarios ver sus tareas, añadir nuevas y eliminar las que ya no necesiten. Usaremos:

- Un frontend con React para la parte visual.
- Lambda y API Gateway para el backend.
- DynamoDB para guardar las tareas.
- Cognito para que los usuarios puedan entrar a su cuenta.
- CloudFormation para poner todo en marcha de manera automática.

### Preparación del Entorno {id="preparaci%C3%B3n-del-entorno"}

Antes de empezar, necesitamos preparar nuestro espacio de trabajo con lo siguiente:

- Node.js y npm para el código del frontend y las funciones Lambda.
- AWS CLI para manejar los servicios de AWS.
- SAM CLI para probar las funciones Lambda en nuestra computadora.
- Git para guardar versiones de nuestro código.
- Un editor de código, como Visual Studio Code.

### Desarrollo del Backend {id="desarrollo-del-backend"}

Primero, vamos a armar el backend con funciones Lambda que harán cosas como:

- `GetTasks`: Mostrar las tareas.
- `CreateTask`: Añadir una tarea nueva.
- `UpdateTask`: Cambiar una tarea.
- `DeleteTask`: Quitar una tarea.

Cada función estará conectada a su propio enlace en API Gateway.

Probaremos estas funciones en nuestra máquina con SAM CLI antes de subirlas a AWS.

### Desarrollo del Frontend {id="desarrollo-del-frontend"}

Para el frontend, haremos una aplicación con React. Esta tendrá pantallas para:

- Entrar a la cuenta (`Login`).
- Ver las tareas (`TaskList`).
- Añadir una tarea nueva (`NewTask`).

El frontend usará las funciones Lambda a través de API Gateway para trabajar con las tareas.

### Despliegue Automatizado {id="despliegue-automatizado"}

Para poner todo en línea de forma automática, usaremos CloudFormation. Esto nos permite describir cómo queremos que sea nuestra infraestructura (como las funciones Lambda, las tablas de DynamoDB, y más) con un archivo de texto. Luego, con solo un comando (`sam deploy`), AWS creará todo por nosotros.

### Conclusión {id="conclusi%C3%B3n"}

Así es como se crea una aplicación completa sin servidores, con un backend en AWS Lambda y un frontend en React. Hemos usado varias herramientas y servicios de AWS para hacer que todo funcione bien juntos. Al probar localmente y organizar bien nuestro código, hemos logrado hacer una aplicación que se puede escalar, es segura y fácil de mantener.

## Conclusión {id="conclusi%C3%B3n-1"}

AWS Lambda es una herramienta genial para hacer aplicaciones sin tener que manejar servidores y sin gastar mucho. Aquí van algunas ideas importantes que hemos visto:

- Te permite correr código sin tener que preocuparte por cómo se hace por detrás. Solo pagas por el tiempo que tu código está funcionando.
- Es muy útil para que tu aplicación pueda atender a más gente sin que tengas que hacer mucho, y además ayuda a gastar menos, ya que solo usa los recursos que necesita.
- Funciona muy bien con otros servicios de AWS como DynamoDB, S3, API Gateway, entre otros. Esto te ayuda a crear aplicaciones completas sin mucho lío.
- Herramientas como SAM (AWS Serverless Application Model) y CloudFormation te hacen la vida más fácil para organizar y poner en marcha tus aplicaciones sin servidores.
- Si sigues recomendaciones como hacer funciones pequeñas, usar los recursos de manera inteligente y automatizar lo que puedas, tus aplicaciones pueden ser muy eficientes.

Te animamos a que empieces a experimentar creando tus propias funciones Lambda. A medida que vayas practicando, podrás hacer aplicaciones sin servidores que sean fuertes, que se puedan agrandar fácilmente y que no gasten mucho.

## Related posts

- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
- [Desarrollo en la nube: fundamentos esenciales](/blog/desarrollo-en-la-nube-fundamentos-esenciales/)
- [Nube AWS: Guía de Inicio Rápido](/blog/nube-aws-guia-de-inicio-rapido/)
