# Fairwinds RV App - Project Structure

## Implementation Phases Overview
- Phase 1: Core RV Profile & Auth
- Phase 2: Maintenance & Settings (Placeholder)
- Phase 3: Community Features (Placeholder)

## Key Design Principles
- Card-based navigation with maximum three buttons per card
- Back navigation integrated within NavBar component
- Documents/photos displayed in grid/list layouts
- Single-purpose screens
- Full-screen forms for data entry
- Card-based content display for navigation elements
- Consistent navigation structure using NavBar and NavButton components

## Root Directory Structure
```
fairwinds/
├── public/                     # Static assets [PHASE 1]
│   ├── icons/                 # PWA icons [PHASE 2]
│   ├── images/               # App images and icons [PHASE 1]
│   │   ├── ui/              # UI elements and icons [PHASE 1]
│   │   └── placeholders/    # Default/placeholder images [PHASE 1]
│   └── manifest.json         # PWA manifest [PHASE 2]
├── src/
│   ├── app/                   # Next.js app directory [PHASE 1]
│   │   ├── api/              # API routes [PHASE 2]
│   │   ├── (auth)/          # Auth group routes [PHASE 1]
│   │   │   ├── login/       # Login page [PHASE 1]
│   │   │   └── signup/      # Signup page [PHASE 1]
│   │   ├── dashboard/       # Dashboard routes [PHASE 1]
│   │   ├── maintenance/     # Maintenance routes [PHASE 2]
│   │   ├── rv/             # RV management routes [PHASE 1]
│   │   │   └── new/        # New RV setup [PHASE 1]
│   │   ├── settings/       # Settings routes [PHASE 2]
│   │   └── layout.tsx      # Root layout [PHASE 1]
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components [PHASE 1]
│   │   │   ├── AuthProvider.tsx    # Cognito integration [PHASE 1]
│   │   │   ├── SessionManager.tsx  # JWT handling [PHASE 1]
│   │   │   └── TokenRefresh.tsx    # Auto-refresh [PHASE 1]
│   │   ├── common/         # Shared components [PHASE 1]
│   │   │   ├── layout/     # Layout components [PHASE 1]
│   │   │   ├── navigation/ # Navigation components [PHASE 1]
│   │   │   └── ui/        # UI components [PHASE 1]
│   │   ├── dashboard/      # Dashboard components [MIXED]
│   │   ├── forms/          # Form components [PHASE 1]
│   │   ├── maintenance/    # Maintenance components [PHASE 2]
│   │   └── rv/            # RV components [PHASE 1]
│   ├── context/            # React Context [PHASE 1]
│   │   ├── auth/          # Authentication state [PHASE 1]
│   │   ├── offline/       # Offline status [PHASE 1]
│   │   └── rv/            # RV data state [PHASE 1]
│   ├── hooks/              # Custom React hooks
│   │   ├── auth/          # Authentication hooks [PHASE 1]
│   │   ├── data/          # Data fetching hooks [PHASE 1]
│   │   │   ├── rv/        # RV data hooks [PHASE 1]
│   │   │   └── user/      # User data hooks [PHASE 1]
│   │   └── ui/            # UI-related hooks [PHASE 2]
│   ├── lib/                # Utility functions [PHASE 1]
│   │   ├── api/           # API utilities [PHASE 1]
│   │   │   ├── auth/      # Auth API helpers [PHASE 1]
│   │   │   └── rv/        # RV API helpers [PHASE 1]
│   │   ├── db/            # Database utilities [PHASE 1]
│   │   ├── image/         # Image processing utilities [PHASE 1]
│   │   │   ├── compression.ts  # Canvas API compression [PHASE 1]
│   │   │   └── thumbnails.ts   # Thumbnail generation [PHASE 1]
│   │   ├── offline/       # Offline utilities [PHASE 1]
│   │   │   ├── sync.ts    # Data synchronization [PHASE 1]
│   │   │   └── storage.ts # IndexedDB management [PHASE 1]
│   │   └── validation/    # Form validation [PHASE 1]
│   ├── services/           # External service integrations [PHASE 2]
│   │   └── storage/       # S3 storage service [PHASE 1]
│   │       ├── s3.ts      # S3 photo storage [PHASE 1]
│   │       └── indexeddb.ts # Offline photo cache [PHASE 1]
│   ├── styles/             # Global styles [PHASE 1]
│   │   ├── components/    # Component-specific styles [PHASE 1]
│   │   └── themes/        # Theme configurations [PHASE 1]
│   └── types/              # TypeScript types [PHASE 1]
│       ├── api/           # API types [PHASE 1]
│       ├── components/    # Component types [PHASE 1]
│       └── models/        # Data model types [PHASE 1]
├── amplify/                # AWS Amplify configuration [PHASE 1]
│   ├── backend/           # Backend configuration [PHASE 1]
│   │   ├── auth/         # Cognito configuration [PHASE 1]
│   │   │   ├── triggers/ # Auth triggers [PHASE 1]
│   │   │   └── rules/    # Auth rules [PHASE 1]
│   │   ├── api/          # AppSync configuration [PHASE 1]
│   │   │   ├── schema/   # GraphQL schema [PHASE 1]
│   │   │   │   ├── user.graphql      # User type [PHASE 1]
│   │   │   │   ├── rv.graphql        # RV type [PHASE 1]
│   │   │   │   └── maintenance.graphql # Maintenance type [PHASE 1]
│   │   │   └── resolvers/ # GraphQL resolvers [PHASE 1]
│   │   │       ├── mutations/ # Create, Update, Delete [PHASE 1]
│   │   │       └── queries/   # Read operations [PHASE 1]
│   │   └── storage/      # S3 configuration [PHASE 1]
│   └── data/             # Data models [PHASE 1]
│       ├── schema/       # Model schemas [PHASE 1]
│       └── seeds/        # Seed data [PHASE 1]
└── workers/                # Service workers [PHASE 2]
    ├── offline/           # Offline functionality [PHASE 2]
    │   ├── events.ts     # Maintenance events cache [PHASE 2]
    │   └── photos.ts     # Photo thumbnail cache [PHASE 2]
    └── sw.ts              # PWA service worker [PHASE 2]
```

