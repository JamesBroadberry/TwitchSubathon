# TwitchSubathon

About A HTML Twitch Overlay that displays goals of a subathon and the remaining time (using StreamElements chat phrases to trigger)

# Hosted on GitHub pages

https://jamesbroadberry.github.io/TwitchSubathon/

# How to set up

Take the following template and adjust as necessary, then [minify it](https://www.minifyjson.org/) and then [base64 encode it](https://www.base64encode.org/) and put it in the URL like so:
https://jamesbroadberry.github.io/TwitchSubathon/?config=[YOUR_CONFIG_STRING]

```json
{
  "goals": {
    "10": "Goal 1",
    "25": "Goal 2",
    "50": "Goal 3"
  },
  "twitchUsername": "LowerCaseTwitchUsername",
  "initialMinutes": 60,
  "secondsPerPrimeSub": 120,
  "secondsPerTier1Sub": 120,
  "secondsPerTier2Sub": 240,
  "secondsPerTier3Sub": 480,
  "secondsPerBit": 0.6,
  "secondsPerPenny": 0.6
}
```

The example config's URL would be the following:

https://jamesbroadberry.github.io/TwitchSubathon/?config=eyJnb2FscyI6eyIxMCI6IkdvYWwgMSIsIjI1IjoiR29hbCAyIiwiNTAiOiJHb2FsIDMifSwidHdpdGNoVXNlcm5hbWUiOiJMb3dlckNhc2VUd2l0Y2hVc2VybmFtZSIsImluaXRpYWxNaW51dGVzIjo2MCwic2Vjb25kc1BlclByaW1lU3ViIjoxMjAsInNlY29uZHNQZXJUaWVyMVN1YiI6MTIwLCJzZWNvbmRzUGVyVGllcjJTdWIiOjI0MCwic2Vjb25kc1BlclRpZXIzU3ViIjo0ODAsInNlY29uZHNQZXJCaXQiOjAuNiwic2Vjb25kc1BlclBlbm55IjowLjZ9

# How it works

- Decodes the config from the URL and connects to the Twitch chat of that user
- Looks at messages from the 'streamlabs' user, using the default message text to automatically update the counter and timer
- Also looks at messages from the host to be able to use commands for manual adjustment

# Commands

The broadcaster of the Subathon can use the following commands:

- `!addsubs [number]` - adds the number of prime subs
- `!addminutes [number]` - adds a number of minutes to the timer
- `!subathonreset` - resets the subathon (all subs and time will be remembered but the end date of the subathon will be re-calculated from now)

# Customization

If you can specify custom CSS, you can change the appearance of the subathon timer using the following overrides. You don't need to specify all of them if you only want to override a few.

```css
.SubathonContainer {
  --subathon-criticaltime: red;
  --subathon-lowtime: red;
  --subathon-addedtime: green;
  --subathon-textcolor: black;
  --subathon-progressbarcolor: blue;
  --subathon-background: transparent;
}
```

# Remarks

- If the page refreshes for whatever reason, all of it's state will unfortunately be lost so ensure that the HTML overlay doesn't reset
- If the config isn't perfectly formatted, it might break when running so ensure it's set up correctly!
