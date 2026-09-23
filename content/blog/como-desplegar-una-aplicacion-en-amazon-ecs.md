+++
url = "/blog/como-desplegar-una-aplicacion-en-amazon-ecs/"
title = "Cómo Desplegar una Aplicación en Amazon ECS"
description = "Aprende cómo desplegar una aplicación en Amazon ECS paso a paso, desde la configuración inicial hasta la administración y escalado. Descubre cómo configurar AWS CLI y tus credenciales, crear un clúster en ECS, definir tareas con imágenes Docker, verificar el funcionamiento de tu aplicación y más."
date = "2024-03-09T23:04:00.573000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/d73cb60565a00d466c3768e1694a85b1dc981df64b45ef2fcf420eae39a29ba6.jpg"
archive_order = 130

[[related]]
title = "Checklist: Servicios AWS Esenciales para SAA-C03"
url = "/blog/checklist-servicios-aws-esenciales-para-saa-c03/"
image = "/assets/blog/eadb9eb1eb9dfe22a3da22e2c01c99ef77d64a62ecf0d7329bc5af595b7811c7.jpg"

[[related]]
title = "Guía de Eventos AWS Educate 2024"
url = "/blog/guia-de-eventos-aws-educate-2024/"
image = "/assets/blog/835302183289e4165c02383bdd6096d001abc18157be12e3419326dea81b69f5.jpg"

[[related]]
title = "Aprender AWS gratis: Recursos y Comunidad"
url = "/blog/aprender-aws-gratis-recursos-y-comunidad/"
image = "/assets/blog/c7227ae982494a7ce162007094b68d0a705cc8359af23154c0dfef0a2b0ef7f6.jpg"
+++

Desplegar una aplicación en Amazon ECS es más fácil de lo que piensas y aquí te mostramos cómo hacerlo paso a paso. Desde la configuración inicial hasta la administración y escalado, te guiaremos en cada etapa para que puedas lanzar tu aplicación con éxito en Amazon ECS usando Fargate, sin preocuparte por los servidores. Aprenderás a:

- Configurar AWS CLI y tus credenciales.
- Crear un clúster en ECS y preparar una instancia EC2.
- Definir y configurar tu tarea con una imagen Docker.
- Ajustar y desplegar tu servicio en el clúster.
- Verificar que tu aplicación esté funcionando correctamente.
- Monitorear el rendimiento y escalar recursos según sea necesario.

Además, resolveremos dudas comunes sobre cómo desplegar aplicaciones en AWS, qué es ECS, los servicios disponibles para ejecutar aplicaciones en contenedores, y qué es Amazon Fargate. Este es un recorrido completo para que empieces a utilizar Amazon ECS y Fargate, simplificando el manejo de contenedores y permitiéndote enfocarte más en el desarrollo de tu aplicación.

### Conocimientos Básicos de AWS {id="conocimientos-b%C3%A1sicos-de-aws"}

