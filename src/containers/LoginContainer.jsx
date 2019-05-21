import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import { navigate } from '@reach/router';

const ADVISOR_LOGIN = gql`
  mutation($username: String!, $password: String!) {
    advisorLogin(username: $username, password: $password) {
      token
    }
  }
`;

const LoginContainer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Mutation mutation={ADVISOR_LOGIN}>
      {(login) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              const { data } = await login({ variables: { username, password } });
              localStorage.setItem('token', data.advisorLogin.token);
              navigate('/member');
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          }}
        >
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus 
          />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
          <Button
            text={loading ? 'Loading...' : 'Login'}
            type='submit'
            disabled={loading}
          />
        </form>
      )}
    </Mutation>
  );
};

export default LoginContainer;