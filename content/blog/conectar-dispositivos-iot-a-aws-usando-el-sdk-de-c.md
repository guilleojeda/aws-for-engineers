+++
url = "/blog/conectar-dispositivos-iot-a-aws-usando-el-sdk-de-c/"
title = "Conectar dispositivos IoT a AWS usando el SDK de C++"
description = "Aprende a conectar dispositivos IoT a AWS con el SDK de C++ para un desarrollo eficiente. Incluye configuración, autenticación y manejo de sombras de cosas."
date = "2024-05-10T02:52:14.698000+00:00"
lastmod = "2024-05-10"
image = "/assets/blog/066ea33361c58e79e3d5a983bf2e60abbdaff4e262883f894e31c4088db893de.jpg"
archive_order = 84

[[related]]
title = "9 Mejores Prácticas de Seguridad para IaC en AWS"
url = "/blog/9-mejores-practicas-de-seguridad-para-iac-en-aws/"
image = "/assets/blog/0b84e7609d9a01cdc2449b30434c92f8223c23befa9a2deb598e11bceb2b19cf.jpg"

[[related]]
title = "Servicios de AWS para Inteligencia Artificial"
url = "/blog/servicios-de-aws-para-inteligencia-artificial/"
image = "/assets/blog/54201ee89ce3b648eb0ec01110eb7efa6535943aadeddaccabbe8ae4006effc0.jpg"

[[related]]
title = "Aprender AWS gratis: Recursos y Comunidad"
url = "/blog/aprender-aws-gratis-recursos-y-comunidad/"
image = "/assets/blog/c7227ae982494a7ce162007094b68d0a705cc8359af23154c0dfef0a2b0ef7f6.jpg"
+++

