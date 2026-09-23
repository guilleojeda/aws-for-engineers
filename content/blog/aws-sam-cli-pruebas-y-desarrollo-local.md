+++
url = "/blog/aws-sam-cli-pruebas-y-desarrollo-local/"
title = "AWS SAM CLI: Pruebas y Desarrollo Local"
description = "Aprende a desarrollar y probar aplicaciones serverless localmente con AWS SAM CLI, simulando servicios como Lambda y API Gateway."
date = "2024-11-27T00:08:23.504000+00:00"
lastmod = "2024-11-27"
image = "/assets/blog/fa48e5370fe3d3489c8fb4d5f84eb579f0af1c00e15bf19600c2ef96357152a2.jpg"
archive_order = 40

[[related]]
title = "Cómo Utilizar Amazon Bedrock"
url = "/blog/como-utilizar-amazon-bedrock/"
image = "/assets/blog/40a012e9c33f0668e83afad879bded12e019c9070aea4f525b1609a1be24cf68.jpg"

[[related]]
title = "Cómo crear Infraestructura como Código en AWS con AWS CloudFormation"
url = "/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/"
image = "/assets/blog/7b36649641ff19d02f4e3551ab2602e6cc1637868a3f1efce9093a63eba3dacf.jpg"

[[related]]
title = "AWS Seguridad: Mejores Prácticas"
url = "/blog/aws-seguridad-mejores-practicas/"
image = "/assets/blog/58bea5d60c133d57e4a0bdbf31f2667ab339ea25ffae689b54e830ef790cc553.jpg"
+++

[AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli.html) te permite desarrollar y probar [aplicaciones serverless](/blog/introduccion-a-serverless-en-aws/) directamente en tu computadora, simulando servicios de AWS como Lambda y API Gateway sin necesidad de subir tu código a la nube. Esto ahorra tiempo y dinero, y facilita la detección de errores. Aquí tienes lo esencial para empezar:

**¿Qué puedes hacer con AWS SAM CLI?**

