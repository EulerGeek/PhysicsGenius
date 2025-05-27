import { db } from "./db";
import { courses, lessons } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    // Check if courses already exist
    const existingCourses = await db.select().from(courses);
    if (existingCourses.length > 0) {
      console.log("✅ Database already seeded");
      return;
    }

    // Insert courses
    const coursesData = [
      {
        title: "Classical Mechanics",
        description: "Master the fundamentals of motion and forces",
        icon: "fas fa-rocket",
        color: "bg-blue-50",
        totalLessons: 15
      },
      {
        title: "General Relativity", 
        description: "Explore spacetime and gravity",
        icon: "fas fa-infinity",
        color: "bg-purple-50",
        totalLessons: 10
      },
      {
        title: "Quantum Mechanics",
        description: "Discover the quantum world", 
        icon: "fas fa-wave-square",
        color: "bg-amber-50",
        totalLessons: 12
      }
    ];

    const insertedCourses = await db.insert(courses).values(coursesData).returning();
    console.log(`✅ Inserted ${insertedCourses.length} courses`);

    // Insert lessons for Classical Mechanics
    const classicalMechanicsCourse = insertedCourses.find(c => c.title === "Classical Mechanics");
    if (classicalMechanicsCourse) {
      const lessonsData = [
        {
          courseId: classicalMechanicsCourse.id,
          title: "Introduction to Motion",
          description: "Understanding position, velocity, and acceleration in one dimension",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "6bwYiGz60Uo",
              "feynman": "VqK0s5dWagg"
            }
          },
          order: 1,
          duration: "15 min",
          xpReward: 100
        },
        {
          courseId: classicalMechanicsCourse.id,
          title: "Forces and Newton's Laws",
          description: "Explore the fundamental laws that govern motion and interactions",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "wWnfJ0-xXRE",
              "feynman": "EH2Op2Y2Xfw"
            }
          },
          order: 2,
          duration: "20 min",
          xpReward: 120
        },
        {
          courseId: classicalMechanicsCourse.id,
          title: "Work and Energy",
          description: "Understand the relationship between work, kinetic and potential energy",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "jiIEKlwg5Mg",
              "feynman": "xWCE4Kn0GQE"
            }
          },
          order: 3,
          duration: "18 min",
          xpReward: 110
        },
        {
          courseId: classicalMechanicsCourse.id,
          title: "Momentum and Collisions",
          description: "Conservation of momentum in elastic and inelastic collisions",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "jiIEKlwg5Mg",
              "feynman": "xWCE4Kn0GQE"
            }
          },
          order: 4,
          duration: "16 min",
          xpReward: 100
        },
        {
          courseId: classicalMechanicsCourse.id,
          title: "Rotational Motion",
          description: "Angular velocity, acceleration, and rotational dynamics",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "jiIEKlwg5Mg",
              "feynman": "xWCE4Kn0GQE"
            }
          },
          order: 5,
          duration: "22 min",
          xpReward: 130
        },
        {
          courseId: classicalMechanicsCourse.id,
          title: "Simple Harmonic Motion",
          description: "Oscillations, springs, and pendulums in motion",
          content: {
            type: "interactive",
            videoIds: {
              "mit-801": "jiIEKlwg5Mg",
              "feynman": "xWCE4Kn0GQE"
            }
          },
          order: 6,
          duration: "19 min",
          xpReward: 115
        }
      ];

      const insertedLessons = await db.insert(lessons).values(lessonsData).returning();
      console.log(`✅ Inserted ${insertedLessons.length} lessons for Classical Mechanics`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    throw error;
  }
}