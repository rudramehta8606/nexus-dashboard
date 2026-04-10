import connectDB from './src/lib/db';
import Project from './src/models/Project';
import Metric from './src/models/Metric';

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Project.deleteMany({});
    await Metric.deleteMany({});

    // Seed Projects
    const projects = [
      {
        name: 'Luxe Aesthetics UI',
        description: 'Premium e-commerce interface for luxury brands.',
        client: 'LuxeGlow Co.',
        value: 12500,
        status: 'Completed',
        category: 'UI/UX Design',
        deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Nexus Dashboard',
        description: 'Internal admin panel for SaaS monitoring.',
        client: 'Nebula Systems',
        value: 8400,
        status: 'In Progress',
        category: 'Full Stack Dev',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'CryptoTrack Pro',
        description: 'Real-time cryptocurrency portfolio tracker.',
        client: 'FinTech Hub',
        value: 15000,
        status: 'Completed',
        category: 'Web App',
        deadline: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'EcoSphere Website',
        description: 'Sustainable energy company portal.',
        client: 'Green Earth',
        value: 6200,
        status: 'Archived',
        category: 'Web Dev',
        deadline: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ];

    await Project.insertMany(projects);

    // Seed Metrics
    await Metric.create({
      type: 'visitors',
      value: 2450,
      history: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000),
        value: 150 + Math.floor(Math.random() * 100)
      }))
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
