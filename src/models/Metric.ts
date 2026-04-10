import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric extends Document {
  type: string; // 'revenue' | 'visitors' | 'projects'
  value: number;
  history: {
    date: Date;
    value: number;
  }[];
  lastUpdated: Date;
}

const MetricSchema: Schema = new Schema({
  type: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
  history: [{
    date: { type: Date, default: Date.now },
    value: { type: Number, default: 0 }
  }],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.Metric || mongoose.model<IMetric>('Metric', MetricSchema);
