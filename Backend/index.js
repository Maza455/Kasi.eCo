const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '10mb' }));


// MY ROUTES
const userRoutes = require("./routes/user.routes")
const traderRoutes = require("./routes/trader.routes")
const customerRoutes = require("./routes/customer.routes")
const productsRoutes = require("./routes/products.routes")
const ordersRoutes = require("./routes/orders.routes")
// const itemRoutes = require("./routes/items.routes")



// const tradeerRoutes = require("./routes/trader.routes")

const PORT = process.env.PORT | 5555;

const DB = require("./config/db.config")
const db = require('./models')
// const Role = db.role

// var corsOptions = {
// origin: "http://localhost:8081"
// };

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:4200', // or '*' for allowing all origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "The Kasi Eco API is working!" })
})

app.use(express.urlencoded({extended: true, limit: '50mb'}));

db.mongoose.connect(DB.db_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(console.log("Connected successfully"))
   .catch(err=>{console.log("Error message : " + err)})

   
// itemRoutes(app)
userRoutes(app)
traderRoutes(app)
customerRoutes(app)
productsRoutes(app)
ordersRoutes(app)

//  require("./routes/trader.routes")(app)

app.listen(PORT, () => {
    console.log(`Server is running @ ${PORT}.`)
});

