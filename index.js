let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

let app = express();


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// app.use(express.static(path.join(__)))
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));

main().then((res)=>{console.log("success")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}






let port = 8080;

app.listen(port,()=>{
    console.log("server is listening");
})


// app.get('/chats',(req,res)=>{
//     res.send("req recieved");
// })


//index route
app.get("/", async (req,res)=>{
let chats = await Chat.find();
console.log(chats);
res.render("index.ejs",{chats});

})

//create route
app.post('/',(req,res)=>{
  let {from, to ,msg} = req.body;
  let newChat = new Chat(
    {
      from: from,
      to : to,
      msg : msg,
      created_At : new Date()
    }
  );

  newChat.save().then(()=>{console.log("save")}).catch(()=>{console.log("res")});
  res.redirect('/');
})


//edit route
app.get('/:id/edit',async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
})


//update route

app.put("/:id", async (req,res)=>{
  let {id } = req.params;
  let {msg} = req.body;
  console.log(msg,id);
  let updateChat =await Chat.findByIdAndUpdate(id,{msg:msg},{new:true,runValidators:true});

  // console.log(updateChat);
  res.redirect('/');

})



//destroy route 
app.delete("/:id",async (req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect('/')


})

app.get('/new',(req,res)=>{
  res.render("new.ejs");
})