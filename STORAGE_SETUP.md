# Supabase Storage Setup for HostelFinder

## Step 1: Create Storage Bucket

1. Go to your **Supabase Dashboard**
2. Navigate to **Storage** in the left sidebar
3. Click **"Create bucket"**
4. Fill in the details:
   - **Name**: `hostel_images`
   - **Public bucket**: ✅ **Check this box**
   - **File size limit**: 50MB (or your preferred limit)
5. Click **"Create bucket"**

## Step 2: Set Storage Policies

Run this SQL in your Supabase SQL Editor:

```sql
-- Allow public read access to hostel_images bucket
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'hostel_images');

-- Allow authenticated users to upload to hostel_images bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'hostel_images' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update own uploads" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'hostel_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own uploads" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'hostel_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Step 3: Verify Environment Variables

Make sure these are set in your Vercel deployment:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

## Step 4: Test Upload

1. Go to your app
2. Register/Login
3. Go to `/admin/new`
4. Try uploading an image
5. Check browser console for detailed error messages

## Common Issues & Solutions

### Issue: "Bucket not found"
**Solution**: Create the `hostel_images` bucket as described above

### Issue: "Permission denied"
**Solution**: Run the storage policies SQL above

### Issue: "File too large"
**Solution**: Increase file size limit in bucket settings

### Issue: "Unauthorized"
**Solution**: Check that user is logged in and environment variables are correct

## Debug Steps

1. Open browser console (F12)
2. Try uploading an image
3. Look for console logs showing:
   - Available buckets
   - Upload attempts
   - Error details
4. Check the specific error message in the alert

## Manual Bucket Creation via SQL

If the UI doesn't work, you can create the bucket via SQL:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('hostel_images', 'hostel_images', true);
```

Then run the policies above.