- Es importante que tengas una idea de cómo funciona AWS. Cosas como VPCs, subnets, grupos de seguridad, roles de IAM, son esenciales para que tus [contenedores](https://kubernetes.io/docs/concepts/containers/) corran sin problemas en ECS.
- También deberías saber lo básico sobre contenedores y Docker, como crear [imágenes](https://kubernetes.io/docs/concepts/containers/images/) de Docker y entender qué son los Dockerfiles.
- Sería bueno que le dieras una leída a la documentación de Amazon ECS para que sepas de qué va antes de empezar.

### CLI de AWS Instalada y Configurada {id="cli-de-aws-instalada-y-configurada"}

- Necesitas tener la CLI de AWS (una herramienta para manejar AWS desde la línea de comandos) instalada en tu computadora. Esto te va a permitir controlar tus recursos de AWS sin tener que usar la interfaz web.
- Asegúrate de configurar tus credenciales de AWS en la CLI. Esto es como darle las llaves de tu cuenta de AWS a la CLI para que pueda hacer cosas en tu nombre.

### Cuenta de AWS {id="cuenta-de-aws"}

- Si todavía no tienes una, crea una cuenta en AWS. ECS tiene una opción gratuita para que puedas probar cómo funciona sin gastar dinero.
- Lo ideal es que uses una cuenta solo para tus pruebas. Así no te preocupas de que algo de lo que estés probando interfiera con otros proyectos.

### Resumen {id="resumen"}

En pocas palabras, asegúrate de conocer un poco sobre AWS y cómo funcionan los contenedores, tener la CLI de AWS lista en tu computadora, y tener una cuenta de AWS para tus pruebas. Esto te pondrá en buen camino para empezar a jugar con la idea de lanzar aplicaciones en contenedores usando Amazon ECS.

## Paso 1: Configuración Inicial de ECS {id="paso-1%3A-configuraci%C3%B3n-inicial-de-ecs"}

### 1.1 Crear clave de credencial de usuario {id="1.1-crear-clave-de-credencial-de-usuario"}

Para usar la AWS CLI, primero necesitamos unas claves especiales. Aquí te cuento cómo conseguirlas:

- Entra a la consola de AWS y busca IAM (Identity and Access Management).
- Elige "Usuarios" y después "Agregar usuario".
- Escribe un nombre para el usuario y marca la opción de "Acceso programático". Esto es para que se creen unas claves especiales.
- En la pantalla que sigue, verás tu clave de acceso y tu clave secreta. Guarda estos datos bien porque son importantes y no los podrás ver de nuevo.

### 1.2 Configurar AWS CLI {id="1.2-configurar-aws-cli"}

Ahora que tenemos nuestras claves, vamos a configurar la CLI. Simplemente escribe esto en tu terminal:

```
aws configure
```

Te pedirá que ingreses:

- **AWS Access Key ID**: La clave de acceso de 20 caracteres
- **AWS Secret Access Key**: La clave secreta de 40 caracteres
- **Default region name**: Elige la región de AWS que prefieras, como us-east-1
- **Default output format**: escribe json

Con esto, ya estás listo para usar la AWS CLI y manejar tus recursos en AWS. Para asegurarte de que todo está bien configurado, prueba con:

```
aws sts get-caller-identity
```

Este comando te mostrará información sobre tu cuenta de AWS.

## Paso 2: Crear y Configurar un Clúster ECS {id="paso-2%3A-crear-y-configurar-un-cl%C3%BAster-ecs"}

### 2.1 Crear clúster ECS {id="2.1-crear-cl%C3%BAster-ecs"}

Para empezar con tu clúster ECS, haz lo siguiente:

- Entra a la consola de AWS y busca la sección de ECS.
- Selecciona "Crear clúster".
- Escoge la opción "EC2 Linux + Networking" y dale a "Siguiente".
- Ponle un nombre a tu clúster para identificarlo fácilmente.
- Deja la cantidad de instancias en 1 para iniciar.
- En "Redes", elige una VPC y subnets que ya tengas, o crea unas nuevas solo para este clúster.
- Dale clic a "Crear".

Con estos pasos, tu clúster estará listo para manejar tareas y servicios con imágenes Docker.

### 2.2 Configurar instancia EC2 {id="2.2-configurar-instancia-ec2"}

Ahora, vamos a preparar la instancia EC2 que tu clúster va a usar:

- Ve a la sección de EC2 en la consola de AWS.
- Encuentra la instancia que ECS creó por ti. Debería tener el nombre de tu clúster.
- Selecciona "Configurar detalles de la instancia".
- Escoge una plantilla Linux, como Amazon Linux 2.
- Selecciona un tipo de instancia, como t2.micro para empezar.
- Asegúrate de que la interfaz de red esté en la misma VPC y subnet que tu clúster.
- Guarda los cambios.

Para conectarte por SSH a tu instancia EC2, necesitas un par de claves. Aquí te explicamos cómo:

- En EC2, ve a "Pares de claves".
- Clic en "Crear par de claves".
- Dale un nombre y descarga el archivo .pem con las claves.
- Selecciona tu instancia EC2 y en "Acciones", ve a "Configuración de la instancia" > "Adjuntar/Reemplazar rol IAM".
- Usa el rol EC2 que ECS ya tiene listo. Esto le da los permisos que necesita.
- Finalmente, en "Grupos de seguridad", permite SSH desde tu IP.

Siguiendo estos pasos, podrás conectarte y manejar tu instancia EC2 sin problemas.

## Paso 3: Definición de Tareas {id="paso-3%3A-definici%C3%B3n-de-tareas"}

### 3.1 Crear definición de tarea {id="3.1-crear-definici%C3%B3n-de-tarea"}

Para que tus contenedores Docker funcionen en tu clúster de ECS, primero necesitas decirle a ECS qué imagen de Docker quieres usar y cómo debe configurarla. Es como darle una receta de cocina.

- Ve a la consola de ECS y busca "Definiciones de tareas".
- Haz clic en "Crear nueva definición de tarea".
- Escoge si vas a usar Fargate o EC2 y qué tipo de plataforma.
- Cuando llegues a la parte de contenedores, selecciona "Agregar contenedor".
- Pon el nombre de la imagen de Docker que vas a usar, como `nginx`.
- Decide cuánta CPU y memoria va a necesitar.
- En "Opciones avanzadas", busca la parte de "Puertos".
- Añade un mapeo de puertos para conectar el puerto de la imagen Docker (normalmente 80 para Nginx) con el puerto de tu instancia EC2, por ejemplo `80`.

Con estos pasos, ya tienes una definición de tarea lista. No olvides ponerle un nombre que te ayude a recordar para qué es.

### 3.2 Configurar contenedor Docker {id="3.2-configurar-contenedor-docker"}

Cuando estés configurando tu contenedor en la definición de tarea, hay cosas clave que debes ajustar:

- **Puertos**: Conecta el puerto de tu imagen Docker con un puerto en tu instancia EC2 para que la gente pueda acceder a tu aplicación.
- **CPU/Memoria**: Asigna la cantidad correcta de CPU y RAM que tu aplicación necesita. Si ves que necesitas ajustar esto más adelante, puedes hacerlo sin problema.
- **Volúmenes de datos**: Si tu aplicación necesita guardar datos de manera permanente, asegúrate de añadir volúmenes para ello.
- **Variables de entorno**: Si tu aplicación necesita ciertas variables para funcionar, aquí es donde las defines.

Configurando bien estos aspectos, tu contenedor debería correr sin problemas en las instancias EC2 de tu clúster de ECS.

## Paso 4: Configurar y Desplegar el Servicio {id="paso-4%3A-configurar-y-desplegar-el-servicio"}

### 4.1 Configurar parámetros del servicio {id="4.1-configurar-par%C3%A1metros-del-servicio"}

Para poner a punto los detalles de tu servicio en Amazon ECS, aquí tienes unos pasos claros:

- Primero, decide si vas a usar EC2 o Fargate. Aquí, vamos con EC2.
- Luego, piensa en cuántas copias de tu aplicación quieres que corran al mismo tiempo. Empezar con una está bien.
- Si tu aplicación va a recibir visitas por Internet, probablemente necesites un balanceador de carga. Esto ayuda a distribuir las visitas para que no se sature.
- Por último, aunque no es necesario de inmediato, piensa en Auto Scaling. Esto ajusta automáticamente el número de copias de tu aplicación según cuánta gente la esté usando.

### 4.2 Desplegar el servicio {id="4.2-desplegar-el-servicio"}

Ahora que ya configuraste todo, es hora de lanzar tu servicio:

- Asegúrate de que la definición de tareas que hiciste antes es la que quieres usar.
- Escoge el clúster de ECS donde quieres que corra tu servicio.
- Dale a "Siguiente".
- En la pantalla de revisión, chequea que todo esté como lo quieres.
- Haz clic en "Crear servicio".
- Espera un poco mientras tu servicio se pone en marcha. Esto puede tardar unos minutos.
- Cuando el servicio esté listo, tu aplicación debería estar disponible para usar, ya sea a través del balanceador de carga o usando la dirección IP de tu instancia EC2.

Siguiendo estos pasos, habrás logrado desplegar tu servicio en Amazon ECS con EC2. Ahora, tu aplicación debe estar funcionando y lista para recibir visitas.

## Paso 5: Verificación y Pruebas {id="paso-5%3A-verificaci%C3%B3n-y-pruebas"}

### 5.1 Comprobar la Instancia EC2 {id="5.1-comprobar-la-instancia-ec2"}

Para asegurarte de que tu aplicación funciona bien en la instancia EC2, haz lo siguiente:

- Ve a la consola de EC2 y encuentra la instancia que usas para tu clúster ECS.
- Toma la dirección IP pública (IPv4) de esa instancia.
- Escribe esa IP en tu navegador para ver tu aplicación. Por ejemplo, si usas Nginx, deberías ver su página de inicio.

Si no puedes ver tu aplicación, puede ser que el grupo de seguridad no esté configurado para dejar pasar el tráfico. Para arreglarlo:

- En la consola de EC2, busca el grupo de seguridad de tu instancia.
- Ve a la sección de reglas de entrada.
- Añade una regla nueva que permita:
- Tipo: HTTP
- Protocolo: TCP
- Puerto: 80
- Origen: 0.0.0.0/0 (esto significa que cualquiera puede acceder)

Con estos pasos, deberías poder entrar a tu aplicación sin problemas usando la dirección IP.

### 5.2 Probar el Funcionamiento {id="5.2-probar-el-funcionamiento"}

Con tu aplicación ya en línea, prueba estas cosas para ver que todo marcha bien:

- Navega por las diferentes páginas o secciones de tu aplicación web. Si tienes una API, prueba algunos de sus servicios.
- Si tu aplicación guarda información entre visitas, asegúrate de que esta función trabaje correctamente.
- Intenta simular usuarios reales usando herramientas como ab o jmeter para ver cómo responde tu aplicación.
- Revisa los registros en CloudWatch para identificar posibles errores o problemas.
- Configura alarmas en CloudWatch para monitorear aspectos importantes como el uso de CPU, la memoria, o si hay errores.

Haciendo estas pruebas, podrás confirmar que tu aplicación está lista para ser usada por otras personas.

## Paso 6: Administración y Escalado de tu Aplicación en ECS {id="paso-6%3A-administraci%C3%B3n-y-escalado-de-tu-aplicaci%C3%B3n-en-ecs"}

### Monitoreo de recursos {id="monitoreo-de-recursos"}

Es clave que revisemos con frecuencia cómo están trabajando nuestros recursos en el clúster de ECS para asegurarnos de que todo va bien. Aquí algunas cosas a tener en cuenta:

- Chequear el uso de CPU y memoria en las instancias EC2. Si se están quedando cortas, podría afectar cómo corren los contenedores.
- Verificar que los servicios y tareas en ECS estén funcionando como esperamos. Es importante tener siempre el número de tareas activas que necesitamos.
- Observar cómo están trabajando los contenedores, por ejemplo, cuántas solicitudes reciben por segundo o si están tardando mucho en responder.
- Revisar los registros de los contenedores en CloudWatch para buscar errores o advertencias.

Podemos crear paneles en CloudWatch con las métricas más importantes para tener todo a la vista. También es buena idea poner alarmas que nos avisen si algo no está bien, como demasiados errores o un aumento inesperado en el uso de recursos.

### Escalado vertical y horizontal {id="escalado-vertical-y-horizontal"}

Si llega más tráfico, tal vez necesitemos más recursos. Podemos hacerlo de dos maneras:

**Vertical**: hacemos más grandes las instancias EC2 para que tengan más potencia.

**Horizontal**: agregamos más tareas e instancias EC2 para repartir el trabajo.

Para escalar horizontalmente en ECS, simplemente aumentamos el número de tareas en la configuración del servicio. ECS se encarga de agregar más instancias EC2 si hace falta. También podemos configurar reglas de Auto Scaling para que esto se ajuste automáticamente.

Para el escalado vertical, cambiamos a un tipo de instancia EC2 más grande.

Lo mejor es ir viendo cómo va el rendimiento y ajustar los recursos poco a poco. Un buen indicador es el uso de CPU, tratando de que no pase del 60-70% bajo carga máxima.

### Actualizaciones y despliegues {id="actualizaciones-y-despliegues"}

También tenemos que saber cómo actualizar nuestra aplicación sin interrupciones. Algunas formas de hacerlo son:

- Despliegue Blue/Green: mantenemos 2 versiones en producción y vamos cambiando el tráfico entre ellas.
- Despliegue Canary: lanzamos la nueva versión solo a un pequeño grupo de usuarios primero. Si todo sale bien, seguimos con todos.
- Actualizaciones progresivas: actualizamos algunas tareas primero y vamos avanzando poco a poco.

Es crucial tener un plan para volver atrás si algo sale mal con una actualización. ECS nos permite regresar a la versión anterior de una tarea fácilmente.

Con un buen manejo de monitoreo, escalado y actualizaciones, podemos mantener nuestra aplicación en ECS funcionando de maravilla.

## Conclusión {id="conclusi%C3%B3n"}

En esta guía, te mostramos cómo poner en marcha una aplicación web usando Amazon ECS y Fargate, paso a paso. Aquí lo que aprendimos:

- Cómo empezar configurando la AWS CLI y tus credenciales.
- Cómo crear un clúster en ECS con una instancia EC2.
- Cómo decirle a ECS qué imagen Docker queremos usar mediante una definición de tarea.
- Cómo ajustar los detalles de nuestro servicio, como cuánta memoria o CPU necesita.
- Cómo hacer que nuestro servicio empiece a funcionar en el clúster.
- Cómo comprobar que todo está funcionando bien y hacer pruebas.
- Cómo mantener un ojo en cómo va todo, cómo hacer que nuestra aplicación pueda manejar más visitas y cómo actualizarla.

Estos pasos básicos te ayudarán a lanzar aplicaciones en contenedores, sin que te tengas que romper la cabeza con la infraestructura que está por debajo.

Amazon ECS hace más sencillo trabajar con contenedores en AWS, permitiéndote enfocarte más en tu código. Con la ayuda de servicios como Fargate, Elastic Load Balancing y Auto Scaling, puedes hacer que tus aplicaciones sean capaces de ajustarse a más visitas y ser más estables sin mucho esfuerzo.

ECS es una buena opción para cualquier tipo de proyecto en la nube, desde aplicaciones pequeñas hasta sistemas grandes de microservicios. Vale la pena considerarlo si estás pensando en modernizar cómo lanzas tus aplicaciones.

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Cómo desplegar una aplicación en AWS? {id="%C2%BFc%C3%B3mo-desplegar-una-aplicaci%C3%B3n-en-aws%3F"}

Para lanzar una aplicación que usa contenedores en AWS, sigue estos pasos básicos:

- Asegúrate de tener lista la imagen de Docker de tu aplicación.
- Crea un clúster usando ECS o EKS para ejecutar tus contenedores.
- Define una tarea en ECS con esa imagen de tu aplicación.
- Configura un servicio en el clúster para mantener esa tarea en funcionamiento.
- Si es necesario, usa un balanceador de carga para que tu servicio sea accesible desde Internet.

Es clave también manejar bien los permisos y la configuración de la red, mantener un ojo en los recursos y estar listo para aumentar la capacidad o actualizar tu aplicación cuando haga falta.

### ¿Qué es ECS Amazon? {id="%C2%BFqu%C3%A9-es-ecs-amazon%3F"}

Amazon Elastic Container Service (ECS) es un servicio de AWS para ejecutar y manejar contenedores Docker en la nube. Te permite crear grupos de máquinas virtuales o usar Fargate para que no tengas que lidiar con la infraestructura. Después, puedes definir tareas y desplegar servicios que mantengan esas tareas activas en tu grupo. ECS trabaja bien con muchos otros servicios de AWS.

### ¿Qué servicio se utiliza para ejecutar aplicaciones en [contenedores](https://kubernetes.io/docs/concepts/containers/) en AWS? {id="%C2%BFqu%C3%A9-servicio-se-utiliza-para-ejecutar-aplicaciones-en-contenedores-en-aws%3F"}

![contenedores](/assets/blog/b00e1f818f2c35dc864477dbc06114017eec3598ef318a9e85e34f8600fbed8a.jpg)

Los servicios principales de AWS para ejecutar aplicaciones en contenedores son:

- **Amazon ECS**: Ideal para ejecutar contenedores Docker en instancias EC2 o con Fargate, donde no tienes que preocuparte por los servidores. Es fácil de usar.
- **Amazon EKS**: Usa Kubernetes para manejar contenedores a gran escala. Es más complejo pero muy potente.

Ambos servicios son buenas opciones para contenerizar aplicaciones en AWS. La elección entre ellos depende de tus necesidades específicas.

### ¿Qué es Amazon Fargate? {id="%C2%BFqu%C3%A9-es-amazon-fargate%3F"}

Amazon Fargate es una manera de correr contenedores en AWS sin tener que manejar servidores. No necesitas pensar en las instancias EC2. Solo defines tus tareas y servicios en ECS o EKS, y Fargate asigna los recursos necesarios para que se ejecuten. Pagas únicamente por los recursos que usan tus contenedores. Es una opción excelente para aplicaciones en contenedores que buscan una solución sin servidores.

## Related posts

- [Mejores Prácticas Para Amazon ECS](/blog/mejores-practicas-para-amazon-ecs/)
- [Cómo Desplegar Contenedores en AWS](/blog/como-desplegar-contenedores-en-aws/)
- [Opciones para Desplegar Contenedores en AWS: ECS y EKS](/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/)
- [Mejores Prácticas Para Amazon EKS](/blog/mejores-practicas-para-amazon-eks/)
