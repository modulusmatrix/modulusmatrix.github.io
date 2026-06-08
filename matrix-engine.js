<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modulus X - AI Profiler & Matrix</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f111a; color: #e2e8f0; margin: 0; padding: 15px; }
        .container { max-width: 580px; margin: 20px auto; background: #1a1c2a; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid #334155; }
        h1 { color: #00f2fe; text-align: center; font-size: 22px; margin-bottom: 5px; letter-spacing: 1px; }
        .subtitle { text-align: center; color: #94a3b8; font-size: 12px; margin-bottom: 25px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #38bdf8; font-size: 14px; font-weight: bold; }
        textarea { width: 100%; padding: 12px; background: #0f111a; border: 1px solid #334155; border-radius: 6px; color: white; box-sizing: border-box; font-family: inherit; font-size: 15px; min-height: 100px; resize: vertical; }
        button { width: 100%; padding: 14px; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); border: none; border-radius: 6px; color: #0f111a; font-weight: bold; cursor: pointer; margin-top: 5px; font-size: 15px; letter-spacing: 0.5px; }
        .result-box { margin-top: 25px; padding: 20px; border-radius: 8px; display: none; }
        .positive { background: rgba(16, 185, 129, 0.06); border: 1px solid #10b981; }
        .negative { background: rgba(239, 68, 68, 0.06); border: 1px solid #ef4444; }
        .warning { background: rgba(245, 158, 11, 0.06); border: 1px solid #f59e0b; }
        .profile-card { background: linear-gradient(145deg, #1e293b, #0f172a); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px dashed #38bdf8; }
        .profile-title { color: #38bdf8; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .profile-badge { display: inline-block; background: #3b82f6; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-bottom: 8px; }
        .chart-container { display: flex; justify-content: center; align-items: center; margin: 15px 0; }
        .progress-circle { position: relative; width: 110px; height: 110px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; }
        .matrix-report { background: rgba(15, 17, 26, 0.8); padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #334155; }
        .report-title { color: #00f2fe; font-size: 13px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 4px; }
        .report-item { font-size: 13px; margin-bottom: 10px; line-height: 1.5; color: #cbd5e1; }
        .exegesis-box { background: rgba(17, 24, 39, 0.9); padding: 15px; border-radius: 8px; margin-top: 15px; }
        .exegesis-title { font-size: 13px; font-weight: bold; margin-bottom: 8px; }
        .exegesis-text { font-size: 13px; line-height: 1.5; font-style: italic; color: #94a3b8; margin-bottom: 10px; }
        .exegesis-commentary { font-size: 13px; line-height: 1.5; color: #e2e8f0; border-top: 1px solid #374151; padding-top: 8px; }
        .tasks-container { background: rgba(15, 17, 26, 0.6); padding: 15px; border-radius: 8px; margin-top: 15px; }
        .task-item { font-size: 13px; margin-bottom: 8px; line-height: 1.4; list-style-type: circle; margin-left: 15px; }
        .source { font-size: 12px; color: #38bdf8; margin-top: 15px; display: block; font-weight: bold; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
<div class="container">
    <h1>MODULUS X MATRIX</h1>
    <div class="subtitle">AI PROFILER & DETAYLI KAYNAK ŞERH MOTORU</div>
    
    <div class="form-group">
        <label>Yaşadığınız Olayı, Sıkıntıyı veya Güncel Niyetinizi Tüm Detaylarıyla Anlatın:</label>
        <textarea id="userText" placeholder="İçinde bulunduğunuz durumu, hislerinizi veya gerçekleştirmek istediğiniz hedefi detaylıca buraya aktarın..."></textarea>
    </div>

    <button onclick="matrisiProfille()">OLAYI GÖZLEMLEYİN VE MATRİS OLUŞTURUN</button>
    <div id="result" class="result-box"></div>
</div>

<!-- TensorFlow ve Yapay Zeka Motoru Bağlantıları -->
<script src="https://jsdelivr.net"></script>
<script src="matrix-engine.js"></script>
</body>
</html>