Para conectar dispositivos IoT a [AWS](https://aws.amazon.com/) utilizando el SDK de C++, sigue estos pasos:

1. **Configura tu entorno de desarrollo C++**

   - Instala un compilador de C++ compatible ([GCC](https://gcc.gnu.org/), [Clang](https://clang.llvm.org/), etc.)
   - Configura un IDE ([Visual Studio](https://visualstudio.microsoft.com/), [Eclipse](https://www.eclipse.org/), etc.)
   - Instala las bibliotecas y dependencias necesarias
2. **Crea una cuenta de AWS y configura [AWS IoT Core](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html)**

   - Crea una cuenta de AWS si aún no tienes una
   - Configura AWS IoT Core para permitir la conexión de dispositivos IoT
3. **Descarga e instala el SDK de C++ de AWS IoT Device**

   - Clona el repositorio de [GitHub](https://github.com/) del SDK
   - Sigue las instrucciones de instalación y compilación
4. **Configura el SDK con tus credenciales de AWS**

   - Proporciona la información de tu cuenta de AWS (clave de acceso, clave secreta)
   - Configura la conexión [MQTT](https://en.wikipedia.org/wiki/MQTT) (dirección del servidor, puerto)
5. **Crea un cliente MQTT usando el SDK**

   - Inicializa una instancia de la clase `MqttClient`
   - Configura la conexión de red y la autenticación
6. **Gestiona temas MQTT y publica/suscribe mensajes**

   - Suscríbete a temas MQTT relevantes
   - Publica datos en AWS IoT utilizando el método `Publish`
7. **Utiliza sombras de cosas para administrar el estado del dispositivo**

   - Recupera, actualiza y elimina sombras de cosas
   - Maneja eventos de sombra de cosa
8. **Crea y monitorea trabajos de AWS IoT**

   - Crea trabajos utilizando la API de AWS IoT Core
   - Responde a la ejecución de trabajos en el SDK

| Característica Clave | Descripción |
| --- | --- |
| Conexión segura | Autenticación, autorización y cifrado de datos |
| Sombras de cosas | Mantener y sincronizar el estado del dispositivo |
| Trabajos de AWS IoT | Realizar tareas como actualizaciones y acciones personalizadas |

Sigue explorando la documentación del SDK y los ejemplos de código para aprovechar al máximo sus características avanzadas.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/YcY68BJddmg" >}}

## Configuración para la conexión del dispositivo {id="configuraci%C3%B3n-para-la-conexi%C3%B3n-del-dispositivo"}

Para conectar dispositivos IoT a AWS utilizando el SDK de C++, es necesario realizar algunas preparaciones previas. A continuación, se presentan los pasos necesarios para establecer la conexión.

### Crear una cuenta de [AWS](https://aws.amazon.com/) {id="crear-una-cuenta-de-aws"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

Antes de empezar, debes crear una cuenta de AWS si no la tienes ya. Para hacerlo, sigue estos pasos:

1\. **Crear una cuenta de AWS**:

- Ve a la página de inicio de AWS y haz clic en "Crear una cuenta de AWS".
- Selecciona el tipo de cuenta que deseas crear (individual o empresarial).
- Proporciona la información requerida, como tu nombre, dirección de correo electrónico y contraseña.
- Verifica tu cuenta mediante el enlace de confirmación que se te envía por correo electrónico.

### Configurar el entorno de desarrollo de C++ {id="configurar-el-entorno-de-desarrollo-de-c%2B%2B"}

Para desarrollar aplicaciones con el SDK de C++ de AWS IoT Device, debes tener un entorno de desarrollo de C++ configurado. Asegúrate de tener instaladas las herramientas y software necesarias, como:

- Un compilador de C++ compatible (como GCC o Clang).
- Un entorno de desarrollo integrado (IDE) como Visual Studio o Eclipse.
- Las bibliotecas y dependencias necesarias para el SDK de C++ de AWS IoT Device.

### Entender [MQTT](https://en.wikipedia.org/wiki/MQTT) y [AWS IoT Core](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html) {id="entender-mqtt-y-aws-iot-core"}

![MQTT](/assets/blog/f6c0ceacae77dcc2ccf9cb28fbe278e40d941b129b0a581073ab98c16d77b165.jpg)

El protocolo MQTT (Message Queuing Telemetry Transport) es un protocolo de mensajería ligero que se utiliza para la comunicación entre dispositivos IoT y AWS IoT Core. AWS IoT Core es un servicio de AWS que permite a los dispositivos IoT conectarse y enviar datos a la nube.

Es importante entender cómo funciona MQTT y cómo se utiliza en AWS IoT Core para establecer la conexión entre tus dispositivos IoT y AWS.

| Concepto | Descripción |
| --- | --- |
| MQTT | Protocolo de mensajería ligero para la comunicación entre dispositivos IoT y AWS IoT Core. |
| AWS IoT Core | Servicio de AWS que permite a los dispositivos IoT conectarse y enviar datos a la nube. |

## Instalación y configuración del SDK de C++ {id="instalaci%C3%B3n-y-configuraci%C3%B3n-del-sdk-de-c%2B%2B"}

Para utilizar el SDK de C++ de AWS IoT Device, es necesario descargar e instalar el SDK y configurarlo para que se conecte con AWS IoT Core.

### Descarga e instalación del SDK {id="descarga-e-instalaci%C3%B3n-del-sdk"}

Para descargar el SDK, clona el repositorio de GitHub de AWS IoT Device SDK para C++. Luego, crea una carpeta llamada `build` para contener los archivos de compilación y cambia a esa carpeta.

Ejecuta `cmake../.` para construir el SDK con la CLI. El comando descargará automáticamente las bibliotecas de terceros necesarias y generará un archivo Makefile. Luego, escribe `make <nombre del objetivo>` para construir el objetivo deseado.

### Configuración del SDK {id="configuraci%C3%B3n-del-sdk"}

Una vez instalado el SDK, debes configurarlo para que se conecte con AWS IoT Core. Para hacerlo, debes proporcionar la información de la cuenta de AWS y la configuración de la conexión MQTT.

#### Información de la cuenta de AWS {id="informaci%C3%B3n-de-la-cuenta-de-aws"}

- Crea un archivo de configuración que contenga la información de la cuenta de AWS, como la clave de acceso y la clave secreta.

#### Configuración de la conexión MQTT {id="configuraci%C3%B3n-de-la-conexi%C3%B3n-mqtt"}

- Proporciona la dirección del servidor MQTT y el puerto de conexión.

Asegúrate de que el SDK esté configurado correctamente para que se conecte con AWS IoT Core. Puedes hacer esto verificando la documentación del SDK y los ejemplos de código proporcionados.

## Conectar a AWS IoT con el SDK {id="conectar-a-aws-iot-con-el-sdk"}

Conectar a AWS IoT con el SDK de C++ implica varios pasos importantes para establecer una conexión segura y confiable. A continuación, se presentan los pasos para crear un cliente MQTT utilizando el SDK y conectarlo a AWS IoT Core.

### Crear un cliente MQTT {id="crear-un-cliente-mqtt"}

Para crear un cliente MQTT, debes inicializar una instancia de la clase `MqttClient` del SDK de C++. Puedes hacer esto proporcionando una instancia de la clase `NetworkConnection` que configure la conexión de red y la autenticación con AWS IoT.

```
std::shared_ptr<NetworkConnection> p_network_connection = <Crear instancia>;
std::shared_ptr<MqttClient> p_client = MqttClient::Create(p_network_connection, std::chrono::milliseconds(30000));
```

### Gestionar temas MQTT y mensajes {id="gestionar-temas-mqtt-y-mensajes"}

Una vez creado el cliente MQTT, debes suscribirte a los temas MQTT relevantes para recibir mensajes de AWS IoT. Puedes hacer esto utilizando el método `Subscribe` del cliente MQTT.

| Paso | Descripción |
| --- | --- |
| 1 | Crear una instancia de la clase `Utf8String` con el nombre del tema MQTT. |
| 2 | Crear un objeto `Subscription` con el tema MQTT, la calidad de servicio (QoS) y un manejador de suscripciones. |
| 3 | Agregar el objeto `Subscription` a un vector de suscripciones. |
| 4 | Llamar al método `Subscribe` del cliente MQTT con el vector de suscripciones. |

### Publicar datos en AWS IoT {id="publicar-datos-en-aws-iot"}

Para publicar datos en AWS IoT, debes utilizar el método `Publish` del cliente MQTT. Puedes proporcionar el tema MQTT, el mensaje y la calidad de servicio (QoS) deseada.

| Paso | Descripción |
| --- | --- |
| 1 | Crear una instancia de la clase `Utf8String` con el nombre del tema MQTT. |
| 2 | Llamar al método `Publish` del cliente MQTT con el tema MQTT, el mensaje y la calidad de servicio (QoS) deseada. |

Recuerda que debes configurar correctamente el SDK y proporcionar la información de la cuenta de AWS y la configuración de la conexión MQTT para establecer una conexión segura y confiable con AWS IoT Core.

## Utilizar sombras de cosas {id="utilizar-sombras-de-cosas"}

Las sombras de cosas son una característica clave de AWS IoT que permite a los dispositivos IoT mantener un estado en la nube. Esto permite a los dispositivos IoT sincronizar su estado con la nube y recibir actualizaciones en tiempo real. En este artículo, exploraremos cómo utilizar las sombras de cosas con el SDK de C++ para administrar el estado de los dispositivos IoT.

### Administrar el estado de la sombra de cosa {id="administrar-el-estado-de-la-sombra-de-cosa"}

Para administrar el estado de una sombra de cosa, debes utilizar la API de sombra de cosa proporcionada por el SDK de C++. Puedes recuperar el estado actual de una sombra de cosa utilizando el método `GetThingShadow` del cliente MQTT.

| Método | Descripción |
| --- | --- |
| `GetThingShadow` | Recupera el estado actual de una sombra de cosa. |
| `UpdateThingShadow` | Actualiza el estado de una sombra de cosa. |
| `DeleteThingShadow` | Elimina una sombra de cosa. |

### Actualizar el estado de la sombra de cosa {id="actualizar-el-estado-de-la-sombra-de-cosa"}

Puedes actualizar el estado de una sombra de cosa utilizando el método `UpdateThingShadow` del cliente MQTT.

```
std::string new_shadow_state = "{\"temperature\": 25.0}";
p_client->UpdateThingShadow(thing_name, new_shadow_state);
```

### Eliminar sombras de cosas {id="eliminar-sombras-de-cosas"}

Para eliminar una sombra de cosa, debes utilizar el método `DeleteThingShadow` del cliente MQTT. Es importante tener en cuenta que eliminar una sombra de cosa también elimina todos los datos asociados con ella.

```
p_client->DeleteThingShadow(thing_name);
```

### Manejar eventos de sombra de cosa {id="manejar-eventos-de-sombra-de-cosa"}

Puedes establecer callbacks para manejar eventos de sombra de cosa, como cambios en el estado de la sombra de cosa. Para hacer esto, debes proporcionar un objeto `ThingShadowCallback` al método `SetThingShadowCallback` del cliente MQTT.

```
class MyThingShadowCallback : public ThingShadowCallback {
public:
    void OnThingShadowUpdated(const std::string& thing_name, const std::string& shadow_state) override {
        // Manejar el evento de actualización de la sombra de cosa
    }
};

MyThingShadowCallback callback;
p_client->SetThingShadowCallback(&callback);
```

Recuerda que debes configurar correctamente el SDK y proporcionar la información de la cuenta de AWS y la configuración de la conexión MQTT para utilizar las sombras de cosas de manera efectiva.

## Trabajos de AWS IoT {id="trabajos-de-aws-iot"}

Los trabajos de AWS IoT permiten a los dispositivos IoT realizar tareas como actualizaciones y acciones personalizadas. En este artículo, exploraremos cómo utilizar el SDK de C++ para crear y administrar trabajos en AWS IoT.

### Crear y monitorear trabajos {id="crear-y-monitorear-trabajos"}

Para crear un trabajo en AWS IoT, debes utilizar la API de AWS IoT Core. Primero, debes crear un documento de trabajo que contenga la información del trabajo, como el ID del trabajo y la URL del documento del trabajo. Luego, puedes utilizar el comando `aws iot create-job` para crear el trabajo.

| Comando | Descripción |
| --- | --- |
| `aws iot create-job` | Crea un trabajo en AWS IoT. |

Ejemplo de comando:

```
aws iot create-job \
  --job-id hello-world-job-1 \
  --document-source "job_document_url" \
  --targets "thing_arn" \
  --target-selection SNAPSHOT
```

Si el comando es exitoso, devuelve un resultado como este:

`{ "jobArn": "arn:aws:iot:us-west-2:57EXAMPLE833:job/hello-world-job-1", "jobId": "hello-world-job-1"}`

Una vez creado el trabajo, puedes monitorear su estado utilizando la API de AWS IoT Core.

### Responder a la ejecución de un trabajo {id="responder-a-la-ejecuci%C3%B3n-de-un-trabajo"}

Para responder a la ejecución de un trabajo, debes establecer un callback en el SDK de C++. Esto te permite recibir notificaciones cuando se ejecuta un trabajo y realizar acciones personalizadas en respuesta.

```
class MyJobCallback : public JobCallback {
public:
    void OnJobExecution(const std::string& jobId, const std::string& jobStatus) override {
        // Manejar la ejecución del trabajo
    }
};

MyJobCallback callback;
p_client->SetJobCallback(&callback);
```

Recuerda que debes configurar correctamente el SDK y proporcionar la información de la cuenta de AWS y la configuración de la conexión MQTT para utilizar los trabajos de AWS IoT de manera efectiva.

## Uso avanzado del SDK {id="uso-avanzado-del-sdk"}

El SDK de C++ para AWS IoT Device ofrece varias características avanzadas que permiten a los desarrolladores crear soluciones IoT más complejas y escalables. En esta sección, exploraremos algunas de las formas en que puedes aprovechar al máximo el SDK para crear aplicaciones IoT más robustas y seguras.

### Integración con otros servicios de AWS {id="integraci%C3%B3n-con-otros-servicios-de-aws"}

Puedes integrar el SDK de C++ para AWS IoT Device con otros servicios de AWS para crear soluciones IoT más completas. Por ejemplo, puedes utilizar [AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda) para procesar y analizar datos IoT en tiempo real, o [AWS S3](https://en.wikipedia.org/wiki/Amazon_S3) para almacenar y procesar grandes cantidades de datos.

| Servicio de AWS | Descripción |
| --- | --- |
| AWS Lambda | Procesar y analizar datos IoT en tiempo real |
| AWS S3 | Almacenar y procesar grandes cantidades de datos |

### Seguridad de las comunicaciones de dispositivos IoT {id="seguridad-de-las-comunicaciones-de-dispositivos-iot"}

La seguridad es un aspecto crítico en cualquier aplicación IoT. El SDK de C++ para AWS IoT Device proporciona varias características de seguridad para proteger las comunicaciones entre los dispositivos IoT y AWS IoT Core.

| Característica de seguridad | Descripción |
| --- | --- |
| Autenticación y autorización basadas en certificados | Garantizar que solo los dispositivos autorizados puedan conectarse a AWS IoT Core |
| Cifrado de datos | Proteger los datos en tránsito |

### Solución de problemas y manejo de errores {id="soluci%C3%B3n-de-problemas-y-manejo-de-errores"}

A pesar de que el SDK de C++ para AWS IoT Device es muy robusto, es posible que encuentres errores o problemas al utilizarlo. En este caso, es importante saber cómo diagnosticar y resolver problemas comunes.

| Herramienta o técnica | Descripción |
| --- | --- |
| Registros de depuración | Ayudar a diagnosticar problemas de conectividad y autenticación |
| Excepciones personalizadas | Proporcionar información detallada sobre los errores que ocurren |
| Herramientas de terceros | Ayudar a diagnosticar problemas de conectividad y autenticación |

## Conclusión y aprendizaje adicional {id="conclusi%C3%B3n-y-aprendizaje-adicional"}

En este artículo, hemos explorado los pasos para conectar dispositivos IoT a AWS utilizando el SDK de C++. Desde la configuración del entorno de desarrollo hasta la publicación de datos en AWS IoT, hemos cubierto los conceptos clave y las características avanzadas del SDK.

### Siguientes pasos {id="siguientes-pasos"}

Ahora que has completado esta guía, estás listo para empezar a construir tus propias aplicaciones IoT con AWS y el SDK de C++. Recuerda que la documentación del SDK es una excelente fuente de información para profundizar en los conceptos y características presentadas en este artículo.

### Recursos adicionales {id="recursos-adicionales"}

Para seguir aprendiendo, te recomendamos explorar los siguientes recursos:

| Recurso | Descripción |
| --- | --- |
| Documentación del SDK de C++ para AWS IoT Device | Información detallada sobre el SDK y sus características |
| Sitio web de AWS IoT | Más información sobre los servicios y características de AWS IoT |
| Ejemplos de código y proyectos de muestra en GitHub | Inspiración y aprendizaje de otros desarrolladores |

Continúa explorando el mundo de IoT y AWS, y no dudes en compartir tus experiencias y conocimientos con la comunidad de desarrolladores. ¡Buena suerte en tus proyectos IoT!

## Preguntas frecuentes {id="preguntas-frecuentes"}

### ¿Cómo utilizar el SDK de dispositivo IoT de AWS? {id="%C2%BFc%C3%B3mo-utilizar-el-sdk-de-dispositivo-iot-de-aws%3F"}

Para utilizar el [SDK de dispositivo IoT de AWS](/blog/7-errores-comunes-con-aws-iot-device-sdk-para-javascript/), sigue estos pasos:

1. Instala el SDK de dispositivo IoT de AWS para C++.
2. Configura la aplicación de ejemplo según el dispositivo y la plataforma que estés utilizando.
3. Compila y ejecuta la aplicación de ejemplo.

### ¿Cómo compilar el SDK en AWS? {id="%C2%BFc%C3%B3mo-compilar-el-sdk-en-aws%3F"}

Para compilar el SDK en AWS, sigue estos pasos:

| Paso | Descripción |
| --- | --- |
| 1 | Instala CMake (versión mínima 3.13) y las herramientas de compilación relevantes para tu plataforma. |
| 2 | En una ventana de comandos, navega a una carpeta donde desees almacenar el SDK. |
| 3 | Genera los archivos de compilación ejecutando `cmake.`. |
| 4 | Compila el SDK utilizando los archivos de compilación generados. |

## Related posts

- [7 Errores Comunes con AWS IoT Device SDK para JavaScript](/blog/7-errores-comunes-con-aws-iot-device-sdk-para-javascript/)
- [Cómo integrar los SDK de AWS en 7 pasos](/blog/como-integrar-los-sdk-de-aws-en-7-pasos/)
- [Microservicios en AWS Utilizando AWS Lambda](/blog/microservicios-en-aws-utilizando-aws-lambda/)
- [Introducción a la Inteligencia Artificial en AWS](/blog/introduccion-a-la-inteligencia-artificial-en-aws/)
