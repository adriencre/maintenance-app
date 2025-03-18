// @ts-check
import { test, expect } from '@playwright/test';

test('Title is Liste des Produits', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle("BlackMarket");
});

test('Possede comme H1 "BlackMarket"', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.locator('h1')).toHaveText("BlackMarket");
});

test('Peut on passer une commande', async ({ page }) => {
  
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle(/BlackMarket/);

  await page.click('.add-to-cart-btn'); 

  await page.click('.cart-link');

  await page.fill('.adresse', '10 rue du test, 62750 TestVille');
  await page.click('button[type="submit"]');

});