## Navigation Structure

### Special Pages

#### Onboarding Flow
- New RV Setup (/rv/new)
  * Initial RV registration
  * Make and model selection
  * Basic details collection
  * Redirects to dashboard on completion

### Main Navigation Structure

#### Dashboard (Main)
- Card with three navigation buttons:
  * Button 1: My RV - Access RV profile and photos
  * Button 2: Maintenance - View and manage maintenance records
  * Button 3: Settings - User preferences and app settings

#### My RV Section
- Navigation card with three buttons:
  * Button 1: Profile - View/edit RV details
  * Button 2: Photos - RV photo gallery
  * Button 3: Back - Return to dashboard
- Profile displays as full-screen form when editing
- Photos displayed in grid layout

#### Maintenance Section
- Navigation card with three buttons:
  * Button 1: New - Create maintenance record
  * Button 2: History - View maintenance records
  * Button 3: Back - Return to dashboard
- Records displayed in list layout
- Forms appear as full-screen overlays

### First-time User Flow [PHASE 1]
```
[/] (Root/Landing)
└── [Auth] (Section 1: One-time Setup)
    ├── [/login] (Login Page) - ACTIVE
    │   └── {Components: AuthUI, LoginForm, ErrorBoundary}
    ├── [/signup] (Sign Up Page) - ACTIVE
    │   └── {Components: AuthUI, SignupForm, ErrorBoundary}
    └── [/rv/new] (New RV Setup) - ACTIVE
        └── {Components: RVProfileForm, ErrorBoundary}
```

### Returning User Flow
```
[/] (Root/Landing) [PHASE 1]
├── [Auth]
│   └── [/login] - ACTIVE
└── [/dashboard] (Section 2: Dashboard) [PHASE 1]
    └── {Components: 
        - NavBar (3 buttons) - ACTIVE
        - RVSummaryCard - ACTIVE
        - MaintenancePreview - PLACEHOLDER
        - SettingsPanel - PLACEHOLDER
    }
    ├── [Button 1: /rv] (Section 3: RV) [PHASE 1]
    │   └── {Components: 
    │       - NavBar - ACTIVE
    │       - RVProfile - ACTIVE
    │   }
    │   ├── [/rv/profile] - ACTIVE
    │   ├── [/rv/photos] - ACTIVE
    │   └── [Back Navigation] - ACTIVE
    │
    ├── [Button 2: /maintenance] (Section 4) [PHASE 2-PLACEHOLDER]
    │   └── {Components:
    │       - NavBar - ACTIVE
    │       - MaintenancePreview - PLACEHOLDER
    │       - MaintenanceCard - PLACEHOLDER
    │   }
    │   ├── [/maintenance/new] - PLACEHOLDER
    │   ├── [/maintenance/history] - PLACEHOLDER
    │   └── [Back Navigation] - ACTIVE
    │
    └── [Button 3: /settings] (Section 5) [PHASE 2-PLACEHOLDER]
        └── {Components:
            - NavBar - ACTIVE
            - SettingsPanel - PLACEHOLDER
            - ErrorBoundary - ACTIVE
        }
```

