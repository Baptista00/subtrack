# Graph Report - C:\Users\LucasBaptista\Documents\Projetos\subtrack  (2026-08-09)

## Corpus Check
- 98 files · ~83,113 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 472 nodes · 933 edges · 63 communities (16 shown, 47 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Authentication Forms
- Subscription Editing
- Subscription Listing
- Shared UI Components
- Expo App Configuration
- Password Recovery
- Notification Scheduling
- Project Dependencies
- Product Rules and Docs
- Profile and Deletion
- Button UI Components
- TypeScript Configuration
- Legal Document Screens
- Delete Account Function
- Expo Core Packages
- ESLint Setup
- SubTrack App Icon
- SubTrack Black Symbol
- React Logo Asset
- React Logo 2x
- Automated QA
- Expo Dev Client
- Expo Font Package
- Expo Haptics Package
- Expo Image Package
- Linear Gradient Package
- Expo Notifications Package
- Expo Router Package
- Expo Splash Package
- Expo Symbols Package
- Expo System UI
- Expo Vector Icons
- Expo Web Browser
- React Package
- React DOM Package
- React Native Package
- Async Storage Package
- Gesture Handler Package
- Reanimated Package
- Safe Area Package
- Native Screens Package
- URL Polyfill Package
- React Native Web
- React Native Worklets
- Bottom Tabs Package
- Navigation Elements Package
- Navigation Native Package
- Supabase Client Package
- Android Icon Background
- Android Icon Foreground
- Android Monochrome Icon
- Adaptive Brand Foreground
- Launch Brand Symbol
- Green Brand Symbol
- White Brand Symbol
- Green Brand Wordmark
- White Brand Wordmark
- Favicon Asset
- Blue App Icon
- Partial React Logo
- React Logo Asset
- Splash Icon Asset

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 23 edges
2. `colors` - 21 edges
3. `spacing` - 18 edges
4. `home` - 17 edges
5. `expo` - 16 edges
6. `useAuth()` - 16 edges
7. `Button()` - 15 edges
8. `expo-router` - 13 edges
9. `ScreenContainer()` - 12 edges
10. `supabase` - 11 edges

## Surprising Connections (you probably didn't know these)
- `RootNavigator()` --calls--> `useAuth()`  [EXTRACTED]
  app/_layout.tsx → src/auth/useAuth.ts
- `Adicionar()` --calls--> `useAuth()`  [EXTRACTED]
  app/adicionar.tsx → src/auth/useAuth.ts
- `EditarAssinatura()` --calls--> `useAuth()`  [EXTRACTED]
  app/assinatura/[id].tsx → src/auth/useAuth.ts
- `Assinaturas()` --calls--> `useAuth()`  [EXTRACTED]
  app/assinaturas.tsx → src/auth/useAuth.ts
- `ListHeader()` --calls--> `formatCurrency()`  [EXTRACTED]
  app/index.tsx → src/lib/subscriptions.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Local Renewal Reminder Lifecycle** — docs_database_contract_local_renewal_reminders, docs_screens_local_reminder_behavior, docs_qa_checklist_prebuild_qa [INFERRED 0.85]

## Communities (63 total, 47 thin omitted)

### Community 0 - "Authentication Forms"
Cohesion: 0.06
Nodes (44): CadastroFieldErrors, styles, LoginFieldErrors, styles, AppTextProps, BackButtonProps, styles, BottomNav() (+36 more)

### Community 1 - "Subscription Editing"
Cohesion: 0.08
Nodes (37): Adicionar(), styles, EditarAssinatura(), styles, plugins, RootNavigator(), styles, PasswordFieldErrors (+29 more)

### Community 2 - "Subscription Listing"
Cohesion: 0.09
Nodes (34): Assinaturas(), getResultsCountText(), normalizeSearchText(), styles, SubscriptionsListHeaderProps, Index(), ListHeader(), ListHeaderProps (+26 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.12
Nodes (27): AppText(), variantStyles, FormField(), getLabelStateStyle(), styles, styles, styles, styles (+19 more)

### Community 4 - "Expo App Configuration"
Cohesion: 0.06
Nodes (31): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, edgeToEdgeEnabled, package, predictiveBackGestureEnabled, projectId (+23 more)

### Community 5 - "Password Recovery"
Cohesion: 0.12
Nodes (19): ForgotPasswordFieldErrors, styles, AuthContext, AuthContextValue, AuthProvider(), PasswordRecoveryLinkState, getAuthErrorMessage(), establishPasswordRecoverySession() (+11 more)

### Community 6 - "Notification Scheduling"
Cohesion: 0.18
Nodes (22): cancelScheduledNotificationSilently(), cancelSubscriptionReminder(), clearAllSubscriptionNotifications(), ensureAndroidNotificationChannelAsync(), ensureNotificationPermissionAsync(), getReminderDate(), scheduleSubscriptionReminder(), clearSavedNotificationIds() (+14 more)

### Community 7 - "Project Dependencies"
Cohesion: 0.08
Nodes (23): eslint, eslint-config-expo, devDependencies, eslint, eslint-config-expo, supabase, @types/react, typescript (+15 more)

### Community 8 - "Product Rules and Docs"
Cohesion: 0.14
Nodes (17): Approved Product Scope, Permanent Project Rules, Database Contract, Local Renewal Reminder Storage, Subscription Row Level Security, subscriptions Table, Design Tokens, Financial Summary Card Specification (+9 more)

### Community 9 - "Profile and Deletion"
Cohesion: 0.18
Nodes (10): getUserEmail(), getUserInitials(), getUserName(), Perfil(), ProfileOptionRowProps, styles, DeleteAccountFunctionResponse, deleteCurrentAccount() (+2 more)

### Community 10 - "Button UI Components"
Cohesion: 0.16
Nodes (13): Button(), ButtonProps, DangerButtonProps, getButtonStyle(), getTextStyle(), GhostButtonProps, PrimaryButtonProps, SecondaryButtonProps (+5 more)

### Community 11 - "TypeScript Configuration"
Cohesion: 0.15
Nodes (12): expo-env.d.ts, expo/tsconfig.base, .expo/types/**/*.ts, supabase/functions/**, **/*.ts, **/*.tsx, compilerOptions, paths (+4 more)

### Community 12 - "Legal Document Screens"
Cohesion: 0.31
Nodes (5): LegalDocumentScreen(), legalLastUpdated, LegalSection, privacyPolicySections, termsOfUseSections

### Community 13 - "Delete Account Function"
Cohesion: 0.31
Nodes (7): FunctionConfiguration, FunctionResponse, getDefaultKeyFromDictionary(), getFunctionConfiguration(), getNonEmptyEnvironmentValue(), getSupabaseKey(), isRecord()

### Community 14 - "Expo Core Packages"
Cohesion: 0.22
Nodes (9): expo, expo-constants, expo-linking, expo-status-bar, dependencies, expo, expo-constants, expo-linking (+1 more)

## Knowledge Gaps
- **172 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+167 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `expo` connect `Expo App Configuration` to `Subscription Editing`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `plugins` connect `Subscription Editing` to `Expo App Configuration`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `expo-router` connect `Subscription Editing` to `Authentication Forms`, `Subscription Listing`, `Shared UI Components`, `Password Recovery`, `Profile and Deletion`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _172 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Authentication Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.05573770491803279 - nodes in this community are weakly interconnected._
- **Should `Subscription Editing` be split into smaller, more focused modules?**
  _Cohesion score 0.07770582793709528 - nodes in this community are weakly interconnected._
- **Should `Subscription Listing` be split into smaller, more focused modules?**
  _Cohesion score 0.08710801393728224 - nodes in this community are weakly interconnected._