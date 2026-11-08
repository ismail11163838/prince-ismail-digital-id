PRINCE ISMAIL DIGITAL-ID — Netlify setup (Bangla)

গুরুত্বপূর্ণ:
এই ZIP-এ Netlify Functions + Supabase database-সহ পুরো প্রজেক্টের ফাইল আছে।
পুরোনো database.json Netlify-তে ব্যবহার হবে না। Supabase-এ নতুন table তৈরি করতে হবে।
এটি প্রথম deployment starter; প্রকাশের আগে নিজের Admin password ও secrets সেট করুন।

১) Supabase database তৈরি
- https://supabase.com এ account খুলে New project তৈরি করুন।
- Project-এর SQL Editor খুলুন।
- এই ZIP-এর supabase.sql ফাইলের সব SQL paste করে Run চাপুন।
- Project Settings > API থেকে Project URL এবং service_role key নিন।
  service_role key কাউকে দেবেন না এবং HTML-এ বসাবেন না।

২) Netlify-তে upload
- ZIP extract করুন।
- https://app.netlify.com/drop খুলুন এবং পুরো extracted project folder upload করুন।
- Netlify-তে project তৈরি হলে Site configuration > Environment variables-এ এই তিনটি variable যোগ করুন:
  SUPABASE_URL = Supabase Project URL
  SUPABASE_SERVICE_ROLE_KEY = Supabase service_role key
  ADMIN_PASSWORD = নিজের নতুন শক্তিশালী Admin password
  SESSION_SECRET = কমপক্ষে 32 অক্ষরের এলোমেলো গোপন string
- Environment variable save করার পর নতুন deploy দিন (Deploys > Trigger deploy > Deploy site)।

৩) ব্যবহার
- আপনার Netlify site URL/admin.html খুলুন।
- ADMIN_PASSWORD দিয়ে login করুন।
- User তৈরি করুন, Edit Profile করুন, Gallery থেকে ছবি দিন।
- SHOW QR চাপলে আলাদা QR দেখাবে।
- QR scan করলে /u/USER-ID public profile খুলবে।

নিরাপত্তা
- পুরোনো Ismail@123 পাসওয়ার্ড ব্যবহার করবেন না।
- Supabase service_role key কখনো কারও সঙ্গে শেয়ার করবেন না।
- User profile-এর ফোন/ঠিকানা public profile-এ দেখা যায়। যেসব তথ্য public করতে চান না, সেগুলো দেবেন না।
- এই starter-এ rate limiting, password reset, audit log, advanced image storage/CDN, privacy controls ও production security review এখনও যোগ করা হয়নি।
- Profile photo data URL হিসেবে DB-তে থাকে; খুব বড় ছবি ব্যবহার করবেন না।
