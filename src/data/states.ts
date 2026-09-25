export const states = [
  { id: "andhra-pradesh", name: "Andhra Pradesh", hi: "आंध्र प्रदेश" },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", hi: "अरुणाचल प्रदेश" },
  { id: "assam", name: "Assam", hi: "असम" },
  { id: "bihar", name: "Bihar", hi: "बिहार" },
  { id: "chhattisgarh", name: "Chhattisgarh", hi: "छत्तीसगढ़" },
  { id: "goa", name: "Goa", hi: "गोवा" },
  { id: "gujarat", name: "Gujarat", hi: "गुजरात" },
  { id: "haryana", name: "Haryana", hi: "हरियाणा" },
  { id: "himachal-pradesh", name: "Himachal Pradesh", hi: "हिमाचल प्रदेश" },
  { id: "jharkhand", name: "Jharkhand", hi: "झारखंड" },
  { id: "karnataka", name: "Karnataka", hi: "कर्नाटक" },
  { id: "kerala", name: "Kerala", hi: "केरल" },
  { id: "madhya-pradesh", name: "Madhya Pradesh", hi: "मध्य प्रदेश" },
  { id: "maharashtra", name: "Maharashtra", hi: "महाराष्ट्र" },
  { id: "manipur", name: "Manipur", hi: "मणिपुर" },
  { id: "meghalaya", name: "Meghalaya", hi: "मेघालय" },
  { id: "mizoram", name: "Mizoram", hi: "मिजोरम" },
  { id: "nagaland", name: "Nagaland", hi: "नागालैंड" },
  { id: "odisha", name: "Odisha", hi: "ओडिशा" },
  { id: "punjab", name: "Punjab", hi: "पंजाब" },
  { id: "rajasthan", name: "Rajasthan", hi: "राजस्थान" },
  { id: "sikkim", name: "Sikkim", hi: "सिक्किम" },
  { id: "tamil-nadu", name: "Tamil Nadu", hi: "तमिलनाडु" },
  { id: "telangana", name: "Telangana", hi: "तेलंगाना" },
  { id: "tripura", name: "Tripura", hi: "त्रिपुरा" },
  { id: "uttar-pradesh", name: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  { id: "uttarakhand", name: "Uttarakhand", hi: "उत्तराखंड" },
  { id: "west-bengal", name: "West Bengal", hi: "पश्चिम बंगाल" },
  { id: "andaman-nicobar", name: "Andaman and Nicobar Islands", hi: "अंडमान और निकोबार द्वीप समूह" },
  { id: "chandigarh", name: "Chandigarh", hi: "चंडीगढ़" },
  {
    id: "dadra-nagar-haveli-daman-diu",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    hi: "दादरा और नगर हवेली और दमन और दीव",
  },
  { id: "delhi", name: "Delhi", hi: "दिल्ली" },
  { id: "jammu-kashmir", name: "Jammu and Kashmir", hi: "जम्मू और कश्मीर" },
  { id: "ladakh", name: "Ladakh", hi: "लद्दाख" },
  { id: "lakshadweep", name: "Lakshadweep", hi: "लक्षद्वीप" },
  { id: "puducherry", name: "Puducherry", hi: "पुदुच्चेरी" },
] as const

export type StateId = (typeof states)[number]["id"]

export const northEastStates: StateId[] = [
  "arunachal-pradesh",
  "assam",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "sikkim",
  "tripura",
]

export const cropResidueStates: StateId[] = [
  "punjab",
  "haryana",
  "uttar-pradesh",
  "delhi",
]

export function stateName(id: string, lang: "en" | "hi" = "en") {
  const state = states.find((item) => item.id === id)
  if (!state) return id
  return lang === "hi" ? state.hi : state.name
}
