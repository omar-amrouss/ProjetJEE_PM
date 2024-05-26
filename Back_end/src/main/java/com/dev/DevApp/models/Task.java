package com.dev.DevApp.models;

import com.dev.DevApp.models.enums.Activities;
import com.dev.DevApp.models.enums.Priority;
import com.dev.DevApp.models.enums.Stage;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class Task {
    @Id
    @Column(name = "_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String _id;
    private String title;
    private Date date;
    private Priority priority;
    private Stage stage;
    // une task peut avoire plusieurs activités

    @OneToMany//(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Activity> activities;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<SubTask> subTasks;

    @ElementCollection
    private List<String> assets;
    // il faut faire une jointure avec la table User
    @ElementCollection
    @CollectionTable(name = "entity_team")
    @Column(name = "team_member")
    private List<String> team;


    private boolean isTrashed;

    public Task(String _id, String title ,Date date, Priority priority, Stage stage, List<Activity> activities, List<SubTask> subTasks, List<String> assets, List<String> team, boolean isTrashed) {
        this._id = _id;
        this.title = title;
        this.date = date;
        this.priority = priority;
        this.stage = stage;
        this.activities = activities;
        this.subTasks = subTasks;
        this.assets = assets;
        this.team = team;
        this.isTrashed = isTrashed;
    }
    public Task(){}

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks) {
        this.subTasks = subTasks;
    }

    public List<String> getAssets() {
        return assets;
    }

    public void setAssets(List<String> assets) {
        this.assets = assets;
    }

    public List<String> getTeam() {
        return team;
    }

    public void setTeam(List<String> team) {
        this.team = team;
    }

    public boolean getIsTrashed() {
        return isTrashed;
    }

    public void setIsTrashed(boolean istrashed) {
        this.isTrashed = istrashed;
    }

    public void addSubTask(SubTask subTask , String task_id) {
        this.subTasks.add(subTask);
        this._id = task_id ;
    }

    //--------- la sous classe Activity---------------
    @Entity
    public static class Activity{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer activityId;

        private String type;

        //@JoinColumn(name = "taskId")
        @ManyToOne
        private Task task;
        private Activities activity;
        private Date date;
        @ManyToOne
        private User by;// refrence for User

        public Activity(Integer activityId,String type,Task task, Activities activity, Date date, User by) {
            this.activityId = activityId;
            this.type = type;
            this.task= task;
            this.activity = activity;
            this.date = date;
            this.by = by;
        }
        public Activity(){}

        // les getters et setters du classe Activity:


        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Activities getActivity() {
            return activity;
        }

        public void setActivity(Activities activity) {
            this.activity = activity;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public User getBy() {
            return by;
        }

        public void setBy(User by) {
            this.by = by;
        }

        public Task getTask() {
            return task;
        }

        public void setTask(Task task) {
            this.task = task;
        }

        public Integer getActivityId() {
            return activityId;
        }

        public void setActivityId(Integer activityId) {
            this.activityId = activityId;
        }
    }


    // --------------------la sous classe SubTask-----------------
    @Entity
    public static  class SubTask{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer subtaskId;
        private String title;
        private String tag;

        @ManyToOne
        private Task task;

        public SubTask(){}

        public SubTask(Integer subtaskId,Task task, String title, String tag) {
            this.subtaskId = subtaskId;
            this.title = title;
            this.tag = tag;
        }
        // les getters et setters du classe SubTask:

        public Integer getSubtaskId() {
            return subtaskId;
        }

        public void setSubtaskId(Integer subtaskId) {
            this.subtaskId = subtaskId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getTag() {
            return tag;
        }

        public void setTag(String tag) {
            this.tag = tag;
        }

        //----

        public Task getTask() {
            return task;
        }

        public void setTask(Task task) {
            this.task = task;
        }
    }


}


