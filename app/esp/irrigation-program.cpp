#include <WiFi.h>
#include <HTTPClient.h>

// Wi-Fi
const char* ssid = "moto g(8) power lite 5276";
const char* password = "1234abcd";
const char* serverUrlS = "http://192.168.43.222:80/api/LeituraSensor";
const char* serverUrlB = "http://192.168.43.222:80/api/LeituraBomba";

// Definição dos pinos
int sensorUmidade = 34;
int sensorChuva = 35;
int rele = 4;

// Variáveis
int estadoSensorUmidade = 0;
int estadoSensorChuva = 0;
bool bombaAtivada = false;

void setup() {
  Serial.begin(9600);

  // Configurar os pinos
  pinMode(sensorUmidade, INPUT);
  pinMode(sensorChuva, INPUT);
  pinMode(rele, OUTPUT);

  // Ajustar ADC
  analogSetAttenuation(ADC_11db); // Ampliar o range para 0-3.3V
  setCpuFrequencyMhz(80);         // Reduzir a frequência para 80 MHz

  // Conectar ao Wi-Fi
  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Leitura dos sensores
  estadoSensorUmidade = analogRead(sensorUmidade);
  estadoSensorChuva = analogRead(sensorChuva);

  // Converter para porcentagem (ajustar o range de acordo com o sensor)
  int porcentoSU = map(estadoSensorUmidade, 4095, 1000, 0, 100);
  int porcentoSC = map(estadoSensorChuva, 4095, 1000, 0, 100);

  // Decisão da bomba
  if (porcentoSC >= 80 || porcentoSU >= 20) {
    Serial.printf("Não precisa regar. Chuva: %d%%, Umidade: %d%%\n", porcentoSC, porcentoSU);
    digitalWrite(rele, LOW);
    bombaAtivada = false;
  } else {
    Serial.printf("Regando. Chuva: %d%%, Umidade: %d%%\n", porcentoSC, porcentoSU);
    digitalWrite(rele, HIGH);
    bombaAtivada = true;
  }

  // Exibir leituras no Serial Monitor
  Serial.println("Bomba: " + String(bombaAtivada));
  Serial.println("Sensor de Umidade: " + String(estadoSensorUmidade) + " (" + String(porcentoSU) + "%)");
  Serial.println("Sensor de Chuva: " + String(estadoSensorChuva) + " (" + String(porcentoSC) + "%)");
  Serial.println("=======================");

  // Criar os JSONs
  String jsonPayloadBO = String("{\"idBomba\":1,\"bombaAtivada\":") + (bombaAtivada ? "true" : "false") + "}";
  String jsonPayloadSU = String("{\"idSensor\":1,\"medida\":") + porcentoSU + "}";
  String jsonPayloadSC = String("{\"idSensor\":2,\"medida\":") + porcentoSC + "}";

  // Enviar os JSONs
  enviarJSON(serverUrlB, jsonPayloadBO); // Envio para leitura da bomba
  enviarJSON(serverUrlS, jsonPayloadSU); // Envio para leitura do sensor de umidade
  enviarJSON(serverUrlS, jsonPayloadSC); // Envio para leitura do sensor de chuva

  delay(3000);
}

// Função para enviar um JSON para um endpoint
void enviarJSON(const char* url, const String& jsonPayload) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonPayload);

    // Verificar a resposta
    if (httpResponseCode >= 200 && httpResponseCode < 300) {
      Serial.printf("POST enviado com sucesso para %s. Código HTTP: %d\n", url, httpResponseCode);
    } else {
      Serial.printf("Falha ao enviar POST para %s. Código de erro: %d\n", url, httpResponseCode);
    }

    http.end(); // Finalizar a conexão
  } else {
    Serial.println("Wi-Fi desconectado. Não foi possível enviar o JSON.");
  }
}