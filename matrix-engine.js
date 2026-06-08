// MODULUS X - Matrix Hesaplama Motoru
document.addEventListener('DOMContentLoaded', () => {
    const btnCalistir = document.querySelector('.btn-calistir');
    
    if (btnCalistir) {
        btnCalistir.addEventListener('click', matrisiHesapla);
    }
});

function matrisiHesapla() {
    // Arayüzdeki girdileri yakala
    const alan = document.getElementById('alanSecimi').value;
    const maddi = parseFloat(document.getElementById('maddiBoyut').value) || 0;
    const manevi = parseFloat(document.getElementById('maneviBoyut').value) || 0;
    const disBoyut = parseFloat(document.getElementById('disBoyut').value) || 0;
    const zamanS = parseInt(document.getElementById('zamanS').value) || 2026;
    const zamanZ = parseInt(document.getElementById('zamanZ').value) || 2026;

    // Sonuç panelini bul veya yoksa oluştur
    let sonucPaneli = document.getElementById('matrix-result-panel');
    if (!sonucPaneli) {
        sonucPaneli = document.createElement('div');
        sonucPaneli.id = 'matrix-result-panel';
        sonucPaneli.className = 'matrix-card';
        sonucPaneli.style.marginTop = '20px';
        document.querySelector('.matrix-container').appendChild(sonucPaneli);
    }

    // Buton yükleniyor efekti
    const btn = document.querySelector('.btn-calistir');
    const orijinalMetin = btn.innerHTML;
    btn.innerHTML = 'MATRİS ANALİZ EDİLİYOR...';
    btn.disabled = true;

    setTimeout(() => {
        // Yapay Zeka Karar Matrisi Algoritması (Ağırlıklı Katsayı Simülasyonu)
        let alanKatsayisi = 1.0;
        let alanAdi = "";

        switch(alan) {
            case "akademi":
                alanKatsayisi = 1.3;
                alanAdi = "Zihinsel ve İlmi Akademi";
                break;
            case "strateji":
                alanKatsayisi = 1.1;
                alanAdi = "Stratejik Planlama";
                break;
            case "teknoloji":
                alanKatsayisi = 1.5;
                alanAdi = "Teknolojik Entegrasyon";
                break;
            default:
                alanAdi = "Genel Analiz";
        }

        // Zaman Delta Faktörü (Zaman kırılma analizi)
        const zamanDelta = Math.abs(zamanS - zamanZ);
        const zamanFaktoru = zamanDelta === 0 ? 1.0 : (1 / (1 + (zamanDelta * 0.02)));

        // Skolastik Yapay Zeka Matris Puanı Hesaplama Formula
        // Skor = ((Maddi * 0.3) + (Manevi * 0.5) + (Dış * 0.2)) * Katsayı * ZamanFaktörü
        const hamSkor = ((maddi * 0.3) + (manevi * 0.5) + (disBoyut * 0.2));
        let nihaiSkor = (hamSkor * alanKatsayisi * zamanFaktoru * 10).toFixed(2);
        
        if (nihaiSkor > 100) nihaiSkor = 100;

        // Sonuç Durum Analizi
        let durumMetni = "";
        let durumRengi = "#00f2fe";
        if (nihaiSkor >= 75) {
            durumMetni = "Yüksek Uyum ve Kararlılık Sapması Tespit Edildi. Karar matrisi sürdürülebilir başarı öngörüyor.";
            durumRengi = "#00ff87";
        } else if (nihaiSkor >= 50) {
            durumMetni = "Dengeli Matriks Dağılımı. Maddi ve manevi boyutlar optimize edilirse süreç ivme kazanacaktır.";
            durumRengi = "#00f2fe";
        } else {
            durumMetni = "Kritik Kararsızlık Seviyesi. Boyutlar arası optimizasyon hatası; iç ve dış faktörler gözden geçirilmeli.";
            durumRengi = "#ff0055";
        }

        // Sonucu Ekrana Yazdır
        sonucPaneli.innerHTML = `
            <div style="border-left: 3px solid ${durumRengi}; padding-left: 15px;">
                <h3 style="color: ${durumRengi}; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">📊 Matris Çıktı Raporu</h3>
                <p style="font-size: 0.85rem; color: #728aa1; margin-bottom: 5px;"><strong>Seçili Alan:</strong> ${alanAdi}</p>
                <p style="font-size: 1.5rem; font-weight: 800; color: #fff; margin: 10px 0;">Yapay Zeka Skor: <span style="color: ${durumRengi}">${nihaiSkor} / 100</span></p>
                <p style="font-size: 0.9rem; color: #a3b8cc; line-height: 1.5;">${durumMetni}</p>
                <div style="margin-top: 10px; font-size: 0.75rem; color: #52667a;">Zaman Kırılma Sapması: Δ${zamanDelta} Yıl</div>
            </div>
        `;

        // Butonu eski haline getir
        btn.innerHTML = orijinalMetin;
        btn.disabled = false;
    }, 1200); // 1.2 saniyelik yapay zeka analiz efekti
}
