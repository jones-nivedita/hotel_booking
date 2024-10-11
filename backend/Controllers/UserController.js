import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

export const registerUser = (req, res) => {
  
    User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password,salt),
    })
       .then(user => res.json(user))
       .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' })
      });
}


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json('User not found');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(400).json('Wrong credentials');
    }

    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        console.error('Error signing token:', err);
        return res.status(500).json('Internal Server Error');
      }

      res.cookie('token', token, { httpOnly: true }).json({
        id: userDoc._id,
        username,
      });
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json('Internal Server Error');
  }
};

export const logoutUser = (req, res) => {
    res.cookie('token', '').json('ok');
}

export const getUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' })
    });
}

export const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' })
    });
}


export const getProfile = (req, res) => {
  const {token}  = req.cookies;
  console.log('Token from cookie:', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.error('Error verifying token:', err); 
      return res.status(500).json({ error: 'Error verifying token', details: err.message });
    }
    res.json(info);
  });
}