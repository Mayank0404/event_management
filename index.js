const express=require('express')
const { default: mongoose } = require('mongoose')
const { MONGOURI } = require('./keys')
const cors=require('cors')



const app=express()
app.use(express.json())
const connectToDatabase = async () => {
    try {
      await mongoose.connect(MONGOURI);
      console.log("Database Connected");
    } catch (err) {
      console.error(err);
    }
  };
  
  // Call the async function to connect to the database
  connectToDatabase();
  app.use(cors())

  app.use(require('./routes/auth'))
  
  app.use(require('./routes/event'))


const PORT=4000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))