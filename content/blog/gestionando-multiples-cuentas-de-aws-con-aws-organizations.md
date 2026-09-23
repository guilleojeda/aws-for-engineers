+++
url = "/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/"
title = "Gestionando Múltiples Cuentas de AWS con AWS Organizations"
description = "Descubre cómo gestionar múltiples cuentas de AWS de manera eficiente con AWS Organizations. Aprende a unificar cuentas, implementar políticas de seguridad, optimizar costos, cumplir con regulaciones y expandir sin complicaciones."
date = "2024-03-07T23:44:11.481000+00:00"
lastmod = "2024-04-22"
image = "/assets/blog/f49b26fc90f711fa88bba709f6cd19750f1326c8d57fdd43f990ba19d94ed0fb.jpg"
archive_order = 165

[[related]]
title = "Automatización de cumplimiento con AWS Config"
url = "/blog/automatizacion-de-cumplimiento-con-aws-config/"
image = "/assets/blog/887b167cb63dec6854e043dc5d45275a76df14d62e72868fa0871d51c2667146.jpg"

[[related]]
title = "Automatizar Alertas de Costos AWS en 5 Pasos"
url = "/blog/automatizar-alertas-de-costos-aws-en-5-pasos/"
image = "/assets/blog/cd540f6b1441905ad2c6859cfc1467c85ae9d53d84cd4df2277aff1f3cfdb78d.webp"

[[related]]
title = "Integrar Amazon Polly en 5 pasos: Texto a voz realista"
url = "/blog/integrar-amazon-polly-en-5-pasos-texto-a-voz-realista/"
image = "/assets/blog/35cbdc26cad1c09b7dd2fc813a00437b8cf1656c6f9a97953a60da6caff34c9c.jpg"
+++

Si manejas varias cuentas de AWS y buscas simplificar su administración, AWS Organizations es tu mejor aliado. Este servicio permite:

- **Unificar cuentas bajo una sola organización:** Agrupa todas tus cuentas de AWS, facilitando su gestión centralizada.
- **Implementar políticas de seguridad a nivel de organización:** Asegura todas tus cuentas aplicando reglas uniformes.
- **Optimizar costos con facturación consolidada:** Recibe una única factura para todas tus cuentas y aprovecha descuentos por volumen.
- **Cumplir con regulaciones fácilmente:** Establece políticas que ayuden a todas tus cuentas a adherirse a las normativas relevantes.
- **Expansión sin complicaciones:** Añade nuevas cuentas o servicios rápidamente y sin problemas.

