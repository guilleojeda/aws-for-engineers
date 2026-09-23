+++
url = "/blog/mejores-practicas-para-aws-lambda/"
title = "Mejores Prácticas Para AWS Lambda"
description = "Consejos clave para optimizar y asegurar tus aplicaciones sin servidor con AWS Lambda. Aprende a simplificar tu código, configurar cuidadosamente y monitorear tu función para un rendimiento óptimo."
date = "2024-03-09T03:26:48.732000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/020c3be0259dc50cecb2155ae289e4af7b88e3e3d8d1220329a4a72a3c491b66.jpg"
archive_order = 143

[[related]]
title = "7 Estrategias para Mitigar Cold Starts en AWS Lambda"
url = "/blog/7-estrategias-para-mitigar-cold-starts-en-aws-lambda/"
image = "/assets/blog/c936f3eb45382355f87b0707de9ff9b761d3c09a1f01ea99b84c2094ed53957d.jpg"

[[related]]
title = "Utilizando Lambda Layers en Múltiples Funciones Lambda"
url = "/blog/utilizando-lambda-layers-en-multiples-funciones-lambda/"
image = "/assets/blog/ab65afd218440c66bc564a0acdcbd738d7192df295fafe4416cab518f8845e91.jpg"

[[related]]
title = "Ingeniería de Caos en AWS con Fault Injection Simulator"
url = "/blog/ingenieria-de-caos-en-aws-con-fault-injection-simulator/"
image = "/assets/blog/0a0b1cf017845abee5cf215dfcc9e55eb775d1fa176a56153854e2b4d7b16016.jpg"
+++

Para lograr el máximo rendimiento y seguridad en tus aplicaciones sin servidor con AWS Lambda, sigue estas estrategias clave:

- **Simplifica tu código**: Separa la lógica principal de tu función Lambda del controlador para facilitar las pruebas y el mantenimiento.
- **Optimiza el uso de recursos**: Reutiliza conexiones y entornos de ejecución y minimiza el tamaño del paquete de tu función.
- **Configura cuidadosamente**: Elige la cantidad de memoria adecuada y usa AWS Lambda Power Tuning para un rendimiento óptimo.
- **Monitorea y asegura tu función**: Implementa métricas y alarmas con CloudWatch y asegura tu aplicación desde el diseño, utilizando AWS Security Hub para revisiones de seguridad.
- **Mejora el rendimiento con SnapStart**: Asegúrate de restablecer las conexiones de red y precargar clases importantes para reducir la latencia.

AWS Lambda es ideal para aplicaciones que requieren alta adaptabilidad y eficiencia sin la carga de manejar servidores. Soporta varios lenguajes de programación como Java, Go, PowerShell, Node.js, C#, Python, y Ruby, ofreciendo flexibilidad para tus proyectos. Emplea estas mejores prácticas para aprovechar al máximo las capacidades de AWS Lambda, mejorando la seguridad, rendimiento y eficiencia de tus aplicaciones.

## Cómo Mejorar Tus Funciones Lambda {id="c%C3%B3mo-mejorar-tus-funciones-lambda"}

Consejos para hacer tu código de función Lambda más eficiente y fácil de manejar.

### Separar el controlador de Lambda de la lógica del núcleo {id="separar-el-controlador-de-lambda-de-la-l%C3%B3gica-del-n%C3%BAcleo"}

Hacer esto hace más fácil probar y mantener tu código. Si pones la parte principal de tu función Lambda en un lugar separado, puedes probarla sin tener que usar todo el controlador. También te permite usar la misma parte principal en diferentes funciones Lambda, lo que hace todo más ordenado.

Por ejemplo:

```
exports.handler = function(event, context, callback) {
  var result = miFuncion(event); 
  callback(null, result);
}

function miFuncion(event) {
  // aquí va la parte principal
}
```

### Reutilizar el entorno de ejecución para mejorar el rendimiento {id="reutilizar-el-entorno-de-ejecuci%C3%B3n-para-mejorar-el-rendimiento"}

Esto ayuda a evitar el tiempo extra que toma iniciar un nuevo contenedor cada vez que alguien usa tu función. Configura tu función Lambda para que mantenga abiertas las conexiones y recursos entre usos, en vez de cerrar todo después de cada uso. Esto hace que todo funcione más rápido porque no tiene que empezar de cero cada vez.

