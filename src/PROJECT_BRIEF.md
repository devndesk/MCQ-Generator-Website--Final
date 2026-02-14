# 📘 Complete Project Documentation: AI-Powered MCQ Generator

**Project Name:** MCQGen AI  
**Developer:** [Your Name]  
**Tech Stack:** React.js, Tailwind CSS v4, Framer Motion, Lucide Icons

---

## 1. Global Design System

### 🎨 Color Palette & Theme
The application uses a **"Violet-Fuchsia" gradient theme** to convey a modern, creative, and intelligent AI tool.

*   **Primary Gradient:** `linear-gradient(to right, violet-600, purple-600, fuchsia-600)`
    *   *Usage:* Main CTA buttons, active states, progress bars.
*   **Background:** `bg-[#fdfcff]` (Ghost White/Lavender)
    *   *Usage:* Main page background to reduce eye strain compared to pure white.
*   **Surface:** `bg-white` with `backdrop-blur-xl` (Glassmorphism)
    *   *Usage:* Cards, Sidebars, Modals.
*   **Text:**
    *   **Headings:** `text-slate-800` (Dark Gray for readability).
    *   **Body:** `text-slate-600`.
    *   **Muted:** `text-slate-400`.

### 🧩 Global UI Components
These elements appear across multiple pages.

#### **1. Background Pattern**
*   **Visual:** A subtle, animated mesh gradient in the background.
*   **Elements:** Three large blurred orbs (Purple, Pink, Violet) moving slowly behind the content.
*   **Purpose:** Adds depth and modern SaaS aesthetics.

#### **2. Navbar**
*   **Logo:** A "Sparkles" icon in a gradient box followed by text "MCQGen".
*   **Links:** Home, Generator, Library, Templates.
*   **Style:** Sticky header with glassmorphism (`bg-white/80`).

#### **3. Footer**
*   **Layout:** 3-Column Grid (Product, Resources, Legal).
*   **Content:** Copyright notice, social media links, and quick navigation.
*   **Style:** Clean border-top, gray text.

---

## 2. Detailed Page Breakdown

### 🏠 Home Page (Landing)
The entry point of the application.

#### **Section 1: Hero Section**
*   **Headline:** "Turn any text into a Quiz instantly." (Large, Bold, Slate-900).
*   **Sub-headline:** "Upload notes, books, or articles and let AI generate perfect multiple-choice questions for you."
*   **CTA Button:** "Get Started" (Large, Gradient background, rounded-full, hover scale effect).
*   **Visual:** A floating 3D-style illustration or a mockup of the generator interface.

#### **Section 2: Features Grid**
A 3x1 or 3x2 grid of cards explaining what the tool does.
*   **Card 1: Upload Any File:** Icon (FileUp), Text describing PDF/Docx support.
*   **Card 2: Smart AI:** Icon (Brain/Sparkles), Text about the algorithm.
*   **Card 3: Export PDF:** Icon (FileDown), Text about downloading results.

---

### ⚡ Generator Page (Main Tool)
This is the core functional page, divided into a **2-Column Layout**.

#### **Left Column: The Control Panel**
A scrollable sidebar containing all inputs.

**1. Input Card**
*   **Header:** "Input Content" with a generic file icon.
*   **Upload Area:**
    *   **Style:** Dashed purple border, light purple background.
    *   **Elements:** Large Upload Icon, "Upload Document" bold text, "PDF, DOCX, TXT" small text.
    *   **Interaction:** Clicking triggers the system file picker.
*   **Text Area:**
    *   **Placeholder:** "Or simply paste your text here..."
    *   **Style:** Light gray background, rounded corners, resize disabled (fixed height).

**2. Configuration Card**
*   **Header:** "Configuration" with a Settings icon.
*   **Slider (Question Count):**
    *   **Label:** "Question Count".
    *   **Value Display:** A small black badge showing the current number (e.g., "20").
    *   **Control:** A draggable slider bar (Purple). Range: 1 to 50.
*   **Difficulty Selector:**
    *   **Style:** Segmented control (3 buttons side-by-side).
    *   **Options:** Easy, Medium, Hard.
    *   **Active State:** The selected button fills with Violet color; others are gray.
