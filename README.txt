BIRTHDAY WEBSITE - HOW TO CUSTOMIZE
===================================

Files
  index.html  - page structure (bunny, buttons, cake, wishes card)
  style.css   - all colours, layout and animations
  script.js   - name, nickname, messages, music, cake, confetti

Open index.html in any browser to see it.

1) Her name / your name / nickname (easiest, no code)
   Add to the end of the page address:
     index.html#HerName
     index.html#HerName--YourName
     index.html#HerName--YourName--Nickname
   Use - or _ for a space, e.g. #Sara-Khan--Ali--Artist

2) Change the defaults in script.js (top of the file)
   var DEFAULT_NAME="My Friend", DEFAULT_FROM="your friend", DEFAULT_NICK="Artist";

3) Change wish messages
   script.js -> function wishesFor()   (the 6 wishes in the Wishes card)
   script.js -> var M=[...]            (messages that rotate on the main screen)
   script.js -> var SAY=[...]          (what the bunny says when tapped)

4) Change colours
   style.css -> :root { --pink, --violet, --bg1, --bg2, --bg3, --ink }

5) Birthday date text
   index.html -> <div class="date" id="date">  and script.js (search "3 November")

To put it online: upload the whole folder to any free host
(Netlify Drop, GitHub Pages, Vercel) and send her the link + #HerName.
