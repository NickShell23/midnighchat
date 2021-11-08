require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const telegramBot=require('node-telegram-bot-api');


const config = require("../db/config/db.config.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = require("../db/models");
const User = db.users;
const Creator = db.creators;

/* db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
}); */

// Initial DB informations
function initial() {

    // USERS
    User.create({
        "tg_id": "1234567",
        "tg_userName": "@Khada",
        "first_name": "qweqwe",
        "last_name": "asdasd",
        "email": "toto@gmail.com",
        "verif_code": "123456",
        "balance": "123456",
    });
    User.create({
        "tg_id": "2345678",
        "tg_userName": "@Khada2",
        "first_name": "asdasd",
        "last_name": "zxczxc",
        "email": "toto2@gmail.com",
        "verif_code": "234567",
        "balance": "234567",
    });    
    User.create({
        "tg_id": "3456789",
        "tg_userName": "@Khada3",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO1",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO2",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO3",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });


}

const {TOKEN, SERVER_URL} = process.env;

const TELEGRAM_API=`https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI;




const init = async() => {
axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
.then(res=>{
    console.log(res.data);
  })  
  .catch(error=>{

  });
};





const bot = new telegramBot(TOKEN, { polling: true });

var userMessage_id = null;
var botMessage_id = null;




const mainKeyboard = [
    [
        {
            text:'Midnight Feed 🌅',
            url: 'https://google.com'
        }
    ],
    [
        {
            text:'Creators list 📷',
            callback_data: 'creatorsList'
        },
        {
            text:'Active subscriptions ✅',
            callback_data: 'activeSubscriptions'
        }
    ],
    [
        {
            text:'My Profile 👤',
            callback_data: 'profile'
        }
    ],
    [
        {
            text:'Settings ⚙️',
            callback_data: 'settings'
        },
        {
            text: 'Info ℹ️',
            callback_data: 'info'
        }
    ],
];
const creatorsListKeyboard = [
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const activeSubscriptionsKeyboard = [
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const profileKeyboard = [
    [
        {
            text:'Edit ✏️',
            callback_data: 'edit'
        },
    ],
    [
        {
            text:'Balance 💳',
            callback_data: 'balance'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const editKeyboard = [
    [
        {
            text:'Share my Email',
            callback_data: 'shareEmail'
        },
    ],
    [
        {
            text:'Share my Phone',
            callback_data: 'sharePhone'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const balanceKeyboard = [
    [
        {
            text:'Recharge',
            callback_data: 'shareEmail'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const settingsKeyboard = [
    [
        {
            text:'Language 🌐',
            callback_data: 'language'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const languageKeyboard = [
    [
        {
            text:'EN 🇬🇧',
            callback_data: 'language'
        },
        {
            text:'RU 🇷🇺',
            callback_data: 'language'
        },
        {
            text:'UA 🇺🇦',
            callback_data: 'language'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToSettings'
        }
    ],
];
const infoKeyboard = [
    [
        {
            text:'Go to website 🌎',
            url: 'https://youtube.com'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];



bot.on('message', message => {
    const tg_id = message.chat.id;
    const tg_userName = message.chat.username;
    const first_name = message.chat.first_name;
    const last_name = message.chat.last_name;

    const startTextSplited = message.text.split(" ");
    const startWord = startTextSplited[0];

    const startText = message.text;

    if(startWord == "/start"){
        return;
    }
    else if (startWord == "/echo" && startTextSplited[1]){
        return;
    }
    else{
        userMessage_id = message.message_id;
        console.log("user message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, userMessage_id);
        userMessage_id = null;

        //deletes bots message if you send him new /start request
        if(botMessage_id != null){
            console.log("bot message_id: " + userMessage_id);
            bot.deleteMessage(tg_id, botMessage_id);
            botMessage_id = null;
        }

        const objTg_id = Object.assign({"tg_id": tg_id});
        User.findOne({where: objTg_id}).then(id => {
            if(!id)
            {
                Promise.all([
                    bot.sendMessage(tg_id, "Go wisit our website ;)", {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                    text: "Link",
                                    url: "https://google.com"
                                    }
                                ]
                            ]
                        }
                    })
                ]).then(result => {
        
                    botMessage_id = result[0].message_id;
                    console.log(botMessage_id)
                });
            }
            else
            {
                Promise.all([
                    bot.sendMessage(tg_id,"Keyboard", {
                        reply_markup: {
                            inline_keyboard: mainKeyboard
                        }
                        
                    })
                ]).then(result => {
            
                    botMessage_id = result[0].message_id;
                    console.log(botMessage_id)
                });
            }
        });
    }
})

/* bot.on('message', (message) =>{ */       
bot.onText(/\/start/, (message) => {
    const tg_id = message.chat.id;
    const tg_userName = message.chat.username;
    const first_name = message.chat.first_name;
    const last_name = message.chat.last_name;

/*     const startTextSplited = message.text.split(" ");
    const startWord = startTextSplited[0]; */

    const startText = message.text;

    console.log(tg_id);

/*     console.log(startTextSplited);
    console.log(startWord);  */
    userMessage_id = message.message_id;
    console.log("user message_id: " + userMessage_id);
    bot.deleteMessage(tg_id, userMessage_id);
    userMessage_id = null;

    if(botMessage_id != null){
        console.log("bot message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, botMessage_id);
        botMessage_id = null;
    }
    
/*     if(userMessage_id == null){
        userMessage_id = message.message_id;
        console.log("user message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, userMessage_id);
    }
    else{
        console.log("user message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, userMessage_id);
        userMessage_id = message.message_id;
    } */

    //deletes bots message if you send him new /start request

    /* userMessage_id = message.message_id;  */

/*         console.log(message); */

    //Important
    const sentCode = message.text.replace('/start ', '');

    const objVerif_code = Object.assign({"verif_code": sentCode});
    const objTg_id = Object.assign({"tg_id": tg_id});


    console.log(tg_id);    
    console.log(sentCode);
    console.log(tg_userName);
    console.log(first_name);
    console.log(last_name);
    console.log(objVerif_code);
        

    User.findOne({where: objTg_id}).then(id => {
        if(!id)
        {
            User.findOne({where: objVerif_code}).then(code => {

                console.log(code);

                if(!!code)/* sentCode >= 100000 && sentCode <= 999999 */
                {
                    console.log(JSON.stringify(objVerif_code));

                    const domain = "localhost";

                    User.update( {
                        "tg_id": tg_id,
                        "tg_userName": `@${tg_userName}`,
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": "toto@gmail.com",
                        "verif_code": "",
                    }, {where: objVerif_code});
                    Promise.all([
                        bot.sendMessage(tg_id,"Keyboard", {
                            reply_markup: {
                                inline_keyboard: mainKeyboard
                            }
                        })
                    ]).then(result => {
                        botMessage_id = result[0].message_id;
                        console.log(botMessage_id)
                    });


                }
                else
                {
                    Promise.all([
                        bot.sendMessage(tg_id, "Go wisit our website ;)", {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                        text: "Link",
                                        url: "https://google.com"
                                        }
                                    ]
                                ]
                            }
                        })
                    ]).then(result => {
            
                        botMessage_id = result[0].message_id;
                        console.log(botMessage_id)
                    });
                }
            });
        }
        else
        {
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: mainKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        }
    });
});

bot.onText(/\/echo (.+)/, (message, match) => {

    const tg_id = message.chat.id;
    //take a code only if first part is /start
    userMessage_id = message.message_id;
    console.log("user message_id: " + message);
    bot.deleteMessage(tg_id, userMessage_id);
    userMessage_id = null;

    if(botMessage_id != null)
    {
    console.log("bot message_id: " + userMessage_id);
    bot.deleteMessage(tg_id, botMessage_id);
    botMessage_id = null;
    }
    const startTextSplited = message.text.split(" ");
    const startWord = startTextSplited[0];

    const startText = message.text;

    console.log(startTextSplited);
    console.log(startWord);

    //Important
    const echo = message.text.replace('/echo ', '');

    userMessage_id = message.message_id;

	const chatId = message.chat.id

	
    Promise.all([
        bot.sendMessage(chatId, echo)
    ]).then(result => {

        botMessage_id = result[0].message_id;
        console.log(botMessage_id)
    });
})

bot.on('callback_query', query => {

    const tg_id = query.message.chat.id;

    if(botMessage_id != null)
    {
        console.log("bot message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, botMessage_id);
    }

    switch(query.data)
    {
        case 'creatorsList':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: creatorsListKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'activeSubscriptions':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: activeSubscriptionsKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'profile':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: profileKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'edit':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: editKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'balance':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: balanceKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'settings':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: settingsKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'language':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: languageKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break

        case 'info':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard:infoKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
            break
        case 'back':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: mainKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'backToSettings':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: settingsKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
        case 'backToProfile':
            Promise.all([
                bot.sendMessage(tg_id,"Keyboard", {
                    reply_markup: {
                        inline_keyboard: profileKeyboard
                    }
                    
                })
            ]).then(result => {
        
                botMessage_id = result[0].message_id;
                console.log(botMessage_id)
            });
        break
    }
    bot.answerCallbackQuery({
        callback_query_id: query.id
    })




/*     bot.answerCallbackQuery(query.id, `${query.data}`) */
})



app.listen(process.env.PORT || 4000, async () => {
    console.log('App running on port', process.env.PORT || 4000)
    await init()
});