import {Router} from 'express';

const router = Router();

import * as advertiserCtrl from './advertiser.controller.js';

router.get('/adv/active', advertiserCtrl.getAllActiveAdv)

export default router;