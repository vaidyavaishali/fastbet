// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import fastbetLogo from '../../assets/brand/fastbetLogo.png'

// const Login = () => {
  

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bets`,newBet);
//     try {
//       const response = await fetch(`http://localhost:4000/api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Save user data to state or local storage for multiuser purposes
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('wallet', JSON.stringify(data.wallet));
//         localStorage.setItem('history', JSON.stringify(data.history));
//         setMessage(`Welcome, ${data.user.username}!`);
//         e.preventDefault();
       
//         navigate('/dashboard')
//         window.location.reload();
          
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage('Error connecting to server. Please try again later.');
//     }
//   };

//   return (
//     <RegistrationPageWrapper>
//       <LeftContainer>
//        <Logo src={fastbetLogo} alt="Shri Matka Logo" />
//         <DownloadButton>
//           For Better Experience
//           <br />
//           Download Shri Matka App
//         </DownloadButton>

//         <SubHeading>Login with Email Id</SubHeading>
//         <FormContainer onSubmit={handleLogin}>
//           <Label>Username</Label>
//           <Input type="text" name="username" placeholder="Enter Your name"    value={username}
//               onChange={(e) => setUsername(e.target.value)} required />

//           <Label>Password</Label>
//           <Input type="password" name="password" placeholder="Min 6 Digit Password"    value={password}
//               onChange={(e) => setPassword(e.target.value)} required />

//           <SignUpButton type="submit">LogIn</SignUpButton>

//           {error && <ErrorMessage>{error}</ErrorMessage>}
//           {success && <SuccessMessage>{success}</SuccessMessage>}

//           <p>Don't have an Account?</p>
//           <Link to="/signup"><SignUpButton>Create new Account</SignUpButton></Link>
//         </FormContainer>
//       </LeftContainer>

//       <RightContainer />
//       <FloatingWhatsappIcon href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />
//     </RegistrationPageWrapper>
//   );
// };

// export default Login;

// const RegistrationPageWrapper = styled.div`
//   min-height: 100vh;
//   display: flex;
//   background: linear-gradient(#0B66FF, #0057D9);
// `;

// const LeftContainer = styled.div`
//   width: 30%;
//   min-width: 320px;
//   background-color: #003C7B;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 2rem 1rem;
//   color: #fff;
// `;

// const RightContainer = styled.div`
//   flex: 1;
// `;

// const Logo = styled.img`
//   width: 120px;
//   height: auto;
//   border-radius: 50%;
//   margin-bottom: 1.5rem;
//   background: yellow;
//   height: 100px;
//   width: 100px;
// `;

// const DownloadButton = styled.button`
//   background-color: transparent;
//   color: #fff;
//   border: 2px solid white;
//   padding: 0.2rem 2rem;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;
//   margin-bottom: 1rem;
//   text-align: center;
//   letter-spacing: 1px;
//   font-size: 1rem;
//   animation: changeBgColor 1.5s infinite;
//   @keyframes changeBgColor {
//     0% { background-color: #e53935; }
//     50% { background-color: #003C7B; }
//     100% { background-color: #e53935; }
//   }
// `;

// const SubHeading = styled.h3`
//   font-size: 1.5rem;
//   margin-bottom: 1rem;
// `;

// const FormContainer = styled.form`
//   width: 100%;
//   max-width: 80%;
//   display: flex;
//   flex-direction: column;
// `;

// const Label = styled.label`
//   text-align: left;
//   margin-bottom: 0.25rem;
//   font-weight: bold;
//   color: #fff;
// `;

// const Input = styled.input`
//   padding: 0.75rem;
//   margin-bottom: 1rem;
//   border-radius: 4px;
//   border: 1px solid #ccc;
//   text-align: left;
//   &:focus {
//     outline: none;
//     border-color: #0B66FF;
//   }
// `;

// const SignUpButton = styled.button`
//   background-color: #007BFF;
//   color: #fff;
//   border: none;
//   padding: 0.75rem;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;
//   width: 100%;
//   &:hover {
//     background-color: #005ce6;
//   }
// `;

// const FloatingWhatsappIcon = styled.a`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   width: 60px;
//   height: 60px;
//   background: url('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg')
//     no-repeat center center;
//   background-size: cover;
//   border-radius: 50%;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.3);
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: bold;
//   text-align: center;
// `;

// const SuccessMessage = styled.p`
//   color: green;
//   font-weight: bold;
//   text-align: center;
// `;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fastbetLogo from '../../assets/brand/fastbetLogo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to state or local storage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('wallet', JSON.stringify(data.wallet));
        localStorage.setItem('history', JSON.stringify(data.history));
        setMessage(`Welcome, ${data.user.username}!`);
        navigate('/dashboard');
        window.location.reload();
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to server. Please try again later.');
    }
  };

  return (
    <RegistrationPageWrapper>
      <LeftContainer>
        <Logo src={fastbetLogo} alt="Shri Matka Logo" />
        <DownloadButton>
          For Better Experience
          <br />
          Download Shri Matka App
        </DownloadButton>

        <SubHeading>Login with Email Id</SubHeading>
        <FormContainer onSubmit={handleLogin}>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Min 6 Digit Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <SignUpButton type="submit">LogIn</SignUpButton>

          {message && <Message>{message}</Message>}

          <p>Don't have an Account?</p>
          <Link to="/signup">
            <SignUpButton>Create new Account</SignUpButton>
          </Link>
        </FormContainer>
      </LeftContainer>

      <RightContainer />
      <FloatingWhatsappIcon href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />
    </RegistrationPageWrapper>
  );
};

export default Login;

const RegistrationPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(#0B66FF, #0057D9);
`;

const LeftContainer = styled.div`
  width: 30%;
  min-width: 320px;
  background-color: #003C7B;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  color: #fff;
`;

const RightContainer = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  background: yellow;
  height: 100px;
  width: 100px;
`;

const DownloadButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 2px solid white;
  padding: 0.2rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 1px;
  font-size: 1rem;
  animation: changeBgColor 1.5s infinite;
  @keyframes changeBgColor {
    0% { background-color: #e53935; }
    50% { background-color: #003C7B; }
    100% { background-color: #e53935; }
  }
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 80%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: #fff;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: left;
  &:focus {
    outline: none;
    border-color: #0B66FF;
  }
`;

const SignUpButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #005ce6;
  }
`;

const FloatingWhatsappIcon = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: url('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg')
    no-repeat center center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

const Message = styled.p`
  color: ${props => (props.children.includes('Error') ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
`;
