# E-Learning Platform Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from successful e-learning platforms (Coursera, Udemy, Khan Academy) with emphasis on trust, clarity, and engagement. The design balances visual appeal with functional efficiency to support learning goals.

## Core Design Principles

- **Educational Clarity**: Clean information hierarchy that guides users through content
- **Trust & Professionalism**: Polished aesthetic that builds credibility
- **Engagement-First**: Visual elements that motivate learning without distraction
- **Scannable Content**: Easy-to-digest course information and navigation

## Typography

**Primary Font**: Inter or DM Sans (Google Fonts)
- **Headings**: 
  - H1: text-4xl md:text-5xl, font-bold
  - H2: text-3xl md:text-4xl, font-semibold
  - H3: text-2xl, font-semibold
  - H4: text-xl, font-medium
- **Body**: text-base, font-normal, leading-relaxed
- **Small/Meta**: text-sm, font-medium
- **Emphasis**: font-semibold for CTAs and important labels

**Secondary Font** (optional accents): Poppins for headings

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 consistently
- Component spacing: p-4, p-6, p-8
- Section spacing: py-12 md:py-20 lg:py-24
- Element gaps: gap-4, gap-6, gap-8

**Container Strategy**:
- Max-width: max-w-7xl for main content
- Padding: px-4 md:px-6 lg:px-8
- Course grids: max-w-6xl

## Navigation Bar

**Structure**: Fixed top navigation, full-width with inner max-w-7xl container
- **Height**: h-16 md:h-20
- **Logo**: Left-aligned, h-8 w-auto, book/graduation cap icon with app name
- **Links**: Horizontal right-aligned on desktop (Home, Courses), single-line navigation
- **Auth Buttons**: Login (outlined) + Register (solid) buttons on far right
- **Mobile**: Hamburger menu, slide-in drawer with stacked links
- **Spacing**: px-6, items-center, flex justify-between

## Landing Page (Non-Authenticated)

**Hero Section**: 
- Height: min-h-[500px] md:min-h-[600px]
- Layout: Two-column (60/40 split) on desktop, stacked on mobile
- Left: Bold headline (text-5xl md:text-6xl), supporting text (text-xl), dual CTA buttons (Get Started primary + Browse Courses secondary)
- Right: Hero image showing students/learning context
- Background: Subtle gradient or pattern overlay

**Featured Courses Section**:
- Heading: "Featured Courses" with centered text-3xl
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6
- Initial display: 6 course cards
- Show More button: Centered below grid, large w-64 rounded button

**Course Cards** (Reusable Component):
- Structure: Rounded-lg border, overflow-hidden
- Image: aspect-video, object-cover (course thumbnail)
- Content padding: p-6
- Title: text-xl font-semibold, line-clamp-2
- Description: text-sm, line-clamp-3, mt-2
- Meta row: flex justify-between items-center, mt-4
  - Duration badge: Small pill with clock icon
  - Level indicator: Beginner/Intermediate/Advanced tag
- Hover: Subtle lift (transform translate-y-1) and shadow increase
- Spacing: gap-4 between elements

**Footer**:
- Three columns on desktop: About, Quick Links, Contact
- Newsletter signup form
- Social media icons
- Copyright text centered at bottom
- Padding: py-12, px-6

## Authentication Pages (Login/Register)

**Layout**: Centered card design on full-height page
- Container: max-w-md mx-auto, min-h-screen flex items-center
- Card: Rounded-xl, p-8 md:p-10, border shadow-lg
- Logo: Centered at top, mb-8
- Form width: w-full

**Login Form**:
- Heading: text-3xl font-bold, mb-2
- Subheading: text-sm, mb-8
- Input fields: Full-width, h-12, rounded-lg, border, px-4
  - Email input with icon
  - Password input with show/hide toggle
- Remember me checkbox + Forgot password link (flex justify-between)
- Submit button: w-full h-12, rounded-lg, font-semibold, mt-6
- Divider: "Don't have an account?" with Register link below

