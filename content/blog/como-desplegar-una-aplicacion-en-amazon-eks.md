+++
url = "/blog/como-desplegar-una-aplicacion-en-amazon-eks/"
title = "Cómo Desplegar una Aplicación en Amazon EKS"
description = "Aprende cómo desplegar una aplicación en Amazon EKS paso a paso. Descubre los conceptos básicos de Kubernetes y Amazon EKS, requisitos previos, creación de clúster EKS, despliegue de aplicaciones, gestión del tráfico, escalado y más."
date = "2024-03-09T03:18:48.675000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/b0397a49b6dcdda375e046d490f34639fa4e95e291a5f743d759f0a7fe1200ae.jpg"
archive_order = 145

[[related]]
title = "Diferencias: Endpoint de interfaz vs. Endpoint de gateway"
url = "/blog/diferencias-endpoint-de-interfaz-vs-endpoint-de-gateway/"
image = "/assets/blog/3565dcd644c1d6c6946949853496828ab3dbbef001074591960c9f36413fc78e.jpg"

[[related]]
title = "Diferencias Entre SLA y SLO en AWS"
url = "/blog/diferencias-entre-sla-y-slo-en-aws/"
image = "/assets/blog/8281401d50eb83da06a511af54feab265795e8b1dbf995ce98841bed0e415489.jpg"

[[related]]
title = "Servicios de AWS para Frontend"
url = "/blog/servicios-de-aws-para-frontend/"
image = "/assets/blog/31bdf1ca2f3b6c51213246c8da2f355c9e03bdb8a01a7f392f421fa206e7218e.jpg"
+++

Si estás buscando cómo desplegar una aplicación en Amazon EKS, has llegado al lugar indicado. Este artículo te guiará paso a paso para que logres poner en marcha tu aplicación usando Kubernetes en la nube de Amazon. Aquí encontrarás todo lo que necesitas saber, desde los conceptos básicos de Kubernetes y Amazon EKS, hasta cómo crear un clúster de EKS y desplegar tu aplicación. A continuación, te resumo los puntos clave:

