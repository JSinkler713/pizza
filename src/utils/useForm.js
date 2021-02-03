import { useState } from 'react'

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValues(e) {
    let value = e.target.value
    if (e.target.type === 'number') {
      value = parseInt(value)
    }
    setValues(
      //set rest of state the same, and change the 
      //state of the input that changed
      { ...values, [e.target.name]: value }
    )
  }

  //return the piece of state, and also the updater function
  return { values, updateValues }

}
