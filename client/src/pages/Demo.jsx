import React, { useState } from 'react'

export default function Demo() {
    const [val,setVal]=useState(0);
function handleInc(){
    setVal (val +1);
}
  return (
    <div>
    <button onClick={handleInc}> click</button>  
    <h2>{val}</h2>
    </div>
  )
}
