import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
	password: string
	name: string
	movieLists: {
		watching: string[]
		willWatch: string[]
		viewed: string[]
		abandoned: string[]
	}
	favorites: string[]
	friends: string[]
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	movieLists: {
		watching: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
		willWatch: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
		viewed: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
		abandoned: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
	},
	favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
	friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = mongoose.model<IUser>('User', UserSchema)

interface IMovie extends Document {
	rezkaURL: string
	url: string
}

const MovieSchema: Schema = new Schema({
	rezkaURL: { type: String, require: true},
	url: { type: String, require: true}
})

const Movie = mongoose.model<IMovie>('Movie', MovieSchema)

export { User, IUser, Movie, IMovie }
