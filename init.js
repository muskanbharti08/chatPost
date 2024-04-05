
let mongoose = require('mongoose');
const Chat = require('./models/chat.js')

main().then((res)=>{console.log("success")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChats = [
    {
    from : "Muskan",
    to : "priya",
    msg: "send me notes of all subjects",
    created_At : new Date()
  },
  {
    from : "Muskan",
    to : "radha",
    msg: "send me book of java",
    created_At : new Date()
  },{
    from : "priti",
    to : "Muskan",
    msg: "send me your whatsapp Number",
    created_At : new Date()
    
  }
];

Chat.insertMany(allChats);
  
  
  
  