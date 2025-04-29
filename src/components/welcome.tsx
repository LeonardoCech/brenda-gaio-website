import Image from 'next/image';

import '@/styles/welcome.css';


const Welcome = () => {
  return (
    <div id='welcome' className='w-full h-screen flex flex-wrap items-center justify-evenly'>
      <div className='w-[400px] h-screen flex justify-center items-center'>
        <div id='image-container'>
          <div className='panel' id='panel-1'></div>
          <div className='panel' id='panel-2'></div>
          <Image
            id='image'
            src='/BrendaGaio.png'
            alt='Brenda Aldrovandi Gaio'
            width={401 * 0.75}
            height={622 * 0.75}
          />
        </div>
      </div>

      <div className='w-[500px] flex flex-col gap-[2rem] p-[2rem]'>
        <h1 className='title'>Prazer, Brenda Aldrovandi Gaio</h1>

        <p className='graduation'>Engenheira de Software</p>

        <p className='university'>
          Graduada pela Universidade Católica de Santa Catarina
        </p>
      </div>
    </div>
  );
}
export default Welcome;