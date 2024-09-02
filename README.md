![login](https://github.com/user-attachments/assets/e8ffe6c6-f1e7-4d02-9ae9-6486a25bf7cd)# Tameshk ,A user friendly web app for foodies!
Tameshk is a web app developed with django and react. This app has four diffrent access levels and at each level offers a usefull set of functionalities.
## Viewers
If you're not sure wether this web app is worth signing up, There is no problem! everyone who hasn't signed up yet is welcome to view the list of restaurants and their menu's, but when it comes to ordering or reservation, signing up is needed.

![main](https://github.com/user-attachments/assets/b3e85903-bb50-456f-9d5c-11255e498fa1)


![signup](https://github.com/user-attachments/assets/34c56f2e-cd18-4c9e-af90-29f326eb2612)

## Customers
After signing up customers can searchand filter their favourite restaurants and browse their menu's. One thing that makes tameshk different from others is that you can also make reservations within the app!

![login](https://github.com/user-attachments/assets/8fe09268-4bd4-4e42-8c5a-90c79c12056c)

![cospanel](https://github.com/user-attachments/assets/d8529e08-659c-4af7-8d29-be7753712700)

![rate](https://github.com/user-attachments/assets/27bcd9ef-985e-4e94-9e98-f036d2a87530)

![menu](https://github.com/user-attachments/assets/2c64fe71-9089-42b8-84fe-3d605ea7ef84)

## Restaurant Admins
Once a restaurant is registered to tameshk ,a profile is created for the Restaurant Admin so they can add their menu and reservation condition.

![res log](https://github.com/user-attachments/assets/63990872-2b09-479c-aeaf-eb7455550431)

![addfood](https://github.com/user-attachments/assets/67e3eaae-0ce5-4d33-bdb5-d6482aa8230d)

![res panel](https://github.com/user-attachments/assets/0001f31f-dca2-4f0f-9702-81712c656dcf)

![photo_2024-01-28_16-47-33](https://github.com/user-attachments/assets/a52b56d5-0ae9-423c-b2e9-689071360019)![sample menu](https://github.com/user-attachments/assets/33c13c4a-573b-4333-9e5a-5322b14ffd7f)

![photo_2024-01-29_02-48-11](https://github.com/user-attachments/assets/1b8fabce-83e8-4b50-909a-994fb9b3dccb)

![photo_2024-01-28_16-45-10](https://github.com/user-attachments/assets/efc8c34c-ed87-4da6-93da-4e0b747a3860)


## Tameshk Admin
Tameshk is managed by a group of admins who have can register restaurants and controll accessiblity of diffrent users

![site log](https://github.com/user-attachments/assets/eb4cbb82-c7c9-4bc8-91ba-469efce6cf20)

![site panel](https://github.com/user-attachments/assets/eefb0eaf-3808-4c31-8a46-1de9d026040a)

![add res](https://github.com/user-attachments/assets/756d640d-1e5f-4544-a265-334a46414072)


### Tameshk is a Safe and Secure web app and each user profile page is secured and all routes are private
Tameshk is documented using Swagger and SonarQube is used for on-premise analysis to detect coding issues.
Api documentation is as follows:

#### Admin section:

1- Site admin - Add Restaurant[Post]:    

    Restaurant name:Charfield
    Restaurant Image:ImageField
    Restaurant description:Charfield
    Restaurant Type:Charfield
    Restaurant Location : Charfield
    Restaurant Username: Charfield
    Restaurant Password: Charfield

2- Site admin - Add Restaurant[Post]:

    Site Admin → (username, password)

3- Restaurant admin - Menu[Post]:

    Food name:Charfield
    Food price:Charfield
    Food Image:ImageField
    Food description:Charfield

#### User Section:


4- user - login [Post]:
               
    Email :  Charfield          
    Password : Charfield
 5- user - signup[Post] : 
 
    FirstName : Charfield 
    LastName : Charfield 
    PhoneNumber: Charfield 
    Email: Charfield 
    Address : Charfield 
    Password :Charfield 

#### Restaurant Admin Section :

6 - Restaurant Admin - create food [post]:

     Foodname : Charfield 
     Id : Charfield 
     FoodPrice: Charfield 
     FoodDescription : Charfield 
     FoodType : Charfield 
     FoodImage : Charfield 


7- Restaurant Admin - Restaurant Admin Login View [post]:

    Restaurant Username: Charfield 
    Restaurant Password: Charfield 
