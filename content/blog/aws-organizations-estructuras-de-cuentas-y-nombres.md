+++
url = "/blog/aws-organizations-estructuras-de-cuentas-y-nombres/"
title = "AWS Organizations: Estructuras de cuentas y nombres"
description = "Aprende a gestionar eficientemente cuentas en AWS Organizations mediante una estructura clara y un sistema de nombres estandarizado."
date = "2025-02-27T04:44:08.163000+00:00"
lastmod = "2025-03-06"
image = "/assets/blog/0bc804415b6cb6339123371f7d156fd8cc60f8d7e9353cba549af2281b6c72e6.jpg"
archive_order = 19

[[related]]
title = "Estructuras multi-cuenta AWS para escalar"
url = "/blog/estructuras-multi-cuenta-aws-para-escalar/"
image = "/assets/blog/0e9e4bdd57782b78da6d878efbe5f1f65b5cbee3628a0bdcfa0f71d578ed57d4.jpg"

[[related]]
title = "Acuerdos de Nivel de Servicio AWS: Guía Básica"
url = "/blog/acuerdos-de-nivel-de-servicio-aws-guia-basica/"
image = "/assets/blog/a1b4827aff914f24a4598eccbc0fb3157821b301049deb06978566880546934b.jpg"

[[related]]
title = "AWS curso certificado: guía básica"
url = "/blog/aws-curso-certificado-guia-basica/"
image = "/assets/blog/35e338eebb5988d204344c86c06b5b630404e2a03d7cedec5bcb0d8e0ba866e2.jpg"
+++

**[AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)** es una herramienta clave para gestionar múltiples cuentas de AWS desde un único lugar. Ofrece control centralizado sobre seguridad, costes y administración, ideal para empresas que necesitan escalar en la nube. Aquí tienes los puntos principales que debes saber para estructurar y nombrar tus cuentas de forma eficiente:

- **Gestión centralizada**: Organiza cuentas en Unidades Organizativas (OUs) y aplica políticas globales.
- **Control de seguridad**: Usa Service Control Policies (SCPs) para limitar permisos y proteger recursos.
- **Facturación unificada**: Consolida los gastos de todas las cuentas bajo un único método de pago.
- **Nombres estandarizados**: Define un esquema uniforme que incluya propósito, entorno y aplicación para identificar cuentas fácilmente.
- **Etiquetado eficiente**: Aplica etiquetas clave-valor para organizar recursos y controlar costes.

**¿Por qué es importante?** Una estructura bien diseñada y un sistema de nombres claro facilitan la administración, mejoran la seguridad y optimizan los costes en tu organización de AWS.

## Estructuración de cuentas {id="estructuracion-de-cuentas"}

Con los fundamentos de AWS Organizations definidos, es hora de configurar estructuras de cuentas que permitan una gestión eficiente, mejor seguridad y control de costes.

### Diseño de la jerarquía de cuentas {id="diseno-de-la-jerarquia-de-cuentas"}

La jerarquía de cuentas debe basarse en funcionalidad y control. Esto asegura una base sólida que permita escalar y adaptarse a nuevas necesidades.

Tipos de cuentas recomendados:

- **Cuenta raíz**: Exclusiva para la gestión de la organización.
- **Cuentas de soporte**: Para seguridad, redes, servicios compartidos, registros y copias de seguridad.
- **Cuentas de workload**: Organizadas por ambiente (desarrollo, pruebas, producción).

Esta segmentación facilita la aplicación de políticas y el cumplimiento de normas establecidas.

### Trabajo con Unidades Organizativas {id="trabajo-con-unidades-organizativas"}

Una vez diseñada la jerarquía, utiliza Unidades Organizativas (OUs) para agrupar cuentas y aplicar políticas de forma centralizada. Las OUs permiten organizar cuentas según controles y funcionalidades comunes.

Estructura básica sugerida:

