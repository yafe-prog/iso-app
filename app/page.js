'use client';
import React, { useState, useEffect } from 'react';
import {
  Flame, Compass, Utensils, Landmark, Heart, Search, Clock,
  ChefHat, Sparkles, ChevronLeft, MapPin, Share2, Check
} from 'lucide-react';

const RECIPES = [
  {
    id: 'urfa-kebabi',
    title: 'Tescilli Zırh Urfa Kebabı',
    category: 'Kebaplar',
    prepTime: '30 dk',
    cookTime: '15 dk',
    difficulty: 'Usta İşi',
    servings: '4 Kişilik',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    tip: 'Et kesinlikle makineden çekilmemeli, iki ağızlı keskin zırh bıçağıyla kuzu kaburga ve kuyruk yağı zırhlanmalıdır. Harca soğan veya sarımsak konmaz; yalnızca tuz ve hakiki yaprak isot eklenir.',
    ingredients: [
      '750 gr zırhlanmış erkek kuzu kaburga eti',
      '250 gr ince zırhlanmış kuzu kuyruk yağı',
      '1,5 tatlı kaşığı kaya tuzu',
      '1 yemek kaşığı hakiki Urfa yaprak isotu',
      'Servis için: Tırnaklı açık ekmek, közlenmiş Birecik patlıcanı, domates ve yeşil biber'
    ],
    steps: [
      'Kuzu kaburga etini ve kuyruk yağını soğuk haldeyken zırh bıçağı ile bulgur tanesi iriliğine gelene dek kıyın.',
      'Tuzu ekleyip eti özleşene kadar en az 10 dakika yoğurun ve buzdolabında 2 saat dinlendirin.',
      'Dinlenen kıymayı avuç içinizi hafif ıslatarak yassı ve geniş demir şişlere başparmak izi bırakarak saplayın.',
      'Meşe odunu közünde, ateşe çok yaklaştırmadan her iki yüzünü suyunu kaybetmeden pişirin.',
      'Tırnaklı ekmeklerin üzerine çekip közlenmiş patlıcan ve sumaklı soğan piyazı eşliğinde sıcak servis edin.'
    ]
  },
  {
    id: 'etli-borani',
    title: 'Geleneksel Etli Urfa Boranisi',
    category: 'Tencere Yemekleri',
    prepTime: '40 dk',
    cookTime: '45 dk',
    difficulty: 'Orta',
    servings: '6 Kişilik',
    featured: false,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    tip: 'Pazı saplarının suyunu iyice sıkıp sade yağda kavurmak yemeğin lezzet sırrıdır. Yoğurtlu sos eklenirken tencere fokurdamamalı, tahta kaşıkla tek yöne karıştırılmalıdır.',
    ingredients: [
      '500 gr kemiksiz kuzu kuşbaşı',
      '1,5 kg taze pancar pazısı (yalnızca sap kısımları)',
      '1,5 su bardağı geceden ıslatılmış nohut',
      '1 kg süzme yoğurt',
      '1 adet yumurta ve 1 yemek kaşığı un (terbiye için)',
      '2 yemek kaşığı has Urfa sade yağı',
      'Yuvarlama köftesi için: 250 gr köftelik bulgur, 100 gr yağsız kıyma, karabiber, tuz'
    ],
    steps: [
      'Kuzu kuşbaşı etini ve nohudu yumuşayana kadar haşlayın.',
      'Pancar pazısının saplarını doğrayıp kaynar suda haşlayın, soğuk sudan geçirip avucunuzla suyunu sıkın.',
      'Bulgur ve kıymayı yoğurarak nohut büyüklüğünde minik köfteler yuvarlayın ve haşlayın.',
      'Süzme yoğurdu yumurta ve un ile çırpın, sıcak et suyundan azar azar ekleyerek ılıtıp tencereye ilave edin.',
      'Sade yağda kavrulmuş pazı saplarını ve yuvarlama köftelerini tencereye ekleyip 5 dakika daha dinlendirin.'
    ]
  },
  {
    id: 'cig-kofte',
    title: 'Etli & Nar Ekşili Urfa Çiğ Köftesi',
    category: 'Çiğ Köfte & Mezeler',
    prepTime: '45 dk',
    cookTime: '0 dk',
    difficulty: 'Usta İşi',
    servings: '6 Kişilik',
    featured: false,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
    tip: 'Çiğ köfteye asla doğrudan su dökülmez; yalnızca buz küpleriyle yoğrularak bulgurun şişmesi sağlanır. Gerçek lezzet siyah güneşte kurutulmuş yağlı Urfa isotundan gelir.',
    ingredients: [
      '500 gr sinirleri alınmış ince çekilmiş yağsız dana/kuzu kıyma',
      '4 su bardağı esmer ince köftelik bulgur (simit)',
      '1,5 su bardağı hakiki siyah Urfa isotu',
      '2 yemek kaşığı domates ve biber salçası karışımı',
      '2 adet kuru soğan, 4 diş sarımsak',
      '1 kase buz küpü',
      '1 demet taze soğan, 1 demet maydanoz ve taze nane'
    ],
    steps: [
      'İsotu az miktar zeytinyağı ile ıslatıp rengini ve aromasını salması için 15 dakika bekletin.',
      'Bakır leğende kıyma, rendelenmiş soğan, sarımsak, tuz ve salçayı macun kıvamına gelene dek yoğurun.',
      'Esmer bulguru ve ıslatılmış isotu ekleyerek buz küpleri eşliğinde bulgur yumuşayana kadar yoğurun.',
      'İnce kıyılmış yeşillikleri ekleyip ezmeden harmanlayın ve avuç içinde sıkarak marul yapraklarıyla sunun.'
    ]
  },
  {
    id: 'sillik-tatlisi',
    title: 'Cevizli Şıllık Tatlısı',
    category: 'Tatlılar',
    prepTime: '20 dk',
    cookTime: '20 dk',
    difficulty: 'Kolay',
    servings: '6 Kişilik',
    featured: false,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80',
    tip: 'Krep hamurunun çok ince akıtılması ve şerbetin ılıkken dökülmesi tatlıyı hamurlaşmaktan kurtarır. Üzerine mutlaka kızdırılmış sade yağ gezdirilmelidir.',
    ingredients: [
      '2 su bardağı un, 2,5 su bardağı süt, 1 adet yumurta',
      '2 su bardağı iri çekilmiş ceviz içi',
      'Şerbeti için: 2,5 su bardağı şeker, 2 su bardağı su',
      'Üzeri için: 2 yemek kaşığı sade yağ ve Boz Antep fıstığı'
    ],
    steps: [
      'Un, süt ve yumurtayı pürüzsüz akışkan bir kıvam alana dek çırpın.',
      'Kızgın sacda veya yapışmaz tavada kağıt inceliğinde krepler pişirin.',
      'Tepsiye 3 kat krep dizip arasına bol ceviz serpin, kalan krepleri de aynı şekilde katlayın.',
      'Baklava dilimi şeklinde kesip ılık şerbeti üzerine gezdirin, kızgın sade yağ ve fıstıkla servis edin.'
    ]
  }
];

