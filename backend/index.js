import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Auth@01234",
    database:"stud_dat",
})

app.use(express.json())
app.use(cors())

// * Get method

app.get('/', (req, res) => {
    res.json("Welcome to the server!")
})
app.get('/students', (req, res) => {
    const q = 'SELECT * FROM students;'

    db.query(q,(err, data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// * Post method

app.post('/students', (req, res) => {
    const q = "INSERT INTO students (`first_name`, `surname`,`gender`, `class`, `dob`, `picture`) VALUES (?)"
    const values = [req.body.first_name, req.body.surname, req.body.gender, req.body.class, req.body.dob, req.body.picture]
    
    // console.log(res)
    db.query(q, [values], (err, data)=> {
        if (err) return res.json(err)
        return res.status(201).json({message: "Created succesfully", data: data})
    })
})

// * Delete method

app.delete('/students/:id', (req, res) => {
    const studID = req.params.id
    const q = 'DELETE FROM students WHERE id = ?'

    db.query(q, [studID], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json({message: "Created succesfully", data: data})
    })
})

// * Update method

app.put('/students/:id', (req, res) => {
    const studID = req.params.id
    const q = 'UPDATE students SET `first_name` = ?, `surname` = ?, `gender` = ?, `class` = ?, `dob` = ?, `picture` = ? WHERE id = ?'
    const values = [req.body.first_name, req.body.surname, req.body.gender, req.body.class, req.body.dob, req.body.picture]

    db.query(q, [...values, studID], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json({message: "Updated succesfully", data: data})
    })
})

app.listen(8800, ()=> {
    console.log('Connected to server!')
})