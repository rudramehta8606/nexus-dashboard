import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({});

    // Aggregate Clients
    const clientMap = new Map();
    // Aggregate Categories
    const categoryMap = new Map();
    // Aggregate Revenue by month
    const revenueByMonth = new Map();

    projects.forEach(project => {
      // Clients
      const clientName = project.client;
      if (!clientMap.has(clientName)) {
        clientMap.set(clientName, { name: clientName, projectCount: 0, totalValue: 0 });
      }
      const clientData = clientMap.get(clientName);
      clientData.projectCount += 1;
      clientData.totalValue += project.value;

      // Categories
      const category = project.category || 'Uncategorized';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { name: category, count: 0, value: 0 });
      }
      const catData = categoryMap.get(category);
      catData.count += 1;
      catData.value += project.value;

      // Revenue by Month
      const month = new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!revenueByMonth.has(month)) {
        revenueByMonth.set(month, 0);
      }
      revenueByMonth.set(month, revenueByMonth.get(month) + project.value);
    });

    return NextResponse.json({
      clients: Array.from(clientMap.values()).sort((a, b) => b.totalValue - a.totalValue),
      categories: Array.from(categoryMap.values()).sort((a, b) => b.value - a.value),
      revenueTrend: Array.from(revenueByMonth.entries()).map(([month, value]) => ({ month, value }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
