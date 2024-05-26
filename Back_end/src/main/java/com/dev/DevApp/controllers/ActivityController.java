package com.dev.DevApp.controllers;
import com.dev.DevApp.service.ActivityService;
import com.dev.DevApp.models.Task;
import com.dev.DevApp.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("activities")
public class ActivityController {
    /*@Autowired
    ActivityService activity_Service;

    public ActivityController(ActivityService activity_Service) {
        this.activity_Service = activity_Service;
    }

    @RequestMapping("/api")
    public String create_activity(@RequestBody Task.Activity activity){

        activity_Service.createActivity(activity);
        return "bien activity";
    }
    */



}
