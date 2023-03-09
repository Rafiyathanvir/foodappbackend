const express = require("express")
const cors = require("cors")
const app=express();
app.use(express.json());
app.use(
    cors({
      origin: "*",
    })
  );
const Pizza = require('./models/pizzaModel')
const db = require("./database.js")
const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute');
const { traceDeprecation } = require("process");

app.use('/api/pizzas', pizzasRoute)
app.use('/api/users' , userRoute)
app.use('/api/orders' , ordersRoute)

app.get("/",(req,res)=>{
    res.send("server working🔥");
})
app.get("/getpizzas",(req,res)=>{
   Pizza.find({},(err,docs)=>{
    if(err){
        console.log(err);
    }
    else{
        res.send(docs);
    }
   })
})

const port = process.env.PORT || 8000;

app.listen(port, () => `Server running on port🔥`)