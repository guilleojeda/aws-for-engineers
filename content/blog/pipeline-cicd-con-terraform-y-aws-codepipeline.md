+++
url = "/blog/pipeline-cicd-con-terraform-y-aws-codepipeline/"
title = "Pipeline CI/CD con Terraform y AWS CodePipeline"
description = "Automatiza tus despliegues en AWS con un pipeline CI/CD usando Terraform y CodePipeline, optimizando seguridad, escalabilidad y eficiencia."
date = "2025-02-13T00:13:18.430000+00:00"
lastmod = "2025-02-17"
image = "/assets/blog/8c8805d819a48bf8b59f25eb80e966ffd67c6991806d37a8925b6caad8334c86.jpg"
archive_order = 23

[[related]]
title = "10 Preguntas Frecuentes sobre Machine Learning en AWS"
url = "/blog/10-preguntas-frecuentes-sobre-machine-learning-en-aws/"
image = "/assets/blog/5152d1b598aa9df8aaa8e72cae2da4e62310d4ef16c5ef3fb76fe1cace41c1f0.jpg"

[[related]]
title = "Grupos de Estudio AWS en Reddit 2024"
url = "/blog/grupos-de-estudio-aws-en-reddit-2024/"
image = "/assets/blog/5aabd355c99039c456c8249b2273ae0ccca4a5edd41854e4d1b7868064445433.jpg"

[[related]]
title = "Comprendiendo Kubernetes y Amazon EKS"
url = "/blog/comprendiendo-kubernetes-y-amazon-eks/"
image = "/assets/blog/066e0f22ea88769f71d0c03924af25b54b42b02fb4df344456df49b10b3a6c3d.jpg"
+++

