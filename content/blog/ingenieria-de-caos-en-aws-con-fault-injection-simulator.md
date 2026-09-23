+++
url = "/blog/ingenieria-de-caos-en-aws-con-fault-injection-simulator/"
title = "Ingeniería de Caos en AWS con Fault Injection Simulator"
description = "Aprende cómo fortalecer tus sistemas en AWS con la ingeniería del caos utilizando AWS Fault Injection Simulator. Descubre los pasos clave y mejores prácticas para mejorar la resiliencia de tus aplicaciones."
date = "2024-03-09T01:48:43.970000+00:00"
lastmod = "2024-04-14"
image = "/assets/blog/0a0b1cf017845abee5cf215dfcc9e55eb775d1fa176a56153854e2b4d7b16016.jpg"
archive_order = 156

[[related]]
title = "Servicios de AWS para Frontend"
url = "/blog/servicios-de-aws-para-frontend/"
image = "/assets/blog/31bdf1ca2f3b6c51213246c8da2f355c9e03bdb8a01a7f392f421fa206e7218e.jpg"

[[related]]
title = "Mejores Prácticas de Observabilidad en AWS"
url = "/blog/mejores-practicas-de-observabilidad-en-aws/"
image = "/assets/blog/225d18fffd41e9eec388a76e18e601ed0186997981a548bf8e9bedb1df338f35.jpg"

[[related]]
title = "Desarrollo en la nube: fundamentos esenciales"
url = "/blog/desarrollo-en-la-nube-fundamentos-esenciales/"
image = "/assets/blog/9257652addf07f39008f550d27fea73d75f35a0614ec70f55570e1d4b09f2a79.jpg"
+++

