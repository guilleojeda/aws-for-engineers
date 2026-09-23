+++
url = "/blog/aws-web-application-firewall-waf/"
title = "AWS Web Application Firewall (WAF)"
description = "Protege tus aplicaciones web en AWS con AWS Web Application Firewall (WAF) y descubre cómo integrarlo con otros servicios de AWS. Aprende sobre sus componentes, casos de uso y mejores prácticas."
date = "2024-03-19T01:28:49.211000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/f5ae0710f3fb74786f37f8332c418ec827d9aa2f6a7d97391b946a243c960cc5.jpg"
archive_order = 116

[[related]]
title = "10 Métricas Clave de DevOps en AWS"
url = "/blog/10-metricas-clave-de-devops-en-aws/"
image = "/assets/blog/98aff2370ca15f9967751abc9551ed600199e2658f301eefd2b348090a4b383d.jpg"

[[related]]
title = "Microservicios en AWS Utilizando Contenedores"
url = "/blog/microservicios-en-aws-utilizando-contenedores/"
image = "/assets/blog/bf2d7e4c78ec347430ffd8446a0053b8647faf03aece9706590a76bf46bde08f.jpg"

[[related]]
title = "Recursos en Español para Certificacion AWS Cloud Practitioner"
url = "/blog/recursos-en-espanol-para-certificacion-aws-cloud-practitioner/"
image = "/assets/blog/8d4ecab3b218a57acfd77f303724311167837f2b5e4570a6bad301f654172056.jpg"
+++

Si buscas proteger tus aplicaciones web en AWS de ataques y bots maliciosos, AWS WAF es tu solución. Este firewall de aplicaciones web te permite controlar el acceso a tus aplicaciones mediante reglas personalizables, ofreciendo protección contra ataques comunes como inyecciones SQL y XSS. Además, se integra perfectamente con otros servicios de AWS, como CloudFront y API Gateway, para brindarte una seguridad completa. Aquí te doy un resumen de lo más importante:

- **Controla el acceso a tus aplicaciones**: Decide qué tráfico permitir o bloquear.
- **Protección actualizada**: Reglas gestionadas por AWS contra las últimas amenazas.
- **Integración con servicios AWS**: Trabaja junto a CloudFront, API Gateway, entre otros.
- **Seguridad escalable**: Maneja grandes volúmenes de tráfico sin comprometer el rendimiento.

AWS WAF es una herramienta clave para mantener tus aplicaciones web seguras, permitiéndote personalizar reglas específicas para tu tráfico esperado, minimizar falsos positivos y revisar métricas regularmente para ajustes necesarios. Implementarlo correctamente puede significar una gran diferencia en la seguridad y disponibilidad de tus aplicaciones web en AWS.

## ¿Qué es AWS WAF? {id="%C2%BFqu%C3%A9-es-aws-waf%3F"}

AWS WAF (Web Application Firewall) es una herramienta de seguridad diseñada para proteger tus aplicaciones web y APIs de ataques y bots malintencionados que pueden hacer que tu página no funcione correctamente, ponga en riesgo tu seguridad o use demasiados recursos.

Esta herramienta te permite decidir qué tráfico puede acceder a tus aplicaciones mediante reglas de seguridad. Esto es útil para manejar el tráfico de bots y detener ataques comunes antes de que afecten tu página.

### Características clave {id="caracter%C3%ADsticas-clave"}

- Defensa contra ataques como inyecciones SQL y XSS, que son formas comunes de intentar dañar tu página.
- Reglas ajustables para proteger tu página según tus necesidades específicas.
- Capacidad para filtrar quién puede acceder a tu página basándose en varios factores como la dirección IP o el tipo de solicitud.
- Fácil de usar con otros servicios de AWS como CloudFront y API Gateway.
- Opción de crear tus propias reglas para luchar contra nuevos ataques.

### Beneficios {id="beneficios"}

- Aumenta la seguridad de tus aplicaciones web y APIs contra bots y varios ataques.
- Mejora el rendimiento al evitar tráfico no deseado antes de que llegue a tu servidor.
- Ayuda a ahorrar en costos al reducir el tráfico innecesario.
- Apoya el cumplimiento de normas de seguridad para tus aplicaciones.
- Mantiene a tus usuarios contentos al asegurar que tu aplicación esté segura.

## Componentes centrales de AWS WAF {id="componentes-centrales-de-aws-waf"}

AWS WAF tiene unos componentes principales que ayudan a mantener tus aplicaciones web seguras:

### Web ACLs {id="web-acls"}

