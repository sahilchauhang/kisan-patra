export const states = [
  { id: "andhra-pradesh", name: "Andhra Pradesh" },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh" },
  { id: "assam", name: "Assam" },
  { id: "bihar", name: "Bihar" },
  { id: "chhattisgarh", name: "Chhattisgarh" },
  { id: "goa", name: "Goa" },
  { id: "gujarat", name: "Gujarat" },
  { id: "haryana", name: "Haryana" },
  { id: "himachal-pradesh", name: "Himachal Pradesh" },
  { id: "jharkhand", name: "Jharkhand" },
  { id: "karnataka", name: "Karnataka" },
  { id: "kerala", name: "Kerala" },
  { id: "madhya-pradesh", name: "Madhya Pradesh" },
  { id: "maharashtra", name: "Maharashtra" },
  { id: "manipur", name: "Manipur" },
  { id: "meghalaya", name: "Meghalaya" },
  { id: "mizoram", name: "Mizoram" },
  { id: "nagaland", name: "Nagaland" },
  { id: "odisha", name: "Odisha" },
  { id: "punjab", name: "Punjab" },
  { id: "rajasthan", name: "Rajasthan" },
  { id: "sikkim", name: "Sikkim" },
  { id: "tamil-nadu", name: "Tamil Nadu" },
  { id: "telangana", name: "Telangana" },
  { id: "tripura", name: "Tripura" },
  { id: "uttar-pradesh", name: "Uttar Pradesh" },
  { id: "uttarakhand", name: "Uttarakhand" },
  { id: "west-bengal", name: "West Bengal" },
  { id: "andaman-nicobar", name: "Andaman and Nicobar Islands" },
  { id: "chandigarh", name: "Chandigarh" },
  { id: "dadra-nagar-haveli-daman-diu", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { id: "delhi", name: "Delhi" },
  { id: "jammu-kashmir", name: "Jammu and Kashmir" },
  { id: "ladakh", name: "Ladakh" },
  { id: "lakshadweep", name: "Lakshadweep" },
  { id: "puducherry", name: "Puducherry" },
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

export function stateName(id: string) {
  return states.find((state) => state.id === id)?.name ?? id
}
