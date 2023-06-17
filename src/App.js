import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import "./styles.css";
import ButtonsResult from "./components/ButtonsResult";
import DownShift from "./components/DownShift";

const defaultValues = {
  downShift: "apple"
}

function App() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  
  return (
    <form onSubmit={handleSubmit(data => setData(data))} className="form" >
      <div className='container'>
        <section>
          <label >Native Input: </label>
          <input name='Native' className='input' {...register('native')} />
        </section>
        <section>
          <Controller render={DownShift} control={control} name='downShift' />
        </section>
      </div>
      <ButtonsResult {...{data, reset, defaultValues }} />
    </form>
  )
  

}
export default App;