'use client';

import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideCircleUserRound,
  LucideLogOut,
  LucidePalette,
  LucideUserRoundPen,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Sheet } from '.';
import { SettingView } from '../modal/SettingModal';
import SettingAccountMobile from '../setting/SettingAccountMobile';
import SettingDisplayMobile from '../setting/SettingDisplayMobile';
import SettingProfileMobile from '../setting/SettingProfileMobile';

interface Props {
  isOpen: boolean;
  currentView: SettingView;
  setCurrentView: Dispatch<SetStateAction<SettingView>>;
  onClose: () => void;
  onCloseEnd: () => void;
  onLogoutButtonClick: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

function SettingSheet({
  isOpen,
  currentView,
  setCurrentView,
  onClose: handleClose,
  onCloseEnd: handleCloseEnd,
  onLogoutButtonClick: handleLogoutButtonClick,
}: Props) {
  const [direction, setDirection] = useState(0);

  const handleForward = (view: SettingView) => {
    setDirection(1);
    setCurrentView(view);
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentView('menu');
  };

  const getViewTitle = (view: SettingView) => {
    switch (view) {
      case 'menu':
        return '설정';
      case 'profile':
        return '프로필';
      case 'account':
        return '내 계정';
      case 'display':
        return '디스플레이';
    }
  };

  return (
    <Sheet.Root isOpen={isOpen} onClose={handleClose} onCloseEnd={handleCloseEnd} detent="content">
      <Sheet.Backdrop onTap={handleClose} />
      <Sheet.Container>
        <Sheet.Header>
          <div className="relative flex items-center justify-center border-b border-zinc-200 p-4 dark:border-zinc-800">
            {currentView !== 'menu' && (
              <button
                onClick={handleBack}
                className="absolute left-4 cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <LucideChevronLeft className="h-6 w-6" />
              </button>
            )}
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{getViewTitle(currentView)}</h2>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {currentView === 'menu' && (
                <motion.div
                  key="menu"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col"
                >
                  <nav className="flex flex-col">
                    <button
                      onClick={() => handleForward('profile')}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3">
                        <LucideUserRoundPen className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">프로필</span>
                      </div>
                      <LucideChevronRight className="h-5 w-5 text-zinc-400" />
                    </button>
                    <button
                      onClick={() => handleForward('account')}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3">
                        <LucideCircleUserRound className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">내 계정</span>
                      </div>
                      <LucideChevronRight className="h-5 w-5 text-zinc-400" />
                    </button>
                    <button
                      onClick={() => handleForward('display')}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3">
                        <LucidePalette className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">디스플레이</span>
                      </div>
                      <LucideChevronRight className="h-5 w-5 text-zinc-400" />
                    </button>
                    <hr className="my-2 border-zinc-200 dark:border-zinc-800" />
                    <button
                      onClick={handleLogoutButtonClick}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-6"
                    >
                      <LucideLogOut className="h-5 w-5" />
                      <span className="font-medium">로그아웃</span>
                    </button>
                  </nav>
                </motion.div>
              )}
              {currentView !== 'menu' && (
                <motion.div
                  key={currentView}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {currentView === 'profile' && <SettingProfileMobile />}
                  {currentView === 'account' && <SettingAccountMobile />}
                  {currentView === 'display' && <SettingDisplayMobile />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet.Root>
  );
}

export default SettingSheet;
