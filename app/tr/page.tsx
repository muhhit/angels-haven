'use client';

import { Landing, type LandingContent } from "../page";

const TR_CONTENT: LandingContent = {
  brandName: "Angels Haven for Paws",
  navLinks: [
    { href: "#usp", label: "Neden £1" },
    { href: "#how", label: "Nasıl işler" },
    { href: "#bento", label: "Etki sistemi" },
    { href: "#stories", label: "Kurtarma hikayeleri" },
    { href: "#faq", label: "SSS" },
  ],
  navDonateLabel: "£1 Bağışla",
  hero: {
    eyebrow: "Angels Haven • Birleşik Krallık ↔ Türkiye",
    headline: "Her Pati Değerli — £1 Bugün Bir Köpeği Doyurur",
    subheadline:
      "Mikro bağışlar her ay iki ton mamayı taşıyor, acil tedavileri finanse ediyor ve kurtarılan köpekleri güvenli yuvalara uçuruyor.",
    primaryCta: "Şimdi £1 Bağışla",
    secondaryCta: "Akışı gör",
    secondaryHref: "#how",
    proof: "2.146 bağışçı geçen ay 1.842 öğün sağladı · 5 dakikadan kısa günlük özet",
    trust: "Stripe & PayPal • Apple / Google Pay • Kart verisi saklamıyoruz",
  },
  heroStats: [
    { label: "Bu ay taşınan mama", current: 2000, suffix: " kg" },
    { label: "Foster / rehabilitasyondaki köpek", current: 38 },
    { label: "Finanse edilen acil vaka", current: 12 },
  ],
  usp: {
    heading: {
      eyebrow: "Dönüşüm odaklı",
      title: "Amiral gemisi hareket dili, radikal şeffaflık, tek CTA",
      copy: "Her öğe bağışçıyı akışta tutup bir köpeği doyurana kadar yönlendiriyor.",
      align: "left",
    },
    items: [
      {
        id: "instant-proof",
        label: "Anında kanıt",
        detail: "Canlı sayaç, makbuzlar ve reels £1'iniz ulaştığı anda güncellenir.",
      },
      {
        id: "secure-checkout",
        label: "Sürtünmesiz ödeme",
        detail: "Apple Pay, Google Pay, Stripe ve PayPal tek dokunuşta, TLS 1.3 ile şifreli.",
      },
      {
        id: "always-on",
        label: "Kesintisiz şeffaflık",
        detail: "7/24 operasyon akışı; GPS logları, veteriner raporları ve bağış dağılımlarını gösterir.",
      },
    ],
  },
  howItWorks: {
    heading: {
      eyebrow: "Nasıl işler",
      title: "Kaydırma tetiklemeleri seni dokunuştan sallanan kuyruğa taşıyor",
      copy: "Üç sinematik adım bağış yaptıktan sonra neler olduğunu gösterir.",
    },
    clips: [
      {
        id: "select",
        label: "Adım 01",
        title: "£1 seç veya tutarı ayarla",
        description: "Radyal seçici canlı hedefi anında güncellerken haptik hissi verir.",
        metric: "Başlama süresi ort.: 6 sn",
        videoSrc: "/videos/hero-loop.mp4",
        poster: "/images/hero-rescue.png",
      },
      {
        id: "checkout",
        label: "Adım 02",
        title: "Ritmi bozmadan ödeme yap",
        description: "Apple Pay, Google Pay, Stripe ve PayPal tek sayfada birleşir — tek dokunuşla tamam.",
        metric: "Tamamlama oranı: %82",
        videoSrc: "/videos/farm-tour.mp4",
        poster: "/images/story-before.png",
      },
      {
        id: "follow",
        label: "Adım 03",
        title: "Etki akışını takip et",
        description: "Günlük reels, veteriner makbuzları ve GPS ısı haritaları destek olduğun köpeğin yolculuğunu anlatır.",
        metric: "Saat başı güncellenir",
        videoSrc: "/videos/hero-loop.mp4",
        poster: "/images/story-after.png",
      },
    ],
  },
  bento: {
    heading: {
      eyebrow: "Etki sistemi",
      title: "Operasyon, hikâye ve topluluk tek ritimde",
      copy: "Dönüşüm hazır sıcak bir deneyim için lansman sitesi cilasını ödünç aldık.",
    },
    tiles: [
      {
        id: "meals",
        badge: "Operasyon",
        title: "Ayda 2 ton mama",
        copy: "Fethiye, Dalyan ve İzmir'deki barınaklara her 14 günde rotalanan sevkiyatlar ulaşıyor.",
        metric: "Rotalar GPS ile doğrulanır",
        tone: "light",
      },
      {
        id: "response",
        badge: "Acil",
        title: "< 6 saatte yanıt",
        copy: "Uyarılar, veteriner bakımını ortalama altı saatin altında açan ops liderine düşer.",
        metric: "Finanse edilen vaka: 12",
        tone: "dark",
      },
      {
        id: "flights",
        badge: "Ulaşım",
        title: "21 günde uçuşa hazır",
        copy: "Mikro bağışlar aşılardan uçuş biletine kadar tüm masrafları karşılar; köpekler hızla yeni yuvaya varır.",
        metric: "Uçuş maliyeti ort. £420",
        tone: "light",
      },
      {
        id: "community",
        badge: "Topluluk",
        title: "Canlı bağışçı kulübü",
        copy: "Özel etki akışı, hareketli özetler ve gönüllü çağrıları destekçileri hikâyeye dahil eder.",
        metric: "2.146 aktif bağışçı",
        tone: "light",
      },
    ],
  },
  stories: {
    heading: {
      eyebrow: "Kurtarma hikayeleri",
      title: "Mikro bağışlar büyük dönüşümler yaratıyor",
      copy: "Destekçilerin tekrar tekrar izlediği bölümleri kaydır.",
    },
    cards: [
      {
        id: "mila",
        title: "Mila · Market sokağından Londra kanepesine",
        excerpt:
          "Fethiye'de bir market önünde titrerken bulundu. £1 bağışlar aşıları, beslenmeyi ve 14 günde Londra uçuşunu finanse etti.",
        stat: "14. gün: Mila foster kanepesinde",
        image: "/images/story-after.png",
        alt: "Mila kurtarma sonrası dinlenirken",
      },
      {
        id: "atlas",
        title: "Atlas · Acil ameliyattan sahil koşularına",
        excerpt:
          "Antalya'da araba çarpması sonrası topluluk ameliyat, hidroterapi ve Brighton'a taşınmayı finanse etti — şimdi kıyı koşularında.",
        stat: "28. gün: Atlas sahiplendirmeye hazır",
        image: "/images/story-before.png",
        alt: "Atlas iyileşme sürecinde mutlu",
      },
    ],
  },
  faq: {
    heading: {
      eyebrow: "SSS",
      title: "Bağıştan önce soracağın her şey",
      copy: "Burada yoksa birkaç saat içinde Loom veya WhatsApp'tayız.",
    },
    items: [
      {
        question: "£1'in nereye gittiğini gerçekten görüyor muyum?",
        answer:
          "Evet. Her bağış yemek sayacı, veteriner makbuzu ve günlük etki videosunda anında görünür.",
      },
      {
        question: "Ödeme güvenli mi?",
        answer:
          "Stripe ve PayPal'ı TLS 1.3, Apple Pay, Google Pay ve Fraud Radar ile kullanıyoruz — kart verisi sunucularımıza hiç dokunmuyor.",
      },
      {
        question: "Düzenli bağışı durdurabilir miyim?",
        answer:
          "Tabii ki. Makbuzundaki bağlantıdan anında durdurabilir veya erteleyebilirsin; form yok, bekleme yok.",
      },
      {
        question: "Kurtarmalar ne kadar hızlı gerçekleşiyor?",
        answer:
          "Acil vakalar uyarıdan finanse edilen tedaviye ortalama altı saatin altında geçiyor; her adım zaman çizelgesinde paylaşılır.",
      },
      {
        question: "Vergi için makbuz alacak mıyım?",
        answer:
          "HMRC uyumlu özetler otomatik olarak e-postana düşer ve aylık döküm için kayıt tutar.",
      },
      {
        question: "Bağıştan sonra ne olur?",
        answer:
          "Özel etki akışımıza katılır, perde arkası içeriklere erişir ve istersen gönüllü uçuşlara kayıt olursun.",
      },
    ],
  },
  final: {
    eyebrow: "Bir sonraki kurtarmayı fonlamaya hazır mısın?",
    headline: "Bugün bir köpeği daha güvende tut",
    body: "£1'lik zincir mamasını, tedavisini ve yolculuğunu tetikler. Her ay 2 ton yardımı hareket ettiren bağışçılara katıl.",
    button: "Şimdi £1 Bağışla",
    secondary: "Topluluk akışına git",
  },
  sticky: {
    headline: "£1 bugün bir köpeği doyurur",
    subheadline: "Anında makbuz · Şifreli ödeme",
    button: "Bağışla",
  },
};

export default function HomeTR() {
  return <Landing content={TR_CONTENT} />;
}
