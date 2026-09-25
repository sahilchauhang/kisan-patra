# Kisan Patra scheme coverage audit

Checked personally against official government sources on 26 September 2026.

> **Implementation update, 26 September 2026:** The website now includes 16 additional central and 19 additional Haryana entries, with English and Hindi descriptions. It has 79 records in total: 28 from the February ministry annexure, 25 other central programme entries, one platform and 25 Haryana entries. The two Haryana entries found after this audit cover [cotton micronutrient/IPM assistance](https://prms.prharyana.gov.in/press-release/4515) and the [sugarcane planting incentive](https://prms.prharyana.gov.in/press-release/1339). Existing PDMC, MIDH, PM-KUSUM, PMMSY, Bhavantar and KCC pages gained Haryana-specific guidance. The findings below describe the 44-record catalogue before those additions. Current bajra coverage remains unconfirmed. This still is not an exhaustive denominator of all farmer-related programmes.

## Finding

The catalogue does **not** cover all central or Haryana farmer-related schemes. It contains 44 records: 28 from one Agriculture Ministry list, 9 additional central/allied records, 1 central platform, and 6 Haryana records. All 28 entries in the Ministry's 3 February 2026 parliamentary annexure are represented. That annexure is a useful baseline, but it is not a complete inventory across ministries or Haryana departments. [Official annexure](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2222801&lang=2&reg=48)

The comparison used the actual exported `schemes` array in `src/data/schemes.ts`, including summaries and benefit/application text. A different spelling or umbrella name was checked before calling something missing.

This is a coverage audit. Inclusion on an official page does not establish that applications are open today. Scheme approval periods, seasonal windows, and current operational guidelines must be checked when adding entries. No source-verification dates or benefit claims in the application were changed by this audit.

## Central coverage gaps

| Programme | Finding and treatment | Official evidence |
|---|---|---|
| Pradhan Mantri Dhan-Dhaanya Krishi Yojana (PM-DDKY) | Missing. Add a district/convergence programme entry, explain location restrictions and link underlying benefits. Avoid presenting it as a universal cash payment. | [PIB launch report, October 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2177806&lang=2&reg=48) |
| Mission for Aatmanirbharta in Pulses | Missing. General NFSNM and PM-AASHA entries do not explain this mission's seed, production, processing, and procurement support. | [PIB, August 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2296205&lang=1&reg=3), [mission components](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241411&lang=1&reg=1) |
| Pradhan Mantri Matsya Kisan Samridhi Sah-Yojana (PM-MKSSY) | Missing benefit coverage within the existing PMMSY umbrella. Add a linked sub-scheme for formalisation, aquaculture insurance and enterprise grants. | [Department of Fisheries annual report, section 3.2](https://www.dof.gov.in/static/uploads/2025/08/4686b6bf87e0a1844293531a7ad72c74.pdf), [August 2026 status](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2298101&lang=1&reg=1) |
| National Programme for Dairy Development (NPDD) | Missing. Dairy producer institutions and milk procurement/quality infrastructure are not adequately covered by the AHIDF entry. | [DAHD programme and implementation route](https://dahd.gov.in/schemes/programmes/npdd) |
| Livestock Health and Disease Control Programme (LHDCP) | Missing. Includes vaccination, disease control and veterinary services that are different from NLM entrepreneurship and RGM breeding. | [DAHD programme](https://dahd.gov.in/schemes-programmes/lhdcp) |
| Supporting Dairy Cooperatives and Farmer Producer Organizations (SDCFPO) | Missing. Add an institutional dairy finance route. The department lists a 2026-27 approval through 30 September 2026; later availability needs checking. | [DAHD approvals and description](https://dahd.gov.in/schemes/programmes/sdcfpo) |
| Pradhan Mantri Kisan SAMPADA Yojana | Missing. PMFME does not cover this separate food-processing umbrella. Explain cold chain, processing capacity, agro-processing clusters and Operation Greens as linked components. | [MoFPI component list](https://mofpi.gov.in/en/Schemes/about-pmksy-scheme), [PIB implementation update, July 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2291791&lang=2&reg=48) |
| Watershed Development Component of PMKSY (WDC-PMKSY 2.0) | Missing. PDMC's drip/sprinkler entry does not explain watershed projects and local participation. | [PIB implementation update, September 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48) |
| Nutrient Based Subsidy (NBS) | Missing if the intended scope includes all farmer subsidies. Explain subsidised retail fertiliser and the supplier payment mechanism rather than suggesting a farmer cash-grant form. | [Kharif 2026 Cabinet approval](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2250060&lang=1&reg=3) |

Additional central coverage requiring a clear scope/current-status decision:

- **Fisheries and Aquaculture Infrastructure Development Fund (FIDF):** absent and distinct from PMMSY. Government updates still describe projects and benefits in 2026, while the stated scheme period in an August 2026 reply ends in 2025-26. Verify fresh-sanction eligibility before labelling it open. [August 2026 reply](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2297706&lang=1&reg=48)
- **Agri-Clinics and Agri-Business Centres (ACABC):** no coverage of this entrepreneurship route in the SMAE/ATMA entry. Determine whether to expose it as a linked extension component or a separate searchable card. [Official ACABC portal](https://www.agriclinics.net/)
- **Mahila Kisan Sashaktikaran Pariyojana (MKSP)/DAY-NRLM farm livelihoods:** the existing Namo Drone Didi card does not represent the wider women-farmer programme. [PIB women-farmers backgrounder, March 2026](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/mar/doc2026324832501.pdf)
- **Wider PMKSY irrigation infrastructure:** Har Khet Ko Pani, AIBP and command-area programmes need coverage if public irrigation programmes are in scope. M-CADWM is a further linked sub-scheme, with its approval period to be checked. [PMKSY guidelines](https://pmksy.gov.in/pdflinks/Guidelines_English.pdf), [M-CADWM approval](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2120362&lang=2&reg=48)
- **Commodity-specific programmes:** Tea Development & Promotion, Integrated Coffee Development and Silk Samagra are absent. Their published finance-cycle periods and successor/continuation orders need checking before adding current application guidance. A pan-India claim also requires a deliberate review of other commodity boards. [Tea Board](https://teaboard.gov.in/TEABOARDPAGE/MzY%3D), [Coffee Board](https://coffeeboard.gov.in/15th-comission.html), [Silk Samagra status](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2239558&lang=1&reg=1)

## Haryana gaps

The existing state records are MFMB, Mera Pani Meri Virasat, DSR, horticulture Bhavantar Bharpai, desi cotton and farm-accident assistance. Haryana-specific benefits in other departments are largely absent.

| Missing scheme or benefit route | Coverage action | Official evidence |
|---|---|---|
| Mukhyamantri Bagwani Bima Yojana (MBBY) | Add horticulture crop assurance. It is distinct from price-deficiency support under BBY. | [Horticulture department registration/guidelines index](https://hortharyana.gov.in/), [August 2026 government statement](https://lokbhavan.haryana.gov.in/haryana-governor-prof-ashim-kumar-ghosh-addresses-state-level-independence-day-celebration-in-yamunanagar/) |
| Crop Cluster Development Programme (CCDP) | Add the horticulture cluster/FPO route. | [Department programme and guidelines index](https://hortharyana.gov.in/) |
| Hi-Tech and Mini Dairy Units | Add the state dairy-establishment programme. | [Department home page lists its 2026-27 notification dated 20 August 2026](https://pashudhanharyana.gov.in/) |
| Piggery, sheep and goat units (general category) | Add the state unit-establishment route. | [2026-27 departmental scheme list](https://pashudhanharyana.gov.in/schemes) |
| Employment opportunities for Scheduled Caste beneficiaries | Add the targeted animal-husbandry scheme. | [2026-27 departmental scheme list](https://pashudhanharyana.gov.in/schemes) |
| Backyard Poultry Units | Add state poultry support. | [2026-27 departmental scheme list](https://pashudhanharyana.gov.in/schemes) |
| Conservation and Development of Indigenous Cattle and Murrah Development | Add state breed-development benefits. | [2026-27 departmental scheme list](https://pashudhanharyana.gov.in/schemes) |
| Bhed Bakri Palak Utthaan Yojana | Add the shepherd/sheep-goat programme. | [2026-27 departmental scheme list](https://pashudhanharyana.gov.in/schemes) |
| Pandit Deen Dayal Upadhyay Samoohik Pashudhan Beema Yojana | Add livestock insurance and its SARAL application route. | [Government myScheme entry](https://www.myscheme.gov.in/schemes/pdduspby) |
| Mukhyamantri Dugdh Utpadak Protsahan Yojana | Add the dairy-producer incentive. | [Haryana government statement, 2026](https://lokbhavan.haryana.gov.in/haryana-fast-emerging-as-investors-first-choice-says-governor/) |
| Intensive Fisheries Development Programme | Add a parent with distinct benefits for inputs, nets, pond renovation, transport, aquaculture solar power and fish/shrimp crop insurance. | [Fisheries department state list](https://harfish.gov.in/provider/state-government/) |
| Welfare of Scheduled Caste Families under Fisheries Sector | Add targeted input, equipment, vending and water-body lease/auction support. | [Fisheries department state list](https://harfish.gov.in/provider/state-government/) |
| Haryana Natural Farming Scheme | Add state cow/drum and training support; distinguish operational benefits from newly announced incentives awaiting detailed rules. | [CM official release, June 2026](https://prms.prharyana.gov.in/press-release/2545) |
| Green-manure incentive | Add this seasonal benefit. MFMB is the registration prerequisite, not a substitute for an explanation of the incentive. | [Official 2026 payment and eligibility announcement](https://prms.prharyana.gov.in/press-release/3982) |
| Paddy-stubble management/baling incentive | Add the state cash incentive alongside the existing central machinery-subsidy record. | [Official September 2026 statement](https://prms.prharyana.gov.in/press-release/7072) |
| Crop-loss relief through e-Kshatipurti | Add the disaster-compensation claim route, explaining its relationship to crop insurance and verification. | [Haryana Assembly response reported by the government, September 2026](https://prms.prharyana.gov.in/press-release/4796) |

## Existing entries that need expansion or state-specific routes

- **Bhavantar Bharpai:** current text covers vegetables, fruits and spices. The horticulture site now advertises honey registration/guidelines. Honey coverage is missing. Bajra support should be checked against the current procurement season before being combined with horticulture BBY. [Horticulture department](https://hortharyana.gov.in/)
- **PDMC:** general national coverage exists, but Haryana's implementing authority is MICADA. Add the correct state application route and distinguish micro-irrigation from on-farm water-tank assistance. [MICADA](https://micada.haryana.gov.in/), [indexed official notice](https://micada.haryana.gov.in/3rdpartylicenses.txt)
- **MIDH:** the national umbrella is present. Haryana's IHD/SCSP assistance and local protected-cultivation/production guidelines need their own eligibility and application mapping, without counting every horticulture component as an independent national scheme. [Haryana programme index](https://hortharyana.gov.in/), [state crop-production guidelines](https://hortharyana.gov.in/images/docs/guidelines/Norms_%26_Guidelines_2024-25.pdf)
- **PM-KUSUM:** the national entry exists. Add Haryana's actual application/selection route and current state share, backed by current notices. [Official September 2026 statement](https://prms.prharyana.gov.in/press-release/7072)
- **KCC/MISS:** central coverage exists; Haryana's additional cooperative crop-loan interest relief is not explained. [Haryana government statement](https://lokbhavan.haryana.gov.in/haryana-fast-emerging-as-investors-first-choice-says-governor/)
- **PMMSY:** the umbrella is present. Haryana lists numerous individual components with different applications and eligibility. Those should be discoverable through linked benefit pages or component sections. [Haryana joint central/state fisheries list](https://harfish.gov.in/provider/joint-venture-central-state/)

## Counting and status rules needed before claiming completeness

1. Keep separate fields for the funding jurisdiction, implementing state, parent scheme, component and application service. MFMB/e-NAM are platforms; RKVY/ISAM are umbrellas; PMFBY and RWBCIS currently share one record. The count of 44 is not a count of 44 independent cash subsidies.
2. Track approved, operational, applications-open, closed-for-season, expired and proposed status separately. Haryana's Water Secure Haryana programme was still awaiting final loan approval in the August 2026 announcement, with approval targeted for October; it should not be labelled an open entitlement on that evidence. [Official programme announcement](https://prms.prharyana.gov.in/press-release/4321)
3. Define whether “farmer-related” includes public infrastructure, agricultural entrepreneurs, plantation crops, cooperative institutions, awards and general household welfare. The current catalogue already includes public programmes and enterprises, so excluding analogous allied-sector schemes would be inconsistent.
4. Reconcile the state list with Agriculture, Horticulture, Animal Husbandry, Fisheries, MICADA, Renewable Energy, Cooperation, Revenue/Disaster Management and marketing-board sources. The [2026-27 Haryana budget index](https://finhry.gov.in/budget-2026-27/) provides a further department-wide checklist.
5. Use scheme-specific guidelines/notifications and record their date, source URL and application window. The current editorial date is not evidence of official verification.

## Limits and recommended order

The Agriculture department homepage and the full 2026-27 plan memorandum could not be fetched reliably during this check. The report therefore does not claim a complete denominator or a coverage percentage across all government programmes. The official sources above are sufficient to establish that the current catalogue is incomplete.

First add Haryana insurance, dairy/livestock, green manure, stubble support and crop-loss relief, plus PM-DDKY and the pulses mission. Next add the missing central allied-sector programmes and Haryana fisheries benefits. Then reconcile components and historical/current status across the remaining departments and commodity boards.

Accurate present description: **“28 schemes from the Agriculture Ministry's February 2026 list, selected additional central programmes, and selected Haryana schemes.”**
