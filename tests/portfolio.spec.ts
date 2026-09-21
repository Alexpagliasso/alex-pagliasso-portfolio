import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const sizes = [
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1440, 900],
  [1920, 1080],
];

for (const [width, height] of sizes) {
  test(`${width}x${height}: layout, navigation and visible content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "ALEXPAGLIASSO",
    );
    await expect(page.locator(".card")).toHaveCount(20);
    await expect(page.locator('.section-title code')).toHaveText(['00', '01', '02', '03', '04', '05']);
    expect(await page.locator('main > .section').evaluateAll(elements => elements.map(el => el.id))).toEqual(['about', 'experience', 'projects', 'stack', 'education', 'beyond']);
    await expect(page.locator('.navlinks a')).toHaveText(['about', 'experience', 'projects', 'stack', 'beyond']);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('347 190 2123');
    await expect(page.locator('#contact, a[href="#contact"]')).toHaveCount(0);
    await expect(page.locator("body")).toContainText(
      "alexpagliasso@gmail.com",
    );
    await expect(
      page.getByRole("heading", { name: "Contatti", exact: true }),
    ).toHaveCount(0);
    const beyond = page.locator("#beyond");
    await expect(
      beyond.getByRole("heading", { name: "Beyond Code", exact: true }),
    ).toBeVisible();
    for (const title of [
      "Padel",
      "Calcio & Coaching",
      "Tecnologia & Curiosità",
    ]) {
      await expect(
        beyond.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    }
    const illustration = await page.locator(".pixel-workspace").boundingBox();
    const activities = await page.locator(".beyond-activities").boundingBox();
    const layout = await page.locator(".beyond-layout").boundingBox();
    if (width <= 780) {
      expect(illustration!.width).toBeCloseTo(layout!.width, 0);
      expect(illustration!.height / illustration!.width).toBeCloseTo(1.25, 1);
      expect(activities!.y).toBeGreaterThanOrEqual(
        illustration!.y + illustration!.height,
      );
    } else {
      expect(illustration!.width / layout!.width).toBeGreaterThan(0.58);
      expect(illustration!.height).toBeGreaterThanOrEqual(540);
      expect(activities!.x).toBeGreaterThan(
        illustration!.x + illustration!.width,
      );
    }
    await expect(page.locator("body")).not.toContainText(
      /explore[ _]work|B1|\/\/ contact/i,
    );
    await expect(page.locator(".hero-actions")).toHaveCount(0);
    await expect(page.locator("footer")).toContainText("Italiano / Inglese");
    await expect(page.locator('footer a[href="mailto:alexpagliasso@gmail.com"]')).toHaveText("alexpagliasso@gmail.com");
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      hidden: [...document.querySelectorAll(".section, .card")].filter((el) => {
        const css = getComputedStyle(el);
        return (
          css.opacity === "0" ||
          css.visibility === "hidden" ||
          css.display === "none"
        );
      }).length,
      clipped: [
        ...document.querySelectorAll(".card, .hero-copy, .terminal, .job-head"),
      ]
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.className),
      photo: (document.querySelector(".photo-wrap img") as HTMLImageElement)
        .naturalWidth,
    }));
    expect(metrics.overflow).toBe(false);
    expect(metrics.hidden).toBe(0);
    expect(metrics.clipped).toEqual([]);
    expect(metrics.photo).toBeGreaterThan(0);
    if (width <= 780) {
      const nav = page.getByRole("navigation", { name: "Navigazione mobile" });
      await expect(nav).toBeVisible();
      await expect(nav.getByRole("link")).toHaveCount(4);
      await expect(nav.getByRole("link")).toHaveText([
        "home",
        "experience",
        "projects",
        "stack",
      ]);
      for (const label of ["experience", "projects", "stack", "home"]) {
        const link = nav.getByRole("link", { name: label, exact: true });
        const box = await link.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.width).toBeGreaterThanOrEqual(44);
        await link.click();
        await expect(link).toHaveAttribute("aria-current", "location");
      }
      await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight),
      );
      const navBox = await nav.boundingBox();
      const footer = await page.locator("footer").boundingBox();
      expect(footer!.y + footer!.height).toBeLessThan(navBox!.y);
    } else {
      await expect(
        page.getByRole("navigation", { name: "Navigazione principale" }),
      ).toBeVisible();
      await expect(
        page.getByRole("navigation", { name: "Navigazione mobile" }),
      ).toBeHidden();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}

test("fallback without IntersectionObserver and static reduced-motion terminal", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "IntersectionObserver", { value: undefined });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".terminal-body")).toContainText("whoami");
  await expect(page.locator(".terminal-output")).toContainText(
    "Frontend Developer",
  );
  await expect(page.locator(".photo-wrap")).toHaveCSS("animation-name", "none");
  for (const section of [
    "about",
    "experience",
    "stack",
    "projects",
    "education",
    "beyond",
  ]) {
    await expect(page.locator(`#${section}`)).toBeVisible();
  }
  await page.keyboard.press("Tab");
  await expect(page.getByText("Vai al contenuto")).toBeFocused();
  await expect(page.locator('footer a[href="mailto:alexpagliasso@gmail.com"]')).toHaveText("alexpagliasso@gmail.com");
  await expect(
    page.getByRole("button", { name: /pdf|print|download/i }),
  ).toHaveCount(0);
});

