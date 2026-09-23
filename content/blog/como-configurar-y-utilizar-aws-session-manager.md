+++
url = "/blog/como-configurar-y-utilizar-aws-session-manager/"
title = "Como Configurar y Utilizar AWS Session Manager"
description = "Descubre cómo configurar y utilizar AWS Session Manager para mejorar la seguridad y eficiencia en el acceso a tus servidores EC2. Aprende sobre sus características, beneficios y mejores prácticas."
date = "2024-03-18T23:43:17.278000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/037793a796bc8f08a1cce7d044e7198a5b801e3f20e94972ab09ff8d5046813b.jpg"
archive_order = 124

[[related]]
title = "Configurar AWS para Comunicación en Equipo: 7 Pasos"
url = "/blog/configurar-aws-para-comunicacion-en-equipo-7-pasos/"
image = "/assets/blog/f92b3e352f4a3a9565a17d1a7617ce743fb76c508dee987839929558f2473c2e.jpg"

[[related]]
title = "Guía de AWS Wavelength: Zonas y Despliegue"
url = "/blog/guia-de-aws-wavelength-zonas-y-despliegue/"
image = "/assets/blog/e73412d95c38ad88b6dc619af40ce85a496d7a80473dd455839f31806bd2e884.jpg"

[[related]]
title = "Introducción a la Inteligencia Artificial en AWS"
url = "/blog/introduccion-a-la-inteligencia-artificial-en-aws/"
image = "/assets/blog/740fd46916e44bd2c61ce62cbc1f21ee1aca1f2dbf8a9c4409ca8bde107c24d4.jpg"
+++

AWS Session Manager es una herramienta poderosa dentro de AWS Systems Manager que simplifica la forma en que te conectas y gestionas tus servidores EC2 y otros dispositivos, sin la necesidad de SSH o claves. Aquí te muestro cómo configurarlo y usarlo para mejorar la seguridad y eficiencia en el acceso a tus sistemas:

- **Simplifica el acceso a servidores**: Sin necesidad de SSH o claves.
- **Mejora la seguridad**: A través de AWS IAM, cifrado y registro detallado de sesiones.
- **Fácil de configurar y usar**: Con pasos claros para la configuración inicial y conexión posterior.
- **Versátil**: Soporta Linux y Windows, y permite comandos interactivos y reenvío de puertos.

Para empezar, asegúrate de tener una cuenta de AWS, permisos de IAM adecuados, y el SSM Agent instalado en tus instancias EC2. Luego, sigue los pasos detallados para la creación de roles de IAM, asociación de roles a instancias, y verificación de la configuración de VPC. Finalmente, explora las distintas formas de conexión, ya sea a través de la consola de AWS, AWS CLI, o incluso programando sesiones automáticas.

¿Listo para mejorar la gestión de tus servidores con AWS Session Manager? Comencemos.

### Características Principales {id="caracter%C3%ADsticas-principales"}

AWS Session Manager tiene varias características importantes:

- Funciona tanto para servidores Linux como Windows
- Puedes acceder usando la consola de AWS, la línea de comandos o SDKs
- Controla quién accede usando AWS Identity and Access Management (IAM)
- Tus datos están seguros porque todo se cifra
- Se integra con AWS PrivateLink
- Puedes ver y auditar quién accedió a qué servidor
- Permite ejecutar comandos de manera interactiva
- Puedes hacer Port Forwarding

### Beneficios {id="beneficios"}

Usar AWS Session Manager tiene muchas ventajas:

- Es más seguro porque no tienes que abrir puertos SSH al mundo
- Puedes llevar un registro de quién accede a tus servidores, lo cual es genial para auditorías
- Te ayuda a cumplir con regulaciones de seguridad
- Te ahorra tiempo en manejar claves y sistemas de acceso
- Facilita conectarte a tus servidores rápidamente, incluso si no tienen una IP pública

## Requisitos Previos Para Session Manager {id="requisitos-previos-para-session-manager"}

