import { useState } from 'react';

import { NavLink } from './NavLink.tsx';
import { icons } from './icons.ts';

export function NavLinks() {
  const [active, setActive] = useState(0);

  return icons.map((link, index) => (
    <NavLink
      {...link}
      key={link.path}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
}
