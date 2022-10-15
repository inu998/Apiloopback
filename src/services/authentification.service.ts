import { /* inject, */ BindingScope, injectable, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {Authentification} from 'your-module';
 * - export type Authentification = string;
 * - export interface Authentification {}
 */
export type Authentification = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class AuthentificationProvider implements Provider<Authentification> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
