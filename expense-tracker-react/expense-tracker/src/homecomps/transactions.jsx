import React, {useState, useReducer, useEffect} from 'react'
import Calendar from './calendar'
import Monthly from './monthly'
import { categories } from './categories';
import '../App.css'

const reducer =(state,action)=>{
    if(action.type === "ADD_TRANSACTION"){
      const newTransaction = [...state.transaction, action.payload]
      return {...state, transaction:newTransaction, showModal:true, msg:"New Transaction added successfully"}  
    }
    return state
}

const defaultState = {
    transaction:[],
    showModal:false,
    msg:""
}
function Transactions({selectedCurrency}) {
    const [form, setForm] = useState(false)
    const [enteredItems, setEnteredItems] = useState({item:"", amount:"", category:"Automobile"})
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [noTransactions, setNoTransactions] = useState(true)
    const [newAmount, setNewAmount] = useState(0)
    const [income, setIncome] = useState(5000)
    const [shillings, setShillings] = useState('')
    const [dollars, setDollars] = useState('')
const displayForm =()=>{
setForm(!form)
}


const handleForm =(e)=>{
    e.preventDefault()
if(enteredItems.item, enteredItems.amount){
    const newItem = {id:Date.now(), item:enteredItems.item, amount:enteredItems.amount, category:enteredItems.category}
   
    dispatch({type:"ADD_TRANSACTION", payload:newItem})
    setEnteredItems({item:"", amount:""})
   
    console.log(enteredItems)
    setForm(false)
}else{
    dispatch({type:"NO_VALUE"})
}

}

const handleChange=(e)=>{
    const {name, value} = e.target
    // console.log(name, value)
    setEnteredItems({...enteredItems, [name]:value})
}

const date = new Date()

const expensesByCategory = state.transaction.reduce((categoryMap, transaction) => {
    const { category, amount } = transaction;
    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += parseFloat(amount);
    return categoryMap;
  }, {});

//changing currency
const ugandanCurrency = ()=>{
    let $ = 3765
    let shs = $ * newAmount
    setShillings(shs)
}

const usaDollars =()=>{
    let shs = 0.00026
    let dollars = newAmount * shs
    setDollars(dollars)
}


useEffect(()=>{
    if(state.transaction.length === 0){
        setNoTransactions(true)
    }else{
        setNoTransactions(false)
    }

    const newAmmount = state.transaction.map(expense =>{
        const {amount} = expense
        return amount
    }).reduce((total, amount) => total + parseInt(amount), 0).toFixed(2)
    setNewAmount(newAmmount)

    const totalIncome = 5000 - newAmmount
    setIncome(totalIncome)

if(selectedCurrency === 'USH'){
    ugandanCurrency()
}
if(selectedCurrency === 'USD'){
    usaDollars()
}

}, [state.transaction])


  return (
    <>

    <div className='row'>
        <div className='col-md-4 dai'>
        <div className='tr'>

<div className='d-flex justify-content-between'>
    <div>
    <h2>Daily Transactions</h2>
    </div>
 
 <div className='cal'>
 <i class="bi bi-calendar"></i>
 <button className='bg-primary traBtn' onClick={displayForm}>+</button>
 </div>
</div>

<div>
   <Calendar/>
   
    <div className='d-flex justify-content-between cover'>
        <div className="expen text-center text-secondary">
            <h4>Total Expenses</h4>
            <span className='money'>
                ${newAmount}
            </span>
          
        </div>

        <div className="expen text-center text-primary">
            <h4>Total Income</h4>
            <span className='money'>
                ${income}
            </span>
        </div>

        <div className="expen text-center text-success">
            <h4>Net</h4>
            <span className='money'>$5000</span>
        </div>
    </div>
</div>


{/* the form */}
{form && (
<form onSubmit={handleForm}>
<h4>Add Transaction</h4>
<div className="mb-3">
<label for="formGroupExampleInput" className="form-label">Item</label>
<input 
type="text" 
class="form-control" 
name='item'
value={enteredItems.item}
id="formGroupExampleInput" 
onChange={handleChange}
required/>
</div>
<div className="mb-3">
<label for="formGroupExampleInput2" className="form-label">Amount</label>
<input 
type="number" 
className="form-control" 
name='amount'
value={enteredItems.amount}
id="formGroupExampleInput2" 
onChange={handleChange}
required/>
</div>

<div className='mb-3'>
    <h6>choose Category</h6>
    <select name='category' onChange={handleChange}>
        {categories.map(cat =>{
            const {name, id} = cat
            return (
                <>
                  <option value={name}>{name}</option>
                </>
            )
        })}
      
    </select>
</div>
<div className='mb-3'>
<button type='submit'className='bg-primary'>Submit</button>
</div>

</form>

)}

{/* Transactions */}
<div>
    {noTransactions ? (<h4 className='text-center text-white bg-primary p-2 mt-3'>No Transactions</h4>) : (
        <ul className='items'>
            {state.transaction.map(transit =>{
                const {item, amount, id} = transit
                return (
                    <>
                      <li className='d-flex justify-content-between' key={id}>
            <div className='d-flex justify-content-between item'>
            <i class="bi bi-amazon"></i>
        <div>
            <h6>{item}</h6>
            <span>{date.toDateString()}</span>
        </div>
            </div>

            <div>
                <h6>${amount}</h6>
            </div>
        </li>
                    </>
                )
            })}
        </ul>
    )}
   
</div>
</div>
        </div>


        <div className='col-md-4 col-sm-12 mon'>
        <Monthly newAmount={newAmount} income={income}  expensesByCategory={expensesByCategory}/>
      </div>
    </div>
   

    
    </>
   
  )
}

export default Transactions
