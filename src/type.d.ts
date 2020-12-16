type data={
  text:string;
  price:number
  id:number
}
type payload={
  text:string;
  price:number
  id:number
  
}


interface item{
    Data:data

}
interface Action{
    payload: payload
    type:string
}
type item=data
type NewItem=(pay:payload)=>void
type RenderItems=(item:object,pay:payload)=>void
type Deletes=(pay:payload)=>void
