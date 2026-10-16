GB STUDY — Front-end prototype (database-ready handoff)
======================================================

Open / test:
- Extract this ZIP.
- Open index.html in a browser, or upload the whole GB_STUDY_App folder to static hosting (Vercel/GitHub Pages).
- Keep assets/gb-study-logo.png beside index.html.

Included:
- GB STUDY splash screen with supplied black/gold logo
- Home platform list, favorites, free/VIP grouping and external/same-tab opening
- Up to 100 platform cards, editable in Admin Panel
- VIP hub and clickable VIP plans that open Telegram support
- Telegram support popup on app open (dismissible for the current tab session)
- Demo VIP key generator with 30/90/180/365-day or no-expiry options
- Demo key expiry check and one-browser/device binding
- Chat UI with local-only demo messages and admin-message form
- Account, profile, daily streak, rewards and study analytics demo UI
- Admin Panel password (demo): GBADMIN2026
- Platform icon by URL or upload, edit/delete platform, free/VIP type, open mode
- VIP display price manager, generated key list/delete, JSON export/import backup

IMPORTANT LIMITATIONS BEFORE PUBLIC LAUNCH:
This is a front-end prototype. Admin password, platform settings, and generated VIP keys are stored in browser localStorage and are not secure or shared across users. The one-device lock only demonstrates the intended behavior in this browser; it is NOT a secure device lock. Do not use this as real paid VIP access until server-side authentication, database-backed keys, expiry enforcement, and device binding are added. The chat is local-only, payments are not processed, and user accounts are not real. A database alone is not enough; frontend code must be connected to a secure backend/API.

Some default sample platform URLs are placeholders. Use Admin Panel to replace them with your real URLs.


ICON / SPLASH FIX:
- Local GB STUDY logo is bundled under assets/gb-study-logo.png.
- Added favicon.ico, 96px favicon, Apple touch icon, PWA manifest and 192px/512px app icons.
- Splash screen uses the bundled local logo; no external image URL required.
- For Android home-screen icon, deploy the site over HTTPS and use browser menu > Add to Home screen / Install app. A WebView/APK builder may require setting its launcher icon separately.

LOGO DISPLAY FIX: The main logo image is embedded directly in index.html, so splash/header/logo should still display if you copy only index.html into a simple HTML wrapper. For installed APK launcher icon, set assets/icon-512.png as the app icon in the APK builder separately. For web hosting, upload the whole folder to preserve manifest and standalone icon files.


Feature update: Added client-side platform search and an Upcoming Platforms section. Upcoming list is a local editable-in-code starter list, not synced to a server. Search filters platforms already configured in this app.


ULTIMATE FEATURES UPDATE
- Added Study Tools panel with daily goal tracker, recent platforms, quick maths quiz, local XP rewards, and notice board.
- Platform opens are recorded in local recent history.
- These features save in this browser/device only. No cloud database was created because a database account/project and its public configuration/credentials were not supplied. Do not put private service-role keys in frontend HTML. For cross-device sync, connect a backend (for example Firebase or Supabase) with appropriate project settings and security rules.
- Admin password in this prototype remains client-side and is not secure for a production site.

FIREBASE INTEGRATION (added)
- Firebase Web SDK compat scripts and the provided GB STUDY web config are included in index.html.
- Email/password sign-up, email verification, sign-in and sign-out UI are wired to Firebase Authentication.
- Public platform data listens to Firestore appData/public (guests can read it); admin publishing attempts are restricted by Firestore Rules.
- Verified signed-in users can read/send chat messages through chatMessages. Chat is not local-only when Firebase and Rules are configured.
- firestore.rules.txt contains starter rules. In Firebase Console > Firestore Database > Rules, review/publish these rules after replacing YOUR_ADMIN_FIREBASE_UID with the UID of your admin account. Create the admin account in Authentication first and verify its email. Do not leave placeholder UID in production.
- The existing hidden admin page still uses a client-side demo password. This is NOT secure production admin authentication; Firestore rules block platform writes unless the signed-in UID matches the admin UID. Do not rely on hidden taps/client password for security.
- In Firebase Console, enable Authentication > Sign-in method > Email/Password, create Firestore Database, and deploy the supplied rules. This ZIP cannot change your Firebase Console settings automatically.
- Host the app over HTTPS for production. Keep API restrictions and Firebase security rules configured. Firebase web apiKey is a public client identifier; security comes from Rules/Auth, not hiding this value.

Cloud Study Materials integration (added)
- firebase-config.js: Firebase modular SDK configuration and Firestore export.
- materials.js: addStudyMaterial() and listenToMaterials() real-time Firestore helpers.
- Admin Panel now includes a Cloud Study Material publish form and live materials list.
- Publish requires the hidden Admin panel to be unlocked AND a verified Firebase login. Firestore Rules must also authorize the account's Firebase UID.
- Before production: replace YOUR_ADMIN_FIREBASE_UID in firestore.rules.txt with the UID from Firebase Authentication, then publish the complete rules in Firebase Console > Firestore Database > Rules.
- Deploy the whole folder to HTTPS hosting (Vercel/Firebase Hosting/etc.); ES modules will not work reliably when opening index.html directly via file://.
- Firebase config is public client configuration. Security depends on Authentication and Firestore Rules, not hiding the config.


FINAL ZIP HANDOFF (16 Oct 2026)
==============================
- firebase-config.js exports modular Firebase app, Auth, Firestore, Google provider, and email/Google auth helper functions.
- materials.js uses snapshot.docs.map(...) for Firestore realtime materials and returns the unsubscribe function.
- index.html already loads Firebase Compat SDK for the app's existing auth/chat/platform UI and imports materials.js as a module. Do not add <script type="module" src="./firebase-config.js"></script> as a substitute for imports; modules must be imported by the code that uses their exports.
- Upload the entire GB_STUDY_App folder to HTTPS hosting, not only index.html.
- Before real use: enable Email/Password in Firebase Authentication, create Firestore, replace YOUR_ADMIN_FIREBASE_UID in firestore.rules.txt with the verified admin user's UID, and publish the rules in Firebase Console.
- The included hidden admin password is only a UI lock, not a security boundary. Firestore Rules must be published and tested. The project bundle is not proof that the live Firebase backend has been configured or tested.
- Firebase Console's Google sign-in provider must be enabled if using loginWithGoogle(). Add the deployed domain under Authentication > Settings > Authorized domains.


PLATFORM REFRESH PERSISTENCE PATCH
==================================
- Platform add/edit/delete now writes a local timestamp so a stale Firestore snapshot does not immediately overwrite a newer local platform list after refresh.
- Local platform data persists in the same browser profile and same deployed origin. Clearing site data or changing domains/browser can make local-only data unavailable.
- Cross-device persistence requires signing in with the verified admin Firebase account and publishing Firestore Rules with the correct admin UID. Check browser console and Firebase Rules if cloud writes are denied.
