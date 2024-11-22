import { useNavigate } from 'react-router-dom';

import { Menu } from '@mantine/core';
import { useTitleStore } from '@stores/titleStore.ts';

import classes from './DropdownMenu.module.css';

type DropDownMenuProps = {
  target: React.ReactNode;
  itemsBeforeDivider: { name: string; color?: string; path: string }[];
  itemsAfterDivider: { name: string; color?: string; onClick: () => void }[];
};

export function DropdownMenu({
  target,
  itemsBeforeDivider,
  itemsAfterDivider,
}: DropDownMenuProps) {
  const navigate = useNavigate();
  const setTitle = useTitleStore((state) => state.setTitle);

  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{ transition: 'fade-down', duration: 200 }}
      openDelay={100}
      closeDelay={300}
    >
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        {itemsBeforeDivider.map((item) => (
          <Menu.Item
            className={classes.dropdownItem}
            key={item.name}
            color={item.color}
            onClick={() => {
              setTitle(item.name);
              navigate(item.path);
            }}
          >
            {item.name}
          </Menu.Item>
        ))}

        <Menu.Divider className={classes.divider} />

        {itemsAfterDivider.map((item) => (
          <Menu.Item
            className={classes.dropdownItem}
            key={item.name}
            color={item.color}
            onClick={item.onClick}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
