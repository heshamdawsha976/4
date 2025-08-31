// بيانات شاملة للدول والمناطق العربية مع التصنيفات الثقافية

export interface ArabCountry {
  id: string
  name: string
  nameEn: string
  flag: string
  region: string
  regionEn: string
  code: string
  population: number
  dialects: string[]
  culture: string[]
  timeZone: string
  currency: string
  popularTopics: string[]
  traditionalNames: string[]
  color: string
}

export interface ArabRegion {
  id: string
  name: string
  nameEn: string
  countries: string[]
  description: string
  culture: string[]
  dialect: string
  flag: string
  color: string
  roomCount: number
  activeUsers: number
}

// الدول العربية مصنفة بالتفصيل
export const ARAB_COUNTRIES: ArabCountry[] = [
  // دول الخليج العربي
  {
    id: "sa",
    name: "السعودية",
    nameEn: "Saudi Arabia",
    flag: "🇸🇦",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "SA",
    population: 35000000,
    dialects: ["خليجي", "حجازي", "نجدي"],
    culture: ["بدوية", "حضرية", "إسلامية"],
    timeZone: "Asia/Riyadh",
    currency: "ريال سعودي",
    popularTopics: ["الحج", "النفط", "التراث", "الصحراء", "الإبل"],
    traditionalNames: ["أبو تركي", "أم سلطان", "أبو فيصل"],
    color: "bg-green-100 text-green-700"
  },
  {
    id: "ae",
    name: "الإمارات",
    nameEn: "UAE",
    flag: "🇦🇪",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "AE",
    population: 10000000,
    dialects: ["خليجي", "إماراتي"],
    culture: ["تجارية", "حضرية", "متعددة الثقافات"],
    timeZone: "Asia/Dubai",
    currency: "درهم ��ماراتي",
    popularTopics: ["دبي", "التجارة", "التكنولوجيا", "السياحة"],
    traditionalNames: ["أبو راشد", "أم محمد", "أبو سالم"],
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "kw",
    name: "الكويت",
    nameEn: "Kuwait",
    flag: "🇰🇼",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "KW",
    population: 4500000,
    dialects: ["كويتي", "خليجي"],
    culture: ["بحرية", "تجارية", "قبلية"],
    timeZone: "Asia/Kuwait",
    currency: "دينار كويتي",
    popularTopics: ["الكويت", "النفط", "البحر", "التراث"],
    traditionalNames: ["أبو يوسف", "أم خالد", "أبو بدر"],
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    id: "qa",
    name: "قطر",
    nameEn: "Qatar",
    flag: "🇶🇦",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "QA",
    population: 3000000,
    dialects: ["قطري", "خليجي"],
    culture: ["رياضية", "ثقافية", "حديثة"],
    timeZone: "Asia/Qatar",
    currency: "ريال قطري",
    popularTopics: ["كأس العالم", "الر��اضة", "الثقافة"],
    traditionalNames: ["أبو حمد", "أم سعد", "أبو جاسم"],
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "bh",
    name: "البحرين",
    nameEn: "Bahrain",
    flag: "🇧🇭",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "BH",
    population: 1800000,
    dialects: ["بحريني", "خليجي"],
    culture: ["جزيرية", "تجارية", "لؤلؤية"],
    timeZone: "Asia/Bahrain",
    currency: "دينار بحريني",
    popularTopics: ["اللؤلؤ", "البحر", "التراث", "التجارة"],
    traditionalNames: ["أبو علي", "أم حسن", "أبو كريم"],
    color: "bg-red-100 text-red-700"
  },
  {
    id: "om",
    name: "عُمان",
    nameEn: "Oman",
    flag: "🇴🇲",
    region: "الخليج العربي",
    regionEn: "Arabian Gulf",
    code: "OM",
    population: 5500000,
    dialects: ["عماني", "خليجي"],
    culture: ["بحرية", "جبلية", "عريقة"],
    timeZone: "Asia/Muscat",
    currency: "ريال عماني",
    popularTopics: ["البحر", "الجبال", "اللبان", "التجارة"],
    traditionalNames: ["أبو س��يد", "أم سالم", "أبو هلال"],
    color: "bg-indigo-100 text-indigo-700"
  },

  // بلاد الشام
  {
    id: "sy",
    name: "سوريا",
    nameEn: "Syria",
    flag: "🇸🇾",
    region: "بلاد الشام",
    regionEn: "Levant",
    code: "SY",
    population: 22000000,
    dialects: ["شامي", "حلبي", "دمشقي"],
    culture: ["عريقة", "تجارية", "زراعية"],
    timeZone: "Asia/Damascus",
    currency: "ليرة سورية",
    popularTopics: ["دمشق", "حلب", "التاريخ", "الآثار"],
    traditionalNames: ["أبو محمد", "أم أحمد", "أبو عبدو"],
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "lb",
    name: "لبنان",
    nameEn: "Lebanon",
    flag: "🇱🇧",
    region: "بلاد الشام",
    regionEn: "Levant",
    code: "LB",
    population: 7000000,
    dialects: ["لبناني", "شامي"],
    culture: ["متوسطية", "تجارية", "ثقافية"],
    timeZone: "Asia/Beirut",
    currency: "ليرة لبنانية",
    popularTopics: ["بيروت", "الجبال", "البحر", "الأرز"],
    traditionalNames: ["أبو جورج", "أم أنطون", "أبو سمير"],
    color: "bg-green-100 text-green-700"
  },
  {
    id: "jo",
    name: "الأردن",
    nameEn: "Jordan",
    flag: "🇯🇴",
    region: "بلاد الشام",
    regionEn: "Levant",
    code: "JO",
    population: 11000000,
    dialects: ["أردني", "شامي"],
    culture: ["بدوية", "حضرية", "ضيافة"],
    timeZone: "Asia/Amman",
    currency: "دينار أردني",
    popularTopics: ["عمان", "البتراء", "الصحراء", "الضيافة"],
    traditionalNames: ["أبو عبدالله", "أم محمود", "أبو حسام"],
    color: "bg-red-100 text-red-700"
  },
  {
    id: "ps",
    name: "فلسطين",
    nameEn: "Palestine",
    flag: "🇵🇸",
    region: "بلاد الشام",
    regionEn: "Levant",
    code: "PS",
    population: 5000000,
    dialects: ["فلسطيني", "شامي"],
    culture: ["مقاومة", "زراعية", "عريقة"],
    timeZone: "Asia/Gaza",
    currency: "شيكل",
    popularTopics: ["القدس", "فلسطين", "الزيتون", "التراث"],
    traditionalNames: ["أبو خالد", "أم ياسر", "أبو عمر"],
    color: "bg-black text-white"
  },

  // المغرب العربي
  {
    id: "ma",
    name: "المغرب",
    nameEn: "Morocco",
    flag: "🇲🇦",
    region: "المغرب العربي",
    regionEn: "Maghreb",
    code: "MA",
    population: 37000000,
    dialects: ["مغربي", "دارجة"],
    culture: ["أندلسية", "أمازيغية", "إفريقية"],
    timeZone: "Africa/Casablanca",
    currency: "درهم مغربي",
    popularTopics: ["الرباط", "فاس", "التجارة", "الصحراء"],
    traditionalNames: ["سيدي محمد", "لالة فاطمة", "سيدي عبدالله"],
    color: "bg-red-100 text-red-700"
  },
  {
    id: "dz",
    name: "الجزائر",
    nameEn: "Algeria",
    flag: "🇩🇿",
    region: "المغرب العربي",
    regionEn: "Maghreb",
    code: "DZ",
    population: 45000000,
    dialects: ["جزائري", "دارجة"],
    culture: ["أمازيغية", "عربية", "متوسطية"],
    timeZone: "Africa/Algiers",
    currency: "دينار جزائري",
    popularTopics: ["الجزائر", "وهران", "قسنطينة", "الصحراء"],
    traditionalNames: ["سيدي أحمد", "لالة عائشة", "سيدي علي"],
    color: "bg-green-100 text-green-700"
  },
  {
    id: "tn",
    name: "تونس",
    nameEn: "Tunisia",
    flag: "🇹🇳",
    region: "المغرب العربي",
    regionEn: "Maghreb",
    code: "TN",
    population: 12000000,
    dialects: ["تونسي", "دارجة"],
    culture: ["قرطاجية", "أندلسية", "متوسطية"],
    timeZone: "Africa/Tunis",
    currency: "دينار تونسي",
    popularTopics: ["تونس", "قرطاج", "الزيتون", "البحر"],
    traditionalNames: ["سيدي محمد", "لالة زينب", "سيدي يوسف"],
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    id: "ly",
    name: "ليبيا",
    nameEn: "Libya",
    flag: "🇱🇾",
    region: "المغرب العربي",
    regionEn: "Maghreb",
    code: "LY",
    population: 7000000,
    dialects: ["ليبي", "دارجة"],
    culture: ["بدوية", "صحراوية", "متوسطية"],
    timeZone: "Africa/Tripoli",
    currency: "دينار ليبي",
    popularTopics: ["طرابلس", "بنغازي", "الصحراء", "النفط"],
    traditionalNames: ["سيدي عمر", "حاجة فاطمة", "سيدي إبراهيم"],
    color: "bg-purple-100 text-purple-700"
  },

  // وادي النيل
  {
    id: "eg",
    name: "مصر",
    nameEn: "Egypt",
    flag: "🇪🇬",
    region: "وادي النيل",
    regionEn: "Nile Valley",
    code: "EG",
    population: 104000000,
    dialects: ["مصري", "صعيدي", "إسكندراني"],
    culture: ["فرعونية", "إسلامية", "نيلية"],
    timeZone: "Africa/Cairo",
    currency: "جنيه مصري",
    popularTopics: ["القاهرة", "الإسكندرية", "النيل", "الأهرام"],
    traditionalNames: ["أبو أحمد", "أم محمد", "عم السيد"],
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    id: "sd",
    name: "السودان",
    nameEn: "Sudan",
    flag: "🇸🇩",
    region: "وادي النيل",
    regionEn: "Nile Valley",
    code: "SD",
    population: 45000000,
    dialects: ["سوداني", "نيلي"],
    culture: ["نوبية", "عربية", "إفريقية"],
    timeZone: "Africa/Khartoum",
    currency: "جنيه سوداني",
    popularTopics: ["الخرطوم", "النيل", "النوبة", "الصحراء"],
    traditionalNames: ["عم عبدالله", "خالتو فاطمة", "عم الطيب"],
    color: "bg-blue-100 text-blue-700"
  },

  // العراق
  {
    id: "iq",
    name: "العراق",
    nameEn: "Iraq",
    flag: "🇮🇶",
    region: "العراق",
    regionEn: "Iraq",
    code: "IQ",
    population: 41000000,
    dialects: ["عراقي", "بغدادي", "موصلي", "بصراوي"],
    culture: ["رافدينية", "بابلية", "آشورية"],
    timeZone: "Asia/Baghdad",
    currency: "دينار عراقي",
    popularTopics: ["بغداد", "البصرة", "الموصل", "دجلة والفرات"],
    traditionalNames: ["أبو علي", "أم حسين", "عمو جاسم"],
    color: "bg-purple-100 text-purple-700"
  },

  // اليمن
  {
    id: "ye",
    name: "اليمن",
    nameEn: "Yemen",
    flag: "🇾🇪",
    region: "اليمن",
    regionEn: "Yemen",
    code: "YE",
    population: 30000000,
    dialects: ["يمني", "صنعاني", "عدني"],
    culture: ["يمنية", "سبئية", "حميرية"],
    timeZone: "Asia/Aden",
    currency: "ريال يمني",
    popularTopics: ["صنعاء", "عدن", "حضرموت", "البن"],
    traditionalNames: ["أبو يحيى", "أم سالم", "عم عبدالله"],
    color: "bg-green-100 text-green-700"
  }
]