## Component Implementation Status

### Phase 1: Core RV Profile & Auth
- Authentication Components
  * AuthProvider (Email/password only)
  * AuthUI (Basic auth flow)
  * LoginForm (Email/password fields)
  * SignupForm (Email/password fields)
- RV Components
  * RVProfile (Single RV per user)
  * RVProfileForm
    - Required fields: make (auto-complete), model (auto-complete), year (selection)
    - Optional fields: VIN, notes
  * PhotoGallery (Grid Layout, 12 photo limit)
  * PhotoUpload (Full-screen interface)
- Common Components
  * NavBar (Button Container)
  * NavButton (Individual Button)
  * ErrorBoundary
  * LoadingState
  * BackButton
- Layout Components
  * DashboardLayout
  * RVSectionLayout

### Phase 2: Maintenance & Settings (Placeholder)
- Maintenance Components
  * MaintenanceForm
  * MaintenanceHistory (List Layout)
  * MaintenanceCard
  * MaintenancePreview
- Settings Components
  * SettingsPanel
  * PreferencesForm
- Service Workers
  * Offline Support
  * PWA Features

### Phase 3: Community Features (Placeholder)
- Community Components
  * ServiceManual
  * CommunityTips
  * UserProfiles
- Marketplace Components
  * PartsDirectory
  * ServiceProviders

## Component Details

### Layout Components
- NavBar: Navigation container component
  * Manages layout and spacing of navigation buttons
  * Handles 3-button layout with integrated back navigation
  * Controls button visibility and arrangement
  * Maintains consistent card-based structure
- NavButton: Individual navigation button component
  * Handles button styling and interactions
  * Manages hover/active/focus states
  * Supports icons and metadata
  * Handles disabled states
- DashboardLayout: Main three-button navigation wrapper
- RVSectionLayout: RV section with integrated back navigation
- MaintenanceLayout: Maintenance section with integrated back navigation

### Dashboard Components
- RVSummaryCard: RV preview card on dashboard
  * Current RV information and status
  * Quick access to RV details
  * Status indicators and alerts
- MaintenancePreview: Upcoming maintenance summary
  * Next scheduled maintenance tasks
  * Maintenance due dates
  * Quick access to maintenance dashboard
- SettingsPanel: Quick settings access and user preferences

### RV Components
- RVProfile: Full-screen form for RV details
  * Single RV per user account
  * Required fields: make (auto-complete), model (auto-complete), year (selection)
  * Optional fields: VIN, notes
- RVProfileForm: Initial RV setup and editing
  * Auto-completing form using predefined make/model data
  * Year selection from predefined list
- PhotoGallery: Grid layout for photo management
  * Maximum 12 photos per RV
- PhotoUpload: Full-screen photo upload interface

### Maintenance Components
- MaintenanceForm: Full-screen form for new records
  * Photo attachment support
  * Offline viewing of form data
- MaintenanceHistory: List view with filtering
  * Offline access to upcoming events
- MaintenanceCard: Individual record display
  * Photo display support
- DocumentUpload: Full-screen document upload interface
- MaintenancePreview: Dashboard maintenance summary
  * Offline-capable preview

### Common Components
- LoadingState: Skeleton loading states
- ErrorBoundary: Error handling wrapper
- BackButton: Integrated in NavBar
- LoadingSpinner: Loading state indicator

## API Architecture

### GraphQL API (AWS AppSync) [PHASE 1]
- Primary data interface using AppSync for all CRUD operations
- Implements data models:
  * User profiles
  * RV details and photos
  * Maintenance records
  * Document metadata

### API Layer Organization
- AppSync GraphQL API [PHASE 1]
  * Schema-first development approach
  * Type-safe operations with TypeScript
  * Automatic TypeScript type generation
  * Optimized query batching

- API Integration Points
  * Authentication: Cognito JWT validation
  * Storage: S3 presigned URLs for photos
  * Database: DynamoDB single-table design
  * Offline: IndexedDB sync management

### API Implementation Details
- GraphQL Schema Structure
  * User type: Authentication and preferences
  * RV type: Vehicle details and relationships
  * MaintenanceRecord type: Service history
  * Document type: File metadata and storage

- Resolver Implementation
  * Direct DynamoDB resolvers for basic CRUD
  * Custom resolvers for complex operations
  * Batch resolvers for optimized queries
  * Offline-aware mutation handling

- API Security
  * Cognito user pool authentication
  * Fine-grained access control
  * Per-field authorization rules
  * Rate limiting and quotas

