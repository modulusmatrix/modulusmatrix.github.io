// MODULUS X - Algoritmik Karar Motoru
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
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Genel Ekosistem";

    if (!uretilecekDeger || !xAlani) {
        alert("Matris hatası: 'DEĞER' ve 'X_Sahası' parametreleri boş bırakılamaz.");
        return;
    }

    const btn = document.querySelector('.btn-matrix');
    btn.innerHTML = 'DENKLEM ÇÖZÜLÜYOR...';
    btn.disabled = true;

    setTimeout(() => {
        const zamanDelta = zamanS - zamanZ;
        // Gelişmiş Modulus X matematiksel katsayı ağırlığı
        const netSkor = (((maddi * 0.4) + (manevi * 0.6)) / (disBoyut > 0 ? disBoyut * 0.1 : 1)) * (zamanDelta >= 0 ? 1.2 : 0.5);
        const isPositive = netSkor >= 40;

        let eylemSatirlari = "";

        // 1. MANEVİ BOYUT SOMUT GÖREVİ
        if (manevi < 6) {
            eylemSatirlari += `
                <tr>
                    <td style="color:#ff0055;">[MANEVİ]</td>
                    <td><strong>Niyet İzolasyonu:</strong> Eylemi her türlü gösterişten arındırın. 3 gün boyunca kimseye bahsetmeden gizli çalışma takvimi uygulayın.</td>
                    <td>"Ameller niyetlere göredir." (Buhari)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:#00ff87;">[MANEVİ]</td>
                    <td><strong>Sebeplere Tevekkül:</strong> Zihinsel hazırbulunuşluğu bozmamak için her sabah işe başlamadan önce niyet tazeleyin ve istikrarlı kalın.</td>
                    <td>"Karar verince Allah’a dayan." (Âl-i İmrân, 159)</td>
                </tr>`;
        }

        // 2. MADDİ BOYUT SOMUT GÖREVİ
        if (maddi < 4) {
            eylemSatirlari += `
                <tr>
                    <td style="color:#ffaa00;">[MADDİ]</td>
                    <td><strong>Sıfır Maliyet Göçü:</strong> Finansal yükü sıfırlamak için açık kaynak kodlu yazılımlar ve dijital kütüphaneler dışında harcama yapmayın.</td>
                    <td>"İnsan için ancak çalıştığı vardır." (Necm, 39)</td>
                </tr>`;
        } else {
            eylemSatirlari += `
                <tr>
                    <td style="color:#00f2fe;">[MADDİ]</td>
                    <td><strong>Kaynak Dağılımı:</strong> Maddi gücün %15'ini projenin gelişim araçlarına (eğitim, sunucu vb.) yatırın, gerisini israftan koruyun.</td>
                    <td>"Yiyin için, israf etmeyin." (A'râf, 31)</td>
                </tr>`;
        }

        // 3. ENTEGRASYON VE ÇEVRE GÖREVİ
        eylemSatirlari += `
            <tr>
                <td style="color:#e000ff;">[ÇEVRE]</td>
                <td><strong>Halkayı Temizleme:</strong> [${birlesmeGirdi}] sahasındaki 3 uzmanı takibe alın. Sizi yavaşlatan pasif çevreleri izole edin.</td>
                <td>"Kişi dostunun dini üzeredir." (Tirmizi)</td>
            </tr>`;

        let sonucPaneli = document.getElementById('matrix-result-panel');
        
        sonucPaneli.innerHTML = `
            <div style="margin-top: 25px; padding: 15px; background: #070c16; border: 1px solid #1e293b; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #111a2e; padding-bottom: 10px;">
                    <span style="font-size:0.7rem; color:#475569; letter-spacing:1px;">ALGORİTMİK ÇIKTI SENTEZİ</span>
                    <h3 style="color:${isPositive ? '#00ff87' : '#ff0055'}; font-size:1rem; margin-top:5px; font-family:sans-serif;">
                        ${isPositive ? `+ SÜREÇ BAŞARILI: [${uretilecekDeger}] Gelişiyor` : `- DEĞER ERİMESİ SAKINCASI`}
                    </h3>
                </div>

                <table class="action-table">
                    <thead>
                        <tr>
                            <th style="width:20%">Vektör</th>
                            <th style="width:55%">Somut Stratejik Amel / Görev</th>
                            <th style="width:25%">Şer'i Esas</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${eylemSatirlari}
                    </tbody>
                </table>

                <div style="font-size:0.7rem; color:#475569; text-align:center; margin-top:12px; font-style:italic;">
                    Hesaplama Katsayısı: Net_Puan(${netSkor.toFixed(1)}) | Matris Kararlılığı: Tamamlandı.
                </div>
            </div>
        `;

        btn.innerHTML = 'Matrisi Hesapla';
        btn.disabled = false;
    }, 900);
}
