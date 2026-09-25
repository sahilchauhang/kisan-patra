# Kisan Patra

An independent register of central government schemes and subsidies for Indian farmers. It gathers the programmes the Ministry of Agriculture & Farmers Welfare listed for Parliament, plus allied schemes for credit, solar pumps, fisheries, livestock, and food processing. Haryana is the first state list. Other states are not loaded yet.

The header has an English / हिंदी control. The choice is stored in a `lang` cookie and the pages render in that language.

This is not a Government of India website. Confirm eligibility and rates on the official portal before you apply.

## Run it locally

```bash
npm install
npm run dev
```

The dev server listens on port 3847. A production build uses the same port:

```bash
npm run build
npm start
```

## What is included

- A searchable register, with a page for each scheme: benefit, eligibility, papers, and how to apply.
- A short finder that hides schemes your answers rule out.
- Source notes, including why the Kisan Credit Card interest benefit is described at the 2025–26 operational ceiling.

Haryana schemes — crop registration, Mera Pani Meri Virasat, direct-seeded rice, Bhavantar Bharpai, desi cotton, and farm-accident assistance — are on the register under Haryana. Confirm the season’s rate and last date on [fasal.haryana.gov.in](https://fasal.haryana.gov.in/). Other states are not loaded. Use [myScheme](https://www.myscheme.gov.in/) for those.
