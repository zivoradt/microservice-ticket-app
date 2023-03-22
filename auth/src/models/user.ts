import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface that describe the properties
// that are required to create a new User

interface UserAttrs {
    email: string,
    password: string;
}

// An interface that desribe the properties
// that a User Model has

interface UserModel extends mongoose.Model<UserDoc>{
    build(attr: UserAttrs): UserDoc
}

// An interface that desribe the properties
// that a User Documet has

interface UserDoc extends mongoose.Document {
    email: string;
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }

    }
});

userSchema.pre('save', async function (done) {
    if(this.isModified('password')){
        const hash = await Password.toHash(this.get('password'));
        this.set('password', hash)
    }    
    done();
})

userSchema.statics.build = (attr: UserAttrs) =>{
    return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};