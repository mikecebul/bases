const { PrismaClient } = require("@prisma/client");
const boardMembers = require("../config/board-members");

const prisma = new PrismaClient();

async function seedBoardMembers() {
  for (const member of boardMembers) {
    await prisma.boardMember.create({
      data: {
        name: member.name,
        slug: member.slug,
        role: member.role,
        imageUrl: member.imageUrl,
        bio: member.bio,
      },
    });
  }

  console.log("Board members seeded successfully.");
}

seedBoardMembers()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
