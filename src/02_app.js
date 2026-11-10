/* f: [formül, kısa not, Türkçe okunuşu]   quiz: d = kolay | orta | zor */
const T = [
{ id:"s1", en:"Sample space & events", title:"Örnek uzayı ve olaylar",
  body:`<p>Bir deney yaptığını düşün: zar atmak, para atmak, üretim hattından bir parça çekmek. <b>Örnek uzayı (S)</b>, bu deneyin <b>olabilecek bütün sonuçlarının</b> listesidir.</p>
  <p><b>Olay (event)</b>, bu sonuçlardan bir kısmını seçmektir. Örneğin zar için S = {1,2,3,4,5,6}; “çift gelmesi” olayı A = {2,4,6}.</p>
  <ul><li><b>Birleşim A∪B</b>: A <i>veya</i> B (en az biri) olur.</li><li><b>Kesişim A∩B</b>: A <i>ve</i> B birlikte olur.</li><li><b>Tümleyen Aᶜ</b>: A olmaz.</li><li><b>Ayrık (mutually exclusive)</b>: A∩B = ∅, yani ikisi aynı anda olamaz.</li></ul>`,
  f:[["A ∪ B,  A ∩ B,  Aᶜ","veya, ve, değil","A veya B (en az biri olur); A ve B (ikisi birden olur); A olmaz (A'nın dışı)."],
     ["(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ","De Morgan 1","“A veya B” olmaması, A'nın olmaması VE B'nin olmaması demektir."],
     ["(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ","De Morgan 2","“A ve B birlikte” olmaması, A'nın olmaması VEYA B'nin olmaması demektir."]],
  ex:{q:"İki kez para atılıyor. Örnek uzayını yaz. A = “en az bir Yazı” olayı nedir?",a:"S = {YY, YT, TY, TT} (Y: yazı, T: tura). A = {YY, YT, TY}. Aᶜ = {TT}, yani “hiç yazı gelmemesi”."},
  quiz:[{d:"kolay",q:"Zar atılıyor. A = çift sayı, B = {1,2}. A ∩ B nedir?",o:["{2}","{1,2,4,6}","{4,6}","∅"],c:0,w:"Hem çift hem {1,2} içinde olan tek sayı 2."},
        {d:"kolay",q:"İki kez para atılıyor. Örnek uzayında kaç sonuç vardır?",o:["2","3","4","8"],c:2,w:"Her atış için 2 seçenek: 2·2 = 4 → {YY, YT, TY, TT}."},
        {d:"orta",q:"A ve B ayrık (mutually exclusive) olaylar ise hangisi kesinlikle doğrudur?",o:["A ∩ B = ∅","A ∪ B = S","A = Bᶜ","P(A) = P(B)"],c:0,w:"Ayrık olayların ortak sonucu yoktur; kesişim boş kümedir. Diğerleri genel olarak doğru değildir."},
        {d:"zor",q:"İki zar atılıyor. A = “toplam 9”, B = “en az bir zar 5”. A ∩ B kaç elemanlıdır?",o:["1","2","3","4"],c:1,w:"A = {(3,6),(4,5),(5,4),(6,3)}. İçinde 5 olanlar: (4,5) ve (5,4) → 2 eleman. Zarlar ayırt edilebilir, (4,5) ≠ (5,4)."}]},
{ id:"s2", en:"Axioms of probability", title:"Olasılık aksiyomları",
  body:`<p>Olasılık, bir olaya 0 ile 1 arasında bir sayı vermektir. Bunun üç temel kuralı (aksiyom) vardır:</p>
  <ul><li>Her olay için P(A) ≥ 0.</li><li>P(S) = 1 (bir şey mutlaka olur).</li><li>Ayrık olaylarda olasılıklar toplanır: P(A∪B) = P(A) + P(B).</li></ul>
  <p>Bütün diğer kurallar bunlardan çıkar. En çok kullanacağın ikisi: tümleyen kuralı ve toplama kuralı. Sonuçlar <b>eşit olasılıklı</b> ise olasılık sadece “istenen / toplam” sayımıdır.</p>`,
  f:[["P(Aᶜ) = 1 − P(A)","tümleyen kuralı","A'nın olmama olasılığı = 1 eksi A'nın olma olasılığı."],
     ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B)","toplama kuralı","A veya B'nin olasılığı = A'nın olasılığı + B'nin olasılığı − ikisinin birlikte olma olasılığı (ortak kısım iki kez sayılmasın diye çıkarılır)."],
     ["P(A) = |A| / |S|","eşit olasılıklı sonuçlar","Olasılık = istenen sonuç sayısı bölü toplam sonuç sayısı. Sadece bütün sonuçlar eşit olasılıklıysa geçerli."]],
  ex:{q:"P(A)=0.5, P(B)=0.4, P(A∩B)=0.2. P(A∪B) ve P(ikisi de olmaz) nedir?",a:"P(A∪B) = 0.5 + 0.4 − 0.2 = 0.7. İkisi de olmaz = (A∪B)ᶜ, yani 1 − 0.7 = 0.3."},
  quiz:[{d:"kolay",q:"P(A) = 0.3 ise P(Aᶜ) kaçtır?",o:["0.3","0.7","1.3","0"],c:1,w:"Tümleyen kuralı: 1 − 0.3 = 0.7."},
        {d:"kolay",q:"A ve B ayrık, P(A)=0.2, P(B)=0.5. P(A∪B)?",o:["0.1","0.6","0.7","0.5"],c:2,w:"Ayrıksa kesişim 0: 0.2 + 0.5 = 0.7."},
        {d:"orta",q:"P(A)=0.6, P(B)=0.5, P(A∪B)=0.8. P(A∩B) kaçtır?",o:["0.1","0.3","0.2","0.4"],c:1,w:"Toplama kuralını ters çevir: P(A∩B) = 0.6 + 0.5 − 0.8 = 0.3."},
        {d:"zor",q:"P(A)=0.5, P(B)=0.4, P(A∩B)=0.15. “Tam olarak biri” gerçekleşme olasılığı?",o:["0.75","0.6","0.45","0.9"],c:1,w:"Tam olarak biri = P(A) + P(B) − 2·P(A∩B) = 0.5 + 0.4 − 0.30 = 0.6. (Birleşim 0.75'ten kesişim 0.15 çıkarılır.)"}]},
{ id:"s3", en:"Counting: permutations & combinations", title:"Sayma yöntemleri",
  body:`<p>Eşit olasılıklı durumlarda “kaç farklı yol var?” sorusunu cevaplamak gerekir.</p>
  <ul><li><b>Çarpma kuralı</b>: 1. adımda a, 2. adımda b seçenek varsa toplam a·b yol.</li><li><b>Permütasyon</b>: <i>sıra önemli</i> (ilk, ikinci, üçüncü…).</li><li><b>Kombinasyon</b>: <i>sıra önemsiz</i> (bir grup, komite, el).</li></ul>
  <p>Kendine sor: “Ali-Ayşe ile Ayşe-Ali farklı mı?” Farklıysa permütasyon, aynıysa kombinasyon.</p>`,
  f:[["n! = n·(n−1)·…·1","faktöriyel","n faktöriyel: n nesneyi sıraya dizmenin yol sayısı (n'den 1'e kadar çarp). 0! = 1."],
     ["P(n,k) = n! / (n−k)!","permütasyon","n nesneden k tanesini SIRALI seçmenin yol sayısı (1., 2., … diye sıra var)."],
     ["C(n,k) = n! / (k!·(n−k)!)","kombinasyon","n nesneden k tanesini SIRASIZ seçmenin yol sayısı (“n'in k'lısı”); permütasyonu k! ile böl."]],
  ex:{q:"10 parçanın 3’ü kusurlu. Rastgele 2 parça seçiliyor. İkisinin de kusurlu olma olasılığı?",a:"Toplam seçim: C(10,2) = 45. İkisi kusurlu: C(3,2) = 3. Olasılık = 3/45 = <b>1/15 ≈ 0.067</b>."},
  quiz:[{d:"kolay",q:"4 farklı kitap rafa kaç farklı şekilde dizilir?",o:["4","16","24","12"],c:2,w:"4! = 24."},
        {d:"kolay",q:"10 kişiden 3 kişilik komite kaç şekilde seçilir?",o:["720","120","30","1000"],c:1,w:"Sıra önemsiz: C(10,3) = 120."},
        {d:"orta",q:"6 kişi arasından bir başkan ve bir başkan yardımcısı kaç farklı şekilde seçilir?",o:["15","30","36","720"],c:1,w:"Görevler farklı → sıra önemli: P(6,2) = 6·5 = 30."},
        {d:"zor",q:"12 parçanın 4'ü kusurlu. Geri koymadan 3 parça seçiliyor. Tam 1 kusurlu olma olasılığı?",o:["0.509","0.333","0.255","0.127"],c:0,w:"C(4,1)·C(8,2) / C(12,3) = 4·28/220 = 112/220 ≈ 0.509."}]},
{ id:"s4", en:"Conditional probability", title:"Koşullu olasılık",
  body:`<p><b>P(A|B)</b>: “B’nin olduğunu biliyorken A’nın olasılığı”. Yeni bilgi gelince örnek uzayı küçülür; artık sadece B’nin içine bakarız.</p>
  <p>Örnek: Zar atıldı ve “çift geldi” dendi. Artık sadece {2,4,6} mümkün. 6 gelme olasılığı 1/6 değil, <b>1/3</b>.</p>`,
  f:[["P(A | B) = P(A ∩ B) / P(B)","P(B) > 0","B'nin olduğu bilinirken A'nın olasılığı = ikisinin birlikte olma olasılığı bölü B'nin olasılığı (dünya B'ye küçüldü)."],
     ["P(A ∩ B) = P(A | B) · P(B)","çarpma kuralı","A ve B'nin birlikte olma olasılığı = önce B'nin olasılığı, çarpı B olmuşken A'nın olasılığı. Ard arda çekilişlerde kullanılır."]],
  ex:{q:"Bir kutuda 5 kırmızı, 3 mavi top var. Geri koymadan 2 top çekiliyor. İkisinin de kırmızı olma olasılığı?",a:"P(1. kırmızı) = 5/8. 1. kırmızıysa kalan 4 kırmızı, 7 top: P(2. kırmızı | 1. kırmızı) = 4/7. Çarpma kuralı: 5/8 · 4/7 = <b>20/56 ≈ 0.357</b>."},
  quiz:[{d:"kolay",q:"P(A∩B) = 0.12, P(B) = 0.4. P(A|B)?",o:["0.048","0.3","0.52","0.12"],c:1,w:"0.12 / 0.4 = 0.3."},
        {d:"kolay",q:"Zar atıldı ve “çift geldi” dendi. 6 gelmiş olma olasılığı?",o:["1/6","1/3","1/2","2/3"],c:1,w:"İndirgenmiş örnek uzayı {2,4,6}; üçte biri 6."},
        {d:"orta",q:"5 kırmızı 3 mavi top; geri koymadan 2 top. İkisinin de mavi olma olasılığı?",o:["3/28","9/64","3/8","1/4"],c:0,w:"Çarpma kuralı: (3/8)·(2/7) = 6/56 = 3/28."},
        {d:"zor",q:"M1: 120 parça (6 kusurlu), M2: 80 parça (10 kusurlu). Rastgele parça SAĞLAM çıktı. M1'den gelmiş olma olasılığı?",o:["0.620","0.95","0.375","0.6"],c:0,w:"Sağlam sütunu: 114 + 70 = 184; P(M1 | sağlam) = 114/184 ≈ 0.620."}]},
{ id:"s5", en:"Total probability & Bayes' theorem", title:"Toplam olasılık ve Bayes",
  body:`<p>Sonuç birkaç farklı “yoldan” gelebiliyorsa (örneğin parça 1. makineden ya da 2. makineden), <b>toplam olasılık</b> her yolun katkısını toplar.</p>
  <p><b>Bayes</b> ise tersini sorar: “Parça kusurlu çıktı. Hangi makineden gelmiş olma ihtimali ne?” Yani sonucu görüp sebebi tahmin ederiz.</p>
  <p>İpucu: Bu tip sorularda bir <b>ağaç diyagramı</b> çiz. Dallar çarpılır, uçlar toplanır.</p>`,
  f:[["P(A) = Σ P(A | Bᵢ) · P(Bᵢ)","toplam olasılık (B₁, B₂, … parçalanış)","A'nın olasılığı = her yol (Bᵢ) için: o yolun olasılığı çarpı o yoldan A'ya gitme olasılığı; sonra hepsini topla."],
     ["P(Bⱼ | A) = P(A | Bⱼ)·P(Bⱼ) / P(A)","Bayes teoremi","A görüldükten sonra sebebin Bⱼ olma olasılığı = Bⱼ yolundan A'ya gitme olasılığı bölü A'ya giden bütün yolların toplamı."]],
  ex:{q:"M1 üretimin %60’ını yapıyor, %2’si kusurlu. M2 %40’ını yapıyor, %5’i kusurlu. Rastgele parça kusurluysa M2’den gelmiş olma olasılığı?",a:"P(K) = 0.6·0.02 + 0.4·0.05 = 0.012 + 0.020 = 0.032.<br>P(M2|K) = 0.020 / 0.032 = <b>0.625</b>. Daha az üretmesine rağmen kusurluların çoğu M2’den geliyor."},
  quiz:[{d:"kolay",q:"Yukarıdaki örnekte P(M1 | kusurlu) kaçtır?",o:["0.6","0.012","0.375","0.02"],c:2,w:"0.012 / 0.032 = 0.375 (ya da 1 − 0.625)."},
        {d:"kolay",q:"P(B)=0.3, P(A|B)=0.8, P(A|Bᶜ)=0.2. P(A) kaçtır?",o:["0.38","0.5","0.24","1.0"],c:0,w:"Toplam olasılık: 0.8·0.3 + 0.2·0.7 = 0.24 + 0.14 = 0.38."},
        {d:"orta",q:"Hastalık sıklığı %10; test hastayı 0.95 ile yakalıyor, sağlıklıda 0.10 yanlış pozitif. Pozitif çıkan kişinin hasta olma olasılığı?",o:["0.51","0.95","0.10","0.19"],c:0,w:"P(+) = 0.1·0.95 + 0.9·0.10 = 0.185; P(H|+) = 0.095/0.185 ≈ 0.51."},
        {d:"zor",q:"Üç makine üretimin %50, %30, %20'sini yapıyor; kusur oranları %1, %2, %4. Kusurlu bir parçanın 3. makineden gelme olasılığı?",o:["0.421","0.263","0.316","0.2"],c:0,w:"P(K) = 0.005 + 0.006 + 0.008 = 0.019; P(M3|K) = 0.008/0.019 ≈ 0.421."}]},
{ id:"s6", en:"Independence", title:"Bağımsızlık",
  body:`<p>A ve B <b>bağımsız</b> ise birinin olması diğerinin olasılığını hiç değiştirmez. P(A|B) = P(A).</p>
  <p>Dikkat: <b>Ayrık ≠ bağımsız</b>. Ayrık olaylar birbirini engeller (biri olursa diğeri kesin olmaz), bu yüzden tam tersine çok bağımlıdır.</p>
  <p>Mühendislikte sık kullanım: <b>seri sistem</b> (hepsi çalışmalı) ve <b>paralel sistem</b> (en az biri çalışmalı) güvenilirliği.</p>`,
  f:[["P(A ∩ B) = P(A) · P(B)","bağımsızlığın tanımı","A ve B bağımsızsa ikisinin birlikte olma olasılığı = olasılıklarının çarpımı. Eşdeğeri: B'yi öğrenmek A'nın olasılığını değiştirmez."],
     ["Seri: R = p₁ · p₂ · … · pₙ","hepsi çalışmalı","Seri sistemin güvenilirliği = bileşenlerin çalışma olasılıklarının çarpımı (hepsi çalışmak zorunda)."],
     ["Paralel: R = 1 − (1−p₁)(1−p₂)…(1−pₙ)","en az biri çalışmalı","Paralel sistemin güvenilirliği = 1 eksi hepsinin birden arızalanma olasılığı (arıza olasılıklarını çarp, 1'den çıkar)."]],
  ex:{q:"İki bağımsız bileşen, her biri 0.9 olasılıkla çalışıyor. Seri ve paralel bağlanınca sistem güvenilirliği?",a:"Seri: 0.9 · 0.9 = <b>0.81</b>. Paralel: 1 − 0.1 · 0.1 = <b>0.99</b>."},
  quiz:[{d:"kolay",q:"A ve B bağımsız, P(A)=0.5, P(B)=0.4. P(A∩B)?",o:["0.9","0.2","0.1","0"],c:1,w:"0.5 · 0.4 = 0.2."},
        {d:"kolay",q:"P(A)=0.3, P(B)=0.5 ve A, B ayrık. Bağımsız mıdır?",o:["Evet","Hayır"],c:1,w:"P(A∩B)=0 ama P(A)P(B)=0.15. Eşit değil → bağımsız değil. Ayrık olaylar bağımlıdır."},
        {d:"orta",q:"Üç bağımsız bileşen paralel; her biri 0.8 ile çalışıyor. Sistem güvenilirliği?",o:["0.992","0.512","0.8","0.96"],c:0,w:"Sistem ancak üçü de arızalanırsa durur: 1 − 0.2³ = 0.992."},
        {d:"zor",q:"A (0.9) seri; ardından B (0.8) ve C (0.8) paralel blok. Bileşenler bağımsız. Sistem güvenilirliği?",o:["0.864","0.576","0.72","0.96"],c:0,w:"Paralel blok: 1 − 0.2·0.2 = 0.96; seri: 0.9 · 0.96 = 0.864."}]},
{ id:"s7", en:"Discrete random variables, PMF, CDF", title:"Kesikli rastgele değişkenler",
  body:`<p><b>Rastgele değişken (X)</b>, deneyin sonucuna bir sayı veren kuraldır. Örnek: 2 para atışında X = “yazı sayısı”.</p>
  <p><b>Kesikli (discrete)</b>: X’in alabileceği değerler sayılabilir (0, 1, 2, …).</p>
  <ul><li><b>PMF p(x)</b>: X’in tam olarak x olma olasılığı. Hepsi toplanınca 1 eder.</li><li><b>CDF F(x)</b>: X’in x veya daha küçük olma olasılığı. Merdiven gibi artar.</li></ul>`,
  f:[["p(x) = P(X = x),   Σ p(x) = 1","olasılık kütle fonksiyonu (PMF)","p(x): X'in tam olarak x değerini alma olasılığı. Bütün değerlerin olasılıkları toplanınca 1 eder; hiçbiri negatif olamaz."],
     ["F(x) = P(X ≤ x) = Σ_{t ≤ x} p(t)","birikimli dağılım fonksiyonu (CDF)","F(x): X'in x veya daha küçük olma olasılığı; x'e kadar olan p değerlerini topla. Kesiklide merdiven şeklindedir."],
     ["P(a < X ≤ b) = F(b) − F(a)","aralık olasılığı","X'in a ile b arasında (b dahil, a hariç) olma olasılığı = b'ye kadar biriken eksi a'ya kadar biriken olasılık."]],
  ex:{q:"2 para atılıyor, X = yazı sayısı. PMF’yi ve F(1)’i bul.",a:"p(0)=1/4 (TT), p(1)=1/2 (YT, TY), p(2)=1/4 (YY). F(1) = p(0)+p(1) = <b>3/4</b>."},
  quiz:[{d:"kolay",q:"p(0)=0.2, p(1)=0.5, p(2)=c. c kaç olmalı?",o:["0.5","0.3","0.2","1"],c:1,w:"Toplam 1 olmalı: 1 − 0.7 = 0.3."},
        {d:"kolay",q:"2 para, X = yazı sayısı. F(1) = P(X ≤ 1) kaçtır?",o:["1/4","1/2","3/4","1"],c:2,w:"F(1) = p(0) + p(1) = 1/4 + 1/2 = 3/4."},
        {d:"orta",q:"p(1)=0.2, p(2)=0.3, p(3)=0.5. P(X ≥ 2) kaçtır?",o:["0.8","0.5","0.3","0.2"],c:0,w:"p(2) + p(3) = 0.8; ya da 1 − F(1) = 1 − 0.2."},
        {d:"zor",q:"4 sağlam 2 kusurlu parça; geri koymadan 2 parça çekiliyor. X = kusurlu sayısı. P(X = 1)?",o:["8/15","1/3","1/15","2/5"],c:0,w:"C(2,1)·C(4,1) / C(6,2) = 8/15 ≈ 0.533. Bağımsız gibi çarpmak (2/6·4/6·2) yanlış olur."}]},
{ id:"s8", en:"Expected value & variance", title:"Beklenen değer ve varyans",
  body:`<p><b>Beklenen değer E[X]</b>: Deneyi çok kez tekrarlasan ortalama ne çıkar? Her değer, olasılığıyla ağırlıklandırılıp toplanır.</p>
  <p><b>Varyans Var(X)</b>: Değerler ortalamadan ne kadar <i>dağınık</i>? <b>Standart sapma σ</b> = √Var, aynı birimde dağınıklık.</p>
  <p>Kolay hesap için: önce E[X], sonra E[X²], sonra Var = E[X²] − (E[X])².</p>`,
  f:[["E[X] = Σ x · p(x)","beklenen değer (ortalama)","Her değeri olasılığıyla çarp ve topla: ağırlıklı ortalama. Uzun vadede gözlenen ortalama budur."],
     ["Var(X) = E[X²] − (E[X])²","varyans (pratik formül)","Varyans = karelerin beklenen değeri eksi beklenen değerin karesi. Standart sapma = varyansın karekökü."],
     ["E[aX + b] = a·E[X] + b","doğrusallık","X'i a ile çarpıp b eklersen ortalama da a ile çarpılır, b eklenir."],
     ["Var(aX + b) = a² · Var(X)","dönüşümde varyans","Sabit ekleme (b) dağınıklığı değiştirmez; a ile çarpma varyansı a² ile çarpar (standart sapmayı |a| ile)."]],
  ex:{q:"2 para atışı, X = yazı sayısı. E[X] ve Var(X)?",a:"E[X] = 0·¼ + 1·½ + 2·¼ = 1.<br>E[X²] = 0·¼ + 1·½ + 4·¼ = 1.5.<br>Var(X) = 1.5 − 1² = <b>0.5</b>."},
  quiz:[{d:"kolay",q:"E[X]=3, Var(X)=4 ve Y = 2X + 1. E[Y] ve Var(Y)?",o:["7 ve 16","7 ve 9","6 ve 8","7 ve 8"],c:0,w:"E[Y] = 2·3+1 = 7. Var(Y) = 2²·4 = 16."},
        {d:"kolay",q:"X, 0 ve 2 değerlerini 0.5'er olasılıkla alıyor. E[X] kaçtır?",o:["0","1","2","0.5"],c:1,w:"0·0.5 + 2·0.5 = 1."},
        {d:"orta",q:"Aynı X için (0 ve 2, 0.5'er) Var(X) kaçtır?",o:["1","2","0.5","0.25"],c:0,w:"E[X²] = 0·0.5 + 4·0.5 = 2; Var = 2 − 1² = 1."},
        {d:"zor",q:"X: −10 (0.2), 0 (0.5), 20 (0.3). Var(X) kaçtır?",o:["124","140","16","108"],c:0,w:"E[X] = −2 + 0 + 6 = 4; E[X²] = 20 + 0 + 120 = 140; Var = 140 − 16 = 124."}]},
{ id:"s9", en:"Bernoulli & Binomial distribution", title:"Bernoulli ve Binom dağılımı",
  body:`<p><b>Bernoulli</b>: tek bir deneme, sonuç ya başarı (1) ya başarısızlık (0). P(başarı) = p.</p>
  <p><b>Binom</b>: Aynı Bernoulli denemesini <b>n kez, bağımsız</b> yap. X = başarı sayısı.</p>
  <p>Ne zaman binom? Sabit sayıda deneme (n), her denemede aynı p, denemeler bağımsız, ve “kaç başarı?” soruluyor.</p>`,
  f:[["P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ","k = 0, 1, …, n","n denemede tam k başarı olasılığı = (k başarının yerleşebileceği dizilim sayısı) × (k başarının olasılığı) × (n−k başarısızlığın olasılığı)."],
     ["E[X] = n·p","ortalama başarı sayısı","Beklenen başarı sayısı = deneme sayısı çarpı her denemedeki başarı olasılığı."],
     ["Var(X) = n·p·(1−p)","varyans","Varyans = deneme sayısı × başarı olasılığı × başarısızlık olasılığı."]],
  ex:{q:"Parçaların %10’u kusurlu. 5 parça seçiliyor. Tam 1 kusurlu olma olasılığı?",a:"n=5, p=0.1, k=1: C(5,1)·0.1¹·0.9⁴ = 5 · 0.1 · 0.6561 = <b>0.328</b>."},
  quiz:[{d:"kolay",q:"n=20, p=0.3 olan binomun beklenen değeri?",o:["0.3","6","4.2","20"],c:1,w:"np = 20 · 0.3 = 6."},
        {d:"kolay",q:"Adil para 4 kez atılıyor. Tam 2 yazı olasılığı?",o:["0.375","0.25","0.5","0.0625"],c:0,w:"C(4,2)·(0.5)⁴ = 6/16 = 0.375."},
        {d:"orta",q:"Parçaların %10'u kusurlu; 5 parça bağımsız seçiliyor. En az 1 kusurlu olasılığı?",o:["0.41","0.59","0.33","0.5"],c:0,w:"1 − P(0) = 1 − 0.9⁵ = 1 − 0.590 = 0.41."},
        {d:"zor",q:"X ~ Binom(10, 0.2). P(X ≤ 1) kaçtır?",o:["0.376","0.268","0.107","0.624"],c:0,w:"0.8¹⁰ + 10·0.2·0.8⁹ = 0.107 + 0.268 = 0.376."}]},
{ id:"s10", en:"Geometric distribution", title:"Geometrik dağılım",
  body:`<p>Binomda deneme sayısı sabitti. <b>Geometrikte</b> ise “ilk başarıya kadar kaç deneme?” sorusunu sorarız.</p>
  <p>Örnek: Satış elemanı her aramada %20 ihtimalle satış yapıyor. İlk satış kaçıncı aramada?</p>
  <p>Özel bir özelliği var: <b>hafızasızlık (memoryless)</b>. 5 kez başarısız olmuş olman, sonraki denemelerin şansını değiştirmez.</p>`,
  f:[["P(X = k) = (1−p)ᵏ⁻¹ · p","k = 1, 2, 3, …","İlk başarının tam k. denemede olma olasılığı = ilk k−1 denemenin başarısız olması × k. denemenin başarılı olması."],
     ["E[X] = 1/p","ortalama deneme sayısı","İlk başarıya kadar beklenen deneme sayısı = 1 bölü başarı olasılığı (p = 0.2 ise ortalama 5 deneme)."],
     ["Var(X) = (1−p)/p²","varyans","Varyans = başarısızlık olasılığı bölü başarı olasılığının karesi."],
     ["P(X > k) = (1−p)ᵏ","ilk k deneme başarısız","İlk başarının k. denemeden sonra gelme olasılığı = ilk k denemenin hepsinin başarısız olma olasılığı."]],
  ex:{q:"p = 0.2. İlk başarının tam 3. denemede olma olasılığı?",a:"İlk iki başarısız, üçüncü başarılı: 0.8 · 0.8 · 0.2 = <b>0.128</b>."},
  quiz:[{d:"kolay",q:"p = 0.25 ise ilk başarı için ortalama kaç deneme gerekir?",o:["0.25","4","3","12"],c:1,w:"1/p = 4."},
        {d:"kolay",q:"p = 0.2. İlk başarının 3. denemede olma olasılığı?",o:["0.128","0.2","0.16","0.512"],c:0,w:"0.8² · 0.2 = 0.128."},
        {d:"orta",q:"p = 0.3. İlk başarı için 3'ten fazla deneme gerekme olasılığı?",o:["0.343","0.657","0.147","0.3"],c:0,w:"P(X > 3) = 0.7³ = 0.343: ilk üç deneme de başarısız."},
        {d:"zor",q:"p = 0.1. İlk 4 deneme başarısız geçti. Sonraki 2 denemede de başarı olmama olasılığı?",o:["0.81","0.531","0.9","0.19"],c:0,w:"Hafızasızlık: P(X > 6 | X > 4) = P(X > 2) = 0.9² = 0.81."}]},
{ id:"s11", en:"Poisson distribution", title:"Poisson dağılımı",
  body:`<p><b>Poisson</b>, belli bir zaman/alan aralığında bir olayın <b>kaç kez</b> olduğunu sayar: bir saatte gelen çağrı, bir sayfadaki yazım hatası, bir günde gelen müşteri.</p>
  <p>Tek parametresi <b>λ (lambda)</b>: o aralıktaki ortalama sayı. Aralık değişirse λ da orantılı değişir (saatte 3 ise 2 saatte 6).</p>
  <p>Ayrıca n büyük, p küçükse binom yerine Poisson kullanılabilir (λ = np).</p>`,
  f:[["P(X = k) = e^(−λ) · λᵏ / k!","k = 0, 1, 2, …","Aralıkta tam k olay olma olasılığı. λ = o aralıktaki ortalama olay sayısı (hız × aralık uzunluğu). P(X = 0) = e^(−λ)."],
     ["E[X] = Var(X) = λ","ortalama ve varyans eşit","Poisson'da ortalama da varyans da λ'dır."],
     ["Binom ≈ Poisson(λ = n·p)","n büyük, p küçükken","Deneme sayısı büyük, başarı olasılığı küçükse binom yerine λ = n·p alınarak Poisson kullanılabilir."]],
  ex:{q:"Bir çağrı merkezine saatte ortalama 3 çağrı geliyor. Bir saatte hiç çağrı gelmeme olasılığı?",a:"λ=3, k=0: e^(−3) · 3⁰ / 0! = e^(−3) ≈ <b>0.0498</b>."},
  quiz:[{d:"kolay",q:"λ = 2 ise P(X = 1) yaklaşık kaçtır?",o:["0.135","0.271","0.5","0.2"],c:1,w:"e^(−2) · 2 / 1! ≈ 0.135 · 2 ≈ 0.271."},
        {d:"kolay",q:"Saatte ortalama 3 çağrı. 2 saatlik aralık için λ kaçtır?",o:["6","3","1.5","9"],c:0,w:"λ = hız × uzunluk = 3 · 2 = 6."},
        {d:"orta",q:"λ = 3. En az 1 olay olma olasılığı?",o:["0.950","0.050","0.149","0.199"],c:0,w:"1 − P(0) = 1 − e^(−3) ≈ 1 − 0.0498 = 0.950."},
        {d:"zor",q:"Kumaşta m² başına ortalama 0.4 hata. 5 m²'lik parçada en fazla 1 hata olma olasılığı?",o:["0.406","0.271","0.135","0.594"],c:0,w:"λ = 0.4·5 = 2; P(X ≤ 1) = e^(−2)(1 + 2) = 0.1353·3 ≈ 0.406."}]}
];

