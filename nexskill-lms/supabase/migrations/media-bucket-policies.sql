-- Public read access
CREATE POLICY "Public can view lesson images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lesson-content');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload lesson images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'lesson-content');

-- Users can manage their own files
CREATE POLICY "Users can update own lesson images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'lesson-content' AND owner = auth.uid());

CREATE POLICY "Users can delete own lesson images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'lesson-content' AND owner = auth.uid());