Descubre cómo hacer tus sistemas en AWS más fuertes con la ingeniería del caos utilizando [AWS Fault Injection Simulator](https://aws.amazon.com/es/fis) (AWS FIS). Este enfoque te permite identificar y arreglar vulnerabilidades antes de que causen problemas reales, asegurándote de que tus aplicaciones puedan manejar situaciones difíciles sin afectar a los usuarios finales. Aquí tienes un resumen rápido de lo que aprenderás:

- **Qué es la ingeniería del caos**: Simular problemas a propósito para ver cómo responde tu sistema.
- **Importancia**: Te ayuda a identificar y solucionar problemas antes de que ocurran en un entorno real.
- **Pre-requisitos**: Experiencia en AWS, conocimientos de DevOps, y acceso a AWS FIS.
- **Cómo configurar y usar AWS FIS**: Desde obtener acceso hasta ejecutar y monitorear experimentos.
- **Análisis de resultados y estrategias de mejora**: Cómo interpretar los resultados de tus experimentos y mejorar tu sistema.
- **Mejores prácticas y errores comunes**: Consejos para evitar problemas comunes y sacar el máximo provecho de tus pruebas.
- **Casos de uso**: Ejemplos de cómo empresas como Netflix y Amazon utilizan la ingeniería del caos.

La idea es simple: al probar proactivamente tu sistema bajo condiciones controladas, puedes mejorar su resiliencia y garantizar una experiencia de usuario sin interrupciones, incluso bajo estrés.

### Importancia de la ingeniería del caos {id="importancia-de-la-ingenier%C3%ADa-del-caos"}

Cuando tienes un montón de computadoras y sistemas trabajando juntos, es complicado saber todo lo que podría salir mal. La ingeniería del caos nos ayuda a probar cómo el sistema maneja los problemas grandes. Al hacer estos 'simulacros', podemos estar más seguros de que nuestro sistema seguirá funcionando bien, incluso cuando las cosas se pongan difíciles. Esto es genial porque significa menos problemas para los usuarios finales.

## Pre-requisitos {id="pre-requisitos"}

Antes de empezar con AWS Fault Injection Simulator (AWS FIS), necesitas saber y tener algunas cosas:

### Conocimientos {id="conocimientos"}

- **Experiencia en AWS**: Es útil saber cómo funcionan servicios como EC2, ECS, CloudWatch, etc., para poder configurar y seguir los experimentos de FIS.
- **Bases de DevOps e ingeniería de confiabilidad**: Si entiendes de infraestructura como código, cómo monitorear sistemas y hacer pruebas, te será más fácil aprovechar FIS.
- **Cómo monitorear y analizar datos**: Es importante saber configurar alarmas en CloudWatch y entender las métricas antes, durante y después de los experimentos para ver cómo afectan.

### Herramientas {id="herramientas"}

- **Cuenta de AWS**: Necesitas una cuenta de AWS y permisos para usar los servicios que quieres probar con FIS.
- **Recursos en AWS (EC2, ECS, etc)**: Para que FIS funcione, ya debes tener cosas como instancias EC2 o clústeres ECS funcionando en AWS.
- **Acceso a [AWS Fault Injection Simulator](https://aws.amazon.com/es/fis)**: Debes pedir acceso a FIS desde la consola de AWS.
- **CloudWatch y otras herramientas de monitoreo**: Para seguir el impacto de los experimentos y poner alarmas, necesitas herramientas como CloudWatch, DataDog, New Relic, etc.

## Configuración de AWS Fault Injection Simulator {id="configuraci%C3%B3n-de-aws-fault-injection-simulator"}

### Acceso a AWS FIS {id="acceso-a-aws-fis"}

Para empezar con AWS Fault Injection Simulator (AWS FIS), primero tienes que pedir acceso en la consola de AWS. Aquí te digo cómo:

- Entra a la consola de AWS
- Busca y entra a la página de AWS FIS
- Dale clic a "Activar AWS FIS"
- Acepta los términos y condiciones
- Elige en qué región de AWS quieres usar el servicio

Después de activar AWS FIS, necesitas darle permiso para que pueda trabajar con los recursos que quieres probar. Por ejemplo, si quieres hacer pruebas en tus instancias EC2, AWS FIS necesita permiso para poder encenderlas, apagarlas o terminarlas.

Puedes dar estos permisos de varias maneras:

- Usando roles y políticas que AWS FIS ya tiene listos
- Creando tus propias políticas y roles
- Dándole acceso a AWS FIS a cuentas específicas

### Interfaces de AWS FIS {id="interfaces-de-aws-fis"}

AWS FIS te ofrece diferentes maneras de usar el servicio:

- **Consola de administración**: Es una página web donde puedes configurar y hacer tus pruebas. Es lo más fácil para empezar.
- **CLI**: La línea de comandos te permite usar scripts para configurar y hacer pruebas automáticamente.
- **SDK**: Los [SDK de AWS](https://aws.amazon.com/tools/) te dejan integrar AWS FIS en tus propias aplicaciones.
- **API**: AWS FIS tiene una API RESTful que puedes usar para hacer llamadas HTTP. Esto es útil si quieres integrarlo con otras herramientas.

La manera en que decidas usar AWS FIS depende de lo que necesites. Por ejemplo, la consola web es buena para hacer pruebas de vez en cuando, mientras que la API y los SDK te permiten automatizar más las cosas.

## Creación de experimentos {id="creaci%C3%B3n-de-experimentos"}

### Definición del estado estable {id="definici%C3%B3n-del-estado-estable"}

Antes de empezar, es crucial observar cómo se comporta normalmente tu sistema. Esto significa mirar cosas como:

- **Tasas de error y éxito**: cuántas veces las cosas salen bien o mal.
- **Latencia**: cuánto tardan en hacerse las cosas.
- **Rendimiento**: cuánto trabajo puede hacer tu sistema en un tiempo determinado.
- **Saturación**: cuánto están trabajando tus computadoras o redes.

Decides qué números son normales para tu sistema. Por ejemplo, si usualmente menos del 5% de las cosas fallan, eso es lo normal.

Cuando haces un experimento, comparas lo que pasa con lo que es normal. Si las cosas cambian mucho, quizás necesites parar y revisar.

### Formulación de hipótesis {id="formulaci%C3%B3n-de-hip%C3%B3tesis"}

Ahora piensas en qué crees que pasará cuando hagas el experimento. Por ejemplo:

- Que las cosas falladas suban al 10% pero luego vuelvan a la normalidad en 2 minutos.
- Que las cosas se pongan más lentas, pero solo por 5 minutos.
- Que no más del 20% de las cosas fallen y que tu sistema siga trabajando casi igual.

Estas ideas te ayudan a decidir cuándo podría ser necesario parar el experimento si las cosas se ponen feas.

### Configuración de experimentos {id="configuraci%C3%B3n-de-experimentos"}

En AWS FIS, necesitas saber tres cosas para hacer un experimento:

**Acciones**: qué tipo de problema vas a causar, como apagar computadoras o llenar el disco duro.

**Destinos**: en qué computadoras o sistemas vas a causar estos problemas.

**Condiciones de detención**: cómo decides si el experimento se está poniendo demasiado riesgoso y necesitas pararlo.

Es mejor empezar poco a poco, como apagar una computadora primero, para ver qué pasa. Luego, puedes probar con más si todo va bien.

Intenta hacer estos experimentos cuando haya menos gente usando tu sistema, para molestar lo menos posible a los usuarios.

## Ejecución y monitorización {id="ejecuci%C3%B3n-y-monitorizaci%C3%B3n"}

### Ejecutar experimentos {id="ejecutar-experimentos"}

Para poner en marcha un experimento con AWS Fault Injection Simulator (AWS FIS), haz lo siguiente:

- Entra a la consola de AWS FIS.
- Elige la plantilla de experimento que quieres usar o haz una nueva.
- Ajusta las acciones, destinos y condiciones de detención del experimento.
- Las **acciones** son los errores que vas a introducir, como apagar instancias EC2 o hacer más lentas las solicitudes.
- Los **destinos** son los lugares donde vas a aplicar esas acciones, como en ciertas instancias o grupos.
- Las **condiciones de detención** te dicen cuándo parar el experimento si las cosas se complican mucho, por ejemplo, si hay muchos errores o la latencia es demasiado alta.
- Cuando todo esté listo, arranca el experimento.
- AWS FIS realizará las acciones en los lugares que escogiste.
- Mientras ocurre, observa lo que pasa para ver si necesitas detener el experimento.

Algunos consejos:

- Empieza con experimentos pequeños y ve aumentando.
- Hazlos cuando tu sistema no esté muy ocupado.
- Establece condiciones de detención para limitar problemas.
- Ten planes por si necesitas arreglar algo que salga mal.

### Monitorización en tiempo real {id="monitorizaci%C3%B3n-en-tiempo-real"}

Mientras el experimento está en marcha, es clave que veas cómo afecta a tu sistema en el momento.

Cosas que puedes observar:

- **Métricas en CloudWatch**: pon tableros para seguir cosas como errores, latencia, uso, etc.
- **Registros y trazas**: busca cosas raras en tus registros o trazas.
- **Alarmas**: pon alarmas que te avisen si algo supera un límite.
- **Sintéticos**: usa pruebas que imiten a usuarios reales en tu sistema.
- **Otros tableros**: si usas herramientas como DataDog o NewRelic, también puedes mirar ahí.

Si ves que el experimento se está saliendo de control:

- **Para el experimento** desde la consola de AWS FIS.
- Aplica tus **planes de arreglo**, como reiniciar sistemas o recursos afectados.
- **Analiza** qué falló y cómo puedes hacer que tu sistema resista mejor esos errores.

Recuerda, la idea no es causar daño, sino encontrar debilidades y hacer tu sistema más fuerte ante problemas. Así que vigila bien y para los experimentos si ves que el impacto es demasiado.

## Análisis de resultados {id="an%C3%A1lisis-de-resultados"}

### Interpretación de resultados {id="interpretaci%C3%B3n-de-resultados"}

Después de hacer un experimento con AWS Fault Injection Simulator, es importante mirar qué pasó para entender cómo podemos mejorar. Aquí te dejo unos pasos sencillos:

- Mira las métricas en CloudWatch o en otras herramientas para ver cómo cambió el comportamiento de tu sistema durante el experimento. Fíjate en las diferencias grandes.
- Chequea los registros para encontrar errores o cosas raras que pasaron. Esto te ayuda a entender mejor la situación.
- Compara lo que viste con lo que pensabas que iba a pasar. ¿Se comportó tu sistema como esperabas? Si no, piensa en qué fue diferente.
- Identifica los problemas que encontraste. Puede ser que tu sistema tuvo muchos errores, se puso lento, o le costó recuperarse.
- Escribe qué aprendiste y cómo crees que podrías mejorar tu sistema para que sea más fuerte.

### Estrategias de mejora {id="estrategias-de-mejora"}

Ahora que sabes qué no funcionó tan bien, aquí tienes algunas ideas para mejorar:

- Añade chequeos de cómo va todo y asegúrate de que tu código pueda intentar de nuevo si algo falla.
- Usa más de un recurso para las partes más importantes de tu sistema, como las bases de datos.
- Haz que tu sistema pueda crecer automáticamente si necesita manejar más trabajo.
- Prepárate mejor para responder rápido si algo no va bien.
- Usa más métricas y alarmas para estar al tanto de cómo va todo.
- Automatiza cómo arreglar problemas, por ejemplo, con scripts.
- Sigue las mejores prácticas recomendadas por AWS.
- Haz estos experimentos regularmente, especialmente cuando estés haciendo cambios, para asegurarte de que todo sigue funcionando bien.

Escribe los cambios que hagas y prueba de nuevo para ver si solucionaste los problemas. La idea es seguir probando y mejorando para que tu sistema sea cada vez más confiable.

## Mejores prácticas {id="mejores-pr%C3%A1cticas"}

### Recomendaciones {id="recomendaciones"}

Cuando uses AWS Fault Injection Simulator para hacer ingeniería del caos, es bueno seguir estos consejos:

- Empieza probando en un ambiente que no sea de producción antes de hacerlo en el real. Así entiendes mejor qué puede pasar.
- Usa CloudWatch para poner métricas y alarmas que te ayuden a ver cómo va el experimento. Si algo sale mal, puedes pararlo rápido.
- Pon reglas para que el experimento se detenga solo si las cosas se ponen muy malas, como si hay muchos errores.
- Es mejor hacer estas pruebas cuando hay poca gente usando tu sistema, para no afectarlos tanto.
- Ten un plan para solucionar problemas rápido si el experimento afecta tu sistema más de lo esperado.
- Si puedes, haz que estos experimentos se hagan solos, por ejemplo, como parte de tu proceso de CI/CD.
- Después de cada prueba, mira bien los resultados para saber cómo puedes hacer tu sistema más fuerte.
- Haz estas pruebas seguido, porque tu sistema siempre está cambiando.

### Errores comunes {id="errores-comunes"}

Evita estos errores comunes:

- No hagas pruebas muy fuertes sin estar preparado. Podrías causar problemas grandes.
- Es importante ver cómo va el experimento mientras se hace, para poder actuar si algo no va bien.
- Siempre ten un plan de cómo arreglar cosas si el experimento sale mal.
- No empieces probando en el ambiente de producción. Primero hazlo en un lugar controlado.
- Es clave mirar los resultados de las pruebas y usar esa información para mejorar.
- No dejes de hacer estas pruebas solo porque todo parece estar bien. Siempre hay espacio para mejorar.

## Casos de uso {id="casos-de-uso"}

### Netflix {id="netflix"}

Netflix usa la ingeniería del caos y AWS Fault Injection Simulator para asegurarse de que su plataforma de streaming funciona bien, incluso cuando hay problemas. Lo que hacen es simular situaciones como perder algunas de las computadoras que entregan los videos o tener errores en los sistemas que guardan la información de los videos. Esto les ayuda a ver cómo reacciona su sistema y a buscar maneras de mejorarlo.

Por ejemplo, probaron qué pasaba si perdían el 20% de las computadoras que entregan videos y descubrieron que su sistema podía manejarlo gracias a cómo está diseñado. También encontraron que, si había problemas con las bases de datos de los videos, necesitaban tener una forma extra de guardar esa información para que los usuarios no tuvieran problemas.

Así, Netflix usa estas pruebas para hacer que su plataforma sea más fuerte y evitar problemas reales.

### Amazon {id="amazon"}

Amazon también utiliza la ingeniería del caos y AWS Fault Injection Simulator, pero para prepararse para días de mucho movimiento, como el Black Friday. Simulan cosas como un aumento grande en la gente que visita la tienda en línea, lo que pone más carga en los servidores y las bases de datos. Esto les permite ver qué problemas pueden aparecer y arreglarlos antes de que realmente ocurran.

También prueban qué pasaría si fallaran servicios importantes como el procesamiento de pagos o la red de distribución de productos. Esto les ayuda a tener planes listos por si algo no funciona como debería.

Gracias a estas pruebas, Amazon puede manejar bien los días cuando mucha gente compra en línea, asegurando que los clientes tengan una buena experiencia.

## Conclusión {id="conclusi%C3%B3n"}

La idea de usar la ingeniería del caos y herramientas como AWS Fault Injection Simulator es para hacer nuestros sistemas en la nube más fuertes.

Lo que hacemos es simular problemas a propósito para ver cómo responde nuestro sistema. De esta manera, podemos identificar y arreglar puntos débiles antes de que ocurran problemas reales.

Los pasos que seguimos son básicamente:

- Observar cómo funciona normalmente nuestro sistema
- Pensar cómo creemos que el sistema responderá a los problemas
- Preparar los experimentos empezando con cosas pequeñas
- Realizar las pruebas y estar atentos a cómo afectan
- Revisar los resultados para ver qué podemos mejorar
- Hacer cambios y probar de nuevo

Al hacer estas pruebas parte de nuestro proceso de trabajo, ayudamos a que nuestros sistemas estén siempre listos para cualquier cosa.

Así nos aseguramos de que los usuarios tengan una experiencia buena y sin interrupciones, incluso cuando las cosas se ponen difíciles. La ingeniería del caos nos enseña a manejar mejor los desafíos de la tecnología en la nube.

## Related posts

- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
- [Observabilidad en AWS con Amazon X-Ray](/blog/observabilidad-en-aws-con-amazon-x-ray/)
- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Estrategias de Recuperación de Desastres en AWS](/blog/estrategias-de-recuperacion-de-desastres-en-aws/)