| Nivel de OU | Propósito | Características |
| --- | --- | --- |
| Fundacional | Infraestructura y seguridad | Control centralizado de políticas esenciales |
| Sandbox | Desarrollo y experimentación | Permisos restringidos, presupuestos limitados |
| Workloads | Cargas de trabajo productivas | Separación por ambiente y función |

> "Las cuentas de AWS son límites naturales para permisos, seguridad, costes y cargas de trabajo."

**Consejos para optimizar las OUs:**

1. **Aplicación de políticas**: Aplica políticas a nivel de OU en lugar de hacerlo cuenta por cuenta.
2. **Agrupación estratégica**: Coloca cuentas con necesidades similares bajo una misma OU.
3. **Pruebas de cambios**: Antes de aplicar cambios globales, prueba las políticas en entornos no productivos.

Una estructura bien planificada asegura un control efectivo sobre seguridad y costes, mientras simplifica la gestión del entorno empresarial.

## Estándares de Nombres para Cuentas {id="estandares-de-nombres-para-cuentas"}

Una vez definida la estructura de cuentas, es importante establecer convenciones de nombres claras para facilitar la administración y el control.

### Ventajas de usar nombres estandarizados {id="ventajas-de-usar-nombres-estandarizados"}

Definir un sistema uniforme para nombrar las cuentas de AWS ayuda a mantener un entorno más organizado y funcional. Un esquema de nombres bien pensado permite identificar rápidamente el propósito, entorno y función de cada cuenta. Algunas de las principales ventajas incluyen:

- **Identificación rápida**: Facilita reconocer el propósito y entorno de una cuenta al instante.
- **Gestión más sencilla**: Mejora la administración y el control de accesos.
- **Menos errores**: Disminuye las confusiones al asignar recursos.
- **Crecimiento ordenado**: Permite escalar manteniendo la coherencia.

Estos puntos son clave para crear un sistema de nombres efectivo y claro.

### Elementos clave en la estructura de nombres {id="elementos-clave-en-la-estructura-de-nombres"}

Siguiendo la segmentación de cuentas definida, la estructura de nombres debe reflejar la jerarquía organizativa y mantener un patrón uniforme. Se recomienda incluir los siguientes elementos:

| **Elemento** | **Descripción** | **Ejemplo** |
| --- | --- | --- |
| Propósito principal | Indica el propósito general de la cuenta | Workloads, Security |
| Identificador específico | Código del proyecto o aplicación | fooA, fooB |
| Entorno | Define el entorno (desarrollo, pruebas, prod.) | Dev, Test, Prod |

Además, la dirección de correo asociada debe seguir la misma lógica. Por ejemplo, una cuenta llamada "WorkloadsFooADev" podría usar el correo: `Workloads+fooA+dev@dominio.com`.

### Ejemplos prácticos de nomenclatura {id="ejemplos-practicos-de-nomenclatura"}

Con la estructura definida, aquí tienes ejemplos de cómo implementar nombres estandarizados. Para una empresa ficticia como "AnyCompany", se pueden usar etiquetas complementarias como:

- **anycompany:cost-center**: Para identificar el código del centro de costes.
- **anycompany:environment-type**: Para especificar si el entorno es de desarrollo, pruebas o producción.
- **anycompany:application-id**: Para asociar recursos con una aplicación concreta.

Es importante recordar que las etiquetas no pueden comenzar con "aws:", ya que este prefijo está reservado para AWS. Para mantener consistencia, usa minúsculas y separa las palabras con guiones en las etiquetas.

En el caso de [instancias EC2](/blog/tipos-y-tamanos-de-instancias-ec2-guia-completa/), aplica un formato como:  
`ec2-RegionCode-AvailabilityZoneCode-EnvironmentCode-ApplicationCode`.  
Este esquema asegura que los recursos sean fáciles de identificar y estén alineados con la estructura organizativa general.

