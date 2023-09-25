import mongoose from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends mongoose.Document {
    email: string,
    fullName: string,
    password: string,
    token?: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: "O email inserido não é válido"
        }
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    const user = this as IUser;

    if(!user.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)

    user.password = hash

    return next()
})

UserSchema.methods.comparePassword = async function(password: string) {
    const user = this as IUser
    return bcrypt.compareSync(password, user.password)
}

const User = mongoose.model<IUser>("User", UserSchema)

export default User;