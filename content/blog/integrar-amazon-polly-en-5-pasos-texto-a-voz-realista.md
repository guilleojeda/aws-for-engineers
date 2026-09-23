+++
url = "/blog/integrar-amazon-polly-en-5-pasos-texto-a-voz-realista/"
title = "Integrar Amazon Polly en 5 pasos: Texto a voz realista"
description = "Aprende a integrar Amazon Polly en tus aplicaciones en 5 pasos y aprovecha la síntesis de voz realista para mejorar la experiencia de usuario."
date = "2024-05-13T05:08:34.138000+00:00"
lastmod = "2024-05-13"
image = "/assets/blog/35cbdc26cad1c09b7dd2fc813a00437b8cf1656c6f9a97953a60da6caff34c9c.jpg"
archive_order = 74

[[related]]
title = "Correlación de Eventos con Step Functions y CloudWatch"
url = "/blog/correlacion-de-eventos-con-step-functions-y-cloudwatch/"
image = "/assets/blog/1ddc83af1d16737de7b3fdb8177042b5928f068f18886308ad15336603db7ff9.jpg"

[[related]]
title = "9 Mejores Prácticas de Seguridad para IaC en AWS"
url = "/blog/9-mejores-practicas-de-seguridad-para-iac-en-aws/"
image = "/assets/blog/0b84e7609d9a01cdc2449b30434c92f8223c23befa9a2deb598e11bceb2b19cf.jpg"

[[related]]
title = "Clases de Almacenamiento de Amazon S3"
url = "/blog/clases-de-almacenamiento-de-amazon-s3/"
image = "/assets/blog/783a6beb62602d5d128b9c75383363d5cd9ec87665e5d5caec47bac98e16ff24.jpg"
+++

