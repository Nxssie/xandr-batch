import {Router} from 'express';

const router = Router();

import * as creativeCtrl from './creatives.controller';

router.post('/creatives', creativeCtrl.uploadCreative);

