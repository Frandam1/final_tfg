//Fuentes
import { Sora } from 'next/font/google'
//Settings
const sora =({
  subsets: ['latin'],
  variable: '--font-sora', //tailwind config
  weight: ['100','200','300','400','500','600','700','800']
});

//Componentes que vamos a necesitar 
import Nav from '../components/Nav';
import Header from '../components/Header';
import TopLeftImg from '../components/TopLeftImg';

const Layout = ({children}) => {
  return (
    //Referencia a global.css
  <div className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}> 
    <TopLeftImg />
    <Nav />
    <Header />
    {children}
  </div>
  );
};

export default Layout;