*   **Generate Button:**
    *   **Style:** Full-width, Tall (h-14), Gradient background.
    *   **States:**
        *   *Idle:* "Generate MCQs" with a Zap icon.
        *   *Loading:* "Generating Magic..." with a spinning Wand icon.

#### **Right Column: The Results View**
A fixed-height container that shows the output.

**1. Results Header**
*   **Title:** "Results" with a dynamic badge showing the count (e.g., "(15)").
*   **Action Toolbar (Top Right):**
    *   **Save Button:** Outline style. Saves the set to LocalStorage. Changes to a "Check" icon briefly on success.
    *   **Copy Button:** Outline style. Copies all text to clipboard.
    *   **TXT Button:** Ghost style icon. Downloads raw text file.
    *   **PDF Button:** Ghost style icon (Red tint on hover). Downloads formatted PDF.

**2. Empty State (Before Generation)**
*   **Visual:** A large centered illustration (Sparkles or File icon) in a gray/purple circle.
*   **Text:** "Ready to Create?" / "Upload a document to start."

**3. MCQ List (After Generation)**
A scrollable list of **MCQ Cards**.

#### **🧩 Component: The MCQ Card**
*   **Container:** White box, rounded corners (`rounded-2xl`), soft shadow (`shadow-sm`).
*   **Question Row:**
    *   **Number:** A small gray circle with the question number (e.g., "1"). Turns purple on hover.
    *   **Text:** The question text in bold slate-800.
*   **Options List:**
    *   **Structure:** Vertical list of buttons.
    *   **Default State:** White background, gray border.
    *   **Selected State:** Purple border, light purple background.
    *   **Result State (After "Show Answer"):**
        *   *Correct Option:* Green background, Green Checkmark icon.
        *   *Wrong Selected Option:* Red background, Red X icon.
*   **Footer (Toggle):**
    *   **Button:** "Show Answer" (Eye icon). Small, uppercase, text-only.
    *   **Expanded View:**
        *   Shows the correct answer explicitly.
        *   Shows an "Explanation" block with a "Why is this correct?" text.

---

### 📚 Library Page
Stores the user's history.

*   **Header:** "Your Library" / "Saved Quizzes".
*   **Grid Layout:** A masonry or simple grid of **Collection Cards**.
*   **Collection Card Elements:**
    *   **Title:** "MCQ Set - [Date]"
    *   **Info:** "20 Questions • Hard Difficulty"
    *   **Actions:**
        *   *Open:* Go back to Generator with this data loaded.
        *   *Delete:* Trash icon (Red).

---

### 📝 Templates Page
Pre-made content for quick testing.

*   **Header:** "Explore Templates".
*   **Categories:** History, Science, Technology, Literature.
*   **Card Design:**
    *   **Icon:** Represents the subject (e.g., Microscope for Science).
    *   **Title:** Subject Name.
    *   **Description:** "Test your knowledge on [Topic]."
    *   **Action:** "Use Template" button -> Redirects to Generator and auto-fills the text.

---

## 3. Technical Implementation Details

### 📂 File Structure Logic
*   **`App.tsx`**: The traffic controller. Decides which page to show based on the URL.
*   **`main.tsx`**: The entry point. Connects React to the HTML `div#root`.

### 🛠 Utility Functions
*   **`mcqGenerator.ts`**: The "AI" logic.
    *   *Process:* Splits text -> Finds keywords -> Creates sentence variations -> Returns JSON.
*   **`pdfExport.ts`**:
    *   *Process:* Creates new jsPDF instance -> Sets font 'Helvetica' -> Loops through questions -> Adds page breaks if Y-position > 280mm -> Saves file.
*   **`fileProcessing.ts`**:
    *   *Process:* Checks file MIME type -> Uses `mammoth.js` for .docx -> Uses `FileReader` for .txt -> Returns raw string string.

---

## 4. Animation & Interaction Strategy
*   **Entrance:** All pages fade in and slide up (`y: 20` to `y: 0`).
*   **Lists:** Staggered entrance. Card 1 appears, then Card 2 (0.1s later), etc.
*   **Feedback:**
    *   Clicking "Copy" -> Icon turns to Checkmark.
    *   Hovering Options -> Background turns light purple.
    *   Generating -> Button shows a spinner to indicate work in progress.
