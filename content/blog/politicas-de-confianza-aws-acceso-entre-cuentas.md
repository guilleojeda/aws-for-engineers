+++
url = "/blog/politicas-de-confianza-aws-acceso-entre-cuentas/"
title = "Políticas de Confianza AWS: Acceso Entre Cuentas"
description = "Aprende a configurar políticas de confianza en AWS para permitir el acceso seguro entre cuentas y optimizar la colaboración."
date = "2024-11-26T20:13:42.040000+00:00"
lastmod = "2024-11-27"
image = "/assets/blog/6d11bddb1995c82265977259be84de27ace865ca10f6dfb4e904c009c2483419.jpg"
archive_order = 41

[[related]]
title = "Pipeline CI/CD con Terraform y AWS CodePipeline"
url = "/blog/pipeline-cicd-con-terraform-y-aws-codepipeline/"
image = "/assets/blog/8c8805d819a48bf8b59f25eb80e966ffd67c6991806d37a8925b6caad8334c86.jpg"

[[related]]
title = "AWS DeepLens: Introducción al Aprendizaje Profundo"
url = "/blog/aws-deeplens-introduccion-al-aprendizaje-profundo/"
image = "/assets/blog/711eae34c71ed3b53e765f69766cfc873d632ebc2ad7721de640457942e70c5a.jpg"

[[related]]
title = "Mejores Prácticas Para Amazon RDS y Aurora"
url = "/blog/mejores-practicas-para-amazon-rds-y-aurora/"
image = "/assets/blog/c147658e3887f6dc27b94b8d0c294ad03256f7272b56b7602bd4858efde3bf85.jpg"
+++

Las **políticas de confianza en [AWS](https://aws.amazon.com/)** son reglas que controlan quién puede acceder a recursos en tu cuenta y bajo qué condiciones. Si necesitas conectar cuentas de AWS para compartir recursos, las políticas de confianza son esenciales. Aquí tienes lo básico:

- **Permiten acceso seguro entre cuentas.** Por ejemplo, una cuenta puede usar roles para acceder a recursos como buckets S3 de otra cuenta.
- **Tres elementos clave:**
  - **Principal:** Quién puede acceder (usuario, rol, servicio).
  - **Acción:** Qué puede hacer (`sts:AssumeRole`, etc.).
  - **Condición:** Cómo o bajo qué reglas (MFA, IPs específicas, etc.).
- **Beneficios:**
  - Evitas duplicar recursos, ahorrando costos.
  - Controlas exactamente quién puede hacer qué.
  - Facilitas el trabajo colaborativo entre equipos.

### Ejemplo rápido: {id="ejemplo-r%C3%A1pido%3A"}

Para que una cuenta A acceda a un bucket S3 en la cuenta B:

1. **Cuenta B:** Crea un rol IAM con una política de confianza.
2. **Cuenta A:** Configura permisos para asumir ese rol.
3. **Bucket S3:** Ajusta su política para aceptar accesos específicos.

**¿Quieres aprender más?** Sigue leyendo para configurar políticas de confianza paso a paso, mejorar la seguridad con MFA y aplicar el principio de privilegios mínimos.

## Video relacionado de YouTube {id="video-relacionado-de-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/Qrm84k9vRXg" >}}

## Cómo Funciona el Acceso Entre Cuentas en [AWS](https://aws.amazon.com/) {id="c%C3%B3mo-funciona-el-acceso-entre-cuentas-en-aws"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

El acceso entre cuentas en AWS es como establecer un puente seguro entre dos organizaciones. Necesitas tres elementos clave: políticas de identidad, recursos y confianza. Veamos cómo hacer que trabajen juntos.

### Configuración del Acceso Entre Cuentas {id="configuraci%C3%B3n-del-acceso-entre-cuentas"}

¿Te preguntas cómo configurar todo esto? Aquí está el proceso paso a paso:

1\. **Crear un Rol de IAM en la Cuenta Confiada**

En la cuenta B, necesitas crear un rol de IAM. Este rol es como un pase VIP que dice "la cuenta A puede entrar". Así se ve la política de confianza:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:root"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

2\. **Definir Permisos en la Cuenta de Confianza**

Ahora, en la cuenta A, defines qué puede hacer quien tenga acceso:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::098765432109:role/ExampleRole"
        }
    ]
}
```

3\. **Adjuntar una Política Basada en Recursos**

Para servicios como S3, puedes añadir una capa extra de control:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:role/ExampleRole"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::example-bucket/*"
        }
    ]
}
```

