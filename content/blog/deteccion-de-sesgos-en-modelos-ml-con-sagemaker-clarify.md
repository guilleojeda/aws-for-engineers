+++
url = "/blog/deteccion-de-sesgos-en-modelos-ml-con-sagemaker-clarify/"
title = "Detección de Sesgos en Modelos ML con SageMaker Clarify"
description = "Descubre cómo SageMaker Clarify puede ayudarte a detectar y mitigar sesgos en modelos de ML. Aprende sobre las mejores prácticas y recursos para desarrollar modelos éticos y confiables."
date = "2024-05-17T01:45:54.229000+00:00"
lastmod = "2024-05-20"
image = "/assets/blog/055e62c5fbddebf94a936e62679cf92f9534356d8f9fa29c65056432687d3150.jpg"
archive_order = 62

[[related]]
title = "CloudWatch y EventBridge: Integración"
url = "/blog/cloudwatch-y-eventbridge-integracion/"
image = "/assets/blog/382dfac33d6132edaa6b8e63903539e952c12f22eb2309538837d45ef125b228.jpg"

[[related]]
title = "Arquitecturas Dirigidas por Eventos en AWS"
url = "/blog/arquitecturas-dirigidas-por-eventos-en-aws/"
image = "/assets/blog/1a0df738c1ab9c313bf601447fd31bc7c8f348faf7982d3323d9ebd82f0cfe8e.jpg"

[[related]]
title = "Gestionando Múltiples Cuentas de AWS con AWS Organizations"
url = "/blog/gestionando-multiples-cuentas-de-aws-con-aws-organizations/"
image = "/assets/blog/f49b26fc90f711fa88bba709f6cd19750f1326c8d57fdd43f990ba19d94ed0fb.jpg"
+++

