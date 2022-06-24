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

useEffect
----
useEffect se pokrece u trenutnku kada se renderuje metoda.
Prvi argument je neka funkcija a drugi argument moze biti prazan array ako zelimo samo
jednom da se pokrene. U array mozemo da stavimo element na osnovu kojeg ce se pokretati
useEffect. Svaki put kad se promeni taj element, pokrece se useEffect


------
useNavigate
------
Hook za navigaciju kroz aplikaciju

-------
Product and Shop
-----
U ShopPage kreiramo useEffect hook kako bi prikupili podatke o proizvodima
iz FakeAPI(za sad) i smestamo u products niz uz pomoc useState(setProducts).
Zatim kreiramo Product componentu u kojoj definisemo jedan product.
U ShopPage mapujemo products niz i prosledujemo Product komponenti podatke za 
svaki porduct posebno.

----------------
Redux
----
Koristi se na upravljanje store-a. Sve sto je smesteno u store, 
dostupno je u svakoj componenti
````
npm i react-redux
npm i @reduxjs/toolkit
````

Kreairamo novi folder u src, redux, u kojem kreiramo novi fajl
"userSlice.js".
----
Complete Register form
---
Kreiramo component ActivateUser.
Instaliramo nodemailer.

````
npm i nodemailer
````
Sa nodmailer sajta kopiramo celu konfiguraciju u kojoj imamo transporte kojim
se konfigurisu podaci za transport i u info varijabli definisemo izgled maila:


````
let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <office@onlineShop.com>', // sender address
                to: reqBody.email,// list of receivers
                subject: "Activate Account OnlineShop", // Subject line
                text: '', // plain text body
                html:`<h1>Activate Account</h1>
                       <h4>Dear, ${reqBody.username}</h4>
                       <p>Please click on link bellow to activate your account</p>
                        <a href="hhttp://localhost:3000/user-activate/${saveNewUser._id.toString()}">Activate link</a>"` // html body
            });
````

U userModel dodajemo isActive property preko kojeg cemo kontrolisati da li je
user aktivirao account.

Preko linka u emailu, saljemo ga na stranicu /user-activate/id
Prosledjujemo id tog usera preko URL-a;
Kreiramo route za taj URL i componentu ActivateUserPage.

Zatim u service kreiramo API sa url "/api/complete-registration".
Uzimamo id preko paramsa iz prethodnog linka i saljemo post metodom na backend
taj id.

Na backendu kreiramo novi api, gde updatujemo korisnika na osnovu tog id-a,
i setujemo {isActive:true}.
U ActivateUser page proveravamo da li imamo response, ako imamo redirectujemo korisnika
na /auth stranicu da se loguje.

-----

Product Page
----
Kreiramo route na "/shop/product/:productId"

Zatim kreiramo page ProductPage
Zatim kreiramo component productView
Preko params uzimamo id iz URL.
U product View preko useEffect saljemo axios koji smo definisali u Shop services
da nam vrati taj proizvod preko prosledjenog id-a iz URL.
Handlujemo response i smestamo te podatke u state product.
U returnu definisemo izgled i prosledjujemo podatke koje smo dobili.
Tu komponentu integrisemo u productView page.
---------
ShopCart
----
kreiramo komponentu shopCart u kojoj kreiramo ikonicu shopCart.
Nju smestamo u navikaciju kao nav-item