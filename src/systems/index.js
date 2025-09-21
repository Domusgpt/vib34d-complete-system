import createAethericSystem from './aetheric/aetheric.js';
import createPrismaticSystem from './prismatic/prismatic.js';

export const SYSTEMS = [
  createAethericSystem(),
  createPrismaticSystem()
];