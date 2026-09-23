+++
url = "/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/"
title = "Cómo crear Infraestructura como Código en AWS con AWS CloudFormation"
description = "Aprende a crear infraestructura como código en AWS con AWS CloudFormation. Descubre los beneficios, conceptos básicos, pasos previos necesarios y mejores prácticas para automatizar y gestionar tus recursos en la nube."
date = "2024-03-18T00:54:16.195000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/7b36649641ff19d02f4e3551ab2602e6cc1637868a3f1efce9093a63eba3dacf.jpg"
archive_order = 128

[[related]]
title = "Cómo Optimizar la Transferencia de Datos en API Gateway"
url = "/blog/como-optimizar-la-transferencia-de-datos-en-api-gateway/"
image = "/assets/blog/e9e708a78c62050c9930cce427c2aa7dfb583799dca0de30c761e8fbce60c418.jpg"

[[related]]
title = "Guía para Crear APIs Serverless con AWS Lambda y API Gateway"
url = "/blog/guia-para-crear-apis-serverless-con-aws-lambda-y-api-gateway/"
image = "/assets/blog/919d108a9faabfb32e4a011da838f2ad30dba61c2f89bc4ceed1524ab955fdbe.jpg"

[[related]]
title = "Microservicios en AWS Utilizando AWS Lambda"
url = "/blog/microservicios-en-aws-utilizando-aws-lambda/"
image = "/assets/blog/7db368f44486be089c66ca22f4637bdc3bca2fb180e96b72cd8e36ab17ccdfb7.jpg"
+++

