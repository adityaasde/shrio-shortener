# Shrio - URL Shortener & QR Code Generator

Built **Shrio** using Next.js (TypeScript), Express.js, and MongoDB - a secure platform for user authentication, link shortening, QR code generation, customizable short URLs, and detailed link analytics.

## Features

- Secure authentication with email and password only, using JWTs for session management

- Link shortening with customizable URLs for easy sharing

- QR code generation for every shortened link, ready to download or share

- Link management allowing users to edit, delete, and organize their links and QR codes

- Analytics dashboard with total clicks, daily clicks, and device stats (desktop vs mobile)

- User profiles to manage all links, QR codes, and analytics from a secure dashboard

## Highlights (Shrio)

- Developed a full-featured link management platform with Next.js (TypeScript), Express.js, and MongoDB.

- Rate limiting implemented at 50 requests per method to prevent abuse.

- Implemented secure email/password authentication with JWT-based session management.

- Built a customizable URL shortener with automatic QR code generation for every link.

- Designed a modular architecture separating frontend, backend, authentication, and analytics for clarity and maintainability.

- Enhanced user experience and performance through Next.js SPA principles and efficient state management.

## Stack

- Frontend: Next.js with TypeScript, state management using Zustand

- Backend: Node.js, Express.js, RESTful APIs

- Database: MongoDB with Mongoose

- Authentication: Secure email/password login with JWTs

## Future Improvements

- Enhance analytics dashboard with more detailed metrics (geolocation, referrers, etc.)
- Introduce custom domains and advanced link customization