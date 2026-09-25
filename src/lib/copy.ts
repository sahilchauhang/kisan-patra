import type { Lang } from "@/lib/language"

const en = {
  brandTag: "Farmer scheme register",
  navRegister: "The register",
  navFinder: "What fits me",
  navSources: "Sources",
  openMenu: "Open menu",
  footerBlurb:
    "An independent register of central schemes and subsidies for Indian farmers. Not a Government of India website. Check the official portal before you apply, pay a fee, or share documents.",
  footerBrowse: "Browse the register",
  footerFit: "See what may fit",
  footerSources: "Sources and how to read a scheme",
  footerState: "State schemes on myScheme",
  homeEyebrow: "India · Independent register",
  homeTitle: "Every central farmer scheme, on one desk.",
  homeLead: (ministry: number, allied: number) =>
    `Kisan Patra lists the ${ministry} programmes the Ministry of Agriculture named in Parliament on 3 February 2026, plus ${allied} allied schemes farmers actually use for loans, fish, livestock, food processing, and solar pumps.`,
  homeFit: "See what may fit me",
  homeBrowse: "Browse the full register",
  homeStart: "Start with these three",
  homeOwn: "Own land?",
  homeOwnBody:
    "PM-KISAN pays ₹6,000 a year in three instalments, if the land record is in the family name.",
  homeSeason: "Worried about the season?",
  homeSeasonBody:
    "PMFBY caps your premium. Your state has to have opted in, and you must enrol before the cut-off.",
  homeSeed: "Need money for seed?",
  homeSeedBody:
    "A Kisan Credit Card is the loan. Interest relief sits on top of it. Ask the bank for the prompt-repayment date.",
  statMinistry: "schemes in the ministry’s parliamentary list",
  statAllied: "allied programmes from other departments",
  statPlace: "place to read eligibility, papers, and the official link",
  homeByWork: "By the work it supports",
  schemeCount: (count: number) => (count === 1 ? "1 scheme" : `${count} schemes`),
  homeFeatured: "Often the first ones people need",
  homeFeaturedBody:
    "These are the schemes with a personal application and a number you can check. Haryana’s own schemes are in the register. Other states are not loaded yet.",
  searchLabel: "Search schemes",
  searchPlaceholder: "Try PM-KISAN, drip, honey, pension, solar pump",
  searchButton: "Search",
  registerEyebrow: (count: number) => `${count} entries`,
  registerTitle: "The register",
  registerLead:
    "Search by scheme, crop, or need. Each page has the benefit, who can apply, the papers, and the official link.",
  all: "All",
  emptyTitle: "Nothing matches that search.",
  emptyBody:
    "Try a shorter word — Kisan, drip, honey, pension, fish — or clear the category.",
  emptyHaryana:
    "Nothing in the Haryana list matches. Try registration, paddy, cotton, or switch back to All India.",
  clearSearch: "Clear search",
  showing: (count: number, q: string) =>
    `Showing ${count} ${count === 1 ? "scheme" : "schemes"}${q ? ` for “${q}”` : ""}.`,
  listMinistry: "Ministry list",
  listAllied: "Allied programme",
  listPlatform: "Trading platform",
  crumbRegister: "Register",
  openOfficial: (label: string) => `Open ${label}`,
  whatYouGet: "What you get",
  whoCanApply: "Who can apply",
  papers: "Papers to keep ready",
  howToApply: "How to apply",
  beforePay: "Before you pay anyone",
  rateNote:
    "Rates, crops, and state participation change. The official page is the one that counts.",
  nearby: "Nearby in the register",
  listNote: {
    "ministry-2026":
      "Named in the Ministry of Agriculture & Farmers Welfare list tabled in the Lok Sabha on 3 February 2026.",
    allied:
      "Run by another department. Farmers use it, but it was not in that agriculture-ministry annexure.",
    platform:
      "The trading platform inside the Integrated Scheme for Agricultural Marketing. Listed on its own because farmers search for it by name.",
    state:
      "A Haryana government scheme. The amount and the last date for the season are on the state portal.",
  },
  finderEyebrow: "A shortlist, not a sanction",
  finderTitle: "Which schemes may fit your farm?",
  finderLead:
    "Tell us about the land, your age, and the work. We will hide schemes that clearly do not apply, and we will say when the money goes to a group or a state office instead of you.",
  stateLabel: "State or Union Territory",
  statePlaceholder: "Choose a state",
  notSure: "Not sure",
  land: "Land",
  landOwner: "I own cultivable land",
  landTenant: "I farm land I do not own",
  landNone: "I do not cultivate a field",
  landUnsure: "I am not sure about the land record",
  holding: "Holding size",
  holdingSmall: "2 hectares or less",
  holdingLarger: "More than 2 hectares",
  holdingUnsure: "I do not know the area",
  age: "Age",
  ageUnder: "Under 18",
  ageYoung: "18 to 40",
  ageMid: "41 to 59",
  ageOld: "60 or older",
  shg: "I am a woman in a self-help group, or our SHG is looking for a scheme.",
  work: "What do you work on?",
  workHint: "Leave this blank to see the schemes most farm families start with.",
  showSchemes: "Show schemes",
  shortlistTitle: "Your shortlist will land here.",
  shortlistBody:
    "Answer the questions and press show schemes. You will get three piles: apply yourself, apply as a group, and ask the state office.",
  noneTitle: "Nothing in the register matched.",
  noneBody:
    "That can happen if the only schemes for this work are limited to another state, or if land ownership rules you out. Browse the full register, or change an answer.",
  openRegister: "Open the full register",
  mayFit: (count: number) =>
    `${count} schemes may fit. Read the page before you apply. A match is not an entitlement.`,
  bandApply: "Apply yourself",
  bandApplyEmpty: "No personal application stood out. Look at the group and state piles.",
  bandGroup: "Through a group or a business",
  bandGroupEmpty: "No group scheme matched the work you selected.",
  bandState: "Ask the state agriculture office",
  bandStateEmpty: "No state-run scheme matched.",
  aboutEyebrow: "How to read this register",
  aboutTitle: "Sources",
  aboutLead:
    "A scheme page is a briefing, written so you can walk into a bank or a Common Service Centre knowing what to ask. It is not the guideline, and it is not a promise that you will be paid.",
  primaryPages: "Primary pages",
  links: {
    pib: "Lok Sabha reply, 3 February 2026, listing the agriculture schemes",
    ministry: "Department of Agriculture & Farmers Welfare",
    pmkisan: "PM-KISAN",
    pmfby: "PM Fasal Bima Yojana",
    cabinet: "Cabinet continuation of the interest subvention scheme, 28 May 2025",
    haryana: "Meri Fasal Mera Byora, the Haryana crop register",
    myscheme: "myScheme, for states that are not loaded here yet",
  },
  missingEyebrow: "Missing page",
  missingTitle: "That page is not in the register.",
  missingBody:
    "The scheme may have been renamed, or the address is wrong. Search the register by the name you know.",
  missingBack: "Back to the register",
  reasons: {
    overlap: "It lines up with the work you selected.",
    coreGeneral: "A general scheme, still worth checking alongside the specialist ones.",
    core: "One of the schemes most farm families should look at first.",
    owner: "You own cultivable land, which this scheme asks for.",
    cultivator: "You cultivate a crop, including as a tenant where the scheme allows it.",
    unsureLand: "You were unsure about the land record. Confirm that before you apply.",
    small: "Your holding is within 2 hectares, which this pension requires.",
    age: "Your age is inside the window for joining.",
    shg: "You are in a women self-help group, which is who this selects.",
    state: (name: string) => `It runs in ${name}.`,
    group: "The money goes to a group or a project, not as a personal instalment.",
    startup: "This is for a business or a processing unit, not a seasonal crop loan.",
    throughState: "The state opens this. There may be no personal form on a national portal.",
    open: "It is open for the situation you described.",
  },
  placeLabel: "Which government",
  placeCentre: "All India",
  placeHaryana: "Haryana",
  placeLead:
    "All India is the central list. Haryana is the first state list. Other states are not loaded yet.",
  haryanaTitle: "Haryana’s own schemes",
  haryanaBody:
    "Register the crop on Meri Fasal Mera Byora before you expect a state incentive. The amount and the last date are on that portal for the season.",
  haryanaLink: "Open Haryana schemes",
  faqs: [
    {
      id: "official",
      q: "Is this a government website?",
      a: "No. Kisan Patra is an independent reading desk. Applications, payments, and corrections happen only on the official portal or at the bank, the mandi, or the district office named on each scheme.",
    },
    {
      id: "list",
      q: "Where does the list come from?",
      a: "The 28 agriculture schemes are the annexure the Minister of State for Agriculture and Farmers Welfare gave in a written Lok Sabha reply on 3 February 2026 (PIB release PRID 2222801). The 9 allied entries — Kisan Credit Card, PM-KUSUM, fisheries, livestock, food processing, RKVY, and crop residue machines — come from the departments that run them. e-NAM is called out separately because it sits inside the marketing scheme and farmers search for it by name.",
    },
    {
      id: "states",
      q: "Where are the state schemes?",
      a: "Haryana is the first state in the register: crop registration, the paddy-diversion incentive, direct seeding, price-difference payment for horticulture, and the farm-accident assistance. Other states are not loaded yet. For those, use myScheme and confirm with the state agriculture department, because state schemes change when governments change.",
    },
    {
      id: "numbers",
      q: "Can I rely on the rupee figures?",
      a: "The well-known ones are tied to a public source: ₹6,000 under PM-KISAN, the PMFBY premium caps, the ₹3,000 PM-KMY pension, the MISS rate as continued for 2025–26, the FPO ceilings in the February 2026 reply, the Namo Drone Didi cap, the AgriSURE corpus, and the PMFME 35% cap. Machine and drip percentages move with guidelines and state top-ups, so those pages tell you to confirm the current rate instead of printing a number that may already be old.",
    },
    {
      id: "miss",
      q: "Why does the loan page say ₹3 lakh if the Budget said ₹5 lakh?",
      a: "Budget 2025–26 announced a higher ceiling under the Modified Interest Subvention Scheme. The Union Cabinet continuation for 2025–26, and the Reserve Bank’s operational circular for that year, kept the interest benefit at ₹3 lakh overall and ₹2 lakh when the loan is only for animals, fish, or bees. Ask the bank which ceiling is on your sanction letter.",
    },
  ],
}

