import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Metric from '@/models/Metric';

export async function GET() {
  try {
    await connectDB();

    // Aggregate project data
    const projects = await Project.find({}).sort({ createdAt: -1 });
    const totalProjects = projects.length;
    const totalRevenue = projects.reduce((acc: number, curr: any) => acc + curr.value, 0);
    const activeProjects = projects.filter((p: any) => p.status === 'In Progress').length;
    
    // Compute average completion time in days between creation and deadline
    const avgCompletionDays = projects.length > 0 
      ? Math.round(projects.reduce((acc: number, p: any) => {
          const diffSpan = new Date(p.deadline).getTime() - new Date(p.createdAt || Date.now()).getTime();
          return acc + diffSpan / (1000 * 3600 * 24);
        }, 0) / projects.length) 
      : 0;
      
    // Recent activity based on latest projects
    const recentActivity = projects.slice(0, 5).map(p => {
      let statusValue = p.status === 'Completed' ? 'success' : p.status === 'Archived' ? 'warning' : 'info';
      let title = '';
      if (p.status === 'Completed') title = `Project "${p.name}" completed`;
      else if (p.status === 'In Progress') title = `New project "${p.name}" started`;
      else title = `Project "${p.name}" archived`;
      
      const daysAgo = Math.floor((Date.now() - new Date(p.createdAt).getTime()) / (1000 * 3600 * 24));
      const timeStr = daysAgo === 0 ? 'Today' : `${daysAgo}d ago`;

      return { title, time: timeStr, status: statusValue };
    });
    
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
        totalVisitors: visitors.value,
        avgCompletionDays
      },
      recentActivity,
      chartData: visitors.history.map((h: any) => ({
        date: new Date(h.date).toLocaleDateString('en-US', { weekday: 'short' }),
        visits: h.value,
        revenue: Math.floor(h.value * 1.5) // Mock logic for revenue trend
      }))
    });
  } catch (error: any) {
    console.error("Dashboard Stats Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
