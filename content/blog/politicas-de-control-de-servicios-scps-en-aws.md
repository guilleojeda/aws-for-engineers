+++
url = "/blog/politicas-de-control-de-servicios-scps-en-aws/"
title = "Políticas de Control de Servicios (SCPs) en AWS"
description = "Descubra cómo las SCPs en AWS mejoran la seguridad y el cumplimiento mediante la gestión de permisos y el control de accesos en la organización."
date = "2024-05-09T02:00:12.498000+00:00"
lastmod = "2024-05-09"
image = "/assets/blog/ae0015b4c4fa992bfdc8c817b60dada534acebc6d221300b08c2e55bd07573d6.jpg"
archive_order = 87

[[related]]
title = "Monitoreo y Logs de AWS Step Functions: Guía 2024"
url = "/blog/monitoreo-y-logs-de-aws-step-functions-guia-2024/"
image = "/assets/blog/3cdeed308ae19cafa2c58e0d20fb79cf0ed3ff877e708064cdb5544e2c6e7ab1.jpg"

[[related]]
title = "Guía de UEBA para la Seguridad de AWS"
url = "/blog/guia-de-ueba-para-la-seguridad-de-aws/"
image = "/assets/blog/77827c07de64ac355ca012786d8c7d84a9bc6148b0f9b5d9cc9a032e2a0a8c5b.jpg"

[[related]]
title = "Opciones para Desplegar Contenedores en AWS: ECS y EKS"
url = "/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/"
image = "/assets/blog/fce8d84a0c54b5cb44769316202a53ace3d5844aedb777d76eede269d672dbd5.jpg"
+++

