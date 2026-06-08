// MODULUS X - 1. Formül Açılımı Analitik Motoru
document.addEventListener('DOMContentLoaded', () => {
    const btnCalistir = document.querySelector('.btn-calistir');
    if (btnCalistir) {
        btnCalistir.addEventListener('click', formulAnaliziniCalistir);
    }
});

function formulAnaliziniCalistir() {
    // Arayüz girdilerini yakala
    const xAlani = document.getElementById('xAlani').value.trim() || "Belirtilmeyen Alan";
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Mevcut Çevre Yapısı";

    if (xAlani === "Belirtilmeyen Alan") {
        alert("Lütfen analiz edilecek X Alanını (Derdi/Projeyi) yazın.");
        return;
    }

    const btn = document.querySelector('.btn-calistir');
    btn.innerHTML = 'MATRİS PARÇALANIYOR...';
    btn.disabled = true;

    setTimeout(() => {
        // 1. ZAMAN ÇARPANINI HESAPLAMA (Z = S - Z)
        const zamanDelta = zamanS - zamanZ;
        let zamanCarpaniYonu = "+";
        let zamanCarpaniAnalizi = "";
        
        if (zamanDelta > 0) {
            zamanCarpaniYonu = "+";
            zamanCarpaniAnalizi = `Geleceğe yönelik stratejik adım atma eğilimi baskın. Gelecek projeksiyonu ${zamanDelta} yıllık bir kırılma avantajı yaratıyor.`;
        } else if (zamanDelta < 0) {
            zamanCarpaniYonu = "-";
            zamanCarpaniAnalizi = `Geçmişe, eski kalıplara veya tıkantılara odaklanma eğilimi mevcut. ${Math.abs(zamanDelta)} yıllık bir geçmiş yükü matrisi aşağı çekiyor.`;
        } else {
            zamanCarpaniYonu = "+";
            zamanCarpaniAnalizi = "Şimdiki zaman dengesi kararlı. Gecikme veya geçmiş yükü yok, doğrudan eylem anı.";
        }

        // 2. YER DEĞİŞTİRME (YD) HESAPLAMA
        // Girdilerin ortalaması ve X alanının ağırlığıyla bir Yer Değiştirme skoru simüle edilir
        const yerDegistirmeSkoru = ((maddi + manevi + disBoyut) / 3).toFixed(1);
        
        // 3. NİHAİ DEĞER VE FORMÜLÜN YÖNÜ
        // Zaman çarpanı yönü ve boyutların gücüne göre nihai değer belirlenir
        const toplamGirdi = maddi + manevi + disBoyut;
        const isPositive = (zamanCarpaniYonu === "+" && toplamGirdi >= 12);
        const netDegerSembolu = isPositive ? "+ DEĞER" : "- DEĞER";
        const netDegerRenk = isPositive ? "#00ff87" : "#ff0055";

        // Sonuç Panelini Bul veya Oluştur
        let sonucPaneli = document.getElementById('matrix-result-panel');
        if (!sonucPaneli) {
            sonucPaneli = document.createElement('div');
            sonucPaneli.id = 'matrix-result-panel';
            document.querySelector('.matrix-container').appendChild(sonucPaneli);
        }

        // Kesin Yanıt Formatını Arayüze Basma
        sonucPaneli.innerHTML = `
            <div class="result-box" style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(0,242,254,0.15); text-align: left;">
                
                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 15px; border-left: 3px solid #e000ff; padding-left: 10px;">📊 FORMÜL MODELLEMESİ</h3>
                <div style="background: #172030; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; color: #fff; margin-bottom: 20px; text-align: center; border: 1px solid rgba(224,0,255,0.2);">
                    Z(${zamanCarpaniYonu}) * ((${maddi}YD<sub>maddi</sub> + ${manevi}YD<sub>manevi</sub>) * B<sub>[${birlesmeGirdi.substring(0,10)}]</sub>) = <span style="color: ${netDegerRenk}; font-weight: bold;">${netDegerSembolu} (${yerDegistirmeSkoru})</span>
                </div>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">1. ⏳ ZAMAN ÇARPANINI DEĞERLENDİRME (Z = S - Z)</h3>
                <ul style="list-style: none; padding-left: 0; margin-bottom: 20px; font-size: 0.9rem; line-height: 1.6;">
                    <li style="margin-bottom: 8px;"><strong style="color: #a3b8cc;">Siyasi/Sosyal/Kişisel Zaman Durumu:</strong> <span style="color: #fff;">${zamanCarpaniAnalizi}</span></li>
                    <li><strong style="color: #a3b8cc;">Zaman Çarpanı Yönü (+ / -):</strong> <span style="color: ${netDegerRenk}; font-weight: bold;">[ ${zamanCarpaniYonu} ]</span></li>
                </ul>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">2. 🚀 YER DEĞİŞTİRME ANALİZİ</h3>
                <ul style="list-style: none; padding-left: 0; margin-bottom: 20px; font-size: 0.9rem; line-height: 1.6;">
                    <li style="margin-bottom: 6px;"><strong style="color: #a3b8cc;">Maddi Boyut:</strong> <span style="color: #fff;">Lojistik ve finansal altyapı seviyesi: ${maddi}/10. Enerji akışı kararlılığı inceleniyor.</span></li>
                    <li style="margin-bottom: 6px;"><strong style="color: #a3b8cc;">Manevi Boyut:</strong> <span style="color: #fff;">Psikolojik direnç, inanç ve azim dengesi: ${manevi}/10. İçsel odak tam.</span></li>
                    <li style="margin-bottom: 6px;"><strong style="color: #a3b8cc;">Dış Boyut:</strong> <span style="color: #fff;">Çevresel baskı faktörleri ve rakiplerin direnci: ${disBoyut}/10 seviyesinde ölçüldü.</span></li>
                    <li><strong style="color: #a3b8cc;">X Alanı (Uygulama Alanı):</strong> <span style="color: #00f2fe; font-weight: bold;">${xAlani}</span></li>
                </ul>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">3. 🤝 BİRLEŞME ANALİZİ</h3>
                <p style="font-size: 0.9rem; color: #fff; line-height: 1.6; margin-bottom: 20px;">
                    <strong style="color: #a3b8cc;">Entegrasyon Sahası [${birlesmeGirdi}]:</strong> Yapılan hamle, hedef kitle ve yeni çevre yapısıyla ${isPositive ? 'yüksek uyum ve rezonans sergiliyor. Çatışma riski minimum.' : 'potansiyel bir faz uyuşmazlığı içeriyor. Ortaklık veya çevre adaptasyonu gözden geçirilmeli.'}
                </p>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">🏁 STRATEJİK SONUÇ VE NET DEĞER</h3>
                <ul style="list-style: none; padding-left: 0; font-size: 0.9rem; line-height: 1.6;">
                    <li style="margin-bottom: 8px; color: #00ff87; display: ${isPositive ? 'block' : 'none'};"><strong>[+ DEĞER] Doğru Yer Değiştirme (Maksimum Kazanç):</strong> Zaman çarpanı ve boyut kombinasyonu doğru yönü gösteriyor. Bu eylem kararlılıkla sürdürülürse maddi bağımsızlık, yüksek zihinsel gelişim ve stratejik konum avantajı elde edilecek.</li>
                    <li style="margin-bottom: 8px; color: #ff0055; display: ${!isPositive ? 'block' : 'none'};"><strong>[- DEĞER] Yanlış Yer Değiştirme (Maksimum Kayıp):</strong> Mevcut girdiler negatif eğilimde. Eğer boyut optimizasyonu yapılmadan körü körüne bu alana girilirse zaman kaybı, manevi tükenmişlik ve kaynak israfı kaçınılmaz olacaktır.</li>
                    <li><strong style="color: #e000ff;">Nihai Tavsiye:</strong> <span>${isPositive ? 'Matrisi bozma! Zaman çarpanı artıdayken birleşme alanındaki entegrasyonu hızlandır.' : 'Zaman çarpanını ve manevi boyutu yukarı çekmek için geçmiş yüklerinden sıyrıl ve geleceğe odaklanacak tek bir mikro hamleye odaklan.'}</span></li>
                </ul>

            </div>
        `;

        btn.innerHTML = 'MATRİSİ ÇALIŞTIR';
        btn.disabled = false;
    }, 1000);
}
