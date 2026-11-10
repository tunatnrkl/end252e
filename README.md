# END252E Olasılık Çalışma Masası

İTÜ END252E (Olasılık) için çalışma platformu: 11 konunun animasyonlu videoları, Türkçe okunuşlu formüller, konuya odaklı yapay zeka asistanı ve İngilizce test bölümü.

- `index.html`: yayınlanan tek dosyalık sayfa (claude.ai Artifact olarak çalışır; asistan ve ses claude.ai içinde aktiftir).
- `src/`: kaynak dosyalar (başlık/CSS, uygulama, video motoru, test, sözlük, konu başına video içeriği).
- `build.sh`: `src/` dosyalarını `index.html` olarak birleştirir (`./build.sh` çıktıyı `end252e.html` yazar).
