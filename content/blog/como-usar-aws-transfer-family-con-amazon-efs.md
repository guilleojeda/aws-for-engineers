+++
url = "/blog/como-usar-aws-transfer-family-con-amazon-efs/"
title = "Cómo Usar AWS Transfer Family con Amazon EFS"
description = "Aprende a integrar AWS Transfer Family con Amazon EFS para una transferencia de archivos segura y escalable, siguiendo los pasos clave para su configuración y optimización."
date = "2024-05-05T05:44:31.414000+00:00"
lastmod = "2024-05-08"
image = "/assets/blog/4f1c44f2f3d79e3f401745503c409f4816b3bba2115619d0e4792fbcc5dc72e9.jpg"
archive_order = 96

[[related]]
title = "5 Prácticas de Seguridad para Lambda Authorizers"
url = "/blog/5-practicas-de-seguridad-para-lambda-authorizers/"
image = "/assets/blog/e838de22cc856de64a0d3bdc515b28b5f5f8331aedc9f29f7f07ca03cddc569d.jpg"

[[related]]
title = "AWS Community Day 2024: Calendario de Eventos"
url = "/blog/aws-community-day-2024-calendario-de-eventos/"
image = "/assets/blog/8a72720666074692888beb45fef31d087c057cd83b6802510bcfaabecd51c140.jpg"

[[related]]
title = "Estrategias de Interoperabilidad Multi-Cloud con AWS"
url = "/blog/estrategias-de-interoperabilidad-multi-cloud-con-aws/"
image = "/assets/blog/36e16d8c286c92c9ff8903fceca716b2e5284f31f3c0bd4a28295a7227f6b8ef.jpg"
+++

[AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/) es un servicio de transferencia de archivos seguro y escalable que te permite transferir archivos hacia y desde sistemas de archivos de Amazon Elastic File System (EFS). Al integrar [AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/) con [Amazon EFS](https://aws.amazon.com/efs/), puedes acceder a tus archivos desde cualquier lugar, dispositivo y en cualquier momento, utilizando protocolos de transferencia como SFTP, FTPS y FTP.

**Ventajas Clave**

- **Acceso seguro a archivos:** Accede a tus archivos de forma segura desde cualquier ubicación y dispositivo.
- **Transferencia escalable:** La escalabilidad automática garantiza que puedas manejar cambios en el tráfico de archivos.
- **Control de acceso:** Configura permisos y autenticación para controlar quién accede a tus archivos y desde dónde.

**Pasos para la Integración**

1. Prepara Amazon EFS para [AWS](https://aws.amazon.com/) Transfer Family:

   - Crea un sistema de archivos EFS en la misma región que tu servidor Transfer Family
   - Configura políticas de IAM para permitir acceso al rol de IAM utilizado por Transfer Family
   - Crea usuarios y asigna permisos para acceder a EFS
   - Asegúrate de que la política del sistema de archivos no permita acceso público
2. Habilita el acceso entre cuentas (si es necesario):

   - Modifica la política del sistema de archivos para permitir acceso entre cuentas
   - Configura políticas de IAM para permitir acceso al rol de IAM de Transfer Family en la otra cuenta
   - Asegúrate de que la otra cuenta tenga permisos para acceder a EFS
3. Transfiere archivos a Amazon EFS:

   - Configura cuentas de usuario con los permisos necesarios
   - Administra claves (SSH o S3) para transferencia segura
   - Navega dentro de EFS y transfiere archivos utilizando la consola o CLI
4. Protege las transferencias de archivos:

   - Configura políticas de IAM adecuadas
   - Configura grupos de seguridad de VPC correctamente
   - Sigue las [recomendaciones de seguridad de AWS](/blog/aws-seguridad-mejores-practicas/)
5. Administra permisos de usuario:

   - Crea roles de IAM
   - Asigna y revoca permisos según sea necesario
6. Monitorea y optimiza el rendimiento:

   - Utiliza [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) para monitorear la actividad
   - Ajusta la configuración de la instancia, tamaño de archivos y frecuencia de transferencia
   - Soluciona problemas revisando registros, verificando configuración y realizando pruebas de rendimiento

Al seguir estos pasos, podrás disfrutar de una solución de transferencia de archivos segura y escalable en AWS.

## Entendiendo los Servicios {id="entendiendo-los-servicios"}

AWS Transfer Family y Amazon EFS son dos servicios de AWS que trabajan juntos para proporcionar una forma segura y escalable de transferir archivos hacia y desde la nube de AWS.

### [AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/) {id="aws-transfer-family"}

![AWS Transfer Family](/assets/blog/4363d981328a6d95941b5cf753eb44abc648e8160da9e5d8e915ecd98caf8d30.jpg)

AWS Transfer Family es un servicio de transferencia de archivos administrado por AWS que te permite transferir archivos hacia y desde sistemas de archivos de Amazon Elastic File System (EFS) de manera segura y escalable. Este servicio admite protocolos de transferencia de archivos como SFTP, FTPS y FTP.

### [Amazon EFS](https://aws.amazon.com/efs/) {id="amazon-efs"}

![Amazon EFS](/assets/blog/25b270cd75b8a38a5d1450435f8e842629f98eb44d40a0954810b5e9dc524828.jpg)

Amazon EFS es un sistema de archivos elástico y escalable que te permite almacenar y administrar archivos en la nube de AWS. Este servicio ofrece una forma segura y confiable de almacenar y recuperar archivos.

### Cómo funcionan juntos {id="c%C3%B3mo-funcionan-juntos"}

Al combinar AWS Transfer Family con Amazon EFS, puedes crear una solución de transferencia de archivos segura y escalable que te permite acceder a tus archivos desde cualquier lugar y dispositivo.

| Servicio | Descripción |
| --- | --- |
| AWS Transfer Family | Transferencia de archivos segura y escalable |
| Amazon EFS | Almacenamiento y gestión de archivos en la nube |

En las siguientes secciones, exploraremos los pasos para configurar y utilizar AWS Transfer Family con Amazon EFS.

## Requisitos para la Integración {id="requisitos-para-la-integraci%C3%B3n"}

Para integrar AWS Transfer Family con Amazon EFS, es necesario cumplir con ciertos requisitos previos. A continuación, se presentan los requisitos fundamentales para la integración exitosa de estos servicios.

### Requisitos previos {id="requisitos-previos"}

| Requisito | Descripción |
| --- | --- |
| Región de AWS | El servidor de Transfer Family y su sistema de archivos de Amazon EFS deben estar ubicados en la misma región de AWS. |
| Políticas de IAM | Es necesario configurar políticas de IAM para permitir el acceso al rol de IAM utilizado por Transfer Family. |
| Acceso entre cuentas | Si el servidor de Transfer Family es propiedad de una cuenta diferente, es necesario habilitar el acceso entre cuentas. |
| Política del sistema de archivos | Asegúrese de que la política del sistema de archivos no permita el acceso público. |
| Configuración del acceso entre cuentas | Modifique la política del sistema de archivos para permitir el acceso entre cuentas. |

Al cumplir con estos requisitos, podrá integrar con éxito AWS Transfer Family con Amazon EFS y disfrutar de una transferencia de archivos segura y escalable.

## Configuración de la Integración {id="configuraci%C3%B3n-de-la-integraci%C3%B3n"}

Para configurar la integración de AWS Transfer Family con Amazon EFS, es necesario completar varios pasos importantes. A continuación, se presentan los pasos detallados para configurar la integración exitosa de estos servicios.

### Preparación de Amazon EFS para [AWS](https://aws.amazon.com/) Transfer Family {id="preparaci%C3%B3n-de-amazon-efs-para-aws-transfer-family"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

Antes de comenzar a configurar la integración, asegúrese de que su sistema de archivos de Amazon EFS esté listo para utilizarlo con AWS Transfer Family. Para hacer esto, siga los siguientes pasos:

| Paso | Descripción |
| --- | --- |
| 1 | Cree un sistema de archivos de Amazon EFS en la misma región de AWS que su servidor de Transfer Family. |
| 2 | Configure las políticas de IAM para permitir el acceso al rol de IAM utilizado por Transfer Family. |
| 3 | Cree usuarios y asigne permisos adecuados para acceder al sistema de archivos de Amazon EFS. |
| 4 | Asegúrese de que la política del sistema de archivos no permita el acceso público. |

### Habilitación del Acceso entre Cuentas {id="habilitaci%C3%B3n-del-acceso-entre-cuentas"}

Si su servidor de Transfer Family y su sistema de archivos de Amazon EFS se encuentran en cuentas de AWS diferentes, es necesario habilitar el acceso entre cuentas. Para hacer esto, siga los siguientes pasos:

| Paso | Descripción |
| --- | --- |
| 1 | Modifique la política del sistema de archivos para permitir el acceso entre cuentas. |
| 2 | Configure las políticas de IAM para permitir el acceso al rol de IAM utilizado por Transfer Family en la cuenta diferente. |
| 3 | Asegúrese de que la cuenta diferente tenga permisos adecuados para acceder al sistema de archivos de Amazon EFS. |

Al completar estos pasos, podrá configurar con éxito la integración de AWS Transfer Family con Amazon EFS y disfrutar de una transferencia de archivos segura y escalable.

## Transferir Archivos a Amazon EFS {id="transferir-archivos-a-amazon-efs"}

Transferir archivos a Amazon EFS utilizando AWS Transfer Family es un proceso sencillo que implica configurar cuentas de usuario, administrar claves y navegar dentro de EFS. En esta sección, te guiamos a través de los pasos para transferir archivos a Amazon EFS.

### Configuración de Cuentas de Usuario {id="configuraci%C3%B3n-de-cuentas-de-usuario"}

Para transferir archivos a Amazon EFS, debes configurar cuentas de usuario con los permisos necesarios. Puedes crear usuarios y asignarles roles utilizando AWS Identity and Access Management (IAM). Asegúrate de que los usuarios tengan los permisos necesarios para acceder al sistema de archivos de Amazon EFS.

### Administración de Claves {id="administraci%C3%B3n-de-claves"}

Para transferir archivos a Amazon EFS, debes administrar claves para la transferencia de archivos segura. Puedes utilizar claves SSH o claves de bucket de Amazon S3 para autenticar con el sistema de archivos de Amazon EFS. Asegúrate de que las claves estén configuradas correctamente y se roten regularmente para mantener la seguridad.

### Navegación dentro de EFS {id="navegaci%C3%B3n-dentro-de-efs"}

Una vez que hayas configurado cuentas de usuario y administrado claves, puedes navegar dentro de EFS para transferir archivos. Puedes utilizar la consola de AWS Transfer Family o la CLI de AWS para navegar dentro de EFS y transferir archivos. Asegúrate de tener los permisos necesarios para acceder a los archivos y carpetas dentro de EFS.

A continuación, te mostramos un ejemplo de cómo transferir archivos a Amazon EFS utilizando la CLI de AWS:

```
aws transfer upload --bucket my-efs-bucket --key my-file.txt --region us-east-1
```

Este comando carga un archivo llamado `my-file.txt` en el bucket `my-efs-bucket` en la región `us-east-1`.

Al seguir estos pasos, podrás transferir archivos a Amazon EFS utilizando AWS Transfer Family. Recuerda asegurarte de la seguridad y cumplir con las prácticas recomendadas de AWS al transferir archivos a Amazon EFS.

## Protección de Transferencias de Archivos {id="protecci%C3%B3n-de-transferencias-de-archivos"}

La seguridad es fundamental al transferir archivos entre AWS Transfer Family y Amazon EFS. En esta sección, exploraremos formas de proteger la transferencia de archivos, incluyendo políticas de IAM, grupos de seguridad de VPC y recomendaciones de seguridad de AWS.

### Políticas de IAM {id="pol%C3%ADticas-de-iam"}

Para proteger la transferencia de archivos, es fundamental configurar políticas de IAM adecuadas. Esto incluye definir roles y permisos para los usuarios y servicios que acceden a Amazon EFS. Asegúrate de que las políticas de IAM estén configuradas correctamente para evitar acceso no autorizado a tus archivos y carpetas.

### Grupos de Seguridad de VPC {id="grupos-de-seguridad-de-vpc"}

Los grupos de seguridad de VPC también juegan un papel importante en la seguridad de la transferencia de archivos. Asegúrate de que los grupos de seguridad estén configurados correctamente para permitir el tráfico de red entre AWS Transfer Family y Amazon EFS.

### Recomendaciones de Seguridad de AWS {id="recomendaciones-de-seguridad-de-aws"}

AWS proporciona varias recomendaciones de seguridad para proteger la transferencia de archivos. Asegúrate de seguir estas recomendaciones:

| Recomendación | Descripción |
| --- | --- |
| Autenticación y autorización adecuadas | Utiliza autenticación y autorización adecuadas para acceder a Amazon EFS. |
| Protocolos de transferencia de archivos seguros | Utiliza protocolos de transferencia de archivos seguros, como SFTP y FTPS. |
| Configuración de permisos y roles de IAM | Configura correctamente los permisos y roles de IAM. |
| Monitoreo y auditoría | Monitorea y audita las actividades de transferencia de archivos. |

Al seguir estas recomendaciones y configurar políticas de IAM y grupos de seguridad de VPC adecuados, podrás proteger la [transferencia de archivos entre AWS Transfer Family y Amazon EFS](/blog/guia-completa-sobre-amazon-efs-y-fsx/).

## Administración de permisos de usuario {id="administraci%C3%B3n-de-permisos-de-usuario"}

La gestión de permisos de usuario es fundamental para controlar quién tiene acceso a los archivos y carpetas en Amazon EFS. En esta sección, exploraremos cómo administrar permisos de usuario en AWS Transfer Family.

### Crear roles de IAM {id="crear-roles-de-iam"}

Para administrar permisos de usuario, debes crear roles de IAM que definan los permisos y accesos para los usuarios y servicios que acceden a Amazon EFS.

### Asignar permisos {id="asignar-permisos"}

Una vez que hayas creado un rol de IAM, debes asignar permisos a los usuarios o servicios que necesitan acceder a Amazon EFS.

### Revocar permisos {id="revocar-permisos"}

Es importante revocar los permisos cuando ya no sean necesarios.

### Ejemplo de política de IAM {id="ejemplo-de-pol%C3%ADtica-de-iam"}

A continuación, se muestra un ejemplo de política de IAM que concede permisos de lectura y escritura a un rol de IAM:

| Permiso | Descripción |
| --- | --- |
| `elasticfilesystem:ClientMount` | Permite montar el sistema de archivos de Amazon EFS |
| `elasticfilesystem:ClientWrite` | Permite escribir en el sistema de archivos de Amazon EFS |

Este ejemplo de política de IAM concede permisos de lectura y escritura al rol de IAM en la carpeta raíz del sistema de archivos de Amazon EFS.

Al seguir estos pasos, podrás administrar permisos de usuario en AWS Transfer Family y controlar quién tiene acceso a los archivos y carpetas en Amazon EFS.

## Monitoreo y Optimización del Rendimiento {id="monitoreo-y-optimizaci%C3%B3n-del-rendimiento"}

Para garantizar el rendimiento óptimo de AWS Transfer Family y Amazon EFS, es fundamental monitorear y optimizar su configuración y uso. En esta sección, exploraremos algunas mejores prácticas para monitorear y optimizar el rendimiento de su integración.

### Monitoreo de Actividad con [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) {id="monitoreo-de-actividad-con-aws-cloudwatch"}

![AWS CloudWatch](/assets/blog/af6613064a74b982792aeda9ceba840048121c2598cd44ec9ea1d09b78061bae.jpg)

AWS CloudWatch es un servicio de monitoreo y registro de AWS que le permite recopilar y analizar métricas y registros de su aplicación. Puede utilizar CloudWatch para monitorear la actividad de AWS Transfer Family y Amazon EFS, lo que le permite identificar problemas de rendimiento y tomar medidas para optimizar su configuración.

### Optimización del Rendimiento {id="optimizaci%C3%B3n-del-rendimiento"}

Para optimizar el rendimiento de AWS Transfer Family y Amazon EFS, es importante considerar varios factores, como la configuración de la instancia, el tamaño del archivo y la frecuencia de transferencia. A continuación, se presentan algunas sugerencias para optimizar el rendimiento:

| **Sugerencia** | **Descripción** |
| --- | --- |
| Ajuste de la configuración de la instancia | Asegúrese de que la instancia de AWS Transfer Family tenga suficientes recursos (como CPU y memoria) para manejar el tráfico de archivos. |
| Uso de archivos pequeños | Divide los archivos grandes en archivos más pequeños para reducir el tiempo de transferencia y mejorar el rendimiento. |
| Programación de transferencias | Programe las transferencias durante períodos de baja actividad para reducir la carga en la instancia y mejorar el rendimiento. |

### Solución de Problemas {id="soluci%C3%B3n-de-problemas"}

En caso de problemas de rendimiento, es importante identificar la causa raíz del problema y tomar medidas para solucionarlo. A continuación, se presentan algunos pasos para solucionar problemas de rendimiento:

| **Paso** | **Descripción** |
| --- | --- |
| Revisión de los registros | Revisé los registros de AWS CloudWatch para identificar patrones de actividad anómalos o errores que puedan indicar problemas de rendimiento. |
| Verificación de la configuración | Verifique que la configuración de la instancia y la configuración de AWS Transfer Family estén correctas y optimizadas para el rendimiento. |
| Pruebas de rendimiento | Realice pruebas de rendimiento para identificar problemas de rendimiento y evaluar el impacto de las optimizaciones en el rendimiento. |

Siguiendo estos consejos, podrá monitorear y optimizar el rendimiento de AWS Transfer Family y Amazon EFS, lo que le permitirá mejorar la eficiencia y la productividad de su integración.

## Conclusión {id="conclusi%C3%B3n"}

En resumen, la integración de AWS Transfer Family con Amazon EFS ofrece una solución segura y escalable para la transferencia de archivos. Al combinar las características de AWS Transfer Family con la capacidad de almacenamiento elástico de Amazon EFS, puede simplificar y acelerar la migración de workflows de transferencia de archivos a AWS.

### Ventajas de la Integración {id="ventajas-de-la-integraci%C3%B3n"}

La integración de AWS Transfer Family con Amazon EFS ofrece varias ventajas, incluyendo:

| Ventaja | Descripción |
| --- | --- |
| Acceso seguro a archivos | Acceda a sus archivos de manera segura y eficiente, independientemente de su ubicación o dispositivo. |
| Escalabilidad automática | La escalabilidad automática de AWS Transfer Family garantiza que su aplicación pueda manejar cambios en el tráfico de archivos. |
| Control de acceso | Configure permisos de acceso y autenticación para controlar quién tiene acceso a sus archivos y desde dónde se acceden. |

En este artículo, hemos explorado los pasos para configurar y utilizar AWS Transfer Family con Amazon EFS. Esperamos que esta guía haya sido útil para usted y que pueda aprovechar las ventajas de la integración de AWS Transfer Family con Amazon EFS en su propio entorno.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Cómo configuro mi servidor de AWS Transfer Family para utilizar un bucket de [Amazon S3](https://aws.amazon.com/s3/) que está en otra cuenta de AWS? {id="%C2%BFc%C3%B3mo-configuro-mi-servidor-de-aws-transfer-family-para-utilizar-un-bucket-de-amazon-s3-que-est%C3%A1-en-otra-cuenta-de-aws%3F"}

![Amazon S3](/assets/blog/250ef651f0bfcd5f38dda8c15ab2484f902c7d8d5072c2642fdc8b7ea30ae25e.jpg)

Para configurar su servidor de AWS Transfer Family para utilizar un bucket de Amazon S3 que está en otra cuenta de AWS, siga estos pasos:

| Paso | Descripción |
| --- | --- |
| 1 | Cree un rol de AWS Identity and Access Management (IAM) en la cuenta A con acceso al bucket. |
| 2 | Actualice la política del bucket para conceder acceso entre cuentas al rol de IAM en la cuenta B. |
| 3 | Cree un usuario del servidor de Transfer Family configurado con el rol de IAM en la cuenta A. |

### ¿Es seguro AWS Transfer Family? {id="%C2%BFes-seguro-aws-transfer-family%3F"}

La seguridad es una prioridad en AWS. Como cliente de AWS, usted se beneficia de una arquitectura de centro de datos y red que se construyó para satisfacer los requisitos de seguridad más estrictos. La seguridad es una responsabilidad compartida entre AWS y usted.

## Related posts

- [Mejores Prácticas Para Amazon ECS](/blog/mejores-practicas-para-amazon-ecs/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Comprendiendo AWS Backup](/blog/comprendiendo-aws-backup/)
- [Guía Completa sobre Amazon EFS y FSX](/blog/guia-completa-sobre-amazon-efs-y-fsx/)