const LS = {
  get(k,d){try{const v=localStorage.getItem("end252e."+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem("end252e."+k,JSON.stringify(v))}catch(e){}}
};
let cut = Math.min(LS.get("cut", 10), T.length-1);
let cur = 0;
let tab = LS.get("tab", "video");
let mode = "topic";           // "topic" | "test"
let notes = LS.get("notes", "");
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const covered = () => T.slice(0, cut + 1);
const ahead = () => T.slice(cut + 1);
const DIFF = {kolay:["Kolay","done"],orta:["Orta","en"],zor:["Zor","fut"]};

function renderCut(){
  $("#cutSel").innerHTML = T.map((t,i)=>`<option value="${i}" ${i===cut?"selected":""}>${i+1}. ${esc(t.title)}</option>`).join("");
  $("#progBar").style.width = ((cut+1)/T.length*100)+"%";
}
function renderRail(){
  let h = `<button class="t ${mode==="test"?"on":""}" data-i="test" type="button" style="margin-bottom:6px;border:1px dashed var(--accent)"><span class="n">✎</span><span class="nm" style="color:var(--accent);font-weight:600">Kendini test et (İngilizce)</span></button>`;
  h += `<h2>Konular</h2>`;
  T.forEach((t,i)=>{
    h += `<button class="t ${i<=cut?"done":"fut"} ${mode==="topic"&&i===cur?"on":""}" data-i="${i}" type="button"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="nm">${esc(t.title)}</span><span class="st" title="${i<=cut?"İşlendi":"Henüz işlenmedi"}"></span></button>`;
    if(i===cut && i<T.length-1) h += `<div class="cut">Buradayız</div>`;
  });
  $("#rail").innerHTML = h;
  $("#mSel").innerHTML = `<option value="test" ${mode==="test"?"selected":""}>✎ Kendini test et (İngilizce)</option>` + T.map((t,i)=>`<option value="${i}" ${mode==="topic"&&i===cur?"selected":""}>${i+1}. ${esc(t.title)}${i>cut?" (henüz işlenmedi)":""}</option>`).join("");
}
function renderLesson(){
  if(mode==="test"){ renderTest(); return; }
  const t = T[cur], done = cur <= cut, vd = V[t.id];
  let h = `<div class="meta"><span class="pill ${done?"done":"fut"}">${done?"İşlendi":"Henüz işlenmedi"}</span><span class="pill en">${esc(t.en)}</span></div><h2>${esc(t.title)}</h2>`;
  h += `<div class="tabs" role="tablist">${[["video","▶ Video"],["ozet","Konu özeti"],["senaryo","Senaryo & ders notu"]].map(([k,l])=>`<button class="tab ${tab===k?"on":""}" data-tab="${k}" type="button" role="tab">${l}</button>`).join("")}</div>`;
  if(!done) h += `<div class="future-note" style="margin-bottom:16px">Bu konu listende henüz işlenmedi olarak görünüyor. Videoyu ve özeti yine de izleyebilirsin; asistan bu konuda sadece kısa ön bilgi verir.</div>`;
  if(tab==="video"){
    h += vd ? `<div class="player" id="vplayer">
      <div style="position:relative"><button class="vclose" id="vClose" type="button">✕ Küçült</button><div class="stage" id="stage" tabindex="0" aria-label="Video sahnesi"></div></div>
      <div class="pbar" id="pbar" aria-label="Sahneler"></div>
      <div class="ctrl">
        <button class="ib" id="vPrev" type="button" title="Önceki sahne">⏮</button>
        <button class="ib main" id="vPlay" type="button">▶ Oynat</button>
        <button class="ib" id="vNext" type="button" title="Sonraki sahne">⏭</button>
        <span class="scinfo" id="scInfo"></span>
        <span class="sp"></span>
        <button class="ib" id="vVoice" type="button" title="Sesli anlatım">🔊 Sesli</button>
        <select id="vRate" aria-label="Hız"><option value="0.85">0.85×</option><option value="1" selected>1×</option><option value="1.2">1.2×</option></select>
        <button class="ib" id="vFull" type="button" title="Büyüt / küçült">⛶</button>
      </div>
      <div class="cap" id="cap"></div>
      <div class="vnote" id="vnote"></div>
    </div>` : `<div class="future-note">Bu konunun videosu hazırlanıyor.</div>`;
  } else if(tab==="ozet"){
    h += `<div class="prose">${t.body}</div>`;
    h += `<h3>Formüller</h3><ul class="formulas">${t.f.map(([f,w,tr])=>`<li><span class="f">${esc(f)}</span>${w?`<span class="w">${esc(w)}</span>`:""}${tr?`<span class="tr">Türkçesi: ${esc(tr)}</span>`:""}</li>`).join("")}</ul>`;
    h += `<h3>Çözümlü örnek</h3><div class="example"><div class="q">${t.ex.q}</div><details><summary>Çözümü göster</summary><div class="a">${t.ex.a}</div></details></div>`;
    h += `<h3>Kendini dene</h3><p style="margin:0 0 10px;font-size:.88rem;color:var(--muted)">2 kolay, 1 orta, 1 zor (sınav seviyesi) soru. Takılırsan asistana sor.</p><div class="quiz">${t.quiz.map((q,qi)=>`<div class="qz" data-q="${qi}"><div class="meta" style="margin-bottom:6px"><span class="pill ${DIFF[q.d][1]}">${DIFF[q.d][0]}</span></div><p>${esc(q.q)}</p><div class="opts">${q.o.map((o,oi)=>`<button type="button" class="opt" data-o="${oi}">${esc(o)}</button>`).join("")}</div><div class="why" hidden></div></div>`).join("")}</div>`;
  } else {
    h += vd ? `<div class="script" id="script"></div>` : `<div class="future-note">Bu konunun senaryosu hazırlanıyor.</div>`;
  }
  h += `<div class="ask-row">
    <button class="btn" type="button" data-ask="explain">Bu konuyu daha basit anlat</button>
    <button class="btn ghost" type="button" data-ask="practice">Bana yeni bir soru sor</button>
    <button class="btn ghost" type="button" data-ask="mistakes">Sık yapılan hatalar</button>
  </div>`;
  $("#lesson").innerHTML = h;
  $("#ctxLine").textContent = `Konu: ${t.title} · bu konuya odaklı`;
  if(tab==="video" && vd) openVideo(t.id);
  if(tab==="senaryo" && vd) { $("#script").innerHTML = renderScript(vd, t); }
}
function go(i){
  stopAll();
  if(i==="test"){ mode="test"; try{ history.replaceState(null,"","#test"); }catch(e){} renderRail(); renderLesson(); renderChips(); if(window.innerWidth<=760) window.scrollTo({top:0}); return; }
  mode="topic";
  cur = Math.max(0, Math.min(T.length-1, +i));
  try{ if(location.hash !== "#konu-"+(cur+1)) history.replaceState(null,"","#konu-"+(cur+1)); }catch(e){}
  renderRail(); renderLesson(); renderChips();
  if(window.innerWidth<=760) window.scrollTo({top:0});
}

$("#rail").addEventListener("click", e=>{const b=e.target.closest(".t"); if(b) go(b.dataset.i==="test"?"test":+b.dataset.i)});
$("#mSel").addEventListener("change", e=>go(e.target.value==="test"?"test":+e.target.value));
$("#cutSel").addEventListener("change", e=>{cut=+e.target.value; LS.set("cut",cut); renderCut(); renderRail(); renderLesson(); addSys(`Kaldığımız yer güncellendi: ${T[cut].title}`)});
$("#lesson").addEventListener("click", e=>{
  const tb = e.target.closest(".tab");
  if(tb){ tab = tb.dataset.tab; LS.set("tab",tab); stopAll(); renderLesson(); return; }
  const o = e.target.closest(".opt");
  if(o && mode==="topic"){
    const box=o.closest(".qz"), q=T[cur].quiz[+box.dataset.q], oi=+o.dataset.o;
    box.querySelectorAll(".opt").forEach(b=>b.classList.remove("right","wrong"));
    o.classList.add(oi===q.c?"right":"wrong");
    const w=box.querySelector(".why"); w.hidden=false;
    w.innerHTML = (oi===q.c?"<b>Doğru!</b> ":"<b>Tekrar dene.</b> ") + (oi===q.c?esc(q.w):"İpucu için asistana sorabilirsin.");
    return;
  }
  const a = e.target.closest("[data-ask]");
  if(a){
    const t=T[cur];
    const m = {explain:`“${t.title}” konusunu bana çok basit, günlük hayattan bir örnekle anlatır mısın?`,
      practice:`“${t.title}” konusundan bana bir alıştırma sorusu sor. Cevabı hemen verme, ben çözmeye çalışayım.`,
      mistakes:`“${t.title}” konusunda öğrencilerin sınavda en sık yaptığı hatalar neler?`}[a.dataset.ask];
    send(m); focusTutor();
  }
  const bl = e.target.closest("#blankToggle");
  if(bl){ const hide = bl.dataset.state!=="shown"; document.querySelectorAll(".blank").forEach(b=>b.classList.toggle("hide", !hide)); bl.dataset.state = hide?"shown":"hidden"; bl.textContent = hide?"Cevapları gizle":"Cevapları göster"; }
});
window.addEventListener("hashchange", ()=>{ if(location.hash==="#test"){ if(mode!=="test") go("test"); return; } const m=location.hash.match(/^#konu-(\d+)$/); if(m && (+m[1]-1!==cur || mode!=="topic")) go(+m[1]-1)});

/* ---------- Tutor ---------- */
let sample = null, busy = false, ctl = null;
let turns = LS.get("turns", []);
const log = $("#log");

function md(s){
  const lines = esc(s).split("\n"); let out="", list=null;
  const inline = x => x.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<i>$2</i>");
  const close = ()=>{ if(list){ out+=`</${list}>`; list=null; } };
  let para=[];
  const flush=()=>{ if(para.length){ out+=`<p>${inline(para.join("<br>"))}</p>`; para=[]; } };
  for(const raw of lines){
    const l = raw.trimEnd();
    let m;
    if(!l.trim()){ flush(); close(); continue; }
    if((m=l.match(/^#{1,4}\s+(.*)/))){ flush(); close(); out+=`<h4>${inline(m[1])}</h4>`; continue; }
    if((m=l.match(/^\s*[-*•]\s+(.*)/))){ flush(); if(list!=="ul"){close(); out+="<ul>"; list="ul";} out+=`<li>${inline(m[1])}</li>`; continue; }
    if((m=l.match(/^\s*\d+[.)]\s+(.*)/))){ flush(); if(list!=="ol"){close(); out+="<ol>"; list="ol";} out+=`<li>${inline(m[1])}</li>`; continue; }
    close(); para.push(l);
  }
  flush(); close(); return out;
}
function bubble(role, text){
  const d=document.createElement("div");
  d.className = "msg " + (role==="user"?"u":"a");
  if(role==="user") d.textContent = text; else d.innerHTML = md(text);
  log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
}
function addSys(t){ const d=document.createElement("div"); d.className="msg sys"; d.textContent=t; log.appendChild(d); log.scrollTop=log.scrollHeight; }
function renderLog(){
  log.innerHTML="";
  if(!turns.length){
    bubble("assistant", `Merhaba! Ben END252E çalışma asistanınım. Hangi konu açıksa **o konuya odaklanarak** anlatırım.\n\nHer konunun **animasyonlu videosu** var (Video sekmesi). Videoda anlamadığın bir sahneyi, özetteki bir formülü ya da testteki İngilizce bir soruyu buraya yazabilirsin.`);
  }
  turns.forEach(t=>bubble(t.role, t.content));
}
function renderChips(){
  let c;
  if(mode==="test"){ c = ["Bu soruyu Türkçe açıkla","Doğru şık neden doğru?","Bu sorudaki İngilizce terimleri açıkla","Benzer bir soru daha sor (İngilizce)"]; }
  else { const t=T[cur]; c = [`${t.title} nedir?`, "Videodaki zor örneği tekrar açıkla", "Özetteki formülü sözle anlat", "Bu konudan sınav sorusu sor"]; }
  $("#chips").innerHTML = c.map(x=>`<button type="button" class="chip">${esc(x)}</button>`).join("");
}
$("#chips").addEventListener("click", e=>{const b=e.target.closest(".chip"); if(b) send(b.textContent)});

const stripHtml = s => s.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
function topicContext(t){
  const v = V[t.id];
  const ex = v ? v.sc.filter(s=>/örnek/i.test(s.t)).map(s=>`- ${s.t}: ${(s.b||[]).join(" ")}`).join("\n").slice(0,5000) : "";
  return `KONU ÖZETİ (platformdaki anlatım; aynı gösterimi kullan):
${stripHtml(t.body)}
FORMÜLLER:
${t.f.map(([f,w,tr])=>`- ${f}  (${tr||w})`).join("\n")}
ÇÖZÜMLÜ ÖRNEK: ${t.ex.q} → ${stripHtml(t.ex.a)}${ex?`
VİDEODAKİ ÖRNEK SAHNELER (öğrenci “videodaki örnek” derse bunları kastediyor):
${ex}`:""}`;
}
function rules(){
  const t=T[cur];
  const inTest = mode==="test";
  const focus = inTest ? testContext() : `Öğrencinin ŞU AN ÇALIŞTIĞI KONU: ${t.title} (${t.en}). BÜTÜN cevaplarını bu konuya odakla ve bu konunun araçlarıyla çöz. Başka bir konuya ait soru gelirse 1-2 cümleyle cevapla ve “bu konuya geçince detaylı bakalım” diyerek şu anki konuya bağla.
${topicContext(t)}`;
  return `Sen İTÜ END252E (Probability / Olasılık) dersini alan bir öğrencinin kişisel çalışma asistanısın. Ders İngilizce işleniyor, öğrenci seninle Türkçe konuşuyor.

KURALLAR:
1. Çok basit ve sade anlat, sanki konuyu ilk kez duyan birine anlatıyormuş gibi. Günlük hayattan veya endüstri mühendisliğinden örnekler kullan (zar, para, kart, kalite kontrol, üretim hattı, çağrı merkezi).
2. Önemli terimlerin İngilizcesini parantez içinde ver, çünkü sınav İngilizce. Örn: koşullu olasılık (conditional probability).
3. Derste şu ana kadar işlenen konular: ${covered().map((x,i)=>`${i+1}. ${x.title} (${x.en})`).join("; ")}.${ahead().length?` Henüz işlenmemiş: ${ahead().map(x=>x.title).join(", ")} — bunların yöntemlerini çözümde kullanma.`:""}
4. Formülleri LaTeX KULLANMADAN düz metinle yaz: P(A|B), C(n,k), E[X], Var(X), e^(-λ), p^k. Dolar işareti veya \\frac gibi komutlar kullanma. Her formülün altına bir cümleyle Türkçe okunuşunu yaz.
5. Soru çözerken adım adım git: önce neyin verildiğini yaz, hangi formülü neden seçtiğini söyle, sonra hesapla. Son cevabı **kalın** yaz.
6. Öğrenci “bana soru sor” derse cevabı hemen verme; bir soru sor ve cevabını beklediğini söyle. Öğrencinin cevabı gelince kontrol et ve nazikçe düzelt.
7. Kısa tut: genelde 120-250 kelime. Markdown kullanabilirsin (**kalın**, madde listeleri, \`formül\`), tablo kullanma.

${focus}${notes.trim()?`

ÖĞRENCİNİN DERS NOTLARI / SLAYT METNİ (cevaplarında buna uy, hocanın gösterimini kullan):
"""
${notes.trim().slice(0,30000)}
"""`:""}

Öğrencinin mesajları aşağıda.`;
}

async function send(text){
  text = (text||"").trim();
  if(!text || busy) return;
  if(!sample){ addSys("Asistan bu görünümde kullanılamıyor. Sayfayı claude.ai içinde açınca çalışır."); return; }
  busy = true; $("#sendBtn").disabled = true;
  if(!turns.length) log.innerHTML = "";
  turns.push({role:"user", content:text}); bubble("user", text);
  const d = bubble("assistant",""); d.innerHTML = `<span class="thinking">Düşünüyor…</span>`;
  ctl = new AbortController();
  const history = turns.slice(-14);
  if(history[0].role!=="user") history.shift();
  try{
    const r = await sample([{role:"user", content:rules()}, ...history], {
      cache:false, signal:ctl.signal,
      onText:({text})=>{ d.innerHTML = md(text); log.scrollTop = log.scrollHeight; }
    });
    d.innerHTML = md(r.text);
    turns.push({role:"assistant", content:r.text});
    if(r.truncated) addSys("Cevap uzun olduğu için kesildi. “Devam et” yazabilirsin.");
  }catch(e){
    const keep = e && e.text;
    if(keep){ d.innerHTML = md(keep); turns.push({role:"assistant", content:keep}); }
    else { d.remove(); turns.pop(); if(log.lastElementChild && log.lastElementChild.classList.contains("u")) log.lastElementChild.remove(); $("#input").value = text; }
    const code = e && e.code;
    const msg = {not_granted:"Asistan için izin verilmedi. Sayfanın izin menüsünden açabilirsin.",
      sampling_disabled:"Bu hesapta yapay zeka kullanılamıyor.",
      rate_limited:"Çok sık soru gönderildi ya da kullanım sınırına ulaşıldı. Biraz bekleyip tekrar dene.",
      session_expired:"Oturum süresi doldu, claude.ai’ye tekrar giriş yap.",
      refused:"Bu soruya cevap verilemedi, farklı şekilde sormayı dene.",
      prompt_too_large:"Notlar çok uzun. “Ders notları” kısmını kısaltıp tekrar dene.",
      cancelled:null}[code];
    if(msg!==null) addSys(msg || "Bağlantı sorunu oldu. Tekrar göndermeyi dene.");
    if(code==="not_granted"||code==="sampling_disabled") disableTutor(msg);
  }finally{
    busy=false; $("#sendBtn").disabled=false; LS.set("turns", turns.slice(-40));
  }
}
function disableTutor(m){ $("#form").hidden=true; $("#chips").hidden=true; const p=document.createElement("div"); p.className="offline"; p.textContent=m; $("#tutor").appendChild(p); }
function focusTutor(){ if(window.innerWidth<=1180) $("#tutor").scrollIntoView({behavior:"smooth",block:"start"}); }

$("#form").addEventListener("submit", e=>{e.preventDefault(); const v=$("#input").value; $("#input").value=""; send(v)});
$("#input").addEventListener("keydown", e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); $("#form").requestSubmit(); }});
$("#clearBtn").addEventListener("click", ()=>{ if(busy && ctl) ctl.abort(); turns=[]; LS.set("turns",[]); renderLog(); });
$("#fab").addEventListener("click", ()=>{ $("#tutor").scrollIntoView({behavior:"smooth"}); setTimeout(()=>$("#input").focus(),400); });
$("#notesBtn").addEventListener("click", ()=>{ $("#notesBox").hidden=!$("#notesBox").hidden; });
$("#notesClose").addEventListener("click", ()=>{ $("#notesBox").hidden=true; });
$("#notesTa").value = notes;
const nc = ()=>{$("#notesCount").textContent = notes.length.toLocaleString("tr-TR")+" karakter"+(notes.length>30000?" (ilk 30.000 kullanılır)":"")};
nc();
$("#notesTa").addEventListener("input", e=>{ notes=e.target.value; LS.set("notes",notes); nc(); });