Las Web ACLs son como listas de reglas que usas para proteger tus aplicaciones en AWS. Creas una lista, le agregas reglas que dicen qué hacer con ciertas visitas a tu web, y decides si esas visitas se permiten o se bloquean. Piensa en esto como en hacer una lista de invitados para una fiesta, donde decides quién entra y quién no.

Una Web ACL es básicamente una herramienta de AWS WAF.

### Reglas {id="reglas"}

Las reglas son instrucciones que revisan las visitas a tu página y deciden qué hacer con ellas. Si una visita cumple con los criterios de una regla, puedes bloquearla, permitirla, contarla o incluso ponerle un desafío, como un CAPTCHA. Es como tener un portero que verifica si los visitantes cumplen con ciertas condiciones para entrar.

Una regla no es una herramienta por sí misma en AWS WAF. Solo existe cuando la pones en una Web ACL o en un grupo de reglas.

### Grupos de reglas {id="grupos-de-reglas"}

Puedes crear tus propias reglas o usar grupos de reglas que ya vienen hechos, algunos por AWS y otros por vendedores en AWS Marketplace. Es como tener un kit de herramientas para proteger tu página, con la opción de personalizarlo o usar uno pre-hecho.

Un grupo de reglas sí es una herramienta de AWS WAF.

## Casos de uso comunes {id="casos-de-uso-comunes"}

Algunos ejemplos de cómo AWS WAF puede ser útil:

### Filtrado de tráfico web {id="filtrado-de-tr%C3%A1fico-web"}

Con AWS WAF, puedes crear reglas para controlar quién puede entrar a tus aplicaciones y APIs. Esto incluye:

- **Dirección IP de origen**: Puedes decidir bloquear o permitir ciertos rangos de IP. Esto es útil si quieres evitar visitas sospechosas o si solo quieres que gente de tu oficina acceda.
- **Encabezados de solicitud**: Puedes filtrar visitas basándote en detalles como el tipo de navegador que usan.
- **Cuerpo de la solicitud**: Puedes buscar palabras o patrones específicos en el contenido que la gente envía.
- **URIs**: Puedes decidir qué páginas de tu sitio permites o bloqueas.

Esto te da un control detallado sobre el tráfico a tus aplicaciones.

### Prevención de fraude {id="prevenci%C3%B3n-de-fraude"}

AWS WAF te ayuda a evitar el fraude al monitorear las páginas de acceso como las de inicio de sesión, registro y recuperación de contraseñas. Puedes detectar y bloquear intentos de acceso no autorizados.

Puedes configurar reglas para identificar comportamientos raros, como muchos intentos fallidos de acceso desde una misma IP, lo que ayuda a prevenir ataques.

### Administración con APIs {id="administraci%C3%B3n-con-apis"}

AWS WAF te permite usar APIs para manejar tus Web ACLs y reglas automáticamente. Esto es útil para:

- Crear reglas automáticamente basadas en IPs o patrones identificados por otros sistemas de seguridad.
- Actualizar muchas reglas de una vez si aparecen nuevas amenazas.
- Integrar la configuración de seguridad en tus procesos de despliegue automáticos.

Así, puedes mantener tus defensas de AWS WAF actualizadas y adecuadas a tus necesidades.

## Integración con otros servicios {id="integraci%C3%B3n-con-otros-servicios"}

AWS WAF trabaja junto a otros servicios de AWS para mejorar la seguridad:

### [CloudFront](https://aws.amazon.com/es/cloudfront/) {id="cloudfront"}

![CloudFront](/assets/blog/a0c1460dcd2de2a74c2abb396ba202e626e690d3016495a57156f9f6ab48522a.jpg)

Es una manera de distribuir contenido en la web.

Usar AWS WAF con CloudFront ayuda a proteger tu contenido. Al conectar una Web ACL de AWS WAF con CloudFront, las reglas que has establecido en AWS WAF se aplican al tráfico que pasa por allí. Así, puedes detener solicitudes dañinas antes de que lleguen a tus servidores.

Beneficios de esta combinación incluyen:

- Defensa contra ataques masivos, conocidos como DDoS, absorbiendo mucho tráfico en los puntos de acceso de CloudFront.
- La capacidad de ajustar las reglas de seguridad según el país o región.
- Menos demora al rechazar solicitudes no deseadas cerca de donde están los usuarios.

### [API Gateway](https://aws.amazon.com/es/api-gateway/) {id="api-gateway"}

![API Gateway](/assets/blog/1d1422fb141d525a7f7c259a0fcccd4ad32e60f0db490f4e3b2ee5988fbe5c1f.jpg)

Para crear, publicar y manejar APIs.

