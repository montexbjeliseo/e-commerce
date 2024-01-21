import { useState } from "react"
import { LabeledInput } from "../LabeledInput"
import { StyledForm } from "../StyledForm"
import { DangerText } from "../DangerText"
import { Button } from "../Button"

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
        <StyledForm onSubmit={handleSubmit}>
            <h3>Register with email</h3>
            <LabeledInput type="text" label="Name" name="name" placeholder="Name" required />
            <LabeledInput type="email" label="Email" name="email" placeholder="Email" required />
            <LabeledInput type="password" label="Password" name="password" placeholder="Password" required />
            <LabeledInput type="password" label="Confirm Password" name="password2" placeholder="Confirm password" required />
            {error && <DangerText>{error}</DangerText>}
            <Button type="submit">Register</Button>
        </StyledForm>
    )
}