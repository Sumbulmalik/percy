const percySnapshot = require('@percy/webdriverio');

describe('visual test with percy',()=>{
    
    it('should be able to vslidate title and compare Home page', async()=>{
        await browser.url('https://www.amazon.in/');
        //await expect(browser).toHaveUrl('https://www.amazon.in/')
        //await expect(browser).toHaveUrlContaining('Online Shopping site');
        //await percySnapShot('amazon home page');
    });
});