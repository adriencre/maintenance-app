import { test, expect } from '@playwright/test';

test('La page d\'accueil affiche le texte', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toHaveText('Bienvenue');
});
