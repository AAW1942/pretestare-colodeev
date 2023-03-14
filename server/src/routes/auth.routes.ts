import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

const router = express.Router()

// Route for user authentication
router.post('/login', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const a = await User.findOne()

		

		res.sendStatus(200)

		// Check if the user exists
		// const user = await User.findOne({ email })

		// if (!user) {
		// 	return res.status(401).json({ message: 'Invalid email or password' })
		// }

		// Check if the password is correct
		// const isMatch = await user.comparePassword(password)

		// if (!isMatch) {
		// 	return res.status(401).json({ message: 'Invalid email or password' })
		// }

		// Generate a JWT token
		// const token = jwt.sign({ userId: user._id }, 'secret')

		// res.status(200).json({ token })
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({ message: 'Internal server error' })
	}
})

export default router
