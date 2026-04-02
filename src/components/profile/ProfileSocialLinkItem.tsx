import { UserSocialLinkResponse } from '@/api/index.schemas';
import { LucideLink, LucideMail } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

interface Props {
  socialLink: UserSocialLinkResponse;
}

function ProfileSocialLinkItem({ socialLink }: Props) {
  const url = socialLink.type === 'EMAIL' ? `mailto:${socialLink.url}` : socialLink.url;

  return (
    <a
      href={url}
      target="_blank"
      className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800"
    >
      {socialLink.type === 'EMAIL' && <LucideMail className="size-4" />}
      {socialLink.type === 'WEBSITE' && <LucideLink className="size-4" />}
      {socialLink.type === 'YOUTUBE' && <FiYoutube />}
      {socialLink.type === 'INSTAGRAM' && <FiInstagram />}
      {socialLink.type === 'X' && <FaXTwitter />}
    </a>
  );
}

export default ProfileSocialLinkItem;
