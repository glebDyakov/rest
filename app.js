const express=require('express')
const path=require('path')
const {v4}=require('uuid')
const app=express()
app.use(express.json())
let CONTACTS=[
    {
        id:v4(),
        name:'Владилен',
        value="+7-921-100-20-30",
        marked:false
    }
]
app.get('/api/contacts',(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(CONTACTS)
    },3000)
    
})
app.delete('/api/contacts/:id',(req,res)=>{
    CONTACTS=CONTACTS.filter(c => c.id !==req.params.id)
    res.status(200).json('Контакт был удалён')
})
app.put('/api/contacts/:id',(req,res)=>{
    const idx=CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx]=req.body
    res.json(CONTACTS[idx])
})
app.post('/api/contacts',(req,res)=>{
    const contact={...req.body, id:v4(), marked:false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})
app.use(express.static(path.resolve(__dirname,'client')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
})
app.listen(3000, () => {
    console.log("Server has been started on port 3000")
})
