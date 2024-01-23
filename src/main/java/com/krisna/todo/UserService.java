package com.krisna.todo;

import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private TodosService todosService;
    @Autowired
    MongoTemplate mongoTemplate;

    public JSONObject createUser(User user){
        JSONObject resp = new JSONObject();
        try {
            userRepository.save(user);
            resp.put("message","Sucessfully created");
            resp.put("data",user);
            resp.put("status",true);
            return resp;
        } catch (Exception err){
            resp.put("message","Action failed");
            resp.put("error",err);
            resp.put("status",false);
            return resp;
        }

    }

    public JSONObject loginUser(String username,String password){
        JSONObject resp = new JSONObject();

        try {
            Query query = new Query(Criteria.where("username").is(username).and("password").is(password));
            Boolean userExist = mongoTemplate.exists(query,User.class);

            if(userExist){
                User userData = mongoTemplate.findOne(query, User.class);

                if(userData.getCount()>=3){
                    String string = String.format("Halo %s,\n\nKami mendeteksi percobaan masuk yang gagal selama 3x percobaan. Demi keamanan, kini akun anda terpaksa kami kunci. Silahkan klik link dibawah ini untuk mengganti password anda :\n\nhttp://localhost:3000/reset/%s/{passwordBaruAnda} \n\n Mohon abaikan pesan ini jika itu adalah anda.\n\nTerimakasih.",userData.getUsername(),userData.getUserId());
                    Email emailDetails = new Email(userData.getEmail(),string,"DreamSetter","");
                    String emailResult = emailService.sendSimpleMail(emailDetails);
                    resp.put("message","User is currently locked. Check your email to reset");
                    resp.put("messageMail",emailResult);
                    resp.put("status",false);
                    return resp;
                }
                int checkDeadline = todosService.checkDeadline();
                Update update = new Update().set("count",0);
                mongoTemplate.findAndModify(query,update, User.class);

//                String string = String.format("Halo %s,\n\nKami memberitahukan bahwa anda telah login kedalam aplikasi DreanSetter. Mohon abaikan pesan ini jika itu adalah anda.\n\nTerimakasih.",userData.getUsername());
//                Email emailDetails = new Email(userData.getEmail(),string,"DreamSetter","");
//                String emailResult = emailService.sendSimpleMail(emailDetails);

                resp.put("message","Sucessfully login");
                resp.put("token",String.format("%s-%s-%s", userData.getUsername(), userData.getPassword(),userData.getEmail()));
                resp.put("deadline",checkDeadline);
                resp.put("status",true);
                return resp;
            } else {
                Boolean usernameExist = mongoTemplate.exists(new Query(Criteria.where("username").is(username)), User.class);

                if(usernameExist){
                    User user = mongoTemplate.findOne(new Query(Criteria.where("username").is(username)), User.class);
                    Update update = new Update().set("count",user.getCount()+1);
                    mongoTemplate.findAndModify(new Query(Criteria.where("username").is(username)),update, User.class);
                    if(user.getCount()+1>=3){
                        String string = String.format("Halo %s,\n\nKami mendeteksi percobaan masuk yang gagal selama 3x percobaan. Demi keamanan, kini akun anda terpaksa kami kunci. Silahkan klik link dibawah ini untuk mengganti password anda :\n\nhttp://localhost:3000/reset/%s/{passwordBaruAnda} \n\n Mohon abaikan pesan ini jika itu adalah anda.\n\nTerimakasih.",user.getUsername(),user.getUserId());
                        Email emailDetails = new Email(user.getEmail(),string,"DreamSetter","");
                        String emailResult = emailService.sendSimpleMail(emailDetails);
                        resp.put("message","User is currently locked. Check your email to reset");
                        resp.put("messageMail",emailResult);

                        resp.put("status",false);
                        return resp;
                    }
                }
                resp.put("message","Wrong username or password");
                resp.put("status",false);
                return resp;
            }

        } catch (Exception err){
            resp.put("message","Action failed");
            resp.put("error",err);
            resp.put("status",false);
            return resp;
        }

    }
    public JSONObject resetPasswordUser(ObjectId _id, String newPassword){
        JSONObject resp = new JSONObject();

        try{
            Optional<User> user = userRepository.findById(_id);
            if(!user.isEmpty()){
                Update update = new Update().set("password",newPassword).set("count",0);
                mongoTemplate.findAndModify(new Query(Criteria.where("_id").is(_id)),update, User.class);
                resp.put("message","Password has been updated. You can login with new password");
                resp.put("status",true);
                return resp;
            }
            resp.put("message","User not found");
            resp.put("status",false);
            return resp;
        } catch (Exception err){
            resp.put("message","Error : Action failed");
            resp.put("status",false);
            return resp;
        }
    }
}
