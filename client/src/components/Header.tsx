import {
  Flex,
  Image,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  function handleColorSchemeChange() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <Flex justify="center" mt={24} mb={48}>
      <UnstyledButton w={24} onClick={handleColorSchemeChange}>
        <Image
          src={
            computedColorScheme === 'light'
              ? '/logo/owl-dark.svg'
              : '/logo/owl-light.svg'
          }
          alt="logo"
        />
      </UnstyledButton>
    </Flex>
  );
}
