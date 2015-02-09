##Rapport
###Inledning

Det jag har gjort är en applikation som kombinerar Marvels API med Wikipedias API. Det som är gjort är att man kan söka
på en karaktär från Marvel Universumet och sedan kan man välja en karaktär fårn en lista man får upp och då kan man få
upp information om just den karaktärer om den finns i Wikipedia under det namnet. Bakgrunden till min applikation är att
jag gillar Marvels karaktärer och det universumet väldigt mycket och när jag fick höra att Marvel hade ett API ville jag
göra något med det och då blev det att jag kombinerade det med Wikipedia även om man kan få ut lite information om
karaktärerna från Marvel själva så får man ut mer från Wikipedia.

###Serversida

På serversidan så har jag mina anrop till de olika apierna, innan jag anropar Marvel så hämtar jag ut karaktärsnamnet
som man har skrivit in i sökfältet från klienten och stoppar in det i söksträngen till Marvel. För marvel måste jag också
ha en hash som jag skickar med, men detta behöver man bara om man anropar dem från en server och behövs inte om man anropar
dem direkt från klienten. Hashen består av en timestamp som uppdateras hela tiden när man anropar Marvel, den privata API
nyckeln och den publika API nyckeln, och detta ska då vara md5 - krypterat tillsamans. När jag ska anropa Wikipedias API
så hämtar jag först ut karaktärsnamnet som man har klickat på och sedan stoppar in det i söksträngen till Wikipedia. Det
valda språket på servern är PHP då jag finner det lätt att jobba med, jag har även ett bibliotek för att göra request mot
APIerna som fungerar rikitigt smidigt och är lätt att använda. Cachning på serversidan har jag inte använt mig av då jag
hela tiden vill få ut färsk data från Wikipedia och när man gör en sökning mot Marvel så vill jag hämta ut de karaktärerna
som man har sökt på och därför cachar jag inte det heller. Felhantteringen sker på klientsidan så då har jag ingen direkt
felhantering på servern.

###Klientsidan

På klientsidan så har jag min sökruta som man kan söka på karaktärer och när man trycker på sök knappen eller enter tangenten
så skickar jag ett ajax - anrop till servern med det som man skrev in i sökrutan. När jag får tillbaka ett svar som är ok
så parsar jag det och sedan lopar igenom den array som jag får från Marvel och skapar en lista som jag sedan skriver ut
varje karaktär i. De är sedan klickbara så att när man klickar på dem så gör jag ett nytt anrop till Wikipedia med den
karaktären som man valde och när jag får ett svar från Wikipedia så skriver jag ut det man får i en div - tag på sidan.
Om ett fel skulle inträffa i ajax - anropen så skapar jag ett felmeddelande och skriver ut det på sidan. För att slippa
skriva HTML - koden i en sträng så har jag ett ramverk som gör att jag kan anropa en vanlig HTML - sida som då exikveras
istället för att returnera en sträng som innehåller en massa HTML. För att CSS ska gå lite lättare har jag använt mig
av Bootstrap som gör saker lite lättare. Cachening på klienten har jag gjort som så att när man söker får man en lista
och den listan sparar jag ner i sessionstorage om det finns i webbläsaren som då gör att om nätet skulle gå ner så
skriver jag ut det som finns i sessionstorage och då kan man alltid se sin senaste sökning man gjorde. När man stänger
ner webbläsaren så töms sessionstorage vilket betyder att jag inte behöver rensa den själv.

###Säkerhet och prestandaoptimeringar

Säkerheten har jag tänkt som så att när jag skriver ut karaktärsnamnen i listan så använder jag mig av textContent vilket
gör att om det skulle vara en script - tag i det jag får från Marvel så skriver den ut hela script - tagen men den exikverar
aldrig och man kan se som användare att det har kommit in en script - tag för att den kommer att finnas i listan. Sedan
har Marvel en säkerhet själv att om du skickar in en tag i sökrutan och trycker på sök så får man ut en tom array och då
får man som användare ett meddelande om det att det inte gick att hitta något på det man har sökt.
<br>
<br>
Som prestandaoptimeringar har jag gjort så att jag har en minifierad jquery och bootstrap fil som tar kortare tid att
läsa in än om man skulle haft de vanliga filerna och sedan har jag minifierat mina egna javascript filer så att de går
lite snabbare än vanligt. Sedan så har jag ett cache manifest som cachar ner statiska filer och två javascript - filer
så att de läses från servern hela tiden och blir då lite snabbare.

###Offline-first

Kring offline-first har jag tänkt som så att jag har skapat mig en manifest - fil som jag cachar statiska filer och
några javascript - filer i vilket gör att om jag skulle gå in på in sida när man inte har något nät så kan jag komma
in på sidan och se den men man får upp ett meddelande som uppnanar en att ansluta till internet om man vill ta del av
applikationen. Jag har även en lista sparad i sessionstorage som gör att om man använder applikationen och nätet skulle
gå ner och man som användare skulle ladda om sidan kan man alltid få ut sin senaste sökning i listan men man kan inte
göra mycket mer än det och om inget skulle finnas i sessionstorage så får man ett meddelande som säger att man inte har
någon anslutning till nätet så då uppmanas man att ansluta sig till internet för att ta del av applikationen.

###Kända buggar

Jag har en bugg som är från Wikipedias API och det är att vissa karaktärer har ingen information men ändå så har
Wikipedia slängt in någon bild i resultatet man får tillbaka och den ser inte bra ut men är så som jag får ut det och
jag kan inte göra så mycket åt det utan att parsa resultatet jag får tillbaka.

###Egen reflektion kring projektet

Själva projektet har gått bra, fick ändra lite i sista stund då det blev bättre som jag har det nu än som jag hade det
innan med bara en lista. Problem som jag har stött på var att det var lite bökigt att få ut information från Wikipedia
i ett format som var enkelt att lägga ut på sidan, först när jag fick till ett svar från Wikipedia fick jag ut i Wiki
text vilket är som ett objekt och inte alls lätt att jobba med men efter att ha läst igenom doumentationen lite mer så
lyckades jag hitta så att man kunde få tillbaka ett svar med HTML - taggar som bara var att lägga in i en div - tag och
då är det väldigt lätthanterligt. Det jag skulle vilja göra mer på min applikation är att jag skulle vilja få ut lite mer
information om vilka serietidningar en viss karaktär har varit med i men det har jag inte hunnit med, det jag får ut med
Wikipedia är vilken serietidning som karaktären först dök upp men inget mer om serietidningarna den har varit med i, så
det är något jag skulle vilja göra.

###Risker med din applikation

Risker med min applikation är att om man söker på något så kan man bara sitta och trycka som en galning på sökknappen och
på så sätt skicka en massa request till Marvels API och få ut samma svar en massa gånger. Detta kan i sin tur leda till
att man överstiger det antal tillåtna request om dagen på Marvel och då stängs en anslutning mot det API:t ner och då
fungerar min applikation inte längre.

<img src="Schematisk bild.png"/>