Convierte fácilmente texto en voz realista con [Amazon Polly](https://aws.amazon.com/polly/), un servicio de síntesis de voz con tecnología de aprendizaje automático avanzada. Sigue estos 5 sencillos pasos:

1. **Configura Amazon Polly**: Crea una cuenta de [AWS](https://aws.amazon.com/) y selecciona la voz y el idioma deseados.
2. **Prepara el texto**: Formatea el texto de entrada utilizando etiquetas [SSML](https://en.wikipedia.org/wiki/Speech_Synthesis_Markup_Language) para personalizar la pronunciación, el volumen, el tono y la velocidad del habla.
3. **Convierte texto a voz**: Utiliza la API SynthesizeSpeech para convertir el texto en una secuencia de audio.
4. **Almacena y utiliza la salida de voz**: Guarda el audio generado en formatos como MP3 o PCM, e intégralo en tus aplicaciones web, móviles o de otro tipo.
5. **Integra Amazon Polly**: Aprovecha las capacidades de texto a voz de Amazon Polly utilizando los [SDKs de AWS](/blog/como-integrar-los-sdk-de-aws-en-7-pasos/) disponibles para varios lenguajes de programación.

| Ventajas | Casos de uso |
| --- | --- |
| Voces realistas y naturales | Aplicaciones de aprendizaje electrónico |
| Amplia gama de idiomas | Asistentes virtuales y chatbots |
| Escalable y rentable | Aplicaciones de accesibilidad |
| Personalizable con etiquetas SSML | Sistemas de respuesta de voz interactiva (IVR) |
|  | Contenido multimedia |

Integra Amazon Polly en tus aplicaciones y aprovecha las voces realistas y naturales para mejorar la experiencia del usuario.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/XUd5M_mQaA0" >}}

## Paso 1: Configuración de [Amazon Polly](https://aws.amazon.com/polly/) {id="paso-1%3A-configuraci%C3%B3n-de-amazon-polly"}

![Amazon Polly](/assets/blog/8ae6ca4b881d2aa981fb8a8ea660f63af5c3b638351816b4124fc3c2857f64bb.jpg)

Para empezar a utilizar Amazon Polly, debes configurar el servicio correctamente. En este paso, crearemos una cuenta de AWS y configuraremos Amazon Polly para que esté listo para su uso.

### Crear una cuenta de [AWS](https://aws.amazon.com/) {id="crear-una-cuenta-de-aws"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

Antes de utilizar Amazon Polly, debes tener una cuenta de AWS. Si ya tienes una cuenta de AWS, puedes saltar este paso. De lo contrario, sigue estos pasos:

1\. **Crear una cuenta de AWS**

- Visita la página de inicio de AWS y haz clic en "Crear una cuenta de AWS".
- Ingresa tu información de contacto y crea una contraseña segura.
- Verifica tu cuenta a través de un correo electrónico o una llamada telefónica.

### Seleccionar voz y lenguaje {id="seleccionar-voz-y-lenguaje"}

Amazon Polly ofrece una variedad de voces y lenguajes para que puedas personalizar la experiencia de voz de tus usuarios. Para seleccionar la voz y el lenguaje adecuados para tu proyecto, sigue estos pasos:

| Paso | Acción |
| --- | --- |
| 1 | Inicia sesión en la consola de AWS y navega hasta la página de Amazon Polly. |
| 2 | Haz clic en "Crear un proyecto de voz" y selecciona el lenguaje y la voz que deseas utilizar. |
| 3 | Selecciona la voz que mejor se adapte a tus necesidades. |

Una vez que hayas seleccionado la voz y el lenguaje, puedes empezar a utilizar Amazon Polly para convertir texto en voz. En el siguiente paso, exploraremos cómo preparar el texto para la conversión.

## Paso 2: Preparar el texto para la conversión {id="paso-2%3A-preparar-el-texto-para-la-conversi%C3%B3n"}

Para convertir texto en voz con Amazon Polly, es importante preparar el texto de manera adecuada. En este paso, exploraremos las mejores prácticas para formatear el texto y utilizar las etiquetas de lenguaje de marcado de síntesis de voz (SSML) para personalizar la salida de voz.

### Formato de entrada de texto {id="formato-de-entrada-de-texto"}

Antes de convertir el texto en voz, debes asegurarte de que el texto esté en un formato adecuado. Amazon Polly admite texto plano y texto con etiquetas SSML. El texto plano es el formato más común y se utiliza para la mayoría de las conversiones de texto a voz. Sin embargo, si deseas personalizar la salida de voz con pausas, énfasis o modulación del tono de voz, debes utilizar etiquetas SSML.

Asegúrate de que el texto esté bien formateado y no contenga caracteres especiales o símbolos que puedan afectar la conversión. También es importante asegurarte de que el texto no supere los límites de caracteres establecidos por Amazon Polly.

### Uso de etiquetas [SSML](https://en.wikipedia.org/wiki/Speech_Synthesis_Markup_Language) {id="uso-de-etiquetas-ssml"}

![SSML](/assets/blog/66b8bf147b69ff107e997ca6769634ff816b943c6f90fc16f9bf2d9d3fed1ddf.jpg)

Las etiquetas SSML te permiten personalizar la salida de voz con Amazon Polly. Puedes utilizar etiquetas SSML para agregar pausas, énfasis o modulación del tono de voz. A continuación, te mostramos algunos ejemplos de etiquetas SSML que puedes utilizar:

| Etiqueta SSML | Descripción |
| --- | --- |
| `<break time="1s">` | Agrega una pausa de 1 segundo |
| `<emphasis level="strong">` | Enfatiza una palabra o frase |
| `<prosody rate="slow">` | Modula el tono de voz para que sea más lento |

Recuerda que las etiquetas SSML deben estar bien formateadas y deben seguir las reglas de sintaxis de SSML. Puedes encontrar más información sobre las etiquetas SSML admitidas por Amazon Polly en la documentación de Amazon Polly.

Una vez que hayas preparado el texto, puedes proceder a convertirlo en voz con Amazon Polly. En el próximo paso, exploraremos cómo utilizar la API de Amazon Polly para convertir texto en voz.

## Paso 3: Convertir texto a voz {id="paso-3%3A-convertir-texto-a-voz"}

### Utilizar la API SynthesizeSpeech {id="utilizar-la-api-synthesizespeech"}

Para convertir texto en voz con Amazon Polly, debes utilizar la API SynthesizeSpeech. A continuación, te mostramos un ejemplo de cómo utilizar esta API en Python utilizando el SDK de AWS ([Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)):

```
import boto3

# Crea un cliente de Polly
polly_client = boto3.client('polly')

response = polly_client.synthesize_speech(
    Text='Hola, este es un texto de muestra para ser sintetizado.',
    OutputFormat='mp3',
    VoiceId='Joanna'
)

# Guarda el audio en un archivo
with open('output.mp3', 'wb') as file:
    file.write(response['AudioStream'].read())
```

En este ejemplo, creamos un cliente de Polly utilizando Boto3. Luego, llamamos al método `synthesize_speech` y le pasamos los siguientes parámetros:

| Parámetro | Descripción |
| --- | --- |
| `Text` | El texto que queremos convertir en voz. |
| `OutputFormat` | El formato de audio deseado (en este caso, MP3). |
| `VoiceId` | El ID de la voz que queremos utilizar (en este caso, "Joanna"). |

La respuesta de la API contiene una secuencia de audio que podemos guardar en un archivo utilizando la clave `AudioStream`.

### Manejar la salida de audio {id="manejar-la-salida-de-audio"}

Después de llamar a la API SynthesizeSpeech, Amazon Polly devolverá una secuencia de audio en el formato especificado. Puedes manejar esta secuencia de audio de varias maneras:

- **Guardar en un archivo**: Como se muestra en el ejemplo anterior, puedes guardar la secuencia de audio en un archivo utilizando un manejador de archivos. Esto te permite reproducir el audio más tarde o integrarlo en otras aplicaciones.
- **Reproducir en tiempo real**: En lugar de guardar el audio en un archivo, puedes reproducirlo en tiempo real. Por ejemplo, en una aplicación web, puedes utilizar la API de Web Audio para reproducir el audio directamente en el navegador.
- **Transmitir a un servicio de terceros**: Puedes transmitir la secuencia de audio a un servicio de terceros, como un servicio de transcripción de voz a texto o un servicio de análisis de audio.
- **Integrar con otros servicios de AWS**: Amazon Polly se puede integrar con otros servicios de AWS, como [Amazon S3](https://aws.amazon.com/s3/) o [Amazon Transcribe](https://aws.amazon.com/transcribe/). Por ejemplo, puedes guardar el audio en un bucket de S3 o utilizar [Amazon Transcribe](https://aws.amazon.com/transcribe/) para transcribir el audio a texto.

Recuerda que Amazon Polly te cobrará por el texto que sintetices. Por lo tanto, es recomendable optimizar el uso del servicio y cachear el audio cuando sea posible para evitar costos innecesarios.

## Paso 4: Almacenar y utilizar la salida de voz {id="paso-4%3A-almacenar-y-utilizar-la-salida-de-voz"}

Después de crear voz realista con Amazon Polly, es importante saber cómo guardarla para uso futuro o incrustarla en aplicaciones utilizando servicios de AWS como Amazon S3.

### Guardar la salida de audio {id="guardar-la-salida-de-audio"}

Para guardar el audio generado por Amazon Polly, debes elegir el formato de archivo adecuado. Amazon Polly admite varios formatos de archivo, como MP3, Ogg Vorbis y PCM. Puedes seleccionar el formato que mejor se adapte a tus necesidades.

| Formato de archivo | Descripción |
| --- | --- |
| MP3 | Ideal para aplicaciones web y móviles |
| Ogg Vorbis | Ideal para aplicaciones que requieren una alta calidad de audio |
| PCM | Ideal para dispositivos IoT y soluciones de telefonía |

Una vez que hayas seleccionado el formato de archivo, puedes guardar el audio en un bucket de Amazon S3 o en un archivo local. A continuación, te mostramos un ejemplo de cómo guardar el audio en un archivo MP3 utilizando Python y Boto3:

```
import boto3

polly_client = boto3.client('polly')

response = polly_client.synthesize_speech(
    Text='Hola, este es un texto de muestra para ser sintetizado.',
    OutputFormat='mp3',
    VoiceId='Joanna'
)

with open('output.mp3', 'wb') as file:
    file.write(response['AudioStream'].read())
```

### Incrustar la reproducción de audio {id="incrustar-la-reproducci%C3%B3n-de-audio"}

Una vez que hayas guardado el audio, puedes incrustarlo en una aplicación web o móvil utilizando un reproductor de audio compatible. Por ejemplo, puedes utilizar la etiqueta `<audio>` de HTML5 para reproducir el audio en una aplicación web. A continuación, te mostramos un ejemplo de cómo incrustar el audio en una aplicación web utilizando la etiqueta `<audio>`:

```
<audio controls>
  <source src="output.mp3" type="audio/mp3">
  Tu navegador no admite la etiqueta de audio.
</audio>
```

Recuerda que debes asegurarte de que el reproductor de audio sea compatible con el formato de archivo que hayas seleccionado.

## Paso 5: Integrar Amazon Polly {id="paso-5%3A-integrar-amazon-polly"}

### Utilizar SDKs de AWS {id="utilizar-sdks-de-aws"}

Puedes integrar fácilmente Amazon Polly en tus aplicaciones utilizando los SDKs de AWS. Estos SDKs están disponibles para una variedad de lenguajes de programación, como Java, Python, Node.js,.NET, Ruby, Go, PHP y C++. Esto te permite aprovechar las capacidades de Amazon Polly directamente desde tu código.

Por ejemplo, con el SDK de Python para Boto3, puedes utilizar la función `synthesize_speech` para convertir texto en voz:

```
import boto3

polly = boto3.client('polly')

response = polly.synthesize_speech(
    Text='Hola, este es un texto de muestra para ser sintetizado.',
    OutputFormat='mp3',
    VoiceId='Joanna'
)

with open('output.mp3', 'wb') as file:
    file.write(response['AudioStream'].read())
```

Los SDKs de AWS simplifican la integración de Amazon Polly en tus aplicaciones, ya que manejan detalles como la autenticación, el envío de solicitudes y el manejo de respuestas.

### Ejemplos de casos de uso {id="ejemplos-de-casos-de-uso"}

Amazon Polly se puede integrar en una variedad de aplicaciones y casos de uso, como:

| Caso de uso | Descripción |
| --- | --- |
| **Aplicaciones de aprendizaje electrónico** | Convierte contenido de texto en audio realista para mejorar la experiencia de aprendizaje. |
| **Asistentes virtuales y chatbots** | Utiliza las voces naturales de Amazon Polly para proporcionar respuestas de voz en tus asistentes virtuales o chatbots. |
| **Aplicaciones de accesibilidad** | Facilita el acceso a contenido digital para personas con discapacidades visuales o dificultades de lectura al convertir el texto en audio. |
| **Sistemas de respuesta de voz interactiva (IVR)** | Mejora la experiencia de los clientes en tus sistemas de IVR al utilizar voces realistas y naturales para los mensajes y menús de voz. |
| **Contenido multimedia** | Agrega narración de voz a tus videos, podcasts, presentaciones o cualquier otro contenido multimedia para mejorar la experiencia del usuario. |

Al integrar Amazon Polly en tus aplicaciones, puedes aprovechar las voces realistas y naturales para mejorar la interacción con los usuarios, facilitar el acceso al contenido y crear experiencias más atractivas y envolventes.

## Conclusión: Puntos clave y mejores prácticas {id="conclusi%C3%B3n%3A-puntos-clave-y-mejores-pr%C3%A1cticas"}

### Resumen de los pasos {id="resumen-de-los-pasos"}

1\. **Configurar Amazon Polly**

Crea una cuenta de AWS y selecciona la voz y el idioma adecuados para tu aplicación. Amazon Polly ofrece una variedad de voces realistas en múltiples idiomas.

2\. **Preparar el texto**

Prepara el texto que deseas convertir a voz. Puedes formatear la entrada de texto utilizando etiquetas SSML para personalizar la pronunciación, el volumen, el tono y la velocidad del habla.

3\. **Convertir texto a voz**

Utiliza la API SynthesizeSpeech de Amazon Polly para convertir el texto en una secuencia de audio. Puedes manejar la salida de audio según tus necesidades, como guardarla en un archivo o transmitirla en tiempo real.

4\. **Almacenar y utilizar la salida de voz**

Guarda la salida de audio generada por Amazon Polly en un formato adecuado, como MP3 o PCM. Luego, puedes reproducir el audio o integrarlo en tus aplicaciones web, móviles o de otro tipo.

5\. **Integrar Amazon Polly**

Integra Amazon Polly en tus aplicaciones utilizando los SDKs de AWS disponibles para varios lenguajes de programación. Esto te permitirá aprovechar las capacidades de texto a voz de Amazon Polly de manera sencilla y eficiente.

### Consejos y consideraciones {id="consejos-y-consideraciones"}

| Aspecto | Recomendaciones |
| --- | --- |
| **Calidad de voz** | Prueba diferentes voces y estilos de habla para encontrar el más adecuado para tu caso de uso. |
| **Personalización** | Utiliza etiquetas SSML para personalizar la pronunciación, el volumen, el tono y la velocidad del habla según tus necesidades. |
| **Rendimiento y escalabilidad** | Amazon Polly es un servicio escalable que puede manejar grandes volúmenes de solicitudes de conversión de texto a voz. Prueba y optimiza tu aplicación para garantizar un buen rendimiento. |
| **Costos** | Amazon Polly utiliza un modelo de precios de pago por uso. Monitorea y optimiza el uso del servicio para controlar los costos. |
| **Cumplimiento y privacidad** | Asegúrate de cumplir con las regulaciones y políticas de privacidad aplicables al procesar y almacenar datos de texto y audio. |

Al seguir estos pasos y recomendaciones, podrás integrar Amazon Polly de manera efectiva en tus aplicaciones y aprovechar las voces realistas y naturales para mejorar la experiencia del usuario.

## Preguntas frecuentes {id="preguntas-frecuentes"}

### ¿Amazon Polly tiene una API? {id="%C2%BFamazon-polly-tiene-una-api%3F"}

Sí, Amazon Polly ofrece varias operaciones de API que puedes integrar fácilmente en tus aplicaciones existentes. Para obtener una lista de las operaciones admitidas, consulta [Acciones](https://docs.aws.amazon.com/polly/latest/dg/API_Operations.html).

### ¿Qué es una voz de formato largo en Amazon Polly? {id="%C2%BFqu%C3%A9-es-una-voz-de-formato-largo-en-amazon-polly%3F"}

Las voces de formato largo de Amazon Polly se desarrollan con una tecnología de síntesis de voz avanzada. Estas voces están diseñadas para ser utilizadas en contenidos más largos, como artículos de noticias, materiales de capacitación o videos de marketing. Ofrecen una calidad de voz mejorada con una entonación y expresión más naturales.

| Característica | Descripción |
| --- | --- |
| **Calidad de voz** | Las voces de formato largo ofrecen una calidad de voz mejorada con una entonación y expresión más naturales. |
| **Uso** | Estas voces están diseñadas para ser utilizadas en contenidos más largos, como artículos de noticias, materiales de capacitación o videos de marketing. |

## Related posts

- [Cómo Desarrollar Aplicaciones de Inteligencia Artificial en AWS](/blog/como-desarrollar-aplicaciones-de-inteligencia-artificial-en-aws/)
- [Personalización en tiempo real con AWS: Casos de uso](/blog/personalizacion-en-tiempo-real-con-aws-casos-de-uso/)
- [Servicios de AWS para Inteligencia Artificial](/blog/servicios-de-aws-para-inteligencia-artificial/)
- [Introducción a la Inteligencia Artificial en AWS](/blog/introduccion-a-la-inteligencia-artificial-en-aws/)
