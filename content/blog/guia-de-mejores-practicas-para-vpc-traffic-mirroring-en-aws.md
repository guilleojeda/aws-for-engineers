+++
url = "/blog/guia-de-mejores-practicas-para-vpc-traffic-mirroring-en-aws/"
title = "Guía de Mejores Prácticas para VPC Traffic Mirroring en AWS"
description = "Descubre cómo implementar VPC Traffic Mirroring en AWS para mejorar la seguridad, diagnosticar problemas y optimizar el rendimiento de tu red."
date = "2024-10-28T03:11:03.660000+00:00"
lastmod = "2024-11-26"
image = "/assets/blog/06f2f4250afcc07dff4646bf826f78b18ebcf3fb9507eec4d18647c83d6f286e.webp"
archive_order = 44

[[related]]
title = "Visualiza Costos con AWS Cost and Usage Reports y QuickSight"
url = "/blog/visualiza-costos-con-aws-cost-and-usage-reports-y-quicksight/"
image = "/assets/blog/bcf6fecd181e12cedeeed88a06ce3a2772dabdc03625a03f3037d670c0942f94.jpg"

[[related]]
title = "Cómo integrar Terraform con CI/CD en AWS"
url = "/blog/como-integrar-terraform-con-cicd-en-aws/"
image = "/assets/blog/455f2eb1c408f11b2e18115c9a8486c1326982a33e5e8bc314eef79d9ea05e71.jpg"

[[related]]
title = "10 Estrategias para Optimizar Costos de Red en AWS"
url = "/blog/10-estrategias-para-optimizar-costos-de-red-en-aws/"
image = "/assets/blog/732b4db41baecb1699e72d80ecc6438cb1a6f64662f0354f711f7ba99ed0fa12.webp"
+++

