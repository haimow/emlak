# Gayrimenkul Portföy Menüsü — Kurulum ve Kullanım

## Deponuza nasıl yerleştirilir? (önerilen yol)
Bu klasörün TÜM içeriğini GitHub deponuza koyun (repo kökü veya `/docs`).
Ardından Settings → Pages → Source olarak o dalı/klasörü seçin.
Birkaç dakika içinde `https://<kullanici>.github.io/<repo>/` adresi yayına girer.
Tek link budur; müşteriye bunu gönderirsiniz, telefonda uygulama gibi açılır.

## Fotoğraflar (bunları BANA göndermeyin)
Fotoğraflar doğrudan deponuzdaki `foto/<kod>/` klasörlerine girer.
Adlandırma: `<numara>-1.jpg`, `<numara>-2.jpg`, ...  (sizin kullandığınız biçim)
Örnekler:
- `foto/UYP-16764477097/16764477097-1.jpg`  (UYAP ihalesi)
- `foto/SB-1325575848/1325575848-1.jpg`      (sahibinden)
- `foto/INT-543/543-1.jpg`                    (intengo)
Tam kod da kabul edilir: `UYP-16764477097-1.jpg`.
jpg / jpeg / png / webp olur; sayfa sıra numarasına göre otomatik dizer, ilk resme
tıklayınca büyür. Fotoğraf eklemek/çıkarmak için kodda hiçbir değişiklik gerekmez.

## Referans kodları (klasör adları)
- UYAP ihale mülkleri → `UYP-<kayıt no>`  (ör. UYP-16926362076)
- sahibinden ilanları → `SB-<ilan no>`
- intengo.com ilanları → `INT-<ilan no>`

## Harita
- Sokak adresi olan mülkler → Google Haritalar adres pini.
- Adres olmayanlar (arsalar vb.) → harita mahalleye oturur; ada/parsel yazılır ve
  "TKGM Parsel Sorgu" butonu resmi kadastro haritasına götürür.

## Veri güncellemesi
Menü ve künye verileri değişince (yeni mülk, fiyat, tarih) ben `index.html`,
`mulk-*.html` ve `style.css` dosyalarını yenilerim; siz eski dosyaların üzerine
koyup commit'lersiniz. `foto/` klasörüne dokunmam gerekmez.

## İcra ilanları verisi (`data/icra-ilanlar.json`)
Sitedeki "İcra İlanları" tablosu bu JSON dosyasından beslenir.

**Alan adları:**
| Alan | Açıklama |
|---|---|
| `il` | İl (İZMİR / MUĞLA / MANİSA) |
| `ilce` | İlçe |
| `mahalle` | Mahalle |
| `ada` / `parsel` | Parsel bilgisi |
| `tip` | Mülk tipi (Konut, Daire, Arsa, Tarla, Fabrika vb.) |
| `bedel` | Tahmini bedel (sayı, ₺) |
| `kdv` | KDV oranı (%) |
| `alan` | Alan m² |
| `ihale_tarihi` | İhale tarihi (GG.AA.YYYY) |
| `url` | ilan.gov.tr ilanı |
| `parselUrl` | TKGM parsel sorgu linki |
| `baslik` | İlan başlığı |
| `updated` | Son güncelleme zamanı (ISO 8601) |

**Otomatik güncelleme:**
İcra ilanları görev dosyası (`İcra İlanları.csv`) güncellendiğinde JSON da yeniden oluşturulur ve `git push` ile bu depoya gönderilir.

## İcra araç ilanları güncelleme adımları
`araclar.html` sayfasında iki araç bölümü vardır:
1. **Üst kartlar** — UYP (uyap.gov.tr) kaynaklı, fotoğraflı, manuel eklenir.
2. **Alt tablo (İcra İlanı)** — ilan.gov.tr kaynaklı araçlar, otomatik güncellenir.

**Güncelleme yapılırken mutlaka uygulanacak kontrol:**

> **Mükerrer araç kontrolü:** XLSX Araçlar sheet'ine yeni satır eklemeden önce,
> o araç `araclar.html` üst kartlarında zaten var mı diye kontrol et.
> Eşleşme kriteri: aynı yıl + aynı fiyat (veya aynı model + fiyat).
> Mükerrer ise XLSX'e ekleme, alt tabloya da ekleme.

**Alt tablo güncelleme adımları (her çalıştırmada):**
1. `araclar.html` üst kartlarındaki tüm `data-price` ve araç model/yıl değerlerini çıkar.
2. XLSX Araçlar sheet'indeki her satırı bu listeyle karşılaştır.
3. Mükerrer olanları XLSX'ten ve alt tablodan kaldır.
4. Kalan (yeni/benzersiz) araçları alt tabloya ekle; Kalan (gün) değerini o anki tarihe göre hesapla.
5. Güncellenmiş `araclar.html`'i JSON ile birlikte `git push` et.
