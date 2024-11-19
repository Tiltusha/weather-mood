// components/WeatherCard.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './WeatherCard.module.sass';

interface WeatherCardProps {
  temperature: number;
  weatherDescription: string;
  temperatureDescription: string;
}

const WeatherCard = ({
  temperature,
  weatherDescription,
  temperatureDescription,
}: WeatherCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      className={styles.weatherCard}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className={styles.weatherDescription}
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      >
        {weatherDescription}
      </motion.h2>
      <motion.div
        className={styles.temperature}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {temperature}°C
      </motion.div>
      <motion.p
        className={styles.temperatureDescription}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {temperatureDescription}
      </motion.p>
    </motion.div>
  );
};

export default WeatherCard;
