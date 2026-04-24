import prisma from "@/lib/prisma";

export async function getSiteSettings() {
  try {
    const existing = await prisma.siteSettings.findFirst();
    if (existing) return existing;

    return await prisma.siteSettings.create({
      data: {
        whatsappNumber: "+16467197124",
      },
    });
  } catch (err) {
    // During build or before migrations, tables may not exist yet.
    return {
      id: "default",
      brandName: "Lugvia Movers",
      primaryPhone: null,
      whatsappNumber: "+16467197124",
      supportEmail: "support@luggvia.com",
      addressLine: null,
      defaultOgImage: null,
      googleSiteVerification: null,
      googleAnalyticsId: null,
      googleTagManagerId: null,
      facebookUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      youtubeUrl: null,
      updatedAt: new Date(),
    } as any;
  }
}

