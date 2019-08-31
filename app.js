const express=require("express")
const app=express()
const fs=require('fs')
const tours=JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.use(express.json())

app.get('/api/v1/tours',(req,res)=>{
  res.status(200).json({
    status:"success",
    result:tours.length,
    data:{
      tours
    }
  })
})


app.get('/api/v1/tours/:id',(req,res)=>{
console.log(req.params);
const id=req.params.id*1
const tour=tours.find(x=>x.id===(id))

if(!tour){
return  res.status(404).json({
  status:"fail",
  message:"invalid"
})
}

  res.status(200).json({
    status:"success",
    result:tours.length,
    data:{
      tour
    }
  })
})


app.post('/api/v1/tours',(req,res)=>{
  console.log(req.body);
  const newId=tours[tours.length-1].id+1;
  const newTour=Object.assign({id:newId},req.body);
  res.send("done")
tours.push(newTour)
fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
res.status(201).json({
  status:'success',
  data:{
    tour:'newTour'
  }
})
})
})


app.patch('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id>tours.length){
  return  res.status(404).json({
    status:"fail",
    message:"invalid"
  })
  }

  res.status(201).json({
    status:'success',
    data:{
      tour:'Updated'
    }
  })
})



app.delete('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id*1>tours.length){
  return  res.status(404).json({
    status:"fail",
    message:"invalid"
  })
  }

  res.status(204).json({
    status:'success',
    data:null
  })
})

//204:no content



app.listen(3000,()=>console.log("server started!"))
