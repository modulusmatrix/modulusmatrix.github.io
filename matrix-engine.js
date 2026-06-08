// MODULUS X - TENSORFLOW.JS TABANLI MAKİNE ÖĞRENMESİ MOTORU

// 1. Sentetik Tarihsel Veri Seti Üretimi (Modelin Geçmiş Tecrübeleri Öğrenmesi İçin)
function tarihselVeriUret() {
    var veriler = [];
    // Geçmişteki 100 farklı doğru/yanlış kararı simüle ediyoruz
    for (var i = 0; i < 100; i++) {
        var S = 2020 + Math.floor(Math.random() * 80);
        var Z = 2020 + Math.floor(Math.random() * 40);
        var maddi = 1 + Math.random() * 9;
        var manevi = 1 + Math.random() * 9;
        var dis = 1 + Math.random() * 9;
        
        // Formülün tarihsel kural çıktısı
        var zaman = S - Z;
        var yerDegistirme = maddi + manevi + dis;
        var birlesme = (maddi + manevi) * dis;
        var netEnerji = zaman * (yerDegistirme + birlesme);
        
        veriler.push({
            inputs: [S, Z, maddi, manevi, dis],
            output: [netEnerji]
        });
    }
    return veriler;
}

// 2. Ana Profilleme ve Tahmin Fonksiyonu
async function matrisiProfille() {
    var userText = document.getElementById('userText').value.toLowerCase().trim();
    if (!userText) { alert("Lütfen gözlemlenecek bir olay veya durum yazın."); return; }

    // Durum Bildirimi
    var resultBox = document.getElementById('result');
    resultBox.style.display = "block";
    resultBox.innerHTML = "<div style='text-align:center; color:#00f2fe;'>🧠 Modulus X Yapay Zekası Tarihsel Verileri İnceliyor ve Eğitiliyor... Lütfen Bekleyin...</div>";

    // Kullanıcı Girişinden Parametreleri Ayrıştırma
    var S = 2030, Z = 2030, maddi = 5, manevi = 5, dis = 5;
    var xAlani = "İçsel Bilinç Alanı";
    var profilTipi = "Gözlemci / Dengeli Profil";
    var profilOzeti = "Sistem durağan ve dengeli bir matris çözümü üretiyor.";
    var olayKategorisi = "Genel Yaşam Algısı";

    var hüzünKelimeleri = ["yalnız", "yalniz", "çirkin", "cirkin", "zor", "üzgün", "uzgun", "yorgun", "bıktım", "korkuyorum", "acı", "aci", "depresyon"];
    var ilimKelimeleri = ["ilim", "öğren", "kod", "yazılım", "ders", "kitap", "okumak", "hedef", "proje", "gelişmek"];

    if (hüzünKelimeleri.some(function(k) { return userText.indexOf(k) !== -1; })) {
        olayKategorisi = "Manevi İmtihan ve Melankoli";
        profilTipi = "Duygusal Savaşçı";
        profilOzeti = "İçsel hesaplaşma ve anlam arayışı evresi saptandı.";
        manevi += 3; maddi -= 2; Z = 2035; xAlani = "Gönül ve Ruh Boyutu";
    } else if (ilimKelimeleri.some(function(k) { return userText.indexOf(k) !== -1; })) {
        olayKategorisi = "Zihinsel İvmelenme";
        profilTipi = "Vizyoner / İlim Yolcusu";
        profilOzeti = "Bilgi üretimi ve sistem iyileştirme odaklılık saptandı.";
        manevi += 4; dis += 2; S = 2100; xAlani = "Zihinsel ve İlmi Akademi";
    }

    // TENSORFLOW.JS MODELİNİ OLUŞTURMA VE EĞİTME (MAKİNE ÖĞRENMESİ KATMANI)
    // Basit bir Yapay Sinir Ağı (Neural Network) tasarlıyoruz
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 8, inputShape:, activation: 'relu'}));
    model.add(tf.layers.dense({units: 1})); // Çıkış katmanı (Net Değer Tahmini)

    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

    // Veriyi Hazırlama
    var geçmişTarih = tarihselVeriUret();
    const xs = tf.tensor2d(geçmişTarih.map(d => d.inputs));
    const ys = tf.tensor2d(geçmişTarih.map(d => d.output));

    // Modeli geçmiş tecrübelerle 20 dönem (epoch) eğitiyoruz
    await model.fit(xs, ys, {epochs: 20});

    // Yeni Senaryoyu Modele Sorup Tahmin Alıyoruz (Denetimli Öğrenme Tahmini)
    const yeniGirdi = tf.tensor2d([[S, Z, maddi, manevi, dis]]);
    const tahminSonucu = model.predict(yeniGirdi);
    const tahminiEnerji = (await tahminSonucu.data())[0];

    // Belleği temizleme
    xs.dispose(); ys.dispose(); yeniGirdi.dispose(); tahminSonucu.dispose();

    // Sonuç Kategorizasyonu
    var statusClass = tahminiEnerji >= 0 ? "positive" : "warning";
    var grafikRengi = statusClass === "positive" ? "#10b981" : "#f59e0b";
    var durumBasligi = tahminiEnerji >= 0 ? "[+] MAKSİMUM DEĞER KAZANCI" : "[!] İMTİHAN VE DEĞER DENGELEME";
    var eylemsellikYuzdesi = statusClass === "positive" ? 85 : 35;

    var kaynakText = "Tin Suresi 4. Ayet & İnşirah Suresi 5. Ayet";
    var metinText = "Biz insanı en güzel biçimde yarattık. Şüphesiz güçlükle beraber bir kolaylık vardır.";
    var serhYorumu = "<b>Yapay Zeka Makine Öğrenmesi Şerhi:</b> Model, geçmiş tarihsel örüntüleri inceleyerek mevcut durumunuz için <b>" + tahminiEnerji.toFixed(0) + "</b> net enerji puanı öngördü. Bu durum felsefi boyutta yaratılış şerefinize (Ahsen-i Takvim) odaklanarak eylemsizlik krizini aşmanız gerektiğini saptar.";

    if (statusClass === "positive") {
        kaynakText = "Asr Suresi";
        metinText = "Zamana andolsun ki insan hüsrandadır. Ancak iman edip salih ameller işleyenler müstesna.";
        serhYorumu = "<b>Yapay Zeka Makine Öğrenmesi Şerhi:</b> Model, geçmiş başarı kombinasyonlarından yola çıkarak bu ilmi niyetin zaman çarpanını geleceğe taşıyacağını saptadı (Öngörülen Puan: " + tahminiEnerji.toFixed(0) + ").";
    }

    // Arayüze Yazdırma
    resultBox.className = "result-box " + statusClass;
    if (statusClass === "warning") { resultBox.style.borderColor = "#f59e0b"; } else { resultBox.style.borderColor = ""; }

    resultBox.innerHTML = 
        '<strong style="font-size:15px; display:block; text-align:center; margin-bottom:15px;">' + durumBasligi + '</strong>' +
        '<div class="profile-card">' +
            '<div class="profile-title">👤 ML Profiler / Durum Gözlemi</div>' +
            '<div class="profile-badge">' + profilTipi + '</div>' +
            '<div class="report-item" style="margin-bottom:0;"><strong>Olay Analiz Grubu:</strong> ' + olayKategorisi + '</div>' +
            '<div class="report-item" style="margin-bottom:0; margin-top:5px;"><strong>Gözlem Özeti:</strong> ' + profilOzeti + '</div>' +
        '</div>' +
        '<div class="chart-container">' +
            '<div class="progress-circle" style="background: conic-gradient(' + grafikRengi + ' ' + (eylemsellikYuzdesi * 3.6) + 'deg, #334155 0deg); color: #fff;">' +
                '<div style="position: absolute; width: 85px; height: 85px; background: #1a1c2a; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;">' +
                    '<span style="font-size:10px; color:#94a3b8;">ML Gücü</span>' +
                    '<span>%' + eylemsellikYuzdesi + '</span>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="matrix-report">' +
            '<div class="report-title">📋 MAKİNE ÖĞRENMESİ ÖNGÖRÜ RAPORU</div>' +
            '<div class="report-item">🔮 <strong>Model Tahmin Puanı (E):</strong> <b>' + tahminiEnerji.toFixed(1) + '</b></div>' +
            '<div class="report-item">🧬 <strong>Algılanan Boyut Yapısı:</strong> Maddi: ' + maddi + ' | Manevi: ' + manevi + ' | Dış: ' + dis + ' | Alan: "' + xAlani + '"</div>' +
        '</div>' +
        '<div class="exegesis-box" style="border-left: 4px solid ' + grafikRengi + '; padding-left:10px;">' +
            '<div class="exegesis-title" style="color:' + grafikRengi + ';">📖 Kutsal Metin ve Felsefi Şerh</div>' +
            '<div class="exegesis-text">"' + metinText + '" <br><b style="color:#a78bfa;">[' + kaynakText + ']</b></div>' +
            '<div class="exegesis-commentary">' + serhYorumu + '</div>' +
        '</div>';
}
