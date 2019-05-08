# IT2901, Administrasjonsverktøy for Barnehagesektoren

Denne applikasjonen er utviklet i forbindelse med faget IT2901 ved NTNU. Utviklingsarbeidet har foregått i samarbeid med Brøset barnehage i Trondheim kommune, og konsulentselskapet Bouvet. For en livedemonstrasjon, besøk [https://gruppe23-it2901.herokuapp.com/](https://gruppe23-it2901.herokuapp.com/)


### Om applikasjonen

Applikasjonen er utviklet for å håndtere fordelingen av ansatte og vikarer rundt omkring på en barnehage, eventuelt også ved institusjoner med lignende struktur. Den er primært utviklet med tanke på større enheter (som laptop, eller stasjonære maskiner), men fungerer også på mobil og nettbrett. Utvikling er for øyeblikket i en fase der det meste av funksjonalitet er på plass, men infrastrukturen rundt applikasjonen fremdeles ikke er tilstrekkelig utviklet for å testes ut hos kunde. Årsaken til dette er direkte knyttet til prosjektets omfang, tidsramme og de tekniske kravene som er nødvendige for å imøtekomme personvern og trygg oppbevaring av data. I bruk vil applikasjonen blant annet måtte lagre navn på ansatte og deres fraværshistorikk, og dette er informasjon som må oppbevares i henhold til lokale og nasjonale retningslinjer for informasjonssikkerhet og personvern. Vi ser for oss at videre iterasjoner av applikasjonen bør ha dette som fokus. Per dags dato lagres alt av data på en server leid hos tilbyderfirmaet Heroku.

### Lokalt oppsett
For å sette opp prosjektet lokalt kreves det at du har installert ```node >= 9.5.0``` og ```npm >= 6.9.0```.  Hvis du vil interagere direkte med databasen, må du også ha PostgreSQL installert. Det skal være mulig å kjøre prosjektet uten å sette opp en lokal database, siden identifikasjonen til den kjørende versjonen av databasen er satt opp som default i ```./server/db.js```.

Gitt at punktene over er oppfyllt, kan man utføre følgende steg for å sette opp prosjektet lokalt:

```bash
git clone https://github.com/SondreWold/it2901.git
cd it2901/ && npm install
npm start # should receive 'Express listening on port 5000'
cd client/ && npm install
npm start
```

Merk at prosjektet inneholder noen store avhengigheter, så det kan ta flere minutter å installere alle de nødvendige pakkene.

### Testing

Vi har skrevet to typer tester i dette prosjektet: end-to-end tester (e2e) med Cypress og back-end tester med Mocha og Chai. Under følger en oppskrift for hvordan man kjører de to forskjellige typene av tester i dette prosjektet. Begge oppskriftene antar at brukeren er i den øverste mappen i prosjektet, e.g. kommandoen ```pwd``` gir noe à la ```.../it2901```.

#### Cypress
Før Cypress-testene skal kjøres, må applikasjonen være satt opp. Derfor: dobbelsjekk at både server og klient kjører på hhv. port 5000 og 3000.

```bash
cd client/
npm i # or verify that cypress is installed in node_modules/
npm run cyp
```

Når Cypress har åpnet seg, trykk på **Run all specs** i vinduet som åpnes. Nå skal testene kjøres. Testene er skrevet for Chrome, så hvis denne nettleseren ikke er installert kan det være grunnen.

#### Mocha / Chai
For at Mocha/Chai-testene kjøres kan ikke serveren allerede kjøres. Derfor: stop serveren (på port 5000) hvis denne kjører.

```bash
npm i # or verify that mocha / chai is installed in node_modules/
npm test
```