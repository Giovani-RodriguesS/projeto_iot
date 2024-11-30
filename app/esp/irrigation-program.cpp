#include <WiFi.h>      
#include <HTTPClient.h>   

// Wi-Fi
const char* ssid = "SEU_SSID";        
const char* password = "SUA_SENHA";   // Substitua pela senha da sua rede
const char* serverUrl = "http://seu-endpoint.com/api/dados";  // URL do endpoint

int sensorUmidade = 13;  // Define o pino 13 como Pino Analógico do sensor de umidade
int sensorChuva = 27;    // Define o pino 27 como o sensor de chuva
int Rele = 4;            // Pino Digital 4 como Relé
int EstadoSensorChuva = 0;
int EstadoSensorUmidade = 0;
int ValAnalogIn;  // Valor analógico
bool bombaAtivada;

void setup() {
  Serial.begin(9600);

  pinMode(Rele, OUTPUT);        // Declara o Relé como Saída Digital
  pinMode(sensorChuva, INPUT);  // Declara o sensor de chuva como Entrada

  // Conectar ao Wi-Fi
  Serial.print("Conectando-se ao Wi-Fi");
  WiFi.begin(ssid, password);

  // Aguardando Conexão
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Ler o estado do sensor de chuva e umidade
  EstadoSensorChuva = digitalRead(sensorChuva);
  EstadoSensorUmidade = digitalRead(sensorUmidade);

  // Variável para armazenar os dados que serão enviados
  String jsonPayload;

  if (EstadoSensor == LOW) {  // Supondo que o sensor de chuva retorne HIGH quando detecta chuva
    Serial.println("Está chovendo");
    digitalWrite(Rele, HIGH);  // Desliga o relé para interromper a irrigação
    bombaAtivada = false;

    // Preparar os dados para envio
    jsonPayload = "{\"medida\": EstadoSensorUmidade \"umidade\": null}";

  } else {
    ValAnalogIn = analogRead(PinoAnalogico);
    int Porcento = map(ValAnalogIn, 4095, 1400, 0, 100);  // Transforma o valor analógico
    delay(500);

    Serial.print("Umidade: ");
    Serial.print(Porcento);
    Serial.println("%");

    if (Porcento <= 50) {
      Serial.println("Irrigando Planta");
      digitalWrite(Rele, LOW);  // Aciona o Relé
    } else {
      Serial.println("Planta Irrigada");
      digitalWrite(Rele, HIGH);  // Desliga o Relé
    }

    // Preparar os dados para envio
    jsonPayload = "{\"chuva\": false, \"umidade\": " + String(Porcento) + "}";
    
  }

  // Enviar os dados via HTTP POST
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverUrl);  // Configura a URL do endpoint
    http.addHeader("Content-Type", "application/json");  // Define o cabeçalho da requisição

    int httpResponseCode = http.POST(jsonPayload);  // Envia os dados

    // Exibe a resposta no monitor serial
    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);

    http.end();  // Finaliza a conexão HTTP
  } else {
    Serial.println("Wi-Fi desconectado. Não foi possível enviar os dados.");
  }

  delay(1000);  // Intervalo para a próxima leitura
}


/*
- 

*/