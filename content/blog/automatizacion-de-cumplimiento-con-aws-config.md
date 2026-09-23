+++
url = "/blog/automatizacion-de-cumplimiento-con-aws-config/"
title = "Automatización de cumplimiento con AWS Config"
description = "AWS Config automatiza el cumplimiento en la nube, permitiendo monitorear, corregir y aplicar políticas de manera eficiente y sin intervención manual."
date = "2025-01-09T00:16:49.410000+00:00"
lastmod = "2025-01-16"
image = "/assets/blog/887b167cb63dec6854e043dc5d45275a76df14d62e72868fa0871d51c2667146.jpg"
archive_order = 30

[[related]]
title = "Cómo automatizar ajustes de políticas con AWS Security Hub"
url = "/blog/como-automatizar-ajustes-de-politicas-con-aws-security-hub/"
image = "/assets/blog/0a51232b23a8b40ad5b29e211c7b5391476e700b94b8a275d060a8eef7505fbd.jpg"

[[related]]
title = "Checklist: Servicios AWS Esenciales para SAA-C03"
url = "/blog/checklist-servicios-aws-esenciales-para-saa-c03/"
image = "/assets/blog/eadb9eb1eb9dfe22a3da22e2c01c99ef77d64a62ecf0d7329bc5af595b7811c7.jpg"

[[related]]
title = "10 Casos de Uso de ML de AWS en Agricultura"
url = "/blog/10-casos-de-uso-de-ml-de-aws-en-agricultura/"
image = "/assets/blog/b531b459f1900e0e59a6d476909b335a5d30a5586ee0a39ac6661d2dd437c629.jpg"
+++

