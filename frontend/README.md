Prvi korak je da kreiramo frontend folder uz pomoc komande:
npx create-react-app frontend


Zatim kreiramo folder PAAGES i pravimo potrebne stranice koje 
smo planirali da implementiramo.
U ovom slucaju, na pocetku nam je najpotrebnija AuthPage stranica 
na kojoj cemo prikazivati Login i Register komponente.

Kreiramo folder COMPONENTS u koji za pocetak smestamo LOGIN, REGISTER 
i NAVIGATION komponente.

--------
LOGIN
--------
U login komponenti kreiramo formu za unosenje username i password.
Uz pomoc useState(setUserInfo i handleInputChange metode), prikupljamo podatke iz input polja i smestamo u
objekat **userInfo**. Unutar input polja, na event onChange, pozivamo
funkciju handleInputChange koja pravi kopiju userInfo objekta i updajtuje ga.

Zatim na event onSubmit vrsimo validaciju i saljemo  podatke bazi podataka.

---
CORS-Cross origin resource  sharing
---
Da mi server mogao da kominucira sa drugim serverima, moramo da omogucimo
CORS.

npm i cors

const cors=require("cors")

app.use(cors());


---
axios.defaults.baseURL
---
axios.defaults.baseURL="http://localhost:4000";



---