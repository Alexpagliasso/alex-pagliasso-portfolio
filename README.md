# Alex Pagliasso — Portfolio

Portfolio personale React + TypeScript + Vite, fedele alla reference approvata.

## Avvio

```sh
npm ci
npm run dev
```

## Verifiche

```sh
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

La suite Playwright usa Microsoft Edge installato sul computer e avvia `vite preview` sulla porta 4173: eseguire la build prima dei test. Su una macchina senza Edge installarlo con `npx playwright install msedge`.

## Struttura

- `src/App.tsx`: composizione della pagina.
- `src/components/layout/`: header/footer, navigazione mobile, Section e Card riutilizzabili.
- `src/components/hero/`: hero, fotografia e terminale con typing.
- `src/components/PortfolioSections.tsx`: About, Experience, TechStack, Projects ed Education; card guidate dai dati.
- `src/data/portfolio.ts`: contenuti e tipi Experience, Project, TechGroup, Education e BeyondCodeItem.
- `src/styles/variables.css`: palette originale.
- `src/styles/reference.css`: fondazione visiva estratta dall'HTML approvato, senza logica stampa o elementi nascosti.
- `src/styles/globals.css`: accessibilità, interazioni e correzioni responsive.
- `src/assets/profile.png`: fotografia originale estratta dal base64, circa 99 KB, senza perdita di qualità.
- `tests/portfolio.spec.ts`: verifiche browser, fedeltà dei contenuti e integrità della reference.

## Reference e scelte intenzionali

Il repository contiene `reference/Alex_Pagliasso_Portfolio_MobileApp_V5_2.html`, anziché il nome `portfolio-v5.html` indicato nel brief. Il file effettivamente presente è stato letto integralmente e lasciato intatto.

SHA-256: `b60761413163f4ab41525b7af3407d2cc4d08e8e72e0ce7ff3a3448ceee10ea6`.

Sono conservati testi, ordine delle sezioni (Stack prima di Projects), palette, font di sistema, griglie, fotografia, timeline e breakpoint a 780 px. Tailwind e Redux compaiono solo nei testi delle competenze originali: non sono dipendenze dell'applicazione.

Differenze intenzionali:

- Rimossi i pulsanti PDF/stampa ancora presenti nel file HTML, come richiesto nel brief.
- Icone Lucide nella navigazione mobile al posto dei glifi testuali.
- Collegamenti con target di almeno 44 px, focus visibile, skip link e gerarchia dei titoli corretta.
- Navigazione desktop riallineata dopo la rimozione del pulsante export.
- Safe area superiore aggiunta anche allo spazio riservato al contenuto; `viewport-fit=cover` e protezione inferiore conservata.
- Nessuna sezione parte con `opacity: 0`. La visibilità non dipende da IntersectionObserver o Framer Motion.
- Framer Motion gestisce ingresso foto/hero, micro RGB del nome, reveal e stagger di sezioni/card/chip, timeline e feedback della navigazione. Hover e glow seguono il mouse solo su desktop; su touch i progetti hanno un breve feedback al tap. Floating e glow fotografico restano molto leggeri. Tutti gli effetti rispettano `prefers-reduced-motion`, anche quando cambia durante la visita.
- Lo stato attivo della navigazione usa uno scroll listener passivo con requestAnimationFrame e segue l'ordine fisico delle sezioni.
- Metadati SEO/Open Graph di base e favicon personale. Nessuna risorsa remota, API o backend.

## Beyond Code e asset opzionale

Beyond Code segue Formazione. I componenti sono in `src/components/beyond/BeyondCode.tsx` e `PixelWorkspace.tsx`; contenuti e icone sono descritti da `BeyondCodeItem` in `src/data/portfolio.ts`. Gli stili sono in `src/styles/beyond.css`.

Aggiungere il file locale **`src/assets/alex-pixel-front.png`**, poi riavviare Vite o eseguire una nuova build. Non servono modifiche al JSX. Non ? stata generata alcuna illustrazione.

Senza asset viene mostrato un placeholder con grid, glow discreto e icona Lucide. Anche un errore di caricamento ripristina il placeholder. L'import opzionale usa `import.meta.glob`; il manifest Vite risolve gli URL anche nell'HTML statico di produzione.

Desktop: immagine protagonista (circa 60% della larghezza), con tre card a destra e altezza allineata al contenuto. Mobile: immagine a tutta larghezza in rapporto 4:5, seguita da Padel, Calcio & Coaching, Tecnologia & Curiosit?. L'immagine usa `object-fit: cover` e crop centrale senza deformazioni: tenere i dettagli importanti lontano dai bordi. Un asset verticale di almeno 960?1200 px ? un buon punto di partenza; il crop definitivo va controllato con l'illustrazione reale.

Reveal di sezione, leggero fade/scale dell'immagine e stagger delle card si integrano nel sistema esistente. Desktop: zoom massimo 1.01 e glow; mobile: feedback al tap sulle card, senza hover/parallax. Tutto rispetta reduced motion.

Contact, email, mailto e relativo tracking sono rimossi. La navigazione mobile contiene Home, Experience, Projects e Stack, distribuiti su quattro colonne. Beyond ? nella navigazione desktop e raggiungibile scorrendo su mobile. Telefono e lingue restano nel footer.

## QA

18 test browser coprono:

- 375×812, 390×844, 430×932, 768×1024, 1440×900 e 1920×1080;
- overflow orizzontale, clipping dei contenitori, fotografia caricata e contenuti visibili;
- navigazione, sezione attiva, target touch e footer libero dalla bottom navigation;
- movimento ridotto, typing del terminale, assenza di IntersectionObserver, tastiera e assenza di email/mailto;
- equivalenza testuale delle sezioni originali mantenute e hash della reference;
- assenza degli elementi rimossi, HTML senza JavaScript, motion mobile senza overflow o layout shift e cambio dinamico di reduced motion;
- touch e safe area simulate (47 px in alto, 34 px in basso) tramite Chromium DevTools Protocol.

Gli screenshot vengono salvati in `test-results/` (esclusa da Git). Le verifiche usano Edge/Chromium: l'emulazione non sostituisce un controllo su un iPhone fisico con Safari.

## Possibile V2 — non implementata

- Case study dei progetti con risultati, screenshot e link reali.
- Versione inglese dei contenuti.
- Dominio definitivo con canonical, og:url e immagine social dedicata.