Pero, cuidado de no guardar información de un uso para otro, para no mezclar datos de diferentes usuarios.

### Utilizar variables de entorno para pasar parámetros {id="utilizar-variables-de-entorno-para-pasar-par%C3%A1metros"}

Es mejor no poner información fija directamente en el código. Usa variables de entorno para esto. Así, si necesitas cambiar algo, puedes hacerlo fácilmente sin tener que actualizar toda la función.

### Minimizar el tamaño del paquete y evitar código recursivo {id="minimizar-el-tama%C3%B1o-del-paquete-y-evitar-c%C3%B3digo-recursivo"}

Esto ayuda a que tu función inicie más rápido y cueste menos de ejecutar.

- Trata de usar solo las dependencias y bibliotecas que realmente necesitas. Esto hace que todo sea más rápido y más barato.
- Evita usar código que se llama a sí mismo de manera que no puedas controlar. Esto puede terminar costando mucho.

## Configuración de la Función {id="configuraci%C3%B3n-de-la-funci%C3%B3n"}

Aquí te damos unos consejos para que tu función Lambda funcione mejor y te cueste menos.

### Elegir la configuración de memoria óptima {id="elegir-la-configuraci%C3%B3n-de-memoria-%C3%B3ptima"}

Es clave probar cómo va tu función Lambda para ver cómo balancear bien el costo y cómo funciona. Si le das más memoria, también va a tener más capacidad de procesamiento. Usa CloudWatch para ver cuánta memoria usa y si necesitas ajustarla.

Te sugerimos probar [AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning), una herramienta gratis que te ayuda a encontrar la mejor configuración de memoria para tus funciones. También, si tu función necesita mucho poder de procesamiento, considera usar bibliotecas que aprovechen Advanced Vector Extensions 2 (AVX2).

### Utilizar AWS Lambda Power Tuning {id="utilizar-aws-lambda-power-tuning"}

[AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning) es una herramienta gratis que te ayuda a encontrar la mejor manera de configurar los recursos para tu función Lambda, según lo que necesitas hacer. Hace pruebas con diferentes configuraciones y te dice cuál es la mejor combinación de memoria y capacidad de procesamiento para tu caso.

Es buena idea usar esta herramienta cuando estás ajustando tu función Lambda para asegurarte de que estás usando la configuración más eficiente.

### Usar los permisos más restrictivos posibles {id="usar-los-permisos-m%C3%A1s-restrictivos-posibles"}

Cuando configures los permisos para tu función Lambda, es importante dar solo los permisos que realmente necesita para acceder a los recursos que usa. Esto hace que tu función sea más segura.

Revisa bien qué recursos necesita tu función y limita los permisos solo a eso. También es buena idea revisar de vez en cuando los permisos para quitar los que ya no se usan. Entre más limitados sean los permisos, más segura será tu función.

## Métricas, Monitoreo y Alarmas {id="m%C3%A9tricas%2C-monitoreo-y-alarmas"}

Es muy importante mantener un ojo en cómo van las cosas con tus funciones Lambda para asegurarte de que todo funcione bien y para encontrar problemas antes de que se hagan grandes.

### Utilizar métricas de Lambda y CloudWatch Alarms {id="utilizar-m%C3%A9tricas-de-lambda-y-cloudwatch-alarms"}

Las métricas de Lambda junto con las alarmas de CloudWatch te ayudan a ver cómo están tus funciones Lambda y te avisan si algo no va bien.

- La métrica `Duration` te dice cuánto tiempo toman tus funciones en hacer su trabajo. Si ves que están tardando mucho, puedes poner una alarma para saberlo.
- Con la métrica `Errors`, puedes ver cuántas veces tus funciones no funcionan como deben. Si de repente hay muchos errores, puedes recibir una alerta.
- También es buena idea ver cuántas veces se llaman tus funciones, cuánta memoria usan y cosas así.

Esto te ayuda a encontrar problemas rápidamente y a mantener tus funciones corriendo suavemente.

### Implementar librerías de logs para una mejor detección de errores {id="implementar-librer%C3%ADas-de-logs-para-una-mejor-detecci%C3%B3n-de-errores"}

