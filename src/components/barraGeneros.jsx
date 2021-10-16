import React from 'react'
import axios from 'axios'
 const barraGeneros = async () => {
  const genero = await (await axios.get('http://localhost:3001/genres')).data
  console.log(genero)
  return (
    <div>
      
      <select name="genre" placeholder="Search by genre...">
        {genero.map(e=>{
          return  <option value={e}>{e}</option>
        })}
      </select>
    </div>
  )
}
export default barraGeneros