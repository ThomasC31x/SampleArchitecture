import { Router } from 'express';
import { TYPE_ASSET } from './enum';

export interface Routes {
  path?: string;
  router: Router;
}
