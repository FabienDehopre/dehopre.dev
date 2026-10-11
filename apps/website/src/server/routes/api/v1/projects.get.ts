import type { Projects } from '../../../../models/project';

import { defineEventHandler } from 'h3';

import { CURATED_PROJECTS } from '../../../projects/curated-projects';
import { loadProjects } from '../../../projects/load-projects';

// Prerendered pages call this route at build time only (see ADR 0001).
export default defineEventHandler(async (): Promise<Projects> => loadProjects(CURATED_PROJECTS));