### API Development Guidelines
- Schema Evolution
  * Backward compatible changes only
  * Deprecation before removal
  * Version tracking in comments
  * Breaking changes in major versions

- Error Handling
  * Standardized error types
  * Detailed error messages
  * Proper error propagation
  * Client-side recovery paths

- Performance Considerations
  * Query optimization
  * Connection pooling
  * Caching strategies
  * Batch operations

### Page-Component Relationships

SECTION 1: AUTH
    Login Page
    - Uses: AuthProvider
    - Contains: AuthUI, LoginForm, ErrorBoundary
    - Purpose: User authentication

    Signup Page
    - Uses: AuthProvider
    - Contains: AuthUI, SignupForm, ErrorBoundary
    - Purpose: New user registration

    New RV Setup Page
    - Uses: AuthProvider (standalone)
    - Contains: RVProfileForm, ErrorBoundary, LoadingState
    - Purpose: Onboarding new users and collecting initial RV details

SECTION 2: DASHBOARD
    Dashboard Page
    - Uses: DashboardLayout, AuthProvider
    - Contains: NavBar (3 buttons), RVSummaryCard, MaintenancePreview, SettingsPanel, LoadingState
    - Purpose: Central navigation and overview

SECTION 3: RV
    RV Profile Page
    - Uses: RVSectionLayout
    - Contains: NavBar (2 buttons + Back), RVProfile, ErrorBoundary, LoadingState
    - Purpose: View and edit RV details

    RV Photos Page
    - Uses: RVSectionLayout
    - Contains: NavBar (2 buttons + Back), PhotoGallery, PhotoUpload, LoadingState
    - Purpose: Manage RV photo collection

SECTION 4: MAINTENANCE
    Maintenance Main Page
    - Uses: MaintenanceLayout
    - Contains: NavBar (Button 1: New, Button 2: History, Button 3: Back), MaintenancePreview, MaintenanceCard, LoadingState
    - Purpose: Overview of upcoming maintenance with quick actions

    New Maintenance Page
    - Uses: MaintenanceLayout
    - Contains: NavBar (Button 1: Save, Button 2: Cancel, Button 3: Back), MaintenanceForm, DocumentUpload, LoadingState
    - Purpose: Create and save new maintenance records

    Maintenance History Page
    - Uses: MaintenanceLayout
    - Contains: NavBar (Button 1: Filter, Button 2: Sort, Button 3: Back), MaintenanceHistory, MaintenanceCard, LoadingState
    - Purpose: View and manage completed maintenance records

SECTION 5: SETTINGS
    Settings Page
    - Uses: DashboardLayout
    - Contains: NavBar (3 buttons), SettingsPanel, ErrorBoundary, LoadingState
    - Purpose: User and app preferences management

## Placeholder Implementation Guidelines

### Navigation
- All navigation paths remain active
- Placeholder pages show "Coming Soon" UI
- Maintain consistent back navigation
- Track placeholder feature engagement

### Placeholder UI Requirements
1. Clear "Coming Soon" messaging
2. Expected availability timeline
3. Feature preview/mockup where appropriate
4. Proper error boundaries
5. Analytics tracking for feature interest

### Component Structure
- Maintain full component hierarchy
- Implement basic shells for future features
- Keep all navigation buttons active
- Show appropriate loading states

## Development Guidelines

### Deployment & Testing Strategy
- Deployment Workflow:
  * Git-based deployments through AWS Amplify
  * Automatic builds and deployments on git push
  * Built-in SSL and CDN management
  * Branch-based deployments available for future use

### Testing Approach (Phase 1)
- Manual testing strategy focusing on:
  * Authentication flows
  * RV profile creation and editing
  * Photo upload functionality (12 photo limit)
  * Basic maintenance tracking
- Automated testing framework deferred to Phase 3
- Error handling through AppSync's built-in error types:
  * Unauthorized access
  * Validation errors
  * Conditional check failures
- Client-side error handling via Amplify libraries

### File Naming Conventions
- Components: PascalCase (e.g., `MaintenanceCard.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Pages: Next.js page convention (`page.tsx`)

### Code Organization
- Keep related files close together
- Group by feature when possible
- Separate business logic from UI components
- Use barrel exports (index.ts) for cleaner imports

### Phase 1 Focus Areas
1. Core Authentication
2. RV Profile Management
3. Basic Photo Upload
4. Essential Navigation
5. Error Handling
6. Loading States

### Future Phase Preparation
1. Maintain placeholder structure
2. Document future feature plans
3. Track user interest in upcoming features
4. Prepare for seamless phase transitions

This structure provides a foundation for Phase 1 features while maintaining clear placeholders for future phases, ensuring a consistent user experience and smooth development progression.
