function tarihselVeriUret() {
    var veriler = [];
    for (var i = 0; i < 50; i++) {
        var S = 2020 + Math.floor(Math.random() * 80);
        var Z = 2020 + Math.floor(Math.random() * 40);
        var maddi = 1 + Math.random() * 9;
        var manevi = 1 + Math.random() * 9;
        var dis = 1 + Math.random() * 9;
        var zaman = S - Z;
        veriler.push({
            inputs: [S, Z, maddi, manevi, dis],
            output: [zaman * (maddi + manevi + dis)]
        });
    }
    return veriler;
}

async function matrisiProfille() {
    var userText = document.getElementById('userText').value.toLowerCase().trim();
    if (!userText) { alert("Lütfen gözlemlenecek bir olay veya durum yazın."); return; }

    var resultBox = document.getElementById('result');
    resultBox.style.display = "block";
    resultBox.className = "result-box warning";
    resultBox.innerHTML = "<div style='text-align:center; color:#00f2fe; font-weight:bold;'>🧠 Yapay Zeka Sinir Ağları Eğitiliyor ve Olay Gözlemleniyor... Lütfen Bekleyin...</div>";

    var S = 2030, Z = 2030, maddi = 5, manevi = 5, dis = 5;
    var xAlani = "İçsel Bilinç Alanı";
    var profilTipi = "Gözlemci / Dengeli Profil";
    var profilOzeti = "Sistem durağan ve dengeli bir matris çözümü üretiyor.";
    var olayKategorisi = "Genel Yaşam Algısı";
    var statusClass = "positive";

    var hüzünKelimeleri = ["yalnız", "yalniz", "çirkin", "cirkin", "zor", "üzgün", "uzgun", "yorgun", "bıktım", "korkuyorum", "acı", "aci", "depresyon"];
    var ilimKelimeleri = ["ilim", "öğren", "kod", "yazılım", "ders", "kitap", "okumak", "hedef", "proje", "gelişmek"];

    if (hüzünKelimeleri.some(function(k) { return userText.indexOf(k) !== -1; })) {
        olayKategorisi = "Manevi İmtihan ve Melankoli";
        profilTipi = "Duygusal Savaşçı";
        profilOzeti = "İçsel hesaplaşma ve anlam arayışı evresi saptandı.";
        manevi += 3; maddi -= 2; Z = 2035; xAlani = "Gönül ve Ruh Boyutu";
        statusClass = "warning";
    } else if (ilimKelimeleri.some(function(k) { return userText.indexOf(k) !== -1; })) {
        olayKategorisi = "Zihinsel İvmelenme";
        profilTipi = "Vizyoner / İlim Yolcusu";
        profilOzeti = "Bilgi üretimi ve sistem iyileştirme odaklılık saptandı.";
        manevi += 4; dis += 2; S = 2100; xAlani = "Zihinsel ve İlmi Akademi";
        statusClass = "positive";
    }

    // TENSORFLOW MODEL KATMANI (Dizilim Hatası Düzeltildi)
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 8, inputShape:, activation: 'relu'}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

    var gecmis = tarihselVeriUret();
    const xs = tf.tensor2d(gecmis.map(d => d.inputs));
    const ys = tf.tensor2d(gecmis.map(d => d.output));

    await model.fit(xs, ys, {epochs: 10});

    const yeniGirdi = tf.tensor2d([[S, Z, maddi, manevi, dis]]);
    const tahminSonucu = model.predict(yeniGirdi);
    const tahminiEnerji = (await tahminSonucu.data());

    xs.dispose(); ys.dispose(); yeniGirdi.dispose(); tahminSonucu.dispose();

    var yerDegistirme = maddi + manevi + dis;
    var birlesme = (maddi + manevi) * dis;
    var eylemsellikYuzdesi = statusClass === "positive" ? 85 : 35;

    var kaynakText = "Tin Suresi 4. Ayet & İnşirah Suresi 5. Ayet";
    var metinText = "Biz insanı en güzel biçimde yarattık. Şüphesiz güçlükle beraber bir kolaylık vardır.";
    var serhYorumu = "<b>Yapay Zeka Makine Öğrenmesi Şerhi:</b> Model, geçmiş tarihsel verileri analiz ederek bu durum için " + tahminiEnerji.toFixed(0) + " net enerji puanı tahmin etti. Tin Suresi'ndeki yaratılış şerefinize odaklanarak eylemsizlik krizini aşmanız gerektiğini saptar.";
    var g1 = "<b>Fiziksel Eylem:</b> Bulunduğunuz konumu değiştirin. Açık havada yürüyerek dış boyut (D) katsayısını canlandırın.";
    var g2 = "<b>Zihinsel Eylem:</b> Dünyevi kusursuzluk algılarını reddederek yaratılış değerinize odaklanıp şükredin.";
    var g3 = "<b>Sosyal Eylem:</b> Yalnızlık bariyerini kırmak için güvendiğiniz bir kişiyle yapıcı bir diyalog başlatın.";

    if (statusClass === "positive") {
        kaynakText = "Asr Suresi";
        metinText = "Zamana andolsun ki insan hüsrandadır. Ancak iman edip salih ameller işleyenler müstesna.";
        serhYorumu = "<b>Yapay Zeka Makine Öğrenmesi Şerhi:</b> Model, ilmi niyetinizin zaman çarpanını geleceğe taşıyacağını öngördü (Öngörülen Puan: " + tahminiEnerji.toFixed(0) + ").";
        g1 = "<b>Eylemsel Plan:</b> Geliştirmek istediğiniz proje veya ilim dalı için bugün haftalık çalışma takvimi hazırlayın.";
        g2 = "<b>Birleşme Adımı:</b> Öğrendiğiniz bilgileri çevrenizdeki bir kişiye aktararak sistem faydası yaratın.";
        g3 = "<b>Boyut Dengesi:</b> Zihinsel yoğunluğunuz artarken maddi boyut ihtiyaçlarınızı ihmal etmeyin.";
    }

    resultBox.className = "result-box " + statusClass;
    var grafikRengi = statusClass === "positive" ? "#10b981" : "#f59e0b";
    var durumBasligi = statusClass === "positive" ? "[+] MAKSİMUM DEĞER KAZANCI" : "[!] İMTİHAN VE DEĞER DENGELEME";

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
            '<div class="report-item">🔄 <strong>Yer Değiştirme Fonksiyonu:</strong> Değer: <b>' + yerDegistirme + '</b>.</div>' +
            '<div class="report-item">🤝 <strong>Birleşme Fonksiyonu:</strong> Değer: <b>' + birlesme + '</b>.</div>' +
        '</div>' +
        '<div class="exegesis-box" style="border-left: 4px solid ' + grafikRengi + '; padding-left:10px; background:rgba(0,0,0,0.2); padding:10px; border-radius:4px; margin-top:15px;">' +
            '<div class="exegesis-title" style="color:' + grafikRengi + '; font-weight:bold; margin-bottom:5px;">📖 Kutsal Metin ve Felsefi Şerh</div>' +
            '<div class="exegesis-text" style="font-style:italic; color:#94a3b8; margin-bottom:5px;">"' + metinText + '" <br><b style="color:#a78bfa;">[' + kaynakText + ']</b></div>' +
            '<div class="exegesis-commentary" style="font-size:13px; margin-top:5px; line-height:1.4;">' + serhYorumu + '</div>' +
        '</div>' +
        '<div class="tasks-container" style="border-left: 4px solid ' + grafikRengi + '; padding-left:10px; margin-top:15px;">' +
            '<div class="tasks-title" style="color:#a78bfa; font-weight:bold; margin-bottom:8px;">🎯 OLAYA ÖZEL UYGULANABİLİR GÖREVLERİNİZ</div>' +
            '<ul style="padding:0; margin:0; list-style-type:none; font-size:13px; line-height:1.4;">' +
                '<li style="margin-bottom:6px;">🔹 ' + g1 + '</li>' +
                '<li style="margin-bottom:6px;">🔹 ' + g2 + '</li>' +
                '<li>🔹 ' + g3 + '</li>' +
            '</ul>' +
        '</div>';
}
