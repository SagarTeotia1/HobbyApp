import { nanoid } from 'nanoid/non-secure';

export function generateUUID(size = 21): string {
  return nanoid(size);
}