### Ejemplo Práctico: Acceso a un Bucket S3 {id="ejemplo-pr%C3%A1ctico%3A-acceso-a-un-bucket-s3"}

Imagina que tienes dos empresas: la Empresa A necesita ver archivos en el bucket S3 de la Empresa B. Es como dar una llave temporal a un colega de otra oficina.

El proceso es simple: la cuenta B crea un rol especial, la cuenta A obtiene permiso para usarlo, y el bucket S3 recibe instrucciones sobre quién puede acceder y qué puede hacer.

Este sistema es como tener un guardia de seguridad que verifica tres cosas: quién eres, qué permiso tienes, y qué puedes hacer. Todo esto mientras mantiene los recursos seguros y bajo control.

## Pasos para Configurar Políticas de Confianza para Acceso Entre Cuentas {id="pasos-para-configurar-pol%C3%ADticas-de-confianza-para-acceso-entre-cuentas"}

Las [políticas de confianza en AWS](/blog/seguridad-en-la-nube-aws-estrategias-clave/) son la clave para permitir que diferentes cuentas trabajen juntas de forma segura. Veamos cómo hacerlo paso a paso.

### Cómo Crear Políticas de Confianza {id="c%C3%B3mo-crear-pol%C3%ADticas-de-confianza"}

Para crear una política de confianza efectiva, necesitas dos cosas: saber qué cuentas pueden acceder y qué acciones específicas pueden realizar.

El proceso es directo: usa la [Consola de AWS](/blog/aws-fundamentos-guia-de-inicio-rapido/), la CLI o los SDKs para implementar tu política. Lo importante es ser específico con los permisos que otorgas.

#### Ejemplo de Política de Confianza {id="ejemplo-de-pol%C3%ADtica-de-confianza"}

Aquí tienes un ejemplo práctico que muestra cómo permitir que otra cuenta asuma un rol en tu cuenta:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111111111111:root"
      },
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::999999999999:role/UpdateData"
    }
  ]
}
```

### Cómo AWS Evalúa las Políticas {id="c%C3%B3mo-aws-eval%C3%BAa-las-pol%C3%ADticas"}

AWS usa un sistema de doble verificación: revisa tanto la política de confianza como la política del recurso. Es como tener dos cerraduras - necesitas que ambas digan "sí" para obtener acceso. Si cualquiera dice "no", no hay acceso.

### Ejemplo: Escribiendo una Política de Confianza {id="ejemplo%3A-escribiendo-una-pol%C3%ADtica-de-confianza"}

Mira este ejemplo para compartir un bucket S3 entre cuentas:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111111111111:root"
      },
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::amzn-s3-demo-bucket-shared-container"
    }
  ]
}
```

**Consejo de seguridad:** Otorga solo los permisos mínimos necesarios. Es más fácil agregar permisos después que tener que lidiar con un problema de seguridad.

No olvides revisar tus políticas regularmente. La [seguridad en la nube](/blog/aws-seguridad-servicios-esenciales/) es un proceso continuo, no algo que configuras y olvidas.

## Tips para un Acceso Seguro Entre Cuentas {id="tips-para-un-acceso-seguro-entre-cuentas"}

La seguridad en el acceso entre cuentas de AWS es clave para proteger tus recursos. Veamos cómo puedes implementar medidas efectivas que realmente funcionen.

### Aplicando el Principio de Privilegios Mínimos {id="aplicando-el-principio-de-privilegios-m%C3%ADnimos"}

