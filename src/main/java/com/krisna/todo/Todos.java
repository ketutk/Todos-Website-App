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

@Document(collection="todos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todos {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId _id;
    private String goal;
    private List<Mission> missions;



    @Field("deadline")
    private String deadline;
    private String status;

    public Todos(String goal, List<Mission> missions, String deadline, String status) {
        this.goal = goal;
        this.missions = missions;
        this.deadline = deadline;
        this.status = status;
    }

    public List<Mission> getMissions(){
        return this.missions;
    }

    public String getStatus(){
        return this.status;
    }
    public String getDeadline() {
        return deadline;
    }
}
