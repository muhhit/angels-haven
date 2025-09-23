'use client';

import { Landing, type LandingContent } from "../page";

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_REPORT = "https://example.com/angels-haven-transparency.pdf";
const CTA_COMMUNITY = "https://www.facebook.com";

const TR_CONTENT: LandingContent = {
  hero: {
    eyebrow: "Angels Haven • Birleşik Krallık ↔ Türkiye",
    headline: "£1 = Bir Öğün. Bugün Bir Hayatı Değiştir.",
    subheadline: "Mikro bağışlar mamayı, acil tedaviyi ve kurtarılan patilerin Birleşik Krallık’taki güvenli yuvalara uçuşunu finanse eder.",
    summary: "Aylık şeffaflık • Tek dokunuşla güvenli ödeme",
    ctaLabel: "£1 Bugün Besler",
    donateAmounts: [8, 1, 25, 100],
    donateHref: CTA_PRIMARY,
    defaultSelectionLabel: "Çoğu bağışçı £8’i seçiyor",
    stats: {
      label: "Bu ay dağıtılan öğün",
      value: 4186,
      suffix: "",
    },
    social: [
      { label: "Instagram", href: "https://instagram.com/angelshavenpaws" },
      { label: "YouTube", href: "https://youtube.com/@angelshaven" },
      { label: "LinkedIn", href: "https://linkedin.com/company/angelshaven" },
    ],
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-ambient.mp4",
      alt: "Bir gönüllünün etrafında toplanmış kurtarılan köpekler",
    },
    liveCounter: {
      label: "Bu hafta canlı bağışçı",
      initial: 1286,
      minIncrement: 3,
      maxIncrement: 8,
      intervalMs: 6500,
      suffix: "kişi",
    },
    socialProof: [
      {
        id: "today",
        metric: "🔥 Bugün 127 kişi bağışladı",
        caption: "Kalabalığa katıl",
        media: {
          poster: "/images/hero-poster.avif",
          video: "/videos/community-loop.mp4",
          alt: "Gönüllünün çevresinde birleşen köpekler",
        },
      },
      { id: "members", metric: "💙 2.847 aylık", caption: "Otomatik destekçiler" },
      { id: "rating", metric: "⭐ 4.9/5", caption: "Şeffaflık puanı" },
    ],
    urgency: {
      remainingLabel: "Öğün bekleyen köpek",
      remainingValue: "47",
      goalLabel: "Aylık hedef %73 tamam",
      goalPercent: 73,
      footer: "Pazar gecesi öncesi açığı kapatmamıza yardım et.",
    },
    recurringHint: "Aylık seçersen mamalar hiç kesilmez.",
    ticker: {
      headline: "Son bağışçılar",
      entries: [
        { id: "ayse-lon", name: "Ayşe K.", amount: 25, city: "Londra, UK", minutesAgo: 4, method: "Apple Pay" },
        { id: "murat-izm", name: "Murat S.", amount: 8, city: "İzmir, TR", minutesAgo: 7, method: "Stripe" },
        { id: "ella-man", name: "Ella R.", amount: 50, city: "Manchester, UK", minutesAgo: 10, method: "PayPal" },
        { id: "deniz-ank", name: "Deniz A.", amount: 12, city: "Ankara, TR", minutesAgo: 13, method: "Visa" },
        { id: "cihan-ist", name: "Cihan D.", amount: 8, city: "İstanbul, TR", minutesAgo: 19, method: "Apple Pay" },
        { id: "olivia-brt", name: "Olivia P.", amount: 100, city: "Bristol, UK", minutesAgo: 26, method: "Havale" },
      ],
    },
  },
  usp: [
    "£1 = Bir Öğün",
    "Aylık Şeffaflık",
    "Tek Dokunuşla Güvenli Ödeme",
    "UK ↔ TR Operasyonları",
  ],
  steps: [
    {
      id: "choose",
      badge: "Adım 01",
      title: "Tutarını seç",
      copy: "£1 ile başla ya da istediğin tutarı gir. Canlı sayaç bağışınla birlikte anında güncellenir.",
      media: {
        poster: "/images/step-choose.avif",
        video: "/videos/step-choose.mp4",
        alt: "Bağış seçici arayüzü",
      },
    },
    {
      id: "pay",
      badge: "Adım 02",
      title: "Güvenle öde",
      copy: "Apple Pay, Google Pay, Stripe ve PayPal tek sayfada birleşir—hesap açmadan bağışı tamamlarsın.",
      media: {
        poster: "/images/step-pay.avif",
        video: "/videos/step-pay.mp4",
        alt: "Ödeme onay ekranı",
      },
    },
    {
      id: "impact",
      badge: "Adım 03",
      title: "Etkini izle",
      copy: "Günlük videolar, veteriner makbuzları ve GPS günlükleri bağışının sokaktan yuvaya yolculuğunu anlatır.",
      media: {
        poster: "/images/step-impact.avif",
        video: "/videos/step-impact.mp4",
        alt: "Etki panosu",
      },
    },
  ],
  stories: [
    {
      id: "mila",
      title: "Mila • 14 günde sokaktan kanepeye",
      copy: "Fethiye’de market önünde bulundu. Mikro bağışlar mamayı, aşıları ve Londra uçuşunu karşıladı.",
      stat: "14. Gün • Foster kanepesinde",
      media: {
        before: { poster: "/images/story-before.png", alt: "Mila kurtarma öncesi" },
        after: { poster: "/images/story-mila.avif", alt: "Mila yeni yuvasında" },
        clip: { poster: "/images/story-mila.avif", video: "/videos/story-mila.mp4", alt: "Mila video klibi" },
      },
      ctaLabel: "Daha fazla kurtarmayı fonla",
      ctaHref: CTA_PRIMARY,
    },
    {
      id: "duman",
      title: "Duman • Acil tedaviden sahil koşularına",
      copy: "Antalya’da trafik kazası sonrası topluluk ameliyatı, rehabilitasyonu ve Brighton yolculuğunu finanse etti.",
      stat: "28. Gün • Sahiplendirmeye hazır",
      media: {
        before: { poster: "/images/story-before.png", alt: "Duman tedavi öncesi" },
        after: { poster: "/images/story-duman.avif", alt: "Duman iyileştikten sonra" },
        clip: { poster: "/images/story-duman.avif", video: "/videos/story-duman.mp4", alt: "Duman video klibi" },
      },
      ctaLabel: "Bir öğün daha gönder",
      ctaHref: CTA_PRIMARY,
    },
  ],
  bento: [
    {
      id: "meals",
      eyebrow: "Mama",
      title: "Ayda 2 ton mama",
      copy: "Fethiye, Dalyan ve İzmir barınaklarına her 14 günde GPS doğrulamalı sevkiyat yapılır.",
      ctaLabel: "Rota kayıtlarını gör",
      href: CTA_REPORT,
    },
    {
      id: "emergency",
      eyebrow: "Acil",
      title: "< 6 saatte yanıt",
      copy: "Uyarılar, veteriner bakımını ortalama altı saatin altında açan ops liderine düşer.",
      ctaLabel: "Makbuzları incele",
      href: CTA_REPORT,
    },
    {
      id: "sponsor",
      eyebrow: "Sponsor",
      title: "Bir pati sponsorluğu",
      copy: "Düzenli bağışçılar uçuş ve foster maliyetlerini karşılar; her ay bir köpeğe yolculuk hediye et.",
      ctaLabel: "Bugün sponsor ol",
      href: CTA_PRIMARY,
    },
    {
      id: "report",
      eyebrow: "Rapor",
      title: "Şeffaflık raporu",
      copy: "Günlük operasyon akışı, aylık raporlar ve uyum dosyaları gerçek zamanlı denetim sağlar.",
      ctaLabel: "Raporu indir",
      href: CTA_REPORT,
    },
  ],
  faq: [
    {
      question: "£1’in nereye gittiğini gerçekten görüyor muyum?",
      answer: "Evet. Her bağış yemek sayacı, veteriner makbuzu ve günlük etki videosunda anında görünür.",
    },
    {
      question: "Ödeme güvenli mi?",
      answer: "Stripe ve PayPal’ı TLS 1.3, Apple Pay, Google Pay ve Radar koruması ile kullanıyoruz—kart verisi sunucularımıza girmez.",
    },
    {
      question: "Düzenli bağışı durdurabilir miyim?",
      answer: "Makbuzundaki bağlantıdan tek dokunuşla durdurabilir ya da erteleyebilirsin; bekleme yok.",
    },
    {
      question: "Kurtarma ne kadar hızlı gerçekleşiyor?",
      answer: "Acil vakalar ortalama altı saatin altında fonlanır ve zaman çizelgesi adım adım paylaşılır.",
    },
    {
      question: "Vergi için makbuz alacak mıyım?",
      answer: "HMRC uyumlu makbuzlar anında e-postana düşer ve aylık döküm oluşturur.",
    },
    {
      question: "Bağıştan sonra ne olur?",
      answer: "Özel etki akışına katılır, perde arkası içerikleri izler ve istersen uçuş gönüllüsü olursun.",
    },
  ],
  final: {
    eyebrow: "Bir sonraki kurtarmaya hazır mısın?",
    headline: "Bugün bir köpeği daha güvende tut.",
    body: "£1; mamayı, tedaviyi ve yolculuğu tetikler. Her ay 2 ton yardımı hareket ettiren bağışçılara katıl.",
    ctaLabel: "£1 Bugün Besler",
    secondaryLabel: "Topluluk akışına git",
    secondaryHref: CTA_COMMUNITY,
    donateHref: CTA_PRIMARY,
  },
  trust: {
    headline: "Kaydı, denetimi ve sahadaki ekibiyle gerçek bir kurum.",
    copy: "Angels Haven, İngiltere’deki yönetim kurulu ve Türkiye’deki saha ortaklarıyla çift bölgeli çalışır. Her belge, sertifika ve güvenlik kontrolü bağışçılarla paylaşılır.",
    signals: [
      {
        id: "registration",
        title: "Charity Commission • #1204821",
        detail: "12 Ocak 2021’den beri İngiltere & Galler kayıtlı hayır kurumu.",
        proof: "2024’te Charity Commission kaydında doğrulandı.",
      },
      {
        id: "audit",
        title: "Paws & Claws LLP bağımsız denetimi",
        detail: "UK idari giderleri, TR saha harcamaları ve acil rezervleri yıllık raporda.",
        proof: "2023 mali yılı denetimi 08 Şubat 2024’te sıfır bulgu ile tamamlandı.",
      },
      {
        id: "safeguard",
        title: "Tam güvenlik ve DBS taraması",
        detail: "Tüm gönüllüler, taşıma ve foster ekipleri 12 ayda bir yeniden taranır.",
        proof: "Uyum günlüğü bağışçı şeffaflık panelinde herkese açık.",
      },
    ],
    metrics: [
      { id: "meals", label: "Aylık öğün", value: "2.184", caption: "Fethiye, Dalyan, İzmir güzergahları GPS kayıtlı." },
      { id: "rehomed", label: "Yuvalandırılan köpek", value: "182", caption: "2021’den beri UK & AB sahiplendirme." },
      { id: "rating", label: "Şeffaflık puanı", value: "4.9 / 5", caption: "Trustpilot + Google ortalaması." },
    ],
    accreditations: [
      { id: "charity-commission", label: "UK Charity Commission", description: "Resmi kayıt", href: "https://register-of-charities.charitycommission.gov.uk" },
      { id: "hcvo", label: "Hackney CVS Üyesi", description: "Yerel STK ağı", href: "https://hcvs.org.uk" },
      { id: "defra", label: "DEFRA Taşıma Lisansı", description: "Evcil hayvan taşımacılığı uyumu" },
    ],
    reviews: [
      { id: "review-ayse", quote: "Bağış yaptıktan 5 dakika sonra veteriner faturası ve rota bildirimi geldi. Şeffaflıkta rakipsizler.", name: "Ayşe K., Londra", role: "2022’den beri aylık bağışçı" },
      { id: "review-levent", quote: "İki köpeği Heathrow’a biz eskort ettik; süreç ve refah standartları kusursuzdu.", name: "Levent A., İzmir", role: "Uçuş gönüllüsü" },
      { id: "review-elif", quote: "Kurumsal sosyal sorumluluk programımız bu şeffaflık paketine bayıldı—hazır dokümanla geldiler.", name: "Elif R., İstanbul", role: "Kurumsal iş birlikleri" },
      { id: "review-hasan", quote: "Acil vakalar saatler içinde fonlanıyor; Duman’ın bacağını topluluk kurtardı.", name: "Hasan T., Antalya", role: "Partner veteriner" },
    ],
    team: [
      { id: "tulay", name: "Tülay Demir", role: "Kurucu & Saha Operasyonları", bio: "Havacılık lojistiğinden gelen deneyimiyle Muğla genelinde kurtarma ve tedaviyi koordine ediyor." },
      { id: "aaron", name: "Aaron Blake", role: "UK Programları & Uyum", bio: "Eski Charity Commission analisti; tüm rapor ve Gift Aid süreçlerini yönetiyor." },
      { id: "seda", name: "Seda Yıldız", role: "Veteriner Ağları", bio: "18 kliniklik ağı yönetip AB seyahat standartlarına uygun bakımı garanti ediyor." },
      { id: "leila", name: "Leila Khan", role: "Bağışçı Deneyimi", bio: "Canlı yayınları, WhatsApp güncellemelerini ve şeffaflık panelini yürütüyor." },
    ],
    media: [
      { id: "guardian", outlet: "The Guardian", href: "https://www.theguardian.com/uk", date: "Mart 2024", headline: "Mikro bağışlarla Türkiye’den uçan kurtarma uçuşları" },
      { id: "bbc", outlet: "BBC Radio London", href: "https://www.bbc.co.uk/sounds", date: "Ocak 2024", headline: "Angels Haven’ın İstanbul gece görevleri" },
      { id: "wired", outlet: "WIRED Impact", href: "https://www.wired.co.uk", date: "Kasım 2023", headline: "Şeffaflık panelleri bağışçı güvenini nasıl geri getiriyor" },
    ],
    contact: [
      { label: "E-posta", value: "verify@angelshaven.org", href: "mailto:verify@angelshaven.org" },
      { label: "Telefon", value: "+44 20 7946 0958", href: "tel:+442079460958" },
      { label: "Merkez", value: "18 Market Walk, Islington, London N1 7SR" },
      { label: "TR Operasyon", value: "Calis Mah. 112. Sokak No:4, Fethiye / Muğla" },
    ],
    proofDocument: {
      label: "Şeffaflık paketini indir",
      href: CTA_REPORT,
      description: "Kayıt sertifikaları, güvenlik politikası, taşıma sigortası ve 2023 denetim mektubu.",
    },
  },
  footer: {
    registration: "Charity Commission (England & Wales) No. 1204821",
    address: "18 Market Walk, Islington, London N1 7SR • Operasyon üssü: Calis Mah. 112. Sokak No:4, Fethiye / Muğla",
    email: "destek@angelshaven.org",
    phone: "+44 20 7946 0958",
    hours: "Çağrı hattı: Pzt–Cmt 08:00–20:00 GMT",
    socials: [
      { label: "Instagram", href: "https://instagram.com/angelshavenpaws" },
      { label: "YouTube", href: "https://youtube.com/@angelshaven" },
      { label: "TikTok", href: "https://www.tiktok.com/@angelshaven" },
      { label: "LinkedIn", href: "https://linkedin.com/company/angelshaven" },
    ],
    policies: [
      { label: "Gizlilik", href: "/privacy" },
      { label: "Koşullar", href: "/terms" },
      { label: "Etki raporu", href: CTA_REPORT },
    ],
    legal: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Şeffaflık", href: "/transparency" },
      { label: "Basın", href: "/press" },
    ],
  },
};

export default function HomeTR() {
  return <Landing content={TR_CONTENT} />;
}