Piensa en los privilegios mínimos como dar a cada persona solo las llaves que necesita - ni más, ni menos. Es simple pero poderoso.

**¿Cómo hacerlo bien?** En vez de dar permisos generales como `s3:*` o `ec2:*`, sé específico. Por ejemplo, si alguien solo necesita leer archivos, dale `s3:GetObject`. Si solo necesita ver instancias EC2, asigna `ec2:DescribeInstances`.

**Tip práctico**: Haz una auditoría mensual de tus políticas IAM. ¿Hay permisos que nadie usa? Elimínalos. ¿Alguien necesita acceso temporal? Establece una fecha de caducidad.

### MFA: Tu Segunda Línea de Defensa {id="mfa%3A-tu-segunda-l%C3%ADnea-de-defensa"}

La autenticación multifactorial (MFA) es como tener un guardia de seguridad extra. Es especialmente importante para roles que manejan datos sensibles.

Así puedes configurar MFA para roles críticos:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "Bool": {
          "aws:MultiFactorAuthPresent": true
        }
      }
    }
  ]
}
```

### Mantén los Ojos Bien Abiertos {id="mant%C3%A9n-los-ojos-bien-abiertos"}

¿Cómo sabes si alguien está usando mal sus permisos? AWS te da las herramientas:

- **[Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)**: Es como tu detector de riesgos personal. Te avisa si hay políticas que podrían exponer tus recursos.
- **[CloudTrail](https://docs.aws.amazon.com/cloudtrail/)**: Piensa en él como una cámara de seguridad. Registra cada acción en tu cuenta.

**Caso real**: Imagina que compartes un bucket S3 con otra cuenta. Con CloudTrail, puedes ver exactamente quién accedió y qué hizo. Si algo no cuadra, puedes actuar rápido y ajustar los permisos.

La [seguridad en AWS](/blog/aws-seguridad-mejores-practicas/) no tiene que ser complicada. Con estas tres prácticas - privilegios mínimos, MFA y monitoreo constante - ya tienes una base sólida para proteger tus recursos.

## Escenarios Avanzados y Herramientas para el Acceso Entre Cuentas {id="escenarios-avanzados-y-herramientas-para-el-acceso-entre-cuentas"}

### Uso de [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) para la Gestión de Acceso {id="uso-de-aws-organizations-para-la-gesti%C3%B3n-de-acceso"}

![AWS Organizations](/assets/blog/8b3a76c554ad5b4818166eb56b2ead3f6f23d75f2257cd96df5fe7af3add9c6b.jpg)

AWS Organizations te permite manejar varias cuentas de AWS desde un solo lugar. Su característica más poderosa son las **políticas de control de servicio (SCPs)**, que actúan como guardianes de los permisos en tu organización.

Imagina esto: tienes tres cuentas - desarrollo, pruebas y producción. Con SCPs, puedes LIMITAR lo que cada equipo puede hacer. Por ejemplo, los desarrolladores no podrán crear instancias EC2 costosas, mientras que el equipo de producción tendrá los permisos necesarios para su trabajo.

Los números hablan por sí solos: una startup tech redujo sus errores de configuración en un 40% después de usar SCPs para administrar 10 cuentas de AWS. ¿Por qué funcionó? Simple: las reglas se aplican automáticamente desde arriba, sin chance de saltárselas.

### Ejemplos de Recursos Compartidos {id="ejemplos-de-recursos-compartidos"}

Compartir recursos entre cuentas de AWS es como crear puentes seguros entre diferentes equipos. Veamos cómo funciona en la práctica:

**Buckets de S3** Puedes dar diferentes niveles de acceso a tus buckets. Es como tener una biblioteca donde algunos pueden leer y escribir libros, mientras otros solo pueden leerlos. Mira este ejemplo de política:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
}
```

**Funciones Lambda y Roles IAM** Las funciones Lambda pueden compartirse entre cuentas - piensa en ellas como pequeños ayudantes que pueden trabajar para diferentes equipos. Y los roles de IAM? Son como pases VIP que permiten acceder a recursos específicos de forma segura.

