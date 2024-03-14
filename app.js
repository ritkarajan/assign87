const express=require("express");
const morgan=require("morgan")

const app=new express();
//middleware
app.use(morgan('dev'));
app.use(express.json());
//in memory storage for task
let  tasks=[]
//route 1.
app.get("/",(req,res)=>{
    res.send(tasks);
})
//route to create a new task
app.post("/tasks",(req,res)=>{
    tasks.push(req.body);
    res.send({messsage:"task added",tasks})
})

//route to get a task by id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task=tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found")
    }
    else{
        res.send(task)
    }
});

//route to update using id
app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
   const updatedTask=req.body;
   const index=tasks.findIndex((task)=>task.id===id);
   if (index===-1){
    res.send("tasks not found");
   } else{
    tasks.splice(index,1,updatedTask);
    res.json(tasks)

   }  
})
   //to delete a task usind id
   app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const index=tasks.findIndex((task)=>task.id===id);
   if (index===-1){
    res.send("tasks not found");
   } else{
    tasks.splice(index,1);
    res.json(tasks)

   }  

    
   
})

//listening
app.listen(3005,(req,res)=>{
    console.log("server is running");
})