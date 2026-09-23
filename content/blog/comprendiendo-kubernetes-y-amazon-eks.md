+++
url = "/blog/comprendiendo-kubernetes-y-amazon-eks/"
title = "Comprendiendo Kubernetes y Amazon EKS"
description = "Amazon EKS es una excelente opción para usar Kubernetes en AWS. Descubre cómo funciona, sus ventajas, cómo implementarlo y cómo gestionar aplicaciones en este servicio."
date = "2024-03-09T03:21:48.687000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/066e0f22ea88769f71d0c03924af25b54b42b02fb4df344456df49b10b3a6c3d.jpg"
archive_order = 144

[[related]]
title = "Correlación de Eventos con Step Functions y CloudWatch"
url = "/blog/correlacion-de-eventos-con-step-functions-y-cloudwatch/"
image = "/assets/blog/1ddc83af1d16737de7b3fdb8177042b5928f068f18886308ad15336603db7ff9.jpg"

[[related]]
title = "AWS Lambda: Costo vs. Rendimiento"
url = "/blog/aws-lambda-costo-vs-rendimiento/"
image = "/assets/blog/e7d2b8371eaa07e84e5400f57a94ccf4e756a3a11530661ccd6384a74d798994.jpg"

[[related]]
title = "AWS curso certificado: preguntas frecuentes"
url = "/blog/aws-curso-certificado-preguntas-frecuentes/"
image = "/assets/blog/39294214939c4754eb0b11e2890fbaa60074537162e5d1763964e13471ac9bb3.jpg"
+++

Si estás explorando cómo ejecutar y gestionar aplicaciones en la nube de AWS, aquí te presentamos una guía sobre Kubernetes y Amazon EKS. Kubernetes es una herramienta que facilita la ejecución de aplicaciones en contenedores en múltiples entornos, mientras que Amazon EKS simplifica el uso de Kubernetes en AWS. A continuación, desglosamos los componentes clave de Kubernetes, cómo Amazon EKS mejora la experiencia de Kubernetes, y brindamos un paso a paso para implementar tu propio clúster de EKS.

