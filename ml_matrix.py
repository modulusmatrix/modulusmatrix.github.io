import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

print("="*60)
print("   MODULUS X - MAKİNE ÖĞRENMESİ MODEL PROTOTİPİ BAŞLATILDI")
print("="*60)

# 1. TARİHSEL VERİ SETİ (DATASET) SİMÜLASYONU
# Geçmişte yaşanmış 1000 farklı tarihsel kararı, hicreti ve toplumsal olayı simüle ediyoruz.
np.random.seed(42)
num_samples = 1000

# Özellikler (Features): S, Z, Maddi, Manevi, Dis, X_Alani_Agirligi
S_samples = np.random.randint(2020, 2100, num_samples)
Z_samples = np.random.randint(2020, 2060, num_samples)
maddi_samples = np.random.uniform(1, 10, num_samples)
manevi_samples = np.random.uniform(1, 10, num_samples)
dis_samples = np.random.uniform(1, 10, num_samples)
x_agirlik_samples = np.random.uniform(1, 5, num_samples)

# Giriş matrisimizi (X) oluşturuyoruz
X = np.column_stack((S_samples, Z_samples, maddi_samples, manevi_samples, dis_samples, x_agirlik_samples))

# Hedef Değişken (Target - y): Kitabınızdaki gerçek felsefi formül çıktısı
# Model bu matematiksel kuralı önceden bilmeyecek, sadece girdileri ve çıktıları inceleyerek keşfedecek.
zaman_katsayisi = S_samples - Z_samples
yer_degistirme = maddi_samples + manevi_samples + dis_samples
birlesme = (maddi_samples + manevi_samples) * x_agirlik_samples
y = zaman_katsayisi * (yer_degistirme * birlesme)

# 2. VERİ BÖLME VE MODEL EĞİTİMİ (SUPERVISED LEARNING)
# Verinin %80'ini öğrenme, %20'sini ise modeli test etmek için ayırıyoruz.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modulus X Karar Mekanizması için Random Forest Regressor modelini yapılandırıyoruz
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Model Başarı Metriği Kontrolü
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"[Sistem]: Model Eğitimi Tamamlandı. Ortalama Mutlak Hata (MAE): {mae:.2f}")

# 3. YEPYENİ BİR SENARYONUN TAHMİN EDİLMESİ
# Modelin daha önce veri setinde hiç görmediği yepyeni bir toplumsal/bireysel senaryo koyuyoruz.
# Senaryo Parametreleri: S=2090, Z=2026, Maddi=8.0, Manevi=9.5, Dış=7.0, X_Alanı=4.5
yeni_senaryo = np.array([[2090, 2026, 8.0, 9.5, 7.0, 4.5]])

predicted_net_value = model.predict(yeni_senaryo)[0]

print("\n" + "-"*50)
print("🔮 YENİ SENARYO YAPAY ZEKA DEĞERLENDİRMESİ")
print("-景色"*12)
print(f"Girdiler -> S: 2090 | Z: 2026 | Maddi: 8.0 | Manevi: 9.5 | Dış: 7.0 | X Ağırlığı: 4.5")
print(f"Modulus X Tahmini Net Enerji Etkisi (E): {predicted_net_value:.2f}")
print("-"*50)

# 4. MAKİNE ÖĞRENMESİ ÇIKTISININ FELSEFİ ÖZETİ
if predicted_net_value > 10000:
    print("📈 TAHMİN: Olağanüstü Değer Kazancı!")
    print("Yorum: Model, yüksek manevi ivme ve zaman çarpanı kombinasyonunun tarihsel olarak büyüme ürettiğini saptadı.")
    print("Referans [Asr Suresi]: Zamanı ve ameli en üst düzeyde birleştiren bir aksiyon çizgisindesiniz.")
elif predicted_net_value > 0:
    print("📈 TAHMİN: Dengeli Değer Kazancı.")
    print("Yorum: Yer değiştirme ve dış boyut birleşmesi istikrarlı bir gelişim modeline işaret ediyor.")
else:
    print("📉 TAHMİN: Yüksek Hüsran ve Matris Çöküş Riski!")
    print("Yorum: Model, tarihsel başarısızlıklardan yola çıkarak bu parametrelerin zaman israfı ve değer kaybı yaratacağını öngörüyor.")
    print("Referans [Furkan Suresi]: Geriye doğru çekilen zaman algısı ve yanlış alan seçimi saptandı.")
print("="*60)
