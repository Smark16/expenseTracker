import React, {useEffect, useState} from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import useFetch from './customhook';

const url = 'http://127.0.0.1:8000/expenseApi/'
function Monthly({newAmount, income, expensesByCategory}) {
//console.log(expensesByCategory)
const {categories, loading} = useFetch(url)
// generate random color
const combine = '0123456789abcdef'.split('')
const randomColor =()=>{
  let color = '#'
  for(let i=0; i<6;i++){
    let randomColor = Math.floor(Math.random() * combine.length)
    let generated = combine[randomColor]
    color += generated
  } 
  return color
}
useEffect(()=>{
  randomColor()
}, [])


  return (
    <>
    <div className='th'>

    <div className='bg-primary text-white text-center p-2 month mt-3'>
      <h2>set up monthly budget</h2>
    </div>

    <h5>Monthly overView</h5>

    <div className='row mt-3 bugdet text-center p-2'>
        <div className='col-md-12 col-sm-12 text-center mexp'>
            <h4>Expenses</h4>
            <div className='d-block rappper'>
              <div>
              <i className="bi bi-bar-chart-line-fill text-success"></i>
              </div>
           <div className="text-center text-secondary">
           <span className='money'>${newAmount}</span>
           </div>
          
            </div>
           
        </div>

        <div className='col-md-12 col-sm-12 text-center mexpe'>
            <h4>Income</h4>
            <div className='d-block rappper'>
<div>
<i className="bi bi-bar-chart-line-fill text-primary"></i>
</div>
<div className="text-center text-success">
<span className='money'>${income}</span>
</div>
            </div>
          
           
        </div>
    </div>

    <h4 className='mt-5'>Expenses by category</h4>
    <ul className='mt-3'>
      {loading ? (<div class="loader"></div>) : (
        <>
         {categories.slice(0, 3).map(expense =>{
        const {name, id} = expense
        const totalExpense = expensesByCategory[name] || 0
        return (
          <>
            <li key={id} className='d-flex justify-content-between p-2 mt-3 catExpense' style={{backgroundColor:randomColor()}}>    
            <div>
            <h5>{name}</h5>
             <span>${totalExpense}</span>
             </div>
             <h5>33%</h5>
        </li>

          </>
        )
      })}
        </>
      )}
     

      <Link to="/statistics" className='text-center'>View More</Link>
     
    </ul>
    </div>
    
    </>
   
  )
}

export default Monthly
