package com.krisna.todo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection="mission")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Mission {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId _id = new ObjectId();
    private String mission;
    private Boolean status;

    public Mission(String mission, Boolean status) {
        this._id=_id;
        this.mission = mission;
        this.status = status;
    }

    public Boolean getStatus() {
        return this.status;
    }
}