// المناطق العربية الرئيسية
export const ARAB_REGIONS: ArabRegion[] = [
  {
    id: "gulf",
    name: "الخليج العربي",
    nameEn: "Arabian Gulf",
    countries: ["sa", "ae", "kw", "qa", "bh", "om"],
    description: "منطقة الخليج العربي الغنية بالنفط والتراث البدوي",
    culture: ["بدوية", "بحرية", "تجارية", "نفطية"],
    dialect: "خليجي",
    flag: "🏖️",
    color: "bg-green-100 text-green-700",
    roomCount: 78,
    activeUsers: 1200
  },
  {
    id: "levant",
    name: "بلاد الشام",
    nameEn: "Levant",
    countries: ["sy", "lb", "jo", "ps"],
    description: "مهد الحضارات والثقافة العربية العريقة",
    culture: ["عريقة", "تجارية", "زراعية", "ثقافية"],
    dialect: "شامي",
    flag: "🏛️",
    color: "bg-blue-100 text-blue-700",
    roomCount: 45,
    activeUsers: 890
  },
  {
    id: "maghreb",
    name: "المغرب العربي",
    nameEn: "Maghreb",
    countries: ["ma", "dz", "tn", "ly"],
    description: "منطقة المغرب العربي بتنوعها الثقافي والحضاري",
    culture: ["أمازيغية", "أندلسية", "صحراوية", "متوسطية"],
    dialect: "مغاربي",
    flag: "🌅",
    color: "bg-red-100 text-red-700",
    roomCount: 52,
    activeUsers: 760
  },
  {
    id: "nile",
    name: "وادي النيل",
    nameEn: "Nile Valley",
    countries: ["eg", "sd"],
    description: "حضارة النيل العريقة وأم الدنيا",
    culture: ["فرعونية", "نوبية", "نيلية", "إسلامية"],
    dialect: "مصري/سوداني",
    flag: "🏺",
    color: "bg-yellow-100 text-yellow-700",
    roomCount: 89,
    activeUsers: 1450
  },
  {
    id: "iraq",
    name: "العراق",
    nameEn: "Iraq",
    countries: ["iq"],
    description: "أرض الرافدين ومهد الحضارة",
    culture: ["رافدينية", "بابلية", "عباسية", "شعرية"],
    dialect: "عراقي",
    flag: "🏛️",
    color: "bg-purple-100 text-purple-700",
    roomCount: 34,
    activeUsers: 520
  },
  {
    id: "yemen",
    name: "اليمن",
    nameEn: "Yemen",
    countries: ["ye"],
    description: "اليمن السعيد موطن الحكمة والقهوة",
    culture: ["يمنية عريقة", "سبئية", "حضرموت", "قهوة"],
    dialect: "يمني",
    flag: "☕",
    color: "bg-amber-100 text-amber-700",
    roomCount: 23,
    activeUsers: 380
  }
]

