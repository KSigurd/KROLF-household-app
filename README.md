# Hushållet

Länk till repo:
[Github](https://github.com/KSigurd/KROLF-household-app)

Hushållet är en applikation som möjliggör för användare att på ett enkelt och tydligt sätt fördela hushållets olika sysslor på ett mer jämlikt sätt. Användaren får skapa ett konto, gå med, eller skapa ett hushåll, samt välja en avatar. Väl inne i hushållet visas en tydlig överblick över sysslorna, vad som är gjort och vad som behöver göras. Varje hushåll styrs av en eller flera ägare som har möjlighet att lägga till, redigera eller ta bort sysslor. I varje hushåll visas även statistik över vem som har gjort vad.

Appens användningsområde sträcker sig långt utanför hemmets vrår och kan användas i alla möjliga konstellationer av människor som delar på diverse arbetsuppgifter. Familjemedlemmar, kollegor, grannar, studenter etc. Hushållet hjälper dem alla att utföra de gemensamma uppgifterna mer jämlikt fördelat.

## Struktur
Applikationen är skriven i Typescript. Filerna är placerade i olika mappar för att ge en tydligare förståelse och översikt av vad som finns var och vad som gör vad. 
Funktionalitet är uppdelade i små komponenter som har sina egna ansvarsområden. 

## Installation
Klona repot och kör `npm install` för att installera alla nödvändiga moduler för appen.

#### Starta app
Starta appen genom att köra `npm start`
## Krav
Kravlista
*	En logga, splashscreen och en appikon ska designas och användas. [JA]
*	Applikationen ska byggas med RN, Expo & TS. [JA]
*	Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras med produktägaren, godkännas och dokumenteras. [JA]
*	All information ska kommuniceras till och från en server. (VG) [JA]

Hushåll
*	Ett hushåll ska ha ett namn och en genererad enkel) kod så andra kan gå med i hushållet, namnet ska gå att ändra. [JA]

Konto
*	En användare ska kunna logga in sig. [JA]
*	En användare ska kunna skapa ett nytt hushåll. [JA]
*	En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. [JA]

Profil
*	En användare ska kunna ange sitt namn. [JA]
*	En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. [JA]
*	Valda avatarer ska inte kunna väljas av andra användare i hushållet. [JA]
*	Avataren ska användas i appen för att visa vad användaren har gjort. [JA]

Sysslor
*	En ägare ska kunna lägga till sysslor att göra i hemmet. [JA]
*	En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar) och en vikt som beskriver hur energikrävande den är. [JA]
*	En ägare ska kunna redigera en syssla. [JA]
*	En ägare ska kunna ta bort en syssla. [JA]

Dagsvyn
*	Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. [JA]
*	Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. [NJA]
*	När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. [JA]

Statistik
*	En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. [JA]
*	Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. [JA]
*	Det ska finnas en statistikvy över ”nuvarande vecka”. [JA]
