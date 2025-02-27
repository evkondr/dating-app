import React, { useState } from 'react';
import Button from './buttons/Button';
import TextField from './fields/TextField';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loading = false;
  return (
    <form className="space-y-6">
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
      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;