Esta combinación de herramientas te ayuda a crear un ambiente de trabajo colaborativo sin comprometer la seguridad. Es como tener las llaves correctas para cada puerta, asegurando que cada equipo pueda hacer su trabajo sin tropezar con los demás.

## Resumen y Recursos Adicionales {id="resumen-y-recursos-adicionales"}

Las políticas de confianza son la base para controlar el acceso entre cuentas en AWS. Con ellas, puedes definir qué usuarios y roles pueden acceder a recursos específicos en otras cuentas.

**Lo que necesitas saber:**

- Para conectar cuentas, crea roles de IAM con políticas de confianza específicas
- AWS revisa dos tipos de políticas: las basadas en identidad y las basadas en recursos
- Mantén tus políticas actualizadas y revisa los accesos con frecuencia
- Usa MFA y aplica permisos mínimos para mayor seguridad

¿Buscas aprender más sobre AWS en español?

[Dónde Aprendo AWS](/) es tu mejor recurso. Este blog está diseñado para la comunidad hispanohablante, desde principiantes hasta usuarios intermedios. Encontrarás:

- Guías paso a paso sobre políticas de confianza
- Tutoriales para gestionar accesos entre cuentas
- Ejemplos prácticos con código
- Explicaciones claras de conceptos complejos

El blog se enfoca en crear contenido de calidad para desarrolladores e ingenieros que prefieren aprender AWS en español. La plataforma fomenta el aprendizaje colaborativo y ofrece recursos actualizados para la comunidad.

## FAQs {id="faqs"}

### ¿Es posible acceder a recursos entre cuentas en AWS? {id="%C2%BFes-posible-acceder-a-recursos-entre-cuentas-en-aws%3F"}

¡Claro que sí! AWS te permite compartir recursos entre cuentas. Todo se reduce a dos tipos de políticas: las basadas en recursos (que controlan quién puede usar el recurso compartido) y las basadas en identidad (que definen qué puede hacer cada usuario).

Piensa en esto como dar llaves de tu casa: decides quién puede entrar (política basada en recursos) y qué habitaciones puede usar cada persona (política basada en identidad).

### ¿Qué es una política de acceso entre cuentas en AWS? {id="%C2%BFqu%C3%A9-es-una-pol%C3%ADtica-de-acceso-entre-cuentas-en-aws%3F"}

Es como crear un "pase VIP" entre cuentas de AWS. Usando roles de IAM y políticas de confianza, puedes dar permisos específicos de una cuenta a otra.

**Ejemplo práctico**: Imagina que tienes un bucket S3 en la cuenta A y quieres que ciertos usuarios de la cuenta B puedan usarlo. Creas un rol que actúa como ese "pase VIP", definiendo exactamente qué pueden hacer estos usuarios - como ver archivos, pero no borrarlos.

### ¿Qué es una política de confianza en AWS? {id="%C2%BFqu%C3%A9-es-una-pol%C3%ADtica-de-confianza-en-aws%3F"}

Una política de confianza es el documento que dice "estas personas pueden usar este rol". Es diferente de otras políticas porque se centra en WHO puede asumir un rol, no en WHAT pueden hacer una vez que lo tienen.

**Tip de seguridad**: Para roles importantes, puedes exigir MFA. Es como pedir una segunda llave además del pase VIP - más seguridad nunca está de más.

---

¿Necesitas más detalles sobre cómo configurar todo esto? Revisa las secciones anteriores donde explicamos paso a paso cómo crear y gestionar estas políticas.

## Related posts

- [Seguridad en AWS: Servicios Esenciales](/blog/aws-seguridad-servicios-esenciales/)
- [Gestionando Múltiples Cuentas de AWS con AWS Organizations](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Cómo Usar AWS Transfer Family con Amazon EFS](/blog/como-usar-aws-transfer-family-con-amazon-efs/)
