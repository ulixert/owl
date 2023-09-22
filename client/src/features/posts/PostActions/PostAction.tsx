import { ActionIcon, HoverCard, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';

type PostActionProps = {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
  type: string;
};

export function PostAction({
  children,
  color,
  onClick,
  type,
}: PostActionProps) {
  const { hovered, ref } = useHover();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onClick();
  }

  return (
    <HoverCard shadow="md" openDelay={500}>
      <HoverCard.Target>
        <div ref={ref}>
          <ActionIcon
            onClick={handleClick}
            radius={100}
            p={4}
            w={32}
            h={32}
            variant="subtle"
            color={hovered ? color : 'gray.6'}
          >
            {children}
          </ActionIcon>
        </div>
      </HoverCard.Target>

      <HoverCard.Dropdown py={2} px={4}>
        <Text size="xs">{type}</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
