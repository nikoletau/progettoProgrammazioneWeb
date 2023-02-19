#!/bin/bash 

mongo --eval "
    db = db.getSiblingDB('DBsocial');
    db.users.insertOne({_id: 1, username: \"emilyc\", name: \"Emily\", surname: \"Cooper\", birth_date: new Date(\"1993-09-16\"), location: \"London, United Kingdom\", bio: \"Hi! My name is Emily. I'm 29 years old and I'm from London. I'm a painter and in my free time I do yoga and play chello.\", password: \"theKiss93\"});
    db.users.insertOne({_id: 2, username: \"aysepamuk\", name: \"Ayse\", surname: \"Pamuk\", birth_date: new Date(\"2001-03-09\"), location: \"Istanbul, Turkey\", bio: \"Merhaba. Benim adım Ayse. Istanbulda yaşıyorum. Mimarlık okuyorum. Yemek yapmayı çok severim\", password: \"12052020!omar\"});
    db.users.insertOne({_id: 3, username: \"marco99\", name: \"Marco\", surname: \"Rossi\", birth_date: new Date(\"1999-05-28\"), location: \"Florence, Italy\", bio: \"Mi chiamo Marco e sono di Bologna. Sono uno studente di medicina. Mi piace leggere.\", password: \"milan1\"});
    db.users.insertOne({_id: 4, username: \"ahmedna\", name: \"Ahmed\", surname: \"Najjar\", birth_date: new Date(\"1987-02-12\"), location: \"Betlehem, Palestine\", bio: \"Hi, my name is Ahmed and I'm from Palestine. I'm a mechanical engineer. In my free time I like to cook and play basketball.\", password: \"falafel123\"});
    db.users.insertOne({_id: 5, username: \"nanaminakamura\", name: \"Nanami\", surname: \"Nakamura\", birth_date: new Date(\"1972-11-03\"), location: \"Tokyo, Japan\", bio: \"Hello! I'm Nanami. I'm from Tokyo, but I live in Boston. I'm a researcher. I like playing chess.\", password: \"0512nn\"});
    db.users.insertOne({_id: 6, username: \"gregchile\", name: \"Gregorio\", surname: \"Rosario Fernandez\", birth_date: new Date(\"2003-01-14\"), location: \"Santiago, Chile\", bio: \"Hola a todos! Me llamo Gregorio y tengo 20 años. Soy de Chile y soy un profesor. Me gusta jugar fútbol.\", password: \"Chile777\"});
    db.users.insertOne({_id: 7, username: \"laasyaa\", name: \"Laasya\", surname: \"Agarwal\", birth_date: new Date(\"1996-07-11\"), location: \"Mumbai, India\", bio: \"Hello! My name is Laasya. I'm from India and I'm an activist for human rights. I like travelling. So far, I have visited over 60 countries.\", password: \"feminist!\"});
    db.users.insertOne({_id: 8, username: \"mwangio\", name: \"Omwancha\", surname: \"Mwangi\", birth_date: new Date(\"1988-06-22\"), location: \"Nairobi, Kenya\", bio: \"I'm Omwancha and I'm from Kenya. I'm a dancer and in my free time I like to cook.\", password: \"danceismyLIFE\"});
    db.users.insertOne({_id: 9, username: \"krisdju\", name: \"Kristina\", surname: \"Đurović\", birth_date: new Date(\"1998-08-16\"), location: \"Kotor, Montenegro\", bio: \"Zovem se Kristina. Imam 24 godine i dolazim iz Crne Gore. Advokat sam, a u slobodno vrijeme volim da pjevam.\", password: \"MNE2105\"});
    db.users.insertOne({_id: 10, username: \"tiagobra\", name: \"Tiago\", surname: \"Pedreira\", birth_date: new Date(\"1995-11-03\"), location: \"Rio de Janeiro, Brasil\", bio: \"Olá! O meu nome é Tiago e sou biólogo marinho. Eu gosto de nadar e ler.\", password: \"harrypotter1\"});
    db.users.find({}, {_id: 1, username:1, name: 1, surname: 1, birth_date: 1, location: 1, bio: 1, password: 1}).forEach(printjson);    
    print(\"Collezione: users\");
"
echo -e "\n"


mongo --eval "
    db = db.getSiblingDB('DBsocial');
    db.followers.insertOne({_id: 1, follower: \"aysepamuk\", followed: \"marco99\"});
    db.followers.insertOne({_id: 2, follower: \"krisdju\", followed: \"laasyaa\"});
    db.followers.insertOne({_id: 3, follower: \"tiagobra\", followed: \"emilyc\"});
    db.followers.insertOne({_id: 4, follower: \"laasyaa\", followed: \"nanaminakamura\"});
    db.followers.insertOne({_id: 5, follower: \"aysepamuk\", followed: \"emilyc\"});
    db.followers.insertOne({_id: 6, follower: \"marco99\", followed: \"aysepamuk\"});   
    db.followers.insertOne({_id: 7, follower: \"marco99\", followed: \"krisdju\"});
    db.followers.insertOne({_id: 8, follower: \"emilyc\", followed: \"krisdju\"});
    db.followers.insertOne({_id: 9, follower: \"mwangio\", followed: \"tiagobra\"});
    db.followers.insertOne({_id: 10, follower: \"nanaminakamura\", followed: \"tiagobra\"});
    db.followers.insertOne({_id: 11, follower: \"emilyc\", followed: \"gregchile\"});
    db.followers.insertOne({_id: 12, follower: \"nanaminakamura\", followed: \"mwangio\"});
    db.followers.insertOne({_id: 13, follower: \"gregchile\", followed: \"mwangio\"});
    db.followers.insertOne({_id: 14, follower: \"krisdju\", followed: \"ahmedna\"});
    db.followers.insertOne({_id: 15, follower: \"gregchile\", followed: \"aysepamuk\"});
    db.followers.insertOne({_id: 16, follower: \"aysepamuk\", followed: \"laasyaa\"});
    db.followers.insertOne({_id: 17, follower: \"ahmedna\", followed: \"krisdju\"});
    db.followers.insertOne({_id: 18, follower: \"krisdju\", followed: \"emilyc\"});
    db.followers.insertOne({_id: 19, follower: \"mwangio\", followed: \"krisdju\"});
    db.followers.insertOne({_id: 20, follower: \"marco99\", followed: \"nanaminakamura\"});
    db.followers.insertOne({_id: 21, follower: \"laasyaa\", followed: \"aysepamuk\"});
    db.followers.insertOne({_id: 22, follower: \"ahmedna\", followed: \"gregchile\"});
    db.followers.insertOne({_id: 23, follower: \"laasyaa\", followed: \"marco99\"});
    db.followers.find({}, {_id: 1, follower: 1, followed: 1}).forEach(printjson); 
    print(\"Collezione: followers\");
"
echo -e "\n"

mongo --eval "
    db = db.getSiblingDB('DBsocial');
    db.likes.insertOne({_id:1, user: \"krisdju\", id_message: 1});
    db.likes.insertOne({_id:2, user: \"tiagobra\", id_message: 1});
    db.likes.insertOne({_id:3, user: \"emilyc\", id_message: 2});
    db.likes.insertOne({_id:4, user: \"laasyaa\", id_message: 2});
    db.likes.insertOne({_id:5, user: \"ahmedna\", id_message: 4});
    db.likes.insertOne({_id:6, user: \"marco99\", id_message: 4});
    db.likes.insertOne({_id:7, user: \"emilyc\", id_message: 4});
    db.likes.insertOne({_id:8, user: \"aysepamuk\", id_message: 5});
    db.likes.insertOne({_id:9, user: \"gregchile\", id_message: 6});
    db.likes.insertOne({_id:10, user: \"nanaminakamura\", id_message: 6});
    db.likes.insertOne({_id:11, user: \"tiagobra\", id_message: 15});
    db.likes.insertOne({_id:12, user: \"emilyc\", id_message: 15});
    db.likes.insertOne({_id:13, user: \"krisdju\", id_message: 15});
    db.likes.insertOne({_id:14, user: \"mwangio\", id_message: 16});
    db.likes.insertOne({_id:15, user: \"laasyaa\", id_message: 16});
    db.likes.insertOne({_id:16, user: \"gregchile\", id_message: 17});
    db.likes.insertOne({_id:17, user: \"marco99\", id_message: 18});
    db.likes.insertOne({_id:18, user: \"tiagobra\", id_message: 18});
    db.likes.insertOne({_id:19, user: \"ahmedna\", id_message: 19});
    db.likes.insertOne({_id:20, user: \"emilyc\", id_message: 19});
    db.likes.insertOne({_id:21, user: \"aysepamuk\", id_message: 19});
    db.likes.insertOne({_id:22, user: \"laasyaa\", id_message: 19});
    db.likes.insertOne({_id:23, user: \"krisdju\", id_message: 20});
    db.likes.insertOne({_id:24, user: \"nanaminakamura\", id_message: 20});
    db.likes.insertOne({_id:25, user: \"tiagobra\", id_message: 21});
    db.likes.insertOne({_id:26, user: \"mwangio\", id_message: 21});
    db.likes.insertOne({_id:27, user: \"krisdju\", id_message: 22});
    db.likes.insertOne({_id:28, user: \"marco99\", id_message: 22});
    db.likes.insertOne({_id:29, user: \"laasyaa\", id_message: 22});
    db.likes.insertOne({_id:30, user: \"gregchile\", id_message: 12});
    db.likes.insertOne({_id:31, user: \"marco99\", id_message: 8});
    db.likes.insertOne({_id:32, user: \"tiagobra\", id_message: 9});
    db.likes.find({}, {_id: 1, user: 1, id_message: 1}).forEach(printjson);
    print(\"Collezione: likes\");
"
echo -e "\n"

mongo --eval "
    db = db.getSiblingDB('DBsocial');
    db.messages.insertOne({_id: 1, user: \"aysepamuk\", text: \"Greetings from Istanbul\", date: new Date(\"2023-01-14\")});
    db.messages.insertOne({_id: 2, user: \"krisdju\", text: \"Happy birthday, Emily\", date: new Date(\"2023-01-14\")});
    db.messages.insertOne({_id: 3, user: \"tiagobra\", text: \"Any advice for a book?\", date: new Date(\"2023-01-14\")});
    db.messages.insertOne({_id: 4, user: \"laasyaa\", text: \"Who is joining the webinar about human rights?\", date: new Date(\"2023-01-15\")});
    db.messages.insertOne({_id: 5, user: \"tiagobra\", text: \"Ayse, wish I could visit Istanbul. Greetings Rio de Janeiro.\", date: new Date(\"2023-01-15\")});
    db.messages.insertOne({_id: 6, user: \"marco99\", text: \"I just passed my last exam!\", date: new Date(\"2023-01-15\")});   
    db.messages.insertOne({_id: 7, user: \"marco99\", text: \"Hi guys. Anyone's in Rome today?\", date: new Date(\"2023-01-16\")});
    db.messages.insertOne({_id: 8, user: \"emilyc\", text: \"I'm giving English classes. Anyone interested?\", date: new Date(\"2023-01-17\")});
    db.messages.insertOne({_id: 9, user: \"mwangio\", text: \"I'm searching for three people who would split the Netflix account with me. \", date: new Date(\"2023-01-17\")});
    db.messages.insertOne({_id: 10, user: \"nanaminakamura\", text: \"I'm staying in New York for a weekend. Any advice for a Japanese restaurant here?\", date: new Date(\"2023-01-18\")});
    db.messages.insertOne({_id: 11, user: \"emilyc\", text: \"Which part of Harry Potter you like the best?\", date: new Date(\"2023-01-18\")});
    db.messages.insertOne({_id: 12, user: \"nanaminakamura\", text: \"I'm selling two tickets for Lady Gaga's concert.\", date: new Date(\"2023-01-18\")});
    db.messages.insertOne({_id: 13, user: \"gregchile\", text: \"Hey, where are you from, guys?\", date: new Date(\"2023-01-18\")});
    db.messages.insertOne({_id: 14, user: \"krisdju\", text: \"How are you doing?\", date: new Date(\"2023-01-19\")});
    db.messages.insertOne({_id: 15, user: \"gregchile\", text: \"Do you know that t he southermost city is in Chile?\", date: new Date(\"2023-01-19\")});
    db.messages.insertOne({_id: 16, user: \"aysepamuk\", text: \"You should watch tv series called Ezel. It's very good!\", date: new Date(\"2023-01-20\")});
    db.messages.insertOne({_id: 17, user: \"ahmedna\", text: \"I just made hummus. Have you ever tried it?\", date: new Date(\"2023-01-20\")});
    db.messages.insertOne({_id: 18, user: \"krisdju\", text: \"Did you know that Montenegrins, together with the Dutch, are considered the tallest people in Europe?\", date: new Date(\"2023-01-19\")});
    db.messages.insertOne({_id: 19, user: \"mwangio\", text: \"Well, the first woman to win a Nobel Peace Prize was from Kenya.\", date: new Date(\"2023-01-20\")});
    db.messages.insertOne({_id: 20, user: \"marco99\", text: \"What to say about the country that has more World Heritage sites than any other country? It's Italy.\", date: new Date(\"2023-01-20\")});
    db.messages.insertOne({_id: 21, user: \"laasyaa\", text: \"Here one of the interesting facts about India: it has the highest population of vegetarian. Ahmed, any fact about Palestine?\", date: new Date(\"2023-01-21\")});
    db.messages.insertOne({_id: 22, user: \"ahmedna\", text: \"A fact about Palestine? Hmm, the term Palestine has its roots in the ancient land of the Philistines, which was given the name Phillistia by the Greeks.Philistines have been present in the region since the 12th century BC\", date: new Date(\"2023-01-22\")});
    db.messages.insertOne({_id: 23, user: \"laasyaa\", text: \"I'm moving to Lille next month. Any ideas where I can find the appartment?\", date: new Date(\"2023-01-22\")});
    db.messages.find({}, {_id: 1, user: 1, text: 1, date: 1}).forEach(printjson); 
    print(\"Collezione: messages\");
"

