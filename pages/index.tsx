import React from 'react';

import Weather from '../components/Weather';
import Head from 'next/head';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Погода в вашем городе</title>
      </Head>
      <Weather />
    </div>
  );
};

export default HomePage;