[**SageMaker Clarify**](https://aws.amazon.com/sagemaker/clarify/) es una herramienta de [AWS](https://aws.amazon.com/) que permite detectar sesgos en modelos de aprendizaje automático y explicar sus predicciones. Esto es crucial para garantizar decisiones automatizadas justas y transparentes, evitando que los modelos refuercen o aumenten los sesgos presentes en los datos.

**Beneficios Clave:**

- Identifica sesgos en los datos y modelos de ML
- Proporciona métricas visuales y cuantitativas de sesgo
- Ayuda a cumplir con normativas y principios éticos
- Permite mitigar sesgos mediante técnicas como re-muestreo, re-pesaje y debiasing adversarial

**Proceso de Detección de Sesgos con SageMaker Clarify:**

1. **Preparación de Datos:** Carga, preprocesa y sube tu conjunto de datos a [Amazon S3](https://aws.amazon.com/s3/).
2. **Configuración:** Define los objetos `DataConfig` y `BiasConfig` para especificar los datos de entrada, salida y atributos sensibles.
3. **Ejecución:** Ejecuta el trabajo de procesamiento con `SageMakerClarifyProcessor`.
4. **Análisis de Resultados:** Accede al informe de sesgo y analiza las métricas clave como CI, DPL, DPPL y AD.
5. **Mitigación:** Aplica estrategias como re-muestreo, re-pesaje y debiasing adversarial para reducir los sesgos detectados.

**Resumen:**

SageMaker Clarify es una herramienta poderosa para identificar y mitigar sesgos en modelos de ML, asegurando resultados precisos y justos. Al seguir las mejores prácticas y utilizar los recursos adecuados, puedes desarrollar modelos de ML confiables y éticos.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/jvcPZmnXaxo" >}}

## Introducción {id="introducci%C3%B3n"}

### ¿Qué es [SageMaker Clarify](https://aws.amazon.com/sagemaker/clarify/)? {id="%C2%BFqu%C3%A9-es-sagemaker-clarify%3F"}

![SageMaker Clarify](/assets/blog/c439bd935e1a15802d8316726d0249b56ac3af1ea47a2df28ab89af586d4ad20.jpg)

SageMaker Clarify es una herramienta de Amazon SageMaker que ofrece información sobre los datos y modelos de aprendizaje automático. Permite detectar sesgos en los modelos y explicar las predicciones, lo cual es importante para asegurar decisiones automatizadas justas y transparentes.

### ¿Por qué verificar sesgos en modelos ML? {id="%C2%BFpor-qu%C3%A9-verificar-sesgos-en-modelos-ml%3F"}

Detectar sesgos en modelos de aprendizaje automático es importante para evitar que los modelos refuercen o aumenten los sesgos presentes en los datos. Los sesgos pueden llevar a discriminación o decisiones injustas. Además, es necesario para cumplir con normativas y principios éticos en la creación de modelos.

### Visión general de la guía {id="visi%C3%B3n-general-de-la-gu%C3%ADa"}

En esta guía, aprenderás a usar SageMaker Clarify para detectar sesgos en modelos de aprendizaje automático. Cubriremos:

- Requisitos de configuración
- Preparación de datos
- Configuración de SageMaker Clarify
- Ejecución de la detección de sesgos
- Análisis de resultados

Al final, podrás detectar y mitigar sesgos en tus modelos usando SageMaker Clarify.

## Setup Requirements {id="setup-requirements"}

### Requisitos de Herramientas y Servicios {id="requisitos-de-herramientas-y-servicios"}

Para seguir esta guía, necesitarás:

- Una cuenta de AWS activa
- SageMaker Clarify configurado en tu cuenta de AWS
- Un conjunto de datos para analizar (puedes usar un conjunto de datos público o crear uno propio)

### Configuración de SageMaker Clarify {id="configuraci%C3%B3n-de-sagemaker-clarify"}

Para configurar SageMaker Clarify, sigue estos pasos:

1. Inicia sesión en la consola de AWS y navega a la página de SageMaker Clarify.
2. Haz clic en "Crear un procesador de Clarify" y sigue las instrucciones para configurarlo.
3. Una vez configurado, puedes usarlo para analizar tus conjuntos de datos.

Para más detalles, consulta la documentación de AWS.

## Preparación de Datos {id="preparaci%C3%B3n-de-datos"}

Para preparar tu conjunto de datos para la detección de sesgos usando SageMaker Clarify, sigue estos pasos:

### Carga del Conjunto de Datos {id="carga-del-conjunto-de-datos"}

Carga tu conjunto de datos en un DataFrame de [pandas](https://pandas.pydata.org/) o un formato similar. Esto te permitirá manipular y analizar tus datos fácilmente. Asegúrate de manejar cualquier valor faltante o valores atípicos en tu conjunto de datos.

### Preprocesamiento de Datos {id="preprocesamiento-de-datos"}

Preprocesa tus datos limpiándolos y formateándolos adecuadamente. Esto puede incluir tareas como:

- Manejo de valores faltantes
- Codificación de variables categóricas
- Escalado de variables numéricas
- Eliminación de duplicados o datos irrelevantes

### Subida de Datos a S3 {id="subida-de-datos-a-s3"}

Sube tu conjunto de datos preparado a un bucket de Amazon S3. Esto te permitirá acceder a tus datos desde SageMaker Clarify y ejecutar trabajos de detección de sesgos. Asegúrate de seguir las [mejores prácticas de AWS](/blog/mejores-practicas-aws-para-devops/) para el almacenamiento y la seguridad de datos.

## Configuración de SageMaker Clarify {id="configuraci%C3%B3n-de-sagemaker-clarify-1"}

Para configurar SageMaker Clarify para la detección de sesgos, sigue estos pasos:

### Configuración de DataConfig {id="configuraci%C3%B3n-de-dataconfig"}

Primero, configura el objeto `DataConfig` que especifica las columnas objetivo, la entrada de datos y los caminos de salida. Aquí tienes un ejemplo:

```
from sagemaker import DataConfig

data_config = DataConfig(
    s3_data_distribution_type='FullyReplicated',
    s3_input_path='s3://mi-bucket/data/train',
    s3_output_path='s3://mi-bucket/data/output',
    input_mode='File',
    compression=None,
    max_runtime_in_seconds=3600
)
```

### Definición de BiasConfig {id="definici%C3%B3n-de-biasconfig"}

Luego, configura el objeto `BiasConfig` que define los atributos sensibles y los resultados deseados. Aquí tienes un ejemplo:

```
from sagemaker import BiasConfig

bias_config = BiasConfig(
    label_values_or_thresholds=['0', '1'],
    facet_name='ForeignWorker',
    facet_values_or_thresholds=['0'],
    methods=['pre_training_bias', 'post_training_bias']
)
```

### Creación de SageMakerClarifyProcessor {id="creaci%C3%B3n-de-sagemakerclarifyprocessor"}

Finalmente, crea un objeto `SageMakerClarifyProcessor` que especifica la instancia y el tipo de instancia para ejecutar el trabajo de detección de sesgos. Aquí tienes un ejemplo:

```
from sagemaker import SageMakerClarifyProcessor

clarify_processor = SageMakerClarifyProcessor(
    role='sagemaker-execution-role',
    instance_count=1,
    instance_type='ml.c5.xlarge',
    sagemaker_session=sagemaker.Session()
)
```

Una vez configurados estos objetos, estarás listo para ejecutar el trabajo de detección de sesgos con SageMaker Clarify.

## Running Bias Detection {id="running-bias-detection"}

### Ejecutar el trabajo de procesamiento {id="ejecutar-el-trabajo-de-procesamiento"}

Una vez que hayas configurado el objeto `SageMakerClarifyProcessor`, puedes ejecutar el trabajo de procesamiento para detectar sesgos en tus modelos de machine learning. Para hacer esto, llama al método `run` del objeto `SageMakerClarifyProcessor` y pasa el objeto `DataConfig` y `BiasConfig` como parámetros.

```
clarify_processor.run(data_config, bias_config)
```

Después de ejecutar el trabajo, SageMaker Clarify comenzará a procesar tus datos y a calcular las métricas de sesgo. Puedes monitorear el progreso del trabajo utilizando CloudWatch u otras herramientas de monitoreo.

### Revisar los registros del trabajo {id="revisar-los-registros-del-trabajo"}

Una vez que el trabajo haya finalizado, puedes revisar los registros para verificar que se haya ejecutado correctamente. Puedes hacer esto utilizando CloudWatch u otras herramientas de monitoreo.

Para revisar los registros del trabajo, sigue estos pasos:

1. Abre la consola de [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/).
2. Selecciona el servicio de SageMaker en la lista desplegable de servicios.
3. Selecciona el nombre del trabajo de procesamiento que deseas revisar.
4. Haz clic en "Ver registros" para ver los detalles del trabajo.

En los registros, puedes ver información sobre el progreso del trabajo, incluyendo cualquier error o advertencia que se haya producido.

Una vez que hayas revisado los registros, puedes proceder a analizar los resultados de la detección de sesgos.

## Analyzing Results {id="analyzing-results"}

Una vez que hayas ejecutado el trabajo de procesamiento, SageMaker Clarify generará un informe de sesgo con información sobre los resultados. En esta sección, te guiaré a través del análisis de estos resultados.

### Accessing Bias Report {id="accessing-bias-report"}

Para acceder al informe de sesgo, sigue estos pasos:

1. Abre la consola de Amazon SageMaker.
2. Selecciona el nombre del trabajo de procesamiento que deseas revisar.
3. Haz clic en "Ver resultados" para ver los detalles del trabajo.
4. En la pestaña "Resultados", busca el enlace para descargar el informe de sesgo en formato JSON o CSV.

### Understanding Bias Metrics {id="understanding-bias-metrics"}

SageMaker Clarify proporciona varias métricas de sesgo para identificar y cuantificar los sesgos en tus modelos. Aquí tienes algunas de las métricas más comunes:

| Métrica de sesgo | Descripción |
| --- | --- |
| CI (Class Imbalance) | Mide la diferencia en la proporción de etiquetas positivas y negativas en el conjunto de datos. |
| DPL (Difference in Positive Proportions in Labels) | Mide la diferencia en la proporción de etiquetas positivas entre diferentes grupos de características. |
| DPPL (Difference in Positive Proportions in Predicted Labels) | Mide la diferencia en la proporción de etiquetas positivas predichas entre diferentes grupos de características. |
| AD (Accuracy Difference) | Mide la diferencia en la precisión del modelo entre diferentes grupos de características. |

### Visualizing Results {id="visualizing-results"}

Para visualizar los resultados de la detección de sesgos, puedes usar gráficos y diagramas. Por ejemplo:

- Un gráfico de barras para mostrar la distribución de las etiquetas positivas y negativas.
- Un gráfico de dispersión para mostrar la relación entre las características y las etiquetas predichas.

Al analizar los resultados, considera múltiples métricas de sesgo y visualiza los datos para identificar patrones y tendencias.

## Mitigación de Sesgos Detectados {id="mitigaci%C3%B3n-de-sesgos-detectados"}

Una vez que hayas identificado los sesgos en tus modelos de machine learning, es importante tomar medidas para mitigarlos. Aquí te presento algunas estrategias y prácticas recomendadas para abordar los sesgos detectados.

### Estrategias para Mitigar Sesgos {id="estrategias-para-mitigar-sesgos"}

Existen varias formas de mitigar los sesgos en tus modelos de machine learning. Algunas de las estrategias más comunes incluyen:

- **Re-muestreo**: Ajustar el conjunto de datos para que sea representativo de la población objetivo.
- **Re-pesaje**: Asignar diferentes pesos a los datos para reducir el impacto de los sesgos en el modelo.
- **Ajustes de algoritmos**: Modificar los algoritmos de machine learning para reducir los sesgos.
- **Técnicas de debiasing**: Utilizar técnicas como el debiasing adversarial para reducir los sesgos en el modelo.

### Re-ejecutar la Detección de Sesgos {id="re-ejecutar-la-detecci%C3%B3n-de-sesgos"}

Después de aplicar las estrategias de mitigación, es importante re-ejecutar la detección de sesgos para evaluar si las medidas han sido efectivas. SageMaker Clarify permite re-ejecutar la detección de sesgos fácilmente, lo que te permite evaluar el progreso y ajustar tus estrategias según sea necesario.

Recuerda que la detección y mitigación de sesgos es un proceso continuo que requiere vigilancia y ajustes constantes. Al implementar estas estrategias, podrás reducir los sesgos en tus modelos de machine learning y mejorar la precisión y la confiabilidad de tus resultados.

## Mejores Prácticas y Recursos {id="mejores-pr%C3%A1cticas-y-recursos"}

### Pruebas y Validación {id="pruebas-y-validaci%C3%B3n"}

Es importante probar y validar los resultados de la detección de sesgos para asegurarse de que los problemas se hayan identificado correctamente. Considera los siguientes aspectos:

- Verificar la precisión de los resultados con conjuntos de datos de prueba.
- Evaluar la confiabilidad repitiendo la detección con diferentes conjuntos de datos.
- Considerar posibles sesgos en los datos de prueba.

### Desafíos Comunes y Soluciones {id="desaf%C3%ADos-comunes-y-soluciones"}

Aquí algunos desafíos comunes y sus soluciones:

| Desafío | Solución |
| --- | --- |
| Falta de datos representativos | Recopilar más datos o usar técnicas de re-muestreo. |
| Sesgos en los algoritmos de ML | Usar técnicas de debiasing adversarial o ajustar los algoritmos. |

### Lectura Adicional {id="lectura-adicional"}

Para más información sobre la detección de sesgos y el uso de SageMaker Clarify, consulta los siguientes recursos:

- Documentación de AWS sobre SageMaker Clarify
- Tutorials de AWS sobre detección de sesgos en modelos de ML
- Artículos académicos sobre detección de sesgos en modelos de ML

## Conclusion {id="conclusion"}

En resumen, la detección de sesgos en modelos de machine learning es crucial para asegurarse de que los resultados sean precisos y justos. SageMaker Clarify es una herramienta poderosa que nos permite identificar y mitigar sesgos en nuestros modelos. En esta guía, hemos cubierto los pasos para configurar y ejecutar SageMaker Clarify, así como también hemos discutido las mejores prácticas y recursos adicionales para la detección de sesgos.

### Puntos Clave {id="puntos-clave"}

- La detección de sesgos es un paso esencial en el desarrollo de modelos de machine learning.
- SageMaker Clarify es una herramienta fácil de usar y poderosa para identificar y mitigar sesgos.
- Es importante probar y validar los resultados de la detección de sesgos para asegurarse de que los problemas se hayan identificado correctamente.
- La debiasing adversarial y la re-muestreo son técnicas efectivas para mitigar sesgos en los modelos de machine learning.

## FAQs {id="faqs"}

### ¿Cómo funciona SageMaker Clarify? {id="%C2%BFc%C3%B3mo-funciona-sagemaker-clarify%3F"}

SageMaker Clarify analiza características como género o edad para detectar posibles sesgos. Proporciona un informe visual con métricas y mediciones de sesgos, ayudándote a identificar y corregir estos sesgos.

### ¿Cómo detectar sesgos en modelos? {id="%C2%BFc%C3%B3mo-detectar-sesgos-en-modelos%3F"}

Para detectar sesgos en modelos de machine learning, examina el proceso de recopilación de datos y sus limitaciones. También evalúa el rendimiento del modelo en diferentes subgrupos para identificar disparidades.

### ¿Qué característica de [Amazon SageMaker](https://aws.amazon.com/sagemaker/) ayuda a eliminar sesgos? {id="%C2%BFqu%C3%A9-caracter%C3%ADstica-de-amazon-sagemaker-ayuda-a-eliminar-sesgos%3F"}

![Amazon SageMaker](/assets/blog/5d51e82d4de655ce3d159974c1db92513efd993625ac70222836e21e8f0b5404.jpg)

SageMaker Clarify ayuda a identificar desequilibrios en los datos durante la preparación, sin necesidad de escribir código.

## Related posts

- [Cómo Desarrollar Aplicaciones de Inteligencia Artificial en AWS](/blog/como-desarrollar-aplicaciones-de-inteligencia-artificial-en-aws/)
- [Mejores Prácticas de Machine Learning en AWS](/blog/mejores-practicas-de-machine-learning-en-aws/)
- [10 Preguntas Frecuentes sobre Machine Learning en AWS](/blog/10-preguntas-frecuentes-sobre-machine-learning-en-aws/)
- [Introducción a la Inteligencia Artificial en AWS](/blog/introduccion-a-la-inteligencia-artificial-en-aws/)
