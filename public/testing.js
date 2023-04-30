const puppeteer = require("puppeteer")

async function go() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15

    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
    });

    // site to be tested

    await page.goto("http://127.0.0.1:5500/public/home.html")

    // go to contact-us page 

    await new Promise((r) => setTimeout(r, 200))

    await page.click("#contact")

    // fill contact-us form

    await new Promise((r) => setTimeout(r, 200))

    await page.type("#contact-name", "Test Tester")
    await page.type("#contact-email", "test@test.com")
    await page.type("#contact-message", "Submission should be prohibited as I am not signed in.")


    // submit

    await page.click("#contact-button")

}


/// call the go() function 
go()