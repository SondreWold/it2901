# IT2901, Administrasjonsverktøy for Barnehagesektoren

Denne applikasjonen er utviklet i forbindelse med faget IT2901 ved NTNU. Utviklingsarbeidet hare foregått i samarbeid med Brøset barnehage i Trondheim kommune, og konsulentselskapet Bouvet. For en livedemonstrasjon, besøk: https://gruppe23-it2901.herokuapp.com/


### Applikasjonen, den dag i dag

Applikasjonen er ment å være en webapplikasjon for å håndtere fordelingen av ansatte og vikarer rundt omkring på en barnehage , eventuelt ved institusjoner med lignende struktur. Den er primært utviklet med tanke på større enheter (som laptop, eller stasjonære maskiner), men fungerer også på mobil og nettbrett. Utvikling er for øyeblikket i en fase der det meste av funksjoanlitet er på plass, men infrastrukturen rundt applikasjonen fremedeles ikke er tilstrekkelig god nok for å testes ut hos kunde. Årsaken til dette er direkte knyttet til prosjektets omfang, tidsramme og de tekniske kravene som er nødvendige for å imøtekomme personvern og trygg oppbevaring av data. I bruk vil applikasjonen blant annet måtte lagre navn på ansatte og deres fraværshistorikk, og dette er informasjon som må oppbevares i henhold til lokale og nasjonale retnignslinjer for informasjonssikkerhet - og vi ser for oss at videre iterasjoner av applikasjonen bør ha dette som fokus. Per dags dato, lagres alt av data på en server leid av tilbyderfirmaet Heroku. Dette er en god løsning for lagring av data under utviklingsarbeidet, men er dessverre ikke bærekraftig med tanke på pris i en reel brukssammeheng. 

### Bruk

Bruken av webappen er ment å være intuitiv, og det meste av brukerinteraksjonen vil på daglig basis foregå på forsiden av applikasjonen. I brukergrensesnittert vil man her ser et antall "kort" som alle representerer en fysisk avdeling/seksjon/base ved institusjonen - i dette tilfellet en barnehage. I basekortene vil man se en oversikt over antall barn og voksne som er tilstede ved basen ved valgt dato, og man vil også se en liste over _hvilke_ ansatte (og deres stillingstype) som er på jobb ved basen. 

To be continued....


### Testing

Vi har skrevet to typer tester i dette prosjektet: end-to-end tester (e2e) med Cypress og back-end tester med Mocha og Chai. Under følger en oppskrift for hvordan man kjører de to forskjellige typene av tester i dette prosjektet. Begge oppskriftene antar at brukeren er i den øverste mappen i prosjektet, e.g. kommandoen ```pwd``` gir noe à la ```.../it2901```.

#### Cypress
Før Cypress-testene skal kjøres, må applikasjonen være satt opp. Derfor: dobbelsjekk at både server og klient kjører på hhv. port 5000 og 3000.

```bash
cd client/
npm i # or verify that cypress is installed in node_modules/
npm run cyp --browser chrome
```

Når Cypress har åpnet seg, trykk på **Run all specs** i vinduet som åpnes. Nå skal testene kjøres. Testene er skrevet for Chrome, så hvis denne nettleseren ikke er installert kan det være grunnen.

#### Mocha / Chai
For at Mocha/Chai-testene kjøres kan ikke serveren allerede kjøres. Derfor: stop serveren (på port 5000) hvis denne kjører.

```bash
npm i # or verify that mocha / chai is installed in node_modules/
npm test
```

### Teknologistack

- Material Design
- React
- Redux
- PostgreSQL


