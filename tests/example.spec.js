import { test, expect } from '@playwright/test';
import path from 'path';

test('Playwright click() automatically waits for the button to be enabled', async ({ page }) => {
  // Construct the file path to the local HTML file
  // This is the key to running your local HTML file
  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`);

  const installButton = page.locator('#install-btn');
  const statusElement = page.locator('#status');

  // We click the button *immediately*. 
  // Playwright's click() action will automatically wait (for up to 30s by default)
  // for the button to become **enabled** and **visible**.
  console.log('Attempting click on disabled button. Playwright will start waiting...');
  
  const startTime = Date.now();
  await installButton.click();
  const endTime = Date.now();
  
  const waitDuration = (endTime - startTime) / 1000;
  console.log(`Click action completed successfully after approximately ${waitDuration.toFixed(2)} seconds.`);

  // Assert the final state to confirm the click *actually* happened
  await expect(statusElement).toHaveText('Button clicked!');
  console.log('Assertion passed. The test successfully waited and clicked.');
});
