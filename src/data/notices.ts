import type { FarmerNotice } from "@/lib/types"

// Only add notices from an explicitly approved, versioned monitor proposal.
// Expired notices stay here for the archive; never delete their evidence.
export const farmerNotices: FarmerNotice[] = [
  {
    "id": "central-rabi-msp-2027-28",
    "title": {
      "en": "Rabi MSP announced for 2027–28",
      "hi": "रबी 2027–28 का एमएसपी घोषित"
    },
    "body": {
      "en": "Cabinet-approved rates per quintal: wheat ₹2,610; barley ₹2,286; gram ₹5,958; lentil ₹7,390; rapeseed/mustard ₹6,613; safflower ₹7,215. These apply to marketing season 2027–28.",
      "hi": "मंत्रिमंडल द्वारा स्वीकृत दरें, प्रति क्विंटल: गेहूँ ₹2,610; जौ ₹2,286; चना ₹5,958; मसूर ₹7,390; रेपसीड/सरसों ₹6,613; कुसुम ₹7,215। ये विपणन सत्र 2027–28 की दरें हैं।"
    },
    "action": {
      "en": "Check state procurement notices for registration and sale dates; this announcement does not open an application window.",
      "hi": "पंजीकरण और बिक्री की तारीख राज्य की खरीद सूचना में देखें; इस घोषणा से आवेदन अवधि नहीं खुलती।"
    },
    "audience": {
      "en": "Growers of these six Rabi crops across India.",
      "hi": "भारत में इन छह रबी फसलों के किसान।"
    },
    "publishedOn": "2026-09-30",
    "previewUntil": "2026-11-30",
    "schemeSlugs": [
      "pm-aasha"
    ],
    "evidence": [
      {
        "url": "https://www.pib.gov.in/PressReleasepage.aspx?PRID=2316941&lang=1&reg=48",
        "title": {
          "en": "Rabi MSP announced for 2027–28",
          "hi": "रबी 2027–28 का एमएसपी घोषित"
        },
        "publishedOn": "2026-09-30",
        "retrievedOn": "2026-10-04",
        "excerpt": "Minimum Support Prices for all Rabi crops for Marketing Season 2027-28"
      }
    ],
    "approval": {
      "proposalId": "FP-68382b2146",
      "version": 2
    }
  },

  {
    "id": "haryana-kharif-procurement-2026",
    "title": {
      "en": "Haryana: Kharif procurement calendar",
      "hi": "हरियाणा: खरीफ खरीद कैलेंडर"
    },
    "body": {
      "en": "Moong: 1 October–15 November, 38 mandis, ₹8,780/quintal. Soybean: 15 October–30 November, 7 mandis. Groundnut: 1 November–31 December, 7 mandis. Arhar, urd and sesame procurement is scheduled from 1 December; closing dates are not stated.",
      "hi": "मूंग: 1 अक्टूबर–15 नवंबर, 38 मंडियाँ, ₹8,780/क्विंटल। सोयाबीन: 15 अक्टूबर–30 नवंबर, 7 मंडियाँ। मूँगफली: 1 नवंबर–31 दिसंबर, 7 मंडियाँ। अरहर, उड़द और तिल की खरीद 1 दिसंबर से निर्धारित है; समाप्ति तारीख नहीं बताई गई।"
    },
    "action": {
      "en": "Confirm your notified mandi and registration with the procurement agency. The displayed deadline is for moong procurement, not scheme retirement.",
      "hi": "खरीद एजेंसी से अपनी अधिसूचित मंडी और पंजीकरण की पुष्टि करें। दिखाई गई अंतिम तारीख मूंग खरीद की है, योजना समाप्त होने की नहीं।"
    },
    "audience": {
      "en": "Haryana growers of these Kharif pulses and oilseeds.",
      "hi": "हरियाणा में इन खरीफ दलहन-तिलहन के किसान।"
    },
    "publishedOn": "2026-09-16",
    "deadline": "2026-11-15",
    "previewUntil": "2026-11-14",
    "schemeSlugs": [
      "pm-aasha",
      "mfmb"
    ],
    "evidence": [
      {
        "url": "https://prms.prharyana.gov.in/press-release/6336",
        "title": {
          "en": "Haryana: Kharif procurement calendar",
          "hi": "हरियाणा: खरीफ खरीद कैलेंडर"
        },
        "publishedOn": "2026-09-16",
        "retrievedOn": "2026-10-04",
        "excerpt": "moong will be procured from October 1 to November 15 at 38 mandis"
      }
    ],
    "approval": {
      "proposalId": "FP-a982b9e638",
      "version": 1
    }
  },

  {
    "id": "central-pss-kharif2026-three-states",
    "title": {
      "en": "Kharif PSS procurement approved in three states",
      "hi": "तीन राज्यों में खरीफ पीएसएस खरीद स्वीकृत"
    },
    "body": {
      "en": "For 2026–27, the Centre approved PSS procurement of tur and moong in Uttar Pradesh; soybean, moong and sunflower in Karnataka; soybean and moong in Telangana. This approval does not cover Haryana.",
      "hi": "2026–27 के लिए केंद्र ने उत्तर प्रदेश में अरहर और मूंग; कर्नाटक में सोयाबीन, मूंग और सूरजमुखी; तेलंगाना में सोयाबीन और मूंग की पीएसएस खरीद स्वीकृत की है। इस स्वीकृति में हरियाणा शामिल नहीं है।"
    },
    "action": {
      "en": "Ask the state procurement agency about registration and notified centres. The release provides no registration deadline.",
      "hi": "राज्य खरीद एजेंसी से पंजीकरण और अधिसूचित केंद्रों की जानकारी लें। विज्ञप्ति में पंजीकरण की अंतिम तारीख नहीं है।"
    },
    "audience": {
      "en": "Growers of the listed crops in the three named states.",
      "hi": "इन तीन राज्यों में बताई गई फसलों के किसान।"
    },
    "publishedOn": "2026-09-30",
    "previewUntil": "2026-11-30",
    "schemeSlugs": [
      "pm-aasha"
    ],
    "evidence": [
      {
        "url": "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2316939&lang=2&reg=48",
        "title": {
          "en": "Kharif PSS procurement approved in three states",
          "hi": "तीन राज्यों में खरीफ पीएसएस खरीद स्वीकृत"
        },
        "publishedOn": "2026-09-30",
        "retrievedOn": "2026-10-04",
        "excerpt": "in Uttar Pradesh, Telangana and Karnataka"
      }
    ],
    "approval": {
      "proposalId": "FP-a746f2f2e7",
      "version": 1
    }
  },

  {
    "id": "haryana-horticulture-subsidy-sep2026",
    "title": {
      "en": "Haryana: vegetable cultivation assistance",
      "hi": "हरियाणा: सब्जी उत्पादन सहायता"
    },
    "body": {
      "en": "Vegetables: ₹15,000/acre for general-category farmers (up to 5 acres), ₹25,500/acre for SC farmers (up to 1 acre). Assistance requires integrated models using mulching, low tunnels, drip irrigation or bamboo staking. The release also details orchard, spice, flower and aromatic-plant support.",
      "hi": "सब्जियाँ: सामान्य वर्ग को ₹15,000/एकड़ (अधिकतम 5 एकड़), अनुसूचित जाति को ₹25,500/एकड़ (अधिकतम 1 एकड़)। मल्चिंग, लो टनल, ड्रिप या बाँस सहारे जैसी तकनीकों वाला एकीकृत मॉडल आवश्यक है। सूचना में बाग, मसाले, फूल और सुगंधित पौधों की सहायता भी है।"
    },
    "action": {
      "en": "Register on MFMB and Hortnet; provide PPP, bank details and applicable SC certificate. Confirm the component with the district horticulture officer; no deadline is stated.",
      "hi": "एमएफएमबी और हॉर्टनेट पंजीकरण, परिवार पहचान पत्र, बैंक विवरण तथा लागू जाति प्रमाणपत्र दें। जिला बागवानी अधिकारी से घटक की पुष्टि करें; अंतिम तारीख नहीं बताई गई।"
    },
    "audience": {
      "en": "Eligible Haryana vegetable growers.",
      "hi": "हरियाणा के पात्र सब्जी उत्पादक।"
    },
    "publishedOn": "2026-09-28",
    "previewUntil": "2026-11-30",
    "schemeSlugs": [
      "midh"
    ],
    "evidence": [
      {
        "url": "https://prms.prharyana.gov.in/press-release/7628",
        "title": {
          "en": "Haryana: vegetable cultivation assistance",
          "hi": "हरियाणा: सब्जी उत्पादन सहायता"
        },
        "publishedOn": "2026-09-28",
        "retrievedOn": "2026-10-04",
        "excerpt": "registration on the ‘Meri Fasal-Mera Byora’ portal and Hortnet is mandatory"
      }
    ],
    "approval": {
      "proposalId": "FP-a57b622ad6",
      "version": 1
    }
  },

  {
    "id": "haryana-gaushala-fodder-oct2026",
    "title": {
      "en": "Registered gaushalas: fodder grant deadline",
      "hi": "पंजीकृत गौशालाएँ: चारा अनुदान की अंतिम तारीख"
    },
    "body": {
      "en": "Haryana’s registered gaushalas can apply for the fodder grant until 14 October 2026. The notice says a six-month instalment will follow. This is an institutional application, not an individual dairy-farmer subsidy.",
      "hi": "हरियाणा की पंजीकृत गौशालाएँ 14 अक्टूबर 2026 तक चारा अनुदान के लिए आवेदन कर सकती हैं। सूचना के अनुसार इसके बाद छह महीने की किस्त जारी होगी। यह संस्थागत आवेदन है, व्यक्तिगत डेयरी किसान का अनुदान नहीं।"
    },
    "action": {
      "en": "Contact Haryana Gau Seva Aayog to confirm the official grant portal and required documents.",
      "hi": "आधिकारिक अनुदान पोर्टल और आवश्यक दस्तावेजों की पुष्टि हरियाणा गौ सेवा आयोग से करें।"
    },
    "audience": {
      "en": "Registered gaushalas in Haryana.",
      "hi": "हरियाणा की पंजीकृत गौशालाएँ।"
    },
    "publishedOn": "2026-09-21",
    "deadline": "2026-10-14",
    "previewUntil": "2026-10-13",
    "schemeSlugs": [],
    "evidence": [
      {
        "url": "https://prms.prharyana.gov.in/press-release/6858",
        "title": {
          "en": "Registered gaushalas: fodder grant deadline",
          "hi": "पंजीकृत गौशालाएँ: चारा अनुदान की अंतिम तारीख"
        },
        "publishedOn": "2026-09-21",
        "retrievedOn": "2026-10-04",
        "excerpt": "registered gaushalas can apply for the grant till October 14"
      }
    ],
    "approval": {
      "proposalId": "FP-45bb3eb79e",
      "version": 1
    }
  },

  {
    "id": "haryana-uchani-training-oct2026",
    "title": {
      "en": "Uchani: October training calendar",
      "hi": "उचानी: अक्टूबर प्रशिक्षण कैलेंडर"
    },
    "body": {
      "en": "Course dates / apply by 5pm IST: fruit production 12–16 October / 11 October; nursery management 12–16 / 9 October; protected cultivation 19–23 / 18 October; mushrooms 26–30 / 23 October. Mushroom applications start 16 October. First come, first served; do not repeat a subject already completed.",
      "hi": "प्रशिक्षण / शाम 5 बजे तक आवेदन: फल उत्पादन 12–16 अक्टूबर / 11 अक्टूबर; नर्सरी 12–16 / 9 अक्टूबर; संरक्षित खेती 19–23 / 18 अक्टूबर; मशरूम 26–30 / 23 अक्टूबर। मशरूम आवेदन 16 अक्टूबर से। पहले आओ, पहले पाओ; पूरा किया विषय दोबारा न चुनें।"
    },
    "action": {
      "en": "Apply at kaushal.hortharyana.gov.in or the horticulture office. Bring Aadhaar, bank passbook and PAN.",
      "hi": "kaushal.hortharyana.gov.in या बागवानी कार्यालय में आवेदन करें। आधार, बैंक पासबुक और पैन लाएँ।"
    },
    "audience": {
      "en": "Haryana residents aged 18+; Uchani, Karnal.",
      "hi": "हरियाणा के 18+ आवेदक; उचानी, करनाल।"
    },
    "publishedOn": "2026-09-29",
    "deadline": "2026-10-23",
    "previewUntil": "2026-10-22",
    "schemeSlugs": [
      "midh"
    ],
    "evidence": [
      {
        "url": "https://prms.prharyana.gov.in/press-release/7671",
        "title": {
          "en": "Uchani: October training calendar",
          "hi": "उचानी: अक्टूबर प्रशिक्षण कैलेंडर"
        },
        "publishedOn": "2026-09-29",
        "retrievedOn": "2026-10-04",
        "excerpt": "applicants must be at least 18 years of age"
      }
    ],
    "approval": {
      "proposalId": "FP-1bbd58c820",
      "version": 1
    }
  },
]
