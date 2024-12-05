#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>

// Wi-Fi
const char* ssid = "moto g52_1738";
const char* password = "aaaaaaa8";
const char* serverUrlS = "https://192.168.74.248/api/LeituraSensor";
const char* serverUrlB = "https://192.168.74.248/api/LeituraBomba";

// Definição dos pinos
int sensorUmidade = 13;
int sensorChuva = 27;
int rele = 4;

// Variáveis
int estadoSensorChuva = 0;
int estadoSensorUmidade = 0;
bool bombaAtivada = false;

void setup() {
  Serial.begin(9600);

  pinMode(rele, OUTPUT);
  pinMode(sensorChuva, INPUT);
  pinMode(sensorUmidade, INPUT);

  // Conectar ao Wi-Fi
  Serial.print("Conectando-se ao Wi-Fi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  // Configurar o NTP
  configTime(0, 0, "pool.ntp.org", "time.nist.gov"); // Ajusta UTC, servidores NTP
  Serial.println("Sincronizando tempo...");
  delay(2000); // Esperar tempo sincronizar

}

void loop() {
  // Ler os sensores
  estadoSensorChuva = analogRead(sensorChuva);
  estadoSensorUmidade = analogRead(sensorUmidade);

  int porcentoSU = map(estadoSensorUmidade, 4095, 1400, 0, 100);
  int porcentoSC = map(estadoSensorChuva, 4095, 1400, 0, 100);

  // Decisão de ligar ou desligar a bomba
  if (porcentoSC >= 80 || porcentoSU >= 70) {
    Serial.printf("Não precisa regar. Chuva: %d%%, Umidade: %d%%\n", porcentoSC, porcentoSU);
    digitalWrite(rele, LOW);
    bombaAtivada = false;
  } else {
    Serial.printf("Regando. Chuva: %d%%, Umidade: %d%%\n", porcentoSC, porcentoSU);
    digitalWrite(rele, HIGH);
    bombaAtivada = true;
  }

  // Criar o JSON dinamicamente
String jsonPayloadBO = String("{\"idBomba\":1,\"bombaAtivada\":") + (bombaAtivada ? "true" : "false") + "}";
String jsonPayloadSU = String("{\"idSensor\":1,\"medida\":") + porcentoSU + "}";
String jsonPayloadSC = String("{\"idSensor\":2,\"medida\":") + porcentoSC + "}";

  // Enviar os dados
  if (WiFi.status() == WL_CONNECTED) {
    enviarHTTPPost(serverUrlB, jsonPayloadBO);
    enviarHTTPPost(serverUrlS, jsonPayloadSU);
    enviarHTTPPost(serverUrlS, jsonPayloadSC);
  } else {
    Serial.println("Wi-Fi desconectado. Não foi possível enviar os dados.");
  }

  delay(5000);  // Intervalo para a próxima leitura
}

void enviarHTTPPost(const char* url, String payload) {
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);

  Serial.printf("POST para %s\nPayload: %s\nCódigo de resposta: %d\n", url, payload.c_str(), httpResponseCode);

  http.end();
}