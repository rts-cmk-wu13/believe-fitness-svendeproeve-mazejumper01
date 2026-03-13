# Belive Fitness  
Magnus Borregaard, WU13  

## Valgfri opgave 

Jeg har valgt at arbejde med opgave B, hvor nye usere skal kunne oprette en konto ved hjælp af API'et.

---

# Tech Stack

## Next.js
Next.js er et JavaScript framework bygget ovenpå React. Frameworket er komponentbaseret og user filbaseret routing, hvor mappestrukturen automatisk bestemmer sidernes URL-struktur.

Jeg har valgt Next.js til projektet, fordi det giver en tydelig struktur og nogle værktøjer fra starten, som man ellers selv skulle opsætte i et almindeligt React-projekt. For eksempel kommer Next.js med routing, server rendering og server actions indbygget.

I mit projekt user jeg blandt andet Next.js til
* at strukturere siderne i forskellige routes
* at håndtere server actions til kommunikation med API'et
* at sikre at nogle funktioner kun kører på serveren

Hvilket gør projektet mere organiseret og gør det lettere at arbejde med både frontend og backend kommunikation.

---

## API
Projektet user et REST API til at håndtere data.

Frontend sender HTTP requests til API'et for at hente eller ændre data. I mit projekt bliver der blandt andet brugt

* **GET** til at hente data, fx usere eller aktiviteter
* **POST** til at oprette data eller tilmelde usere til aktiviteter
* **DELETE** til at fjerne data

---

## Tailwind CSS
Tailwind CSS er et utility first CSS framework, hvor styling bliver lavet direkte i HTML gennem små utility klasser.

Jeg har valgt Tailwind fordi:
* det gør det hurtigt at style komponenter
* styling og markup er samlet samme sted
* det reducerer behovet for at skrive meget custom CSS

Et alternativ kunne være almindelig CSS eller SASS. de giver nemlig mere kontrol over stylesheets, men kræver også mere strukturering og flere separate filer.

---

# Kodeeksempel

```javascript
export async function joinCourse(courseId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const userResponse = await fetch(
    `${BASE_URL}/api/v1/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    }
  )

  if (!userResponse.ok) throw new Error("Kunne ikke hente user")

  const user = await userResponse.json()

  const courseResponse = await fetch(
    `${BASE_URL}/api/v1/classes/${courseId}`,
    { cache: "no-store" }
  )

  if (!courseResponse.ok) throw new Error("Kunne ikke hente aktivitet")

  const course = await courseResponse.json()

  const participants = course.users?.length || 0
  const isFull = participants >= course.maxParticipants

  if (isFull) {
    throw new Error("Denne klasse er fuld")
  }

  const hasSameWeekday = user.classes?.some(
    (c) => c.classDay.trim().toLowerCase() === course.classDay.trim().toLowerCase()
  );

  if (hasSameWeekday) {
    throw new Error("Du er allerede tilmeldt en aktivitet på denne ugedag")
  }

  const response = await fetch(
    `${BASE_URL}/api/v1/users/${userId}/classes/${courseId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  )

  if (!response.ok) throw new Error("Kunne ikke tilmelde aktivitet")

  revalidatePath(`/courses/${courseId}`)

  return response.json()
}
```

## Forklaring

I mit kodeeksempel viser jeg en funktion, der bruges til at tilmelde en user til et class i systemet. Funktionen er implementeret som en server action i Next.js, hvilket betyder at den kører på serveren og ikke i browseren. Det gør det muligt at håndtere sikkerhed og API kald mere sikkert.

Først hentes userens accessToken og userId fra cookies. Disse oplysninger bruges til at identificere useren og til at sende autoriserede requests til API'et. Hvis en af værdierne mangler, bliver useren automatisk sendt videre til login siden.

som det næste hentes userens data fra API'et ved hjælp af en GET request. Det data bruges senere til at kontrollere, hvilke aktiviteter useren allerede er tilmeldt.

Efterfølgende hentes information om det valgte class. Her bruges også en GET request til API'et for at hente oplysninger som blandt andet antal deltagere og maks antal deltagere.

Når dataene er hentet, bliver der udført nogle valideringer.

Først bliver der kontroleret om den class allerede er fyldt op. det gøres ved at sammenligne antallet af deltagere med maxParticipants. Hvis classen er fuld, bliver der smidt en fejl.

som det næste kontrolleres det, om useren allerede er tilmeldt en aktivitet på samme ugedag. Det gøres ved at gennemgå userens eksisterende aktiviteter og sammenligne classDay. Hvis der allerede findes en aktivitet på samme dag, bliver tilmeldingen afvist.

Hvis alle kontroller bliver bestået, sendes en POST request til API'et for at tilmelde useren til classen.

Til sidst bruges revalidatePath, som er en funktion i Next.js, til at opdatere siden. Det sikrer, at userfladen straks viser de nye data uden at useren skal opdatere siden manuelt.



# User flow

Et typisk flow i systemet kan fx se sådan her ud.

1. En ny user går ind på registreringssiden.
2. useren udfylder en formular med navn, username og adgangskode.
3. Frontend sender en POST request til API'et for at oprette useren.
4. API'et gemmer useren i databasen.
5. useren kan derefter logge ind og modtager et access token.
6. Tokenet gemmes i cookies og bruges til autentificerede requests.
7. useren kan nu se en liste over aktiviteter.
8. Når useren vælger en aktivitet og trykker tilmeld, kaldes funktionen `joinCourse`.
9. Systemet kontrollerer om der er plads på holdet og om useren allerede har en aktivitet samme dag.
10. Hvis reglerne er opfyldt, bliver useren tilmeldt aktiviteten.


# Datamodel

Systemet arbejder primært med to typer data: usere og aktiviteter.

## User
En useren indeholder blandt andet:
* id
* userFirstName
* userLastName
* username
* password
* classes

## Class
En aktivitet indeholder blandt andet:
* id
* className
* classDay
* maxParticipants
* users



# Perspektivering

Jeg arbejder både med datahåndtering, validering og API kommunikation. Ved at placere logikken i en server action kan følsomme oplysninger som tokens håndteres på serveren i stedet for direkte i klienten, hvilket gør løsningen mere sikker.

Derudover har jeg implementeret nogle regler for systemet, for eksempel at en klasse ikke kan overskrive det maksimale antal deltagere, og at en user ikke kan tilmelde sig flere aktiviteter på samme ugedag.

Hvis systemet skulle bruges i et rigtigt produktionsmiljø, kunne man forbedre løsningen yderligere ved at tilføje:

* bedre error handling

* mere input validering

* forbedret sikkerhed

* eventuelt tests
