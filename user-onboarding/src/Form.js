import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup
        .string()
        .email()
        .required("An email is required."),
    password: yup.string().required("Please set a password."),
    terms: yup.boolean().oneOf([true], "You must agree to Terms of Service to continue.")
})

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [post, setPost] = useState([])

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])

    const validateChange = e => {
        yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        });
      });
    }

    const formSubmit = e => {
        e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);

        setFormState({
          name: "",
          email: "",
          password: "",
          terms: ""
        });
      })
      .catch(err => {
        console.log(err.res);
      });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
            <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <br />
            <label htmlFor="email">
                Email
            <input
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </label> 
            <br />
            <label htmlFor="password">
                Password
            <input
                    id="password"
                    name="password" 
                    value={formState.password}
                    onChange={inputChange}
                    />
                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>
            <br />
            <label htmlFor="terms" className="terms">
                <input
                        type="checkbox"
                        name="terms"
                        checked={formState.terms}
                        onChange={inputChange}
                        />
            Terms of Service
          </label>
            <br />
            <button disabled={buttonDisabled}>Submit</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    );
}