Este artículo te guiará paso a paso en el proceso de configuración de AWS Organizations, desde la creación de tu organización hasta la implementación de [AWS Single Sign-On](https://aws.amazon.com/single-sign-on/) (SSO) para un acceso simplificado. Además, te ofrecemos consejos para mantener tu infraestructura segura y eficiente. Si manejas múltiples cuentas de AWS, este artículo es esencial para ti.

### Beneficios de [AWS Organizations](https://aws.amazon.com/organizations) {id="beneficios-de-aws-organizations"}

![AWS Organizations](/assets/blog/0d49b4c62393ce0cdc6d2c3dd7e745e89437ac5e92daf52bc19135f54e1f9eb5.jpg)

Los beneficios principales de usar AWS Organizations incluyen:

- **Administración centralizada**: Te permite controlar todas tus cuentas desde un solo lugar. Esto hace que todo sea más sencillo y te ahorra tiempo.
- **Mayor seguridad**: Puedes poner reglas de seguridad que apliquen a todas las cuentas, manteniendo todo más seguro.
- **Uso compartido de recursos**: Te permite compartir ciertos recursos entre cuentas, lo que puede ahorrar dinero y esfuerzo.
- **Facturación consolidada**: Solo recibes una factura para todas las cuentas, lo que te da una mejor idea de tus gastos. Además, puedes acceder a descuentos por comprar en grande.
- **Cumplimiento normativo**: Te ayuda a mantener todas las cuentas siguiendo las mismas reglas, lo que facilita cumplir con las leyes y regulaciones.

En resumen, AWS Organizations es una herramienta clave para manejar de manera eficiente tus cuentas de AWS cuando tienes varias.

## Prerrequisitos {id="prerrequisitos"}

- Cuenta de AWS existente

Para empezar con AWS Organizations, necesitas tener una cuenta de AWS. Esta cuenta será la principal y desde ella podrás controlar las demás cuentas que agregues.

Es importante que tengas acceso completo a esta cuenta, porque vas a necesitar poder hacer cambios y ajustes para configurar tu organización.

## Paso 1: Crear la organización {id="paso-1%3A-crear-la-organizaci%C3%B3n"}

Para comenzar con AWS Organizations, lo primero es crear tu organización. Esto lo haces desde un lugar en la web de AWS llamado consola de administración de AWS Organizations.

### 1. Ingresar a la consola de AWS Organizations {id="1.-ingresar-a-la-consola-de-aws-organizations"}

- Entra a la [consola de administración de AWS](https://console.aws.amazon.com/) usando tu cuenta de administrador.
- Busca en la lista de Servicios y elige "Organizations".
- Ahora estarás en la consola de administración de [AWS Organizations](https://aws.amazon.com/organizations).

### 2. Hacer clic en "Create Organization" {id="2.-hacer-clic-en-%22create-organization%22"}

- En la pantalla principal de AWS Organizations, busca y pulsa el botón azul que dice "Create Organization".
- Te aparecerá una ventana pidiéndote confirmar la acción.

### 3. Elegir características (opcional) {id="3.-elegir-caracter%C3%ADsticas-(opcional)"}

- En esta ventana, puedes activar "Enable all features" si piensas usar políticas de control de servicio (SCPs) para una gestión más detallada.
- Si no necesitas esto, puedes dejarlo sin activar para mantener las cosas simples.
- Dale clic a "Create organization".

### 4. Revisar y confirmar {id="4.-revisar-y-confirmar"}

- Antes de terminar, revisa que toda la información de tu nueva organización esté correcta.
- Si todo está bien, confirma haciendo clic en "Confirm".

Ahora que ya creaste la organización, puedes agregar cuentas de AWS que ya tengas o crear cuentas nuevas dentro de tu organización.

## Paso 2: Agregar cuentas de AWS {id="paso-2%3A-agregar-cuentas-de-aws"}

Una vez que tienes tu organización lista, puedes añadir cuentas que ya existen o crear nuevas cuentas para incluirlas.

### Invitar cuenta existente {id="invitar-cuenta-existente"}

Para agregar una cuenta que ya tienes a tu organización en AWS Organizations, sigue estos pasos sencillos:

- En la consola de AWS Organizations, busca la sección que dice "Cuentas" a la izquierda.
- Dale clic en "Invitar cuenta".
- Escribe el número de identificación o el alias de la cuenta que quieres agregar.
- Revisa que todo esté correcto y presiona "Enviar invitación".
- El dueño de la cuenta recibirá un correo con un enlace para unirse.
- Cuando acepte la invitación, su cuenta se unirá a tu organización.

### Crear cuenta nueva {id="crear-cuenta-nueva"}

Si prefieres empezar con una cuenta nueva dentro de tu organización de AWS Organizations:

- Ve a "Cuentas" y selecciona "Agregar cuenta".
- Ponle un nombre y un alias a esta cuenta nueva.
- Elige dónde quieres que esté esta cuenta, seleccionando una unidad organizacional (OU).
- Checa los permisos y ajustes de la cuenta.
- Clic en "Crear cuenta".

Tu nueva cuenta estará lista y se agregará de forma automática a tu organización con las opciones que elegiste.

## Paso 3: Usar AWS SSO para Simplificar el Acceso a AWS {id="paso-3%3A-usar-aws-sso-para-simplificar-el-acceso-a-aws"}

### Por qué es bueno usar SSO {id="por-qu%C3%A9-es-bueno-usar-sso"}

AWS Single Sign-On (SSO) te permite entrar a todas tus cuentas de AWS desde un solo lugar. Así, no necesitas recordar un montón de contraseñas diferentes para cada cuenta.

Algunos beneficios de usar SSO son:

- Solo necesitas recordar una contraseña para acceder a todo
- Se acabó tener que manejar muchas contraseñas o claves
- Puedes poner una capa extra de seguridad con la autenticación de dos factores de forma fácil
- Es más sencillo darle a la gente los permisos que necesita sin complicaciones
- Puedes ver fácilmente quién está accediendo a qué
- Mejora la seguridad porque simplifica mucho la gestión

En pocas palabras, AWS SSO te hace la vida más fácil cuando trabajas con varias cuentas de AWS.

### Cómo configurar SSO en AWS {id="c%C3%B3mo-configurar-sso-en-aws"}

Para poner a funcionar SSO en tu organización de AWS, sigue estos pasos:

- Activa AWS SSO desde la consola. Esto crea un lugar central donde se manejan los accesos.
- Escoge un proveedor de identidades. Puedes usar el que viene con AWS SSO, Active Directory, o cualquier otro que sea compatible con SAML 2.0.
- Crea grupos y usuarios dentro de este sistema central. Usar grupos para dar permisos es una buena idea.
- Conecta tus cuentas de AWS con este sistema usando AWS Organizations.
- Define grupos de permisos según los roles y el acceso que quieras dar.
- Asigna estos grupos de usuarios a los permisos sobre las cuentas que elijas. Esto define qué pueden hacer en cada cuenta.
- Ahora, los usuarios pueden entrar una sola vez al portal de SSO y desde ahí acceder a todas las cuentas y recursos que les permitas.

Configurar SSO toma un poco de tiempo al principio, pero después hace mucho más fácil y seguro el manejo de accesos en ambientes con múltiples cuentas.

## Mejores prácticas para AWS Organizations {id="mejores-pr%C3%A1cticas-para-aws-organizations"}

Aquí tienes algunos consejos para sacarle el máximo partido a AWS Organizations y manejar tu infraestructura de manera segura y eficaz.

### Usa la regla del mínimo acceso necesario {id="usa-la-regla-del-m%C3%ADnimo-acceso-necesario"}

Dale a los usuarios y a las cuentas solo los permisos que realmente necesitan.

- Solo permite acceso a lo que necesitan usar
- Revisa de vez en cuando los permisos que has dado
- Si ya no necesitan acceso a algo, quítaselo

Haciendo esto, reduces los riesgos de seguridad y los daños que podrían ocurrir si hay un problema de seguridad.

### Mantén un ojo en los cambios {id="mant%C3%A9n-un-ojo-en-los-cambios"}

Activa CloudTrail para llevar un registro de todo lo que se hace en tu organización.

- CloudTrail te ayuda a revisar qué acciones han hecho los usuarios o servicios
- Es importante revisar estos registros a menudo para buscar cosas raras
- Puedes conectar CloudTrail con otros servicios como CloudWatch para que te avisen si algo extraño pasa

Es crucial saber qué cambios se están haciendo para poder mantener todo bajo control.

### Haz copias de seguridad de lo más importante {id="haz-copias-de-seguridad-de-lo-m%C3%A1s-importante"}

Es buena idea hacer copias de seguridad de configuraciones importantes como las de red y las políticas de IAM.

- Las copias de seguridad te pueden salvar si algo se daña
- Lo mejor es que estas copias se hagan solas, automáticamente
- Checa que las copias estén bien de vez en cuando

Tener una copia de seguridad reciente es clave para poder recuperarte rápido si pasa algo malo o si se cambia algo sin querer.

## Conclusión {id="conclusi%C3%B3n"}

AWS Organizations es una herramienta muy útil cuando tienes que manejar varias cuentas de AWS. Aquí te dejamos lo más importante que te ofrece:

- **Manejo sencillo**: Te permite controlar todas tus cuentas desde un solo lugar. Esto hace que organizar y supervisar sea mucho más fácil.
- **Más seguridad**: Puedes poner reglas de seguridad que valgan para todas tus cuentas. Esto ayuda a que todo esté más protegido.
- **Ahorrar dinero**: Al juntar las facturas y compartir recursos entre cuentas, puedes gastar menos.
- **Seguir las reglas**: Es más fácil asegurarte de que todas tus cuentas sigan las leyes y normas necesarias.
- **Crecer sin problemas**: Añadir nuevas cuentas o servicios es fácil, lo que te permite expandirte sin complicaciones.

### Lo básico para configurar bien AWS Organizations {id="lo-b%C3%A1sico-para-configurar-bien-aws-organizations"}

Para sacarle el máximo partido a AWS Organizations, recuerda hacer lo siguiente:

- Comienza creando tu organización y decide si necesitas todas las funciones que ofrece.
- Invita a las cuentas que ya tienes o crea cuentas nuevas dentro de tu organización.
- Organiza tus cuentas en grupos (o unidades organizativas) que tengan sentido para tu negocio.
- Usa políticas de control de servicio (SCP) para establecer qué se puede y qué no se puede hacer en tus cuentas.
- Configura [AWS Single Sign-On](https://aws.amazon.com/single-sign-on/) (SSO) para hacer más fácil el acceso a las cuentas.

Siguiendo estos consejos desde el principio, te será mucho más fácil manejar y expandir tu entorno de AWS con varias cuentas.

## Preguntas relacionadas {id="preguntas-relacionadas"}

#### ¿Qué servicio te permite juntar y manejar varias cuentas de AWS en un solo lugar? {id="%C2%BFqu%C3%A9-servicio-te-permite-juntar-y-manejar-varias-cuentas-de-aws-en-un-solo-lugar%3F"}

AWS Organizations es un servicio para manejar cuentas que te deja agrupar varias cuentas de AWS en una organización que tú controlas desde un centro. Esto hace más fácil manejar varias cuentas porque te permite poner reglas y controles de manera central.

#### ¿Qué servicio de AWS te da una manera rápida y automática de crear y manejar cuentas de AWS? {id="%C2%BFqu%C3%A9-servicio-de-aws-te-da-una-manera-r%C3%A1pida-y-autom%C3%A1tica-de-crear-y-manejar-cuentas-de-aws%3F"}

AWS Control Tower te ofrece una manera rápida y automática de configurar y manejar cuentas de AWS siguiendo las mejores prácticas. Te permite crear entornos multi-cuenta estandarizados, conocidos como "Landing Zones", de forma sencilla.

#### ¿Qué es una cuenta de AWS? {id="%C2%BFqu%C3%A9-es-una-cuenta-de-aws%3F"}

Una cuenta de AWS es una identidad con permiso para usar los servicios de AWS. Cada cuenta tiene su propia información de facturación y pago. AWS Organizations te permite crear y manejar varias cuentas de AWS desde un solo lugar central.

## Related posts

- [Nube AWS: Guía de Inicio Rápido](/blog/nube-aws-guia-de-inicio-rapido/)
- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Análisis de Costos de AWS con Cost Explorer](/blog/analisis-de-costos-de-aws-con-cost-explorer/)
- [Aprender AWS: guía inicial](/blog/aws-aprender-guia-inicial/)