- Probar funciones Lambda localmente con `sam local invoke`.
- Simular APIs con `sam local start-api`.
- Crear eventos de prueba con `sam local generate-event`.
- Depurar tu código paso a paso con herramientas como [VS Code](https://code.visualstudio.com/).

**Herramientas necesarias:**

1. **[AWS CLI](https://docs.aws.amazon.com/cli/)**: Para interactuar con AWS desde la terminal.
2. **AWS SAM CLI**: Para trabajar con aplicaciones serverless.
3. **Docker**: Para simular el entorno de Lambda localmente.

**Pasos básicos:**

1. Instala las herramientas necesarias.
2. Configura tus [credenciales de AWS](/blog/aws-curso-certificado-guia-basica/).
3. Crea tu primer proyecto con `sam init`.
4. Prueba y depura tu aplicación localmente antes de desplegarla.

Con AWS SAM CLI, puedes desarrollar aplicaciones serverless de manera más rápida y económica, asegurándote de que funcionen correctamente antes de subirlas a la nube. ¡Empieza hoy!

## Video relacionado de YouTube {id="video-relacionado-de-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/Z_GAa9WToMM" >}}

## Preparando tu Entorno Local {id="preparando-tu-entorno-local"}

¿Listo para crear aplicaciones serverless con AWS SAM CLI? Empecemos configurando tu espacio de trabajo local.

### Instalando [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli.html) y Herramientas Requeridas {id="instalando-aws-sam-cli-y-herramientas-requeridas"}

![AWS SAM CLI](/assets/blog/9ae244d7bf0fd9827aedbb221735c51cea545fba59a20823911b6d8e0e7ec228.jpg)

Necesitas tres herramientas básicas para empezar:

**AWS CLI**: Es tu puente directo con AWS desde la terminal. Instálalo siguiendo la [guía de instalación](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

**AWS SAM CLI**: Esta herramienta te permite trabajar con aplicaciones serverless. Sigue la [guía de instalación](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) y comprueba que funciona con:

```
sam --version
```

**Docker**: Te permite simular Lambda en tu computadora. Bájalo desde [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Configurando Credenciales de AWS y Creando Proyectos SAM {id="configurando-credenciales-de-aws-y-creando-proyectos-sam"}

Primero, configura tus [credenciales AWS](/blog/seguridad-en-la-nube-aws-estrategias-clave/). El [Manual de AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) te guía paso a paso.

Para crear tu primer proyecto, ejecuta:

```
sam init
```

Este comando te crea todo lo que necesitas:

- Un archivo template.yaml para tu configuración
- Una función Lambda lista para usar
- Tests básicos y dependencias

> **Pro tip**: Si trabajas con Python, elige una plantilla que ya incluya `boto3`. Te ahorrará tiempo después.

### Comprendiendo la Plantilla SAM {id="comprendiendo-la-plantilla-sam"}

La plantilla SAM es el corazón de tu aplicación serverless. Aquí tienes un ejemplo básico:

```
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambda_handler
      Runtime: python3.9
      CodeUri: ./src
      Policies:
        - AWSLambdaBasicExecutionRole
```

¿Qué hace cada parte? Es simple:

- **Resources**: Define qué servicios AWS vas a usar
- **Functions**: Configura tus funciones Lambda (runtime, handler, etc.)

¿Quieres aprender más? La [documentación oficial](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html) tiene todos los detalles.

Para recursos en español, visita [Dónde Aprendo AWS](/). Encontrarás guías y ejemplos que complementan lo que acabamos de ver.

## Usando AWS SAM CLI para Pruebas Locales {id="usando-aws-sam-cli-para-pruebas-locales"}

AWS SAM CLI te ayuda a probar tus aplicaciones serverless en tu computadora antes de subirlas a AWS. Es como tener un mini AWS en tu máquina local - ahorras dinero y tiempo en el desarrollo.

### Probando Funciones Lambda Localmente {id="probando-funciones-lambda-localmente"}

¿Quieres probar tus funciones Lambda sin subirlas a AWS? El comando `sam local invoke` es tu mejor amigo. Así puedes ejecutar y verificar tus funciones:

```
sam local invoke "HelloWorldFunction" -e events/event.json --debug
```

Este comando ejecuta tu función con datos de prueba que tú defines. Si algo sale mal, puedes revisar paso a paso qué está pasando.

### Simulando Endpoints de API Gateway {id="simulando-endpoints-de-api-gateway"}

Para probar tus APIs, ejecuta `sam local start-api`. Esto crea un servidor en tu computadora en `http://localhost:3000`. Puedes probarlo con herramientas como `curl`:

```
curl http://localhost:3000/hello
```

Es como tener tu propia versión de API Gateway en tu máquina. Haces cambios, pruebas, y ves los resultados al instante.

### Probando Aplicaciones Orientadas a Eventos {id="probando-aplicaciones-orientadas-a-eventos"}

¿Tu app responde a eventos de S3, DynamoDB o SNS? El comando `sam local generate-event` crea eventos de prueba que parecen reales:

```
sam local generate-event s3 put --bucket mi-bucket --key mi-archivo
```

Es como simular que alguien subió un archivo a S3, pero todo sucede en tu computadora.

### Tips para Mejores Pruebas Locales {id="tips-para-mejores-pruebas-locales"}

- Usa `--env-vars` para simular la configuración que tendrás en AWS
- Prueba funciones conectadas entre sí con `sam local start-lambda`
- Crea eventos de prueba que se parezcan a lo que pasará en el mundo real

> "La depuración local paso a paso reduce el ciclo de retroalimentación al permitirte encontrar y solucionar problemas que podrías enfrentar en la nube" [1].

Con estas herramientas, puedes asegurarte de que todo funcione bien antes de subir tu app a AWS.

## Tips y Funciones Avanzadas para Pruebas Locales {id="tips-y-funciones-avanzadas-para-pruebas-locales"}

### Trabajando con Runtimes Personalizados {id="trabajando-con-runtimes-personalizados"}

¿Necesitas usar Rust, PHP u otros lenguajes que [AWS Lambda](/blog/desarrollando-aplicaciones-con-aws-lambda/) no soporta por defecto? Los runtimes personalizados son la solución. Así es como puedes configurarlos en tu archivo `template.yaml`:

```
Resources:
  MiFuncion:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs14.x
      Handler: index.handler
      CodeUri: .
```

Para que tu app funcione igual que en la nube, usa Docker durante la construcción:

```
sam build --use-container
```

### Depuración con AWS SAM CLI {id="depuraci%C3%B3n-con-aws-sam-cli"}

SAM CLI te permite examinar tu código como un cirujano: con precisión y detalle. Conecta tu depurador favorito (VS Code o [PyCharm](https://www.jetbrains.com/pycharm/)) así:

```
sam local start-api --debug-port 5858
```

¿Quieres probar tu API localmente? SAM simula API Gateway con un simple comando:

```
sam local start-api --port 3000
```

> "La depuración local paso a paso reduce el ciclo de retroalimentación al permitirte encontrar y solucionar problemas que podrías enfrentar en la nube" [1]

### Mejorando la Eficiencia en Pruebas Locales {id="mejorando-la-eficiencia-en-pruebas-locales"}

Aquí hay algunos trucos para hacer tus pruebas más rápidas y efectivas:

- **Ahorra tiempo con contenedores**: Usa el flag `--cached` para no descargar todo de nuevo:

```
sam build --use-container --cached
```

- **Mantén tus dependencias bajo control**: Organiza y actualiza tus paquetes para que todo funcione igual en local y en la nube.

**sam sync** es tu mejor amigo para desarrollo rápido - actualiza tu código y plantillas al instante, sin necesidad de reconstruir todo el proyecto. Es como tener un asistente que automáticamente sincroniza tus cambios con el entorno local.

Para simular AWS en tu máquina, configura las variables de entorno correctamente. Esto te ayudará a detectar problemas antes de subir tu código a la nube.

## Recursos para Desarrolladores de Habla Hispana {id="recursos-para-desarrolladores-de-habla-hispana"}

### Introducción a [Dónde Aprendo AWS](/) {id="introducci%C3%B3n-a-d%C3%B3nde-aprendo-aws"}

![Dónde Aprendo AWS](/assets/blog/0b106b2a88b767bcf792b81e0848d5caa5dc03c819b7979ad3243a224435533f.jpg)

¿Buscas aprender AWS SAM CLI y [desarrollo serverless](https://www.andmore.dev/es/blog/build-serverless-api-with-no-lambda/) en español? **[Dónde Aprendo AWS](/)** es justo lo que necesitas.

Este blog se destaca por ofrecer contenido en español que te ayuda a dominar AWS paso a paso. ¿Qué lo hace especial? Tres cosas:

- Contenido que evoluciona contigo: desde tus primeros pasos hasta niveles más avanzados
- Código real y práctico que puedes usar hoy mismo
- Una comunidad activa de desarrolladores hispanohablantes compartiendo experiencias

El mercado laboral en países de habla hispana pide cada vez más profesionales con conocimientos de AWS. Por eso, tener recursos en español no es solo conveniente - es necesario para entender y aplicar mejor los conceptos técnicos.

**¿Qué otros recursos tienes a tu alcance?**

La [documentación oficial de AWS](/blog/aws-fundamentos-guia-de-inicio-rapido/) en español es tu mejor aliada para profundizar en detalles técnicos. También puedes aprovechar los programas oficiales de capacitación y [certificación AWS](/blog/certificacion-de-aws-preparacion-sin-costo/) en español. Y no olvides los foros comunitarios - ahí encontrarás respuestas a problemas reales de otros desarrolladores hispanohablantes.

**Manos a la obra con AWS SAM CLI**

El blog te guía paso a paso para crear tu primera API local:

- Prepara tu entorno de desarrollo
- Crea y despliega funciones Lambda
- Configura y prueba API Gateway
- Mejora y corrige errores en tu código

Con estas herramientas y guías prácticas, dar tus primeros pasos con AWS SAM CLI y desarrollo serverless será mucho más sencillo.

## Conclusión: Comenzando con AWS SAM CLI {id="conclusi%C3%B3n%3A-comenzando-con-aws-sam-cli"}

AWS SAM CLI te ayuda a crear y probar aplicaciones serverless en tu computadora antes de subirlas a la nube. En esta guía has aprendido lo básico para empezar a trabajar con esta herramienta.

Lo más importante que debes saber sobre AWS SAM CLI se divide en tres partes:

- Para empezar necesitas instalar AWS CLI y AWS SAM CLI, configurar tus credenciales y crear tu primer proyecto usando `sam init`
- Puedes probar tus funciones Lambda localmente antes de subirlas a AWS
- Las herramientas de depuración y los runtimes personalizados te ayudan a trabajar más rápido

**¿Qué hacer ahora?**

Empieza por lo básico: configura todo en tu computadora y crea una función Lambda sencilla. Cuando te sientas cómodo, prueba `sam build` para agilizar tu trabajo. Si necesitas más información en español, visita [Dónde Aprendo AWS](/).

AWS SAM CLI hace más fácil y económico el desarrollo serverless. Al probar todo localmente antes de subir los cambios, podrás detectar problemas temprano y crear mejores aplicaciones.

**La clave está en combinar dos cosas**: pruebas locales completas y buenas prácticas cuando subas tus cambios a AWS. Así podrás construir aplicaciones que funcionen bien y crezcan sin problemas.

Ya tienes las herramientas - ¡es hora de empezar a crear!

## FAQs {id="faqs"}

Te explicamos los puntos más importantes sobre AWS SAM CLI que debes conocer.

### ¿Se puede probar AWS localmente? {id="%C2%BFse-puede-probar-aws-localmente%3F"}

¡Sí! AWS SAM CLI te permite probar tus aplicaciones serverless en tu computadora antes de subirlas a AWS. Es como tener una [mini-versión de AWS](/blog/aws-aprender-guia-inicial/) en tu máquina - puedes simular servicios como Lambda y API Gateway sin gastar un centavo en la nube.

> "La depuración local reduce el ciclo de retroalimentación al permitirte encontrar y solucionar problemas que podrías enfrentar en la nube." [1]

### ¿Cómo usar SAM localmente? {id="%C2%BFc%C3%B3mo-usar-sam-localmente%3F"}

Es más fácil de lo que parece. Solo necesitas dos comandos principales:

- `sam local invoke`: Para probar funciones Lambda (es el equivalente a `aws lambda invoke`)
- `sam local start-api`: Para simular [endpoints de API Gateway](https://cloudiostrategy.com/endpoint-proxy-con-api-gateway/)

Por ejemplo, así se ve en acción:

```
sam local invoke HelloWorldFunction
sam local start-api
```

**Pro tip**: No olvides ejecutar `sam build` antes de tus pruebas. Esto asegura que estés probando tu código más reciente.

¿Necesitas configurar variables de entorno específicas? Usa el flag `--env-vars` durante tus pruebas. Así puedes simular diferentes escenarios y condiciones de manera precisa.

## Related posts

- [Desarrollando Aplicaciones con AWS Lambda](/blog/desarrollando-aplicaciones-con-aws-lambda/)
- [AWS Lambda en Profundidad](/blog/aws-lambda-en-profundidad/)
- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [Guía para Crear APIs Serverless con AWS Lambda y API Gateway](/blog/guia-para-crear-apis-serverless-con-aws-lambda-y-api-gateway/)