- **Amazon EKS** te permite manejar aplicaciones en contenedores de manera eficiente.
- [**Kubernetes**](https://aws.amazon.com/es/kubernetes/) facilita la organización y escalabilidad de tus aplicaciones.
- Necesitarás una cuenta de AWS, AWS CLI, [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/), y [eksctl](https://eksctl.io/) para empezar.
- **Crear un clúster de EKS** es el primer paso práctico.
- **Desplegar tu aplicación** implica definir archivos de configuración y aplicarlos en el clúster.
- **Gestionar el tráfico** y **escalar** tu aplicación son aspectos avanzados que puedes explorar.

Este guía está diseñada para ser directa y fácil de seguir, asegurando que puedas tener tu aplicación corriendo en Amazon EKS sin complicaciones.

### ¿Por qué usar [Amazon](https://images-na.ssl-images-amazon.com/images/g/01/lwa/dev/docs/website-developer-guide._tth_.pdf) EKS? {id="%C2%BFpor-qu%C3%A9-usar-amazon-eks%3F"}

Usar Amazon EKS tiene sus ventajas:

- **F**á**cil de agrandar o achicar**: Si tu aplicación necesita atender a más o menos usuarios, EKS te lo pone fácil.
- **Siempre disponible**: Trabaja para que tu aplicación casi nunca esté fuera de línea.
- **Funciona bien con Amazon**: Te permite usar otros servicios de Amazon que pueden hacer tu vida más fácil.
- **Amazon te ayuda**: Se encargan de las actualizaciones y de mantener todo funcionando bien.
- **Hecho para contenedores**: Es perfecto si tu aplicación usa contenedores para funcionar de manera más eficiente.

En pocas palabras, EKS te ayuda a que tu aplicación funcione en Kubernetes de manera sencilla, eficiente y con el apoyo de Amazon.

## Conceptos básicos de [Kubernetes](https://ifgeekthen.everis.com/es/kubernetes) y [Amazon EKS](https://aws.amazon.com/eks/) {id="conceptos-b%C3%A1sicos-de-kubernetes-y-amazon-eks"}

![Kubernetes](/assets/blog/24e751b0e63097b51e12a2242a38ee96b12d63005676c826ccf7b47f4bba9c0a.jpg)

Kubernetes es como un sistema que ayuda a que las aplicaciones hechas de contenedores (como los creados con Docker) funcionen bien, crezcan cuando más gente las usa y se mantengan organizadas sin que tú tengas que hacer mucho. Amazon Elastic Kubernetes Service (EKS) es un servicio que ofrece Amazon para que usar Kubernetes sea más fácil y esté todo en la nube.

Veamos algunos conceptos importantes para entender cómo funciona todo esto:

### Clúster {id="cl%C3%BAster"}

Un clúster de Kubernetes es como un equipo de computadoras (nodos) que trabajan juntas para mantener tus aplicaciones corriendo. Este equipo se encarga de todo el trabajo pesado, desde hacer que las aplicaciones estén disponibles hasta asegurarse de que funcionen bien.

En EKS, Amazon se ocupa de la parte más complicada, como asegurarse de que el sistema de Kubernetes esté siempre listo y funcionando.

### Nodos {id="nodos"}

Los nodos son como las computadoras individuales en este equipo, donde realmente se ejecutan tus aplicaciones en contenedores Docker. Son los que hacen el trabajo día a día.

Con EKS, puedes elegir si quieres que Amazon se encargue de estos nodos por ti o si prefieres manejarlos tú mismo.

### Pods {id="pods"}

Un pod es como un paquete pequeño que contiene uno o más contenedores Docker que deben trabajar juntos. Se ejecutan en los nodos y cada uno tiene su propia dirección IP y recursos.

Los pods ayudan a que los contenedores no tengan problemas entre ellos, manteniéndolos organizados y funcionando bien juntos.

### Servicios {id="servicios"}

Un servicio es una forma de decirle a Kubernetes cómo quieres que las personas o sistemas externos se comuniquen con tus aplicaciones en los pods. Es como darle una dirección fija a tus aplicaciones, así no importa dónde estén realmente ejecutándose, siempre se pueden encontrar.

Esto hace más fácil el trabajo de conectar diferentes partes de tu aplicación o permitir que los usuarios accedan a ella desde cualquier lugar.

## Requisitos previos {id="requisitos-previos"}

### Cuenta de AWS {id="cuenta-de-aws"}

Antes de empezar a desplegar tu aplicación en Amazon EKS, necesitas tener una cuenta en AWS. Si no tienes una, puedes crear una cuenta gratis que te permite usar ciertos servicios de AWS sin costo durante el primer año.

### [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) {id="aws-cli"}

![AWS CLI](/assets/blog/6c19e0dd3c1cd485566e0d8dbfe4085b4712960d03ebca4f2baec26c0c7c43b6.jpg)

La AWS CLI es una herramienta que te permite hablar con los servicios de AWS usando la terminal de tu computadora. Es importante tenerla instalada y lista con tus datos de acceso a AWS.

### [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) {id="kubectl"}

![kubectl](/assets/blog/d8ddb5305e6f91903b343c2cd5b7d7485c9ed3b6d8d83049c33494d8d5722e4b.jpg)

kubectl es una herramienta esencial para trabajar con clústers de Kubernetes. Te ayuda a lanzar aplicaciones, revisar cómo van, ver registros de actividad, entre otras cosas. Debes tener kubectl instalada y configurada para que pueda comunicarse con tu clúster de EKS.

### [eksctl](https://eksctl.io/) {id="eksctl"}

![eksctl](/assets/blog/cde11b7c19ca616e625405fa12009e20aeeba1a8fa180f0146b163cd537924a7.jpg)

eksctl es una herramienta creada por AWS que hace mucho más fácil crear y manejar clústers de EKS. Si vas a desplegar tu aplicación pero aún no tienes un clúster, te recomendamos usar eksctl para armar uno con un comando sencillo.

## Paso 1 - Preparar [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) y eksctl {id="paso-1---preparar-aws-cli-y-eksctl"}

![AWS CLI](/assets/blog/a78e890bb8564194e0ff55614f550144cc51f9f3bffb92da9e35fa4a6534f6f8.jpg)

### Configurar AWS CLI {id="configurar-aws-cli"}

Para empezar con AWS CLI, haz lo siguiente:

- Si no tienes AWS CLI en tu computadora, instálalo. Puedes encontrar cómo hacerlo en la [página oficial de instrucciones](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- Cuando lo tengas, abre la terminal y escribe `aws configure`. Te pedirá algunos datos:
- Tu ID de clave de acceso de AWS (algo así como un nombre de usuario)
- Tu clave secreta de acceso (como una contraseña)
- La región de AWS que vas a usar (por ejemplo, us-east-1)
- El formato en que quieres que AWS te muestre la información (puede ser json, texto o tabla)
- Para asegurarte de que todo está bien configurado, prueba con el comando `aws sts get-caller-identity`. Si ves información sobre tu cuenta de AWS, significa que todo está correcto.

Con estos pasos, ya podrás usar AWS CLI para manejar los servicios de AWS desde tu computadora.

### Instalar eksctl {id="instalar-eksctl"}

Para instalar eksctl:

- Ve a la [página donde están las versiones de eksctl](https://github.com/weaveworks/eksctl/releases) y descarga la que corresponda a tu sistema operativo.
- Saca el archivo que descargaste en una carpeta que tu computadora reconozca para ejecutar programas.
- Para verificar que se instaló bien, escribe `eksctl version` en la terminal.

Listo, con eksctl instalado y AWS CLI listo, puedes empezar a trabajar en desplegar tu aplicación en Amazon EKS.

## Paso 2 - Crear un clúster EKS {id="paso-2---crear-un-cl%C3%BAster-eks"}

Para crear un clúster en Amazon EKS, vamos a seguir unos pasos sencillos con la ayuda de una herramienta llamada eksctl:

### Definir configuración del clúster {id="definir-configuraci%C3%B3n-del-cl%C3%BAster"}

Primero, vamos a decidir cómo queremos que sea nuestro clúster EKS. Esto incluye cosas como:

- Qué versión de Kubernetes queremos usar (es buena idea usar la más reciente)
- Qué tipo y tamaño de máquinas (instancias EC2) queremos para los nodos
- Cuántos nodos queremos en total
- En qué región y zonas de AWS queremos que esté

Por ejemplo:

```
eksctl create cluster \
  --version 1.21 \
  --node-type t3.medium \
  --nodes 3 \
  --region us-east-1 \
  --zones us-east-1a,us-east-1b
```

Con esto le estamos diciendo que queremos un clúster con:

- Kubernetes versión 1.21
- Nodos tipo t3.medium (que tienen 2 vCPU y 4GB de RAM)
- Un total de 3 nodos
- Que esté en la región us-east-1 de AWS y en las zonas us-east-1a y us-east-1b

### Lanzar clúster EKS {id="lanzar-cl%C3%BAster-eks"}

Una vez que sabemos cómo queremos nuestro clúster, usamos eksctl para crearlo:

```
eksctl create cluster -f cluster.yaml
```

Aquí, `cluster.yaml` es un archivo donde escribimos los detalles que decidimos antes.

Usando este comando, eksctl automáticamente se encarga de:

- Crear el clúster
- Preparar las máquinas EC2
- Ajustar la red y la seguridad
- Instalar lo necesario

En unos minutos, nuestro clúster estará listo.

### Verificar creación del clúster {id="verificar-creaci%C3%B3n-del-cl%C3%BAster"}

Para asegurarnos de que nuestro clúster está funcionando, podemos usar:

```
kubectl get nodes
```

Esto nos muestra los nodos que están funcionando y en qué estado están. Deberíamos ver los nodos que pedimos, listos para trabajar.

También podemos ver más detalles del clúster con:

```
kubectl cluster-info
```

Con estos comandos podemos confirmar que nuestro clúster de EKS está preparado para nuestras aplicaciones.

## Paso 3 - Cómo Desplegar tu Aplicación de Ejemplo {id="paso-3---c%C3%B3mo-desplegar-tu-aplicaci%C3%B3n-de-ejemplo"}

### Definir los archivos de configuración {id="definir-los-archivos-de-configuraci%C3%B3n"}

Para poner tu aplicación a funcionar en nuestro clúster de EKS, necesitamos preparar unos archivos en formato YAML. Estos archivos son como las instrucciones que le dicen a Kubernetes qué hacer, cómo arrancar tu aplicación y cómo hacerla accesible.

Hablando de manera simple, necesitarás dos tipos de archivos:

- Uno para decir cómo debe correr tu aplicación, cuántas copias quieres que haya y qué recursos necesita. Esto se llama un archivo de implementación.
- Otro para decir cómo la gente puede acceder a tu aplicación desde fuera. Esto se llama un archivo de [servicio](https://kubernetes.io/docs/concepts/services-networking/service/).

Aquí te dejo un ejemplo de cómo se ve un archivo de implementación para Nginx:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Y así se ve un archivo de servicio:

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Con estos archivos, básicamente estamos poniendo a correr Nginx en nuestro clúster, con 3 copias y abriendo el puerto 80 para que se pueda acceder.

### Aplicar los archivos en el clúster {id="aplicar-los-archivos-en-el-cl%C3%BAster"}

Una vez que tienes tus archivos listos, es momento de ponerlos a trabajar. Para esto, usamos un comando que se llama `kubectl apply`:

```
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml
```

Esto le dice a Kubernetes que tome los archivos y cree todo lo que le pedimos: las copias de la aplicación, cómo acceder a ella, etc.

### Chequear que todo esté funcionando {id="chequear-que-todo-est%C3%A9-funcionando"}

Para estar seguros de que todo va bien, podemos usar unos comandos para ver cómo están corriendo las cosas:

```
kubectl get pods
kubectl get services
kubectl logs <nombre_del_pod>
curl http://<endpoint_del_clúster>
```

Con esto, podemos ver si nuestra aplicación está corriendo, si el servicio está disponible, qué dicen los registros de la aplicación y probar si podemos acceder a ella desde el navegador.

También podemos usar AWS CLI para revisar que todo esté configurado como debe en la nube.

Así nos aseguramos de que nuestra aplicación está lista y funcionando para los usuarios.

## Pasos siguientes {id="pasos-siguientes"}

Aquí encontrarás más información sobre cómo sacarle más provecho a Amazon EKS con temas un poco más avanzados.

### Escalado automático {id="escalado-autom%C3%A1tico"}

El [escalado automático](https://docs.aws.amazon.com/es_es/eks/latest/userguide/cluster-autoscaler.html) es una manera de hacer que tu clúster de EKS se ajuste solo, según cuánto se necesite. Imagina que puedes hacer que tu clúster crezca o se encoja automáticamente si ve que tus aplicaciones necesitan más o menos recursos. Esto ayuda a que tu aplicación siempre funcione bien, sin gastar de más en recursos que no se están usando.

### CI/CD {id="ci%2Fcd"}

EKS también se puede conectar con sistemas de CI/CD, que son herramientas para automatizar los pasos de construir, probar y desplegar tu aplicación. Esto significa que cada vez que cambies algo en tu código, se puede configurar para que automáticamente se cree una nueva versión de tu aplicación, se pruebe y luego se ponga a funcionar en el clúster. Esto hace que mantener y actualizar tu aplicación sea más rápido y menos propenso a errores.

## Limpieza {id="limpieza"}

### Eliminar clúster {id="eliminar-cl%C3%BAster"}

Para quitar el clúster EKS que armamos, usamos otra vez eksctl:

```
eksctl delete cluster --name mi-cluster
```

Este comando hace que eksctl elimine todo lo que se creó para el clúster, como:

- Los servidores EC2
- Las protecciones de seguridad
- Las áreas de red
- El clúster EKS en sí

Así nos aseguramos de no tener gastos extra por un clúster que ya no vamos a usar.

### Verificar eliminación {id="verificar-eliminaci%C3%B3n"}

Luego de borrar el clúster, podemos chequear que realmente se haya ido con algunos comandos:

```
aws eks list-clusters
aws ec2 describe-instances
```

El primero debería mostrar que el clúster ya no está en EKS. El segundo no debería mostrar nada si los servidores EC2 asociados fueron eliminados correctamente.

También podemos intentar:

```
eksctl get cluster --region <region>
```

Para confirmar en la región específica que nuestro clúster ya no aparece.

Con estos pasos, podemos estar tranquilos de que el clúster se eliminó por completo y que no habrá más cargos en nuestra cuenta de AWS por esos recursos.

## Conclusión {id="conclusi%C3%B3n"}

### Recapitulación {id="recapitulaci%C3%B3n"}

- Aprendimos lo básico sobre Kubernetes y [Amazon EKS](https://aws.amazon.com/eks/), como qué son los clústeres, nodos, pods y servicios.
- Preparamos las herramientas que necesitamos: AWS CLI, kubectl y eksctl.
- Creamos un clúster de EKS con la ayuda de eksctl.
- Pusimos a correr una aplicación de ejemplo usando archivos YAML.
- Chequeamos que la aplicación estuviera trabajando correctamente.
- Borramos el clúster de EKS que habíamos creado.

### Próximos pasos {id="pr%C3%B3ximos-pasos"}

Aquí hay algunas ideas de lo que puedes hacer después:

- Aprender a conectar tu proyecto con herramientas de CI/CD para que los despliegues se hagan solos.
- Activar el escalado automático para que tu aplicación se ajuste sola según la demanda.
- Mover aplicaciones que ya tienes a Amazon EKS.
- Buscar cómo hacer que tu proyecto cueste menos y funcione mejor.
- Añadir formas de ver qué está pasando con tu aplicación y solucionar problemas.
- Asegurarte de que solo las personas correctas puedan acceder a tu proyecto.

Con lo que vimos hoy, ya tienes un buen punto de partida para empezar a usar Kubernetes con Amazon EKS.

## Preguntas relacionadas {id="preguntas-relacionadas"}

### ¿Cómo desplegar una aplicación en AWS? {id="%C2%BFc%C3%B3mo-desplegar-una-aplicaci%C3%B3n-en-aws%3F"}

Para desplegar una aplicación que usa contenedores en AWS, puedes seguir estos pasos básicos:

- Elige la imagen de Docker que quieras usar, como puede ser Nginx o Node.js.
- Sube esa imagen a un lugar donde se guardan imágenes de contenedores, como Amazon ECR.
- Crea un archivo llamado Dockerfile donde defines cómo debe correr tu aplicación.
- Usa un servicio de AWS como Amazon ECS, Amazon EKS o AWS Fargate para ejecutar tu aplicación.
- Para manejar mejor el tráfico que llega a tu aplicación, puedes usar un balanceador de carga como Application Load Balancer.
- Si necesitas que tu aplicación crezca o se reduzca según la demanda, configura servicios de auto-scaling.
- Para mantener todo bajo control, usa CloudWatch para ver los logs y métricas de tu aplicación.

### ¿Qué es Amazon EKS? {id="%C2%BFqu%C3%A9-es-amazon-eks%3F"}

Amazon EKS es un servicio que te permite usar Kubernetes, una herramienta para manejar aplicaciones en contenedores, de manera fácil en AWS. Con EKS, puedes hacer que tus aplicaciones sean más fiables y escalables sin tener que preocuparte por los detalles técnicos de Kubernetes.

### ¿Qué servicio se utiliza para ejecutar aplicaciones en contenedores en AWS? {id="%C2%BFqu%C3%A9-servicio-se-utiliza-para-ejecutar-aplicaciones-en-contenedores-en-aws%3F"}

Para correr aplicaciones en contenedores en AWS, el servicio principal es Amazon Elastic Container Service (Amazon ECS). ECS te ayuda a manejar tus contenedores, permitiéndote iniciar, detener y escalarlos fácilmente. AWS Fargate es otra opción que permite correr contenedores sin tener que gestionar servidores.

### ¿Qué es Ingress en AWS? {id="%C2%BFqu%C3%A9-es-ingress-en-aws%3F"}

Ingress es una manera de hacer que las aplicaciones que corren en Kubernetes estén disponibles en internet de forma segura y eficiente. AWS tiene una herramienta llamada AWS Load Balancer Controller que ayuda a manejar los balanceadores de carga para el tráfico de Ingress, asegurando que tu aplicación sea fiable y pueda manejar bien el tráfico.

## Related posts

- [Opciones para Desplegar Contenedores en AWS: ECS y EKS](/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/)
- [Cómo Desplegar Contenedores en AWS](/blog/como-desplegar-contenedores-en-aws/)
- [Mejores Prácticas Para Amazon EKS](/blog/mejores-practicas-para-amazon-eks/)
- [Mejores Prácticas Para Amazon ECS](/blog/mejores-practicas-para-amazon-ecs/)
