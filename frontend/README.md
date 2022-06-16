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

Zatim na event onSubmit vrsimo validaciju i saljemo  podatke bazi podataka:

````
  AuthService.login(userInfo)
            .then((response)=>{
                if(response && response.status===200){
                    //todo navigate
                     localStorage.setItem("user", JSON.stringify(response.data))
                }
            })
            .catch((error)=>{
                console.log(error);
                setApiError(true)
            } )

````
Baza vraca usera ako ga imamo u bazi i mi ga cuvamo u localStorage.


---
CORS-Cross origin resource  sharing
---
Da bi server mogao da kominucira sa drugim serverima, moramo da omogucimo
CORS.

npm i cors

const cors=require("cors")
````
app.use(cors());
````

---
axios.defaults.baseURL
---
Frontend se u ovom slucaju odvija na portu 3000. Da bi mogao da posalje
API backendu na njegov port, moramo da definisemo baseURL.
````
axios.defaults.baseURL="http://localhost:4000";
````


---
REGISTER
----
Na isti nacin kao i Login compnent kreiramo i Register component.
preko useState i handleInputChange funkcije uzimamo podatke iz input polja 
i skladistimo u userObj objekat.

U funkciji onSubmit vrsimo validaciju. Ovde smo izvrsili i validaciju email
polja da mora da sadrzi "@".
````
!userObj.email.includes("@")
````



----
React Router Dom
---
````
npm i react-router-dom@6

 <BrowserRouter>
           <Routes>
               <Route path="/home" element={<Home/>}/>
               <Route path="/shop" element={<Shop/>}/>
               <Route path="about" element={<About/>}/>
               <Route path="/contact" element={<Contact/>}/>
               <Route path="/" element={<AuthPage/>}/>
           </Routes>
       </BrowserRouter>
````

----------


