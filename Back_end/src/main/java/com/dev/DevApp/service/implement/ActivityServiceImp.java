package com.dev.DevApp.service.implement;

import com.dev.DevApp.models.Task;
import com.dev.DevApp.repository.ActivityRepository;
import com.dev.DevApp.service.ActivityService;

public class ActivityServiceImp implements ActivityService {

    ActivityRepository activityRepository;

    public ActivityServiceImp(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public void createActivity(Task.Activity activity){
        activityRepository.save(activity);

    }




}