## Guía de Etiquetado de Cuentas {id="guia-de-etiquetado-de-cuentas"}

El [etiquetado en AWS Organizations](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/) es clave para gestionar recursos y controlar costes. Aquí te mostramos cómo establecer una estrategia de etiquetado clara y funcional.

### Reglas de Estructura para Etiquetas {id="reglas-de-estructura-para-etiquetas"}

Las etiquetas deben seguir un patrón uniforme que facilite la organización y el seguimiento de los recursos. Estas etiquetas funcionan como pares clave-valor y deben respetar estas reglas básicas:

| Componente | Regla | Ejemplo |
| --- | --- | --- |
| Clave | Distingue entre mayúsculas y minúsculas | CostCenter |
| Valor | Opcional y también distingue entre mayúsculas y minúsculas | EMEA-ES-PROD |
| Prefijo | "aws:" está reservado exclusivamente para AWS | user:department |

Para mantener un etiquetado eficaz:

- Crea una taxonomía clara que abarque todas las unidades de negocio.
- Usa un formato uniforme para valores similares.
- Evita incluir información sensible o confidencial en las etiquetas.

### Etiquetas para Facturación y Acceso {id="etiquetas-para-facturacion-y-acceso"}

Una vez definida la estructura de las etiquetas, es esencial aplicarlas correctamente para un mejor control en facturación y acceso. AWS clasifica las etiquetas en dos categorías principales:

| Tipo de Etiqueta | Descripción | Uso Recomendado |
| --- | --- | --- |
| Generadas por AWS | Llevan el prefijo "aws:" | Seguimiento automático de recursos |
| Definidas por usuario | Llevan el prefijo "user" | Organización personalizada |

Para gestionar los costes de manera eficiente, sigue estos pasos:

