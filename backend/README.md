# CPU-GPU Matrix Operations API Backend

Aquí se encuentra el código para el API del proyecto realizado en Express.

## Instalar dependencias

En desarrollo, instala las dependencias corriendo:

```text
npm install
```

En producción, instala las dependencias corriendo:

```text
npm ci
```

## Configurar

Crear un archivo llamado `.env` con las siguientes variables:

```text
HTTP_PORT=4000
```

> Este archivo debe existir al correr el API en desarrollo y en producción.

## Correr en Development

Para abrir un servidor web que se reinicie on-save, corre el comando:

```text
npm run dev
```

## Correr en Producción

Para abrir un servidor web que se sirva el API en producción, corre el comando:

```text
npm start
```

## Documentación

### GET /results/everyone

Obten un arreglo con todos los resultados de todos, disponibles en la base de datos.

#### Respuesta

```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "name": "Christian",
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
      "gpuInfo": {
        "vendor": "NVIDIA Corporation",
        "renderer": "NVIDIA GeForce GT 750M OpenGL Engine"
      },
      "results": {
        "matrixSizes": [
          128,
          256,
          512
        ],
        "iterations": 10,
        "times": {
          "cpu": [
            495,
            5342,
            53075
          ],
          "gpu": [
            1291,
            3508,
            15138
          ]
        }
      },
      "id": "2a61c0fd-5fb8-4445-bcd0-97239b137198",
      "type": "everyone"
    },
    {
      "name": "Christian x2",
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
      "gpuInfo": {
        "vendor": "NVIDIA Corporation",
        "renderer": "NVIDIA GeForce GT 750M OpenGL Engine"
      },
      "results": {
        "matrixSizes": [
          128,
          256,
          512
        ],
        "iterations": 10,
        "times": {
          "cpu": [
            697,
            7704,
            78607
          ],
          "gpu": [
            1569,
            4324,
            20150
          ]
        }
      },
      "id": "c06b08a4-9c51-4f95-97d8-3903e10e093f",
      "type": "everyone"
    }
  ]
}
```

### GET /results/particular

Obten un arreglo con todos los resultados particulares, disponibles en la base de datos.

#### Respuesta

```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "name": "Christian",
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
      "gpuInfo": {
        "vendor": "NVIDIA Corporation",
        "renderer": "NVIDIA GeForce GT 750M OpenGL Engine"
      },
      "results": {
        "matrixSizes": [
          128,
          256,
          512
        ],
        "iterations": 10,
        "times": {
          "cpu": [
            495,
            5342,
            53075
          ],
          "gpu": [
            1291,
            3508,
            15138
          ]
        }
      },
      "id": "2a61c0fd-5fb8-4445-bcd0-97239b137198",
      "type": "particular"
    },
    {
      "name": "Christian x2",
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
      "gpuInfo": {
        "vendor": "NVIDIA Corporation",
        "renderer": "NVIDIA GeForce GT 750M OpenGL Engine"
      },
      "results": {
        "matrixSizes": [
          128,
          256,
          512
        ],
        "iterations": 10,
        "times": {
          "cpu": [
            697,
            7704,
            78607
          ],
          "gpu": [
            1569,
            4324,
            20150
          ]
        }
      },
      "id": "c06b08a4-9c51-4f95-97d8-3903e10e093f",
      "type": "particular"
    }
  ]
}
```

### GET /result/:id

Obten un resultado de ID específico.

