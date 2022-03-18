import dotenv from 'dotenv';
dotenv.config();
import { chromium } from 'playwright'

const csrUser = process.env.CLICK_USER;
const csrPass = process.env.CLICK_PASS

export class ChromiumComponent {
  async passClickTest(advId, creId) {
    return new Promise(async (resolve, reject) =>{
      try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`https://invest.xandr.com/creative-ui/${advId}/${creId}/edit`);
        await page.fill('input[name="username"]', csrUser);
        await page.click('text=Next');
        await page.fill('input[name="password"]', csrPass);
        await page.click('text=Sign In');
        await page.locator(':nth-match(:text("Secure Preview"), 1)').click();

        await browser.close().then(() => {
          resolve(`Creative ${creId} tested`)
        });

      } catch (error) {
        reject(error);
        throw error;
      }

    })

  }
}

/*page.on('response', async (resp) => {
  await resp.request().allHeaders().then((data)=>{
    dataObj.push(data);
  })
});

for(let obj in dataObj) {
  if(dataObj[obj]['sec-fetch-dest'] === 'image') {
    data.push(dataObj[obj]);
  }
}

let dataObj = [];
let data = [] */