- **Activa las etiquetas de asignación**: Configúralas en la consola de [Facturación y Administración de Costes](/blog/gestion-de-facturacion-de-aws-guia-completa/) para vincular recursos con centros de coste.
- **Utiliza [AWS Config](https://docs.aws.amazon.com/config/)**: Aplica reglas para garantizar que los recursos cumplan con las etiquetas requeridas.
- **Emplea Tag Editor**: Encuentra y corrige recursos que no tengan etiquetas asignadas.

Por ejemplo, puedes configurar políticas de etiquetas para evitar gastos innecesarios. Si alguien intenta crear una [instancia EC2](/blog/mejores-practicas-para-amazon-ec2/) sin incluir la etiqueta obligatoria "CostCenter", el sistema bloqueará la operación. Esto asegura que todos los recursos estén correctamente clasificados desde el principio.

Ten en cuenta que las etiquetas pueden tardar hasta 24 horas en reflejarse en la consola de Facturación y Administración de Costes. Por eso, es importante planificar con suficiente tiempo la implementación de nuevas etiquetas.

Aplicar estas prácticas de etiquetado de manera adecuada sentará una base sólida para gestionar los recursos de forma eficiente en futuras etapas de administración de cuentas.

## Pasos de Gestión de Cuentas {id="pasos-de-gestion-de-cuentas"}

La gestión de cuentas implica supervisar su ciclo de vida, desde la creación inicial hasta su eliminación, garantizando un control adecuado y evitando gastos innecesarios.

### Configuración de Nuevas Cuentas {id="configuracion-de-nuevas-cuentas"}

Siga estos pasos para configurar una cuenta correctamente:

- La información de contacto se copia automáticamente desde la cuenta de administración principal.
- Se crea el rol IAM **"OrganizationAccountAccessRole"** en la cuenta miembro para facilitar el control centralizado.
- Se genera el rol **"AWSServiceRoleForOrganizations"** para integrar servicios de AWS de manera eficiente.

**Aspectos clave a tener en cuenta**:

- Las cuentas solo pueden crearse en la raíz de la organización.
- Es obligatorio usar un correo electrónico único que no esté vinculado a otras cuentas de AWS.
- Durante la creación, puede añadir hasta 50 etiquetas para una mejor organización.

Después de configurar una cuenta, es igualmente importante gestionar su desactivación cuando ya no sea necesaria.

### Proceso de Limpieza de Cuentas {id="proceso-de-limpieza-de-cuentas"}

Para evitar costos innecesarios, asegúrese de realizar una limpieza adecuada de las cuentas que ya no se utilizan. Este proceso consta de tres fases principales:

1\. **Preparación previa**

Antes de eliminar una cuenta, confirme que tiene toda la información y configuraciones necesarias para operar de forma independiente. Esto incluye el plan de soporte, datos de contacto actualizados y un método de pago válido.

2\. **Gestión de recursos activos**

Una vez revisada la información, elimine los recursos activos utilizando la consola de **AWS Management** para cada servicio. Para identificar las regiones con servicios activos, consulte la consola de **Facturación y Administración de Costes**.

3\. **Proceso de eliminación**

Cuando una cuenta se elimina, entra en estado "suspendido" durante 90 días. Pasado este período, se elimina de forma permanente, perdiendo acceso a datos históricos de costes, etiquetas, políticas organizacionales y acuerdos.

Para entornos de desarrollo y pruebas, puede usar **[AWS-NUKE](https://github.com/ekristen/aws-nuke)** para automatizar la limpieza de recursos. Asegúrese de ejecutar siempre el modo *DRY RUN* antes de proceder, para evitar eliminaciones accidentales.

## Resumen y Recursos {id="resumen-y-recursos"}

### Revisión de Puntos Principales {id="revision-de-puntos-principales"}

Configurar AWS Organizations requiere entender cómo estructurar cuentas y establecer convenciones de nombres adecuadas. Algunos puntos clave incluyen:

- **Gestión centralizada**: Administrar las cuentas de AWS desde un solo lugar garantiza operaciones consistentes y una separación eficiente de las cargas de trabajo según sus objetivos.
- **Aislamiento de entornos**: Usar Unidades Organizativas (OUs) específicas para cada entorno mejora la seguridad y el control.

Para optimizar la estructura, ten en cuenta lo siguiente:

| Aspecto | Ventaja Principal | Implementación Sugerida |
| --- | --- | --- |
| **Seguridad** | Separación clara entre entornos | Uso de OUs específicas |
| **Facturación** | Mayor visibilidad de costos | Etiquetas unificadas |
| **Gestión** | Administración más sencilla | Convenciones de nombres estándar |

### Recursos Adicionales {id="recursos-adicionales"}

Si quieres profundizar más en estos temas, aquí tienes algunas fuentes útiles:

1. **Documentación Oficial**  
   La [guía oficial de AWS Organizations](/blog/aws-curso-certificado-guia-basica/) ofrece información detallada sobre configuración y administración.
2. **Recursos en Español**  
   Visita [Dónde Aprendo AWS](/) para explicaciones completas sobre AWS Organizations en español.
3. **[Mejores Prácticas](/blog/mejores-practicas-aws-para-devops/)**  
   Explora el artículo "Best Practices for Organizational Units with AWS Organizations" en el Centro de Conocimiento de AWS.

**Herramientas Clave**:

- **AWS CLI Reference**: Ideal para gestionar AWS mediante comandos.
- **AWS Account Management Reference Guide**: Una guía completa para la administración de cuentas.
- **[AWS Skill Builder](https://aws.amazon.com/training/digital/)**: Plataforma de formación digital para mejorar tus habilidades.

## Publicaciones de blog relacionadas

- [Gestionando Múltiples Cuentas de AWS con AWS Organizations](/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Políticas de Confianza AWS: Acceso Entre Cuentas](/blog/politicas-de-confianza-aws-acceso-entre-cuentas/)
- [Checklist para automatizar cumplimiento en AWS](/blog/checklist-para-automatizar-cumplimiento-en-aws/)