#### Respuesta

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": "Christian",
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
    "gpuInfo": {
      "vendor": "NVIDIA Corporation",
      "renderer": "NVIDIA GeForce GT 750M OpenGL Engine"
    },
    "results": {
      "matrixSizes": [
        128,
        256,
        512
      ],
      "iterations": 10,
      "times": {
        "cpu": [
          495,
          5342,
          53075
        ],
        "gpu": [
          1291,
          3508,
          15138
        ]
      }
    },
    "id": "2a61c0fd-5fb8-4445-bcd0-97239b137198",
    "type": "everyone"
  }
}
```

### POST /results/everyone

Crea un nuevo resultado de todos. Necesita un `application/json` body con la siguiente forma:

```json
{
  "name": <string?>,
  "ua": <string>,
  "gpuInfo": {
    "vendor": <string>,
    "renderer": <string>
  },
  "results": {
    "matrixSizes": <number[]>,
    "iterations": <number>,
    "times": {
      "cpu": <number[]>,
      "gpu": <number[]>
    }
  }
}
```

#### Respuesta

```json
{
  "success": true,
  "status": 201,
  "data": {
    "name": null,
    "ua": "User-Agent",
    "gpuInfo": {
      "vendor": "GPU-VENDOR",
      "renderer": "GPU-RENDERER"
    },
    "results": {
      "matrixSizes": [
        128,
        123,
        123
      ],
      "iterations": 10,
      "times": {
        "cpu": [
          123,
          123,
          123
        ],
        "gpu": [
          123,
          123,
          123
        ]
      }
    },
    "id": "cfaa8e19-03c1-43a1-9369-53a20df09e39",
    "type": "everyone"
  }
}
```

### POST /results/particular

Crea un nuevo resultado particular. Necesita un `application/json` body con la siguiente forma:

```json
{
  "name": <string?>,
  "ua": <string>,
  "gpuInfo": {
    "vendor": <string>,
    "renderer": <string>
  },
  "results": {
    "matrixSizes": <number[]>,
    "iterations": <number>,
    "times": {
      "cpu": <number[]>,
      "gpu": <number[]>
    }
  }
}
```

#### Respuesta

```json
{
  "success": true,
  "status": 201,
  "data": {
    "name": null,
    "ua": "User-Agent",
    "gpuInfo": {
      "vendor": "GPU-VENDOR",
      "renderer": "GPU-RENDERER"
    },
    "results": {
      "matrixSizes": [
        128,
        123,
        123
      ],
      "iterations": 10,
      "times": {
        "cpu": [
          123,
          123,
          123
        ],
        "gpu": [
          123,
          123,
          123
        ]
      }
    },
    "id": "cfaa8e19-03c1-43a1-9369-53a20df09e39",
    "type": "particular"
  }
}
```

### DELETE /result/:id

Elimina un resultado con ID específico.

#### Respuesta

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": null,
    "ua": "User-Agent",
    "gpuInfo": {
      "vendor": "GPU-VENDOR",
      "renderer": "GPU-RENDERER"
    },
    "results": {
      "matrixSizes": [
        128,
        123,
        123
      ],
      "iterations": 10,
      "times": {
        "cpu": [
          123,
          123,
          123
        ],
        "gpu": [
          123,
          123,
          123
        ]
      }
    },
    "id": "cfaa8e19-03c1-43a1-9369-53a20df09e39",
    "type": "everyone"
  }
}
```

### PUT /result/:id

Actualiza las propiedades de un resultado con ID específico. Necesita un `application/json` body con las propiedades que se quieran actualizar.

```json
{
  "?name": <string?>,
  "?ua": <string>,
  "?gpuInfo": {
    "vendor": <string>,
    "renderer": <string>
  },
  "?results": {
    "matrixSizes": <number[]>,
    "iterations": <number>,
    "times": {
      "cpu": <number[]>,
      "gpu": <number[]>
    }
  }
}
```

#### Respuesta

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": "new name3",
    "ua": "User-Agent",
    "gpuInfo": {
      "vendor": "GPU-VENDOR",
      "renderer": "GPU-RENDERER"
    },
    "results": {
      "matrixSizes": [
        128,
        256,
        23
      ],
      "iterations": 10,
      "times": {
        "cpu": [
          123,
          123,
          1
        ],
        "gpu": [
          123,
          123,
          11123
        ]
      }
    },
    "id": "8985ce9f-d398-41b2-a384-156ddc930e17",
    "type": "everyone"
  }
}
```
