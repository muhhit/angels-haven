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
    donateHref: CTA_PRIMARY,
    donateAmounts: [1, 8, 25, 55],
    stats: {
      label: "Bu ay dağıtılan öğün",
      value: 4186,
      suffix: "",
    },
    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-loop.mp4",
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
      { id: "today", metric: "142", caption: "Bugün bağış yaptı" },
      { id: "moment", metric: "Her 5 dk", caption: "Bir öğün fonlanıyor" },
      { id: "rating", metric: "4.9★", caption: "Topluluk puanı" },
    ],
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
};

export default function HomeTR() {
  return <Landing content={TR_CONTENT} />;
}
