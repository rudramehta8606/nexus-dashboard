import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Metric from '@/models/Metric';

export async function GET() {
  try {
    await connectDB();

    // Aggregate project data
    const projects = await Project.find({});
    const totalProjects = projects.length;
    const totalRevenue = projects.reduce((acc, curr) => acc + curr.value, 0);
    const activeProjects = projects.filter(p => p.status === 'In Progress').length;
    
    // Get or create visit metrics (mocking for initial load)
    let visitors = await Metric.findOne({ type: 'visitors' });
    if (!visitors) {
      visitors = await Metric.create({
        type: 'visitors',
        value: 1250,
        history: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000),
          value: Math.floor(Math.random() * 200) + 100
        }))
      });
    }

    return NextResponse.json({
      summary: {
        totalProjects,
        totalRevenue,
        activeProjects,
        totalVisitors: visitors.value
      },
      chartData: visitors.history.map(h => ({
        date: new Date(h.date).toLocaleDateString('en-US', { weekday: 'short' }),
        visits: h.value,
        revenue: Math.floor(h.value * 1.5) // Mock logic for revenue trend
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