**¿Quieres automatizar tus despliegues en AWS de forma eficiente y segura?** Configurar un pipeline CI/CD con [Terraform](https://www.terraform.io/) y [AWS CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) es la solución. Este enfoque combina [infraestructura como código](/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/) y servicios administrados para acelerar el desarrollo.

### Resumen rápido: {id="resumen-rapido"}

- **Herramientas necesarias**: AWS CLI (≥2.0), Terraform (≥1.0.0), Git (2.x).
- **Componentes clave**:
  - **Terraform**: Gestiona la infraestructura.
  - **AWS CodePipeline**: Orquesta el flujo de despliegue.
  - **[AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html)**: Valida y aplica cambios de Terraform.
- **Etapas del pipeline**:
  1. **Origen**: Detecta cambios en el repositorio.
  2. **Validación**: Ejecuta `terraform validate` y `terraform fmt`.
  3. **Planificación**: Genera un plan con `terraform plan`.
  4. **Aprobación**: Paso manual para entornos críticos.
  5. **Aplicación**: Implementa cambios con `terraform apply`.

### Beneficios: {id="beneficios"}

- **Automatización**: Menos errores y despliegues más rápidos.
- **Seguridad**: Uso de KMS, IAM, y MFA.
- **Escalabilidad**: Modularidad y soporte multi-cuenta.

Con esta guía, aprenderás a configurar y optimizar un pipeline CI/CD paso a paso, integrando validaciones, seguridad y [pruebas automatizadas](https://www.andmore.dev/es/blog/getting-started-portman/). ¡Comienza a transformar tus procesos de despliegue hoy!

## Configuración del Entorno {id="configuracion-del-entorno"}

Prepara tu entorno con las herramientas y configuraciones necesarias para garantizar un flujo de trabajo eficiente.

### Herramientas y Accesos Requeridos {id="herramientas-y-accesos-requeridos"}

Asegúrate de contar con las siguientes herramientas instaladas:

| Herramienta | Versión |
| --- | --- |
| AWS CLI | ≥2.0 |
| Terraform | ≥1.0.0 |
| Git | 2.x |

Si usas [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html), estas herramientas ya vienen preinstaladas.

Además, necesitarás acceso a un repositorio en **[AWS CodeCommit](https://docs.aws.amazon.com/codecommit/)** o **GitHub**. Una vez que tengas todo listo, el siguiente paso será configurar los permisos IAM.

### Configuración de Roles IAM {id="configuracion-de-roles-iam"}

Para cumplir con las [prácticas de seguridad recomendadas](/blog/aws-seguridad-mejores-practicas/), deberás crear un rol IAM específico para CodePipeline:

- **Paso 1:** Crea un rol IAM para CodePipeline.
- **Paso 2:** Adjunta las políticas necesarias: `AWSCodePipelineFullAccess` y `AWSCodeBuildAdminAccess`.
- **Paso 3:** Agrega una política personalizada para gestionar el acceso a S3 y KMS:

```
data "aws_iam_policy_document" "pipeline_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:PutObject"
    ]
    resources = ["${aws_s3_bucket.artifacts.arn}/*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "kms:Decrypt",
      "kms:GenerateDataKey"
    ]
    resources = [aws_kms_key.pipeline_key.arn]
  }
}
```

No olvides habilitar la **autenticación multifactor (MFA)** para añadir una capa adicional de seguridad [[1]](https://aws.plainenglish.io/how-to-set-up-aws-codepipeline-using-terraform-code-4a732364212).

### Configuración de [Terraform](https://www.terraform.io/) {id="configuracion-de-terraform"}

![Terraform](/assets/blog/4e3b1c8d6bf25353076fb7b4e8051bd08d7ce58717e14fa15da0520d1de0aba3.jpg)

Terraform será clave para gestionar la infraestructura. A continuación, te mostramos cómo configurarlo:

1. **Estructura del Proyecto**

Organiza los archivos de tu proyecto de la siguiente manera:

```
terraform-pipeline/
├── main.tf
├── variables.tf
├── outputs.tf
└── backend.tf
```

2. **Backend de Terraform**

Configura el backend para almacenar el [estado de Terraform](https://dev.to/aws-builders/como-gestionar-el-estado-de-terraform-en-aws-51n1) en S3:

```
terraform {
  backend "s3" {
    bucket = "${var.project_name}-terraform-state"
    key    = "pipeline/terraform.tfstate"
    region = "us-west-2"
    encrypt = true
  }
}
```

3. **[Credenciales AWS](/blog/aws-curso-certificado-guia-basica/)**

Define las credenciales de AWS usando variables de entorno o configura AWS Single Sign-On (SSO). Para entornos de producción, es recomendable usar roles IAM con credenciales temporales para mayor seguridad [[1]](https://aws.plainenglish.io/how-to-set-up-aws-codepipeline-using-terraform-code-4a732364212).

## Arquitectura del Pipeline {id="arquitectura-del-pipeline"}

Después de configurar el entorno, diseñamos una arquitectura que combina servicios de AWS con [flujos de trabajo de Terraform](/blog/como-crear-infraestructura-como-codigo-en-aws-con-terraform/).

### Componentes Principales {id="componentes-principales"}

La arquitectura se basa en servicios de AWS que trabajan en conjunto con Terraform:

| Componente | Función Principal | Relación con Terraform |
| --- | --- | --- |
| **AWS CodePipeline** | Orquestador del pipeline | Coordina la ejecución de comandos de Terraform |
| **AWS CodeCommit** | Repositorio de código | Almacena y versiona archivos `.tf` |
| **AWS CodeBuild** | Motor de ejecución de builds | Ejecuta `terraform validate`, `plan` y `apply` |

### Etapas del Pipeline {id="etapas-del-pipeline"}

El pipeline está organizado en pasos secuenciales que aseguran calidad y control en los despliegues:

- **Origen**: El pipeline se activa automáticamente cuando hay cambios en la rama principal del repositorio.
- **Validación**: En esta etapa, CodeBuild ejecuta:
  - `terraform validate`
  - `terraform fmt -check`
- **Planificación**: Genera un plan de ejecución utilizando `terraform plan`.
- **Aprobación**: Paso crucial para entornos de producción, que requiere una aprobación manual antes de proceder.
- **Aplicación**: Aplica los cambios con el comando `terraform apply --auto-approve`.

Esta estructura establece los fundamentos necesarios para la implementación detallada que se desarrollará en la próxima sección.

## Construcción del Pipeline {id="construccion-del-pipeline"}

Después de definir la arquitectura, el siguiente paso es implementar el pipeline utilizando recursos de Terraform.

### Despliegue de Recursos {id="despliegue-de-recursos"}

El recurso principal del pipeline, CodePipeline, se configura con Terraform de la siguiente manera:

```
resource "aws_codepipeline" "pipeline" {
  name     = "terraform-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.artifact_store.bucket
    type     = "S3"

    encryption_key {
      id   = aws_kms_key.artifact_key.arn
      type = "KMS"
    }
  }
}
```

Este recurso se complementa con las etapas detalladas en la arquitectura previamente definida.

### Configuración de Etapas {id="configuracion-de-etapas"}

Cada etapa del pipeline utiliza un archivo *buildspec* para definir los comandos necesarios. Aquí tienes un ejemplo:

```
version: 0.2

phases:
  pre_build:
    commands:
      - wget https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip
      - unzip terraform_1.0.0_linux_amd64.zip
      - mv terraform /usr/local/bin/
  build:
    commands:
      - terraform init
      - terraform validate
```

Este archivo asegura que las herramientas necesarias estén disponibles antes de ejecutar las validaciones y otros procesos de construcción.

### Implementación de Seguridad {id="implementacion-de-seguridad"}

La seguridad del pipeline se gestiona mediante encriptación con KMS y políticas IAM específicas. Aquí tienes un ejemplo de configuración:

```
resource "aws_kms_key" "artifact_key" {
  description             = "Clave KMS para artefactos del pipeline"
  deletion_window_in_days = 10
  enable_key_rotation     = true
}

resource "aws_iam_role_policy" "codepipeline_kms_policy" {
  role = aws_iam_role.codepipeline_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "kms:Decrypt",
          "kms:DescribeKey",
          "kms:Encrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*"
        ]
        Resource = aws_kms_key.artifact_key.arn
      }
    ]
  })
}
```

Estas configuraciones refuerzan el principio de privilegios mínimos, asegurando que el pipeline solo tenga acceso a los recursos necesarios para su operación. Además, la rotación automática de claves KMS agrega una capa adicional de seguridad.

## Pruebas del Pipeline {id="pruebas-del-pipeline"}

Después de configurar la infraestructura del pipeline, realizamos pruebas automatizadas en tres niveles para asegurar su correcto funcionamiento.

### Validación de Código {id="validacion-de-codigo"}

Usamos herramientas como **[TFLint](https://github.com/terraform-linters/tflint)** (para análisis de Terraform) y **[Checkov](https://www.checkov.io/)** (para seguridad). Aquí tienes un ejemplo de configuración en YAML:

```
version: 0.2
phases:
  install:
    commands:
      - curl -s https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash
      - pip install checkov
  build:
    commands:
      - tflint --format=compact
      - checkov -d . --framework terraform --output cli
```

Además, personalizamos reglas específicas en el archivo `.tflint.hcl` para ajustar las validaciones a nuestras necesidades:

```
plugin "aws" {
  enabled = true
  version = "0.21.1"
  source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

rule "aws_instance_invalid_type" {
  enabled = true
}
```

### Verificación del Despliegue {id="verificacion-del-despliegue"}

Para validar la infraestructura implementada, integramos pruebas que abarcan tres áreas clave:

| Nivel de Prueba | Herramienta | Propósito |
| --- | --- | --- |
| Infraestructura | [AWS Config](https://docs.aws.amazon.com/config/) Rules | Revisión de conformidad y configuración |
| Funcional | Scripts de prueba | Validación de operaciones básicas |
| Monitoreo | CloudWatch Alarms | Seguimiento de métricas importantes |

En el pipeline, incluimos scripts que automatizan esta verificación:

```
post_build: # Verificación automatizada
  commands:
    - python scripts/verify_infrastructure.py
    - aws cloudwatch put-metric-alarm --alarm-name PipelineHealth --metric-name DeploymentStatus --namespace AWS/CodePipeline --statistic Average --period 300 --threshold 1 --comparison-operator GreaterThanThreshold
```

Si ocurre un fallo durante el despliegue, ejecutamos un rollback automático:

```
on_failure:
  commands:
    - terraform destroy -auto-approve -var-file="rollback.tfvars"
    - aws sns publish --topic-arn ${SNS_TOPIC} --message "Despliegue fallido - Rollback ejecutado"
```

Este enfoque combina validaciones de código y pruebas de despliegue, garantizando que cada implementación cumpla con los estándares de calidad y seguridad necesarios. Esto reduce el riesgo de problemas en producción y refuerza el control de calidad en el pipeline CI/CD.

## Configuración Avanzada {id="configuracion-avanzada"}

En proyectos que necesitan operar en múltiples entornos, es clave implementar ajustes específicos para garantizar escalabilidad y seguridad.

### Configuración Multi-Cuenta {id="configuracion-multi-cuenta"}

Gestionar múltiples cuentas en AWS requiere una arquitectura bien definida. Un elemento esencial es un bucket S3 compartido para almacenar el estado de Terraform de manera centralizada.

Para manejar despliegues entre cuentas, se utilizan roles IAM diseñados bajo el principio de privilegios mínimos:

- **Cuenta de Desarrollo**: Rol `TerraformDev` (para despliegues en el entorno de desarrollo).
- **Cuenta de Pruebas**: Rol `TerraformTest` (para validaciones en staging).
- **Cuenta de Producción**: Rol `TerraformProd` (para implementaciones en producción).

La configuración del proveedor AWS para cada cuenta se define de esta manera:

```
provider "aws" {
  region = "us-west-2"
  assume_role {
    role_arn = "arn:aws:iam::TARGET_ACCOUNT_ID:role/RolDespliegue"
  }
}
```

### Desarrollo de Módulos {id="desarrollo-de-modulos"}

Los módulos reutilizables son clave para mantener el código organizado y fácil de gestionar. Aquí hay un ejemplo de cómo estructurar módulos para componentes comunes en un pipeline:

```
module "source_pipeline" {
  source = "./modules/pipeline_source"
  repository_name = var.repo_name
  branch_name = var.branch_name
}

module "build_project" {
  source = "./modules/build"
  project_name = var.project_name
  build_spec = var.build_spec
}
```

Para manejar secretos y configuraciones sensibles, se utiliza AWS Secrets Manager, lo que permite centralizar el acceso a credenciales y tokens necesarios para el pipeline.

Además, se habilitan [AWS CloudTrail](https://docs.aws.amazon.com/cloudtrail/) y AWS Config para auditoría y monitoreo centralizados. Estas herramientas complementan las políticas de cifrado con KMS y las configuraciones IAM ya implementadas, asegurando un entorno seguro y preparado para manejar la complejidad de múltiples entornos.

## Resumen {id="resumen"}

Configurar pipelines CI/CD con Terraform y AWS CodePipeline simplifica y automatiza los procesos de despliegue. Este tutorial práctico mostró cómo llevarlo a cabo de manera eficiente.

### Puntos Clave {id="puntos-clave"}

Integrar Terraform con AWS CodePipeline aporta beneficios claros: automatización confiable usando IaC, mayor seguridad con herramientas como KMS e IAM, y la posibilidad de escalar fácilmente gracias a módulos reutilizables.

**Automatización y Consistencia**

- Definir infraestructura como código permite un control de versiones preciso.
- Los [despliegues automatizados](/blog/aws-opsworks-automatiza-despliegues-con-chef/) agilizan el proceso, como se destacó en las etapas de validación y aplicación.

**Seguridad y Cumplimiento**

- Artefactos cifrados con AWS KMS.
- Supervisión centralizada mediante AWS CloudTrail y Config.

**Escalabilidad**

- Uso de módulos reutilizables para componentes comunes.

Consulta más guías prácticas en [Dónde Aprendo AWS](/).

Para mantener tu pipeline funcionando correctamente, recuerda realizar revisiones de configuración (sección 2.2), actualizar dependencias (sección 4.2) y seguir [prácticas de seguridad](/blog/mejores-practicas-de-seguridad-en-aws/) (sección 4.3). Si quieres implementar este flujo en tus proyectos, revisa las configuraciones detalladas en las secciones anteriores y la guía práctica del FAQ.

## FAQs {id="faqs"}

### ¿Cómo configurar [AWS CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) usando código Terraform? {id="como-configurar-aws-codepipeline-usando-codigo-terraform"}

![AWS CodePipeline](/assets/blog/7aaedc74a537945a64cbb01615b6aa21c80dc70991f6f69db59e7cbf15603685.jpg)

La configuración básica sigue los pasos descritos en las secciones anteriores. Este proceso implica coordinar tres elementos clave mencionados en la arquitectura (sección 3):

- **Repositorio de código**
- **Proyecto de construcción**
- **Definición del pipeline**

El enfoque principal se divide en dos fases:

1. **Definir los Componentes Principales**
   - Configurar el origen del código de acuerdo con la arquitectura establecida.
   - Establecer los parámetros necesarios para la construcción.
   - Implementar políticas de seguridad según lo indicado en la sección 4.3.
2. **Integrar el Pipeline**
   Aquí tienes un ejemplo de cómo se podría definir un pipeline básico usando Terraform:

   ```
   resource "aws_codepipeline" "pipeline" {
     name     = "pipeline-aplicacion"
     role_arn = aws_iam_role.rol_pipeline.arn

     artifact_store {
       location = aws_s3_bucket.artefactos.bucket
       type     = "S3"
     }

     stage {
       name = "Source"
       action {
         name             = "Source"
         category         = "Source"
         owner            = "AWS"
         provider         = "CodeCommit"
         version          = "1"
         output_artifacts = ["codigo_fuente"]
         configuration = {
           RepositoryName = aws_codecommit_repository.repositorio.repository_name
           BranchName     = "main"
         }
       }
     }
   }
   ```

Es importante complementar estos pasos con las políticas de seguridad detalladas en la sección "Implementación de Seguridad". En implementaciones más complejas, se recomienda usar módulos (sección 6.2) y definir políticas IAM estrictas (sección 2.2) [[1]](https://aws.plainenglish.io/how-to-set-up-aws-codepipeline-using-terraform-code-4a732364212)[[2]](https://docs.aws.amazon.com/es_es/prescriptive-guidance/latest/patterns/create-a-ci-cd-pipeline-to-validate-terraform-configurations-by-using-aws-codepipeline.html).

## Publicaciones de blog relacionadas

- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Cómo crear Infraestructura como Código en AWS con Terraform](/blog/como-crear-infraestructura-como-codigo-en-aws-con-terraform/)
- [Cómo crear Infraestructura como Código en AWS con AWS CloudFormation](/blog/como-crear-infraestructura-como-codigo-en-aws-con-aws-cloudformation/)
- [Cómo integrar Terraform con CI/CD en AWS](/blog/como-integrar-terraform-con-cicd-en-aws/)