Para empezar a usar AWS Session Manager, hay algunas cosas que necesitas tener listas primero:

### Cuenta de AWS {id="cuenta-de-aws"}

Necesitas una cuenta en AWS. Esta cuenta te dará acceso a los servicios de EC2 y Systems Manager.

### Permisos de IAM {id="permisos-de-iam"}

Es importante que el usuario de AWS que va a usar Session Manager tenga los permisos necesarios. Esto incluye permisos para trabajar con EC2, Systems Manager y, si lo necesitas, también con S3 y CloudWatch Logs.

### Instalar AWS CLI (opcional) {id="instalar-aws-cli-(opcional)"}

Si quieres manejar Session Manager desde la línea de comandos, debes tener AWS CLI instalado en tu computadora.

### Habilitar SSM Agent {id="habilitar-ssm-agent"}

Para que Session Manager pueda conectarse a tus instancias EC2, estas deben tener el agente de SSM activo. Este agente ya viene instalado en muchas de las imágenes de máquina (AMIs) que ofrece AWS.

## Configuración de AWS Session Manager {id="configuraci%C3%B3n-de-aws-session-manager"}

### 1. Crear Rol de IAM {id="1.-crear-rol-de-iam"}

Para usar Session Manager, primero necesitas crear un rol de IAM con los permisos básicos. Este rol necesita la política `AmazonSSMManagedInstanceCore` para que SSM pueda hablar con tus instancias.

Para crear el rol:

- Entra a la consola de IAM
- Haz clic en "Roles" y después en "Crear rol"
- Elige "EC2" como el tipo de entidad confiable
- Busca y selecciona la política `AmazonSSMManagedInstanceCore`
- Ponle un nombre al rol, como "SSM-Role", y créalo

### 2. Instalar SSM Agent {id="2.-instalar-ssm-agent"}

El SSM Agent es necesario para que SSM y las instancias EC2 puedan comunicarse.

Para instalarlo:

- Checa si ya está instalado con `sudo systemctl status amazon-ssm-agent` en tu instancia
- Si no está, actualiza tu máquina e instala el agente de SSM
- Reinicia el agente con `sudo systemctl restart amazon-ssm-agent`

También puedes usar AMIs que ya tienen el agente instalado.

### 3. Asociar Rol de IAM a Instancias {id="3.-asociar-rol-de-iam-a-instancias"}

Ahora, tienes que vincular el rol de IAM que hiciste con las instancias que quieres manejar con Session Manager.

Para hacerlo:

- Ve a la consola de EC2 y elige tus instancias
- Haz clic derecho, ve a "Seguridad", luego "Modificar rol de IAM"
- Elige el rol de SSM que creaste
- Guarda los cambios

### 4. Verificar Configuración de VPC {id="4.-verificar-configuraci%C3%B3n-de-vpc"}

Session Manager necesita que ciertos puertos estén abiertos para funcionar bien:

- El puerto 443 debe estar abierto para el tráfico HTTPS de salida
- Si usas endpoints de VPC, asegúrate de tener un endpoint de SSM

Checa que los grupos de seguridad y NACLs de tus subnets permitan este tráfico.

### 5. Configuración Avanzada (opcional) {id="5.-configuraci%C3%B3n-avanzada-(opcional)"}

Algunas configuraciones extra que puedes hacer:

- Activar CloudWatch Logs para guardar registros de tus sesiones
- Usar cifrado SSL o KMS para proteger el contenido de las sesiones
- Configurar tiempos de espera para sesiones inactivas y la duración máxima de una sesión

## Conexión a Instancias con Session Manager {id="conexi%C3%B3n-a-instancias-con-session-manager"}

### Desde la Consola de AWS {id="desde-la-consola-de-aws"}

Para conectarte a una instancia EC2 usando la consola de AWS, sigue estos pasos:

- Ve a la consola de EC2 y elige la instancia a la cual te quieres conectar.
- Da clic en "Connect" (Conectar).
- Selecciona "Session Manager" como tu método de conexión.
- Haz clic en "Connect" (Conectar) nuevamente para empezar la sesión.

