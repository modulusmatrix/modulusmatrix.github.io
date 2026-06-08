// Modulus X - Mantık ve Karar Mekanizması Algoritması

class ModulusXEngine {
    constructor(maddi, manevi, disBoyut, alanAdi, zamanS, zamanZ) {
        this.maddi = Math.max(0, Math.min(10, maddi));
        this.manevi = Math.max(0, Math.min(10, manevi));
        this.dis = Math.max(0, Math.min(10, disBoyut));
        this.alan = alanAdi;
        this.zamanS = zamanS;
        this.zamanZ = zamanZ;
        this.X = this.alan.includes("Akademi") || this.alan.includes("İlim") ? 1.5 : 1.0;
    }

    hesaplaYerDegistirme(yon = "+") {
        let temelBoyut = this.maddi + this.manevi + this.dis + this.X;
        return yon === "+" ? temelBoyut * 1.2 : temelBoyut * 0.8;
    }

    hesaplaBirlesme() {
        return (this.manevi * this.dis) + this.X;
    }

    tahminPuaniHesapla() {
        let zamanCarpani = this.zamanS - this.zamanZ;
        let yerDegistirme = this.hesaplaYerDegistirme("+");
        let birlesme = this.hesaplaBirlesme();
        let rawScore = (zamanCarpani * (yerDegistirme + birlesme)) * 15;
        return parseFloat(rawScore.toFixed(1));
    }

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

    generateGorevler() {
        let gorevler = {
            eylemselPlan: `"${this.alan}" alanında gelişim sağlamak için bugün acilen haftalık çalışma takviminizi ve stratejinizi hazırlayın.`,
            birlesmeAdimi: "Öğrendiğiniz veya ürettiğiniz bilgileri çevrenizdeki en az bir kişiye aktararak sistem faydası ve ağ etkisi yaratın.",
            boyutDengesi: "Mevcut boyut dağılımınız dengeli görünüyor, kararlılıkla devam edin."
        };

        if (this.maddi < 6 && this.manevi > 8) {
            gorevler.boyutDengesi = "Zihinsel ve ilmi yoğunluğunuz maksimum seviyede artarken, fiziksel/dünyevi boyut ihtiyaçlarınızı ve lojistiğinizi ihmal etmeyin.";
        } else if (this.dis < 5) {
            gorevler.boyutDengesi = "İçsel gelişiminiz güçlü ancak dış dünya, çevre ve ağ bağlarınız zayıf kalmış. Dış boyuta yatırım yapın.";
        }

        return gorevler;
    }

    generateFullReport() {
        let puan = this.tahminPuaniHesapla();
        let aiKatmani = this.getAISerh(puan);
        let gorevler = this.generateGorevler();

        return {
            mlGucu: 85,
            tahminPuani: puan,
            boyutlar: { maddi: this.maddi, manevi: this.manevi, dis: this.dis, alan: this.alan },
            aiKatmani: aiKatmani,
            gorevler: gorevler
        };
    }
}

// Buton tıklama olayını dinleyen ve DOM elementlerini güncelleyen ana fonksiyon
document.getElementById('btnAnaliz').addEventListener('click', function() {
    try {
        const alan = document.getElementById('alan').value;
        const maddi = parseFloat(document.getElementById('maddi').value) || 0;
        const manevi = parseFloat(document.getElementById('manevi').value) || 0;
        const dis = parseFloat(document.getElementById('dis').value) || 0;
        const zamanS = parseFloat(document.getElementById('zamanS').value) || 0;
        const zamanZ = parseFloat(document.getElementById('zamanZ').value) || 0;

        const engine = new ModulusXEngine(maddi, manevi, dis, alan, zamanS, zamanZ);
        const rapor = engine.generateFullReport();

        document.getElementById('resPuan').innerText = rapor.tahminPuani;
        document.getElementById('resML').innerText = "%" + rapor.mlGucu;
        document.getElementById('resAyet').innerText = rapor.aiKatmani.kutsalMetin;
        document.getElementById('resSerh').innerText = rapor.aiKatmani.yapayZekaYorumu;
        
        document.getElementById('resEylem').innerText = rapor.gorevler.eylemselPlan;
        document.getElementById('resBirlesme').innerText = rapor.gorevler.birlesmeAdimi;
        document.getElementById('resDenge').innerText = rapor.gorevler.boyutDengesi;

        document.getElementById('reportCard').style.display = 'block';
    } catch (error) {
        console.error("Modulus X Error:", error);
        alert("Matris hesaplanırken bir hata oluştu. Detaylar konsolda.");
    }
});
