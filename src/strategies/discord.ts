import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { config } from "dotenv";
import { VerifyCallback } from 'passport-oauth2';
import User from '../database/schemas/User';
config();

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user ? user : null);
    } catch (e) {
        console.error(e);
        done(e as any, null);
    }
});

passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: process.env.DISCORD_CALLBACK_URL!,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        const { id: discordId } = profile;
        const { email } = profile;

        let user = await User.findOneAndUpdate(
            { discordId },
            {
                accessToken,
                refreshToken,
            },
            {
                new: true, // return the updated document instead of the original
            }
        );

        if (user) {
            return done(null, user);
        }

        user = new User({
            discordId,
            accessToken,
            refreshToken,
            email
        });

        await user.save();
        return done(null, user);
    } catch (e) {
        console.error(e);
        return done(e as any, undefined);
    }
}));