const hi: typeof en = {
  brandTag: "किसान योजना पंजिका",
  navRegister: "पंजिका",
  navFinder: "क्या मेरे काम की है",
  navSources: "स्रोत",
  openMenu: "मेनू खोलें",
  footerBlurb:
    "भारतीय किसानों के लिए केंद्र की योजनाओं और सब्सिडी की स्वतंत्र पंजिका। यह भारत सरकार की वेबसाइट नहीं है। आवेदन करने, शुल्क देने या कागज़ साझा करने से पहले आधिकारिक पोर्टल देख लें।",
  footerBrowse: "पूरी पंजिका देखें",
  footerFit: "देखें क्या आपके काम की है",
  footerSources: "स्रोत और योजना कैसे पढ़ें",
  footerState: "राज्य की योजनाएँ myScheme पर",
  homeEyebrow: "भारत · स्वतंत्र पंजिका",
  homeTitle: "केंद्र की हर किसान योजना, एक ही जगह।",
  homeLead: (ministry, allied) =>
    `किसान पत्र में वे ${ministry} कार्यक्रम हैं जिन्हें कृषि मंत्रालय ने 3 फरवरी 2026 को संसद में बताया, और ${allied} सहायक योजनाएँ जिनका किसान ऋण, मछली, पशु, खाद्य प्रसंस्करण और सोलर पंप के लिए सच में इस्तेमाल करते हैं।`,
  homeFit: "देखें क्या मेरे काम की है",
  homeBrowse: "पूरी पंजिका देखें",
  homeStart: "इन तीन से शुरुआत करें",
  homeOwn: "ज़मीन अपने नाम है?",
  homeOwnBody:
    "पीएम-किसान साल में ₹6,000 तीन किस्तों में देता है, अगर ज़मीन का रिकॉर्ड परिवार के नाम हो।",
  homeSeason: "मौसम की चिंता है?",
  homeSeasonBody:
    "पीएमएफबीवाई में आपका प्रीमियम सीमित है। आपका राज्य उस मौसम में शामिल हो, और अंतिम तारीख से पहले नाम लिखवाना ज़रूरी है।",
  homeSeed: "बीज के लिए पैसा चाहिए?",
  homeSeedBody:
    "कर्ज़ किसान क्रेडिट कार्ड पर मिलता है। ब्याज में छूट उसी पर लगती है। समय पर चुकाने की तारीख बैंक से पूछ लें।",
  statMinistry: "योजनाएँ, मंत्रालय की संसदीय सूची में",
  statAllied: "दूसरे विभागों की सहायक योजनाएँ",
  statPlace: "जगह, जहाँ पात्रता, कागज़ और आधिकारिक लिंक एक साथ हैं",
  homeByWork: "काम के हिसाब से",
  schemeCount: (count) => (count === 1 ? "1 योजना" : `${count} योजनाएँ`),
  homeFeatured: "ज़्यादातर लोग पहले इन्हें देखते हैं",
  homeFeaturedBody:
    "इनमें खुद आवेदन होता है और रकम जाँची जा सकती है। हरियाणा की अपनी योजनाएँ पंजिका में हैं। बाकी राज्य अभी जोड़े नहीं गए।",
  searchLabel: "योजना खोजें",
  searchPlaceholder: "पीएम-किसान, ड्रिप, शहद, पेंशन, सोलर पंप",
  searchButton: "खोजें",
  registerEyebrow: (count) => `${count} प्रविष्टियाँ`,
  registerTitle: "पंजिका",
  registerLead:
    "योजना, फसल या ज़रूरत से खोजें। हर पन्ने पर लाभ, कौन आवेदन कर सकता है, कागज़ और आधिकारिक लिंक है।",
  all: "सभी",
  emptyTitle: "इस खोज से कुछ नहीं मिला।",
  emptyBody:
    "छोटा शब्द आज़माएँ — किसान, ड्रिप, शहद, पेंशन, मछली — या श्रेणी हटा दें।",
  emptyHaryana:
    "हरियाणा की सूची में यह नहीं मिला। पंजीकरण, धान, कपास आज़माएँ, या पूरा देश वाली सूची खोलें।",
  clearSearch: "खोज मिटाएँ",
  showing: (count, q) =>
    `${count} ${count === 1 ? "योजना" : "योजनाएँ"} दिख रही हैं${q ? ` — “${q}”` : ""}।`,
  listMinistry: "मंत्रालय की सूची",
  listAllied: "सहायक योजना",
  listPlatform: "ट्रेडिंग पोर्टल",
  crumbRegister: "पंजिका",
  openOfficial: (label) => `${label} खोलें`,
  whatYouGet: "क्या मिलता है",
  whoCanApply: "कौन आवेदन कर सकता है",
  papers: "कौन से कागज़ रखें",
  howToApply: "आवेदन कैसे करें",
  beforePay: "किसी को पैसे देने से पहले",
  rateNote:
    "दर, फसल और राज्य की भागीदारी बदलती रहती है। आधिकारिक पन्ना ही मान्य है।",
  nearby: "इसी तरह की योजनाएँ",
  listNote: {
    "ministry-2026":
      "3 फरवरी 2026 को लोकसभा में रखी गई कृषि एवं किसान कल्याण मंत्रालय की सूची में नाम है।",
    allied:
      "यह दूसरा विभाग चलाता है। किसान इसका इस्तेमाल करते हैं, पर यह उस कृषि-मंत्रालय की सूची में नहीं था।",
    platform:
      "एकीकृत कृषि विपणन योजना के अंदर का ट्रेडिंग पोर्टल। किसान इसे नाम से खोजते हैं, इसलिए अलग दिया गया है।",
    state:
      "हरियाणा सरकार की योजना। रकम और इस मौसम की अंतिम तारीख राज्य के पोर्टल पर है।",
  },
  finderEyebrow: "सूची सुझाव है, मंज़ूरी नहीं",
  finderTitle: "आपके खेत के लिए कौन सी योजना बन सकती है?",
  finderLead:
    "ज़मीन, उम्र और काम बताएँ। जो योजना साफ़ तौर पर नहीं बनती, उसे हटा देंगे। यह भी लिखेंगे कि पैसा आपको मिलता है, समूह को, या राज्य दफ़्तर से।",
  stateLabel: "राज्य या केंद्र शासित प्रदेश",
  statePlaceholder: "राज्य चुनें",
  notSure: "पता नहीं",
  land: "ज़मीन",
  landOwner: "खेती की ज़मीन मेरे नाम है",
  landTenant: "मैं दूसरे की ज़मीन जोतता हूँ",
  landNone: "मैं खेत नहीं जोतता",
  landUnsure: "ज़मीन के रिकॉर्ड के बारे में पक्का नहीं हूँ",
  holding: "ज़मीन का रकबा",
  holdingSmall: "2 हेक्टेयर या उससे कम",
  holdingLarger: "2 हेक्टेयर से ज़्यादा",
  holdingUnsure: "रकबा पता नहीं",
  age: "उम्र",
  ageUnder: "18 से कम",
  ageYoung: "18 से 40",
  ageMid: "41 से 59",
  ageOld: "60 या उससे ज़्यादा",
  shg: "मैं महिला स्वयं सहायता समूह में हूँ, या हमारा समूह योजना ढूँढ रहा है।",
  work: "आप क्या काम करते हैं?",
  workHint: "खाली छोड़ें तो वे योजनाएँ दिखेंगी जिनसे ज़्यादातर किसान परिवार शुरुआत करते हैं।",
  showSchemes: "योजनाएँ दिखाएँ",
  shortlistTitle: "आपकी छोटी सूची यहाँ आएगी।",
  shortlistBody:
    "सवाल भरें और योजनाएँ दिखाएँ दबाएँ। तीन ढेर मिलेंगे: खुद आवेदन, समूह से, और राज्य दफ़्तर से।",
  noneTitle: "पंजिका में कोई मेल नहीं बैठा।",
  noneBody:
    "ऐसा तब होता है जब वह काम दूसरे राज्य तक सीमित हो, या ज़मीन के मालिकाना हक़ की शर्त पूरी न हो। पूरी पंजिका देखें, या जवाब बदलें।",
  openRegister: "पूरी पंजिका खोलें",
  mayFit: (count) =>
    `${count} योजनाएँ बन सकती हैं। आवेदन से पहले पन्ना पढ़ें। मेल का मतलब हक नहीं है।`,
  bandApply: "खुद आवेदन करें",
  bandApplyEmpty: "व्यक्तिगत आवेदन अलग से नहीं दिखा। समूह और राज्य वाले ढेर देखें।",
  bandGroup: "समूह या कारोबार के ज़रिए",
  bandGroupEmpty: "आपके चुने काम से कोई समूह योजना नहीं मिली।",
  bandState: "राज्य कृषि दफ़्तर से पूछें",
  bandStateEmpty: "कोई राज्य-संचालित योजना नहीं मिली।",
  aboutEyebrow: "यह पंजिका कैसे पढ़ें",
  aboutTitle: "स्रोत",
  aboutLead:
    "योजना का पन्ना एक ब्रीफिंग है, ताकि बैंक या कॉमन सर्विस सेंटर में आप जानें क्या पूछना है। यह दिशा-निर्देश नहीं है, और यह वादा नहीं कि पैसा मिलेगा।",
  primaryPages: "मुख्य पन्ने",
  links: {
    pib: "लोकसभा का जवाब, 3 फरवरी 2026, कृषि योजनाओं की सूची",
    ministry: "कृषि एवं किसान कल्याण विभाग",
    pmkisan: "पीएम-किसान",
    pmfby: "प्रधानमंत्री फसल बीमा योजना",
    cabinet: "ब्याज सहायता योजना को जारी रखने का कैबिनेट फैसला, 28 मई 2025",
    haryana: "मेरी फसल मेरा ब्योरा, हरियाणा का फसल पंजीकरण",
    myscheme: "myScheme, जिन राज्यों की सूची यहाँ अभी नहीं है",
  },
  missingEyebrow: "पन्ना नहीं मिला",
  missingTitle: "यह पन्ना पंजिका में नहीं है।",
  missingBody:
    "योजना का नाम बदला हो सकता है, या पता ग़लत है। जिस नाम से जानते हैं, उससे खोजें।",
  missingBack: "पंजिका पर वापस",
  reasons: {
    overlap: "यह आपके चुने हुए काम से मेल खाती है।",
    coreGeneral: "आम योजना है। खास योजनाओं के साथ इसे भी देख लें।",
    core: "ज़्यादातर किसान परिवारों को पहले यही देखनी चाहिए।",
    owner: "खेती की ज़मीन आपके नाम है, और यह योजना यही माँगती है।",
    cultivator: "आप फसल उगाते हैं। जहाँ योजना अनुमति दे, वहाँ बटाईदार भी आ सकता है।",
    unsureLand: "ज़मीन के रिकॉर्ड पर आप पक्के नहीं थे। आवेदन से पहले जाँच लें।",
    small: "आपका रकबा 2 हेक्टेयर के अंदर है, जो इस पेंशन के लिए ज़रूरी है।",
    age: "आपकी उम्र जुड़ने की सीमा के अंदर है।",
    shg: "आप महिला स्वयं सहायता समूह में हैं, और योजना उन्हीं को चुनती है।",
    state: (name) => `यह ${name} में चलती है।`,
    group: "पैसा समूह या परियोजना को जाता है, व्यक्तिगत किस्त के रूप में नहीं।",
    startup: "यह कारोबार या प्रसंस्करण इकाई के लिए है, मौसमी फसल ऋण के लिए नहीं।",
    throughState: "इसे राज्य खोलता है। राष्ट्रीय पोर्टल पर निजी फ़ॉर्म न हो।",
    open: "आपकी बताई स्थिति में यह खुली है।",
  },
  placeLabel: "कौन सी सरकार",
  placeCentre: "पूरा देश",
  placeHaryana: "हरियाणा",
  placeLead:
    "पूरा देश केंद्र की सूची है। हरियाणा पहली राज्य सूची है। बाकी राज्य अभी नहीं जोड़े गए।",
  haryanaTitle: "हरियाणा की अपनी योजनाएँ",
  haryanaBody:
    "राज्य का प्रोत्साहन चाहिए तो पहले मेरी फसल मेरा ब्योरा पर फसल का पंजीकरण करें। रकम और अंतिम तारीख उसी पोर्टल पर उस मौसम के लिए होती है।",
  haryanaLink: "हरियाणा की योजनाएँ खोलें",
  faqs: [
    {
      id: "official",
      q: "क्या यह सरकारी वेबसाइट है?",
      a: "नहीं। किसान पत्र एक स्वतंत्र पढ़ने की मेज़ है। आवेदन, भुगतान और सुधार केवल आधिकारिक पोर्टल पर होते हैं, या उस बैंक, मंडी या ज़िला दफ़्तर में जिसका नाम योजना पर लिखा है।",
    },
    {
      id: "list",
      q: "सूची कहाँ से आई?",
      a: "28 कृषि योजनाएँ वह अनुलग्नक हैं जो कृषि एवं किसान कल्याण राज्य मंत्री ने 3 फरवरी 2026 को लोकसभा के लिखित उत्तर में दिया (पीआईबी विज्ञप्ति PRID 2222801)। 9 सहायक प्रविष्टियाँ — किसान क्रेडिट कार्ड, पीएम-कुसुम, मत्स्य, पशुधन, खाद्य प्रसंस्करण, आरकेवीवाई और फसल अवशेष की मशीनें — उन विभागों से हैं जो उन्हें चलाते हैं। ई-नाम अलग दिखाया गया है क्योंकि वह विपणन योजना के अंदर है और किसान उसे नाम से खोजते हैं।",
    },
    {
      id: "states",
      q: "राज्य की योजनाएँ कहाँ हैं?",
      a: "पंजिका में पहला राज्य हरियाणा है: फसल पंजीकरण, धान छोड़ने का प्रोत्साहन, सीधी बिजाई, बागवानी का भाव-अंतर, और खेती के दौरान दुर्घटना सहायता। बाकी राज्य अभी नहीं जोड़े गए। उनके लिए myScheme देखें और राज्य कृषि विभाग से पुष्टि करें, क्योंकि राज्य की योजनाएँ सरकार बदलने पर बदल जाती हैं।",
    },
    {
      id: "numbers",
      q: "क्या रुपए के आँकड़ों पर भरोसा करूँ?",
      a: "जाने-पहचाने आँकड़े सार्वजनिक स्रोत से जुड़े हैं: पीएम-किसान के ₹6,000, पीएमएफबीवाई की प्रीमियम सीमा, पीएम-केएमवाई की ₹3,000 पेंशन, 2025–26 तक जारी एमआईएसएस दर, फरवरी 2026 के उत्तर में एफपीओ की सीमा, नमो ड्रोन दीदी की सीमा, एग्रीश्योर का कोष, और पीएमएफएमई की 35% सीमा। मशीन और ड्रिप का प्रतिशत दिशा-निर्देश और राज्य की अतिरिक्त सहायता से बदलता है, इसलिए उन पन्नों पर पुराना आँकड़ा छापने के बजाय वर्तमान दर जाँचने को कहा गया है।",
    },
    {
      id: "miss",
      q: "ऋण पन्ने पर ₹3 लाख क्यों है, जब बजट में ₹5 लाख कहा गया?",
      a: "बजट 2025–26 में संशोधित ब्याज सहायता योजना की सीमा बढ़ाने की घोषणा हुई थी। 2025–26 के लिए केंद्रीय कैबिनेट की मंज़ूरी और उस वर्ष का रिज़र्व बैंक परिपत्र ब्याज लाभ को कुल ₹3 लाख पर रखता है, और केवल पशु, मछली या मधुमक्खी के ऋण पर ₹2 लाख। मंज़ूरी पत्र पर कौन सी सीमा है, बैंक से पूछें।",
    },
  ],
}

export const copy = { en, hi }

export function t(lang: Lang) {
  return copy[lang]
}

export function eyebrowClass(lang: Lang) {
  return lang === "hi"
    ? "text-xs font-medium text-clay"
    : "text-xs font-medium tracking-[0.16em] text-clay uppercase"
}
