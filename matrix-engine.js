// MODULUS X - Yer Değiştirme ve Birleşme Teorisi Çözüm Motoru
document.addEventListener('DOMContentLoaded', () => {
    const btnMatrix = document.querySelector('.btn-matrix');
    if (btnMatrix) {
        btnMatrix.addEventListener('click', teoriSentezle);
    }
});

function teoriSentezle() {
    const xAlani = document.getElementById('xAlani').value.trim();
    const birlesmeAlani = document.getElementById('birlesmeAlani').value.trim();
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;

    if (!xAlani || !birlesmeAlani) {
        alert("Teorik Hata: 'X_Sahası' ve 'Birleşme Sahası' boş bırakılamaz. Kul irade gösterip eylemi tanımlamalıdır.");
        return;
    }

    const btn = document.querySelector('.btn-matrix');
    btn.innerHTML = 'KUL YER DEĞİŞTİRİYOR...';
    btn.disabled = true;

    setTimeout(() => {
        // Kitap Formülü: Zaman = S - Z
        const zamanMetresi = zamanS - zamanZ;
        
        // Maneviyat ve İhlas çarpanı (Zamana tapmayı engelleyen ana kalkan)
        const maneviKatsayi = manevi * 1.5; 
        const maddiKatsayi = maddi * 0.8; // Maddiyat amaca giden sadece bir araçtır
        
        // Dış çevre etkisinin dengelenmesi
        const disCevreEtkisi = disBoyut > 0 ? (disBoyut * 0.2) : 0.5;

        // Toplam Yer Değiştirme ve Birleşme Skoru
        const netTeoriSkoru = ((maddiKatsayi + maneviKatsayi) / disCevreEtkisi) * (zamanMetresi === 0 ? 1 : zamanMetresi);
        
        const isPositive = netTeoriSkoru > 0 && manevi >= 6;

        const softGreen = "#4ade80";
        const softRed = "#f87171";

        let stratejiRaporu = "";

        // MATRİS ANALİZ SATIRLARI (Doğrudan Kitaptaki Hakikatlere Göre)
        
        // 1. Hakikat: Zamana Tapmayı Engelleme ve Tevekkül
        if (zamanMetresi <= 0) {
            stratejiRaporu += `
                <tr>
                    <td style="color:${softRed}; font-weight:bold;">ZAMANSAL UYARI</td>
                    <td><strong>Zamana Tapma Riski:</strong> Mevcut dünya zaman metresinin (${zamanZ}) gerisinde veya tam üzerindesiniz. Sadece anlık maddi kazanca odaklanmak kulun bereketini sıfırlar. Zaman çarpanını büyütmek için ufkunuzu ebediyete ve geleceğe açın.</td>
                    <td style="color:#8fa3bf; font-size:0.75rem;">"İnsan yer değiştirme ve birleştirmeyi öyle ayarlamalı ki; bir saati 300 gün gibi geçsin." (Teori Kitabı)</td>
                </tr>`;
        } else {
            stratejiRaporu += `
                <tr>
                    <td style="color:${softGreen}; font-weight:bold;">ZAMANSAL BEREKET</td>
                    <td><strong>Gelecek Ufku:</strong> Dünyanın ${zamanMetresi} yıl ilerisinde bir vizyon hedefliyorsunuz. Bu ileri zamanlı YerdDeğiştirme, sabır ve doğru birleşme ile berekete dönüşecektir.</td>
                    <td style="color:#8fa3bf; font-size:0.75rem;">Artı Zamanlı Değer Kazanımı</td>
                </tr>`;
        }

        // 2. Hakikat: Değeri Sadece Allah Belirler
        stratejiRaporu += `
            <tr>
                <td style="color:#ffb74d; font-weight:bold;">YARATILIŞ KANUNU</td>
                <td><strong>Değer Yaratımı İllüzyonu:</strong> Siz [${xAlani}] sahasında ne kadar çalışırsanız çalışın, siz yeni bir şey "yaratamazsınız". Siz sadece parçaları oynatır, yer değiştirirsiniz. Kul iradesini teslim etmeli, değeri yaratacak olanın yalnızca Allah olduğunu bilerek kibirden arınmalıdır.</td>
                <td style="color:#8fa3bf; font-size:0.75rem;">"Doğru yer değiştirmeyi bulursa, değeri Allah tarafından ortaya çıkarılır." (Teori Kitabı)</td>
            </tr>`;

        // 3. Hakikat: Manevi Boyut ve İhlas Filtresi
        if (manevi < 6) {
            stratejiRaporu += `
                <tr>
                    <td style="color:${softRed}; font-weight:bold;">MANEVİ AÇIK</td>
                    <td><strong>Niyet Sapması:</strong> Maddi boyutun ağırlığı maneviyatı ezmiş. Maddi putlardan (para, makam, şöhret) arınmak için acilen niyet izolasyonu yapın. Eylemi sadece Allah rızası için yürütün.</td>
                    <td style="color:#8fa3bf; font-size:0.75rem;">"Ruhsuz insan cesettir." (Teori Kitabı)</td>
                </tr>`;
        } else {
            stratejiRaporu += `
                <tr>
                    <td style="color:${softGreen}; font-weight:bold;">MÜMİN ENTEGRASYONU</td>
                    <td><strong>Fiili Tevekkül:</strong> Kalbi niyetiniz yüksek. Şimdi bu manevi gücü, [${birlesmeAlani}] ekosisteminde somut eylemlere ve doğru helal birleşmelere dökme vaktidir.</td>
                    <td style="color:#8fa3bf; font-size:0.75rem;">Manevi Boyut Tamam</td>
                </tr>`;
        }

        // 4. Hakikat: Birleşme Eksikliği Riski
        stratejiRaporu += `
            <tr>
                <td style="color:#c084fc; font-weight:bold;">BİRLEŞME GÖREVİ</td>
                <td><strong>Döngüyü Tamamlama:</strong> Yer değiştirme aşamasında kalmayın. [${xAlani}] üzerindeki teorik çalışmalarınızı mutlaka [${birlesmeAlani}] ortamında pratik ittifaklarla birleştirin. Birleşme olmazsa sonuç sıfır kalır.</td>
                <td style="color:#8fa3bf; font-size:0.75rem;">"Birleşme yapılamazsa ortaya bir değer çıkmaz." (Teori Kitabı)</td>
            </tr>`;

        const sonucPaneli = document.getElementById('matrix-result-panel');
        if (sonucPaneli) {
            sonucPaneli.innerHTML = `
                <div style="margin-top: 25px; padding: 20px; background: #121721; border: 1px solid #222c3d; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #1f2736; padding-bottom: 12px;">
                        <span style="font-size:0.75rem; color:#8fa3bf; letter-spacing:1px; text-transform:uppercase;">İLÂHİ DEĞER VE SENTEZ RAPORU</span>
                        <h3 style="color:${isPositive ? softGreen : softRed}; font-size:1.1rem; margin-top:5px;">
                            ${isPositive ? `✓ TEORİK DENGELENME: Kul Eylemde, Takdir Allah'ındır` : `⚠ UYARI: Zamansal Sapma ve Maddi Odaklanma Tehdidi`}
                        </h3>
                    </div>

                    <table class="action-table">
                        <thead>
                            <tr>
                                <th style="width:25%;">Teorik Katman</th>
                                <th style="width:50%;">Algoritmik Eylem Sonucu</th>
                                <th style="width:25%;">Teori Esası</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stratejiRaporu}
                        </tbody>
                    </table>

                    <div style="font-size:0.7rem; color:#526480; text-align:center; margin-top:15px; font-style:italic;">
                        Teorik Değer Katsayısı: ${netTeoriSkoru.toFixed(2)} | Sistem: Kul Sebeplere Sarıldı
                    </div>
                </div>
            `;
        }

        btn.innerHTML = 'TEORİK SENTEZİ ÇALIŞTIR';
        btn.disabled = false;
    }, 1000);
}
