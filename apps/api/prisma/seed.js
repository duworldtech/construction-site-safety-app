/* eslint-disable no-console */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const site = await prisma.site.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo Site',
      address: '123 Demo St'
    }
  });

  await prisma.inspection.create({
    data: {
      siteId: site.id,
      inspector: 'Demo Inspector',
      scheduledAt: new Date(),
      notes: 'Seeded inspection'
    }
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });