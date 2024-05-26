package com.dev.DevApp.service.implement;


import com.dev.DevApp.models.Task;
import com.dev.DevApp.repository.TaskRepository;
import com.dev.DevApp.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImp implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImp(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void createTask(Task task){
        taskRepository.save(task);
    }



    @Override
    public List<Task> getAllTasks(){

        return taskRepository.findAll();
    }
    @Override
    public void updateTask(Task task){
        taskRepository.save(task);
    }
    @Override
    public void deleteTask(String _id){
        taskRepository.deleteById(_id);
    }
    @Override
    public Task getTaskById(String _id){return taskRepository.findById(_id).get();};
    @Override
    public void saveTask(Task task){taskRepository.save(task);}

}
