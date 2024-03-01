import './App.css'
import {ChangeEvent, useState} from "react";
import { object, string, number } from 'yup';

let formSchema = object({
    name: string().required('Name muss eingegeben werden'),
    age: number().required('age required').positive('ever heard of negative ages?').integer('full numbers only plz').min(18, 'musst 18+ sein'),
    email: string().required('email required').email('seems invalid...')
});

type Input = {
    name: string,
    age: string,
    email: string,
}

export default function App() {

    const [formValues, setFormValues] = useState<Input>({
        name: '',
        age: '',
        email: '',
    })
    const [submittedFormDatas, setSubmittedFormDatas] = useState<Input[]>([])

    function handleChangeName(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        console.log(value)
        setFormValues({
            ...formValues,
            name: value
        })
    }

    function handleChangeAge(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        console.log(value)
        setFormValues({
            ...formValues,
            age: value
        })
    }

    function handleChangeEmail(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        console.log(value)
        setFormValues({
            ...formValues,
            email: value
        })
    }

    function handleDeleteCard(email:string){
        setSubmittedFormDatas(submittedFormDatas.filter(input => input.email !== email))
    }

    function handleOnSubmit(e){
        e.preventDefault()
        setSubmittedFormDatas([...submittedFormDatas, formValues])
        setFormValues({
            name: '',
            age: '',
            email: '',
        })
    }


  return (
    <>
      <h1>Simple Form with Yup Validation</h1>
        <form onSubmit={handleOnSubmit}>
            <div>
                <label htmlFor={'name'}>Name:</label>
                <input id={'name'} type="text" name={'name'} value={formValues.name} onChange={handleChangeName}/>
            </div>
            <div>
                <label htmlFor={'age'}>Age:</label>
                <input id={'age'} type="text" name={'age'} value={formValues.age} onChange={handleChangeAge}/>
            </div>
            <div>
                <label htmlFor={'email'}>Email:</label>
                <input id={'email'} type="email" name={'email'} value={formValues.email} onChange={handleChangeEmail}/>
            </div>
            <button type={'submit'}>Submit</button>
        </form>
        <ul>
            {submittedFormDatas.map(input => {
                return <li>
                    <h2>Name: {input.name}</h2>
                    <h2>Age: {input.age}</h2>
                    <h2>Email: {input.email}</h2>
                </li>
            })}
        </ul>
    </>
  )
}

