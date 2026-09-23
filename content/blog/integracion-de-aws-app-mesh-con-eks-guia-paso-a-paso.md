+++
url = "/blog/integracion-de-aws-app-mesh-con-eks-guia-paso-a-paso/"
title = "Integración de AWS App Mesh con EKS: Guía paso a paso"
description = "Aprende a integrar AWS App Mesh con Amazon EKS para mejorar la comunicación entre microservicios, la disponibilidad y la seguridad de tus aplicaciones en la nube."
date = "2024-05-11T01:55:00.323000+00:00"
lastmod = "2024-05-11"
image = "/assets/blog/b6336599f042126db9b5d45ca4fe78d7513032e774db6be566d94c3c9939d25c.jpg"
archive_order = 81

[[related]]
title = "10 Consejos de Redes para AWS Outposts"
url = "/blog/10-consejos-de-redes-para-aws-outposts/"
image = "/assets/blog/d57b2c7f6d8d4785748ce1c5e820041b8b2ceca3b49c352cb994510b294e1014.jpg"

[[related]]
title = "Webinars y Eventos en AWS Marketplace"
url = "/blog/webinars-y-eventos-en-aws-marketplace/"
image = "/assets/blog/8f2a908f4bdb73449da17e826daf8e5ac4145d94e8be8bdaeb814a8a6e8b0ffc.jpg"

[[related]]
title = "Mejores Prácticas Para Amazon EKS"
url = "/blog/mejores-practicas-para-amazon-eks/"
image = "/assets/blog/5db43c07fa6733b87031347102716035bf731be1bb9bcaf83a58f4c8753144ae.jpg"
+++

