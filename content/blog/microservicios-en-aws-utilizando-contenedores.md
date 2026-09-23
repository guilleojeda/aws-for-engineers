+++
url = "/blog/microservicios-en-aws-utilizando-contenedores/"
title = "Microservicios en AWS Utilizando Contenedores"
description = "Descubre cómo desplegar aplicaciones de manera eficiente, flexible y escalable con microservicios en AWS utilizando contenedores. Aprende sobre ECS, EKS, Fargate y más."
date = "2024-03-19T00:23:23.974000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/bf2d7e4c78ec347430ffd8446a0053b8647faf03aece9706590a76bf46bde08f.jpg"
archive_order = 122

[[related]]
title = "Control Plane vs Data Plane en AWS App Mesh"
url = "/blog/control-plane-vs-data-plane-en-aws-app-mesh/"
image = "/assets/blog/97233420c8e51dbede977f2cfcea0b0222f57b09e12964e01a9064f15e8680df.jpg"

[[related]]
title = "Mejores Prácticas Para Amazon ECS"
url = "/blog/mejores-practicas-para-amazon-ecs/"
image = "/assets/blog/826c9a11a84720138c6c6ed39379158f2b584481c7c25bf832867ef749430510.jpg"

[[related]]
title = "AWS Seguridad: Mejores Prácticas"
url = "/blog/aws-seguridad-mejores-practicas/"
image = "/assets/blog/58bea5d60c133d57e4a0bdbf31f2667ab339ea25ffae689b54e830ef790cc553.jpg"
+++

