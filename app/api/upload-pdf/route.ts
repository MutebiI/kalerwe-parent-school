import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const targetFileName = formData.get('targetFileName');
    
    if (!file || !targetFileName) {
      return Response.json({ error: 'Missing file or target filename' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/documents directory exists
    const publicDir = path.join(process.cwd(), 'public');
    const documentsDir = path.join(publicDir, 'documents');
    
    if (!existsSync(documentsDir)) {
      mkdirSync(documentsDir, { recursive: true });
    }

    // Save file to public/documents/
    const filePath = path.join(documentsDir, targetFileName);
    writeFileSync(filePath, buffer);

    return Response.json({ 
      success: true, 
      message: 'File uploaded successfully',
      path: `/documents/${targetFileName}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}