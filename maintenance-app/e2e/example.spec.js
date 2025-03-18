// @ts-check
import { test, expect } from '@playwright/test';

test('Title is Liste des Produits', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("BlackMarket");
});
test('Possede comme H1 "BlackMarket"', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Expect a title "to contain" a substring.
  await expect(page.locator('h1')).toHaveText("BlackMarket");
});
