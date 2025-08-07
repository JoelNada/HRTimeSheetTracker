import { getUsersFromDB, createUserToDB } from '../services/UserService.js';

const getUsers = async (req, res) => {
  try {
    const users = await getUsersFromDB();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await createUserToDB(req.body);
    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.errors[0].message,
    });
  }
};

export { getUsers, createUser };
