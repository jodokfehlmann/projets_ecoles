---
id: code
title: Code Arduino — Stabilisation Active
sidebar_label: 💻 Code
---
# 💻 Code Arduino — Contrôleur PID Ball-Balancing

```cpp title="ball_balancing_pid.ino"
// ============================================
// Arduino EduKit Algérie — Ball Balancing PID
// Version 1.0 — Licence MIT
// ============================================
#include <Wire.h>
#include <MPU6050.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

MPU6050 mpu;
Servo servoX, servoY;
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Paramètres PID (réglés via potentiomètres A0,A1,A2)
float Kp, Ki, Kd;
float angleX = 0, angleY = 0;
float errX = 0, errY = 0;
float intX = 0, intY = 0;
float errPrecX = 0, errPrecY = 0;
unsigned long tPrec = 0;

void lireAngles(float dt) {
  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  float accelX = atan2((float)ay, (float)az) * 180.0 / PI;
  float accelY = atan2((float)ax, (float)az) * 180.0 / PI;
  float gyroX  = gx / 131.0;
  float gyroY  = gy / 131.0;

  // Filtre complémentaire 98% gyro + 2% accéléro
  angleX = 0.98 * (angleX + gyroX * dt) + 0.02 * accelX;
  angleY = 0.98 * (angleY + gyroY * dt) + 0.02 * accelY;
}

float pid(float err, float& integral, float& errPrec, float dt) {
  integral += err * dt;
  integral  = constrain(integral, -30, 30);  // Limite anti-windup
  float deriv = (err - errPrec) / dt;
  errPrec = err;
  return Kp * err + Ki * integral + Kd * deriv;
}

void lireKpKiKd() {
  Kp = analogRead(A0) / 1023.0 * 5.0;  // 0 à 5
  Ki = analogRead(A1) / 1023.0 * 0.5;  // 0 à 0.5
  Kd = analogRead(A2) / 1023.0 * 2.0;  // 0 à 2
}

void afficherLCD() {
  lcd.setCursor(0, 0);
  lcd.print("Kp:"); lcd.print(Kp, 1);
  lcd.print(" Ki:"); lcd.print(Ki, 2);
  lcd.setCursor(0, 1);
  lcd.print("Kd:"); lcd.print(Kd, 1);
  lcd.print(" X:"); lcd.print(angleX, 1);
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mpu.initialize();
  servoX.attach(9);  servoY.attach(10);
  servoX.write(90);  servoY.write(90);  // Position neutre
  lcd.init(); lcd.backlight();
  tPrec = micros();
  Serial.println("Ball-Balancing PID EduKit prêt !");
}

void loop() {
  unsigned long maintenant = micros();
  float dt = (maintenant - tPrec) / 1000000.0;
  tPrec = maintenant;

  lireAngles(dt);
  lireKpKiKd();

  // Erreurs = cible (0°) - angle mesuré
  errX = 0 - angleX;
  errY = 0 - angleY;

  // Corrections PID
  float corrX = pid(errX, intX, errPrecX, dt);
  float corrY = pid(errY, intY, errPrecY, dt);

  // Appliquer aux servos (90° = neutre)
  servoX.write(constrain(90 + (int)corrX, 50, 130));
  servoY.write(constrain(90 + (int)corrY, 50, 130));

  // Afficher et envoyer données
  if (millis() % 200 < 5) {
    afficherLCD();
    Serial.print(angleX); Serial.print(",");
    Serial.print(angleY); Serial.print(",");
    Serial.print(corrX); Serial.print(",");
    Serial.println(corrY);
  }

  delay(5);  // 200 Hz
}
```

## 🎛️ Guide de réglage PID

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Kp=0.5, Ki=0, Kd=0 | Plateau bouge vers horizontal mais oscille |
| 2 | Augmente Kp | Correction plus rapide, mais plus d'oscillations |
| 3 | Kp trop grand | Oscillations incontrôlables → réduire |
| 4 | Ajoute Kd=0.1 | Les oscillations s'amortissent |
| 5 | Augmente Kd | Amortissement plus fort, réponse plus douce |
| 6 | Ajoute Ki=0.01 | Corrige le décalage résiduel |

✅ → Passe aux **[exercices →](./exercices)**