Una vez que estés conectado, podrás escribir y ejecutar comandos directamente en la instancia desde tu navegador.

### Desde AWS CLI {id="desde-aws-cli"}

Para [iniciar una sesión](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html) usando la línea de comandos, escribe el siguiente comando:

```
aws ssm start-session --target <instance-id>
```

Esto abrirá una ventana de terminal en la que puedes escribir comandos para interactuar con tu instancia.

### Reenvío de Puertos {id="reenv%C3%ADo-de-puertos"}

El reenvío de puertos te permite usar aplicaciones de tu instancia EC2 en tu propia computadora.

Para hacer esto:

- Indica el puerto de la aplicación remota con `--port`.
- Usa `--local-port` para decidir a través de qué puerto en tu computadora quieres acceder.

Por ejemplo:

```
aws ssm start-session --target i-01234567890 --port 3389 --local-port 3389
```

Esto conectará el puerto 3389 de tu instancia al puerto 3389 de tu computadora, permitiéndote acceder a la aplicación.

### Comandos Interactivos {id="comandos-interactivos"}

Para que SSM ejecute comandos automáticamente al iniciar una sesión, puedes:

- Crear un documento de SSM que ejecute el comando que quieras, como `ls -al`.
- Al conectarte, usa `--document-name` para especificar ese documento.

Así, cada vez que te conectes, verás automáticamente el resultado de `ls -al`.

### Programar Sesiones {id="programar-sesiones"}

Si necesitas que las sesiones se inicien solas en un horario específico, puedes:

- Usar Automation de SSM para crear una tarea que ejecute `start-session`.
- Programa esta tarea para que se ejecute cuando lo necesites.

Esto es útil para tareas de administración o mantenimiento que necesitas hacer regularmente.

## Seguridad y Cumplimiento {id="seguridad-y-cumplimiento"}

### AWS Identity and Access Management (IAM) {id="aws-identity-and-access-management-(iam)"}

Con Session Manager, puedes decidir quién puede hacer qué, gracias a las políticas de IAM. Esto te permite:

- Elegir quiénes pueden usar Session Manager
- Determinar a qué computadoras pueden acceder (como tus servidores EC2)
- Decidir si pueden ver, empezar o terminar sesiones
- Limitar los puertos o comandos que pueden usar

Esto te da un control muy específico sobre quién puede acceder a tus sistemas.

### Integración con AWS KMS {id="integraci%C3%B3n-con-aws-kms"}

Session Manager también te permite usar cifrado para proteger los datos que se envían durante las sesiones, usando algo llamado AWS Key Management Service (KMS).

Al activar esta opción, la comunicación entre tu computadora y tus servidores se cifra, lo que añade una capa extra de seguridad.

### Registro en CloudWatch Logs {id="registro-en-cloudwatch-logs"}

Una parte importante de mantener tus sistemas seguros es saber qué está pasando en ellos. Session Manager puede mandar un registro detallado de cada sesión a CloudWatch Logs. Esto incluye:

- El ID de la sesión
- Quién empezó la sesión
- A qué servidor se conectaron
- Cuándo empezó y terminó la sesión
- Qué comandos se usaron
- Los resultados de esos comandos

Es muy útil activar esta opción para poder revisar actividades pasadas y para cumplir con reglas de seguridad.

### Cumplimiento Normativo {id="cumplimiento-normativo"}

Usar Session Manager te ayuda a cumplir con varias normas y reglas de seguridad importantes, como HIPAA, PCI DSS, FedRAMP y SOC. Esto significa que al usar Session Manager estás ayudando a que tus sistemas sean más seguros y estén en línea con lo que piden estas normas.

## Solución de Problemas {id="soluci%C3%B3n-de-problemas"}

Cuando usas AWS Session Manager, a veces pueden surgir problemas. Aquí te explico cómo solucionar los más comunes:

### Error de Permisos de IAM {id="error-de-permisos-de-iam"}

