
//Componentes
import ParticlesContainer from '../components/ParticlesContainer'
import Avatar from '../components/Avatar'

//Framer MOtion
import { motion } from 'framer-motion'

//Variantes 

import { fadeIn} from '../variants'

const Home = () => {
  return (
  <div className='bg-primary/60 h-full'>
    {/** TEXTO Y BOTON GIRATORIO */}
    <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
      <div className='text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto'>
        {/** TITULO */}
        <motion.h1 
          className='h1'
          variants={fadeIn('down', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          Ayúdate a ser feliz <br />con{' '}
          <span className='text-accent'>PositivityPals</span>
        </motion.h1>
          {/** SUBTITULO */}
          <motion.p 
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 text-xl text-white'
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            PositivityPals es una aplicación web diseñada para asistir a personas con depresión y ansiedad, 
            ofreciendo un compendio de recursos como terapias guiadas, ejercicios de mindfulness, 
            y juegos de relajación mental. Los usuarios pueden llevar un diario personal, 
            realizar tests de autoayuda, llevar un seguimiento de su estado de animo
            y despejar la mente con nuestros recursos gratuitos. 
            Esta plataforma busca proporcionar herramientas prácticas y accesibles para mejorar el bienestar emocional de sus usuarios. 
          </motion.p>
          {/** BOTON 
          <div className='flex justify-center xl:hidden relative'>
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn('down', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex'
          >
            <ProjectsBtn />
          </motion.div>*/}
      </div>
    </div>
    {/** IMAGEN */}
    <div className='w-[1000px] h-full absolute right-0 bottom-0'>
      {/** IMAGEN BG */}
      <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-right 
      xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0'>
      </div>
      {/** PARTICULAS */}
      <ParticlesContainer />
      {/** AVATAR IMG */}
      <motion.div
        className='w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]'
        variants={fadeIn('up', 0.5)}
        initial='hidden'
        animate='show'
        exit='hidden'
        transition={{duration: 1, ease: 'easeInOut'}}
        >
        <Avatar />
      </motion.div>
    </div>
  </div>


  );
};

export default Home;