AWS WAF puede ayudar a proteger tus APIs en API Gateway. Las reglas que estableces se usan cuando alguien accede a tus APIs.

Esto ayuda a:

- Controlar quién puede hacer qué en tus APIs basándose en su IP o cómo se autentican.
- Parar intentos de adivinar tus contraseñas de API por fuerza bruta.
- Vigilar y gestionar cómo aplicaciones de terceros usan tus APIs.

Como con CloudFront, esto ayuda a proteger tus sistemas y hace que tus APIs funcionen mejor.

### [Application Load Balancer](https://aws.amazon.com/es/elasticloadbalancing/) {id="application-load-balancer"}

![Application Load Balancer](/assets/blog/254f3b4ab30cc71cc179f2b5e35a18d41a5d12f5dfdccac6ec795e13672b8905.jpg)

Para equilibrar la carga de tus aplicaciones.

Puedes poner AWS WAF delante de tus balanceadores de carga para revisar el tráfico antes de que llegue a tus servidores.

Esto es útil si tienes tus servidores en EC2 o en tus propias instalaciones y buscas una protección extra.

Los beneficios son:

- Menos carga en tus servidores al filtrar solicitudes que no son válidas.
- Poder usar diferentes reglas de seguridad para diferentes grupos de servidores.
- Es fácil de añadir sin tener que cambiar tu aplicación actual.

De esta manera, AWS WAF se convierte en una barrera muy efectiva para proteger tus aplicaciones.

## Mejores prácticas {id="mejores-pr%C3%A1cticas"}

Al seguir estas recomendaciones, podrás usar AWS WAF de manera más eficiente:

### Minimizar falsos positivos {id="minimizar-falsos-positivos"}

Es importante ajustar las reglas para evitar bloquear usuarios legítimos. Aquí van algunos consejos:

- Empieza con reglas amplias y luego ve afinándolas. Por ejemplo, primero bloquea rangos grandes de IP y después ve excluyendo las IPs que sabes que son seguras.
- Prueba las reglas en modo "cuenta" antes de decidir bloquear el tráfico, así puedes ver cómo afectan.
- Usa páginas de error que los usuarios puedan ver si son bloqueados por error, para que puedan avisarte.
- Revisa los registros para encontrar solicitudes legítimas que hayan sido bloqueadas y ajusta tus reglas según sea necesario.

### Probar ante varios escenarios {id="probar-ante-varios-escenarios"}

Es importante asegurarse de que tus reglas y Web ACLs funcionen bien en diferentes situaciones. Algunas sugerencias:

- Haz pruebas con varios tipos de solicitudes legítimas y ataques comunes.
- Prueba cómo funcionan desde diferentes lugares y con distintos dispositivos.
- Comprueba que tus reglas personalizadas están trabajando como deberían.
- Asegúrate de que las reglas no estén causando mucha lentitud o problemas de rendimiento.

### Revisar métricas con regularidad {id="revisar-m%C3%A9tricas-con-regularidad"}

Es útil mirar las métricas de AWS WAF en CloudWatch para ver si hay algo raro y hacer ajustes. Por ejemplo:

- Observa las solicitudes que han sido bloqueadas por cada regla para ver si hay nuevos patrones de ataque.
- Revisa las solicitudes que se han permitido para asegurarte de que no haya un aumento sospechoso.
- Mira los tiempos de respuesta para confirmar que no hay problemas de rendimiento debido a reglas muy complejas.
- Cambia los límites si ves que el tráfico normal de tu aplicación cambia.

Al estar al tanto de las métricas, puedes mantener tu AWS WAF funcionando de la mejor manera posible.

## Comenzando con AWS WAF {id="comenzando-con-aws-waf"}

Una guía simple para proteger tu aplicación web con AWS WAF:

### 1. Crear una Web ACL {id="1.-crear-una-web-acl"}

Primero, necesitas crear una Web ACL en AWS WAF. Esto es como hacer una lista de reglas que decides aplicar para proteger tu sitio. Puedes elegir reglas que AWS ya tiene preparadas, como protección contra problemas comunes de seguridad.

## Ejemplo de cómo crear una Web ACL {id="ejemplo-de-c%C3%B3mo-crear-una-web-acl"}

- Nombre: WebACL-miapp
- Región: us-east-1
- Reglas:
- Reglas básicas de OWASP
- Reputación de IP de AWS

### 2. Asociar la Web ACL a un ALB {id="2.-asociar-la-web-acl-a-un-alb"}

