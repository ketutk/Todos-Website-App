package com.krisna.todo;

import netscape.javascript.JSObject;
import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/vi/todos")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class TodosController {
    @Autowired
    private TodosService todosService;

//    @GetMapping("/coba/{_id}")
//    public ResponseEntity<?> validateGoal(@PathVariable ObjectId _id ){
//        return new ResponseEntity<JSONObject>(todosService.validateGoal(_id),HttpStatus.OK);
//    }
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody Todos todos){
        return new ResponseEntity<JSONObject>(todosService.createTodo(todos),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllTodos(@RequestParam(required = false) String search){
        return new ResponseEntity<JSONObject>(todosService.getAllTodos(search),HttpStatus.OK);
    }

    @GetMapping("/sorted-by-deadline")
    public ResponseEntity<?> getEntitiesSortedByDeadline(){
        return new ResponseEntity<JSONObject>(todosService.findAllAndSortByDeadline(),HttpStatus.OK);
    }

    @GetMapping("/{_id}")
    public ResponseEntity<?> getSingleTodos(@PathVariable ObjectId _id){
        return new ResponseEntity<JSONObject>(todosService.getSingleTodos(_id),HttpStatus.OK);

//        Optional<Todos> todo = todosService.getSingleTodos(_id);
//        if(!todo.isEmpty()){
//            return new ResponseEntity<Optional<Todos>>(todo,HttpStatus.OK);
//        } else {
//            JSONObject resp = new JSONObject();
//            resp.put("message","Todo not found");
//            resp.put("status",false);
//            return new ResponseEntity<>(resp,HttpStatus.OK);
//
//        }
    }

    @DeleteMapping("/{_id}")
    public ResponseEntity<?> deleteTodo(@PathVariable ObjectId _id){
        return new ResponseEntity<JSONObject>(todosService.deleteTodo(_id),HttpStatus.OK);
    }

    @PutMapping("/{_id}")
    public  ResponseEntity<?> editTodo(@RequestBody Map<String,String> payload, @PathVariable ObjectId _id){
        return new ResponseEntity<JSONObject>(todosService.editTodo(payload.get("goal"),payload.get("deadline"),_id),HttpStatus.OK);
    }

//    MISSION CONTROLLER
    @PostMapping("/mission/{_id}")
    public  ResponseEntity<?> addMission(@RequestBody Mission mission, @PathVariable ObjectId _id){
        return new ResponseEntity<JSONObject>(todosService.addMission(_id,mission),HttpStatus.CREATED);
    }

    @PutMapping("/mission/{_id}")
    public ResponseEntity<?> editMission(@RequestBody Map<String,String> payload, @PathVariable ObjectId _id){
        return new ResponseEntity<JSONObject>(todosService.editMission(_id,payload.get("_idMission"),payload.get("mission")),HttpStatus.OK);
    }

    @PutMapping("/mission/check")
    public ResponseEntity<?> checkMission(@RequestBody Map<String,ObjectId> payload){
        return new ResponseEntity<JSONObject>(todosService.checkMission(payload.get("_id"),payload.get("_idMission")),HttpStatus.OK);
    }

    @DeleteMapping("/mission")
    public ResponseEntity<?> deleteMission(@RequestParam(name = "_id") ObjectId _id, @RequestParam(name = "_idMission") ObjectId _idMission){
        return new ResponseEntity<JSONObject>(todosService.deleteMission(_id, _idMission),HttpStatus.OK);
    }
}