**¿Quieres simplificar el cumplimiento en la nube?** [AWS Config](https://aws.amazon.com/config/) te ayuda a monitorear y automatizar la gestión de políticas en tus recursos de AWS. Con esta herramienta, puedes:

- **Monitorear continuamente** tus recursos y configuraciones.
- **Corregir incumplimientos automáticamente** sin intervención manual.
- **Aplicar políticas uniformes** en múltiples cuentas y regiones.
- **Crear reglas personalizadas** para necesidades específicas.

Además, puedes integrar AWS Config con servicios como **[AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)** y **[AWS Control Tower](https://docs.aws.amazon.com/controltower/)** para una gestión centralizada. Si buscas una solución eficiente para mantener la seguridad y cumplir normativas en la nube, AWS Config es clave.

**¿Cómo funciona?** A continuación, te explicamos cómo configurarlo, usar reglas predefinidas y personalizadas, y establecer remediaciones automáticas.

## Configuración de [AWS Config](https://aws.amazon.com/config/) para el Cumplimiento {id="configuracion-de-aws-config-para-el-cumplimiento"}

![AWS Config](/assets/blog/f2503d2aec4e75d93ddd6b9b22d96e01f5be4378a41e86ff6d55100f93b7c77b.jpg)

### Habilitando AWS Config {id="habilitando-aws-config"}

El primer paso para una estrategia de cumplimiento automatizada con AWS Config es configurarlo correctamente. Esto implica tomar decisiones clave sobre:

| Aspecto | Decisión |
| --- | --- |
| **Recursos** | Seleccionar tipos específicos o incluir todos los recursos de AWS |
| **Canal** | Elegir un bucket S3 para almacenar historiales |
| **Evaluación** | Determinar la frecuencia de las evaluaciones |
| **IAM** | Definir roles y permisos necesarios |

Es importante que el bucket S3 y los permisos IAM cumplan con las políticas de seguridad para proteger información sensible [[1]](https://www.paloaltonetworks.es/cyberpedia/how-to-maintain-aws-compliance).

Una vez habilitado AWS Config, el siguiente paso es usar las reglas predefinidas para establecer controles de cumplimiento efectivos.

### Uso de Reglas Predefinidas {id="uso-de-reglas-predefinidas"}

AWS Config incluye reglas predefinidas que simplifican la implementación de controles de cumplimiento comunes [[2]](https://docs.aws.amazon.com/es_es/config/latest/developerguide/evaluate-config_develop-rules_cfn-guard.html). Algunas de las reglas más frecuentes son:

| Regla | Propósito |
| --- | --- |
| **vpc-flow-logs-enabled** | Verifica que los logs de flujo estén habilitados en las VPCs |
| **encrypted-volumes** | Garantiza el cifrado de los volúmenes EC2 |
| **required-tags** | Asegura que se apliquen etiquetas obligatorias |
| **s3-bucket-public-read-prohibited** | Evita el acceso público a buckets S3 |

Es recomendable comenzar con un conjunto reducido de reglas y ampliar gradualmente según las necesidades [[5]](https://dev.to/sjim-akt/aws-config-para-analisis-de-seguridad-173f). Si usas AWS Organizations, puedes aplicar estas reglas de forma consistente en varias cuentas [[3]](https://docs.aws.amazon.com/config/latest/developerguide/service-integrations.html).

Para evaluar el cumplimiento, AWS Config permite elegir entre evaluaciones periódicas o basadas en cambios. Para recursos críticos, activa evaluaciones basadas en cambios para identificar desviaciones rápidamente [[1]](https://www.paloaltonetworks.es/cyberpedia/how-to-maintain-aws-compliance)[[5]](https://dev.to/sjim-akt/aws-config-para-analisis-de-seguridad-173f).

## Creación de Reglas Personalizadas con AWS Config {id="creacion-de-reglas-personalizadas-con-aws-config"}

Cuando las reglas predefinidas no cubren tus necesidades, AWS Config te permite establecer controles específicos para garantizar que las políticas de tu organización se apliquen automáticamente. Esto puede lograrse a través de dos métodos principales: **AWS CloudFormation Guard** para reglas más simples y **AWS Lambda** para escenarios más avanzados.

### Reglas Personalizadas con [AWS CloudFormation Guard](https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html) {id="reglas-personalizadas-con-aws-cloudformation-guard"}

![AWS CloudFormation Guard](/assets/blog/b5e090d539bd27faaf661c8e750d5743917d2316a152d9b20259d945a55ea54e.jpg)

AWS CloudFormation Guard utiliza una sintaxis declarativa que facilita la creación de reglas personalizadas, incluso si no tienes experiencia en programación [[4]](https://docs.aws.amazon.com/es_es/prescriptive-guidance/latest/patterns/create-aws-config-custom-rules-by-using-aws-cloudformation-guard-policies.html). Por ejemplo, para asegurarte de que las instancias EC2 tengan una etiqueta 'Ambiente' con el valor 'Produccion', podrías usar una regla como esta:

```
rule "ValidacionTagsEC2" {
  condition = "resource.type == 'AWS::EC2::Instance' && resource.tags['Ambiente'] == 'Produccion'"
  action = "NON_COMPLIANT"
}
```

### Creación de Reglas con [AWS Lambda](https://aws.amazon.com/lambda/) {id="creacion-de-reglas-con-aws-lambda"}

Con AWS Lambda puedes abordar situaciones más complejas y conectar tus reglas con otros servicios de AWS [[6]](https://docs.aws.amazon.com/es_es/config/latest/developerguide/evaluate-config_components.html). Este método es ideal para:

- Validar relaciones entre múltiples recursos.
- Conectar con servicios externos.
- Implementar lógica avanzada para casos específicos.

| Característica | CloudFormation Guard | Lambda |
| --- | --- | --- |
| **Complejidad** | Baja a moderada | Requiere conocimientos avanzados |
| **Casos de Uso** | Validaciones básicas | Escenarios complejos |
| **Integración** | Limitada | Con cualquier servicio AWS |
| **Programación** | Sintaxis Guard | Python, Node.js, Java |

Es importante verificar que los permisos IAM necesarios estén configurados para que la función Lambda pueda ejecutarse correctamente. Además, la función debe incluir la lógica específica para evaluar los recursos y determinar si cumplen con las políticas establecidas.

Para necesidades más simples, CloudFormation Guard es una solución práctica. Sin embargo, si necesitas manejar escenarios más avanzados, Lambda ofrece una flexibilidad mucho mayor para personalizar tus reglas de cumplimiento. Ambos métodos te permiten adaptar AWS Config a los requerimientos de tu organización.

## Configuración de la Remediación Automatizada {id="configuracion-de-la-remediacion-automatizada"}

La remediación automatizada es una parte crucial para mantener el cumplimiento, ya que permite corregir problemas sin intervención manual. Una vez definidas las reglas de cumplimiento, el siguiente paso es establecer acciones automáticas para resolver cualquier incumplimiento.

### Configuración de la Auto-Remediación {id="configuracion-de-la-auto-remediacion"}

Para configurar la remediación automatizada en AWS Config, necesitas integrarla con [AWS Systems Manager](https://docs.aws.amazon.com/systems-manager/) (SSM). Esto implica definir acciones correctivas utilizando funciones Lambda o acciones de SSM, asociarlas a las reglas de AWS Config y asegurarte de que los permisos de IAM estén configurados correctamente.

Por ejemplo, para automatizar el cifrado de volúmenes EBS que no cumplen con las políticas, puedes usar esta función Lambda:

```
def remediate_unencrypted_volume(volume_id):
    ec2_client = boto3.client('ec2')
    try:
        snapshot = ec2_client.create_snapshot(VolumeId=volume_id)
        new_volume = ec2_client.create_volume(SnapshotId=snapshot['SnapshotId'], Encrypted=True)
        return True
    except Exception:
        return False
```

### Consejos para una Remediación Eficiente {id="consejos-para-una-remediacion-eficiente"}

- **Prueba en entornos controlados**: Asegúrate de que las acciones funcionen correctamente antes de aplicarlas en producción.
- **Asegura idempotencia**: Las acciones deben poder ejecutarse varias veces sin causar conflictos o duplicaciones.
- **Monitoreo constante**: Usa [AWS CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) para supervisar los resultados y detectar problemas rápidamente.
- **Registros detallados**: Mantén un registro de todas las remediaciones y sus resultados para auditorías y análisis futuros.
- **Procesos de aprobación**: En situaciones más complejas, considera implementar aprobaciones antes de ejecutar remediaciones automáticas.

Si necesitas incluir aprobaciones manuales en los flujos de trabajo, [AWS Step Functions](https://aws.amazon.com/step-functions/) es una herramienta útil. Aquí tienes un ejemplo básico de configuración:

```
{
  "StartAt": "EvaluarRecurso",
  "States": {
    "EvaluarRecurso": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT:function:EvaluarRecurso",
      "Next": "RequiereAprobacion"
    },
    "RequiereAprobacion": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.requiereAprobacion",
          "BooleanEquals": true,
          "Next": "EsperarAprobacion"
        }
      ],
      "Default": "EjecutarRemediacion"
    }
  }
}
```

Con estas configuraciones, AWS Config no solo identifica incumplimientos, sino que también los corrige de manera automática. Más adelante, veremos ejemplos prácticos y cómo abordar problemas comunes.

## Ejemplos y Solución de Problemas {id="ejemplos-y-solucion-de-problemas"}

### Ejemplo: Asegurar Volúmenes Cifrados {id="ejemplo-asegurar-volumenes-cifrados"}

Aquí tienes una regla personalizada de AWS CloudFormation Guard que verifica si los volúmenes EBS cumplen con las políticas de cifrado:

```
let ebs_volumes = Resources.*[ Type == 'AWS::EBS::Volume' ]
rule check_ebs_encryption when %ebs_volumes !empty {
    %ebs_volumes.Properties.Encrypted == true
    <<
        Violation: Los volúmenes EBS deben estar cifrados
        Fix: Establezca la propiedad 'Encrypted' como true
    >>
}
```

Además, esta función Lambda realiza la remediación automática para garantizar que los volúmenes no cifrados se actualicen correctamente:

```
import boto3

def lambda_handler(event, context):
    config = boto3.client('config')
    ec2 = boto3.client('ec2')
    volume_id = event['detail']['configurationItem']['resourceId']

    try:
        snapshot = ec2.create_snapshot(
            VolumeId=volume_id,
            Description='Snapshot automático para cifrado'
        )
        waiter = ec2.get_waiter('snapshot_completed')
        waiter.wait(SnapshotIds=[snapshot['SnapshotId']])

        response = ec2.create_volume(
            SnapshotId=snapshot['SnapshotId'],
            AvailabilityZone=event['detail']['configurationItem']['availabilityZone'],
            Encrypted=True
        )

        return {
            'statusCode': 200,
            'body': f"Volumen {volume_id} cifrado exitosamente"
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f"Fallo al crear snapshot o volumen cifrado: {str(e)}"
        }
```

Con esta solución, puedes automatizar el cumplimiento de políticas de cifrado en tu infraestructura. A continuación, revisemos cómo resolver los problemas más comunes al trabajar con AWS Config y sus reglas.

### Solución de Problemas en AWS Config {id="solucion-de-problemas-en-aws-config"}

Para que AWS Config funcione correctamente y mantenga el cumplimiento, es importante abordar los problemas más habituales. Aquí tienes un resumen práctico:

| Problema | Solución |
| --- | --- |
| Reglas no activadas | Revisa y actualiza los permisos IAM necesarios para activar las reglas. |
| Errores de entrega | Asegúrate de que el bucket S3 tenga los permisos correctos. |
| Límites de tiempo en funciones Lambda | Ajusta la configuración de timeout para evitar interrupciones. |
| Evaluaciones inconsistentes | Verifica la configuración en implementaciones multi-región. |

Además, puedes usar CloudTrail para investigar problemas específicos en AWS Config. Por ejemplo, este comando te permite rastrear eventos relacionados con evaluaciones:

```
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=PutEvaluations
```

Para un monitoreo más efectivo, configura [alarmas en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/) que te alerten sobre:

- Fallos en la ejecución de reglas.
- Errores de entrega.
- Problemas con permisos.
- Timeouts en procesos de remediación.

Estas alarmas te ayudarán a detectar y solucionar problemas rápidamente, asegurando que tu infraestructura se mantenga en línea con las políticas establecidas. </

## Conclusión y Recursos Adicionales {id="conclusion-y-recursos-adicionales"}

### Puntos Clave {id="puntos-clave"}

AWS Config es una herramienta que simplifica el [cumplimiento en AWS](/blog/aws-seguridad-fundamentos-esenciales/) al proporcionar:

- **Monitoreo continuo** y evaluación automática de los recursos.
- **Políticas personalizables** mediante reglas adaptadas a necesidades específicas.
- **Remediación automatizada** para mantener el cumplimiento sin intervención manual.

Con AWS Config, las organizaciones pueden:

- Reducir los errores humanos.
- Mejorar la eficiencia en operaciones.
- Asegurar configuraciones consistentes.
- Facilitar los procesos de auditoría.

### Recursos en Español para Aprender AWS {id="recursos-en-espanol-para-aprender-aws"}

Si buscas aprender más sobre AWS Config y la automatización del cumplimiento, [Dónde Aprendo AWS](/) es un excelente recurso. Este sitio ofrece guías prácticas y ejemplos detallados que ayudan a implementar soluciones de cumplimiento en entornos reales.

Estos recursos permiten a las organizaciones gestionar el cumplimiento en AWS de forma más eficiente y efectiva. </

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Qué herramientas pueden usar los clientes para definir reglas personalizadas en AWS Config? {id="que-herramientas-pueden-usar-los-clientes-para-definir-reglas-personalizadas-en-aws-config"}

AWS Config ofrece dos opciones principales para crear reglas personalizadas: **AWS Lambda**, ideal para lógica más compleja y conexiones externas, y **AWS CloudFormation Guard**, diseñado para configuraciones más directas y simples.

> "AWS CloudFormation Guard proporciona un lenguaje de política como código para definir y hacer cumplir las reglas, ofreciendo un control más detallado y facilidad de configuración en comparación con las reglas Lambda completamente personalizadas."

La herramienta adecuada dependerá de tus necesidades específicas. Aquí tienes una comparación rápida:

| Criterio | AWS Lambda | AWS CloudFormation Guard |
| --- | --- | --- |
| Complejidad | Alta | Baja |
| Flexibilidad | Más control | Enfocado en políticas |
| Casos de uso | Lógica avanzada | Evaluaciones estándar |

Además, AWS Config se integra con otros servicios para facilitar una gestión eficiente del cumplimiento.

### ¿Cómo se integra AWS Config con otros servicios para la automatización del cumplimiento? {id="como-se-integra-aws-config-con-otros-servicios-para-la-automatizacion-del-cumplimiento"}

AWS Config trabaja junto con **AWS Organizations** y **Control Tower** para monitorear y administrar políticas en varias cuentas y regiones. Esto permite una evaluación centralizada y uniforme del cumplimiento en toda tu organización.

### ¿Cómo puedo solucionar problemas con AWS Config? {id="como-puedo-solucionar-problemas-con-aws-config"}

Si encuentras problemas con AWS Config, sigue estos pasos básicos:

- Revisa el panel principal para verificar el estado de cumplimiento.
- Usa **[AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)** para analizar los registros de cambios de configuración.
- Si utilizas reglas personalizadas, valida su configuración con **AWS CloudFormation Guard**.

Estos pasos te ayudarán a identificar y resolver la mayoría de los problemas comunes de manera eficiente.

## Related posts

- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Cómo crear Infraestructura como Código en AWS con AWS CloudFormation](/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/)
- [Estrategias de Interoperabilidad Multi-Cloud con AWS](/blog/estrategias-de-interoperabilidad-multi-cloud-con-aws/)