Después de crear la Web ACL, necesitas conectarla con tu equilibrador de carga (ALB). Esto hace que el tráfico hacia tu aplicación pase por las reglas que has establecido, ayudando a mantenerla segura.

## Ejemplo {id="ejemplo"}

- Web ACL: WebACL-miapp
- ALB: app-loadbalancer

### 3. Probar y monitorear {id="3.-probar-y-monitorear"}

Ahora, es importante asegurarte de que todo esté funcionando bien. Puedes probar accediendo a tu aplicación normalmente y también intentando con tráfico que simule ataques. Además, es bueno revisar las estadísticas en CloudWatch para ver cuántas solicitudes se bloquean y cuántas pasan, para poder ajustar tus reglas si hace falta.

Ejemplo de métricas para revisar:

- Solicitudes bloqueadas por regla
- Solicitudes permitidas
- Tiempos de respuesta

```
Siguiendo estos pasos, puedes configurar AWS WAF para que proteja tu aplicación web en AWS de manera efectiva.
```

## Conclusión {id="conclusi%C3%B3n"}

AWS WAF es una herramienta muy útil para proteger aplicaciones web y APIs en AWS. Ofrece varias ventajas clave:

- Permite controlar qué tráfico puede acceder a tus aplicaciones mediante reglas personalizables. Esto ayuda a manejar bots y detener ataques comunes.
- Viene con reglas administradas por AWS que se actualizan constantemente para defender contra las últimas amenazas. Esto ahorra mucho trabajo manual.
- Se integra fácilmente con varios servicios como CloudFront, API Gateway y Application Load Balancer para una protección completa.
- Proporciona métricas y logs detallados para monitorear el tráfico y ajustar configuraciones.
- Es escalable para manejar grandes volúmenes de tráfico sin afectar el rendimiento.

Para sacarle el máximo provecho a AWS WAF, es importante:

- Configurar reglas específicas para tu aplicación y tráfico esperado. Las reglas genéricas pueden no ser suficientes.
- Probar con diferentes escenarios para minimizar falsos positivos.
- Revisar métricas regularmente y ajustar según sea necesario.
- Usar WAF junto con otras capas de seguridad para una estrategia de defensa en profundidad.

Si se implementa correctamente, AWS WAF puede bloquear la gran mayoría de tráfico malicioso y bots, lo cual mejora mucho la seguridad y disponibilidad de aplicaciones web en AWS.

## Preguntas relacionadas {id="preguntas-relacionadas"}

### ¿Es AWS WAF un firewall de aplicaciones web? {id="%C2%BFes-aws-waf-un-firewall-de-aplicaciones-web%3F"}

Sí, AWS WAF es un tipo de firewall diseñado específicamente para aplicaciones web. Su trabajo es revisar las solicitudes que se hacen a tu aplicación web y decidir cuáles permitir y cuáles bloquear, basándose en las reglas que hayas establecido.

### ¿Es AWS WAF un firewall de Capa 7? {id="%C2%BFes-aws-waf-un-firewall-de-capa-7%3F"}

Sí, AWS WAF funciona en la capa 7 del modelo OSI, que es la capa de aplicación. Esto significa que se enfoca en el tráfico HTTP(S) que va hacia y viene de tu aplicación web, ayudándote a protegerla contra ataques específicos que ocurren en esta capa.

### ¿Qué es WAF en aplicaciones web? {id="%C2%BFqu%C3%A9-es-waf-en-aplicaciones-web%3F"}

Un WAF, o firewall de aplicaciones web, es una herramienta que ayuda a mantener seguras las aplicaciones web. Lo hace filtrando y examinando el tráfico web para detectar y bloquear amenazas, como intentos de hackeo o ataques automáticos de bots, antes de que puedan hacer daño.

### ¿Con qué servicios de AWS se puede usar WAF? {id="%C2%BFcon-qu%C3%A9-servicios-de-aws-se-puede-usar-waf%3F"}

Puedes usar AWS WAF con varios servicios de AWS, incluyendo Amazon CloudFront, Application Load Balancer (ALB), Amazon API Gateway y AWS AppSync. Esto te permite proteger tus aplicaciones web y contenido en diferentes partes de tu infraestructura en AWS, desde tu red de distribución de contenido (CDN) hasta tus balanceadores de carga y APIs.

## Related posts

- [Arquitecturas de Alta Disponibilidad en AWS](/blog/arquitecturas-de-alta-disponibilidad-en-aws/)
- [Seguridad en AWS: Mejores Prácticas](/blog/aws-seguridad-mejores-practicas/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
- [Seguridad en AWS: Servicios Esenciales](/blog/aws-seguridad-servicios-esenciales/)
