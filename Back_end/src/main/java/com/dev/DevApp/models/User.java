package com.dev.DevApp.models;

import jakarta.persistence.*;
import java.util.UUID;
import java.util.List;

@Entity
public class User {
    @Id
    @Column(name = "_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String _id;
    private String name;
    private String title;
    private String role;
    private String email;
    private String password;
    private boolean isAdmin;
    // chaque utilisateur peut effectuer plusieurs tasks
    @OneToMany//(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;
    private boolean isActive;

    public User(String _id, String name, String title, String role, String email, String password, boolean isAdmin, List<Task> tasks, boolean isActive) {
        this._id = _id;
        this.name = name;
        this.title = title;
        this.role = role;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin || false;
        this.tasks = tasks;
        this.isActive = isActive;
    }
    public User(){}

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }


}
