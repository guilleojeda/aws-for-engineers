+++
url = "/blog/aws-sam-guia-basica-para-aplicaciones-serverless/"
title = "AWS SAM: Guía Básica para Aplicaciones Serverless"
description = "Aprende a crear aplicaciones serverless de forma sencilla en AWS utilizando AWS SAM, un framework que facilita el desarrollo y despliegue."
date = "2024-11-27T02:20:00.277000+00:00"
lastmod = "2024-11-28"
image = "/assets/blog/7007833ab0e2d90f4deb11ec96f4e8f97657a481869c926a8ac312c3bdfce3b2.jpg"
archive_order = 38

[[related]]
title = "¿Qué es AWS Lambda? Preguntas y Respuestas"
url = "/blog/que-es-aws-lambda-preguntas-y-respuestas/"
image = "/assets/blog/70579f832030c8f349b01339d4df429f61d9cbf0a0cea1abf86242ba5bbe7a9b.jpg"

[[related]]
title = "Estrategias de Correlación de Eventos AWS"
url = "/blog/estrategias-de-correlacion-de-eventos-aws/"
image = "/assets/blog/b5250ebc33b6dd3702e864e4241fc530777503a7cc0bfdf0699e0c80dc846205.jpg"

[[related]]
title = "Seguridad y Control de Costos en AWS: Guía 2024"
url = "/blog/seguridad-y-control-de-costos-en-aws-guia-2024/"
image = "/assets/blog/fa1b6e3bfee7c71b39327fcd7bcc6e2872e8456b64ffcf6260191d1b33b22105.jpg"
+++

