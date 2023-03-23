import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  if (!currentUser) {
    return <h1>You are not signed in</h1>;
  }

  return <h1>You are signed in</h1>;
};

LandingPage.getInitialProps = async (context)=>{
 
  try {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      return { data: null };
    } else {
      throw error;
    }
  }
};
  




export default LandingPage;