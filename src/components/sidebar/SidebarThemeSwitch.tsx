import { useTheme } from 'next-themes';
import { IoSunny } from 'react-icons/io5';
import { PiMoonFill } from 'react-icons/pi';

function SidebarThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeClick = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button className={'flex items-center justify-center'} onClick={handleThemeClick}>
      {resolvedTheme === 'light' && <IoSunny className={'h-6 w-6 cursor-pointer text-gray-500'} />}
      {resolvedTheme === 'dark' && <PiMoonFill className={'h-6 w-6 cursor-pointer text-gray-500'} />}
    </button>
  );
}

export default SidebarThemeSwitch;
