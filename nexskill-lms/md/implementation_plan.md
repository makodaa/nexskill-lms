# Implementation Plan

## 1. UI/UX Refinement
- **Objective:** Improve spacing in the lesson editor and text editor toolbar for a cleaner look.
- **Files to Modify:**
    - `nexskill-lms/src/components/coach/LessonEditorPanel.tsx`
    - `nexskill-lms/src/components/coach/RichTextEditor.tsx`
- **Steps:**
    1. Adjust padding/margins in `LessonEditorPanel` for the main content area and form fields.
    2. Increase gap between icon groups in `RichTextEditor` toolbar.

## 2. Advanced Media in Rich Text Editor (Images & PDFs)
- **Objective:** Enable Image and PDF uploads with preview within the editor, backed by Supabase Storage.
- **Files to Modify:**
    - `nexskill-lms/src/components/coach/RichTextEditor.tsx`
    - `nexskill-lms/src/lib/supabaseClient.ts` (Ensure bucket exists/logic is sound)
- **Steps:**
    1. **Images:** Refine the existing image upload to ensure the uploaded Supabase URL is correctly inserted and the image renders (previews) immediately in the editor.
    2. **PDFs:** Add a "Upload PDF" button. Implement upload to Supabase. Insert the PDF into the editor. *Note: For "preview", we will attempt to insert it as an iframe or a styled link card since standard rich text editors don't native "preview" PDFs like images.*

## 3. Update Content Rendering Logic
- **Objective:** Ensure that content blocks, especially those with images/media, load correctly when the lesson is re-opened or viewed.
- **Files to Modify:**
    - `nexskill-lms/src/components/coach/LessonEditorPanel.tsx`
- **Steps:**
    1. Verify that `RichTextEditor` initializes correctly with HTML content containing Supabase URLs.
    2. Ensure `content_blocks` logic in `LessonEditorPanel` preserves these URLs during updates.

## 4. Remove Lesson Type
- **Objective:** Remove the explicit "Lesson Type" selector and logic, allowing the content itself (blocks) to define the lesson.
- **Files to Modify:**
    - `nexskill-lms/src/components/coach/LessonEditorPanel.tsx`
    - `nexskill-lms/src/types/lesson.ts` (If type definition needs changing, though might just be optional/ignored in UI first).
- **Steps:**
    1. Remove the "Lesson type" dropdown from `LessonEditorPanel`.
    2. Remove conditional rendering logic that relied on `lesson.type` (e.g., showing VideoUploadPanel only if type is video). Instead, perhaps make these available as content blocks or just general settings if needed, or rely solely on the Rich Text / Content Blocks for content. *Correction based on context:* The user likely wants to move away from rigid "Video Lesson" vs "Text Lesson" types and just have a flexible editor. I will hide/remove the type selector. I will probably leave the specific panels (Video/PDF specific inputs) available or integrate them differently if requested, but the prompt says "Remove the lesson type in the editor and in the saving logic". I will interpret this as removing the *field* and the *dropdown*. I'll assume users will add videos/pdfs via the editor blocks now.