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
@RequestMapping("/api/vi/users")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        return new ResponseEntity<JSONObject>(userService.createUser(user),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String,String> payload){
        return new ResponseEntity<JSONObject>(userService.loginUser(payload.get("username"),payload.get("password")),HttpStatus.OK);
    }

    @PostMapping("/reset/{_id}/{newPassword}")
    public ResponseEntity<?> resetPasswordUser(@PathVariable("_id") ObjectId _id,@PathVariable("newPassword") String newPassword){
        return new ResponseEntity<JSONObject>(userService.resetPasswordUser(_id, newPassword),HttpStatus.OK);
    }
}
