import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import config from './config.js'

/*Routes*/
import universalPixelRoutes from './routes/UniversalPixel/universalPixel.routes.js'
import advertiserRoutes from './routes/Advertiser/advertiser.routes.js'


const app = express()

app.set('port', config.PORT);

app.use(morgan('dev'))
//app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(universalPixelRoutes);
app.use(advertiserRoutes);

export default app;