[AWS SAM](https://docs.aws.amazon.com/serverless-application-model/) te permite crear [aplicaciones serverless](/blog/introduccion-a-serverless-en-aws/) de forma sencilla en AWS. Con este framework, puedes definir funciones Lambda, APIs, [bases de datos](/blog/aws-bases-de-datos-introduccion-basica/) y más usando plantillas YAML o JSON. Además, el SAM CLI facilita el desarrollo, pruebas locales y despliegues automáticos. Aquí tienes lo esencial:

- **¿Qué es AWS SAM?** Un framework para manejar [infraestructura como código](/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/) mediante plantillas simples basadas en [CloudFormation](https://docs.aws.amazon.com/cloudformation/).
- **Ventajas principales:**
  - Menos configuración manual gracias a una sintaxis clara.
  - Pruebas locales con comandos como `sam local invoke`.
  - Despliegues guiados y automatizados con `sam deploy --guided`.
- **Herramientas clave:** SAM CLI para desarrollo y pruebas, [AWS X-Ray](https://docs.aws.amazon.com/xray/) para depuración, y [SAM Accelerate](https://aws.amazon.com/blogs/compute/accelerating-serverless-development-with-aws-sam-accelerate/) para ciclos rápidos de desarrollo.

Si buscas crear aplicaciones serverless sin complicaciones, AWS SAM es una opción ideal. ¡Empieza con `sam init` y simplifica tu flujo de trabajo!

## Video relacionado de YouTube {id="video-relacionado-de-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/Z_GAa9WToMM" >}}

## Core Features of [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/) {id="core-features-of-aws-sam"}

![AWS SAM](/assets/blog/1b5c4329688ca8a82954a737a468fa5d48dda23e1bd1b267b2817c580b07762c.jpg)

### Understanding SAM Templates {id="understanding-sam-templates"}

Las plantillas SAM hacen más fácil definir [recursos serverless](/blog/recursos-compartidos-en-arquitecturas-serverless-multi-tenant/) y mantener tu infraestructura bajo control. Están escritas en YAML y te permiten describir recursos como funciones Lambda, [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) y tablas [DynamoDB](https://docs.aws.amazon.com/dynamodb/) sin complicaciones.

Mira este ejemplo básico de una plantilla SAM:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'

Resources:
  MiFuncion:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri: .
```

¿Qué hace especiales a las plantillas SAM? Te dejan conectar recursos entre sí - por ejemplo, puedes vincular una función Lambda con API Gateway en pocos pasos. Y con funciones como `!Ref` o `!Sub`, personalizar tus recursos es pan comido.

### Using the SAM CLI {id="using-the-sam-cli"}

El SAM CLI es tu mejor amigo cuando desarrollas apps serverless. Es una herramienta que hace el trabajo pesado por ti, con comandos que son fáciles de recordar:

- **`sam init`**: Te arma un proyecto listo para usar
- **`sam build`**: Prepara todo para el despliegue
- **`sam deploy`**: Sube tu app a AWS
- **`sam local start-api`**: Prueba API Gateway en tu máquina
- **`sam local invoke`**: Ejecuta funciones Lambda localmente

¿Quieres desplegar tu app? Es tan simple como escribir:

```
sam deploy --guided
```

Este comando te guía paso a paso, preguntándote lo básico como el nombre del stack y dónde quieres desplegarlo.

**Lo mejor del CLI es que puedes probar todo localmente.** Encuentra errores antes de gastar dinero en AWS. Y si usas SAM Accelerate, tus ciclos de desarrollo serán aún más rápidos.

¿Trabajas con CI/CD? El CLI se lleva bien con [Jenkins](https://www.jenkins.io/) y [GitHub Actions](https://docs.github.com/actions), así que puedes automatizar todo el proceso.

## Cómo Construir una Aplicación Serverless con AWS SAM {id="c%C3%B3mo-construir-una-aplicaci%C3%B3n-serverless-con-aws-sam"}

### Iniciar un Nuevo Proyecto {id="iniciar-un-nuevo-proyecto"}

Empezar con AWS SAM es más fácil de lo que piensas. Todo comienza con el comando `sam init`, que te ayuda a configurar tu proyecto paso a paso. Es como tener un asistente personal que te guía en la creación de tu [aplicación serverless](https://www.andmore.dev/es/blog/build-serverless-api-with-no-lambda/).

¿Qué necesitas decidir? Tres cosas básicas:

- El lenguaje de programación (Node.js, Python, Java o Go)
- Cómo empaquetar tu app (ZIP para proyectos pequeños o Docker para los más complejos)
- Una plantilla base que se ajuste a lo que quieres crear

¿Quieres ver lo fácil que es? Aquí tienes un ejemplo para crear un proyecto con Node.js 14.x:

```
sam init --runtime nodejs14.x --package-type Zip --name mi-app-serverless
```

¡Y listo! SAM crea toda la estructura del proyecto por ti, incluyendo el archivo `template.yaml` y las carpetas que necesitas.

### Compilar y Empaquetar la Aplicación {id="compilar-y-empaquetar-la-aplicaci%C3%B3n"}

Cuando tengas tu código listo, es hora de prepararlo para AWS. Es tan simple como ejecutar:

```
sam build
```

Este comando hace todo el trabajo pesado: compila tu código, maneja las dependencias y prepara cada función Lambda por separado. **No tienes que preocuparte por nada** - SAM se encarga de todo.

### Desplegar tu Aplicación {id="desplegar-tu-aplicaci%C3%B3n"}

El momento de la verdad: poner tu aplicación en la nube. SAM hace que esto sea pan comido con:

```
sam deploy --guided
```

Este comando te hará algunas preguntas (como dónde quieres desplegar tu app y cómo quieres llamarla) y luego se encarga de todo el proceso de despliegue en AWS.

| Fase | Comando | ¿Qué hace? |
| --- | --- | --- |
| Inicio | `sam init` | Crea tu proyecto desde cero |
| Preparación | `sam build` | Empaqueta todo para AWS |
| Lanzamiento | `sam deploy --guided` | Pone tu app en la nube |

Y así de simple es construir una aplicación serverless con AWS SAM. No necesitas ser un experto en la nube - SAM hace que todo el proceso sea directo y manejable. Ahora puedes concentrarte en escribir código genial mientras SAM se encarga de la infraestructura.

## Tips para Usar AWS SAM de Forma Efectiva {id="tips-para-usar-aws-sam-de-forma-efectiva"}

### Organiza tu Código {id="organiza-tu-c%C3%B3digo"}

¿Cómo manejas funciones Lambda complejas? La clave está en dividirlas en tareas específicas. Imagina una tienda online: en lugar de tener una función gigante, separa el procesamiento de pagos y la gestión de inventarios. Así, cuando algo falla, sabrás exactamente dónde buscar.

El secreto está en mantener el orden: pon tu infraestructura en las plantillas SAM y tu código en carpetas separadas. Es como tener una cocina bien organizada - los ingredientes (código) van en la alacena, y las recetas (plantillas) en su propio libro.

Los nombres de tus recursos son como las etiquetas en esa cocina. Usa prefijos claros:

- `dev-` para recursos de desarrollo
- `prod-` para producción
- `ecommerce-` para identificar la aplicación

Por ejemplo: `ecommerce-orders-table` o `ecommerce-payment-function`. Cuando todo tiene su nombre claro, es más fácil encontrar lo que buscas.

### Herramientas para Pruebas y Depuración {id="herramientas-para-pruebas-y-depuraci%C3%B3n"}

Para construir aplicaciones serverless sólidas, necesitas las herramientas correctas. Es como tener un buen juego de herramientas para reparar tu casa - cada una tiene su propósito específico.

**`sam local`** es tu banco de pruebas personal. Prueba tus funciones Lambda en tu computadora antes de lanzarlas al mundo real. Es como hacer un ensayo general antes del gran estreno.

**AWS X-Ray** es tu detective privado. Te muestra dónde está el problema: ¿es tu función la que tarda mucho o es ese servicio externo que está respondiendo lento?

**[CloudWatch](https://docs.aws.amazon.com/cloudwatch/)** es tu sistema de alarma. Te avisa cuando algo no va bien, como cuando tu función Lambda empieza a comportarse de forma extraña.

**SAM Accelerate** es tu atajo inteligente. ¿Por qué esperar minutos para ver un cambio cuando puedes verlo casi al instante?

¿Buscas más información en español? El blog [Dónde Aprendo AWS](/) tiene guías y ejemplos prácticos creados por la comunidad hispanohablante de AWS.

## Conclusiones y Siguientes Pasos {id="conclusiones-y-siguientes-pasos"}

### Puntos Principales {id="puntos-principales"}

AWS SAM hace más simple crear aplicaciones serverless usando código para definir tu infraestructura. Los desarrolladores pueden centrarse en escribir código que aporte valor al negocio, en lugar de perder tiempo configurando recursos manualmente. Con el **SAM CLI**, puedes probar tu código localmente y desplegarlo más rápido, lo que ayuda a detectar problemas antes de que lleguen a producción.

Una gran ventaja de AWS SAM es que funciona perfectamente con sistemas CI/CD, lo que te permite desplegar código de forma segura y repetible. Y si necesitas hacer algo más específico, AWS SAM es lo bastante flexible para manejar recursos personalizados y arquitecturas más complejas.

### Recursos para Seguir Aprendiendo {id="recursos-para-seguir-aprendiendo"}

¿Quieres saber más sobre AWS SAM? Aquí tienes los mejores recursos para continuar tu aprendizaje:

- La **Documentación oficial de AWS SAM** tiene todo lo que necesitas para empezar, desde guías básicas hasta consejos avanzados
- En la **[Comunidad AWS](/blog/aprender-aws-gratis-recursos-y-comunidad/)** encontrarás videos útiles y ejemplos reales. El repositorio de GitHub de AWS SAM está lleno de proyectos que puedes estudiar o mejorar
- El blog **[Dónde Aprendo AWS](/)** ofrece contenido en español sobre AWS SAM y desarrollo serverless, perfecto si prefieres aprender en tu idioma

Con estos recursos podrás dominar AWS SAM y crear mejores aplicaciones serverless.

## Related posts

- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Desarrollando Aplicaciones con AWS Lambda](/blog/desarrollando-aplicaciones-con-aws-lambda/)
- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [AWS SAM CLI: Pruebas y Desarrollo Local](/blog/aws-sam-cli-pruebas-y-desarrollo-local/)
