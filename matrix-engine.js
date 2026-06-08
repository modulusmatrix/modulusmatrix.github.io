// MODULUS X - Somut Eylem Planlayıcı Motor
document.addEventListener('DOMContentLoaded', () => {
    const btnCalistir = document.querySelector('.btn-calistir');
    if (btnCalistir) {
        btnCalistir.addEventListener('click', formulAnaliziniCalistir);
    }
});

function formulAnaliziniCalistir() {
    const uretilecekDeger = document.getElementById('uretilecekDeger').value.trim();
    const xAlani = document.getElementById('xAlani').value.trim();
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Genel Saha";

    if (!uretilecekDeger || !xAlani) {
        alert("Lütfen önce üretilecek 'Değer' kutusunu ve 'X Değişkeni' alanını doldurun.");
        return;
    }

    const btn = document.querySelector('.btn-calistir');
    btn.innerHTML = 'MATRİS SİMÜLE EDİLİYOR...';
    btn.disabled = true;

    setTimeout(() => {
        const zamanDelta = zamanS - zamanZ;
        const netSkor = ((maddi * 0.3) + (manevi * 0.5) + (disBoyut * 0.2)) * 10;
        const isPositive = netSkor >= 45 && zamanDelta >= 0;

        // Somut Görevleri Dinamik Oluşturma Kuralı
        let gorevTabloSatirlari = "";

        // Görev 1: Manevi Tabanlı Eylem
        if (manevi < 6) {
            gorevTabloSatirlari += `
                <tr>
                    <td style="color:#ff0055; font-weight:bold;">MANEVİ OPTİMİZASYON</td>
                    <td><strong>Niyet Tashihi Kampı:</strong> Eylemi dünya menfaatinden arındırıp ihlas çizgisine çekmek için 3 gün boyunca sabah tefekkürleri yapın.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Ameller niyetlere göredir." (Buhari)</td>
                </tr>`;
        } else {
            gorevTabloSatirlari += `
                <tr>
                    <td style="color:#00ff87; font-weight:bold;">MANEVİ DISİPLİN</td>
                    <td><strong>Fiili Sebeplere Sarılma:</strong> Zihinsel gücünüz tam. İnancınızı "Salih Amel" formuna dönüştürmek adına her gün şafak vaktinde çalışmaya başlayın.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Kararını verdiğin zaman Allah’a dayan." (Âl-i İmrân, 159)</td>
                </tr>`;
        }

        // Görev 2: Maddi Tabanlı Eylem
        if (maddi < 4) {
            gorevTabloSatirlari += `
                <tr>
                    <td style="color:#ffaa00; font-weight:bold;">MADDI YER DEĞİŞTİRME</td>
                    <td><strong>Sıfır Sermaye Dağıtımı:</strong> Finansal yetersizliği aşmak için tamamen açık kaynaklı ve ücretsiz dijital altyapılara (GitHub, Ücretsiz Kurslar) göç edin.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"İnsan için ancak çalıştığı vardır." (Necm, 39)</td>
                </tr>`;
        } else {
            gorevTabloSatirlari += `
                <tr>
                    <td style="color:#00f2fe; font-weight:bold;">MADDI YER DEĞİŞTİRME</td>
                    <td><strong>Sermaye Rasyonalizasyonu:</strong> Elinizdeki bütçenin %20'sini projenin teknik ve lojistik araçlarına yatırın, israftan kaçının.</td>
                    <td style="color:#a3b8cc; font-size:0.75rem;">"Yiyin için fakat israf etmeyin." (A'râf, 31)</td>
                </tr>`;
        }

        // Görev 3: Birleşme ve Çevre Tabanlı Eylem
        gorevTabloSatirlari += `
            <tr>
                <td style="color:#e000ff; font-weight:bold;">BİRLEŞME SAHASI</td>
                <td><strong>Ortam Rezonansı:</strong> [${birlesmeGirdi}] alanındaki nitelikli insanlarla istişare meclisleri kurun. Zaman kaybettiren çevreleri izole edin.</td>
                <td style="color:#a3b8cc; font-size:0.75rem;">"Kişi dostunun dini üzeredir." (Tirmizi)</td>
            </tr>`;

        let sonucPaneli = document.getElementById('matrix-result-panel');
        
        sonucPaneli.innerHTML = `
            <div style="margin-top: 25px; padding: 20px; background: rgba(11, 17, 30, 0.8); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 12px; animation: fadeIn 0.4s ease;">
                
                <div style="text-align: center; margin-bottom: 15px;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; color: #718096; letter-spacing: 2px;">Nihai Değer Sentezi</span>
                    <h2 style="color: ${isPositive ? '#00ff87' : '#ff0055'}; font-size: 1.3rem; margin-top: 4px;">
                        ${isPositive ? `+ VALUE: [${uretilecekDeger}]` : `- DEĞER KAYBI`}
                    </h2>
                </div>

                <div style="background: #060a12; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #a3b8cc; text-align: center; margin-bottom: 20px; border: 1px solid #141f36;">
                    Z(${zamanDelta >= 0 ? '+' : '-'}) * ((${maddi}YD<sub>maddi</sub> + ${manevi}YD<sub>manevi</sub>) * B<sub>[${birlesmeGirdi.substring(0,6)}]</sub>)
                </div>

                <h4 style="font-size: 0.8rem; color: #00f2fe; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">🎯 Somut Eylem ve Amel Planı</h4>
                
                <table class="table-action">
                    <thead>
                        <tr>
                            <th>Vektör</th>
                            <th>Eylemsel Somut Görev</th>
                            <th>Şer'i Referans</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gorevTabloSatirlari}
                    </tbody>
                </table>

                <p style="margin-top: 15px; font-size: 0.75rem; color: #4e6178; line-height: 1.5; text-align: center; font-style: italic;">
                    *Bu matris, girdiğiniz verileri Sünnetullah ve analitik optimizasyon kurallarına göre yorumlamıştır. Eyleme geçmek kulun iradesindedir.
                </p>
            </div>
        `;

        btn.innerHTML = 'Matrisi Hesapla';
        btn.disabled = false;
    }, 1000);
}
