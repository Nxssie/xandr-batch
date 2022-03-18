import {Router} from 'express';

const router = Router();

import * as universalCtrl from './universalPixel.controller.js';

router.get('/universal-pixel', universalCtrl.getUniversalAudiencesById)

export default router;