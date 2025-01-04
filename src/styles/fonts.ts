/* eslint-disable import/no-duplicates */
import Montserrat from 'next/font/local';
import BebasNeue from 'next/font/local';

const bebasNeue = BebasNeue({
  src: '../../public/fonts/BebasNeue-Bold.ttf',
  variable: '--bebasNeue',
});

const montserrat = Montserrat({
  src: '../../public/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--montserrat',
});

export { montserrat, bebasNeue };