const PLACES = [
  {
    id: 'gobeklitepe',
    title: 'Göbeklitepe: Tarihin Sıfır Noktası',
    category: 'Arkeoloji',
    era: 'M.Ö. 9600 • 12.000 Yıllık',
    location: 'Örencik, Haliliye',
    image: 'https://images.unsplash.com/photo-1590059390047-f5e617b6cbc7?auto=format&fit=crop&w=900&q=80',
    summary: 'İnsanlık tarihinin bilinen en eski anıtsal tapınak kompleksi. Tarım devriminden önce inşa edilen T biçimli dikilitaşlar uygarlık tarihini yeniden yazdı.',
    story: 'Neolitik Çağ’a ait olan Göbeklitepe, avcı-toplayıcı toplulukların henüz yerleşik hayata ve tarıma geçmeden önce dahi devasa mimari organizasyonlar kurabildiğini kanıtladı. Boyları 6 metreyi bulan T şeklindeki kireçtaşı dikilitaşların üzerindeki tilki, yaban domuzu, turna ve yılan kabartmaları; dönemin inanç dünyasını ve sembolizmini günümüze taşır.',
    visitTip: 'Güneşin dikilitaşlar üzerindeki gölge oyunlarını görmek için gün doğumunda veya gün batımına 2 saat kala ziyaret etmeniz önerilir.'
  },
  {
    id: 'balikligol',
    title: 'Balıklıgöl (Halil-ür Rahman)',
    category: 'Mistik Tarih',
    era: 'Antik Dönem • Efsaneler Şehri',
    location: 'Eyyübiye Merkez',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
    summary: 'Hz. İbrahim’in ateşe atıldığı ve ateşin suya, odunların ise kutsal balıklara dönüştüğüne inanılan Urfa’nın kalbi.',
    story: 'Urfa Kalesi’nin hemen eteğinde yer alan Halil-ür Rahman ve Aynzeliha gölleri, üç semavi din için de derin bir manevi değere sahiptir. Tarihi taş revaklar, Rızvaniye Camii ve asırlık çınar ağaçlarıyla çevrili bu külliye, yüzyıllardır hem ibadet hem de huzur mekanı olarak yaşamaktadır.',
    visitTip: 'Sabah erken saatlerde göl çevresindeki tarihi çay bahçelerinde menengiç kahvesi içerek güne başlayabilirsiniz.'
  },
  {
    id: 'harran',
    title: 'Harran Kümbet Evleri & İlk Üniversite',
    category: 'Mimari & Bilim',
    era: 'M.Ö. 3000 • Antik Mezopotamya',
    location: 'Harran Ovası',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    summary: 'Bindirme taş tekniğiyle harçsız örülen konik kubbeli evleri ve İslam dünyasının ilk bilim merkezlerinden Harran Üniversitesi kalıntıları.',
    story: 'Kuzey Mezopotamya’nın en önemli ticaret ve bilim kavşaklarından biri olan Harran, antik harabelerden toplanan tuğlaların bindirme tekniğiyle örüldüğü konik kubbeli evleriyle ünlüdür. Bu mimari, yazın 45 dereceyi aşan sıcakta içeriyi serin, kışın ise sıcak tutan doğal bir iklimlendirme harikasıdır.',
    visitTip: 'Harran’a giderken yol üzerindeki Şuayip Antik Kenti ve Soğmatar Kültür Vadisi’ni de rotanıza ekleyebilirsiniz.'
  },
  {
    id: 'sira-gecesi',
    title: 'Kadim Sıra Gecesi Geleneği',
    category: 'Yaşayan Kültür',
    era: 'Asırlık Sosyal Meclis',
    location: 'Tarihi Urfa Konakları',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    summary: 'Sadece müzik ve eğlence değil; edebiyatın, toplumsal dayanışmanın, usta-çırak terbiyesinin ve çiğ köfte ikramının yaşatıldığı halk akademisi.',
    story: 'Urfa kültüründe Sıra Gecesi, kış gecelerinde dost meclislerinin sırayla birbirlerinin konaklarında toplanmasıyla doğmuştur. Hoyratların ve gazellerin okunduğu bu meclislerde gençler büyüklerden adap öğrenir, mahallenin sorunları çözülür ve gecenin sonunda ustalıkla yoğrulan çiğ köfte ile mırra kahvesi ikram edilir.',
    visitTip: 'Turistik şovlar yerine geleneksel Urfa konaklarında icra edilen akustik sıra gecelerini tercih edin.'
  }
];