En este artículo, te guiamos por el fascinante mundo de los [**microservicios en AWS**](https://d1.awsstatic.com/whitepapers/microservices-on-aws.pdf) **utilizando contenedores**. Descubrirás cómo desplegar aplicaciones de manera eficiente, flexible y escalable. Aprenderás sobre:

- **La definición y ventajas de los microservicios**.
- **Por qué los contenedores son esenciales en este enfoque**.
- **Herramientas de AWS** como ECS, EKS, y Fargate para manejar contenedores.
- **Pasos para configurar tu entorno en AWS**, crear un repositorio ECR, y desplegar tus microservicios.
- **Configuración y despliegue en EKS**.
- **Cómo Fargate simplifica el manejo de contenedores**.
- **Tácticas para validar y monitorear tus implementaciones** con CloudWatch.

Utilizaremos un lenguaje directo y claro para que puedas entender cómo montar tu arquitectura de microservicios en AWS, aprovechando las ventajas de los contenedores para lograr aplicaciones más robustas, escalables y fáciles de mantener.

### ¿Por qué utilizar contenedores? {id="%C2%BFpor-qu%C3%A9-utilizar-contenedores%3F"}

Los contenedores son como cajas que guardan todo lo que un microservicio necesita para funcionar, como el código y las herramientas. Esto hace que sea fácil mover y arrancar el microservicio en cualquier lugar, ya sea en tu computadora o en la nube.

[AWS](https://aws.amazon.com/) tiene herramientas muy útiles para manejar estas cajas, o contenedores, a gran escala:

- [Amazon Elastic Container Service (ECS)](https://aws.amazon.com/ecs/): Ayuda a organizar y controlar muchos contenedores juntos.
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/): Es para manejar grupos de contenedores usando algo llamado Kubernetes.
- [AWS Fargate](https://aws.amazon.com/fargate/): Te permite correr contenedores sin tener que preocuparte por los servidores donde se ejecutan.

Con estas herramientas, AWS te ayuda a usar microservicios en contenedores de manera fácil, sin tener que pensar en los detalles técnicos de cómo se hacen las cosas por debajo.

## Preparación del entorno en AWS {id="preparaci%C3%B3n-del-entorno-en-aws"}

### Configuración de AWS CLI {id="configuraci%C3%B3n-de-aws-cli"}

Para usar los servicios de AWS con la línea de comandos, primero necesitamos instalar y configurar AWS Command Line Interface (CLI). Aquí te explico cómo hacerlo de manera sencilla:

- Instala AWS CLI siguiendo las [instrucciones oficiales](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) para tu sistema operativo.
- Configura AWS CLI tecleando `aws configure` en la línea de comandos. Te pedirá:
- **AWS Access Key ID**: Es tu llave de acceso a AWS.
- **AWS Secret Access Key**: Es tu llave secreta de AWS.
- **Default region name**: La región de AWS que usarás por defecto, como `us-east-1`.
- **Default output format**: El formato en que quieres ver los resultados, puede ser `json`, `yaml`, etc.

Con estos pasos, podrás usar comandos de AWS CLI para manejar tus servicios en AWS.

### Creación de un repositorio ECR {id="creaci%C3%B3n-de-un-repositorio-ecr"}

Para guardar y manejar las imágenes de [Docker](https://www.docker.com/) de nuestros microservicios, usaremos Elastic Container Registry (ECR). Aquí te muestro cómo crear un repositorio:

- Entra a la consola de AWS y busca el servicio ECR.
- Haz clic en "Create repository".
- Ponle un nombre al repositorio y haz clic en "Create repository".

Listo, ahora tienes un repositorio de Docker donde puedes guardar las imágenes de tus microservicios. Más adelante, te enseñaré cómo subir las imágenes de tus microservicios a este repositorio.

## Despliegue de microservicios con ECS {id="despliegue-de-microservicios-con-ecs"}

Vamos a ver cómo poner en marcha tus microservicios usando Elastic Container Service (ECS) de una manera fácil.

### Creación del cluster de ECS {id="creaci%C3%B3n-del-cluster-de-ecs"}

Primero, necesitas crear un espacio donde tus contenedores puedan correr, eso es un cluster de ECS.

- Entra a la consola de ECS y elige "Crear Cluster".
- Selecciona "EC2 Linux + Networking". Esto prepara un lugar que usa instancias EC2 Linux para correr.
- Cuando configures tu cluster:
- Dale un nombre, como "microservices-cluster".
- Elige el tipo de instancia EC2 que necesitas, por ejemplo, t2.micro, que tiene 1 vCPU y 1GB de RAM.
- Deja las otras opciones como están.
- Crea el cluster. Esto puede tardar un poco mientras se prepara todo.

Ahora tienes un cluster listo para tus microservicios.

### Definición de tareas {id="definici%C3%B3n-de-tareas"}

Ahora, vamos a decirle a ECS cómo son tus microservicios, esto se hace con las tareas. Piensa en las tareas como las instrucciones para cada microservicio.

Para cada microservicio:

- Ve a "Definiciones de Tareas" en la consola de ECS.
- Elige "Crear nueva Definición de Tarea".
- Selecciona "EC2" en "Compatibilidad".
- Nombra tu tarea, como "servicio-de-usuarios:1".
- En los detalles del contenedor:
- Usa la imagen de [Docker](https://www.docker.com/) que hiciste para este microservicio.
- Asigna 256 de memoria y CPU.
- Conecta el puerto 3000 del contenedor con el puerto 0 del host.
- Guarda tu definición de tarea.
- Haz esto para cada microservicio que quieras correr.

Así, cada microservicio tiene sus propias instrucciones y recursos asignados.

### Creación de un servicio en ECS {id="creaci%C3%B3n-de-un-servicio-en-ecs"}

Finalmente, vamos a crear un servicio en ECS para cada microservicio. Los servicios nos ayudan a manejar cómo y cuándo se corren las tareas.

Para cada microservicio:

- Ve a la sección "Clusters" de ECS y selecciona tu cluster.
- En "Servicios", elige "Crear".
- Selecciona "EC2" como tipo de lanzamiento.
- Usa la definición de tarea que hiciste para este microservicio.
- Nombra tu servicio, como "servicio-de-usuarios".
- Por ahora, deja que solo corra una tarea.
- En la configuración de red, asegúrate de que el descubrimiento de servicio esté desactivado.
- Crea el servicio.
- Repite estos pasos para cada microservicio.

Con esto, tus servicios están listos y puedes ver cómo se ejecutan tus microservicios en el cluster. También puedes ajustar cuántas tareas quieres que corran por servicio.

## Implementación con EKS {id="implementaci%C3%B3n-con-eks"}

### Configuración del cluster de EKS {id="configuraci%C3%B3n-del-cluster-de-eks"}

Para configurar un cluster de EKS, podemos usar tanto la consola de AWS como la línea de comandos de AWS.

#### Con la consola {id="con-la-consola"}

- Ve a la consola de EKS.
- Haz clic en "Crear cluster".
- Escoge un nombre para tu cluster y selecciona la versión de Kubernetes que prefieras.
- En "Redes", selecciona las subredes y grupos de seguridad para tu cluster.
- En "Computación", elige el tipo y cantidad de nodos (instancias EC2) para el cluster.
- Haz clic en "Crear" para empezar a crear el cluster.

Este proceso puede tardar un poco. Cuando termine, tu cluster estará listo para usar.

#### Con AWS CLI {id="con-aws-cli"}

También puedes crear un cluster con este comando:

```
aws eks create-cluster --name mi-cluster  \
   --role-arn mi-rol-arn \
   --resources-vpc-config subnetIds=subnet-1234abcd,subnet-abcd1234
```

Donde:

- `mi-cluster` es el nombre que le darás al cluster.
- `mi-rol-arn` es el ARN de un rol de IAM con permisos para usar EKS.
- Se especifican las subredes para los nodos del cluster.

Después de crear el cluster, puedes manejarlo con `kubectl`, que es una herramienta para Kubernetes.

### Despliegue en EKS {id="despliegue-en-eks"}

Para poner en marcha tus microservicios en EKS:

- Prepara los archivos de configuración de Kubernetes para tus aplicaciones.
- Crea una imagen Docker para cada microservicio y súbela a ECR.
- Conecta `kubectl` con tu cluster de EKS.
- Usa los archivos de configuración para crear lo necesario en Kubernetes.

```
kubectl apply -f deployment.yml -f service.yml
```

- Comprueba que todo se haya creado bien.

```
kubectl get pods
kubectl get services
```

- Si necesitas, puedes revisar los registros o hacer pruebas en los pods.

Así, tus microservicios estarán funcionando en EKS, aprovechando las ventajas de Kubernetes para la gestión, red, descubrimiento de servicios, escalado y disponibilidad.

## Uso de Fargate {id="uso-de-fargate"}

### Ventajas de Fargate {id="ventajas-de-fargate"}

Fargate es un servicio de AWS que te permite correr contenedores sin tener que manejar servidores. Esto es genial porque:

- **Es fácil**: No necesitas configurar ni mantener servidores. Fargate lo hace por ti.
- **Es rápido**: Puedes poner en marcha tus aplicaciones rápido, sin esperar que se preparen los servidores.
- **Ahorras dinero**: Solo pagas por el tiempo que tus contenedores están funcionando. Si no los usas, no pagas.
- **Es confiable**: Si algo falla en el servidor donde corre tu contenedor, Fargate lo arranca en otro servidor automáticamente.

En pocas palabras, Fargate te quita la carga de lidiar con servidores para que te enfoques en mejorar tus aplicaciones.

### Implementación con Fargate {id="implementaci%C3%B3n-con-fargate"}

Para usar Fargate con tus microservicios, sigue estos pasos:

- **Crea un cluster en ECS o EKS**: Esto es como crear un área de trabajo para tus aplicaciones.
- **Detalla tus tareas o pods**: Aquí decides cómo quieres que sea cada contenedor, como qué imagen de Docker usar y qué recursos necesita.
- **Haz un servicio en el cluster**: Esto define cómo quieres que corran tus contenedores, por ejemplo, cuántos quieres que estén activos.
- **Prepara una VPC y seguridad**: Esto es para que tus contenedores puedan comunicarse de manera segura.
- **Guarda tus imágenes en ECR**: Aquí pones las imágenes de Docker que tus contenedores van a usar.

Con estos pasos, puedes actualizar tus microservicios fácilmente cambiando la imagen en ECR, sin tocar la infraestructura.

Fargate funciona tanto con ECS como con EKS. Puedes elegir el que más te convenga, pero en ambos casos, Fargate te facilita mucho el trabajo.

## Validación y monitoreo {id="validaci%C3%B3n-y-monitoreo"}

### Validación de la implementación {id="validaci%C3%B3n-de-la-implementaci%C3%B3n"}

Después de que hayas puesto en marcha tus microservicios en AWS, es clave asegurarte de que todo está funcionando bien antes de hacerlos públicos. Aquí van unos consejos:

- Realiza pruebas para comprobar que todo funciona como debe. Esto te ayuda a encontrar problemas desde el principio.
- Utiliza herramientas como [Postman](https://www.getpostman.com/) para probar tus servicios y ver si responden correctamente.
- Si usas una base de datos, verifica que se esté llenando bien con datos de prueba.
- Haz pruebas de carga para ver cómo se comportan tus servicios cuando hay mucha demanda. Herramientas como Jmeter o Locust pueden ser de ayuda.
- Revisa los registros de actividad para buscar errores que puedan indicar problemas.
- Piensa en añadir pruebas de funcionamiento en tus servicios para saber rápido si algo no va bien.

Hacer estas comprobaciones te dará la confianza de que tus microservicios van a funcionar sin problemas cuando estén en uso real.

### Monitoreo con CloudWatch {id="monitoreo-con-cloudwatch"}

Amazon CloudWatch es una herramienta que te ayuda a mantener un ojo en cómo van tus aplicaciones en AWS. Con CloudWatch puedes:

- Recoger y ver datos importantes, como cuánto usan de CPU, memoria, errores, etc. Esto te ayuda a encontrar dónde pueden estar los problemas.
- Poner alarmas que te avisan si algo sale de lo normal, lo que puede significar un problema.
- Guardar registros de lo que pasa en tus aplicaciones para ayudarte a solucionar errores.
- Crear paneles personalizados para ver cómo están tus servicios de un vistazo.

Para empezar a monitorear tus microservicios:

- Instala el agente de CloudWatch en los lugares donde corren tus servicios.
- Añade lo necesario para que se envíen datos y registros.
- Elige qué datos específicos quieres seguir de cerca en cada servicio.

Con esto, podrás identificar rápido si hay problemas de rendimiento y tomar medidas para mejorar tus microservicios en AWS.

## Conclusiones {id="conclusiones"}

Pensar en microservicios y contenedores es como armar un rompecabezas para hacer aplicaciones que puedan crecer y cambiar fácilmente. Al dividir una aplicación en partes más pequeñas, puedes actualizar partes sin problemas y sin afectar todo lo demás.

AWS tiene varias herramientas útiles para trabajar con estos pedacitos de aplicaciones:

- **Amazon ECS** te ayuda a manejar muchos contenedores juntos, haciéndolo simple de configurar y usar.
- **Amazon EKS** usa Kubernetes, que es más avanzado para organizar tus contenedores, especialmente si necesitas cosas especiales como redes mejoradas.
- [**AWS Fargate**](https://aws.amazon.com/fargate/) te permite correr contenedores sin preocuparte por los servidores donde se ejecutan, lo que hace las cosas mucho más sencillas.

Una vez que tienes todo listo y funcionando, es importante asegurarte de que todo esté bien antes de mostrarlo al mundo. Usar **CloudWatch** puede ayudarte a ver cómo está funcionando cada servicio y si hay algún problema.

Trabajar con microservicios significa estar listo para hacer cambios rápido y tener un buen plan para actualizar y mejorar constantemente. AWS te ofrece muchas herramientas para hacer esto posible y construir sistemas fuertes y capaces de crecer.

Te animo a que explores más sobre cada servicio de AWS que mencionamos. Cada uno tiene características especiales que pueden ser muy útiles para tus proyectos en la nube.

¡Te deseo lo mejor en tu aventura con los microservicios!

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué son los contenedores en microservicios? {id="%C2%BFqu%C3%A9-son-los-contenedores-en-microservicios%3F"}

Los contenedores son como cajas que llevan todo lo necesario para que un microservicio funcione, como el código y las herramientas. Esto hace que mover y correr el microservicio sea fácil en cualquier lugar.

Ventajas de usar contenedores:

- Son fáciles de manejar y hacer más grandes o pequeños.
- Puedes poner en marcha versiones nuevas rápidamente.
- Aseguran que el microservicio funcione igual en desarrollo, pruebas y producción.
- Aprovechan mejor los recursos del servidor.

Los contenedores hacen más sencillo trabajar con microservicios porque los empaquetan de manera que se pueden manejar fácilmente.

### ¿Qué servicio se utiliza para ejecutar aplicaciones en contenedores en AWS? {id="%C2%BFqu%C3%A9-servicio-se-utiliza-para-ejecutar-aplicaciones-en-contenedores-en-aws%3F"}

AWS tiene varios servicios para correr aplicaciones en contenedores:

- **Amazon ECS**: Te permite correr contenedores Docker en un grupo de máquinas EC2. Es bueno para programar tareas de diferentes tipos.
- **Amazon EKS**: Es para usar Kubernetes, que ayuda a manejar los contenedores en un grupo de máquinas EC2.
- **AWS Fargate**: Con este servicio, puedes correr contenedores sin tener que preocuparte por las máquinas donde se ejecutan. Funciona con ECS y EKS.
- [**AWS Lambda**](https://aws.amazon.com/lambda/): Permite correr código sin tener que manejar servidores y se puede usar para contenedores.

Estos servicios hacen más fácil y automático el correr contenedores en AWS.

### ¿Qué es un contenedor de AWS? {id="%C2%BFqu%C3%A9-es-un-contenedor-de-aws%3F"}

Un contenedor de AWS es una forma de poner una aplicación o servicio y todo lo que necesita para funcionar (como código y herramientas) en un paquete que se puede mover y correr fácilmente en diferentes lugares.

Beneficios:

- Se pueden poner en marcha rápido y de manera confiable.
- Se pueden hacer más grandes o pequeños según se necesite.
- Están disponibles todo el tiempo.
- Usan los recursos de manera eficiente.

AWS tiene servicios como ECS, EKS y Fargate para ayudarte a manejar contenedores sin importar el tamaño de tu proyecto.

### ¿Qué es un Microservicio AWS? {id="%C2%BFqu%C3%A9-es-un-microservicio-aws%3F"}

Un microservicio AWS es una pequeña aplicación autónoma diseñada para hacer una tarea específica. Es parte de un estilo de construir aplicaciones donde cada parte trabaja de forma independiente.

Características:

- Trabaja por su cuenta con su propia lógica y datos.
- Se puede hacer más grande o pequeño fácilmente.
- Se puede actualizar sin afectar a otros.
- Se comunica con otros microservicios usando API.
- Es más sencillo de mantener y actualizar.

AWS te ayuda a poner en marcha microservicios ofreciendo servicios como Lambda para correr código sin servidores, ECS para contenedores, y otras herramientas para bases de datos y redes.

## Related posts

- [Mejores Prácticas Para Amazon ECS](/blog/mejores-practicas-para-amazon-ecs/)
- [Mejores Prácticas Para Amazon EKS](/blog/mejores-practicas-para-amazon-eks/)
- [Opciones para Desplegar Contenedores en AWS: ECS y EKS](/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/)
- [Cómo Desplegar Contenedores en AWS](/blog/como-desplegar-contenedores-en-aws/)
