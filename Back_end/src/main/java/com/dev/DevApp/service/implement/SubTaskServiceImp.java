package com.dev.DevApp.service.implement;

import com.dev.DevApp.models.Task;
import com.dev.DevApp.repository.SubTaskRepository;
import com.dev.DevApp.service.SubTaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTaskServiceImp implements SubTaskService {

    SubTaskRepository subTaskRepository;

    public SubTaskServiceImp(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    public void createSubTask(Task.SubTask subTask){

        subTaskRepository.save(subTask);

    }
    @Override
    public List<Task.SubTask> getAllSubTasks(){
        return subTaskRepository.findAll();
    }
}
