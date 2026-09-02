# Security Policy

## Supported Versions

ISC is a live website, not versioned software — there are no historical releases to patch. Security fixes are applied directly to the `main` branch and take effect as soon as they're deployed via GitHub Pages. Only the current, live `main` branch is supported.

## Reporting a Vulnerability

If you find a security issue — exposed data, a broken Firestore rule, an authentication bypass, or anything else that could compromise citizen data or admin access — please report it privately rather than opening a public GitHub issue.

**To report:**
- Contact Faiz (Faiz4224) directly via Discord, or
- Open a [GitHub Security Advisory](../../security/advisories/new) on this repo (private by default, visible only to maintainers)

Please include:
- What the vulnerability is and where it lives (file, page, or Firestore collection)
- Steps to reproduce it
- What data or access it could expose

**What to expect:**
- This is a solo-maintained project (one developer), so response time may vary, but reports are taken seriously and addressed as soon as possible — especially anything involving citizen data or admin/ISC clearance access.
- You'll get an acknowledgment once the report is seen, and an update once it's fixed or if more information is needed.
- Please don't publicly disclose the issue until it's resolved.

## Scope

This applies to the ISC portal (`thelegendoflegiona/isc`) and its integration with the shared Firebase project (`the-legend-of-legiona-the-lol`), including Firestore security rules, Firebase Authentication, and the admin/ISC role-based access control described in `MAINTENANCE.md`.

This project is not affiliated with Kawaiisho, Mojang, or Microsoft/Minecraft — security reports about those platforms should go to their respective teams, not here.
