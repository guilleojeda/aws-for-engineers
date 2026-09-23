+++
url = "/blog/algoritmos-de-amazon-forecast-optimizacion-y-precision/"
title = "Algoritmos de Amazon Forecast: Optimización y Precisión"
description = "Explora cómo los algoritmos de Amazon Forecast como CNN-QR, DeepAR+, Prophet, NPTS, ARIMA y ETS pueden optimizar la precisión en la predicción de series temporales."
date = "2024-05-12T03:31:14.299000+00:00"
lastmod = "2024-05-12"
image = "/assets/blog/e98930171342594138891bef5fd63005d85b1b541e87cfd6c88bb2b83b2568a1.jpg"
archive_order = 77

[[related]]
title = "Correlación de Eventos con Step Functions y CloudWatch"
url = "/blog/correlacion-de-eventos-con-step-functions-y-cloudwatch/"
image = "/assets/blog/1ddc83af1d16737de7b3fdb8177042b5928f068f18886308ad15336603db7ff9.jpg"

[[related]]
title = "Configurar CORS en HTTP API Gateway"
url = "/blog/configurar-cors-en-http-api-gateway/"
image = "/assets/blog/b7ca17278c2b7e43c95dfeecd8c4de8e83d1e24b5d8252f50118d4479ba3ab52.jpg"

[[related]]
title = "Pipeline CI/CD con Terraform y AWS CodePipeline"
url = "/blog/pipeline-cicd-con-terraform-y-aws-codepipeline/"
image = "/assets/blog/8c8805d819a48bf8b59f25eb80e966ffd67c6991806d37a8925b6caad8334c86.jpg"
+++

