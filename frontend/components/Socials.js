import Link from "next/link";
// ICONOS
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookBoxLine,
  RiPinterestLine,
} from 'react-icons/ri';

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-3xl">
      <Link href={''} className="hover:text-accent transition-all duration-300"><RiYoutubeLine /> </Link>
      <Link href={''} className="hover:text-accent transition-all duration-300"><RiYoutubeLine /> </Link>  
      <Link href={''} className="hover:text-accent transition-all duration-300"><RiInstagramLine /> </Link> 
      <Link href={''} className="hover:text-accent transition-all duration-300"><RiFacebookBoxLine /> </Link> 
      <Link href={''} className="hover:text-accent transition-all duration-300"><RiPinterestLine /> </Link>  
    </div>
  );
};

export default Socials;
