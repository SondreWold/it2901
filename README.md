# IT2901, Administrasjonsverktøy for Barnehagesektoren

Denne applikasjonen er utviklet i forbindelse med faget IT2901 ved NTNU. Utviklingsarbeidet hare foregått i samarbeid med Brøset barnehage i Trondheim kommune, og konsulentselskapet Bouvet. For en livedemonstrasjon, besøk: https://gruppe23-it2901.herokuapp.com/


### Applikasjonen, den dag i dag

Applikasjonen er ment å være en webapplikasjon for å håndtere fordelingen av ansatte og vikarer rundt omkring på en barnehage , eventuelt ved institusjoner med lignende struktur. Den er primært utviklet med tanke på større enheter (som laptop, eller stasjonære maskiner), men fungerer også på mobil og nettbrett. Utvikling er for øyeblikket i en fase der det meste av funksjoanlitet er på plass, men infrastrukturen rundt applikasjonen fremedeles ikke er tilstrekkelig god nok for å testes ut hos kunde. Årsaken til dette er direkte knyttet til prosjektets omfang, tidsramme og de tekniske kravene som er nødvendige for å imøtekomme personvern og trygg oppbevaring av data. I bruk vil applikasjonen blant annet måtte lagre navn på ansatte og deres fraværshistorikk, og dette er informasjon som må oppbevares i henhold til lokale og nasjonale retnignslinjer for informasjonssikkerhet - og vi ser for oss at videre iterasjoner av applikasjonen bør ha dette som fokus. Per dags dato, lagres alt av data på en server leid av tilbyderfirmaet Heroku. Dette er en god løsning for lagring av data under utviklingsarbeidet, men er dessverre ikke bærekraftig med tanke på pris i en reel brukssammeheng. 

### Bruk

Bruken av webappen er ment å være intuitiv, og det meste av brukerinteraksjonen vil på daglig basis foregå på forsiden av applikasjonen. I brukergrensesnittert vil man her ser et antall "kort" som alle representerer en fysisk avdeling/seksjon/base ved institusjonen - i dette tilfellet en barnehage. I basekortene vil man se en oversikt over antall barn og voksne som er tilstede ved basen ved valgt dato, og man vil også se en liste over _hvilke_ ansatte (og deres stillingstype) som er på jobb ved basen. 

To be continued....


### Teknologistack

- Material Design
- React
- Redux
- PostgreSQL


