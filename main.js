const puppeteer = require('puppeteer');

const amount = process.argv[2]


if (!amount || isNaN(parseFloat(amount))) {
  console.error('Please enter a numeric amount as an argument')
  process.exit(1)
}

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

   // Set navigation timeout to 60 seconds
  await page.setDefaultNavigationTimeout(60000);
  await page.goto('https://a071-dhsapps.nyc.gov/landlordportal/successful.aspx#');


  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#ctl00_MainContent_btnRegister') // Clicking the link will indirectly cause a navigation
  ]);
    
    
    const offer_submit = await page.$('#ctl00_MainContent_OfferSubmittedByUserType_RB7_I_D')
    
    offer_submit.click()

    const building_number = await page.$('#ctl00_MainContent_Building_StreetNumber_I')

    const street_name=   await page.$('#ctl00_MainContent_Building_StreetName_I')

    const city = await page.$('#ctl00_MainContent_pnlNonNyc_Building_City_I')

    const state = await page.$('#ctl00_MainContent_pnlNonNyc_Building_State_I')

    const zip_code = await page.$('#ctl00_MainContent_pnlNonNyc_Building_Zip_I')

    const first_name = await page.$('#ctl00_MainContent_Contact_FName_I')

    const last_name = await page.$('#ctl00_MainContent_Contact_LName_I')

    const phone_number = await page.$('#ctl00_MainContent_Contact_PhonePrimary_I')

    const email_address = await page.$('#ctl00_MainContent_Contact_Email_I')

    /*landlord*/

    const landlord_first_name = await page.$('#ctl00_MainContent_Landlord_FName_I')

    const landlord_last_name = await page.$('#ctl00_MainContent_Landlord_LName_I')

    const landlord_phone_number = await page.$('#ctl00_MainContent_Landlord_PhonePrimary_I')

    const landlord_email_address = await page.$('#ctl00_MainContent_Landlord_Email_I')

    const landlord_address = await page.$('#ctl00_MainContent_Landlord_AddressStreetName_I')

    const landlord_city = await page.$('#ctl00_MainContent_Landlord_AddressCity_I')

    const landlord_state = await page.$('#ctl00_MainContent_Landlord_AddressState_I')

    const landlord_zip_code = await page.$('#ctl00_MainContent_Landlord_AddressZip_I')


    
    await building_number.type('123')
    await street_name.type('Street Avenue')
    await city.type('New York')
    await state.type('New York')
    await zip_code.type('10001')
    await first_name.type('Inspection')
    await last_name.type('Name')
    await phone_number.type('9876543210')
    await email_address.type('test@gmail.com')
    await landlord_first_name.type('Landlord')
    await landlord_last_name.type('Landlord')
    await landlord_phone_number.type('9876543210')
    await landlord_email_address.type('test@gmail.com')
    await landlord_address.type('123')
    await landlord_city.type('Street Avenue')
    await landlord_state.type('New York')
  await landlord_zip_code.type('10001')
  
  await page.waitForSelector('#ctl00_MainContent_btnAddNewApartment');
// Click the button to add a new apartment
await page.click('#ctl00_MainContent_btnAddNewApartment');

// Wait for the apartment form fields to appear
await page.waitForSelector('#ctl00_MainContent_GridApartments_efnew_ASPxTextBoxUnit_Name_I');

// Fill in the apartment form
await page.type('#ctl00_MainContent_GridApartments_efnew_ASPxTextBoxUnit_Name_I', '1A');
await page.type('#ctl00_MainContent_GridApartments_efnew_ASPxTextBoxUnit_Floor_I', '1');
await page.type('#ctl00_MainContent_GridApartments_efnew_ASPxSpinEditUnit_NumberOfRooms_I', '1');
await page.type('#ctl00_MainContent_GridApartments_efnew_ASPxSpinEditUnit_NumberOfBedRooms_I', '1');
await page.type('#ctl00_MainContent_GridApartments_efnew_pnlForCondoOnly_ASPxTextBoxCondoBlock_I', '12345');
await page.type('#ctl00_MainContent_GridApartments_efnew_pnlForCondoOnly_ASPxTextBoxCondoLot_I', '1234');
await page.type('#ctl00_MainContent_GridApartments_efnew_ASPxSpinEditUnit_RentAmount_I', '3000');
  
  
await page.click('#ctl00_MainContent_GridApartments_efnew_ASPxButton1');


  // Finally click submit
    
await page.click('#ctl00_MainContent_btnSaveRegistration');
  
  

     // Generate timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  // Save screenshot with timestamp in the filename
  const screenshotPath = `screenshot_${timestamp}.png`;
  await page.screenshot({ path: screenshotPath });


  console.log('Form Submitted!');

  await browser.close();
})();