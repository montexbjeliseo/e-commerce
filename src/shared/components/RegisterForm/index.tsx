import { useState } from "react"
import { LabeledInput } from "../LabeledInput"

import './styles.css'

type RegisterFormProps = {
    handleFormSubmit?: (name: string, email: string, password: string) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleFormSubmit }) => {

    const [ error, setError ] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');

        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        if (formData['password'] !== formData['password2']) {
            setError('Passwords do not match');
            return;
        }

        if (handleFormSubmit) {
            handleFormSubmit(formData['name'] as string, formData['email'] as string, formData['password'] as string);
        }
    }

    return (
        <form className="form register-form" onSubmit={handleSubmit}>
            <p className="form-title">Register with email</p>
            <LabeledInput type="text" label="Name" name="name" placeholder="Name" required />
            <LabeledInput type="email" label="Email" name="email" placeholder="Email" required />
            <LabeledInput type="password" label="Password" name="password" placeholder="Password" required />
            <LabeledInput type="password" label="Confirm Password" name="password2" placeholder="Confirm password" required />
            <p className="error-message">{error}</p>
            <input className="btn btn-primary" type="submit" value="Register" />
        </form>
    )
}