VPC Traffic Mirroring es una función de [AWS](https://aws.amazon.com/) que copia el tráfico de red para análisis de seguridad y resolución de problemas. Es como tener una cámara de seguridad para tu red.

**Lo que necesitas saber ahora mismo:**

| Aspecto | Detalle |
| --- | --- |
| Precio | $0.015/hora por origen |
| Límite | 3 sesiones por ENI |
| Compatibilidad | Solo [instancias EC2](/blog/mejores-practicas-para-amazon-ec2/) con Nitro |
| Requisito principal | Puerto UDP 4789 abierto |

**Casos de uso principales:**

- Detectar intrusos en tu red
- Diagnosticar problemas de rendimiento
- Analizar problemas de conectividad

**Componentes básicos:**

| Componente | Función |
| --- | --- |
| Origen | ENI que genera el tráfico |
| Destino | Donde se analiza el tráfico |
| Filtros | Define qué tráfico copiar |
| Sesión | Conecta origen y destino |

**Diferencia clave con VPC Flow Logs:** Traffic Mirroring te da el contenido completo del paquete, no solo metadatos.

> 💡 **Consejo rápido:** Empieza con filtros específicos para reducir costos y mejorar el rendimiento.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/CdeTV4UST64" >}}

## ¿Qué es Traffic Mirroring? {id="%C2%BFqu%C3%A9-es-traffic-mirroring%3F"}

Traffic Mirroring hace una copia EXACTA de tu tráfico de red en VPC. ¿Por qué es esto importante? Porque puedes analizar todo lo que pasa en tu red sin tocar el tráfico original.

Funciona así:

| Pieza | ¿Qué hace? |
| --- | --- |
| Origen | Tu [instancia EC2](/blog/tipos-y-tamanos-de-instancias-ec2-guia-completa/) envía datos |
| Destino | Otra instancia los recibe y analiza |
| Filtros | Decides qué tráfico quieres copiar |
| Sesión | Une origen y destino |

## ¿Cuándo necesitas Traffic Mirroring? {id="%C2%BFcu%C3%A1ndo-necesitas-traffic-mirroring%3F"}

Hay 3 momentos clave:

- Cuando quieres detectar intrusos en tu red
- Si necesitas ver por qué tu red está lenta
- Para encontrar problemas difíciles de red

## ¿Cómo funciona? {id="%C2%BFc%C3%B3mo-funciona%3F"}

Es simple:

1. Copia los datos que entran y salen
2. Los empaqueta en VXLAN
3. Los manda a otro lugar para analizarlos

| Lo que debes saber | Detalles |
| --- | --- |
| Precio | $0.015/hora por origen |
| Límites | 3 sesiones por ENI |
| ¿Dónde funciona? | En instancias EC2 con Nitro |
| Disponibilidad | En todas las [regiones AWS](/blog/arquitecturas-multi-region-en-aws/) |

¿La diferencia con VPC Flow Logs? Traffic Mirroring te da TODO el contenido del paquete, no solo los metadatos. Es como tener una grabación completa vs solo un resumen.

## Partes Principales de Traffic Mirroring {id="partes-principales-de-traffic-mirroring"}

Traffic Mirroring necesita 5 elementos básicos para funcionar. Veamos cada uno:

### Orígenes de Tráfico {id="or%C3%ADgenes-de-tr%C3%A1fico"}

El origen es una ENI (interfaz de red elástica) de EC2 que genera el tráfico a copiar.

| Tipo de Origen | Detalles |
| --- | --- |
| Instancias EC2 | Compatible con Nitro y no-Nitro |
| ENI | Solo tipo `interface` |
| Ubicación | Misma VPC o VPCs distintas |

### Destinos de Tráfico {id="destinos-de-tr%C3%A1fico"}

El destino es donde llega la copia del tráfico. Hay varias opciones:

| Destino | Setup |
| --- | --- |
| ENI en misma VPC | Setup directo |
| ENI otra VPC (misma cuenta) | Necesita VPC peering/gateway |
| ENI otra VPC (otra cuenta) | Necesita peering/gateway entre cuentas |
| Network Load Balancer | Para distribuir tráfico |

### Filtros de Tráfico {id="filtros-de-tr%C3%A1fico"}

Sin filtros configurados, NO se copia nada. Los filtros dicen qué tráfico copiar:

| # | Acción | Protocolo | Puerto | Origen | Destino |
| --- | --- | --- | --- | --- | --- |
| 10 | rechazar | TCP | 22 | red-local | vpc-cidr |
| 20 | aceptar | TCP | todos | 0.0.0.0/0 | 0.0.0.0/0 |

### Sesiones de Mirroring {id="sesiones-de-mirroring"}

Una sesión conecta 3 elementos:

- El origen (ENI)
- El destino
- Los filtros

Puedes tener hasta 3 sesiones por ENI.

### VXLAN {id="vxlan"}

El tráfico va por VXLAN:

- Puerto UDP 4789
- Solo transporta datos
- Sin plano de control
- El destino debe aceptar VXLAN

**OJO**: El tráfico copiado cuenta para los límites de ancho de banda. Por ejemplo: copiar de 10G a 1G puede saturar la red.

## Guías de Configuración {id="gu%C3%ADas-de-configuraci%C3%B3n"}

### Planificación de la Configuración {id="planificaci%C3%B3n-de-la-configuraci%C3%B3n"}

Para empezar con Traffic Mirroring, necesitas estos componentes básicos:

| Recurso | Lo que Necesitas |
| --- | --- |
| VPC | IGW activo |
| Subredes | 1+ pública |
| Instancias EC2 | 3 (origen, destino, monitoreo) |
| ENIs | 1 por instancia |
| Permisos IAM | Control de Traffic Mirroring |

### Configuración de Seguridad {id="configuraci%C3%B3n-de-seguridad"}

Aquí están los puntos de seguridad que DEBES configurar:

| Elemento | Qué Hacer |
| --- | --- |
| Puerto VXLAN | Abrir UDP 4789 |
| Grupos de Seguridad | Permitir tráfico origen |
| ACLs de Red | No bloquear espejo |
| Tablas de Ruta | Ruta al destino |

¿Quieres verificar si funciona? Ejecuta esto:

```
# En la instancia destino
sudo tcpdump -nnni eth0 udp port 4789
```

### Configuración de Rendimiento {id="configuraci%C3%B3n-de-rendimiento"}

Estos son los números que importan:

| Factor | Lo que Debes Saber |
| --- | --- |
| Ancho de banda | X2 del tráfico base |
| Costo | $10.95/mes por ENI origen |
| Límites | 3 sesiones máximo por ENI |

**Para mejor rendimiento:**

- Filtra solo el tráfico que necesitas
- Pon el destino cerca del origen
- Usa NLB para múltiples orígenes
- Activa Auto Scaling en monitoreo

Configura rápido con este comando:

```
aws ec2 create-traffic-mirror-target \
  --network-interface-id eni-1234567890abcdef0 \
  --description "Target principal"
```

Monitorea y ajusta según el uso. Así evitarás sorpresas en costos y rendimiento.

## Opciones de Configuración Avanzada {id="opciones-de-configuraci%C3%B3n-avanzada"}

### Configuración Multi-Cuenta {id="configuraci%C3%B3n-multi-cuenta"}

¿Necesitas monitorear tráfico entre cuentas AWS? Así funciona:

| Cuenta A (Destino) | Cuenta B (Origen) |
| --- | --- |
| 1. Crear EC2 destino | 1. Aceptar compartido |
| 2. Crear Mirror target | 2. Crear EC2 origen |
| 3. Compartir vía RAM | 3. Crear filtros y sesión |

Aquí está el código que necesitas:

```
# Cuenta A - Crear target
aws ec2 create-traffic-mirror-target \
  --network-interface-id eni-destino \
  --description "Target para monitoreo"

# Cuenta B - Crear sesión
aws ec2 create-traffic-mirror-session \
  --network-interface-id eni-origen \
  --traffic-mirror-target-id tmt-compartido \
  --traffic-mirror-filter-id tmf-12345
```

### Configuración Multi-Región {id="configuraci%C3%B3n-multi-regi%C3%B3n"}

Para monitorear entre regiones AWS necesitas:

| Componente | Qué Necesitas |
| --- | --- |
| VPC Peering | Conectar VPCs |
| Transit Gateway | 3+ regiones |
| Rutas | Hacia target |
| VXLAN | Puerto UDP 4789 |

**Lo que debes saber:**

| Elemento | Detalles |
| --- | --- |
| EC2 | Solo Nitro |
| Bandwidth | ≥ origen |
| Cobertura | 26 regiones |
| EC2 Compatibles | C4, D2, G3, H1, I3, M4, P2, P3, R4, X1 |

Para que funcione mejor:

- Usa NLB como target
- Filtra tráfico extra
- Regiones cercanas = mejor performance
- Revisa tus rutas VPC

```
# Test VXLAN
sudo tcpdump -i any 'udp port 4789' -nn
```

## Revisiones y Actualizaciones del Sistema {id="revisiones-y-actualizaciones-del-sistema"}

[CloudWatch](https://aws.amazon.com/cloudwatch/) es la herramienta que necesitas para ver qué pasa con tu tráfico espejado. Veamos lo básico:

| Métrica | Qué Mide | Para Qué Sirve |
| --- | --- | --- |
| NetworkMirrorIn | Bytes que entran | Ver cuánto tráfico llega |
| NetworkMirrorOut | Bytes que salen | Ver cuánto tráfico sale |
| NetworkSkipMirrorIn | Bytes perdidos (entrada) | Detectar pérdidas |
| NetworkSkipMirrorOut | Bytes perdidos (salida) | Detectar pérdidas |

¿Quieres saber los bytes por segundo? Es fácil:

- Si usas monitoreo cada 5 minutos: divide entre 300
- Si usas monitoreo cada minuto: divide entre 60

## ¿Problemas? Aquí las Soluciones {id="%C2%BFproblemas%3F-aqu%C3%AD-las-soluciones"}

| Si Pasa Esto | Revisa | Haz Esto |
| --- | --- | --- |
| No hay conexión | Reachability Analyzer | Las rutas VPC |
| No llega tráfico | Puerto UDP 4789 | Abre el grupo de seguridad |
| Se pierden paquetes | [Métricas CloudWatch](/blog/10-metricas-clave-de-devops-en-aws/) | Baja el MTU a menos de 8500 |
| Hay congestión | Métricas ENA | Quita algunos filtros |

Para ver si todo funciona, usa estos comandos:

```
# Ver tráfico VXLAN
sudo tcpdump -i any 'udp port 4789' -nn

# Estado del endpoint
aws ec2 describe-vpc-endpoints \
  --filters Name=vpc-endpoint-id,Values=vpce-id
```

## Instancias que Puedes Usar {id="instancias-que-puedes-usar"}

| Tipo | Cuáles |
| --- | --- |
| Compute | C4 |
| Memory | R4, X1, X1e |
| Storage | D2, H1, I3 |
| GPU | G3, P2, P3 |
| General | M4 |

**OJO**: No funciona en T2, C3, R3, I2 ni en versiones más viejas.

## Límites del Sistema {id="l%C3%ADmites-del-sistema"}

### Límites Técnicos {id="l%C3%ADmites-t%C3%A9cnicos"}

VPC Traffic Mirroring tiene límites específicos por cuenta y región:

| Recurso | Límite | ¿Ajustable? |
| --- | --- | --- |
| Sesiones por cuenta | 10,000 | No |
| Sesiones por interfaz de red | 3 | No |
| Objetivos por cuenta | 10,000 | No |
| Filtros por cuenta | 10,000 | No |
| Reglas por filtro | 10 | No |
| Fuentes por objetivo (instancias pequeñas) | 10 | No |
| Fuentes por objetivo (instancias grandes) | 100 | No |

El sistema no funciona con:

- Subredes IPv6
- Tráfico ARP
- DHCP
- NTP
- Activación de Windows

Los VPC Flow Logs no capturan el tráfico espejado.

El rendimiento está limitado a:

- MTU: 8,947 bytes sin truncar
- Gateway Load Balancer: 10 Gbps por zona
- Escalado máximo: 100 Gbps

### Control de Costos {id="control-de-costos"}

El tráfico espejado DUPLICA el consumo de ancho de banda. Si tienes 1 Gbps de tráfico bidireccional, necesitarás manejar 4 Gbps en total.

Para reducir gastos:

- Filtra SOLO el tráfico que necesitas analizar
- Ajusta el MTU:
  - IPv4: 54 bytes menos que el objetivo
  - IPv6: 74 bytes menos que el objetivo

**Importante**: AWS da prioridad al tráfico de producción. Esto significa que:

- Puedes perder paquetes espejados durante la congestión
- No se espejan los paquetes bloqueados por grupos de seguridad

## Configuración de Herramientas de Seguridad {id="configuraci%C3%B3n-de-herramientas-de-seguridad"}

### Configuración del Sistema de Seguridad {id="configuraci%C3%B3n-del-sistema-de-seguridad"}

Para poner en marcha VPC Traffic Mirroring, necesitas estos componentes básicos:

| Componente | Requisitos Técnicos | Configuración |
| --- | --- | --- |
| Sistema de Análisis | Bro/Zeek 2.6 o superior | Puerto UDP 4789 abierto |
| AWS Network Firewall | Endpoint en subnet dedicada | Rutas de tráfico configuradas |
| Amazon [GuardDuty](https://aws.amazon.com/guardduty/) | Detector activo | VPC Flow Logs habilitados |

Los sistemas de detección se dividen en:

- **HIDS**: Monitorea desde el host
- **NIDS**: Monitorea desde la red

AWS Network Firewall usa [Suricata](https://suricata.io/) y te da:

- Filtrado de tráfico VPC
- Ajuste automático según necesidad
- Defensa contra intrusiones

### Análisis del Tráfico {id="an%C3%A1lisis-del-tr%C3%A1fico"}

Estas son las herramientas principales para ver el tráfico:

| Herramienta | Uso Principal | Características |
| --- | --- | --- |
| [Wireshark](https://www.wireshark.org/) | Análisis de paquetes | Captura y análisis detallado |
| tcpdump | Captura básica | Preinstalado en [Amazon Linux](https://aws.amazon.com/es/amazon-linux-2/faqs/) |
| [CloudShark](https://www.qacafe.com/analysis-tools/cloudshark/) | Análisis colaborativo | Integración con VPC Traffic Mirroring |

Para verificar que todo funciona:

1. **Revisa el puerto**: Usa tcpdump en UDP 4789
2. **Confirma paquetes**: Busca tráfico VXLAN
3. **Analiza datos**: Usa las herramientas de análisis

Lo más importante:

- Abre el puerto UDP 4789 en tus grupos de seguridad
- Confirma que los paquetes llegan a tu instancia
- Usa CloudShark si trabajas en equipo

## Reglas y Registros {id="reglas-y-registros"}

AWS ofrece controles específicos para VPC Traffic Mirroring que facilitan el cumplimiento normativo:

| Aspecto | Configuración | Función |
| --- | --- | --- |
| IAM | Roles específicos | Control de acceso al mirroring |
| Filtros | 10 reglas máximo | Define el tráfico a capturar |
| CloudWatch | Métricas en vivo | Monitoreo del tráfico |
| Sesiones | 10,000 por cuenta | Control de recursos |

CloudWatch te muestra estos datos clave:

| Métrica | Qué mide |
| --- | --- |
| NetworkMirrorIn | Bytes que entran y se reflejan |
| NetworkMirrorOut | Bytes que salen y se reflejan |
| NetworkSkipMirrorIn | Bytes no reflejados |
| NetworkPacketsMirrorIn | Paquetes que entran y se reflejan |
| NetworkPacketsMirrorOut | Paquetes que salen y se reflejan |

Para el registro del tráfico necesitas:

| Elemento | Qué hace | Info extra |
| --- | --- | --- |
| CloudWatch | Métricas en tiempo real | Datos de uso |
| Dimensiones | Filtra datos | Por grupo, imagen o instancia |
| Precio | $0.015/hora | Por origen de reflejo |
| Cobertura | 22 regiones | No en Sydney, Beijing, Ningxia |

**Lo que debes hacer:**

- Configura [alertas en CloudWatch](/blog/mejores-practicas-de-observabilidad-en-aws/)
- Documenta tus filtros y reglas
- Anota los cambios de configuración
- Rastrea los costos de transferencia

**Sobre los costos**: Los cargos siguen hasta eliminar todas las sesiones. Ten en cuenta costos extra si usas gateways o balanceadores.

## Mejoras del Sistema {id="mejoras-del-sistema"}

### Uso de Recursos {id="uso-de-recursos"}

El VPC Traffic Mirroring necesita una configuración específica para funcionar mejor. Aquí te muestro cómo:

| Aspecto | Técnica | Beneficio |
| --- | --- | --- |
| Ubicación | Despliegue cercano | Menos latencia y costos |
| Filtrado | Espejo selectivo | Solo tráfico importante |
| DNS | Espejo DNS total | Datos clave, poco volumen |
| Puntos | WAFs y NLBs | Más visibilidad |

Lo que DEBES hacer:

- Pon monitores en puntos clave
- Ajusta el MTU del destino
- Usa CloudFormation
- No pases de 3 sesiones por interfaz

### Reducción de Costos {id="reducci%C3%B3n-de-costos"}

| Estrategia | Ahorro | Notas |
| --- | --- | --- |
| NAT Gateway juntos | $162/año/10 EC2 | $1.50/hora gateway |
| Datos intra-región | $0.01/GB | Entre zonas |
| ENI espejo | $0.015/hora | Por interfaz |
| Datos comprimidos | Varía | Menos ancho banda |

Para gastar MENOS:

- Usa Cost Explorer para ver gastos
- Configura Budgets para alertas
- Borra EBS sin uso
- Pon etiquetas a todo

> "En Atlassian juntamos NAT Gateways en AWS. Resultado: red más rápida y menos gastos" - Ben McAlary, Ingeniero Principal.

| Tráfico | Cuándo Espejar |
| --- | --- |
| Principal | Servidores core |
| Importante | Rutas de datos |
| Raro | FTP no permitido |
| DNS | Todo |

Para que todo funcione MEJOR:

- No salgas de tu región
- Usa CloudFront cache
- Revisa AutoScaling
- Mira el uso de IPs

## Preguntas Frecuentes {id="preguntas-frecuentes"}

### ¿Qué instancias soportan Traffic Mirroring en [AWS](https://aws.amazon.com/)? {id="%C2%BFqu%C3%A9-instancias-soportan-traffic-mirroring-en-aws%3F"}

![AWS](/assets/blog/2ebe3cf8e7ae57e98d3af846b3dae0c78a497d5c6b20855b8918efd0886f0265.jpg)

El soporte de Traffic Mirroring varía según el tipo de instancia:

| Tipo de Instancia | Soporte de Traffic Mirroring |
| --- | --- |
| No-Nitro | C4, D2, G3, G3s, H1, I3, M4, P2, P3, R4, X1, X1e |
| Nitro | No soportado (M6a, M6i, M6in, M7g, etc.) |
| T2 | No soportado |
| Bare Metal | No soportado |

Para cambiar el tipo de instancia:

1. Detén la instancia EC2
2. Espera a que se detenga por completo
3. Cambia el tipo desde "Acciones" > "Configuración de instancia"

### ¿Qué servicio de AWS se usa para controlar el tráfico de subredes VPC? {id="%C2%BFqu%C3%A9-servicio-de-aws-se-usa-para-controlar-el-tr%C3%A1fico-de-subredes-vpc%3F"}

Los ACLs de red son tu mejor opción para manejar el tráfico en las subredes:

| Aspecto | Función |
| --- | --- |
| Control de Entrada | Filtrado de tráfico entrante |
| Control de Salida | Filtrado de tráfico saliente |
| IAM | Gestión de accesos a recursos |
| Federación | Control de identidades |

### ¿Qué es Traffic Mirroring en VPC? {id="%C2%BFqu%C3%A9-es-traffic-mirroring-en-vpc%3F"}

Traffic Mirroring copia el tráfico de red de interfaces elásticas tipo 'interface'.

Aquí lo que debes saber:

| Limitaciones | Detalles |
| --- | --- |
| IPv6 | No funciona en subredes solo-IPv6 |
| Tráfico Excluido | ARP, DHCP, metadata, NTP, activación Windows |
| Puerto Requerido | UDP 4789 para tráfico VXLAN |

### ¿Qué es Traffic Mirroring en AWS? {id="%C2%BFqu%C3%A9-es-traffic-mirroring-en-aws%3F"}

Traffic Mirroring te permite:

- Copiar tráfico de red
- Analizar el tráfico con herramientas de seguridad
- Detectar amenazas
- Resolver problemas de red

**Tip**: Usa Reachability Analyzer para confirmar la conectividad entre el origen y destino del espejo.

## Related posts

- [Mejores prácticas AWS para DevOps](/blog/mejores-practicas-aws-para-devops/)
- [Conceptos Básicos y Avanzados de Amazon VPC](/blog/conceptos-basicos-y-avanzados-de-amazon-vpc/)
- [Observabilidad en AWS con Amazon X-Ray](/blog/observabilidad-en-aws-con-amazon-x-ray/)
- [Mejores Prácticas de Seguridad en AWS](/blog/mejores-practicas-de-seguridad-en-aws/)
