# GOOGLE AUTH

## Install
```
npm install passport-google-oauth2
```

## Configure Strategy
```
import GoogleStrategy from "passport-google-oauth2";

passport.use("google", new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    userProfileURL: process.env.GOOGLE_PROFILE_URL,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, cb) {
    // your register/login code here
  }
));
```

## Authenticate Requests
```
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/secrets/path',
        failureRedirect: '/login'
}));
```