- **Kubernetes**: Sistema para automatizar la implementación, escalado y gestión de aplicaciones en contenedores.
- **Amazon EKS**: Servicio de AWS que facilita el uso de Kubernetes, encargándose de tareas como la configuración, el mantenimiento y la escalabilidad.
- **Componentes de Kubernetes**: Incluyen Pods, Deployments, Services, Ingress, ConfigMaps y Secrets.
- **Implementación de un clúster de** [**Amazon EKS**](https://aws.amazon.com/eks/): Te guiamos a través de los requisitos previos y pasos para crear y configurar tu clúster.
- **Gestión y seguridad**: Consejos para administrar aplicaciones, escalar recursos, actualizar componentes y asegurar tu clúster.
- **Monitoreo y registro**: Herramientas de AWS como CloudWatch y X-Ray para supervisar el desempeño y registrar actividades.
- **Casos de uso**: Exploramos cómo EKS puede ser utilizado para procesamiento de datos, aplicaciones web y aprendizaje automático.
- **Comparación con otras plataformas**: Ventajas de EKS frente a Google Kubernetes Engine, Azure Kubernetes Service y Red Hat OpenShift.

En resumen, Amazon EKS ofrece una plataforma robusta y segura para desplegar aplicaciones escalables y confiables en Kubernetes, aprovechando la infraestructura de AWS.

### Kubernetes Pods {id="kubernetes-pods"}

- Son como la pieza más pequeña de Kubernetes. Aquí es donde viven uno o más contenedores, compartiendo lo que necesitan para funcionar.
- Cada pod es como una mini-aplicación que funciona por su cuenta.
- Los pods no duran para siempre. Se crean y se eliminan según sea necesario.

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: myimage:v1
```

### Deployments {id="deployments"}

- Ayudan a mantener los pods organizados y funcionando como deberían. Te permiten controlar cuántas copias de un pod quieres y cómo actualizarlos.
- Aseguran que tu aplicación siempre esté disponible, incluso cuando estás haciendo cambios.
- Puedes cambiar de versión de forma segura y controlada.

```
apiVersion: apps/v1
kind: Deployment 
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myimage:v1
```

### Services {id="services"}

- Proporcionan una dirección IP fija para que puedas acceder a tus pods. Esto ayuda a distribuir el tráfico entre varios pods.
- Crean una forma de llegar a tus pods sin tener que saber exactamente dónde están.
- Existen diferentes tipos, como ClusterIP, NodePort y LoadBalancer, dependiendo de cómo quieras que se acceda a tus servicios.

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service 
spec:
  type: ClusterIP  
selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 80
```

### Ingress {id="ingress"}

- Es como una puerta de entrada para tus servicios HTTP, permitiendo que el tráfico de internet llegue a tus aplicaciones.
- Puedes configurar reglas para controlar cómo y a qué parte de tu aplicación llega este tráfico.
- Soporta funciones avanzadas como SSL, que ayuda a mantener seguras las conexiones a tus servicios.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.mydomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port: 
              number: 80
```

### ConfigMaps y Secrets {id="configmaps-y-secrets"}

- Son como cajas fuertes donde puedes guardar la configuración y las contraseñas que tus aplicaciones necesitan.
- Esto ayuda a mantener separada la configuración de tu código, haciendo más fácil hacer cambios.
- Los secrets son especiales porque guardan información sensible de forma segura.

```
apiVersion: v1
kind: ConfigMap 
metadata:
  name: myapp-config
data:
  database_url: mysql://user:pass@mysql 
  api_key: 1s93j1dk3k
---
apiVersion: v1  
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  db_password: sUp3rS3cr37P@ssw0rd
```

En resumen, Kubernetes ofrece muchas herramientas para manejar aplicaciones y servicios en contenedores de manera eficiente y a gran escala. Con estos componentes, puedes configurar y controlar clusters complejos de forma sencilla.

## Introducción a Amazon EKS {id="introducci%C3%B3n-a-amazon-eks"}

Amazon Elastic Kubernetes Service (Amazon EKS) te permite usar Kubernetes en AWS sin tener que lidiar con la configuración y el mantenimiento complicados. Básicamente, hace el trabajo pesado por ti, para que puedas concentrarte en tus aplicaciones.

### Características principales {id="caracter%C3%ADsticas-principales"}

- **Plano de control totalmente administrado**: Amazon EKS se asegura de que la parte central de Kubernetes esté siempre disponible y funcionando.
- **Fácil integración con otros servicios de AWS**: Puedes conectarlo fácilmente con otros servicios de AWS para mejorar tus aplicaciones.
- **Optimización de costos**: Con herramientas como autoscaling y spot instances, puedes gastar menos.
- **Alta disponibilidad**: Tus aplicaciones pueden correr en diferentes lugares al mismo tiempo para que siempre estén disponibles.
- **Actualizaciones automáticas**: Amazon EKS actualiza tu sistema por ti a la última versión.
- **Grupos de nodos administrados**: Facilita la gestión de los servidores donde corren tus aplicaciones.
- **Consola alojada**: Una herramienta central desde donde puedes manejar todo fácilmente.
- **Seguridad integrada**: Usa herramientas de seguridad de AWS para proteger tus aplicaciones.

### Ventajas sobre Kubernetes Autogestionado {id="ventajas-sobre-kubernetes-autogestionado"}

Usar EKS tiene sus beneficios comparado con manejar Kubernetes por tu cuenta:

- No necesitas ser un experto en Kubernetes.
- Te ahorras mucho trabajo en actualizaciones y mantenimiento.
- Aprovechas la infraestructura de AWS, que es confiable y segura.
- Puedes concentrarte más en crear tus aplicaciones que en manejar infraestructura.
- Puede salir más barato porque usas los recursos de manera más eficiente.
- Cuenta con garantías de que va a estar disponible cuando lo necesites.

En pocas palabras, EKS hace más fácil usar Kubernetes en AWS al cuidar de la parte complicada. Esto te permite enfocarte en desarrollar aplicaciones escalables y confiables, siguiendo las mejores prácticas de Kubernetes.

## Arquitectura de [Amazon EKS](https://aws.amazon.com/eks/) {id="arquitectura-de-amazon-eks"}

![Amazon EKS](/assets/blog/d95b4fa6cbcc136e0470fe7f6e542c5aea477212ceee14ffa1e5f135533f650b.jpg)

### Plano de control gestionado {id="plano-de-control-gestionado"}

El plano de control de EKS lo maneja AWS por completo. Incluye varios componentes que funcionan en distintas zonas para asegurarse de que todo esté siempre disponible:

- **Servidores API de Kubernetes**: Son los que organizan todo el trabajo en el clúster y atienden las solicitudes.
- **etcd**: Guarda toda la información importante del clúster de manera segura.
- [**AWS IAM**](https://aws.amazon.com/iam/) **Authenticator**: Ayuda a que solo las personas autorizadas puedan acceder.

AWS se encarga de que estos componentes estén siempre en funcionamiento, sin que tengas que hacer nada.

### Nodos de trabajo {id="nodos-de-trabajo"}

Los nodos de trabajo son las computadoras donde tus aplicaciones viven. Puedes elegir entre dos tipos:

- **Nodos administrados**: AWS se ocupa de todo, desde ponerlos en marcha hasta mantenerlos actualizados.
- **Nodos autogestionados**: Tú tienes el control completo sobre ellos.

Puedes usar diferentes tipos de máquinas según lo que necesites y ahorrar usando opciones como Spot Instances.

### Redes y seguridad {id="redes-y-seguridad"}

EKS prepara todo el entorno de red dentro de una VPC y usa varias herramientas para mantener todo seguro, como grupos de seguridad y registros de flujo de VPC.

También usa varias características de seguridad de AWS, como [IAM](https://aws.amazon.com/es/iam/) y CloudTrail, para proteger tus aplicaciones.

### Escalabilidad y disponibilidad {id="escalabilidad-y-disponibilidad"}

Puedes tener clústeres EKS en diferentes regiones y zonas para asegurarte de que tus aplicaciones siempre estén disponibles.

Con los grupos de escalado automático de EKS, tus nodos pueden aumentar o disminuir según lo que necesites, asegurando que siempre tengas la cantidad adecuada.

En resumen, EKS te facilita mucho el uso de Kubernetes en AWS al cuidar de todo el manejo complicado y ofrecerte varias opciones para mantener tus aplicaciones seguras y funcionando bien.

## Implementando un clúster de Amazon EKS {id="implementando-un-cl%C3%BAster-de-amazon-eks"}

Para montar un clúster de Amazon EKS, hay unos pasos sencillos que seguir. Aquí te mostramos cómo hacerlo paso a paso.

### Requisitos previos {id="requisitos-previos"}

Antes de empezar, asegúrate de tener:

- Una cuenta en AWS
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) instalada y lista en tu computadora
- Un par de llaves SSH listas para usar

También es útil saber un poco sobre:

- Cómo funciona Kubernetes, incluyendo pods, servicios y despliegues
- Amazon EC2 y VPC
- Cómo manejar Linux

### 1. Crear el clúster de EKS {id="1.-crear-el-cl%C3%BAster-de-eks"}

Vamos a usar la línea de comandos de AWS para crear nuestro clúster. Esto configura el núcleo de Kubernetes y los permisos básicos por nosotros.

```
eksctl create cluster \
  --name mi-clúster \
  --version 1.21 \
  --region us-west-2 \
  --nodegroup-name trabajadores-estándar \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4
```

Esto puede tardar unos 10 minutos. Una vez terminado, tendrás tu clúster de EKS listo.

### 2. Instalar [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) {id="2.-instalar-kubectl"}

![kubectl](/assets/blog/d8ddb5305e6f91903b343c2cd5b7d7485c9ed3b6d8d83049c33494d8d5722e4b.jpg)

Necesitamos kubectl, una herramienta para manejar Kubernetes. Aquí te mostramos cómo instalarla y conectarla con tu clúster.

```
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.21.2/2021-07-05/bin/linux/amd64/kubectl

chmod +x ./kubectl
mv ./kubectl /usr/local/bin

eksctl utils write-kubeconfig --cluster=mi-clúster --region=us-west-2
```

Ahora, kubectl está listo para usar con tu clúster.

### 3. Desplegar una aplicación de ejemplo {id="3.-desplegar-una-aplicaci%C3%B3n-de-ejemplo"}

Para ver si todo funciona, vamos a poner una aplicación web sencilla.

Primero creamos un despliegue y un servicio para la aplicación:

```
kubectl create deployment hola-app --image=paulbouwer/hello-kubernetes:1.7
kubectl expose deployment hola-app --type=LoadBalancer --port=8080
```

Después, revisamos que el pod se haya creado sin problemas:

```
kubectl get pods
```

Y para terminar, buscamos la IP externa para acceder a la aplicación:

```
kubectl get service hola-app
```

Si ponemos esa IP en el navegador, deberíamos ver nuestra aplicación de prueba.

¡Y eso es todo! Con estos pasos ya tienes tu clúster de Kubernetes corriendo en AWS. Ahora puedes empezar a montar tus propias aplicaciones.

## Administrando aplicaciones en Amazon EKS {id="administrando-aplicaciones-en-amazon-eks"}

Cuando se trata de manejar tus aplicaciones y servicios en Amazon EKS, puede parecer un poco complicado. Aquí te dejo algunos consejos y prácticas recomendadas para hacerlo más sencillo:

### Escalabilidad {id="escalabilidad"}

- Usa grupos de nodos administrados para ajustar fácilmente la cantidad de nodos según lo que necesites. Esto te permite subir o bajar la capacidad con un comando simple.
- Activa el autoscaling en tus grupos de nodos para que se ajusten automáticamente según lo que necesiten, como más CPU o memoria. Así, siempre tendrás los recursos que necesitas.
- Considera usar [AWS Fargate](https://aws.amazon.com/fargate/) para correr tus pods sin tener que preocuparte por los nodos. Solo pagas por lo que usas.
- Reparte tus cargas de trabajo en varios clústeres o regiones para que, si algo falla, no afecte tanto. Herramientas como [eksctl](https://eksctl.io/) hacen más fácil manejar varios clústeres.

### Actualizaciones {id="actualizaciones"}

- Es importante mantener todo actualizado, tanto los nodos como el plano de control, para tener las últimas mejoras y parches de seguridad. EKS ayuda mucho con esto.
- Usa estrategias como despliegues azul/verde o canarios para hacer cambios de manera segura. Así, puedes evitar problemas mayores.
- Antes de hacer cambios grandes, pruébalos en un ambiente aparte para asegurarte de que todo funcione bien.

### Conceptos avanzados {id="conceptos-avanzados"}

- Usa ConfigMaps y Secrets para separar la configuración de tu código. Esto hace más fácil hacer cambios y manejar datos importantes.
- Explora opciones como Jobs, CronJobs y DaemonSets para tareas especiales, como trabajos por lotes o tareas programadas.
- Activa el monitoreo de tu clúster para ver cómo va todo y solucionar problemas. Herramientas como Prometheus y Grafana pueden ayudar.
- Establece límites de recursos y políticas de reinicio para tus pods. Esto ayuda a que todo sea más estable y evita que un pod con problemas use demasiado recurso.

Siguiendo estos consejos, podrás manejar tus aplicaciones en EKS de manera más eficiente, asegurando que todo escale y se actualice sin problemas, aprovechando lo mejor de Kubernetes.

## Seguridad en Amazon EKS {id="seguridad-en-amazon-eks"}

Amazon EKS te da varias herramientas para mantener tus clústeres de Kubernetes seguros. Vamos a ver las más importantes:

### Integración con servicios de AWS {id="integraci%C3%B3n-con-servicios-de-aws"}

EKS usa otros servicios de AWS para proteger tu clúster:

- [**IAM**](https://aws.amazon.com/es/iam/): Te permite controlar quién puede hacer qué con roles y políticas específicas.
- **VPC**: Mantiene el tráfico de tu clúster separado del resto del internet, en un espacio privado.
- **CloudTrail**: Lleva un registro de quién hace qué en EKS, útil para revisar actividades.
- **Security Groups**: Ayuda a controlar quién puede acceder a tus nodos del clúster.

### Cuentas de servicio IAM {id="cuentas-de-servicio-iam"}

Puedes conectar roles de IAM con cuentas de servicio de Kubernetes. Esto significa que puedes dar permisos específicos a cada parte de tu aplicación, según lo que necesite hacer.

### Redes y seguridad nativa {id="redes-y-seguridad-nativa"}

EKS incluye varias medidas de seguridad listas para usar:

- [**RBAC**](https://kubernetes.io/docs/reference/access-authn-authz/rbac/): Un sistema que controla qué pueden hacer los usuarios dentro de Kubernetes.
- **Security Contexts**: Limita lo que pueden hacer los contenedores en tu aplicación.
- **Network Policies**: Te permite definir reglas específicas sobre cómo los componentes de tu aplicación pueden comunicarse entre sí.

### Opciones avanzadas {id="opciones-avanzadas"}

EKS también ofrece funciones de seguridad más avanzadas:

- **Clústeres privados**: Tu clúster no está expuesto al internet, solo vive dentro de tu VPC.
- **Encriptado de datos**: Protege tus datos sensibles cifrándolos.
- **Verificación de imágenes**: Asegura que solo uses contenedores de fuentes de confianza.

### Buenas prácticas {id="buenas-pr%C3%A1cticas"}

Aquí van algunos consejos extra:

- Siempre mantén tu clúster y nodos actualizados.
- Da solo los permisos necesarios, nada más.
- Revisa tus registros y métricas regularmente para detectar posibles problemas.
- Haz pruebas de seguridad para encontrar y arreglar vulnerabilidades.

Siguiendo estos consejos, puedes hacer que tu clúster EKS sea mucho más seguro para tus aplicaciones.

## Monitoreo y registro en Amazon EKS {id="monitoreo-y-registro-en-amazon-eks"}

Amazon EKS te da herramientas para que puedas ver qué está pasando en tu clúster de Kubernetes y registrar información importante. Esto es fundamental para entender el comportamiento de tu clúster y poder arreglar problemas o mejorar cómo funciona.

### Monitoreo con CloudWatch {id="monitoreo-con-cloudwatch"}

CloudWatch es un servicio de AWS que te permite seguir de cerca diferentes aspectos de tu clúster. Puedes ver cuánto están trabajando tus nodos, cuántos pods tienes y cómo están, cuántas veces se usa la API de Kubernetes y más.

Algunas cosas que puedes vigilar son:

- Cuánto están usando de CPU y memoria los nodos
- Cuántos pods tienes y en qué estado están (si están esperando, corriendo o si alguno falló)
- Cuántas veces se hacen peticiones a la API de Kubernetes y si hay errores
- Cuánto tiempo llevan corriendo tus servicios

Con CloudWatch, puedes crear tableros para ver estas métricas de manera gráfica y configurar alertas por si algo no va bien.

### Registros con CloudWatch Logs {id="registros-con-cloudwatch-logs"}

Puedes mandar los registros de tus aplicaciones y del sistema a CloudWatch Logs. Esto te permite:

- Buscar en los registros en tiempo real
- Filtrar y organizar tus registros
- Crear métricas basadas en la información de los registros
- Guardar tus registros de forma segura y a bajo costo

También puedes usar herramientas como Grafana o Kibana para revisar tus registros más fácilmente.

### Trazabilidad distribuida con X-Ray {id="trazabilidad-distribuida-con-x-ray"}

AWS X-Ray te ayuda a entender cómo se comunican tus servicios en EKS mostrándote por dónde pasa el tráfico. Con X-Ray puedes ver:

- Dónde se están demorando tus servicios
- Detectar errores y problemas
- Ver cuánto tiempo tardan las comunicaciones entre servicios

Solo necesitas agregar el daemon de X-Ray a tus pods para empezar a recoger esta información sin tener que cambiar tu código.

### AWS Control Tower {id="aws-control-tower"}

Control Tower te da una visión general y control sobre tus entornos de AWS, incluyendo EKS. Con este servicio puedes:

- Ver si hay configuraciones de seguridad que no están bien
- Recibir consejos sobre cómo mejorar
- Tener una vista completa de lo que pasa en todas tus cuentas de AWS

Esto hace mucho más fácil manejar entornos complicados en AWS.

En resumen, EKS te ofrece varias maneras de mantener un ojo en tus aplicaciones, usando servicios de AWS. Esto te ayuda a tener un mejor control y entender mejor cómo funcionan tus aplicaciones en Kubernetes.

## Casos de uso {id="casos-de-uso"}

### Procesamiento de datos {id="procesamiento-de-datos"}

Kubernetes es genial para trabajos que necesitan mucho poder de cómputo, como analizar datos o aprender de ellos. Aquí hay algunas formas en que Amazon EKS puede ayudar:

- Usar Spark en Kubernetes para trabajar con montones de datos al mismo tiempo
- Entrenar modelos de inteligencia artificial con muchos datos
- Usar trabajos de Kubernetes para transformar datos
- Usar Memcached para hacer que acceder a datos analíticos sea más rápido
- Mostrar datos en tiempo real para paneles de control

Amazon EKS puede ajustar los recursos rápidamente para manejar más trabajo y repartir las tareas entre varios lugares.

### Aplicaciones web {id="aplicaciones-web"}

EKS es perfecto para aplicaciones web que necesitan estar disponibles todo el tiempo y responder rápidamente a muchos usuarios:

- Se ajusta y balancea las cargas de trabajo automáticamente para manejar más visitas
- Permite actualizar sin interrumpir el servicio
- Puede atender a usuarios en internet y en redes internas
- Se conecta fácilmente con otros servicios de AWS
- Simplifica el proceso de desarrollo y despliegue de software

Algunos ejemplos incluyen:

- APIs
- Aplicaciones con frameworks modernos como React o Vue
- Backends para aplicaciones, usando Node.js o Python
- Tiendas en línea con muchos visitantes

### Aprendizaje automático {id="aprendizaje-autom%C3%A1tico"}

Con EKS, puedes entrenar modelos de inteligencia artificial distribuyendo el trabajo y usando tarjetas gráficas especiales:

- Usa computadoras especiales con GPUs para entrenar modelos complejos
- Reparte el trabajo entre varios lugares para hacerlo más rápido
- Ofrece modelos entrenados para usar en aplicaciones grandes
- Organiza y controla los datos usados para entrenar

Algunos servicios de AWS que funcionan bien con esto son:

- SageMaker, para entrenar modelos grandes
- Lambda, para usar modelos sin servidores
- S3, para guardar datos y modelos

## Comparando Amazon EKS con otras plataformas Kubernetes {id="comparando-amazon-eks-con-otras-plataformas-kubernetes"}

Amazon EKS es un servicio de Kubernetes administrado que nos da muchas ventajas, pero hay otras opciones que también son buenas y que podrían interesarte. Aquí vamos a ver cómo Amazon EKS se compara con otras plataformas como Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS) y Red Hat OpenShift.

### Características principales {id="caracter%C3%ADsticas-principales-1"}

| Característica | Amazon EKS | Google GKE | Azure AKS | Red Hat OpenShift |
| --- | --- | --- | --- | --- |
| Kubernetes administrado | Sí | Sí | Sí | Sí |
| Actualizaciones automáticas | Sí | Sí | Sí | Sí |
| Escalado automático | Sí | Sí | Sí | Sí |
| Integración con la nube | AWS | Google Cloud | Azure | Multi-cloud |
| Interfaz de usuario | Consola de EKS, eksctl | GKE UI, gcloud | Azure Portal, CLI | Web console, CLI |
| Redes y seguridad | VPC, IAM, Security Groups | VPC, IAM | VNet, RBAC | SDN, SELinux |
| Certificaciones | CKPS, PCI, HIPAA, SOC | CKPS, PCI, HIPAA, SOC | CKPS, PCI, HIPAA, SOC | CKPS, PCI, HIPAA, SOC |

### Google Kubernetes Engine (GKE) {id="google-kubernetes-engine-(gke)"}

GKE es el servicio de Kubernetes de Google Cloud. Funciona muy bien con otros servicios de Google Cloud.

**Ventajas:**

- Fácil de usar con otros servicios de Google Cloud
- Tiene una interfaz gráfica para manejar los clústeres
- Buen soporte y mucha documentación

**Desventajas:**

- Solo funciona en la nube de Google
- A veces es más caro
- No es tan personalizable

### Azure Kubernetes Service (AKS) {id="azure-kubernetes-service-(aks)"}

AKS es la opción de Kubernetes en Azure. Funciona muy bien con otras herramientas de Azure.

**Ventajas:**

- Fácil de empezar desde Azure Portal
- Bueno para proyectos que usan mucho Windows y .NET
- Ideal si ya usas mucho Microsoft

**Desventajas:**

- No se integra tan bien con servicios fuera de Azure
- La interfaz no es tan completa como otras opciones
- Necesitas saber bastante de Azure para usarlo bien

### Red Hat OpenShift {id="red-hat-openshift"}

OpenShift es una plataforma de Kubernetes para empresas, con más opciones de seguridad y herramientas.

**Ventajas:**

- Muchas opciones y soporte para empresas
- Muy personalizable
- Herramientas útiles para DevOps

**Desventajas:**

- Puede ser difícil de aprender
- Más caro que otras opciones
- Requiere más trabajo de tu parte que un servicio totalmente administrado

En resumen, EKS de AWS es una opción muy buena para usar Kubernetes, especialmente si ya usas otros servicios de AWS. Pero GKE, AKS y OpenShift también son buenas opciones dependiendo de lo que necesites. Lo importante es ver qué plataforma se ajusta mejor a lo que tu equipo necesita.

## Conclusión {id="conclusi%C3%B3n"}

Amazon EKS es una excelente opción para usar Kubernetes en AWS. Hace que sea mucho más fácil manejar un clúster de Kubernetes, dejándonos enfocarnos en crear y lanzar aplicaciones.

Algunos puntos clave sobre EKS son:

- **Fácil de usar**: Podemos tener un clúster de Kubernetes listo con solo unos pocos pasos, sin necesidad de ser expertos.
- **Se ajusta solo**: Podemos aumentar o reducir la capacidad de nuestro clúster según lo necesitemos.
- **Siempre disponible**: Gracias a AWS, nuestras aplicaciones pueden estar disponibles todo el tiempo.
- **Se lleva bien con otros servicios de AWS**: EKS trabaja bien con otros servicios de AWS, lo que nos ayuda a mejorar nuestras aplicaciones.
- **Seguro**: Usa las herramientas y prácticas de seguridad de AWS para proteger nuestros clústeres.
- **Siempre al día**: Nos mantiene con la versión más reciente de Kubernetes automáticamente.

EKS se ha ganado su lugar como uno de los mejores servicios de Kubernetes que hay. Tiene el respaldo oficial de Kubernetes y un gran apoyo de AWS.

Aunque hay otras opciones como Google Kubernetes Engine o Azure Kubernetes Service, EKS sobresale por su integración con AWS. Esto lo hace ideal si ya usamos otros servicios de AWS y queremos empezar con Kubernetes fácilmente.

En resumen, EKS nos facilita mucho la vida al momento de lanzar y manejar aplicaciones en la nube. Nos permite enfocarnos en lo importante: construir software de calidad, sin preocuparnos tanto por la infraestructura. Con las ventajas de Kubernetes y el apoyo de AWS, EKS es una plataforma sólida para nuestras aplicaciones importantes en la nube.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Qué es Kubernetes en AWS? {id="%C2%BFqu%C3%A9-es-kubernetes-en-aws%3F"}

Kubernetes es una herramienta que te ayuda a ejecutar y manejar aplicaciones que están divididas en pequeñas piezas, llamadas contenedores. AWS tiene un servicio llamado Amazon Elastic Kubernetes Service (Amazon EKS) que hace más fácil usar Kubernetes en la nube de AWS, manejando muchas de las tareas complicadas por ti.

### ¿Qué es Amazon EKS? {id="%C2%BFqu%C3%A9-es-amazon-eks%3F"}

Amazon EKS es un servicio que AWS ofrece para que puedas usar Kubernetes sin tener que preocuparte por configurar y mantener tu propio grupo de servidores para Kubernetes. AWS se encarga de las partes difíciles, como asegurarse de que hay suficientes servidores y que estos estén actualizados.

### ¿Qué es un clúster de EKS? {id="%C2%BFqu%C3%A9-es-un-cl%C3%BAster-de-eks%3F"}

Un clúster de EKS se compone de dos partes principales:

- **Plano de control**: Lo maneja AWS y se asegura de que el clúster esté siempre disponible y funcionando bien.
- **Plano de datos**: Son los servidores (pueden ser EC2 o Fargate) donde realmente se ejecutan tus aplicaciones en contenedores. Puedes elegir administrar estos servidores por ti mismo o dejar que AWS lo haga por ti.

Estas dos partes trabajan juntas para mantener tus aplicaciones funcionando en Kubernetes.

### ¿Qué es [Eksctl](https://eksctl.io/)? {id="%C2%BFqu%C3%A9-es-eksctl%3F"}

![Eksctl](/assets/blog/cde11b7c19ca616e625405fa12009e20aeeba1a8fa180f0146b163cd537924a7.jpg)Eksctl es una herramienta que puedes usar desde la línea de comandos para crear y manejar clústeres de EKS de manera fácil. Es como un atajo que te permite configurar todo tu clúster y los servidores con solo unos pocos comandos, ahorrándote mucho trabajo manual.

## Related posts

- [Mejores Prácticas Para Amazon ECS](/blog/mejores-practicas-para-amazon-ecs/)
- [Mejores Prácticas Para Amazon EKS](/blog/mejores-practicas-para-amazon-eks/)
- [Opciones para Desplegar Contenedores en AWS: ECS y EKS](/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/)
- [Cómo Desplegar Contenedores en AWS](/blog/como-desplegar-contenedores-en-aws/)
