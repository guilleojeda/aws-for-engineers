+++
url = "/blog/10-repositorios-de-github-para-machine-learning-en-aws/"
title = "10 Repositorios de GitHub para Machine Learning en AWS"
description = "Descubre los 10 mejores repositorios de GitHub para implementar Machine Learning en AWS, con ejemplos y recursos prácticos para todos los niveles."
date = "2024-10-27T03:07:38.015000+00:00"
lastmod = "2024-10-27"
image = "/assets/blog/0e7089d339cd0d6e09ee83cda6f4eb5f77bedca65c0f34096256a92c275eee92.webp"
archive_order = 48

[[related]]
title = "Acuerdos de Nivel de Servicio AWS: Guía Básica"
url = "/blog/acuerdos-de-nivel-de-servicio-aws-guia-basica/"
image = "/assets/blog/a1b4827aff914f24a4598eccbc0fb3157821b301049deb06978566880546934b.jpg"

[[related]]
title = "10 Mejores Prácticas de AWS para Detección de Amenazas en Tiempo Real"
url = "/blog/10-mejores-practicas-de-aws-para-deteccion-de-amenazas-en-tiempo-real/"
image = "/assets/blog/c03425ae80465af167cf55e5ca1b4313d8e0bc2deae330f8ab602d3a8a78ca2c.jpg"

[[related]]
title = "Certificación de AWS: Preparación sin Costo"
url = "/blog/certificacion-de-aws-preparacion-sin-costo/"
image = "/assets/blog/b85977e8b87b51eadb100d2e93c4e2ac8fa011ce3114d0a570b75c1e2833d81c.jpg"
+++