Las Políticas de Control de Servicios (SCPs) son una poderosa herramienta de [AWS](https://aws.amazon.com/) para controlar y restringir el acceso a servicios y recursos en una organización. Permiten establecer permisos centralizados para todos los usuarios y roles, mejorando la seguridad y el cumplimiento.

**¿Qué son las SCPs?**

- Definen permisos máximos para usuarios y roles de [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) en una organización
- Controlan el acceso a servicios y recursos de AWS
- Se aplican a nivel de unidad organizativa (OU) o cuenta

**Crear y Administrar SCPs**

| Componente | Descripción |
| --- | --- |
| Declaraciones | Definen acciones permitidas o denegadas |
| Efectos | Allow o Deny |
| Acciones | Operaciones permitidas o denegadas |
| Recursos | Objetos afectados por la SCP |
| Condiciones | Restricciones adicionales |

**Casos de Uso**

- Restringir acciones por región
- Exigir autenticación multifactor (MFA)
- Prevenir cambios no autorizados en configuraciones

**Mejores Prácticas**

- Probar SCPs antes de implementarlas
- Utilizar SCPs específicas por OU o cuenta
- Revisar y actualizar SCPs regularmente
- Seguir principios de privilegios mínimos

Las SCPs son fundamentales para una gobernanza efectiva en AWS, permitiendo controlar el acceso a recursos y servicios de manera centralizada y segura.

## Crear Políticas de Control de Servicios Efectivas {id="crear-pol%C3%ADticas-de-control-de-servicios-efectivas"}

Crear políticas de control de servicios (SCPs) efectivas es crucial para garantizar la seguridad y el cumplimiento en su [organización de AWS](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/). En esta sección, se describirán los componentes clave de una SCP y se proporcionarán pasos detallados para crear una nueva SCP.

### Componentes de SCP {id="componentes-de-scp"}

Las políticas de control de servicios (SCPs) se componen de varias partes clave:

| Componente | Descripción |
| --- | --- |
| **Declaraciones** | Definen las acciones permitidas o denegadas. Las declaraciones pueden ser de tipo "Allow" o "Deny". |
| **Efectos** | Determinan el resultado de una declaración. Los efectos pueden ser "Allow" o "Deny". |
| **Acciones** | Son las operaciones que se permiten o deniegan en una SCP. Las acciones pueden ser específicas de un servicio o recurso de AWS. |
| **Recursos** | Son los objetos que se afectan por una SCP. Los recursos pueden ser cuentas, roles, usuarios o recursos de AWS específicos. |
| **Condiciones** | Son restricciones adicionales que se aplican a una SCP. Las condiciones pueden ser basadas en atributos de recursos, como la región o el tipo de recurso. |

### Pasos para crear una nueva SCP {id="pasos-para-crear-una-nueva-scp"}

Para crear una nueva SCP, siga estos pasos:

1\. **Determinar el propósito de la SCP**: Defina el propósito de la SCP y qué tipo de acceso quiere controlar.

2\. **Elegir el efecto**: Seleccione el efecto deseado para la SCP, ya sea "Allow" o "Deny".

3\. **Especificar las acciones**: Especifique las acciones que se permiten o deniegan en la SCP.

4\. **Definir los recursos**: Defina los recursos que se afectan por la SCP.

5\. **Agregar condiciones (opcional)**: Agregue condiciones adicionales para restringir la SCP según sea necesario.

6\. **Probar la SCP**: Pruebe la SCP en un entorno de prueba antes de implementarla en producción.

Recuerde que es importante probar y refinar su SCP antes de implementarla en su organización de AWS.

## Adjuntar y desadjuntar SCPs {id="adjuntar-y-desadjuntar-scps"}

Adjuntar y desadjuntar Políticas de Control de Servicios (SCPs) es un aspecto crucial para administrar el acceso dentro de las organizaciones de AWS. En esta sección, exploraremos los permisos necesarios para adjuntar y desadjuntar SCPs y el impacto de estos cambios en las cuentas de AWS.

### Permisos para cambios de SCP {id="permisos-para-cambios-de-scp"}

Para adjuntar o desadjuntar una SCP, se necesita permiso para ejecutar las siguientes acciones:

| Acción | Descripción |
| --- | --- |
| `organizations:AttachPolicy` | Adjuntar una SCP a una cuenta, OU o raíz. |
| `organizations:DetachPolicy` | Desadjuntar una SCP de una cuenta, OU o raíz. |

Estos permisos se pueden otorgar a usuarios de IAM, roles o el usuario raíz en la cuenta de administración de la organización.

### Adjuntar SCPs a entidades de [AWS](https://aws.amazon.com/) {id="adjuntar-scps-a-entidades-de-aws"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

Para adjuntar una SCP a una raíz, OU o cuenta, puede utilizar la Consola de administración de AWS, la CLI de AWS o los SDK de AWS. A continuación, se muestra un ejemplo de cómo adjuntar una SCP utilizando la CLI de AWS:

```
aws organizations attach-policy \
    --policy-id p-i9j8k7l6m5 \
    --target-id ou-a1b2-f6g7h222
```

Este comando adjunta la SCP especificada a la OU especificada. El cambio de política tiene efecto inmediato, afectando los permisos de los usuarios de IAM y roles en la cuenta adjunta o todas las cuentas bajo la raíz o OU adjunta.

### Desadjuntar SCPs: restricciones y efectos {id="desadjuntar-scps%3A-restricciones-y-efectos"}

Para desadjuntar una SCP de una raíz, OU o cuenta, puede utilizar la Consola de administración de AWS, la CLI de AWS o los SDK de AWS. A continuación, se muestra un ejemplo de cómo desadjuntar una SCP utilizando la CLI de AWS:

```
aws organizations detach-policy \
    --policy-id p-i9j8k7l6m5 \
    --target-id ou-a1b2-f6g7h222
```

Este comando desadjunta la SCP especificada de la OU especificada. El cambio de política tiene efecto inmediato, afectando los permisos de los usuarios de IAM y roles en la cuenta desadjunta o todas las cuentas bajo la raíz o OU desadjunta.

Al desadjuntar una SCP, tenga en cuenta las siguientes restricciones y efectos:

- No se puede desadjuntar una SCP de una raíz, OU o cuenta si es la única SCP adjunta a esa entidad.
- Desadjuntar una SCP no afecta los permisos de los usuarios de IAM y roles que ya han sido otorgados acceso a la entidad desadjunta.
- Desadjuntar una SCP puede llevar a acceso no autorizado o violaciones de seguridad si no se planifica y ejecuta adecuadamente.

Al entender los permisos y restricciones involucrados en adjuntar y desadjuntar SCPs, puede administrar efectivamente el acceso dentro de su organización de AWS y asegurar la seguridad y el cumplimiento de sus recursos.

## Mantenimiento de Políticas de Control de Servicios {id="mantenimiento-de-pol%C3%ADticas-de-control-de-servicios"}

El mantenimiento de las Políticas de Control de Servicios (SCPs) es crucial para garantizar la gobernanza y el control continuos dentro de su organización de AWS. A medida que evoluciona la necesidad de su organización, es posible que deba actualizar, etiquetar o incluso eliminar SCPs existentes. Esta sección cubre las mejores prácticas para administrar SCPs con el tiempo.

### Actualizar una SCP {id="actualizar-una-scp"}

Puede actualizar una SCP existente cambiando su nombre, descripción o contenido de la política. Para actualizar una SCP, necesita los siguientes permisos:

| Permiso | Descripción |
| --- | --- |
| `organizations:UpdatePolicy` | Permite actualizar el nombre, descripción o contenido de la SCP. |
| `organizations:DescribePolicy` | Permite ver los detalles actuales de la SCP. |

Puede actualizar una SCP utilizando la Consola de administración de AWS, la CLI de AWS o los SDK de AWS. Por ejemplo, para renombrar una SCP utilizando la CLI de AWS:

```
aws organizations update-policy \
    --policy-id p-i9j8k7l6m5 \
    --name "Nueva Política SCP"
```

Cuando actualiza el contenido de una SCP, los cambios surten efecto inmediato, afectando los permisos de los usuarios de IAM y roles en todas las cuentas donde se adjunta la SCP.

### Administrar etiquetas de SCP {id="administrar-etiquetas-de-scp"}

Puede agregar, editar o eliminar etiquetas asociadas con una SCP para ayudar a organizar e identificar sus políticas. Las etiquetas son pares clave-valor que puede utilizar para categorizar y filtrar recursos.

Para administrar etiquetas para una SCP, necesita los siguientes permisos:

| Permiso | Descripción |
| --- | --- |
| `organizations:TagResource` | Permite agregar o actualizar etiquetas para una SCP. |
| `organizations:UntagResource` | Permite eliminar etiquetas de una SCP. |

Puede administrar etiquetas de SCP utilizando la Consola de administración de AWS, la CLI de AWS o los SDK de AWS. Por ejemplo, para agregar una etiqueta a una SCP utilizando la CLI de AWS:

```
aws organizations tag-resource \
    --resource-id p-i9j8k7l6m5 \
    --tags Key=Entorno,Value=Producción
```

Etiquetar SCPs puede ayudar a organizar y administrar mejor sus políticas, especialmente en organizaciones grandes con muchas SCPs.

### Eliminar una SCP de manera segura {id="eliminar-una-scp-de-manera-segura"}

Si ya no necesita una SCP, puede eliminarla de su organización de AWS. Sin embargo, es importante seguir un proceso de eliminación seguro para evitar consecuencias no deseadas:

1\. **Desadjuntar la SCP**: Antes de eliminar una SCP, debe desadjuntarla de todas las unidades organizativas (OUs), cuentas y la raíz. No hacerlo puede resultar en acceso no autorizado o violaciones de seguridad.

2\. **Verificar la desadjuntación de la SCP**: Después de desadjuntar la SCP, verifique que ya no esté adjunta a ninguna entidad dentro de su organización.

3\. **Eliminar la SCP**: Una vez que haya confirmado que la SCP está desadjunta, puede eliminarla de manera segura utilizando la Consola de administración de AWS, la CLI de AWS o los SDK de AWS.

Para eliminar una SCP utilizando la CLI de AWS:

```
aws organizations delete-policy \
    --policy-id p-i9j8k7l6m5
```

Eliminar una SCP es una acción permanente, por lo que es crucial ser cauteloso y seguir los pasos adecuados para evitar consecuencias no deseadas.

Al mantener regularmente sus SCPs, actualizandolas según sea necesario, administrando etiquetas y eliminando políticas obsoletas de manera segura, puede asegurar que su organización de AWS permanezca bien gobernada y segura.

## Implementar SCPs de manera efectiva {id="implementar-scps-de-manera-efectiva"}

Para implementar políticas de control de servicios (SCPs) de manera efectiva, es crucial seguir las mejores prácticas y recomendaciones para maximizar la seguridad y minimizar la interrupción operativa dentro de una organización de AWS.

### Mejores prácticas para SCPs {id="mejores-pr%C3%A1cticas-para-scps"}

A continuación, se presentan algunas de las mejores prácticas para implementar SCPs:

| Mejora práctica | Descripción |
| --- | --- |
| Aplicar SCPs a nivel de OU | Permite un control más fino sobre los permisos y acceso a los recursos dentro de la organización. |
| Exigir autenticación multifactor (MFA) | Protege contra el acceso no autorizado a los recursos. |
| Restringir regiones y compartir imágenes de máquina virtual (AMI) | Evita el acceso no autorizado a los recursos. |

### Probar y solucionar problemas con SCPs {id="probar-y-solucionar-problemas-con-scps"}

Antes de implementar SCPs de manera generalizada, es fundamental probarlos en un entorno de prueba para asegurarse de que funcionen correctamente y no causen interrupciones operativas.

**Pasos para probar SCPs**

1\. Crear un entorno de prueba con una OU o cuenta de prueba. 2. Aplicar la SCP a esa entidad. 3. Probar los permisos y acceso a los recursos para asegurarse de que la SCP esté funcionando correctamente. 4. Utilizar herramientas como [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) para depurar y solucionar problemas con SCPs.

Al seguir estas prácticas y recomendaciones, puede asegurarse de implementar SCPs de manera efectiva y segura dentro de su organización de AWS.

## Casos de uso de SCP {id="casos-de-uso-de-scp"}

Las políticas de control de servicios (SCPs) ofrecen varias formas de mejorar la seguridad y el cumplimiento dentro de las organizaciones de AWS. A continuación, se presentan algunos ejemplos de cómo las SCPs pueden ser utilizadas para reforzar la seguridad y el cumplimiento.

### Control de acceso basado en región {id="control-de-acceso-basado-en-regi%C3%B3n"}

Las SCPs pueden ser utilizadas para restringir las acciones de las cuentas basadas en la región de AWS. Por ejemplo, una SCP puede ser creada para denegar todas las acciones fuera de las regiones específicas, como `eu-central-1` o `eu-west-1`. Esto garantiza que las cuentas solo puedan acceder a los recursos y servicios dentro de las regiones permitidas.

| Acción | Descripción |
| --- | --- |
| Denegar todas las acciones | Fuera de las regiones específicas |
| Permitir acciones específicas | Dentro de las regiones permitidas |

### Exigir autenticación multifactor con SCPs {id="exigir-autenticaci%C3%B3n-multifactor-con-scps"}

Las SCPs también pueden ser utilizadas para exigir la autenticación multifactor (MFA) para ejecutar acciones específicas de la API dentro de las cuentas miembro. Por ejemplo, una SCP puede ser creada para denegar las acciones de IAM si no se ha proporcionado una autenticación MFA válida.

| Acción | Descripción |
| --- | --- |
| Denegar acciones de IAM | Si no se ha proporcionado una autenticación MFA válida |
| Permitir acciones de IAM | Si se ha proporcionado una autenticación MFA válida |

### Prevenir cambios no autorizados en la configuración de las cuentas y los recursos {id="prevenir-cambios-no-autorizados-en-la-configuraci%C3%B3n-de-las-cuentas-y-los-recursos"}

Las SCPs también pueden ser utilizadas para prevenir cambios no autorizados en la configuración de las cuentas y los recursos por parte de los principales de IAM. Por ejemplo, una SCP puede ser creada para denegar las acciones de IAM que intentan modificar la configuración de la cuenta o los recursos sin la autorización adecuada.

| Acción | Descripción |
| --- | --- |
| Denegar cambios en la configuración | Sin la autorización adecuada |
| Permitir cambios en la configuración | Con la autorización adecuada |

En resumen, las SCPs ofrecen varias formas de mejorar la seguridad y el cumplimiento dentro de las organizaciones de AWS. Al utilizar SCPs para restringir las acciones de las cuentas basadas en la región, exigir la autenticación MFA y prevenir cambios no autorizados en la configuración de las cuentas y los recursos, las organizaciones pueden garantizar un entorno más seguro y cumplir con los requisitos de seguridad y cumplimiento.

## Conclusión: Uso de SCPs para la Gobernanza {id="conclusi%C3%B3n%3A-uso-de-scps-para-la-gobernanza"}

Las políticas de control de servicios (SCPs) son una herramienta fundamental para garantizar la seguridad y el cumplimiento dentro de las organizaciones de AWS. En este artículo, hemos explorado cómo crear, adjuntar y mantener SCPs efectivas para controlar el acceso a los recursos y servicios de AWS.

### Resumen de características y administración de SCPs {id="resumen-de-caracter%C3%ADsticas-y-administraci%C3%B3n-de-scps"}

En resumen, las SCPs ofrecen una forma flexible de controlar el acceso a los recursos y servicios de AWS. Al crear SCPs, se pueden definir permisos específicos para las cuentas miembro, restringir las acciones de IAM y exigir la autenticación multifactor. Además, las SCPs pueden ser adjuntadas a las organizaciones unitarias (OUs) o cuentas miembro, lo que facilita la gestión de los permisos y el cumplimiento.

### Mejores prácticas para el uso de SCPs {id="mejores-pr%C3%A1cticas-para-el-uso-de-scps"}

Para aprovechar al máximo las SCPs, es importante seguir las siguientes mejores prácticas:

| Mejora práctica | Descripción |
| --- | --- |
| Crear SCPs específicas | Para cada OU o cuenta miembro para garantizar una gestión de permisos precisa. |
| Utilizar SCPs para restringir acciones | De IAM y exigir la autenticación multifactor. |
| Probar y depurar SCPs | Antes de adjuntarlas a las OUs o cuentas miembro. |
| Revisar y actualizar regularmente | Las SCPs para garantizar que se ajusten a los cambios en la organización y los requisitos de seguridad. |

Al seguir estas recomendaciones y utilizar las SCPs de manera efectiva, las organizaciones pueden garantizar un entorno más seguro y cumplir con los requisitos de seguridad y cumplimiento.

## Preguntas frecuentes {id="preguntas-frecuentes"}

### ¿Qué es una política de control de servicios (SCP) de AWS? {id="%C2%BFqu%C3%A9-es-una-pol%C3%ADtica-de-control-de-servicios-(scp)-de-aws%3F"}

Una política de control de servicios (SCP) es un tipo de política de organización que se utiliza para administrar permisos en su organización de AWS. Las SCPs ofrecen control centralizado sobre los permisos máximos disponibles para los usuarios de IAM y los roles de IAM en su organización.

### ¿Cómo se crea una política de control de servicios? {id="%C2%BFc%C3%B3mo-se-crea-una-pol%C3%ADtica-de-control-de-servicios%3F"}

**Crear una SCP**

1. **Crear una organización de AWS**: Establezca su organización de AWS para la gestión centralizada.
2. **Habilitar políticas de control de servicios**: Active las SCPs en la configuración de su organización.
3. **Crear una SCP de AWS**: Defina su SCP, especificando las acciones permitidas o denegadas y los recursos.

### ¿Cómo se aplica una SCP? {id="%C2%BFc%C3%B3mo-se-aplica-una-scp%3F"}

**Adjuntar una SCP**

| **Paso** | **Descripción** |
| --- | --- |
| 1 | Inicie sesión en la consola de [AWS Organizations](https://aws.amazon.com/organizations/). |
| 2 | Navegue a la raíz, OU o cuenta que desea adjuntar una SCP. |
| 3 | En la pestaña de políticas, seleccione Adjuntar. |

## Related posts

- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Seguridad en AWS: Servicios Esenciales](/blog/aws-seguridad-servicios-esenciales/)
- [AWS Seguridad: Fundamentos Esenciales](/blog/aws-seguridad-fundamentos-esenciales/)
- [Gestionando Múltiples Cuentas de AWS con AWS Organizations](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/)
