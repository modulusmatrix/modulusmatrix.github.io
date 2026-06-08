// MODULUS X - Göz Dostu Karar Motoru
document.addEventListener('DOMContentLoaded', () => {
    const btnMatrix = document.querySelector('.btn-matrix');
    if (btnMatrix) {
        btnMatrix.addEventListener('click', denklemiHesapla);
    }
});

function denklemiHesapla() {
    const uretilecekDeger = document.getElementById('uretilecekDeger').value.trim();
    const xAlani = document.getElementById('xAlani').value.trim();
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Genel Saha";

    if (!uretilecekDeger || !xAlani) {
        alert("Matris Hatası: 'DEĞER' ve 'X_Sahası' parametreleri boş bırakılamaz.");
        return;
    }

    const btn = document.querySelector('.btn-matrix');
    btn.innerHTML = 'DENKLEM ÇÖZÜLÜYOR...';
    btn.disabled = true;

    setTimeout(() => {
        const zamanDelta = zamanS - zamanZ;
        const disCevreKatsayisi = disBoyut > 0 ? (disBoyut * 0.1) : 0.5;
        const zamanEtkisi = zamanDelta >= 0 ? 1.5 : 0.4;
        const netSkor = (((maddi * 0.4) + (manevi * 0.6)) / disCevreKatsayisi) * zamanEtkisi;
        
        const isPositive = netSkor >= 25;

        // Renk Teorisi Çıktıları: Aşırı parlak neonlar yerine dengeli tonlar
        const basariRengi = "#4ade80"; // Yumuşak yeşil
        const uyariRengi = "#f87171";  // Mat kırmızı

        let eylemSatirlari = "";

        if (manevi < 6) {
            eylemSatirlari += `
                <tr>
                    <td style="color:${uyariRengi}; font-weight:bold;">[MANEVİ]</td>
                    <td><strong>Niyet İzolasyonu:</strong> Üretilmek istenen "${uretilecekDeger}" değerini korumak için projenizi bir süre gizli tutun ve kalbi ihlasa odaklanın.</td>
                    <td style="color:#94a3b8; font-size:0.75rem;">"Ameller niyetlere göredir." (Buhari)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:${basariRengi}; font-weight:bold;">[MANEVİ]</td>
                    <td><strong>Sebeplere Tevekkül:</strong> İçsel motivasyonunuz tam. Değeri somutlaştırmak adına her gün şafak vaktinde "${xAlani}" için fiili eyleme geçin.</td>
                    <td style="color:#94a3b8; font-size:0.75rem;">"Karar verince Allah’a dayan." (Âl-i İmrân, 159)</td>
                </tr>`;
        }

        if (maddi < 4) {
            eylemSatirlari += `
                <tr>
                    <td style="color:#f97316; font-weight:bold;">[MADDİ]</td>
                    <td><strong>Maliyet Kısıtı Yönetimi:</strong> Finansal yük oluşturmamak adına tamamen ücretsiz ve açık kaynaklı dijital kütüphaneler üzerinden ilerleyin.</td>
                    <td style="color:#94a3b8; font-size:0.75rem;">"İnsan için ancak çalıştığı vardır." (Necm, 39)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:#38bdf8; font-weight:bold;">[MADDİ]</td>
                    <td><strong>Esbab Yatırımı:</strong> Mevcut bütçenizin bir kısmını doğrudan "${xAlani}" konusundaki teknik araçların tedariğine ayırın.</td>
                    <td style="color:#94a3b8; font-size:0.75rem;">"Yiyin için, israf etmeyin." (A'râf, 31)</td>
                </tr>`;
        }

        eylemSatirlari += `
            <tr>
                <td style="color:#c084fc; font-weight:bold;">[ÇEVRE]</td>
                <td><strong>Halkayı Filtreleme:</strong> [${birlesmeGirdi}] ortamındaki durağan ilişkileri sınırlandırın. Bilgi üreten odaklarla istişare kanalları açın.</td>
                <td style="color:#94a3b8; font-size:0.75rem;">"Kişi dostunun dini üzeredir." (Tirmizi)</td>
            </tr>`;

        const sonucPaneli = document.getElementById('matrix-result-panel');
        if (sonucPaneli) {
            sonucPaneli.innerHTML = `
                <div style="margin-top: 25px; padding: 20px; background: #181f2c; border: 1px solid #263147; border-radius: 10px; animation: fadeIn 0.3s ease;">
                    <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #232c3f; padding-bottom: 12px;">
                        <span style="font-size:0.75rem; color:#788fa9; letter-spacing:1px; text-transform:uppercase;">ALGORİTMİK SENTEZ RAPORU</span>
                        <h3 style="color:${isPositive ? basariRengi : uyariRengi}; font-size:1.05rem; margin-top:5px; font-family:sans-serif;">
                            ${isPositive ? `✓ BAŞARILI MATRİS: [${uretilecekDeger}] Dengede` : `⚠ UYARI: Değer Kaybı Riski`}
                        </h3>
                    </div>

                    <table class="action-table">
                        <thead>
                            <tr>
                                <th style="width:20%;">Vektör</th>
                                <th style="width:55%;">Stratejik Görev</th>
                                <th style="width:25%;">Şer'i Esas</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${eylemSatirlari}
                        </tbody>
                    </table>

                    <div style="font-size:0.7rem; color:#566981; text-align:center; margin-top:15px; font-style:italic;">
                        Modulus_X_Index: ${netSkor.toFixed(2)} | Status: Optimized
                    </div>
                </div>
            `;
        }

        btn.innerHTML = 'MATRİSİ HESAPLA';
        btn.disabled = false;
    }, 900);
}
