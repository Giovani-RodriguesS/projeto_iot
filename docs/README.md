
# DIAGRAMA DE CLASSES

```mermaid
classDiagram
    class Dispositivo {
        <<abstract>>
        + id: int
        + nome: string
        + data_instalacao: datetime
    }
    class Usuario {
        + id: int
        + nome: string
        + senha: string
        + cargo: string
    }


    class Sensor {
        + unidade: string
    }
    class Bomba {
        + tipo string
        + vazao: float
        + localizacao string
    }
    class Leitura {
        <<abstract>>
        + id: int
        + Tempo: timestamp
    }
    class LeituraBomba {
        + BombaAtivada: bool
    }
    class LeituraSensor {
        + Medida: float
    }

    Usuario
    
    Dispositivo  <|-- Sensor
    Dispositivo <|-- Bomba

    Leitura <|-- LeituraSensor
    Leitura <|-- LeituraBomba

    Dispositivo --> Leitura : associa
```