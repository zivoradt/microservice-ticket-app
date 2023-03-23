import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';



const AppComponent =  ({Component, pageProps, currentUser}) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
                <Component {...pageProps} />
        </div>)
}

AppComponent.getInitialProps = async appContext =>{
    const client = buildClient(appContext.ctx);
    let pageProps = {};
    let data = {};
  
    try {
      const response = await client.get('/api/users/currentuser');
      data = response.data;
      if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
      }
      return { ...data, ...pageProps };
    } catch (error) {
      if (data && !pageProps) {
        return { ...data, pageProps: {} };
      } else if (pageProps && !data) {
        return { pageProps, data: {} };
      } else {
        return {};
      }
    }
  }
export default AppComponent;


