import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  if (!currentUser) {
    return <h1>You are not signed in</h1>;
  }

  return <h1>You are signed in</h1>;
};

LandingPage.getInitialProps = async context=>{
 console.log('Landing page')
  const client = buildClient(context);

  const {data} = await client.get('/api/users/currentuser');
  console.log(data)
  return data; 
};
  




export default LandingPage;