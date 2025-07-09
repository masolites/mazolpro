# MAZOL-Pro Frontend

- Next.js + Tailwind CSS
- User authentication (email, wallet, password)
- Personalized dashboard: Matrix, Earnings, Wallet, Private Sale, Mining, Voting, Withdraw
- Secure, no admin link in UI
- Admin dashboard at `/admin-secret-xyz`

## Setup

1. `npm install`
2. Copy `.env.local.example` to `.env.local` and set your backend API URL.
3. `npm run dev` to start locally.
4. Deploy to Vercel.

## Security

- No sensitive data in frontend.
- All API calls use secure POST.
- Admin dashboard is only at `/admin-secret-xyz`.