Usar librerías de logs, como [log4j](https://logging.apache.org/log4j/2.x/), te permite mandar información sobre lo que pasa en tus funciones a CloudWatch Logs. Esto hace más fácil encontrar y solucionar problemas.

Algunos consejos:

- Escribe en los logs información sobre lo que entra y sale de tus funciones.
- Usa diferentes niveles de importancia en tus logs, como DEBUG, INFO, WARN, ERROR.
- Asegúrate de registrar los errores y los detalles de por qué pasaron.
- No olvides añadir información extra que te pueda ayudar a entender mejor el problema, como identificadores únicos de las ejecuciones.

Con toda esta información en un solo lugar, puedes buscar y analizar fácilmente lo que pasó si algo no funciona bien. Esto te da una buena idea de cómo están funcionando tus funciones y te ayuda a solucionar problemas más rápidamente.

## Seguridad en AWS Lambda {id="seguridad-en-aws-lambda"}

### Monitorear Lambda con AWS Security Hub {id="monitorear-lambda-con-aws-security-hub"}

AWS Security Hub te ayuda a mantener tus funciones Lambda seguras al revisar si todo está configurado correctamente según las normas de seguridad importantes como PCI DSS e ISO. Te permite:

- Verificar que la configuración de tus Lambda cumpla con estándares de seguridad.
- Detectar si has dado más permisos de los necesarios, o si tienes variables de entorno que no están protegidas.
- Juntar todas las alertas de seguridad en un solo lugar para que no se te pase nada.
- Conectar con otras herramientas como Amazon CloudWatch para tener una mejor idea de lo que está pasando.

Es una buena idea activar Security Hub para que estés siempre al tanto de la seguridad de tus funciones Lambda y puedas actuar rápido si algo no va bien.

### Aplicar las mejores prácticas de seguridad desde el diseño {id="aplicar-las-mejores-pr%C3%A1cticas-de-seguridad-desde-el-dise%C3%B1o"}

Cuando creas una función Lambda, es muy importante pensar en la seguridad desde el principio:

- **Protege la información delicada** en variables de entorno y en los datos que entran, usando AWS KMS. Esto ayuda a mantener segura información como contraseñas.
- **Revisa todos los datos que entran** antes de procesarlos para evitar que te metan código malo.
- **Da solo los permisos necesarios** a tu función usando políticas de IAM. Así, si alguien intenta hacer algo que no debe, no podrá.
- **Guarda un registro** de lo que hace tu función para poder revisarlo después.
- **Usa ambientes separados** para probar y desarrollar, lejos del ambiente de producción.

También es muy útil hacer pruebas de seguridad con expertos de vez en cuando para encontrar y arreglar problemas antes de que alguien más los encuentre.

Si sigues estos consejos desde el comienzo, tus aplicaciones serverless estarán mucho más seguras.

## Optimización de Rendimiento {id="optimizaci%C3%B3n-de-rendimiento"}

### Restablecer siempre las conexiones de red con Lambda SnapStart {id="restablecer-siempre-las-conexiones-de-red-con-lambda-snapstart"}

Cuando una función Lambda se vuelve a activar desde una instantánea con SnapStart, no podemos estar seguros de cómo están las conexiones de red. Es clave asegurarse de que estas conexiones se restablezcan cada vez que la función se active de nuevo:

- Usa el método `onStartup` en tu controlador para restablecer conexiones cada vez que la función se active.
- Evita usar el nombre del host para reconocer el entorno de ejecución. Mejor, crea un ID único en el controlador.
- No conectes a puertos fijos, ya que esto puede causar errores al reconectar.
- Intenta no usar la caché DNS de Java, porque puede provocar problemas de conexión.

Si sigues estos consejos, podrás evitar problemas de conexión y asegurar que tu función Lambda funcione correctamente después de reactivarse desde una instantánea.

### Precargar clases que contribuyen a la latencia de inicio {id="precargar-clases-que-contribuyen-a-la-latencia-de-inicio"}

Para que Lambda con SnapStart funcione mejor, es buena idea cargar de antemano las clases que hacen que la función tarde en iniciar. Esto se puede hacer de dos maneras:

- **Durante la inicialización:** Carga las clases importantes directamente cuando estás preparando todo, no en el controlador. Esto ayuda a eliminar la espera que se produce al cargar estas clases cuando se necesita la función.
- **Con invocaciones ficticias**: Si cargar durante la inicialización no es posible, puedes simular llamadas al controlador para que estas clases se carguen antes de que llegue una llamada real.

Por ejemplo, en una función que usa Spring Boot, podrías añadir este código al controlador para hacer una llamada ficticia a `/pets` al preparar todo:

```
handler.proxy(new AwsProxyRequest().withHttpMethod("GET").withPath("/pets"), new TestContext());
```

Esto mejora el rendimiento porque las clases importantes ya estarán listas cuando se necesiten, reduciendo el tiempo que tarda en iniciar la función.

## Conclusión {id="conclusi%C3%B3n"}

Cuando usas AWS Lambda para hacer aplicaciones sin servidor, es super importante seguir algunos consejos para que todo funcione de maravilla. Aquí te dejamos lo más importante que debes recordar:

- **Mantén la parte principal de tu función Lambda separada**. Esto hace que sea más fácil probarla y usarla en otros lugares.
- **Haz que tu función reutilice conexiones y recursos**. Esto hace que todo sea más rápido porque no tiene que empezar de cero cada vez.
- **Piensa bien cuánta memoria necesita tu función**. Usar herramientas como AWS Lambda Power Tuning te puede ayudar a encontrar el balance perfecto entre lo que gastas y cómo funciona.
- **Estar al pendiente de cómo va todo con CloudWatch**. Es clave para detectar problemas rápido y asegurarte de que tu función esté corriendo bien.
- **Dale solo los permisos necesarios a tu función**. Así es más segura y reduces riesgos si algo sale mal.
- **No te saltes las pruebas**. Checar bien todo, especialmente la seguridad y cómo se desempeña, es crucial.

Siguiendo estos consejos desde el inicio, puedes crear funciones Lambda que son seguras, eficientes y fáciles de mantener. Esto significa que tus aplicaciones sin servidor van a correr mejor y vas a tener menos problemas más adelante.

Al enfocarte en estos puntos desde el diseño y la implementación, te aseguras de aprovechar al máximo Lambda y evitas complicaciones futuras.

## Preguntas Relacionadas {id="preguntas-relacionadas"}

### ¿Cuándo usar Lambda? {id="%C2%BFcu%C3%A1ndo-usar-lambda%3F"}

AWS Lambda es ideal cuando necesitas que tu código se ejecute automáticamente en respuesta a ciertos eventos, como cambios en datos o acciones de usuarios, sin tener que preocuparte por los servidores. Es perfecto para:

- Manejar tareas que no son constantes y aparecen esporádicamente.
- Responder a eventos de otros servicios de AWS como S3 o DynamoDB.
- Desarrollar aplicaciones pequeñas sin servidor, conocidas como microsservicios.

En resumen, si quieres que tu aplicación se adapte rápidamente a las necesidades sin tener que manejar servidores, Lambda es una buena opción.

### ¿Qué lenguajes soporta AWS Lambda? {id="%C2%BFqu%C3%A9-lenguajes-soporta-aws-lambda%3F"}

AWS Lambda permite usar varios lenguajes de programación, incluyendo:

- Java
- Go
- PowerShell
- Node.js
- C#
- Python
- Ruby

Además, AWS Lambda te da la opción de usar otros lenguajes mediante una API especial, así que tienes bastante flexibilidad para programar tus funciones.

### ¿Qué es el servicio AWS Lambda? {id="%C2%BFqu%C3%A9-es-el-servicio-aws-lambda%3F"}

AWS Lambda es un servicio que te permite ejecutar código sin que tengas que preocuparte por los servidores. Solo pagas por el tiempo que tu código está corriendo. Esto es útil porque:

- Se encarga de todo lo que tiene que ver con servidores, como ajustar la cantidad de recursos necesarios o asegurarse de que tu código esté siempre disponible.
- Permite que tu aplicación se ajuste automáticamente según lo que necesite, sin que tengas que hacer nada.

En pocas palabras, AWS Lambda hace que sea mucho más fácil y económico correr aplicaciones que necesitan adaptarse rápidamente a diferentes situaciones.

## Related posts

- [Introducción a Serverless en AWS](/blog/introduccion-a-serverless-en-aws/)
- [AWS Lambda en Profundidad](/blog/aws-lambda-en-profundidad/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Mejores Prácticas Para Amazon EC2](/blog/mejores-practicas-para-amazon-ec2/)
