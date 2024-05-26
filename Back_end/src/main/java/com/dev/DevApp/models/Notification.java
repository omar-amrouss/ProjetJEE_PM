package com.dev.DevApp.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Integer notificationId;
    @OneToMany
    private List<User> team;
    private String text;
    @ManyToOne
    private Task task;
    private String typeNoti;

    @ManyToMany
    private List<User> isRead;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    public Notification(Integer notificationId, List<User> team, String text, Task task, String typeNoti, List<User> isRead, Date createDate, Date updateDate) {
        this.notificationId = notificationId;
        this.team = team;
        this.text = text;
        this.task = task;
        this.typeNoti = typeNoti;
        this.isRead = isRead;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
    public Notification(){}

    public Integer getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }

    public List<User> getTeam() {
        return team;
    }

    public void setTeam(List<User> team) {
        this.team = team;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public String getTypeNoti() {
        return typeNoti;
    }

    public void setTypeNoti(String typeNoti) {
        this.typeNoti = typeNoti;
    }

    public List<User> getIsRead() {
        return isRead;
    }

    public void setIsRead(List<User> isRead) {
        this.isRead = isRead;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
