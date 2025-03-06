import React, { useState } from 'react';
import TextField from '../fields/TextField';
import Checkbox from '../fields/Checkbox';
import RadioButton from '../fields/RadioButton';
import Button from '../buttons/Button';
import useAuthStore from '../../store/useAuth';

const SignupForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<string>('');
  // Store
  const { signup, loading } = useAuthStore();

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      signup({
        name,
        email,
        password,
        age: Number(age),
        gender,
        genderPreference,
      });
    }}>
      <div>
        <TextField
          label="Name"
          id="name"
          name="name"
          type="text"
          value={name}
          required
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          autoComplete="email"
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
      <div className="mt-1">
        <TextField
          label="Age"
          id="age"
          name="age"
          type="number"
          value={age}
          min={18}
          max={120}
          required
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
        />
      </div>
      <Checkbox
        label="Male"
        id="male"
        name="male"
        checked={gender == 'male'}
        value="male"
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
      />
      <Checkbox
        label="Female"
        id="female"
        name="female"
        checked={gender == 'female'}
        value="female"
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
      />
      <div>
        <label className="block txt-sm font-medium text-gray-700">Prefer Me</label>
        <div className="mt-2 space-y-2">
          <RadioButton
            label="Male"
            id="prefer-male"
            name="male"
            checked={genderPreference == 'male'}
            value="male"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setGenderPreference(e.target.value)}
          />
          <RadioButton
            label="Female"
            id="prefer-female"
            name="female"
            checked={genderPreference == 'female'}
            value="female"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setGenderPreference(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
    </form>
  );
};

export default SignupForm;