**Register Form**:
- Similar structure to login
- Additional fields: Full Name, Confirm Password
- Terms acceptance checkbox
- Submit: "Create Account" button
- Link to Login page at bottom

## Home Page (Authenticated)

**Header Section**:
- Welcome message: "Welcome back, [Name]" text-2xl md:text-3xl
- Quick stats row: Cards showing "Courses in Progress", "Completed", "Saved" (grid-cols-3, gap-4)
- Each stat card: p-6, rounded-lg, border, icon + number + label

**Continue Learning Section**:
- Heading: "Continue Learning" text-2xl
- Horizontal scrollable row of in-progress course cards
- Progress bars showing completion percentage
- Cards wider than standard: min-w-[300px]

**Browse Courses Section**:
- Tab navigation: All, Technology, Business, Design, etc.
- Filter/Sort controls: Dropdown + search bar in flex row
- Course grid: Same 3-column layout as landing page
- Pagination controls at bottom

**Sidebar** (optional on large screens):
- Categories list with counts
- Recommended courses widget
- Achievement/streak tracker

## Course Detail Page

**Course Header**:
- Breadcrumb navigation
- Two-column layout:
  - Left (70%): Course title (text-4xl), instructor info, rating stars, enrollment count
  - Right (30%): Sticky enrollment card with price, CTA, course includes list
- Course thumbnail: Full-width below header, aspect-video

**Tab Navigation**:
- Tabs: Overview, Curriculum, Instructor, Reviews
- Sticky below header on scroll
- Active tab indicator with border-b-2

**Overview Tab**:
- "What You'll Learn" grid: 2 columns of checkmark list items
- Requirements section
- Description with expandable "Read more"
- Course features badges (Lifetime access, Certificate, Mobile access)

**Curriculum Tab**:
- Accordion sections for modules
- Each lesson: Title, duration, lock/unlock icon, play button
- Collapse/expand all control at top

**Reviews Section**:
- Star rating distribution graph
- Review cards: Avatar, name, rating, date, comment
- Pagination for reviews

## Images

**Hero Image**: Large image (approximately 800x600px) showing diverse students learning, using laptops, collaborative environment. Modern, bright, aspirational aesthetic. Placement: Right side of hero section.

**Course Thumbnails**: Horizontal images (16:9 aspect ratio) for each course card. Show relevant subject matter (laptop for programming, charts for business, design tools for creative courses). Consistent style across all thumbnails.

**Profile/Instructor Images**: Circular avatars throughout for user profiles and instructor sections.

**Decorative Elements**: Abstract geometric patterns or subtle illustrations in background of auth pages and empty states.

## Component Library

**Buttons**:
- Primary: h-11 px-6, rounded-lg, font-semibold
- Secondary: Same dimensions with border-2
- Text buttons: Underline on hover
- Icon buttons: Square p-3, rounded-full

**Input Fields**:
- Height: h-12
- Padding: px-4
- Border: border rounded-lg
- Focus: ring-2 ring-offset-2
- Icons: Positioned absolute with pl-12 on input

**Badges/Pills**:
- Rounded-full px-3 py-1 text-xs font-medium
- Used for course levels, categories, tags

**Cards**:
- Rounded-lg with border
- Padding: p-6
- Hover states for interactive cards

**Progress Bars**:
- Height: h-2, rounded-full
- Nested fill div for progress
- Percentage label above or beside

**Tabs**:
- Horizontal list with border-b
- Active: border-b-2 with offset
- Padding: px-4 py-3

## Animations

Use sparingly and purposefully:
- Card hover: Subtle lift (2-4px) with smooth shadow transition
- Button states: Scale on active (scale-95)
- Page transitions: Simple fade
- Loading states: Skeleton screens, not spinners
- NO complex scroll animations or parallax effects

## Accessibility

- All interactive elements: min-height 44px (touch target size)
- Form labels: Visible, not placeholder-only
- Focus indicators: Clear ring-2 on all focusable elements
- Skip to content link for keyboard navigation
- ARIA labels on icon-only buttons
- Contrast ratio: Minimum AA compliance for all text