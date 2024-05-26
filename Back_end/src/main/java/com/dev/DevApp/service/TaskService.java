package com.dev.DevApp.service;

import com.dev.DevApp.models.Task;
import com.dev.DevApp.models.User;
import com.dev.DevApp.models.enums.Stage;

import java.util.List;

public interface TaskService {


     void createTask(Task task);

     List<Task> getAllTasks();


     void updateTask(Task task);

     void deleteTask(String id);
     Task getTaskById(String _id);

     void saveTask(Task task);
}
