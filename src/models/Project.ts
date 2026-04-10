import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  client: string;
  value: number;
  status: 'In Progress' | 'Completed' | 'Archived';
  category: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  client: { type: String, required: true },
  value: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['In Progress', 'Completed', 'Archived'], 
    default: 'In Progress' 
  },
  category: { type: String, default: 'Web Development' },
  deadline: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