// دالة للحصول على بيانات دولة
export function getCountryById(id: string): ArabCountry | undefined {
  return ARAB_COUNTRIES.find(country => country.id === id)
}

// دالة للحصول على بيانات منطقة
export function getRegionById(id: string): ArabRegion | undefined {
  return ARAB_REGIONS.find(region => region.id === id)
}

// دالة للحصول على دول منطقة معينة
export function getCountriesByRegion(regionId: string): ArabCountry[] {
  const region = getRegionById(regionId)
  if (!region) return []
  
  return ARAB_COUNTRIES.filter(country => 
    region.countries.includes(country.id)
  )
}

// دالة للحصول على الأسماء التقليدية لدولة
export function getTraditionalNames(countryId: string): string[] {
  const country = getCountryById(countryId)
  return country?.traditionalNames || []
}

// دالة للبحث في الدول
export function searchCountries(query: string): ArabCountry[] {
  const lowerQuery = query.toLowerCase()
  return ARAB_COUNTRIES.filter(country => 
    country.name.includes(query) ||
    country.nameEn.toLowerCase().includes(lowerQuery) ||
    country.dialects.some(dialect => dialect.includes(query)) ||
    country.popularTopics.some(topic => topic.includes(query))
  )
}

// إحصائيات عامة
export const ARAB_WORLD_STATS = {
  totalCountries: ARAB_COUNTRIES.length,
  totalRegions: ARAB_REGIONS.length,
  totalPopulation: ARAB_COUNTRIES.reduce((sum, country) => sum + country.population, 0),
  totalRooms: ARAB_REGIONS.reduce((sum, region) => sum + region.roomCount, 0),
  totalActiveUsers: ARAB_REGIONS.reduce((sum, region) => sum + region.activeUsers, 0)
}
