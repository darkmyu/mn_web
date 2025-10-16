import type { components } from '@/api/schema';

/** user */
export type UserResponse = components['schemas']['UserResponse'];

/** auth */
export type AuthInfoResponse = components['schemas']['AuthInfoResponse'];
export type AuthRegisterRequest = components['schemas']['AuthRegisterRequest'];

/** animal */
export type AnimalResponse = components['schemas']['AnimalResponse'];
export type AnimalCreateRequest = components['schemas']['AnimalCreateRequest'];
export type AnimalUpdateRequest = components['schemas']['AnimalUpdateRequest'];

/** animal enums */
export type AnimalGender = components['schemas']['AnimalResponse']['gender'];
export type AnimalSpecies = components['schemas']['AnimalResponse']['breed']['species'];

/** breed */
export type BreedResponse = components['schemas']['BreedResponse'];
