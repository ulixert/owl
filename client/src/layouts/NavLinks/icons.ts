import {
  IconHeart,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from '@tabler/icons-react';

export const icons = [
  { icon: IconHome, path: '/', needLogin: false },
  { icon: IconSearch, path: '/search', needLogin: false },
  { icon: IconPlus, path: '/create', needLogin: true },
  { icon: IconHeart, path: '/liked', needLogin: true },
  { icon: IconUser, path: '/profile', needLogin: true },
];