test("terminal progresses with motion enabled", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".terminal-body")).toContainText("current_stack", {
    timeout: 6000,
  });
  await expect(page.locator(".terminal-output")).toContainText("Supabase");
});

test("reference remains byte-for-byte intact", () => {
  const hash = createHash("sha256")
    .update(
      readFileSync("reference/Alex_Pagliasso_Portfolio_MobileApp_V5_2.html"),
    )
    .digest("hex");
  expect(hash).toBe(
    "b60761413163f4ab41525b7af3407d2cc4d08e8e72e0ce7ff3a3448ceee10ea6",
  );
});

test("content fidelity and reference screenshots", async ({ page }) => {
  await page.route("**/reference/*.html", (route) =>
    route.fulfill({
      contentType: "text/html; charset=utf-8",
      body: readFileSync(
        "reference/Alex_Pagliasso_Portfolio_MobileApp_V5_2.html",
      ),
    }),
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/reference/Alex_Pagliasso_Portfolio_MobileApp_V5_2.html");
  const content = await page
    .locator("main section:not(#contact)")
    .allTextContents();
  await page.addStyleTag({
    content:
      ".reveal { opacity: 1 !important; transform: none !important } * { animation: none !important }",
  });
  await page.screenshot({
    path: "test-results/reference-1440.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/reference-390.png",
    fullPage: true,
  });
  await page.goto("/");
  const migrated = await page
    .locator("main .section:not(#beyond)")
    .allTextContents();
  const normalize = (s: string) => s.replace(/^\s*\d{2}\.?/, "").replace(/\s+/g, "");
  // The current portfolio already updates the reference's 5+ years to 8+.
  await expect(page.locator('.about-stat strong').first()).toHaveText('8+');
  expect(migrated.map(normalize).sort()).toEqual(
    content.map(s => normalize(s).replace('5+anninellosviluppoweb', '8+anninellosviluppoweb')).sort(),
  );
});

test("touch and simulated iPhone safe areas", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setSafeAreaInsetsOverride", {
    insets: { top: 47, bottom: 34, left: 0, right: 0 },
  });
  await page.goto("http://127.0.0.1:4173");
  await expect(page.locator("body")).toHaveCSS("padding-top", "109px");
  await expect(page.locator("body")).toHaveCSS("padding-bottom", "116px");
  await expect(page.locator(".mobile-appbar")).toHaveCSS("height", "101px");
  await expect(page.locator(".mobile-bottom-nav")).toHaveCSS("bottom", "42px");
  await page
    .getByRole("navigation", { name: "Navigazione mobile" })
    .getByRole("link", { name: "projects" })
    .tap();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator(".project").first()).toHaveCSS("transform", "none");
  await page.screenshot({ path: "test-results/iphone-safe-areas.png" });
  await context.close();
});