¿Buscas código probado para tus proyectos de ML en AWS? Aquí tienes los 10 mejores repositorios de [GitHub](https://github.com/), organizados por caso de uso:

| Repositorio | Para qué sirve | Lo que incluye |
| --- | --- | --- |
| 1. SageMaker 101 Workshop | Empezar con ML | 4 notebooks básicos |
| 2. MLOps Pipeline 100x | Automatizar ML | Pipeline completo |
| 3. Pre-trained Models | Usar modelos listos | 5+ modelos populares |
| 4. AWS ML Learning | Prepararte para certificaciones | Cursos gratuitos |
| 5. Lambda ML Projects | ML sin servidores | [Código serverless](https://www.andmore.dev/es/blog/build-serverless-api-with-no-lambda/) |
| 6. Text & Image Gen | Generar contenido | [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) + [BLOOM](https://huggingface.co/bigscience/bloom) |
| 7. Deep Learning Library | Entrenar modelos | [Contenedores Docker](/blog/como-desplegar-contenedores-en-aws/) |
| 8. MLU-Explain | Aprender conceptos | Gráficos interactivos |
| 9. SageMaker Examples | Código listo para usar | +100 notebooks |
| 10. ML Ethics Tools | ML responsable | [Herramientas anti-sesgo](/blog/deteccion-de-sesgos-en-modelos-ml-con-sagemaker-clarify/) |

Para empezar necesitas:

- Cuenta AWS
- Usuario IAM
- Notebook SageMaker
- Bucket S3

Los repositorios te permiten:

- Entrenar modelos
- Crear pipelines
- Desplegar en producción
- Monitorear resultados

Cada repo incluye código probado, documentación y ejemplos prácticos para implementar ML en AWS rápidamente.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube-nocookie.com/embed/cnS813vKmPk" >}}

## Primeros Pasos con [Amazon SageMaker](https://aws.amazon.com/sagemaker/) {id="primeros-pasos-con-amazon-sagemaker"}

![Amazon SageMaker](/assets/blog/5d51e82d4de655ce3d159974c1db92513efd993625ac70222836e21e8f0b5404.jpg)

¿Quieres empezar con SageMaker? El repositorio "aws-samples/sagemaker-101-workshop" tiene todo lo que necesitas.

| Tipo | Qué Contiene | Dónde Está |
| --- | --- | --- |
| Notebooks Básicos | Algoritmos listos para usar | Pestaña Examples |
| Scripts Python | Código para entrenar | Repo Comunitario |
| Guías | 4 notebooks de mantenimiento | Repo MLOps |
| Ejercicios | Módulos completos | Repo Workshop |

El workshop tiene 4 notebooks principales:

1. **Notebook Base**: ML en Jupyter
2. **Notebook SageMaker**: Código en instancias
3. **Notebook Pipelines**: Flujos automatizados
4. **Notebook Step Functions**: AWS Step Functions

Para empezar, solo necesitas ejecutar:

```
git clone https://github.com/aws-samples/sagemaker-101-workshop
```

¿Qué más incluye?

- Templates para crear instancias
- Guías de recursos
- Conexión con S3 y IAM
- Scripts de pruebas

> "Los ejercicios te ayudan a dominar SageMaker paso a paso" - AWS SageMaker Docs

Plan de aprendizaje:

| Paso | Qué Hacer | Resultado |
| --- | --- | --- |
| 1 | Clonar código | Tener ejemplos |
| 2 | Crear dominio | Ambiente listo |
| 3 | Probar notebooks | Práctica real |
| 4 | Leer docs | Entender todo |

Los ejemplos te enseñan:

- Mantenimiento predictivo
- Manejo de datos
- Entrenamiento ML
- Despliegue de modelos

## 2. Pipelines de ML con SageMaker {id="2.-pipelines-de-ml-con-sagemaker"}

El proyecto "aws-mlops-pipeline-100x" permite construir pipelines que manejan 100 modelos de ML.

| Componente | ¿Qué hace? |
| --- | --- |
| Data Wrangler | Procesa datos de S3 |
| XGBoost | Entrena modelos |
| Model Registry | Guarda modelos |
| Lambda | Automatiza despliegues |

El proyecto incluye 4 stacks de CDK:

- Studio Setup
- Pipeline
- Pipeline Starter
- Inference Results

Así funciona el pipeline:

| Paso | Acción |
| --- | --- |
| Importar | Carga datos de S3 |
| Procesar | Limpia datos |
| Validar | Revisa calidad |
| Entrenar | Optimiza modelo |
| Evaluar | Mide resultados |
| Registrar | Guarda modelo |
| Desplegar | Crea endpoint |

**Ejemplo práctico**: El código usa datos simulados de telecom para predecir qué clientes se darán de baja, mirando:

- Uso del servicio
- Datos de la cuenta
- Si el cliente se fue

Para empezar:

```
# Cambia el nombre del proyecto
cd terraform/infrastructure
vim terraform.tfvars
```

**Tips de uso**:

- Usa SageMaker Projects para CI/CD
- Conéctalo con Jenkins o GitHub
- Agrega checks de datos
- Modifica el despliegue con Lambda

El pipeline funciona con:

| Algoritmo | Tipo |
| --- | --- |
| XGBoost | Nativo de SageMaker |
| Decision Tree | Custom con scikit-learn |

Para usar tu propio contenedor:

1. Crea imagen Docker
2. Súbela a ECR
3. Configura el pipeline

Los datos de prueba vienen de 130 hospitales en EE.UU. (1999-2008), con 50+ variables por paciente.

## 3. Pre-trained Modelos en SageMaker {id="3.-pre-trained-modelos-en-sagemaker"}

SageMaker JumpStart te da acceso directo a modelos pre-entrenados. Aquí están los que más se usan:

| Modelo | Tamaño | Uso Principal |
| --- | --- | --- |
| Code Llama 13B | 13B parámetros | Generación de código |
| Mistral 7B | 7B parámetros | Tareas de texto |
| Alexa TM 20B | 20B parámetros | Generación de texto |
| Bloom 3B | 3B parámetros | Procesamiento de lenguaje |
| Llama 2 13B | 13B parámetros | Tareas generales |

¿Cómo poner estos modelos en producción? Es más simple de lo que parece:

1. **Elige tu modelo**: Según lo que necesites hacer
2. **Despliégalo**: Con SageMaker endpoints
3. **Ajústalo**: Con tus propios datos
4. **Supervisa**: Mide su rendimiento

Para hacer fine-tuning, necesitas:

- 100+ pares de texto (entrada/salida)
- Textos de máximo 512 caracteres
- Dataset con prompts y respuestas

¿Quieres usar un modelo de [Hugging Face](https://huggingface.co/)? Así de fácil:

```
hub = {
    'HF_MODEL_ID': 'distilbert-base-uncased-distilled-squad',
    'HF_TASK': 'question-answering'
}
huggingface_model = HuggingFaceModel(
    transformers_version='4.6',
    pytorch_version='1.7',
    py_version='py36',
    env=hub,
    role=role,
)
```

En Canvas puedes usar estos modelos:

| Modelo | Tipo |
| --- | --- |
| Falcon-7B | Base |
| Falcon-7B-Instruct | Instrucciones |
| MPT-7B | Base |
| MPT-7B-Instruct | Instrucciones |
| Flan-T5-Large | Multilingüe |

Para sacarles el máximo provecho:

- Usa AWS Deep Learning Containers
- Ajusta el endpoint a tu carga de trabajo
- Vigila recursos y costos
- Experimenta con diferentes modelos

## 4. Materiales de Aprendizaje AWS ML {id="4.-materiales-de-aprendizaje-aws-ml"}

AWS trae dos certificaciones en agosto 2024:

| Certificación | Duración | Precio |
| --- | --- | --- |
| AWS Certified AI Practitioner | 120 minutos | $75 |
| AWS Certified Machine Learning Engineer – Associate | 170 minutos | $75 |

¿Quieres prepararte? [AWS Skill Builder](https://skillbuilder.aws/) tiene estos cursos sin costo:

| Curso | ¿Qué aprenderás? |
| --- | --- |
| Foundations of Prompt Engineering | Cómo crear prompts efectivos |
| [Low-Code Machine Learning on AWS](/blog/mejores-practicas-de-machine-learning-en-aws/) | ML sin escribir código |
| Building Language Models on AWS | Desarrollo de LLMs |
| Amazon Transcribe Getting Started | Conversión de voz a texto |
| Building Generative AI Applications Using [Amazon Bedrock](https://aws.amazon.com/bedrock/) | [Apps con IA generativa](https://community.aws/content/2cPcmjVFETxNNLUm1LNkqSOHasu/building-reactjs-generative-ai-apps-with-amazon-bedrock-and-aws-javascript-sdk?lang=es-ES) |

AWS + Code.org tienen una meta: formar a 2 millones de personas en IA generativa para 2025.

La Machine Learning University de Amazon te ofrece:

| Módulo | Tema Principal |
| --- | --- |
| Lecture 1 | Análisis de Datos |
| Lecture 2 | Datos y Regresión Logística |
| Lecture 3 | Equalized Odds y SHAP |

Empresas como Intuit y Grammarly ya usan estos recursos para:

- Hacer el ML más simple
- Capacitar equipos
- Poner modelos en producción

¿Listo para empezar? Es fácil:

1. **Regístrate**: Crea tu cuenta en AWS Skill Builder
2. **Selecciona**: Escoge el curso que mejor te funcione
3. **Practica**: Usa los notebooks disponibles
4. **Certifícate**: Prepárate para el examen

## 5. Proyectos ML con [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) {id="5.-proyectos-ml-con-aws-lambda"}

![AWS Lambda](/assets/blog/b488e933299b4716df2aa49ebf1462f1fcc63d0a392a759d1794f4afa2086302.jpg)

AWS Lambda hace posible ejecutar modelos ML sin servidores. Así funciona:

| Componente | Función |
| --- | --- |
| Docker | Empaqueta modelos y dependencias hasta 10 GB |
| S3 | Almacena modelos entrenados |
| API Gateway | Crea endpoints REST |
| DynamoDB | Guarda resultados |

Los tiempos de carga típicos son:

| Paso | Acción | Tiempo Promedio de Carga |
| --- | --- | --- |
| 1. Carga inicial | Preparar ambiente | 11.4s |
| 2. Cargar modelo | Importar desde S3 | 10.0s |
| 3. Procesar datos | Ejecutar predicción | 8.3s |

**Veamos un ejemplo**: Análisis de sentimientos con FinBERT:

```
from transformers import pipeline

class ModeloSentimientos:
    def __init__(self):
        self._analisis = pipeline("sentiment-analysis", 
                                model="ProsusAI/finbert")
    def predecir(self, texto):
        return self._analisis(texto)[0]["label"]
```

**Y otro con imágenes**: Detección de objetos usando MXNet:

```
def lambda_handler(event, context):
    url = event['img_url']
    img = imdecode(requests.get(url).content)
    x, img = data.transforms.presets.yolo.transform_test([img])
    class_IDs, scores, boxes = net(x)
    return utils.viz.plot_bbox(img, boxes[0], scores[0], 
                             class_IDs[0])
```

Cada tipo de modelo necesita recursos diferentes:

| Tipo de Modelo | Memoria Lambda | CPU |
| --- | --- | --- |
| NLP | 1024 MB | 0.5 vCPU |
| Visión | 2048 MB | 1.0 vCPU |
| Series temporales | 512 MB | 0.25 vCPU |

Para que tu modelo funcione mejor:

- Usa capas Lambda para tus dependencias
- Ajusta la memoria al tamaño de tu modelo
- Mantén la función activa para respuestas más rápidas

¿Quieres aprender más sobre ML serverless? Visita [Dónde Aprendo AWS](/).

## 6. Herramientas de Generación de Texto e Imágenes con IA {id="6.-herramientas-de-generaci%C3%B3n-de-texto-e-im%C3%A1genes-con-ia"}

AWS ofrece varias opciones para generar texto e imágenes con IA. Aquí están los modelos principales:

| Modelo | Uso | Servicio AWS |
| --- | --- | --- |
| Stable Diffusion v1-4 | Texto a imagen | SageMaker |
| BLOOM-1B1 | Generación de texto | SageMaker |
| [Claude](https://www.anthropic.com/claude) 3 Sonnet | Procesamiento de texto | Amazon Bedrock |

**¿Cómo usar Stable Diffusion?**

Así se ve una solicitud básica:

```
# JSON para texto a imagen
{
    "prompt": "Un atardecer en la playa",
    "height": 512,
    "width": 768
}

# JSON para transferencia de estilo
{
    "prompt": "Noche estrellada",
    "url": "https://ejemplo.com/imagen.jpg"
}
```

**Costos por 1M de solicitudes al mes:**

| Servicio | Uso | Costo (USD) |
| --- | --- | --- |
| Amazon S3 | 10 GB almacenamiento | $0.23 |
| AWS Lambda | 1M solicitudes | $0.41 |
| Amazon Bedrock | 1B tokens entrada, 100M salida | $450.00 |

**Tres formas de desplegar:**

- En local: Docker + archivo .env
- En la nube: Amazon ECS con Copilot
- Sin servidor: Auto Scaling + balanceador

**Análisis de feedback:**

| Tipo | Tokens Entrada | Tokens Salida |
| --- | --- | --- |
| Categorización | 1,000 | 100 |
| Sentimiento | 500 | 50 |
| Extracción datos | 2,000 | 200 |

**Modelos disponibles:**

- ChatGLM y ChatGLM2
- LlaMa2
- Stable Diffusion

La app web funciona con Streamlit en contenedores ECS y puede:

- Convertir texto en imágenes
- Transferir estilos
- Crear animaciones

## 7. Biblioteca de Código para Deep Learning de AWS {id="7.-biblioteca-de-c%C3%B3digo-para-deep-learning-de-aws"}

AWS ofrece contenedores Docker listos para usar que facilitan el entrenamiento y despliegue de modelos de deep learning.

Estos son los frameworks principales y sus optimizaciones:

| Framework | Optimizaciones |
| --- | --- |
| TensorFlow | Intel MKL para CPU |
| PyTorch | NVIDIA CUDA para GPU |
| MXNet | Bibliotecas AWS |

Los contenedores se dividen en 3 tipos:

| Tipo | Para qué sirve | Dónde usarlo |
| --- | --- | --- |
| Entrenamiento | Crear modelos | SageMaker, EC2, ECS |
| Inferencia | Usar modelos | SageMaker Endpoints, ECS |
| Transformación | Procesar datos en lotes | SageMaker Transform Jobs |

**¿Qué puedes hacer con estos contenedores?**

- Entrenar BERT con PyTorch
- Crear sistemas de preguntas y respuestas
- Desplegar modelos de detección
- Optimizar modelos con Neo

**Así configuras un contenedor:**

```
# Configuración básica para TensorFlow
{
    "framework": "tensorflow",
    "image_uri": "763104351884.dkr.ecr.us-east-1.amazonaws.com/tensorflow-training:2.12.0-gpu-py39",
    "instance_type": "ml.p3.2xlarge",
    "hyperparameters": {
        "epochs": 10,
        "batch-size": 128,
        "learning-rate": 0.001
    }
}
```

**Datasets de prueba incluidos:**

| Dataset | Tamaño | Para qué sirve |
| --- | --- | --- |
| CIFAR-10 | 60,000 imágenes | Clasificar imágenes |
| BERT-QA | 100,000 preguntas | Procesar texto |
| ImageNet | 1.2M imágenes | Visión artificial |

AWS actualiza estos contenedores cada mes con nuevas versiones y parches. Cada imagen pasa por pruebas exhaustivas antes de publicarse.

## 8. Conceptos de ML Explicados con Gráficos {id="8.-conceptos-de-ml-explicados-con-gr%C3%A1ficos"}

MLU-Explain de Amazon hace que el machine learning sea más fácil de entender. ¿Cómo? Con gráficos que puedes manipular y ejemplos que puedes ver en acción.

| Concepto | Lo Que Verás | Para Qué Sirve |
| --- | --- | --- |
| Regresión Lineal | Gráficos que se mueven | Predecir números |
| Regresión Logística | Ejemplos en movimiento | Decidir sí/no |
| Curvas ROC y AUC | Gráficos paso a paso | Ver qué tan bueno es tu modelo |
| Sets de Datos | Cómo partir tus datos | Preparar datos para entrenar |
| Matrices de Confusión | Tablas que cuentan aciertos | Medir exactitud |

**QuickSight + SageMaker**

QuickSight toma las predicciones de SageMaker y las muestra en pantallas bonitas:

| Qué Hace | Cómo Lo Hace | Dónde Usarlo |
| --- | --- | --- |
| Predice Solo | No necesitas programar | Ver quién se va |
| Muestra Resultados | Gráficos de predicciones | Evaluar préstamos |
| Actualiza en Vivo | Se refresca solo | Ver [métricas clave](/blog/10-metricas-clave-de-devops-en-aws/) |

**Lo Que Puedes Ver**

1\. **Clientes Que Se Van**

Los gráficos te dicen:

- Quién podría irse
- Cuánto dinero perderías
- Por qué se van

2\. **Qué Tan Bueno Es Tu Modelo**

Verás:

- Qué tan seguido aciertas
- Qué tan preciso eres
- Números que importan

3\. **Cómo Funciona Todo**

Te muestra:

- Dónde vive cada parte
- Cómo fluyen los datos
- Cómo salen las predicciones

> "En MLU-Explain queremos que aprender machine learning sea divertido y fácil de entender", dice Amazon MLU.

## 9. Ejemplos de Código en SageMaker {id="9.-ejemplos-de-c%C3%B3digo-en-sagemaker"}

SageMaker ofrece notebooks Jupyter listos para usar. Veamos los más populares:

| Tipo | Contenido | Propósito |
| --- | --- | --- |
| Autopilot | Features, explicabilidad | ML automático |
| Entrenamiento | Algoritmos, datos, ajuste | Modelos custom |
| Frameworks | PyTorch, TensorFlow | ML con frameworks |
| Neo | Compilación | Mejor rendimiento |

**Empezar es Simple**

Para usar estos ejemplos necesitas:

- Una cuenta AWS con permisos IAM
- SageMaker Studio o una instancia Notebook
- Un bucket S3 para tus datos

**Dos Ejemplos Prácticos**

1\. **Clasificación de Precios**

Un caso real con Random Forest:

- 3 horas de trabajo
- Usa S3, IAM y SageMaker
- Código en `script.py`

2\. **Proyecto End-to-End**

Un taller que cubre:

- Data Wrangler para análisis
- Feature Store
- ML Pipelines

**Obtén el Código**

Clona el repo:

```
git clone https://github.com/aws/amazon-sagemaker-examples.git
```

| Ubicación | Acceso |
| --- | --- |
| Studio | Tab "Examples" |
| JupyterLab | Icono SageMaker |
| GitHub | Repo oficial |

**Tips Clave**

- Prueba hiperparámetros en local primero
- Elimina endpoints que no uses
- Lee el README de cada ejemplo

## 10. Ética en el Desarrollo de ML {id="10.-%C3%A9tica-en-el-desarrollo-de-ml"}

El ML necesita equilibrar poder y responsabilidad. AWS proporciona herramientas para lograrlo.

**SageMaker Clarify: Tu Aliado en ML Ético**

| Función | Descripción | Uso |
| --- | --- | --- |
| Detección de Sesgos | 21 métricas diferentes | Pre y post entrenamiento |
| Explicabilidad | SHAP values | Interpretación de predicciones |
| Monitoreo | Alertas automáticas | Modelos en producción |

**¿Cómo Medimos el Sesgo?**

| Métrica | Mide | Ejemplo |
| --- | --- | --- |
| CI | Desequilibrio en datos | Distribución 70-30 |
| DPL | Diferencias entre grupos | Hombres 31.4% vs Mujeres 11.4% |
| AD | Precisión entre grupos | Variación en predicciones |

**Herramientas que Necesitas**

| Herramienta | Propósito | Origen |
| --- | --- | --- |
| AIF360 | Detección de sesgos | IBM |
| Model Cards | Documentación estándar | Google |
| SageMaker Studio | Integración completa | AWS |

**Manos a la Obra**

El repositorio MLU-RA te da todo lo básico:

- Notebooks listos para usar
- Datos de prueba
- Guías paso a paso

**Código para Empezar**

```
from sagemaker import clarify
clarify_processor = clarify.SageMakerClarifyProcessor(
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge'
)
```

**[Líneas Rojas de AWS](/blog/aws-seguridad-servicios-esenciales/)**

AWS dice NO a:

- Desinformación intencional
- Violación de privacidad
- Suplantación no autorizada
- Daños a menores

¿El siguiente paso? Empieza evaluando sesgos en tus datos, configura monitores y documenta TODO.

## Conclusión {id="conclusi%C3%B3n"}

Los repositorios de GitHub para ML en AWS te dan todo lo que necesitas para cada etapa de tu proyecto.

| Fase | Repositorio | ¿Qué hace? |
| --- | --- | --- |
| Inicio | sagemaker-101-workshop | Te enseña lo básico del entrenamiento |
| Desarrollo | Amazon SageMaker Examples | Te da notebooks listos para usar |
| Producción | MLOps: idea to production | Te guía de A a Z en 6 pasos |

¿Qué hacer después? Aquí están los 3 pasos clave:

| Paso | Con qué | Para qué |
| --- | --- | --- |
| Conecta tu modelo | API Gateway + Lambda | Crear APIs para tus modelos |
| Vigila el rendimiento | SageMaker Studio | Ver cómo funciona todo |
| Organiza tus datos | Feature Store | Guardar datos ordenadamente |

Los números hablan por sí solos:

| Qué hay | Cuántos | Qué incluyen |
| --- | --- | --- |
| Repos AWS Samples | 6,542 | Código probado y listo |
| Notebooks SageMaker | +100 | Ejemplos paso a paso |
| Módulos Workshop | 7 | De datos a API REST |

¿Qué máquinas necesitas? Aquí está la configuración básica:

| Parte | Cuál | Para qué |
| --- | --- | --- |
| EC2 | m5.xlarge | Entrenar modelos |
| Lambda | 5 instancias | No perder servicio |
| SageMaker | Auto-scaling ON | Manejar más usuarios |

Para empezar HOY:

1. Abre tu cuenta AWS
2. Configura IAM
3. Lanza un Notebook
4. Crea tu bucket S3

> "¡Me divertí muchísimo armando esta colección de repos de ML! Les sugiero guardar estos enlaces y revisarlos seguido." - Nitika, Creadora de Contenido.

Con estos repos puedes hacer de TODO: desde aprender las bases hasta construir sistemas ML completos en AWS.

## Related posts

- [Introducción a la Inteligencia Artificial en AWS](/blog/introduccion-a-la-inteligencia-artificial-en-aws/)
- [Mejores Prácticas de Machine Learning en AWS](/blog/mejores-practicas-de-machine-learning-en-aws/)
- [Cómo Desarrollar Aplicaciones de Inteligencia Artificial en AWS](/blog/como-desarrollar-aplicaciones-de-inteligencia-artificial-en-aws/)
- [10 Preguntas Frecuentes sobre Machine Learning en AWS](/blog/10-preguntas-frecuentes-sobre-machine-learning-en-aws/)
