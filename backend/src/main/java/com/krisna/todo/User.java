package com.krisna.todo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.Optional;

@Document(collection="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId _id;
    private String email;
    private String username;
    private String password;
    private Integer count;
    private Optional<String> link_reset;

    public User(String email, String username, String password, Integer count, Optional<String> link_reset) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.count = count;
        this.link_reset = link_reset;
    }

    public String getEmail() {
        return this.email;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public Integer getCount() {
        return this.count;
    }

    public Optional<String> getLink_reset() {
        return this.link_reset;
    }

    public ObjectId getUserId(){
        return this._id;
    }

    public User getUser(){
        User user = new User(getEmail(),getUsername(),getPassword(),getCount(),getLink_reset());
        return user;
    }

}