En este artículo, exploraremos cómo utilizar [AWS CloudFormation](https://aws.amazon.com/es/cloudformation/) para crear y gestionar tu infraestructura en la nube como código (IaC), una práctica que simplifica y automatiza el despliegue de recursos en AWS. Aprenderás los conceptos básicos, beneficios, y cómo empezar con CloudFormation, incluyendo:

- **Automatización y gestión de cambios**: Cómo CloudFormation te permite automatizar la infraestructura y gestionar cambios de forma ordenada.
- **Consistencia y eficiencia**: La importancia de mantener una infraestructura consistente y cómo CloudFormation mejora la eficiencia en el despliegue de recursos.
- **Escalabilidad y portabilidad**: Cómo CloudFormation facilita la escalabilidad y portabilidad de tu infraestructura.
- **Conceptos básicos**: Entenderás qué son las plantillas, pilas, y cómo utilizarlas para crear tu infraestructura.
- **Pasos previos necesarios**: Desde tener una cuenta de AWS hasta conocimientos básicos de YAML/JSON.
- **Creación de una plantilla sencilla**: Aprenderás a definir recursos como buckets de S3 y políticas de IAM en una plantilla.
- **Despliegue y actualización de la plantilla**: Instrucciones para desplegar y actualizar tu infraestructura utilizando tanto la consola de AWS como AWS CLI.
- **Mejores prácticas con AWS CloudFormation**: Consejos para reutilizar plantillas, separar entornos, realizar pruebas y más.

Este artículo es una guía completa para empezar con Infraestructura como Código en AWS usando CloudFormation, dirigido a aquellos que buscan automatizar y optimizar la gestión de sus recursos en la nube.

### Consistencia {id="consistencia"}

Con CloudFormation, defines todo lo que necesitas para tu proyecto en archivos especiales. Esto ayuda a que todo sea igual cada vez que lo usas, y si hay problemas, es fácil ver qué cambió de una versión a otra. Como todo se hace con estos archivos, no hay errores por hacer cosas a mano.

### Eficiencia {id="eficiencia"}

CloudFormation hace todo el trabajo pesado por ti. En vez de armar cada parte de tu proyecto paso a paso, usas una plantilla que lo hace todo de una vez. Esto te ahorra un montón de tiempo.

### Escalabilidad {id="escalabilidad"}

Si necesitas que tu proyecto sea más grande o más pequeño, solo cambias un par de cosas en la plantilla y listo. Esto significa que puedes ajustar tu proyecto rápidamente sin tener que hacerlo todo manualmente.

### Portabilidad {id="portabilidad"}

Puedes usar las mismas plantillas para poner en marcha tu proyecto en diferentes lugares dentro de AWS. Esto es genial si estás probando cosas o si necesitas tener una copia de seguridad lista para usar.

En resumen, CloudFormation te hace la vida más fácil si trabajas con AWS, ayudándote a automatizar, mantener todo organizado, crecer cuando lo necesitas y mover tu proyecto donde quieras.

## Conceptos básicos de AWS CloudFormation {id="conceptos-b%C3%A1sicos-de-aws-cloudformation"}

AWS CloudFormation te ayuda a poner en marcha y organizar tus servicios en AWS de manera fácil. Aquí tienes algunos puntos clave que debes conocer:

### Plantillas {id="plantillas"}

Las plantillas de CloudFormation son como recetas que te dicen cómo armar tus servicios en AWS. Pueden estar en formato JSON o YAML y en ellas especificas:

- Los servicios o recursos que necesitas (como servidores virtuales, espacios de almacenamiento, etc).
- Cómo quieres que sean esos servicios (por ejemplo, qué tan grandes, quién puede acceder a ellos, etc).
- Si un servicio depende de otro para funcionar.

Cuando creas algo usando una plantilla, CloudFormation se encarga de preparar todo por ti, respetando el orden y las dependencias.

### Pilas {id="pilas"}

Una pila es simplemente un grupo de servicios de AWS que manejas juntos.

Al usar una plantilla para crear una pila en CloudFormation, estás armando un conjunto de servicios definidos en esa plantilla. Esto es útil porque:

- Puedes montar, actualizar o quitar todos los servicios de una aplicación de una sola vez.
- Es fácil copiar y usar la misma configuración en diferentes partes de AWS.
- Te ayuda a llevar un registro de los cambios en tus servicios.

En resumen, las pilas hacen que sea mucho más sencillo manejar infraestructuras complejas en la nube.

## Requisitos previos {id="requisitos-previos"}

Antes de empezar a usar AWS CloudFormation para crear tu infraestructura como código, hay algunas cosas que necesitas tener listas:

### Cuenta de AWS {id="cuenta-de-aws"}

Primero que nada, necesitas una cuenta en AWS. Puedes elegir entre una cuenta gratis o una de pago, dependiendo de lo que necesites. Si eliges la opción gratuita, podrás usar algunos servicios de AWS sin costo durante 12 meses.

Una vez que tengas tu cuenta, crea un usuario en IAM (el servicio de gestión de identidades y accesos de AWS) y dale los permisos necesarios para trabajar con CloudFormation. Esto incluye permisos para crear, cambiar y borrar pilas.

### AWS CLI {id="aws-cli"}

La AWS CLI es una herramienta que te permite controlar los servicios de AWS desde la línea de comandos, lo que es genial para automatizar procesos con CloudFormation.

Instala la AWS CLI en tu computadora y configúrala con tus credenciales de AWS. Así podrás empezar a usar comandos de CloudFormation.

### SDK de AWS {id="sdk-de-aws"}

Si planeas usar CloudFormation con código, como en un programa, necesitarás el SDK de AWS para el lenguaje de programación que estés usando (como Java, Python o JavaScript).

El SDK te da acceso a las funciones de CloudFormation para que puedas crear, cambiar y borrar pilas desde tu código.

### Editor de texto {id="editor-de-texto"}

Para escribir tus plantillas de CloudFormation, usa un editor de texto como Visual Studio Code. Hay una extensión para CloudFormation que te ayuda con el resaltado de sintaxis y el autocompletado, haciéndote la vida más fácil.

### Conocimientos básicos de YAML/JSON {id="conocimientos-b%C3%A1sicos-de-yaml%2Fjson"}

Es importante saber un poco de YAML o JSON, ya que son los formatos en los que escribirás tus plantillas de CloudFormation. Si no estás familiarizado con ellos, sería bueno aprender un poco sobre su sintaxis antes de empezar.

Con estos pasos cubiertos, estarás listo para empezar a trabajar con infraestructura como código en AWS usando CloudFormation.

## Creación de una plantilla sencilla {id="creaci%C3%B3n-de-una-plantilla-sencilla"}

### Estructura de la plantilla {id="estructura-de-la-plantilla"}

Una plantilla de CloudFormation es como una receta que AWS sigue para crear tu infraestructura. Se divide en cuatro partes importantes:

- **AWSTemplateFormatVersion:** Es como decirle a AWS qué idioma hablas. Por lo general, se usa la versión más reciente.
- **Description:** Aquí escribes para qué sirve tu plantilla, como una breve explicación.
- **Resources:** El corazón de la plantilla. Aquí le dices a AWS qué cosas necesitas, como servidores o espacios para guardar archivos.
- **Outputs:** Son los resultados que obtienes, como el nombre o la dirección de lo que creaste.

### Definición de recursos {id="definici%C3%B3n-de-recursos"}

Veamos un ejemplo simple de cómo crear un espacio para guardar archivos (bucket de S3) y una regla de seguridad (política de IAM) usando YAML:

```
Resources:

  S3Bucket: 
    Type: AWS::S3::Bucket
    Properties:
      BucketName: mi-bucket-unico
      
  BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties: 
      Bucket: !Ref S3Bucket
      PolicyDocument: 
        Version: 2012-10-17
        Statement:
          - Sid: PublicReadForGetBucketObjects
            Effect: Allow
            Principal: "*"
            Action: "s3:GetObject"
            Resource: !Join ["", ["arn:aws:s3:::", !Ref S3Bucket, /*]]
```

### Validación de la plantilla {id="validaci%C3%B3n-de-la-plantilla"}

Antes de poner en marcha tu plantilla, es buena idea asegurarte de que está bien escrita. Puedes hacerlo con este comando:

```
aws cloudformation validate-template --template-body file://plantilla.yml
```

Esto te ayuda a encontrar y arreglar errores antes de crear algo con ella.

## Despliegue de la plantilla {id="despliegue-de-la-plantilla"}

Para poner en marcha la plantilla de CloudFormation que hemos preparado, podemos hacerlo de dos maneras: a través de la página web de AWS o usando comandos en la computadora. Vamos a ver cómo se hace en cada caso:

### Despliegue mediante la consola {id="despliegue-mediante-la-consola"}

- Primero, entramos a la página de AWS y buscamos el servicio de CloudFormation.
- Luego, hacemos clic en "Crear pila".
- Seleccionamos "Cargar un archivo de plantilla" y escogemos el archivo que contiene nuestra plantilla, ya sea en formato YAML o JSON.
- Completamos la información que se nos pide y damos clic en "Siguiente".
- Le ponemos un nombre a nuestra pila y, si es necesario, ajustamos algunas configuraciones adicionales.
- Finalmente, hacemos clic en "Siguiente" y luego en "Crear pila" para empezar el proceso.

Después de un rato, podremos ver en la página de CloudFormation cómo va todo y qué se ha creado.

### Despliegue mediante AWS CLI {id="despliegue-mediante-aws-cli"}

Si preferimos usar la línea de comandos, podemos hacerlo con el siguiente comando:

```
aws cloudformation create-stack --stack-name mi-pila \
                               --template-body file://plantilla.yml \
                               --parameters ParameterKey=NombreParametro,ParameterValue=valor \
                               --region us-east-1
```

Lo que necesitamos saber aquí es:

- **stack-name**: Cómo queremos llamar a nuestra pila
- **template-body**: Dónde está el archivo de nuestra plantilla
- **parameters**: Los detalles específicos que nuestra plantilla necesita
- **region**: En qué parte de AWS queremos que esto se ejecute

Una vez que damos este comando, podemos seguir el progreso directamente desde la línea de comandos o revisar en la página de CloudFormation para ver cómo va todo.

## Actualización de la plantilla {id="actualizaci%C3%B3n-de-la-plantilla"}

Después de que ya tengas tu plantilla de AWS CloudFormation funcionando y los recursos creados en AWS, puede que necesites hacer algunos cambios más adelante. Por ejemplo, si creaste un espacio de almacenamiento (bucket de S3) para un sitio web, tal vez luego quieras agregarle un nombre de dominio para que la gente pueda encontrar tu sitio fácilmente.

Para hacer estos cambios, tienes dos opciones:

- Editar directamente la plantilla que ya usaste, añadiendo los cambios necesarios y luego actualizar la infraestructura que ya tienes.
- Hacer una nueva plantilla solo con los cambios y luego combinarla con lo que ya tienes.

### Opción 1: Editar la plantilla original {id="opci%C3%B3n-1%3A-editar-la-plantilla-original"}

Editar la plantilla original es práctico porque mantienes todo organizado en un solo lugar. Los pasos a seguir serían:

- Abre la plantilla en tu editor de texto.
- Añade un nuevo recurso. Por ejemplo, para añadir un nombre de dominio con Route 53 que apunte a tu espacio de S3, lo harías así:

```
Recursos:

  SitioWeb:
    Type: AWS::Route53::RecordSet
    Properties:
      HostedZoneName: mi-dominio.com
      Name: mi-sitio.mi-dominio.com
      Type: CNAME
      TTL: '900'
      ResourceRecords:
        - !GetAtt S3Bucket.DomainName
```

- Guarda los cambios.
- Actualiza tu infraestructura con este comando:

```
aws cloudformation update-stack --stack-name mi-pila --template-body file://plantilla-editada.yml
```

- AWS CloudFormation se encargará de hacer los cambios por ti, incluyendo añadir el nombre de dominio.

### Opción 2: Unir pilas {id="opci%C3%B3n-2%3A-unir-pilas"}

Si prefieres, puedes dejar tu infraestructura como está y crear una nueva plantilla con solo los cambios. Después, puedes hacer que ambas trabajen juntas. Esto sería así:

- Haz una nueva plantilla llamada `plantilla-dns.yml` con el recurso de Route 53 que quieres añadir.
- Usa esta nueva plantilla para crear una nueva infraestructura llamada `mi-pila-dns`.
- Une esta nueva parte con la anterior usando este comando:

```
aws cloudformation stack-set operation start --operation-preferences RegionConcurrencyType=parallel --operation-id unirPilas

--stack-set-name mi-pila-unida --accounts 123456789012 --regions us-east-1
```

- Esto hará que los recursos de ambas partes trabajen juntos, como el nombre de dominio apuntando al espacio de S3.

En resumen, puedes elegir entre actualizar una sola infraestructura o combinar varias para manejar los cambios. Ambas son buenas opciones, así que elige la que mejor se ajuste a lo que necesitas.

## Eliminación de recursos {id="eliminaci%C3%B3n-de-recursos"}

Cuando ya no necesitas los recursos que creaste con AWS CloudFormation, es una buena idea borrarlos para evitar gastos que no necesitas. Afortunadamente, eliminar estos recursos es fácil gracias a cómo CloudFormation maneja la infraestructura.

Para borrar una pila de CloudFormation y todos los recursos que contiene, tienes dos opciones principales:

### 1. Eliminar la pila desde la consola de AWS {id="1.-eliminar-la-pila-desde-la-consola-de-aws"}

Para hacerlo desde el sitio web de AWS, sigue estos pasos:

- Entra a la consola de CloudFormation
- Escoge la pila que quieres eliminar
- Haz clic en "Eliminar"
- Confirma que realmente quieres borrar la pila

CloudFormation se encargará de deshacerse de todos los recursos que creó esa pila de forma ordenada.

### 2. Usar AWS CLI {id="2.-usar-aws-cli"}

Si prefieres, puedes borrar una pila usando la línea de comandos con este comando:

```
aws cloudformation delete-stack --stack-name mi-pila
```

Solo tienes que indicar el nombre de la pila que creaste.

El proceso de borrado puede tardar un poco, ya que CloudFormation necesita terminar cada recurso correctamente antes de eliminarlo. Puedes ver cómo va el proceso desde la consola o usando el comando `describe-stacks`.

Una vez que termine, la pila y todos sus recursos desaparecerán de tu cuenta de AWS. Así de fácil es mantener todo bajo control con infraestructura como código.

## Mejores prácticas con AWS CloudFormation {id="mejores-pr%C3%A1cticas-con-aws-cloudformation"}

Usar AWS CloudFormation puede hacerte la vida mucho más fácil cuando trabajas con infraestructura en AWS. Pero, como cualquier herramienta, hay formas de usarla que te dan mejores resultados. Aquí van algunos consejos sencillos:

### Reutiliza plantillas y código {id="reutiliza-plantillas-y-c%C3%B3digo"}

- Intenta tener plantillas básicas que puedas usar varias veces. Por ejemplo, una plantilla para armar una red virtual o crear permisos de acceso.
- Aprovecha los [módulos](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html) para agrupar partes de tus plantillas que usas mucho y así usarlas en diferentes lugares sin repetir código.
- Para compartir código entre plantillas, puedes usar [pilas anidadas](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-stack.html).

### Separación de entornos {id="separaci%C3%B3n-de-entornos"}

- Es buena idea tener pilas separadas para cada etapa de tu proyecto, como desarrollo, pruebas y producción. Esto te ayuda a evitar errores en lugares donde no deberían pasar.
- Utiliza parámetros para ajustar detalles que cambian entre un entorno y otro, como el tamaño de los servidores o los nombres de los recursos.

### Pruebas {id="pruebas"}

- Antes de poner en marcha tus plantillas, usa el comando `aws cloudformation validate-template` para asegurarte de que todo está correcto.
- Prueba tus plantillas en entornos de prueba antes de usarlas en producción.
- Piensa en incluir pruebas automáticas para tus plantillas.

### Parámetros {id="par%C3%A1metros"}

- Intenta que tus plantillas tengan muchos parámetros para que puedas usarlas en diferentes situaciones.
- Define valores por defecto para esos parámetros y así hacer más fácil el uso de las plantillas.
- Cuando puedas, limita los valores que se pueden elegir para los parámetros y así evitar errores.

Siguiendo estos consejos, podrás sacarle más provecho a CloudFormation y hacer tu trabajo con AWS más seguro y eficiente.

## Resumen {id="resumen"}

Hemos aprendido cómo usar CloudFormation de AWS para manejar nuestra infraestructura en la nube usando código, en lugar de hacerlo manualmente. Aquí hay un repaso rápido:

- Con CloudFormation, podemos describir lo que necesitamos en AWS (como servidores o bases de datos) en archivos de texto.
- Una 'plantilla' es básicamente un archivo que dice qué y cómo queremos nuestros recursos.
- Cuando creamos una 'pila', estamos poniendo en marcha todo lo que describimos en la plantilla.
- Podemos actualizar o combinar plantillas para hacer cambios en nuestra infraestructura.
- Si ya no necesitamos esos recursos, podemos eliminar la pila y todo se borrará de forma ordenada.

Usar CloudFormation nos ayuda a trabajar más rápido, asegurarnos de que todo se hace de la misma manera cada vez, y facilita el crecimiento o la duplicación de nuestros entornos.

Algunos consejos importantes son:

- Trata de usar las mismas plantillas para diferentes proyectos.
- Mantén separados los ambientes de desarrollo, prueba y producción.
- Siempre revisa tus plantillas antes de usarlas para evitar errores.
- Usa parámetros en tus plantillas para que sean más flexibles.

En pocas palabras, CloudFormation nos permite manejar nuestra infraestructura en AWS de una manera organizada y eficiente, siguiendo las prácticas de Infraestructura como Código.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué servicio de AWS permite administrar la infraestructura usando código? {id="%C2%BFqu%C3%A9-servicio-de-aws-permite-administrar-la-infraestructura-usando-c%C3%B3digo%3F"}

AWS CloudFormation te ayuda a crear y manejar recursos de AWS usando archivos de texto, lo cual es mucho más rápido que hacerlo a mano. Esto es parte de lo que llamamos infraestructura como código.

### ¿Qué significa infraestructura como código? {id="%C2%BFqu%C3%A9-significa-infraestructura-como-c%C3%B3digo%3F"}

Infraestructura como código es una forma de configurar y manejar computadoras y otros dispositivos de red usando archivos de texto, en lugar de hacerlo manualmente. Esto hace que todo el proceso sea más rápido y menos propenso a errores.

### ¿Qué formatos de archivo puedo usar con AWS CloudFormation? {id="%C2%BFqu%C3%A9-formatos-de-archivo-puedo-usar-con-aws-cloudformation%3F"}

Con AWS CloudFormation, puedes usar JSON o YAML, que son dos tipos de archivos de texto, para describir cómo quieres que sea tu infraestructura de AWS.

### ¿Qué papel juega la infraestructura como código en DevOps? {id="%C2%BFqu%C3%A9-papel-juega-la-infraestructura-como-c%C3%B3digo-en-devops%3F"}

En DevOps, la infraestructura como código permite usar archivos de texto para definir y configurar la infraestructura necesaria para desarrollar, probar y lanzar software. Esto ayuda a automatizar procesos y hacer todo más eficiente.

## Related posts

- [Nube AWS: Guía de Inicio Rápido](/blog/nube-aws-guia-de-inicio-rapido/)
- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
