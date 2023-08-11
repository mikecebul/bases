const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateFromTemp() {
  const staffMembers = await prisma.staffMember.findMany();

  for (const member of staffMembers) {
    const updatedData = {
      philosophy: member.temp_philosophy,
      education: member.temp_education,
    };

    await prisma.staffMember.update({
      where: { id: member.id },
      data: updatedData,
    });
  }

  console.log('Migration from temporary fields complete.');
}

migrateFromTemp()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });