// MODULUS X - Algoritmik Karar Motoru (Sınıf Hataları Düzeltildi)
document.addEventListener('DOMContentLoaded', () => {
    // HTML'deki class="btn-matrix" ile tam eşleşme sağlandı
    const btnMatrix = document.querySelector('.btn-matrix');
    if (btnMatrix) {
        btnMatrix.addEventListener('click', denklemiHesapla);
    } else {
        console.error("Modulus X Hata: .btn-matrix sınıfına sahip buton bulunamadı.");
    }
});

function denklemiHesapla() {
    // Parametreleri DOM üzerinden güvenli şekilde oku
    const uretilecekDeger = document.getElementById('uretilecekDeger').value.trim();
    const xAlani = document.getElementById('xAlani').value.trim();
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Genel Saha";

    // Validasyon Kontrolü
    if (!uretilecekDeger || !xAlani) {
        alert("Matris Hatası: 'DEĞER' ve 'X_Sahası' parametreleri boş bırakılamaz. Önce bu alanları doldurun.");
        return;
    }

    const btn = document.querySelector('.btn-matrix');
    btn.innerHTML = 'DENKLEM ÇÖZÜLÜYOR...';
    btn.disabled = true;

    setTimeout(() => {
        const zamanDelta = zamanS - zamanZ;
        
        // Modulus X Gelişmiş Matematiksel Formülü
        // Maneviyat ve Maddiyat toplam ağırlığının, Dış Çevre direncine oranı ve Zaman çarpanı etkisi
        const disCevreKatsayisi = disBoyut > 0 ? (disBoyut * 0.1) : 0.5;
        const zamanEtkisi = zamanDelta >= 0 ? 1.5 : 0.4;
        const netSkor = (((maddi * 0.4) + (manevi * 0.6)) / disCevreKatsayisi) * zamanEtkisi;
        
        const isPositive = netSkor >= 25;

        // Eylemsel Görev Tablo İçeriği Üretimi
        let eylemSatirlari = "";

        // 1. MANEVİ BOYUT VE DEĞER İLİŞKİSİ
        if (manevi < 6) {
            eylemSatirlari += `
                <tr>
                    <td style="color:#ff0055; font-weight:bold;">[MANEVİ]</td>
                    <td><strong>Niyet İzolasyonu:</strong> Üretilmek istenen "${uretilecekDeger}" değerini riya ve gösterişten korumak için en az 7 gün boyunca projenizi dış çevreye kapatın ve gizli çalışma disiplinine geçin.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Ameller niyetlere göredir." (Buhari)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:#00ff87; font-weight:bold;">[MANEVİ]</td>
                    <td><strong>Sebeplere Tevekkül:</strong> Kalbi kararlılığınız yüksek. Bu enerjiyi atalete kurban etmemek adına her gün şafak vaktinde "${xAlani}" için fiili eylem saati planlayın.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Karar verince Allah’a dayan." (Âl-i İmrân, 159)</td>
                </tr>`;
        }

        // 2. MADDİ BOYUT VE YER DEĞİŞTİRME İLİŞKİSİ
        if (maddi < 4) {
            eylemSatirlari += `
                <tr>
                    <td style="color:#ffaa00; font-weight:bold;">[MADDİ]</td>
                    <td><strong>Kaynak Kısıtı Göçü:</strong> Maddi imkanların yetersizliğini bir mazeret olmaktan çıkarmak için tamamen ücretsiz, açık kaynaklı dijital altyapılara ve komünitelere göç edin.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"İnsan için ancak çalıştığı vardır." (Necm, 39)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:#00f2fe; font-weight:bold;">[MADDİ]</td>
                    <td><strong>Esbab Yatırımı:</strong> Sahip olduğunuz maddi imkanların %20'lik dilimini doğrudan "${xAlani}" konusundaki teknik araçların ve eğitimlerin tedariğine aktarın. İsrafı sıfırlayın.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Yiyin için, israf etmeyin." (A'râf, 31)</td>
                </tr>`;
        }

        // 3. ENTEGRASYON VE DIŞ ÇEVRE İLİŞKİSİ
        eylemSatirlari += `
            <tr>
                <td style="color:#e000ff; font-weight:bold;">[ÇEVRE]</td>
                <td><strong>Halkayı Filtreleme:</strong> Entegre olmaya çalıştığınız [${birlesmeGirdi}] ortamındaki toksik ve vizyonsuz kişileri çevrenizden tamamen izole edin. Değer üreten 3 ana odak nokta belirleyip onlarla istişare edin.</td>
                <td style="color:#a3b8cc; font-size:0.75rem;">"Kişi dostunun dini üzeredir." (Tirmizi)</td>
            </tr>`;

        // Sonuç Panelini DOM üzerinde güncelle
        const sonucPaneli = document.getElementById('matrix-result-panel');
        if (sonucPaneli) {
            sonucPaneli.innerHTML = `
                <div style="margin-top: 25px; padding: 20px; background: #070c16; border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #111a2e; padding-bottom: 12px;">
                        <span style="font-size:0.7rem; color:#475569; letter-spacing:2px; text-transform:uppercase;">ALGORİTMİK SENTEZ RAPORU</span>
                        <h3 style="color:${isPositive ? '#00ff87' : '#ff0055'}; font-size:1.1rem; margin-top:5px; font-family:sans-serif;">
                            ${isPositive ? `+ BAŞARILI MATRİS: [${uretilecekDeger}] Değeri Üretiliyor` : `- RİSK: Değer Kaybı Algılandı`}
                        </h3>
                    </div>

                    <table class="action-table">
                        <thead>
                            <tr>
                                <th style="width:20%; color:#00f2fe; font-size:0.75rem; padding-bottom:8px;">Vektör</th>
                                <th style="width:55%; color:#00f2fe; font-size:0.75rem; padding-bottom:8px;">Somut Stratejik Amel / Görev</th>
                                <th style="width:25%; color:#00f2fe; font-size:0.75rem; padding-bottom:8px;">Şer'i Esas</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${eylemSatirlari}
                        </tbody>
                    </table>

                    <div style="font-size:0.7rem; color:#475569; text-align:center; margin-top:15px; font-style:italic;">
                        Modulus_X_Katsayısı: ${netSkor.toFixed(2)} | Durum: Stabil
                    </div>
                </div>
            `;
        }

        btn.innerHTML = 'MATRİSİ HESAPLA';
        btn.disabled = false;
    }, 1000);
}