Si te sale un error que dice que no tienes permiso para usar Session Manager, significa que necesitas ajustar los permisos de IAM.

Qué puedes hacer:

- Asegúrate de que el usuario de IAM tenga el permiso `AmazonSSMManagedInstanceCore`. Este permiso permite hacer cosas básicas con SSM.
- Puedes crear un permiso personalizado que incluya lo necesario para usar Session Manager, como `ssm:StartSession`, `ssm:TerminateSession`, etc., y dárselo al usuario.
- Si estás usando un rol para una instancia de EC2, verifica que este rol tenga los permisos para usar Session Manager. Puedes agregar el permiso `AmazonSSMManagedInstanceCore` o uno personalizado.
- Checa que no haya un permiso que esté bloqueando estos accesos. Los permisos de bloqueo son más fuertes que los de acceso.

### SSM Agent no Instalado {id="ssm-agent-no-instalado"}

Si te indica que SSM Agent no está en la instancia de EC2, necesitas instalar o activar el agente.

Qué puedes hacer:

- Revisa si tu instancia tiene una AMI que ya viene con SSM Agent. Muchas AMIs nuevas ya lo incluyen.
- Si no lo tiene, instala SSM Agent manualmente siguiendo las instrucciones para [Linux](https://docs.aws.amazon.com/es_es/systems-manager/latest/userguide/sysman-manual-agent-install.html) o [Windows](https://docs.aws.amazon.com/es_es/systems-manager/latest/userguide/sysman-install-win.html).
- Después de instalar, reinicia el servicio de SSM Agent con `sudo systemctl restart amazon-ssm-agent`.
- También puedes usar el documento de SSM `AWS-UpdateSSMAgent` para instalar o actualizar el agente de forma automática.

### Problemas de Conectividad {id="problemas-de-conectividad"}

Si el agente está bien pero no logras conectarte, puede ser un problema de red.

Qué puedes hacer:

- Asegúrate de que el puerto 443 (HTTPS) esté abierto en el grupo de seguridad y las ACLs de la instancia.
- Si usas un endpoint de VPC para SSM, verifica que la configuración de ruta sea la correcta.
- Checa que la instancia pueda conectar con los endpoints de SSM en Internet, o con el endpoint de VPC si usas uno.
- Si tienes un proxy, revisa que SSM Agent esté configurado correctamente para usarlo.

### Sesión Expirada {id="sesi%C3%B3n-expirada"}

Si tus sesiones se cierran muy rápido, puedes ajustar el tiempo antes de que expiren.

Qué puedes hacer:

- Usa el parámetro `SessionTimeout` cuando inicies una sesión para que dure más, solo para esa vez.
- En los documentos de SSM que usas para iniciar sesiones, pon un tiempo de espera más largo con `timeoutSeconds`.
- En las preferencias de Session Manager, aumenta el `SessionIdleTimeout` para que todas las sesiones duren más por defecto.

## Mejores Prácticas {id="mejores-pr%C3%A1cticas"}

Aquí tienes algunas recomendaciones para cuando uses AWS Session Manager:

### Usar Políticas IAM Detalladas {id="usar-pol%C3%ADticas-iam-detalladas"}

Es bueno darle a cada persona solo los permisos que realmente necesita para hacer su trabajo. Así, por ejemplo, si alguien solo necesita ver información pero no cambiar nada, solo debería tener permiso para ver. Esto ayuda a mantener todo más seguro.

### Cambiar las Claves Regularmente {id="cambiar-las-claves-regularmente"}

Es una buena idea cambiar las claves de acceso cada cierto tiempo, como cada tres meses. Esto ayuda a evitar problemas si alguien llega a conseguir una clave que no debería tener.

AWS puede ayudarte a cambiar estas claves automáticamente para que no se te olvide hacerlo.

### Mantener un Registro con CloudWatch {id="mantener-un-registro-con-cloudwatch"}

Es muy útil activar una opción que guarda un registro de quién se conecta a tus sistemas y qué hace. Esto se puede hacer con algo llamado Amazon CloudWatch Logs. Te permite ver fácilmente qué pasó y cuándo, lo cual es muy útil si necesitas revisar algo o si hay un problema de seguridad.

### Cifrar las Sesiones {id="cifrar-las-sesiones"}

Aunque AWS Session Manager ya protege tus datos cuando los envías, puedes hacerlo aún más seguro usando un servicio llamado AWS KMS. Esto es especialmente importante si trabajas con información muy delicada. Esto añade una protección extra para asegurarte de que tus datos estén seguros mientras los envías.

## Conclusión {id="conclusi%C3%B3n"}

### Puntos Clave {id="puntos-clave"}

- AWS Session Manager te permite entrar a tus servidores de manera segura y fácil.
- Es una alternativa a métodos más complicados como usar bastiones o SSH.
- Te ayuda a tener todo bajo control, revisar quién entra a tus sistemas y mantener todo seguro.
- Permite dar acceso cuando se necesita sin tener que dar claves que no cambian.
- Ayuda a que todo esté más seguro y cumpla con las reglas de seguridad.

AWS Session Manager es una herramienta práctica para manejar servidores EC2 y otros dispositivos de forma segura. Al no necesitar SSH, claves, ni bastiones, hace mucho más fácil el acceso a tus sistemas, a la vez que aumenta la seguridad.

Lo bueno es que con AWS Session Manager puedes controlar quién entra a tus sistemas gracias a las políticas de IAM. Esto significa que puedes dar acceso solo por un rato, en vez de dar claves fijas.

También, puedes llevar un registro de todo lo que pasa, quién entra y qué hace, guardando esta información en CloudWatch Logs para verla después.

Además, el uso de cifrado SSL y la opción de activar AWS KMS ponen una capa extra de seguridad sobre la información que se comparte en las sesiones.

En pocas palabras, AWS Session Manager es una forma excelente de entrar a tus servidores EC2 y otros sistemas de manera sencilla pero muy segura. Usarlo puede mejorar mucho cómo cuidas la seguridad en tu organización.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué es Session Manager de AWS? {id="%C2%BFqu%C3%A9-es-session-manager-de-aws%3F"}

AWS Session Manager es una herramienta de AWS Systems Manager que te ayuda a manejar tus servidores o instancias EC2 de forma segura. Te permite conectarte a tus servidores para ejecutar comandos o revisar aplicaciones sin tener que lidiar con temas de seguridad como abrir puertos o manejar muchas contraseñas. Es una manera práctica y segura de acceder a tus servidores.

### ¿Cómo iniciar sesión en AWS CLI? {id="%C2%BFc%C3%B3mo-iniciar-sesi%C3%B3n-en-aws-cli%3F"}

Para usar AWS CLI (una herramienta que te permite controlar AWS desde la línea de comandos), sigue estos pasos:

- Primero, asegúrate de tener AWS CLI instalado en tu computadora.
- Abre la terminal y escribe `aws configure`. Esto te permitirá ingresar tus credenciales, como tu ID de acceso y clave secreta, y también seleccionar tu región.
- Después de configurar tus credenciales, puedes empezar a usar comandos de AWS CLI escribiendo `aws` seguido del servicio y el comando que quieras usar. Por ejemplo, `aws ssm start-session` para iniciar una sesión con AWS Session Manager.
- Si necesitas usar diferentes cuentas o configuraciones, puedes crear perfiles adicionales con `aws configure --profile nombre_del_perfil` y cambiar entre ellos según necesites.

Con estos pasos, puedes manejar tus servicios de AWS directamente desde la línea de comandos de una manera más eficiente.

## Related posts

- [Mejores Prácticas Para Amazon EC2](/blog/mejores-practicas-para-amazon-ec2/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Seguridad en AWS: Servicios Esenciales](/blog/aws-seguridad-servicios-esenciales/)
- [AWS Fundamentos: Guía de Inicio Rápido](/blog/aws-fundamentos-guia-de-inicio-rapido/)
