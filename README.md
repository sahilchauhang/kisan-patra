# Kisan Patra

An independent register of central and Haryana government schemes and subsidies for Indian farmers. It gathers the programmes the Ministry of Agriculture & Farmers Welfare listed for Parliament, plus selected additional central programmes for credit, irrigation, fisheries, livestock, food processing, and more. Haryana is the first state list. Other states are not loaded yet.

The site opens in Hindi. The header control switches to English, which stays on for that visit through `lang=en` in the address.

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

Haryana entries span crop registration and incentives, horticulture, irrigation, livestock and dairy, fisheries, and relief. Each entry links to its own official source or application route; confirm the current rate and deadline there. Other states are not loaded. Use [myScheme](https://www.myscheme.gov.in/) for those.

The [coverage audit](docs/scheme-coverage-audit-2026-09-26.md) records the government sources used to find gaps. This catalogue includes umbrellas, components, public infrastructure programmes, and application platforms alongside benefits paid directly to farmers; an entry does not imply that applications are open today.
