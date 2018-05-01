// Install puppeteer before using

const puppeteer = require('/home/ubuntu/npm_stuff/node_modules/puppeteer');

async function run() {
const browser = await puppeteer.launch({
  headless: true
});

var args = process.argv.slice(2);
var USERNAME = args[0];
var PASS = args[1]

const page = await browser.newPage();
const mouse =page.mouse
await page.goto('https://sso-website.com');
const USERNAME_SELECTOR = '#username-button'; // Put your username label after #
const PASSWORD_SELECTOR = '#password-label'; // Put your password label name
const BUTTON_SELECTOR = '#submit-button-label'; //Add your submit button label here


await page.click(USERNAME_SELECTOR);
await page.keyboard.type(USERNAME);

await page.click(PASSWORD_SELECTOR);
await page.keyboard.type(PASS);

await page.click(BUTTON_SELECTOR);

await page.waitFor(4*1000);
await mouse.click(x,x); // Change pushbutton coordinates from x,x to actual coordinate numbers
await page.waitForNavigation();
await page.waitFor(2*1000);

var fs = require('fs');
fs.appendFile("/tmp/good_stuff", "\n"+ USERNAME + "\n" +  JSON.stringify(await page.cookies())+"\n####\n#", function(err) {
    if(err) {
        console.log(err);
        return err;
    }

    console.log("The file was saved!");
});

// To keep session alive browser is not closed
//await browser.close();

}

run();
