
const PORT = process.env.PORT ?? 8000
const express = require('express')
const {v4:uuidv4} = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

//get all todos
app.get('/todos/:userEmail',async(req,res) =>{
   
    const {userEmail} = req.params
    
    try{
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1',[userEmail])
    res.json(todos.rows)
    }catch(err){
        console.error(err) 
    }
})

// create a new todo
app.post('/todos',async(req,res) =>{
    const {user_email,title,progress,date} = req.body
    console.log(user_email,title,progress,date)
    const id = uuidv4()
    try{
        const newToDo = await pool.query(`INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)`,
            [id,user_email,title, progress,date]
        )
        res.json(newToDo)
    }catch(err){
        console.error(err)
    }
})
// edit a newToDo

app.put('/todos/:id',async(req,res) =>{
    const {id} = req.params
    const {user_email,title,progress,date} = req.body
    try{
        const editToDo = await pool.query(`UPDATE todos SET user_email = $1, title = $2,progress = $3 , date = $4 WHERE id = $5;`,[user_email,title,progress,date,id])
        res.json(editToDo)
    }catch(err){
        console.error(err)
    }
})

// Delete todos

app.delete('/todos/:id',async(req,res) =>{
    
    
    try{
        const {id} = req.params
        const deletedToDo = await pool.query(`DELETE FROM todos WHERE id = $1`,[id])
        res.json(deletedToDo)
    }catch(err){
        console.error(err)
    }
})
//Sign Up
app.post('/signup', async (req,res) =>{
    const {email ,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password,salt)
    try{
        const signUp = await pool.query(`INSERT INTO users (email,hashed_password) VALUES($1,$2)`,
            [email,hashed_password]
        )
        const token = jwt.sign({email}, 'secret',{expiresIn:'1hr'})
        res.json({email,token})
    }catch(err){
        console.error(err)
        if(err){
            res.json({detail : err.detail})
        }
    }
})
//login
app.post('/login', async (req,res) =>{
    const {email ,password} = req.body
    try{
      const users =   await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
      if(users.rows.length === 0)return res.json({detail : 'User not exist'})
        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
      const token = jwt.sign({email}, 'secret',{expiresIn:'1hr'})

    if(success){
        res.json({'email' : users.rows[0].email,token})
    }else{
        res.json({detail: "Login is failed"})
    }
      
    }catch(err){
        console.error(err)
    }
})

app.get('/',(req,res) =>{
    res.send("Hello wrod")
})

app.listen(PORT ,() => console.log (`Server running on PORT ${PORT}`))