[Amazon Forecast](https://aws.amazon.com/forecast/) es un servicio de pronóstico de series temporales que utiliza el aprendizaje automático para producir predicciones precisas. Ofrece varios algoritmos, cada uno con sus propias ventajas y desventajas:

| Algoritmo | Ventajas | Desventajas |
| --- | --- | --- |
| [CNN-QR](https://www.mdpi.com/1999-4893/16/3/160) | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU |
| DeepAR+ | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU, puede sobreajustarse |
| [Prophet](http://facebook.github.io/prophet/) | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |
| [NPTS](https://docs.aws.amazon.com/forecast/latest/dg/aws-forecast-recipe-npts.html) | Adecuado para series de tiempo esparcidas o intermitentes, escalable y rápido | No es adecuado para series de tiempo con estacionalidad o tendencias no lineales |
| [ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) | Adecuado para series de tiempo con estacionalidad y tendencias lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |
| [ETS](https://docs.aws.amazon.com/forecast/latest/dg/aws-forecast-recipe-ets.html) | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |

La elección del algoritmo adecuado depende de las características de los datos y las necesidades del proyecto. Amazon Forecast también permite optimizar la precisión de las predicciones mediante la selección de métricas de precisión adecuadas y el ajuste de hiperparámetros.

## Related video from YouTube {id="related-video-from-youtube"}

{{< blog-video src="https://www.youtube.com/embed/DDkCWhDtKGY" >}}

## 1. [CNN-QR](https://www.mdpi.com/1999-4893/16/3/160) {id="1.-cnn-qr"}

![CNN-QR](/assets/blog/15ea6e47dba30c01f81068e570b930c77504f3c7bb31071b316e62900decb85f.jpg)

### Intensidad computacional {id="intensidad-computacional"}

El algoritmo CNN-QR es una red neuronal convolucional que procesa series temporales de manera eficiente. Aunque su intensidad computacional depende del tamaño del conjunto de datos y la complejidad de las series temporales, su arquitectura jerárquica lo hace más rápido que otros algoritmos de aprendizaje automático.

### Características {id="caracter%C3%ADsticas"}

El algoritmo CNN-QR tiene varias características útiles:

- **Acepta series temporales relacionadas y metadatos**: puede manejar series temporales que dependen de variables adicionales.
- **Optimización de hiperparámetros**: permite ajustar los parámetros del modelo para mejorar su precisión.

### Ventajas {id="ventajas"}

El algoritmo CNN-QR ofrece varias ventajas:

| Ventaja | Descripción |
| --- | --- |
| Eficiencia computacional | Procesa series temporales de manera rápida y eficiente |
| Manejo de series temporales relacionadas | Puede manejar series temporales que dependen de variables adicionales |
| Optimización de hiperparámetros | Permite ajustar los parámetros del modelo para mejorar su precisión |

## 2. DeepAR+ {id="2.-deepar%2B"}

### Intensidad computacional {id="intensidad-computacional-1"}

DeepAR+ es un algoritmo de redes neuronales recurrentes (RNN) que requiere una mayor intensidad computacional en comparación con otros algoritmos. Sin embargo, su capacidad para manejar conjuntos de datos grandes y series temporales complejas justifica este mayor costo computacional.

### Características {id="caracter%C3%ADsticas-1"}

DeepAR+ tiene varias características útiles:

- **Acepta series temporales relacionadas y metadatos**: puede manejar series temporales que dependen de variables adicionales.
- **Adecuado para conjuntos de datos dispersos**: es especialmente útil para conjuntos de datos dispersos o intermitentes.

### Capacidades de optimización de hiperparámetros {id="capacidades-de-optimizaci%C3%B3n-de-hiperpar%C3%A1metros"}

DeepAR+ ofrece varios hiperparámetros que permiten ajustar y optimizar el modelo para obtener mejores resultados. Algunos de los hiperparámetros clave se presentan en la siguiente tabla:

| Hiperparámetro | Descripción |
| --- | --- |
| **context\_length** | Controla cuánto puede ver la red hacia el pasado. |
| **ForecastHorizon** | Determina cuán lejos en el futuro se pueden hacer predicciones. |
| **num\_cells** y **num\_layers** | Controlan la arquitectura de la RNN. |
| **learning\_rate** | Ajusta la tasa de aprendizaje durante el entrenamiento. |

La optimización adecuada de estos hiperparámetros es crucial para obtener predicciones precisas con DeepAR+.

## 3. [Prophet](http://facebook.github.io/prophet/) {id="3.-prophet"}

![Prophet](/assets/blog/90b6154070c306058a5dc5cabe15b147ad2cc9962b04222874554aa15dbf0e49.jpg)

### Intensidad computacional {id="intensidad-computacional-2"}

Prophet es un algoritmo de serie temporal basado en un modelo aditivo que maneja efectos de tendencia, estacionalidad y festividades de manera eficiente. A diferencia de otros algoritmos, Prophet no requiere una gran intensidad computacional, lo que lo hace más accesible y escalable.

### Características {id="caracter%C3%ADsticas-2"}

Prophet tiene varias características útiles:

- **Modela tendencias y estacionalidades**: Prophet puede manejar tendencias no lineales y estacionalidades complejas.
- **Acepta festividades y eventos**: permite especificar fechas específicas que pueden afectar la serie temporal, como festividades o eventos importantes.
- **Robusto a datos perdidos o outliers**: Prophet puede manejar datos perdidos o outliers sin afectar la precisión de las predicciones.

### Hiperparámetros clave {id="hiperpar%C3%A1metros-clave"}

Prophet ofrece varios hiperparámetros que permiten ajustar y optimizar el modelo para obtener mejores resultados. Algunos de los hiperparámetros clave se presentan en la siguiente tabla:

| Hiperparámetro | Descripción |
| --- | --- |
| **changepoint\_prior\_scale** | Controla la flexibilidad de la tendencia. |
| **seasonality\_prior\_scale** | Controla la flexibilidad de la estacionalidad. |
| **holidays\_prior\_scale** | Controla la flexibilidad de los efectos de festividades. |

La optimización adecuada de estos hiperparámetros es crucial para obtener predicciones precisas con Prophet.

## 4. [NPTS](https://docs.aws.amazon.com/forecast/latest/dg/aws-forecast-recipe-npts.html) {id="4.-npts"}

![NPTS](/assets/blog/ee27906cb68c9f9c226bc07e7a3743bb314aba90fd2790d5ee3df3c942c1e3c8.jpg)

### Intensidad computacional {id="intensidad-computacional-3"}

NPTS es un algoritmo de serie temporal no paramétrico que utiliza un índice de tiempo fijo y muestras de observaciones pasadas. Al igual que Prophet, NPTS no requiere una gran intensidad computacional, lo que lo hace más accesible y escalable.

### Adecuado para conjuntos de datos dispersos {id="adecuado-para-conjuntos-de-datos-dispersos"}

NPTS es especialmente útil cuando el conjunto de datos es disperso (o contiene muchos ceros) y bursty. Por ejemplo, la predicción de la demanda de artículos individuales donde la serie temporal tiene muchos conteos bajos.

### Variantes de NPTS {id="variantes-de-npts"}

Amazon Forecast ofrece variantes de NPTS que difieren en qué observaciones pasadas se muestran y cómo se muestran. Estas variantes incluyen:

| Variante | Descripción |
| --- | --- |
| NPTS | Utiliza un índice de tiempo fijo y muestras de observaciones pasadas. |
| NPTS estacional | Ajusta la tendencia y la estacionalidad en la serie temporal. |
| Pronosticador climatológico | Utiliza un enfoque climatológico para hacer predicciones. |
| Pronosticador climatológico estacional | Combina el enfoque climatológico con la estacionalidad. |

### Optimización de hiperparámetros {id="optimizaci%C3%B3n-de-hiperpar%C3%A1metros"}

La optimización adecuada de los hiperparámetros es crucial para obtener predicciones precisas con NPTS. Algunos de los hiperparámetros clave incluyen:

| Hiperparámetro | Descripción |
| --- | --- |
| `exp_kernel_weights` | Controla la importancia de las observaciones pasadas. |
| `kernel_type` | Selecciona el tipo de kernel utilizado en el algoritmo. |
| `use_seasonal_model` | Habilita o deshabilita el uso de un modelo estacional. |

## 5. [ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) {id="5.-arima"}

![ARIMA](/assets/blog/5ba90390cb1024bede5a6f9e40ad5d40cca992bb7dbe3c0def2f979626e59403.jpg)

### Descripción general {id="descripci%C3%B3n-general"}

ARIMA (Autoregresivo Integrado Medio Móvil) es un algoritmo estadístico comúnmente utilizado para la predicción de series temporales. Es especialmente útil para conjuntos de datos simples con menos de 100 series temporales.

### Intensidad computacional {id="intensidad-computacional-4"}

ARIMA no requiere una gran intensidad computacional, lo que lo hace más accesible y escalable.

### Adecuado para conjuntos de datos no estacionarios {id="adecuado-para-conjuntos-de-datos-no-estacionarios"}

ARIMA es especialmente útil cuando se trabaja con series temporales no estacionarias, ya que utiliza diferenciación para convertir una serie temporal no estacionaria en una estacionaria, y luego predice valores futuros a partir de datos históricos.

### Ventajas {id="ventajas-1"}

- Solo requiere datos históricos de la serie temporal para generalizar la predicción.
- Se desempeña bien en predicciones a corto plazo.
- Modela series temporales no estacionarias.

## 6. [ETS](https://docs.aws.amazon.com/forecast/latest/dg/aws-forecast-recipe-ets.html) {id="6.-ets"}

![ETS](/assets/blog/13e24d9f04187cf50075fa8334973864f4682bc3d85eb68483e605879967dfb0.jpg)

### Descripción general {id="descripci%C3%B3n-general-1"}

El algoritmo de Suavizado Exponencial (ETS) es un método estadístico comúnmente utilizado para la predicción de series temporales. Amazon Forecast utiliza la función `ets` del paquete `forecast` de la Red de Archivo de R (CRAN) para implementar este algoritmo.

### Intensidad computacional {id="intensidad-computacional-5"}

La intensidad computacional del algoritmo ETS es moderada, lo que lo hace adecuado para conjuntos de datos de tamaño medio.

### Adecuado para conjuntos de datos no estacionarios {id="adecuado-para-conjuntos-de-datos-no-estacionarios-1"}

ETS es especialmente útil cuando se trabaja con series temporales no estacionarias, ya que utiliza técnicas de suavizado exponencial para modelar patrones y tendencias en los datos.

### Capacidades de optimización de hiperparámetros {id="capacidades-de-optimizaci%C3%B3n-de-hiperpar%C3%A1metros-1"}

El algoritmo ETS ofrece capacidades de optimización de hiperparámetros, lo que permite ajustar los parámetros del modelo para mejorar la precisión de las predicciones.

#### Hiperparámetros clave {id="hiperpar%C3%A1metros-clave-1"}

| Hiperparámetro | Descripción |
| --- | --- |
| `alpha` | Controla la tasa de suavizado exponencial. |
| `beta` | Controla la tasa de suavizado exponencial para la tendencia. |
| `gamma` | Controla la tasa de suavizado exponencial para la estacionalidad. |

La optimización adecuada de estos hiperparámetros es crucial para obtener predicciones precisas con ETS.

## Selección del Algoritmo Adecuado {id="selecci%C3%B3n-del-algoritmo-adecuado"}

La elección del algoritmo adecuado es crucial para la precisión y eficacia de las predicciones en Amazon Forecast. Cada algoritmo tiene sus propias fortalezas y debilidades, y es importante comprender cuándo utilizar cada uno.

### Consideraciones Clave {id="consideraciones-clave"}

- **Tamaño del conjunto de datos**: Algunos algoritmos funcionan mejor con conjuntos de datos grandes, mientras que otros son más adecuados para conjuntos de datos pequeños y medianos.
- **Tipo de serie temporal**: Algunos algoritmos son más adecuados para series temporales con patrones estacionales, mientras que otros son más adecuados para series temporales no estacionarias.
- **Nivel de complejidad**: Algunos algoritmos requieren un mayor nivel de complejidad y recursos computacionales, mientras que otros son más sencillos y fáciles de implementar.

### Criterios para Elegir el Algoritmo Adecuado {id="criterios-para-elegir-el-algoritmo-adecuado"}

| Criterio | Descripción |
| --- | --- |
| Análisis de la serie temporal | Analizar la serie temporal y entender sus patrones y tendencias |
| Pruebas y evaluación | Probar diferentes algoritmos y evaluar su desempeño utilizando métricas de evaluación relevantes |
| Consideraciones empresariales | Considerar las necesidades empresariales y los objetivos de la predicción |

En resumen, elegir el algoritmo adecuado es un proceso que requiere considerar varios factores. Al entender las fortalezas y debilidades de cada algoritmo, los usuarios de Amazon Forecast pueden elegir el algoritmo que mejor se adapte a sus necesidades y objetivos.

## Mejora de la precisión de las predicciones {id="mejora-de-la-precisi%C3%B3n-de-las-predicciones"}

Para mejorar la precisión de las predicciones en Amazon Forecast, es fundamental elegir las métricas de precisión adecuadas y ajustar los hiperparámetros de manera efectiva. A continuación, se presentan estrategias para seleccionar las métricas de precisión adecuadas y ajustar los hiperparámetros para optimizar el rendimiento de los algoritmos de Forecast.

### Selección de métricas de precisión {id="selecci%C3%B3n-de-m%C3%A9tricas-de-precisi%C3%B3n"}

Amazon Forecast ofrece varias métricas de precisión, como RMSE, wQL, MAPE, MASE y WAPE. Cada métrica tiene sus propias ventajas y desventajas. Es importante comprender cuándo utilizar cada una.

| Métrica | Descripción |
| --- | --- |
| RMSE | Error cuadrático medio |
| wQL | Error cuadrático medio ponderado |
| MAPE | Error porcentual medio absoluto |
| MASE | Error medio absoluto escalado |
| WAPE | Error porcentual medio absoluto ponderado |

### Ajuste de hiperparámetros {id="ajuste-de-hiperpar%C3%A1metros"}

El ajuste de hiperparámetros es crucial para optimizar el rendimiento de los algoritmos de Forecast. Los hiperparámetros son parámetros que se establecen antes de entrenar un modelo y que afectan su comportamiento.

### Ventajas de la optimización de la precisión {id="ventajas-de-la-optimizaci%C3%B3n-de-la-precisi%C3%B3n"}

La optimización de la precisión en Amazon Forecast ofrece varias ventajas:

- **Mejora de la precisión**: Al elegir las métricas de precisión adecuadas y ajustar los hiperparámetros de manera efectiva, es posible mejorar significativamente la precisión de las predicciones.
- **Reducción de costos**: Al mejorar la precisión de las predicciones, es posible reducir costos asociados con la producción y el almacenamiento de inventarios.
- **Mejora de la toma de decisiones**: Al tener predicciones más precisas, es posible tomar decisiones más informadas y mejorar la eficiencia operativa.

En resumen, la optimización de la precisión en Amazon Forecast es crucial para mejorar la precisión de las predicciones y reducir costos. Al elegir las métricas de precisión adecuadas y ajustar los hiperparámetros de manera efectiva, es posible mejorar significativamente el rendimiento de los algoritmos de Forecast.

## Ventajas y desventajas de los algoritmos {id="ventajas-y-desventajas-de-los-algoritmos"}

A continuación, se presentan las ventajas y desventajas de cada algoritmo de Amazon Forecast, lo que ayudará a los usuarios a elegir el algoritmo más adecuado para sus necesidades.

### Ventajas y desventajas {id="ventajas-y-desventajas"}

| Algoritmo | Ventajas | Desventajas |
| --- | --- | --- |
| CNN-QR | Adecuado para grandes conjuntos de datos, maneja metadatos de elementos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU, puede ser difícil de interpretar |
| DeepAR+ | Adecuado para grandes conjuntos de datos, maneja metadatos de elementos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU, puede ser difícil de interpretar, puede sobreajustarse |
| Prophet | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos, puede requerir ajustes manuales |
| NPTS | Adecuado para series de tiempo esparcidas o intermitentes, escalable y rápido | No es adecuado para series de tiempo con estacionalidad o tendencias no lineales |
| ARIMA | Adecuado para series de tiempo con estacionalidad y tendencias lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos, puede requerir ajustes manuales |
| ETS | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos, puede requerir ajustes manuales |

En resumen, cada algoritmo de Amazon Forecast tiene sus propias ventajas y desventajas. Al elegir el algoritmo adecuado, es importante considerar las características de los datos y las necesidades específicas del proyecto.

## Puntos clave {id="puntos-clave"}

En resumen, la elección del algoritmo adecuado en Amazon Forecast es crucial para lograr una precisión óptima en la predicción. Cada algoritmo tiene sus propias ventajas y desventajas, y es importante considerar las características de los datos y las necesidades específicas del proyecto al seleccionar el algoritmo adecuado.

### Algoritmos de [Amazon Forecast](https://aws.amazon.com/forecast/) {id="algoritmos-de-amazon-forecast"}

![Amazon Forecast](/assets/blog/f90352a98a205f6a149fb511a348b42c92b8e54d2a775555a168d31aba3144d1.jpg)

A continuación, se presentan los algoritmos de Amazon Forecast y sus características clave:

| Algoritmo | Ventajas | Desventajas |
| --- | --- | --- |
| CNN-QR | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU |
| DeepAR+ | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas | Requiere grandes cantidades de memoria y GPU, puede sobreajustarse |
| Prophet | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |
| NPTS | Adecuado para series de tiempo esparcidas o intermitentes, escalable y rápido | No es adecuado para series de tiempo con estacionalidad o tendencias no lineales |
| ARIMA | Adecuado para series de tiempo con estacionalidad y tendencias lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |
| ETS | Adecuado para series de tiempo con estacionalidad y tendencias no lineales, fácil de interpretar | No es adecuado para series de tiempo con patrones complejos |

En última instancia, la elección del algoritmo adecuado dependerá de las características específicas de los datos y las necesidades del proyecto. Al considerar cuidadosamente las ventajas y desventajas de cada algoritmo, es posible lograr una precisión óptima en la predicción y tomar decisiones informadas.

## Preguntas frecuentes {id="preguntas-frecuentes"}

### ¿Cuál es el algoritmo predictivo de Amazon? {id="%C2%BFcu%C3%A1l-es-el-algoritmo-predictivo-de-amazon%3F"}

Un predictor de Amazon Forecast utiliza un algoritmo para entrenar un modelo con conjuntos de datos de series de tiempo. El modelo entrenado se utiliza luego para generar métricas y predicciones.

### ¿Qué algoritmo utiliza Amazon Forecast? {id="%C2%BFqu%C3%A9-algoritmo-utiliza-amazon-forecast%3F"}

Amazon Forecast utiliza varios algoritmos, incluyendo CNN-QR, DeepAR+, Prophet, NPTS, ARIMA y ETS. Cada algoritmo tiene sus propias ventajas y desventajas, y se selecciona según las características de los datos y las necesidades del proyecto.

#### Algoritmos de Amazon Forecast {id="algoritmos-de-amazon-forecast-1"}

| Algoritmo | Descripción |
| --- | --- |
| CNN-QR | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas |
| DeepAR+ | Adecuado para grandes conjuntos de datos y series de tiempo relacionadas |
| Prophet | Adecuado para series de tiempo con estacionalidad y tendencias no lineales |
| NPTS | Adecuado para series de tiempo esparcidas o intermitentes |
| ARIMA | Adecuado para series de tiempo con estacionalidad y tendencias lineales |
| ETS | Adecuado para series de tiempo con estacionalidad y tendencias no lineales |

Esperamos que esta información sea útil. Si tiene más preguntas, no dude en hacérselas.

## Related posts

- [Mejores Prácticas de Machine Learning en AWS](/blog/mejores-practicas-de-machine-learning-en-aws/)
- [Cómo Desarrollar Aplicaciones de Inteligencia Artificial en AWS](/blog/como-desarrollar-aplicaciones-de-inteligencia-artificial-en-aws/)
- [Introducción a la Inteligencia Artificial en AWS](/blog/introduccion-a-la-inteligencia-artificial-en-aws/)
- [Personalización en tiempo real con AWS: Casos de uso](/blog/personalizacion-en-tiempo-real-con-aws-casos-de-uso/)
