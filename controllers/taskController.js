const Task = require('../models/Task');
const moment = require('moment');

// GET /tasks (Retrieve all tasks with optional filters)
const getTasks = async (req, res) => {
  try {
    const { status, dueDate } = req.query;

    // Build the filter object
    const filter = {};

    // Filter by status if provided
    if (status) {
      filter.status = status;
    }

    // Filter by dueDate if provided
    if (dueDate) {
      // Check if the dueDate is in the format DD-MM-YYYY
      if (!moment(dueDate, 'DD-MM-YYYY', true).isValid()) {
        return res.status(400).json({ message: 'Invalid dueDate format. Please use DD-MM-YYYY.' });
      }

      // Convert the dueDate from DD-MM-YYYY to a Date object
      const parsedDueDate = moment(dueDate, 'DD-MM-YYYY').startOf('day').toDate();
      const nextDay = moment(dueDate, 'DD-MM-YYYY').add(1, 'days').startOf('day').toDate();

      // Filter for tasks that have a dueDate equal to the parsed date
      filter.dueDate = {
        $gte: parsedDueDate,
        $lt: nextDay // Include all tasks on the same day
      };
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /tasks/:id (Retrieve task by ID)
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /tasks (Create a new task)
const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  // Validate required fields
  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Title and Due Date are required' });
  }

  // Validate and format dueDate
  const formattedDueDate = moment(dueDate, 'DD-MM-YYYY', true); // Use strict parsing

  if (!formattedDueDate.isValid()) {
    return res.status(400).json({ message: 'Invalid Due Date format. Use DD-MM-YYYY.' });
  }

  // Convert to Date object
  const dueDateObject = formattedDueDate.toDate();

  // Create new task
  const newTask = new Task({ title, description, status, dueDate: dueDateObject });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /tasks/:id (Update task by ID)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, dueDate } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (dueDate) {
      // Convert dueDate from DD-MM-YYYY to a Date object
      task.dueDate = moment(dueDate, 'DD-MM-YYYY').toDate();
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /tasks/:id (Delete task by ID)
const deleteTask = async (req, res) => {
    try {
      // Use findByIdAndDelete to find and delete the task in one step
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      
      // Check if the task was found and deleted
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      // Task deleted successfully
      res.json({ message: 'Task deleted' });
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
