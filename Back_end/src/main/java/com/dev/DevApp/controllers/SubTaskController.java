package com.dev.DevApp.controllers;

import com.dev.DevApp.models.Task;
import com.dev.DevApp.service.SubTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/task")
public class SubTaskController {

    SubTaskService subTaskService;

    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @GetMapping("/allsubtasks")
    public List<Task.SubTask> getAllSubTasks(){
        return subTaskService.getAllSubTasks();
    }
}