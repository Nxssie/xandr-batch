import {Axios} from '../../components/axios.component.js';
import ConversionTemplates from './Templates/ConversionTemplates.js';

const axios = new Axios().instance;

/* https://api.appnexus.com/universal-pixel/conversion */

export class ConversionPixelService {
    viewList() {
        
    }
    
    checkConversionById(id) {
        axios.get(`/universal-pixel/conversion?universal_pixel_id=${id}`).then(async (res) => {
            console.log(res.data);
        })
    }

    createConversionUPByUUID() {
        let aux = false;
        let templates;
    
        if (!aux) {
            templates = [ConversionTemplates.motor1de3, ConversionTemplates.conversion3de3]
        } else {
            templates = [ConversionTemplates.auxMotor1de3, ConversionTemplates.auxMotor2de3, ConversionTemplates.auxConversion3de3]
        }
    
    
        for (let i = 0; i < templates.length; i++) {
            //console.log(templates[i]);
            axios.post('/universal-pixel/conversion', templates[i]).then(async (res) => {
                console.log(res.data);
            })
        }
    }
}