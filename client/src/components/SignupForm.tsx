import React, { useState } from 'react';
import TextField from './fields/TextField';

const SignupForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<string>('');

  const signUp = () => {
    console.log('sign up ');
  };
  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      signUp();
    }}>
      <div>
        <TextField
          label="Email"
          id="email"
          name="name"
          type="email"
          autoComplete="email"
          value={email}
          required
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          required
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SignupForm;