[AWS App Mesh](https://aws.amazon.com/app-mesh/) es una malla de servicios que simplifica la comunicación entre microservicios en aplicaciones nativas de la nube. Esta guía detallada te mostrará cómo integrar App Mesh con [Amazon EKS](https://aws.amazon.com/eks/) para crear aplicaciones escalables, seguras y fáciles de mantener en un entorno de contenedores.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/LEK5M2aDqN0" >}}

## Beneficios Clave {id="beneficios-clave"}

- **Comunicación simplificada**: App Mesh facilita la comunicación entre microservicios, reduciendo la complejidad y mejorando la escalabilidad.
- **Mayor disponibilidad**: Monitorea el rendimiento y la disponibilidad de tus aplicaciones, permitiéndote identificar y solucionar problemas rápidamente.
- **Seguridad reforzada**: Proporciona una capa adicional de seguridad para proteger tus datos y aplicaciones.

## Pasos Principales {id="pasos-principales"}

1. **Configurar permisos de IAM**: Crea un rol de servicio vinculado a App Mesh y asigna los permisos necesarios.
2. **Instalar componentes de App Mesh**: Instala el controlador de App Mesh, las definiciones de recursos personalizados (CRDs) y otros componentes en tu clúster de EKS.
3. **Crear y configurar el servicio de App Mesh**: Crea la malla de servicio, nodos virtuales, routers y servicios para tus aplicaciones.
4. **Implementar aplicaciones con App Mesh**: Despliega tus aplicaciones en el clúster de EKS utilizando App Mesh.
5. **Probar la integración**: Verifica que tus aplicaciones funcionen correctamente con App Mesh.
6. **Monitorear recursos de App Mesh**: Utiliza herramientas como [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/) y [AWS X-Ray](https://aws.amazon.com/xray/) para monitorear el rendimiento y la disponibilidad de tus servicios.
7. **Limpiar el entorno de prueba**: Elimina los recursos de prueba para evitar conflictos futuros.

Sigue esta guía paso a paso para aprovechar al máximo la [integración de AWS App Mesh con EKS](/blog/comprendiendo-kubernetes-y-amazon-eks/) y crear aplicaciones nativas de la nube escalables, seguras y de alto rendimiento.

## Requisitos para la configuración de App Mesh y EKS {id="requisitos-para-la-configuraci%C3%B3n-de-app-mesh-y-eks"}

Antes de comenzar la integración, asegúrese de cumplir con los siguientes requisitos:

### Cuenta y clúster de EKS {id="cuenta-y-cl%C3%BAster-de-eks"}

- Una cuenta de AWS
- Un clúster de EKS configurado

### Herramientas necesarias {id="herramientas-necesarias"}

- La CLI de AWS configurada (versión 1.18.82 o superior)
- kubectl instalado (versión 1.13 o superior)
- jq instalado
- aws-iam-authenticator instalado (requerido para [eksctl](https://eksctl.io/))
- [helm](https://helm.sh/) instalado (versión 3.0 o superior)
- eksctl instalado (versión 0.21.0 o superior)

### Región de AWS {id="regi%C3%B3n-de-aws"}

Asegúrese de operar en la región `us-west-2` para este walkthrough.

```
export AWS_DEFAULT_REGION=us-west-2
```

Es importante cumplir con estos requisitos previos para garantizar una configuración exitosa de App Mesh con EKS.

## Paso 1: Configuración de permisos de IAM para App Mesh {id="paso-1%3A-configuraci%C3%B3n-de-permisos-de-iam-para-app-mesh"}

Para configurar correctamente App Mesh con EKS, es necesario configurar los permisos de IAM adecuados. En este paso, crearemos un rol de servicio vinculado a App Mesh y asignaremos los permisos necesarios para que el clúster de EKS pueda interactuar con App Mesh.

Primero, debemos crear un rol de servicio vinculado a App Mesh. Puede hacerlo mediante la consola de IAM o utilizando la CLI de AWS. Si ha creado un mesh después del 5 de junio de 2019, App Mesh habrá creado el rol de servicio vinculado automáticamente. Sin embargo, si ha eliminado este rol y necesita crearlo nuevamente, puede seguir los mismos pasos para recrear el rol en su cuenta.

### Crear un rol de servicio vinculado a App Mesh {id="crear-un-rol-de-servicio-vinculado-a-app-mesh"}

Puede crear un rol de servicio vinculado a App Mesh utilizando la CLI de AWS con el siguiente comando:

```
aws iam create-service-linked-role --aws-service-name appmesh.amazonaws.com
```

### Asignar permisos al rol de servicio vinculado {id="asignar-permisos-al-rol-de-servicio-vinculado"}

Una vez que haya creado el rol de servicio vinculado, debemos asignar los permisos necesarios para que el clúster de EKS pueda interactuar con App Mesh. Para hacerlo, agregaremos la política `AWSAppMeshFullAccess` al rol de servicio vinculado.

Puede asignar los permisos utilizando el siguiente comando:

```
aws iam attach-role-policy --role-name <role-name> --policy-arn arn:aws:iam::aws:policy/AWSAppMeshFullAccess
```

Donde `<role-name>` es el nombre del rol de servicio vinculado que creó anteriormente.

Una vez que haya configurado los permisos de IAM adecuados, estará listo para instalar los componentes de App Mesh en su clúster de EKS.

## Paso 2: Instalar componentes de App Mesh {id="paso-2%3A-instalar-componentes-de-app-mesh"}

Para instalar los componentes de App Mesh, seguimos los pasos descritos en la documentación oficial de AWS. Primero, debemos instalar el controlador de App Mesh para Kubernetes y las definiciones de recursos personalizados (CRDs) necesarias en nuestro clúster.

### Componentes de App Mesh {id="componentes-de-app-mesh"}

Los componentes de App Mesh que se instalarán son:

| Componente | Descripción |
| --- | --- |
| Controlador de CRD | Se encarga de administrar las definiciones de recursos personalizados en nuestro clúster. |
| Controlador de admisión | Se encarga de admitir y rechazar solicitudes de entrada y salida en nuestro clúster. |
| Servicio de telemetría | Se encarga de recopilar y enviar métricas y registros de nuestro clúster. |
| Operador de entrega progresiva | Se encarga de implementar y administrar la entrega progresiva de aplicaciones en nuestro clúster. |

Para instalar los componentes de App Mesh, podemos ejecutar el siguiente comando:

```
eksctl create iamserviceaccount --cluster <cluster-name> --namespace appmesh-system --name appmesh-controller --attach-policy-arn arn:aws:iam::aws:policy/AWSAppMeshFullAccess --override-existing-serviceaccounts --approve
```

Donde `<cluster-name>` es el nombre de nuestro clúster de EKS.

Una vez que hayamos instalado los componentes de App Mesh, podemos proceder a configurar el servicio de App Mesh para nuestro clúster de EKS.

## Paso 3: Crear y configurar el servicio de App Mesh {id="paso-3%3A-crear-y-configurar-el-servicio-de-app-mesh"}

Ahora que hemos instalado los componentes de App Mesh, podemos crear y configurar el servicio de App Mesh para nuestro clúster de EKS. Para hacer esto, utilizaremos la CLI de AWS para crear la malla de servicio de App Mesh, junto con los nodos virtuales, routers y servicios necesarios para nuestras aplicaciones.

### Crear la malla de servicio de App Mesh {id="crear-la-malla-de-servicio-de-app-mesh"}

Primero, creamos la malla de servicio de App Mesh con el siguiente comando:

```
aws appmesh create-mesh --mesh-name my-mesh
```

Donde `my-mesh` es el nombre de nuestra malla de servicio de App Mesh.

### Crear nodos virtuales, routers y servicios {id="crear-nodos-virtuales%2C-routers-y-servicios"}

A continuación, creamos un nodo virtual, un router virtual y un servicio con los siguientes comandos:

```
aws appmesh create-virtual-node --mesh-name my-mesh --virtual-node-name my-node
aws appmesh create-virtual-router --mesh-name my-mesh --virtual-router-name my-router
aws appmesh create-service --mesh-name my-mesh --service-name my-service
```

Donde `my-node` es el nombre de nuestro nodo virtual, `my-router` es el nombre de nuestro router virtual y `my-service` es el nombre de nuestro servicio.

### Configurar la ruta del tráfico {id="configurar-la-ruta-del-tr%C3%A1fico"}

Una vez que hemos creado todos los componentes de App Mesh, podemos proceder a configurar la ruta del tráfico para nuestro servicio.

**Recapitulación de los pasos**

| Paso | Descripción |
| --- | --- |
| 1 | Crear la malla de servicio de App Mesh |
| 2 | Crear nodos virtuales, routers y servicios |
| 3 | Configurar la ruta del tráfico |

Una vez que hayamos completado estos pasos, estaremos listos para implementar nuestras aplicaciones en nuestro clúster de EKS con App Mesh.

## Paso 4: Implementar aplicaciones con App Mesh {id="paso-4%3A-implementar-aplicaciones-con-app-mesh"}

Ahora que hemos configurado el servicio de App Mesh, podemos implementar nuestras aplicaciones en nuestro clúster de EKS. Para hacer esto, debemos crear un archivo de configuración de Kubernetes que defina nuestros servicios y deployments.

### Crear un archivo de configuración de [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) {id="crear-un-archivo-de-configuraci%C3%B3n-de-kubernetes"}

![Kubernetes](/assets/blog/95f75593dcc7bc43413e1d9be6143fd188c2428acb347773d0e84037900dd7c2.jpg)

Primero, creamos un archivo de configuración de Kubernetes que defina nuestros servicios y deployments. Por ejemplo, podemos crear un archivo `deployment.yaml` con el siguiente contenido:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 80
```

Este archivo define un deployment llamado `my-app` que ejecuta tres réplicas del contenedor `my-app:latest` y expone el puerto 80.

### Aplicar la configuración de Kubernetes {id="aplicar-la-configuraci%C3%B3n-de-kubernetes"}

Una vez que hemos creado el archivo de configuración de Kubernetes, podemos aplicar la configuración a nuestro clúster de EKS utilizando el comando `kubectl apply`:

```
kubectl apply -f deployment.yaml
```

Este comando aplica la configuración definida en el archivo `deployment.yaml` a nuestro clúster de EKS.

### Configurar el proxy de App Mesh {id="configurar-el-proxy-de-app-mesh"}

Finalmente, debemos configurar el proxy de App Mesh para que nuestros servicios se comuniquen entre sí. Para hacer esto, podemos crear un archivo de configuración de App Mesh que defina la ruta del tráfico para nuestro servicio. Por ejemplo, podemos crear un archivo `appmesh.yaml` con el siguiente contenido:

```
apiVersion: appmesh.k8s.aws/v1beta2
kind: VirtualService
metadata:
  name: my-app
spec:
  aws:
    appMesh:
      meshName: my-mesh
  virtualRouter:
    name: my-router
```

Este archivo define un VirtualService llamado `my-app` que se comunica con el router virtual `my-router` en la malla de servicio `my-mesh`.

### Conclusión {id="conclusi%C3%B3n"}

En este paso, hemos implementado nuestras aplicaciones en nuestro clúster de EKS utilizando App Mesh. Hemos creado un archivo de configuración de Kubernetes que define nuestros servicios y deployments, y hemos configurado el proxy de App Mesh para que nuestros servicios se comuniquen entre sí. En el próximo paso, probaremos nuestra aplicación para asegurarnos de que funcione correctamente.

## Paso 5: Probar la Aplicación Integrada {id="paso-5%3A-probar-la-aplicaci%C3%B3n-integrada"}

Ahora que hemos configurado y desplegado nuestras aplicaciones con App Mesh, es hora de probar la integración para asegurarnos de que funcione correctamente. Para hacer esto, podemos utilizar la aplicación de ejemplo de color y un pod de curler del repositorio de aws-app-mesh-examples.

Primero, debemos clonar el repositorio de aws-app-mesh-examples y cambiar a la carpeta correspondiente:

```
git clone https://github.com/aws/aws-app-mesh-examples.git
cd aws-app-mesh-examples/examples/colorapp
```

A continuación, podemos desplegar la aplicación de ejemplo de color utilizando el comando `kubectl apply`:

```
kubectl apply -f colorapp.yaml
```

Una vez que la aplicación esté desplegada, podemos probar la integración utilizando un pod de curler. Primero, debemos crear un archivo de configuración de Kubernetes para el pod de curler:

```
apiVersion: v1
kind: Pod
metadata:
  name: curler
spec:
  containers:
  - name: curler
    image: curlimages/curl:7.73.0
    command: ["/bin/sh", "-c"]
    args:
    - while true; do
        curl -s http://colorapp:8080/color;
        sleep 1;
      done
```

Luego, podemos desplegar el pod de curler utilizando el comando `kubectl apply`:

```
kubectl apply -f curler.yaml
```

Una vez que el pod de curler esté desplegado, podemos verificar que la aplicación de ejemplo de color esté funcionando correctamente utilizando el comando `kubectl logs`:

```
kubectl logs -f curler
```

Deberíamos ver una salida similar a la siguiente:

```
Color es: azul
Color es: verde
Color es: rojo
```

Esto indica que la aplicación de ejemplo de color está funcionando correctamente y que el tráfico está siendo enrutado correctamente a través de App Mesh.

**Verificar el tráfico**

Para verificar que el tráfico esté siendo enrutado correctamente, podemos utilizar CloudWatch para observar el tráfico y verificar que la integración esté funcionando correctamente. Puede ver métricas como el número de solicitudes y la latencia promedio para cada servicio.

**Conclusión**

En este paso, hemos probado la integración de App Mesh con nuestra aplicación de ejemplo de color y hemos verificado que funcione correctamente. En el próximo paso, podemos monitorear los recursos de App Mesh para asegurarnos de que estén funcionando correctamente.

## Paso 6: Monitorear Recursos de App Mesh {id="paso-6%3A-monitorear-recursos-de-app-mesh"}

Ahora que hemos desplegado nuestras aplicaciones con App Mesh, es hora de monitorear los recursos de App Mesh para asegurarnos de que estén funcionando correctamente. Para hacer esto, podemos utilizar herramientas como Prometheus, Grafana, [Jaeger](https://www.jaegertracing.io/) y AWS X-Ray [Datadog](https://www.datadoghq.com/) para instalar plugins de observabilidad y monitorear nuestros servicios de App Mesh.

### Métricas y Registros {id="m%C3%A9tricas-y-registros"}

App Mesh proporciona métricas y registros detallados sobre el rendimiento y la disponibilidad de nuestros servicios. Podemos utilizar estas métricas y registros para identificar problemas de rendimiento, depurar errores y optimizar la configuración de nuestros servicios.

### Integración con Herramientas de Observabilidad {id="integraci%C3%B3n-con-herramientas-de-observabilidad"}

App Mesh se integra con varias herramientas de observabilidad, como Prometheus, Grafana, Jaeger y AWS X-Ray Datadog. Estas herramientas nos permiten recopilar y analizar métricas y registros de nuestros servicios.

### Monitoreo de Tráfico {id="monitoreo-de-tr%C3%A1fico"}

Podemos utilizar App Mesh para monitorear el tráfico entre nuestros servicios. Esto nos permite identificar problemas de rendimiento, depurar errores y optimizar la configuración de nuestros servicios.

### Herramientas de Observabilidad {id="herramientas-de-observabilidad"}

| Herramienta | Descripción |
| --- | --- |
| Prometheus | Un sistema de monitoreo de código abierto que recopila métricas de nuestros servicios. |
| Grafana | Una plataforma de visualización de datos que nos permite crear paneles personalizados para monitorear nuestros servicios. |
| Jaeger | Un sistema de seguimiento distribuido que nos permite depurar errores y optimizar la configuración de nuestros servicios. |
| AWS X-Ray Datadog | Un servicio de monitoreo de rendimiento que nos permite recopilar y analizar métricas y registros de nuestros servicios. |

### Conclusión {id="conclusi%C3%B3n-1"}

En este paso, hemos monitoreado los recursos de App Mesh para asegurarnos de que estén funcionando correctamente. En el próximo paso, podemos limpiar el entorno de prueba.

## Paso 7: Limpiar el Entorno de Prueba {id="paso-7%3A-limpiar-el-entorno-de-prueba"}

Ahora que hemos terminado de monitorear los recursos de App Mesh, es hora de limpiar el entorno de prueba para asegurarnos de que no haya recursos innecesarios que afecten otros servicios.

### Eliminar la Aplicación de Muestra {id="eliminar-la-aplicaci%C3%B3n-de-muestra"}

Para eliminar la aplicación de muestra, debemos ejecutar el siguiente comando:

```
cd aws-app-mesh-examples/walkthroughs/howto-k8s-http-headers/kubectl delete -f _output/manifest.yaml
```

Este comando eliminará la aplicación de muestra y sus recursos asociados.

### Eliminar el Controlador de App Mesh {id="eliminar-el-controlador-de-app-mesh"}

Para eliminar el controlador de App Mesh, debemos ejecutar el siguiente comando:

```
helm delete appmesh-controller -n appmesh-system
```

Este comando eliminará el controlador de App Mesh y sus recursos asociados.

Al eliminar estos recursos, podemos asegurarnos de que nuestro entorno de prueba esté limpio y listo para nuevas configuraciones o pruebas. Recuerda que puedes recrear fácilmente estos recursos siguiendo los pasos de la guía.

**Recursos Eliminados**

| Recurso | Comando de Eliminación |
| --- | --- |
| Aplicación de Muestra | `kubectl delete -f _output/manifest.yaml` |
| Controlador de App Mesh | `helm delete appmesh-controller -n appmesh-system` |

Recuerda que es importante limpiar el entorno de prueba después de cada prueba para evitar conflictos con futuras configuraciones o pruebas.

## Resumen {id="resumen"}

En resumen, la integración de AWS App Mesh con EKS ofrece una forma sencilla y escalable de administrar la comunicación entre microservicios en entornos de contenedores. Al seguir los pasos de esta guía, podrás configurar App Mesh para administrar el tráfico entre tus microservicios, monitorear el rendimiento y la disponibilidad, y garantizar la seguridad de tus aplicaciones.

### Ventajas de la Integración {id="ventajas-de-la-integraci%C3%B3n"}

La integración de App Mesh con EKS ofrece varias ventajas, incluyendo:

| Ventaja | Descripción |
| --- | --- |
| Simplifica la comunicación | App Mesh simplifica la comunicación entre microservicios, lo que reduce la complejidad y mejora la escalabilidad. |
| Mejora la disponibilidad | App Mesh monitorea el rendimiento y la disponibilidad de tus aplicaciones, lo que te permite identificar y solucionar problemas rápidamente. |
| Garantiza la seguridad | App Mesh proporciona una capa adicional de seguridad para tus aplicaciones, lo que te permite proteger tus datos y aplicaciones de ataques malintencionados. |

Si deseas explorar más a fondo las características avanzadas de App Mesh, puedes comenzar a investigar sobre la configuración de rutas de tráfico, la implementación de políticas de seguridad y la integración con otros servicios de AWS. Recuerda que la práctica y la experimentación son clave para dominar las habilidades de integración de App Mesh con EKS.

## Related posts

- [Opciones para Desplegar Contenedores en AWS: ECS y EKS](/blog/opciones-para-desplegar-contenedores-en-aws-ecs-y-eks/)
- [Cómo Desplegar una Aplicación en Amazon EKS](/blog/como-desplegar-una-aplicacion-en-amazon-eks/)
- [Mejores Prácticas Para Amazon EKS](/blog/mejores-practicas-para-amazon-eks/)
- [Microservicios en AWS Utilizando Contenedores](/blog/microservicios-en-aws-utilizando-contenedores/)
