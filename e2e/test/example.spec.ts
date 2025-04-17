import { expect, test } from '@playwright/test';

test("a la page d'accueil avec un titre correct", async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Vérifier que le titre contient le nom de votre site
    await expect(page).toHaveTitle(/NextJs Template/);
});

test('a une section hero avec le contenu correct', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Vérifier que les éléments de la page d'accueil sont visibles
    await expect(page.getByText('Build Amazing Things')).toBeVisible();
    await expect(page.getByText('Not From Zero')).toBeVisible();
    await expect(page.getByText('DOCS')).toBeVisible();
});

test('a une navigation fonctionnelle', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Tester la navigation vers le dashboard (ajustez selon votre application)
    // Supposons que vous avez un lien ou un bouton qui vous amène au tableau de bord
    await page.getByRole('link', { name: 'Dashboard' }).click();

    // Vérifier que l'on est bien sur la page dashboard
    await expect(page.url()).toContain('/dashboard');
});
