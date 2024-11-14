import argon2 from '@node-rs/argon2';

export async function checkPassword(
  hashedPassword: string | undefined,
  password: string,
) {
  if (!hashedPassword) return false;
  return await argon2.verify(hashedPassword, password);
}
