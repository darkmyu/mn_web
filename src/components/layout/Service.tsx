import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ROUTE_HOME_PAGE } from '@/constants/route';
import { usePathname, useRouter } from 'next/navigation';

interface Service {
  label: string;
  route: string;
}

const services: readonly Service[] = [
  {
    label: '랭킹',
    route: ROUTE_HOME_PAGE,
  },
  {
    label: '커뮤니티',
    route: '/community',
  },
];

function Service() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedService, setSelectedService] = useState(
    services.find((service) => service.route === pathname) || services[0],
  );

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    router.push(service.route);
  };

  return (
    <ul className="relative flex gap-2">
      {services.map((service) => {
        const isSelected = selectedService === service;

        return (
          <li
            key={service.label}
            onClick={() => handleServiceClick(service)}
            className={`relative cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isSelected
                ? 'font-semibold text-emerald-700 dark:text-emerald-400/80'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            } `}
          >
            <span className="relative z-10">{service.label}</span>
            {isSelected && (
              <motion.div
                layoutId="active-tab-background"
                className="absolute inset-0 z-0 rounded-2xl bg-emerald-100/70 dark:bg-emerald-400/10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Service;
