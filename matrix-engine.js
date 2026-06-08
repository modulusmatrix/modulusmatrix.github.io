// MODULUS X - 1. Formül Açılımı Analitik Motoru (Değer Odaklı)
document.addEventListener('DOMContentLoaded', () => {
    const btnCalistir = document.querySelector('.btn-calistir');
    if (btnCalistir) {
        btnCalistir.addEventListener('click', formulAnaliziniCalistir);
    }
});

function formulAnaliziniCalistir() {
    // Arayüz girdilerini yakala
    const uretilecekDeger = document.getElementById('uretilecekDeger').value.trim() || "Genel Değer Sentezi";
    const xAlani = document.getElementById('xAlani').value.trim() || "";
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;
    const birlesmeGirdi = document.getElementById('birlesmeAlani').value.trim() || "Mevcut Çevre";

    if (xAlani === "") {
        alert("Lütfen analiz edilecek X Alanını (Derdi/Projeyi) yazın.");
        return;
    }
    if (document.getElementById('uretilecekDeger').value.trim() === "") {
        alert("Her eylem bir değer üretir. Lütfen üretmek istediğiniz boş 'Değer' kutusunu doldurun.");
        return;
    }

    const btn = document.querySelector('.btn-calistir');
    btn.innerHTML = 'DEĞER EKSENİNDE MATRİS HESAPLANIYOR...';
    btn.disabled = true;

    setTimeout(() => {
        // 1. ZAMAN ÇARPANINI HESAPLAMA (Z = S - Z)
        const zamanDelta = zamanS - zamanZ;
        let zamanCarpaniYonu = "+";
        let zamanCarpaniAnalizi = "";
        
        if (zamanDelta > 0) {
            zamanCarpaniYonu = "+";
            zamanCarpaniAnalizi = `Geleceğe yönelik azim ve tevekkül dengesi mevcut. ${zamanDelta} yıllık ileriye dönük vizyon, sabırla birleştiğinde matrisi büyütecektir.`;
        } else if (zamanDelta < 0) {
            zamanCarpaniYonu = "-";
            zamanCarpaniAnalizi = `Geçmişin keşkelerine veya ertelemelere takılma riski var. ${Math.abs(zamanDelta)} yıllık bir atalet baskısı saptandı.`;
        } else {
            zamanCarpaniYonu = "+";
            zamanCarpaniAnalizi = "Anın vacibini yerine getirme dengesi hakim. Doğrudan ihlasla eylem anı.";
        }

        // 2. YER DEĞİŞTİRME VE NİHAİ DEĞER HESABI
        const netSkor = ((maddi * 0.3) + (manevi * 0.5) + (disBoyut * 0.2)) * 10;
        const isPositive = netSkor >= 45 && zamanCarpaniYonu === "+";
        
        const netDegerSembolu = isPositive ? `+ [${uretilecekDeger}]` : `- [Kayıp Değer]`;
        const netDegerRenk = isPositive ? "#00ff87" : "#ff0055";

        // Dinamik Ayet, Hadis ve Eylemsel Görev Atama Havuzu
        let referansMetni = "";
        let eylemselPlan = "";

        if (manevi < 5) {
            referansMetni = `<strong>Kur'an Referansı:</strong> "İnsan için ancak çalıştığının karşılığı vardır." (Necm, 39)<br>
                            <strong>Hadis-i Şerif:</strong> "Ameller ancak niyetlere göredir." (Buhari)<br><br>
                            <em>Değer Analizi:</em> Hedeflediğiniz <strong>"${uretilecekDeger}"</strong> çıktısı için manevi boyut yetersiz. Niyet eksenini düzeltmek kalbi ihlas gerektirir.`;
            eylemselPlan = `<li><strong>1. Görev (Manevi Arınma):</strong> <strong>"${uretilecekDeger}"</strong> değerini üretebilmek için niyetinizi sadece Allah rızasına endeksleyin.</li>
                            <li><strong>2. Görev (Niyet Tashihi):</strong> Bu çalışmayı insanlığa faydalı bir salih amel haline getirmek için günlük tefekkür saatleri belirleyin.</li>`;
        } else {
            referansMetni = `<strong>Kur'an Referansı:</strong> "Kararını verdiğin zaman artık Allah’a dayanıp güven (tevekkül et)." (Âl-i İmrân, 159)<br>
                            <strong>Hadis-i Şerif:</strong> "İki günü eşit olan ziyandadır." (Beyhaki)<br><br>
                            <em>Değer Analizi:</em> Manevi altyapı güçlü. <strong>"${uretilecekDeger}"</strong> hedefi, inancın salih amele ve maddi gayrete (cehde) dönüşmesiyle inşa edilecek.`;
            eylemselPlan = `<li><strong>1. Görev (Süreklilik):</strong> Az da olsa devamlı olan ameller Allah katında sevimlidir. <strong>"${uretilecekDeger}"</strong> için her gün aksatmadan en az 30 dakika eylemsel çalışma disiplini kurun.</li>
                            <li><strong>2. Görev (Maddi Sebeplere Sarılma):</strong> Deveyi bağlayıp sonra tevekkül etmek adına, lojistik eksiklerinizi listeyip ilk somut adımı atın.</li>`;
        }

        if (maddi <= 3) {
            eylemselPlan += `<li><strong>3. Görev (Sıfır Sermaye Hamlesi):</strong> Maddi imkanların azlığı bir engel değildir. <strong>"${uretilecekDeger}"</strong> değerini üretmek için mevcut dijital imkanları (GitHub, AI araçları) zorlayarak fiili dua edin.</li>`;
        } else {
            eylemselPlan += `<li><strong>3. Görev (Kaynak Yönetimi):</strong> Elinizdeki maddi gücü israf etmeden, helal dairede bu değeri büyütmek için infak ve yatırım dengesiyle kullanın.</li>`;
        }

        // Sonuç Panelini Bul veya Oluştur
        let sonucPaneli = document.getElementById('matrix-result-panel');
        if (!sonucPaneli) {
            sonucPaneli = document.createElement('div');
            sonucPaneli.id = 'matrix-result-panel';
            document.querySelector('.matrix-container').appendChild(sonucPaneli);
        }

        // Şablona Göre Çıktıyı Yazdır
        sonucPaneli.innerHTML = `
            <div style="margin-top: 25px; padding: 20px; border: 1px solid rgba(0,242,254,0.2); background: #172030; border-radius: 12px; text-align: left;">
                
                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 12px; border-left: 3px solid #e000ff; padding-left: 10px;">📊 FORMÜL MODELLEMESİ</h3>
                <div style="background: #0c111a; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; color: #fff; margin-bottom: 20px; text-align: center; border: 1px solid rgba(0,242,254,0.1);">
                    Z(${zamanCarpaniYonu}) * ((${maddi}YD<sub>maddi</sub> ± ${manevi}YD<sub>manevi</sub>) * B<sub>[${birlesmeGirdi.substring(0,8)}]</sub>) = <span style="color: ${netDegerRenk}; font-weight: bold;">${netDegerSembolu}</span>
                </div>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">1. ⏳ ZAMAN ÇARPANINI DEĞERLENDİRME (Z = S - Z)</h3>
                <div style="font-size: 0.9rem; margin-bottom: 20px; line-height: 1.6;">
                    <p style="margin-bottom: 6px;"><strong style="color: #a3b8cc;">Siyasi/Sosyal/Kişisel Zaman Durumu:</strong> <span style="color: #fff;">${zamanCarpaniAnalizi}</span></p>
                    <p><strong>Zaman Çarpanı Yönü (+ / -):</strong> <span style="color: ${netDegerRenk}; font-weight: bold;">[ ${zamanCarpaniYonu} ]</span></p>
                </div>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">2. 🚀 YER DEĞİŞTİRME ANALİZİ</h3>
                <div style="font-size: 0.9rem; margin-bottom: 20px; line-height: 1.6;">
                    <p style="margin-bottom: 4px;"><strong style="color: #a3b8cc;">Maddi Boyut:</strong> Rızık ve esbab dairesi analizi: Seviye ${maddi}/10.</p>
                    <p style="margin-bottom: 4px;"><strong style="color: #a3b8cc;">Manevi Boyut:</strong> Kalbi niyet, azim ve dini bütünlük katsayısı: Seviye ${manevi}/10.</p>
                    <p style="margin-bottom: 4px;"><strong style="color: #a3b8cc;">Dış Boyut:</strong> Çevresel şer/hayır odakları ve imtihan şartları: Seviye ${disBoyut}/10.</p>
                    <p><strong style="color: #00f2fe;">X Alanı (Uygulama Alanı):</strong> <span style="color: #fff; font-weight: bold;">${xAlani}</span></p>
                </div>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">3. 🤝 BİRLEŞME ANALİZİ</h3>
                <p style="font-size: 0.9rem; color: #fff; line-height: 1.6; margin-bottom: 20px;">
                    <strong style="color: #a3b8cc;">Entegrasyon Sahası [${birlesmeGirdi}]:</strong> Bu hamle ile dahil olunan yeni ekosistem, kişinin itikadi ve dünyevi yapısıyla rezonansa giriyor. Sünnetullah kurallarına göre çevre etkileşimi test ediliyor.
                </p>

                <h3 style="color: #e000ff; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">🕌 HİKMET VE REFERANS MERKEZİ</h3>
                <p style="font-size: 0.85rem; color: #a3b8cc; background: #0c111a; padding: 12px; border-radius: 8px; line-height: 1.5; margin-bottom: 20px; border-left: 2px solid #e000ff;">
                    ${referansMetni}
                </p>

                <h3 style="color: #00ff87; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">📋 KİŞİYE ÖZEL EYLEMSEL GÖREV PLANI</h3>
                <ul style="padding-left: 15px; font-size: 0.85rem; color: #fff; line-height: 1.6; margin-bottom: 20px;">
                    ${eylemselPlan}
                </ul>

                <h3 style="color: #00f2fe; font-size: 1rem; letter-spacing: 2px; margin-bottom: 10px;">🏁 STRATEJİK SONUÇ VE NET DEĞER</h3>
                <div style="font-size: 0.9rem; line-height: 1.6;">
                    <p style="color: #00ff87; display: ${isPositive ? 'block' : 'none'};"><strong>[+ DEĞER] Doğru Yer Değiştirme (Maksimum Kazanç):</strong> İlahi rızaya ve dünya esbabına uygun hareket ediliyor. Bu eylemin neticesinde hedeflediğiniz <strong>"${uretilecekDeger}"</strong> değeri berekete dayalı bir fetih ile inşa edilecek.</p>
                    <p style="color: #ff0055; display: ${!isPositive ? 'block' : 'none'};"><strong>[- DEĞER] Yanlış Yer Değiştirme (Maksimum Kayıp):</strong> Boyut dengeleri oturmamış. Acelecilik ve niyet zaafiyeti sebebiyle <strong>"${uretilecekDeger}"</strong> değerine ulaşmak yerine zaman israfı yaşanma riski yüksektir.</p>
                    <p style="margin-top: 10px; font-size: 0.85rem; color: #728aa1;"><strong>Nihai Tavsiye:</strong> ${isPositive ? 'İstikameti bozma! Günlük görevleri ihlasla yerine getirerek fiili duaya devam et.' : 'Niyetini tazelemek için bir adım geri çekil, manevi boyut puanını ibadet ve kararlılıkla besle ve geçmiş keşkeleri terk et.'}</p>
                </div>

            </div>
        `;

        btn.innerHTML = 'MATRİSİ ÇALIŞTIR';
        btn.disabled = false;
    }, 1200);
}
