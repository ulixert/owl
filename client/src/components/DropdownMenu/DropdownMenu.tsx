import { Menu } from '@mantine/core';

import classes from './DropdownMenu.module.css';

type DropDownMenuProps = {
  target: React.ReactNode;
  itemsBeforeDivider: { name: string; color?: string }[];
  itemsAfterDivider: { name: string; color?: string }[];
};

export function DropdownMenu({
  target,
  itemsBeforeDivider,
  itemsAfterDivider,
}: DropDownMenuProps) {
  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{ transition: 'fade-down', duration: 200 }}
      openDelay={100}
      closeDelay={300}
      trigger="click-hover"
    >
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        {itemsBeforeDivider.map((item) => (
          <Menu.Item
            className={classes.dropdownItem}
            key={item.name}
            color={item.color}
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
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