const CATEGORIES = ['Tümü', 'Kebaplar', 'Tencere Yemekleri', 'Çiğ Köfte & Mezeler', 'Tatlılar'];

export default function IsotApp() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(['urfa-kebabi', 'gobeklitepe']);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('isot_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    const updated = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('isot_favorites', JSON.stringify(updated));
  };

  const handleShare = (title) => {
    if (navigator.share) {
      navigator.share({ title: `İsot — ${title}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(title);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredRecipes = RECIPES.filter(r => {
    const matchesCat = selectedCategory === 'Tümü' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredRecipe = RECIPES[0];

  if (selectedRecipe) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#FDFBF7] pb-12 shadow-2xl">
        <div className="relative h-72 w-full">
          <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#1A1A1A] shadow-lg active:scale-95 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => handleShare(selectedRecipe.title)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#1A1A1A] shadow-lg"
            >
              {copiedId === selectedRecipe.title ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={(e) => toggleFavorite(selectedRecipe.id, e)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedRecipe.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-700'}`} />
            </button>
          </div>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md bg-[#9E1B1B] text-[11px] font-bold tracking-wider uppercase mb-2">
              {selectedRecipe.category}
            </span>
            <h1 className="text-2xl font-bold leading-tight">{selectedRecipe.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 mx-4 -mt-4 relative z-10 bg-white rounded-2xl shadow-sm border border-[#D4A373]/30">
          <div className="text-center border-r border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium">Hazırlık</p>
            <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">{selectedRecipe.prepTime}</p>
          </div>
          <div className="text-center border-r border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium">Pişirme</p>
            <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">{selectedRecipe.cookTime}</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-gray-400 font-medium">Zorluk</p>
            <p className="text-sm font-bold text-[#9E1B1B] mt-0.5">{selectedRecipe.difficulty}</p>
          </div>
        </div>

        <div className="mx-4 mt-5 p-4 rounded-2xl bg-[#FFF8EB] border border-[#D4A373]">
          <div className="flex items-center gap-2 text-[#9E1B1B] font-bold text-sm mb-1.5">
            <Flame className="w-4 h-4 fill-[#9E1B1B]" />
            <span>İsot’un Mutfak Sırrı</span>
          </div>
          <p className="text-xs leading-relaxed text-[#4A3B32]">{selectedRecipe.tip}</p>
        </div>

        <div className="px-5 mt-6">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 flex items-center justify-between">
            <span>Gerekli Malzemeler</span>
            <span className="text-xs font-medium text-[#9E1B1B] bg-[#9E1B1B]/10 px-2.5 py-1 rounded-full">{selectedRecipe.servings}</span>
          </h2>
          <ul className="space-y-2.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            {selectedRecipe.ingredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-[#9E1B1B] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 mt-6">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Adım Adım Hazırlanışı</h2>
          <div className="space-y-4">
            {selectedRecipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-[#9E1B1B] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedPlace) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#FDFBF7] pb-12 shadow-2xl">
        <div className="relative h-80 w-full">
          <img src={selectedPlace.image} alt={selectedPlace.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <button
            onClick={() => setSelectedPlace(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#1A1A1A] shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => toggleFavorite(selectedPlace.id, e)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(selectedPlace.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-700'}`} />
          </button>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md bg-[#D4A373] text-[#1A1A1A] text-[11px] font-bold uppercase mb-2">
              {selectedPlace.era}
            </span>
            <h1 className="text-2xl font-display font-bold leading-snug">{selectedPlace.title}</h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-200 mt-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{selectedPlace.location}</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-base font-medium text-[#1A1A1A] leading-relaxed border-l-4 border-[#9E1B1B] pl-3.5">
            {selectedPlace.summary}
          </p>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#9E1B1B]">Tarihsel Derinlik & Hikaye</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{selectedPlace.story}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#D4A373]/60">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A] mb-1">
              <Sparkles className="w-4 h-4 text-[#9E1B1B]" />
              <span>Gezgin İpucu</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{selectedPlace.visitTip}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFBF7] pb-24 shadow-2xl relative">
      <header className="sticky top-0 z-30 bg-[#9E1B1B] text-white px-5 pt-5 pb-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#D4A373] fill-[#D4A373]" />
              <h1 className="text-2xl font-display font-bold tracking-wide">İSOT</h1>
            </div>
            <p className="text-[11px] text-white/85 tracking-wide mt-0.5">
              Tarihin Sıfır, Lezzetin Zirve Noktası
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm">
            Şanlıurfa
          </span>
        </div>

        {(activeTab === 'discover' || activeTab === 'recipes') && (
          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tarif, kebap veya malzeme ara..."
              className="w-full bg-white text-[#1A1A1A] placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none shadow-inner"
            />
          </div>
        )}
      </header>

      {activeTab === 'discover' && (
        <main className="px-4 pt-5 space-y-6">
          <div
            onClick={() => setSelectedRecipe(featuredRecipe)}
            className="relative h-60 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
          >
            <img
              src={featuredRecipe.image}
              alt={featuredRecipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <span className="absolute top-3.5 left-3.5 bg-[#9E1B1B] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
              Günün Lezzeti
            </span>
            <button
              onClick={(e) => toggleFavorite(featuredRecipe.id, e)}
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(featuredRecipe.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-700'}`} />
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs text-[#D4A373] font-semibold">{featuredRecipe.category} • {featuredRecipe.prepTime}</p>
              <h2 className="text-xl font-bold mt-0.5">{featuredRecipe.title}</h2>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1A1A1A] mb-2.5">Urfa Mutfağı Kategorileri</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-[#9E1B1B] text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#D4A373]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#1A1A1A]">Öne Çıkan Tarifler</h3>
              <button onClick={() => setActiveTab('recipes')} className="text-xs font-semibold text-[#9E1B1B]">
                Tümünü Gör
              </button>
            </div>
            <div className="space-y-3">
              {filteredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3.5 cursor-pointer active:scale-[0.99] transition"
                >
                  <img src={recipe.image} alt={recipe.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E1B1B]">
                      {recipe.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#1A1A1A] truncate mt-0.5">{recipe.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.prepTime}</span>
                      <span>• {recipe.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                    className="p-2 rounded-full hover:bg-gray-50"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-300'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#1A1A1A]">Tarihin Sıfır Noktasından</h3>
              <button onClick={() => setActiveTab('culture')} className="text-xs font-semibold text-[#9E1B1B]">
                Rehbere Git
              </button>
            </div>
            <div
              onClick={() => setSelectedPlace(PLACES[0])}
              className="bg-[#231916] text-white rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              <div className="h-36 relative">
                <img src={PLACES[0].image} alt={PLACES[0].title} className="w-full h-full object-cover opacity-85" />
                <span className="absolute bottom-2.5 left-3 bg-[#D4A373] text-[#1A1A1A] text-[10px] font-bold px-2.5 py-0.5 rounded">
                  {PLACES[0].era}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-base">{PLACES[0].title}</h4>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">{PLACES[0].summary}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === 'recipes' && (
        <main className="px-4 pt-5 space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#9E1B1B] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
              >
                <div className="h-44 relative">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(recipe.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-700'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#9E1B1B] uppercase">{recipe.category}</span>
                    <span className="text-gray-500 flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mt-1">{recipe.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{recipe.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeTab === 'culture' && (
        <main className="px-4 pt-5 space-y-4">
          <div className="bg-[#FFF8EB] border border-[#D4A373] p-4 rounded-2xl">
            <h2 className="font-display font-bold text-base text-[#9E1B1B]">12.000 Yıllık Miras</h2>
            <p className="text-xs text-gray-700 mt-1">
              Peygamberler şehri Edessa’dan insanlığın ilk tapınağı Göbeklitepe’ye uzanan kadim hikayeler.
            </p>
          </div>

          <div className="space-y-4">
            {PLACES.map(place => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
              >
                <div className="h-48 relative">
                  <img src={place.image} alt={place.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1A1A1A]/80 text-[#D4A373] text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {place.era}
                  </span>
                  <button
                    onClick={(e) => toggleFavorite(place.id, e)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(place.id) ? 'fill-[#9E1B1B] text-[#9E1B1B]' : 'text-gray-700'}`} />
                  </button>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-display font-bold text-lg leading-snug">{place.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{place.summary}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9E1B1B]" /> {place.location}
                    </span>
                    <span className="font-bold text-[#9E1B1B]">Hikayeyi Oku →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeTab === 'favorites' && (
        <main className="px-4 pt-5 space-y-4">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Kaydedilen Lezzetler & Mekanlar</h2>
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-6">
              <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">Henüz favori eklemediniz</p>
              <p className="text-xs text-gray-500 mt-1">Beğendiğiniz tarif ve tarihi mekanları kalp ikonuna basarak kaydedebilirsiniz.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {RECIPES.filter(r => favorites.includes(r.id)).map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3.5 cursor-pointer"
                >
                  <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[#9E1B1B] uppercase">Tarif • {recipe.category}</span>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{recipe.title}</h4>
                  </div>
                  <button onClick={(e) => toggleFavorite(recipe.id, e)} className="p-2">
                    <Heart className="w-5 h-5 fill-[#9E1B1B] text-[#9E1B1B]" />
                  </button>
                </div>
              ))}
              {PLACES.filter(p => favorites.includes(p.id)).map(place => (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3.5 cursor-pointer"
                >
                  <img src={place.image} alt={place.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[#D4A373] uppercase">Tarih & Kültür</span>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{place.title}</h4>
                  </div>
                  <button onClick={(e) => toggleFavorite(place.id, e)} className="p-2">
                    <Heart className="w-5 h-5 fill-[#9E1B1B] text-[#9E1B1B]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 flex justify-around items-center z-40">
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'discover' ? 'text-[#9E1B1B]' : 'text-gray-400'}`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Keşfet</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'recipes' ? 'text-[#9E1B1B]' : 'text-gray-400'}`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold">Urfa Mutfağı</span>
        </button>
        <button
          onClick={() => setActiveTab('culture')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'culture' ? 'text-[#9E1B1B]' : 'text-gray-400'}`}
        >
          <Landmark className="w-5 h-5" />
          <span className="text-[10px] font-bold">Kadim Urfa</span>
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'favorites' ? 'text-[#9E1B1B]' : 'text-gray-400'}`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-bold">Favoriler</span>
        </button>
      </nav>
    </div>
  );
}
