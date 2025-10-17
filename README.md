# UpPass Form Builder

A modern, dynamic form builder and renderer built with Vue 3, TypeScript, Tailwind CSS, and Vite. This application allows you to create complex forms with conditional logic, validation rules, and beautiful UI/UX.

## 🌟 Features

### Form Builder
- **Drag & Drop Interface**: Reorder form fields easily with intuitive drag-and-drop
- **Multiple Field Types**: Text, Number, Radio, Date, and Select inputs
- **Comprehensive Configuration**: 
  - Field labels, placeholders, and descriptions
  - Validation rules (required, min/max length, numeric constraints)
  - Conditional visibility based on other field values
  - Prefill values and layout options
- **Schema Import/Export**: Save and load form schemas as JSON files
- **Real-time Preview**: See changes instantly

### Form Renderer
- **Dynamic Rendering**: Automatically generates forms from JSON schema
- **Smart Validation**: Client-side validation with user-friendly error messages
- **Conditional Logic**: Fields show/hide based on visibility rules
- **Beautiful UI**: Modern design with smooth animations and transitions
- **Enhanced Date Picker**: Professional calendar interface with consistent cross-browser experience
- **Responsive**: Works perfectly on all device sizes
- **Secure**: Schema is encoded to prevent easy inspection via HTML

## 🏗️ Project Structure

```
src/
├── components/
│   ├── inputs/              # Input components (separated by type)
│   │   ├── DateInput.vue    # Date field component
│   │   ├── TextInput.vue    # Text field component
│   │   ├── NumberInput.vue  # Number field component
│   │   ├── RadioInput.vue   # Radio button component
│   │   └── SelectInput.vue  # Dropdown select component
│   ├── FormBuilder.vue      # Form builder interface
│   ├── FormRenderer.vue     # Form rendering component
│   └── FieldEditor.vue      # Field configuration modal
├── views/
│   ├── HomeView.vue         # Landing page
│   ├── BuilderView.vue      # Builder page
│   └── FormView.vue         # Form preview page
├── stores/
│   └── formStore.ts         # Pinia store for state management
├── types/
│   └── schema.ts            # TypeScript type definitions
├── utils/
│   ├── validation.ts        # Validation logic
│   ├── visibility.ts        # Conditional visibility logic
│   └── schema.ts            # Schema utilities
├── router/
│   └── index.ts             # Vue Router configuration
├── App.vue                  # Root component
├── main.ts                  # Application entry point
└── style.css                # Global styles with Tailwind

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd uppass-form-builder

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Form Builder

1. Navigate to `/builder` or click "Form Builder" on the home page
2. Add fields by clicking field type buttons (Text, Number, Radio, Select)
3. Drag fields to reorder them
4. Click the edit icon to configure field properties:
   - Field name and label
   - Validation rules
   - Visibility conditions
   - Field-specific options (max length, min/max values, etc.)
5. Export your schema using the "Export Schema" button
6. Import existing schemas using the "Import Schema" button

### Form Renderer

1. Navigate to `/form` or click "Form Renderer" on the home page
2. The form automatically loads the current schema
3. Fill out the form fields
4. Required fields are marked with a red asterisk (*)
5. Fields appear/disappear based on visibility rules
6. Click "Submit" to see the submitted data (validation will run first)

## 🎨 Design Decisions

### Architecture
- **Component-Based**: Each input type is a separate component for maintainability and reusability
- **State Management**: Pinia is used for centralized state management
- **TypeScript**: Full type safety for better developer experience and fewer bugs
- **Utility Functions**: Separated validation and visibility logic into utility functions for better testing and reusability

### Schema Design
The provided schema was well-designed. Enhancements made:
- Added `description` field to display property for additional help text
- Added `Select` type as an alternative to Radio for dropdown choices
- Maintained full backward compatibility with the original schema

### UI/UX Considerations
- **Smooth Animations**: All state changes include smooth transitions
- **Visual Feedback**: Hover states, active states, and loading indicators
- **Error Handling**: Clear, user-friendly error messages
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Security
- Schema is stored in memory and not exposed in HTML source
- Base64 encoding can be added for schema transmission
- Form data validation on both client side

## 🛠️ Technical Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Drag & Drop**: vuedraggable
- **Date Picker**: @vuepic/vue-datepicker
- **Deployment**: Ready for Vercel, Netlify, Cloudflare Pages, etc.

## ⚙️ Vite Configuration

The Vite configuration is optimized for production:
- **Code Splitting**: Vendor chunks separated for better caching
- **Minification**: Terser for optimal bundle size
- **Path Aliases**: `@/` alias for cleaner imports
- **Dependency Pre-bundling**: Faster development server startup
- **Tree Shaking**: Automatic removal of unused code

## 🎯 Features Implementation

### Validation Rules
Supported validation rules:
- `required`: Field must have a value
- `max:n`: Maximum length or value
- `min:n`: Minimum length or value
- Numeric constraints: minimum, maximum, allow_decimal
- Custom field-specific validations

### Visibility Rules
Supported visibility conditions:
- `required`: Target field must have a value
- `is:value`: Target field must equal specific value
- `not:value`: Target field must not equal specific value
- `in:value1,value2`: Target field must be one of the values
- Multiple conditions with `|` separator

### Field Types

1. **Text Input**
   - Max length constraint
   - Placeholder text
   - Character counter

2. **Number Input**
   - Min/max value constraints
   - Decimal/integer only
   - Prefill value
   - Step validation

3. **Radio Input**
   - Multiple options
   - Visual selection highlight
   - Accessible markup

4. **Select Input**
   - Dropdown interface
   - Placeholder option
   - Keyboard navigation

5. **Date Input**
   - Modern calendar picker interface
   - Beautiful, cross-browser consistent UI
   - Click to open/close calendar
   - Auto-apply date selection
   - Keyboard navigation support
   - Custom styling matching form theme

## 🤖 AI Usage

AI was used extensively in this project for:
- **Code Generation**: Generating boilerplate code and component structures
- **Problem Solving**: Debugging complex TypeScript type issues
- **Best Practices**: Suggesting Vue 3 Composition API patterns
- **Optimization**: Vite configuration recommendations
- **Documentation**: Helping structure this README
- **UI/UX**: Designing component layouts and interactions

The AI helped accelerate development while maintaining code quality and following Vue.js best practices.

## 📝 File Organization

Files are organized by feature and responsibility:
- **Constants**: Type definitions and schemas
- **Store**: Centralized state management with Pinia
- **Components**: Reusable UI components split by functionality
- **Utils**: Pure functions for validation, visibility, and schema manipulation
- **Views**: Page-level components
- **Router**: Navigation configuration

## 🚢 Deployment

This project is ready for deployment on:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **Cloudflare Pages**: Connect GitHub repository
- **GitHub Pages**: Build and deploy `dist/` folder

Build command: `npm run build`
Output directory: `dist`

## 📄 License

MIT License

## 👨‍💻 Development

### Project Setup
```bash
npm install
```

### Compile and Hot-Reload for Development
```bash
npm run dev
```

### Type-Check, Compile and Minify for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

Built with ❤️ using Vue 3, TypeScript, and Tailwind CSS

