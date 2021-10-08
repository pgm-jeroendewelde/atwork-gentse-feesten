# @Work Project 2 - Gentse Feesten

Jullie gaan de Gentse Feesten 2020 website nabouwen. 
Hierbij maken jullie - in tegenstelling tot de live versie - gebruik van de open data uit 2019 omdat er pre-Corona veel meer evenementen binnen te halen vallen!

 

## Assets
[Video briefing van de klant](https://web.microsoftstream.com/video/95915aa8-4873-4cc4-9bf9-2401a25b7195)

[Video briefing van de docenten](https://web.microsoftstream.com/video/98120d9f-5921-49aa-8480-b3b1b0e5f63f)

[De figma designs](https://www.figma.com/file/332mL4msFQ1APzINPGQ73d/Gentse-Feesten-2020---Artevelde?node-id=193%3A3235)

Data

- Events: [https://www.pgm.gent/data/gentsefeesten/events.json](https://www.pgm.gent/data/gentsefeesten/events.json)
- Categories: [https://www.pgm.gent/data/gentsefeesten/categories.json] (https://www.pgm.gent/data/gentsefeesten/categories.json)
 

## Scope
Enkel deze pagina's moeten jullie namaken

- **Home** [(https://gentsefeesten.stad.gent/nl)](https://gentsefeesten.stad.gent/nl) (Koppelingen naar een externe site.)
    - 3 evenementen bovenaan: hier mag je zelf 3 evenementen uit de open data kiezen
    - Nieuws: hier mag je zelf de HTML schrijven
    - De datums van 2019 zijn anders dan die van 2020.
    - Afbeelding carrousel die over de volledige breedte getoond wordt: Plaats hier gewoon 1 afbeelding zonder de pijltjes navigatie.
    - Twitter carrousel: deze hoeft niet functioneel te zijn, dus hier mag je de navigatie laten vallen
    - Nieuwsbrief bouwen jullie enkel visueel na, deze zal niet functioneel zijn
- **Dag overzicht** [(https://gentsefeesten.stad.gent/nl/day/17/category)](https://gentsefeesten.stad.gent/nl/day/17/category)
    - De data voor die dag wordt ingeladen via de URL parameters, bv. dag.html(evenementen)?day=17
    - De filters met "categorie", "organisatoren", etc: Jullie bouwen dit enkel visueel na en hoeven niet te werken
    - De categorieën bv. Bal/Dans, ... komen uit de categorieën API. Indien je hier op klikt scroll je naar het juiste item (via een ID)
    - De 2 knopjes waarbij je kan switchen tussen een lijst en een grid weergave van alle evenementen: Je kan dit doen door het togglen van een class
- **Evenement detail** [(https://gentsefeesten.stad.gent/nl/day/17/de-lampadeerne-zoldergeheim-4-1015)](https://gentsefeesten.stad.gent/nl/day/17/de-lampadeerne-zoldergeheim-4-1015)
    - De data voor dit evenement kan ingeladen worden via de URL parameters, bv. detail.html?day=17&slug=de-lampadeerne-zoldergeheim-4-1015
    - Je zoekt de info van het evenement via de JSON op basis van dag en id/slug/... (TBD)
    - "Andere evenementen van" mag je hardcoden
    - Locatie op een kaart hoef je niet te tonen
 

## HTML
Je mag je niet baseren op de HTML die je kan vinden op de live site. Je bouwt zelf je eigen semantische structuur op.

 

## CSS
Iedere pagina is helemaal responsive, je gaat ook rekening houden met de browser-accessibility settings voor font-groottes. 

- Je mag zelf de keuze maken om gebruik te maken van het Bootstrap grid of om via flexbox zelf in controle te blijven over alles details. 
 

## JS
- Onder het titeltje "assets" vind je de link naar de 2 datasets dat jullie mogen gebruiken (locaties en evenementen). Het is de bedoeling dat de website dat je bouwt, de relevante data ophaalt op deze url. Het is met andere woorden niet de bedoeling dat jullie deze dataset ook lokaal hebben staan.
**Bijvoorbeeld**: Stel dat de klant dus een titel van een evenement zou wijzigen in de online json, dan zal dit meteen getoond worden voor alle nieuwe bezoekers van jouw site.

- Op mobiel moet de de website een functioneel menu krijgen. 
 

## Een beter design
De klant heeft enkele steekjes laten vallen. In een vorig project hebben jullie duidelijk aangegeven dat jullie veel beter kunnen en verwachten. 

Daarom gaan we bij dit project [deze pagina](https://arteveldehogeschool.instructure.com/courses/12011/pages/een-beter-design-voor-gentse-feesten?module_item_id=587485) onderhouden met betere design-suggesties. Jullie krijgen een melding telkens dat er hier een nieuwe suggestie verschijnt. 

 

## Wanneer je een grotere uitdaging wenst
- Foto slider op home laten werken
- Cookie popup
- Nieuws inladen door een zelf gemaakte array.
- Bij laden van de pagina een random campagnebeeld uit een array laden bovenaan de pagina
 