test("static content and navigation survive disabled JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "ALEXPAGLIASSO",
  );
  await expect(page.locator(".card")).toHaveCount(20);
  await expect(page.locator(".hero-card")).toBeVisible();
  await page.locator('.mobile-bottom-nav a[href="#projects"]').click();
  await expect(page.locator("#projects-title")).toBeInViewport();
  await expect(page.locator("#beyond-title")).toHaveText("Beyond Code");
  await expect(page.locator('footer a[href="mailto:alexpagliasso@gmail.com"]')).toHaveText("alexpagliasso@gmail.com");
  await context.close();
});

test("sections stay visible when IntersectionObserver is unavailable with motion enabled", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "IntersectionObserver", { value: undefined }),
  );
  await page.goto("/");
  for (const id of [
    "about",
    "experience",
    "stack",
    "projects",
    "education",
    "beyond",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCSS("opacity", "1");
  }
});

for (const width of [375, 390, 430]) {
  test(`motion enabled at ${width}: no overflow, stuck reveal or layout shift`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      Reflect.set(window, "layoutShift", 0);
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!Reflect.get(entry, "hadRecentInput"))
            Reflect.set(
              window,
              "layoutShift",
              Reflect.get(window, "layoutShift") + Reflect.get(entry, "value"),
            );
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto("http://127.0.0.1:4173");
    await expect(page.locator(".background-glow")).toBeHidden();
    await page.evaluate(() => {
      Object.assign(window, { overflowFrames: 0 });
      const until = performance.now() + 2200;
      const sample = () => {
        if (document.documentElement.scrollWidth > innerWidth)
          Object.assign(window, {
            overflowFrames: Reflect.get(window, "overflowFrames") + 1,
          });
        if (performance.now() < until) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await expect(page.locator(".hero-card")).toHaveCSS("opacity", "1");
    await page.locator('.mobile-bottom-nav a[href="#projects"]').tap();
    await expect(
      page.locator('.mobile-bottom-nav a[href="#projects"]'),
    ).toHaveAttribute("aria-current", "location");
    await expect(page.locator("#projects")).toHaveCSS("opacity", "1");
    for (const card of await page.locator(".project").all())
      await expect(card).toHaveCSS("opacity", "1");
    await page.locator(".project").first().tap();
    await expect(page.locator(".project").first()).toHaveCSS(
      "transform",
      "none",
    );
    await expect
      .poll(() => page.evaluate(() => Reflect.get(window, "overflowFrames")))
      .toBe(0);
    expect(errors).toEqual([]);
    expect(
      await page.evaluate(() => Reflect.get(window, "layoutShift")),
    ).toBeLessThan(0.01);
    await context.close();
  });
}

test("changing reduced motion stops effects and keeps content visible", async ({
  page,
}) => {
  await page.goto("/");
  await page.mouse.move(1000, 200);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".background-glow")).toBeHidden();
  await expect(page.locator(".photo-wrap")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".photo-tracking")).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-card")).toHaveCSS("opacity", "1");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator("#experience")).toHaveCSS("opacity", "1");
  await expect(page.locator(".terminal-body")).toContainText("whoami");
});

test("Beyond Code media and motion remain usable", async ({ page }) => {
  await page.goto("/");
  await page.locator("#beyond").scrollIntoViewIfNeeded();
  await expect(page.locator("#beyond")).toHaveCSS("opacity", "1");
  await expect(page.locator(".pixel-workspace")).toHaveCSS("opacity", "1");
  for (const card of await page.locator(".activity-card").all())
    await expect(card).toHaveCSS("opacity", "1");
  const image = page.locator(".pixel-workspace img");
  if (await image.count()) {
    await expect(image).toHaveCSS("object-fit", "cover");
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await image.hover();
    await expect
      .poll(() => image.evaluate((el) => getComputedStyle(el).transform))
      .toContain("1.01");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(image).toHaveCSS("transform", "none");
  } else {
    await expect(page.locator(".pixel-placeholder")).toBeVisible();
    await expect(page.locator(".pixel-placeholder")).toContainText(
      "Sport, curiosità e nuove idee.",
    );
  }
  await page
    .locator("#beyond")
    .screenshot({ path: "test-results/beyond-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator("#beyond")
    .screenshot({ path: "test-results/beyond-mobile.png" });
});
