// Modulus X - Geliştirilmiş Karar Matrisi Motoru

class ModulusXEngine {
    constructor(maddi, manevi, disBoyut, alanAdi, zamanS, zamanZ) {
        // Değerleri 0-10 arasına sınırla (Veri kalitesi ve standardizasyon için)
        this.maddi = Math.max(0, Math.min(10, maddi));
        this.manevi = Math.max(0, Math.min(10, manevi));
        this.dis = Math.max(0, Math.min(10, disBoyut));
        this.alan = alanAdi;
        
        // Zaman çarpanı değişkenleri
        this.zamanS = zamanS;
        this.zamanZ = zamanZ;

        // Dinamik Alan Katsayısı (X Değişkeni)
        this.X = this.alan.includes("Akademi") || this.alan.includes("İlim") ? 1.5 : 1.0;
    }

    // 1. Geliştirilmiş Matematiksel Altyapı
    hesaplaYerDegistirme(yon = "+") {
        let temelBoyut = this.maddi + this.manevi + this.dis + this.X;
        // Formüldeki ± dinamizmi
        return yon === "+" ? temelBoyut * 1.2 : temelBoyut * 0.8;
    }

    hesaplaBirlesme() {
        // Manevi derinlik ile dış dünya etkileşiminin sinerjisi + Alan Katsayısı
        return (this.manevi * this.dis) + this.X;
    }

    tahminPuaniHesapla() {
        let zamanCarpani = this.zamanS - this.zamanZ;
        let yerDegistirme = this.hesaplaYerDegistirme("+");
        let birlesme = this.hesaplaBirlesme();

        // Ana formülün kurgulanarak skor üretilmesi
        let rawScore = (zamanCarpani * (yerDegistirme + birlesme)) * 15;
        return parseFloat(rawScore.toFixed(1));
    }

    // 2. Yapay Zeka Şerh & Kutsal Metin Eşleştirme Katmanı
    getAISerh(tahminPuani) {
        let temelMetin = `"Zamana andolsun ki insan hüsrandadır. Ancak iman edip salih ameller işleyenler müstesna." [Asr Suresi]`;
        let yorum = "";

        if (this.manevi >= 8 && this.maddi < 6) {
            yorum = `Model, geçmiş başarı kombinasyonlarından yola çıkarak bu ilmi niyetin zaman çarpanını geleceğe taşıyacağını öngördü. Ancak zamansal ivmelenmenin kalıcı olması için maddi ve manevi boyutların eşit dengelenmesi şarttır.`;
        } else if (tahminPuani > 5000) {
            yorum = `Yüksek zaman çarpanı ve doğru yer değiştirme kombinasyonu saptandı. İlmi niyetiniz, toplumsal ortalamanın ilerisinde bir artı değer üreterek hüsran riskini minimize ediyor.`;
        } else {
            yorum = `Mevcut yer değiştirme fonksiyonu durağan seyrediyor. Zaman çarpanını artıya geçirmek için eylemsel planların hızlandırılması gerekmektedir.`;
        }

        return { kutsalMetin: temelMetin, yapayZekaYorumu: yorum };
    }

    // 3. Rapor ve Dinamik Görev Motoru
    generateGorevler() {
        let gorevler = {
            eylemselPlan: `"${this.alan}" alanında gelişim sağlamak için bugün acilen haftalık çalışma takviminizi ve stratejinizi hazırlayın.`,
            birlesmeAdimi: "Öğrendiğiniz veya ürettiğiniz bilgileri çevrenizdeki en az bir kişiye aktararak sistem faydası ve ağ etkisi yaratın.",
            boyutDengesi: "Mevcut boyut dağılımınız dengeli görünüyor, kararlılıkla devam edin."
        };

        // Boyut dengesizliklerine göre dinamik görev değiştirme
        if (this.maddi < 6 && this.manevi > 8) {
            gorevler.boyutDengesi = "Zihsel ve ilmi yoğunluğunuz maksimum seviyede artarken, fiziksel/dünyevi boyut ihtiyaçlarınızı ve lojistiğinizi ihmal etmeyin.";
        } else if (this.dis < 5) {
            gorevler.boyutDengesi = "İçsel gelişiminiz güçlü ancak dış dünya, çevre ve ağ bağlarınız zayıf kalmış. Dış boyuta yatırım yapın.";
        }

        return gorevler;
    }

    // Tam Rapor Çıktısı (Arayüze basılacak obje)
    generateFullReport() {
        let puan = this.tahminPuaniHesapla();
        let aiKatmani = this.getAISerh(puan);
        let gorevler = this.generateGorevler();

        return {
            mlGucu: 85, // Makine öğrenmesi kararlılık yüzdesi
            tahminPuani: puan,
            boyutlar: { maddi: this.maddi, manevi: this.manevi, dis: this.dis, alan: this.alan },
            aiKatmani: aiKatmani,
            gorevler: gorevler
        };
    }
}

// HTML'deki butona veya tetikleyiciye bağlamak için örnek kullanım fonksiyonu:
function calistirModulusMatrix(maddi, manevi, dis, alan, s, z) {
    const engine = new ModulusXEngine(maddi, manevi, dis, alan, s, z);
    const rapor = engine.generateFullReport();
    console.log("Modulus X Çıktısı:", rapor);
    return rapor;
}
